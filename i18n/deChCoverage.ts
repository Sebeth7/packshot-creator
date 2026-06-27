import type { ComponentProps } from 'react';
import { Link } from '@/i18n/routing';

/**
 * Couverture de la locale de-ch (Suisse alémanique) — Workstream B.
 *
 * de-ch n'est PAS exhaustif : seules quelques pages du « parcours suisse » sont
 * réellement générées en allemand (cf generateStaticParams par-page). Toute cible
 * de navigation NON couverte doit être épinglée sur /fr quand la locale courante
 * est de-ch, sinon le Link rendrait une URL /de-ch/* inexistante → 404.
 *
 * Ce registre liste les PATHNAMES INTERNES (clés de `pathnames` dans routing.ts)
 * effectivement servis en de-ch. À tenir synchronisé avec les pages traduites.
 */

// Pages statiques servies en de-ch.
export const DE_CH_COVERED_STATIC: ReadonlySet<string> = new Set([
  '/',
  '/studios-photo-automatises',
  '/ia-photo-produit',
  '/industrie', // → /de-ch/branchen
  '/a-propos', // → /de-ch/wer-sind-wir
]);

// Routes dynamiques servies en de-ch : pathname interne → slugs couverts.
// NB : le slug bijoux est exposé en de-ch sous /branchen/schmuck (le generateStaticParams
// de-ch émet slug='schmuck'). Les liens de nav globale pointent vers le slug FR
// 'bijoux-joaillerie' : ils ne sont donc PAS couverts ici et restent épinglés /fr.
// Le hub /de-ch/branchen, lui, lie directement vers schmuck.
export const DE_CH_COVERED_DYNAMIC: Readonly<Record<string, ReadonlySet<string>>> = {
  '/studio-photo/[slug]': new Set(['alphashot-360', 'alphashot-micro-v2', 'alphashot-pro-g2']),
  // Hub bijoux servi en de-ch sous le slug allemand 'schmuck' (/de-ch/branchen/schmuck).
  '/industrie/[slug]': new Set(['schmuck']),
};

export type LinkHref = ComponentProps<typeof Link>['href'];

function hrefPathname(href: LinkHref): string | undefined {
  if (typeof href === 'string') return href;
  if (href && typeof href === 'object' && 'pathname' in href) {
    return typeof href.pathname === 'string' ? href.pathname : undefined;
  }
  return undefined;
}

function hrefSlug(href: LinkHref): string | undefined {
  if (href && typeof href === 'object' && 'params' in href) {
    const params = (href as { params?: Record<string, unknown> }).params;
    const slug = params?.slug;
    return typeof slug === 'string' ? slug : undefined;
  }
  return undefined;
}

/** Une cible est-elle réellement servie en de-ch ? */
export function isDeChCovered(href: LinkHref): boolean {
  const pathname = hrefPathname(href);
  if (!pathname) return false;
  if (DE_CH_COVERED_STATIC.has(pathname)) return true;
  const slugs = DE_CH_COVERED_DYNAMIC[pathname];
  if (!slugs) return false;
  const slug = hrefSlug(href);
  return slug ? slugs.has(slug) : false;
}

/**
 * Locale à forcer sur un `<Link>` de navigation globale (Header/Footer).
 * - locale courante ≠ de-ch : comportement normal (undefined → locale courante).
 * - locale de-ch + cible couverte : undefined (rendu natif de-ch).
 * - locale de-ch + cible NON couverte : 'fr' (épinglage du reliquat sur le FR).
 */
export function navPinLocale(currentLocale: string, href: LinkHref): 'fr' | undefined {
  if (currentLocale !== 'de-ch') return undefined;
  return isDeChCovered(href) ? undefined : 'fr';
}
