import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, Clock, MapPin, ChevronRight, Shield, Users, Zap } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, localBusinessSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import { buildLanguages } from '@/lib/hreflang';

// Segment de-ch localisé (Suisse alémanique) — voir i18n/routing.ts pathnames.
const DE_CH_PATH = '/de-ch/kontakt';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });
  const url =
    lang === 'de-ch'
      ? `https://www.packshot-creator.com${DE_CH_PATH}`
      : `https://www.packshot-creator.com/${lang}/contact`;

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: buildLanguages('/fr/contact', { en: '/en/contact', deCh: DE_CH_PATH }),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
      url,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : lang === 'de-ch' ? 'de_CH' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(t('metaTitle'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [`/api/og?title=${encodeURIComponent(t('metaTitle'))}&type=page&lang=${lang}`],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'contact' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Contact', url: `https://www.packshot-creator.com/${lang}/contact` },
  ];

  const faqs = ([1, 2, 3, 4, 5, 6] as const).map((n) => ({
    question: t(`faq${n}Question`),
    answer: t(`faq${n}Answer`),
  }));

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={t('heading')}
        subtitle={t('subtitle')}
      />

      {/* Trust Bar — Enhanced ribbon with stats */}
      <section className="py-8 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-white/10">
            {([
              { icon: Shield, value: t('trustStat1Value'), label: t('trustStat1Label') },
              { icon: Users, value: t('trustStat2Value'), label: t('trustStat2Label') },
              { icon: Zap, value: t('trustStat3Value'), label: t('trustStat3Label') },
            ]).map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center px-4 sm:px-6">
                  <Icon className="h-5 w-5 text-very-peri-400 mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-future-dusk-300 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
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
              <ContactForm locale={lang as 'fr' | 'en' | 'de-ch'} />
            </FadeInView>

            {/* Info Column (2/5) */}
            <FadeInView direction="right" delay={0.2} className="lg:col-span-2 space-y-8">
              {/* Response badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                <Zap className="h-5 w-5 text-emerald-600 shrink-0" />
                <p className="text-sm font-medium text-emerald-800">{t('responseBadge')}</p>
              </div>

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

              {/* FAQ — Extended to 6 questions */}
              <div>
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-4">
                  {t('faqTitle')}
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-neutral-50 border border-neutral-100 rounded-2xl p-4 hover:border-very-peri-200 transition-colors">
                      <summary className="cursor-pointer font-heading font-bold text-future-dusk-900 list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <ChevronRight className="h-4 w-4 text-future-dusk-400 transition-transform group-open:rotate-90 shrink-0 ml-3" />
                      </summary>
                      <p className="mt-3 text-sm text-future-dusk-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), localBusinessSchema(), faqSchema(faqs)]} />
    </>
  );
}
