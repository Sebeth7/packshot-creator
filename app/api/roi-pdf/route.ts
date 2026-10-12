import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  findOrCreatePipedrivePerson,
  createPipedriveDealWithNote,
  formatAttributionLines,
} from '@/lib/pipedrive';
import { echapperHtml } from '@/lib/echapper-html';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { roiPdfRequestSchema, nomMachineRoi, type RoiPdfRequest } from '@/lib/roi-pdf-schema';

/**
 * Freins anti-abus (P0 sécurité, G5 du 11/10/2026) : la route envoie un e-mail à
 * l'adresse saisie. Compteurs en mémoire de l'instance (`lib/rate-limit.ts`),
 * non partagés entre instances Vercel : un frein, pas une limitation
 * distribuée. La clé IP dépend du premier `x-forwarded-for`, dont la chaîne de
 * confiance derrière le Worker n'est pas établie (S5 M18) : seuil large, et
 * limite par destinataire indépendante des en-têtes.
 */
const LIMITE_PAR_IP_HEURE = 10;
const LIMITE_PAR_DESTINATAIRE_HEURE = 3;

/** Journal sans donnée personnelle ni secret. */
function journal(evenement: string, details: Record<string, string> = {}) {
  console.warn(`[api/roi-pdf] ${evenement}`, details);
}

/** Resend renvoie `{ data, error }` sans lever : l'envoi n'est accepté que sur un identifiant. */
type ResultatEnvoi = { data?: { id?: string } | null; error?: unknown } | null | undefined;
function envoiAccepte(r: ResultatEnvoi): boolean {
  return !!r && !r.error && typeof r.data?.id === 'string' && r.data.id.length > 0;
}

function creerClientResend(): Resend | null {
  try {
    return new Resend(process.env.RESEND_API_KEY);
  } catch {
    journal('resend.indisponible');
    return null;
  }
}

type CalculatorData = RoiPdfRequest['calculatorData'];

