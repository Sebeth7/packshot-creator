/**
 * Affichage de la liste d'alerte « prochaines occasions Orbitvu » sur la landing.
 *
 * Publication en deux étapes (décision de Laurent, 16/10/2026) : à l'étape A la
 * landing est publiée avec la recherche seule ; la liste d'alerte reste fermée
 * (`ALERTES_REELLES_AUTORISEES = false`, étape B ultérieure). Une section dont le
 * formulaire aboutirait à un 503 ne doit donc pas être proposée au visiteur.
 *
 * - vue publique (production publiée) : la section d'alerte et le lien qui y
 *   mène n'apparaissent que si la liste est réellement ouverte ;
 * - aperçu interne (Preview, local) : la section reste toujours visible, avec son
 *   avis « fermée » ou « test réel en cours » (bandeau et annotations inchangés).
 *
 * Seul l'affichage change : routes, double opt-in, textes, consentement, registre
 * et verrous des alertes sont intacts. Ouvrir les alertes (étape B) fait
 * réapparaître la section sans autre modification.
 */
export function alertesProposees(alertes: { active: boolean }, apercuInterne: boolean): boolean {
  return apercuInterne || alertes.active;
}
