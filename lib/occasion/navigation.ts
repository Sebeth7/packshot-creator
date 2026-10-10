/**
 * Lien texte « Offres d'occasion » : seuls emplacements autorisés, le menu haut
 * (sous Solutions > Studios, desktop et mobile) et la colonne des studios du pied
 * de page (mission du 10/10/2026). Aucun bouton, bloc ni CTA ailleurs : la page
 * vise un public à intention occasion, distinct des leads du neuf.
 *
 * Affiché seulement si `liensOccasionServis()` (lib/occasion/activation.ts), en FR.
 */
export const LIEN_OCCASION = {
  href: '/studios-photo-automatises/opportunites',
  libelle: "Offres d'occasion",
} as const;
