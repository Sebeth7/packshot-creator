import { BROCHURE_ID, LANGUE_CATALOGUE, type DemandeCatalogue } from './schema';

/**
 * Trace CRM des demandes de catalogue — V1 technique (missions du 06/10/2026).
 *
 * Une demande de brochure est un LEAD BROCHURE (fait métier de Laurent du
 * 06/10) : enregistré, identifiable, attribué, compté à part. Ce n'est ni une
 * demande de démonstration, ni une affaire qualifiée :
 * - personne Pipedrive retrouvée par e-mail, sinon créée ;
 * - organisation retrouvée par nom exact, sinon créée ;
 * - une note « [Brochure] » rattachée à la personne et à l'organisation : c'est
 *   la trace durable ; elle porte le requestId qui fait reconnaître une demande
 *   rejouée.
 *
 * Aucune affaire n'est créée, ni pour une simple demande, ni pour une demande
 * de consultant : l'objet définitif (Lead, étiquette, Deal, étape) reste à
 * arbitrer par Sébastien (Q23). L'étape ROI de `lib/pipedrive.ts` et l'étape
 * « R0 - Nouvelles demandes » de `/api/contact` ne sont pas réutilisées.
 * Aucune consigne d'appel ni d'interdiction d'appel n'est codée : l'équipe est
 * prévenue (notification interne) et traite le lead.
 */
export const ETAPE_PIPEDRIVE_CATALOGUE: number | null = null;

export function regleCrmCatalogue(demande: DemandeCatalogue): {
  synchroniserContact: true;
  creerAffaire: false;
  signalerConsultant: boolean;
} {
  return { synchroniserContact: true, creerAffaire: false, signalerConsultant: demande.consultantOptIn };
}

/**
 * Domaines grand public : acceptés (jamais bloqués), seulement signalés dans la
 * note (règles brochure de Sébastien, § 4).
 */
const DOMAINES_GRAND_PUBLIC = new Set([
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'outlook.fr',
  'hotmail.com',
  'hotmail.fr',
  'live.com',
  'live.fr',
  'msn.com',
  'yahoo.com',
  'yahoo.fr',
  'icloud.com',
  'me.com',
  'orange.fr',
  'wanadoo.fr',
  'free.fr',
  'sfr.fr',
  'laposte.net',
  'gmx.ch',
  'gmx.fr',
  'gmx.net',
  'bluewin.ch',
  'proton.me',
  'protonmail.com',
]);

export function domaineGrandPublic(email: string): string | null {
  const domaine = email.split('@')[1]?.trim().toLowerCase() ?? '';
  return DOMAINES_GRAND_PUBLIC.has(domaine) ? domaine : null;
}

/** Ce que la route a réellement obtenu, consigné dans la note après coup. */
export interface SuiviCatalogue {
  emailSent: boolean;
  notification: 'transmise' | 'non_transmise' | 'non_configuree';
  consultant: 'non_demande' | 'transmis' | 'non_transmis';
}

const SUIVI_EMAIL = { true: 'confirmé', false: 'non confirmé' } as const;
const SUIVI_NOTIFICATION = {
  transmise: 'transmise',
  non_transmise: 'NON transmise',
  non_configuree: 'non configurée',
} as const;
const SUIVI_CONSULTANT = {
  non_demande: 'non demandé',
  transmis: 'demande transmise à l’équipe',
  non_transmis: 'demande NON transmise',
} as const;

/** Lignes de la note : type, consultant, brochure, pays, attribution, date, identifiant. */
export function lignesNoteCrm(demande: DemandeCatalogue): string[] {
  const a = demande.attribution;
  const grandPublic = domaineGrandPublic(demande.email);
  return [
    '[Brochure] Demande du catalogue Orbitvu All-in-One',
    "Type : lead brochure. Ni une demande de démonstration, ni une affaire qualifiée.",
    demande.consultantOptIn
      ? 'Demande de consultant : OUI, le prospect demande à être recontacté.'
      : 'Demande de consultant : non.',
    `Brochure : ${BROCHURE_ID} (langue : ${LANGUE_CATALOGUE})`,
    `Pays : ${demande.country === 'FR' ? 'France' : 'Suisse'}`,
    `Entreprise : ${demande.company}`,
    grandPublic ? `E-mail : domaine grand public (${grandPublic})` : null,
    demande.products ? `Produits : ${demande.products}` : null,
    `Page : ${demande.pageSource}`,
    a?.utmSource ? `Source : ${a.utmSource}` : null,
    a?.utmMedium ? `Medium : ${a.utmMedium}` : null,
    a?.utmCampaign ? `Campagne : ${a.utmCampaign}` : null,
    a?.utmTerm ? `Terme : ${a.utmTerm}` : null,
    a?.utmContent ? `Contenu : ${a.utmContent}` : null,
    a?.referrer ? `Referrer : ${a.referrer}` : null,
    a?.landingPage ? `Première page : ${a.landingPage}` : null,
    `Reçue le : ${demande.recueLe}`,
    `Identifiant : ${demande.requestId}`,
  ].filter((ligne): ligne is string => ligne !== null);
}

function ligneSuivi(suivi: SuiviCatalogue): string {
  return [
    `Suivi : lien par e-mail ${SUIVI_EMAIL[`${suivi.emailSent}`]}`,
    `notification interne ${SUIVI_NOTIFICATION[suivi.notification]}`,
    `consultant ${SUIVI_CONSULTANT[suivi.consultant]}`,
  ].join(' ; ');
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Texte brut de la note (notification interne, tests). */
export function noteCrmCatalogue(demande: DemandeCatalogue, suivi?: SuiviCatalogue): string {
  return [...lignesNoteCrm(demande), ...(suivi ? [ligneSuivi(suivi)] : [])].join('\n');
}

/** Note Pipedrive (contenu HTML) : champs saisis échappés, une ligne par information. */
export function noteCrmCatalogueHtml(demande: DemandeCatalogue, suivi?: SuiviCatalogue): string {
  return [...lignesNoteCrm(demande), ...(suivi ? [ligneSuivi(suivi)] : [])].map(echapper).join('<br>');
}

function cle<T extends Record<string, string>>(table: T, valeur: string | undefined): keyof T | undefined {
  return (Object.keys(table) as Array<keyof T>).find((k) => table[k] === valeur);
}

/** Relit le suivi consigné dans une note existante (demande rejouée). */
export function lireSuiviNote(contenu: string): SuiviCatalogue | null {
  const texte = contenu.replace(/&#39;/g, "'").replace(/&rsquo;/g, '’');
  const email = /lien par e-mail (confirmé|non confirmé)/.exec(texte)?.[1];
  const notification = /notification interne (transmise|NON transmise|non configurée)/.exec(texte)?.[1];
  const consultant = /consultant (non demandé|demande transmise à l’équipe|demande NON transmise)/.exec(texte)?.[1];
  const n = cle(SUIVI_NOTIFICATION, notification);
  const c = cle(SUIVI_CONSULTANT, consultant);
  if (!email || !n || !c) return null;
  return { emailSent: email === 'confirmé', notification: n, consultant: c };
}
