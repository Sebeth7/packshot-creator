import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'cgu' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/cgu`,
      languages: { fr: '/fr/cgu', en: '/en/cgu' },
    },
    openGraph: {
      title: t('meta.title'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function CGUPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'cgu' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb'), url: `https://www.packshot-creator.com/${lang}/cgu` },
  ];

  const tools = [
    { key: 'roi' as const },
    { key: 'opco' as const },
    { key: 'selector' as const },
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
          <p className="mt-2 text-sm text-future-dusk-300">
            {t('hero.lastUpdated')}
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

            <div className="my-8 rounded-2xl bg-very-peri-50 p-6 border-l-4 border-very-peri-500 not-prose">
              <p className="text-very-peri-800 font-medium text-sm">
                {t('notice')}
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article1.title')}</h2>
            <p>
              {t('article1.text')}
            </p>
            <ul>
              <li>{t('article1.item1')}</li>
              <li>{t('article1.item2')}</li>
              <li>{t('article1.item3')}</li>
              <li>{t('article1.item4')}</li>
              <li>{t('article1.item5')}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">{t('article2.title')}</h2>
            <p>
              {t('article2.text1')}
            </p>
            <p>
              {t('article2.text2')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article3.title')}</h2>
            <p>
              {t('article3.text1')}
            </p>
            <p>
              {t('article3.text2')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article4.title')}</h2>
            <div className="space-y-4 not-prose">
              {tools.map((tool) => (
                <div key={tool.key} className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100">
                  <h3 className="font-heading font-bold text-future-dusk-900 mb-2">{t(`article4.tools.${tool.key}.title`)}</h3>
                  <p className="text-sm text-future-dusk-600">{t(`article4.tools.${tool.key}.description`)}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-bold">{t('article5.title')}</h2>
            <p>
              {t('article5.text')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article6.title')}</h2>
            <p>{t('article6.text')}</p>
            <ul>
              <li>{t('article6.item1')}</li>
              <li>{t('article6.item2')}</li>
              <li>{t('article6.item3')}</li>
              <li>{t('article6.item4')}</li>
            </ul>

            <h2 className="mt-12 text-2xl font-bold">{t('article7.title')}</h2>
            <p>
              {t('article7.text')}
              <Link href="/confidentialite" className="text-very-peri-600 hover:underline">
                {t('article7.privacyLink')}
              </Link>.
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('article8.title')}</h2>
            <p>
              {t('article8.text')}
            </p>

            <h2 className="mt-12 text-2xl font-bold">{t('contact.title')}</h2>
            <div className="rounded-2xl bg-neutral-50 p-6 border border-neutral-100 not-prose">
              <ul className="space-y-1.5 text-sm text-future-dusk-600">
                <li><strong>Email:</strong> info@sysnext.com</li>
                <li><strong>{t('contact.phone')}:</strong> +33 (0)1 47 42 66 66</li>
                <li><strong>{t('contact.address')}:</strong> SYSNEXT - PackshotCreator, 6 rue Antonin Raynaud, 92300 Levallois-Perret, France</li>
              </ul>
            </div>

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
