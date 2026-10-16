import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OccasionOrbitvu from '@/components/landings/occasion/OccasionOrbitvu';
import { versCartes } from '@/components/landings/occasion/cartes';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { exemplesFictifsServis, pageOccasionServie } from '@/lib/occasion/activation';
import { alertesAffichees, servicesAlertes } from '@/lib/occasion/alertes/services';
import { LANGUES_OCCASION, estLangueOccasion } from '@/lib/occasion/langues';
import { collecteAffichee, servicesOccasion } from '@/lib/occasion/services';
import { machinesDisponibles } from '@/lib/occasion/stock';

/**
 * Vue de contrôle interne de l'état « machines disponibles », avec les trois
 * exemples FICTIFS de la maquette V4.1 (data/occasion/exemples-fictifs.ts), dans
 * les trois langues de la landing. Jamais servie en production, quel que soit le
 * verrou de publication : 404 au build de production. Aucun lien public n'y
 * mène ; seul le bandeau de l'aperçu interne la propose.
 */
export function generateStaticParams() {
  return LANGUES_OCCASION.map((lang) => ({ lang }));
}

export function generateMetadata(): Metadata {
  if (!pageOccasionServie() || !exemplesFictifsServis()) return { robots: { index: false, follow: false } };
  return {
    title: "Exemples fictifs — Studios Orbitvu d'occasion (aperçu interne)",
    robots: { index: false, follow: false },
  };
}

export default async function OccasionExemplesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!estLangueOccasion(lang) || !pageOccasionServie() || !exemplesFictifsServis()) notFound();
  return (
    <OccasionOrbitvu
      machines={versCartes(machinesDisponibles(exemplesFictifs()), lang)}
      apercuInterne
      vue="exemples"
      nombreReel={machinesDisponibles(MACHINES_OCCASION).length}
      collecte={collecteAffichee(servicesOccasion())}
      alertes={alertesAffichees(servicesAlertes())}
      langue={lang}
    />
  );
}
