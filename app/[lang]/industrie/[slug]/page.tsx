import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { secteurs } from '@/data/secteurs';
import { CheckCircle, ArrowRight, ChevronRight, Camera, Sparkles, FileText, ClipboardCheck, Scale } from 'lucide-react';
import { solutions } from '@/data/solutions';
import { Button } from '@/components/ui/button';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import { SECTOR_MACHINE_MAP } from '@/data/sector-machine-map';
import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { HeroSection, HeroImage } from '@/components/hero';

/** Maps sector data slugs to hero image filename bases in /public/images/hero/ */
const SECTOR_HERO_IMAGE_MAP: Record<string, string> = {
  'chaussures': 'hero-secteur-chaussures',
  'bijoux-joaillerie': 'hero-secteur-bijoux',
  'mobilier-decoration': 'hero-secteur-mobilier',
  'electronique-hightech': 'hero-secteur-hightech',
  'mode-textile': 'hero-secteur-mode',
  'food-alimentaire': 'hero-secteur-food',
  'lunetterie': 'hero-secteur-lunetterie',
  'cosmetiques-beaute': 'hero-secteur-cosmetiques',
  'sante-medical': 'hero-secteur-sante',
  'sport-outdoor': 'hero-secteur-sport',
  'vin-spiritueux': 'hero-secteur-vin-spiritueux',
  'jouets-puericulture': 'hero-secteur-jouets',
  'pieces-techniques-industrie': 'hero-secteur-pieces-tech',
  'automobile-pieces-detachees': 'hero-secteur-automobile',
  'industrie-manufacturiere': 'hero-secteur-industrie-manufacturiere',
  'defense-securite': 'hero-secteur-defense-securite',
};

