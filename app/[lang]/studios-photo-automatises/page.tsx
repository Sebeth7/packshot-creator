import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  Camera, Sparkles, GraduationCap, ArrowRight, ChevronDown,
  RotateCcw, Shirt, Layout, Users, Truck, Headphones, Check, Calculator,
  AlertTriangle, DollarSign, Link2, ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

const MachineSelector = dynamic(
  () => import('@/components/machine-selector/MachineSelector').then(mod => ({ default: mod.MachineSelector })),
  { loading: () => <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" /> }
);

/* ──────────────────────────── Static data ──────────────────────────── */

const CLIENT_LOGOS = [
  { name: 'Chanel', src: '/images/logos/client-chanel.svg', w: 225, h: 225 },
  { name: 'Amazon', src: '/images/logos/client-amazon.svg', w: 409, h: 123 },
  { name: 'Bosch', src: '/images/logos/client-bosch.svg', w: 462, h: 109 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.svg', w: 600, h: 66 },
  { name: 'Valentino', src: '/images/logos/client-valentino.svg', w: 320, h: 157 },
  { name: 'Sandro', src: '/images/logos/client-sandro.svg', w: 390, h: 100 },
  { name: 'Seiko', src: '/images/logos/client-seiko.svg', w: 508, h: 99 },
  { name: 'Würth', src: '/images/logos/client-wurth.svg', w: 485, h: 104 },
];

const SOCIAL_PROOF_STATS = [
  { end: 500, suffix: '+', prefix: '', labelKey: 'stat1label' as const },
  { end: 25, suffix: '', prefix: '', labelKey: 'stat2label' as const },
  { end: 3, suffix: ' sec', prefix: '', labelKey: 'stat3label' as const },
  { end: 50, suffix: '+', prefix: '', labelKey: 'stat4label' as const },
] as const;

const PAIN_POINTS = [
  { key: 'slow' as const, Icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { key: 'expensive' as const, Icon: DollarSign, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { key: 'inconsistent' as const, Icon: Link2, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
] as const;

const PILLARS = [
  { key: 'capture' as const, Icon: Camera, bg: 'bg-secondary-orbitvu/10', icon: 'text-secondary-orbitvu', image: '/images/illustrations/pillar-hardware.avif', num: '01' },
  { key: 'creation' as const, Icon: Sparkles, bg: 'bg-primary-orbitvu/10', icon: 'text-primary-orbitvu', image: '/images/illustrations/pillar-ia.avif', num: '02' },
  { key: 'formation' as const, Icon: GraduationCap, bg: 'bg-accent-success/10', icon: 'text-accent-success', image: '/images/illustrations/pillar-formation.avif', num: '03' },
];

const SUPPORT_STEPS = [
  { key: 'step1' as const, Icon: Users, num: '01' },
  { key: 'step2' as const, Icon: Truck, num: '02' },
  { key: 'step3' as const, Icon: Headphones, num: '03' },
];

/* ──────────────────────────── Metadata ──────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'studiosHardware.meta' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/studios-photo-automatises`,
      languages: { fr: '/fr/studios-photo-automatises', en: '/en/studios-photo-automatises' },
    },
    openGraph: {
      title: t('title'), description: t('description'), type: 'website',
      url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises`,
      siteName: 'PackshotCreator', locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `https://www.packshot-creator.com/api/og?title=${encodeURIComponent(t('title'))}&type=product&lang=${lang}`, width: 1200, height: 630, alt: t('title') }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

/* ──────────────────────────── Page ──────────────────────────── */

export default async function StudiosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'studiosHardware' });
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: isFr ? 'Studios Photo Automatisés' : 'Automated Photo Studios', url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises` },
  ];

  const studioFaqs = (['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map((key) => ({
    question: t(`faqStudios.${key}.question`),
    answer: t(`faqStudios.${key}.answer`),
  }));

  const boldRenderer = {
    bold: (chunks: React.ReactNode) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
  };

  const boldRendererLight = {
    bold: (chunks: React.ReactNode) => <strong className="text-white font-semibold">{chunks}</strong>,
  };

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Full-bleed immersive, display typography
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="centered"
        backgroundImage="/images/hero/hero-studios-wide.avif"
        badge={{
          icon: <Camera className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-amber-500/15 text-amber-300',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.ctaPrimary'), href: '#studios', variant: 'primary' },
          { label: t('hero.ctaSecondary'), href: '/contact', variant: 'secondary' },
        ]}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SOCIAL PROOF — Pure black, animated counters, logo strip
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-24 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <StaggerContainer stagger={0.15} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10 mb-14">
            {SOCIAL_PROOF_STATS.map((stat) => (
              <StaggerItem key={stat.labelKey}>
                <div className="text-center px-6">
                  <p className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                    <AnimatedCounter
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </p>
                  <p className="mt-3 text-xs text-neutral-400 font-medium uppercase tracking-[0.15em]">
                    {t(`trust.${stat.labelKey}`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView delay={0.4}>
            <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-6">
              {t('trust.logosLabel')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 lg:gap-x-12">
              {CLIENT_LOGOS.map((logo) => (
                <div key={logo.name} className="h-7 flex items-center opacity-40 hover:opacity-70 transition-opacity duration-300">
                  <Image src={logo.src} alt={logo.name} width={logo.w} height={logo.h} className="h-full w-auto max-w-[60px] sm:max-w-[80px] object-contain invert" loading="eager" />
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. PAIN POINTS — Horizontal stacked rows, large stats left
          Design: Each pain = full-width row. Alternating left/right animations.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-red-500 uppercase tracking-[0.2em] mb-4 block">
                {t('painPoints.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
                {t('painPoints.heading')}
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {PAIN_POINTS.map((point, i) => (
              <FadeInView key={point.key} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                <SpringCard>
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 lg:gap-16 rounded-2xl p-6 sm:p-8 lg:p-10 border ${point.border} bg-neutral-50/50 hover:shadow-lg transition-shadow duration-300`}>
                    <div className="flex items-center gap-4 md:min-w-[200px] lg:min-w-[260px] shrink-0">
                      <div className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center`}>
                        <point.Icon className={`w-6 h-6 ${point.color}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-bold ${point.color} leading-none`}>
                          {t(`painPoints.${point.key}.stat`)}
                        </p>
                        <p className="text-sm text-neutral-medium mt-1">
                          {t(`painPoints.${point.key}.statUnit`)}
                        </p>
                      </div>
                    </div>
                    <div className="md:border-l md:border-neutral-200 md:pl-10 lg:pl-16">
                      <h3 className="text-xl lg:text-2xl font-heading font-bold text-heading-dark mb-2">
                        {t(`painPoints.${point.key}.title`)}
                      </h3>
                      <p className="text-neutral-medium leading-relaxed max-w-2xl">
                        {t.rich(`painPoints.${point.key}.description`, boldRenderer)}
                      </p>
                    </div>
                  </div>
                </SpringCard>
              </FadeInView>
            ))}
          </div>

          <FadeInView className="text-center mt-14">
            <p className="text-2xl lg:text-3xl font-heading font-semibold text-gradient-peri">
              {t('painPoints.bridge')}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. THREE PILLARS — Sticky split 4/8, numbered cards
          Design: Tinted background, display typography, bold selective
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left column: sticky heading + CTAs + image */}
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {t('threePillars.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                {t('threePillars.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium leading-relaxed mb-8">
                {t.rich('threePillars.subtitle', boldRenderer)}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-6 h-12 text-base font-semibold rounded-lg"
                >
                  <Link href="/contact">{t('threePillars.cta')}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border border-very-peri-200 text-heading-dark hover:bg-very-peri-50 px-6 h-12 text-base rounded-lg"
                >
                  <Link href="#studios">{t('threePillars.ctaSecondary')}</Link>
                </Button>
              </div>
              {/* Image placeholder in sticky column */}
              <div className="hidden lg:block rounded-2xl bg-white border border-neutral-100 overflow-hidden aspect-[4/3]">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-neutral-300 mx-auto mb-2" strokeWidth={1} />
                    <p className="text-xs text-neutral-400">Image produit ~500x400</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right column: numbered cards with images */}
            <div className="lg:col-span-8 space-y-6">
              {PILLARS.map((pillar, idx) => (
                <FadeInView key={pillar.key} direction="right" delay={idx * 0.1}>
                  <SpringCard>
                    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-very-peri-200 transition-colors duration-300">
                      {/* Image top */}
                      <div className="w-full h-[160px] lg:h-[200px] relative overflow-hidden">
                        <Image src={pillar.image} alt={t(`threePillars.${pillar.key}.title`)} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-6 lg:p-10">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center`}>
                            <pillar.Icon className={`w-6 h-6 ${pillar.icon}`} strokeWidth={1.5} />
                          </div>
                          <span className="text-5xl lg:text-7xl font-heading font-bold text-neutral-100 select-none leading-none">
                            {pillar.num}
                          </span>
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-heading-dark mb-3">
                          {t(`threePillars.${pillar.key}.title`)}
                        </h3>
                        <p className="text-neutral-medium leading-relaxed">
                          {t.rich(`threePillars.${pillar.key}.description`, boldRenderer)}
                        </p>
                      </div>
                    </div>
                  </SpringCard>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ BREATHER — Full-bleed visual break ━━━ */}
      <ScrollReveal scale offset={40} className="relative w-full h-[280px] lg:h-[400px] bg-neutral-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" strokeWidth={1} />
            <p className="text-sm text-neutral-400 font-medium">Image immersive pleine largeur</p>
            <p className="text-xs text-neutral-300 mt-1">~1400x400px — Studio en situation / Lignes de production</p>
          </div>
        </div>
      </ScrollReveal>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. PHOTO TYPES — Bento grid, varied card sizes
          Design: First card spans full left, 3 stacked right. Bold selective.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-very-peri-200/15 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="max-w-3xl mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {t('photoTypes.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-4">
                {t('photoTypes.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium">
                {t('photoTypes.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Bento: hero card left, 3 smaller cards stacked right */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Hero card — Packshot */}
            <ScrollReveal offset={30}>
              <SpringCard className="h-full">
                <div className="bg-bg-light-gray rounded-2xl border border-neutral-100 hover:border-very-peri-300 p-10 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl group">
                  <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-very-peri-100 text-very-peri-700 mb-6">
                    <Camera className="h-7 w-7" />
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-heading-dark mb-4">
                    {t('photoTypes.still.title')}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed mb-6 text-lg flex-1">
                    {t.rich('photoTypes.still.description', boldRenderer)}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {(['stat1', 'stat2', 'stat3'] as const).map((stat) => (
                      <div key={stat} className="bg-very-peri-50 rounded-xl p-3 text-center">
                        <span className="text-xs font-semibold text-very-peri-700">{t(`photoTypes.still.${stat}`)}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/studio-photo/selecteur-machines" className="inline-flex items-center gap-2 text-sm font-semibold text-very-peri-600 group-hover:text-very-peri-700">
                    {t('photoTypes.still.cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpringCard>
            </ScrollReveal>

            {/* 3 smaller cards stacked */}
            <div className="space-y-6">
              {([
                { key: 'threeSixty' as const, icon: <RotateCcw className="h-5 w-5" />, color: 'bg-amber-100 text-amber-700', accent: 'text-amber-600', hoverBorder: 'hover:border-amber-300' },
                { key: 'fashion' as const, icon: <Shirt className="h-5 w-5" />, color: 'bg-emerald-100 text-emerald-700', accent: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
                { key: 'flatlay' as const, icon: <Layout className="h-5 w-5" />, color: 'bg-rose-100 text-rose-700', accent: 'text-rose-600', hoverBorder: 'hover:border-rose-300' },
              ]).map((type, idx) => (
                <FadeInView key={type.key} direction="right" delay={idx * 0.12}>
                  <SpringCard hoverY={-3} hoverScale={1.005}>
                    <div className={`bg-bg-light-gray rounded-2xl border border-neutral-100 ${type.hoverBorder} p-6 transition-all duration-300 shadow-sm hover:shadow-lg group`}>
                      <div className="flex items-start gap-5">
                        <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${type.color} flex-shrink-0 mt-1`}>
                          {type.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <h3 className="text-lg font-heading font-bold text-heading-dark">
                              {t(`photoTypes.${type.key}.title`)}
                            </h3>
                            <Link href="/studio-photo/selecteur-machines" className={`${type.accent} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`}>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                          <p className="text-sm text-neutral-medium leading-relaxed mb-3">
                            {t.rich(`photoTypes.${type.key}.description`, boldRenderer)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(['stat1', 'stat2', 'stat3'] as const).map((stat) => (
                              <span key={stat} className="text-xs font-medium text-future-dusk-600 bg-white px-2.5 py-1 rounded-lg">
                                {t(`photoTypes.${type.key}.${stat}`)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpringCard>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. SYSTEM SELECTOR — Full width, dark surround
          Design: Selector component floats on white card above dark bg
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="studios" className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-future-dusk-800 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {t('products.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
                {t('products.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">
                {t('products.subtitle')}
              </p>
            </div>
          </ScrollReveal>
          <FadeInView delay={0.2}>
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl shadow-black/20">
              <MachineSelector
                mode="display"
                showFilters={true}
                showPrices={false}
                locale={lang as 'fr' | 'en'}
              />
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. ACCOMPANIMENT — Horizontal timeline, numbered steps
          Design: Tinted bg, label, bold selective, editorial feel
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-very-peri-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {t('support.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark mb-4">
                {t('support.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium">
                {t.rich('support.subtitle', boldRenderer)}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {SUPPORT_STEPS.map((step, idx) => (
              <FadeInView key={step.key} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.1}>
                <div className={`grid md:grid-cols-12 gap-8 items-center py-6 lg:py-12 ${idx < 2 ? 'border-b border-neutral-200' : ''}`}>
                  {/* Number — massive, decorative */}
                  <div className="md:col-span-2 text-center md:text-right">
                    <span className="text-4xl sm:text-6xl lg:text-9xl font-heading font-bold text-neutral-200 select-none leading-none">
                      {step.num}
                    </span>
                  </div>
                  {/* Icon */}
                  <div className="md:col-span-1 flex justify-center">
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-very-peri-100 text-very-peri-600">
                      <step.Icon className="h-6 w-6" />
                    </span>
                  </div>
                  {/* Content */}
                  <div className="md:col-span-9">
                    <h3 className="text-2xl font-heading font-bold text-heading-dark mb-2">
                      {t(`support.${step.key}title`)}
                    </h3>
                    <p className="text-neutral-medium leading-relaxed max-w-2xl">
                      {t.rich(`support.${step.key}description`, boldRenderer)}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. ROI TEASER — Full-bleed gradient, floating card
          Design: Dramatic gradient, centered floating card with depth
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-very-peri-600 via-very-peri-500 to-future-dusk-700" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal scale>
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 text-center shadow-2xl shadow-very-peri-900/20">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-6 block">
                {t('roiTeaser.label')}
              </span>
              <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-very-peri-100 text-very-peri-600 mb-8">
                <Calculator className="h-8 w-8" />
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-heading-dark mb-4">
                {t('roiTeaser.heading')}
              </h2>
              <p className="text-neutral-medium max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                {t.rich('roiTeaser.subtitle', boldRenderer)}
              </p>
              <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25 px-10 h-14 text-base font-semibold">
                <Link href="/calculateur-roi">
                  {t('roiTeaser.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-6 text-sm font-semibold text-very-peri-600">
                {t('roiTeaser.stat')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. FAQ — Two-column: heading left sticky, accordion right
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-4">
                  {t('faqStudios.heading')}
                </TextReveal>
                <p className="text-neutral-medium leading-relaxed">
                  {t('faqStudios.subtitle')}
                </p>
              </ScrollReveal>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-8">
              <StaggerContainer stagger={0.08} className="space-y-4">
                {(['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map((key) => (
                  <StaggerItem key={key}>
                    <details className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300">
                      <summary className="flex items-center justify-between gap-4 p-4 sm:p-6 lg:p-8 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-lg font-heading font-semibold text-heading-dark text-left leading-snug group-hover:text-very-peri-600 transition-colors">
                          {t(`faqStudios.${key}.question`)}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-1">
                        <p className="text-neutral-medium leading-relaxed">{t(`faqStudios.${key}.answer`)}</p>
                      </div>
                    </details>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. FINAL CTA — Asymmetric 3/5 + 2/5, premium dark
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16 lg:mb-20">
              {t('finalCta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Demo — 3/5 = dominant */}
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-6 sm:p-10 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">
                  {t.rich('finalCta.demo.description', boldRendererLight)}
                </p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href="/contact">{t('finalCta.demo.cta')}</Link>
                </Button>
              </div>
            </SpringCard>
            {/* Guide — 2/5 = secondary */}
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10 h-full flex flex-col">
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.guide.heading')}</h3>
                <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">{t('finalCta.guide.description')}</p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/blog">{t('finalCta.guide.cta')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          11. CROSS-LINKS — Minimal, editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="mb-12">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">
              {t('crossLinks.heading')}
            </span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'ia', href: '/ia-photo-produit', icon: <Sparkles className="h-5 w-5" /> },
              { key: 'industrie', href: '/industrie', icon: <Layout className="h-5 w-5" /> },
              { key: 'academy', href: '/academy', icon: <GraduationCap className="h-5 w-5" /> },
            ].map((link) => (
              <FadeInView key={link.key}>
                <Link href={link.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-very-peri-500">{link.icon}</span>
                    <h3 className="font-heading font-bold text-heading-dark group-hover:text-very-peri-600 transition-colors">
                      {t(`crossLinks.${link.key}.title`)}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <p className="text-sm text-neutral-medium leading-relaxed">
                    {t(`crossLinks.${link.key}.description`)}
                  </p>
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(studioFaqs)]} />
    </>
  );
}
