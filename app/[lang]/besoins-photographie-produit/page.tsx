import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, ScrollReveal, TextReveal, SpringCard } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import {
  Search,
  Camera,
  Box,
  RotateCw,
  Sparkles,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ImageIcon,
} from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Segment de-ch localisé (Suisse alémanique) — voir i18n/routing.ts pathnames.
const DE_CH_PATH = '/de-ch/produktfotografie-bedarf';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'besoinsPhoto' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical:
        lang === 'de-ch'
          ? `https://www.packshot-creator.com${DE_CH_PATH}`
          : `https://www.packshot-creator.com/${lang}/besoins-photographie-produit`,
      languages: buildLanguages('/fr/besoins-photographie-produit', { en: '/en/besoins-photographie-produit', deCh: DE_CH_PATH }),
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
      <HeroSection
        badge={{
          icon: <Search className="h-4 w-4" />,
          label: isFr ? 'Guide solution' : 'Solution guide',
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.cta'), href: '/contact', variant: 'primary' },
          { label: isFr ? 'Voir les studios' : 'View studios', href: '/studios-photo-automatises', variant: 'secondary' },
        ]}
      />

      {/* Needs / Use Cases */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('needs.label')}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
              {t('needs.heading')}
            </TextReveal>
            <p className="mt-6 text-lg text-neutral-medium leading-relaxed max-w-2xl mx-auto">
              {t.rich('needs.subtitle', {
                bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
              })}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => {
              const Icon = NEED_ICONS[i - 1];
              const direction = i % 2 === 0 ? 'right' : 'left';
              return (
                <StaggerItem key={i}>
                  <FadeInView direction={direction as 'left' | 'right'} delay={i * 0.1}>
                    <div className="rounded-2xl border border-neutral-100 bg-white p-8 hover:shadow-lg transition-shadow h-full">
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="text-xl font-heading font-bold text-heading-dark mb-2">
                        {t(`needs.item${i}.title`)}
                      </h3>
                      <p className="text-neutral-medium leading-relaxed mb-4">
                        {t(`needs.item${i}.description`)}
                      </p>
                      <ul className="space-y-2">
                        {[1, 2, 3].map((j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-neutral-medium">{t(`needs.item${i}.point${j}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeInView>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution Path — Ghost numbers layout */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('solution.label')}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
              {t('solution.heading')}
            </TextReveal>
          </FadeInView>
          <div className="max-w-4xl mx-auto space-y-12">
            {[1, 2, 3].map((i) => (
              <FadeInView key={i} direction={i % 2 === 0 ? 'right' : 'left'} delay={i * 0.15}>
                <div className="flex items-start gap-6 lg:gap-10">
                  <span className="text-5xl lg:text-7xl font-heading font-bold text-neutral-100 shrink-0 leading-none select-none">
                    {String(i).padStart(2, '0')}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-xl lg:text-2xl font-heading font-bold text-heading-dark mb-3">
                      {t(`solution.step${i}.title`)}
                    </h3>
                    <p className="text-lg text-neutral-medium leading-relaxed">
                      {t.rich(`solution.step${i}.description`, {
                        bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
                      })}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 lg:py-32 bg-very-peri-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('sectors.label')}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
              {t('sectors.heading')}
            </TextReveal>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <StaggerItem key={i}>
                <Link
                  href={t(`sectors.item${i}.href`) as '/industrie'}
                  className="group flex items-center gap-3 bg-white rounded-xl p-4 border border-neutral-100 hover:border-very-peri-300 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-heading-dark group-hover:text-very-peri-600 transition-colors">
                    {t(`sectors.item${i}.name`)}
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-medium ml-auto" />
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

      {/* FAQ — Split sticky layout */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FadeInView direction="left">
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                  {t('faq.label')}
                </span>
                <h2 className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
                  {t('faq.heading')}
                </h2>
                <p className="mt-6 text-neutral-medium leading-relaxed">
                  {isFr
                    ? 'Vous avez d\'autres questions ? Contactez nos experts pour un diagnostic gratuit.'
                    : 'Have more questions? Contact our experts for a free diagnostic.'}
                </p>
                <div className="mt-8">
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/questions-cles-photographie-produit">
                      {isFr ? 'Les 9 questions cles' : 'The 9 key questions'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeInView>
            </div>
            <div className="lg:col-span-3">
              <StaggerContainer className="space-y-4">
                {faqs.map((faq, index) => (
                  <StaggerItem key={index}>
                    <FadeInView direction="right" delay={index * 0.1}>
                      <details className="group bg-white rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors">
                        <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <h3 className="text-base font-semibold text-heading-dark text-left">
                            {faq.question}
                          </h3>
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
          </div>
        </div>
      </section>

      {/* CTA Final — ADN pattern: bg-black + 2 distinct cards */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold leading-[1.1]">
                {t('finalCta.heading')}
              </TextReveal>
              <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {t('finalCta.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-8 lg:p-14 h-full flex flex-col">
                <div className="w-full rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/images/illustrations/cta-packshot-result.avif"
                    alt="Résultat packshot professionnel"
                    width={500}
                    height={375}
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4">{t('finalCta.card1.heading')}</h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">{t('finalCta.card1.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href="/contact">{t('finalCta.ctaPrimary')}</Link>
                </Button>
              </div>
            </SpringCard>
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.card2.heading')}</h3>
                <p className="text-neutral-400 mb-8 leading-relaxed flex-1">{t('finalCta.card2.description')}</p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/calculateur-roi">{t('finalCta.ctaSecondary')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
