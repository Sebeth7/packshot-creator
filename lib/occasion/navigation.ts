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
    precision: "Offres d'occasion lorsqu'elles sont disponibles, recherche d'un équipement sur demande et alertes sur les nouvelles offres.",
  },
  'en/second-hand-packshot-photo-studio': {
    surtitre: 'Pre-owned equipment',
    lien: 'Pre-owned Orbitvu studios from PackshotCreator',
    precision: 'Pre-owned offers when available, equipment search on request and alerts on new offers.',
  },
};

/** Articles concernés, sous la forme `langue/slug`. */
export const ARTICLES_MAILLAGE_OCCASION = Object.keys(MAILLAGE_BLOG);

/** Encadré à afficher sous un article, ou `null` si l'article n'est pas concerné. */
export function maillageBlogOccasion(slug: string, langue: string): TexteMaillageBlog | null {
  return MAILLAGE_BLOG[`${langue}/${slug}`] ?? null;
}
