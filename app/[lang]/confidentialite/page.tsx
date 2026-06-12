import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/hero';

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'privacy' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/confidentialite`,
      languages: { fr: '/fr/confidentialite', en: '/en/confidentialite' },
    },
    openGraph: {
      title: t('meta.title'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function ConfidentialitePage({ params }: PageProps) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: 'privacy' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb'), url: `https://www.packshot-creator.com/${lang}/confidentialite` },
  ];

  const dataCollected = [
    { key: 'contactForms', title: t('article2.contactForms.title'), description: t('article2.contactForms.description') },
    { key: 'interactiveTools', title: t('article2.interactiveTools.title'), description: t('article2.interactiveTools.description') },
    { key: 'navigation', title: t('article2.navigation.title'), description: t('article2.navigation.description') },
  ];

  const purposes = [
    t('article3.purpose1'),
    t('article3.purpose2'),
    t('article3.purpose3'),
    t('article3.purpose4'),
    t('article3.purpose5'),
  ];

  const rights = [
    t('article5.right1'),
    t('article5.right2'),
    t('article5.right3'),
    t('article5.right4'),
    t('article5.right5'),
    t('article5.right6'),
  ];

  const cookies = [
    { key: 'essential', title: t('article6.essential.title'), description: t('article6.essential.description') },
    { key: 'analytics', title: t('article6.analytics.title'), description: t('article6.analytics.description') },
    { key: 'marketing', title: t('article6.marketing.title'), description: t('article6.marketing.description') },
  ];

  return (
    <>
      {/* Hero */}
      <HeroSection
        align="left"
        compact
        gradient="bg-gradient-to-br from-future-dusk-900 to-future-dusk-800"
        title={
          <span className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-very-peri-500/20 text-very-peri-300">
              <Shield className="h-6 w-6" />
            </span>
            {t('hero.title')}
          </span>
        }
        subtitle={t('hero.description')}
      />

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-10">

            {/* Article 1 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article1.heading')}
              </h2>
              <div className="rounded-xl bg-neutral-50 p-6 border border-neutral-100">
                <p className="font-heading font-bold text-future-dusk-900 mb-3">Sysnext</p>
                <ul className="space-y-1.5 text-sm text-future-dusk-600">
                  <li><strong>SAS</strong> {t('article1.capitalLabel')} 10 000 EUR</li>
                  <li>{t('article1.address')}</li>
                  <li>{t('article1.rcs')}</li>
                  <li>{t('article1.dpo')}</li>
                </ul>
              </div>
            </div>

            {/* Article 2 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article2.heading')}
              </h2>
              <p className="text-future-dusk-600 mb-4">
                {t('article2.intro')}
              </p>
              <div className="space-y-3">
                {dataCollected.map((item) => (
                  <div key={item.key} className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                    <p className="font-heading font-bold text-future-dusk-900 text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-future-dusk-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Article 3 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article3.heading')}
              </h2>
              <ul className="space-y-2 text-future-dusk-600">
                {purposes.map((purpose) => (
                  <li key={purpose} className="flex items-start gap-2">
                    <span className="text-very-peri-600 mt-1.5 shrink-0">-</span>
                    {purpose}
                  </li>
                ))}
              </ul>
            </div>

            {/* Article 4 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article4.heading')}
              </h2>
              <p className="text-future-dusk-600">
                {t('article4.content')}
              </p>
            </div>

            {/* Article 5 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article5.heading')}
              </h2>
              <p className="text-future-dusk-600 mb-4">
                {t('article5.intro')}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {rights.map((right) => (
                  <div key={right} className="rounded-xl bg-very-peri-50 p-3 text-sm font-medium text-very-peri-700">
                    {right}
                  </div>
                ))}
              </div>
              <p className="text-future-dusk-600 mt-4 text-sm">
                {t('article5.exerciseRights')}
              </p>
            </div>

            {/* Article 6 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article6.heading')}
              </h2>
              <p className="text-future-dusk-600 mb-4">
                {t('article6.intro')}
              </p>
              <div className="space-y-3">
                {cookies.map((cookie) => (
                  <div key={cookie.key} className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                    <p className="font-heading font-bold text-future-dusk-900 text-sm mb-1">{cookie.title}</p>
                    <p className="text-sm text-future-dusk-500">{cookie.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-future-dusk-500 mt-4">
                {t('article6.managePreferences')}
              </p>
            </div>

            {/* Article 7 */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-8">
              <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('article7.heading')}
              </h2>
              <p className="text-future-dusk-600">
                {t('article7.content')}
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-very-peri-600 to-very-peri-700 p-8 text-center text-white">
              <h3 className="text-2xl font-heading font-bold mb-4">
                {t('cta.heading')}
              </h3>
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
