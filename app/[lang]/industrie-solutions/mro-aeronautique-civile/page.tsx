import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Plane, Wrench, History, Tablet } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';

/**
 * Landing vertical Sysnext — MRO aéronautique civile.
 *
 * Segment P2 : Air France Industries KLM E&M, Safran Services, ATR, Dassault Falcon Service, Revima, Sabena technics.
 * Normes : EN 9110, EASA Part 145.
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
      ? 'Documentation MRO aéronautique civile — EN 9110 / Part 145'
      : 'Civil aeronautical MRO documentation — EN 9110 / Part 145',
    description: isFr
      ? 'Documentation avant/après standardisée avec Ghost Image. Base de référence visuelle multi-sites. Conformité EN 9110 / Part 145. Intégration GMAO Maximo, SAP PM.'
      : 'Standardised before/after documentation with Ghost Image. Multi-site visual reference base. EN 9110 / Part 145 compliance. Maximo, SAP PM CMMS integration.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/mro-aeronautique-civile`,
      languages: {
        fr: '/fr/industrie-solutions/mro-aeronautique-civile',
        en: '/en/industrie-solutions/mro-aeronautique-civile',
      },
    },
  };
}

export default async function MroPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: isFr ? 'MRO aéronautique civile' : 'Civil aeronautical MRO', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/mro-aeronautique-civile` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-sysnext-200">
            <Link href="/industrie-solutions" className="hover:text-white">Sysnext Industrial Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'MRO aéronautique civile' : 'Civil aeronautical MRO'}</span>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
            EN 9110 · EASA Part 145
          </p>
          <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6 max-w-3xl">
            {isFr
              ? 'La preuve de votre intervention, standardisée et auditable.'
              : 'The proof of your intervention, standardised and auditable.'}
          </h1>
          <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
            {isFr
              ? 'Documentation avant/après intervention avec Ghost Image (superposition transparente). Base de référence visuelle par type d\'équipement, consultable sur tablette sur site. Intégration GMAO Maximo, SAP PM, SOMA, Coswin.'
              : 'Before/after intervention documentation with Ghost Image (transparent overlay). Visual reference base per equipment type, accessible on tablet on site. Maximo, SAP PM, SOMA, Coswin CMMS integration.'}
          </p>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
          >
            {isFr ? 'Réserver une démo MRO' : 'Book an MRO demo'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight mb-10 max-w-2xl">
            {isFr ? 'Quatre usages prouvés chez les MRO civils.' : 'Four proven use cases with civil MROs.'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Plane, titleFr: 'Avant / Après intervention', titleEn: 'Before / after intervention', textFr: 'Comparaison Ghost Image, preuve normée de l\'intervention, traçabilité à la pièce.', textEn: 'Ghost Image comparison, standardised intervention proof, part-level traceability.' },
              { icon: History, titleFr: 'Suivi dégradation temporelle', titleEn: 'Temporal degradation tracking', textFr: 'Comparaison d\'images horodatées sur plusieurs visites, détection d\'usure ou corrosion précoce.', textEn: 'Timestamped image comparison across multiple visits, early wear or corrosion detection.' },
              { icon: Tablet, titleFr: 'Base visuelle sur tablette', titleEn: 'Tablet visual base', textFr: 'Bibliothèque de référence par type d\'équipement consultable sur site. Technicien autonome.', textEn: 'Reference library per equipment type accessible on site. Autonomous technician.' },
              { icon: Wrench, titleFr: 'Intégration GMAO', titleEn: 'CMMS integration', textFr: 'Maximo, SAP PM, SOMA, Coswin. API REST pour connecteurs custom. Documentation 100 % traçable.', textEn: 'Maximo, SAP PM, SOMA, Coswin. REST API for custom connectors. 100% traceable documentation.' },
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
            {isFr ? 'Étude de cas Safran Nacelle MRO en préparation' : 'Safran Nacelle MRO case study in preparation'}
          </div>
          <h2 className="font-sysnext-sans font-bold text-2xl text-sysnext-900 mb-4">
            {isFr
              ? 'Contenu complet S3-S5 : témoignage client, comparatif vs smartphone technicien, FAQ Part 145'
              : 'Full content S3-S5: client testimonial, comparison vs technician smartphone, Part 145 FAQ'}
          </h2>
          <Link
            href="/industrie-solutions#contact"
            className="inline-flex items-center justify-center rounded-md bg-sysnext-700 px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-900 transition-colors"
          >
            {isFr ? 'Parler du projet MRO' : 'Discuss MRO project'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
