import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import {
  Sparkles, Camera, ArrowRight, Check, X, AlertTriangle,
  HelpCircle, ChevronDown, BookOpen, Clock, User,
} from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { Button } from '@/components/ui/button';

/* ─────────────────────────── Metadata ─────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogStudioIa.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/studio-ia-vs-ia-generative`,
      languages: {
        fr: '/fr/blog/studio-ia-vs-ia-generative',
        en: '/en/blog/studio-ia-vs-ia-generative',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/studio-ia-vs-ia-generative`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      publishedTime: '2026-03-22',
      authors: ['PackshotCreator'],
      images: [{
        url: `https://www.packshot-creator.com/api/og?title=${encodeURIComponent(t('title'))}&type=blog&lang=${lang}`,
        width: 1200,
        height: 630,
        alt: t('title'),
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

/* ─────────────────────────── Page ─────────────────────────── */

export default async function StudioIaVsIaGenerativePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogStudioIa' });
  const isFr = lang === 'fr';

  /* Breadcrumbs */
  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('breadcrumb.blog'), url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: t('breadcrumb.article'), url: `https://www.packshot-creator.com/${lang}/blog/studio-ia-vs-ia-generative` },
  ];

  /* FAQ data */
  const faqItems = (['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  /* Comparison rows */
  const comparisonRows = (['row1', 'row2', 'row3', 'row4', 'row5', 'row6', 'row7'] as const).map((key) => ({
    label: t(`comparison.${key}.label`),
    ai: t(`comparison.${key}.ai`),
    studio: t(`comparison.${key}.studio`),
  }));

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Compact blog hero, left-aligned
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="centered"
        align="left"
        compact
        badge={{
          icon: <BookOpen className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-very-peri-500/15 text-very-peri-300',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        {/* Article meta: category, date, read time */}
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-future-dusk-300">
          <span className="px-3 py-1 rounded-full bg-very-peri-500/20 text-very-peri-300 font-medium text-xs uppercase tracking-wide">
            {t('category')}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {t('readTime')}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {t('publishDate')}
          </span>
        </div>
      </HeroSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. ARTICLE BODY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* --- Introduction --- */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('intro.heading')}
            </TextReveal>
            <div className="prose-article space-y-6">
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('intro.body1')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('intro.body2')}
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* --- Market Overview --- */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('marketOverview.heading')}
            </TextReveal>
            <div className="space-y-6">
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('marketOverview.body1')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('marketOverview.body2')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('marketOverview.body3')}
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* --- AI Generative Pure --- */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('aiPure.heading')}
            </TextReveal>
            <div className="space-y-6">
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('aiPure.body1')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('aiPure.body2')}
              </p>
            </div>

            {/* Limites */}
            <div className="mt-12">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">
                {t('aiPure.limitesHeading')}
              </h3>
              <p className="text-future-dusk-600 leading-relaxed text-lg mb-8">
                {t('aiPure.limites1')}
              </p>

              <StaggerContainer stagger={0.1} className="space-y-6">
                {/* Limite 1 : Distorsion */}
                <StaggerItem>
                  <div className="flex gap-4 p-6 rounded-2xl border border-amber-200 bg-amber-50/50">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold text-future-dusk-900 mb-2">
                        {t('aiPure.limites2title')}
                      </p>
                      <p className="text-future-dusk-600 leading-relaxed">
                        {t('aiPure.limites2')}
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Limite 2 : Hallucinations */}
                <StaggerItem>
                  <div className="flex gap-4 p-6 rounded-2xl border border-amber-200 bg-amber-50/50">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold text-future-dusk-900 mb-2">
                        {t('aiPure.limites3title')}
                      </p>
                      <p className="text-future-dusk-600 leading-relaxed">
                        {t('aiPure.limites3')}
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Limite 3 : Derive visuelle */}
                <StaggerItem>
                  <div className="flex gap-4 p-6 rounded-2xl border border-amber-200 bg-amber-50/50">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold text-future-dusk-900 mb-2">
                        {t('aiPure.limites4title')}
                      </p>
                      <p className="text-future-dusk-600 leading-relaxed">
                        {t('aiPure.limites4')}
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Limite 4 : Pas de 360 */}
                <StaggerItem>
                  <div className="flex gap-4 p-6 rounded-2xl border border-amber-200 bg-amber-50/50">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold text-future-dusk-900 mb-2">
                        {t('aiPure.limites5title')}
                      </p>
                      <p className="text-future-dusk-600 leading-relaxed">
                        {t('aiPure.limites5')}
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                {/* Limite 5 : Risques juridiques */}
                <StaggerItem>
                  <div className="flex gap-4 p-6 rounded-2xl border border-amber-200 bg-amber-50/50">
                    <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold text-future-dusk-900 mb-2">
                        {t('aiPure.limites6title')}
                      </p>
                      <p className="text-future-dusk-600 leading-relaxed">
                        {t('aiPure.limites6')}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* --- Studio + IA --- */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('studioPlusIa.heading')}
            </TextReveal>
            <div className="space-y-6">
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('studioPlusIa.body1')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('studioPlusIa.body2')}
              </p>

              {/* Inline link to ia-photo-produit */}
              <div className="p-5 rounded-xl bg-very-peri-50 border border-very-peri-100">
                <p className="text-future-dusk-700 leading-relaxed">
                  <Sparkles className="inline h-4 w-4 text-very-peri-600 mr-1.5 -mt-0.5" />
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 font-medium underline underline-offset-4">
                    BlendAI.studio
                  </Link>
                  {' '}{isFr
                    ? ': decouvrez comment l\'IA augmente vos packshots sans jamais toucher au produit.'
                    : ': discover how AI enhances your packshots without ever touching the product.'}
                </p>
              </div>

              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('studioPlusIa.body3')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('studioPlusIa.body4')}
              </p>

              {/* Inline link to studios-photo-automatises */}
              <div className="p-5 rounded-xl bg-very-peri-50 border border-very-peri-100">
                <p className="text-future-dusk-700 leading-relaxed">
                  <Camera className="inline h-4 w-4 text-very-peri-600 mr-1.5 -mt-0.5" />
                  <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 font-medium underline underline-offset-4">
                    {isFr ? 'Studios photo automatises Orbitvu' : 'Orbitvu Automated Photo Studios'}
                  </Link>
                  {' '}{isFr
                    ? ': explorez la gamme complete, du bureau a l\'entrepot industriel.'
                    : ': explore the full range, from desktop to industrial warehouse.'}
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. COMPARISON TABLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-10 text-center">
              {t('comparison.heading')}
            </TextReveal>
          </FadeInView>

          <ScrollReveal>
            <SpringCard className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-future-dusk-900 text-white">
                <div className="p-4 lg:p-5 font-heading font-bold text-sm lg:text-base">
                  {t('comparison.criteria')}
                </div>
                <div className="p-4 lg:p-5 font-heading font-bold text-sm lg:text-base border-l border-white/10">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    {t('comparison.aiPure')}
                  </span>
                </div>
                <div className="p-4 lg:p-5 font-heading font-bold text-sm lg:text-base border-l border-white/10">
                  <span className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-very-peri-400" />
                    {t('comparison.studioIa')}
                  </span>
                </div>
              </div>

              {/* Table rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-neutral-50/50' : 'bg-white'} border-t border-neutral-100`}
                >
                  <div className="p-4 lg:p-5 font-medium text-future-dusk-900 text-sm lg:text-base">
                    {row.label}
                  </div>
                  <div className="p-4 lg:p-5 text-future-dusk-600 text-sm border-l border-neutral-100">
                    <span className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.ai}</span>
                    </span>
                  </div>
                  <div className="p-4 lg:p-5 text-future-dusk-600 text-sm border-l border-neutral-100">
                    <span className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{row.studio}</span>
                    </span>
                  </div>
                </div>
              ))}
            </SpringCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. WHO NEEDS WHAT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

      {/* Who needs AI pure */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('whoNeedsAiPure.heading')}
            </TextReveal>
            <div className="space-y-6">
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('whoNeedsAiPure.body1')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('whoNeedsAiPure.body2')}
              </p>
              <p className="text-future-dusk-600 leading-relaxed text-lg">
                {t('whoNeedsAiPure.body3')}
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Who needs Studio + IA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('whoNeedsStudio.heading')}
            </TextReveal>

            <p className="text-future-dusk-600 leading-relaxed text-lg mb-8">
              {t('whoNeedsStudio.body1')}
            </p>

            <StaggerContainer stagger={0.08} className="space-y-5 mb-8">
              {/* Criteria cards */}
              {(['criteria1', 'criteria2', 'criteria3', 'criteria4', 'criteria5'] as const).map((key) => (
                <StaggerItem key={key}>
                  <div className="flex gap-4 p-5 rounded-2xl border border-neutral-100 bg-neutral-50">
                    <Check className="h-5 w-5 text-very-peri-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold text-future-dusk-900 mb-1">
                        {t(`whoNeedsStudio.${key}`)}
                      </p>
                      <p className="text-future-dusk-600 leading-relaxed">
                        {t(`whoNeedsStudio.${key}detail`)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <p className="text-future-dusk-600 leading-relaxed text-lg">
              {t('whoNeedsStudio.body2')}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. FAQ (details/summary, no client JS)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-10 text-center">
              {t('faq.heading')}
            </TextReveal>
          </FadeInView>

          <StaggerContainer stagger={0.08} className="space-y-4">
            {faqItems.map((faq) => (
              <StaggerItem key={faq.question}>
                <details className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 lg:p-6 cursor-pointer list-none select-none hover:bg-neutral-50 transition-colors [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-very-peri-500 shrink-0" />
                      <span className="font-heading font-bold text-future-dusk-900 text-base lg:text-lg">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 lg:px-6 lg:pb-6 pt-0">
                    <div className="pl-8 border-l-2 border-very-peri-200">
                      <p className="text-future-dusk-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. RELATED LINKS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('relatedLinks.heading')}
            </h2>

            <div className="grid sm:grid-cols-3 gap-5">
              <Link
                href="/ia-photo-produit"
                className="group block p-5 rounded-2xl border border-neutral-100 bg-white hover:border-very-peri-200 hover:shadow-md transition-all"
              >
                <Sparkles className="h-6 w-6 text-very-peri-500 mb-3" />
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                  {t('relatedLinks.link1label')}
                </h3>
                <p className="text-sm text-future-dusk-500 leading-relaxed">
                  {t('relatedLinks.link1description')}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-sm text-very-peri-600 font-medium group-hover:gap-2.5 transition-all">
                  {isFr ? 'Decouvrir' : 'Learn more'} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                href="/studios-photo-automatises"
                className="group block p-5 rounded-2xl border border-neutral-100 bg-white hover:border-very-peri-200 hover:shadow-md transition-all"
              >
                <Camera className="h-6 w-6 text-very-peri-500 mb-3" />
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                  {t('relatedLinks.link2label')}
                </h3>
                <p className="text-sm text-future-dusk-500 leading-relaxed">
                  {t('relatedLinks.link2description')}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-sm text-very-peri-600 font-medium group-hover:gap-2.5 transition-all">
                  {isFr ? 'Explorer' : 'Explore'} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                href="/studios-photo-automatises#calculateur"
                className="group block p-5 rounded-2xl border border-neutral-100 bg-white hover:border-very-peri-200 hover:shadow-md transition-all"
              >
                <ArrowRight className="h-6 w-6 text-very-peri-500 mb-3" />
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                  {t('relatedLinks.link3label')}
                </h3>
                <p className="text-sm text-future-dusk-500 leading-relaxed">
                  {t('relatedLinks.link3description')}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-3 text-sm text-very-peri-600 font-medium group-hover:gap-2.5 transition-all">
                  {isFr ? 'Calculer' : 'Calculate'} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. CTA FINAL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
                <Link href="/contact">
                  {t('cta.ctaDemo')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
                <a href="https://blendai.studio" target="_blank" rel="noopener noreferrer">
                  {t('cta.ctaBlendai')}
                </a>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: t('meta.title'),
          description: t('meta.description'),
          url: `https://www.packshot-creator.com/${lang}/blog/studio-ia-vs-ia-generative`,
          datePublished: '2026-03-22',
          author: 'PackshotCreator',
          category: t('category'),
        }),
        faqSchema(faqItems),
      ]} />
    </>
  );
}
