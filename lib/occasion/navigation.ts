import type { LangueOccasion } from './langues';

/**
 * Lien texte « Offres d'occasion » : seuls emplacements autorisés (décision de
 * Laurent du 14/10/2026, qui remplace celle du 10/10) :
 * - menu haut, menu déroulant Solutions : en dernier, après la rubrique Guides et
 *   hors de son sous-menu, lien secondaire séparé et discret (desktop et mobile) ;
 *   jamais sous « Studios Photo Automatisés », jamais dans la barre principale ;
 * - pied de page : colonne Solutions, après « Questions clés », une seule fois ;
 *   la colonne des studios ne présente que les modèles neufs.
 * Aucun bouton, bloc ni CTA ailleurs, aucune mise en avant sur les pages des
 * machines neuves : la page vise un public à intention occasion, distinct des
 * leads du neuf.
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
