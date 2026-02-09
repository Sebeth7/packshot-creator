import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import {
  TECHNOLOGIES,
  PAIN_POINTS,
  SEGMENTS,
  USE_CASES,
  RECOMMENDED_MACHINE_IDS,
  NORMS,
} from '@/data/industrie-defense';
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'industrieDefense' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-defense`,
      languages: {
        fr: '/fr/industrie-defense',
        en: '/en/industrie-defense',
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/industrie-defense`,
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function IndustrieDefensePage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'industrieDefense' });

  const machines = RECOMMENDED_MACHINE_IDS.map(getMachineById).filter(Boolean);
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: t('hero.title').split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/industrie-defense` },
  ];

  const faqs = Array.from({ length: 7 }, (_, i) => ({
    question: t(`faq.q${i + 1}.question`),
    answer: t(`faq.q${i + 1}.answer`),
  }));

  return (
    <>
      {/* ===== 1. Hero Premium ===== */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <FadeInView className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-very-peri-200 mb-6">
              <ShieldCheck className="h-4 w-4" />
              {isFr ? 'Industrie & Defense' : 'Industry & Defense'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-very-peri-200 font-medium mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                <Link href="/contact?subject=industrie">{t('hero.ctaPrimary')}</Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
                <a href="#technologies">
                  {t('hero.ctaSecondary')} <ChevronDown className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ===== 2. Points de douleur ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('painPoints.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('painPoints.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {PAIN_POINTS.map((pain, i) => {
              const Icon = pain.icon;
              return (
                <StaggerItem key={i}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-8 hover:shadow-lg transition-shadow h-full">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-red-50 text-red-500 mb-4">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                      {t(`painPoints.${pain.titleKey}`)}
                    </h3>
                    <p className="text-future-dusk-600 leading-relaxed">
                      {t(`painPoints.${pain.descKey}`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== 3. Technologies Orbitvu ===== */}
      <section id="technologies" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('technologies.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('technologies.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNOLOGIES.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <StaggerItem key={i}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center hover:shadow-lg transition-shadow h-full">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-base font-heading font-bold text-future-dusk-900 mb-1">
                      {t(`technologies.${tech.nameKey}`)}
                    </h3>
                    <p className="text-sm text-future-dusk-600 leading-relaxed">
                      {t(`technologies.${tech.descKey}`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== 4. Segments industriels ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('segments.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('segments.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SEGMENTS.map((seg, i) => {
              const Icon = seg.icon;
              return (
                <StaggerItem key={i}>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-8 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                        {t(`segments.${seg.nameKey}`)}
                      </h3>
                    </div>
                    <p className="text-xs font-medium text-very-peri-600 bg-very-peri-50 rounded-lg px-3 py-1.5 mb-3 inline-block w-fit">
                      {t(`segments.${seg.normsKey}`)}
                    </p>
                    <p className="text-sm text-future-dusk-600 leading-relaxed mb-4 flex-grow">
                      {t(`segments.${seg.useCaseKey}`)}
                    </p>
                    <p className="text-sm font-semibold text-future-dusk-900 border-t border-neutral-100 pt-4">
                      {t(`segments.${seg.argumentKey}`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== 5. Chiffres cles ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('stats.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
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

      {/* ===== 6. Cas d'usage ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('useCases.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('useCases.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {USE_CASES.map((uc, i) => (
              <StaggerItem key={i}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-3">
                    {t(`useCases.${uc.titleKey}`)}
                  </h3>
                  <p className="text-future-dusk-600 leading-relaxed mb-4">
                    {t(`useCases.${uc.descKey}`)}
                  </p>
                  <p className="text-xs font-medium text-very-peri-600 bg-very-peri-50 rounded-lg px-3 py-1.5 mb-3 inline-block">
                    {t(`useCases.${uc.techsKey}`)}
                  </p>
                  <p className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    {t(`useCases.${uc.resultKey}`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== 7. Machines recommandees ===== */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('machines.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('machines.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {machines.map((machine) => {
              if (!machine) return null;
              const langKey = isFr ? 'fr' : 'en';
              return (
                <StaggerItem key={machine.id}>
                  <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="h-2 bg-very-peri-500" />
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">
                        {machine.nom}
                      </h3>
                      <p className="text-sm text-future-dusk-500 mb-4">
                        {isFr ? `Jusqu'à ${machine.tailleMax}` : `Up to ${machine.tailleMax}`} &middot; {machine.capaciteJour} {isFr ? 'photos/jour' : 'photos/day'}
                      </p>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {machine.keyAdvantages.slice(0, 3).map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-future-dusk-600">{adv[langKey]}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="rounded-xl w-full">
                        <Link href="/contact?subject=industrie">
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

      {/* ===== 8. Conformite & Normes ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('compliance.heading')}
            </h2>
            <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
              {t('compliance.subtitle')}
            </p>
          </FadeInView>
          <FadeInView>
            <div className="rounded-2xl border border-neutral-100 bg-white p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {NORMS.map((norm) => (
                  <span
                    key={norm}
                    className="inline-flex items-center gap-2 bg-very-peri-50 text-very-peri-700 font-semibold rounded-full px-5 py-2 text-sm"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {norm}
                  </span>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-future-dusk-600">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p>{t('compliance.point1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p>{t('compliance.point2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p>{t('compliance.point3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p>{t('compliance.point4')}</p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ===== 9. FAQ ===== */}
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

      {/* ===== 10. CTA Final Premium ===== */}
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
              <Link href="/contact?subject=industrie">
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
