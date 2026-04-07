import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { solutions } from '@/data/solutions';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import {
  CheckCircle,
  ArrowRight,
  ChevronRight,
  ImageIcon,
  Camera,
  TrendingDown,
  Factory,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import { HeroSection } from '@/components/hero';

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return { title: 'Solution non trouvée' };

  return {
    title: solution.titre,
    description: solution.description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/solutions/${slug}`,
      languages: { fr: `/fr/solutions/${slug}`, en: `/en/solutions/${slug}` },
    },
    openGraph: {
      title: solution.titre,
      description: solution.description,
      images: [{ url: `/api/og?title=${encodeURIComponent(solution.titre)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Solutions', url: `https://www.packshot-creator.com/${lang}/solutions` },
    { name: solution.hero.badge, url: `https://www.packshot-creator.com/${lang}/solutions/${slug}` },
  ];

  const recommendedMachines = solution.machineIds
    .map((id) => MACHINES.find((m) => m.id === id))
    .filter(Boolean);

  /* Icons for stats */
  const statIcons = [TrendingDown, Factory, ImageIcon];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — Centered layout, problem-first
          ═══════════════════════════════════════════════════════════ */}
      <HeroSection
        layout="centered"
        badge={{
          icon: <ChevronRight className="h-3.5 w-3.5 rotate-180" />,
          label: solution.hero.badge,
          colorClass: 'text-very-peri-300',
        }}
        title={solution.hero.titre}
        subtitle={solution.hero.description}
        ctas={[
          { label: isFr ? 'Demander un devis gratuit' : 'Get a free quote', href: '/contact', variant: 'primary' },
          { label: isFr ? 'Calculer mon ROI en 2 min' : 'Calculate my ROI in 2 min', href: '/calculateur-roi', variant: 'secondary' },
        ]}
      >
        <p className="text-xl text-very-peri-200 font-medium mt-4">
          {solution.hero.sousTitre}
        </p>
      </HeroSection>

      {/* ═══════════════════════════════════════════════════════════
          LE PROBLÈME EN CHIFFRES — fond white, rows horizontales
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — sticky heading */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FadeInView direction="left">
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'LE CONSTAT' : 'THE PROBLEM'}
                </span>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                  {solution.probleme.titre}
                </h2>
                <p className="text-neutral-medium leading-relaxed">
                  {solution.probleme.description}
                </p>
              </FadeInView>
            </div>

            {/* Right — stat rows */}
            <div className="lg:col-span-3">
              <StaggerContainer className="space-y-6">
                {solution.probleme.stats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <div className="relative bg-future-dusk-0 rounded-2xl p-6 lg:p-8 border border-neutral-100 hover:border-very-peri-200 transition-colors overflow-hidden">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Stat */}
                        <div className="sm:w-1/3 sm:border-r sm:border-neutral-200 sm:pr-6 flex flex-col justify-center">
                          <span className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-none">
                            {stat.valeur}
                          </span>
                          <span className="text-sm text-neutral-medium mt-1">{stat.label}</span>
                        </div>
                        {/* Text */}
                        <div className="sm:w-2/3">
                          <h3 className="text-lg font-heading font-bold text-heading-dark mb-2">
                            {stat.titre}
                          </h3>
                          <p className="text-neutral-medium leading-relaxed">
                            {stat.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WORKFLOW — fond very-peri-50, split sticky + étapes numérotées
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-very-peri-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — sticky heading */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FadeInView direction="left">
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'NOTRE SOLUTION' : 'OUR SOLUTION'}
                </span>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                  {solution.workflow.titre}
                </h2>
                <p className="text-neutral-medium leading-relaxed mb-8">
                  {solution.workflow.description}
                </p>
              </FadeInView>
              <FadeInView direction="left" delay={0.2}>
                <div className="hidden lg:block">
                  <Image
                    src="/images/illustrations/solution-workflow-overview.avif"
                    alt="Process de documentation visuelle"
                    width={500}
                    height={280}
                    className="w-full h-auto rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </FadeInView>
            </div>

            {/* Right — numbered steps */}
            <div className="lg:col-span-3">
              <StaggerContainer className="space-y-6">
                {solution.workflow.etapes.map((etape, index) => (
                  <StaggerItem key={index}>
                    <div className="relative bg-white rounded-2xl p-6 lg:p-8 border border-neutral-100 shadow-sm overflow-hidden">
                      {/* Ghost number */}
                      <span className="absolute -top-3 -right-2 text-7xl lg:text-8xl font-heading font-bold text-neutral-100 select-none leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Step illustration */}
                      <div className="w-full rounded-xl overflow-hidden mb-6">
                        <Image
                          src={`/images/illustrations/solution-step-${
                            index === 0 ? 'capture' :
                            index === 1 ? 'traitement' :
                            slug === 'documentation-probatoire' ? 'probatoire' : 'archivage'
                          }.avif`}
                          alt={etape.titre}
                          width={600}
                          height={160}
                          className="w-full h-auto rounded-xl"
                          loading="lazy"
                        />
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-xl font-heading font-bold text-heading-dark mb-3">
                          {etape.titre}
                        </h3>
                        <p className="text-neutral-medium leading-relaxed mb-5">
                          {etape.description}
                        </p>
                        {/* Orbitvu features tags */}
                        <div className="flex flex-wrap gap-2">
                          {etape.fonctionsOrbitvu.map((fn, idx) => (
                            <span key={idx} className="inline-block text-xs font-medium bg-very-peri-100 text-very-peri-700 px-3 py-1 rounded-full">
                              {fn}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTEURS CONCERNÉS — fond white, grid cards avec liens industrie
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView direction="right" className="text-center mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {isFr ? 'SECTEURS CONCERNÉS' : 'RELEVANT SECTORS'}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
              {solution.secteurs.titre}
            </TextReveal>
            <p className="text-lg text-neutral-medium max-w-2xl mx-auto leading-relaxed">
              {solution.secteurs.description}
            </p>
          </FadeInView>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.secteurs.items.map((secteur, index) => {
              const sectorData = DEFAULT_SECTORS.find((s) => s.slug === secteur.slug);
              return (
                <StaggerItem key={index}>
                  <Link href={`/industrie/${secteur.slug}`} className="group block h-full">
                    <SpringCard>
                      <div className="bg-future-dusk-0 rounded-2xl p-6 lg:p-8 border border-neutral-100 hover:border-very-peri-300 transition-all h-full flex flex-col">
                        {/* Icon + sector name */}
                        <div className="flex items-center gap-3 mb-4">
                          {sectorData && (
                            <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-50 text-very-peri-600 shrink-0">
                              <sectorData.Icon className="h-5 w-5" />
                            </span>
                          )}
                          <h3 className="text-lg font-heading font-bold text-heading-dark group-hover:text-very-peri-600 transition-colors">
                            {secteur.nom}
                          </h3>
                        </div>

                        {/* Use case */}
                        <p className="text-sm text-neutral-medium leading-relaxed flex-1 mb-4">
                          {secteur.useCase}
                        </p>

                        {/* Link */}
                        <div className="flex items-center text-very-peri-600 text-sm font-medium">
                          {isFr ? 'Voir ce secteur' : 'View sector'}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </SpringCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SYSTÈMES RECOMMANDÉS — fond future-dusk-900, cartes machines
          ═══════════════════════════════════════════════════════════ */}
      {recommendedMachines.length > 0 && (
        <section className="py-20 lg:py-32 bg-future-dusk-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'NOS SYSTÈMES' : 'OUR SYSTEMS'}
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
                  {isFr ? 'Les systèmes adaptés à ce besoin' : 'Systems tailored to this need'}
                </TextReveal>
                <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto leading-relaxed">
                  {isFr
                    ? 'Studios photo automatisés Orbitvu sélectionnés pour la documentation technique visuelle.'
                    : 'Automated Orbitvu photo studios selected for technical visual documentation.'}
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className={`grid gap-6 ${
              recommendedMachines.length <= 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
              recommendedMachines.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
              'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {recommendedMachines.map((machine) => {
                const sizeLabel = machine!.tailleCategories[0] === 'petit' ? (isFr ? 'Petit' : 'Small') :
                  machine!.tailleCategories[0] === 'moyen' ? (isFr ? 'Moyen' : 'Medium') :
                  machine!.tailleCategories[0] === 'grand' ? (isFr ? 'Grand' : 'Large') :
                  (isFr ? 'Très grand' : 'Extra large');
                const sizeColor = machine!.tailleCategories[0] === 'petit' ? 'bg-emerald-500/20 text-emerald-300' :
                  machine!.tailleCategories[0] === 'moyen' ? 'bg-blue-500/20 text-blue-300' :
                  machine!.tailleCategories[0] === 'grand' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-rose-500/20 text-rose-300';

                return (
                  <StaggerItem key={machine!.id}>
                    <Link href={`/studio-photo/${machine!.id}`} className="group block h-full">
                      <SpringCard>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:border-very-peri-400/40 transition-all">
                          {/* Machine image */}
                          <div className="w-full h-[140px] rounded-xl overflow-hidden mb-5 flex items-center justify-center">
                            <Image
                              src={`/images/machines/${machine!.id}.avif`}
                              alt={machine!.nom}
                              width={280}
                              height={140}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>

                          {/* Size badge */}
                          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${sizeColor}`}>
                            {sizeLabel}
                          </span>

                          {/* Name */}
                          <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-very-peri-300 transition-colors">
                            {machine!.nom}
                          </h3>

                          {/* Size info */}
                          <p className="text-sm text-future-dusk-400 mb-4">
                            {isFr ? 'Jusqu\'à' : 'Up to'} {machine!.tailleMax}
                          </p>

                          {/* Arrow */}
                          <div className="flex items-center text-very-peri-400 text-sm font-medium">
                            {isFr ? 'Voir le détail' : 'View details'}
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </SpringCard>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* CTA comparer */}
            <FadeInView className="text-center mt-10">
              <Button asChild variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10">
                <Link href="/studio-photo/selecteur-machines">
                  {isFr ? 'Comparer tous les modèles' : 'Compare all models'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </FadeInView>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          RÉFÉRENCE CLIENT — fond black, témoignage anonymisé
          ═══════════════════════════════════════════════════════════ */}
      {solution.reference && (
        <section className="py-20 lg:py-32 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <ScrollReveal>
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-6 block">
                {isFr ? 'RETOUR TERRAIN' : 'FIELD FEEDBACK'}
              </span>
              <blockquote className="text-2xl lg:text-3xl font-heading text-white leading-snug mb-8 italic">
                &ldquo;{solution.reference.texte}&rdquo;
              </blockquote>
              <div>
                <p className="text-white font-semibold">{solution.reference.role}</p>
                <p className="text-future-dusk-400 text-sm">{solution.reference.secteur}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          FAQ — fond future-dusk-0, split sticky heading + accordion
          ═══════════════════════════════════════════════════════════ */}
      {solution.faq && solution.faq.length > 0 && (
        <section className="py-20 lg:py-32 bg-future-dusk-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left — sticky heading */}
              <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
                <FadeInView direction="left">
                  <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                    FAQ
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1]">
                    {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
                  </h2>
                </FadeInView>
              </div>

              {/* Right — accordion */}
              <div className="lg:col-span-3">
                <StaggerContainer className="space-y-4">
                  {solution.faq.map((item, index) => (
                    <StaggerItem key={index}>
                      <details className="group bg-white rounded-xl border border-neutral-100 hover:border-very-peri-200 transition-colors shadow-sm">
                        <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <h3 className="text-base font-semibold text-heading-dark text-left">
                            {item.question}
                          </h3>
                          <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-neutral-medium leading-relaxed">{item.answer}</p>
                        </div>
                      </details>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          CTA FINAL — Pattern ADN bg-black + 2 cartes distinctes
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 lg:mb-16">
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6">
                {solution.cta.titre}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto leading-relaxed">
                {solution.cta.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Carte principale — gradient peri */}
            <FadeInView direction="left" className="lg:col-span-3">
              <div className="bg-gradient-to-br from-very-peri-600 to-very-peri-800 rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-3">
                    {isFr ? 'Réservez votre démo' : 'Book your demo'}
                  </h3>
                  <p className="text-very-peri-100 leading-relaxed mb-8">
                    {isFr
                      ? '30 minutes avec un expert. Voyez nos systèmes en action sur vos propres pièces et composants.'
                      : '30 minutes with an expert. See our systems in action on your own parts and components.'}
                  </p>
                </div>
                <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg w-fit">
                  <Link href="/contact">
                    {isFr ? 'Demander une démo gratuite' : 'Request a free demo'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeInView>

            {/* Carte secondaire — glassmorphism */}
            <FadeInView direction="right" className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {isFr ? 'Calculez votre ROI' : 'Calculate your ROI'}
                  </h3>
                  <p className="text-future-dusk-300 leading-relaxed mb-8">
                    {isFr
                      ? 'Estimez vos économies en 2 minutes. Résultat personnalisé et immédiat.'
                      : 'Estimate your savings in 2 minutes. Personalized and immediate results.'}
                  </p>
                </div>
                <Button asChild size="lg" className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-xl w-fit">
                  <Link href="/calculateur-roi">
                    {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        ...(solution.faq ? [faqSchema(solution.faq)] : []) ,
      ]} />
    </>
  );
}
