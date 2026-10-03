/**
 * Écarts connus entre les deux catalogues de machines, hors dimensions (règle D45).
 *
 * Ces champs sont commerciaux : le test de cohérence ne les force pas à l'égalité,
 * mais il échoue si un écart nouveau apparaît ou si un écart listé ici disparaît sans
 * mise à jour de ce fichier. Chaque entrée renvoie à son point de Q20
 * (`docs/seo-geo/BOITE-AUX-LETTRES.md`). Aucune valeur n'est choisie ici.
 */

export interface EcartConnu {
  id: string;
  champ: 'tailleCategories' | 'capaciteJour';
  selecteur: unknown;
  roi: unknown;
  q20: string;
  note?: string;
}

export const ECARTS_CATALOGUES: readonly EcartConnu[] = [
  { id: 'alphashot-360', champ: 'tailleCategories', selecteur: ['petit', 'moyen'], roi: ['petit'], q20: 'Q20.13' },
  {
    id: 'alphashot-xl-g2', champ: 'tailleCategories', selecteur: ['grand'], roi: ['moyen', 'grand'], q20: 'Q20.13',
    note: 'Côté ROI, choix commercial daté : test « Éligibilité XL G2 en taille moyenne (Seb 07/08) », lib/roiChat/__tests__/publicMode.test.ts',
  },
  { id: 'alphashot-pro-g2', champ: 'tailleCategories', selecteur: ['petit', 'moyen'], roi: ['petit'], q20: 'Q20.13' },
  { id: 'alphashot-xl-v2', champ: 'tailleCategories', selecteur: ['moyen', 'grand'], roi: ['moyen'], q20: 'Q20.13' },
  { id: 'alphashot-xl-pro-v2', champ: 'tailleCategories', selecteur: ['moyen', 'grand'], roi: ['moyen'], q20: 'Q20.13' },
  { id: 'alphadesk', champ: 'capaciteJour', selecteur: 480, roi: 300, q20: 'Q20.14' },
  { id: 'alphatable', champ: 'capaciteJour', selecteur: 500, roi: 300, q20: 'Q20.14' },
  { id: 'furniture-studio', champ: 'capaciteJour', selecteur: 60, roi: 40, q20: 'Q20.14' },
];

/**
 * Clés de messages dont une valeur contredit le référentiel, connues et en attente
 * d'arbitrage. Elles restent affichées telles quelles jusqu'à la réponse de Sébastien.
 */
export const ECARTS_MESSAGES: readonly { cle: string; valeur: string; q20: string; gel?: string }[] = [
  {
    cle: 'packshotEcommerce.r7.rows.furniture.gabarit',
    valeur: 'Plateforme de 1 000 kg, version 4 000 kg',
    q20: 'Q20.1',
    gel: 'F5, jusqu’au 23/11/2026',
  },
];
