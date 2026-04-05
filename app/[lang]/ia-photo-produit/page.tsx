import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Sparkles, Wand2, ImageIcon, Paintbrush, Layers,
  ArrowRight, Check, X, ExternalLink, Link2,
  Code2, Palette, UserCheck, Zap, Camera, GraduationCap, Layout,
  ChevronDown, User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, AnimatedCounter } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import FeaturesTabs from './_components/FeaturesTabs';
import TestimonialCarousel from './_components/TestimonialCarousel';

/* ──────── Static data ──────── */


const PLATFORM_FEATURES = [
  { key: 'feature1' as const, icon: <Zap className="h-5 w-5" />, num: '01' },
  { key: 'feature2' as const, icon: <Palette className="h-5 w-5" />, num: '02' },
  { key: 'feature3' as const, icon: <UserCheck className="h-5 w-5" />, num: '03' },
  { key: 'feature4' as const, icon: <Code2 className="h-5 w-5" />, num: '04' },
  { key: 'feature5' as const, icon: <Link2 className="h-5 w-5" />, num: '05' },
];

const GALLERY_SECTORS = [
  'Cosmétiques', 'Mode', 'Bijoux', 'Décoration', 'Food', 'Lunettes',
  'Mobilier', 'Accessoires', 'Vin', 'Sport', 'Luxe', 'Textile',
];

const CLIENT_LOGOS = [
  { name: 'Chanel', src: '/logos/clients/chanel.svg' },
  { name: 'Sandro', src: '/logos/clients/sandro.svg' },
  { name: 'Amazon', src: '/logos/clients/amazon.svg' },
  { name: 'Bosch', src: '/logos/clients/bosch.svg' },
  { name: 'Valentino', src: '/logos/clients/valentino.svg' },
  { name: 'Seiko', src: '/logos/clients/seiko.svg' },
];

/* ──────── Metadata ──────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit.meta' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/ia-photo-produit`,
      languages: { fr: '/fr/ia-photo-produit', en: '/en/ia-photo-produit' },
    },
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/ia-photo-produit`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(t('title'))}&type=product&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('ogDescription') },
  };
}

/* ──────── Page ──────── */

