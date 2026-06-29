import { NavLink as Link } from '@/components/layout/NavLink';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Factory, Zap, TrendingUp, Target, Camera, Sparkles, Send,
  ArrowRight, ChevronDown, GraduationCap, Glasses, Wine, HeartPulse, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import SectorGrid, { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import { HeroSection } from '@/components/hero';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { buildLanguages } from '@/lib/hreflang';
import { tx } from '@/lib/locale-text';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const segment = lang === 'de-ch' ? 'branchen' : 'industrie';
  const ogTitle = tx(lang,
    'Solutions Photo Produit par Industrie',
    'Product Photography Solutions by Industry',
    'Produktfotografie-Lösungen nach Branche');
  return {
    title: tx(lang,
      'Solutions Photo Produit par Industrie | Studios Automatisés & IA',
      'Product Photography Solutions by Industry | Automated Studios & AI',
      'Produktfotografie-Lösungen nach Branche | Automatisierte Studios & KI'),
    description: tx(lang,
      'Solutions packshot et IA photo produit pour 15 secteurs : lunetterie, chaussures, bijoux, mobilier, food, cosmétiques, mode, électronique, industrie, défense. Studios Orbitvu + BlendAI.',
      'Packshot and AI product photography solutions for 15 industries: eyewear, shoes, jewelry, furniture, food, cosmetics, fashion, electronics, manufacturing, defense. Orbitvu + BlendAI.',
      'Packshot- und KI-Produktfotografie-Lösungen für 15 Branchen: Brillen, Schuhe, Schmuck, Möbel, Food, Kosmetik, Mode, Elektronik, Industrie, Verteidigung. Orbitvu Studios + BlendAI.'),
    keywords: tx(lang,
      'photo produit industrie, packshot secteur, studio photo automatisé, IA lifestyle, lunetterie, chaussures, bijoux, mobilier, food, cosmétiques',
      'product photography industry, sector packshot, automated photo studio, AI lifestyle, eyewear, shoes, jewelry, furniture, food, cosmetics',
      'Produktfotografie Branche, Branchen-Packshot, automatisiertes Fotostudio, KI Lifestyle, Brillen, Schuhe, Schmuck, Möbel, Food, Kosmetik'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/${segment}`,
      languages: buildLanguages('/fr/industrie', { en: '/en/industrie', deCh: '/de-ch/branchen' }),
    },
    openGraph: {
      title: tx(lang,
        'Solutions Photo Produit par Industrie | Studios Automatisés & IA',
        'Product Photography Solutions by Industry | Automated Studios & AI',
        'Produktfotografie-Lösungen nach Branche | Automatisierte Studios & KI'),
      description: tx(lang,
        'Solutions packshot et IA photo produit adaptées à 15 secteurs. Studios Orbitvu + BlendAI.',
        'Packshot and AI product photography solutions for 15 industries. Orbitvu Studios + BlendAI.',
        'Packshot- und KI-Produktfotografie-Lösungen für 15 Branchen. Orbitvu Studios + BlendAI.'),
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/${segment}`,
      siteName: 'PackshotCreator',
      locale: lang === 'de-ch' ? 'de_CH' : lang === 'en' ? 'en_US' : 'fr_FR',
      images: [{ url: `/api/og?title=${encodeURIComponent(ogTitle)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      images: [`/api/og?title=${encodeURIComponent(ogTitle)}&type=page&lang=${lang}`],
    },
  };
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Industries', url: `https://www.packshot-creator.com/${lang}/industrie` },
  ];

  /* ── Featured sectors (large cards) ── */
  const featuredSectors = [
    {
      slug: 'lunetterie',
      icon: <Glasses className="h-7 w-7" />,
      title: tx(lang, 'Lunetterie & Optique', 'Eyewear & Optics', 'Brillen & Optik'),
      description: tx(lang,
        'Packshot montures sans reflets, visuels portés par IA. Gestion des transparences et matières nobles.',
        'Frameless packshots, AI-generated worn visuals. Handling transparency and premium materials.',
        'Reflexionsfreie Fassungs-Packshots, KI-generierte Trage-Visuals. Umgang mit Transparenzen und edlen Materialien.'),
      color: 'bg-very-peri-50 text-very-peri-600',
      hoverBorder: 'hover:border-very-peri-300',
    },
    {
      slug: 'food-alimentaire',
      icon: <Wine className="h-7 w-7" />,
      title: tx(lang, 'Food & Alimentaire', 'Food & Beverage', 'Food & Getränke'),
      description: tx(lang,
        'Packshot packaging et food styling IA. Visuels appétissants en série pour catalogues et marketplaces.',
        'Packaging packshots and AI food styling. Appetizing serial visuals for catalogs and marketplaces.',
        'Packaging-Packshots und KI-Food-Styling. Appetitliche Serien-Visuals für Kataloge und Marktplätze.'),
      color: 'bg-amber-50 text-amber-600',
      hoverBorder: 'hover:border-amber-300',
    },
    {
      slug: 'sante-medical',
      icon: <HeartPulse className="h-7 w-7" />,
      title: tx(lang, 'Santé & Médical', 'Healthcare & Medical', 'Gesundheit & Medizin'),
      description: tx(lang,
        'Visuels conformes CE et documentation réglementaire. Studios déployables sur site sécurisé.',
        'CE-compliant visuals and regulatory documentation. Studios deployable on secure sites.',
        'CE-konforme Visuals und regulatorische Dokumentation. Studios vor Ort am gesicherten Standort einsetzbar.'),
      color: 'bg-emerald-50 text-emerald-600',
      hoverBorder: 'hover:border-emerald-300',
    },
    {
      slug: 'industrie-manufacturiere',
      icon: <Shield className="h-7 w-7" />,
      title: tx(lang, 'Industrie & Défense', 'Industry & Defense', 'Industrie & Verteidigung'),
      description: tx(lang,
        'Catalogage massif, traçabilité complète, studios sur site sécurisé. Conformité ISO et réglementaire.',
        'Mass cataloging, full traceability, on-site secured studios. ISO and regulatory compliance.',
        'Massenkatalogisierung, lückenlose Rückverfolgbarkeit, gesicherte Studios vor Ort. ISO- und Regelkonformität.'),
      color: 'bg-future-dusk-50 text-future-dusk-600',
      hoverBorder: 'hover:border-future-dusk-300',
    },
  ];

  /* ── Compact grid: all other sectors ── */
  const featuredSlugs = ['lunetterie', 'food-alimentaire', 'sante-medical', 'industrie-manufacturiere', 'defense-securite'];
  const compactSectors = DEFAULT_SECTORS.filter((s) => !featuredSlugs.includes(s.slug));

  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: tx(lang, 'Production Accélérée', 'Accelerated Production', 'Beschleunigte Produktion'),
      description: tx(lang,
        '50-300 produits/jour en studio automatisé. 100-500 visuels lifestyle/jour via IA. Délais réduits de <bold>70-90%</bold>.',
        '50-300 products/day in automated studio. 100-500 lifestyle visuals/day via AI. Timelines reduced by <bold>70-90%</bold>.',
        '50-300 Produkte/Tag im automatisierten Studio. 100-500 Lifestyle-Visuals/Tag per KI. Durchlaufzeiten um <bold>70-90%</bold> reduziert.'),
      color: 'bg-amber-100 text-amber-700',
      hoverBorder: 'hover:border-amber-300',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: tx(lang, 'ROI Rapide', 'Fast ROI', 'Schneller ROI'),
      description: tx(lang,
        'Retour sur investissement <bold>12-18 mois</bold>. Réduction coûts photo <bold>60+ %</bold>. Idéal pour catalogues 100 à 5000+ références.',
        'Return on investment <bold>12-18 months</bold>. Photo cost reduction <bold>60+ %</bold>. Ideal for catalogs with 100 to 5000+ references.',
        'Amortisation in <bold>12-18 Monaten</bold>. Senkung der Fotokosten um <bold>60+ %</bold>. Ideal für Kataloge mit 100 bis 5000+ Artikeln.'),
      color: 'bg-emerald-100 text-emerald-700',
      hoverBorder: 'hover:border-emerald-300',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: tx(lang, 'Cohérence Absolue', 'Absolute Consistency', 'Absolute Konsistenz'),
      description: tx(lang,
        'Même qualité sur <bold>tout le catalogue</bold>. Éclairage, angles et ambiances identiques. Renforce l\'<bold>identité de marque</bold>.',
        'Same quality across <bold>the entire catalog</bold>. Identical lighting, angles and ambiances. Strengthens <bold>brand identity</bold>.',
        'Gleiche Qualität über <bold>den gesamten Katalog</bold>. Identische Beleuchtung, Winkel und Stimmungen. Stärkt die <bold>Markenidentität</bold>.'),
      color: 'bg-very-peri-100 text-very-peri-700',
      hoverBorder: 'hover:border-very-peri-300',
    },
  ];

  const workflowSteps = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: tx(lang, 'Capture Packshot Automatisée', 'Automated Packshot Capture', 'Automatisierte Packshot-Aufnahme'),
      description: tx(lang,
        'Systèmes Orbitvu : packshot <bold>fond blanc haute résolution</bold>, 360° optionnel, détourage automatique.',
        'Orbitvu systems: <bold>high-resolution white background</bold> packshot, optional 360°, automatic clipping.',
        'Orbitvu-Systeme: Packshot mit <bold>hochauflösendem weissem Hintergrund</bold>, optional 360°, automatisches Freistellen.'),
      num: '01',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: tx(lang, 'Génération Lifestyle IA', 'AI Lifestyle Generation', 'KI-Lifestyle-Generierung'),
      description: tx(lang,
        'BlendAI.studio : transformez packshots en <bold>visuels lifestyle</bold>. Personnalisation ADN marque. Production <bold>série rapide</bold>.',
        'BlendAI.studio: transform packshots into <bold>lifestyle visuals</bold>. Brand DNA customization. <bold>Fast series</bold> production.',
        'BlendAI.studio: Packshots in <bold>Lifestyle-Visuals</bold> verwandeln. Anpassung an die Marken-DNA. <bold>Schnelle Serienproduktion</bold>.'),
      num: '02',
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: tx(lang, 'Diffusion Multi-Canal', 'Multi-Channel Distribution', 'Multi-Channel-Verbreitung'),
      description: tx(lang,
        'Export formats optimisés <bold>e-commerce</bold>, marketplaces, <bold>réseaux sociaux</bold>, print.',
        'Export formats optimized for <bold>e-commerce</bold>, marketplaces, <bold>social media</bold>, print.',
        'Export in optimierten Formaten für <bold>E-Commerce</bold>, Marktplätze, <bold>Social Media</bold>, Print.'),
      num: '03',
    },
  ];

  const faqsFr = [
    {
      question: 'PackshotCreator intervient-il dans mon secteur ?',
      answer: 'Oui. Nous accompagnons 15 secteurs : lunetterie, chaussures, bijoux, mobilier, food, cosmétiques, mode, électronique, pièces techniques, automobile, jouets, sport, santé, industrie manufacturière et défense. Chaque secteur a ses contraintes spécifiques (reflets, matières, conformité) et nous y répondons avec des solutions studio + IA adaptées.',
    },
    {
      question: 'Quel volume minimum pour justifier un studio automatisé ?',
      answer: 'À partir de 100 produits/an, un studio automatisé commence à être plus rentable qu\'un prestataire externe. Le ROI est significatif dès 500 produits/an. Pour les catalogues de 1000+ références, le gain est considérable : délais réduits de 70-90% et coûts photo en baisse de 60+ %.',
    },
    {
      question: 'L\'IA lifestyle fonctionne-t-elle pour tous les types de produits ?',
      answer: 'BlendAI.studio fonctionne avec tous les types de produits photographiés en studio Orbitvu : objets, vêtements, mobilier, alimentation, cosmétiques, montures... L\'IA part d\'un packshot de qualité studio pour générer des mises en scène fidèles au produit, avec des styles personnalisables par secteur.',
    },
    {
      question: 'Proposez-vous des solutions pour les environnements réglementés ?',
      answer: 'Oui. Pour la santé/médical et la défense, nous déployons des studios sur site sécurisé avec traçabilité complète. Les visuels sont conformes aux exigences CE, ISO et réglementaires de chaque secteur. Zéro donnée externalisée.',
    },
    {
      question: 'Comment se passe le déploiement dans mon entreprise ?',
      answer: 'En 3 étapes : (1) Analyse de vos besoins et recommandation du système adapté, (2) Livraison, installation et formation certifiée Qualiopi de vos équipes, (3) Support continu avec hotline dédiée. Comptez 2 à 4 semaines entre la commande et la mise en production.',
    },
  ];
  const faqsEn = [
    {
      question: 'Does PackshotCreator work with my industry?',
      answer: 'Yes. We serve 15 sectors: eyewear, footwear, jewelry, furniture, food, cosmetics, fashion, electronics, technical parts, automotive, toys, sports, healthcare, manufacturing and defense. Each sector has specific constraints (reflections, materials, compliance) and we address them with tailored studio + AI solutions.',
    },
    {
      question: 'What minimum volume justifies an automated studio?',
      answer: 'From 100 products/year, an automated studio starts being more cost-effective than external providers. ROI becomes significant at 500+ products/year. For catalogs with 1,000+ references, the gain is substantial: timelines reduced by 70-90% and photo costs down 60+ %.',
    },
    {
      question: 'Does AI lifestyle work for all product types?',
      answer: 'BlendAI.studio works with all product types photographed in Orbitvu studios: objects, clothing, furniture, food, cosmetics, eyewear... AI starts from a studio-quality packshot to generate product-faithful scenes, with sector-customizable styles.',
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
  const faqsDeCh = [
    {
      question: 'Ist PackshotCreator in meiner Branche tätig?',
      answer: 'Ja. Wir begleiten 15 Branchen: Brillen, Schuhe, Schmuck, Möbel, Food, Kosmetik, Mode, Elektronik, technische Teile, Automobil, Spielwaren, Sport, Gesundheit, Fertigungsindustrie und Verteidigung. Jede Branche hat ihre spezifischen Anforderungen (Reflexionen, Materialien, Konformität) – wir beantworten sie mit massgeschneiderten Studio- und KI-Lösungen.',
    },
    {
      question: 'Welches Mindestvolumen rechtfertigt ein automatisiertes Studio?',
      answer: 'Ab 100 Produkten/Jahr wird ein automatisiertes Studio rentabler als ein externer Dienstleister. Der ROI ist ab 500 Produkten/Jahr deutlich. Bei Katalogen mit 1000+ Artikeln ist der Gewinn erheblich: Durchlaufzeiten um 70-90% reduziert und Fotokosten um 60+ % gesenkt.',
    },
    {
      question: 'Funktioniert das KI-Lifestyle für alle Produktarten?',
      answer: 'BlendAI.studio funktioniert mit allen Produktarten, die im Orbitvu-Studio fotografiert werden: Objekte, Kleidung, Möbel, Lebensmittel, Kosmetik, Fassungen... Die KI geht von einem Packshot in Studioqualität aus, um produktgetreue Inszenierungen zu erzeugen – mit pro Branche anpassbaren Stilen.',
    },
    {
      question: 'Bieten Sie Lösungen für regulierte Umgebungen an?',
      answer: 'Ja. Für Gesundheit/Medizin und Verteidigung setzen wir Studios vor Ort am gesicherten Standort mit lückenloser Rückverfolgbarkeit ein. Die Visuals entsprechen den CE-, ISO- und regulatorischen Anforderungen jeder Branche. Keine Daten werden ausgelagert.',
    },
    {
      question: 'Wie läuft die Einführung in meinem Unternehmen ab?',
      answer: 'In 3 Schritten: (1) Analyse Ihres Bedarfs und Empfehlung des passenden Systems, (2) Lieferung, Installation und Qualiopi-zertifizierte Schulung Ihrer Teams, (3) laufender Support mit dedizierter Hotline. Rechnen Sie mit 2 bis 4 Wochen zwischen Bestellung und Produktionsstart.',
    },
  ];
  const faqs = lang === 'de-ch' ? faqsDeCh : lang === 'en' ? faqsEn : faqsFr;

  const faqItems = faqs.map(f => ({ question: f.question, answer: f.answer }));

  const renderBold = (text: string, onDark = false) => {
    const parts = text.split(/<bold>(.*?)<\/bold>/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className={onDark ? 'text-white font-semibold' : 'text-heading-dark font-semibold'}>{part}</strong>
        : part
    );
  };

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Split layout, industry focus
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="split"
        badge={{
          icon: <Factory className="h-4 w-4" />,
          label: tx(lang, '15 secteurs couverts', '15 sectors covered', '15 abgedeckte Branchen'),
          colorClass: 'bg-very-peri-500/15 text-very-peri-300',
        }}
        title={tx(lang,
          'Votre secteur, notre expertise',
          'Your industry, our expertise',
          'Ihre Branche, unsere Expertise')}
        subtitle={tx(lang,
          'Chaque industrie a ses défis photo produit : reflets, matières, volumes, conformité. Découvrez nos solutions packshot et IA adaptées à votre métier.',
          'Every industry has its product photo challenges: reflections, materials, volumes, compliance. Discover our packshot and AI solutions tailored to your business.',
          'Jede Branche hat ihre eigenen Herausforderungen in der Produktfotografie: Reflexionen, Materialien, Volumen, Konformität. Entdecken Sie unsere auf Ihr Geschäft zugeschnittenen Packshot- und KI-Lösungen.')}
        media={
          <Image
            src="/images/hero/hero-industries.avif"
            alt={tx(lang, 'Solutions photo produit par industrie', 'Product photo solutions by industry', 'Produktfotografie-Lösungen nach Branche')}
            width={640}
            height={480}
            className="rounded-2xl shadow-2xl"
            priority
          />
        }
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
            <Link href="/contact">{tx(lang, 'Demander une démo', 'Request a demo', 'Demo anfordern')}</Link>
          </Button>
          <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
            <a href="#secteurs">{tx(lang, 'Voir les 15 secteurs', 'View all 15 sectors', 'Alle 15 Branchen ansehen')}</a>
          </Button>
        </div>
      </HeroSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SECTORS — Featured cards + compact grid
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="secteurs" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {tx(lang, 'Nos secteurs', 'Our sectors', 'Unsere Branchen')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                {tx(lang, '15 Secteurs d\'Activité', '15 Industry Sectors', '15 Branchen')}
              </TextReveal>
              <p className="text-lg text-neutral-medium leading-relaxed">
                {renderBold(tx(lang,
                  'De la <bold>lunetterie</bold> à la <bold>défense</bold>, du bijou à l\'industrie manufacturière : des solutions photo produit adaptées à chaque <bold>contrainte métier</bold>.',
                  'From <bold>eyewear</bold> to <bold>defense</bold>, jewelry to manufacturing: product photo solutions tailored to every <bold>business constraint</bold>.',
                  'Von der <bold>Brille</bold> bis zur <bold>Verteidigung</bold>, vom Schmuck bis zur Fertigungsindustrie: Produktfotografie-Lösungen, die auf jede <bold>fachliche Anforderung</bold> zugeschnitten sind.'))}
              </p>
            </div>
          </ScrollReveal>

          {/* Featured sectors — 2x2 large cards */}
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-12">
            {featuredSectors.map((sector, idx) => (
              <FadeInView key={sector.slug} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.1}>
                <SpringCard hoverY={-4} hoverScale={1.01} className="h-full">
                  <Link
                    href={{ pathname: '/industrie/[slug]', params: { slug: sector.slug } }}
                    className={`group block bg-white rounded-2xl border border-neutral-200 ${sector.hoverBorder} p-6 lg:p-10 transition-all duration-300 hover:shadow-xl h-full`}
                  >
                    <div className="flex items-start gap-5">
                      <span className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${sector.color} shrink-0`}>
                        {sector.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl lg:text-2xl font-heading font-bold text-heading-dark group-hover:text-very-peri-600 transition-colors">
                            {sector.title}
                          </h3>
                          <ArrowRight className="h-5 w-5 text-neutral-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <p className="text-neutral-medium leading-relaxed">
                          {sector.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SpringCard>
              </FadeInView>
            ))}
          </div>

          {/* Compact grid — remaining sectors */}
          <FadeInView delay={0.3}>
            <SectorGrid sectors={compactSectors} columns={4} />
          </FadeInView>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. STATS BRIDGE — Typography-driven key numbers
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-12 lg:py-16 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
            {[
              { end: 500, suffix: '+', label: tx(lang, 'entreprises équipées', 'equipped companies', 'ausgestattete Unternehmen') },
              { end: 15, suffix: '', label: tx(lang, 'secteurs couverts', 'sectors covered', 'abgedeckte Branchen') },
              { end: 85, suffix: '%', prefix: '60-', label: tx(lang, 'réduction des coûts', 'cost reduction', 'Kostensenkung') },
              { end: 3, suffix: ' sec', label: tx(lang, 'par packshot', 'per packshot', 'pro Packshot') },
            ].map((stat, idx) => (
              <FadeInView key={idx} delay={idx * 0.12}>
                <div className="text-center lg:px-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-2">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-future-dusk-400">
                    {stat.label}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. BENEFITS — Bento grid, hero card + 2 smaller
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {tx(lang, 'Pourquoi automatiser', 'Why automate', 'Warum automatisieren')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
                {tx(lang, 'Avantages pour toutes les industries', 'Benefits for all industries', 'Vorteile für alle Branchen')}
              </TextReveal>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Hero card — Production Accélérée */}
            <FadeInView direction="left" delay={0.1}>
              <SpringCard className="h-full">
                <div className={`bg-future-dusk-0 rounded-2xl border border-neutral-100 ${benefits[0].hoverBorder} p-5 sm:p-8 lg:p-10 transition-all duration-300 h-full flex flex-col shadow-sm hover:shadow-xl`}>
                  <span className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${benefits[0].color} mb-6`}>
                    {benefits[0].icon}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-heading-dark mb-4">
                    {benefits[0].title}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed text-lg flex-1">
                    {renderBold(benefits[0].description)}
                  </p>
                </div>
              </SpringCard>
            </FadeInView>

            {/* 2 smaller cards stacked */}
            <div className="space-y-3 sm:space-y-6">
              {benefits.slice(1).map((benefit, idx) => (
                <FadeInView key={benefit.title} direction="right" delay={0.15 + idx * 0.1}>
                  <SpringCard hoverY={-3} hoverScale={1.005}>
                    <div className={`bg-future-dusk-0 rounded-2xl border border-neutral-100 ${benefit.hoverBorder} p-6 transition-all duration-300 shadow-sm hover:shadow-lg group`}>
                      <div className="flex items-start gap-5">
                        <span className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${benefit.color} flex-shrink-0 mt-1`}>
                          {benefit.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-heading font-bold text-heading-dark mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-neutral-medium leading-relaxed">
                            {renderBold(benefit.description)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SpringCard>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. WORKFLOW — Dark bg, timeline editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-very-peri-800/20 to-future-dusk-900" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {tx(lang, 'Notre processus', 'Our process', 'Unser Prozess')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6">
                {tx(lang, 'Packshot → IA → Diffusion', 'Packshot → AI → Distribution', 'Packshot → KI → Verbreitung')}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto leading-relaxed">
                {renderBold(tx(lang,
                  'Le processus standard pour <bold>tous les secteurs</bold> : capture packshot haute qualité, génération lifestyle IA, diffusion <bold>multi-canal</bold>.',
                  'The standard process for <bold>all sectors</bold>: high-quality packshot capture, AI lifestyle generation, <bold>multi-channel</bold> distribution.',
                  'Der Standardprozess für <bold>alle Branchen</bold>: hochwertige Packshot-Aufnahme, KI-Lifestyle-Generierung, <bold>Multi-Channel</bold>-Verbreitung.'), true)}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {workflowSteps.map((step, idx) => (
              <FadeInView key={step.num} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.15}>
                <div className={`grid md:grid-cols-12 gap-4 md:gap-8 items-center py-6 md:py-12 ${idx < workflowSteps.length - 1 ? 'border-b border-white/10' : ''}`}>
                  {/* Number — massive, decorative */}
                  <div className="md:col-span-2 text-center md:text-right">
                    <span className="text-3xl sm:text-5xl lg:text-9xl font-heading font-bold text-white/8 select-none leading-none">
                      {step.num}
                    </span>
                  </div>
                  {/* Icon */}
                  <div className="md:col-span-1 flex justify-center">
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-very-peri-500/20 text-very-peri-300">
                      {step.icon}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="md:col-span-9">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-future-dusk-300 leading-relaxed max-w-2xl">
                      {renderBold(step.description, true)}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. FAQ — Split sticky heading + accordion
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16">
            {/* Left: sticky heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <FadeInView direction="left">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-4">
                  {tx(lang, 'Questions fréquentes', 'Frequently asked questions', 'Häufige Fragen')}
                </TextReveal>
                <p className="text-neutral-medium leading-relaxed">
                  {tx(lang,
                    'Tout ce que vous devez savoir sur nos solutions par secteur.',
                    'Everything you need to know about our industry solutions.',
                    'Alles, was Sie über unsere Lösungen nach Branche wissen müssen.')}
                </p>
                <div className="mt-6 space-y-3">
                  <Link
                    href="/besoins-photographie-produit"
                    className="block text-sm text-very-peri-500 hover:text-very-peri-600 font-medium transition-colors"
                  >
                    {tx(lang, 'Identifier votre besoin →', 'Identify your need →', 'Ihren Bedarf ermitteln →')}
                  </Link>
                  <Link
                    href="/questions-cles-photographie-produit"
                    className="block text-sm text-very-peri-500 hover:text-very-peri-600 font-medium transition-colors"
                  >
                    {tx(lang, 'Les 9 questions cles →', 'The 9 key questions →', 'Die 9 Schlüsselfragen →')}
                  </Link>
                </div>
              </FadeInView>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-8">
              <StaggerContainer stagger={0.08} className="space-y-4">
                {faqs.map((faq, i) => (
                  <StaggerItem key={i}>
                    <details className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300">
                      <summary className="flex items-center justify-between gap-4 p-4 sm:p-6 lg:p-8 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        <h3 className="text-lg font-heading font-semibold text-heading-dark text-left leading-snug group-hover:text-very-peri-600 transition-colors">
                          {faq.question}
                        </h3>
                        <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 -mt-1">
                        <p className="text-neutral-medium leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. FINAL CTA — Asymmetric, demo card is dominant
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollReveal>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-center mb-16">
              {tx(lang, 'Quel est votre secteur ?', 'What is your industry?', 'Was ist Ihre Branche?')}
            </TextReveal>
          </ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-8">
            {/* Demo — 3/5 = dominant */}
            <FadeInView direction="left" delay={0.1} className="lg:col-span-3">
              <SpringCard hoverY={-6}>
                <div className="bg-gradient-to-br from-very-peri-500 to-very-peri-600 rounded-3xl p-6 lg:p-14 h-full flex flex-col">
                  <h3 className="text-3xl font-heading font-bold mb-4">
                    {tx(lang, 'Démo personnalisée', 'Personalized demo', 'Persönliche Demo')}
                  </h3>
                  <p className="text-very-peri-100 text-lg mb-8 leading-relaxed flex-1">
                    {tx(lang,
                      'Tests packshot avec vos produits + exemples IA lifestyle adaptés à votre secteur. 30 min, sans engagement.',
                      'Packshot tests with your products + AI lifestyle examples for your sector. 30 min, no commitment.',
                      'Packshot-Tests mit Ihren Produkten + KI-Lifestyle-Beispiele für Ihre Branche. 30 Min., unverbindlich.')}
                  </p>
                  <Button asChild className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl font-semibold px-8 h-14 text-base shadow-lg w-fit">
                    <Link href="/contact">
                      {tx(lang, 'Réserver ma démo', 'Book my demo', 'Demo buchen')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </SpringCard>
            </FadeInView>
            {/* Quote — 2/5 = secondary */}
            <FadeInView direction="right" delay={0.2} className="lg:col-span-2">
              <SpringCard hoverY={-6}>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10 h-full flex flex-col">
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {tx(lang, 'Devis sur mesure', 'Custom quote', 'Massgeschneiderte Offerte')}
                  </h3>
                  <p className="text-future-dusk-300 mb-8 leading-relaxed flex-1">
                    {tx(lang,
                      'Analyse de vos besoins, recommandation système + IA, et devis détaillé. Réponse sous 24h.',
                      'Needs analysis, system + AI recommendation, and detailed quote. Response within 24h.',
                      'Analyse Ihres Bedarfs, System- + KI-Empfehlung und detaillierte Offerte. Antwort innert 24 Std.')}
                  </p>
                  <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-8 h-12 text-base w-fit">
                    <Link href="/contact">
                      {tx(lang, 'Demander un devis', 'Request a quote', 'Offerte anfordern')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </SpringCard>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. CROSS-LINKS — Minimal, editorial
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="mb-12">
            <span className="text-xs font-semibold text-future-dusk-400 uppercase tracking-[0.2em]">
              {tx(lang, 'Explorez nos solutions', 'Explore our solutions', 'Entdecken Sie unsere Lösungen')}
            </span>
          </FadeInView>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios', href: '/studios-photo-automatises' as const, icon: <Camera className="h-5 w-5" />, title: tx(lang, 'Studios Photo Automatisés', 'Automated Photo Studios', 'Automatisierte Fotostudios'), desc: tx(lang, '20 systèmes Orbitvu du bijou au mobilier. Packshot, 360°, vidéo.', '20 Orbitvu systems from jewelry to furniture. Packshot, 360°, video.', '20 Orbitvu-Systeme vom Schmuck bis zum Möbel. Packshot, 360°, Video.') },
              { key: 'ia', href: '/ia-photo-produit' as const, icon: <Sparkles className="h-5 w-5" />, title: tx(lang, 'IA Photo Produit — BlendAI.studio', 'Product Photo AI — BlendAI.studio', 'KI-Produktfotografie — BlendAI.studio'), desc: tx(lang, 'Transformez vos packshots en visuels lifestyle grâce à notre plateforme IA propriétaire.', 'Transform your packshots into lifestyle visuals with our proprietary AI platform.', 'Verwandeln Sie Ihre Packshots dank unserer eigenen KI-Plattform in Lifestyle-Visuals.') },
              { key: 'academy', href: '/academy' as const, icon: <GraduationCap className="h-5 w-5" />, title: tx(lang, 'Academy — Formations certifiées', 'Academy — Certified training', 'Academy — Zertifizierte Schulungen'), desc: tx(lang, 'Formations Qualiopi pour maîtriser votre système et l\'IA photo produit.', 'Qualiopi training to master your system and product photo AI.', 'Qualiopi-Schulungen, um Ihr System und die KI-Produktfotografie zu meistern.') },
            ].map((link) => (
              <FadeInView key={link.key}>
                <Link href={link.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-very-peri-500">{link.icon}</span>
                    <h3 className="font-heading font-bold text-heading-dark group-hover:text-very-peri-600 transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                  <p className="text-sm text-neutral-medium leading-relaxed">
                    {link.desc}
                  </p>
                </Link>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqItems)]} />
    </>
  );
}
