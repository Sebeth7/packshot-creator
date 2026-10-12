import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { enrichLead, formatEnrichmentNote, formatEnrichmentHtml, type EnrichedLead } from '@/lib/lead-enrichment';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import { echapperHtml, echapperHtmlMultiligne } from '@/lib/echapper-html';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// ── Pipedrive config ──────────────────────────────────────────
const PIPEDRIVE_PIPELINE_ID = 3; // PackshotCreator Pipeline
const PIPEDRIVE_STAGE_ID = 17;   // R0 - Nouvelles demandes

/**
 * Freins anti-abus (P0 sécurité, G5 du 11/10/2026). La route envoie un e-mail à
 * l'adresse saisie : sans limite, elle servait de relais.
 * - Compteurs en mémoire de l'instance (`lib/rate-limit.ts`) : sur Vercel,
 *   plusieurs instances ne partagent pas leurs compteurs. C'est un frein, pas
 *   une limitation distribuée.
 * - La clé « adresse IP » dépend de `getClientIp` (premier `x-forwarded-for`) :
 *   la chaîne de confiance Cloudflare → Vercel n'est pas établie (S5 M18). Le
 *   seuil par IP reste donc large ; la limite par destinataire ne dépend
 *   d'aucun en-tête.
 */
const LIMITE_PAR_IP_HEURE = 10;
const LIMITE_PAR_DESTINATAIRE_HEURE = 3;

/** Journal sans donnée personnelle ni secret : événement et contexte technique seulement. */
function journal(evenement: string, details: Record<string, string> = {}) {
  console.warn(`[api/contact] ${evenement}`, details);
}

/** Resend renvoie `{ data, error }` sans lever : l'envoi n'est accepté que sur un identifiant. */
type ResultatEnvoi = { data?: { id?: string } | null; error?: unknown } | null | undefined;
function envoiAccepte(r: ResultatEnvoi): boolean {
  return !!r && !r.error && typeof r.data?.id === 'string' && r.data.id.length > 0;
}


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
  } catch {
    journal('pipedrive.personne.erreur');
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
  } catch {
    journal('pipedrive.organisation.erreur');
    return null;
  }
}

