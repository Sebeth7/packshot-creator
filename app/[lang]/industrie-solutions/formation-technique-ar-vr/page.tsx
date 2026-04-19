import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Book, Layers3, Eye, GraduationCap } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';

/**
 * Landing vertical Sysnext — Formation technique AR / VR.
 *
 * Horizon P3 (18+ mois). Manuels 360°, vues éclatées, AR/VR immersif.
 * Draft — matière brute à enrichir par Seb (règle d'or 2).
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Formation technique AR / VR — Manuels 360° interactifs'
      : 'AR / VR technical training — Interactive 360° manuals',
    description: isFr
      ? 'Manuels techniques 360° interactifs auto-générés, vues éclatées, hotspots cliquables, support AR/VR pour équipes MRO et production.'
      : 'Auto-generated interactive 360° technical manuals, exploded views, clickable hotspots, AR/VR support for MRO and production teams.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/formation-technique-ar-vr`,
      languages: {
        fr: '/fr/industrie-solutions/formation-technique-ar-vr',
        en: '/en/industrie-solutions/formation-technique-ar-vr',
      },
    },
  };
}

export default async function FormationArVrPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: isFr ? 'Formation technique AR / VR' : 'AR / VR technical training', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/formation-technique-ar-vr` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-sysnext-200">
            <Link href="/industrie-solutions" className="hover:text-white">Sysnext Industrial Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Formation technique AR / VR' : 'AR / VR technical training'}</span>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
            {isFr ? 'Qualiopi · Orbitvu SUN Cloud · GLB / USDZ' : 'Qualiopi · Orbitvu SUN Cloud · GLB / USDZ'}
          </p>
          <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6 max-w-3xl">
            {isFr
              ? 'Former sans immobiliser l\'équipement.'
              : 'Train without taking equipment offline.'}
          </h1>
          <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
            {isFr
              ? 'Manuels techniques 360° interactifs auto-générés depuis les captures. Vues éclatées, hotspots cliquables, support AR/VR pour équipes MRO et production. Formation immersive à distance ou sur site.'
              : 'Auto-generated interactive 360° technical manuals from captures. Exploded views, clickable hotspots, AR/VR support for MRO and production teams. Immersive training remote or on site.'}
          </p>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
          >
            {isFr ? 'Démo formation' : 'Training demo'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight mb-10 max-w-2xl">
            {isFr ? 'Quatre usages pour équipes techniques.' : 'Four uses for technical teams.'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Book, titleFr: 'Manuels 360° interactifs', titleEn: 'Interactive 360° manuals', textFr: 'Captures multi-angles assemblées en vue 360° consultable depuis navigateur ou casque VR.', textEn: 'Multi-angle captures assembled into a 360° view accessible from browser or VR headset.' },
              { icon: Layers3, titleFr: 'Vues éclatées', titleEn: 'Exploded views', textFr: 'Pièces complexes dé-composées vue par vue, hotspots pour identifier chaque composant.', textEn: 'Complex parts broken down view by view, hotspots to identify each component.' },
              { icon: Eye, titleFr: 'Support AR / VR', titleEn: 'AR / VR support', textFr: 'Export GLB / USDZ pour smartphones, tablettes, casques Meta Quest, Vision Pro.', textEn: 'GLB / USDZ export for smartphones, tablets, Meta Quest headsets, Vision Pro.' },
              { icon: GraduationCap, titleFr: 'Formations Qualiopi', titleEn: 'Qualiopi training', textFr: 'Formations opérateurs financables OPCO. Packshot-Creator Academy certifiée Qualiopi.', textEn: 'Operator training eligible for OPCO funding. Packshot-Creator Academy Qualiopi-certified.' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-graphite-50 rounded-xl border border-graphite-200 p-6">
                  <Icon className="h-8 w-8 text-sysnext-700 mb-4" aria-hidden="true" />
                  <h3 className="font-sysnext-sans font-semibold text-base text-sysnext-900 mb-2">
                    {isFr ? card.titleFr : card.titleEn}
                  </h3>
                  <p className="text-sm text-graphite-700 leading-relaxed">
                    {isFr ? card.textFr : card.textEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-graphite-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-proof-200 text-proof-500 text-xs font-semibold tracking-wider uppercase mb-4">
            {isFr ? 'Horizon 18+ mois' : '18+ month horizon'}
          </div>
          <h2 className="font-sysnext-sans font-bold text-2xl text-sysnext-900 mb-4">
            {isFr
              ? 'Formation AR/VR : use case P3. Priorité sur catalogue, QC, MRO pour 2026.'
              : 'AR/VR training: P3 use case. Priority on catalogue, QC, MRO for 2026.'}
          </h2>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-sysnext-700 px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-900 transition-colors"
          >
            {isFr ? 'Discuter du projet' : 'Discuss the project'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
