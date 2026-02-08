import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import {
  ShoppingCart,
  Target,
  RotateCw,
  Layers,
  FileImage,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'packshotAmazon' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/packshot-amazon`,
      languages: {
        fr: '/fr/packshot-amazon',
        en: '/en/packshot-amazon',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

const BENEFIT_ICONS = [Target, ShoppingCart, RotateCw, Layers, FileImage];

const MACHINE_IDS = ['alphashot-360', 'alphashot-g2'];

export default async function PackshotAmazonPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'packshotAmazon' });

  const machines = MACHINE_IDS.map(getMachineById).filter(Boolean);
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('hero.title').split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/packshot-amazon` },
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
              <ShoppingCart className="h-4 w-4" />
              {isFr ? 'Amazon & Marketplaces' : 'Amazon & Marketplaces'}
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

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('benefits.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => {
              const Icon = BENEFIT_ICONS[i - 1];
              return (
                <StaggerItem key={i}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-8 hover:shadow-lg transition-shadow h-full">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                      {t(`benefits.item${i}.title`)}
                    </h3>
                    <p className="text-future-dusk-600 leading-relaxed">
                      {t(`benefits.item${i}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <span className="text-5xl font-heading font-bold text-very-peri-600">
                    {t(`stats.stat${i}.value`)}
                  </span>
                  <p className="mt-2 text-future-dusk-600 font-medium">
                    {t(`stats.stat${i}.label`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Machines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('machines.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('machines.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {machines.map((machine) => {
              if (!machine) return null;
              const langKey = isFr ? 'fr' : 'en';
              return (
                <StaggerItem key={machine.id}>
                  <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-2 bg-very-peri-500" />
                    <div className="p-8">
                      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">
                        {machine.nom}
                      </h3>
                      <p className="text-sm text-future-dusk-500 mb-4">
                        {isFr ? `Jusqu'a ${machine.tailleMax}` : `Up to ${machine.tailleMax}`} &middot; {machine.capaciteJour} {isFr ? 'photos/jour' : 'photos/day'}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {machine.keyAdvantages.slice(0, 3).map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-future-dusk-600">{adv[langKey]}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="rounded-xl w-full">
                        <Link href="/contact">
                          {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
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
          <StaggerContainer className="space-y-6">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-2xl p-8 border border-neutral-100">
                  <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-future-dusk-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
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
