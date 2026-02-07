import { notFound } from 'next/navigation';
import { getWebflowArticle } from '@/lib/webflow';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { getSanityBlogPost, urlFor } from '@/lib/sanity-blog';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, articleSchema } from '@/components/seo/SchemaOrg';
import { FadeInView } from '@/components/animations';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;

  // Try Sanity first
  const sanityPost = await getSanityBlogPost(slug);
  if (sanityPost) {
    const seoTitle = sanityPost.seo?.seoTitle || sanityPost.title;
    const seoDescription = sanityPost.seo?.seoDescription || sanityPost.description;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: sanityPost.keywords?.join(', '),
      alternates: {
        canonical: `https://packshot-creator.com/${lang}/blog/${slug}`,
        languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` },
      },
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: sanityPost.image ? [urlFor(sanityPost.image).width(1200).height(630).url()] : [],
        type: 'article',
        publishedTime: sanityPost.date,
        authors: [sanityPost.author],
      },
      robots: {
        index: !sanityPost.seo?.noIndex,
        follow: !sanityPost.seo?.noIndex,
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
        canonical: `https://packshot-creator.com/${lang}/blog/${slug}`,
        languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` },
      },
      openGraph: {
        title: webflowArticle.title,
        description: webflowArticle.description,
        images: webflowArticle.image ? [webflowArticle.image] : [],
        type: 'article',
      },
    };
  }

  return {
    title: 'Article not found',
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const isFr = lang === 'fr';

  // 1. Check for Sanity article first
  const sanityPost = await getSanityBlogPost(slug);

  if (sanityPost) {
    const imageUrl = sanityPost.image
      ? urlFor(sanityPost.image).width(1200).height(600).url()
      : null;

    const breadcrumbs = [
      { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
      { name: 'Blog', url: `https://packshot-creator.com/${lang}/blog` },
      { name: sanityPost.title, url: `https://packshot-creator.com/${lang}/blog/${slug}` },
    ];

    return (
      <>
        {/* Article Header */}
        <FadeInView>
          <section className="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white py-12 lg:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-future-dusk-300 mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  {isFr ? 'Accueil' : 'Home'}
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-very-peri-300">{sanityPost.category || 'Article'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
                {sanityPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-200">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={sanityPost.date}>
                    {new Date(sanityPost.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {sanityPost.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {sanityPost.readingTime} min {isFr ? 'de lecture' : 'read'}
                </span>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {imageUrl && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
              <img
                src={imageUrl}
                alt={sanityPost.image?.alt || sanityPost.title}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          )}
        </FadeInView>

        {/* Article Content */}
        <FadeInView delay={0.2}>
          <section className="py-12 lg:py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900 prose-a:text-very-peri-600 hover:prose-a:text-very-peri-700">
                <PortableText
                  value={sanityPost.content}
                  components={portableTextComponents}
                />
              </article>

              {/* Back to blog */}
              <div className="mt-12 pt-8 border-t border-neutral-100">
                <Link href="/blog" className="inline-flex items-center gap-2 text-very-peri-600 hover:text-very-peri-700 font-medium transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  {isFr ? 'Retour au blog' : 'Back to blog'}
                </Link>
              </div>
            </div>
          </section>
        </FadeInView>

        {/* CTA */}
        <FadeInView>
          <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
                {isFr ? 'Prêt à automatiser votre production photo ?' : 'Ready to automate your photo production?'}
              </h2>
              <p className="text-lg text-very-peri-100 mb-8">
                {isFr
                  ? 'Découvrez nos solutions de studios photo automatisés et d\'IA photo produit.'
                  : 'Discover our automated photo studio solutions and AI product photography.'}
              </p>
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
                <Link href="/contact">
                  {isFr ? 'Réserver une démo' : 'Book a demo'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </FadeInView>

        <SchemaOrg schema={[
          organizationSchema(),
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            title: sanityPost.title,
            description: sanityPost.description,
            url: `https://packshot-creator.com/${lang}/blog/${slug}`,
            image: imageUrl || undefined,
            datePublished: sanityPost.date,
            author: sanityPost.author,
            category: sanityPost.category,
          }),
        ]} />
      </>
    );
  }

  // 2. Fallback to Webflow article
  const webflowArticle = await getWebflowArticle(slug);

  if (webflowArticle) {
    const breadcrumbs = [
      { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
      { name: 'Blog', url: `https://packshot-creator.com/${lang}/blog` },
      { name: webflowArticle.title, url: `https://packshot-creator.com/${lang}/blog/${slug}` },
    ];

    return (
      <>
        {/* Article Header */}
        <FadeInView>
          <section className="bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white py-12 lg:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-future-dusk-300 mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  {isFr ? 'Accueil' : 'Home'}
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-very-peri-300">{webflowArticle.category || 'Article'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
                {webflowArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-200">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={webflowArticle.date}>
                    {new Date(webflowArticle.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </span>
                <span className="px-2 py-0.5 text-xs bg-future-dusk-700 rounded-full text-future-dusk-200">
                  {isFr ? 'Archive Webflow' : 'Webflow Archive'}
                </span>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {webflowArticle.image && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
              <img
                src={webflowArticle.image}
                alt={webflowArticle.title}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          )}
        </FadeInView>

        {/* Article Content */}
        <FadeInView delay={0.2}>
          <section className="py-12 lg:py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900 prose-a:text-very-peri-600 hover:prose-a:text-very-peri-700">
                <div
                  dangerouslySetInnerHTML={{ __html: webflowArticle.content || '' }}
                />
              </article>

              {/* Back to blog */}
              <div className="mt-12 pt-8 border-t border-neutral-100">
                <Link href="/blog" className="inline-flex items-center gap-2 text-very-peri-600 hover:text-very-peri-700 font-medium transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  {isFr ? 'Retour au blog' : 'Back to blog'}
                </Link>
              </div>
            </div>
          </section>
        </FadeInView>

        {/* CTA */}
        <FadeInView>
          <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
                {isFr ? 'Prêt à automatiser votre production photo ?' : 'Ready to automate your photo production?'}
              </h2>
              <p className="text-lg text-very-peri-100 mb-8">
                {isFr
                  ? 'Découvrez nos solutions de studios photo automatisés et d\'IA photo produit.'
                  : 'Discover our automated photo studio solutions and AI product photography.'}
              </p>
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
                <Link href="/contact">
                  {isFr ? 'Réserver une démo' : 'Book a demo'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </FadeInView>

        <SchemaOrg schema={[
          organizationSchema(),
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            title: webflowArticle.title,
            description: webflowArticle.description,
            url: `https://packshot-creator.com/${lang}/blog/${slug}`,
            image: webflowArticle.image,
            datePublished: webflowArticle.date,
            category: webflowArticle.category,
          }),
        ]} />
      </>
    );
  }

  // 3. Article not found
  notFound();
}