function buildDealNote(
  calculatorData: CalculatorData,
  machineNom: string,
  email: string,
  phone?: string,
  company?: string,
  attribution?: RoiPdfRequest['attribution']
): string {
    const mode = calculatorData.isLeasing ? 'Leasing' : 'Achat';

    const contactLines = [`👤 Contact : ${email}`];
    if (phone) contactLines.push(`📱 Téléphone : ${phone}`);
    if (company) contactLines.push(`🏢 Société : ${company}`);
    contactLines.push(...formatAttributionLines(attribution));

    const noteLines = [
      `📊 Résultats Calculateur ROI`,
      ``,
      ...contactLines,
      `📅 Date : ${new Date().toLocaleDateString('fr-FR')}`,
      ``,
      `--- INPUTS ---`,
      `Opérateurs : ${calculatorData.nbOperateurs}`,
      `Temps photo : ${calculatorData.pourcentageTemps}%`,
      `Photos/an : ${calculatorData.photosAnnuelles.toLocaleString('fr-FR')}`,
      `Taille produits : ${calculatorData.tailleProduitsCategory}`,
      `Types contenu : ${calculatorData.typesContenu.join(', ')}`,
      `Mode : ${mode}`,
    ];

    if (calculatorData.investissementInitialActif && calculatorData.montantInvestissementInitial) {
      noteLines.push(`Investissement initial envisagé : ${calculatorData.montantInvestissementInitial.toLocaleString('fr-FR')}€`);
    }

    if (calculatorData.montantAccessoires) {
      noteLines.push(`Accessoires complémentaires : ${calculatorData.montantAccessoires.toLocaleString('fr-FR')}€`);
    }

    if (calculatorData.isLeasing && calculatorData.leasingMensualite) {
      noteLines.push(`Mensualité leasing : ${calculatorData.leasingMensualite}€/mois`);
      noteLines.push(`Durée leasing : ${calculatorData.leasingNbMois} mois`);
    }

    noteLines.push(
      ``,
      `--- MACHINE RECOMMANDÉE ---`,
      `${machineNom}`,
      ``,
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

    // Le contenu d'une note Pipedrive est du HTML : les valeurs saisies sont échappées.
    return echapperHtml(noteLines.join('\n'));
}

/**
 * Contrat de succès (G5 du 11/10/2026) : `success: true` seulement si la
 * demande a laissé une trace — e-mail du PDF accepté par Resend (envoi du PDF)
 * ou notification interne acceptée (« être recontacté »), OU affaire Pipedrive
 * confirmée. Sinon 502 : le visiteur peut réessayer. Le routage commercial est
 * inchangé (étape « Calculs ROI », notification interne pour le recontact).
 * Aucun identifiant CRM n'est renvoyé au navigateur.
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
    const { email, phone, company, contactRequest, calculatorData, locale, attribution, siteWeb } = parsed.data;

    if (siteWeb) {
      journal('piege');
      return NextResponse.json({ error: 'Validation error' }, { status: 400 });
    }

    const destinataire = (email ?? phone ?? '').toLowerCase();
    const limiteDestinataire = rateLimit(`roi-pdf:dest:${destinataire}`, LIMITE_PAR_DESTINATAIRE_HEURE);
    if (!limiteDestinataire.ok) {
      journal('limite.destinataire');
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(limiteDestinataire.resetInSec) } }
      );
    }

    const resend = creerClientResend();
    const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
    // Nom tiré du catalogue du calculateur, jamais du navigateur.
    const machineNom = nomMachineRoi(calculatorData.machineId);
    const machineHtml = echapperHtml(machineNom);
    const contexte = { mode: contactRequest ? 'recontact' : 'pdf', locale };

    // 1. Send email via Resend (only if user provided an email and not a contact-only request)
    let emailAccepte = false;

    if (email && !contactRequest && resend) {
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

    // 1b. Send notification email to internal team when contact request is made
    let notificationAcceptee = false;
    if (contactRequest && resend) {
      try {
        const now = new Date();
        const dateStr = now.toLocaleDateString('fr-FR');
        const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        const notifHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #7C6BF0; padding: 20px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Nouvelle demande de contact - Calculateur ROI</h1>
            </div>
            <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
              <p><strong>Machine recommandée :</strong> ${machineHtml}</p>
              <p><strong>Date/Heure :</strong> ${dateStr} à ${timeStr}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
              <h3 style="margin-top: 0;">Coordonnées</h3>
              ${email ? `<p><strong>Email :</strong> ${echapperHtml(email)}</p>` : ''}
              ${phone ? `<p><strong>Téléphone :</strong> ${echapperHtml(phone)}</p>` : ''}
              ${company ? `<p><strong>Société :</strong> ${echapperHtml(company)}</p>` : ''}
              ${!email && !phone && !company ? '<p><em>Aucune coordonnée fournie</em></p>' : ''}
            </div>
          </div>
        `;

        const envoi = await resend.emails.send({
          from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
          to: ['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com'],
          subject: `[ROI Calculator] Nouvelle demande de contact - ${machineNom}`,
          html: notifHtml,
        });
        notificationAcceptee = envoiAccepte(envoi);
      } catch {
        notificationAcceptee = false;
      }
      if (!notificationAcceptee) journal('notification.non_acceptee', contexte);
    }

    // 2. Create Pipedrive contact + deal
    let dealId: number | null = null;
    const contactIdentifier = email || phone || 'unknown';

    if (PIPEDRIVE_API_TOKEN) {
      const personId = await findOrCreatePipedrivePerson(PIPEDRIVE_API_TOKEN, { email, phone, company });
      if (personId) {
        dealId = await createPipedriveDealWithNote(PIPEDRIVE_API_TOKEN, {
          personId,
          title: `ROI Calculator - ${machineNom} - ${contactIdentifier}`,
          noteContent: buildDealNote(calculatorData, machineNom, contactIdentifier, phone, company, attribution),
        });
      }
    }
    if (!dealId) journal('pipedrive.sans_affaire', { ...contexte, jeton: PIPEDRIVE_API_TOKEN ? 'present' : 'absent' });

    const traceCourriel = contactRequest ? notificationAcceptee : emailAccepte;
    if (!traceCourriel && !dealId) {
      journal('aucune_trace', contexte);
      return NextResponse.json({ error: 'Request not recorded' }, { status: 502 });
    }

    return NextResponse.json({ success: true, emailSent: emailAccepte });
  } catch {
    journal('erreur_interne');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
