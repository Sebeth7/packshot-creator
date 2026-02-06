import { getTranslations } from 'next-intl/server';
import { getAllArticles } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/blog`,
      languages: { fr: '/fr/blog', en: '/en/blog' },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = await getAllArticles(0);
  const t = await getTranslations({ locale: lang, namespace: 'blog' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://packshot-creator.com/${lang}/blog` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4">
            {t('heading')}
          </h1>
          <div className="w-16 h-1 bg-very-peri-400 mx-auto mb-6 rounded-full" />
          <p className="text-lg sm:text-xl text-future-dusk-200 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-future-dusk-500 text-lg">{t('noArticles')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg hover:border-very-peri-200 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-very-peri-50 to-future-dusk-100">
                        <BookOpen className="h-12 w-12 text-very-peri-300" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    {/* Category + Date */}
                    <div className="flex items-center gap-3 text-sm">
                      {post.category && (
                        <span className="px-3 py-1 rounded-full bg-very-peri-100 text-very-peri-700 font-medium text-xs uppercase tracking-wide">
                          {post.category}
                        </span>
                      )}
                      <span className="text-future-dusk-400">
                        {new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading text-xl font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-future-dusk-500 text-sm line-clamp-3">
                      {post.description}
                    </p>

                    {/* Read more */}
                    <div className="pt-2">
                      <span className="text-very-peri-600 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        {t('cta')}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
