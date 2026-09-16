import type { ComponentProps } from 'react';
import { Link } from '@/i18n/routing';
import blogAlternates from '@/content/blog/alternates.json';
import guideAlternates from '@/content/guides/alternates.json';
import {
  NOINDEX_EN_ACADEMY_SLUGS,
  NOINDEX_EN_BLOG_SLUGS,
  NOINDEX_EN_INDUSTRIE_SLUGS,
  NOINDEX_EN_SOLUTIONS_SLUGS,
} from '@/lib/seo-config';

/**
 * Couverture de la locale de-ch (Suisse alémanique) — Workstream B.
 *
 * de-ch n'est PAS exhaustif : seules quelques pages du « parcours suisse » sont
 * réellement générées en allemand (cf generateStaticParams par-page). Toute cible
 * de navigation NON couverte doit être épinglée sur /fr ou /en quand la locale
 * courante est de-ch, sinon le Link rendrait une URL /de-ch/* inexistante → 404.
 *
 * Ce registre liste les PATHNAMES INTERNES (clés de `pathnames` dans routing.ts)
 * effectivement servis en de-ch. À tenir synchronisé avec les pages traduites.
 *
 * Refonte 04/09/2026 (audit SEO Laurent 03/09, §1.2 + addendum A2/A3) :
 * - le sélecteur de langue résout les slugs d'articles via content/*\/alternates.json
 *   au lieu de recopier le slug FR sous /en (146 × 301, 26 × 410, 14 × 404) ;
 * - une ancre « DE-CH » n'envoie plus jamais vers /en : page allemande si elle
 *   existe, sinon le hub de-ch de la même section ;
 * - aucune ancre n'envoie vers une page /en `noindex` (contenu FR sous URL EN) :
 *   ces pages captaient le Link Score 99-100 du site alors que /fr plafonnait à 86.
 */

// ── Alternates articles (blog + guides) ─────────────────────────────────────
// `null` = traduction explicitement absente (ex. article FR sans version EN).
type AltEntry = { fr?: string | null; en?: string | null; 'de-ch'?: string | null };
const BLOG_ALTERNATES = blogAlternates as unknown as Record<string, AltEntry>;
const GUIDE_ALTERNATES = guideAlternates as unknown as Record<string, AltEntry>;

function deChSlugsOf(map: Record<string, AltEntry>): ReadonlySet<string> {
  return new Set(
    Object.values(map)
      .map((e) => e['de-ch'])
      .filter((s): s is string => typeof s === 'string'),
  );
}

function indexBySlug(map: Record<string, AltEntry>): ReadonlyMap<string, AltEntry> {
  const out = new Map<string, AltEntry>();
  for (const entry of Object.values(map)) {
    for (const slug of Object.values(entry)) {
      if (typeof slug === 'string') out.set(slug, entry);
    }
  }
  return out;
}

const BLOG_BY_SLUG = indexBySlug(BLOG_ALTERNATES);
const GUIDE_BY_SLUG = indexBySlug(GUIDE_ALTERNATES);

// Articles statiques (dossier littéral app/[lang]/blog/<slug>/page.tsx) : même
// slug en fr et en en, absents de alternates.json. Jamais servis en de-ch.
const STATIC_BILINGUAL_BLOG: ReadonlySet<string> = new Set([
  'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026',
  'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
  'budget-studio-photo-automatise',
  'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet',
  'comparatif-orbitvu-ortery-styleshoots-2026',
  'financement-formation-opco-guide-complet-pour-studios-photo-2026',
  'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
  'guide-achat-studio-2026',
  'ia-photo-produit-guide-2026',
  'orbitvu-vs-concurrents',
  'prestataire-packshot-vs-studio-interne',
  'studio-ia-vs-ia-generative',
]);

// ── Couverture de-ch ────────────────────────────────────────────────────────
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
// les ids machine sont identiques dans toutes les locales. Les slugs d'articles de-ch
// (blog, guides) sont dérivés de alternates.json : source unique avec le hreflang.
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
  // Articles traduits en allemand (content/blog/de-ch, content/guides/de-ch).
  '/blog/[slug]': deChSlugsOf(BLOG_ALTERNATES),
  '/guide/[slug]': deChSlugsOf(GUIDE_ALTERNATES),
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