export default async function IAPhotoProduitPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit' });
  const isFr = lang === 'fr';

  const boldOrange = (chunks: React.ReactNode) => <strong className="text-accent-orange font-semibold">{chunks}</strong>;
  const boldOrangeLight = (chunks: React.ReactNode) => <strong className="text-amber-400 font-semibold">{chunks}</strong>;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'IA Photo Produit', url: `https://www.packshot-creator.com/${lang}/ia-photo-produit` },
  ];

  const faqItems = [1, 2, 3, 4, 5].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  /* Features data for FeaturesTabs */
  const featuresData = [
    { id: 'lifestyle', label: t('features.lifestyle.name'), description: t('features.lifestyle.description'), icon: <ImageIcon className="h-5 w-5" />, color: 'bg-pink-100 text-pink-700', activeColor: 'bg-pink-100 text-pink-700' },
    { id: 'mannequin', label: t('features.mannequin.name'), description: t('features.mannequin.description'), icon: <User className="h-5 w-5" />, color: 'bg-violet-100 text-violet-700', activeColor: 'bg-violet-100 text-violet-700' },
    { id: 'background', label: t('features.background.name'), description: t('features.background.description'), icon: <Wand2 className="h-5 w-5" />, color: 'bg-blue-100 text-blue-700', activeColor: 'bg-blue-100 text-blue-700' },
    { id: 'retouche', label: t('features.retouche.name'), description: t('features.retouche.description'), icon: <Paintbrush className="h-5 w-5" />, color: 'bg-amber-100 text-amber-700', activeColor: 'bg-amber-100 text-amber-700' },
    { id: 'batch', label: t('features.batch.name'), description: t('features.batch.description'), icon: <Layers className="h-5 w-5" />, color: 'bg-emerald-100 text-emerald-700', activeColor: 'bg-emerald-100 text-emerald-700' },
  ];

  /* Testimonials data for TestimonialCarousel */
  const testimonials = [1, 2, 3, 4, 5, 6].map((i) => ({
    quote: t(`testimonials.t${i}.quote`),
    name: t(`testimonials.t${i}.name`),
    title: t(`testimonials.t${i}.title`),
    company: t(`testimonials.t${i}.company`),
  }));

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Full-bleed background image, same pattern as Home
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="centered"
        align="left"
        backgroundImage="/images/illustrations/pillar-ia.avif"
        badge={{
          icon: <Sparkles className="h-4 w-4" />,
          label: 'BlendAI.studio',
          colorClass: 'bg-very-peri-500/20 text-very-peri-300',
        }}
        title={t('hero.title')}
        subtitle={t.rich('hero.subtitle', { bold: boldOrangeLight })}
        ctas={[
          { label: isFr ? 'Essai gratuit — 5 visuels offerts' : 'Free trial — 5 visuals included', href: 'https://blendai.studio' as '/', variant: 'primary' },
          { label: isFr ? 'Voir les résultats' : 'See the results', href: '#resultats' as '/', variant: 'secondary' },
        ]}
      >
        <p className="text-sm text-future-dusk-300 mt-2">
          {isFr ? 'Sans carte bancaire' : 'No credit card required'}
        </p>

        {/* Social proof logos */}
        <div className="mt-10 pt-8 border-t border-white/15">
          <p className="text-xs font-semibold text-future-dusk-300 uppercase tracking-[0.15em] mb-5">
            {isFr ? '300+ marques nous font confiance' : '300+ brands trust us'}
          </p>
          <div className="flex flex-wrap items-center gap-6 lg:gap-8">
            {CLIENT_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={80}
                height={32}
                className="h-6 lg:h-7 w-auto opacity-50 invert grayscale hover:opacity-80 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </HeroSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. GALLERY MASONRY — 12 BlendAI result placeholders
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="resultats" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Galerie' : 'Gallery'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('gallery.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
                {t.rich('gallery.subtitle', { bold: boldOrange })}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.06} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {GALLERY_SECTORS.map((sector, idx) => (
              <StaggerItem key={sector}>
                <div
                  className={`break-inside-avoid bg-neutral-100 rounded-2xl border border-neutral-200/60 flex flex-col items-center justify-center ${
                    idx % 2 === 0 ? 'h-[280px]' : 'h-[340px]'
                  }`}
                >
                  <ImageIcon className="w-8 h-8 text-neutral-300 mb-3" strokeWidth={1} />
                  <p className="text-sm text-neutral-400 font-medium text-center px-4">
                    {isFr ? `Résultat BlendAI — ${sector}` : `BlendAI Result — ${sector}`}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. STATS + SOCIAL PROOF — Dark bg, AnimatedCounters + Testimonials
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Stats */}
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10 mb-6">
            <StaggerItem>
              <div className="text-center px-8">
                <p className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                  -<AnimatedCounter end={66} suffix="%" duration={2} />
                </p>
                <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                  {t('stats.costLabel')}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center px-8">
                <p className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                  <AnimatedCounter end={98} suffix="%" duration={2.5} />
                </p>
                <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                  {t('stats.conversionLabel')}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center px-8">
                <p className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                  +<AnimatedCounter end={38} suffix="%" duration={2} />
                </p>
                <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                  {t('stats.ctrLabel')}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <p className="text-center text-xs text-future-dusk-400 mb-16">
            {t('stats.source')}
          </p>

          {/* Testimonial carousel */}
          <FadeInView delay={0.2}>
            <TestimonialCarousel testimonials={testimonials} />
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. FEATURES TABS — Tabbed video demos
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-200/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Fonctionnalités' : 'Features'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('features.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500">
                {t.rich('features.subtitle', { bold: boldOrange })}
              </p>
            </div>
          </ScrollReveal>

          <FadeInView delay={0.15}>
            <FeaturesTabs features={featuresData} />
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. COMPARATIF — Philosophie intro + Bento asymmetric
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-very-peri-200/15 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Philosophie intro */}
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Notre approche' : 'Our approach'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                {t('manifeste.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 leading-relaxed">
                {t.rich('manifeste.subtitle', { bold: boldOrange })}
              </p>
            </div>
          </ScrollReveal>

          {/* 3 principes en ligne */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-20">
            {([
              { key: 'principle1' as const, icon: <Camera className="h-5 w-5" />, iconBg: 'bg-secondary-orbitvu/10', iconColor: 'text-secondary-orbitvu' },
              { key: 'principle2' as const, icon: <Sparkles className="h-5 w-5" />, iconBg: 'bg-very-peri-100', iconColor: 'text-very-peri-700' },
              { key: 'principle3' as const, icon: <Zap className="h-5 w-5" />, iconBg: 'bg-accent-success/10', iconColor: 'text-accent-success' },
            ]).map((principle) => (
              <FadeInView key={principle.key}>
                <div className="flex items-start gap-4">
                  <span className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${principle.iconBg} flex-shrink-0`}>
                    <span className={principle.iconColor}>{principle.icon}</span>
                  </span>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-1.5">
                      {t(`manifeste.${principle.key}.title`)}
                    </h3>
                    <p className="text-sm text-future-dusk-500 leading-relaxed">
                      {t.rich(`manifeste.${principle.key}.description`, { bold: boldOrange })}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

          {/* Comparatif heading */}
          <ScrollReveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Comparatif' : 'Comparison'}
              </span>
              <TextReveal as="h2" className="text-3xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                {t('whyBase.heading')}
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Bento: Recommended card is large (left), pure IA smaller (right) */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Hero card — Packshot pro + IA (3/5 = dominant) */}
            <ScrollReveal offset={30} className="lg:col-span-3">
              <SpringCard className="h-full">
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-12 border-2 border-very-peri-300 ring-1 ring-very-peri-100 h-full relative shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <span className="absolute -top-3 left-8 bg-very-peri-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    {isFr ? 'Recommandé' : 'Recommended'}
                  </span>
                  {/* Image placeholder */}
                  <div className="w-full h-[160px] bg-very-peri-50 flex items-center justify-center border border-very-peri-100 rounded-xl mb-6 mt-2">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-very-peri-300 mx-auto mb-1" strokeWidth={1} />
                      <p className="text-xs text-very-peri-300">Packshot pro + BlendAI result — ~600x160</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-very-peri-100 text-very-peri-700">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-future-dusk-900">{t('whyBase.blendai.label')}</h3>
                      <p className="text-sm text-very-peri-500">{t('whyBase.blendai.examples')}</p>
                    </div>
                  </div>
                  <p className="text-future-dusk-500 mb-6 leading-relaxed text-lg">{t.rich('whyBase.blendai.description', { bold: boldOrange })}</p>
                  <ul className="space-y-3 mb-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-future-dusk-600">{t(`whyBase.blendai.point${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-very-peri-600 uppercase tracking-wider border-t border-very-peri-100 pt-5">
                    {t('whyBase.blendai.verdict')}
                  </p>
                </div>
              </SpringCard>
            </ScrollReveal>

            {/* Secondary card — IA générative pure (2/5) */}
            <ScrollReveal offset={50} className="lg:col-span-2">
              <SpringCard className="h-full" hoverY={-3} hoverScale={1.005}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-neutral-200 h-full">
                  {/* Image placeholder */}
                  <div className="w-full h-[120px] bg-neutral-50 flex items-center justify-center border border-neutral-100 rounded-xl mb-5">
                    <div className="text-center">
                      <ImageIcon className="w-6 h-6 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                      <p className="text-[10px] text-neutral-300">Pure AI generated — ~400x120</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-neutral-100 text-neutral-500">
                      <Wand2 className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-future-dusk-900">{t('whyBase.pureIA.label')}</h3>
                      <p className="text-xs text-future-dusk-400">{t('whyBase.pureIA.examples')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-future-dusk-500 mb-5">{t('whyBase.pureIA.description')}</p>
                  <ul className="space-y-2.5 mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <span className={`mt-0.5 flex-shrink-0 ${i === 1 ? 'text-emerald-500' : 'text-orange-400'}`}>
                          {i === 1 ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        </span>
                        <span className="text-future-dusk-600">{t(`whyBase.pureIA.point${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider border-t border-neutral-100 pt-4">
                    {t('whyBase.pureIA.verdict')}
                  </p>
                </div>
              </SpringCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. PLATEFORME BLENDAI — Dark bg, floating card
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-[#2d1b4e]/40 to-future-dusk-900" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em] mb-4 block">
                BlendAI.studio
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
                {t('platform.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto">
                {t.rich('platform.subtitle', { bold: boldOrangeLight })}
              </p>
            </div>
          </ScrollReveal>

          <FadeInView delay={0.2}>
            <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-12 shadow-2xl shadow-black/20">
              {/* Timeline-style features inside the floating card */}
              <div className="space-y-0">
                {PLATFORM_FEATURES.map((feat, idx) => (
                  <div key={feat.key} className={`grid md:grid-cols-12 gap-6 items-center py-8 ${idx < PLATFORM_FEATURES.length - 1 ? 'border-b border-neutral-100' : ''}`}>
                    <div className="md:col-span-2 text-center md:text-right">
                      <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-neutral-100 select-none leading-none">
                        {feat.num}
                      </span>
                    </div>
                    <div className="md:col-span-1 flex justify-center">
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-very-peri-100 text-very-peri-600">
                        {feat.icon}
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-1.5">
                        {t(`platform.${feat.key}.title`)}
                      </h3>
                      <p className="text-future-dusk-500 leading-relaxed">
                        {t.rich(`platform.${feat.key}.description`, { bold: boldOrange })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm font-medium text-very-peri-600">{t('platform.pricing')}</p>
                <Button asChild size="lg" className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl shadow-lg shadow-very-peri-500/25 px-8 h-12">
                  <a href="https://blendai.studio" target="_blank" rel="noopener noreferrer">
                    {t('platform.cta')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. FAQ — Two-column: heading left, accordion right
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-4">
                  {t('faq.heading')}
                </TextReveal>
                <p className="text-future-dusk-500 leading-relaxed">
                  {isFr
                    ? 'L\'IA photo produit expliquée simplement. Vos questions, nos réponses.'
                    : 'Product photo AI explained simply. Your questions, our answers.'}
                </p>
              </ScrollReveal>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-8">
              <StaggerContainer stagger={0.08} className="space-y-4">
                {faqItems.map((faq, i) => (
                  <StaggerItem key={i}>
                    <details className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300">
                      <summary className="flex items-center justify-between gap-4 p-6 lg:p-8 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-lg font-heading font-semibold text-future-dusk-900 text-left leading-snug group-hover:text-very-peri-600 transition-colors">
                          {faq.question}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-1">
                        <p className="text-future-dusk-500 leading-relaxed">{faq.answer}</p>
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
          11. CTA FINAL — Emotional title, asymmetric layout
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {isFr ? 'Un packshot, des dizaines de déclinaisons' : 'One packshot, dozens of variations'}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Test BlendAI — 3/5 = dominant */}
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-4 sm:p-6 lg:p-14 h-full flex flex-col">
                <Sparkles className="h-8 w-8 text-very-peri-200 mb-6" />
                <h3 className="text-3xl font-heading font-bold mb-4">{t('finalCta.test.heading')}</h3>
                <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">{t('finalCta.test.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                  <a href="https://blendai.studio" target="_blank" rel="noopener noreferrer">
                    {t('finalCta.test.cta')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </SpringCard>
            {/* Demo — 2/5 = secondary */}
            <SpringCard className="lg:col-span-2" hoverY={-6}>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-10 border border-white/10 h-full flex flex-col">
                <Wand2 className="h-8 w-8 text-amber-400 mb-6" />
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">{t('finalCta.demo.description')}</p>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                  <Link href="/contact">{t('finalCta.demo.cta')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          12. CROSS-LINKS — Minimal, editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="mb-12">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">
              {isFr ? 'Explorez nos solutions' : 'Explore our solutions'}
            </span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios', href: '/studios-photo-automatises', icon: <Camera className="h-5 w-5" />, title: isFr ? 'Studios Photo Automatisés' : 'Automated Photo Studios', desc: isFr ? '20 systèmes Orbitvu du bijou au mobilier. Packshot, 360°, vidéo.' : '20 Orbitvu systems from jewelry to furniture. Packshot, 360°, video.' },
              { key: 'industrie', href: '/industrie', icon: <Layout className="h-5 w-5" />, title: isFr ? 'Solutions par secteur' : 'Solutions by industry', desc: isFr ? '14 secteurs couverts avec des solutions photo adaptées.' : '14 sectors covered with tailored photo solutions.' },
              { key: 'academy', href: '/academy', icon: <GraduationCap className="h-5 w-5" />, title: isFr ? 'Academy — Formations certifiées' : 'Academy — Certified training', desc: isFr ? 'Formations Qualiopi pour maîtriser votre système et l\'IA.' : 'Qualiopi training to master your system and AI.' },
            ].map((link) => (
              <FadeInView key={link.key}>
                <Link href={link.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-very-peri-500">{link.icon}</span>
                    <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">
                    {link.desc}
                  </p>
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <SchemaOrg
        schema={[
          organizationSchema(),
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqItems),
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BlendAI',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Web',
            url: 'https://blendai.studio',
            description: isFr
              ? 'IA photo produit spécialisée. Part d\'un packshot professionnel pour créer des déclinaisons lifestyle fidèles à 100%.'
              : 'Specialized product photo AI. Starts from a professional packshot to create 100% faithful lifestyle variations.',
            offers: {
              '@type': 'Offer',
              price: '75',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: 4.9,
              reviewCount: 100,
              bestRating: 5,
            },
            provider: {
              '@type': 'Organization',
              name: 'PackshotCreator',
            },
          },
        ]}
      />
    </>
  );
}
