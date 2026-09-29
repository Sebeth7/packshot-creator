/**
 * Utility functions for blog content processing
 */

import { transformYouTubeEmbeds, type YouTubeFacadeLabels } from './youtube';

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

/**
 * Process Webflow HTML content:
 * - Add IDs to h2/h3 elements for ToC navigation
 * - Extract headings for ToC (texte décodé, id calculé sur la source : ancres inchangées)
 * - Count words for reading time
 * - Remplacer les iframes YouTube par une façade locale (lib/youtube.ts) :
 *   aucun appel à YouTube avant l'accord de l'internaute
 * - Envoi de l'origin en Referer aux embeds YouTube (addYouTubeReferrerPolicy)
 * - Retrait des paragraphes vides hérités de Webflow (removeEmptyParagraphs)
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

  const videos = transformYouTubeEmbeds(withLazyImages, options.youtubeLabels);
  // Après la façade, aucune iframe YouTube ne subsiste : addYouTubeReferrerPolicy
  // (#46) ne modifie rien aujourd'hui. Elle reste en garde pour toute iframe
  // YouTube qui échapperait à la façade (erreur 153 sans Referer).
  const withYouTubeReferrer = addYouTubeReferrerPolicy(videos.html);
  const withoutEmptyParagraphs = removeEmptyParagraphs(withYouTubeReferrer);

  const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  return { processedHtml: withoutEmptyParagraphs, headings, wordCount, videoCount: videos.count };
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
