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
  '/contact', // → /de-ch/kontakt
  '/calculateur-roi', // → /de-ch/roi-rechner
  '/studio-photo/selecteur-machines', // → /de-ch/fotostudio/maschinen-finder
  '/besoins-photographie-produit', // → /de-ch/produktfotografie-bedarf
  '/questions-cles-photographie-produit', // → /de-ch/wichtige-fragen-produktfotografie
  '/packshot-bijoux', // → /de-ch/packshot-schmuck
  '/packshot-mode',
  '/packshot-e-commerce',
  '/packshot-amazon',
  '/packshot-industriel', // → /de-ch/packshot-industrie
  '/blog', // listing servi en de-ch (generateStaticParams de-ch)
  '/guide', // listing servi en de-ch
]);

// Routes dynamiques servies en de-ch : pathname interne → slugs couverts.
// NB IMPORTANT : le param [slug] n'est PAS traduit par next-intl. Pour /industrie/[slug],
// le generateStaticParams de-ch émet les slugs ALLEMANDS (schmuck, uhren, …). Un lien qui
// passe un slug FR (bijoux-joaillerie) n'est donc PAS couvert et sera épinglé (navPinLocale).
// Le hub /de-ch/branchen lie directement vers les slugs allemands. Pour /studio-photo/[slug],
// les ids machine sont identiques dans toutes les locales.
export const DE_CH_COVERED_DYNAMIC: Readonly<Record<string, ReadonlySet<string>>> = {
  // Gamme complète servie en de-ch (mêmes ids produit qu'en fr/en).
  '/studio-photo/[slug]': new Set([
    'alphashot-micro-v2', 'alphashot-360', 'alphashot-xl-g2', 'alphashot-pro-g2',
    'alphashot-xl-v2', 'alphashot-xl-wine-v2', 'alphashot-xl-pro-v2',
    'alphadesk', 'alphatable', 'alphastudio-compact-v2', 'alphastudio-xxl-v2',
    'fashion-studio-basic', 'fashion-studio', 'bike-studio', 'furniture-studio',
    'e-comm-studio-plus',
  ]),
  // Secteurs servis en de-ch sous leurs slugs ALLEMANDS (/de-ch/branchen/<de>).
  '/industrie/[slug]': new Set([
    'schmuck', 'uhren', 'brillen', 'schoenheit', 'elektronik', 'sport', 'mode', 'wein',
  ]),
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
 * Pages NON couvertes en de-ch et SANS version /en (FR-only) : un germanophone y
 * est mieux servi en /fr qu'avec un 404. Tout le reste du reliquat pointe vers /en
 * (l'anglais est plus accessible qu'un francophone pour un Suisse alémanique — choix Seb).
 * Les pages légales sont FR-only dans ce projet (cf feedback no_legal_pages).
 */
const DE_CH_PIN_FR: ReadonlySet<string> = new Set([
  '/mentions-legales',
  '/cgu',
  '/confidentialite',
  '/distributeur-orbitvu-suisse', // page Suisse romande dédiée, garder le FR
]);

/**
 * Locale à forcer sur un `<Link>` de navigation globale (Header/Footer + contenu).
 * - locale courante ≠ de-ch : comportement normal (undefined → locale courante).
 * - locale de-ch + cible couverte : undefined (rendu natif de-ch).
 * - locale de-ch + cible NON couverte : 'en' par défaut (germanophone → anglais),
 *   ou 'fr' pour le reliquat FR-only (pages légales, page Suisse romande).
 */
export function navPinLocale(currentLocale: string, href: LinkHref): 'fr' | 'en' | undefined {
  if (currentLocale !== 'de-ch') return undefined;
  if (isDeChCovered(href)) return undefined;
  const pathname = hrefPathname(href);
  if (pathname && DE_CH_PIN_FR.has(pathname)) return 'fr';
  return 'en';
}

// ── Sélecteur de langue ─────────────────────────────────────────────────────
export type AppLocale = 'fr' | 'en' | 'de-ch';

// Secteurs servis en de-ch : slug FR ↔ slug allemand (cf DE_CH_SECTOR_MAP dans
// app/[lang]/industrie/[slug]). Source unique pour le switch page-à-page : un slug
// FR a un équivalent de-ch sous son slug allemand (sinon non couvert → /en).
const FR_TO_DE_CH_SECTOR: Readonly<Record<string, string>> = {
  'bijoux-joaillerie': 'schmuck',
  'horlogerie': 'uhren',
  'lunetterie': 'brillen',
  'cosmetiques-beaute': 'schoenheit',
  'electronique-hightech': 'elektronik',
  'sport-outdoor': 'sport',
  'mode-textile': 'mode',
  'vin-spiritueux': 'wein',
};
const DE_CH_TO_FR_SECTOR: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(FR_TO_DE_CH_SECTOR).map(([fr, de]) => [de, fr]),
);

