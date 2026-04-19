import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { Resend } from 'resend';

/**
 * Endpoint de contact dédié Sysnext Industrial Solutions.
 *
 * Règle R9 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Tag Pipedrive `sysnext` systématique sur tous les leads qui arrivent ici.
 * Notif interne vers industriel@sysnext.com + Seb + Stéphane.
 *
 * Source : config/cohabitation-marques.md §3 R9.
 */

// Même pipeline Pipedrive pour l'instant — à spécialiser quand un pipeline Sysnext
// dédié existera côté Pipedrive (prévu S3+).
const PIPEDRIVE_PIPELINE_ID = 3;
const PIPEDRIVE_STAGE_ID = 17;
const SYSNEXT_LEAD_TAG = 'Sysnext Industrial Solutions — Lead industrie';

const contactIndustrieSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().min(1),
  jobTitle: z.string().optional(),
  segment: z.enum([
    'aftermarket-auto',
    'sav-outillage',
    'qc-inspection',
    'mro-aero',
    'forensique',
    'medical',
    'autre',
  ]),
  volume: z.string().optional(), // volume photos/an estimé
  norms: z.array(z.string()).optional(), // AS9100, IATF, ISO 13485...
  requestType: z.enum(['demo', 'quote', 'poc', 'info']),
  message: z.string().optional(),
  rgpdConsent: z.literal(true),
  locale: z.enum(['fr', 'en']).default('fr'),
  pageSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
});

type ContactIndustrieData = z.infer<typeof contactIndustrieSchema>;

const SEGMENT_LABELS: Record<string, { fr: string; en: string }> = {
  'aftermarket-auto': { fr: 'Aftermarket automobile', en: 'Automotive aftermarket' },
  'sav-outillage': { fr: 'SAV outillage industriel', en: 'Industrial tooling service' },
  'qc-inspection': { fr: 'QC / Inspection industrielle', en: 'QC / Industrial inspection' },
  'mro-aero': { fr: 'MRO aéronautique civile', en: 'Civil aeronautical MRO' },
  forensique: { fr: 'Forensique civile', en: 'Civil forensics' },
  medical: { fr: 'Dispositifs médicaux', en: 'Medical devices' },
  autre: { fr: 'Autre', en: 'Other' },
};

const REQUEST_TYPE_LABELS: Record<string, { fr: string; en: string }> = {
  demo: { fr: 'Demande de démonstration', en: 'Demo request' },
  quote: { fr: 'Demande de devis', en: 'Quote request' },
  poc: { fr: 'Demande de POC / essai', en: 'POC / trial request' },
  info: { fr: 'Demande d\'informations', en: 'Information request' },
};

async function upsertPerson(apiToken: string, data: ContactIndustrieData): Promise<number | null> {
  try {
    const searchRes = await fetch(
      `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(data.email)}&fields=email&limit=1&api_token=${apiToken}`,
    );
    const searchData = await searchRes.json();
    if (searchData.data?.items?.length > 0) {
      return searchData.data.items[0].item.id;
    }
    const personPayload: Record<string, unknown> = {
      name: `${data.firstName} ${data.lastName}`,
      email: [{ value: data.email, primary: true, label: 'work' }],
    };
    if (data.phone) personPayload.phone = [{ value: data.phone, primary: true, label: 'work' }];
    if (data.jobTitle) personPayload.job_title = data.jobTitle;
    const res = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personPayload),
    });
    const result = await res.json();
    return result.data?.id ?? null;
  } catch (error) {
    console.error('Pipedrive person error:', error);
    return null;
  }
}

