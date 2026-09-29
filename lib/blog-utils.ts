/**
 * Utility functions for blog content processing
 */

import {
  DEFAULT_YOUTUBE_LABELS,
  isYouTubeId,
  renderFacade,
  transformYouTubeEmbeds,
  type YouTubeFacadeLabels,
} from './youtube';

export interface HeadingData {
  id: string;
  text: string;
  level: number;
}

/**
 * Generate a URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Embed YouTube : youtube.com ou youtube-nocookie.com, avec ou sans www.
const YOUTUBE_EMBED_SRC = /^(?:https?:)?\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\//i;

/**
 * YouTube identifie le site intégrant par le Referer (erreur 153 sans lui). Le
 * Referrer-Policy servi devant le site (same-origin) le supprime en cross-origin :
 * on envoie l'origin pour les seules iframes d'embed YouTube, comme YouTubeFacade.
 * Une iframe qui porte déjà un referrerpolicy, ou qui n'est pas un embed YouTube,
 * est rendue telle quelle.
 */
export function addYouTubeReferrerPolicy(html: string): string {
  return html.replace(/<iframe\b[^>]*>/gi, (tag) => {
    const src = tag.match(/\ssrc\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!src || !YOUTUBE_EMBED_SRC.test(src)) return tag;
    if (/\sreferrerpolicy\b/i.test(tag)) return tag;
    return tag.replace(/^<iframe\b/i, '<iframe referrerpolicy="strict-origin-when-cross-origin"');
  });
}

// Caractères sans rendu visible : espaces (\s couvre aussi U+00A0 et U+FEFF),
// espaces et liants de largeur nulle (U+200B à U+200D), U+2060.
const INVISIBLE_CHARS = /[\s\u200b\u200c\u200d\u2060]/g;
const INVISIBLE_CODE_POINTS = new Set([0x09, 0x0a, 0x0c, 0x0d, 0x20, 0xa0, 0x200b, 0x200c, 0x200d, 0x2060, 0xfeff]);
// <p> sans attribut, ou avec seulement id="" (export Webflow), sans balise dedans.
const BARE_PARAGRAPH = /<p(?:\s+id\s*=\s*(?:""|''))?\s*>([^<]*)<\/p>/gi;

function isBlank(text: string): boolean {
  const withoutEntities = text.replace(/&(?:nbsp|zwj|zwnj);|&#(\d+);|&#[xX]([0-9a-fA-F]+);/g, (entity, dec?: string, hex?: string) => {
    if (dec === undefined && hex === undefined) return '';
    const codePoint = dec !== undefined ? parseInt(dec, 10) : parseInt(hex as string, 16);
    return INVISIBLE_CODE_POINTS.has(codePoint) ? '' : entity;
  });
  return withoutEntities.replace(INVISIBLE_CHARS, '') === '';
}

/**
 * Les exports Webflow espacent les blocs par des paragraphes vides
 * (`<p id="">\u200d</p>`, un ZWJ seul). Avec les marges de paragraphe du gabarit blog
 * (app/globals.css, .blog-article), ils doubleraient l'espacement : on retire au
 * rendu les seuls <p> sans attribut (ou avec id="" seul), sans balise, dont le
 * contenu n'est fait que d'espaces et de caractères invisibles, bruts ou en
 * entités. Un paragraphe avec une balise (<br>, image, lien, <strong>…), un
 * caractère visible, un id non vide, une classe ou un style est conservé.
 */
export function removeEmptyParagraphs(html: string): string {
  return html.replace(BARE_PARAGRAPH, (paragraph, content: string) => (isBlank(content) ? '' : paragraph));
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0',
};

/**
 * Décode, en un seul passage, les entités HTML d'un texte destiné à React (texte
 * du sommaire) : « Gad &amp; Co » → « Gad & Co ». Entité inconnue ou code
 * invalide : laissés tels quels. « &amp;amp; » donne « &amp; » (un seul décodage).
 */
