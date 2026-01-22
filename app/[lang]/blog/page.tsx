import { getTranslations } from 'next-intl/server';
import { getAllArticles } from '@/lib/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const posts = await getAllArticles(0); // 0 = all articles
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6">
              {t('heading')}
            </h1>
            <div className="w-24 h-1 bg-secondary-orbitvu mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-neutral-medium max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-medium text-lg">{t('noArticles')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Image */}
                    <div className="relative h-48 w-full bg-neutral-lighter overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-orbitvu/10 to-secondary-orbitvu/10">
                          <svg
                            className="w-16 h-16 text-neutral-light"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {/* Category + Date */}
                      <div className="flex items-center gap-3 text-sm">
                        {post.category && (
                          <span className="px-3 py-1 rounded-full bg-accent-lime text-neutral-dark font-medium text-xs uppercase tracking-wide">
                            {post.category}
                          </span>
                        )}
                        <span className="text-neutral-medium/60">
                          {new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-xl font-bold text-neutral-dark group-hover:text-secondary-orbitvu transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-neutral-medium text-sm line-clamp-3">
                        {post.description}
                      </p>

                      {/* Read more */}
                      <div className="pt-2">
                        <span className="text-secondary-orbitvu font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          {t('cta')}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary-orbitvu/5 to-secondary-orbitvu/5 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
              {t('ctaHeading')}
            </h2>
            <p className="text-lg text-neutral-medium mb-8">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary-orbitvu hover:bg-primary-orbitvu text-white">
                <Link href="/contact">{t('ctaContact')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-secondary-orbitvu text-secondary-orbitvu hover:bg-secondary-orbitvu hover:text-white">
                <Link href="/academy">{t('ctaFormation')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
