import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
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
  Database,
} from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Segment de-ch localisé (Suisse alémanique) — voir i18n/routing.ts pathnames.
const DE_CH_PATH = '/de-ch/wichtige-fragen-produktfotografie';
const SITE_URL = 'https://www.packshot-creator.com';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'questionsCles' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical:
        lang === 'de-ch'
          ? `${SITE_URL}${DE_CH_PATH}`
          : `${SITE_URL}/${lang}/questions-cles-photographie-produit`,
      languages: buildLanguages('/fr/questions-cles-photographie-produit', { en: '/en/questions-cles-photographie-produit', deCh: DE_CH_PATH }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

const AXIS_ICONS = [Lightbulb, Target, TrendingUp, Database];
const QUESTION_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'] as const;
const SIZE_ROWS = ['row1', 'row2', 'row3', 'row4'] as const;
const WHEN_NOT = ['n1', 'n2', 'n3'] as const;
const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default async function QuestionsClesPhotographieProduitPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'questionsCles' });
  const isFr = lang === 'fr';

  const pagePath =
    lang === 'de-ch' ? DE_CH_PATH : `/${lang}/questions-cles-photographie-produit`;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `${SITE_URL}/${lang === 'de-ch' ? 'de-ch' : lang}` },
    { name: t('hero.title'), url: `${SITE_URL}${pagePath}` },
  ];

  const methodQuestions = QUESTION_KEYS.map((key) => ({
    question: t(`questions.${key}.question`),
    answer: t(`questions.${key}.answer`),
  }));

  const faqs = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.question`),
    answer: t(`faq.${key}.answer`),
  }));

  return (
    <>
      {/* Hero */}
      <HeroSection
        badge={{
          icon: <HelpCircle className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.cta'), href: '/contact', variant: 'primary' },
          { label: isFr ? 'Calculer mon ROI' : lang === 'de-ch' ? 'ROI berechnen' : 'Calculate my ROI', href: '/calculateur-roi', variant: 'secondary' },
        ]}
      />

      {/* Réponse directe */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <p className="text-lg text-heading-dark leading-relaxed font-medium">{t('answer.p1')}</p>
            <p className="mt-4 text-neutral-medium leading-relaxed">{t('answer.p2')}</p>
          </FadeInView>
        </div>
      </section>

      {/* 4 axes */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('axes.label')}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1]">
              {t('axes.heading')}
            </TextReveal>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => {
              const Icon = AXIS_ICONS[i - 1];
              return (
                <StaggerItem key={i}>
                  <FadeInView direction="up" delay={i * 0.1}>
                    <div className="rounded-2xl border border-neutral-100 bg-white p-8 text-center hover:shadow-lg transition-shadow h-full">
                      <span className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">
                        {t(`axes.cat${i}.title`)}
                      </h3>
                      <p className="text-neutral-medium leading-relaxed">
                        {t.rich(`axes.cat${i}.description`, {
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

      {/* Les 12 questions — contenu intégralement visible (citabilité) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('questions.label')}
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight mb-12">
              {t('questions.heading')}
            </h2>
          </FadeInView>
          <div className="space-y-10">
            {methodQuestions.map((q, index) => (
              <FadeInView key={index} direction="up" delay={Math.min(index * 0.04, 0.3)}>
                <div className="border-l-2 border-very-peri-200 pl-6">
                  <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">
                    {index + 1}. {q.question}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed">{q.answer}</p>
                </div>
              </FadeInView>
            ))}
          </div>
          {/* Référentiel prix : FR/EN uniquement (pas de version de-ch) */}
          {lang !== 'de-ch' && (
            <FadeInView delay={0.1}>
              <p className="mt-12 text-neutral-medium leading-relaxed">
                {isFr
                  ? 'Les fourchettes de marché complètes (par type de visuel et par secteur, sources citées) sont publiées dans notre '
                  : 'The full market ranges (by visual type and industry, with sources) are published in our '}
                <Link href="/prix-packshot-photo-produit" className="text-primary-orbitvu font-medium hover:underline">
                  {isFr ? 'référentiel des prix du packshot 2026' : '2026 packshot price benchmark'}
                </Link>
                .
              </p>
            </FadeInView>
          )}
        </div>
      </section>

      {/* Tailles → gammes */}
      <section className="py-16 lg:py-24 bg-future-dusk-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('sizes.heading')}
            </h2>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-3xl">{t('sizes.intro')}</p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-100 bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-100 bg-future-dusk-0/60">
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('sizes.table.h1')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('sizes.table.h2')}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold text-heading-dark">{t('sizes.table.h3')}</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map((row) => (
                    <tr key={row} className="border-b border-neutral-100 last:border-0 align-top">
                      <td className="px-6 py-4 font-medium text-heading-dark whitespace-nowrap">{t(`sizes.table.${row}.size`)}</td>
                      <td className="px-6 py-4 text-neutral-medium">{t(`sizes.table.${row}.examples`)}</td>
                      <td className="px-6 py-4 text-neutral-dark">{t(`sizes.table.${row}.range`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
          <FadeInView delay={0.15}>
            <p className="mt-6 text-neutral-medium leading-relaxed">{t('sizes.note')}</p>
            <div className="mt-6">
              <Button asChild className="bg-primary-orbitvu hover:bg-very-peri-600 text-white rounded-xl px-6 h-12">
                <Link href="/studio-photo/selecteur-machines">
                  {isFr ? 'Ouvrir le sélecteur de machines' : lang === 'de-ch' ? 'Maschinen-Finder öffnen' : 'Open the machine selector'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Quand ne pas investir */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <TextReveal as="h2" className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
              {t('whenNot.heading')}
            </TextReveal>
            <p className="mt-4 text-neutral-medium leading-relaxed max-w-2xl mx-auto">{t('whenNot.intro')}</p>
          </FadeInView>
          <StaggerContainer className="grid lg:grid-cols-3 gap-6">
            {WHEN_NOT.map((key, i) => (
              <StaggerItem key={key}>
                <FadeInView direction="up" delay={i * 0.1}>
                  <div className="rounded-2xl border border-neutral-100 bg-future-dusk-0/40 p-8 h-full">
                    <h3 className="text-lg font-heading font-bold text-heading-dark mb-3">{t(`whenNot.${key}.title`)}</h3>
                    <p className="text-neutral-medium leading-relaxed">{t(`whenNot.${key}.description`)}</p>
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
        </div>
      </section>

      {/* CTA Final */}
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

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema([...methodQuestions, ...faqs])]} />
    </>
  );
}
