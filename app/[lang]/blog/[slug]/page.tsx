import { notFound } from 'next/navigation';
import { getLocalArticle } from '@/lib/blog';
import { getWebflowArticle } from '@/lib/webflow';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Callout } from '@/components/blog/Callout';
import { ComparisonTable } from '@/components/blog/ComparisonTable';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;

  // Try MDX first
  const mdxArticle = await getLocalArticle(slug);
  if (mdxArticle) {
    return {
      title: mdxArticle.title,
      description: mdxArticle.description,
      openGraph: {
        title: mdxArticle.title,
        description: mdxArticle.description,
        images: mdxArticle.image ? [mdxArticle.image] : [],
        type: 'article',
      },
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

  // Composants personnalisés pour MDX
  const components = {
    Callout,
    ComparisonTable,
  };

  // 1. Check for local MDX article
  const mdxArticle = await getLocalArticle(slug);

  if (mdxArticle) {
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
                <span className="text-neutral-dark">{mdxArticle.category || 'Article'}</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                {mdxArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-medium">
                <time dateTime={mdxArticle.date}>
                  {new Date(mdxArticle.date).toLocaleDateString(lang)}
                </time>
              </div>

              {mdxArticle.image && (
                <img
                  src={mdxArticle.image}
                  alt={mdxArticle.title}
                  className="w-full rounded-lg mt-6 shadow-md"
                />
              )}
            </div>
          </header>

          {/* Article Content */}
          <main className="max-w-4xl mx-auto px-4 py-12">
            <article className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12">
              <MDXRemote source={mdxArticle.content} components={components} />
            </article>

            {/* CTA Section */}
            <div className="mt-12 bg-future-dusk-500 text-white rounded-lg p-8 text-center">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Prêt à automatiser votre production photo ?
              </h2>
              <p className="mb-6 text-lg">
                Découvrez nos solutions de studios photo automatisés et d'IA photo produit.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary-blog text-neutral-dark font-semibold px-8 py-3 rounded-lg hover:bg-primary-blog/90 transition-colors shadow-sm"
              >
                Réserver une démo
              </Link>
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
                <Link href="/" className="hover:text-secondary-orbitvu transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-secondary-orbitvu transition-colors">
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
              <Link
                href="/contact"
                className="inline-block bg-primary-blog text-neutral-dark font-semibold px-8 py-3 rounded-lg hover:bg-primary-blog/90 transition-colors shadow-sm"
              >
                Réserver une démo
              </Link>
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