/** Maps machine IDs to their image paths in /public/images/machines/ */
function getMachineImage(id: string): string {
  const imageMap: Record<string, string> = {
    'alphashot-micro-v2': '/images/machines/alphashot-micro-v2.avif',
    'alphashot-360': '/images/machines/alphashot-360.avif',
    'alphashot-g2': '/images/machines/alphashot-pro-g2.avif',
    'alphashot-pro-g2': '/images/machines/alphashot-pro-g2.avif',
    'alphashot-xl-v2': '/images/machines/alphashot-xl.avif',
    'alphashot-xl-wine-v2': '/images/machines/alphashot-xl.avif',
    'alphashot-xl-pro-v2': '/images/machines/alphashot-xl.avif',
    'alphadesk': '/images/machines/alphatable-alphadesk.avif',
    'alphatable': '/images/machines/alphatable-alphadesk.avif',
    'alphastudio-compact-v2': '/images/machines/alphastudio-compact.avif',
    'alphastudio-xxl-v2': '/images/machines/alphastudio-xxl.avif',
    'fashion-studio-basic': '/images/machines/fashion-studio.avif',
    'fashion-studio': '/images/machines/fashion-studio.avif',
    'bike-studio': '/images/machines/bike-studio.avif',
    'furniture-studio': '/images/machines/furniture-studio.avif',
    'e-comm-studio-plus': '/images/machines/ecomm-studio-plus.avif',
  };
  return imageMap[id] || '/images/machines/placeholder-medium.svg';
}

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateStaticParams() {
  return secteurs.map((secteur) => ({ slug: secteur.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const secteur = secteurs.find((s) => s.slug === slug);
  if (!secteur) return { title: 'Secteur non trouvé' };

  return {
    title: secteur.titre,
    description: secteur.description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie/${slug}`,
      languages: { fr: `/fr/industrie/${slug}`, en: `/en/industrie/${slug}` },
    },
    openGraph: {
      title: secteur.titre,
      description: secteur.description,
      images: [{ url: `/api/og?title=${encodeURIComponent(secteur.titre)}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function SecteurPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const secteur = secteurs.find((s) => s.slug === slug);
  if (!secteur) notFound();

  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Industries', url: `https://www.packshot-creator.com/${lang}/industrie` },
    { name: secteur.titre.split(':')[0].trim(), url: `https://www.packshot-creator.com/${lang}/industrie/${slug}` },
  ];

  const otherSectors = DEFAULT_SECTORS.filter((s) => s.slug !== slug).slice(0, 8);

  /* Featured solution (first) + remaining solutions */
  const [featuredSolution, ...otherSolutions] = secteur.solutions.items;

  /* Machines recommandées pour ce secteur */
  const machineIds = SECTOR_MACHINE_MAP[slug] || [];
  const recommendedMachines = machineIds
    .map((id) => MACHINES.find((m) => m.id === id))
    .filter(Boolean);

  /* Solutions industrielles pertinentes pour ce secteur */
  const relevantSolutions = solutions.filter((sol) =>
    sol.secteurs.items.some((s) => s.slug === slug)
  );

  const solutionIcons: Record<string, React.ReactNode> = {
    'documentation-technique-visuelle': <FileText className="h-5 w-5" />,
    'documentation-qualite-produit': <ClipboardCheck className="h-5 w-5" />,
    'documentation-probatoire': <Scale className="h-5 w-5" />,
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — Split layout via HeroSection
          ═══════════════════════════════════════════════════════════ */}
      <HeroSection
        layout="split"
        badge={{
          icon: <ChevronRight className="h-3.5 w-3.5 rotate-180" />,
          label: isFr ? 'Toutes les industries' : 'All industries',
          colorClass: 'text-very-peri-300',
        }}
        title={secteur.hero.titre}
        subtitle={secteur.hero.description}
        ctas={[
          { label: isFr ? 'Demander un devis gratuit' : 'Get a free quote', href: '/contact', variant: 'primary' },
          { label: isFr ? 'Découvrir nos formations' : 'Discover our training', href: '/academy', variant: 'secondary' },
        ]}
        media={
          <div className="w-full h-[360px] lg:h-[440px] rounded-2xl overflow-hidden">
            {SECTOR_HERO_IMAGE_MAP[slug] ? (
              <HeroImage
                basePath={`/images/hero/${SECTOR_HERO_IMAGE_MAP[slug]}`}
                alt={secteur.hero.titre}
                priority
                className="rounded-2xl"
              />
            ) : (
              <div className="w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 rounded-2xl">
                <Camera className="w-12 h-12 text-white/20" strokeWidth={1} />
              </div>
            )}
          </div>
        }
      >
        <p className="text-xl text-very-peri-200 font-medium mt-4">
          {secteur.hero.sousTitre}
        </p>
      </HeroSection>

      {/* ═══════════════════════════════════════════════════════════
          PROBLÉMATIQUES — fond future-dusk-0, split heading + ghost numbers
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-future-dusk-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — sticky heading + image */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FadeInView direction="left">
                <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'VOS DÉFIS' : 'YOUR CHALLENGES'}
                </span>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                  {secteur.problematiques.titre}
                </h2>
                <p className="text-neutral-medium leading-relaxed mb-8">
                  {isFr
                    ? 'Des contraintes spécifiques qui freinent votre production visuelle.'
                    : 'Specific constraints that slow down your visual production.'}
                </p>
              </FadeInView>
            </div>

            {/* Right — items with ghost numbers */}
            <div className="lg:col-span-3">
              <StaggerContainer className="space-y-6">
                {secteur.problematiques.items.map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="relative bg-white rounded-2xl p-6 lg:p-8 border border-neutral-100 hover:border-very-peri-200 transition-colors shadow-sm overflow-hidden">
                      {/* Ghost number */}
                      <span className="absolute -top-3 -right-2 text-7xl lg:text-8xl font-heading font-bold text-neutral-100 select-none leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {/* Content */}
                      <div className="relative z-10">
                        <p className="text-future-dusk-800 leading-relaxed text-lg font-medium">{item}</p>
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
          SOLUTIONS — fond white, piliers côte à côte (2) ou featured+grille (3+)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView direction="right" className="text-center mb-16">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {isFr ? 'NOS SOLUTIONS' : 'OUR SOLUTIONS'}
            </span>
            <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1]">
              {secteur.solutions.titre}
            </TextReveal>
          </FadeInView>

          {/* === LAYOUT 2 SOLUTIONS : side-by-side piliers === */}
          {secteur.solutions.items.length === 2 && (
            <div className="grid lg:grid-cols-2 gap-6">
              {secteur.solutions.items.map((solution, index) => {
                const isIa = solution.type === 'ia';
                const isHw = solution.type === 'hardware';
                return (
                  <FadeInView key={index} direction={index === 0 ? 'left' : 'right'}>
                    <SpringCard>
                      <div className={`rounded-2xl overflow-hidden h-full ${
                        isIa ? 'bg-gradient-to-br from-amber-900 to-amber-950' : 'bg-future-dusk-900'
                      }`}>
                        {/* Image placeholder top */}
                        <div className={`w-full h-[180px] flex items-center justify-center ${
                          isIa ? 'bg-amber-800/30' : 'bg-future-dusk-800/50'
                        }`}>
                          <div className="text-center">
                            {isIa ? (
                              <Sparkles className="w-10 h-10 text-amber-400/30 mx-auto mb-1" strokeWidth={1} />
                            ) : (
                              <Camera className="w-10 h-10 text-very-peri-400/30 mx-auto mb-1" strokeWidth={1} />
                            )}
                            <p className="text-xs text-white/15">{isFr ? 'Visuel solution' : 'Solution visual'}</p>
                          </div>
                        </div>

                        <div className="p-8 lg:p-10">
                          {/* Type badge */}
                          {solution.type && (
                            <div className="flex items-center gap-2 mb-5">
                              {isHw ? (
                                <Camera className="h-4 w-4 text-very-peri-400" />
                              ) : (
                                <Sparkles className="h-4 w-4 text-amber-400" />
                              )}
                              <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${
                                isHw ? 'text-very-peri-400' : 'text-amber-400'
                              }`}>
                                {isHw ? 'STUDIO ORBITVU' : 'BLENDAI.STUDIO'}
                              </span>
                            </div>
                          )}

                          <h3 className="text-2xl font-heading font-bold text-white mb-3">
                            {solution.titre}
                          </h3>
                          <p className="text-future-dusk-300 leading-relaxed mb-6">
                            {solution.description}
                          </p>
                          <ul className="space-y-3">
                            {solution.avantages.map((avantage, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${
                                  isIa ? 'text-amber-400' : 'text-very-peri-400'
                                }`} />
                                <span className="text-sm text-future-dusk-200">{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </SpringCard>
                  </FadeInView>
                );
              })}
            </div>
          )}

          {/* === LAYOUT 3+ SOLUTIONS : toutes en grille === */}
          {secteur.solutions.items.length >= 3 && (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secteur.solutions.items.map((solution, index) => {
                const isIa = solution.type === 'ia';
                const isHw = solution.type === 'hardware';
                return (
                  <StaggerItem key={index}>
                    <SpringCard>
                      <div className={`rounded-2xl overflow-hidden h-full ${
                        isIa ? 'bg-gradient-to-br from-amber-900 to-amber-950' :
                        isHw ? 'bg-future-dusk-900' :
                        'bg-future-dusk-900'
                      }`}>
                        <div className="p-8">
                          {/* Type badge */}
                          {solution.type && (
                            <div className="flex items-center gap-2 mb-4">
                              {isHw ? (
                                <Camera className="h-3.5 w-3.5 text-very-peri-400" />
                              ) : (
                                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                              )}
                              <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                                isHw ? 'text-very-peri-400' : 'text-amber-400'
                              }`}>
                                {isHw ? 'STUDIO ORBITVU' : 'BLENDAI.STUDIO'}
                              </span>
                            </div>
                          )}

                          {/* Ghost number */}
                          <span className="text-5xl font-heading font-bold text-white/5 leading-none mb-3 block">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <h3 className="text-xl font-heading font-bold text-white mb-3">
                            {solution.titre}
                          </h3>
                          <p className="text-future-dusk-300 mb-5 leading-relaxed text-sm">{solution.description}</p>
                          <ul className="space-y-2.5">
                            {solution.avantages.map((avantage, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${
                                  isIa ? 'text-amber-400' : 'text-very-peri-400'
                                }`} />
                                <span className="text-xs text-future-dusk-300">{avantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </SpringCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          AU-DELÀ DU PACKSHOT — fond very-peri-50, idées d'application
          ═══════════════════════════════════════════════════════════ */}
      {secteur.useCases && secteur.useCases.length > 0 && (
        <section className="py-20 lg:py-32 bg-very-peri-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView direction="left" className="text-center mb-16">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'AU-DELÀ DU PACKSHOT' : 'BEYOND THE PACKSHOT'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-heading-dark leading-[1.1] mb-6">
                {isFr ? 'Et si vos studios faisaient bien plus ?' : 'What if your studios did much more?'}
              </TextReveal>
              <p className="text-lg text-neutral-medium max-w-2xl mx-auto leading-relaxed">
                {isFr
                  ? 'Des applications auxquelles on ne pense pas toujours — et qui peuvent transformer vos processus.'
                  : 'Applications you might not expect — that can transform your processes.'}
              </p>
            </FadeInView>

            <StaggerContainer className={`grid gap-6 ${
              secteur.useCases.length <= 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
              secteur.useCases.length === 3 ? 'md:grid-cols-3' :
              'md:grid-cols-2'
            }`}>
              {secteur.useCases.map((uc, index) => (
                <StaggerItem key={index}>
                  <SpringCard>
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      {/* Ghost number */}
                      <span className="text-5xl font-heading font-bold text-very-peri-100 leading-none mb-4">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-heading font-bold text-heading-dark mb-2">
                        {uc.titre}
                      </h3>

                      {/* Process description */}
                      <p className="text-neutral-medium leading-relaxed mb-5 flex-1">
                        {uc.processus}
                      </p>

                      {/* Orbitvu features tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {uc.fonctionsOrbitvu.map((fn, idx) => (
                          <span key={idx} className="inline-block text-xs font-medium bg-very-peri-100 text-very-peri-700 px-3 py-1 rounded-full">
                            {fn}
                          </span>
                        ))}
                      </div>

                      {/* Value */}
                      <div className="border-t border-neutral-100 pt-4">
                        <p className="text-sm font-semibold text-heading-dark">
                          {uc.valeur}
                        </p>
                      </div>
                    </div>
                  </SpringCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          DOCUMENTATION INDUSTRIELLE — fond white, liens vers solutions
          ═══════════════════════════════════════════════════════════ */}
      {relevantSolutions.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView className="text-center mb-12">
              <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'DOCUMENTATION INDUSTRIELLE' : 'INDUSTRIAL DOCUMENTATION'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-[1.1]">
                {isFr ? 'Allez plus loin avec nos solutions dédiées' : 'Go further with our dedicated solutions'}
              </h2>
            </FadeInView>

            <StaggerContainer className={`grid gap-6 ${
              relevantSolutions.length === 1 ? 'max-w-lg mx-auto' :
              relevantSolutions.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
              'md:grid-cols-3'
            }`}>
              {relevantSolutions.map((sol) => {
                const secteurData = sol.secteurs.items.find((s) => s.slug === slug);
                return (
                  <StaggerItem key={sol.slug}>
                    <Link href={`/solutions/${sol.slug}`} className="group block h-full">
                      <SpringCard>
                        <div className="bg-future-dusk-0 rounded-2xl p-6 lg:p-8 border border-neutral-100 hover:border-very-peri-300 transition-all h-full flex flex-col">
                          <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-50 text-very-peri-600 mb-4">
                            {solutionIcons[sol.slug] || <FileText className="h-5 w-5" />}
                          </span>
                          <h3 className="text-lg font-heading font-bold text-heading-dark mb-2 group-hover:text-very-peri-600 transition-colors">
                            {sol.hero.badge}
                          </h3>
                          {secteurData && (
                            <p className="text-sm text-neutral-medium leading-relaxed flex-1 mb-4">
                              {secteurData.useCase}
                            </p>
                          )}
                          <div className="flex items-center text-very-peri-600 text-sm font-medium">
                            {isFr ? 'Découvrir cette solution' : 'Discover this solution'}
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
      )}

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
                  {isFr ? 'Les systèmes adaptés à votre secteur' : 'Systems tailored to your sector'}
                </TextReveal>
                <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto leading-relaxed">
                  {isFr
                    ? 'Studios photo automatisés Orbitvu sélectionnés pour répondre aux contraintes de votre métier.'
                    : 'Automated Orbitvu photo studios selected to meet the constraints of your industry.'}
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className={`grid gap-6 ${
              recommendedMachines.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
              recommendedMachines.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
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
                          <div className="w-full h-[140px] rounded-xl flex items-center justify-center mb-5 overflow-hidden bg-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getMachineImage(machine!.id)}
                              alt={machine!.nom}
                              className="w-full h-full object-contain p-3"
                              loading="lazy"
                              decoding="async"
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
          FAQ — fond future-dusk-0, split sticky heading + accordion
          ═══════════════════════════════════════════════════════════ */}
      {secteur.faq && secteur.faq.length > 0 && (
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
                  {secteur.faq.map((item, index) => (
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
                {secteur.cta.titre}
              </TextReveal>
              <p className="text-lg text-future-dusk-300 max-w-2xl mx-auto leading-relaxed">
                {secteur.cta.description}
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
                      ? '30 minutes avec un expert. Voyez nos systèmes en action sur vos propres produits.'
                      : '30 minutes with an expert. See our systems in action on your own products.'}
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

      {/* ═══════════════════════════════════════════════════════════
          PACKSHOT LANDING — lien vers la landing page associée
          ═══════════════════════════════════════════════════════════ */}
      {(() => {
        const SECTOR_PACKSHOT_MAP: Record<string, { href: string; labelFr: string; labelEn: string }> = {
          'bijoux-joaillerie': { href: '/packshot-bijoux', labelFr: 'Packshot Bijoux', labelEn: 'Jewelry Packshot' },
          'mode-textile': { href: '/packshot-mode', labelFr: 'Packshot Mode', labelEn: 'Fashion Packshot' },
          'chaussures': { href: '/packshot-mode', labelFr: 'Packshot Mode', labelEn: 'Fashion Packshot' },
          'industrie-manufacturiere': { href: '/packshot-industriel', labelFr: 'Packshot Industriel', labelEn: 'Industrial Packshot' },
          'defense-securite': { href: '/industrie-defense', labelFr: 'Industrie & Défense', labelEn: 'Industry & Defense' },
          'e-commerce-marketplace': { href: '/packshot-e-commerce', labelFr: 'Packshot E-commerce', labelEn: 'E-commerce Packshot' },
          'food-alimentaire': { href: '/packshot-e-commerce', labelFr: 'Packshot E-commerce', labelEn: 'E-commerce Packshot' },
          'lunetterie': { href: '/packshot-bijoux', labelFr: 'Packshot Bijoux', labelEn: 'Jewelry Packshot' },
          'cosmetique-parfumerie': { href: '/packshot-e-commerce', labelFr: 'Packshot E-commerce', labelEn: 'E-commerce Packshot' },
          'vin-spiritueux': { href: '/packshot-e-commerce', labelFr: 'Packshot E-commerce', labelEn: 'E-commerce Packshot' },
        };
        const mapping = SECTOR_PACKSHOT_MAP[secteur.slug];
        if (!mapping) return null;
        return (
          <section className="py-12 bg-very-peri-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <FadeInView>
                <p className="text-sm text-future-dusk-500 mb-3">
                  {isFr ? 'Guide spécialisé pour votre secteur' : 'Specialized guide for your sector'}
                </p>
                <Link
                  href={mapping.href}
                  className="inline-flex items-center gap-2 text-lg font-heading font-bold text-very-peri-600 hover:text-very-peri-700 transition-colors"
                >
                  {isFr ? mapping.labelFr : mapping.labelEn}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </FadeInView>
            </div>
          </section>
        );
      })()}

      {/* ═══════════════════════════════════════════════════════════
          CROSS-LINKS — fond white, autres secteurs
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView className="text-center mb-10">
            <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
              {isFr ? 'AUTRES SECTEURS' : 'OTHER SECTORS'}
            </span>
            <h3 className="text-3xl lg:text-4xl font-heading font-bold text-heading-dark">
              {isFr ? 'Découvrez nos autres secteurs' : 'Discover our other sectors'}
            </h3>
          </FadeInView>
          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherSectors.map((other) => (
              <StaggerItem key={other.slug}>
                <Link
                  href={`/industrie/${other.slug}`}
                  className="group flex items-center gap-3 bg-future-dusk-0 rounded-xl p-4 border border-neutral-100 hover:border-very-peri-300 hover:shadow-sm transition-all"
                >
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-very-peri-50 text-very-peri-600 shrink-0">
                    <other.Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-future-dusk-800 group-hover:text-very-peri-600 transition-colors">
                    {other.name}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInView className="text-center mt-8">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/industrie">
                {isFr ? 'Voir tous les secteurs' : 'View all sectors'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeInView>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        ...(secteur.faq ? [faqSchema(secteur.faq)] : []),
      ]} />
    </>
  );
}
