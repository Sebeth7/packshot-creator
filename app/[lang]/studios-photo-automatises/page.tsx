import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ThreePillarsSection from '@/components/sections/ThreePillarsSection';
import ProductGrid, { Product } from '@/components/shared/ProductGrid';
import SectorGrid, { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { ROICalculator, MachineSelectionTool } from '@/components/shared/EmbedFrame';
import ClientLogos from '@/components/sections/ClientLogos';
import CTABox from '@/components/sections/CTABox';
import { BadgeDistributor } from '@/components/shared/Badge';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

// Featured Products Data
const FEATURED_PRODUCTS: Product[] = [
  {
    slug: 'alphashot-g2',
    name: 'AlphaShot G2',
    description: 'Studio photo professionnel pour packshots haute qualité avec éclairage intelligent',
    price: 'À partir de 15 000€',
    image: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
    imageAlt: 'Studio photo Orbitvu AlphaShot G2 pour packshots professionnels',
    isIAReady: true,
  },
  {
    slug: 'alphashot-micro',
    name: 'AlphaShot Micro',
    description: 'Compact et puissant pour bijoux, montres et petits objets de luxe',
    price: 'À partir de 8 000€',
    image: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
    imageAlt: 'Studio photo Orbitvu AlphaShot Micro pour bijoux et petits objets',
    isIAReady: true,
  },
  {
    slug: 'alphashot-360',
    name: 'AlphaShot 360',
    description: 'Capture de vues 360° automatisées pour e-commerce et catalogues interactifs',
    price: 'À partir de 20 000€',
    image: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif',
    imageAlt: 'Studio photo Orbitvu AlphaShot 360 pour vues 360 degrés',
    isIAReady: true,
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
    namespace: 'studiosHardware.meta'
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/og-image-hardware.jpg'],
    },
  };
}

export default async function StudiosPhotoAutomatisesPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: 'studiosHardware'
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          variant="hardware"
          titleKey="hero.title"
          subtitleKey="hero.subtitle"
          ctaKey="hero.ctaPrimary"
          ctaHref="/studios-photo-automatises#calculateur-roi"
          ctaSecondaryKey="hero.ctaSecondary"
          ctaSecondaryHref="/studios-photo-automatises#outil-selection"
          badges={[
            <BadgeDistributor key="badge">
              Distributeur exclusif Orbitvu FR & CH
            </BadgeDistributor>
          ]}
          namespace="studiosHardware"
          images={[
            {
              src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/672256fe5fe5600d4a325798_Main_page_hero_range%202.avif',
              alt: 'Gamme studios photo automatisés Orbitvu 2025'
            }
          ]}
        />

        {/* Section Approche HYBRIDE */}
        <ThreePillarsSection />

        {/* Section Nos Studios Photo */}
        <section className="py-20 bg-neutral-lighter">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
                {t('products.heading')}
              </h2>
              <p className="text-lg text-neutral-medium">
                {t('products.subtitle')}
              </p>
            </div>

            <ProductGrid
              products={FEATURED_PRODUCTS}
              columns={3}
              showPrice={true}
              ctaText={t('products.ctaText')}
            />

            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary-turquoise text-primary-turquoise hover:bg-primary-turquoise hover:text-white"
              >
                <Link href="/studio-photo">
                  {t('products.viewAll')}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section Calculateur ROI */}
        <section id="calculateur-roi" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-4 text-neutral-dark">
              {t('roiCalculator.heading')}
            </h2>
            <p className="text-lg text-neutral-medium text-center mb-12">
              {t('roiCalculator.subtitle')}
            </p>

            <ROICalculator className="shadow-2xl" />
          </div>
        </section>

        {/* Section Outil Sélection Machine */}
        <section id="outil-selection" className="py-20 bg-neutral-lighter">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-4 text-neutral-dark">
              {t('machineSelection.heading')}
            </h2>
            <p className="text-lg text-neutral-medium text-center mb-12">
              {t('machineSelection.subtitle')}
            </p>

            <MachineSelectionTool className="shadow-2xl" />
          </div>
        </section>

        {/* Section 12 Secteurs Servis */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-12 text-neutral-dark">
              {t('sectors.heading')}
            </h2>

            <SectorGrid
              sectors={DEFAULT_SECTORS}
              columns={4}
            />
          </div>
        </section>

        {/* Section Références Clients */}
        <ClientLogos />

        {/* Section CTAs Finales */}
        <section className="py-20 bg-neutral-lighter">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* CTA Demo */}
              <CTABox
                headingKey="finalCta.demo.heading"
                descriptionKey="finalCta.demo.description"
                ctaKey="finalCta.demo.cta"
                ctaHref="/contact/demande-demo"
                bgColor="white"
                namespace="studiosHardware"
              />

              {/* CTA Guide */}
              <CTABox
                headingKey="finalCta.guide.heading"
                descriptionKey="finalCta.guide.description"
                ctaKey="finalCta.guide.cta"
                ctaHref="/guide/guide-achat-2026"
                bgColor="white"
                namespace="studiosHardware"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
