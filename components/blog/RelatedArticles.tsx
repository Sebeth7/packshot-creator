import { getTranslations } from 'next-intl/server';
import { getAllArticles } from '@/lib/blog';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { FadeInView } from '@/components/animations';

interface RelatedArticlesProps {
  currentSlug: string;
  category?: string;
  lang: string;
}

export async function RelatedArticles({ currentSlug, category, lang }: RelatedArticlesProps) {
  const t = await getTranslations({ locale: lang, namespace: 'blogArticle' });
  const allArticles = await getAllArticles(lang as 'fr' | 'en', 0);

  let candidates = allArticles.filter((a) => a.slug !== currentSlug);

  if (category) {
    const sameCategory = candidates.filter((a) => a.category === category);
    if (sameCategory.length >= 3) {
      candidates = sameCategory;
    }
  }

  const related = candidates.slice(0, 3);
  if (related.length === 0) return null;

  const isFr = lang === 'fr';

  return (
    <FadeInView>
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-8">
            {t('relatedHeading')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg hover:border-very-peri-200 transition-all duration-300 block"
              >
                <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-very-peri-50 to-future-dusk-100">
                      <BookOpen className="h-12 w-12 text-very-peri-300" />
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    {article.category && (
                      <span className="px-3 py-1 rounded-full bg-very-peri-100 text-very-peri-700 font-medium text-xs uppercase tracking-wide">
                        {article.category}
                      </span>
                    )}
                    <span className="text-future-dusk-400">
                      {new Date(article.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-future-dusk-500 text-sm line-clamp-2">
                    {article.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-very-peri-600 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      {t('readArticle')}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </FadeInView>
  );
}
