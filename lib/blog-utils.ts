/**
 * Utility functions for blog content processing
 */

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

/**
 * Process Webflow HTML content:
 * - Add IDs to h2/h3 elements for ToC navigation
 * - Extract headings for ToC
 * - Count words for reading time
 */
export function processHtmlContent(html: string): {
  processedHtml: string;
  headings: HeadingData[];
  wordCount: number;
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
      headings.push({ id, text, level });

      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, '');
      return `<${tag}${cleanAttrs} id="${id}">${content}</${tag}>`;
    }
  );

  const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  return { processedHtml, headings, wordCount };
}

/**
 * Extract headings from Sanity Portable Text blocks
 */
export function extractPortableTextHeadings(blocks: any[]): HeadingData[] {
  if (!blocks || !Array.isArray(blocks)) return [];

  const headings: HeadingData[] = [];

  for (const block of blocks) {
    if (block._type !== 'block') continue;
    if (block.style !== 'h2' && block.style !== 'h3') continue;

    const text = block.children
      ?.map((child: any) => child.text || '')
      .join('') || '';

    if (!text.trim()) continue;

    const id = slugify(text);
    if (!id) continue;

    headings.push({
      id,
      text: text.trim(),
      level: block.style === 'h2' ? 2 : 3,
    });
  }

  return headings;
}

/**
 * Extract plain text from Portable Text blocks for word count
 */
function getPortableTextPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  let text = '';
  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      text += block.children.map((c: any) => c.text || '').join(' ') + ' ';
    }
  }

  return text.trim();
}

/**
 * Calculate reading time from word count (200 words/min)
 */
export function calculateReadingTime(wordCountOrBlocks: number | any[]): number {
  const count = typeof wordCountOrBlocks === 'number'
    ? wordCountOrBlocks
    : getPortableTextPlainText(wordCountOrBlocks).split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(count / 200));
}

/**
 * Extract block text from a Portable Text block value (for generating heading IDs in renderer)
 */
export function getBlockText(value: any): string {
  return value?.children?.map((c: any) => c.text || '').join('') || '';
}
