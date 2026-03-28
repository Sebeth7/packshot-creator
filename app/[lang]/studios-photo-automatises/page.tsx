import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  Camera, Sparkles, GraduationCap, ArrowRight, ChevronDown,
  RotateCcw, Shirt, Layout, Users, Truck, Headphones, Calculator, ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, AnimatedCounter } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

const MachineSelector = dynamic(
  () => import('@/components/machine-selector/MachineSelector').then(mod => ({ default: mod.MachineSelector })),
  { loading: () => <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" /> }
);

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

  const clientLogos = [
    { name: 'Chanel', src: '/images/logos/client-chanel.svg', w: 225, h: 225 },
    { name: 'Amazon', src: '/images/logos/client-amazon.svg', w: 409, h: 123 },
    { name: 'Bosch', src: '/images/logos/client-bosch.svg', w: 462, h: 109 },
    { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.svg', w: 600, h: 66 },
    { name: 'Valentino', src: '/images/logos/client-valentino.svg', w: 320, h: 157 },
    { name: 'Sandro', src: '/images/logos/client-sandro.svg', w: 390, h: 100 },
    { name: 'Seiko', src: '/images/logos/client-seiko.svg', w: 508, h: 99 },
    { name: 'Würth', src: '/images/logos/client-wurth.svg', w: 485, h: 104 },
  ];

  const boldRenderer = {
    bold: (chunks: React.ReactNode) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
  };

  const boldRendererLight = {
    bold: (chunks: React.ReactNode) => <strong className="text-white font-semibold">{chunks}</strong>,
  };

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Full-bleed immersive, big type
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
          2. SOCIAL PROOF — AnimatedCounter stats + logos
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10 mb-12">
            {([
              { end: 5000, suffix: '+', label: t('trust.stat1label') },
              { end: 25, suffix: isFr ? ' ans' : ' yrs', label: t('trust.stat2label') },
              { end: 50, suffix: '+', label: t('trust.stat3label') },
            ]).map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center px-4 sm:px-6 lg:px-8">
                  <p className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold tracking-tight">
                    <AnimatedCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      className="text-gradient-peri"
                    />
                  </p>
                  <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {clientLogos.map((logo) => (
                <div key={logo.name} className="h-7 flex items-center opacity-30 hover:opacity-70 transition-opacity duration-300">
                  <Image src={logo.src} alt={logo.name} width={logo.w} height={logo.h} className="h-full w-auto max-w-[80px] object-contain invert" loading="eager" />
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ORIENTATION — Page purpose: find the right system
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInView direction="left">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {t('orientation.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                {t('orientation.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium leading-relaxed mb-8">
                {t.rich('orientation.description', boldRenderer)}
              </p>
              <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl px-8 h-14 text-base font-semibold">
                <a href="#studios">
                  {t('orientation.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </FadeInView>

            <ScrollReveal scale>
              <div className="w-full aspect-[4/3] bg-neutral-50 flex items-center justify-center border border-neutral-100 rounded-2xl">
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                  <p className="text-xs text-neutral-300">Système Orbitvu en situation ~600x450</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. SYSTEM SELECTOR — Catalog with photo type badges
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="studios" className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-future-dusk-800 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? '20 systèmes Orbitvu' : '20 Orbitvu systems'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
                {t('products.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">
                {t.rich('products.subtitle', boldRendererLight)}
              </p>
              {/* Photo type badges — compact visual filter cues */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {[
                  { icon: <Camera className="h-4 w-4" />, label: 'Packshot' },
                  { icon: <RotateCcw className="h-4 w-4" />, label: '360°' },
                  { icon: <Shirt className="h-4 w-4" />, label: isFr ? 'Mode' : 'Fashion' },
                  { icon: <Layout className="h-4 w-4" />, label: 'Flat-lay' },
                ].map((type) => (
                  <span key={type.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-future-dusk-200 border border-white/5">
                    {type.icon} {type.label}
                  </span>
                ))}
              </div>
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
          5. ACCOMPANIMENT — Numbered steps, editorial timeline
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {t('support.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark mb-4">
                {t('support.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium">
                {t('support.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {([
              { key: 'step1' as const, icon: <Users className="h-6 w-6" />, num: '01' },
              { key: 'step2' as const, icon: <Truck className="h-6 w-6" />, num: '02' },
              { key: 'step3' as const, icon: <Headphones className="h-6 w-6" />, num: '03' },
            ]).map((step, idx) => (
              <ScrollReveal key={step.key} offset={30}>
                <div className={`grid md:grid-cols-12 gap-8 items-center py-6 lg:py-12 ${idx < 2 ? 'border-b border-neutral-100' : ''}`}>
                  <div className="md:col-span-2 text-center md:text-right">
                    <span className="text-4xl sm:text-6xl lg:text-9xl font-heading font-bold text-neutral-100 select-none leading-none">
                      {step.num}
                    </span>
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-very-peri-100 text-very-peri-600">
                      {step.icon}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-2xl font-heading font-bold text-heading-dark mb-2">
                      {t(`support.${step.key}title`)}
                    </h3>
                    <p className="text-neutral-medium leading-relaxed max-w-2xl">
                      {t.rich(`support.${step.key}description`, boldRenderer)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. ROI TEASER — Gradient + floating card
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-very-peri-600 via-very-peri-500 to-future-dusk-700" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal scale>
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 text-center shadow-2xl shadow-very-peri-900/20">
              <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-very-peri-100 text-very-peri-600 mb-8">
                <Calculator className="h-8 w-8" />
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark mb-4">
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
          7. FAQ — Split sticky heading + accordion
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-4">
                  {t('faqStudios.heading')}
                </TextReveal>
                <p className="text-neutral-medium leading-relaxed">
                  {t.rich('faqStudios.description', boldRenderer)}
                </p>
              </ScrollReveal>
            </div>

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
          8. FINAL CTA — Asymmetric 3/5 + 2/5
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {t('finalCta.heading')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-8">
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-6 sm:p-10 lg:p-14 h-full flex flex-col">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">{t('finalCta.demo.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <Link href="/contact">{t('finalCta.demo.cta')}</Link>
                </Button>
              </div>
            </SpringCard>
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
          9. CROSS-LINKS — Minimal, editorial
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
