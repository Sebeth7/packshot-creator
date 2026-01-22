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
          useSectionColor={true}
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

        {/* Section Ressources & Guides */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-4 text-neutral-dark">
              Ressources & Guides IA Photo Produit
            </h2>
            <p className="text-lg text-neutral-medium text-center mb-12 max-w-3xl mx-auto">
              Découvrez nos comparatifs détaillés pour choisir la meilleure IA photo produit selon vos besoins.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Article 1 */}
              <Link
                href="/blog/blendai-vs-photoroom"
                className="group bg-neutral-lighter rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                  <span className="text-white text-5xl">🤖</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2 group-hover:text-purple-600 transition-colors">
                    BlendAI vs Photoroom
                  </h3>
                  <p className="text-neutral-medium text-sm mb-4">
                    Comparatif complet : précision détourage, batch processing, intégration workflow. BlendAI pour pro, Photoroom pour TPE.
                  </p>
                  <span className="text-purple-600 font-semibold text-sm group-hover:translate-x-2 inline-block transition-transform duration-300">
                    Lire le comparatif →
                  </span>
                </div>
              </Link>

              {/* Article 2 */}
              <Link
                href="/blog/blendai-vs-flair"
                className="group bg-neutral-lighter rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                  <span className="text-white text-5xl">✨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2 group-hover:text-purple-600 transition-colors">
                    BlendAI vs Flair.ai
                  </h3>
                  <p className="text-neutral-medium text-sm mb-4">
                    Deux approches complémentaires : BlendAI pour catalogues e-commerce (fidélité produit), Flair pour campagnes marketing (créativité).
                  </p>
                  <span className="text-purple-600 font-semibold text-sm group-hover:translate-x-2 inline-block transition-transform duration-300">
                    Lire le comparatif →
                  </span>
                </div>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Link href="/blog/ia-photo-produit-guide-2026">
                  Guide Complet IA Photo Produit 2026 →
                </Link>
              </Button>
            </div>
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
                useSectionColor={true}
              />

              {/* CTA Demo IA + Studio */}
              <CTABox
                headingKey="finalCta.demo.heading"
                descriptionKey="finalCta.demo.description"
                ctaKey="finalCta.demo.cta"
                ctaHref="/contact/demande-demo"
                bgColor="white"
                namespace="iaPhotoProduit"
                useSectionColor={true}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
