import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { MACHINES, getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import type { Machine } from '@/components/calculators/ROICalculator/lib/types';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, AlertTriangle, ArrowRight, ChevronRight, Sparkles, Camera, Ruler, Weight, Zap, Monitor, Award, CalendarDays, GraduationCap, TrendingUp } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, productSchema } from '@/components/seo/SchemaOrg';

// Map machine IDs to local image files
function getMachineImage(id: string): string {
  const imageMap: Record<string, string> = {
    'alphashot-micro-v2': '/images/machines/alphashot-micro-v2.avif',
    'alphashot-360': '/images/machines/alphashot-360.avif',
    'alphashot-g2': '/images/machines/alphashot-360.avif',
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

function getFormationLevel(machine: Machine): string {
  if (machine.tailleCategories.includes('petit')) return 'niveau1';
  if (machine.tailleCategories.includes('grand') || machine.tailleCategories.includes('tres-grand')) return 'niveau3';
  return 'niveau2';
}

const isIAReady = (id: string) =>
  ['alphashot-g2', 'alphashot-micro-v2', 'alphashot-360', 'alphashot-pro-g2'].includes(id);

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export function generateStaticParams() {
  return MACHINES.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);
  if (!machine) return { title: 'Product not found' };

  const isFr = lang === 'fr';
  return {
    title: isFr
      ? `${machine.nom} | Studio Photo Automatisé Orbitvu`
      : `${machine.nom} | Automated Photo Studio Orbitvu`,
    description: isFr
      ? `${machine.nom} : studio photo automatisé pour ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].fr}`
      : `${machine.nom}: automated photo studio for ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].en}`,
    alternates: {
      canonical: `https://packshot-creator.com/${lang}/studio-photo/${slug}`,
      languages: { fr: `/fr/studio-photo/${slug}`, en: `/en/studio-photo/${slug}` },
    },
  };
}

export default async function StudioPhotoProductPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);
  if (!machine) notFound();

  const isFr = lang === 'fr';
  const machineImage = getMachineImage(machine.id);
  const iaReady = isIAReady(machine.id);

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://packshot-creator.com/${lang}` },
    { name: isFr ? 'Studios Photo' : 'Photo Studios', url: `https://packshot-creator.com/${lang}/studios-photo-automatises` },
    { name: machine.nom, url: `https://packshot-creator.com/${lang}/studio-photo/${slug}` },
  ];

  const featureLabels: Record<string, { fr: string; en: string }> = {
    packshot: { fr: 'Packshot', en: 'Packshot' },
    '360': { fr: 'Vue 360°', en: '360° View' },
    video: { fr: 'Vidéo', en: 'Video' },
    'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin' },
    'flat-lay': { fr: 'Flat-Lay', en: 'Flat-Lay' },
    lifestyle: { fr: 'Lifestyle', en: 'Lifestyle' },
  };

  return (
    <>
      {/* Hero Product */}
      <section className="relative bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/studios-photo-automatises"
                className="inline-flex items-center gap-1.5 text-very-peri-300 text-sm font-medium mb-6 hover:text-white transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                {isFr ? 'Tous les studios' : 'All studios'}
              </Link>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-very-peri-500/15 text-very-peri-300 text-sm font-medium px-4 py-1.5 rounded-full">
                  <Camera className="h-4 w-4" /> Orbitvu
                </span>
                {iaReady && (
                  <span className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 text-sm font-medium px-3 py-1.5 rounded-full">
                    <Sparkles className="h-4 w-4" /> IA Ready
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight mb-6">
                {machine.nom}
              </h1>

              <p className="text-lg text-future-dusk-200 leading-relaxed mb-8 max-w-xl">
                {machine.useCases.join(' \u2022 ')}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
                    <Ruler className="h-3.5 w-3.5" /> {isFr ? 'Taille max' : 'Max size'}
                  </div>
                  <div className="font-bold text-white">{machine.tailleMax}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
                    <Weight className="h-3.5 w-3.5" /> {isFr ? 'Poids max' : 'Max weight'}
                  </div>
                  <div className="font-bold text-white">{machine.poidsMax}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
                    <Zap className="h-3.5 w-3.5" /> {isFr ? 'Capacité/jour' : 'Capacity/day'}
                  </div>
                  <div className="font-bold text-white">{machine.capaciteJour} {isFr ? 'produits' : 'products'}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
                    <Monitor className="h-3.5 w-3.5" /> {isFr ? 'Espace requis' : 'Space required'}
                  </div>
                  <div className="font-bold text-white">{machine.spaceRequired}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl shadow-lg shadow-very-peri-500/25">
                  <Link href="/contact">
                    {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 rounded-xl">
                  <Link href="/contact">
                    {isFr ? 'Demander une démo' : 'Request a demo'}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <Image
                  src={machineImage}
                  alt={`Studio photo ${machine.nom}`}
                  width={640}
                  height={480}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IA Ready Banner */}
      {iaReady && (
        <section className="py-12 bg-gradient-to-r from-amber-50 to-very-peri-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-amber-100 text-amber-600">
                  <Sparkles className="h-8 w-8" />
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
                    <Sparkles className="h-3.5 w-3.5" /> IA Ready
                  </span>
                  <span className="text-sm text-future-dusk-500">Compatible BlendAI</span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-2">
                  {isFr ? 'Compatible avec l\'IA générative BlendAI' : 'Compatible with BlendAI generative AI'}
                </h2>
                <p className="text-future-dusk-500">
                  {isFr
                    ? 'Augmentez vos packshots avec des backgrounds générés par IA. Créez des mises en scène illimitées en quelques secondes.'
                    : 'Enhance your packshots with AI-generated backgrounds. Create unlimited scene settings in seconds.'}
                </p>
              </div>
              <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl shrink-0">
                <Link href="/ia-photo-produit">
                  {isFr ? 'Découvrir BlendAI' : 'Discover BlendAI'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Key Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
            {isFr ? 'Avantages clés' : 'Key advantages'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {machine.keyAdvantages.map((advantage, index) => (
              <div key={index} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                  <CheckCircle className="h-5 w-5" />
                </span>
                <p className="font-heading font-bold text-future-dusk-900">
                  {isFr ? advantage.fr : advantage.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
            {isFr ? 'Caractéristiques techniques' : 'Technical specifications'}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-6">
                  {isFr ? 'Dimensions & Capacités' : 'Dimensions & Capacity'}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: isFr ? 'Taille produit max' : 'Max product size', value: machine.tailleMax },
                    { label: isFr ? 'Poids max' : 'Max weight', value: machine.poidsMax },
                    { label: isFr ? 'Capacité journalière' : 'Daily capacity', value: `${machine.capaciteJour} ${isFr ? 'produits' : 'products'}` },
                    { label: isFr ? 'Espace requis' : 'Space required', value: machine.spaceRequired },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3 border-b border-neutral-100">
                      <span className="text-future-dusk-500">{spec.label}</span>
                      <span className="font-medium text-future-dusk-900">{spec.value}</span>
                    </div>
                  ))}
                  {machine.studioFootprint && (
                    <div className="flex justify-between py-3 border-b border-neutral-100">
                      <span className="text-future-dusk-500">{isFr ? 'Encombrement studio' : 'Studio footprint'}</span>
                      <span className="font-medium text-future-dusk-900">
                        {machine.studioFootprint.l}x{machine.studioFootprint.w}x{machine.studioFootprint.h} cm
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-6">
                  {isFr ? 'Fonctionnalités' : 'Features'}
                </h3>
                <div className="space-y-3 mb-8">
                  {machine.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-future-dusk-700">
                        {isFr ? featureLabels[feature]?.fr : featureLabels[feature]?.en}
                      </span>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-4">
                  {isFr ? 'Secteurs idéaux' : 'Ideal sectors'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {machine.idealSectors.map((sector) => (
                    <span
                      key={sector}
                      className="bg-very-peri-50 text-very-peri-700 px-3 py-1.5 rounded-full text-sm font-medium capitalize"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Limitations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">
                {isFr ? 'Cas d\'usage idéaux' : 'Ideal use cases'}
              </h3>
              <ul className="space-y-3">
                {machine.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-future-dusk-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">
                {isFr ? 'Points d\'attention' : 'Points to consider'}
              </h3>
              <ul className="space-y-3">
                {machine.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-future-dusk-700">{isFr ? limitation.fr : limitation.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CTA */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-very-peri-100 text-very-peri-700 mx-auto mb-6">
            <TrendingUp className="h-7 w-7" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-4">
            {isFr ? 'Calculez votre retour sur investissement' : 'Calculate your return on investment'}
          </h2>
          <p className="text-lg text-future-dusk-500 mb-8 max-w-2xl mx-auto">
            {isFr
              ? `Découvrez combien vous pourriez économiser en automatisant votre production de packshots avec le ${machine.nom}.`
              : `Find out how much you could save by automating your packshot production with the ${machine.nom}.`}
          </p>
          <Button asChild size="lg" className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl">
            <Link href="/studios-photo-automatises#calculateur-roi">
              {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Training Recommendation */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-12 text-center">
            {isFr ? 'Formation recommandée' : 'Recommended training'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-very-peri-50 to-very-peri-100/50 rounded-2xl p-8 md:p-10">
            <div className="relative h-64 bg-gradient-to-br from-very-peri-500 to-very-peri-700 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-heading font-bold">PackshotCreator Academy</p>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <Award className="h-3.5 w-3.5" /> Qualiopi
                </span>
                <span className="inline-flex items-center gap-2 bg-very-peri-500/10 text-very-peri-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  OPCO
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
                {isFr ? `Maîtrisez votre ${machine.nom}` : `Master your ${machine.nom}`}
              </h3>

              <p className="text-future-dusk-500 mb-6">
                {isFr
                  ? 'Formez-vous aux studios photo automatisés Orbitvu et maximisez votre productivité. Certifié Qualiopi, financement OPCO disponible.'
                  : 'Train on Orbitvu automated photo studios and maximize your productivity. Qualiopi certified, OPCO funding available.'}
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  isFr ? 'Prise en main complète de votre studio' : 'Full studio onboarding',
                  isFr ? 'Optimisation des workflows de production' : 'Production workflow optimization',
                  isFr ? 'Best practices e-commerce et marketplaces' : 'E-commerce and marketplace best practices',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-very-peri-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-future-dusk-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl">
                  <Link href="/academy/formations-packshot">
                    {isFr ? 'Voir les formations' : 'View training'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/academy/calendrier">
                    <CalendarDays className="mr-2 h-4 w-4" /> {isFr ? 'Calendrier' : 'Calendar'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            {isFr ? 'Prêt à transformer votre production ?' : 'Ready to transform your production?'}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8">
            {isFr
              ? `Testez le ${machine.nom} lors d'une démo personnalisée dans nos showrooms`
              : `Try the ${machine.nom} during a personalized demo in our showrooms`}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/contact">
                {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/studios-photo-automatises">
                {isFr ? 'Voir tous les studios' : 'View all studios'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SchemaOrg schema={[
        organizationSchema(),
        breadcrumbSchema(breadcrumbs),
        productSchema({
          name: machine.nom,
          description: `${machine.nom}: ${machine.useCases.join(', ')}`,
          image: `https://packshot-creator.com${machineImage}`,
          url: `https://packshot-creator.com/${lang}/studio-photo/${slug}`,
          brand: 'Orbitvu',
          category: isFr ? 'Studio Photo Automatisé' : 'Automated Photo Studio',
        }),
      ]} />
    </>
  );
}
