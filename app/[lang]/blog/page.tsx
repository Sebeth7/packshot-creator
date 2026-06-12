import { getTranslations } from 'next-intl/server';
import { getAllArticles } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import { BlogGrid } from '@/components/blog/BlogGrid';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog`,
      languages: { fr: '/fr/blog', en: '/en/blog', 'x-default': '/fr/blog' },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/blog`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(t('metaTitle'))}&type=blog&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [`/api/og?title=${encodeURIComponent(t('metaTitle'))}&type=blog&lang=${lang}`],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = await getAllArticles(lang as 'fr' | 'en', 0);
  const t = await getTranslations({ locale: lang, namespace: 'blog' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
  ];

  // Pre-format dates server-side to avoid hydration mismatch (timezone differences).
  // Les STATIC_ARTICLES ont des dates 'YYYY-MM-DD', les migrés ont ISO complet
  // ('YYYY-MM-DDTHH:mm:ss.sssZ') — on gère les deux sans doubler le suffixe T.
  const formatDate = (date: string) =>
    new Date(date.includes('T') ? date : date + 'T00:00:00').toLocaleDateString(
      isFr ? 'fr-FR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' },
    );

  const postsWithFormattedDates = posts.map((p) => ({
    ...p,
    formattedDate: formatDate(p.date),
    image: p.image ?? undefined,
    category: p.category ?? undefined,
  }));

  const heroPost = postsWithFormattedDates[0];
  const gridPosts = postsWithFormattedDates.slice(1);
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))] as string[];

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={t('heading')}
        subtitle={t('subtitle')}
      >
        <div className="w-16 h-1 bg-very-peri-400 mx-auto mb-6 rounded-full" />
      </HeroSection>

      {/* Hero Article Card */}
      {heroPost && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView>
              <Link href={`/blog/${heroPost.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-0 rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:border-very-peri-200 transition-all duration-300">
                  <div className="relative h-64 lg:h-80 bg-neutral-100 overflow-hidden">
                    {heroPost.image && heroPost.image.endsWith('.mp4') ? (
                      // Vignettes .mp4 héritées de Webflow : l'optimiseur d'images ne traite pas la vidéo (400)
                      <video
                        src={heroPost.image}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        aria-label={heroPost.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : heroPost.image ? (
                      <Image
                        src={heroPost.image}
                        alt={heroPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-very-peri-50 to-future-dusk-100">
                        <BookOpen className="h-16 w-16 text-very-peri-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-very-peri-600">
                      {t('latestArticle')}
                    </span>
                    <div className="flex items-center gap-3 text-sm">
                      {heroPost.category && (
                        <span className="px-3 py-1 rounded-full bg-very-peri-100 text-very-peri-700 font-medium text-xs uppercase tracking-wide">
                          {heroPost.category}
                        </span>
                      )}
                      <span className="text-future-dusk-400">
                        {heroPost.formattedDate}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                      {heroPost.title}
                    </h2>
                    <p className="text-future-dusk-500 line-clamp-3">
                      {heroPost.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-very-peri-600 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        {t('cta')}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInView>
          </div>
        </section>
      )}

      {/* Articles Grid with filter */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {gridPosts.length === 0 && !heroPost ? (
            <div className="text-center py-12">
              <p className="text-future-dusk-500 text-lg">{t('noArticles')}</p>
            </div>
          ) : (
            <BlogGrid
              articles={gridPosts}
              categories={categories}
              lang={lang}
              translations={{
                all: t('filterAll'),
                readArticle: t('cta'),
                showMore: t('showMore'),
              }}
            />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              {t('ctaHeading')}
            </h2>
            <p className="text-lg text-very-peri-100 mb-8">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
                <Link href="/contact">
                  {t('ctaContact')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
                <Link href="/academy">
                  {t('ctaFormation')}
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
