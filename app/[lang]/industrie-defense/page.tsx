import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { HeroSection } from '@/components/hero';
import { getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import { getMachineImage } from '@/lib/machine-images';
import {
  TECHNOLOGIES,
  PAIN_POINTS,
  SEGMENTS,
  USE_CASES,
  RECOMMENDED_MACHINE_IDS,
  NORMS,
} from '@/data/industrie-defense';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

const CLIENT_LOGOS = [
  { name: 'Chanel', src: '/images/logos/client-chanel.avif', w: 225, h: 225 },
  { name: 'Amazon', src: '/images/logos/client-amazon.avif', w: 409, h: 123 },
  { name: 'Safran', src: '/images/logos/client-safran.avif', w: 994, h: 228 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.avif', w: 600, h: 66 },
  { name: 'Valentino', src: '/images/logos/client-valentino.avif', w: 320, h: 157 },
  { name: 'Sandro', src: '/images/logos/client-sandro.avif', w: 390, h: 100 },
  { name: 'Seiko', src: '/images/logos/client-seiko.avif', w: 508, h: 99 },
  { name: 'Lidl', src: '/images/logos/client-lidl.avif', w: 177, h: 168 },
  { name: 'Würth', src: '/images/logos/client-wurth.avif', w: 485, h: 104 },
];

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
      languages: buildLanguages('/fr/industrie-defense', { en: '/en/industrie-defense' }),
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

function parseStatValue(value: string): { end: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^0-9]*?)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], end: parseInt(match[2], 10), suffix: match[3] };
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
      <HeroSection
        layout="split"
        badge={{
          icon: <ShieldCheck className="h-4 w-4" />,
          label: isFr ? 'Industrie & Defense' : 'Industry & Defense',
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.ctaPrimary'), href: '/contact?subject=industrie', variant: 'primary' },
        ]}
        media={
          <Image
            src="/images/hero/hero-industrie-defense.avif"
            alt={isFr ? 'Solutions photo pour l\'industrie et la défense' : 'Photo solutions for industry and defense'}
            width={640}
            height={480}
            className="rounded-2xl shadow-2xl"
            priority
          />
        }
      >
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
            <a href="#technologies">
              {t('hero.ctaSecondary')} <ChevronDown className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </HeroSection>

      {/* ===== 1b. Logo bar — Trust strip ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-6">
              {isFr ? 'Ils nous font confiance' : 'They trust us'}
            </p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex items-center gap-x-10 sm:gap-x-14 animate-marquee w-max">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                  <div key={`${logo.name}-${i}`} className="w-[90px] h-[34px] sm:w-[120px] sm:h-[40px] flex-shrink-0 flex items-center justify-center opacity-60">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.w}
                      height={logo.h}
                      sizes="120px"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ===== 2. Pain Points — Split 4/8 sticky heading ===== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Le constat' : 'The challenge'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {t('painPoints.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 leading-relaxed">
                {t('painPoints.subtitle')}
              </p>
            </ScrollReveal>

            <div className="lg:col-span-8 space-y-6">
              {PAIN_POINTS.map((pain, i) => {
                const Icon = pain.icon;
                return (
                  <ScrollReveal key={i} offset={40}>
                    <SpringCard>
                      <div className="rounded-2xl border border-neutral-100 bg-white p-6 lg:p-8 hover:border-very-peri-200 transition-colors duration-300 flex items-start gap-5">
                        <span className="text-4xl lg:text-6xl font-heading font-bold text-neutral-100 select-none leading-none shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-red-50 text-red-500 mb-3">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                            {t(`painPoints.${pain.titleKey}`)}
                          </h3>
                          <p className="text-future-dusk-600 leading-relaxed">
                            {t(`painPoints.${pain.descKey}`)}
                          </p>
                        </div>
                      </div>
                    </SpringCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Technologies Orbitvu — Grid 4 cols + SpringCard ===== */}
      <section id="technologies" className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Technologie Orbitvu' : 'Orbitvu Technology'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('technologies.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
                {t('technologies.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNOLOGIES.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <ScrollReveal key={i} offset={20}>
                  <SpringCard className="h-full">
                    <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-center hover:shadow-lg transition-shadow h-full hover:border-very-peri-200 transition-colors duration-300">
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
                  </SpringCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. Segments Industriels — Bento grid ===== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Secteurs' : 'Sectors'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('segments.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
                {t('segments.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Bento: hero segment (aero) large left + 5 compact right */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Hero segment — Aeronautique */}
            <ScrollReveal offset={30}>
              <SpringCard className="h-full">
                {(() => {
                  const seg = SEGMENTS[0];
                  const Icon = seg.icon;
                  return (
                    <div className="bg-gradient-to-br from-future-dusk-900 to-very-peri-900 rounded-2xl p-8 lg:p-10 text-white h-full flex flex-col">
                      <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 text-very-peri-300 mb-6">
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-3">
                        {t(`segments.${seg.nameKey}`)}
                      </h3>
                      <p className="text-xs font-medium text-very-peri-300 bg-white/10 rounded-lg px-3 py-1.5 mb-4 inline-block w-fit">
                        {t(`segments.${seg.normsKey}`)}
                      </p>
                      <p className="text-future-dusk-200 leading-relaxed mb-6 flex-grow text-lg">
                        {t(`segments.${seg.useCaseKey}`)}
                      </p>
                      <p className="text-sm font-semibold text-very-peri-300 border-t border-white/10 pt-4">
                        {t(`segments.${seg.argumentKey}`)}
                      </p>
                    </div>
                  );
                })()}
              </SpringCard>
            </ScrollReveal>

            {/* 5 compact segments stacked */}
            <div className="space-y-4">
              {SEGMENTS.slice(1).map((seg, i) => {
                const Icon = seg.icon;
                return (
                  <ScrollReveal key={i} offset={20}>
                    <SpringCard hoverY={-3} hoverScale={1.005}>
                      <div className="rounded-2xl border border-neutral-100 bg-white p-5 hover:border-very-peri-200 transition-colors duration-300 hover:shadow-lg">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 shrink-0">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-base font-heading font-bold text-future-dusk-900">
                                {t(`segments.${seg.nameKey}`)}
                              </h3>
                              <span className="text-xs font-medium text-very-peri-600 bg-very-peri-50 rounded-lg px-2 py-0.5 shrink-0">
                                {t(`segments.${seg.normsKey}`)}
                              </span>
                            </div>
                            <p className="text-sm text-future-dusk-600 leading-relaxed mb-2">
                              {t(`segments.${seg.useCaseKey}`)}
                            </p>
                            <p className="text-xs font-semibold text-future-dusk-900">
                              {t(`segments.${seg.argumentKey}`)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SpringCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. Chiffres cles — Dark stat ribbon ===== */}
      <section className="py-16 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <FadeInView className="text-center mb-12">
            <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
              {isFr ? 'Chiffres clés' : 'Key figures'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              {t('stats.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-white/10">
            {[1, 2, 3, 4].map((i) => {
              const rawValue = t(`stats.stat${i}.value`);
              const parsed = parseStatValue(rawValue);
              return (
                <StaggerItem key={i}>
                  <div className="text-center px-4 sm:px-6 lg:px-8">
                    <p className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                      {parsed ? (
                        <AnimatedCounter
                          end={parsed.end}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                          duration={2.5}
                        />
                      ) : rawValue}
                    </p>
                    <p className="mt-2 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                      {t(`stats.stat${i}.label`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== 6. Cas d'usage — Timeline editorial ===== */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Applications' : 'Applications'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('useCases.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
                {t('useCases.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8 max-w-4xl mx-auto">
            {USE_CASES.map((uc, i) => (
              <ScrollReveal key={i} offset={40}>
                <SpringCard>
                  <div className="relative grid md:grid-cols-12 gap-6 items-start">
                    {/* Giant number */}
                    <div className="md:col-span-2 flex md:justify-end">
                      <span className="text-6xl lg:text-8xl font-heading font-bold text-neutral-100 select-none leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Separator line on desktop */}
                    <div className="hidden md:block md:col-span-1 relative">
                      <div className="absolute top-4 bottom-0 left-1/2 w-px bg-very-peri-200" />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-very-peri-500" />
                    </div>
                    {/* Content */}
                    <div className="md:col-span-9 bg-neutral-50 rounded-2xl p-6 lg:p-8 border border-neutral-100 hover:border-very-peri-200 transition-colors">
                      {/* Use case illustration for FAI (index 0) and MRO (index 3) */}
                      {i === 0 && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <Image
                            src="/images/illustrations/usecase-fai-inspection.avif"
                            alt={t(`useCases.${uc.titleKey}`)}
                            width={600}
                            height={300}
                            className="w-full h-auto rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {i === 3 && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <Image
                            src="/images/illustrations/usecase-mro-before-after.avif"
                            alt={t(`useCases.${uc.titleKey}`)}
                            width={600}
                            height={300}
                            className="w-full h-auto rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                        {t(`useCases.${uc.titleKey}`)}
                      </h3>
                      <p className="text-future-dusk-600 leading-relaxed mb-4">
                        {t(`useCases.${uc.descKey}`)}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-medium text-very-peri-600 bg-very-peri-50 rounded-lg px-3 py-1.5">
                          {t(`useCases.${uc.techsKey}`)}
                        </span>
                        <span className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 shrink-0" />
                          {t(`useCases.${uc.resultKey}`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </SpringCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Machines recommandees — ScrollReveal + SpringCard ===== */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Equipement' : 'Equipment'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('machines.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
                {t('machines.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {machines.map((machine, idx) => {
              if (!machine) return null;
              const langKey = isFr ? 'fr' : 'en';
              return (
                <ScrollReveal key={machine.id} offset={30}>
                  <SpringCard className="h-full">
                    <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col hover:border-very-peri-200 transition-colors duration-300">
                      <div className="h-2 bg-very-peri-500" />
                      <div className="p-8 flex flex-col flex-grow">
                        {/* Machine image */}
                        <div className="w-full h-[140px] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                          <Image
                            src={getMachineImage(machine.id)}
                            alt={machine.nom}
                            width={280}
                            height={140}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">
                          {machine.nom}
                        </h3>
                        <p className="text-sm text-future-dusk-500 mb-4">
                          {isFr ? `Jusqu'à ${machine.tailleMax}` : `Up to ${machine.tailleMax}`} &middot; {machine.capaciteJour} {isFr ? 'photos/jour' : 'photos/day'}
                        </p>
                        <ul className="space-y-2 mb-6 flex-grow">
                          {machine.keyAdvantages.slice(0, 3).map((adv, advIdx) => (
                            <li key={advIdx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-future-dusk-600">{adv[langKey]}</span>
                            </li>
                          ))}
                        </ul>
                        <Button asChild variant="outline" className="rounded-xl w-full">
                          <Link href={{ pathname: '/contact', query: { subject: 'industrie' } }}>
                            {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 8. Conformite & Normes — Dark bg + floating white card ===== */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-900/40" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Conformite' : 'Compliance'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                {t('compliance.heading')}
              </h2>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">
                {t('compliance.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal offset={30}>
            <SpringCard>
              <div className="rounded-2xl bg-white shadow-2xl p-8 md:p-12">
                <p className="text-xs font-semibold text-future-dusk-400 uppercase tracking-wider text-center mb-6">
                  {isFr ? 'Environnements normes dans lesquels nos systemes s\'integrent' : 'Certified environments our systems integrate into'}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
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
            </SpringCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 9. FAQ — Split: sticky heading left + accordion right ===== */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                FAQ
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {t('faq.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 leading-relaxed">
                {isFr
                  ? 'Tout ce que vous devez savoir sur nos solutions pour l\'industrie et la defense.'
                  : 'Everything you need to know about our solutions for industry and defense.'}
              </p>
            </ScrollReveal>

            <div className="lg:col-span-8 space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} offset={20}>
                  <details className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-very-peri-200 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-future-dusk-900 font-heading font-bold hover:text-very-peri-600 transition-colors">
                      <span className="pr-4">{faq.question}</span>
                      <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-6 text-future-dusk-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. CTA Final — Asymmetric 3/5 + 2/5 ===== */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {t('cta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-8">
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-6 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">
                  {isFr ? 'Demandez une étude personnalisée' : 'Request a personalized study'}
                </h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">
                  {t('cta.description')}
                </p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href={{ pathname: '/contact', query: { subject: 'industrie' } }}>
                    {t('cta.ctaPrimary')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </SpringCard>
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {isFr ? 'Découvrir les systèmes' : 'Discover the systems'}
                </h3>
                <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">
                  {isFr
                    ? 'Explorez notre gamme complète de systèmes photo automatisés pour l\'industrie.'
                    : 'Explore our full range of automated photo systems for industry.'}
                </p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/studios-photo-automatises">
                    {t('cta.ctaSecondary')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      {/* ===== Cross-link vers la page secteur defense-securite ===== */}
      <section className="py-12 bg-very-peri-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInView>
            <p className="text-sm text-future-dusk-500 mb-3">
              {isFr ? 'Découvrez aussi notre page secteur complète' : 'Also discover our full sector page'}
            </p>
            <Link
              href={{ pathname: '/industrie/[slug]', params: { slug: 'defense-securite' } }}
              className="inline-flex items-center gap-2 text-lg font-heading font-bold text-very-peri-600 hover:text-very-peri-700 transition-colors"
            >
              {isFr ? 'Secteur Défense & Sécurité' : 'Defense & Security Sector'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </FadeInView>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
