import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getMdxArticle } from '@/lib/blog';
import { getWebflowArticle } from '@/lib/webflow';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';
import {
  TableOfContents,
  ArticleCTA,
  RelatedArticles,
  Callout,
  ComparisonTable,
} from '@/components/blog';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, articleSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { FadeInView } from '@/components/animations';
import {
  processHtmlContent,
  extractMarkdownHeadings,
  calculateReadingTime,
  slugify,
  type HeadingData,
} from '@/lib/blog-utils';
import { sanitizeHtml } from '@/lib/sanitize';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;

  // Try MDX first
  const mdxArticle = getMdxArticle(slug);
  if (mdxArticle) {
    return {
      title: mdxArticle.title,
      description: mdxArticle.description,
      keywords: mdxArticle.keywords?.join(', '),
      alternates: {
        canonical: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
        languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` },
      },
      openGraph: {
        title: mdxArticle.title,
        description: mdxArticle.description,
        images: mdxArticle.image
          ? [{ url: mdxArticle.image, width: 1200, height: 630 }]
          : [{ url: `/api/og?title=${encodeURIComponent(mdxArticle.title)}&type=blog&lang=${lang}`, width: 1200, height: 630 }],
        type: 'article',
        publishedTime: mdxArticle.date,
        authors: [mdxArticle.author],
      },
    };
  }

  // Fallback to Webflow
  const webflowArticle = await getWebflowArticle(slug);
  if (webflowArticle) {
    return {
      title: webflowArticle.title,
      description: webflowArticle.description,
      alternates: {
        canonical: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
        languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` },
      },
      openGraph: {
        title: webflowArticle.title,
        description: webflowArticle.description,
        images: webflowArticle.image
          ? [webflowArticle.image]
          : [{ url: `/api/og?title=${encodeURIComponent(webflowArticle.title)}&type=blog&lang=${lang}`, width: 1200, height: 630 }],
        type: 'article',
      },
    };
  }

  return {
    title: 'Article not found',
  };
}

// MDX components for rendering
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="font-heading text-4xl font-bold text-future-dusk-900 mb-6 mt-8" {...props} />
  ),
  h2: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    return <h2 id={id} className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24" {...props} />;
  },
  h3: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    return <h3 id={id} className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24" {...props} />;
  },
  h4: (props: any) => (
    <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-2 mt-4" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-relaxed text-future-dusk-600" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="text-future-dusk-600" {...props} />,
  strong: (props: any) => <strong className="font-bold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  a: (props: any) => {
    const isExternal = props.href?.startsWith('http');
    return (
      <a
        className="text-very-peri-600 hover:text-very-peri-700 underline transition-colors"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-very-peri-500 pl-4 italic my-6 text-future-dusk-500" {...props} />
  ),
  code: (props: any) => {
    // Inline code
    if (!props.className) {
      return <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    }
    // Code block (wrapped in pre)
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-future-dusk-900 text-white p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg shadow-sm my-8 max-w-full" alt={props.alt || ''} {...props} />
  ),
  hr: () => <hr className="my-8 border-neutral-200" />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-neutral-200 rounded-lg" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="bg-future-dusk-50 px-4 py-3 text-left text-sm font-semibold text-future-dusk-900 border-b border-neutral-200" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 text-sm text-future-dusk-600 border-b border-neutral-100" {...props} />
  ),
  // Custom components available in MDX
  Callout,
  ComparisonTable,
};

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

  // 1. Try MDX first
  const mdxArticle = getMdxArticle(slug);
  // 2. Fallback to Webflow
  const webflowArticle = !mdxArticle ? await getWebflowArticle(slug) : null;

  if (!mdxArticle && !webflowArticle) notFound();

  // Normalize article data
  let title: string;
  let description: string;
  let date: string;
  let author: string | undefined;
  let category: string | undefined;
  let imageUrl: string | null;
  let readingTime: number;
  let headings: HeadingData[];
  let contentElement: React.ReactNode;
  let isWebflow = false;

  if (mdxArticle) {
    title = mdxArticle.title;
    description = mdxArticle.description;
    date = mdxArticle.date;
    author = mdxArticle.author;
    category = mdxArticle.category;
    imageUrl = mdxArticle.image || null;
    readingTime = mdxArticle.readingTime;
    headings = extractMarkdownHeadings(mdxArticle.content);
    contentElement = (
      <MDXRemote source={mdxArticle.content} components={mdxComponents} />
    );
  } else {
    const wf = webflowArticle!;
    const processed = processHtmlContent(wf.content || '');
    title = wf.title;
    description = wf.description;
    date = wf.date;
    category = wf.category;
    imageUrl = wf.image || null;
    readingTime = calculateReadingTime(processed.wordCount);
    headings = processed.headings;
    isWebflow = true;
    contentElement = (
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(processed.processedHtml) }} />
    );
  }

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: title, url: `https://www.packshot-creator.com/${lang}/blog/${slug}` },
  ];

  const tocTitle = t('toc');

  return (
    <>
      {/* Article Header */}
      <HeroSection
        compact
        align="left"
        title={
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-sans font-normal text-future-dusk-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {t('home')}
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
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
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </span>
          {author && (
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {author}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {t('readingTime', { minutes: readingTime })}
          </span>
          {isWebflow && (
            <span className="px-2 py-0.5 text-xs bg-future-dusk-700 rounded-full text-future-dusk-200">
              {t('webflowArchive')}
            </span>
          )}
        </div>
      </HeroSection>

      {/* Featured Image */}
      {imageUrl && (
        <FadeInView>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
            <img
              src={imageUrl}
              alt={title}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </FadeInView>
      )}

      {/* Article Content with ToC sidebar */}
      <FadeInView delay={0.2}>
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="lg:flex lg:gap-12">
              {/* Main content */}
              <div className="min-w-0 flex-1 max-w-prose mx-auto lg:mx-0">
                {/* Mobile ToC */}
                {headings.length > 0 && (
                  <div className="lg:hidden mb-8">
                    <TableOfContents headings={headings} title={tocTitle} collapsible />
                  </div>
                )}

                <article className={isWebflow ? articleProseClasses : ''}>
                  {contentElement}
                </article>

                {/* Back to blog */}
                <div className="mt-12 pt-8 border-t border-neutral-100">
                  <Link href="/blog" className="inline-flex items-center gap-2 text-very-peri-600 hover:text-very-peri-700 font-medium transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    {t('backToBlog')}
                  </Link>
                </div>
              </div>

              {/* Desktop ToC sidebar */}
              {headings.length > 0 && (
                <aside className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-24">
                    <TableOfContents headings={headings} title={tocTitle} />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* CTA */}
      <ArticleCTA lang={lang} />

      {/* Related Articles */}
      <RelatedArticles currentSlug={slug} category={category} lang={lang} />

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title,
          description,
          url: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
          image: imageUrl || undefined,
          datePublished: date,
          author,
          category,
        }),
      ]} />
    </>
  );
}