/**
 * Cible (href interne + locale effective) d'un bouton du sélecteur de langue.
 *
 * `pathname` = pathname INTERNE de `usePathname()` next-intl : un TEMPLATE pour
 * les routes dynamiques (ex `/industrie/[slug]`), résolu pour les statiques
 * (ex `/contact`). `slug` = valeur réelle du param via `useParams()` (les
 * articles/secteurs n'apparaissent pas dans le pathname interne).
 *
 * Règle (choix Seb) : un clic « DE-CH » sert la page en allemand suisse SI elle
 * est traduite, SINON la version /en de la même page (jamais de 404). Les secteurs
 * CH sont mappés vers leur slug allemand pour atteindre la vraie page de-ch.
 * Les articles blog/guide ne sont pas switchés au niveau article : DE → /en ;
 * depuis de-ch vers fr/en → repli sur le listing (slug allemand absent en fr/en).
 */
export function localeSwitchHref(
  pathname: string,
  slug: string | undefined,
  currentLocale: string,
  target: AppLocale,
): { href: LinkHref; locale: AppLocale } {
  // Secteurs /industrie/[slug] (slugs traduits fr↔de)
  if (pathname === '/industrie/[slug]' && slug) {
    const frSlug = DE_CH_TO_FR_SECTOR[slug] ?? slug;
    if (target === 'de-ch') {
      const deSlug = FR_TO_DE_CH_SECTOR[frSlug];
      if (deSlug) return { href: { pathname: '/industrie/[slug]', params: { slug: deSlug } }, locale: 'de-ch' };
      return { href: { pathname: '/industrie/[slug]', params: { slug: frSlug } }, locale: 'en' };
    }
    return { href: { pathname: '/industrie/[slug]', params: { slug: frSlug } }, locale: target };
  }

  // Machines /studio-photo/[slug] (id identique dans toutes les locales)
  if (pathname === '/studio-photo/[slug]' && slug) {
    if (target === 'de-ch') {
      const covered = DE_CH_COVERED_DYNAMIC['/studio-photo/[slug]'].has(slug);
      return { href: { pathname: '/studio-photo/[slug]', params: { slug } }, locale: covered ? 'de-ch' : 'en' };
    }
    return { href: { pathname: '/studio-photo/[slug]', params: { slug } }, locale: target };
  }

  // Articles blog/guide (slugs entièrement traduits → pas de switch article-à-article)
  if ((pathname === '/blog/[slug]' || pathname === '/guide/[slug]') && slug) {
    const isBlog = pathname === '/blog/[slug]';
    const tmpl = isBlog ? ('/blog/[slug]' as const) : ('/guide/[slug]' as const);
    if (target === 'de-ch') {
      return { href: { pathname: tmpl, params: { slug } }, locale: 'en' };
    }
    // Depuis de-ch, le slug est allemand → inexistant en fr/en : repli sur le listing.
    if (currentLocale === 'de-ch') {
      return { href: isBlog ? '/blog' : '/guide', locale: target };
    }
    return { href: { pathname: tmpl, params: { slug } }, locale: target };
  }

  // Autres routes dynamiques non couvertes en de-ch
  if (pathname === '/solutions/[slug]' && slug) {
    const href = { pathname: '/solutions/[slug]' as const, params: { slug } };
    return { href, locale: target === 'de-ch' ? 'en' : target };
  }
  if (pathname === '/academy/[slug]' && slug) {
    const href = { pathname: '/academy/[slug]' as const, params: { slug } };
    return { href, locale: target === 'de-ch' ? 'en' : target };
  }

  // Pages statiques : next-intl localise le segment (contact→kontakt…)
  const href = (pathname || '/') as LinkHref;
  if (target === 'de-ch') {
    return { href, locale: navPinLocale('de-ch', href) ?? 'de-ch' };
  }
  return { href, locale: target };
}
