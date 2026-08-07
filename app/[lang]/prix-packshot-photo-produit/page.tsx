import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, ScrollReveal, TextReveal, SpringCard } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import { Euro, ArrowRight, ChevronDown, CalendarCheck } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

interface PageProps {
  params: Promise<{ lang: string }>;
}

const PAGE_PATH = '/prix-packshot-photo-produit';
const SITE_URL = 'https://www.packshot-creator.com';

// Page FR + EN uniquement (référentiel marché France — pas de version de-ch).
export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'prixPackshot' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${SITE_URL}/${lang}${PAGE_PATH}`,
      languages: buildLanguages(`/fr${PAGE_PATH}`, { en: `/en${PAGE_PATH}` }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

const TYPE_ROWS = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'] as const;
const SECTOR_ROWS = ['row1', 'row2', 'row3', 'row4'] as const;
const FACTORS = ['f1', 'f2', 'f3', 'f4'] as const;
const MODELS = ['m1', 'm2', 'm3'] as const;
const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;
const SOURCE_KEYS = ['s1', 's2', 's3', 's4'] as const;

export default async function PrixPackshotPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'prixPackshot' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `${SITE_URL}/${lang}` },
    { name: t('hero.title'), url: `${SITE_URL}/${lang}${PAGE_PATH}` },
  ];

  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  // Dataset : le référentiel de prix lui-même, entité citable par les moteurs de réponse.
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: isFr
      ? 'Référentiel des prix de la photographie produit en France (2026)'
      : 'Product photography price benchmark, France (2026)',
    description: t('sources.intro'),
    url: `${SITE_URL}/${lang}${PAGE_PATH}`,
    dateModified: '2026-08-07',
    inLanguage: isFr ? 'fr-FR' : 'en-US',
    creator: { '@id': `${SITE_URL}/#organization` },
    keywords: isFr
      ? 'prix packshot, coût photo produit, tarif photographe packshot, prix photo 360'
      : 'packshot price, product photo cost, packshot photographer rates, 360 photo price',
  };

  return (
    <>
      <HeroSection
        badge={{
          icon: <Euro className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.cta'), href: '/calculateur-roi', variant: 'primary' },
          { label: isFr ? 'Lire la méthodologie' : 'Read the methodology', href: '/methodologie-calculateur-roi', variant: 'secondary' },
        ]}
      />

      {/* Réponse directe + TL;DR */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <p className="inline-flex items-center gap-2 text-sm text-neutral-medium mb-6">
              <CalendarCheck className="h-4 w-4 text-primary-orbitvu" aria-hidden="true" />
              {t('hero.updated')}
            </p>
            <p className="text-lg text-heading-dark leading-relaxed font-medium">{t('answer.p1')}</p>
            <p className="mt-4 text-neutral-medium leading-relaxed">{t('answer.p2')}</p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="mt-10 rounded-2xl border border-very-peri-200 bg-very-peri-50/50 p-6 lg:p-8">
              <h2 className="text-xl font-heading font-bold text-heading-dark mb-4">{t('tldr.heading')}</h2>
              <ul className="space-y-3">
                {(['i1', 'i2', 'i3', 'i4', 'i5'] as const).map((key) => (
                  <li key={key} className="flex gap-3 text-neutral-dark leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-orbitvu shrink-0" aria-hidden="true" />
                    <span>{t(`tldr.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Grille par type de visuel */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('types.label')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('types.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-3xl">{t('types.intro')}</p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-100 bg-future-dusk-0/60">
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('types.table.h1')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('types.table.h2')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('types.table.h3')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('types.table.h4')}</th>
                  </tr>
                </thead>
                <tbody>
                  {TYPE_ROWS.map((row) => (
                    <tr key={row} className="border-b border-neutral-100 last:border-0">
                      <td className="px-6 py-4 font-medium text-heading-dark">{t(`types.table.${row}.type`)}</td>
                      <td className="px-6 py-4 text-neutral-dark whitespace-nowrap">{t(`types.table.${row}.range`)}</td>
                      <td className="px-6 py-4 text-neutral-dark whitespace-nowrap">{t(`types.table.${row}.median`)}</td>
                      <td className="px-6 py-4 text-neutral-medium">{t(`types.table.${row}.unit`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
          <FadeInView delay={0.15}>
            <p className="mt-6 text-neutral-medium leading-relaxed">{t('types.note')}</p>
            <p className="mt-4 text-neutral-medium leading-relaxed">{t('types.salaryNote')}</p>
          </FadeInView>
        </div>
      </section>

      {/* Grille sectorielle */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('sectors.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-3xl">{t('sectors.intro')}</p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-100 bg-future-dusk-0/60">
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('sectors.table.h1')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('sectors.table.h2')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('sectors.table.h3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {SECTOR_ROWS.map((row) => (
                    <tr key={row} className="border-b border-neutral-100 last:border-0">
                      <td className="px-6 py-4 font-medium text-heading-dark">{t(`sectors.table.${row}.sector`)}</td>
                      <td className="px-6 py-4 text-neutral-dark whitespace-nowrap">{t(`sectors.table.${row}.median`)}</td>
                      <td className="px-6 py-4 text-neutral-medium">{t(`sectors.table.${row}.variation`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
          <FadeInView delay={0.15}>
            <p className="mt-6 text-neutral-medium leading-relaxed">{t('sectors.note')}</p>
          </FadeInView>
        </div>
      </section>

      {/* Facteurs de prix */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('factors.heading')}
            </TextReveal>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-2xl mx-auto">{t('factors.intro')}</p>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {FACTORS.map((key, i) => (
              <StaggerItem key={key}>
                <FadeInView direction="up" delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-8 h-full">
                    <h3 className="text-lg font-heading font-bold text-heading-dark mb-3">{t(`factors.${key}.title`)}</h3>
                    <p className="text-neutral-medium leading-relaxed">{t(`factors.${key}.description`)}</p>
                  </div>
                </FadeInView>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3 modèles de production */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight max-w-4xl">
              {t('models.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-3xl">{t('models.intro')}</p>
          </FadeInView>
          <StaggerContainer className="mt-10 grid lg:grid-cols-3 gap-6">
            {MODELS.map((key, i) => (
              <StaggerItem key={key}>
                <FadeInView direction="up" delay={i * 0.1}>
                  <div className="rounded-2xl border border-neutral-100 bg-future-dusk-0/40 p-8 h-full flex flex-col">
                    <h3 className="text-xl font-heading font-bold text-heading-dark mb-2">{t(`models.${key}.title`)}</h3>
                    <p className="text-primary-orbitvu font-semibold mb-4">{t(`models.${key}.cost`)}</p>
                    <p className="text-neutral-medium leading-relaxed flex-1">{t(`models.${key}.description`)}</p>
                  </div>
                </FadeInView>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView delay={0.2}>
            <p className="mt-8 text-neutral-dark leading-relaxed max-w-4xl">{t('models.verdict')}</p>
            <div className="mt-6">
              <Button asChild className="bg-primary-orbitvu hover:bg-very-peri-600 text-white rounded-xl px-6 h-12">
                <Link href="/calculateur-roi">
                  {t('hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('faq.label')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight mb-10">
              {t('faq.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <FadeInView direction="up" delay={index * 0.05}>
                  <details className="group bg-white rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors" open={index === 0}>
                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-semibold text-heading-dark text-left">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-neutral-medium shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-neutral-medium leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </FadeInView>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-2xl font-heading font-bold text-heading-dark mb-4">{t('sources.heading')}</h2>
            <p className="text-neutral-medium leading-relaxed mb-6">{t('sources.intro')}</p>
            <ul className="space-y-2">
              {SOURCE_KEYS.map((key) => (
                <li key={key} className="flex gap-3 text-neutral-medium leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-300 shrink-0" aria-hidden="true" />
                  <span>{t(`sources.${key}`)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-neutral-medium leading-relaxed">
              {t('sources.outro')}{' '}
              <Link href="/methodologie-calculateur-roi" className="text-primary-orbitvu font-medium hover:underline">
                {isFr ? 'Méthodologie du calculateur ROI' : 'ROI calculator methodology'}
              </Link>
            </p>
          </FadeInView>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold leading-[1.1]">
                {t('finalCta.heading')}
              </TextReveal>
              <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">{t('finalCta.subtitle')}</p>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-8 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('finalCta.card1.heading')}</h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">{t('finalCta.card1.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href="/calculateur-roi">{t('finalCta.ctaPrimary')}</Link>
                </Button>
              </div>
            </SpringCard>
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.card2.heading')}</h3>
                <p className="text-neutral-400 mb-8 leading-relaxed flex-1">{t('finalCta.card2.description')}</p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/methodologie-calculateur-roi">{t('finalCta.ctaSecondary')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs), datasetSchema]} />
    </>
  );
}
