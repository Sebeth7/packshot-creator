import { Metadata } from 'next';
import Image from 'next/image';
import { getWebflowGuides } from '@/lib/webflow-guides';
import { Link } from '@/i18n/routing';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === 'fr'
    ? 'Guides Photo Produit | Tutoriels PackshotCreator'
    : 'Product Photography Guides | PackshotCreator Tutorials';
  const description = lang === 'fr'
    ? 'Guides pratiques et tutoriels pour maîtriser la photographie de produit. Techniques de prise de vue, 360°, focus stacking et retouche.'
    : 'Practical guides and tutorials for mastering product photography. Shooting techniques, 360°, focus stacking and editing.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/guide`,
      languages: { fr: '/fr/guide', en: '/en/guide' },
    },
    openGraph: {
      title,
      description,
      url: `https://packshot-creator.com/${lang}/guide`,
      type: 'website',
    },
  };
}

export default async function GuidesPage({ params }: PageProps) {
  const { lang } = await params;
  const guides = await getWebflowGuides();

  const breadcrumbs = breadcrumbSchema([
    { name: lang === 'fr' ? 'Accueil' : 'Home', url: `https://packshot-creator.com/${lang}` },
    { name: 'Guides', url: `https://packshot-creator.com/${lang}/guide` },
  ]);

  return (
    <>
      <SchemaOrg schema={[breadcrumbs]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-very-peri-500/20 rounded-full text-very-peri-200 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            {guides.length} {lang === 'fr' ? 'guides disponibles' : 'guides available'}
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            {lang === 'fr' ? 'Guides Photo Produit' : 'Product Photography Guides'}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Tutoriels pas-à-pas pour maîtriser la photographie de produit professionnelle avec les solutions PackshotCreator.'
              : 'Step-by-step tutorials to master professional product photography with PackshotCreator solutions.'}
          </p>
        </div>
      </section>

      {/* Guide grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => {
              const cleanTitle = guide.mainTitle.replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/gu, '').trim();
              return (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {guide.mainImage && (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={guide.mainImage}
                        alt={cleanTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-lg font-heading font-bold text-future-dusk-900 mb-3 group-hover:text-very-peri-600 transition-colors line-clamp-2">
                      {cleanTitle}
                    </h2>
                    {guide.metaDescription && (
                      <p className="text-sm text-future-dusk-500 mb-4 line-clamp-2">
                        {guide.metaDescription}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {guide.duration && (
                          <span className="inline-flex items-center gap-1 text-xs text-future-dusk-400">
                            <Clock className="w-3.5 h-3.5" />
                            {guide.duration}
                          </span>
                        )}
                        {guide.steps.length > 0 && (
                          <span className="text-xs text-future-dusk-400">
                            {guide.steps.length} {lang === 'fr' ? 'étapes' : 'steps'}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-very-peri-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            {lang === 'fr' ? 'Envie de progresser davantage ?' : 'Want to progress further?'}
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Découvrez nos formations certifiées Qualiopi pour maîtriser la photographie produit professionnelle.'
              : 'Discover our Qualiopi-certified training courses to master professional product photography.'}
          </p>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-very-peri-700 font-bold rounded-xl hover:bg-neutral-100 transition-colors"
          >
            {lang === 'fr' ? 'Voir les formations' : 'View courses'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
