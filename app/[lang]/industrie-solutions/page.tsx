import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Factory, ClipboardCheck, Plane, Scale, GraduationCap } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';

/**
 * Hub Sysnext Industrial Solutions — porte d'entrée du mini-site.
 *
 * Draft matière brute — textes FR à valider/finaliser par Seb (règle d'or 2).
 * Source wireframe détaillé : playbooks/web/W01 et variantes futures.
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Sysnext Industrial Solutions — Documentation visuelle industrielle'
      : 'Sysnext Industrial Solutions — Industrial visual documentation',
    description: isFr
      ? "Stations Orbitvu pour catalogue aftermarket, QC inspection, MRO aéronautique et forensique. Standardisation, conformité AS9100/IATF/ISO 13485, intégration PIM/ERP/GMAO."
      : "Orbitvu stations for aftermarket catalogue, QC inspection, aeronautical MRO and forensics. Standardisation, AS9100/IATF/ISO 13485 compliance, PIM/ERP/CMMS integration.",
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions`,
      languages: {
        fr: '/fr/industrie-solutions',
        en: '/en/industrie-solutions',
      },
    },
    openGraph: {
      title: isFr
        ? 'Sysnext Industrial Solutions — Documentation visuelle industrielle'
        : 'Sysnext Industrial Solutions — Industrial visual documentation',
      description: isFr
        ? 'Documentation visuelle industrielle standardisée, auditable, intégrée au SI.'
        : 'Standardised, auditable industrial visual documentation, integrated into your IT stack.',
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/industrie-solutions`,
      siteName: 'Sysnext Industrial Solutions',
      locale: isFr ? 'fr_FR' : 'en_US',
    },
  };
}

const verticals = [
  {
    slug: 'catalogue-pieces-detachees',
    icon: Factory,
    titleFr: 'Catalogue pièces détachées',
    titleEn: 'Spare parts catalogue',
    pitchFr:
      'Industrialiser la photo de votre catalogue aftermarket : 300 à 500 pièces par jour, standardisées, intégrées à votre PIM.',
    pitchEn:
      'Industrialise your aftermarket catalogue photography: 300 to 500 parts per day, standardised, integrated into your PIM.',
  },
  {
    slug: 'controle-qualite-inspection',
    icon: ClipboardCheck,
    titleFr: 'Contrôle qualité & inspection',
    titleEn: 'Quality control & inspection',
    pitchFr:
      'Rapports NCR auto-générés, golden sample visuel, dossier audit AS9100 / IATF / ISO 13485 prêt sur demande.',
    pitchEn:
      'Auto-generated NCR reports, visual golden sample, AS9100 / IATF / ISO 13485 audit folder ready on demand.',
  },
  {
    slug: 'mro-aeronautique-civile',
    icon: Plane,
    titleFr: 'MRO aéronautique civile',
    titleEn: 'Civil aeronautical MRO',
    pitchFr:
      'Documentation avant/après standardisée avec Ghost Image. Conformité EN 9110 / Part 145, intégration GMAO.',
    pitchEn:
      'Standardised before/after documentation with Ghost Image. EN 9110 / Part 145 compliance, CMMS integration.',
  },
  {
    slug: 'documentation-forensique',
    icon: Scale,
    titleFr: 'Documentation forensique',
    titleEn: 'Forensic documentation',
    pitchFr:
      'Paramètres verrouillés, horodatage cryptographique, signature numérique. Valeur probatoire garantie.',
    pitchEn:
      'Locked parameters, cryptographic timestamping, digital signature. Guaranteed evidentiary value.',
  },
  {
    slug: 'formation-technique-ar-vr',
    icon: GraduationCap,
    titleFr: 'Formation technique AR / VR',
    titleEn: 'AR / VR technical training',
    pitchFr:
      'Manuels 360° interactifs, vues éclatées, support AR/VR pour équipes MRO et production.',
    pitchEn:
      'Interactive 360° manuals, exploded views, AR/VR support for MRO and production teams.',
  },
] as const;

export default async function SysnextHubPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
              {isFr ? 'Documentation visuelle industrielle' : 'Industrial visual documentation'}
            </p>
            <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6">
              {isFr
                ? 'La preuve visuelle devient un livrable industriel.'
                : 'Visual proof becomes an industrial deliverable.'}
            </h1>
            <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
              {isFr
                ? 'Stations Orbitvu pilotées par Templates verrouillés, intégrées à votre ERP/PIM/GMAO, utilisables par un opérateur non-photographe. Aftermarket, QC, MRO, forensique, medical.'
                : 'Orbitvu stations driven by locked Templates, integrated into your ERP/PIM/CMMS, usable by a non-photographer operator. Aftermarket, QC, MRO, forensics, medical.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/industrie-solutions#contact"
                className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
              >
                {isFr ? 'Réserver une démo de 30 minutes' : 'Book a 30-minute demo'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/industrie-solutions/calculateur-roi"
                className="inline-flex items-center justify-center rounded-md border border-sysnext-200/40 bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-700 transition-colors"
              >
                {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verticals grid */}
      <section className="bg-graphite-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 mb-4 tracking-tight">
              {isFr ? 'Cinq applications industrielles' : 'Five industrial applications'}
            </h2>
            <p className="text-graphite-700 leading-relaxed">
              {isFr
                ? 'Une technologie commune, cinq contextes métier, cinq promesses chiffrées. Draft à enrichir.'
                : 'One technology, five business contexts, five measurable promises. Draft to enrich.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v) => {
              const Icon = v.icon;
              return (
                <Link
                  key={v.slug}
                  href={`/industrie-solutions/${v.slug}`}
                  className="group bg-white rounded-xl border border-graphite-200 p-6 hover:border-sysnext-500 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sysnext-50 text-sysnext-700 mb-4 group-hover:bg-sysnext-700 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-sysnext-sans font-semibold text-lg text-sysnext-900 mb-2">
                    {isFr ? v.titleFr : v.titleEn}
                  </h3>
                  <p className="text-sm text-graphite-700 leading-relaxed mb-4">
                    {isFr ? v.pitchFr : v.pitchEn}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-sysnext-700 group-hover:text-sysnext-900">
                    {isFr ? 'Découvrir' : 'Learn more'}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-sysnext-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-sysnext-sans font-bold text-3xl sm:text-4xl text-white mb-4 tracking-tight">
            {isFr ? 'Parlons de votre documentation visuelle.' : "Let's talk about your visual documentation."}
          </h2>
          <p className="text-sysnext-200 leading-relaxed mb-8 max-w-xl mx-auto">
            {isFr
              ? "30 minutes avec le fondateur, Seb Ducros. Échange technique, sans engagement. Draft — texte à retravailler par Seb."
              : '30 minutes with founder Seb Ducros. Technical conversation, no commitment. Draft — text to refine by Seb.'}
          </p>
          <Link
            href="https://calendly.com/sebastienjourdan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
          >
            {isFr ? 'Réserver un créneau' : 'Book a slot'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
