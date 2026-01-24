import { notFound } from 'next/navigation';
import { getWebflowArticle } from '@/lib/webflow';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { getSanityBlogPost, urlFor } from '@/lib/sanity-blog';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;

  // Try Sanity first
  const sanityPost = await getSanityBlogPost(slug);
  if (sanityPost) {
    const seoTitle = sanityPost.seo?.seoTitle || sanityPost.title;
    const seoDescription = sanityPost.seo?.seoDescription || sanityPost.description;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: sanityPost.keywords?.join(', '),
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: sanityPost.image ? [urlFor(sanityPost.image).width(1200).height(630).url()] : [],
        type: 'article',
        publishedTime: sanityPost.date,
        authors: [sanityPost.author]
      },
      robots: {
        index: !sanityPost.seo?.noIndex,
        follow: !sanityPost.seo?.noIndex
      }
    };
  }

  // Fallback to Webflow
  const webflowArticle = await getWebflowArticle(slug);
  if (webflowArticle) {
    return {
      title: webflowArticle.title,
      description: webflowArticle.description,
      openGraph: {
        title: webflowArticle.title,
        description: webflowArticle.description,
        images: webflowArticle.image ? [webflowArticle.image] : [],
        type: 'article',
      },
    };
  }

  return {
    title: 'Article non trouvé',
  };
}

export default async function BlogArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  // 1. Check for Sanity article first
  const sanityPost = await getSanityBlogPost(slug);

  if (sanityPost) {
    const imageUrl = sanityPost.image
      ? urlFor(sanityPost.image).width(1200).height(600).url()
      : null;

    return (
      <>
        <Header />
        <div className="min-h-screen bg-neutral-lighter">
          {/* Header */}
          <header className="bg-white border-b border-neutral-light">
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="flex items-center gap-2 text-sm text-neutral-medium mb-4">
                <Link href="/" className="hover:text-future-dusk-500 transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-future-dusk-500 transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-neutral-dark">{sanityPost.category || 'Article'}</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                {sanityPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-medium">
                <time dateTime={sanityPost.date}>
                  {new Date(sanityPost.date).toLocaleDateString(lang)}
                </time>
                <span>•</span>
                <span>{sanityPost.author}</span>
                <span>•</span>
                <span>{sanityPost.readingTime} min de lecture</span>
              </div>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={sanityPost.image?.alt || sanityPost.title}
                  className="w-full rounded-lg mt-6 shadow-md"
                />
              )}
            </div>
          </header>

          {/* Article Content */}
          <main className="max-w-4xl mx-auto px-4 py-12">
            <article className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12">
              <PortableText
                value={sanityPost.content}
                components={portableTextComponents}
              />
            </article>

            {/* CTA Section */}
            <div className="mt-12 bg-future-dusk-500 text-white rounded-lg p-8 text-center">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Prêt à automatiser votre production photo ?
              </h2>
              <p className="mb-6 text-lg">
                Découvrez nos solutions de studios photo automatisés et d'IA photo produit.
              </p>
              <Button
                asChild
                variant="section"
                size="lg"
                className="text-neutral-dark font-semibold shadow-sm"
              >
                <Link href="/contact">
                  Réserver une démo
                </Link>
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  // 2. Fallback to Webflow article
  const webflowArticle = await getWebflowArticle(slug);

  if (webflowArticle) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-neutral-lighter">
          {/* Header */}
          <header className="bg-white border-b border-neutral-light">
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="flex items-center gap-2 text-sm text-neutral-medium mb-4">
                <Link href="/" className="hover:text-future-dusk-500 transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-future-dusk-500 transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-neutral-dark">{webflowArticle.category || 'Article'}</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                {webflowArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-medium">
                <time dateTime={webflowArticle.date}>
                  {new Date(webflowArticle.date).toLocaleDateString(lang)}
                </time>
                <span className="text-xs bg-neutral-light px-2 py-1 rounded">
                  Archive Webflow
                </span>
              </div>

              {webflowArticle.image && (
                <img
                  src={webflowArticle.image}
                  alt={webflowArticle.title}
                  className="w-full rounded-lg mt-6 shadow-md"
                />
              )}
            </div>
          </header>

          {/* Article Content */}
          <main className="max-w-4xl mx-auto px-4 py-12">
            <article className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12">
              {/* Render Webflow HTML content */}
              <div
                dangerouslySetInnerHTML={{ __html: webflowArticle.content || '' }}
              />
            </article>

            {/* CTA Section */}
            <div className="mt-12 bg-future-dusk-500 text-white rounded-lg p-8 text-center">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Prêt à automatiser votre production photo ?
              </h2>
              <p className="mb-6 text-lg">
                Découvrez nos solutions de studios photo automatisés et d'IA photo produit.
              </p>
              <Button
                asChild
                variant="section"
                size="lg"
                className="text-neutral-dark font-semibold shadow-sm"
              >
                <Link href="/contact">
                  Réserver une démo
                </Link>
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  // 3. Article not found
  notFound();
}
