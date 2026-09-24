/**
 * Valeur `inLanguage` des données structurées par locale du site.
 * Avant le 24/09/2026, toute locale autre que `fr` sortait `en-US`, y compris
 * /de-ch (défaut P0-A du Master SEO/GEO V3).
 */
export type SiteLocale = 'fr' | 'en' | 'de-ch';

export function schemaInLanguage(lang: string): 'fr-FR' | 'en-US' | 'de-CH' {
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'de-ch') return 'de-CH';
  return 'en-US';
}
