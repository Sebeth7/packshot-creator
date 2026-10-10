import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CatalogueAllInOne from '@/components/landings/catalogue-all-in-one/CatalogueAllInOne';
import { META } from '@/components/landings/catalogue-all-in-one/contenu';
import { PUBLICATION_AUTORISEE, pageCatalogueServie } from '@/lib/catalogue/activation';

/**
 * Landing d'acquisition du catalogue Orbitvu All-in-One (kit du 02/10/2026).
 *
 * - Française seule, commune à la France et à la Suisse romande : aucune version
 *   /en ni /de-ch, aucun hreflang.
 * - `noindex, nofollow`, sans canonique ni entrée de sitemap : indexation et URL
 *   définitive à arbitrer par Laurent.
 * - Prérendue en 404 sur la production Vercel tant que `PUBLICATION_AUTORISEE`
 *   est faux (lib/catalogue/activation.ts) : notFound() au rendu.
 */
const SLUG = 'catalogue-orbitvu-all-in-one';
const URL_CANDIDATE = `https://www.packshot-creator.com/fr/${SLUG}`;

// FR seule : /en et /de-ch répondent 404 (dynamicParams = false dans le layout).
// Une liste vide ne conviendrait pas : Next reprendrait alors fr et en du layout.
export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export function generateMetadata(): Metadata {
  const ogImage = `/api/og?title=${encodeURIComponent(META.title)}&type=page&lang=fr`;
  return {
    title: META.title,
    description: META.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: META.title,
      description: META.description,
      url: URL_CANDIDATE,
      siteName: 'PackshotCreator',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: META.title,
      description: META.description,
      images: [ogImage],
    },
  };
}

export default async function CatalogueAllInOnePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'fr' || !pageCatalogueServie()) notFound();
  return <CatalogueAllInOne apercuInterne={!PUBLICATION_AUTORISEE} />;
}
