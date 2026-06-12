import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';

export const revalidate = 86400;

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
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: 'legal' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb'), url: `https://www.packshot-creator.com/${lang}/mentions-legales` },
  ];

  return (
    <>
      {/* Hero */}
      <HeroSection
        align="left"
        compact
        gradient="bg-gradient-to-br from-future-dusk-900 to-future-dusk-800"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-future-dusk-900 prose-p:text-future-dusk-600 prose-li:text-future-dusk-600 prose-strong:text-future-dusk-900">
            <p className="text-xl text-future-dusk-700 leading-relaxed">
              {t('intro')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article1.heading')}</h2>
            <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100 not-prose">
              <p className="font-heading font-bold text-future-dusk-900 mb-3">{t('article1.companyTitle')}</p>
              <ul className="space-y-1.5 text-sm text-future-dusk-600">
                <li><strong>{t('article1.legalForm')}:</strong> {t('article1.legalFormValue')}</li>
                <li><strong>{t('article1.headquarters')}:</strong> {t('article1.headquartersValue')}</li>
                <li><strong>{t('article1.shareCapital')}:</strong> {t('article1.shareCapitalValue')}</li>
                <li><strong>{t('article1.registration')}:</strong> {t('article1.registrationValue')}</li>
                <li><strong>{t('article1.vat')}:</strong> {t('article1.vatValue')}</li>
                <li><strong>{t('article1.publicationDirector')}:</strong> {t('article1.publicationDirectorValue')}</li>
                <li>{t('article1.trademark')}</li>
              </ul>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article2.heading')}</h2>
            <div className="space-y-4 not-prose">
              <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-3">{t('article2.france')}</p>
                <ul className="space-y-1.5 text-sm text-future-dusk-600">
                  <li><strong>{t('article2.phone')}:</strong> +33 (0)1 47 42 66 66</li>
                  <li><strong>{t('article2.email')}:</strong> info[at]sysnext.com</li>
                  <li><strong>{t('article2.showroom')}:</strong> {t('article2.showroomValue')}</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-3">{t('article2.switzerland')}</p>
                <ul className="space-y-1.5 text-sm text-future-dusk-600">
                  <li><strong>{t('article2.phone')}:</strong> +41 44 580 43 84</li>
                  <li>{t('article2.switzerlandNote')}</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article3.heading')}</h2>
            <p>
              {t('article3.publisher')}
            </p>
            <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100 not-prose">
              <p className="font-heading font-bold text-future-dusk-900 mb-1">{t('article3.hosting')}</p>
              <p className="text-sm text-future-dusk-600">{t('article3.hostingValue')}</p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article4.heading')}</h2>
            <p>
              {t('article4.description')}
            </p>
            <ul>
              <li><strong>{t('article4.collection')}:</strong> {t('article4.collectionDetail')}</li>
              <li><strong>Cookies:</strong> {t('article4.cookiesDetail')}</li>
            </ul>
            <p>
              {t('article4.privacyNote')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article5.heading')}</h2>
            <p>
              {t('article5.description')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article6.heading')}</h2>
            <p>
              {t('article6.description')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article7.heading')}</h2>
            <p>
              {t('article7.description')}
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
