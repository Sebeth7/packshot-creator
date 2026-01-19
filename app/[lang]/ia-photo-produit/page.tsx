import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import IAManifesteSection from '@/components/sections/IAManifesteSection';
import AIFeaturesGrid from '@/components/sections/AIFeaturesGrid';
import ClientLogos from '@/components/sections/ClientLogos';
import CTABox from '@/components/sections/CTABox';
import { BadgeIAReady } from '@/components/shared/Badge';
import { BeforeAfterGrid, BeforeAfterCase } from '@/components/shared/BeforeAfter';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

// Before/After Cases Data (Placeholder images for P0)
const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    before: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Packshot studio bijou sur fond blanc',
    },
    after: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Bijou en mise en scène lifestyle BlendAI',
    },
    title: 'Bijou : Packshot → Lifestyle',
    description: 'Transformation automatique en 30 secondes',
    sector: 'Bijouterie',
  },
  {
    before: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Packshot studio produit mode fond blanc',
    },
    after: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Produit mode en contexte lifestyle BlendAI',
    },
    title: 'Mode : Background Professionnel',
    description: 'Génération arrière-plan adapté en 1 clic',
    sector: 'Mode & Textile',
  },
  {
    before: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Packshot studio cosmétique brut',
    },
    after: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Cosmétique retouché et optimisé BlendAI',
    },
    title: 'Cosmétique : Retouche IA',
    description: 'Suppression défauts et optimisation couleurs',
    sector: 'Cosmétique',
  },
  {
    before: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'Packshot studio high-tech',
    },
    after: {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
      alt: 'High-tech en environnement lifestyle',
    },
    title: 'High-Tech : Contexte Lifestyle',
    description: 'Mise en situation réaliste automatique',
    sector: 'High-Tech',
  },
];

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: 'iaPhotoProduit.meta'
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      images: ['/og-image-ia.jpg'],
    },
  };
}

export default async function IAPhotoProduitPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: 'iaPhotoProduit'
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          variant="ia"
          titleKey="hero.title"
          subtitleKey="hero.subtitle"
          ctaKey="hero.ctaPrimary"
          ctaHref="/blendai"
          ctaSecondaryKey="hero.ctaSecondary"
          ctaSecondaryHref="/blog/ia-photo-produit-guide-2026"
          badges={[
            <BadgeIAReady key="badge">
              IA Spécialisée Packshot
            </BadgeIAReady>
          ]}
          namespace="iaPhotoProduit"
        />

        {/* Section Manifeste IA */}
        <IAManifesteSection />

        {/* Section 4 Fonctionnalités IA */}
        <AIFeaturesGrid />

        {/* Section Cas d'Usage Avant/Après */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
                {t('casUsage.heading')}
              </h2>
              <p className="text-lg text-neutral-medium">
                {t('casUsage.subtitle')}
              </p>
            </div>

            <BeforeAfterGrid cases={BEFORE_AFTER_CASES} columns={2} />
          </div>
        </section>

        {/* Section Compatible avec Votre Studio */}
        <section className="py-20 bg-gradient-to-br from-secondary-orbitvu/5 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
                {t('compatible.heading')}
              </h2>
              <p className="text-xl text-neutral-medium mb-8">
                {t('compatible.subtitle')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-heading font-bold text-neutral-dark mb-2">
                  {t('compatible.feature1')}
                </h3>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-heading font-bold text-neutral-dark mb-2">
                  {t('compatible.feature2')}
                </h3>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-heading font-bold text-neutral-dark mb-2">
                  {t('compatible.feature3')}
                </h3>
              </div>
            </div>

            {/* Cross-sell Offer */}
            <div className="bg-gradient-to-r from-secondary-orbitvu to-purple-600 rounded-2xl p-8 text-center text-white">
              <p className="text-2xl font-heading font-bold mb-4">
                🎁 {t('compatible.offer')}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-secondary-orbitvu hover:bg-neutral-lighter"
              >
                <Link href="/studios-photo-automatises">
                  Découvrir nos studios
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section Comparatifs IA */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
              {t('comparatifs.heading')}
            </h2>
            <p className="text-lg text-neutral-medium mb-8">
              {t('comparatifs.subtitle')}
            </p>

            <div className="bg-neutral-lighter rounded-xl p-8 mb-8">
              <p className="text-neutral-medium mb-6">
                Articles de comparaison disponibles prochainement :
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="text-neutral-dark font-semibold">
                  BlendAI vs Photoroom
                </span>
                <span className="hidden sm:inline text-neutral-medium">•</span>
                <span className="text-neutral-dark font-semibold">
                  BlendAI vs Flair AI
                </span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              <Link href="/blog/ia-photo-produit-guide-2026">
                {t('comparatifs.cta')}
              </Link>
            </Button>
          </div>
        </section>

        {/* Section Références Clients */}
        <ClientLogos />

        {/* Section CTAs Finales */}
        <section className="py-20 bg-neutral-lighter">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* CTA Test BlendAI */}
              <CTABox
                headingKey="finalCta.test.heading"
                descriptionKey="finalCta.test.description"
                ctaKey="finalCta.test.cta"
                ctaHref="/blendai"
                bgColor="white"
                namespace="iaPhotoProduit"
              />

              {/* CTA Demo IA + Studio */}
              <CTABox
                headingKey="finalCta.demo.heading"
                descriptionKey="finalCta.demo.description"
                ctaKey="finalCta.demo.cta"
                ctaHref="/contact/demande-demo"
                bgColor="white"
                namespace="iaPhotoProduit"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
