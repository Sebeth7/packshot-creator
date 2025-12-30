import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import IntroSection from '@/components/sections/IntroSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import TailorMadeSection from '@/components/sections/TailorMadeSection';
import ClientLogos from '@/components/sections/ClientLogos';
import CTABox from '@/components/sections/CTABox';
import BlogGrid from '@/components/sections/BlogGrid';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'home.meta' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function HomePage() {
  // Images extraites de Webflow
  const heroImages = [
    {
      src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/672256fe5fe5600d4a325798_Main_page_hero_range%202.avif',
      alt: 'Gamme 2025 de studios photos automatisés Orbitvu'
    }
  ];

  const blogPosts = [
    {
      titleKey: 'blog.post1.title',
      categoryKey: 'blog.post1.category',
      date: '24/6/2025',
      imageSrc: 'https://cdn.prod.website-files.com/6683be0da77ea30e6c1e466d/685ab83168d9ec4a5b93ebac_1N2A9137.avif',
      imageAlt: "Comment l'IA et les lumières virtuelles révolutionnent le packshot ?",
      slug: '/blog/ia-lumieres-virtuelles'
    },
    {
      titleKey: 'blog.post2.title',
      categoryKey: 'blog.post2.category',
      date: '6/5/2025',
      imageSrc: 'https://cdn.prod.website-files.com/6683be0da77ea30e6c1e466d/681a148a2f962e366b1271b4_software.avif',
      imageAlt: 'Vous avez perdu votre logiciel PackshotCreator ou Ortery ?',
      slug: '/blog/recuperer-logiciel'
    },
    {
      titleKey: 'blog.post3.title',
      categoryKey: 'blog.post3.category',
      date: '28/3/2025',
      imageSrc: 'https://cdn.prod.website-files.com/6683be0da77ea30e6c1e466d/67b73285dfb98b34edde70c6_6788c6593c7472b6ff4f1484_AlpahshotXL_multi_camera_ring_pour_3D.avif',
      imageAlt: '5 appareils photo en simultané pour de l\'animation 3D réaliste',
      slug: '/blog/5-appareils-photo-3d'
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          titleKey="hero.title"
          subtitleKey="hero.subtitle"
          ctaKey="hero.cta"
          ctaHref="/contact"
          images={heroImages}
        />

        {/* Intro Section */}
        <IntroSection
          headingKey="intro.heading"
          text1Key="intro.text1"
          text2Key="intro.text2"
          ctaKey="intro.cta"
          ctaHref="/contact"
          bgColor="white"
        />

        {/* Orbitvu Section */}
        <ProductShowcase
          brandKey="orbitvu.brand"
          headingKey="orbitvu.heading"
          descriptionKey="orbitvu.description"
          featuresKeys={[
            'orbitvu.feature1',
            'orbitvu.feature2',
            'orbitvu.feature3',
            'orbitvu.feature4'
          ]}
          ctaKey="orbitvu.cta"
          ctaHref="/studio-photo"
          imageSrc="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751194e1_photo-studio-wine.avif"
          imageAlt="Solution automatisée pour la photo"
          imagePosition="left"
          bgColor="light-gray"
        />

        {/* ShotFlow Section */}
        <ProductShowcase
          brandKey="shotflow.brand"
          headingKey="shotflow.heading"
          descriptionKey="shotflow.description"
          featuresKeys={[
            'shotflow.feature1',
            'shotflow.feature2',
            'shotflow.feature3',
            'shotflow.feature4'
          ]}
          ctaKey="shotflow.cta"
          ctaHref="/shotflow"
          imageSrc="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/669a1f84b6606c529cbb61da_shotflow%201.webp"
          imageAlt="ShotFlow partenaire technologique e-commerce"
          imagePosition="right"
          bgColor="white"
        />

        {/* Tailor-Made Section */}
        <TailorMadeSection />

        {/* Client Logos */}
        <ClientLogos />

        {/* Alphashot CTA Box */}
        <CTABox
          headingKey="alphashot.heading"
          descriptionKey="alphashot.description"
          ctaKey="alphashot.cta"
          ctaHref="/contact"
          bgColor="light-gray"
        />

        {/* Blog Section */}
        <BlogGrid
          headingKey="blog.heading"
          descriptionKey="blog.description"
          posts={blogPosts}
          ctaKey="blog.cta"
          ctaHref="/blog"
        />
      </main>
      <Footer />
    </>
  );
}
