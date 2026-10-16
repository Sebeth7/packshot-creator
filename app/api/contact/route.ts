import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { enrichLead, formatEnrichmentHtml, type EnrichedLead } from '@/lib/lead-enrichment';
import { contactSchema, type ContactFormData } from '@/lib/contact-schema';
import { echapperHtml, echapperHtmlMultiligne } from '@/lib/echapper-html';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * Traitement commercial manuel, sans CRM (décision de Laurent du 15/10/2026,
 * option 1 ; modèle de la landing Catalogue, PR #82 fusionnée le 10/10/2026).
 *
 * Les demandes sont traitées à la main depuis la notification interne : c'est
 * donc elle, et elle seule, qui constitue la trace de la demande. Il n'y a plus
 * d'affaire Pipedrive pour la suppléer (`lib/pipedrive.ts` reste en place pour
 * `/api/roi-lead`, qui n'est pas concernée).
 *
 * Contrat de succès, en trois issues :
 * - 503 si l'envoi n'est pas configuré : rien n'est tenté, rien n'est promis ;
 * - 500 si la notification interne n'est pas acceptée par Resend : la demande
 *   n'a laissé aucune trace, le visiteur voit l'écran d'échec et peut réessayer,
 *   et aucune confirmation ne lui est envoyée (elle serait un faux succès) ;
 * - 200 dès que la notification est acceptée ; la confirmation au prospect part
 *   ensuite, et son échec est journalisé sans remettre la trace en cause.
 *
 * « Accepté par Resend » (absence d'erreur et identifiant non vide) ne prouve ni
 * la remise en boîte de réception, ni la lecture. Aucun identifiant interne
 * n'est renvoyé au navigateur.
 */

/** Suivi manuel : destinataires de la trace commerciale. */
const DESTINATAIRES_INTERNES = ['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'];

/**
 * Enrichissement du lead dans la notification interne — interrupteur de code,
 * sur le modèle de `lib/catalogue/activation.ts` : le basculer est un
 * changement relu en pull request, pas une variable d'environnement.
 *
 * Jusqu'au 15/10/2026, l'enrichissement était commandé par la présence du jeton
 * Pipedrive, qui n'existe plus ici ; il est désormais commandé par cette
 * constante. `enrichLead` n'appelle Gemini que si `GOOGLE_GEMINI_API_KEY` est
 * définie, l'INSEE et la lecture du site du domaine étant gratuits : le profil
 * d'appel ne change pas tant que les deux clés sont présentes ensemble.
 */
const ENRICHISSEMENT_NOTIFICATION = true;

/**
 * Freins anti-abus (P0 sécurité, G5 du 11/10/2026). La route envoie un e-mail à
 * l'adresse saisie : sans limite, elle servait de relais.
 * - Compteurs en mémoire de l'instance (`lib/rate-limit.ts`) : sur Vercel,
 *   plusieurs instances ne partagent pas leurs compteurs. C'est un frein, pas
 *   une limitation distribuée.
 * - La clé « adresse IP » est le premier `x-forwarded-for` (`getClientIp`).
 *   Vercel réécrit cet en-tête avec l'adresse qui se connecte à lui
 *   (documentation Vercel, « Request headers ») : derrière le Worker, c'est une
 *   adresse Cloudflare, que plusieurs visiteurs peuvent partager (S5 M18). Le
 *   seuil par IP reste donc large ; la limite par destinataire ne dépend
 *   d'aucun en-tête.
 */
const LIMITE_PAR_IP_HEURE = 10;
const LIMITE_PAR_DESTINATAIRE_HEURE = 3;

/**
 * Déduplication des demandes identiques (double clic, nouvel essai immédiat),
 * sur le modèle du registre d'idempotence de `lib/catalogue/gestionnaire.ts`.
 * Le formulaire n'envoie pas d'identifiant de requête : la clé est l'adresse du
 * prospect et une empreinte du corps validé, de sorte qu'une demande modifiée
 * soit bien traitée comme une nouvelle demande. Seul un résultat accepté est
 * mémorisé : un échec peut être retenté aussitôt.
 *
 * Registre en mémoire de l'instance : deux instances dédoublonnent séparément.
 */
const DUREE_IDEMPOTENCE_MS = 15 * 60 * 1000;
const TAILLE_MAX_IDEMPOTENCE = 2000;

/** Journal sans donnée personnelle ni secret : événement et contexte technique seulement. */
function journal(evenement: string, details: Record<string, string> = {}) {
  console.warn(`[api/contact] ${evenement}`, details);
}

/** Resend renvoie `{ data, error }` sans lever : l'envoi n'est accepté que sur un identifiant. */
type ResultatEnvoi = { data?: { id?: string } | null; error?: unknown } | null | undefined;
function envoiAccepte(r: ResultatEnvoi): boolean {
  return !!r && !r.error && typeof r.data?.id === 'string' && r.data.id.length > 0;
}

/** Le constructeur peut lever si la clé manque : l'indisponibilité est un 503, pas une erreur interne. */
function creerClientResend(): Resend | null {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) return null;
  try {
    return new Resend(process.env.RESEND_API_KEY);
  } catch {
    journal('resend.indisponible');
    return null;
  }
}

type Resultat = { status: number; body: Record<string, unknown> };

/** Empreinte non cryptographique (djb2) : sert de clé de déduplication, pas de preuve. */
function empreinte(valeur: string): string {
  let h = 5381;
  for (let i = 0; i < valeur.length; i += 1) h = ((h << 5) + h + valeur.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

const enCours = new Map<string, { expire: number; resultat: Promise<Resultat> }>();

function purger(instant: number) {
  for (const [cle, entree] of enCours) {
    if (entree.expire <= instant) enCours.delete(cle);
  }
  while (enCours.size > TAILLE_MAX_IDEMPOTENCE) {
    const plusAncienne = enCours.keys().next().value;
    if (plusAncienne === undefined) break;
    enCours.delete(plusAncienne);
  }
}

/** Lignes lisibles pour la notification interne (attribution de la demande). */
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

// ── Traitement ────────────────────────────────────────────────

async function traiter(data: ContactFormData, resend: Resend): Promise<Resultat> {
  // Libellés en fr et en seulement : de-ch reçoit l'anglais, comme l'email de confirmation.
  const typeLabel = REQUEST_TYPE_LABELS[data.requestType]?.[data.locale === 'fr' ? 'fr' : 'en'] || data.requestType;
  const contexte = { requestType: data.requestType, locale: data.locale };

  // 1. Enrichissement (INSEE + site web + IA) — avant l'e-mail pour l'y inclure.
  let enriched: EnrichedLead | null = null;
  if (ENRICHISSEMENT_NOTIFICATION) {
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

  // 2. Notification interne : la trace de la demande. Toutes les valeurs
  // saisies sont échappées ; `typeLabel` est construit ici.
  const enrichmentBlock = enriched ? formatEnrichmentHtml(enriched) : '';

  const notifHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #7C6BF0; padding: 20px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">${echapperHtml(typeLabel)}</h1>
        </div>
        <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
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

  let notificationAcceptee = false;
  try {
    const envoi = await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: DESTINATAIRES_INTERNES,
      subject: `[Site Web] ${typeLabel} - ${data.company}`,
      html: notifHtml,
    });
    notificationAcceptee = envoiAccepte(envoi);
  } catch {
    notificationAcceptee = false;
  }

  // Aucune trace : la demande n'est pas enregistrée. Pas de confirmation au
  // prospect, qui serait un faux succès ; le visiteur peut réessayer.
  if (!notificationAcceptee) {
    journal('notification.non_acceptee', contexte);
    journal('aucune_trace', contexte);
    return { status: 500, body: { error: 'Request not recorded' } };
  }

  // 3. Confirmation au prospect, une fois la trace établie.
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

  try {
    const envoi = await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: [data.email],
      subject: data.locale === 'fr'
        ? 'PackshotCreator — Votre demande a bien été reçue'
        : 'PackshotCreator — Your request has been received',
      html: confirmHtml,
    });
    if (!envoiAccepte(envoi)) journal('confirmation.non_acceptee', contexte);
  } catch {
    journal('confirmation.erreur', contexte);
  }

  return { status: 200, body: { success: true } };
}