export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(?:#(\d+)|#[xX]([0-9a-fA-F]+)|([a-zA-Z]+));/g, (entity, dec?: string, hex?: string, name?: string) => {
    if (name !== undefined) return NAMED_ENTITIES[name] ?? entity;
    const codePoint = dec !== undefined ? parseInt(dec, 10) : parseInt(hex as string, 16);
    const valid = codePoint > 0 && codePoint <= 0x10ffff && (codePoint < 0xd800 || codePoint > 0xdfff);
    return valid ? String.fromCodePoint(codePoint) : entity;
  });
}

/** Durée YouTube « 90 », « 90s », « 1m30s », « 1h2m3s » → secondes ; sinon null. */
function parseYouTubeTime(raw: string | null): number | null {
  if (!raw) return null;
  const m = raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/i);
  if (!m) return null;
  const seconds = Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
  return seconds > 0 ? seconds : null;
}

const YOUTU_BE_HOST = /^(?:www\.)?youtu\.be$/i;
const YOUTUBE_HOST = /^(?:[a-z0-9-]+\.)*youtube(?:-nocookie)?\.com$/i;

/**
 * Identifiant et point de départ d'une URL de vidéo YouTube : youtu.be/<id>,
 * youtube.com/watch?v=<id>, youtube.com/embed/<id>. Toute autre URL : null.
 */
