/**
 * Previews internes du dossier AI Act (articles B, C, D) — relecture seulement.
 *
 * Ces pages ne sont ni publiées ni indexées (D41 en vigueur) : contenu lu dans
 * `content/revue-interne/ai-act/`, hors de `content/blog/`, donc absent du
 * sitemap, de la liste du blog, des articles liés et de `lib/content.ts`.
 */
import fs from 'node:fs';
import path from 'node:path';

const DOSSIER = path.join(process.cwd(), 'content/revue-interne/ai-act');

/** Ordre de la navigation interne entre les trois previews. */
export const PREVIEWS = [
  { code: 'B', slug: 'retouche', libelle: 'Retouche IA et photo produit' },
  { code: 'C', slug: 'mannequins', libelle: 'Mannequins virtuels et personnes synthétiques' },
  { code: 'D', slug: 'metadonnees', libelle: 'Métadonnées, marketplaces, IPTC, XMP, C2PA' },
] as const;

export type CodePreview = (typeof PREVIEWS)[number]['code'];

/** Emplacement d'un visuel non encore fourni. */
export interface EmplacementVisuel {
  /** Identifiant affiché : B1, C2, D3… */
  id: string;
  /** `ouverture` : à la place de l'image d'en-tête ; `corps` : marqueur `<figure data-visuel="…">` dans le contenu. */
  emplacement: 'ouverture' | 'corps';
  /** Ratio attendu, par exemple `16:9`. */
  ratio: string;
  /** Ce que le visuel doit montrer. */
  message: string;
  /** Légende prévue, si le texte en appelle une. */
  legende?: string | null;
}

export interface ArticleRevue {
  code: CodePreview;
  /** Segment de route de la preview. */
  slug: string;
  /** Slug proposé pour une éventuelle publication future (non réservé). */
  slugPropose: string;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  /** Statut du texte, affiché dans le bandeau de relecture. */
  statut: string;
  /** Fichier source du texte. */
  source: string;
  content: string;
  faqs: { question: string; answer: string }[];
  /** Origine de chaque question de FAQ (la réécriture du 02/10 n'en contient pas). */
  sourceFaq?: string;
  visuels: EmplacementVisuel[];
  /** Notes de travail de la réécriture (statut, questions pour Sébastien) : HTML, hors du texte de l'article. */
  notesRelecture?: string[];
}

export function lireArticleRevue(slug: string): ArticleRevue | null {
  const fichier = path.join(DOSSIER, `${slug}.json`);
  if (!fs.existsSync(fichier)) return null;
  return JSON.parse(fs.readFileSync(fichier, 'utf8')) as ArticleRevue;
}

function echapper(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Rendu HTML d'un emplacement de visuel du corps (classes globales stylées par revue.module.css). */
export function htmlEmplacement(v: EmplacementVisuel): string {
  const legende = v.legende
    ? `<figcaption class="revue-visuel__legende"><span>Légende prévue :</span> ${echapper(v.legende)}</figcaption>`
    : '';
  return (
    `<figure class="revue-visuel" data-visuel="${echapper(v.id)}">` +
    `<div class="revue-visuel__cadre" style="aspect-ratio:${echapper(v.ratio.replace(':', ' / '))}">` +
    `<p class="revue-visuel__id">Visuel ${echapper(v.id)} à intégrer</p>` +
    `<p class="revue-visuel__message">${echapper(v.message)}</p>` +
    `<p class="revue-visuel__format">${echapper(v.ratio)} · pleine largeur de lecture</p>` +
    `</div>${legende}</figure>`
  );
}

/**
 * Remplace chaque marqueur `<figure data-visuel="X"></figure>` du contenu par
 * son emplacement. Un marqueur sans fiche, ou une fiche `corps` sans marqueur,
 * lève une erreur : le build échoue plutôt que de perdre un emplacement.
 */
export function insererEmplacements(html: string, visuels: EmplacementVisuel[]): string {
  const corps = new Map(visuels.filter((v) => v.emplacement === 'corps').map((v) => [v.id, v]));
  const vus = new Set<string>();
  const sortie = html.replace(/<figure data-visuel="([^"]+)"><\/figure>/g, (_m, id: string) => {
    const v = corps.get(id);
    if (!v) throw new Error(`Marqueur de visuel sans fiche : ${id}`);
    vus.add(id);
    return htmlEmplacement(v);
  });
  for (const id of corps.keys()) {
    if (!vus.has(id)) throw new Error(`Emplacement de visuel sans marqueur dans le contenu : ${id}`);
  }
  return sortie;
}
