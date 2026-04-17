import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getWebflowArticle } from '@/lib/webflow';
import { Link } from '@/i18n/routing';
import {
  TableOfContents,
  ArticleCTA,
  RelatedArticles,
} from '@/components/blog';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, articleSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView } from '@/components/animations';
import {
  processHtmlContent,
  calculateReadingTime,
  type HeadingData,
} from '@/lib/blog-utils';
import { sanitizeHtml } from '@/lib/sanitize';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;

  const webflowArticle = await getWebflowArticle(slug, lang as 'fr' | 'en');
  if (webflowArticle) {
    const pageTitle = webflowArticle.metaTitle || webflowArticle.title;
    return {
      title: pageTitle,
      description: webflowArticle.description,
      alternates: {
        canonical: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
        languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` },
      },
      openGraph: {
        title: pageTitle,
        description: webflowArticle.description,
        images: webflowArticle.image
          ? [webflowArticle.image]
          : [{ url: `/api/og?title=${encodeURIComponent(pageTitle)}&type=blog&lang=${lang}`, width: 1200, height: 630 }],
        type: 'article',
      },
    };
  }

  return { title: 'Article not found' };
}

// Prose classes for Webflow HTML content styling
const articleProseClasses = [
  'prose prose-lg max-w-none',
  'prose-headings:font-heading prose-headings:text-future-dusk-900',
  'prose-p:text-future-dusk-600 prose-p:leading-relaxed',
  'prose-li:text-future-dusk-600',
  'prose-strong:text-future-dusk-900',
  'prose-a:text-very-peri-600 hover:prose-a:text-very-peri-700',
  '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24',
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-future-dusk-800 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24',
  '[&_blockquote]:border-l-4 [&_blockquote]:border-very-peri-500 [&_blockquote]:italic [&_blockquote]:pl-4 [&_blockquote]:text-future-dusk-500',
  '[&_:not(pre)>code]:bg-neutral-100 [&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-sm',
  '[&_img]:rounded-lg [&_img]:shadow-sm [&_img]:my-8',
].join(' ');

export default async function BlogArticlePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogArticle' });

  // Webflow fallback only (static articles have their own routes)
  const webflowArticle = await getWebflowArticle(slug, lang as 'fr' | 'en');
  if (!webflowArticle) notFound();

  const processed = processHtmlContent(webflowArticle.content || '');
  const title = webflowArticle.h1 || webflowArticle.title;
  const description = webflowArticle.description;
  const date = webflowArticle.date;
  const category = webflowArticle.category;
  const imageUrl = webflowArticle.image || null;
  const readingTime = webflowArticle.readingTime ?? calculateReadingTime(processed.wordCount);
  const headings = processed.headings;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: title, url: `https://www.packshot-creator.com/${lang}/blog/${slug}` },
  ];

  return (
    <>
      <HeroSection
        compact
        align="left"
        title={
          <>
            <div className="flex items-center gap-2 text-sm font-sans font-normal text-future-dusk-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-very-peri-300">{category || t('defaultCategory')}</span>
            </div>
            {title}
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-200 mt-2">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {t('readingTime', { minutes: readingTime })}
          </span>
          <span className="px-2 py-0.5 text-xs bg-future-dusk-700 rounded-full text-future-dusk-200">
            {t('webflowArchive')}
          </span>
        </div>
      </HeroSection>

      {imageUrl && (
        <FadeInView>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
            <img src={imageUrl} alt={title} className="w-full rounded-2xl shadow-lg" />
          </div>
        </FadeInView>
      )}

      <FadeInView delay={0.2}>
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="lg:flex lg:gap-12">
              <div className="min-w-0 flex-1 max-w-prose mx-auto lg:mx-0">
                {headings.length > 0 && (
                  <div className="lg:hidden mb-8">
                    <TableOfContents headings={headings} title={t('toc')} collapsible />
                  </div>
                )}
                <article className={articleProseClasses}>
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(processed.processedHtml) }} />
                </article>
                <div className="mt-12 pt-8 border-t border-neutral-100">
                  <Link href="/blog" className="inline-flex items-center gap-2 text-very-peri-600 hover:text-very-peri-700 font-medium transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    {t('backToBlog')}
                  </Link>
                </div>
              </div>
              {headings.length > 0 && (
                <aside className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-24">
                    <TableOfContents headings={headings} title={t('toc')} />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      </FadeInView>

      <ArticleCTA lang={lang} />
      <RelatedArticles currentSlug={slug} category={category} lang={lang} />

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        articleSchema({ title, description, url: `https://www.packshot-creator.com/${lang}/blog/${slug}`, image: imageUrl || undefined, datePublished: date, category }),
      ]} />
    </>
  );
}
