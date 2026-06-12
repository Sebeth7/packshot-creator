import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Metadata } from 'next';
import {
  Users, Building2, ArrowRight, Check, Clock,
  Shield, TrendingUp, ChevronDown, Calendar,
  Zap, Eye, Lock, BarChart3, Layers, Calculator,
} from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { Button } from '@/components/ui/button';

/* ──────── Metadata ──────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogPrestataire.meta' });
  const slug = 'prestataire-packshot-vs-studio-interne';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
      languages: {
        fr: `/fr/blog/${slug}`,
        en: `/en/blog/${slug}`,
        'x-default': `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      publishedTime: '2026-03-22',
      authors: ['PackshotCreator'],
      images: [{ url: `/api/og?title=${encodeURIComponent(t('title'))}&type=blog&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('ogDescription') },
  };
}

/* ──────── Page ──────── */

export default async function PrestataireVsStudioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blogPrestataire' });
  const slug = 'prestataire-packshot-vs-studio-interne';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: t('hero.title'), url: `https://www.packshot-creator.com/${lang}/blog/${slug}` },
  ];

  const faqItems = [
    { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
    { question: t('faq.q4.question'), answer: t('faq.q4.answer') },
    { question: t('faq.q5.question'), answer: t('faq.q5.answer') },
  ];

  const trapIcons = [
    <Clock key="t1" className="h-6 w-6" />,
    <Eye key="t2" className="h-6 w-6" />,
    <Lock key="t3" className="h-6 w-6" />,
    <TrendingUp key="t4" className="h-6 w-6" />,
  ];

  const gainIcons = [
    <Shield key="g1" className="h-6 w-6" />,
    <Zap key="g2" className="h-6 w-6" />,
    <Check key="g3" className="h-6 w-6" />,
    <Lock key="g4" className="h-6 w-6" />,
    <BarChart3 key="g5" className="h-6 w-6" />,
    <Layers key="g6" className="h-6 w-6" />,
  ];

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        compact
        align="left"
        badge={{ label: t('hero.badge') }}
        title={
          <>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-sans font-normal text-future-dusk-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {t('breadcrumbHome')}
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                {t('breadcrumbBlog')}
              </Link>
              <span>/</span>
              <span className="text-very-peri-300">{t('category')}</span>
            </div>
            {t('hero.title')}
          </>
        }
        subtitle={t('hero.subtitle')}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-200 mt-2">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime="2026-03-22">
              {new Date('2026-03-22').toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {t('readingTime', { minutes: 7 })}
          </span>
        </div>
      </HeroSection>

      {/* ── Intro ── */}
      <FadeInView>
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-6">
              {t('intro.heading')}
            </TextReveal>
            <div className="space-y-4 text-future-dusk-600 leading-relaxed text-lg">
              <p>{t('intro.p1')}</p>
              <p>{t('intro.p2')}</p>
              <p className="font-medium text-future-dusk-800">{t('intro.p3')}</p>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* ── Two-column : Prestataire vs Studio ── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Colonne Prestataire */}
            <ScrollReveal>
              <SpringCard className="rounded-2xl border border-neutral-100 bg-white p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
                    <Users className="h-7 w-7" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-future-dusk-900">
                    {t('whenOutsource.heading')}
                  </h2>
                </div>
                <div className="space-y-4 text-future-dusk-600 leading-relaxed">
                  <p>{t('whenOutsource.p1')}</p>
                  <p>{t('whenOutsource.p2')}</p>
                  <p>{t('whenOutsource.p3')}</p>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-sm font-medium text-amber-800 mb-2">{lang === 'fr' ? 'Tarifs indicatifs' : 'Indicative pricing'}</p>
                  <ul className="space-y-1 text-sm text-amber-700">
                    <li>{t('whenOutsource.prices.standard')}</li>
                    <li>{t('whenOutsource.prices.forfait')}</li>
                    <li>{t('whenOutsource.prices.volume')}</li>
                  </ul>
                </div>
              </SpringCard>
            </ScrollReveal>

            {/* Colonne Studio interne */}
            <ScrollReveal>
              <SpringCard className="rounded-2xl border border-very-peri-200 bg-white p-8 h-full ring-1 ring-very-peri-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-very-peri-100 text-very-peri-700">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-future-dusk-900">
                    {t('whenInternalize.heading')}
                  </h2>
                </div>
                <div className="space-y-4 text-future-dusk-600 leading-relaxed">
                  <p>{t('whenInternalize.p1')}</p>
                  <p>{t('whenInternalize.p2')}</p>
                  <ul className="space-y-2 ml-1">
                    {(['r1', 'r2', 'r3', 'r4'] as const).map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-very-peri-500 mt-0.5 shrink-0" />
                        <span>{t(`whenInternalize.reasons.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-future-dusk-800">{t('whenInternalize.p3')}</p>
                </div>
              </SpringCard>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Cost Comparison Table ── */}
      <FadeInView>
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <TextReveal as="h2" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('costComparison.heading')}
              </TextReveal>
              <p className="text-future-dusk-600 max-w-2xl mx-auto">
                {t('costComparison.description')}
              </p>
            </div>

            <SpringCard className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-future-dusk-900 text-white">
                      <th className="px-4 py-4 text-left font-semibold">{t('costComparison.headerScenario')}</th>
                      <th className="px-4 py-4 text-center font-semibold">{t('costComparison.headerPhotos')}</th>
                      <th className="px-4 py-4 text-center font-semibold">
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {t('costComparison.headerPrestataire')}
                        </span>
                      </th>
                      <th className="px-4 py-4 text-center font-semibold">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-4 w-4" />
                          {t('costComparison.headerStudio')}
                        </span>
                      </th>
                      <th className="px-4 py-4 text-center font-semibold text-emerald-300">{t('costComparison.headerEconomie')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {(['scenario1', 'scenario2', 'scenario3'] as const).map((key, idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="px-4 py-4 font-medium text-future-dusk-900">{t(`costComparison.${key}.label`)}</td>
                        <td className="px-4 py-4 text-center text-future-dusk-600">{t(`costComparison.${key}.photos`)}</td>
                        <td className="px-4 py-4 text-center text-red-600 font-medium">{t(`costComparison.${key}.prestataire`)}</td>
                        <td className="px-4 py-4 text-center text-very-peri-700 font-medium">{t(`costComparison.${key}.studio`)}</td>
                        <td className="px-4 py-4 text-center text-emerald-600 font-bold">{t(`costComparison.${key}.economie`)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100">
                <p className="text-xs text-future-dusk-400">{t('costComparison.footnote')}</p>
              </div>
            </SpringCard>
          </div>
        </section>
      </FadeInView>

      {/* ── Traps / Pitfalls of outsourcing ── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('trapsPrestataire.heading')}
            </TextReveal>
            <p className="text-future-dusk-600 max-w-2xl mx-auto">
              {t('trapsPrestataire.p1')}
            </p>
          </div>

          <StaggerContainer stagger={0.1} className="grid sm:grid-cols-2 gap-6">
            {(['t1', 't2', 't3', 't4'] as const).map((key, idx) => (
              <StaggerItem key={key}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-red-50 text-red-500 shrink-0">
                      {trapIcons[idx]}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-future-dusk-900 mb-2">
                        {t(`trapsPrestataire.traps.${key}.title`)}
                      </h3>
                      <p className="text-future-dusk-600 text-sm leading-relaxed">
                        {t(`trapsPrestataire.traps.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Gains of internalizing ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('gainsInternal.heading')}
            </TextReveal>
            <p className="text-future-dusk-600 max-w-2xl mx-auto">
              {t('gainsInternal.p1')}
            </p>
          </div>

          <StaggerContainer stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['g1', 'g2', 'g3', 'g4', 'g5', 'g6'] as const).map((key, idx) => (
              <StaggerItem key={key}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 h-full hover:border-very-peri-200 hover:shadow-md transition-all duration-300">
                  <div className="p-2.5 rounded-lg bg-very-peri-50 text-very-peri-600 inline-flex mb-4">
                    {gainIcons[idx]}
                  </div>
                  <h3 className="font-heading font-bold text-future-dusk-900 mb-2">
                    {t(`gainsInternal.gains.${key}.title`)}
                  </h3>
                  <p className="text-future-dusk-600 text-sm leading-relaxed">
                    {t(`gainsInternal.gains.${key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FadeInView>
        <section className="py-20 bg-neutral-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-8 text-center">
              {t('faq.heading')}
            </TextReveal>

            <div className="space-y-3">
              {faqItems.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-neutral-50 transition-colors">
                    <span className="font-heading font-semibold text-future-dusk-900 text-left">
                      {item.question}
                    </span>
                    <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-future-dusk-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* ── CTA ── */}
      <FadeInView>
        <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-lg text-very-peri-100 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
                <Link href="/studios-photo-automatises#roi">
                  <Calculator className="mr-2 h-4 w-4" />
                  {t('cta.btnRoi')}
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
                <Link href="/contact">
                  {t('cta.btnContact')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* ── Related Links ── */}
      <FadeInView>
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-8 text-center">
              {t('relatedLinks.heading')}
            </h2>

            <StaggerContainer stagger={0.1} className="grid sm:grid-cols-3 gap-6">
              <StaggerItem>
                <Link
                  href="/studios-photo-automatises"
                  className="group block rounded-2xl border border-neutral-100 bg-white p-6 h-full hover:border-very-peri-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors mb-2">
                    {t('relatedLinks.studios.title')}
                  </h3>
                  <p className="text-future-dusk-600 text-sm mb-4">
                    {t('relatedLinks.studios.description')}
                  </p>
                  <span className="text-very-peri-600 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {lang === 'fr' ? 'Voir la gamme' : 'View the range'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>

              <StaggerItem>
                <Link
                  href="/industrie"
                  className="group block rounded-2xl border border-neutral-100 bg-white p-6 h-full hover:border-very-peri-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors mb-2">
                    {t('relatedLinks.industrie.title')}
                  </h3>
                  <p className="text-future-dusk-600 text-sm mb-4">
                    {t('relatedLinks.industrie.description')}
                  </p>
                  <span className="text-very-peri-600 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {lang === 'fr' ? 'En savoir plus' : 'Learn more'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>

              <StaggerItem>
                <Link
                  href="/contact"
                  className="group block rounded-2xl border border-neutral-100 bg-white p-6 h-full hover:border-very-peri-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors mb-2">
                    {t('relatedLinks.contact.title')}
                  </h3>
                  <p className="text-future-dusk-600 text-sm mb-4">
                    {t('relatedLinks.contact.description')}
                  </p>
                  <span className="text-very-peri-600 font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    {lang === 'fr' ? 'Nous contacter' : 'Get in touch'}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </FadeInView>

      {/* ── Schema.org ── */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: t('hero.title'),
          description: t('meta.description'),
          url: `https://www.packshot-creator.com/${lang}/blog/${slug}`,
          datePublished: '2026-03-22',
          author: 'PackshotCreator',
          category: t('category'),
        }),
        faqSchema(faqItems),
      ]} />
    </>
  );
}
