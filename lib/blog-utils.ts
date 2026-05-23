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

  // Lazy-load all content images to prioritize hero image LCP
  const withLazyImages = processedHtml.replace(
    /<img\b(?![^>]*loading=)((?:[^>]*)>)/gi,
    '<img loading="lazy" decoding="async"$1'
  ).replace(
    /<img\b([^>]*)\bloading="auto"([^>]*>)/gi,
    '<img$1loading="lazy"$2'
  );

  const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  return { processedHtml: withLazyImages, headings, wordCount };
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
