import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema } from '@/components/seo/SchemaOrg';
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/sysnext-blog';

/**
 * Page article blog Sysnext Industrial Solutions.
 * Règle R7 : blog segmenté, auteur Seb Ducros, schema Article pointant entité Sysnext.
 */

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article introuvable' };
  const isFr = lang === 'fr';
  return {
    title: `${isFr ? article.titleFr : article.titleEn}`,
    description: isFr ? article.excerptFr : article.excerptEn,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog/${slug}`,
      languages: {
        fr: `/fr/industrie-solutions/blog/${slug}`,
        en: `/en/industrie-solutions/blog/${slug}`,
      },
    },
    openGraph: {
      title: isFr ? article.titleFr : article.titleEn,
      description: isFr ? article.excerptFr : article.excerptEn,
      type: 'article',
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ['Seb Ducros'],
      url: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog/${slug}`,
    },
  };
}

/**
 * Rendu très simple d'un contenu markdown-light :
 * - ## → H2
 * - ### → H3
 * - | ... | → ligne de tableau (détecté sur blocs consécutifs)
 * - _text_ → italique
 * - [text](url) → lien
 * - ligne vide → paragraphe
 */
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let paraBuffer: string[] = [];
  let tableBuffer: string[] = [];

  const flushPara = (key: string) => {
    if (paraBuffer.length === 0) return;
    const text = paraBuffer.join(' ').trim();
    paraBuffer = [];
    if (!text) return;
    nodes.push(
      <p key={key} className="my-4 leading-relaxed text-graphite-900">
        {inlineFormat(text)}
      </p>,
    );
  };

  const flushTable = (key: string) => {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer.map((r) => r.split('|').slice(1, -1).map((c) => c.trim()));
    const header = rows[0];
    const body = rows.slice(2); // skip separator row
    nodes.push(
      <div key={key} className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-graphite-200 rounded-lg overflow-hidden">
          <thead className="bg-sysnext-900 text-white">
            <tr>
              {header.map((h, i) => (
                <th key={i} className="text-left font-sysnext-sans font-semibold text-sm px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-t border-graphite-200">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 text-sm text-graphite-900">
                    {inlineFormat(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    tableBuffer = [];
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    const key = `ln-${idx}`;

    if (line.startsWith('|')) {
      flushPara(key + 'p');
      tableBuffer.push(line);
      return;
    }
    flushTable(key + 't');

    if (line.startsWith('## ')) {
      flushPara(key + 'p');
      nodes.push(
        <h2 key={key} className="mt-10 mb-4 font-sysnext-sans font-bold text-2xl text-sysnext-900 tracking-tight">
          {line.slice(3)}
        </h2>,
      );
      return;
    }
    if (line.startsWith('### ')) {
      flushPara(key + 'p');
      nodes.push(
        <h3 key={key} className="mt-6 mb-3 font-sysnext-sans font-semibold text-lg text-sysnext-900">
          {line.slice(4)}
        </h3>,
      );
      return;
    }
    if (line === '') {
      flushPara(key + 'p');
      return;
    }
    paraBuffer.push(line);
  });

  flushPara('ln-final-p');
  flushTable('ln-final-t');
  return nodes;
}

function inlineFormat(text: string): React.ReactNode {
  // [label](url) + **bold** + _italic_ minimal
  const parts: React.ReactNode[] = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(_([^_]+)_)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    if (m[1]) {
      parts.push(
        <a key={`a-${i}`} href={m[3]} className="text-sysnext-700 underline underline-offset-2 hover:text-sysnext-900">
          {m[2]}
        </a>,
      );
    } else if (m[4]) {
      parts.push(
        <strong key={`b-${i}`} className="font-semibold text-sysnext-900">
          {m[5]}
        </strong>,
      );
    } else if (m[6]) {
      parts.push(
        <em key={`i-${i}`} className="text-graphite-500">
          {m[7]}
        </em>,
      );
    }
    lastIndex = regex.lastIndex;
    i++;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const isFr = lang === 'fr';
  const related = getRelatedArticles(slug, 3);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog` },
    { name: isFr ? article.titleFr : article.titleEn, url: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog/${slug}` },
  ]);
  const articleLd = articleSchema({
    title: isFr ? article.titleFr : article.titleEn,
    description: isFr ? article.excerptFr : article.excerptEn,
    url: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog/${slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: 'Seb Ducros',
    category: article.category,
  });

  const content = isFr ? article.contentFr : article.contentEn;

  return (
    <>
      <SchemaOrg schema={[breadcrumbs, articleLd]} />

      <article className="bg-white">
        <header className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-sysnext-200">
              <Link href="/industrie-solutions/blog" className="hover:text-white inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                {isFr ? 'Retour au blog' : 'Back to blog'}
              </Link>
            </nav>

            <h1 className="font-sysnext-sans font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-6">
              {isFr ? article.titleFr : article.titleEn}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-sysnext-200">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.datePublished).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTimeMin} {isFr ? 'min de lecture' : 'min read'}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="text-calibration-500 font-semibold">
                  {isFr ? 'Par Seb Ducros' : 'By Seb Ducros'}
                </span>
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          {article.isDraft && (
            <div className="mb-8 rounded-md border border-proof-500 bg-proof-200/40 px-4 py-3 text-sm text-graphite-900">
              <strong className="text-proof-500">{isFr ? 'Draft éditorial' : 'Editorial draft'}.</strong>{' '}
              {isFr
                ? 'Matière brute rédigée par Claude. Le copy narratif final sera retravaillé par Seb Ducros avec sa signature éditoriale avant publication officielle.'
                : 'Raw draft by Claude. Final narrative copy will be refined by Seb Ducros with his editorial signature before official publication.'}
            </div>
          )}

          <div className="font-sysnext-sans">{renderContent(content)}</div>

          {article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-graphite-200 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-graphite-500" aria-hidden="true" />
              {article.tags.map((t) => (
                <span key={t} className="text-xs bg-graphite-50 text-graphite-700 px-2 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className="bg-graphite-50 py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="font-sysnext-sans font-bold text-2xl text-sysnext-900 mb-8 tracking-tight">
                {isFr ? 'À lire aussi' : 'Related reading'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/industrie-solutions/blog/${r.slug}`}
                    className="bg-white rounded-xl border border-graphite-200 p-5 hover:border-sysnext-500 hover:shadow-md transition-all"
                  >
                    <h3 className="font-sysnext-sans font-semibold text-base text-sysnext-900 mb-2 leading-snug">
                      {isFr ? r.titleFr : r.titleEn}
                    </h3>
                    <p className="text-sm text-graphite-700 line-clamp-2">
                      {isFr ? r.excerptFr : r.excerptEn}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-sysnext-900 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-sysnext-sans font-bold text-2xl text-white mb-4">
              {isFr
                ? 'Parlons de votre contexte documentaire.'
                : 'Let\'s discuss your documentation context.'}
            </h2>
            <p className="text-sysnext-200 mb-6 max-w-xl mx-auto">
              {isFr
                ? '30 minutes avec Seb Ducros. Sans engagement. 100 % technique.'
                : '30 minutes with Seb Ducros. No commitment. 100% technical.'}
            </p>
            <Link
              href="/industrie-solutions#contact"
              className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors"
            >
              {isFr ? 'Réserver un créneau' : 'Book a slot'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
