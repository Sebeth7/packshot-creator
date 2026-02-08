import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

const PipedriveContactForm = dynamic(
  () => import('@/components/forms/PipedriveContactForm').then((mod) => mod.PipedriveContactForm),
  { loading: () => <div className="h-64 bg-neutral-100 rounded-2xl animate-pulse" /> }
);
import { Phone, Clock, MapPin, ChevronRight } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView } from '@/components/animations';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/contact`,
      languages: { fr: '/fr/contact', en: '/en/contact' },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/contact`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: 'https://www.packshot-creator.com/og/default.jpg', width: 1200, height: 630, alt: 'Contact PackshotCreator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: ['https://www.packshot-creator.com/og/default.jpg'],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Contact', url: `https://www.packshot-creator.com/${lang}/contact` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <FadeInView className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-4">
              {t('heading')}
            </h1>
            <p className="text-lg text-future-dusk-200 leading-relaxed">
              {t('subtitle')}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form Column (3/5) */}
            <FadeInView direction="left" className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-6">
                {t('formTitle')}
              </h2>
              <PipedriveContactForm locale={lang as 'fr' | 'en'} />
            </FadeInView>

            {/* Info Column (2/5) */}
            <FadeInView direction="right" delay={0.2} className="lg:col-span-2 space-y-8">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-very-peri-50 to-very-peri-100/50 p-6 rounded-2xl">
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-4">
                  {t('infoTitle')}
                </h3>
                <div className="space-y-4 text-future-dusk-600">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-very-peri-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-future-dusk-900">{t('phone')}</p>
                      <p>{t('phoneValue')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-very-peri-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-future-dusk-900">{t('hours')}</p>
                      <p>{t('hoursValue')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showroom */}
              <div>
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-4">
                  {t('showroomTitle')}
                </h3>
                <p className="text-future-dusk-500 mb-4 flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-very-peri-600 shrink-0 mt-0.5" />
                  <span>{t('showroomAddress')}</span>
                </p>
                <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.8876!2d5.0247!3d45.7133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4c1c1c1c1c1c1%3A0x0!2s22%20Rue%20des%20Fr%C3%A8res%20Lumi%C3%A8re%2C%2069720%20Saint-Bonnet-de-Mure!5e0!3m2!1sfr!2sfr!4v1706700000000!5m2!1sfr!2sfr"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Showroom PackshotCreator Lyon - DELTAPARK"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-4">
                  {t('faqTitle')}
                </h3>
                <div className="space-y-3">
                  {([1, 2, 3] as const).map((n) => (
                    <details key={n} className="group bg-neutral-50 border border-neutral-100 rounded-2xl p-4 hover:border-very-peri-200 transition-colors">
                      <summary className="cursor-pointer font-heading font-bold text-future-dusk-900 list-none flex items-center justify-between">
                        <span>{t(`faq${n}Question`)}</span>
                        <ChevronRight className="h-4 w-4 text-future-dusk-400 transition-transform group-open:rotate-90 shrink-0 ml-3" />
                      </summary>
                      <p className="mt-3 text-sm text-future-dusk-500 leading-relaxed">
                        {t(`faq${n}Answer`)}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
