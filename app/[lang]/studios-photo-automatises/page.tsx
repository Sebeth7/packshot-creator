import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Camera, Sparkles, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { ROICalculator } from '@/components/calculators/ROICalculator';

const MACHINES = [
  { slug: 'alphashot-pro-g2', image: '/images/machines/alphashot-pro-g2.avif', size: 'Moyen', badge: 'Best-seller' },
  { slug: 'alphashot-xl', image: '/images/machines/alphashot-xl.avif', size: 'Grand', badge: null },
  { slug: 'alphashot-360', image: '/images/machines/alphashot-360.avif', size: 'Moyen', badge: '360°' },
  { slug: 'alphashot-micro-v2', image: '/images/machines/alphashot-micro-v2.avif', size: 'Petit', badge: 'Compact' },
  { slug: 'fashion-studio', image: '/images/machines/fashion-studio.avif', size: 'Grand', badge: 'Mode' },
  { slug: 'furniture-studio', image: '/images/machines/furniture-studio.avif', size: 'Très grand', badge: 'XXL' },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'studiosHardware.meta' });
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/studios-photo-automatises`,
      languages: { fr: '/fr/studios-photo-automatises', en: '/en/studios-photo-automatises' },
    },
  };
}

export default async function StudiosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'studiosHardware' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: t('hero.title').split(':')[0].trim(), url: `https://packshot-creator.com/${lang}/studios-photo-automatises` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Camera className="h-4 w-4" />
                Orbitvu Official Partner
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                  <Link href="/contact">{t('hero.ctaPrimary')}</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/studio-photo/selecteur-machines">{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
            </FadeInView>
            <FadeInView direction="right" delay={0.2}>
              <div className="relative">
                <Image
                  src="/images/hero/hero-studios-wide.avif"
                  alt="Studios photo automatisés Orbitvu"
                  width={640}
                  height={480}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
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

      {/* Product Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('products.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MACHINES.map((machine) => (
              <StaggerItem key={machine.slug}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="aspect-[4/3] relative bg-neutral-100">
                    <Image
                      src={machine.image}
                      alt={machine.slug.replace(/-/g, ' ')}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    {machine.badge && (
                      <span className="absolute top-3 right-3 bg-very-peri-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {machine.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 capitalize mb-1">
                      {machine.slug.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-sm text-future-dusk-400 mb-3">{machine.size}</p>
                    <Link
                      href={`/studio-photo/${machine.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-very-peri-600 hover:text-very-peri-700 transition-colors"
                    >
                      {t('products.ctaText')} <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/studio-photo/selecteur-machines">
                {t('products.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Calculateur ROI */}
      <section id="calculateur-roi" className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('roiCalculator.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('roiCalculator.subtitle')}
            </p>
          </FadeInView>
          <FadeInView delay={0.2}>
            <ROICalculator locale={lang as 'fr' | 'en'} />
          </FadeInView>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-future-dusk-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-future-dusk-800 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-future-dusk-300 mb-6">{t('finalCta.demo.description')}</p>
                <Button asChild className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl">
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

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