export function parseYouTubeUrl(raw: string): { id: string; start: number | null } | null {
  let url: URL;
  try {
    url = new URL(raw.startsWith('//') ? `https:${raw}` : raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  let id: string | null = null;
  if (YOUTU_BE_HOST.test(url.hostname)) id = url.pathname.split('/')[1] ?? null;
  else if (YOUTUBE_HOST.test(url.hostname)) {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else id = url.pathname.match(/^\/embed\/([^/]+)/)?.[1] ?? null;
  }
  if (!isYouTubeId(id)) return null;
  return { id, start: parseYouTubeTime(url.searchParams.get('t') ?? url.searchParams.get('start')) };
}

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

/** Vrai si chaque balise ouverte du fragment y est refermée (hors éléments vides). */
function hasBalancedTags(fragment: string): boolean {
  const open: string[] = [];
  for (const [, closing, name] of fragment.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b(?:[^>"']|"[^"]*"|'[^']*')*>/g)) {
    const tag = name.toLowerCase();
    if (VOID_ELEMENTS.has(tag)) continue;
    if (!closing) open.push(tag);
    else if (open.pop() !== tag) return false;
  }
  return open.length === 0;
}

// Shortcode WordPress `[embed]<URL>[/embed]`, resté en texte brut dans des
// paragraphes des anciens articles Webflow. Un paragraphe ne contient pas d'autre <p>.
const EMBED_SHORTCODE = /\[embed\]\s*([^\s<>[\]]+?)\s*\[\/embed\]/gi;
const PARAGRAPH = /<p\b((?:[^>"']|"[^"]*"|'[^']*')*)>((?:(?!<\/p>)[\s\S])*?)<\/p>/gi;

/**
 * Remplace chaque shortcode `[embed]<URL YouTube>[/embed]` d'un paragraphe par la
 * façade des vidéos YouTube (lib/youtube.ts) : aucune iframe, lecteur créé après
 * accord par components/blog/YouTubeConsent.tsx. Le texte du paragraphe situé
 * avant ou après le shortcode reste dans un paragraphe aux mêmes attributs ; une
 * partie vide n'est pas émise. Un shortcode non YouTube, ou pris dans une balise
 * en ligne non refermée (<strong>…), est laissé tel quel. Deux passages donnent la
 * même sortie.
 */
export function transformEmbedShortcodes(
  html: string,
  labels: YouTubeFacadeLabels = DEFAULT_YOUTUBE_LABELS,
): { html: string; count: number } {
  let count = 0;
  const out = html.replace(PARAGRAPH, (paragraph, attrs: string, inner: string) => {
    const parts: string[] = [];
    let pending = '';
    let cursor = 0;
    for (const m of inner.matchAll(EMBED_SHORTCODE)) {
      const before = pending + inner.slice(cursor, m.index);
      cursor = m.index + m[0].length;
      const video = parseYouTubeUrl(decodeHtmlEntities(m[1]));
      if (!video || !hasBalancedTags(before)) {
        pending = before + m[0];
        continue;
      }
      if (!isBlank(before)) parts.push(`<p${attrs}>${before}</p>`);
      parts.push(renderFacade({ ...video, title: '', captionHtml: null, align: 'fullwidth' }, labels));
      count++;
      pending = '';
    }
    if (parts.length === 0) return paragraph;
    const after = pending + inner.slice(cursor);
    if (!isBlank(after)) parts.push(`<p${attrs}>${after}</p>`);
    return parts.join('');
  });
  return { html: out, count };
}

const ANCHOR_OPEN_TAG = /<a\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
const ATTRIBUTE = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
const SITE_ORIGIN = 'https://www.packshot-creator.com/';
const SITE_HOSTS = new Set(['packshot-creator.com', 'www.packshot-creator.com']);

/**
 * Lien interne : href résolu, depuis le site, vers packshot-creator.com ou
 * www.packshot-creator.com en http(s). Couvre les chemins relatifs (/…, …),
 * les ancres (#…), les requêtes (?…) et les URL absolues du site. Tout le reste
 * est externe : autres domaines, sous-domaines (videos., trail.…), mailto:, tel:,
 * href absent ou illisible. Au 29/09, le corpus ne contient ni mailto:, ni tel:,
 * ni sous-domaine, ni lien sans href en target="_blank".
 */
export function isInternalHref(href: string | null): boolean {
  if (href === null) return false;
  let url: URL;
  try {
    url = new URL(decodeHtmlEntities(href).trim(), SITE_ORIGIN);
  } catch {
    return false;
  }
  return (url.protocol === 'https:' || url.protocol === 'http:') && SITE_HOSTS.has(url.hostname);
}

/**
 * F22 et règle UX de Laurent du 29/09, pour les liens `target="_blank"` :
 * - lien interne (isInternalHref) : `target="_blank"` retiré, le lien s'ouvre
 *   dans le même onglet ; aucun rel ajouté, un rel existant est conservé tel quel ;
 * - lien externe sans noopener ni noreferrer : target conservé, jetons existants
 *   conservés (guillemets et place compris), `noopener noreferrer` ajoutés ;
 * - lien externe déjà protégé : inchangé.
 * Les autres cibles (_self, _new…) ne sont pas touchées. Jamais de second
 * attribut rel ; href et texte du lien intacts ; deux passages, même sortie.
 */
export function addRelToBlankTargets(html: string): string {
  return html.replace(ANCHOR_OPEN_TAG, (tag, attrs: string) => {
    const targets: { start: number; end: number; value: string }[] = [];
    let href: string | null = null;
    let rel: { start: number; end: number; value: string; quote: string } | null = null;
    for (const m of attrs.matchAll(ATTRIBUTE)) {
      const name = m[1].toLowerCase();
      const value = m[2] ?? m[3] ?? m[4] ?? '';
      if (name === 'target') targets.push({ start: m.index, end: m.index + m[0].length, value });
      else if (name === 'href' && href === null) href = value;
      else if (name === 'rel' && rel === null) {
        rel = { start: m.index, end: m.index + m[0].length, value, quote: m[3] !== undefined ? "'" : '"' };
      }
    }
    if (targets.length === 0 || targets[0].value.toLowerCase() !== '_blank') return tag;
    const open = tag.slice(0, 2); // « <a » ou « <A », tel quel
    if (isInternalHref(href)) {
      // Chaque attribut target est retiré avec l'espace qui le précède.
      let kept = attrs;
      for (const t of [...targets].reverse()) {
        const from = kept.slice(0, t.start).replace(/\s+$/, '').length;
        kept = kept.slice(0, from) + kept.slice(t.end);
      }
      return `${open}${kept}>`;
    }
    if (!rel) return `${open}${attrs.trimEnd()} rel="noopener noreferrer">`;
    const tokens = rel.value.split(/[\t\n\f\r ]+/).filter(Boolean);
    const lower = tokens.map((t) => t.toLowerCase());
    if (lower.includes('noopener') || lower.includes('noreferrer')) return tag;
    const value = [...tokens, 'noopener', 'noreferrer'].join(' ');
    return `${open}${attrs.slice(0, rel.start)}rel=${rel.quote}${value}${rel.quote}${attrs.slice(rel.end)}>`;
  });
}

/**
 * Process Webflow HTML content:
 * - Add IDs to h2/h3 elements for ToC navigation
 * - Extract headings for ToC (texte décodé, id calculé sur la source : ancres inchangées)
 * - Count words for reading time
 * - Remplacer les shortcodes `[embed]` YouTube (transformEmbedShortcodes) et les
 *   iframes YouTube par une façade locale (lib/youtube.ts) :
 *   aucun appel à YouTube avant l'accord de l'internaute
 * - Envoi de l'origin en Referer aux embeds YouTube (addYouTubeReferrerPolicy)
 * - Retrait des paragraphes vides hérités de Webflow (removeEmptyParagraphs)
 * - Liens target="_blank" (addRelToBlankTargets) : internes rouverts dans le
 *   même onglet, externes protégés par rel="noopener noreferrer"
 */
export function processHtmlContent(
  html: string,
  options: { youtubeLabels?: YouTubeFacadeLabels } = {},
): {
  processedHtml: string;
  headings: HeadingData[];
  wordCount: number;
  videoCount: number;
} {
  const headings: HeadingData[] = [];
  const usedIds = new Set<string>();

  const processedHtml = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, content: string) => {
      const text = content.replace(/<[^>]*>/g, '').trim();
      if (!text) return _match;

      let id = slugify(text);
      if (!id) return _match;

      if (usedIds.has(id)) {
        let counter = 2;
        while (usedIds.has(`${id}-${counter}`)) counter++;
        id = `${id}-${counter}`;
      }
      usedIds.add(id);

      const level = parseInt(tag.charAt(1));
      // L'id reste calculé sur le texte source : les ancres existantes ne bougent pas.
      headings.push({ id, text: decodeHtmlEntities(text).trim(), level });

      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, '');
      return `<${tag}${cleanAttrs} id="${id}">${content}</${tag}>`;
    }
  );

  // Lazy-load all content images to prioritize hero image LCP
  const withLazyImages = processedHtml.replace(
    /<img\b(?![^>]*loading=)((?:[^>]*)>)/gi,
    '<img loading="lazy" decoding="async"$1'
  ).replace(
    /<img\b([^>]*)\bloading="auto"([^>]*>)/gi,
    '<img$1loading="lazy"$2'
  );

  const shortcodes = transformEmbedShortcodes(withLazyImages, options.youtubeLabels);
  const videos = transformYouTubeEmbeds(shortcodes.html, options.youtubeLabels);
  // Après la façade, aucune iframe YouTube ne subsiste : addYouTubeReferrerPolicy
  // (#46) ne modifie rien aujourd'hui. Elle reste en garde pour toute iframe
  // YouTube qui échapperait à la façade (erreur 153 sans Referer).
  const withYouTubeReferrer = addYouTubeReferrerPolicy(videos.html);
  const withoutEmptyParagraphs = removeEmptyParagraphs(withYouTubeReferrer);
  const withSafeBlankTargets = addRelToBlankTargets(withoutEmptyParagraphs);

  const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  return {
    processedHtml: withSafeBlankTargets,
    headings,
    wordCount,
    videoCount: shortcodes.count + videos.count,
  };
}

/**
 * Calculate reading time from word count (200 words/min)
 */
export function calculateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Extract block text from a Portable Text block value (for generating heading IDs in renderer)
 */
export function getBlockText(value: any): string {
  return value?.children?.map((c: any) => c.text || '').join('') || '';
}

/**
 * Extract headings from raw Markdown/MDX content for ToC
 */
export function extractMarkdownHeadings(markdown: string): HeadingData[] {
  const headings: HeadingData[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    // Strip markdown formatting from heading text
    const text = match[2]
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .trim();

    const id = slugify(text);
    if (id) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}
