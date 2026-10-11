import type { LangueOccasion } from './langues';

/**
 * Lien texte « Offres d'occasion » : seuls emplacements autorisés, le menu haut
 * (sous Solutions > Studios, desktop et mobile) et la colonne des studios du pied
 * de page (mission du 10/10/2026). Aucun bouton, bloc ni CTA ailleurs : la page
 * vise un public à intention occasion, distinct des leads du neuf.
 *
 * Affiché seulement si `liensOccasionServis()` (lib/occasion/activation.ts), dans
 * les trois langues (mission finale du 11/10/2026) ; chaque locale pointe vers sa
 * propre page (même chemin, préfixe de la locale).
 */
const LIBELLES: Record<LangueOccasion, string> = {
  fr: "Offres d'occasion",
  en: 'Pre-owned offers',
  'de-ch': 'Occasionen',
};

export const LIEN_OCCASION = {
  href: '/studios-photo-automatises/opportunites',
  libelle: LIBELLES.fr,
} as const;

/** Libellé du lien dans une langue (français par défaut). */
export function libelleLienOccasion(langue: string): string {
  return LIBELLES[langue as LangueOccasion] ?? LIBELLES.fr;
}
