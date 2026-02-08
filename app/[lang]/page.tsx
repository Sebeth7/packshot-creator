import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import SchemaOrg, {
  organizationSchema,
  websiteSchema,
  faqSchema,
} from '@/components/seo/SchemaOrg';
import ImagePlaceholder from '@/components/shared/ImagePlaceholder';
import { getAllArticles } from '@/lib/blog';
import {
  Camera,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Check,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

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

const PILLARS = [
  {
    key: 'capture' as const,
    href: '/studios-photo-automatises' as const,
    image: '/images/illustrations/pillar-hardware.avif',
    badge: 'bg-secondary-orbitvu/10 text-secondary-orbitvu',
  },
  {
    key: 'creation' as const,
    href: '/ia-photo-produit' as const,
    image: '/images/illustrations/pillar-ia.avif',
    badge: 'bg-primary-orbitvu/10 text-primary-orbitvu',
  },
  {
    key: 'formation' as const,
    href: '/academy' as const,
    image: '/images/illustrations/pillar-formation.avif',
    badge: 'bg-accent-success/10 text-accent-success',
  },
];

const STATS = ['years', 'clients', 'sectors', 'machines'] as const;

const HYBRID_STEPS = [
  { key: 'capture' as const, Icon: Camera, bg: 'bg-secondary-orbitvu/10', icon: 'text-secondary-orbitvu' },
  { key: 'ia' as const, Icon: Sparkles, bg: 'bg-primary-orbitvu/10', icon: 'text-primary-orbitvu' },
  { key: 'formation' as const, Icon: GraduationCap, bg: 'bg-accent-success/10', icon: 'text-accent-success' },
];

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
      images: [{ url: 'https://www.packshot-creator.com/og/default.jpg', width: 1200, height: 630, alt: 'PackshotCreator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://www.packshot-creator.com/og/default.jpg'],
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

  const articles = await getAllArticles(3);

  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }));

  return (
    <>
        {/* ━━━ HERO ━━━ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeInView direction="left" className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-gold bg-accent-gold/10 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {t('hero.badge')}
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-heading font-bold text-white leading-[1.1] tracking-tight">
                  {t('hero.title')}
                </h1>

                <p className="mt-6 text-lg lg:text-xl text-future-dusk-200 max-w-xl leading-relaxed">
                  {t('hero.subtitle')}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-very-peri-500/25"
                  >
                    <Link href="/contact">{t('hero.cta')}</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 px-8 h-12 text-base rounded-lg"
                  >
                    <Link href="/studios-photo-automatises">
                      {t('hero.ctaSecondary')}
                    </Link>
                  </Button>
                </div>
              </FadeInView>

              <FadeInView direction="right" delay={0.2} className="order-1 lg:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src="/images/hero/hero-range-2025.avif"
                    alt="Gamme complète studios photo automatisés Orbitvu 2025"
                    width={720}
                    height={520}
                    className="w-full h-auto object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute -inset-6 bg-very-peri-500/20 rounded-3xl blur-3xl -z-10"
                  aria-hidden="true"
                />
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ━━━ CLIENT LOGOS ━━━ */}
        <section className="py-10 bg-white border-b border-future-dusk-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold text-neutral-medium uppercase tracking-[0.15em] mb-8">
              {t('clientLogos.heading')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="h-9 flex items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={logo.h}
                    className="h-full w-auto max-w-[100px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ THREE PILLARS ━━━ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
                {t('threePillars.heading')}
              </h2>
              <p className="mt-4 text-lg text-neutral-medium max-w-3xl mx-auto leading-relaxed">
                {t('threePillars.subtitle')}
              </p>
            </FadeInView>

            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {PILLARS.map((pillar) => (
                <StaggerItem key={pillar.key}>
                <Link
                  key={pillar.key}
                  href={pillar.href}
                  className="group relative bg-bg-off-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-very-peri-200"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-bg-light-gray">
                    <Image
                      src={pillar.image}
                      alt={t(`threePillars.${pillar.key}.title`)}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${pillar.badge}`}
                    >
                      {t(`threePillars.${pillar.key}.badge`)}
                    </span>
                    <h3 className="mt-4 text-xl font-heading font-bold text-heading-dark group-hover:text-primary-orbitvu transition-colors">
                      {t(`threePillars.${pillar.key}.title`)}
                    </h3>
                    <p className="mt-2 text-neutral-medium leading-relaxed">
                      {t(`threePillars.${pillar.key}.description`)}
                    </p>
                    <span className="mt-6 inline-flex items-center text-primary-orbitvu font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ━━━ KEY STATS ━━━ */}
        <section className="py-16 bg-gradient-to-r from-future-dusk-800 to-very-peri-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer stagger={0.15} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
              {STATS.map((stat) => (
                <StaggerItem key={stat}>
                  <p className="text-4xl lg:text-5xl font-heading font-bold text-white">
                    {t(`stats.${stat}`)}
                  </p>
                  <p className="mt-2 text-sm text-future-dusk-200 font-medium">
                    {t(`stats.${stat}Label`)}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ━━━ HYBRID APPROACH ━━━ */}
        <section className="py-20 bg-bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
                {t('hybrid.heading')}
              </h2>
              <p className="mt-4 text-lg text-neutral-medium max-w-3xl mx-auto leading-relaxed">
                {t('hybrid.subtitle')}
              </p>
            </FadeInView>

            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {HYBRID_STEPS.map((step, idx) => (
                <StaggerItem key={step.key}>
                <div
                  className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${step.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <step.Icon className={`w-7 h-7 ${step.icon}`} strokeWidth={1.5} />
                    </div>
                    <span className="text-5xl font-heading font-bold text-bg-light-gray select-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">
                    {t(`hybrid.${step.key}.title`)}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed">
                    {t(`hybrid.${step.key}.description`)}
                  </p>
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ━━━ PRODUCT SPOTLIGHT ━━━ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeInView direction="left" className="relative rounded-2xl overflow-hidden bg-bg-off-white p-6 lg:p-10">
                <Image
                  src="/images/machines/alphashot-pro-g2.avif"
                  alt="Alphashot Pro G2 — studio photo automatisé"
                  width={600}
                  height={500}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </FadeInView>

              <FadeInView direction="right" delay={0.15}>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent-gold bg-accent-gold/10 px-3 py-1.5 rounded-full">
                  {t('spotlight.badge')}
                </span>
                <h2 className="mt-4 text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight">
                  {t('spotlight.heading')}
                </h2>
                <p className="mt-4 text-lg text-neutral-medium leading-relaxed">
                  {t('spotlight.description')}
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

                <div className="mt-10">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-8 h-12 text-base font-semibold rounded-lg"
                  >
                    <Link href="/contact">{t('spotlight.cta')}</Link>
                  </Button>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* ━━━ INDUSTRIES ━━━ */}
        <section className="py-20 bg-bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
                {t('industries.heading')}
              </h2>
              <p className="mt-4 text-lg text-neutral-medium max-w-3xl mx-auto leading-relaxed">
                {t('industries.subtitle')}
              </p>
            </FadeInView>

            <StaggerContainer stagger={0.06} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {INDUSTRIES.map((industry) => (
                <StaggerItem key={industry.key}>
                <Link
                  key={industry.key}
                  href={industry.href}
                  className="group flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-very-peri-200"
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

        {/* ━━━ BLOG ━━━ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
                {t('blog.heading')}
              </h2>
              <p className="mt-4 text-lg text-neutral-medium max-w-3xl mx-auto leading-relaxed">
                {t('blog.description')}
              </p>
            </FadeInView>

            {articles.length > 0 ? (
              <StaggerContainer className="grid md:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <StaggerItem key={article.slug}>
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group bg-bg-off-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {article.image ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder
                        type="blog"
                        alt={article.title}
                        category={article.category}
                      />
                    )}
                    <div className="p-6">
                      {article.category && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary-orbitvu">
                          {article.category}
                        </span>
                      )}
                      <h3 className="mt-2 text-lg font-heading font-bold text-heading-dark group-hover:text-primary-orbitvu transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="mt-2 text-sm text-neutral-medium line-clamp-2">
                          {article.description}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center text-primary-orbitvu font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
                        {t('blog.readArticle')}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <p className="text-center text-neutral-medium">
                {t('blog.cta')}
              </p>
            )}

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-orbitvu font-semibold hover:text-very-peri-600 transition-colors"
              >
                {t('blog.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ FAQ (AEO) ━━━ */}
        <section className="py-20 bg-bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInView className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
                {t('faq.heading')}
              </h2>
            </FadeInView>

            <StaggerContainer stagger={0.08} className="max-w-3xl mx-auto space-y-3">
              {faqItems.map((faq, i) => (
                <StaggerItem key={i}>
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-future-dusk-0 overflow-hidden [&[open]]:shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-heading-dark font-heading font-semibold leading-snug group-hover:text-primary-orbitvu transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-neutral-medium flex-shrink-0 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-6 pb-6 text-neutral-medium leading-relaxed -mt-1">
                    {faq.answer}
                  </div>
                </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ━━━ FINAL CTA ━━━ */}
        <section className="py-20 bg-gradient-to-br from-future-dusk-900 via-very-peri-800 to-future-dusk-800 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          <FadeInView className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white">
              {t('finalCta.heading')}
            </h2>
            <p className="mt-4 text-lg text-future-dusk-200 max-w-2xl mx-auto leading-relaxed">
              {t('finalCta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-orbitvu hover:bg-very-peri-600 text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-very-peri-500/25"
              >
                <Link href="/contact">{t('finalCta.ctaPrimary')}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 px-8 h-12 text-base rounded-lg"
              >
                <Link href="/studios-photo-automatises">
                  {t('finalCta.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </FadeInView>
        </section>
      {/* Schema.org JSON-LD (AEO) */}
      <SchemaOrg
        schema={[
          organizationSchema(),
          websiteSchema(),
          faqSchema(faqItems),
        ]}
      />
    </>
  );
}
