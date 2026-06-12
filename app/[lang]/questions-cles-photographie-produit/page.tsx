import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, ScrollReveal, TextReveal, SpringCard } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import {
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Lightbulb,
  Target,
  TrendingUp,
  ImageIcon,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'questionsCles' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/questions-cles-photographie-produit`,
      languages: {
        fr: '/fr/questions-cles-photographie-produit',
        en: '/en/questions-cles-photographie-produit',
        'x-default': '/fr/questions-cles-photographie-produit',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

const CATEGORY_ICONS = [Lightbulb, Target, TrendingUp];

export default async function QuestionsClesPhotographieProduitPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'questionsCles' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('hero.title').split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/questions-cles-photographie-produit` },
  ];

  const faqs = (['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'] as const).map((key) => ({
    question: t(`questions.${key}.question`),
    answer: t(`questions.${key}.answer`),
  }));

  return (
    <>
      {/* Hero */}
      <HeroSection
        badge={{
          icon: <HelpCircle className="h-4 w-4" />,
          label: isFr ? 'Guide expert' : 'Expert guide',
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.cta'), href: '/contact', variant: 'primary' },
          { label: isFr ? 'Voir les studios' : 'View studios', href: '/studios-photo-automatises', variant: 'secondary' },
        ]}
      />

      {/* Categories / Pillars */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('categories.label')}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
              {t('categories.heading')}
            </TextReveal>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => {
              const Icon = CATEGORY_ICONS[i - 1];
              return (
                <StaggerItem key={i}>
                  <FadeInView direction="up" delay={i * 0.15}>
                    <div className="rounded-2xl border border-neutral-100 bg-white p-8 text-center hover:shadow-lg transition-shadow h-full">
                      <span className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">
                        {t(`categories.cat${i}.title`)}
                      </h3>
                      <p className="text-neutral-medium leading-relaxed">
                        {t.rich(`categories.cat${i}.description`, {
                          bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
                        })}
                      </p>
                    </div>
                  </FadeInView>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Questions & Answers — Split sticky layout */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FadeInView direction="left">
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                  {t('questions.label')}
                </span>
                <h2 className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
                  {t('questions.heading')}
                </h2>
                <p className="mt-6 text-neutral-medium leading-relaxed">
                  {isFr
                    ? 'Les reponses a toutes vos questions pour faire le bon choix.'
                    : 'Answers to all your questions to make the right choice.'}
                </p>
                <div className="mt-8">
                  <Button asChild className="bg-primary-orbitvu hover:bg-very-peri-600 text-white rounded-xl px-6 h-12">
                    <Link href="/besoins-photographie-produit">
                      {isFr ? 'Identifier mon besoin' : 'Identify my need'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeInView>
            </div>
            <div className="lg:col-span-3">
              <StaggerContainer className="space-y-4">
                {faqs.map((faq, index) => (
                  <StaggerItem key={index}>
                    <FadeInView direction="right" delay={index * 0.08}>
                      <details className="group bg-white rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors" open={index === 0}>
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
