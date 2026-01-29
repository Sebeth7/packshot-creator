import type { Metadata } from 'next';
import { MachineSelector } from '@/components/machine-selector';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? 'Sélecteur de Machines Photo | PackshotCreator'
      : 'Photo Machine Selector | PackshotCreator',
    description: isFr
      ? 'Trouvez la machine photo parfaite pour vos besoins. Comparez 20+ studios Orbitvu par taille, fonctionnalités et budget.'
      : 'Find the perfect photo machine for your needs. Compare 20+ Orbitvu studios by size, features and budget.',
  };
}

export default async function MachineSelectorPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang === 'en' ? 'en' : 'fr';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'fr'
                ? 'Trouvez votre studio photo idéal'
                : 'Find your ideal photo studio'}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {locale === 'fr'
                ? 'Plus de 20 machines Orbitvu pour tous vos besoins de photo produit. Filtrez par taille, fonctionnalités et budget.'
                : 'Over 20 Orbitvu machines for all your product photography needs. Filter by size, features and budget.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-green-400">+</span>
                <span>{locale === 'fr' ? 'Bijoux & Montres' : 'Jewelry & Watches'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-green-400">+</span>
                <span>{locale === 'fr' ? 'Chaussures & Mode' : 'Shoes & Fashion'}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span className="text-green-400">+</span>
                <span>{locale === 'fr' ? 'Mobilier & Grands objets' : 'Furniture & Large items'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Selector */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <MachineSelector
            mode="display"
            showFilters={true}
            showPrices={false}
            locale={locale}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {locale === 'fr'
                ? 'Besoin d\'aide pour choisir ?'
                : 'Need help choosing?'}
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'fr'
                ? 'Nos experts sont là pour vous conseiller et vous aider à trouver la solution adaptée à vos besoins.'
                : 'Our experts are here to advise you and help you find the solution suited to your needs.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red/90 transition-colors"
              >
                {locale === 'fr' ? 'Demander un devis' : 'Request a quote'}
              </a>
              <a
                href={`/${locale}/calculateur-roi`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {locale === 'fr' ? 'Calculer mon ROI' : 'Calculate my ROI'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
