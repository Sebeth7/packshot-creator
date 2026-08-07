import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, ScrollReveal, TextReveal, SpringCard } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import { Scale, ArrowRight, ChevronDown, CalendarCheck, Banknote, Clock3 } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

interface PageProps {
  params: Promise<{ lang: string }>;
}

const PAGE_PATH = '/methodologie-calculateur-roi';
const SITE_URL = 'https://www.packshot-creator.com';

// Page FR + EN uniquement (documente le calculateur, chat FR / wizard EN).
export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'methodoRoi' });

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

const CONVENTION_ROWS = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'] as const;
const MODES = ['m1', 'm2', 'm3'] as const;
const HONESTY = ['h1', 'h2', 'h3', 'h4'] as const;
const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

export default async function MethodologieRoiPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'methodoRoi' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `${SITE_URL}/${lang}` },
    { name: t('hero.title'), url: `${SITE_URL}/${lang}${PAGE_PATH}` },
  ];

  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  // TechArticle : la page documente formellement le modèle de calcul.
  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t('meta.title'),
    description: t('meta.description'),
    url: `${SITE_URL}/${lang}${PAGE_PATH}`,
    inLanguage: isFr ? 'fr-FR' : 'en-US',
    datePublished: '2026-08-07',
    dateModified: '2026-08-07',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: isFr
      ? 'Méthodologie de calcul du retour sur investissement d’un studio photo automatisé'
      : 'Calculation methodology for the return on investment of an automated photo studio',
  };

  return (
    <>
      <HeroSection
        badge={{
          icon: <Scale className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.cta'), href: '/calculateur-roi', variant: 'primary' },
          { label: isFr ? 'Voir les prix de référence' : 'See the reference prices', href: '/prix-packshot-photo-produit', variant: 'secondary' },
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

      {/* Les deux métriques */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('principle.label')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('principle.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed">{t('principle.intro')}</p>
          </FadeInView>
          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            <FadeInView direction="up">
              <div className="rounded-2xl border border-neutral-100 bg-white p-8 h-full">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                  <Banknote className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">{t('principle.cash.title')}</h3>
                <p className="rounded-lg bg-future-dusk-0 border border-neutral-100 px-4 py-3 font-mono text-sm text-heading-dark mb-4">
                  {t('principle.cash.formula')}
                </p>
                <p className="text-neutral-medium leading-relaxed">{t('principle.cash.description')}</p>
              </div>
            </FadeInView>
            <FadeInView direction="up" delay={0.1}>
              <div className="rounded-2xl border border-neutral-100 bg-white p-8 h-full">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                  <Clock3 className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">{t('principle.time.title')}</h3>
                <p className="rounded-lg bg-future-dusk-0 border border-neutral-100 px-4 py-3 font-mono text-sm text-heading-dark mb-4">
                  {t('principle.time.formula')}
                </p>
                <p className="text-neutral-medium leading-relaxed">{t('principle.time.description')}</p>
              </div>
            </FadeInView>
          </div>
          <FadeInView delay={0.15}>
            <p className="mt-8 text-neutral-dark leading-relaxed">{t('principle.why')}</p>
          </FadeInView>
        </div>
      </section>

      {/* Conventions */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('conventions.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-3xl">{t('conventions.intro')}</p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-100 bg-future-dusk-0/60">
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('conventions.table.h1')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('conventions.table.h2')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('conventions.table.h3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {CONVENTION_ROWS.map((row) => (
                    <tr key={row} className="border-b border-neutral-100 last:border-0 align-top">
                      <td className="px-6 py-4 font-medium text-heading-dark whitespace-nowrap">{t(`conventions.table.${row}.item`)}</td>
                      <td className="px-6 py-4 text-neutral-dark">{t(`conventions.table.${row}.value`)}</td>
                      <td className="px-6 py-4 text-neutral-medium">{t(`conventions.table.${row}.why`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Modes de comparaison */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('modes.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed">{t('modes.intro')}</p>
          </FadeInView>
          <StaggerContainer className="mt-10 space-y-6">
            {MODES.map((key, i) => (
              <StaggerItem key={key}>
                <FadeInView direction="up" delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-8">
                    <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">{t(`modes.${key}.title`)}</h3>
                    <p className="text-neutral-medium leading-relaxed">{t(`modes.${key}.description`)}</p>
                  </div>
                </FadeInView>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gains par fonction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight mb-6">
              {t('differential.heading')}
            </h2>
            <p className="text-neutral-medium leading-relaxed">{t('differential.p1')}</p>
            <div className="mt-6 rounded-2xl border border-very-peri-200 bg-very-peri-50/50 p-6">
              <p className="text-heading-dark leading-relaxed font-medium">{t('differential.example')}</p>
            </div>
            <p className="mt-6 text-neutral-medium leading-relaxed">{t('differential.p2')}</p>
          </FadeInView>
        </div>
      </section>

      {/* Moteur déterministe */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight mb-6">
              {t('engine.heading')}
            </h2>
            <p className="text-neutral-medium leading-relaxed">{t('engine.p1')}</p>
            <p className="mt-4 text-neutral-medium leading-relaxed">{t('engine.p2')}</p>
          </FadeInView>
        </div>
      </section>

      {/* Règles d'honnêteté */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('honesty.heading')}
            </TextReveal>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-2xl mx-auto">{t('honesty.intro')}</p>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {HONESTY.map((key, i) => (
              <StaggerItem key={key}>
                <FadeInView direction="up" delay={i * 0.08}>
                  <div className="rounded-2xl border border-neutral-100 bg-future-dusk-0/40 p-8 h-full">
                    <h3 className="text-lg font-heading font-bold text-heading-dark mb-3">{t(`honesty.${key}.title`)}</h3>
                    <p className="text-neutral-medium leading-relaxed">{t(`honesty.${key}.description`)}</p>
                  </div>
                </FadeInView>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
          <FadeInView delay={0.2}>
            <div className="mt-10">
              <Button asChild className="bg-primary-orbitvu hover:bg-very-peri-600 text-white rounded-xl px-6 h-12">
                <Link href="/calculateur-roi">
                  {t('hero.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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
                  <Link href="/prix-packshot-photo-produit">{t('finalCta.ctaSecondary')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs), techArticleSchema]} />
    </>
  );
}
