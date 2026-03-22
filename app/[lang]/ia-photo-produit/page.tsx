import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Sparkles, Wand2, ImageIcon, Paintbrush, Layers,
  ArrowRight, Check, X, ExternalLink, Star,
  Code2, Palette, UserCheck, Zap, Camera, GraduationCap, Layout,
} from 'lucide-react';
import { BeforeAfterSlider } from '@/components/media';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';

/* ──────── Static data ──────── */

const FEATURES = [
  { key: 'lifestyle' as const, icon: <ImageIcon className="h-6 w-6" />, color: 'bg-pink-100 text-pink-700' },
  { key: 'background' as const, icon: <Wand2 className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700' },
  { key: 'retouche' as const, icon: <Paintbrush className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700' },
  { key: 'batch' as const, icon: <Layers className="h-6 w-6" />, color: 'bg-emerald-100 text-emerald-700' },
];

const PLATFORM_FEATURES = [
  { key: 'feature1' as const, icon: <Zap className="h-5 w-5" /> },
  { key: 'feature2' as const, icon: <Palette className="h-5 w-5" /> },
  { key: 'feature3' as const, icon: <UserCheck className="h-5 w-5" /> },
  { key: 'feature4' as const, icon: <Code2 className="h-5 w-5" /> },
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
      {/* ━━━ 1. HERO ━━━ */}
      <HeroSection
        layout="split"
        gradient="bg-gradient-to-br from-future-dusk-900 via-[#2d1b4e] to-very-peri-800"
        badge={{
          icon: <Sparkles className="h-4 w-4" />,
          label: 'BlendAI.studio',
          colorClass: 'bg-very-peri-500/20 text-very-peri-300',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
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

      {/* ━━━ 2. MANIFESTE ━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('manifeste.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('manifeste.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {(['principle1', 'principle2', 'principle3'] as const).map((key, i) => (
              <StaggerItem key={key}>
                <div className="relative bg-neutral-50 rounded-2xl p-8 text-center h-full">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-very-peri-100 text-very-peri-700 text-xl font-bold mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {t(`manifeste.${key}.title`)}
                  </h3>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">
                    {t(`manifeste.${key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ 3. POURQUOI LA QUALITE DE LA BASE COMPTE ━━━ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900">
              {t('whyBase.heading')}
            </h2>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Colonne IA générative pure */}
            <FadeInView delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-neutral-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-neutral-100 text-neutral-500">
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
            </FadeInView>

            {/* Colonne Packshot pro + IA */}
            <FadeInView delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border-2 border-very-peri-300 ring-1 ring-very-peri-100 h-full relative">
                <span className="absolute -top-3 left-6 bg-very-peri-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {isFr ? 'Recommandé' : 'Recommended'}
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-future-dusk-900">{t('whyBase.blendai.label')}</h3>
                    <p className="text-xs text-very-peri-500">{t('whyBase.blendai.examples')}</p>
                  </div>
                </div>
                <p className="text-sm text-future-dusk-500 mb-5">{t('whyBase.blendai.description')}</p>
                <ul className="space-y-2.5 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-future-dusk-600">{t(`whyBase.blendai.point${i}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-very-peri-600 uppercase tracking-wider border-t border-very-peri-100 pt-4">
                  {t('whyBase.blendai.verdict')}
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ━━━ 4. BLENDAI.STUDIO PLATEFORME ━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('platform.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-3xl mx-auto">
              {t('platform.subtitle')}
            </p>
          </FadeInView>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-12">
            {PLATFORM_FEATURES.map((feat) => (
              <StaggerItem key={feat.key}>
                <div className="flex gap-4 bg-neutral-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-very-peri-100 text-very-peri-700 flex-shrink-0">
                    {feat.icon}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-future-dusk-900 mb-1">
                      {t(`platform.${feat.key}.title`)}
                    </h3>
                    <p className="text-sm text-future-dusk-500 leading-relaxed">
                      {t(`platform.${feat.key}.description`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInView className="text-center">
            <p className="text-sm font-medium text-very-peri-600 mb-4">{t('platform.pricing')}</p>
            <Button asChild size="lg" className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl">
              <a href="https://blendai.studio" target="_blank" rel="noopener noreferrer">
                {t('platform.cta')} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </FadeInView>
        </div>
      </section>

      {/* ━━━ 5. FONCTIONNALITES ━━━ */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('features.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 gap-8">
            {FEATURES.map((feat) => (
              <StaggerItem key={feat.key}>
                <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow h-full">
                  <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${feat.color} mb-4`}>
                    {feat.icon}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {t(`features.${feat.key}.name`)}
                  </h3>
                  <p className="text-future-dusk-500 leading-relaxed">
                    {t(`features.${feat.key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ 6. BEFORE/AFTER RESULTATS ━━━ */}
      <section id="resultats" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('casUsage.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('casUsage.subtitle')}
            </p>
          </FadeInView>
          <div className="grid md:grid-cols-2 gap-8">
            {BEFORE_AFTER_ITEMS.map((item, i) => (
              <FadeInView key={item.sector} delay={i * 0.1}>
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
                <p className="mt-3 text-center text-sm font-medium text-future-dusk-600">
                  {SECTOR_LABELS[item.sector]?.[lang as 'fr' | 'en'] || item.sector}
                </p>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 7. PREUVE SOCIALE ━━━ */}
      <section className="py-16 bg-very-peri-50 border-y border-very-peri-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-3 gap-8 text-center mb-10">
            {(['stat1', 'stat2', 'stat3'] as const).map((stat) => (
              <StaggerItem key={stat}>
                <p className="text-3xl lg:text-4xl font-heading font-bold text-very-peri-600">
                  {t(`socialProof.${stat}`)}
                </p>
                <p className="text-sm text-future-dusk-500 mt-1">
                  {t(`socialProof.${stat}Label`)}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-future-dusk-600 italic mb-3">
              &ldquo;{t('socialProof.quote')}&rdquo;
            </p>
            <p className="text-sm font-semibold text-future-dusk-800">{t('socialProof.quoteName')}</p>
            <p className="text-xs text-future-dusk-400">{t('socialProof.quoteCompany')}</p>
          </FadeInView>
        </div>
      </section>

      {/* ━━━ 8. COMPATIBLE SYSTEMES ORBITVU ━━━ */}
      <section className="py-20 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                {t('compatible.heading')}
              </h2>
              <p className="text-lg text-very-peri-100 mb-8">
                {t('compatible.subtitle')}
              </p>
              <ul className="space-y-3 mb-8">
                {(['feature1', 'feature2', 'feature3', 'offer'] as const).map((key) => (
                  <li key={key} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-amber-300 shrink-0" />
                    <span className="text-very-peri-50">{t(`compatible.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl">
                <Link href="/studios-photo-automatises">
                  {t('compatible.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </FadeInView>
            <FadeInView direction="right" delay={0.15}>
              <Image
                src="/images/illustrations/ia-feature-integration.avif"
                alt={isFr ? 'Intégration système Orbitvu et IA' : 'Orbitvu system and AI integration'}
                width={560}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ━━━ 9. FAQ ━━━ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900">
              {t('faq.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer stagger={0.08} className="space-y-3">
            {faqItems.map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group bg-white rounded-xl border border-neutral-100 overflow-hidden [&[open]]:shadow-sm hover:border-very-peri-200 transition-colors">
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-future-dusk-900 font-heading font-semibold leading-snug group-hover:text-very-peri-600 transition-colors">
                      {faq.question}
                    </span>
                    <ArrowRight className="w-4 h-4 text-future-dusk-400 flex-shrink-0 group-open:rotate-90 transition-transform duration-200" />
                  </summary>
                  <div className="px-6 pb-6 text-future-dusk-500 leading-relaxed -mt-1">
                    {faq.answer}
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ 10. FINAL CTA ━━━ */}
      <section className="py-20 bg-future-dusk-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-gradient-to-br from-very-peri-700 to-very-peri-800 rounded-2xl p-8 h-full flex flex-col">
                <Sparkles className="h-8 w-8 text-very-peri-300 mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.test.heading')}</h3>
                <p className="text-very-peri-200 mb-6 flex-1">{t('finalCta.test.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl w-fit">
                  <a href="https://blendai.studio" target="_blank" rel="noopener noreferrer">
                    {t('finalCta.test.cta')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-future-dusk-800 rounded-2xl p-8 h-full flex flex-col">
                <Wand2 className="h-8 w-8 text-amber-400 mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-future-dusk-300 mb-6 flex-1">{t('finalCta.demo.description')}</p>
                <Button asChild className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl w-fit">
                  <Link href="/contact">{t('finalCta.demo.cta')}</Link>
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Cross-Links (Maillage) */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-future-dusk-900">
              {isFr ? 'Explorez nos solutions' : 'Explore our solutions'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/studios-photo-automatises', icon: <Camera className="h-5 w-5" />, title: isFr ? 'Studios Photo Automatisés' : 'Automated Photo Studios', desc: isFr ? '20 systèmes Orbitvu du bijou au mobilier. Packshot, 360°, vidéo.' : '20 Orbitvu systems from jewelry to furniture. Packshot, 360°, video.' },
              { href: '/industrie', icon: <Layout className="h-5 w-5" />, title: isFr ? 'Solutions par secteur' : 'Solutions by industry', desc: isFr ? '14 secteurs couverts avec des solutions photo adaptées.' : '14 sectors covered with tailored photo solutions.' },
              { href: '/academy', icon: <GraduationCap className="h-5 w-5" />, title: isFr ? 'Academy — Formations certifiées' : 'Academy — Certified training', desc: isFr ? 'Formations Qualiopi pour maîtriser votre système et l\'IA.' : 'Qualiopi training to master your system and AI.' },
            ].map((link) => (
              <StaggerItem key={link.href}>
                <Link href={link.href} className="group block bg-white rounded-xl border border-neutral-200 p-6 hover:border-very-peri-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-very-peri-100 text-very-peri-600 group-hover:bg-very-peri-200 transition-colors">
                      {link.icon}
                    </span>
                    <h3 className="font-semibold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">{link.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-very-peri-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isFr ? 'Découvrir' : 'Discover'} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
