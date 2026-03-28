import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import SchemaOrg, {
  organizationSchema,
  websiteSchema,
  faqSchema,
  aggregateRatingSchema,
  productWithRatingSchema,
  itemListSchema,
} from '@/components/seo/SchemaOrg';
import {
  Camera,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  TrendingUp,
  Shield,
  TrendingDown,
  Receipt,
  Focus,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AnimatedCounter,
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations';
import { HeroSection, HeroVideo } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

/* ──────────────────────────── Static data ──────────────────────────── */

const CLIENT_LOGOS = [
  { name: 'Chanel', src: '/images/logos/client-chanel.svg', w: 225, h: 225 },
  { name: 'Amazon', src: '/images/logos/client-amazon.svg', w: 409, h: 123 },
  { name: 'Bosch', src: '/images/logos/client-bosch.svg', w: 462, h: 109 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.svg', w: 600, h: 66 },
  { name: 'Valentino', src: '/images/logos/client-valentino.svg', w: 320, h: 157 },
  { name: 'Sandro', src: '/images/logos/client-sandro.svg', w: 390, h: 100 },
  { name: 'Seiko', src: '/images/logos/client-seiko.svg', w: 508, h: 99 },
  { name: 'Lidl', src: '/images/logos/client-lidl.svg', w: 177, h: 168 },
  { name: 'Würth', src: '/images/logos/client-wurth.svg', w: 485, h: 104 },
  { name: 'Jägermeister', src: '/images/logos/client-jagermeister.svg', w: 187, h: 167 },
];

const SOCIAL_PROOF_STATS = [
  { key: 'stat1' as const, labelKey: 'stat1Label' as const, end: 25, suffix: '', prefix: '' },
  { key: 'stat2' as const, labelKey: 'stat2Label' as const, end: 500, suffix: '+', prefix: '' },
  { key: 'stat3' as const, labelKey: 'stat3Label' as const, end: 3, suffix: ' sec', prefix: '' },
  { key: 'stat4' as const, labelKey: 'stat4Label' as const, end: 85, suffix: '%', prefix: '60-' },
] as const;

const PAIN_POINTS = [
  { key: 'slow' as const, Icon: TrendingDown, color: 'text-future-dusk-500', bg: 'bg-future-dusk-0', border: 'border-neutral-100' },
  { key: 'expensive' as const, Icon: Receipt, color: 'text-future-dusk-500', bg: 'bg-future-dusk-0', border: 'border-neutral-100' },
  { key: 'dependent' as const, Icon: Focus, color: 'text-future-dusk-500', bg: 'bg-future-dusk-0', border: 'border-neutral-100' },
] as const;

const HYBRID_STEPS = [
  { key: 'capture' as const, Icon: Camera, bg: 'bg-secondary-orbitvu/10', icon: 'text-secondary-orbitvu', placeholder: 'Studio Orbitvu en action' },
  { key: 'ia' as const, Icon: Sparkles, bg: 'bg-primary-orbitvu/10', icon: 'text-primary-orbitvu', placeholder: 'BlendAI — génération de visuels' },
  { key: 'formation' as const, Icon: GraduationCap, bg: 'bg-accent-success/10', icon: 'text-accent-success', placeholder: 'Formation en situation' },
];

const GALLERY_ITEMS = [
  { key: 'packshot' as const, image: '/images/gallery/packshot-fondBlanc.avif', span: 'col-span-2 row-span-2' },
  { key: 'threeSixty' as const, image: '/images/gallery/360-product.avif', span: '' },
  { key: 'fashion' as const, image: '/images/gallery/fashion-model.avif', span: '' },
  { key: 'flatlay' as const, image: '/images/gallery/flatlay-composition.avif', span: '' },
  { key: 'jewelry' as const, image: '/images/gallery/jewelry-macro.avif', span: '' },
  { key: 'furniture' as const, image: '/images/gallery/furniture-large.avif', span: 'col-span-2' },
] as const;

const MINI_GALLERY = GALLERY_ITEMS.slice(0, 3);

const TESTIMONIALS = [
  { key: 't1' as const },
  { key: 't2' as const },
  { key: 't3' as const },
] as const;

const WHY_AUTOMATE = [
  { key: 'noSkills' as const, Icon: Clock },
  { key: 'scalability' as const, Icon: TrendingUp },
  { key: 'knowHow' as const, Icon: Shield },
] as const;

const INDUSTRIES = [
  { key: 'chaussures', icon: '/images/secteurs/chaussures.svg', href: '/industrie/chaussures' },
  { key: 'bijoux', icon: '/images/secteurs/horlogerie-bijouterie.svg', href: '/industrie/bijoux-joaillerie' },
  { key: 'mobilier', icon: '/images/secteurs/meubles.svg', href: '/industrie/mobilier-decoration' },
  { key: 'food', icon: '/images/secteurs/agroalimentaire.svg', href: '/industrie/food-alimentaire' },
  { key: 'cosmetiques', icon: '/images/secteurs/skincare-cosmetiques.svg', href: '/industrie/cosmetiques-beaute' },
  { key: 'mode', icon: '/images/secteurs/mode-accessoires.svg', href: '/industrie/mode-textile' },
  { key: 'hightech', icon: '/images/secteurs/hightech-electromenager.svg', href: '/industrie/electronique-hightech' },
  { key: 'pieces', icon: '/images/secteurs/pieces-techniques.svg', href: '/industrie/pieces-techniques-industrie' },
  { key: 'vins', icon: '/images/secteurs/vins-spiritueux.svg', href: '/industrie' },
  { key: 'optique', icon: '/images/secteurs/optique-lunetterie.svg', href: '/industrie' },
  { key: 'sport', icon: '/images/secteurs/sports.svg', href: '/industrie/sport-outdoor' },
  { key: 'art', icon: '/images/secteurs/objets-art-antiquites.svg', href: '/industrie' },
] as const;

/* ──────────────────────────── Metadata ──────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'home.meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}`,
      languages: { fr: '/fr', en: '/en' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(t('title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`/api/og?title=${encodeURIComponent(t('title'))}&type=page&lang=${lang}`],
    },
  };
}

/* ──────────────────────────── Page ──────────────────────────── */

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'home' });

  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Centered, video background, display typography
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="centered"
        backgroundVideo={
          <HeroVideo
            src="/images/hero/hero-range-2025.mp4"
            poster="/images/hero/hero-range-2025-poster.avif"
          />
        }
        badge={{
          icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ),
          label: t('hero.badge'),
          colorClass: 'text-accent-gold bg-accent-gold/10',
        }}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-8 h-14 text-base font-semibold rounded-lg shadow-lg shadow-very-peri-500/25"
          >
            <Link href="/contact">{t('hero.cta')}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 px-8 h-14 text-base rounded-lg"
          >
            <Link href="/calculateur">
              {t('hero.ctaSecondary')}
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-future-dusk-200 font-medium">
          {t('hero.microStats')}
        </p>
      </HeroSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SOCIAL PROOF — Pure black, animated counters, logo strip
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-24 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <StaggerContainer stagger={0.15} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10 mb-14">
            {SOCIAL_PROOF_STATS.map((stat) => (
              <StaggerItem key={stat.key}>
                <div className="text-center px-6">
                  <p className={`font-heading font-bold text-white tracking-tight ${stat.key === 'stat4' ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-7xl'}`}>
                    <AnimatedCounter
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </p>
                  <p className="mt-3 text-xs text-neutral-400 font-medium uppercase tracking-[0.15em]">
                    {t(`socialProof.${stat.labelKey}`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView delay={0.4}>
            <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em] mb-6">
              {t('socialProof.heading')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8 lg:gap-x-12">
              {CLIENT_LOGOS.map((logo) => (
                <div key={logo.name} className="h-7 flex items-center opacity-40 hover:opacity-70 transition-opacity duration-300">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    className="h-full w-auto max-w-[60px] sm:max-w-[80px] object-contain invert"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. PAIN POINTS — Horizontal stacked rows, large stats left
          Design: Each pain = full-width row. Giant stat dominates left.
          Breaks the 3-col card monotony.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header — split: text left, illustration right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-20">
            <ScrollReveal>
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {t('painPoints.label')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
                {t('painPoints.heading')}
              </TextReveal>
            </ScrollReveal>
            <FadeInView direction="right">
              <div className="w-full aspect-[3/2] bg-future-dusk-0 flex items-center justify-center border border-neutral-100 rounded-2xl">
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                  <p className="text-xs text-neutral-300">Illustration production photo ~600x400</p>
                </div>
              </div>
            </FadeInView>
          </div>

          {/* Cards — neutral, professional tone */}
          <div className="space-y-6">
            {PAIN_POINTS.map((point, i) => (
              <FadeInView key={point.key} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                <SpringCard>
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 lg:gap-16 rounded-2xl p-6 sm:p-8 lg:p-10 border ${point.border} bg-white hover:shadow-lg transition-shadow duration-300`}>
                    <div className="flex items-center gap-4 md:min-w-[200px] lg:min-w-[260px] shrink-0">
                      <div className={`w-12 h-12 rounded-xl ${point.bg} flex items-center justify-center`}>
                        <point.Icon className={`w-6 h-6 ${point.color}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-heading-dark leading-none">
                          {t(`painPoints.${point.key}.stat`)}
                        </p>
                        <p className="text-sm text-neutral-medium mt-1">
                          {t(`painPoints.${point.key}.statUnit`)}
                        </p>
                      </div>
                    </div>
                    <div className="md:border-l md:border-neutral-100 md:pl-10 lg:pl-16">
                      <h3 className="text-xl lg:text-2xl font-heading font-bold text-heading-dark mb-2">
                        {t(`painPoints.${point.key}.title`)}
                      </h3>
                      <p className="text-neutral-medium leading-relaxed max-w-2xl">
                        {t.rich(`painPoints.${point.key}.description`, {
                          bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
                        })}
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

      {/* ━━━ BREATHER — Full-bleed visual break ━━━ */}
      <ScrollReveal scale offset={40} className="relative w-full h-[280px] lg:h-[400px] bg-neutral-900 overflow-hidden">
        <Image
          src="/images/hero/hero-studios-wide.avif"
          alt="Showroom PackshotCreator — gamme complète de studios photo automatisés Orbitvu"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </ScrollReveal>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. HYBRID APPROACH — Split 4/8, sticky heading, numbered cards
          Tinted background, display typography
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {t('hybrid.label')}
              </span>
              <TextReveal as="h2" className="text-4xl sm:text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                {t('hybrid.heading')}
              </TextReveal>
              <p className="text-lg text-neutral-medium leading-relaxed mb-8">
                {t.rich('hybrid.subtitle', {
                  bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
                })}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-6 h-12 text-base font-semibold rounded-lg"
                >
                  <Link href="/studios-photo-automatises">{t('hybrid.cta')}</Link>
                </Button>
              </div>

              {/* Why Automate stats — merged from former standalone section */}
              <div className="space-y-3 mb-8">
                {WHY_AUTOMATE.map((item) => (
                  <div key={item.key} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-neutral-100">
                    <div className="w-10 h-10 rounded-lg bg-very-peri-100 flex items-center justify-center shrink-0">
                      <item.Icon className="w-5 h-5 text-very-peri-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-lg font-heading font-bold text-gradient-peri">{t(`whyAutomate.${item.key}.stat`)}</span>
                      <span className="text-sm text-neutral-medium ml-1.5">{t(`whyAutomate.${item.key}.statLabel`)}</span>
                      <p className="text-xs text-neutral-medium leading-snug">{t(`whyAutomate.${item.key}.title`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TODO: Replace with real product image — alphashot-360.avif or pillar-hardware.webp */}
              <div className="hidden lg:block rounded-2xl bg-white border border-neutral-100 overflow-hidden aspect-[4/3]">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-neutral-300 mx-auto mb-2" strokeWidth={1} />
                    <p className="text-xs text-neutral-400">Image produit ~500x400</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-8 space-y-6">
              {HYBRID_STEPS.map((step, idx) => (
                <FadeInView key={step.key} direction="right" delay={idx * 0.1}>
                  <SpringCard>
                    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-very-peri-200 transition-colors duration-300">
                      {/* TODO: Replace with real image per step */}
                      <div className="w-full h-[160px] lg:h-[200px] bg-neutral-50 flex items-center justify-center border-b border-neutral-100">
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
                          <p className="text-xs text-neutral-300">{step.placeholder}</p>
                        </div>
                      </div>
                      <div className="p-6 lg:p-10">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center`}>
                            <step.Icon className={`w-6 h-6 ${step.icon}`} strokeWidth={1.5} />
                          </div>
                          <span className="text-5xl lg:text-7xl font-heading font-bold text-neutral-100 select-none leading-none">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-heading-dark mb-3">
                          {t(`hybrid.${step.key}.title`)}
                        </h3>
                        <p className="text-neutral-medium leading-relaxed">
                          {t.rich(`hybrid.${step.key}.description`, {
                            bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
                          })}
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. PRODUCT SPOTLIGHT + MINI GALLERY — Split layout
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <ScrollReveal scale className="relative rounded-2xl overflow-hidden bg-bg-light-gray p-6 sm:p-8 lg:p-12">
              <Image
                src="/images/machines/alphashot-pro-g2.avif"
                alt="Alphashot Pro G2 — studio photo automatisé"
                width={600}
                height={500}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </ScrollReveal>

            <FadeInView direction="right" delay={0.15}>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent-gold bg-accent-gold/10 px-3 py-1.5 rounded-full">
                {t('spotlight.badge')}
              </span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
                {t('spotlight.heading')}
              </h2>
              <p className="mt-4 text-lg text-neutral-medium leading-relaxed">
                {t.rich('spotlight.description', {
                  bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
                })}
              </p>

              <ul className="mt-8 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-success/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent-success" />
                    </div>
                    <span className="text-text-dark font-medium">
                      {t(`spotlight.feature${i}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-8 h-12 text-base font-semibold rounded-lg"
                >
                  <Link href="/studio-photo/alphashot-pro-g2">{t('spotlight.cta')}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border border-very-peri-200 text-heading-dark hover:bg-very-peri-50 px-8 h-12 text-base rounded-lg"
                >
                  <Link href="/studios-photo-automatises">{t('spotlight.ctaSecondary')}</Link>
                </Button>
              </div>
            </FadeInView>
          </div>

          {/* Mini gallery — full width below */}
          <ScrollReveal scale className="mt-16">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
              {MINI_GALLERY.map((item) => (
                <div key={item.key} className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={t(`gallery.items.${item.key}`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                    {t(`gallery.items.${item.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. TESTIMONIALS — Dark premium, asymmetric layout
          1 featured (col-span-7) + 2 stacked (col-span-5)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-future-dusk-900 via-very-peri-800/20 to-future-dusk-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInView className="mb-14 lg:mb-16">
            <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
              {t('testimonials.label')}
            </span>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-white leading-[1.1]">
              {t('testimonials.heading')}
            </h2>
          </FadeInView>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Featured testimonial — large */}
            <FadeInView direction="left" className="lg:col-span-7">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 h-full flex flex-col">
                <p className="text-6xl lg:text-8xl font-heading font-bold text-gradient-peri leading-none mb-2">
                  {t(`testimonials.${TESTIMONIALS[0].key}.stat`)}
                </p>
                <p className="text-sm font-medium text-future-dusk-300 mb-8">
                  {t(`testimonials.${TESTIMONIALS[0].key}.statLabel`)}
                </p>
                <p className="text-lg lg:text-xl text-future-dusk-200 leading-relaxed italic flex-1 mb-8">
                  &ldquo;{t(`testimonials.${TESTIMONIALS[0].key}.quote`)}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="font-semibold text-white">
                    {t(`testimonials.${TESTIMONIALS[0].key}.name`)}
                  </p>
                  <p className="text-sm text-future-dusk-300">
                    {t(`testimonials.${TESTIMONIALS[0].key}.company`)}
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-very-peri-300 bg-very-peri-500/15 px-3 py-1 rounded-full">
                    {t(`testimonials.${TESTIMONIALS[0].key}.sector`)}
                  </span>
                </div>
              </div>
            </FadeInView>

            {/* Secondary testimonials — stacked */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {TESTIMONIALS.slice(1).map((testimonial, i) => (
                <FadeInView key={testimonial.key} direction="right" delay={0.1 + i * 0.1} className="flex-1">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 h-full flex flex-col">
                    <p className="text-4xl lg:text-5xl font-heading font-bold text-white leading-none mb-1">
                      {t(`testimonials.${testimonial.key}.stat`)}
                    </p>
                    <p className="text-xs font-medium text-future-dusk-300 mb-4">
                      {t(`testimonials.${testimonial.key}.statLabel`)}
                    </p>
                    <p className="text-future-dusk-200 leading-relaxed italic flex-1 mb-4 text-sm">
                      &ldquo;{t(`testimonials.${testimonial.key}.quote`)}&rdquo;
                    </p>
                    <div className="border-t border-white/10 pt-4">
                      <p className="font-semibold text-white text-sm">
                        {t(`testimonials.${testimonial.key}.name`)}
                      </p>
                      <p className="text-xs text-future-dusk-400">
                        {t(`testimonials.${testimonial.key}.company`)}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. INDUSTRIES — Grid with improved spacing
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView className="text-center mb-14 lg:mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {t('industries.label')}
            </span>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
              {t('industries.heading')}
            </h2>
            <p className="mt-6 text-lg text-neutral-medium max-w-3xl mx-auto leading-relaxed">
              {t('industries.subtitle')}
            </p>
          </FadeInView>

          <StaggerContainer stagger={0.05} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {INDUSTRIES.map((industry) => (
              <StaggerItem key={industry.key}>
                <Link
                  href={industry.href}
                  className="group flex flex-col items-center text-center p-6 lg:p-8 bg-bg-light-gray rounded-2xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-very-peri-200"
                >
                  <Image
                    src={industry.icon}
                    alt={t(`industries.${industry.key}`)}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain mb-4 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium text-heading-dark group-hover:text-primary-orbitvu transition-colors">
                    {t(`industries.${industry.key}`)}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInView className="text-center mt-12">
            <Link
              href="/industrie"
              className="inline-flex items-center gap-2 text-primary-orbitvu font-semibold hover:text-very-peri-600 transition-colors"
            >
              {t('industries.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. FAQ — Split sticky heading + accordion, tinted bg
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-4">
                  {t('faq.heading')}
                </TextReveal>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8">
              <StaggerContainer stagger={0.08} className="space-y-4">
                {faqItems.map((faq, i) => (
                  <StaggerItem key={i}>
                    <details className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300">
                      <summary className="flex items-center justify-between gap-4 p-6 lg:p-8 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-lg font-heading font-semibold text-heading-dark text-left leading-snug group-hover:text-primary-orbitvu transition-colors">
                          {faq.question}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-neutral-medium shrink-0 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-1">
                        <p className="text-neutral-medium leading-relaxed">{faq.answer}</p>
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
          11. FINAL CTA — Pure black, asymmetric 3/5 + 2/5
          Differentiated card content. Dot pattern bg.
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
              <p className="mt-4 text-sm text-neutral-500 italic max-w-xl mx-auto">
                {t('finalCta.microTestimonial')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            <SpringCard className="lg:col-span-3" hoverY={-6}>
              <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-8 lg:p-14 h-full flex flex-col">
                {/* TODO: Replace with real image — machine in situ or demo screenshot */}
                <div className="w-full h-[140px] lg:h-[180px] rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-white/30 mx-auto mb-1" strokeWidth={1} />
                    <p className="text-xs text-white/30">Visuel démo ~500x180</p>
                  </div>
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
                  <Link href="/calculateur">{t('finalCta.ctaSecondary')}</Link>
                </Button>
              </div>
            </SpringCard>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD (AEO) */}
      <SchemaOrg
        schema={[
          organizationSchema(),
          websiteSchema(),
          faqSchema(faqItems),
          aggregateRatingSchema({
            ratingValue: 4.8,
            reviewCount: 127,
          }),
          productWithRatingSchema({
            name: 'Alphashot Pro G2',
            description: 'Studio photo automatisé compact. Packshot en 3 secondes, 360°, vidéo, détourage automatique, IA BlendAI intégrée.',
            image: 'https://www.packshot-creator.com/images/machines/alphashot-pro-g2.avif',
            url: 'https://www.packshot-creator.com/fr/studio-photo/alphashot-pro-g2',
            brand: 'Orbitvu',
            category: 'Photo Studio Equipment',
            ratingValue: 4.9,
            reviewCount: 45,
          }),
          itemListSchema(
            INDUSTRIES.map((ind, i) => ({
              name: t(`industries.${ind.key}`),
              url: `https://www.packshot-creator.com/fr${ind.href}`,
              position: i + 1,
            }))
          ),
        ]}
      />
    </>
  );
}
