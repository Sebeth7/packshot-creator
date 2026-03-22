import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Camera, Sparkles, GraduationCap, ArrowRight, ChevronRight, RotateCcw, Shirt, Layout, Users, Truck, Headphones, Check, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';

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
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `https://www.packshot-creator.com/api/og?title=${encodeURIComponent(t('title'))}&type=product&lang=${lang}`, width: 1200, height: 630, alt: t('title') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function StudiosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'studiosHardware' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: lang === 'fr' ? 'Studios Photo Automatisés' : 'Automated Photo Studios', url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises` },
  ];

  const studioFaqs = (['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map((key) => ({
    question: t(`faqStudios.${key}.question`),
    answer: t(`faqStudios.${key}.answer`),
  }));

  const photoTypes = [
    { key: 'still' as const, icon: <Camera className="h-6 w-6" />, color: 'bg-very-peri-100 text-very-peri-700', borderColor: 'border-very-peri-200' },
    { key: 'threeSixty' as const, icon: <RotateCcw className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700', borderColor: 'border-amber-200' },
    { key: 'fashion' as const, icon: <Shirt className="h-6 w-6" />, color: 'bg-emerald-100 text-emerald-700', borderColor: 'border-emerald-200' },
    { key: 'flatlay' as const, icon: <Layout className="h-6 w-6" />, color: 'bg-rose-100 text-rose-700', borderColor: 'border-rose-200' },
  ];

  const supportSteps = [
    { key: 'step1' as const, icon: <Users className="h-6 w-6" />, number: '1' },
    { key: 'step2' as const, icon: <Truck className="h-6 w-6" />, number: '2' },
    { key: 'step3' as const, icon: <Headphones className="h-6 w-6" />, number: '3' },
  ];

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

  return (
    <>
      {/* 1. Hero */}
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

      {/* 2. Social Proof Bar */}
      <section className="py-6 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <p className="text-center text-sm font-medium text-future-dusk-500 mb-5">
              {t('socialProof.label')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-10">
              {clientLogos.map((logo) => (
                <div key={logo.name} className="h-7 flex items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image src={logo.src} alt={logo.name} width={logo.w} height={logo.h} className="h-full w-auto max-w-[85px] object-contain" loading="eager" />
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* 3. Three Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('threePillars.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('threePillars.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { key: 'capture', icon: <Camera className="h-6 w-6" />, image: '/images/illustrations/pillar-hardware.avif', color: 'bg-very-peri-100 text-very-peri-700' },
              { key: 'creation', icon: <Sparkles className="h-6 w-6" />, image: '/images/illustrations/pillar-ia.avif', color: 'bg-amber-100 text-amber-700' },
              { key: 'formation', icon: <GraduationCap className="h-6 w-6" />, image: '/images/illustrations/pillar-formation.avif', color: 'bg-emerald-100 text-emerald-700' },
            ].map((pillar) => (
              <StaggerItem key={pillar.key}>
                <div className="bg-neutral-50 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] relative">
                    <Image src={pillar.image} alt={t(`threePillars.${pillar.key}.title`)} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${pillar.color}`}>
                        {pillar.icon}
                      </span>
                      <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${pillar.color}`}>
                        {t(`threePillars.${pillar.key}.badge`)}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">
                      {t(`threePillars.${pillar.key}.title`)}
                    </h3>
                    <p className="text-sm text-future-dusk-500 leading-relaxed">
                      {t(`threePillars.${pillar.key}.description`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Photo Types */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('photoTypes.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('photoTypes.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {photoTypes.map((type) => (
              <StaggerItem key={type.key}>
                <div className={`bg-white rounded-2xl border ${type.borderColor} p-8 hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${type.color}`}>
                      {type.icon}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-future-dusk-900">
                      {t(`photoTypes.${type.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-future-dusk-600 leading-relaxed mb-5">
                    {t(`photoTypes.${type.key}.description`)}
                  </p>
                  <div className="space-y-2 mb-6">
                    {(['stat1', 'stat2', 'stat3'] as const).map((stat) => (
                      <div key={stat} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-very-peri-500 shrink-0" />
                        <span className="font-medium text-future-dusk-800">{t(`photoTypes.${type.key}.${stat}`)}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/studio-photo/selecteur-machines"
                    className="inline-flex items-center gap-1 text-sm font-medium text-very-peri-600 hover:text-very-peri-700 transition-colors"
                  >
                    {t(`photoTypes.${type.key}.cta`)} <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. System Selector */}
      <section id="studios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('products.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </FadeInView>
          <FadeInView delay={0.2}>
            <MachineSelector
              mode="display"
              showFilters={true}
              showPrices={false}
              locale={lang as 'fr' | 'en'}
            />
          </FadeInView>
        </div>
      </section>

      {/* 6. Accompaniment */}
      <section className="py-20 bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              {t('support.heading')}
            </h2>
            <p className="text-lg text-future-dusk-200 max-w-2xl mx-auto">
              {t('support.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {supportSteps.map((step) => (
              <StaggerItem key={step.key}>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-very-peri-500/20 text-very-peri-300">
                      {step.icon}
                    </span>
                    <span className="text-3xl font-heading font-bold text-very-peri-400/50">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {t(`support.${step.key}title`)}
                  </h3>
                  <p className="text-future-dusk-300 leading-relaxed">
                    {t(`support.${step.key}description`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 7. ROI Teaser */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <div className="relative bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-very-peri-100 rounded-bl-[80px] opacity-50" />
              <div className="relative">
                <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-very-peri-100 text-very-peri-600 mb-6">
                  <Calculator className="h-7 w-7" />
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mb-4">
                  {t('roiTeaser.heading')}
                </h2>
                <p className="text-future-dusk-500 max-w-xl mx-auto mb-6 leading-relaxed">
                  {t('roiTeaser.subtitle')}
                </p>
                <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                  <Link href="/calculateur-roi">
                    {t('roiTeaser.cta')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-4 text-sm font-medium text-very-peri-600">
                  {t('roiTeaser.stat')}
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInView className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900">
                {t('faqStudios.heading')}
              </h2>
            </FadeInView>
            <StaggerContainer className="space-y-4">
              {(['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const).map((key) => (
                <StaggerItem key={key}>
                  <details className="group bg-neutral-50 rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors">
                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-semibold text-future-dusk-900 text-left">
                        {t(`faqStudios.${key}.question`)}
                      </h3>
                      <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-future-dusk-600 leading-relaxed">{t(`faqStudios.${key}.answer`)}</p>
                    </div>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-20 bg-future-dusk-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              {t('finalCta.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-gradient-to-br from-very-peri-600 to-very-peri-700 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-very-peri-100 mb-6">{t('finalCta.demo.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold">
                  <Link href="/contact">{t('finalCta.demo.cta')}</Link>
                </Button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-future-dusk-800 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.guide.heading')}</h3>
                <p className="text-future-dusk-300 mb-6">{t('finalCta.guide.description')}</p>
                <Button asChild className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/blog">{t('finalCta.guide.cta')}</Link>
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 10. Cross-Links (Maillage) */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-future-dusk-900">
              {t('crossLinks.heading')}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { key: 'ia', href: '/ia-photo-produit', icon: <Sparkles className="h-5 w-5" /> },
              { key: 'industrie', href: '/industrie', icon: <Layout className="h-5 w-5" /> },
              { key: 'academy', href: '/academy', icon: <GraduationCap className="h-5 w-5" /> },
            ].map((link) => (
              <StaggerItem key={link.key}>
                <Link href={link.href} className="group block bg-white rounded-xl border border-neutral-200 p-6 hover:border-very-peri-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-very-peri-100 text-very-peri-600 group-hover:bg-very-peri-200 transition-colors">
                      {link.icon}
                    </span>
                    <h3 className="font-semibold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                      {t(`crossLinks.${link.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">
                    {t(`crossLinks.${link.key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-very-peri-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === 'fr' ? 'Découvrir' : 'Discover'} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(studioFaqs)]} />
    </>
  );
}
