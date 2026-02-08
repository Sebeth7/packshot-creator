import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Sparkles, Wand2, ImageIcon, Paintbrush, Layers, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

const FEATURES = [
  { key: 'lifestyle', icon: <ImageIcon className="h-6 w-6" />, color: 'bg-pink-100 text-pink-700' },
  { key: 'background', icon: <Wand2 className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700' },
  { key: 'retouche', icon: <Paintbrush className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700' },
  { key: 'batch', icon: <Layers className="h-6 w-6" />, color: 'bg-emerald-100 text-emerald-700' },
];

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
      images: [{ url: 'https://www.packshot-creator.com/og/default.jpg', width: 1200, height: 630, alt: 'IA Photo Produit BlendAI' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('ogDescription'),
      images: ['https://www.packshot-creator.com/og/default.jpg'],
    },
  };
}

export default async function IAPhotoProduitPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'iaPhotoProduit' });

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'IA Photo Produit', url: `https://www.packshot-creator.com/${lang}/ia-photo-produit` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-[#2d1b4e] to-very-peri-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-very-peri-400 blur-[120px]" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-pink-400 blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <div className="inline-flex items-center gap-2 bg-very-peri-500/20 text-very-peri-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                BlendAI Technology
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
                  <Link href="/blog">{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
            </FadeInView>
            <FadeInView direction="right" delay={0.2}>
              <Image
                src="/images/illustrations/pillar-ia.avif"
                alt="IA Photo Produit BlendAI"
                width={640}
                height={480}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Manifeste */}
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
                <div className="relative bg-neutral-50 rounded-2xl p-8 text-center">
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

      {/* Features */}
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
                <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
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

      {/* Before/After Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {t('casUsage.heading')}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {t('casUsage.subtitle')}
            </p>
          </FadeInView>
          <StaggerContainer stagger={0.2} className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-neutral-50 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image src="/images/demo/bouteille-vin.avif" alt="Packshot avant IA" fill className="object-contain p-6" />
                </div>
                <div className="p-4 text-center text-sm font-medium text-future-dusk-600">Packshot Original</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-neutral-50 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image src="/images/illustrations/ia-feature-background-generator.avif" alt="Résultat après IA" fill className="object-cover" />
                </div>
                <div className="p-4 text-center text-sm font-medium text-future-dusk-600">Lifestyle IA</div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Compatible Studios */}
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
                  {lang === 'fr' ? 'Découvrir nos studios' : 'Discover our studios'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </FadeInView>
            <FadeInView direction="right" delay={0.15}>
              <Image
                src="/images/illustrations/ia-feature-integration.avif"
                alt="Intégration studio IA"
                width={560}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-future-dusk-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-gradient-to-br from-very-peri-700 to-very-peri-800 rounded-2xl p-8">
                <Sparkles className="h-8 w-8 text-very-peri-300 mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.test.heading')}</h3>
                <p className="text-very-peri-200 mb-6">{t('finalCta.test.description')}</p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl">
                  <Link href="/contact">{t('finalCta.test.cta')}</Link>
                </Button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-future-dusk-800 rounded-2xl p-8">
                <Wand2 className="h-8 w-8 text-amber-400 mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">{t('finalCta.demo.heading')}</h3>
                <p className="text-future-dusk-300 mb-6">{t('finalCta.demo.description')}</p>
                <Button asChild className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/contact">{t('finalCta.demo.cta')}</Link>
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
