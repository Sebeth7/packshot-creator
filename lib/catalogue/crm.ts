import type { DemandeCatalogue } from './schema';

/**
 * Trace CRM des demandes de catalogue — V1 technique (mission du 06/10/2026).
 *
 * Une demande de brochure n'est pas un lead commercial qualifié :
 * - personne Pipedrive retrouvée par e-mail, sinon créée ;
 * - organisation retrouvée par nom exact, sinon créée ;
 * - une note « Demande de catalogue » rattachée à la personne et à
 *   l'organisation : c'est la trace durable, et elle porte le requestId qui
 *   permet de reconnaître une demande rejouée.
 *
 * Aucune affaire n'est créée, ni pour une simple demande, ni pour une demande
 * de consultant : l'objet définitif (Lead ou Deal, pipeline, étape) reste à
 * arbitrer par Sébastien. L'étape ROI de `lib/pipedrive.ts` et l'étape
 * « R0 - Nouvelles demandes » de `/api/contact` ne sont pas réutilisées. La
 * demande de consultant est signalée dans la note et par une notification
 * interne (`lib/catalogue/resend.ts`).
 */
export const ETAPE_PIPEDRIVE_CATALOGUE: number | null = null;

export function regleCrmCatalogue(demande: DemandeCatalogue): {
  synchroniserContact: true;
  creerAffaire: false;
  signalerConsultant: boolean;
} {
  return { synchroniserContact: true, creerAffaire: false, signalerConsultant: demande.consultantOptIn };
}

/** Ce que la route a réellement obtenu, consigné dans la note après coup. */
export interface SuiviCatalogue {
  emailSent: boolean;
  consultant: 'non_demande' | 'transmis' | 'non_transmis';
}

const SUIVI_EMAIL = { true: 'confirmé', false: 'non confirmé' } as const;
const SUIVI_CONSULTANT = {
  non_demande: 'non demandé',
  transmis: 'notification interne transmise',
  non_transmis: 'notification interne NON transmise',
} as const;

/** Lignes de la note : intention, consultant, pays, attribution, date, identifiant. Aucun consentement marketing. */
export function lignesNoteCrm(demande: DemandeCatalogue): string[] {
  const a = demande.attribution;
  return [
    'Demande de catalogue (brochure) : catalogue Orbitvu All-in-One',
    "Intention : catalogue_download. Ce n'est pas une demande de démonstration.",
    demande.consultantOptIn
      ? 'Demande de consultant : OUI, le visiteur demande à être contacté.'
      : 'Demande de consultant : non. Pas d’appel sur la seule base de cette demande.',
    `Pays : ${demande.country === 'FR' ? 'France' : 'Suisse'}`,
    `Entreprise : ${demande.company}`,
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
  return `Suivi : lien par e-mail ${SUIVI_EMAIL[`${suivi.emailSent}`]} ; consultant ${SUIVI_CONSULTANT[suivi.consultant]}`;
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

/** Relit le suivi consigné dans une note existante (demande rejouée). */
export function lireSuiviNote(contenu: string): SuiviCatalogue | null {
  const email = /lien par e-mail (confirmé|non confirmé)/.exec(contenu)?.[1];
  const consultant = /consultant (non demandé|notification interne transmise|notification interne NON transmise)/.exec(contenu)?.[1];
  if (!email || !consultant) return null;
  return {
    emailSent: email === 'confirmé',
    consultant:
      consultant === SUIVI_CONSULTANT.transmis ? 'transmis' : consultant === SUIVI_CONSULTANT.non_demande ? 'non_demande' : 'non_transmis',
  };
}
