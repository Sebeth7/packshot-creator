import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import {
  Search,
  Camera,
  Box,
  RotateCw,
  Sparkles,
  ArrowRight,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'besoinsPhoto' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/besoins-photographie-produit`,
      languages: {
        fr: '/fr/besoins-photographie-produit',
        en: '/en/besoins-photographie-produit',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

const NEED_ICONS = [Camera, Box, RotateCw, Sparkles];

export default async function BesoinsPhotographieProduitPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'besoinsPhoto' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('hero.title').split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/besoins-photographie-produit` },
  ];

  const faqs = [
    { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <FadeInView className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-very-peri-200 mb-6">
              <Search className="h-4 w-4" />
              {isFr ? 'Guide solution' : 'Solution guide'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-very-peri-200 font-medium mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                <Link href="/contact">{t('hero.cta')}</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
                <Link href="/studios-photo-automatises">
                  {isFr ? 'Voir les studios' : 'View studios'}
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Needs / Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('needs.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('needs.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => {
              const Icon = NEED_ICONS[i - 1];
              return (
                <StaggerItem key={i}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-8 hover:shadow-lg transition-shadow h-full">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                      {t(`needs.item${i}.title`)}
                    </h3>
                    <p className="text-future-dusk-600 leading-relaxed mb-4">
                      {t(`needs.item${i}.description`)}
                    </p>
                    <ul className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-future-dusk-600">{t(`needs.item${i}.point${j}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution Path */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('solution.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-very-peri-100 text-very-peri-700 text-xl font-bold mb-4">
                    {i}
                  </span>
                  <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                    {t(`solution.step${i}.title`)}
                  </h3>
                  <p className="text-future-dusk-600 leading-relaxed">
                    {t(`solution.step${i}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('sectors.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <StaggerItem key={i}>
                <Link
                  href={t(`sectors.item${i}.href`) as '/industrie'}
                  className="group flex items-center gap-3 bg-neutral-50 rounded-xl p-4 border border-neutral-100 hover:border-very-peri-300 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-future-dusk-800 group-hover:text-very-peri-600 transition-colors">
                    {t(`sectors.item${i}.name`)}
                  </span>
                  <ChevronRight className="h-4 w-4 text-future-dusk-400 ml-auto" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/industrie">
                {isFr ? 'Voir les 14 secteurs' : 'View all 14 sectors'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeInView>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('faq.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <details className="group bg-white rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-future-dusk-900 text-left">
                      {faq.question}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-future-dusk-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
        <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/contact">
                {t('cta.ctaPrimary')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/studios-photo-automatises">
                {t('cta.ctaSecondary')}
              </Link>
            </Button>
          </div>
        </FadeInView>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
