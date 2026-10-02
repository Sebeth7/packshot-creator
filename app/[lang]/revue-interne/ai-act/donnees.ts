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
  /** Illustration fournie qui remplace le cadre vide (en-tête seulement). */
  illustration?: Illustration;
}

/**
 * Illustration fournie : PNG du ZIP converti en AVIF, servi par la route
 * `visuels/[fichier]` sous la même garde que les pages (jamais dans `public/`).
 */
export interface Illustration {
  /** Identifiant du ZIP : B0, B1, C0, C2, D0. */
  id: string;
  /** Nom de base des fichiers de `content/revue-interne/ai-act/visuels/` : `<fichier>-<largeur>.avif`. */
  fichier: string;
  /** Largeurs disponibles, en pixels, de la plus grande à la plus petite. */
  largeurs: number[];
  /** Dimensions de la plus grande version. */
  largeur: number;
  hauteur: number;
  alt: string;
  /** Légende affichée ; commence par « Illustration générée par IA. ». */
  legende: string;
  /** Statut dans la livraison du 02/10 : « HERO PROPOSÉ », « HERO ALTERNATIF À VALIDER »… */
  statut: string;
  /** Écart au brief ou au texte, affiché dans le bandeau de relecture. */
  ecart?: string;
  provenance: { origine: string; ia: boolean };
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
  /** Illustrations du corps, placées par un marqueur `<figure data-illustration="…"></figure>`. */
  illustrations?: Illustration[];
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

/** Dossier des AVIF des illustrations (hors de `public/`). */
export const DOSSIER_VISUELS = path.join(DOSSIER, 'visuels');

/** Chemin public d'une version de l'illustration, servie par `visuels/[fichier]/route.ts`. */
export function urlIllustration(i: Illustration, largeur: number): string {
  return `/fr/revue-interne/ai-act/visuels/${i.fichier}-${largeur}.avif`;
}

/** `src` (plus petite version) et `srcSet` d'une illustration. */
export function sourcesIllustration(i: Illustration): { src: string; srcSet: string } {
  return {
    src: urlIllustration(i, i.largeurs[i.largeurs.length - 1]),
    srcSet: i.largeurs.map((l) => `${urlIllustration(i, l)} ${l}w`).join(', '),
  };
}

/** Rendu HTML d'une illustration du corps, sur le modèle des figures des articles A et S. */
export function htmlIllustration(i: Illustration): string {
  const { src, srcSet } = sourcesIllustration(i);
  return (
    `<figure class="revue-illustration" data-illustration-revue="${echapper(i.id)}">` +
    `<img src="${echapper(src)}" srcset="${echapper(srcSet)}" sizes="(min-width: 768px) 700px, 100vw" ` +
    `alt="${echapper(i.alt)}" width="${i.largeur}" height="${i.hauteur}" loading="lazy" />` +
    `<figcaption>${echapper(i.legende)}</figcaption></figure>`
  );
}

/**
 * Remplace chaque marqueur `<figure data-illustration="X"></figure>` par l'illustration `X`.
 * Un marqueur sans illustration, ou une illustration sans marqueur, lève une erreur.
 */
export function insererIllustrations(html: string, illustrations: Illustration[] = []): string {
  const parId = new Map(illustrations.map((i) => [i.id, i]));
  const vus = new Set<string>();
  const sortie = html.replace(/<figure data-illustration="([^"]+)"><\/figure>/g, (_m, id: string) => {
    const i = parId.get(id);
    if (!i) throw new Error(`Marqueur d'illustration sans fiche : ${id}`);
    vus.add(id);
    return htmlIllustration(i);
  });
  for (const id of parId.keys()) {
    if (!vus.has(id)) throw new Error(`Illustration sans marqueur dans le contenu : ${id}`);
  }
  return sortie;
}

/** Illustrations d'un article : en-tête puis corps. */
export function illustrationsArticle(article: ArticleRevue): Illustration[] {
  const enTete = article.visuels.flatMap((v) => (v.illustration ? [v.illustration] : []));
  return [...enTete, ...(article.illustrations ?? [])];
}

/** Noms des fichiers AVIF référencés par les trois previews : seuls fichiers servis par la route. */
export function fichiersIllustrations(): string[] {
  return PREVIEWS.flatMap(({ slug }) => {
    const article = lireArticleRevue(slug);
    return article
      ? illustrationsArticle(article).flatMap((i) => i.largeurs.map((l) => `${i.fichier}-${l}.avif`))
      : [];
  });
}

/** Repère laissé dans le HTML à la place d'un marqueur couvert par un module interactif. */
const REPERE_MODULE = /<div data-module-revue="([^"]+)"><\/div>/g;

/**
 * Remplace chaque marqueur `<figure data-visuel="X"></figure>` du contenu :
 * - par un repère de module si `X` a un module interactif (`modules`) ;
 * - sinon par son emplacement de visuel.
 * Un marqueur sans fiche, une fiche `corps` sans marqueur ou un module sans
 * marqueur lève une erreur : le build échoue plutôt que de perdre un visuel.
 */
export function insererEmplacements(
  html: string,
  visuels: EmplacementVisuel[],
  modules: ReadonlySet<string> = new Set(),
): string {
  const corps = new Map(visuels.filter((v) => v.emplacement === 'corps').map((v) => [v.id, v]));
  const vus = new Set<string>();
  const sortie = html.replace(/<figure data-visuel="([^"]+)"><\/figure>/g, (_m, id: string) => {
    const v = corps.get(id);
    if (!v) throw new Error(`Marqueur de visuel sans fiche : ${id}`);
    vus.add(id);
    return modules.has(id) ? `<div data-module-revue="${echapper(id)}"></div>` : htmlEmplacement(v);
  });
  for (const id of corps.keys()) {
    if (!vus.has(id)) throw new Error(`Emplacement de visuel sans marqueur dans le contenu : ${id}`);
  }
  for (const id of modules) {
    if (!vus.has(id)) throw new Error(`Module sans marqueur dans le contenu : ${id}`);
  }
  return sortie;
}

export type SegmentRevue = { type: 'html'; html: string } | { type: 'module'; id: string };

function texteBrut(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, '’')
    .replace(/'/g, '’')
    .replace(/[\s  ]+/g, ' ')
    .trim();
}

/**
 * Découpe le HTML traité aux repères de module. Chaque module doit suivre,
 * sans autre H2 entre les deux, l'intertitre H2 annoncé par son `module.json`
 * (`sections`) : le build échoue sinon.
 */
export function decouperAuxModules(html: string, sections: ReadonlyMap<string, string>): SegmentRevue[] {
  const segments: SegmentRevue[] = [];
  let debut = 0;
  for (const m of html.matchAll(REPERE_MODULE)) {
    const id = m[1];
    const avant = html.slice(0, m.index);
    const h2 = [...avant.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].at(-1);
    const attendu = sections.get(id);
    if (attendu === undefined) throw new Error(`Repère de module inconnu : ${id}`);
    if (!h2 || texteBrut(h2[1]) !== texteBrut(attendu)) {
      throw new Error(`Module ${id} hors de sa section « ${attendu} » (trouvé : « ${h2 ? texteBrut(h2[1]) : 'aucun H2'} »)`);
    }
    segments.push({ type: 'html', html: html.slice(debut, m.index) });
    segments.push({ type: 'module', id });
    debut = (m.index ?? 0) + m[0].length;
  }
  segments.push({ type: 'html', html: html.slice(debut) });
  return segments.filter((s) => s.type === 'module' || s.html.trim() !== '');
}
