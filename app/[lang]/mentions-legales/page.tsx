import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'legal.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/mentions-legales`,
      languages: { fr: '/fr/mentions-legales', en: '/en/mentions-legales' },
    },
    openGraph: {
      title: t('title'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'legal' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb'), url: `https://www.packshot-creator.com/${lang}/mentions-legales` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-future-dusk-900 to-future-dusk-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-future-dusk-200">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900">
            <p className="text-xl text-future-dusk-700 leading-relaxed">
              {t('intro')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article1.heading')}</h2>
            <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100 not-prose">
              <p className="font-heading font-bold text-future-dusk-900 mb-3">Sysnext</p>
              <ul className="space-y-1.5 text-sm text-future-dusk-600">
                <li><strong>{t('article1.legalForm')}:</strong> SAS</li>
                <li><strong>{t('article1.headquarters')}:</strong> 6 rue Antonin Raynaud, 92300 Levallois-Perret, France</li>
                <li><strong>{t('article1.shareCapital')}:</strong> 500 000 EUR</li>
                <li><strong>{t('article1.registration')}:</strong> RCS Nanterre 805 401 148</li>
                <li><strong>TVA:</strong> FR95805401148</li>
                <li><strong>{t('article1.publicationDirector')}:</strong> Laurent Wainberg, {t('article1.president')}</li>
                <li><strong>Contact:</strong> info[at]sysnext.com / +33 (0)1 47 42 66 66</li>
              </ul>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article2.heading')}</h2>
            <div className="space-y-4 not-prose">
              <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{t('article2.development')}: Afalence</p>
                <p className="text-sm text-future-dusk-600">Contact: alemeur[at]afalence.com</p>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-1">{t('article2.hosting')}: Vercel, Inc.</p>
                <p className="text-sm text-future-dusk-600">340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              </div>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article3.heading')}</h2>
            <p>
              {t('article3.description')}
            </p>
            <ul>
              <li><strong>{t('article3.collection')}:</strong> {t('article3.collectionDetail')}</li>
              <li><strong>Cookies:</strong> {t('article3.cookiesDetail')}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">{t('article4.heading')}</h2>
            <p>
              {t('article4.description')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article5.heading')}</h2>
            <p>
              {t('article5.description')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article6.heading')}</h2>
            <p>
              {t('article6.description')}
            </p>

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-very-peri-600 to-very-peri-700 p-8 text-center text-white not-prose">
              <h3 className="text-2xl font-heading font-bold mb-4">{t('cta.heading')}</h3>
              <p className="mb-6 text-very-peri-100">
                {t('cta.description')}
              </p>
              <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl">
                <Link href="/contact">
                  {t('cta.button')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
