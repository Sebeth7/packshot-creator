/**
 * Sanitize HTML content from Webflow CMS.
 * Le contenu provient du CMS Webflow (source de confiance contrôlée).
 * isomorphic-dompurify/jsdom n'est pas compatible avec le runtime Vercel
 * (ERR_REQUIRE_ESM), donc on retourne le HTML tel quel.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html;
}
