import type { LangueOccasion } from './langues';

/**
 * Lien texte « Matériel d'occasion » : seul emplacement autorisé (décision définitive
 * de Laurent du 16/10/2026, qui remplace celles des 10/10 et 14/10) :
 * - pied de page : colonne Solutions, après « Questions clés », une seule fois ;
 *   la colonne des studios ne présente que les modèles neufs ;
 * - AUCUN lien dans le menu haut, ni dans le menu Solutions, ni dans un sous-menu,
 *   ni sur desktop ni sur mobile.
 * Aucun bouton, bloc ni CTA promotionnel ailleurs, aucune mise en avant sur les pages
 * des machines neuves : la page vise un public à intention occasion, distinct des
 * leads du neuf. La découvrabilité tient au pied de page, au sitemap et aux encadrés
 * éditoriaux des deux articles de blog (ci-dessous). Jamais « reconditionné » ni
 * « refurbished » : il s'agit de matériel d'occasion.
 *
 * Affiché seulement si `liensOccasionServis()` (lib/occasion/activation.ts), dans
 * les trois langues (mission finale du 11/10/2026) ; chaque locale pointe vers sa
 * propre page (même chemin, préfixe de la locale).
 */
const LIBELLES: Record<LangueOccasion, string> = {
  fr: "Matériel d'occasion",
  en: 'Pre-owned equipment',
  'de-ch': 'Occasionsgeräte',
};

export const LIEN_OCCASION = {
  href: '/studios-photo-automatises/opportunites',
  libelle: LIBELLES.fr,
} as const;

/** Libellé du lien dans une langue (français par défaut). */
export function libelleLienOccasion(langue: string): string {
  return LIBELLES[langue as LangueOccasion] ?? LIBELLES.fr;
}

/**
 * Maillage depuis les articles de blog sur l'achat d'occasion (#129, 14/10/2026) :
 * un encadré après l'article, dans sa langue, vers la landing de la même langue.
 * Le texte de l'article, et ses mises en garde sur le matériel ancien, ne sont pas
 * modifiés. Affiché aux mêmes conditions que les liens du menu
 * (`liensOccasionServis()`) : aucun lien public vers un 404 avant la publication.
 * Aucune garantie, remise en état ni disponibilité annoncée.
 */
export interface TexteMaillageBlog {
  surtitre: string;
  lien: string;
  precision: string;
}

const MAILLAGE_BLOG: Record<string, TexteMaillageBlog> = {
  'fr/acheter-studio-photo-packshot-occasion': {
    surtitre: "Matériel d'occasion",
    lien: "Studios Orbitvu d'occasion chez PackshotCreator",
    precision: "Offres d'occasion lorsqu'elles sont disponibles et recherche d'un équipement sur demande.",
  },
  'en/second-hand-packshot-photo-studio': {
    surtitre: 'Pre-owned equipment',
    lien: 'Pre-owned Orbitvu studios from PackshotCreator',
    precision: 'Pre-owned offers when available and equipment search on request.',
  },
};

/** Articles concernés, sous la forme `langue/slug`. */
export const ARTICLES_MAILLAGE_OCCASION = Object.keys(MAILLAGE_BLOG);

/** Encadré à afficher sous un article, ou `null` si l'article n'est pas concerné. */
export function maillageBlogOccasion(slug: string, langue: string): TexteMaillageBlog | null {
  return MAILLAGE_BLOG[`${langue}/${slug}`] ?? null;
}