async function upsertOrg(apiToken: string, companyName: string): Promise<number | null> {
  try {
    const searchRes = await fetch(
      `https://api.pipedrive.com/v1/organizations/search?term=${encodeURIComponent(companyName)}&limit=1&api_token=${apiToken}`,
    );
    const searchData = await searchRes.json();
    if (searchData.data?.items?.length > 0) {
      return searchData.data.items[0].item.id;
    }
    const res = await fetch(`https://api.pipedrive.com/v1/organizations?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: companyName }),
    });
    const result = await res.json();
    return result.data?.id ?? null;
  } catch (error) {
    console.error('Pipedrive org error:', error);
    return null;
  }
}

async function createDealWithNote(
  apiToken: string,
  personId: number,
  orgId: number | null,
  data: ContactIndustrieData,
): Promise<number | null> {
  try {
    const typeLabel = REQUEST_TYPE_LABELS[data.requestType]?.fr ?? data.requestType;
    const segmentLabel = SEGMENT_LABELS[data.segment]?.fr ?? data.segment;
    const title = `[Sysnext] ${typeLabel} ${segmentLabel} — ${data.company} (${data.firstName} ${data.lastName})`;

    const dealPayload: Record<string, unknown> = {
      title,
      person_id: personId,
      pipeline_id: PIPEDRIVE_PIPELINE_ID,
      stage_id: PIPEDRIVE_STAGE_ID,
    };
    if (orgId) dealPayload.org_id = orgId;

    const dealRes = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dealPayload),
    });
    const dealResult = await dealRes.json();
    const dealId: number | undefined = dealResult.data?.id;
    if (!dealId) return null;

    const noteLines = [
      SYSNEXT_LEAD_TAG,
      '',
      typeLabel,
      '',
      `Nom : ${data.firstName} ${data.lastName}`,
      `Email : ${data.email}`,
      data.phone ? `Téléphone : ${data.phone}` : null,
      `Société : ${data.company}`,
      data.jobTitle ? `Fonction : ${data.jobTitle}` : null,
      `Segment : ${segmentLabel}`,
      data.volume ? `Volume estimé : ${data.volume}` : null,
      data.norms && data.norms.length > 0 ? `Normes : ${data.norms.join(', ')}` : null,
      '',
      data.message ? `Message :\n${data.message}` : null,
      '',
      data.pageSource ? `Page d'origine : ${data.pageSource}` : null,
      data.utmSource ? `UTM source : ${data.utmSource}` : null,
      data.utmCampaign ? `UTM campaign : ${data.utmCampaign}` : null,
      '',
      `Reçu le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    ]
      .filter(Boolean)
      .join('\n');

    await fetch(`https://api.pipedrive.com/v1/notes?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deal_id: dealId,
        content: noteLines,
        pinned_to_deal_flag: true,
      }),
    });

    return dealId;
  } catch (error) {
    console.error('Pipedrive deal error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactIndustrieSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
    const typeLabel = REQUEST_TYPE_LABELS[data.requestType]?.[data.locale] ?? data.requestType;
    const segmentLabel = SEGMENT_LABELS[data.segment]?.[data.locale] ?? data.segment;

    let pipedriveResult: { personId: number | null; dealId: number | null } = {
      personId: null,
      dealId: null,
    };

    if (PIPEDRIVE_API_TOKEN) {
      const personId = await upsertPerson(PIPEDRIVE_API_TOKEN, data);
      const orgId = await upsertOrg(PIPEDRIVE_API_TOKEN, data.company);
      if (personId) {
        if (orgId) {
          await fetch(`https://api.pipedrive.com/v1/persons/${personId}?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_id: orgId }),
          });
        }
        const dealId = await createDealWithNote(PIPEDRIVE_API_TOKEN, personId, orgId, data);
        pipedriveResult = { personId, dealId };
      }
    }

    const PIPEDRIVE_DOMAIN = process.env.PIPEDRIVE_DOMAIN ?? 'packshotcreator.pipedrive.com';
    const dealUrl = pipedriveResult.dealId
      ? `https://${PIPEDRIVE_DOMAIN}/deal/${pipedriveResult.dealId}`
      : null;

    const notifHtml = `
      <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0E2A47; padding: 20px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Sysnext Industrial Solutions</h1>
          <p style="color: #A9C1D7; margin: 4px 0 0; font-size: 13px;">${typeLabel} · ${segmentLabel}</p>
        </div>
        <div style="padding: 20px; background: #F6F7F9; border-radius: 0 0 12px 12px;">
          ${dealUrl ? `<a href="${dealUrl}" style="display: inline-block; background: #7DBF3F; color: #0E2A47; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">Voir l'affaire dans Pipedrive</a>` : ''}
          <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
          ${data.jobTitle ? `<p><strong>Fonction :</strong> ${data.jobTitle}</p>` : ''}
          <p><strong>Email :</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
          <p><strong>Société :</strong> ${data.company}</p>
          <p><strong>Segment :</strong> ${segmentLabel}</p>
          ${data.volume ? `<p><strong>Volume estimé :</strong> ${data.volume}</p>` : ''}
          ${data.norms && data.norms.length > 0 ? `<p><strong>Normes :</strong> ${data.norms.join(', ')}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #D4D8DD; margin: 15px 0;" />
          ${data.message ? `<p><strong>Message :</strong></p><p>${data.message.replace(/\n/g, '<br/>')}</p>` : '<p><em>Pas de message</em></p>'}
          ${data.pageSource ? `<p style="color: #5C6470; font-size: 12px;">Page d'origine : ${data.pageSource}</p>` : ''}
          ${data.utmSource ? `<p style="color: #5C6470; font-size: 12px;">UTM source : ${data.utmSource}${data.utmCampaign ? ` · Campaign : ${data.utmCampaign}` : ''}</p>` : ''}
        </div>
      </div>
    `;

    await resend.emails
      .send({
        from: `Sysnext Industrial Solutions <${process.env.RESEND_FROM_EMAIL}>`,
        to: ['industriel@sysnext.com', 'sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'],
        subject: `[Sysnext Industriel] ${typeLabel} - ${data.company}`,
        html: notifHtml,
      })
      .catch((err) => console.error('Notification email error:', err));

    const confirmHtml = data.locale === 'fr'
      ? `
        <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0E2A47; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Sysnext Industrial Solutions</h1>
            <p style="color: #A9C1D7; margin: 8px 0 0; font-size: 13px;">Votre demande a bien été reçue</p>
          </div>
          <div style="padding: 30px; background: #F6F7F9; border-radius: 0 0 12px 12px;">
            <p>Bonjour ${data.firstName},</p>
            <p>Merci pour votre demande de <strong>${typeLabel.toLowerCase()}</strong>.</p>
            <p>Notre équipe vous recontactera sous <strong>24 heures ouvrées</strong>.</p>
            <p style="margin-top: 30px; color: #5C6470; font-size: 12px;">Sysnext Industrial Solutions — A Packshot-Creator company · www.packshot-creator.com/fr/industrie-solutions</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0E2A47; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Sysnext Industrial Solutions</h1>
            <p style="color: #A9C1D7; margin: 8px 0 0; font-size: 13px;">Your request has been received</p>
          </div>
          <div style="padding: 30px; background: #F6F7F9; border-radius: 0 0 12px 12px;">
            <p>Hello ${data.firstName},</p>
            <p>Thank you for your <strong>${typeLabel.toLowerCase()}</strong>.</p>
            <p>Our team will get back to you within <strong>24 business hours</strong>.</p>
            <p style="margin-top: 30px; color: #5C6470; font-size: 12px;">Sysnext Industrial Solutions — A Packshot-Creator company · www.packshot-creator.com/en/industrie-solutions</p>
          </div>
        </div>
      `;

    await resend.emails
      .send({
        from: `Sysnext Industrial Solutions <${process.env.RESEND_FROM_EMAIL}>`,
        to: [data.email],
        subject:
          data.locale === 'fr'
            ? 'Sysnext Industrial Solutions — Votre demande a bien été reçue'
            : 'Sysnext Industrial Solutions — Your request has been received',
        html: confirmHtml,
      })
      .catch((err) => console.error('Confirmation email error:', err));

    return NextResponse.json({ success: true, pipedrive: pipedriveResult });
  } catch (error) {
    console.error('Contact industrie API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
