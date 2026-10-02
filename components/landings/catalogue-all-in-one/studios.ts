/**
 * Frise « Une gamme, de multiples possibilités » (V4 du 02/10/2026).
 *
 * Source de vérité : MACHINES (calculateur ROI) pour les noms et les familles,
 * getMachineImage() pour les images. Aucun chemin construit à partir d'un id
 * (lib/machine-images.ts : les fichiers ne suivent pas les ids).
 *
 * Les références du site ne sont pas présentées comme les systèmes du catalogue
 * PDF : la frise montre des studios de la gamme, sans prix ni chiffre de cadence.
 */
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import type { Machine, ProductSizeCategory } from '@/components/calculators/ROICalculator/lib/types';
import { getMachineImage } from '@/lib/machine-images';

/**
 * Références au catalogue retirées de la frise, avec leur motif. Une entrée retirée
 * ici reste au catalogue du site : seule la frise est concernée.
 */
export const EXCLUSIONS_FRISE: Readonly<Record<string, string>> = {
  // Seule image disponible : photo d'ambiance sur fond sombre, incohérente avec les
  // rendus détourés sur fond blanc des autres studios. Tenue à l'écart aussi pour ne
  // pas juxtaposer XL G2 et XL Pro v2 comme des équivalents (D29).
  'alphashot-xl-g2': 'photo d’ambiance sombre, D29',
  // Images disponibles : vues d'ensemble avec une personne.
  'alphastudio-xxl-v2': 'aucune vue d’ensemble sans personne',
  'fashion-studio-basic': 'aucune vue d’ensemble sans personne',
  'fashion-studio': 'aucune vue d’ensemble sans personne',
};

const FAMILLE_TAILLE: Record<ProductSizeCategory, string> = {
  petit: 'Petits produits',
  moyen: 'Produits moyens',
  grand: 'Grands produits',
  'tres-grand': 'Très grands produits',
};

const ORDRE_TAILLE: ProductSizeCategory[] = ['petit', 'moyen', 'grand', 'tres-grand'];

/** Famille d'usage tirée des données de la machine, sans chiffre. */
export function familleStudio(machine: Pick<Machine, 'tailleCategories' | 'features'>): string {
  if (machine.features.includes('flat-lay')) return 'Prise de vue à plat';
  const tailles = ORDRE_TAILLE.filter((t) => machine.tailleCategories.includes(t));
  if (tailles.length === 0) return '';
  if (tailles.length === 1) return FAMILLE_TAILLE[tailles[0]];
  const premiere = FAMILLE_TAILLE[tailles[0]];
  const derniere = FAMILLE_TAILLE[tailles[tailles.length - 1]].toLowerCase();
  return `${premiere} à ${derniere}`;
}

export type StudioFrise = {
  id: string;
  nom: string;
  famille: string;
  image: string;
};

/** Studios de la frise, dans l'ordre de MACHINES (du plus petit au plus grand). */
export function studiosGamme(): StudioFrise[] {
  return MACHINES.filter((m) => !m.delisted && !(m.id in EXCLUSIONS_FRISE)).map((m) => ({
    id: m.id,
    nom: m.nom,
    famille: familleStudio(m),
    image: getMachineImage(m.id),
  }));
}
