/**
 * Nom accessible du repère de navigation du fil d'Ariane des articles de blog.
 *
 * Utilisé par les articles à page dédiée. Le gabarit commun
 * (`app/[lang]/blog/[slug]/page.tsx`) porte encore sa propre copie de ces
 * libellés : il est modifié par une PR ouverte au 08/10/2026, à brancher ici
 * ensuite. Les libellés ne sont pas dans `messages/*.json`, réservés par
 * d'autres PR à la même date.
 */
export const LIBELLE_FIL_ARIANE: Record<string, string> = {
  fr: "Fil d'Ariane",
  en: 'Breadcrumb',
  'de-ch': 'Brotkrümelnavigation',
};

export function libelleFilAriane(lang: string): string {
  return LIBELLE_FIL_ARIANE[lang] ?? LIBELLE_FIL_ARIANE.en;
}
