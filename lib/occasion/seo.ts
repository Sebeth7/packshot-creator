import { buildLanguages } from '@/lib/hreflang';
import { PUBLICATION_AUTORISEE } from './activation';
import { LANGUES_OCCASION, cheminOccasion, type LangueOccasion } from './langues';

/**
 * Indexation de la landing « Offres d'occasion » : option B, décision définitive
 * de Laurent du 14/10/2026 (remplace la recommandation A, `noindex` tant que le
 * stock est vide). La page est publiée en `index, follow` dès sa mise en ligne,
 * avec ou sans machine disponible.
 *
 * - Canonique propre à chaque langue, sur `https://www.packshot-creator.com`.
 * - Hreflang réciproques par `buildLanguages` (lib/hreflang.ts) : `fr`, `fr-CH`,
 *   `en`, `de-CH`, `x-default` vers `/fr`.
 * - `index, follow` seulement sur la production publiée ; partout ailleurs
 *   (Preview, local, production avant publication) : `noindex, nofollow`.
 * - Sitemap : les trois URL seulement quand la page est servie en production.
 * - La vue `…/exemples-fictifs` n'est jamais concernée : 404 en production,
 *   `noindex`, hors sitemap.
 * - Aucun balisage `Product` ni `Offer` tant qu'aucune machine réelle n'est
 *   disponible.
 */
type Env = Readonly<Record<string, string | undefined>>;

export const ORIGINE_PUBLIQUE = 'https://www.packshot-creator.com';

/** URL canonique de la landing dans une langue. */
export function canoniqueOccasion(langue: LangueOccasion): string {
  return `${ORIGINE_PUBLIQUE}${cheminOccasion(langue)}`;
}

/** Alternates de langue, identiques pour les trois versions (réciprocité). */
export function hreflangOccasion(): Record<string, string> {
  return buildLanguages(cheminOccasion('fr'), { en: cheminOccasion('en'), deCh: cheminOccasion('de-ch') });
}

/** La page doit-elle être indexée dans cet environnement ? */
export function pageOccasionIndexable(env: Env = process.env, publication: boolean = PUBLICATION_AUTORISEE): boolean {
  return env.VERCEL_ENV === 'production' && publication;
}

/** Chemins de la landing à déclarer dans le sitemap : aucun tant qu'elle n'est pas publiée. */
export function cheminsSitemapOccasion(publication: boolean = PUBLICATION_AUTORISEE): string[] {
  return publication ? LANGUES_OCCASION.map(cheminOccasion) : [];
}
