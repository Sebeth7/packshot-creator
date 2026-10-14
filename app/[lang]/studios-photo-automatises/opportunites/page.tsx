import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OccasionOrbitvu from '@/components/landings/occasion/OccasionOrbitvu';
import { versCartes } from '@/components/landings/occasion/cartes';
import { contenuOccasion } from '@/components/landings/occasion/contenu';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { PUBLICATION_AUTORISEE, pageOccasionServie } from '@/lib/occasion/activation';
import { alertesAffichees, servicesAlertes } from '@/lib/occasion/alertes/services';
import { LANGUES_OCCASION, estLangueOccasion } from '@/lib/occasion/langues';
import { canoniqueOccasion, hreflangOccasion, pageOccasionIndexable } from '@/lib/occasion/seo';
import { collecteAffichee, servicesOccasion } from '@/lib/occasion/services';
import { machinesDisponibles } from '@/lib/occasion/stock';

/**
 * Landing « Studios Orbitvu d'occasion », en FR, EN et DE-CH (mission finale du
 * 11/10/2026), au même chemin dans les trois locales, comme le hub
 * `/studios-photo-automatises`.
 *
 * - Indexation, option B (décision de Laurent du 14/10/2026, lib/occasion/seo.ts) :
 *   `index, follow` sur la production publiée, avec ou sans machine ;
 *   `noindex, nofollow` partout ailleurs. Canonique par langue et hreflang
 *   réciproques ; entrées de sitemap seulement une fois publiée (app/sitemap.ts).
 *   Aucun balisage `Offer` / `Product`.
 * - Prérendue en 404 sur la production Vercel tant que `PUBLICATION_AUTORISEE`
 *   est faux (lib/occasion/activation.ts).
 * - État calculé au build depuis le registre réel (`data/occasion/machines.ts`,
 *   vide) : un changement de stock passe par un commit et un déploiement.
 */
const LOCALES_OG = { fr: 'fr_FR', en: 'en_GB', 'de-ch': 'de_CH' } as const;

export function generateStaticParams() {
  return LANGUES_OCCASION.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  // Page non servie (production sans GO, ou langue inconnue) : la réponse 404 ne porte ni titre ni description.
  if (!estLangueOccasion(lang) || !pageOccasionServie()) return { robots: { index: false, follow: false } };
  const { META } = contenuOccasion(lang);
  const indexable = pageOccasionIndexable();
  return {
    title: META.title,
    description: META.description,
    robots: { index: indexable, follow: indexable },
    alternates: {
      canonical: canoniqueOccasion(lang),
      languages: hreflangOccasion(),
    },
    openGraph: {
      title: META.title,
      description: META.description,
      url: canoniqueOccasion(lang),
      siteName: 'PackshotCreator',
      locale: LOCALES_OG[lang],
      type: 'website',
    },
  };
}

export default async function OccasionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!estLangueOccasion(lang) || !pageOccasionServie()) notFound();
  const disponibles = machinesDisponibles(MACHINES_OCCASION);
  return (
    <OccasionOrbitvu
      machines={versCartes(disponibles, lang)}
      apercuInterne={!PUBLICATION_AUTORISEE}
      vue="reel"
      nombreReel={disponibles.length}
      collecte={collecteAffichee(servicesOccasion())}
      alertes={alertesAffichees(servicesAlertes())}
      langue={lang}
    />
  );
}
