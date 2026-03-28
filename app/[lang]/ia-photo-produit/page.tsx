import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Sparkles, Wand2, ImageIcon, Paintbrush, Layers,
  ArrowRight, Check, X, ExternalLink, Star,
  Code2, Palette, UserCheck, Zap, Camera, GraduationCap, Layout,
  ChevronDown,
} from 'lucide-react';
import { BeforeAfterSlider } from '@/components/media';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem, AnimatedCounter } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

/* ──────── Static data ──────── */

const FEATURES = [
  { key: 'lifestyle' as const, icon: <ImageIcon className="h-6 w-6" />, color: 'bg-pink-100 text-pink-700', hoverBorder: 'hover:border-pink-300' },
  { key: 'background' as const, icon: <Wand2 className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700', hoverBorder: 'hover:border-blue-300' },
  { key: 'retouche' as const, icon: <Paintbrush className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700', hoverBorder: 'hover:border-amber-300' },
  { key: 'batch' as const, icon: <Layers className="h-6 w-6" />, color: 'bg-emerald-100 text-emerald-700', hoverBorder: 'hover:border-emerald-300' },
];

const PLATFORM_FEATURES = [
  { key: 'feature1' as const, icon: <Zap className="h-5 w-5" />, num: '01' },
  { key: 'feature2' as const, icon: <Palette className="h-5 w-5" />, num: '02' },
  { key: 'feature3' as const, icon: <UserCheck className="h-5 w-5" />, num: '03' },
  { key: 'feature4' as const, icon: <Code2 className="h-5 w-5" />, num: '04' },
];

const BEFORE_AFTER_ITEMS = [
  { sector: 'cosmetiques', before: '/images/before-after/ia-before-after-cosmetiques-1-before.avif', after: '/images/before-after/ia-before-after-cosmetiques-1-after.avif' },
  { sector: 'mode', before: '/images/before-after/ia-before-after-mode-1-before.avif', after: '/images/before-after/ia-before-after-mode-1-after.avif' },
  { sector: 'bijoux', before: '/images/before-after/ia-before-after-bijoux-1-before.avif', after: '/images/before-after/ia-before-after-bijoux-1-after.avif' },
  { sector: 'decoration', before: '/images/before-after/ia-before-after-decoration-1-before.avif', after: '/images/before-after/ia-before-after-decoration-1-after.avif' },
];

const SECTOR_LABELS: Record<string, { fr: string; en: string }> = {
  cosmetiques: { fr: 'Cosmétiques — Lifestyle', en: 'Cosmetics — Lifestyle' },
  mode: { fr: 'Mode — Mise en scène IA', en: 'Fashion — AI staging' },
  bijoux: { fr: 'Bijoux — Mise en valeur', en: 'Jewelry — Showcase' },
  decoration: { fr: 'Décoration — Ambiance intérieure', en: 'Home Decor — Interior setting' },
};

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

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Split layout, gradient + media
          Design: Big headline left, product image right. Immersive gradient.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="split"
        gradient="bg-gradient-to-br from-future-dusk-900 via-[#2d1b4e] to-very-peri-800"
        badge={{
          icon: <Sparkles className="h-4 w-4" />,
          label: 'BlendAI.studio',
          colorClass: 'bg-very-peri-500/20 text-very-peri-300',
        }}
        title={t('hero.title')}
        subtitle={t.rich('hero.subtitle', { bold: boldOrangeLight })}
        ctas={[
          { label: t('hero.ctaPrimary'), href: '/contact', variant: 'primary' },
          { label: t('hero.ctaSecondary'), href: '#resultats', variant: 'secondary' },
        ]}
        media={
          <Image
            src="/images/illustrations/pillar-ia.avif"
            alt="BlendAI - IA Photo Produit"
            width={640}
            height={480}
            className="w-full h-auto rounded-2xl shadow-2xl"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
        backgroundVideo={
          <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-very-peri-400 blur-[120px]" />
            <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-pink-400 blur-[150px]" />
          </div>
        }
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. MANIFESTE — Split 4/8, sticky heading, numbered cards
          Design: Asymmetric. Heading stays left, principles scroll right
          with ghost numbers and horizontal card layout.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16 items-start">
            {/* Left column: sticky heading */}
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Notre philosophie' : 'Our philosophy'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {t('manifeste.heading')}
              </TextReveal>
              <p className="text-base lg:text-lg text-future-dusk-500 leading-relaxed mb-8">
                {t.rich('manifeste.subtitle', { bold: boldOrange })}
              </p>
              {/* Image placeholder */}
              <div className="w-full h-[280px] bg-neutral-50 flex items-center justify-center border border-neutral-100 rounded-xl">
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                  <p className="text-xs text-neutral-300">Packshot studio Orbitvu — ~500x280</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right column: stacked principle cards */}
            <div className="lg:col-span-8 space-y-4 lg:space-y-8">
              {([
                { key: 'principle1' as const, icon: <Camera className="h-6 w-6" />, iconBg: 'bg-secondary-orbitvu/10', iconColor: 'text-secondary-orbitvu', num: '01' },
                { key: 'principle2' as const, icon: <Sparkles className="h-6 w-6" />, iconBg: 'bg-very-peri-100', iconColor: 'text-very-peri-700', num: '02' },
                { key: 'principle3' as const, icon: <Zap className="h-6 w-6" />, iconBg: 'bg-accent-success/10', iconColor: 'text-accent-success', num: '03' },
              ]).map((principle) => (
                <ScrollReveal key={principle.key} offset={40}>
                  <SpringCard>
                    <div className="group bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 hover:border-very-peri-200 transition-colors duration-300 p-4 sm:p-6 lg:p-10">
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`w-12 h-12 rounded-xl ${principle.iconBg} flex items-center justify-center`}>
                          <span className={principle.iconColor}>{principle.icon}</span>
                        </div>
                        <span className="text-2xl sm:text-3xl lg:text-6xl font-heading font-bold text-neutral-100 select-none leading-none">
                          {principle.num}
                        </span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
                        {t(`manifeste.${principle.key}.title`)}
                      </h3>
                      <p className="text-future-dusk-500 leading-relaxed">
                        {t.rich(`manifeste.${principle.key}.description`, { bold: boldOrange })}
                      </p>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. POURQUOI LA QUALITE DE LA BASE COMPTE — Bento asymmetric
          Design: Recommended card is the hero (larger, elevated), pure IA
          card is secondary (smaller). Creates visual hierarchy.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-50" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-very-peri-200/15 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Comparatif' : 'Comparison'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
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
                  <div className="flex items-center gap-4 mb-6 mt-2">
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
                    {[1, 2, 3, 4].map((i) => (
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
                    {[1, 2, 3, 4].map((i) => (
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
          4. BLENDAI.STUDIO PLATEFORME — Dark bg, floating card
          Design: Dark surround with gradient. Platform info on white
          floating card. Features as timeline steps inside.
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
          5. FONCTIONNALITES — Bento grid, varied card sizes
          Design: First card spans 2 rows (hero card), others are smaller.
          Creates visual hierarchy instead of 4 identical boxes.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
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

          {/* Bento: first feature is hero card (left), 3 smaller stacked (right) */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Hero card — Lifestyle */}
            <ScrollReveal offset={30}>
              <SpringCard className="h-full">
                <div className="bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-pink-300 p-6 lg:p-10 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl group">
                  {/* Image placeholder */}
                  <div className="w-full h-[180px] bg-white flex items-center justify-center border border-neutral-100 rounded-xl mb-6">
                    <div className="text-center">
                      <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                      <p className="text-xs text-neutral-300">Lifestyle scene — ~800x180</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${FEATURES[0].color} mb-6`}>
                    {FEATURES[0].icon}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
                    {t(`features.${FEATURES[0].key}.name`)}
                  </h3>
                  <p className="text-future-dusk-500 leading-relaxed text-lg flex-1">
                    {t.rich(`features.${FEATURES[0].key}.description`, { bold: boldOrange })}
                  </p>
                </div>
              </SpringCard>
            </ScrollReveal>

            {/* 3 smaller cards stacked */}
            <div className="space-y-6">
              {FEATURES.slice(1).map((feat) => (
                <ScrollReveal key={feat.key} offset={20}>
                  <SpringCard hoverY={-3} hoverScale={1.005}>
                    <div className={`bg-neutral-50 rounded-2xl border border-neutral-100 ${feat.hoverBorder} p-6 transition-all duration-300 shadow-sm hover:shadow-lg group`}>
                      {/* Image placeholder */}
                      <div className="w-full h-[100px] bg-white flex items-center justify-center border border-neutral-100 rounded-xl mb-4">
                        <div className="text-center">
                          <ImageIcon className="w-6 h-6 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                          <p className="text-[10px] text-neutral-300">Feature visual — ~400x100</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-5">
                        <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${feat.color} flex-shrink-0 mt-1`}>
                          {feat.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                            {t(`features.${feat.key}.name`)}
                          </h3>
                          <p className="text-sm text-future-dusk-500 leading-relaxed">
                            {t.rich(`features.${feat.key}.description`, { bold: boldOrange })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. BEFORE/AFTER RESULTATS — Staggered reveal, sector badges
          Design: Each slider reveals at different offsets. Floating
          sector badges. Subtle parallax on the grid.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="resultats" className="py-20 lg:py-32 bg-neutral-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-very-peri-200/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-accent-orange uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Résultats concrets' : 'Real results'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 mb-4">
                {t('casUsage.heading')}
              </TextReveal>
              <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
                {t.rich('casUsage.subtitle', { bold: boldOrange })}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {BEFORE_AFTER_ITEMS.map((item, i) => (
              <ScrollReveal key={item.sector} offset={20 + i * 15}>
                <SpringCard hoverY={-4}>
                  <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <BeforeAfterSlider
                      before={{
                        src: item.before,
                        alt: `${SECTOR_LABELS[item.sector]?.[lang as 'fr' | 'en'] || item.sector} - Avant`,
                        label: isFr ? 'Packshot pro' : 'Pro packshot',
                      }}
                      after={{
                        src: item.after,
                        alt: `${SECTOR_LABELS[item.sector]?.[lang as 'fr' | 'en'] || item.sector} - Après`,
                        label: isFr ? 'Après BlendAI' : 'After BlendAI',
                      }}
                      width={800}
                      height={600}
                    />
                    <div className="px-6 py-4 border-t border-neutral-50">
                      <p className="text-sm font-semibold text-future-dusk-700">
                        {SECTOR_LABELS[item.sector]?.[lang as 'fr' | 'en'] || item.sector}
                      </p>
                    </div>
                  </div>
                </SpringCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. PREUVE SOCIALE — Horizontal ribbon, oversized stats
          Design: Dark bg, giant numbers dominate. Quote below.
          Same energy as Studios S2.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Label + heading */}
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Résultats clients' : 'Client results'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white">
                {t('socialProof.heading')}
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Giant stats with AnimatedCounter */}
          <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10 mb-14">
            <StaggerItem>
              <div className="text-center px-8">
                <p className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                  <AnimatedCounter end={100} suffix="+" duration={2} />
                </p>
                <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                  {t('socialProof.stat1Label')}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center px-8">
                <p className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                  <AnimatedCounter end={5000} suffix="+" duration={2.5} />
                </p>
                <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                  {t('socialProof.stat2Label')}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center px-8">
                <p className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                  4.9<span className="text-3xl md:text-4xl lg:text-5xl">/5</span>
                </p>
                <p className="mt-3 text-sm text-future-dusk-300 font-medium uppercase tracking-wider">
                  {t('socialProof.stat3Label')}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Quote */}
          <FadeInView delay={0.3}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-lg text-future-dusk-200 italic leading-relaxed mb-4">
                &ldquo;{t('socialProof.quote')}&rdquo;
              </p>
              <p className="text-sm font-semibold text-white">{t('socialProof.quoteName')}</p>
              <p className="text-xs text-future-dusk-400">{t('socialProof.quoteCompany')}</p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. COMPATIBLE SYSTEMES ORBITVU — Split gradient, enhanced
          Design: Full gradient bg, split image + content. TextReveal title.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            <ScrollReveal>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Intégration' : 'Integration'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold mb-6 leading-[1.1]">
                {t('compatible.heading')}
              </TextReveal>
              <p className="text-lg text-very-peri-100 mb-8 leading-relaxed">
                {t.rich('compatible.subtitle', { bold: boldOrangeLight })}
              </p>
              <ul className="space-y-4 mb-10">
                {(['feature1', 'feature2', 'feature3', 'offer'] as const).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/10">
                      <Check className="h-4 w-4 text-amber-300" />
                    </span>
                    <span className="text-very-peri-50 font-medium">{t(`compatible.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg shadow-very-peri-900/20 px-8 h-14 text-base font-semibold">
                <Link href="/studios-photo-automatises">
                  {t('compatible.cta')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </ScrollReveal>
            <ScrollReveal offset={50}>
              <SpringCard hoverY={-6}>
                <Image
                  src="/images/illustrations/ia-feature-integration.avif"
                  alt={isFr ? 'Intégration système Orbitvu et IA' : 'Orbitvu system and AI integration'}
                  width={560}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-2xl shadow-very-peri-900/30"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </SpringCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. FAQ — Two-column: heading left, accordion right
          Design: Split layout, heading stays while user scrolls FAQs.
          Same pattern as Studios S8.
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
          10. FINAL CTA — Asymmetric, test card is dominant
          Design: Test BlendAI card takes 3/5, demo card 2/5.
          Visual hierarchy. Dot pattern bg.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {isFr ? 'Prêt à transformer vos visuels ?' : 'Ready to transform your visuals?'}
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
          11. CROSS-LINKS — Minimal, editorial
          Design: Vertical dividers, no cards. Clean text hierarchy.
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
