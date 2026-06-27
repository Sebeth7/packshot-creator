import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import {
  BarChart3,
  ArrowRight,
  Check,
  X,
  Globe,
  ChevronDown,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';
import SchemaOrg, {
  breadcrumbSchema,
  articleSchema,
  faqSchema,
} from '@/components/seo/SchemaOrg';
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { Button } from '@/components/ui/button';
import { buildLanguages } from '@/lib/hreflang';

/* ──────────────────────── Types ──────────────────────── */

interface PageProps {
  params: Promise<{ lang: string }>;
}

/* ──────────────────────── Metadata ──────────────────────── */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogComparatif' });

  const slug = 'comparatif-orbitvu-ortery-styleshoots-2026';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
      languages: buildLanguages(`/fr/blog/${slug}`, { en: `/en/blog/${slug}` }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'article',
      publishedTime: '2026-03-22',
      authors: ['PackshotCreator'],
      url: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=blog&lang=${lang}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [
        `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=blog&lang=${lang}`,
      ],
    },
  };
}

/* ──────────────────────── Comparison table data keys ──────────────────────── */

const CRITERIA_KEYS = [
  'origin',
  'priceRange',
  'systemCount',
  'maxSize',
  'rotation360',
  'multiline3d',
  'video',
  'autoClipping',
  'integratedAI',
  'software',
  'franceSuuport',
  'easeOfUse',
  'positioning',
  'productivity',
  'flatlay',
  'onmodel',
] as const;

const BRANDS = ['orbitvu', 'ortery', 'styleshoots'] as const;

/* ──────────────────────── Boolean-like cell renderer ──────────────────────── */

function CellIcon({ value }: { value: string }) {
  const lower = value.toLowerCase();
  if (lower.startsWith('oui') || lower.startsWith('yes')) {
    return (
      <span className="inline-flex items-center gap-1.5 text-emerald-600">
        <Check className="h-4 w-4 shrink-0" />
        <span>{value}</span>
      </span>
    );
  }
  if (lower === 'non' || lower === 'no') {
    return (
      <span className="inline-flex items-center gap-1.5 text-red-400">
        <X className="h-4 w-4 shrink-0" />
        <span>{value}</span>
      </span>
    );
  }
  return <span>{value}</span>;
}

/* ──────────────────────── Brand color mapping ──────────────────────── */

const BRAND_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  orbitvu: {
    bg: 'bg-very-peri-50',
    border: 'border-very-peri-200',
    text: 'text-very-peri-700',
    badge: 'bg-very-peri-100 text-very-peri-700',
  },
  ortery: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700',
  },
  styleshoots: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-700',
  },
};

/* ──────────────────────── Page ──────────────────────── */

