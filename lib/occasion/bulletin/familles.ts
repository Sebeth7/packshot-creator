import { FICHES_TECHNIQUES } from '@/data/produits/fiches-techniques';
import type { MachineOccasion } from '@/data/occasion/machines';
import { FAMILLES, type Famille } from '../formulaires';

/**
 * Famille de chaque modèle du référentiel produit (D45), pour adresser un bulletin
 * aux inscrits de la famille concernée. Les familles sont celles du formulaire
 * d'inscription (`FAMILLES`).
 *
 * `null` : modèle hors des quatre familles du formulaire. Sa machine n'est
 * annoncée qu'aux inscrits « toutes les familles ». Tout modèle ajouté au
 * référentiel doit être classé ici (test `bulletin.test.ts`).
 */
export const FAMILLE_PAR_MODELE: Readonly<Record<string, Famille | null>> = {
  'alphashot-micro-v2': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-360': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-xl-g2': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-pro-g2': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-xl-v2': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-xl-wine-v2': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-xl-pro-v2': 'Alphashot (Micro, 360, Pro, XL)',
  'alphashot-g2': 'Alphashot (Micro, 360, Pro, XL)',
  alphadesk: 'Alphatable / Alphadesk',
  alphatable: 'Alphatable / Alphadesk',
  'alphastudio-compact-v2': 'Alphastudio (Compact, XXL)',
  'alphastudio-xxl-v2': 'Alphastudio (Compact, XXL)',
  'fashion-studio-basic': 'Studios spécialisés (mode, mobilier, vélo)',
  'fashion-studio': 'Studios spécialisés (mode, mobilier, vélo)',
  'bike-studio': 'Studios spécialisés (mode, mobilier, vélo)',
  'furniture-studio': 'Studios spécialisés (mode, mobilier, vélo)',
  'e-comm-studio-plus': null,
};

/** Famille d'une machine ; `null` si son modèle n'appartient à aucune famille du formulaire. */
export function familleMachine(m: Pick<MachineOccasion, 'modeleId'>): Famille | null {
  return FAMILLE_PAR_MODELE[m.modeleId] ?? null;
}

/** Modèles du référentiel non classés : doit rester vide. */
export function modelesNonClasses(): string[] {
  return FICHES_TECHNIQUES.map((f) => f.id).filter((id) => !(id in FAMILLE_PAR_MODELE));
}

/** Valeur de famille d'un inscrit : « » (toutes) ou une famille du formulaire. */
export function estFamilleInscrit(valeur: string): valeur is Famille | '' {
  return valeur === '' || (FAMILLES as readonly string[]).includes(valeur);
}
