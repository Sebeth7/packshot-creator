/**
 * Offre officielle actuelle d'Orbitvu (arbitrage L05, G5 du 11/10/2026).
 *
 * Fait métier de Laurent du 11/10/2026 : PSC commercialise toute l'offre
 * présentée sur les sites officiels actuels d'Orbitvu. Cela ne prouve ni stock,
 * ni délai, ni prix, ni l'offre des versions historiques absentes.
 *
 * Fiches du site hors de cette offre : menu « Products » et sitemap
 * d'orbitvu.com relevés le 11/10/2026 (14 produits : Micro Pro v2, Pro G2, 360,
 * Compact, XL, XL G2, XXL, Fashion, Bike, E-Comm Studio+, Furniture, Alphatable,
 * Alphadesk, 360 Turntables). Ces fiches restent servies, mais leur balisage ne
 * déclare aucune offre (`Offer`).
 * - `alphashot-g2` : aucune source fabricant d'un produit distinct du Pro G2 (SB1) ;
 * - `alphashot-xl-v2` : configuration de base XL v2 [234H9], absente du site
 *   fabricant (la page « Alphashot XL » décrit la configuration Pro v2, 137 kg) ;
 * - `alphashot-xl-wine-v2` : absente du site fabricant.
 */
export const IDS_HORS_OFFRE_OFFICIELLE: readonly string[] = ['alphashot-g2', 'alphashot-xl-v2', 'alphashot-xl-wine-v2'];

export function estDansOffreOfficielle(id: string): boolean {
  return !IDS_HORS_OFFRE_OFFICIELLE.includes(id);
}
