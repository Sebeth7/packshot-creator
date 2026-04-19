import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';
import RoiCalculator from '@/components/sysnext/RoiCalculator';

/**
 * Page calculateur ROI industrie — Sysnext Industrial Solutions.
 * Règle R8 cohabitation : fork dédié, branding et presets Sysnext uniquement.
 * Source : config/cohabitation-marques.md §3 R8.
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Calculateur ROI — Documentation visuelle industrielle'
      : 'ROI calculator — Industrial visual documentation',
    description: isFr
      ? "Estimez votre économie annuelle, votre réduction de time-to-market et votre amortissement en 2 minutes. Presets aftermarket auto, QC, MRO aéronautique."
      : 'Estimate your annual savings, time-to-market reduction and amortisation in 2 minutes. Presets for automotive aftermarket, QC, aeronautical MRO.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/calculateur-roi`,
      languages: {
        fr: '/fr/industrie-solutions/calculateur-roi',
        en: '/en/industrie-solutions/calculateur-roi',
      },
    },
  };
}

export default async function RoiPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: isFr ? 'Calculateur ROI' : 'ROI calculator', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/calculateur-roi` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-sysnext-200">
            <Link href="/industrie-solutions" className="hover:text-white">Sysnext Industrial Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{isFr ? 'Calculateur ROI' : 'ROI calculator'}</span>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
            {isFr ? 'ROI chiffré en 2 minutes' : 'ROI figures in 2 minutes'}
          </p>
          <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl leading-tight tracking-tight text-white mb-4 max-w-3xl">
            {isFr
              ? 'Calculez l\'économie de votre documentation visuelle industrielle.'
              : 'Calculate the savings of your industrial visual documentation.'}
          </h1>
          <p className="text-lg text-sysnext-200 leading-relaxed max-w-2xl">
            {isFr
              ? 'Ajustez les paramètres de votre activité, obtenez une estimation instantanée. Recevez l\'analyse complète par email avec recommandations personnalisées de Seb Ducros.'
              : 'Adjust your business parameters, get an instant estimate. Receive the full analysis by email with personalised recommendations from Seb Ducros.'}
          </p>
        </div>
      </section>

      <section className="bg-graphite-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <RoiCalculator lang={lang} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-sysnext-sans font-bold text-2xl text-sysnext-900 mb-4">
            {isFr ? 'Prêt à parler chiffres avec le fondateur ?' : 'Ready to talk figures with the founder?'}
          </h2>
          <p className="text-graphite-700 leading-relaxed mb-6 max-w-xl mx-auto">
            {isFr
              ? '30 minutes de visio avec Seb Ducros. Pas de présentation commerciale : échange technique, compréhension de votre contexte, recommandations concrètes.'
              : '30-minute video call with Seb Ducros. No sales pitch: technical exchange, understanding your context, concrete recommendations.'}
          </p>
          <Link
            href="https://calendly.com/sebastienjourdan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-sysnext-900 px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-700 transition-colors"
          >
            {isFr ? 'Réserver un créneau' : 'Book a slot'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
