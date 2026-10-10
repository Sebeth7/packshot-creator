import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OccasionOrbitvu from '@/components/landings/occasion/OccasionOrbitvu';
import { versCartes } from '@/components/landings/occasion/cartes';
import { META } from '@/components/landings/occasion/contenu';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { PUBLICATION_AUTORISEE, pageOccasionServie } from '@/lib/occasion/activation';
import { machinesDisponibles } from '@/lib/occasion/stock';

/**
 * Landing « Studios Orbitvu d'occasion » (maquette V4.1 du 10/10/2026).
 *
 * - Française seule : aucune version /en ni /de-ch, aucun hreflang.
 * - `noindex, nofollow`, sans canonique ni entrée de sitemap, sans balisage
 *   `Offer` / `Product` : indexation et données structurées à décider avec la
 *   publication.
 * - Prérendue en 404 sur la production Vercel tant que `PUBLICATION_AUTORISEE`
 *   est faux (lib/occasion/activation.ts).
 * - État calculé au build depuis le registre réel (`data/occasion/machines.ts`,
 *   vide) : un changement de stock passe par un commit et un déploiement.
 */
const URL_CANDIDATE = 'https://www.packshot-creator.com/fr/studios-photo-automatises/opportunites';

// FR seule : /en et /de-ch répondent 404 (dynamicParams = false dans le layout).
export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export function generateMetadata(): Metadata {
  // Page non servie (production sans GO) : la réponse 404 ne porte ni titre ni description.
  if (!pageOccasionServie()) return { robots: { index: false, follow: false } };
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
    },
  };
}

export default async function OccasionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'fr' || !pageOccasionServie()) notFound();
  const disponibles = machinesDisponibles(MACHINES_OCCASION);
  return (
    <OccasionOrbitvu
      machines={versCartes(disponibles)}
      apercuInterne={!PUBLICATION_AUTORISEE}
      vue="reel"
      nombreReel={disponibles.length}
    />
  );
}
