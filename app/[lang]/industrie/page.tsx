import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Factory, Zap, TrendingUp, Target, Camera, Sparkles, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import SectorGrid, { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'fr'
      ? 'Solutions Photo Produit par Industrie | Studios Automatisés & IA'
      : 'Product Photography Solutions by Industry | Automated Studios & AI',
    description: lang === 'fr'
      ? 'Solutions packshot et IA photo produit par industrie : chaussures, bijoux, mobilier, food, cosmétiques, mode, électronique. Studios Orbitvu + BlendAI.'
      : 'Packshot and AI product photography solutions by industry: shoes, jewelry, furniture, food, cosmetics, fashion, electronics. Orbitvu + BlendAI.',
    keywords: lang === 'fr'
      ? 'photo produit industrie, packshot secteur, studio photo automatisé, IA lifestyle, chaussures, bijoux, mobilier, food, cosmétiques'
      : 'product photography industry, sector packshot, automated photo studio, AI lifestyle, shoes, jewelry, furniture, food, cosmetics',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie`,
      languages: { fr: '/fr/industrie', en: '/en/industrie' },
    },
    openGraph: {
      title: lang === 'fr'
        ? 'Solutions Photo Produit par Industrie | Studios Automatises & IA'
        : 'Product Photography Solutions by Industry | Automated Studios & AI',
      description: lang === 'fr'
        ? 'Solutions packshot et IA photo produit adaptees a votre industrie. Studios Orbitvu + BlendAI.'
        : 'Packshot and AI product photography solutions for your industry. Orbitvu Studios + BlendAI.',
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/industrie`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: 'https://www.packshot-creator.com/og/default.jpg', width: 1200, height: 630, alt: 'Solutions par industrie' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'fr'
        ? 'Solutions Photo Produit par Industrie'
        : 'Product Photography Solutions by Industry',
      images: ['https://www.packshot-creator.com/og/default.jpg'],
    },
  };
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Industries', url: `https://www.packshot-creator.com/${lang}/industrie` },
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: isFr ? 'Production Accélérée' : 'Accelerated Production',
      description: isFr
        ? '50-300 produits/jour en studio automatisé. 100-500 visuels lifestyle/jour via IA. Délais réduits de 70-90%.'
        : '50-300 products/day in automated studio. 100-500 lifestyle visuals/day via AI. Timelines reduced by 70-90%.',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: isFr ? 'ROI Rapide' : 'Fast ROI',
      description: isFr
        ? 'Retour sur investissement 12-18 mois. Réduction coûts photo 60-85%. Idéal pour catalogues 100 à 5000+ références.'
        : 'Return on investment 12-18 months. Photo cost reduction 60-85%. Ideal for catalogs with 100 to 5000+ references.',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: isFr ? 'Cohérence Absolue' : 'Absolute Consistency',
      description: isFr
        ? 'Même qualité sur tout le catalogue. Éclairage, angles et ambiances identiques. Renforce l\'identité de marque.'
        : 'Same quality across the entire catalog. Identical lighting, angles and ambiances. Strengthens brand identity.',
      color: 'bg-very-peri-100 text-very-peri-700',
    },
  ];

  const workflowSteps = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: isFr ? 'Capture Packshot Automatisée' : 'Automated Packshot Capture',
      description: isFr
        ? 'Studios Orbitvu : packshot fond blanc haute résolution, 360° optionnel, détourage automatique.'
        : 'Orbitvu Studios: high-resolution white background packshot, optional 360°, automatic clipping.',
      color: 'bg-very-peri-600',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: isFr ? 'Génération Lifestyle IA' : 'AI Lifestyle Generation',
      description: isFr
        ? 'BlendAI : transformez packshots en visuels lifestyle. Personnalisation ADN marque. Production série rapide.'
        : 'BlendAI: transform packshots into lifestyle visuals. Brand DNA customization. Fast series production.',
      color: 'bg-amber-500',
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: isFr ? 'Diffusion Multi-Canal' : 'Multi-Channel Distribution',
      description: isFr
        ? 'Export formats optimisés e-commerce, marketplaces, réseaux sociaux, print.'
        : 'Export formats optimized for e-commerce, marketplaces, social media, print.',
      color: 'bg-emerald-600',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView direction="left">
              <div className="inline-flex items-center gap-2 bg-very-peri-500/15 text-very-peri-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Factory className="h-4 w-4" />
                {isFr ? '14 secteurs couverts' : '14 sectors covered'}
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {isFr
                  ? 'Solutions Photo Produit par Industrie'
                  : 'Product Photography Solutions by Industry'}
              </h1>
              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {isFr
                  ? 'Chaque industrie a ses défis photo produit : reflets, matières, volumes, lifestyle. Découvrez nos solutions packshot et IA personnalisées.'
                  : 'Every industry has its product photo challenges: reflections, materials, volumes, lifestyle. Discover our personalized packshot and AI solutions.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                  <Link href="/contact">{isFr ? 'Demander une démo' : 'Request a demo'}</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <a href="#secteurs">{isFr ? 'Voir les 14 secteurs' : 'View all 14 sectors'}</a>
                </Button>
              </div>
            </FadeInView>
            <FadeInView direction="right" delay={0.2}>
              <div className="relative">
                <Image
                  src="/images/hero/hero-industries.avif"
                  alt={isFr ? 'Solutions photo produit par industrie' : 'Product photo solutions by industry'}
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

      {/* 12 Sectors Grid */}
      <section id="secteurs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? '12 Secteurs d\'Activité Couverts' : '12 Industry Sectors Covered'}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {isFr
                ? 'De la chaussure à la joaillerie, du mobilier à l\'électronique : solutions professionnelles pour tous les secteurs.'
                : 'From shoes to jewelry, furniture to electronics: professional solutions for every sector.'}
            </p>
          </FadeInView>
          <SectorGrid sectors={DEFAULT_SECTORS} columns={4} />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? 'Avantages pour Toutes les Industries' : 'Benefits for All Industries'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${benefit.color} mb-4`}>
                    {benefit.icon}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-future-dusk-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? 'Workflow : Packshot → IA → Diffusion' : 'Workflow: Packshot → AI → Distribution'}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {isFr
                ? 'Le processus standard pour tous les secteurs : capture packshot haute qualité, puis génération lifestyle IA.'
                : 'The standard process for all sectors: high-quality packshot capture, then AI lifestyle generation.'}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {workflowSteps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${step.color} text-white mx-auto mb-6`}>
                    {step.icon}
                  </div>
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-bold text-future-dusk-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-future-dusk-900 to-very-peri-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-future-dusk-800/50 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {isFr ? 'Votre secteur nécessite une solution spécifique ?' : 'Need a sector-specific solution?'}
                </h3>
                <p className="text-future-dusk-300 mb-6">
                  {isFr
                    ? 'Contactez-nous pour une analyse personnalisée de vos besoins photo produit. Devis studios Orbitvu + formation BlendAI gratuite.'
                    : 'Contact us for a personalized analysis of your product photo needs. Free Orbitvu studios + BlendAI training quote.'}
                </p>
                <Button asChild className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl">
                  <Link href="/contact">
                    {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-future-dusk-800/50 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {isFr ? 'Voir les solutions en action' : 'See solutions in action'}
                </h3>
                <p className="text-future-dusk-300 mb-6">
                  {isFr
                    ? 'Réservez une démo personnalisée : tests packshot avec vos produits + exemples IA lifestyle adaptés à votre secteur.'
                    : 'Book a personalized demo: packshot tests with your products + AI lifestyle examples for your sector.'}
                </p>
                <Button asChild className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/contact">
                    {isFr ? 'Réserver une démo' : 'Book a demo'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
