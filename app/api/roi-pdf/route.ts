import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { echapperHtml } from '@/lib/echapper-html';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { roiPdfRequestSchema, nomMachineRoi, type RoiPdfRequest } from '@/lib/roi-pdf-schema';

/**
 * Traitement commercial manuel, sans CRM (décision de Laurent du 15/10/2026,
 * option 1 ; modèle de la landing Catalogue, PR #82 fusionnée le 10/10/2026).
 *
 * Deux parcours, deux contrats distincts :
 *
 * - « envoi du PDF » (`Step3Results.tsx`) : le PDF est produit et téléchargé
 *   par le navigateur ; la route envoie l'analyse par e-mail au prospect, et
 *   — nouveau le 15/10/2026 — une notification interne pour que ce lead reste
 *   suivi à la main. Avant cette date, sa seule trace était l'affaire
 *   Pipedrive : sans elle et sans notification, le lead devenait silencieux.
 *   La notification porte le sort de l'e-mail d'analyse, comme dans #82.
 *
 * - « être recontacté » (`MachineRecommendation.tsx`, `contactRequest: true`) :
 *   la notification interne est la demande elle-même. Aucun e-mail d'analyse.
 *
 * Trois issues communes :
 * - 503 si l'envoi n'est pas configuré : rien n'est tenté, rien n'est promis ;
 * - 500 si aucune trace n'a été acceptée par Resend, le visiteur pouvant
 *   réessayer ;
 * - 200 dès qu'une trace existe. Le corps dit laquelle (`emailSent`,
 *   `leadRecorded`) : un échec partiel n'est ni masqué, ni présenté comme un
 *   succès complet.
 *
 * « Accepté par Resend » (absence d'erreur et identifiant non vide) ne prouve ni
 * la remise en boîte de réception, ni la lecture. Aucun identifiant interne
 * n'est renvoyé au navigateur.
 */

/** Suivi manuel : destinataires de la trace commerciale, inchangés. */
const DESTINATAIRES_INTERNES = ['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'];

/**
 * Freins anti-abus (P0 sécurité, G5 du 11/10/2026) : la route envoie un e-mail à
 * l'adresse saisie. Compteurs en mémoire de l'instance (`lib/rate-limit.ts`),
 * non partagés entre instances Vercel : un frein, pas une limitation
 * distribuée. La clé IP est le premier `x-forwarded-for`, que Vercel réécrit
 * avec l'adresse qui se connecte à lui : derrière le Worker, une adresse
 * Cloudflare que plusieurs visiteurs peuvent partager (S5 M18) : seuil large, et
 * limite par destinataire indépendante des en-têtes.
 */
const LIMITE_PAR_IP_HEURE = 10;
const LIMITE_PAR_DESTINATAIRE_HEURE = 3;

/**
 * Déduplication des demandes identiques (double clic sur « recevoir par
 * e-mail », nouvel essai immédiat), sur le modèle du registre d'idempotence de
 * `lib/catalogue/gestionnaire.ts`. Les appelants n'envoient pas d'identifiant
 * de requête : la clé est le destinataire, le parcours et une empreinte du
 * corps validé, de sorte qu'une demande modifiée reste une nouvelle demande.
 * Seul un résultat accepté est mémorisé : un échec peut être retenté aussitôt.
 *
 * Registre en mémoire de l'instance : deux instances dédoublonnent séparément.
 */
const DUREE_IDEMPOTENCE_MS = 15 * 60 * 1000;
const TAILLE_MAX_IDEMPOTENCE = 2000;