// ── Pages /en noindex (contenu FR servi sous URL anglaise) ──────────────────
// Source unique : lib/seo-config.ts (mêmes sets que les robots/sitemap). Une fois
// une page traduite et sortie de ces sets, elle redevient une cible légitime ici.
const EN_NOINDEX_DYNAMIC: Readonly<Record<string, ReadonlySet<string>>> = {
  '/industrie/[slug]': NOINDEX_EN_INDUSTRIE_SLUGS,
  '/solutions/[slug]': NOINDEX_EN_SOLUTIONS_SLUGS,
  '/academy/[slug]': NOINDEX_EN_ACADEMY_SLUGS,
  '/blog/[slug]': NOINDEX_EN_BLOG_SLUGS,
};
// NB : le hub /en/industrie sert aussi du contenu FR mais reste indexable dans le
// code (pas de robots noindex, présent dans le sitemap) — hors de ce set, à traduire
// avec les 30 pages EN (décision Seb 04/09/2026).
const EN_NOINDEX_STATIC: ReadonlySet<string> = new Set([
  '/distributeur-orbitvu-suisse', // EN servi en noindex,follow
]);

/** La version /en de cette cible est-elle noindex (donc à ne pas alimenter en liens) ? */
export function isEnNoindex(href: LinkHref): boolean {
  const pathname = hrefPathname(href);
  if (!pathname) return false;
  if (EN_NOINDEX_STATIC.has(pathname)) return true;
  const slugs = EN_NOINDEX_DYNAMIC[pathname];
  if (!slugs) return false;
  const slug = hrefSlug(href);
  return slug ? slugs.has(slug) : false;
}

/**
 * Pages NON couvertes en de-ch et SANS version /en (FR-only) : un germanophone y
 * est mieux servi en /fr qu'avec un 404. Tout le reste du reliquat pointe vers /en
 * (l'anglais est plus accessible qu'un francophone pour un Suisse alémanique — choix Seb),
 * SAUF si la version /en est noindex (cf isEnNoindex) : alors /fr, seule version indexable.
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
 *   ou 'fr' pour le reliquat FR-only (pages légales, page Suisse romande) et pour
 *   toute cible dont la version /en est noindex.
 */
export function navPinLocale(currentLocale: string, href: LinkHref): 'fr' | 'en' | undefined {
  if (currentLocale !== 'de-ch') return undefined;
  if (isDeChCovered(href)) return undefined;
  const pathname = hrefPathname(href);
  if (pathname && DE_CH_PIN_FR.has(pathname)) return 'fr';
  if (isEnNoindex(href)) return 'fr';
  return 'en';
}

/**
 * Résolution d'un href de navigation pour la locale courante (NavLink, JSON-LD
 * ItemList de la home) : en de-ch, un secteur FR traduit est réécrit sous son slug
 * allemand (/de-ch/branchen/schmuck) au lieu d'être épinglé sur /fr ; tout le reste
 * passe par navPinLocale.
 */
export function resolveNavHref(
  currentLocale: string,
  href: LinkHref,
): { href: LinkHref; locale: 'fr' | 'en' | undefined } {
  if (currentLocale === 'de-ch' && hrefPathname(href) === '/industrie/[slug]') {
    const slug = hrefSlug(href);
    const deSlug = slug ? FR_TO_DE_CH_SECTOR[slug] : undefined;
    if (deSlug) return { href: { pathname: '/industrie/[slug]', params: { slug: deSlug } }, locale: undefined };
  }
  return { href, locale: navPinLocale(currentLocale, href) };
}

// ── Sélecteur de langue ─────────────────────────────────────────────────────
export type AppLocale = 'fr' | 'en' | 'de-ch';

// Secteurs servis en de-ch : slug FR ↔ slug allemand (cf DE_CH_SECTOR_MAP dans
// app/[lang]/industrie/[slug]). Source unique pour le switch page-à-page : un slug
// FR a un équivalent de-ch sous son slug allemand (sinon non couvert → hub /branchen).
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

/** Slug allemand (de-ch) d'un secteur à partir de son slug FR, undefined si non traduit. */
export function deChSectorSlug(frSlug: string): string | undefined {
  return FR_TO_DE_CH_SECTOR[frSlug];
}

type SwitchTarget = { href: LinkHref; locale: AppLocale };

/**
 * Switch article-à-article (blog/guide) via alternates.json. Repli sur le listing
 * de la locale cible quand la traduction n'existe pas — jamais /<locale>/<slug-source>
 * (c'était la source des 301/410/404 d'en-tête relevés par l'audit du 03/09/2026),
 * jamais une page /en noindex.
 */
