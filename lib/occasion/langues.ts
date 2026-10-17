/**
 * Langues de la landing « Offres d'occasion » : les trois locales du site
 * (i18n/routing.ts). Même chemin dans les trois locales,
 * `/<langue>/studios-photo-automatises/opportunites`, comme le hub
 * `/studios-photo-automatises` (segment non localisé).
 */
export const LANGUES_OCCASION = ['fr', 'en', 'de-ch'] as const;

export type LangueOccasion = (typeof LANGUES_OCCASION)[number];

export function estLangueOccasion(valeur: string): valeur is LangueOccasion {
  return (LANGUES_OCCASION as readonly string[]).includes(valeur);
}

/** Chemin public de la landing dans une langue. */
export function cheminOccasion(langue: LangueOccasion): string {
  return `/${langue}/studios-photo-automatises/opportunites`;
}

/** Chemin public de la vue de contrôle des exemples fictifs (jamais en production). */
export function cheminExemplesFictifs(langue: LangueOccasion): string {
  return `${cheminOccasion(langue)}/exemples-fictifs`;
}

/**
 * Politique de confidentialité à citer dans une langue. Les pages légales sont
 * servies en FR et en EN seulement (i18n/deChCoverage.ts, `DE_CH_PIN_FR`) :
 * un visiteur de-ch est renvoyé vers la version française.
 */
export function urlConfidentialite(langue: LangueOccasion): string {
  return `https://www.packshot-creator.com/${langue === 'en' ? 'en' : 'fr'}/confidentialite`;
}
