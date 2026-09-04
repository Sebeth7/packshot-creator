import { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getAllGuides, type Lang } from '@/lib/content';
import { Link } from '@/i18n/routing';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { buildLanguages } from '@/lib/hreflang';
import { tx } from '@/lib/locale-text';

export const revalidate = 3600;

// de-ch inclus : le layout parent ne prérend que fr/en (dynamicParams=false),
// donc le listing guide doit déclarer lui-même la locale suisse, sinon /de-ch/guide → 404.
export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  // de-ch : title/meta en allemand (le listing servait ceux de /en/guide — audit
  // Laurent 03/09/2026, addendum A1).
  const title = tx(lang,
    'Guides Photo Produit | Tutoriels PackshotCreator',
    'Product Photography Guides | PackshotCreator Tutorials',
    'Produktfotografie-Ratgeber | PackshotCreator Anleitungen');
  const description = tx(lang,
    'Guides pratiques et tutoriels pour maîtriser la photographie de produit. Techniques de prise de vue, 360°, focus stacking et retouche.',
    'Practical guides and tutorials for mastering product photography. Shooting techniques, 360°, focus stacking and editing.',
    'Praktische Ratgeber und Anleitungen für professionelle Produktfotografie. Aufnahmetechniken, 360°, Focus Stacking und Bildbearbeitung.');

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/guide`,
      languages: buildLanguages('/fr/guide', { en: '/en/guide', deCh: '/de-ch/guide' }),
    },
    openGraph: {
      title,
      description,
      url: `https://www.packshot-creator.com/${lang}/guide`,
      type: 'website',
      images: [{ url: `/api/og?title=${encodeURIComponent(title)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function GuidesPage({ params }: PageProps) {
  const { lang } = await params;
  setRequestLocale(lang);
  const guides = getAllGuides(lang as Lang);

  const breadcrumbs = breadcrumbSchema([
    { name: tx(lang, 'Accueil', 'Home', 'Startseite'), url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'Guides', 'Guides', 'Ratgeber'), url: `https://www.packshot-creator.com/${lang}/guide` },
  ]);

  return (
    <>
      <SchemaOrg schema={[breadcrumbs]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-very-peri-500/20 rounded-full text-very-peri-200 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {guides.length} {tx(lang, 'guides disponibles', 'guides available', 'Ratgeber verfügbar')}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              {tx(lang, 'Guides Photo Produit', 'Product Photography Guides', 'Produktfotografie-Ratgeber')}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {tx(lang,
                'Tutoriels pas-à-pas pour maîtriser la photographie de produit professionnelle avec les solutions PackshotCreator.',
                'Step-by-step tutorials to master professional product photography with PackshotCreator solutions.',
                'Schritt-für-Schritt-Anleitungen für professionelle Produktfotografie mit den Lösungen von PackshotCreator.')}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Guide grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => {
              const rawTitle = guide.h1 || guide.title;
              const cleanTitle = rawTitle.replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/gu, '').trim();
              return (
                <StaggerItem key={guide.slug}>
                  <Link
                    href={{ pathname: '/guide/[slug]', params: { slug: guide.slug } }}
                    className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg transition-shadow block"
                  >
                    {guide.image && (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={guide.image}
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
                      {guide.description && (
                        <p className="text-sm text-future-dusk-500 mb-4 line-clamp-2">
                          {guide.description}
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
                              {guide.steps.length} {tx(lang, 'étapes', 'steps', 'Schritte')}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-very-peri-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              {tx(lang, 'Envie de progresser davantage ?', 'Want to progress further?', 'Möchten Sie weiterkommen?')}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {tx(lang,
                'Découvrez nos formations certifiées Qualiopi pour maîtriser la photographie produit professionnelle.',
                'Discover our Qualiopi-certified training courses to master professional product photography.',
                'Entdecken Sie unsere Qualiopi-zertifizierten Schulungen für professionelle Produktfotografie.')}
            </p>
            <Link
              href="/academy"
              locale={lang === 'de-ch' ? 'en' : undefined}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-very-peri-700 font-bold rounded-xl hover:bg-neutral-100 transition-colors"
            >
              {tx(lang, 'Voir les formations', 'View courses', 'Schulungen ansehen')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