/** Lignes lisibles pour la note Pipedrive / l'email interne (attribution de la demande). */
function formatAttributionLines(attribution: ContactFormData['attribution']): string[] {
  if (!attribution) return [];
  const lines: string[] = [];
  if (attribution.utmSource) lines.push(`🎯 Source : ${attribution.utmSource}`);
  if (attribution.utmMedium) lines.push(`📡 Medium : ${attribution.utmMedium}`);
  if (attribution.utmCampaign) lines.push(`📣 Campagne : ${attribution.utmCampaign}`);
  if (attribution.utmTerm) lines.push(`🔑 Terme : ${attribution.utmTerm}`);
  if (attribution.utmContent) lines.push(`🧩 Contenu : ${attribution.utmContent}`);
  if (attribution.referrer) lines.push(`🌐 Referrer : ${attribution.referrer}`);
  if (attribution.landingPage) lines.push(`🛬 Landing : ${attribution.landingPage}`);
  return lines;
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
        ...formatAttributionLines(data.attribution),
      ].filter(Boolean).join('\n');

      // Le contenu d'une note Pipedrive est du HTML : les valeurs saisies sont échappées.
      await fetch(
        `https://api.pipedrive.com/v1/notes?api_token=${apiToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deal_id: dealId,
            content: echapperHtml(noteLines),
            pinned_to_deal_flag: true,
          }),
        }
      );
    }

    return dealId;
  } catch {
    journal('pipedrive.affaire.erreur');
    return null;
  }
}

// ── Main handler ──────────────────────────────────────────────

/**
 * P0 sécurité (G5, arbitrage L09) : limites, validation bornée, champ piège,
 * échappement de toute valeur saisie dans les e-mails et les notes, journal
 * sans donnée personnelle. Le contrat de succès (codes de statut, ordre des
 * envois, corps de la réponse) est celui d'origine : il relève de L08.
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const limiteIp = rateLimit(`contact:ip:${ip}`, LIMITE_PAR_IP_HEURE);
    if (!limiteIp.ok) {
      journal('limite.ip');
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(limiteIp.resetInSec) } }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues.map((i) => ({ path: i.path, code: i.code })) },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.siteWeb) {
      journal('piege');
      return NextResponse.json({ error: 'Validation error' }, { status: 400 });
    }

    const limiteDestinataire = rateLimit(`contact:dest:${data.email.toLowerCase()}`, LIMITE_PAR_DESTINATAIRE_HEURE);
    if (!limiteDestinataire.ok) {
      journal('limite.destinataire');
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(limiteDestinataire.resetInSec) } }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
    // Libellés en fr et en seulement : de-ch reçoit l'anglais, comme l'email de confirmation.
    const typeLabel = REQUEST_TYPE_LABELS[data.requestType]?.[data.locale === 'fr' ? 'fr' : 'en'] || data.requestType;
    const contexte = { requestType: data.requestType, locale: data.locale };

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
      } catch {
        journal('enrichissement.erreur');
      }
    }

    // 3. Email notification interne (avec enrichissement). Toutes les valeurs
    // saisies sont échappées ; `typeLabel` et `dealUrl` sont construits ici.
    const PIPEDRIVE_DOMAIN = process.env.PIPEDRIVE_DOMAIN || 'packshotcreator.pipedrive.com';
    const dealUrl = pipedriveResult.dealId
      ? `https://${PIPEDRIVE_DOMAIN}/deal/${pipedriveResult.dealId}`
      : null;

    const enrichmentBlock = enriched ? formatEnrichmentHtml(enriched) : '';

    const notifHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7C6BF0; padding: 20px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">${echapperHtml(typeLabel)}</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
          ${dealUrl ? `<a href="${echapperHtml(dealUrl)}" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 16px;">Voir l'affaire dans Pipedrive</a>` : ''}
          <p><strong>Nom :</strong> ${echapperHtml(data.firstName)} ${echapperHtml(data.lastName)}</p>
          <p><strong>Email :</strong> ${echapperHtml(data.email)}</p>
          ${data.phone ? `<p><strong>Téléphone :</strong> ${echapperHtml(data.phone)}</p>` : ''}
          <p><strong>Société :</strong> ${echapperHtml(data.company)}</p>
          <p><strong>Secteur :</strong> ${echapperHtml(data.sector)}</p>
          <p><strong>Newsletter :</strong> ${data.newsletter === 'yes' ? 'Oui' : 'Non'}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
          ${data.message ? `<p><strong>Message :</strong></p><p>${echapperHtmlMultiligne(data.message)}</p>` : '<p><em>Pas de message</em></p>'}
          ${data.pageSource ? `<p style="color: #888; font-size: 12px;">Page d'origine : ${echapperHtml(data.pageSource)}</p>` : ''}
          ${data.machineContext ? `<p style="color: #888; font-size: 12px;">Machine : ${echapperHtml(data.machineContext)}</p>` : ''}
          ${formatAttributionLines(data.attribution).map((line) => `<p style="color: #888; font-size: 12px;">${echapperHtml(line)}</p>`).join('')}
          ${enrichmentBlock}
        </div>
      </div>
    `;

    // Résultat Resend vérifié (`{ data, error }` sans exception) : journalisé,
    // sans effet sur la réponse (contrat de succès : L08).
    const notification = await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: ['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'],
      subject: `[Site Web] ${typeLabel} - ${data.company}`,
      html: notifHtml,
    }).catch(() => null);
    if (!envoiAccepte(notification)) journal('notification.non_acceptee', contexte);

    // 4. Email confirmation prospect
    const prenom = echapperHtml(data.firstName);
    const confirmHtml = data.locale === 'fr'
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Votre demande a bien été reçue</p>
          </div>
          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
            <p>Bonjour ${prenom},</p>
            <p>Merci pour votre demande de <strong>${echapperHtml(typeLabel.toLowerCase())}</strong>.</p>
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
            <p>Hello ${prenom},</p>
            <p>Thank you for your <strong>${echapperHtml((REQUEST_TYPE_LABELS[data.requestType]?.en || data.requestType).toLowerCase())}</strong> request.</p>
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

    const confirmation = await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.email],
      subject: data.locale === 'fr'
        ? 'PackshotCreator — Votre demande a bien été reçue'
        : 'PackshotCreator — Your request has been received',
      html: confirmHtml,
    }).catch(() => null);
    if (!envoiAccepte(confirmation)) journal('confirmation.non_acceptee', contexte);

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
              content: echapperHtml(formatEnrichmentNote(enriched)),
              pinned_to_deal_flag: false,
            }),
          }
        );
      } catch {
        journal('pipedrive.note_enrichissement.erreur');
      }
    }

    return NextResponse.json({ success: true, pipedrive: pipedriveResult });
  } catch {
    journal('erreur_interne');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