/** Journal sans donnée personnelle ni secret. */
function journal(evenement: string, details: Record<string, string> = {}) {
  console.warn(`[api/roi-pdf] ${evenement}`, details);
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

type CalculatorData = RoiPdfRequest['calculatorData'];

/**
 * Lignes d'attribution de la demande. Copie locale de l'utilitaire de
 * `lib/pipedrive.ts` : cette route n'a plus de dépendance au module CRM, qui
 * reste en place pour `/api/roi-lead`. `app/api/contact/route.ts` a de même sa
 * propre copie depuis l'origine.
 */
function formatAttributionLines(attribution: RoiPdfRequest['attribution']): string[] {
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

/**
 * Données utiles au rappel commercial, telles qu'elles étaient portées par la
 * note Pipedrive : entrées du calculateur, machine recommandée et résultats.
 * Elles alimentent désormais la notification interne. Aucune promesse nouvelle
 * n'est faite au visiteur : ce contenu ne lui est pas adressé.
 */
function lignesResumeRoi(calculatorData: CalculatorData, machineNom: string): string[] {
  const mode = calculatorData.isLeasing ? 'Leasing' : 'Achat';

  const lignes = [
    `--- ENTRÉES ---`,
    `Opérateurs : ${calculatorData.nbOperateurs}`,
    `Temps photo : ${calculatorData.pourcentageTemps}%`,
    `Photos/an : ${calculatorData.photosAnnuelles.toLocaleString('fr-FR')}`,
    `Taille produits : ${calculatorData.tailleProduitsCategory}`,
    `Types contenu : ${calculatorData.typesContenu.join(', ')}`,
    `Mode : ${mode}`,
  ];

  if (calculatorData.investissementInitialActif && calculatorData.montantInvestissementInitial) {
    lignes.push(`Investissement initial envisagé : ${calculatorData.montantInvestissementInitial.toLocaleString('fr-FR')}€`);
  }

  if (calculatorData.montantAccessoires) {
    lignes.push(`Accessoires complémentaires : ${calculatorData.montantAccessoires.toLocaleString('fr-FR')}€`);
  }

  if (calculatorData.isLeasing && calculatorData.leasingMensualite) {
    lignes.push(`Mensualité leasing : ${calculatorData.leasingMensualite}€/mois`);
    lignes.push(`Durée leasing : ${calculatorData.leasingNbMois} mois`);
  }

  lignes.push(
    `--- MACHINE RECOMMANDÉE ---`,
    `${machineNom}`,
    `--- RÉSULTATS ROI ---`,
    `Rentable : ${calculatorData.isRentable ? 'Oui' : 'Non'}`,
    `Économie directe annuelle (cash) : ${calculatorData.economieAnnuelle.toLocaleString('fr-FR')}€`,
    ...(calculatorData.tempsLibereJours != null
      ? [`Temps interne libéré : ${calculatorData.tempsLibereJours.toLocaleString('fr-FR')} jours/an (≈ ${(calculatorData.valeurTempsLibere ?? 0).toLocaleString('fr-FR')}€/an)`]
      : []),
    `ROI (durée d'analyse) : ${calculatorData.roi5ans.toLocaleString('fr-FR')}%`,
    `Économie nette cumulée : ${calculatorData.economie5ans.toLocaleString('fr-FR')}€`,
    `Break-even : ${calculatorData.breakEvenMois ? `${calculatorData.breakEvenMois} mois` : 'N/A'}`,
    `Coût actuel/an : ${calculatorData.coutTotalActuel.toLocaleString('fr-FR')}€`,
    `Coût machine/an : ${calculatorData.coutTotalMachine.toLocaleString('fr-FR')}€`
  );

  return lignes;
}

/**
 * Notification interne des deux parcours. `analyseEnvoyee` vaut `null` pour
 * « être recontacté » (aucun e-mail d'analyse n'est prévu) : l'équipe lit alors
 * la demande de rappel, pas un sort d'envoi.
 */
function notificationHtml(params: {
  machineHtml: string;
  email?: string;
  phone?: string;
  company?: string;
  contactRequest: boolean;
  analyseEnvoyee: boolean | null;
  resume: string[];
  attribution: string[];
  maintenant: Date;
}): string {
  const titre = params.contactRequest
    ? 'Nouvelle demande de contact - Calculateur ROI'
    : 'Analyse ROI demandée - suivi commercial';
  const dateStr = params.maintenant.toLocaleDateString('fr-FR');
  const timeStr = params.maintenant.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const petit = 'color: #888; font-size: 12px;';

  return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #7C6BF0; padding: 20px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">${titre}</h1>
            </div>
            <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
              <p><strong>Machine recommandée :</strong> ${params.machineHtml}</p>
              <p><strong>Date/Heure :</strong> ${dateStr} à ${timeStr}</p>
              ${params.analyseEnvoyee === null
                ? ''
                : `<p><strong>Analyse ROI envoyée au prospect :</strong> ${params.analyseEnvoyee ? 'Oui' : 'Non (échec de l’envoi)'}</p>`}
              <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
              <h3 style="margin-top: 0;">Coordonnées</h3>
              ${params.email ? `<p><strong>Email :</strong> ${echapperHtml(params.email)}</p>` : ''}
              ${params.phone ? `<p><strong>Téléphone :</strong> ${echapperHtml(params.phone)}</p>` : ''}
              ${params.company ? `<p><strong>Société :</strong> ${echapperHtml(params.company)}</p>` : ''}
              ${!params.email && !params.phone && !params.company ? '<p><em>Aucune coordonnée fournie</em></p>' : ''}
              ${params.resume.length > 0
                ? `<hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" /><p style="${petit}">${params.resume.map((l) => echapperHtml(l)).join('<br/>')}</p>`
                : ''}
              ${params.attribution.map((line) => `<p style="${petit}">${echapperHtml(line)}</p>`).join('')}
            </div>
          </div>
        `;
}

// ── Traitement ────────────────────────────────────────────────

async function traiter(donnees: RoiPdfRequest, resend: Resend): Promise<Resultat> {
  const { email, phone, company, contactRequest, calculatorData, locale, attribution } = donnees;
  // Nom tiré du catalogue du calculateur, jamais du navigateur.
  const machineNom = nomMachineRoi(calculatorData.machineId);
  const machineHtml = echapperHtml(machineNom);
  const contexte = { mode: contactRequest ? 'recontact' : 'pdf', locale };

  // 1. Analyse ROI au prospect : seulement sur le parcours « envoi du PDF »,
  // et seulement si une adresse a été laissée (le schéma accepte un téléphone
  // seul). « Non tentée » et « échouée » ne se confondent pas.
  const analysePrevue = !!email && !contactRequest;
  let emailAccepte = false;
  if (analysePrevue && email) {
    const subject = locale === 'fr'
      ? `Votre analyse ROI PackshotCreator - ${machineNom}`
      : `Your PackshotCreator ROI Analysis - ${machineNom}`;

    const htmlContent = locale === 'fr'
      ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Votre analyse ROI personnalisée</p>
            </div>
            <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
              <p>Bonjour,</p>
              <p>Merci d'avoir utilisé notre calculateur ROI pour le studio <strong>${machineHtml}</strong>.</p>
              <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Résumé</h3>
                ${calculatorData.economieAnnuelle > 0 ? `<p>💰 Économie directe annuelle estimée : <strong>${Math.round(calculatorData.economieAnnuelle).toLocaleString('fr-FR')}€</strong></p>` : ''}
                ${calculatorData.tempsLibereJours ? `<p>🕐 Temps interne libéré : <strong>${calculatorData.tempsLibereJours.toLocaleString('fr-FR')} jours/an</strong></p>` : ''}
                ${calculatorData.economieAnnuelle > 0 ? `<p>📈 ROI estimé : <strong>${Math.round(calculatorData.roi5ans).toLocaleString('fr-FR')}%</strong></p>` : ''}
                ${calculatorData.breakEvenMois ? `<p>⏱ Retour sur investissement en <strong>${calculatorData.breakEvenMois} mois</strong></p>` : ''}
              </div>
              <p>Pour aller plus loin, notre équipe se tient à votre disposition.</p>
              <a href="mailto:sebastien.jourdan@sysnext.com?subject=Calculateur%20ROI%20PackshotCreator%20-%20Demande%20de%20contact&body=Bonjour%2C%0A%0AJ%27ai%20utilis%C3%A9%20le%20calculateur%20ROI%20et%20souhaite%20%C3%AAtre%20recontact%C3%A9.%0A%0ACordialement" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 10px;">Être recontacté</a>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">PackshotCreator by Sysnext — www.packshot-creator.com</p>
            </div>
          </div>
        `
      : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #7C6BF0; padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">PackshotCreator</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Your personalized ROI analysis</p>
            </div>
            <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
              <p>Hello,</p>
              <p>Thank you for using our ROI calculator for the <strong>${machineHtml}</strong> studio.</p>
              <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Summary</h3>
                ${calculatorData.economieAnnuelle > 0 ? `<p>💰 Estimated direct annual savings: <strong>€${Math.round(calculatorData.economieAnnuelle).toLocaleString('en-US')}</strong></p>` : ''}
                ${calculatorData.tempsLibereJours ? `<p>🕐 In-house time freed up: <strong>${calculatorData.tempsLibereJours.toLocaleString('en-US')} days/year</strong></p>` : ''}
                ${calculatorData.economieAnnuelle > 0 ? `<p>📈 Estimated ROI: <strong>${Math.round(calculatorData.roi5ans).toLocaleString('en-US')}%</strong></p>` : ''}
                ${calculatorData.breakEvenMois ? `<p>⏱ Break-even in <strong>${calculatorData.breakEvenMois} months</strong></p>` : ''}
              </div>
              <p>To take the next step, our team is at your disposal.</p>
              <a href="mailto:sebastien.jourdan@sysnext.com?subject=PackshotCreator%20ROI%20Calculator%20-%20Contact%20request&body=Hello%2C%0A%0AI%20used%20the%20ROI%20calculator%20and%20would%20like%20to%20be%20contacted.%0A%0ABest%20regards" style="display: inline-block; background: #7C6BF0; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 10px;">Get in touch</a>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">PackshotCreator by Sysnext — www.packshot-creator.com</p>
            </div>
          </div>
        `;

    try {
      const emailResult = await resend.emails.send({
        from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
        to: [email],
        subject,
        html: htmlContent,
      });
      emailAccepte = envoiAccepte(emailResult);
    } catch {
      emailAccepte = false;
    }
    if (!emailAccepte) journal('courriel_pdf.non_accepte', contexte);
  }

  // 2. Notification interne : trace commerciale des deux parcours. Elle part
  // après l'e-mail d'analyse, pour pouvoir en indiquer le sort (modèle #82).
  let notificationAcceptee = false;
  try {
    const envoi = await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: DESTINATAIRES_INTERNES,
      subject: contactRequest
        ? `[ROI Calculator] Nouvelle demande de contact - ${machineNom}`
        : `[ROI Calculator] Analyse ROI - ${machineNom}`,
      html: notificationHtml({
        machineHtml,
        email,
        phone,
        company,
        contactRequest: contactRequest === true,
        analyseEnvoyee: analysePrevue ? emailAccepte : null,
        resume: contactRequest ? [] : lignesResumeRoi(calculatorData, machineNom),
        attribution: formatAttributionLines(attribution),
        maintenant: new Date(),
      }),
    });
    notificationAcceptee = envoiAccepte(envoi);
  } catch {
    notificationAcceptee = false;
  }
  if (!notificationAcceptee) journal('notification.non_acceptee', contexte);

  // « Être recontacté » : la notification EST la demande. Sans elle, rien n'a
  // été enregistré, et l'appelant affiche son message d'erreur.
  if (contactRequest && !notificationAcceptee) {
    journal('aucune_trace', contexte);
    return { status: 500, body: { error: 'Request not recorded' } };
  }

  // Envoi du PDF : aucune des deux traces acceptées, donc aucune trace.
  if (!contactRequest && !emailAccepte && !notificationAcceptee) {
    journal('aucune_trace', contexte);
    return { status: 500, body: { error: 'Request not recorded' } };
  }

  // Échec partiel déclaré tel quel, sans faux succès.
  return {
    status: 200,
    body: { success: true, emailSent: emailAccepte, leadRecorded: notificationAcceptee },
  };
}

// ── Main handler ──────────────────────────────────────────────

/**
 * P0 sécurité (G5, arbitrage L09) : corps validé au runtime, machine en liste
 * fermée et nom tiré du catalogue, échappement, champ piège, limites, journal
 * sans donnée personnelle. Ces freins sont inchangés depuis le 11/10/2026 ;
 * seul le traitement commercial a changé (notification interne, sans CRM).
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const limiteIp = rateLimit(`roi-pdf:ip:${ip}`, LIMITE_PAR_IP_HEURE);
    if (!limiteIp.ok) {
      journal('limite.ip');
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(limiteIp.resetInSec) } }
      );
    }

    let brut: unknown;
    try {
      brut = await request.json();
    } catch {
      return NextResponse.json({ error: 'Validation error' }, { status: 400 });
    }
    const parsed = roiPdfRequestSchema.safeParse(brut);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues.map((i) => ({ path: i.path, code: i.code })) },
        { status: 400 }
      );
    }
    const donnees = parsed.data;

    if (donnees.siteWeb) {
      journal('piege');
      return NextResponse.json({ error: 'Validation error' }, { status: 400 });
    }

    const destinataire = (donnees.email ?? donnees.phone ?? '').toLowerCase();
    const limiteDestinataire = rateLimit(`roi-pdf:dest:${destinataire}`, LIMITE_PAR_DESTINATAIRE_HEURE);
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
      journal('configuration.absente', { mode: donnees.contactRequest ? 'recontact' : 'pdf', locale: donnees.locale });
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Déduplication : un double clic ou un nouvel essai à l'identique ne
    // renvoie aucun e-mail et rend le premier résultat.
    const instant = Date.now();
    purger(instant);
    const mode = donnees.contactRequest ? 'recontact' : 'pdf';
    const cle = `${mode}:${destinataire}:${empreinte(JSON.stringify(donnees))}`;
    const existante = enCours.get(cle);
    if (existante) {
      const memorise = await existante.resultat;
      journal('demande.dupliquee', { mode, locale: donnees.locale });
      return NextResponse.json(memorise.body, { status: memorise.status });
    }

    const resultat = traiter(donnees, resend).catch((): Resultat => {
      journal('erreur_interne');
      return { status: 500, body: { error: 'Internal server error' } };
    });
    enCours.set(cle, { expire: instant + DUREE_IDEMPOTENCE_MS, resultat });
    const fin = await resultat;
    if (fin.status !== 200) enCours.delete(cle);
    return NextResponse.json(fin.body, { status: fin.status });
  } catch {
    journal('erreur_interne');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
