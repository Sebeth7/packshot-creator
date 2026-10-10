import { BROCHURE_ID, LANGUE_CATALOGUE, type DemandeCatalogue } from './schema';

/**
 * Fiche d'une demande de catalogue, portée par la notification interne
 * (`resend.ts`).
 *
 * Une demande de brochure est un LEAD BROCHURE (fait métier de Laurent du
 * 06/10/2026) : ni une demande de démonstration, ni une affaire qualifiée.
 * Décision de Sébastien du 09/10/2026 : aucun CRM dans ce parcours. La
 * notification interne est la trace de la demande ; son tri vers le CRM se fait
 * hors du site, par l'assistant IA de Sébastien. D'où une ligne « Clé : valeur »
 * par information, lisible par une personne comme par un programme.
 * Aucune consigne d'appel ni d'interdiction d'appel.
 */

/**
 * Domaines grand public : acceptés (jamais bloqués), seulement signalés dans la
 * fiche (règles brochure de Sébastien, § 4).
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

/** Lignes de la fiche : type, consultant, brochure, pays, origine, attribution, date, identifiant. */
export function lignesFicheCatalogue(demande: DemandeCatalogue): string[] {
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
    demande.origine ? `Origine : ${demande.origine}` : null,
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

/** Ligne de suivi : l'e-mail du lien est-il parti ? Sinon, l'équipe le renvoie. */
export function ligneEnvoiLien(emailSent: boolean): string {
  return emailSent
    ? 'Lien du catalogue envoyé au prospect : confirmé par Resend.'
    : 'Lien du catalogue envoyé au prospect : NON confirmé, à renvoyer.';
}