export default async function ComparatifPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: 'blogComparatif',
  });
  const isFr = lang === 'fr';

  const slug = 'comparatif-orbitvu-ortery-styleshoots-2026';

  const breadcrumbs = [
    {
      name: 'PackshotCreator',
      url: `https://www.packshot-creator.com/${lang}`,
    },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    {
      name: t('meta.title'),
      url: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
    },
  ];

  const faqItems = (['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map(
    (key) => ({
      question: t(`faq.${key}.question`),
      answer: t(`faq.${key}.answer`),
    }),
  );

  return (
    <>
      {/* ───── Hero ───── */}
      <HeroSection
        compact
        align="left"
        badge={{
          label: t('hero.badge'),
          icon: <BarChart3 className="h-4 w-4" />,
          colorClass: 'bg-white/10 text-white',
        }}
        title={
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-sans font-normal text-future-dusk-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {t('breadcrumb.home')}
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-white transition-colors"
              >
                {t('breadcrumb.blog')}
              </Link>
              <span>/</span>
              <span className="text-very-peri-300">
                {t('breadcrumb.category')}
              </span>
            </div>
            {t('hero.title')}
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-200 mt-2">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime="2026-03-22">
              {new Date('2026-03-22').toLocaleDateString(
                isFr ? 'fr-FR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {t('articleMeta.author')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {t('articleMeta.readingTime')}
          </span>
          <span className="px-3 py-1 rounded-full bg-very-peri-100/20 text-very-peri-200 text-xs font-medium uppercase tracking-wide">
            {t('articleMeta.category')}
          </span>
        </div>
      </HeroSection>

      {/* ───── Intro ───── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-future-dusk-900 mb-8">
              {t('intro.heading')}
            </h2>
            <div className="space-y-6 text-future-dusk-600 text-lg leading-relaxed">
              <p>{t('intro.body1')}</p>
              <div className="border-l-4 border-very-peri-500 pl-6 py-3 bg-very-peri-50 rounded-r-lg">
                <p className="text-future-dusk-700 font-medium">
                  {t('intro.body2')}
                </p>
              </div>
              <p>{t('intro.body3')}</p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ───── Three brand presentations (SpringCards) ───── */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {/* Orbitvu */}
              <StaggerItem>
                <SpringCard
                  className={`rounded-2xl border ${BRAND_COLORS.orbitvu.border} ${BRAND_COLORS.orbitvu.bg} p-8 h-full flex flex-col`}
                >
                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${BRAND_COLORS.orbitvu.badge} mb-4`}
                  >
                    Orbitvu
                  </span>
                  <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-4">
                    {t('orbitvu.heading')}
                  </h3>
                  <div className="space-y-4 text-future-dusk-600 text-sm leading-relaxed flex-1">
                    <p>{t('orbitvu.body1')}</p>
                    <p>{t('orbitvu.body2')}</p>
                    <p>{t('orbitvu.body3')}</p>
                    <p>{t('orbitvu.body4')}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-very-peri-200/50 space-y-1 text-xs text-future-dusk-500">
                    <p>
                      <Globe className="inline h-3.5 w-3.5 mr-1" />
                      {t('orbitvu.founded')}
                    </p>
                    <p>
                      <BarChart3 className="inline h-3.5 w-3.5 mr-1" />
                      {t('orbitvu.priceRange')}
                    </p>
                  </div>
                </SpringCard>
              </StaggerItem>

              {/* Ortery */}
              <StaggerItem>
                <SpringCard
                  className={`rounded-2xl border ${BRAND_COLORS.ortery.border} ${BRAND_COLORS.ortery.bg} p-8 h-full flex flex-col`}
                >
                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${BRAND_COLORS.ortery.badge} mb-4`}
                  >
                    Ortery
                  </span>
                  <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-4">
                    {t('ortery.heading')}
                  </h3>
                  <div className="space-y-4 text-future-dusk-600 text-sm leading-relaxed flex-1">
                    <p>{t('ortery.body1')}</p>
                    <p>{t('ortery.body2')}</p>
                    <p>{t('ortery.body3')}</p>
                    <p>{t('ortery.body4')}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-amber-200/50 space-y-1 text-xs text-future-dusk-500">
                    <p>
                      <Globe className="inline h-3.5 w-3.5 mr-1" />
                      {t('ortery.founded')}
                    </p>
                    <p>
                      <BarChart3 className="inline h-3.5 w-3.5 mr-1" />
                      {t('ortery.priceRange')}
                    </p>
                  </div>
                </SpringCard>
              </StaggerItem>

              {/* Styleshoots */}
              <StaggerItem>
                <SpringCard
                  className={`rounded-2xl border ${BRAND_COLORS.styleshoots.border} ${BRAND_COLORS.styleshoots.bg} p-8 h-full flex flex-col`}
                >
                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${BRAND_COLORS.styleshoots.badge} mb-4`}
                  >
                    Styleshoots / Profoto
                  </span>
                  <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-4">
                    {t('styleshoots.heading')}
                  </h3>
                  <div className="space-y-4 text-future-dusk-600 text-sm leading-relaxed flex-1">
                    <p>{t('styleshoots.body1')}</p>
                    <p>{t('styleshoots.body2')}</p>
                    <p>{t('styleshoots.body3')}</p>
                    <p>{t('styleshoots.body4')}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-rose-200/50 space-y-1 text-xs text-future-dusk-500">
                    <p>
                      <Globe className="inline h-3.5 w-3.5 mr-1" />
                      {t('styleshoots.founded')}
                    </p>
                    <p>
                      <BarChart3 className="inline h-3.5 w-3.5 mr-1" />
                      {t('styleshoots.priceRange')}
                    </p>
                  </div>
                </SpringCard>
              </StaggerItem>
            </StaggerContainer>
          </FadeInView>
        </div>
      </section>

      {/* ───── Grand Tableau Comparatif ───── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <div className="text-center mb-12">
              <TextReveal
                as="h2"
                className="font-heading text-3xl sm:text-4xl font-bold text-future-dusk-900 mb-4"
              >
                {t('comparison.heading')}
              </TextReveal>
              <p className="text-future-dusk-500 max-w-2xl mx-auto">
                {t('comparison.subheading')}
              </p>
            </div>
          </FadeInView>

          <ScrollReveal>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[720px] px-4 sm:px-0">
                {/* Header row */}
                <div className="grid grid-cols-4 gap-0 mb-1">
                  <div className="p-4 rounded-tl-2xl bg-future-dusk-900 text-white font-heading font-bold text-sm">
                    {isFr ? 'Critere' : 'Criteria'}
                  </div>
                  {BRANDS.map((brand, i) => (
                    <div
                      key={brand}
                      className={`p-4 text-center font-heading font-bold text-sm ${
                        BRAND_COLORS[brand].bg
                      } ${BRAND_COLORS[brand].text} ${
                        i === BRANDS.length - 1 ? 'rounded-tr-2xl' : ''
                      }`}
                    >
                      {brand === 'styleshoots'
                        ? 'Styleshoots / Profoto'
                        : brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                {CRITERIA_KEYS.map((key, rowIdx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-4 gap-0 ${
                      rowIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                    } ${
                      rowIdx === CRITERIA_KEYS.length - 1
                        ? 'rounded-b-2xl'
                        : ''
                    }`}
                  >
                    <div className="p-4 text-sm font-semibold text-future-dusk-800 border-r border-neutral-100">
                      {t(`comparison.criteria.${key}`)}
                    </div>
                    {BRANDS.map((brand) => (
                      <div
                        key={brand}
                        className="p-4 text-sm text-future-dusk-600 border-r border-neutral-100 last:border-r-0"
                      >
                        <CellIcon
                          value={t(`comparison.${brand}.${key}`)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── Forces et Faiblesses ───── */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-future-dusk-900 text-center mb-12">
              {t('strengths.heading')}
            </h2>
          </FadeInView>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {BRANDS.map((brand) => {
              const colors = BRAND_COLORS[brand];
              const strengthKeys =
                brand === 'orbitvu'
                  ? ['s1', 's2', 's3', 's4', 's5', 's6']
                  : brand === 'ortery'
                    ? ['s1', 's2', 's3', 's4', 's5']
                    : ['s1', 's2', 's3', 's4', 's5'];
              const weaknessKeys =
                brand === 'orbitvu'
                  ? ['w1', 'w2', 'w3']
                  : brand === 'ortery'
                    ? ['w1', 'w2', 'w3', 'w4']
                    : ['w1', 'w2', 'w3', 'w4', 'w5'];

              return (
                <StaggerItem key={brand}>
                  <div
                    className={`rounded-2xl border ${colors.border} bg-white p-8 h-full`}
                  >
                    <h3
                      className={`font-heading text-xl font-bold ${colors.text} mb-6`}
                    >
                      {t(`strengths.${brand}.heading`)}
                    </h3>

                    {/* Strengths */}
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-3">
                      {t(`strengths.${brand}.strengths`)}
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {strengthKeys.map((sk) => (
                        <li
                          key={sk}
                          className="flex items-start gap-2 text-sm text-future-dusk-600"
                        >
                          <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>
                            {t(`strengths.${brand}.${sk}`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Weaknesses */}
                    <h4 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3">
                      {t(`strengths.${brand}.weaknesses`)}
                    </h4>
                    <ul className="space-y-2">
                      {weaknessKeys.map((wk) => (
                        <li
                          key={wk}
                          className="flex items-start gap-2 text-sm text-future-dusk-500"
                        >
                          <X className="h-4 w-4 text-red-300 mt-0.5 shrink-0" />
                          <span>
                            {t(`strengths.${brand}.${wk}`)}
                          </span>
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

      {/* ───── Notre Avis (Our Take) ───── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-future-dusk-900 mb-8">
              {t('ourTake.heading')}
            </h2>

            {/* Transparency box */}
            <div className="border-l-4 border-very-peri-500 pl-6 py-4 bg-very-peri-50 rounded-r-lg mb-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-very-peri-600 mt-0.5 shrink-0" />
                <p className="text-future-dusk-700 text-sm leading-relaxed">
                  {t('ourTake.transparencyNote')}
                </p>
              </div>
            </div>

            <p className="text-future-dusk-600 text-lg leading-relaxed mb-8">
              {t('ourTake.body1')}
            </p>

            <div className="space-y-8">
              {/* Reason 1 */}
              <div>
                <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-2">
                  {t('ourTake.reason1title')}
                </h3>
                <p className="text-future-dusk-600 leading-relaxed">
                  {t('ourTake.reason1')}
                </p>
              </div>

              {/* Reason 2 */}
              <div>
                <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-2">
                  {t('ourTake.reason2title')}
                </h3>
                <p className="text-future-dusk-600 leading-relaxed">
                  {t('ourTake.reason2')}
                </p>
              </div>

              {/* Reason 3 */}
              <div>
                <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-2">
                  {t('ourTake.reason3title')}
                </h3>
                <p className="text-future-dusk-600 leading-relaxed">
                  {t('ourTake.reason3')}
                </p>
              </div>

              {/* Reason 4 */}
              <div>
                <h3 className="font-heading text-xl font-bold text-future-dusk-900 mb-2">
                  {t('ourTake.reason4title')}
                </h3>
                <p className="text-future-dusk-600 leading-relaxed">
                  {t('ourTake.reason4')}
                </p>
              </div>
            </div>

            {/* Fairness note */}
            <div className="mt-10 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
              <p className="text-future-dusk-600 leading-relaxed italic">
                {t('ourTake.fairness')}
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-future-dusk-900 text-center mb-12">
              {t('faq.heading')}
            </h2>
          </FadeInView>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FadeInView key={i} delay={i * 0.05}>
                <details className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-heading font-semibold text-future-dusk-900 hover:text-very-peri-600 transition-colors">
                    <span>{item.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-future-dusk-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-future-dusk-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-lg text-very-peri-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg"
              >
                <Link href="/contact">
                  {t('cta.demoButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl"
              >
                <Link href="/studios-photo-automatises">
                  {t('cta.rangeButton')}
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ───── Related Links ───── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-future-dusk-900 text-center mb-10">
              {t('relatedLinks.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            <StaggerItem>
              <Link
                href="/studios-photo-automatises"
                className="group block rounded-2xl border border-neutral-100 bg-white p-6 hover:shadow-lg hover:border-very-peri-200 transition-all duration-300 h-full"
              >
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                  {t('relatedLinks.link1.title')}
                </h3>
                <p className="text-sm text-future-dusk-500 mb-4">
                  {t('relatedLinks.link1.description')}
                </p>
                <span className="text-very-peri-600 font-medium inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                  {isFr ? 'Decouvrir' : 'Discover'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link
                href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-pro-g2' } }}
                className="group block rounded-2xl border border-neutral-100 bg-white p-6 hover:shadow-lg hover:border-very-peri-200 transition-all duration-300 h-full"
              >
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                  {t('relatedLinks.link2.title')}
                </h3>
                <p className="text-sm text-future-dusk-500 mb-4">
                  {t('relatedLinks.link2.description')}
                </p>
                <span className="text-very-peri-600 font-medium inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                  {isFr ? 'Voir le produit' : 'View product'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link
                href="/calculateur-roi"
                className="group block rounded-2xl border border-neutral-100 bg-white p-6 hover:shadow-lg hover:border-very-peri-200 transition-all duration-300 h-full"
              >
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                  {t('relatedLinks.link3.title')}
                </h3>
                <p className="text-sm text-future-dusk-500 mb-4">
                  {t('relatedLinks.link3.description')}
                </p>
                <span className="text-very-peri-600 font-medium inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                  {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ───── Back to blog ───── */}
      <section className="py-8 bg-white border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-very-peri-600 hover:text-very-peri-700 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isFr ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </div>
      </section>

      {/* ───── Schema.org ───── */}
      <SchemaOrg
        schema={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            title: t('meta.title'),
            description: t('meta.description'),
            url: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
            datePublished: '2026-03-22',
            author: 'PackshotCreator',
            category: t('articleMeta.category'),
          }),
          faqSchema(faqItems),
        ]}
      />
    </>
  );
}
