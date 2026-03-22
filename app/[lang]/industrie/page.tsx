import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Metadata } from 'next';
import { Factory, Zap, TrendingUp, Target, Camera, Sparkles, Send, ArrowRight, ChevronRight, Quote, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import SectorGrid, { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'fr'
      ? 'Solutions Photo Produit par Industrie | Studios Automatisés & IA'
      : 'Product Photography Solutions by Industry | Automated Studios & AI',
    description: lang === 'fr'
      ? 'Solutions packshot et IA photo produit pour 14 secteurs : chaussures, bijoux, mobilier, food, cosmétiques, mode, électronique, industrie, défense. Studios Orbitvu + BlendAI.'
      : 'Packshot and AI product photography solutions for 14 industries: shoes, jewelry, furniture, food, cosmetics, fashion, electronics, manufacturing, defense. Orbitvu + BlendAI.',
    keywords: lang === 'fr'
      ? 'photo produit industrie, packshot secteur, studio photo automatisé, IA lifestyle, chaussures, bijoux, mobilier, food, cosmétiques'
      : 'product photography industry, sector packshot, automated photo studio, AI lifestyle, shoes, jewelry, furniture, food, cosmetics',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie`,
      languages: { fr: '/fr/industrie', en: '/en/industrie' },
    },
    openGraph: {
      title: lang === 'fr'
        ? 'Solutions Photo Produit par Industrie | Studios Automatisés & IA'
        : 'Product Photography Solutions by Industry | Automated Studios & AI',
      description: lang === 'fr'
        ? 'Solutions packshot et IA photo produit adaptées à 14 secteurs. Studios Orbitvu + BlendAI.'
        : 'Packshot and AI product photography solutions for 14 industries. Orbitvu Studios + BlendAI.',
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/industrie`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      images: [{ url: `/api/og?title=${encodeURIComponent(lang === 'fr' ? 'Solutions Photo Produit par Industrie' : 'Product Photography Solutions by Industry')}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: lang === 'fr'
        ? 'Solutions Photo Produit par Industrie'
        : 'Product Photography Solutions by Industry',
      images: [`/api/og?title=${encodeURIComponent(lang === 'fr' ? 'Solutions Photo Produit par Industrie' : 'Product Photography Solutions by Industry')}&type=page&lang=${lang}`],
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
        ? 'Systèmes Orbitvu : packshot fond blanc haute résolution, 360° optionnel, détourage automatique.'
        : 'Orbitvu systems: high-resolution white background packshot, optional 360°, automatic clipping.',
      color: 'bg-very-peri-600',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: isFr ? 'Génération Lifestyle IA' : 'AI Lifestyle Generation',
      description: isFr
        ? 'BlendAI.studio : transformez packshots en visuels lifestyle. Personnalisation ADN marque. Production série rapide.'
        : 'BlendAI.studio: transform packshots into lifestyle visuals. Brand DNA customization. Fast series production.',
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

  const caseStudies = [
    {
      sector: isFr ? 'Chaussures' : 'Footwear',
      client: isFr ? 'Marque sneakers — 250 SKUs/saison' : 'Sneaker brand — 250 SKUs/season',
      result: isFr ? 'Délais de 3 semaines → 48h. Budget photo -70%.' : 'Timelines from 3 weeks → 48h. Photo budget -70%.',
      color: 'border-very-peri-200 bg-very-peri-50/50',
    },
    {
      sector: isFr ? 'Cosmétiques' : 'Cosmetics',
      client: isFr ? 'Marque bio — 120 SKUs' : 'Organic brand — 120 SKUs',
      result: isFr ? 'Conversion e-commerce +40%. 3 visuels lifestyle IA/produit.' : 'E-commerce conversion +40%. 3 AI lifestyle visuals/product.',
      color: 'border-amber-200 bg-amber-50/50',
    },
    {
      sector: isFr ? 'Industrie' : 'Manufacturing',
      client: isFr ? 'Fabricant équipements — 3000 références' : 'Equipment manufacturer — 3,000 references',
      result: isFr ? 'Catalogue complet en 4 semaines (vs 4 mois). Erreurs commande -40%.' : 'Full catalog in 4 weeks (vs 4 months). Order errors -40%.',
      color: 'border-emerald-200 bg-emerald-50/50',
    },
    {
      sector: isFr ? 'Mode' : 'Fashion',
      client: isFr ? 'Marque vêtements — 400 SKUs/saison' : 'Clothing brand — 400 SKUs/season',
      result: isFr ? 'Délais -75%. Taux de retour -15% grâce aux visuels portés IA.' : 'Timelines -75%. Return rate -15% thanks to AI worn visuals.',
      color: 'border-rose-200 bg-rose-50/50',
    },
  ];

  const faqs = isFr ? [
    {
      question: 'PackshotCreator intervient-il dans mon secteur ?',
      answer: 'Oui. Nous accompagnons 14 secteurs : chaussures, bijoux, mobilier, food, cosmétiques, mode, électronique, pièces techniques, automobile, jouets, sport, santé, industrie manufacturière et défense. Chaque secteur a ses contraintes spécifiques (reflets, matières, conformité) et nous y répondons avec des solutions studio + IA adaptées.',
    },
    {
      question: 'Quel volume minimum pour justifier un studio automatisé ?',
      answer: 'À partir de 100 produits/an, un studio automatisé commence à être plus rentable qu\'un prestataire externe. Le ROI est significatif dès 500 produits/an. Pour les catalogues de 1000+ références, le gain est considérable : délais réduits de 70-90% et coûts photo en baisse de 60-85%.',
    },
    {
      question: 'L\'IA lifestyle fonctionne-t-elle pour tous les types de produits ?',
      answer: 'BlendAI.studio fonctionne avec tous les types de produits photographiés en studio Orbitvu : objets, vêtements, mobilier, alimentation, cosmétiques... L\'IA part d\'un packshot de qualité studio pour générer des mises en scène fidèles au produit, avec des styles personnalisables par secteur.',
    },
    {
      question: 'Proposez-vous des solutions pour les environnements réglementés ?',
      answer: 'Oui. Pour la santé/médical et la défense, nous déployons des studios sur site sécurisé avec traçabilité complète. Les visuels sont conformes aux exigences CE, ISO et réglementaires de chaque secteur. Zéro donnée externalisée.',
    },
    {
      question: 'Comment se passe le déploiement dans mon entreprise ?',
      answer: 'En 3 étapes : (1) Analyse de vos besoins et recommandation du système adapté, (2) Livraison, installation et formation certifiée Qualiopi de vos équipes, (3) Support continu avec hotline dédiée. Comptez 2 à 4 semaines entre la commande et la mise en production.',
    },
  ] : [
    {
      question: 'Does PackshotCreator work with my industry?',
      answer: 'Yes. We serve 14 sectors: footwear, jewelry, furniture, food, cosmetics, fashion, electronics, technical parts, automotive, toys, sports, healthcare, manufacturing and defense. Each sector has specific constraints (reflections, materials, compliance) and we address them with tailored studio + AI solutions.',
    },
    {
      question: 'What minimum volume justifies an automated studio?',
      answer: 'From 100 products/year, an automated studio starts being more cost-effective than external providers. ROI becomes significant at 500+ products/year. For catalogs with 1,000+ references, the gain is substantial: timelines reduced by 70-90% and photo costs down 60-85%.',
    },
    {
      question: 'Does AI lifestyle work for all product types?',
      answer: 'BlendAI.studio works with all product types photographed in Orbitvu studios: objects, clothing, furniture, food, cosmetics... AI starts from a studio-quality packshot to generate product-faithful scenes, with sector-customizable styles.',
    },
    {
      question: 'Do you offer solutions for regulated environments?',
      answer: 'Yes. For healthcare/medical and defense, we deploy on-site secured studios with full traceability. Visuals comply with CE, ISO and sector-specific regulatory requirements. Zero outsourced data.',
    },
    {
      question: 'How does deployment work in my company?',
      answer: 'In 3 steps: (1) Needs analysis and system recommendation, (2) Delivery, installation and Qualiopi-certified team training, (3) Continuous support with dedicated hotline. Allow 2 to 4 weeks from order to production start.',
    },
  ];

  const faqItems = faqs.map(f => ({ question: f.question, answer: f.answer }));

  return (
    <>
      {/* Hero */}
      <HeroSection
        layout="split"
        badge={{
          icon: <Factory className="h-4 w-4" />,
          label: isFr ? '14 secteurs couverts' : '14 sectors covered',
          colorClass: 'bg-very-peri-500/15 text-very-peri-300',
        }}
        title={isFr
          ? 'Votre secteur, notre expertise'
          : 'Your industry, our expertise'}
        subtitle={isFr
          ? 'Chaque industrie a ses défis photo produit : reflets, matières, volumes, conformité. Découvrez nos solutions packshot et IA adaptées à votre métier.'
          : 'Every industry has its product photo challenges: reflections, materials, volumes, compliance. Discover our packshot and AI solutions tailored to your business.'}
        media={
          <Image
            src="/images/hero/hero-industries.avif"
            alt={isFr ? 'Solutions photo produit par industrie' : 'Product photo solutions by industry'}
            width={640}
            height={480}
            className="rounded-2xl shadow-2xl"
            priority
          />
        }
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
            <Link href="/contact">{isFr ? 'Demander une démo' : 'Request a demo'}</Link>
          </Button>
          <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
            <a href="#secteurs">{isFr ? 'Voir les 14 secteurs' : 'View all 14 sectors'}</a>
          </Button>
        </div>
      </HeroSection>

      {/* Sectors Grid */}
      <section id="secteurs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? '14 Secteurs d\'Activité Couverts' : '14 Industry Sectors Covered'}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {isFr
                ? 'De la chaussure à la défense, du bijou à l\'industrie manufacturière : des solutions photo produit adaptées à chaque contrainte métier.'
                : 'From footwear to defense, jewelry to manufacturing: product photo solutions tailored to every business constraint.'}
            </p>
          </FadeInView>
          <SectorGrid sectors={DEFAULT_SECTORS} columns={4} />
        </div>
      </section>

      {/* Mini Case Studies */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? 'Résultats concrets, tous secteurs' : 'Concrete results, all sectors'}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {isFr
                ? 'Des entreprises de toutes tailles ont transformé leur production visuelle avec nos solutions.'
                : 'Companies of all sizes have transformed their visual production with our solutions.'}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.sector}>
                <div className={`rounded-2xl border ${cs.color} p-6 sm:p-8`}>
                  <div className="flex items-start gap-3 mb-3">
                    <Quote className="h-5 w-5 text-future-dusk-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-future-dusk-400">{cs.sector}</span>
                      <h3 className="text-base font-heading font-bold text-future-dusk-900 mt-1">{cs.client}</h3>
                    </div>
                  </div>
                  <p className="text-future-dusk-600 font-medium ml-8">{cs.result}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? 'Avantages pour toutes les industries' : 'Benefits for all industries'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
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
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
              {isFr ? 'Packshot → IA → Diffusion' : 'Packshot → AI → Distribution'}
            </h2>
            <p className="text-lg text-future-dusk-500 max-w-2xl mx-auto">
              {isFr
                ? 'Le processus standard pour tous les secteurs : capture packshot haute qualité, génération lifestyle IA, diffusion multi-canal.'
                : 'The standard process for all sectors: high-quality packshot capture, AI lifestyle generation, multi-channel distribution.'}
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

      {/* FAQ Transversale */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInView className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900">
                {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
              </h2>
            </FadeInView>
            <StaggerContainer className="space-y-4">
              {faqs.map((faq, i) => (
                <StaggerItem key={i}>
                  <details className="group bg-neutral-50 rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors">
                    <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-semibold text-future-dusk-900 text-left">
                        {faq.question}
                      </h3>
                      <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-future-dusk-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Cross-Links (Maillage) */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-10">
            <h2 className="text-2xl font-heading font-bold text-future-dusk-900">
              {isFr ? 'Explorez nos solutions' : 'Explore our solutions'}
            </h2>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/studios-photo-automatises', icon: <Camera className="h-5 w-5" />, title: isFr ? 'Studios Photo Automatisés' : 'Automated Photo Studios', desc: isFr ? '20 systèmes Orbitvu du bijou au mobilier. Packshot, 360°, vidéo.' : '20 Orbitvu systems from jewelry to furniture. Packshot, 360°, video.' },
              { href: '/ia-photo-produit', icon: <Sparkles className="h-5 w-5" />, title: isFr ? 'IA Photo Produit — BlendAI.studio' : 'Product Photo AI — BlendAI.studio', desc: isFr ? 'Transformez vos packshots en visuels lifestyle grâce à notre plateforme IA propriétaire.' : 'Transform your packshots into lifestyle visuals with our proprietary AI platform.' },
              { href: '/academy', icon: <GraduationCap className="h-5 w-5" />, title: isFr ? 'Academy — Formations certifiées' : 'Academy — Certified training', desc: isFr ? 'Formations Qualiopi pour maîtriser votre système et l\'IA photo produit.' : 'Qualiopi training to master your system and product photo AI.' },
            ].map((link) => (
              <StaggerItem key={link.href}>
                <Link href={link.href} className="group block bg-white rounded-xl border border-neutral-200 p-6 hover:border-very-peri-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-very-peri-100 text-very-peri-600 group-hover:bg-very-peri-200 transition-colors">
                      {link.icon}
                    </span>
                    <h3 className="font-semibold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-sm text-future-dusk-500 leading-relaxed">{link.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-very-peri-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isFr ? 'Découvrir' : 'Discover'} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-future-dusk-900 to-very-peri-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold">
              {isFr ? 'Quel est votre secteur ?' : 'What is your industry?'}
            </h2>
            <p className="text-lg text-future-dusk-200 max-w-xl mx-auto mt-4">
              {isFr
                ? 'Chaque projet est unique. Nos experts analysent vos contraintes métier et vous recommandent la solution adaptée.'
                : 'Every project is unique. Our experts analyze your business constraints and recommend the right solution.'}
            </p>
          </FadeInView>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-gradient-to-br from-very-peri-600 to-very-peri-700 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {isFr ? 'Démo personnalisée' : 'Personalized demo'}
                </h3>
                <p className="text-very-peri-100 mb-6">
                  {isFr
                    ? 'Tests packshot avec vos produits + exemples IA lifestyle adaptés à votre secteur. 30 min, sans engagement.'
                    : 'Packshot tests with your products + AI lifestyle examples for your sector. 30 min, no commitment.'}
                </p>
                <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold">
                  <Link href="/contact">
                    {isFr ? 'Réserver ma démo' : 'Book my demo'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-future-dusk-800/50 rounded-2xl p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {isFr ? 'Devis sur mesure' : 'Custom quote'}
                </h3>
                <p className="text-future-dusk-300 mb-6">
                  {isFr
                    ? 'Analyse de vos besoins, recommandation système + IA, et devis détaillé. Réponse sous 24h.'
                    : 'Needs analysis, system + AI recommendation, and detailed quote. Response within 24h.'}
                </p>
                <Button asChild className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/contact">
                    {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqItems)]} />
    </>
  );
}
