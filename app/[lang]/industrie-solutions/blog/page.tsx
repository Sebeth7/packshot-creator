import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { getAllArticles } from '@/lib/sysnext-blog';

/**
 * Blog hub Sysnext Industrial Solutions.
 * Règle R7 cohabitation : segmenté, distinct du blog PackshotCreator retail.
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Blog Sysnext Industrial Solutions — documentation visuelle industrielle'
      : 'Sysnext Industrial Solutions blog — industrial visual documentation',
    description: isFr
      ? 'Articles techniques : AS9100, IATF 16949, ISO 13485, AS9102 FAI, EN 9110 Part 145, IPC, aftermarket, MRO, PIM. Par Seb Ducros, fondateur Sysnext.'
      : 'Technical articles: AS9100, IATF 16949, ISO 13485, AS9102 FAI, EN 9110 Part 145, IPC, aftermarket, MRO, PIM. By Seb Ducros, Sysnext founder.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog`,
      languages: {
        fr: '/fr/industrie-solutions/blog',
        en: '/en/industrie-solutions/blog',
      },
    },
  };
}

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  normes: { fr: 'Normes & conformité', en: 'Standards & compliance' },
  aftermarket: { fr: 'Aftermarket', en: 'Aftermarket' },
  mro: { fr: 'MRO aéronautique', en: 'Aeronautical MRO' },
  qc: { fr: 'Contrôle qualité', en: 'Quality control' },
  forensique: { fr: 'Forensique', en: 'Forensics' },
  general: { fr: 'Général', en: 'General' },
};

export default async function BlogHubPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const articles = getAllArticles();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/blog` },
  ]);

  return (
    <>
      <SchemaOrg schema={breadcrumbs} />

      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-sysnext-200">
            <Link href="/industrie-solutions" className="hover:text-white">Sysnext Industrial Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>

          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
            {isFr ? 'Blog Sysnext Industrial Solutions' : 'Sysnext Industrial Solutions blog'}
          </p>
          <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl leading-tight tracking-tight text-white mb-4 max-w-3xl">
            {isFr
              ? 'Documentation visuelle industrielle : normes, pratiques, retours terrain.'
              : 'Industrial visual documentation: standards, practices, field feedback.'}
          </h1>
          <p className="text-lg text-sysnext-200 leading-relaxed max-w-2xl">
            {isFr
              ? 'Articles techniques signés Seb Ducros, fondateur Sysnext Industrial Solutions. Normes AS9100, IATF, ISO 13485. Aftermarket, MRO, QC, forensique, medical.'
              : 'Technical articles by Seb Ducros, Sysnext Industrial Solutions founder. AS9100, IATF, ISO 13485 standards. Aftermarket, MRO, QC, forensics, medical.'}
          </p>
        </div>
      </section>

      <section className="bg-graphite-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {articles.length === 0 ? (
            <p className="text-center text-graphite-700">
              {isFr ? 'Premiers articles à venir — S2.' : 'First articles coming soon — S2.'}
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((a) => {
                const cat = CATEGORY_LABELS[a.category] ?? CATEGORY_LABELS.general;
                return (
                  <li key={a.slug} className="bg-white rounded-xl border border-graphite-200 overflow-hidden hover:border-sysnext-500 hover:shadow-md transition-all group">
                    <Link href={`/industrie-solutions/blog/${a.slug}`} className="block p-6">
                      <div className="flex items-center gap-3 mb-4 text-xs">
                        <span className="inline-flex items-center rounded-full bg-sysnext-50 text-sysnext-700 px-3 py-1 font-semibold tracking-wider uppercase">
                          {isFr ? cat.fr : cat.en}
                        </span>
                        {a.isDraft && (
                          <span className="inline-flex items-center rounded-full bg-proof-200 text-proof-500 px-3 py-1 font-semibold tracking-wider uppercase">
                            Draft
                          </span>
                        )}
                      </div>
                      <h2 className="font-sysnext-sans font-bold text-xl text-sysnext-900 mb-3 group-hover:text-sysnext-700 transition-colors">
                        {isFr ? a.titleFr : a.titleEn}
                      </h2>
                      <p className="text-sm text-graphite-700 leading-relaxed mb-4 line-clamp-3">
                        {isFr ? a.excerptFr : a.excerptEn}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-graphite-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {new Date(a.datePublished).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {a.readingTimeMin} min
                        </span>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sysnext-700 group-hover:text-sysnext-900">
                        {isFr ? 'Lire l\'article' : 'Read article'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
