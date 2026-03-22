import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import {
  Calculator, ArrowRight, Check, TrendingUp, CreditCard,
  HelpCircle, ChevronDown, Package, Maximize, Factory,
  Calendar, Clock, Tag, ArrowLeft,
} from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogBudget.meta' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/budget-studio-photo-automatise`,
      languages: { fr: '/fr/blog/budget-studio-photo-automatise', en: '/en/blog/budget-studio-photo-automatise' },
    },
    openGraph: {
      title: t('title'), description: t('description'), type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/budget-studio-photo-automatise`,
      siteName: 'PackshotCreator', locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `https://www.packshot-creator.com/api/og?title=${encodeURIComponent(t('title'))}&type=blog&lang=${lang}`, width: 1200, height: 630, alt: t('title') }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

export default async function BudgetStudioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogBudget' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: t('meta.title'), url: `https://www.packshot-creator.com/${lang}/blog/budget-studio-photo-automatise` },
  ];

  const budgetFaqs = (['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  const costRows = (['row1', 'row2', 'row3', 'row4'] as const).map((key) => ({
    method: t(`costPerPhoto.table.${key}.method`),
    cost: t(`costPerPhoto.table.${key}.cost`),
    volume: t(`costPerPhoto.table.${key}.volume`),
  }));

  return (
    <>
      {/* Schema.org structured data */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: t('meta.title'),
          description: t('meta.description'),
          url: `https://www.packshot-creator.com/${lang}/blog/budget-studio-photo-automatise`,
          datePublished: '2026-03-22',
          author: 'PackshotCreator',
          category: 'Guide',
        }),
        faqSchema(budgetFaqs),
      ]} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Article header, compact
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="centered"
        compact
        badge={{
          icon: <Calculator className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-emerald-500/15 text-emerald-300',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ARTICLE BODY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Article meta */}
          <FadeInView>
            <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-400 mb-10 pb-8 border-b border-neutral-100">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-very-peri-600 hover:text-very-peri-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                {isFr ? 'Retour au blog' : 'Back to blog'}
              </Link>
              <span className="hidden sm:inline">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {isFr ? '22 mars 2026' : 'March 22, 2026'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {isFr ? '8 min de lecture' : '8 min read'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                Guide
              </span>
            </div>
          </FadeInView>

          {/* ── INTRO ── */}
          <FadeInView>
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-lg text-future-dusk-600 leading-relaxed">
                {t('intro.p1')}
              </p>
              <p className="text-lg text-future-dusk-600 leading-relaxed">
                {t('intro.p2')}
              </p>
            </div>
          </FadeInView>

          {/* ── FACTORS ── */}
          <ScrollReveal className="mb-16">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 mb-6">
              {t('factors.heading')}
            </TextReveal>
            <p className="text-lg text-future-dusk-600 leading-relaxed mb-6">
              {t('factors.body')}
            </p>
            <ul className="space-y-3">
              {(['f1', 'f2', 'f3', 'f4'] as const).map((key) => (
                <li key={key} className="flex items-start gap-3 text-future-dusk-600">
                  <Check className="h-5 w-5 text-very-peri-500 mt-0.5 shrink-0" />
                  <span>{t(`factors.${key}`)}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* ── PRICE RANGES ── */}
          <ScrollReveal className="mb-16">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('ranges.heading')}
            </TextReveal>
            <p className="text-lg text-future-dusk-600 leading-relaxed mb-8">
              {t('ranges.intro')}
            </p>
            <StaggerContainer stagger={0.1} className="grid gap-6 md:grid-cols-3">
              {/* Compact */}
              <StaggerItem>
                <SpringCard className="rounded-2xl border border-neutral-100 bg-white p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Package className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                      {t('ranges.compact.title')}
                    </h3>
                  </div>
                  <p className="text-2xl font-heading font-bold text-very-peri-600 mb-3">
                    {t('ranges.compact.price')}
                  </p>
                  <p className="text-sm text-future-dusk-600 leading-relaxed mb-4">
                    {t('ranges.compact.description')}
                  </p>
                  <ul className="space-y-2">
                    {(['l1', 'l2', 'l3'] as const).map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-future-dusk-500">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{t(`ranges.compact.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </SpringCard>
              </StaggerItem>

              {/* Polyvalent */}
              <StaggerItem>
                <SpringCard className="rounded-2xl border-2 border-very-peri-200 bg-very-peri-50/30 p-6 h-full relative">
                  <div className="absolute -top-3 left-6 bg-very-peri-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {t('ranges.polyvalent.badge')}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-very-peri-50 flex items-center justify-center">
                      <Maximize className="h-5 w-5 text-very-peri-600" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                      {t('ranges.polyvalent.title')}
                    </h3>
                  </div>
                  <p className="text-2xl font-heading font-bold text-very-peri-600 mb-3">
                    {t('ranges.polyvalent.price')}
                  </p>
                  <p className="text-sm text-future-dusk-600 leading-relaxed mb-4">
                    {t('ranges.polyvalent.description')}
                  </p>
                  <ul className="space-y-2">
                    {(['l1', 'l2', 'l3'] as const).map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-future-dusk-500">
                        <Check className="h-4 w-4 text-very-peri-500 mt-0.5 shrink-0" />
                        <span>{t(`ranges.polyvalent.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </SpringCard>
              </StaggerItem>

              {/* Grand volume */}
              <StaggerItem>
                <SpringCard className="rounded-2xl border border-neutral-100 bg-white p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Factory className="h-5 w-5 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                      {t('ranges.grandVolume.title')}
                    </h3>
                  </div>
                  <p className="text-2xl font-heading font-bold text-very-peri-600 mb-3">
                    {t('ranges.grandVolume.price')}
                  </p>
                  <p className="text-sm text-future-dusk-600 leading-relaxed mb-4">
                    {t('ranges.grandVolume.description')}
                  </p>
                  <ul className="space-y-2">
                    {(['l1', 'l2', 'l3'] as const).map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-future-dusk-500">
                        <Check className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        <span>{t(`ranges.grandVolume.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </SpringCard>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>

          {/* ── COST PER PHOTO ── */}
          <ScrollReveal className="mb-16">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 mb-6">
              {t('costPerPhoto.heading')}
            </TextReveal>
            <p className="text-lg text-future-dusk-600 leading-relaxed mb-8">
              {t('costPerPhoto.body')}
            </p>
            <SpringCard className="rounded-2xl border border-neutral-100 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-future-dusk-50">
                      <th className="px-6 py-4 text-sm font-semibold text-future-dusk-900">
                        {t('costPerPhoto.table.headerMethod')}
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-future-dusk-900">
                        {t('costPerPhoto.table.headerCost')}
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-future-dusk-900">
                        {t('costPerPhoto.table.headerVolume')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {costRows.map((row, i) => (
                      <tr key={i} className={i === costRows.length - 1 ? 'bg-emerald-50/50' : ''}>
                        <td className="px-6 py-4 text-sm text-future-dusk-700 font-medium">
                          {row.method}
                        </td>
                        <td className="px-6 py-4 text-sm text-future-dusk-600">
                          {row.cost}
                        </td>
                        <td className="px-6 py-4 text-sm text-future-dusk-500">
                          {row.volume}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-100">
                <p className="text-sm text-emerald-800 font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {t('costPerPhoto.highlight')}
                </p>
              </div>
            </SpringCard>
          </ScrollReveal>

          {/* ── ROI ── */}
          <ScrollReveal className="mb-16">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 mb-6">
              {t('roi.heading')}
            </TextReveal>
            <p className="text-lg text-future-dusk-600 leading-relaxed mb-8">
              {t('roi.body')}
            </p>

            {/* ROI stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((key) => (
                <FadeInView key={key}>
                  <div className="text-center p-4 rounded-xl bg-future-dusk-50">
                    <p className="text-3xl lg:text-4xl font-heading font-bold text-very-peri-600">
                      {t(`roi.${key}.value`)}
                    </p>
                    <p className="mt-1 text-sm text-future-dusk-500">
                      {t(`roi.${key}.label`)}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>

            <p className="text-future-dusk-600 leading-relaxed">
              {t('roi.conclusion')}
            </p>
            <div className="mt-4">
              <Link
                href="/calculateur-roi"
                className="inline-flex items-center gap-2 text-very-peri-600 hover:text-very-peri-700 font-medium transition-colors"
              >
                <Calculator className="h-4 w-4" />
                {t('roi.ctaCalculator')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* ── INCLUDED ── */}
          <ScrollReveal className="mb-16">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 mb-6">
              {t('included.heading')}
            </TextReveal>
            <p className="text-lg text-future-dusk-600 leading-relaxed mb-6">
              {t('included.body')}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {(['i1', 'i2', 'i3', 'i4', 'i5', 'i6'] as const).map((key) => (
                <FadeInView key={key}>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-future-dusk-50/50">
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-future-dusk-900">{t(`included.${key}.title`)}</p>
                      <p className="text-sm text-future-dusk-500">{t(`included.${key}.description`)}</p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </ScrollReveal>

          {/* ── FINANCING ── */}
          <ScrollReveal className="mb-16">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900 mb-6">
              {t('financing.heading')}
            </TextReveal>
            <p className="text-lg text-future-dusk-600 leading-relaxed mb-6">
              {t('financing.body')}
            </p>
            <StaggerContainer stagger={0.08} className="grid sm:grid-cols-2 gap-4">
              {(['f1', 'f2', 'f3', 'f4'] as const).map((key) => (
                <StaggerItem key={key}>
                  <div className="flex items-start gap-3 p-5 rounded-2xl border border-neutral-100 bg-white">
                    <CreditCard className="h-5 w-5 text-very-peri-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-future-dusk-900">{t(`financing.${key}.title`)}</p>
                      <p className="text-sm text-future-dusk-500 mt-1">{t(`financing.${key}.description`)}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>

          {/* ── FAQ ── */}
          <ScrollReveal className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="h-6 w-6 text-very-peri-500" />
              <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-future-dusk-900">
                {t('faq.heading')}
              </TextReveal>
            </div>
            <div className="space-y-3">
              {budgetFaqs.map((faq, i) => (
                <FadeInView key={i}>
                  <details className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none hover:bg-future-dusk-50/50 transition-colors">
                      <span className="font-medium text-future-dusk-900">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-5 text-future-dusk-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </FadeInView>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </article>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-gradient-to-r from-very-peri-600 to-very-peri-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
              {t('cta.heading')}
            </TextReveal>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/calculateur-roi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-very-peri-700 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                <Calculator className="h-5 w-5" />
                {t('cta.btnCalculator')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                {t('cta.btnContact')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RELATED LINKS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-future-dusk-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-8">
              {t('relatedLinks.heading')}
            </h2>
            <StaggerContainer stagger={0.08} className="grid sm:grid-cols-3 gap-4">
              {([
                { key: 'link1', href: '/calculateur-roi', icon: <Calculator className="h-5 w-5" /> },
                { key: 'link2', href: '/studios-photo-automatises', icon: <Package className="h-5 w-5" /> },
                { key: 'link3', href: '/contact', icon: <ArrowRight className="h-5 w-5" /> },
              ]).map((link) => (
                <StaggerItem key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 p-5 rounded-2xl border border-neutral-100 bg-white hover:border-very-peri-200 hover:shadow-md transition-all"
                  >
                    <div className="h-10 w-10 rounded-xl bg-very-peri-50 flex items-center justify-center text-very-peri-600 group-hover:bg-very-peri-100 transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <p className="font-medium text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                        {t(`relatedLinks.${link.key}.title`)}
                      </p>
                      <p className="text-sm text-future-dusk-500">
                        {t(`relatedLinks.${link.key}.description`)}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