function articleSwitchHref(kind: 'blog' | 'guide', slug: string, target: AppLocale): SwitchTarget {
  const tmpl = kind === 'blog' ? ('/blog/[slug]' as const) : ('/guide/[slug]' as const);
  const listing = kind === 'blog' ? ('/blog' as const) : ('/guide' as const);
  const entry = (kind === 'blog' ? BLOG_BY_SLUG : GUIDE_BY_SLUG).get(slug);
  let targetSlug: string | undefined = entry?.[target] ?? undefined;
  if (!targetSlug && kind === 'blog' && target !== 'de-ch' && STATIC_BILINGUAL_BLOG.has(slug)) {
    targetSlug = slug;
  }
  if (!targetSlug) return { href: listing, locale: target };
  if (target === 'en' && kind === 'blog' && NOINDEX_EN_BLOG_SLUGS.has(targetSlug)) {
    return { href: listing, locale: 'en' };
  }
  return { href: { pathname: tmpl, params: { slug: targetSlug } }, locale: target };
}

/**
 * Cible (href interne + locale effective) d'un bouton du sélecteur de langue.
 *
 * `pathname` = pathname INTERNE de `usePathname()` next-intl : un TEMPLATE pour
 * les routes dynamiques (ex `/industrie/[slug]`), résolu pour les statiques
 * (ex `/contact`). `slug` = valeur réelle du param (les articles/secteurs
 * n'apparaissent pas dans le pathname interne).
 *
 * Règles (Seb 04/09/2026, sur audit Laurent 03/09) :
 * - « DE-CH » sert la page en allemand suisse SI elle est traduite, SINON le hub
 *   de-ch de la même section (branchen, blog, guide, studios…) — jamais /en.
 * - « EN » / « FR » switchent article-à-article via alternates.json ; repli listing.
 * - aucune ancre ne cible une page /en noindex (contenu FR sous URL EN).
 */
export function localeSwitchHref(
  pathname: string,
  slug: string | undefined,
  currentLocale: string,
  target: AppLocale,
): SwitchTarget {
  // Secteurs /industrie/[slug] (slugs traduits fr↔de)
  if (pathname === '/industrie/[slug]' && slug) {
    const frSlug = DE_CH_TO_FR_SECTOR[slug] ?? slug;
    if (target === 'de-ch') {
      const deSlug = FR_TO_DE_CH_SECTOR[frSlug];
      if (deSlug) return { href: { pathname: '/industrie/[slug]', params: { slug: deSlug } }, locale: 'de-ch' };
      return { href: '/industrie', locale: 'de-ch' }; // hub /de-ch/branchen
    }
    if (target === 'en' && NOINDEX_EN_INDUSTRIE_SLUGS.has(frSlug)) {
      return { href: '/studios-photo-automatises', locale: 'en' };
    }
    return { href: { pathname: '/industrie/[slug]', params: { slug: frSlug } }, locale: target };
  }

  // Machines /studio-photo/[slug] (id identique dans toutes les locales, gamme complète en de-ch)
  if (pathname === '/studio-photo/[slug]' && slug) {
    if (target === 'de-ch') {
      const covered = DE_CH_COVERED_DYNAMIC['/studio-photo/[slug]'].has(slug);
      return covered
        ? { href: { pathname: '/studio-photo/[slug]', params: { slug } }, locale: 'de-ch' }
        : { href: '/studios-photo-automatises', locale: 'de-ch' };
    }
    return { href: { pathname: '/studio-photo/[slug]', params: { slug } }, locale: target };
  }

  // Articles blog/guide : switch article-à-article via alternates.json
  if ((pathname === '/blog/[slug]' || pathname === '/guide/[slug]') && slug) {
    return articleSwitchHref(pathname === '/blog/[slug]' ? 'blog' : 'guide', slug, target);
  }

  // Solutions (documentation industrielle) : non couvertes en de-ch, EN noindex
  if (pathname === '/solutions/[slug]' && slug) {
    if (target === 'de-ch') return { href: '/studios-photo-automatises', locale: 'de-ch' };
    if (target === 'en' && NOINDEX_EN_SOLUTIONS_SLUGS.has(slug)) {
      return { href: '/studios-photo-automatises', locale: 'en' };
    }
    return { href: { pathname: '/solutions/[slug]', params: { slug } }, locale: target };
  }

  // Fiches formation : non couvertes en de-ch, EN noindex (le hub /academy est traduit)
  if (pathname === '/academy/[slug]' && slug) {
    if (target === 'de-ch') return { href: '/academy', locale: navPinLocale('de-ch', '/academy') ?? 'de-ch' };
    if (target === 'en' && NOINDEX_EN_ACADEMY_SLUGS.has(slug)) return { href: '/academy', locale: 'en' };
    return { href: { pathname: '/academy/[slug]', params: { slug } }, locale: target };
  }

  // Pages statiques : next-intl localise le segment (contact→kontakt…)
  const href = (pathname || '/') as LinkHref;
  if (target === 'de-ch') {
    return { href, locale: navPinLocale('de-ch', href) ?? 'de-ch' };
  }
  return { href, locale: target };
}