// ── Main handler ──────────────────────────────────────────────

/**
 * P0 sécurité (G5, arbitrage L09) : limites, validation bornée, champ piège,
 * échappement de toute valeur saisie dans les e-mails, journal sans donnée
 * personnelle. Ces freins sont inchangés depuis le 11/10/2026 ; seul le
 * traitement commercial a changé (notification interne, sans CRM).
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

    // Envoi non configuré : rien n'est tenté et rien n'est promis au visiteur.
    const resend = creerClientResend();
    if (!resend) {
      journal('configuration.absente', { requestType: data.requestType, locale: data.locale });
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Déduplication : un double clic ou un nouvel essai à l'identique ne
    // renvoie aucun e-mail et rend le premier résultat.
    const instant = Date.now();
    purger(instant);
    const cle = `${data.email.toLowerCase()}:${empreinte(JSON.stringify(data))}`;
    const existante = enCours.get(cle);
    if (existante) {
      const memorise = await existante.resultat;
      journal('demande.dupliquee', { requestType: data.requestType, locale: data.locale });
      return NextResponse.json(memorise.body, { status: memorise.status });
    }

    const resultat = traiter(data, resend).catch((): Resultat => {
      journal('erreur_interne');
      return { status: 500, body: { error: 'Internal server error' } };
    });
    enCours.set(cle, { expire: instant + DUREE_IDEMPOTENCE_MS, resultat });
    const fin = await resultat;
    if (fin.status !== 200) enCours.delete(cle);
    return NextResponse.json(fin.body, { status: fin.status });
  } catch {
    journal('erreur_interne');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
