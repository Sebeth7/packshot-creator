import type { DemandeCatalogue } from './schema';

/**
 * Règle CRM proposée pour les demandes de catalogue — PROPOSITION À ARBITRER
 * PAR SÉBASTIEN, non branchée (aucun appel Pipedrive dans ce chantier).
 *
 * - Chaque demande acceptée : personne et organisation rapprochées, note
 *   d'intention « catalogue_download ».
 * - Affaire créée uniquement si le visiteur a demandé un consultant.
 * - Étape du pipeline : à fixer par Sébastien. L'étape ROI de `lib/pipedrive.ts`
 *   et l'étape « R0 - Nouvelles demandes » de `/api/contact` ne sont pas
 *   réutilisées par défaut.
 */
export const ETAPE_PIPEDRIVE_CATALOGUE: number | null = null;

export function regleCrmCatalogue(demande: DemandeCatalogue): { synchroniserContact: true; creerAffaire: boolean } {
  return { synchroniserContact: true, creerAffaire: demande.consultantOptIn };
}

/** Note CRM : intention, pays, produits, consultant, attribution. Aucun consentement marketing. */
export function noteCrmCatalogue(demande: DemandeCatalogue): string {
  const a = demande.attribution;
  return [
    'Intention : catalogue_download (catalogue Orbitvu All-in-One)',
    `Pays : ${demande.country === 'FR' ? 'France' : 'Suisse'}`,
    `Entreprise : ${demande.company}`,
    demande.products ? `Produits : ${demande.products}` : null,
    `Demande de consultant : ${demande.consultantOptIn ? 'oui' : 'non'}`,
    `Page : ${demande.pageSource}`,
    a?.utmSource ? `Source : ${a.utmSource}` : null,
    a?.utmMedium ? `Medium : ${a.utmMedium}` : null,
    a?.utmCampaign ? `Campagne : ${a.utmCampaign}` : null,
    a?.referrer ? `Referrer : ${a.referrer}` : null,
    a?.landingPage ? `Première page : ${a.landingPage}` : null,
    `Reçue le : ${demande.recueLe}`,
    `Identifiant : ${demande.requestId}`,
  ]
    .filter((ligne): ligne is string => ligne !== null)
    .join('\n');
}
