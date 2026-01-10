import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Callout } from '@/components/blog/Callout';
import { ComparisonTable } from '@/components/blog/ComparisonTable';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return {
      title: 'Article',
      description: '',
    };
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);

  return {
    title: data.title || 'Article',
    description: data.description || '',
    keywords: data.keywords?.join(', ') || '',
    openGraph: {
      title: data.title || 'Article',
      description: data.description || '',
      images: data.image ? [data.image] : [],
      type: 'article',
      publishedTime: data.date,
      authors: data.author ? [data.author] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title || 'Article',
      description: data.description || '',
      images: data.image ? [data.image] : [],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);

  // Vérifier si le fichier existe
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Composants personnalisés pour MDX
  const components = {
    Callout,
    ComparisonTable,
  };

  return (
    <div className="min-h-screen bg-neutral-lighter">
      {/* Header */}
      <header className="bg-white border-b border-neutral-light">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-neutral-medium mb-4">
            <a href={`/${lang}`} className="hover:text-primary-turquoise transition-colors">
              Accueil
            </a>
            <span>/</span>
            <a href={`/${lang}/blog`} className="hover:text-primary-turquoise transition-colors">
              Blog
            </a>
            <span>/</span>
            <span className="text-neutral-dark">{data.category || 'Article'}</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-medium">
            <div className="flex items-center gap-2">
              <span>Par {data.author || 'Auteur'}</span>
            </div>
            <span>•</span>
            <time dateTime={data.date}>{data.date}</time>
            {data.readingTime && (
              <>
                <span>•</span>
                <span>{data.readingTime} min de lecture</span>
              </>
            )}
          </div>

          {data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="w-full rounded-lg mt-6 shadow-md"
            />
          )}
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12">
          <MDXRemote source={content} components={components} />
        </article>

        {/* CTA Section */}
        <div className="mt-12 bg-primary-turquoise text-white rounded-lg p-8 text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Prêt à automatiser votre production photo ?
          </h2>
          <p className="mb-6 text-lg">
            Découvrez nos solutions de studios photo automatisés et d&apos;IA photo produit.
          </p>
          <a
            href={`/${lang}/contact`}
            className="inline-block bg-white text-primary-turquoise font-medium px-8 py-3 rounded-lg hover:bg-neutral-lighter transition-colors"
          >
            Réserver une démo
          </a>
        </div>
      </main>
    </div>
  );
}
