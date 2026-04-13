import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { Resend } from 'resend';
import { enrichLead, formatEnrichmentNote, formatEnrichmentHtml, type EnrichedLead } from '@/lib/lead-enrichment';

// ── Pipedrive config ──────────────────────────────────────────
const PIPEDRIVE_PIPELINE_ID = 3; // PackshotCreator Pipeline
const PIPEDRIVE_STAGE_ID = 17;   // R0 - Nouvelles demandes

// ── Validation schema ─────────────────────────────────────────
const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().min(1),
  sector: z.string().min(1),
  requestType: z.enum(['demo', 'quote', 'support', 'training', 'other']),
  message: z.string().optional(),
  rgpdConsent: z.literal(true),
  newsletter: z.enum(['yes', 'no']),
  locale: z.enum(['fr', 'en']).default('fr'),
  pageSource: z.string().optional(), // page d'origine (ex: "/fr/studio-photo/alphashot-pro-g2")
  machineContext: z.string().optional(), // machine pré-sélectionnée si applicable
});

type ContactFormData = z.infer<typeof contactSchema>;

// ── Pipedrive helpers ─────────────────────────────────────────

async function findOrCreatePerson(
  apiToken: string,
  data: ContactFormData
): Promise<number | null> {
  try {
    // Search by email first
    const searchRes = await fetch(
      `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(data.email)}&fields=email&limit=1&api_token=${apiToken}`
    );
    const searchData = await searchRes.json();

    if (searchData.data?.items?.length > 0) {
      return searchData.data.items[0].item.id;
    }

    // Create new person
    const personPayload: Record<string, unknown> = {
      name: `${data.firstName} ${data.lastName}`,
      email: [{ value: data.email, primary: true, label: 'work' }],
    };
    if (data.phone) {
      personPayload.phone = [{ value: data.phone, primary: true, label: 'work' }];
    }

    const res = await fetch(
      `https://api.pipedrive.com/v1/persons?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personPayload),
      }
    );
    const result = await res.json();
    return result.data?.id || null;
  } catch (error) {
    console.error('Pipedrive person error:', error);
    return null;
  }
}

async function findOrCreateOrganization(
  apiToken: string,
  companyName: string
): Promise<number | null> {
  try {
    const searchRes = await fetch(
      `https://api.pipedrive.com/v1/organizations/search?term=${encodeURIComponent(companyName)}&limit=1&api_token=${apiToken}`
    );
    const searchData = await searchRes.json();

    if (searchData.data?.items?.length > 0) {
      return searchData.data.items[0].item.id;
    }

    const res = await fetch(
      `https://api.pipedrive.com/v1/organizations?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: companyName }),
      }
    );
    const result = await res.json();
    return result.data?.id || null;
  } catch (error) {
    console.error('Pipedrive organization error:', error);
    return null;
  }
}

const REQUEST_TYPE_LABELS: Record<string, { fr: string; en: string }> = {
  demo: { fr: 'Demande de démonstration', en: 'Demo request' },
  quote: { fr: 'Demande de devis', en: 'Quote request' },
  support: { fr: 'Support technique', en: 'Technical support' },
  training: { fr: 'Formation / Academy', en: 'Training / Academy' },
  other: { fr: 'Autre demande', en: 'Other request' },
};

async function createDealWithNote(
  apiToken: string,
  personId: number,
  orgId: number | null,
  data: ContactFormData
): Promise<number | null> {
  try {
    const typeLabel = REQUEST_TYPE_LABELS[data.requestType]?.fr || data.requestType;
    const title = `${typeLabel} - ${data.company} (${data.firstName} ${data.lastName})`;

    const dealPayload: Record<string, unknown> = {
      title,
      person_id: personId,
      pipeline_id: PIPEDRIVE_PIPELINE_ID,
      stage_id: PIPEDRIVE_STAGE_ID,
    };
    if (orgId) dealPayload.org_id = orgId;

    const res = await fetch(
      `https://api.pipedrive.com/v1/deals?api_token=${apiToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealPayload),
      }
    );
    const result = await res.json();
    const dealId = result.data?.id;

    if (dealId) {
      const noteLines = [
        `📋 ${typeLabel}`,
        ``,
        `👤 ${data.firstName} ${data.lastName}`,
        `📧 ${data.email}`,
        data.phone ? `📱 ${data.phone}` : null,
        `🏢 ${data.company}`,
        `🏭 Secteur : ${data.sector}`,
        ``,
        data.message ? `💬 Message :\n${data.message}` : null,
        ``,
        `📰 Newsletter : ${data.newsletter === 'yes' ? 'Oui' : 'Non'}`,
        ``,
        `📅 ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
        data.pageSource ? `🔗 Page d'origine : ${data.pageSource}` : null,
        data.machineContext ? `🖥 Machine : ${data.machineContext}` : null,
      ].filter(Boolean).join('\n');

      await fetch(
        `https://api.pipedrive.com/v1/notes?api_token=${apiToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deal_id: dealId,
            content: noteLines,
            pinned_to_deal_flag: true,
          }),
        }
      );
    }

    return dealId;
  } catch (error) {
    console.error('Pipedrive deal error:', error);
    return null;
  }
}

// ── Main handler ──────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
    const typeLabel = REQUEST_TYPE_LABELS[data.requestType]?.[data.locale] || data.requestType;

    // 1. Pipedrive: Person + Organization + Deal + Note
    let pipedriveResult = { personId: null as number | null, dealId: null as number | null };

    if (PIPEDRIVE_API_TOKEN) {
      const personId = await findOrCreatePerson(PIPEDRIVE_API_TOKEN, data);
      const orgId = await findOrCreateOrganization(PIPEDRIVE_API_TOKEN, data.company);

      if (personId) {
        // Link person to org if both exist
        if (orgId) {
          await fetch(
            `https://api.pipedrive.com/v1/persons/${personId}?api_token=${PIPEDRIVE_API_TOKEN}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ org_id: orgId }),
            }
          );
        }

        const dealId = await createDealWithNote(PIPEDRIVE_API_TOKEN, personId, orgId, data);
        pipedriveResult = { personId, dealId };
      }
    }

    // 2. Enrichissement (INSEE + website + AI) — avant l'email pour l'inclure
    let enriched: EnrichedLead | null = null;
    if (PIPEDRIVE_API_TOKEN) {
      try {
        enriched = await enrichLead({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          sector: data.sector,
          requestType: data.requestType,
          message: data.message,
          pageSource: data.pageSource,
          machineContext: data.machineContext,
        });
      } catch (err) {
        console.error('Lead enrichment error:', err);
      }
    }

    // 3. Email notification interne (avec enrichissement)
    const PIPEDRIVE_DOMAIN = process.env.PIPEDRIVE_DOMAIN || 'packshotcreator.pipedrive.com';
    const dealUrl = pipedriveResult.dealId
      ? `https://${PIPEDRIVE_DOMAIN}/deal/${pipedriveResult.dealId}`
      : null;

    const enrichmentBlock = enriched ? formatEnrichmentHtml(enriched) : '';

    const notifHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7C6BF0; padding: 20px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">${typeLabel}</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
          ${dealUrl ? `<a href="${dealUrl}" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">Voir l'affaire dans Pipedrive</a>` : ''}
          <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
          <p><strong>Société :</strong> ${data.company}</p>
          <p><strong>Secteur :</strong> ${data.sector}</p>
          <p><strong>Newsletter :</strong> ${data.newsletter === 'yes' ? 'Oui' : 'Non'}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
          ${data.message ? `<p><strong>Message :</strong></p><p>${data.message.replace(/\n/g, '<br/>')}</p>` : '<p><em>Pas de message</em></p>'}
          ${data.pageSource ? `<p style="color: #888; font-size: 12px;">Page d'origine : ${data.pageSource}</p>` : ''}
          ${data.machineContext ? `<p style="color: #888; font-size: 12px;">Machine : ${data.machineContext}</p>` : ''}
          ${enrichmentBlock}
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: ['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'],
      subject: `[Site Web] ${typeLabel} - ${data.company}`,
      html: notifHtml,
    }).catch((err) => console.error('Notification email error:', err));

    // 3. Email confirmation prospect
    const confirmHtml = data.locale === 'fr'
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Votre demande a bien été reçue</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
            <p>Bonjour ${data.firstName},</p>
            <p>Merci pour votre demande de <strong>${typeLabel.toLowerCase()}</strong>.</p>
            <p>Notre équipe vous recontactera sous <strong>24 heures ouvrées</strong>.</p>
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">En attendant</h3>
              <p>Vous pouvez estimer vos économies avec notre calculateur de ROI :</p>
              <a href="https://www.packshot-creator.com/fr/calculateur-roi" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Calculer mon ROI</a>
            </div>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">PackshotCreator by Sysnext — www.packshot-creator.com</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Your request has been received</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
            <p>Hello ${data.firstName},</p>
            <p>Thank you for your <strong>${(REQUEST_TYPE_LABELS[data.requestType]?.en || data.requestType).toLowerCase()}</strong> request.</p>
            <p>Our team will get back to you within <strong>24 business hours</strong>.</p>
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">In the meantime</h3>
              <p>You can estimate your savings with our ROI calculator:</p>
              <a href="https://www.packshot-creator.com/en/calculateur-roi" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Calculate my ROI</a>
            </div>
            <p style="margin-top: 30px; color: #666; font-size: 12px;">PackshotCreator by Sysnext — www.packshot-creator.com</p>
          </div>
        </div>
      `;

    await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.email],
      subject: data.locale === 'fr'
        ? 'PackshotCreator — Votre demande a bien été reçue'
        : 'PackshotCreator — Your request has been received',
      html: confirmHtml,
    }).catch((err) => console.error('Confirmation email error:', err));

    // 5. Note enrichissement dans Pipedrive
    if (enriched && pipedriveResult.dealId && PIPEDRIVE_API_TOKEN) {
      try {
        await fetch(
          `https://api.pipedrive.com/v1/notes?api_token=${PIPEDRIVE_API_TOKEN}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              deal_id: pipedriveResult.dealId,
              content: formatEnrichmentNote(enriched),
              pinned_to_deal_flag: false,
            }),
          }
        );
      } catch (err) {
        console.error('Pipedrive enrichment note error:', err);
      }
    }

    return NextResponse.json({ success: true, pipedrive: pipedriveResult });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
