import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { MACHINES, getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import type { Machine } from '@/components/calculators/ROICalculator/lib/types';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, AlertTriangle, ArrowRight, ChevronRight, Sparkles, Camera, Ruler, Weight, Zap, Monitor, Award, CalendarDays, GraduationCap, BarChart3, MessageCircleQuestion, ArrowLeftRight, Play, ImageIcon, Eye } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, productSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { HeroSection } from '@/components/hero';
import { YouTubeFacade } from '@/components/video/YouTubeFacade';

// Map machine IDs to local image files
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

interface ProductGallery {
  /** Bento grid — large packshot result (row1 left, 7/12) */
  bentoPackshot?: { src: string; alt: { fr: string; en: string }; w: number; h: number };
  /** Bento grid — demo video YouTube embed (row1 right, 5/12) */
  bentoVideo?: { youtubeId: string; poster?: string };
  /** Bento grid — row2 images (360°, reflective, etc.) */
  bentoRow2?: Array<{ src: string; alt: { fr: string; en: string }; w: number; h: number }>;
  /** Key advantage featured image */
  advantageHero?: { src: string; alt: { fr: string; en: string }; w: number; h: number };
  /** Hardware component images */
  hardware?: Array<{ src: string; alt: { fr: string; en: string }; label: { fr: string; en: string }; w: number; h: number }>;
  /** Software feature screenshots */
  software?: Array<{ src: string; alt: { fr: string; en: string }; label: { fr: string; en: string }; w: number; h: number }>;
  /** Accessory images */
  accessories?: Array<{ src: string; alt: { fr: string; en: string }; label: { fr: string; en: string }; w: number; h: number }>;
}

function getProductGallery(id: string): ProductGallery {
  const base = `/images/machines/${id}`;
  const galleries: Record<string, ProductGallery> = {
    'alphashot-pro-g2': {
      bentoPackshot: {
        src: `${base}/packshot-mascara.avif`,
        alt: { fr: 'Packshot mascara NARS réalisé avec l\'Alphashot Pro G2', en: 'NARS mascara packshot made with the Alphashot Pro G2' },
        w: 1080, h: 1080,
      },
      bentoVideo: {
        youtubeId: 'tR-6RBucmWw',
        poster: `${base}/session.avif`,
      },
      bentoRow2: [
        { src: `${base}/packshot-sunglasses-360.avif`, alt: { fr: 'Vue 360° lunettes de soleil', en: '360° sunglasses view' }, w: 600, h: 600 },
        { src: `${base}/packshot-eyeshadow.avif`, alt: { fr: 'Packshot palette maquillage fond blanc', en: 'Eyeshadow palette white background packshot' }, w: 1080, h: 1080 },
      ],
      advantageHero: {
        src: `${base}/soft-ai-detourage.avif`,
        alt: { fr: 'Détourage automatique par IA — Orbitvu Station', en: 'AI automatic background removal — Orbitvu Station' },
        w: 1305, h: 1100,
      },
      hardware: [
        { src: `${base}/hw-panel-lighting.avif`, alt: { fr: 'Panneau d\'éclairage LED virtuel', en: 'Virtual LED lighting panel' }, label: { fr: 'Éclairage virtuel', en: 'Virtual lighting' }, w: 439, h: 435 },
        { src: `${base}/hw-turntable.avif`, alt: { fr: 'Plateau tournant motorisé intégré', en: 'Integrated motorized turntable' }, label: { fr: 'Plateau motorisé', en: 'Motorized turntable' }, w: 439, h: 435 },
      ],
      software: [
        { src: `${base}/soft-lighting.avif`, alt: { fr: 'Contrôle d\'éclairage intelligent Orbitvu Station', en: 'Smart lighting control Orbitvu Station' }, label: { fr: 'Contrôle éclairage', en: 'Lighting control' }, w: 1305, h: 1100 },
        { src: `${base}/soft-postprod.avif`, alt: { fr: 'Post-production automatique Orbitvu Station', en: 'Automatic post-production Orbitvu Station' }, label: { fr: 'Post-production', en: 'Post-production' }, w: 1305, h: 1100 },
        { src: `${base}/soft-export.avif`, alt: { fr: 'Export multi-canal Orbitvu Station', en: 'Multi-channel export Orbitvu Station' }, label: { fr: 'Export multi-canal', en: 'Multi-channel export' }, w: 1304, h: 1100 },
        { src: `${base}/soft-ai-detourage.avif`, alt: { fr: 'Détourage IA automatique Orbitvu Station', en: 'AI background removal Orbitvu Station' }, label: { fr: 'Détourage IA', en: 'AI background removal' }, w: 1305, h: 1100 },
      ],
    },
  };
  return galleries[id] || {};
}

function getFormationLevel(machine: Machine): string {
  if (machine.tailleCategories.includes('petit')) return 'niveau1';
  if (machine.tailleCategories.includes('grand') || machine.tailleCategories.includes('tres-grand')) return 'niveau3';
  return 'niveau2';
}

const isIAReady = (id: string) =>
  ['alphashot-g2', 'alphashot-micro-v2', 'alphashot-360', 'alphashot-pro-g2'].includes(id);

function getSimilarMachines(machine: Machine): Machine[] {
  return MACHINES.filter(
    (m) =>
      m.id !== machine.id &&
      m.tailleCategories.some((cat) => machine.tailleCategories.includes(cat))
  ).slice(0, 3);
}

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export function generateStaticParams() {
  return MACHINES.map((machine) => ({ slug: machine.id }));
}

// SEO overrides for specific product pages (keyword + CTR optimization)
const seoOverrides: Record<string, { fr: { title: string; description: string }; en: { title: string; description: string } }> = {
  'alphashot-360': {
    fr: {
      title: 'Photo 360 Produit | Alphashot 360 — Studio Automatisé Orbitvu',
      description: 'Creez des photos 360 produit automatisees avec l\'Alphashot 360 Orbitvu. Rotation interactive, fond blanc, detourage automatique. Demandez une demo gratuite.',
    },
    en: {
      title: '360 Product Photography | Alphashot 360 — Automated Orbitvu Studio',
      description: 'Create automated 360 product photos with the Alphashot 360 by Orbitvu. Interactive rotation, white background, auto clipping. Request a free demo.',
    },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);
  if (!machine) return { title: 'Product not found' };

  const isFr = lang === 'fr';
  const override = seoOverrides[slug];

  const title = override
    ? (isFr ? override.fr.title : override.en.title)
    : isFr
      ? `${machine.nom} | Studio Photo Automatisé Orbitvu`
      : `${machine.nom} | Automated Photo Studio Orbitvu`;

  const description = override
    ? (isFr ? override.fr.description : override.en.description)
    : isFr
      ? `${machine.nom} — Distributeur officiel Orbitvu. Studio photo automatisé pour ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].fr}`
      : `${machine.nom} — Official Orbitvu distributor. Automated photo studio for ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].en}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/studio-photo/${slug}`,
      languages: { fr: `/fr/studio-photo/${slug}`, en: `/en/studio-photo/${slug}` },
    },
    openGraph: {
      title,
      images: [{ url: `/api/og?title=${encodeURIComponent(machine.nom)}&type=product&lang=${lang}`, width: 1200, height: 630 }],
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
  const gallery = getProductGallery(machine.id);

  const similarMachines = getSimilarMachines(machine);
  const faqItems = machine.faqItems || [];
  const keyStats = machine.keyStats || [];

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: isFr ? 'Studios Photo' : 'Photo Studios', url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises` },
    { name: machine.nom, url: `https://www.packshot-creator.com/${lang}/studio-photo/${slug}` },
  ];

  const featureLabels: Record<string, { fr: string; en: string }> = {
    packshot: { fr: 'Packshot', en: 'Packshot' },
    '360': { fr: 'Vue 360°', en: '360° View' },
    video: { fr: 'Vidéo', en: 'Video' },
    'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin' },
    'flat-lay': { fr: 'Flat-Lay', en: 'Flat-Lay' },
    lifestyle: { fr: 'Lifestyle', en: 'Lifestyle' },
  };

  const sectorLabels: Record<string, { fr: string; en: string }> = {
    jewelry: { fr: 'Bijouterie', en: 'Jewelry' },
    cosmetics: { fr: 'Cosmétiques', en: 'Cosmetics' },
    electronics: { fr: 'Électronique', en: 'Electronics' },
    general: { fr: 'Général', en: 'General' },
    footwear: { fr: 'Chaussures', en: 'Footwear' },
    bags: { fr: 'Maroquinerie', en: 'Bags' },
    wine: { fr: 'Vins & Spiritueux', en: 'Wine & Spirits' },
    fashion: { fr: 'Mode', en: 'Fashion' },
    furniture: { fr: 'Mobilier', en: 'Furniture' },
    sports: { fr: 'Sport', en: 'Sports' },
    cycling: { fr: 'Cycles', en: 'Cycling' },
    appliances: { fr: 'Électroménager', en: 'Appliances' },
    automotive: { fr: 'Automobile', en: 'Automotive' },
  };

  return (
    <>
      {/* Hero Product */}
      <HeroSection
        layout="split"
        badge={{
          icon: <ChevronRight className="h-3.5 w-3.5 rotate-180" />,
          label: isFr ? 'Tous les studios' : 'All studios',
          colorClass: 'text-very-peri-300',
        }}
        title={machine.nom}
        subtitle={machine.useCases.join(' \u2022 ')}
        ctas={[
          { label: isFr ? 'Demander un devis' : 'Request a quote', href: '/contact', variant: 'primary' },
          { label: isFr ? 'Demander une démo' : 'Request a demo', href: '/contact', variant: 'secondary' },
        ]}
        media={
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
        }
      >
        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-4 -mb-2">
          <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full">
            <Award className="h-4 w-4" /> {isFr ? 'Distributeur Exclusif Orbitvu France & Suisse' : 'Exclusive Orbitvu Distributor France & Switzerland'}
          </span>
          <span className="inline-flex items-center gap-2 bg-very-peri-500/15 text-very-peri-300 text-sm font-medium px-4 py-1.5 rounded-full">
            <Camera className="h-4 w-4" /> Orbitvu
          </span>
          {iaReady && (
            <span className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 text-sm font-medium px-3 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4" /> IA Ready
            </span>
          )}
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-4 mt-8">
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
      </HeroSection>

      {/* IA Ready Banner */}
      {iaReady && (
        <section className="py-12 bg-gradient-to-r from-amber-50 to-very-peri-50">
          <FadeInView>
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
          </FadeInView>
        </section>
      )}

      {/* Product Story — Apple-style: immersive narrative + bento gallery */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Headline — centered, Apple-style breathing */}
          <FadeInView>
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {machine.nom}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                {isFr
                  ? 'Studio photo IA pour la photographie de produits'
                  : 'AI photo studio for product photography'}
              </TextReveal>
              <p className="text-lg lg:text-xl text-future-dusk-500 leading-relaxed">
                {isFr
                  ? <>Le {machine.nom} est la première solution de photographie alimentée par l&apos;IA. Équipé de <strong className="text-future-dusk-900 font-semibold">lampes virtuelles</strong> et d&apos;un <strong className="text-future-dusk-900 font-semibold">assistant IA intelligent</strong>, il reproduit un studio professionnel dans un format compact.</>
                  : <>The {machine.nom} is the first AI-powered photography solution. Equipped with <strong className="text-future-dusk-900 font-semibold">virtual lights</strong> and an <strong className="text-future-dusk-900 font-semibold">intelligent AI assistant</strong>, it replicates a professional studio in a compact format.</>}
              </p>
            </div>
          </FadeInView>

          {/* Bento grid — Apple "Points forts" style */}
          {/* Row 1: 7/5 split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 mb-4 lg:mb-5">
            <ScrollReveal className="lg:col-span-7">
              <div className="relative bg-neutral-100 rounded-2xl overflow-hidden h-72 lg:h-[420px] group">
                {gallery.bentoPackshot ? (
                  <Image
                    src={gallery.bentoPackshot.src}
                    alt={isFr ? gallery.bentoPackshot.alt.fr : gallery.bentoPackshot.alt.en}
                    width={gallery.bentoPackshot.w}
                    height={gallery.bentoPackshot.h}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-future-dusk-400 p-8">
                    <ImageIcon className="h-12 w-12 mb-4 opacity-30" />
                    <p className="text-sm font-medium text-center opacity-50">
                      {isFr ? 'Photo packshot — fond blanc automatique' : 'Packshot photo — automatic white background'}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-future-dusk-700 text-xs font-medium px-3 py-1.5 rounded-full">Packshot</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal offset={20} className="lg:col-span-5">
              {gallery.bentoVideo ? (
                <YouTubeFacade
                  videoId={gallery.bentoVideo.youtubeId}
                  poster={gallery.bentoVideo.poster}
                  title={`${machine.nom} demo`}
                  badge={isFr ? 'Vidéo démo' : 'Demo video'}
                  className="h-72 lg:h-[420px]"
                />
              ) : (
                <div className="relative bg-future-dusk-900 rounded-2xl overflow-hidden h-72 lg:h-[420px] group">
                  <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <div className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-very-peri-500/80 transition-all group-hover:scale-110">
                      <Play className="h-7 w-7 text-white ml-1" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-white/60">
                      {isFr ? `Découvrez le ${machine.nom} en action` : `See the ${machine.nom} in action`}
                    </p>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-very-peri-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {isFr ? 'Vidéo démo' : 'Demo video'}
                    </span>
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Row 2: thirds */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            <ScrollReveal offset={30}>
              <div className="relative bg-neutral-100 rounded-2xl overflow-hidden h-52 lg:h-64 group">
                {gallery.bentoRow2?.[0] ? (
                  <Image
                    src={gallery.bentoRow2[0].src}
                    alt={isFr ? gallery.bentoRow2[0].alt.fr : gallery.bentoRow2[0].alt.en}
                    width={gallery.bentoRow2[0].w}
                    height={gallery.bentoRow2[0].h}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-future-dusk-400 p-4">
                    <Eye className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-xs font-medium text-center opacity-50">
                      {isFr ? 'Animation 360°' : '360° animation'}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-future-dusk-700 text-xs font-medium px-3 py-1.5 rounded-full">360°</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal offset={40}>
              <div className="relative bg-neutral-100 rounded-2xl overflow-hidden h-52 lg:h-64 group">
                {gallery.bentoRow2?.[1] ? (
                  <Image
                    src={gallery.bentoRow2[1].src}
                    alt={isFr ? gallery.bentoRow2[1].alt.fr : gallery.bentoRow2[1].alt.en}
                    width={gallery.bentoRow2[1].w}
                    height={gallery.bentoRow2[1].h}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-future-dusk-400 p-4">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-xs font-medium text-center opacity-50">
                      {isFr ? 'Produit réfléchissant' : 'Reflective product'}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-future-dusk-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {isFr ? 'Verre & métal' : 'Glass & metal'}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal offset={50} className="col-span-2 lg:col-span-1">
              <div className="relative bg-gradient-to-br from-very-peri-600 to-very-peri-700 rounded-2xl overflow-hidden h-52 lg:h-64 p-6 lg:p-8 flex flex-col justify-between">
                <Sparkles className="h-8 w-8 text-white/40" />
                <div>
                  <p className="text-lg font-heading font-bold text-white leading-tight mb-1">
                    {isFr ? 'Premier studio photo IA au monde' : 'World\'s first AI photo studio'}
                  </p>
                  <p className="text-sm text-white/60">
                    {isFr ? 'Détection automatique des réglages' : 'Automatic settings detection'}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* #A Key Stats — Dark ribbon */}
      {keyStats.length > 0 && (
        <section className="py-20 lg:py-24 bg-future-dusk-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <FadeInView>
              <p className="text-center text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-10">
                {isFr ? 'En chiffres' : 'By the numbers'}
              </p>
            </FadeInView>
            <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10">
              {keyStats.map((stat, index) => {
                const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
                const suffix = stat.value.replace(/[0-9]/g, '');
                return (
                  <StaggerItem key={index}>
                    <div className="text-center px-4 sm:px-6 lg:px-8">
                      <p className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                        <AnimatedCounter end={numericValue} suffix={suffix} duration={2} />
                      </p>
                      <p className="mt-2 text-sm font-medium text-future-dusk-300 uppercase tracking-wider">
                        {isFr ? stat.label.fr : stat.label.en}
                      </p>
                      <p className="mt-1 text-xs text-future-dusk-400">
                        {isFr ? stat.description.fr : stat.description.en}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Key Advantages — Featured first + 2-col grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeInView>
            <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Pourquoi ce système' : 'Why this system'}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                {isFr ? 'Avantages clés' : 'Key advantages'}
              </TextReveal>
            </div>
          </FadeInView>

          {/* Featured advantage — full width, dark bg */}
          {machine.keyAdvantages[0] && (
            <ScrollReveal>
              <div className="bg-future-dusk-900 rounded-2xl p-8 lg:p-12 mb-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-very-peri-500/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-7xl lg:text-8xl font-heading font-bold text-white/5 select-none leading-none block mb-4">01</span>
                    <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-3">
                      {isFr ? machine.keyAdvantages[0].fr : machine.keyAdvantages[0].en}
                    </h3>
                    {machine.keyAdvantages[0].description && (
                      <p className="text-future-dusk-300 leading-relaxed">
                        {isFr ? machine.keyAdvantages[0].description.fr : machine.keyAdvantages[0].description.en}
                      </p>
                    )}
                  </div>
                  <div className="bg-white/5 rounded-xl h-48 lg:h-56 flex items-center justify-center overflow-hidden">
                    {gallery.advantageHero ? (
                      <Image
                        src={gallery.advantageHero.src}
                        alt={isFr ? gallery.advantageHero.alt.fr : gallery.advantageHero.alt.en}
                        width={gallery.advantageHero.w}
                        height={gallery.advantageHero.h}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-white/20" />
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Secondary advantages — 2-col grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {machine.keyAdvantages.slice(1).map((advantage, index) => (
              <ScrollReveal key={index} offset={20 + index * 15}>
                <SpringCard>
                  <div className={`rounded-2xl p-6 lg:p-8 h-full ${index === 0 ? 'bg-very-peri-50 border border-very-peri-100' : 'bg-neutral-50 border border-neutral-100'}`}>
                    <span className="text-5xl lg:text-6xl font-heading font-bold select-none leading-none block mb-4 ${index === 0 ? 'text-very-peri-100' : 'text-neutral-100'}">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">
                      {isFr ? advantage.fr : advantage.en}
                    </h3>
                    {advantage.description && (
                      <p className="text-sm text-future-dusk-500 leading-relaxed">
                        {isFr ? advantage.description.fr : advantage.description.en}
                      </p>
                    )}
                  </div>
                </SpringCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specs & Use Cases — Merged split layout */}
      <section className="py-20 lg:py-32 bg-future-dusk-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-900/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left — Specs table */}
            <FadeInView direction="left" className="lg:col-span-7">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Fiche technique' : 'Technical sheet'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-10">
                {isFr ? 'Caractéristiques' : 'Specifications'}
              </h2>

              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <div className="space-y-0">
                  {[
                    { label: isFr ? 'Taille produit max' : 'Max product size', value: machine.tailleMax },
                    { label: isFr ? 'Poids max' : 'Max weight', value: machine.poidsMax },
                    { label: isFr ? 'Capacité journalière' : 'Daily capacity', value: `${machine.capaciteJour} ${isFr ? 'produits' : 'products'}` },
                    { label: isFr ? 'Espace requis' : 'Space required', value: machine.spaceRequired },
                    ...(machine.studioFootprint ? [{ label: isFr ? 'Encombrement studio' : 'Studio footprint', value: `${machine.studioFootprint.l}x${machine.studioFootprint.w}x${machine.studioFootprint.h} cm` }] : []),
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3.5 border-b border-neutral-100 last:border-0">
                      <span className="text-future-dusk-500">{spec.label}</span>
                      <span className="font-medium text-future-dusk-900">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <h4 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wider mb-3">
                    {isFr ? 'Fonctionnalités' : 'Features'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {machine.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {isFr ? featureLabels[feature]?.fr : featureLabels[feature]?.en}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Right — Use cases + Sectors + Limitations stacked */}
            <FadeInView direction="right" delay={0.15} className="lg:col-span-5 space-y-5">
              {/* Use cases */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-heading font-bold text-white mb-5">
                  {isFr ? 'Cas d\'usage idéaux' : 'Ideal use cases'}
                </h3>
                <ul className="space-y-3">
                  {machine.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-white/80">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sectors */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-heading font-bold text-white mb-4">
                  {isFr ? 'Secteurs idéaux' : 'Ideal sectors'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {machine.idealSectors.map((sector) => (
                    <span key={sector} className="bg-very-peri-500/20 text-very-peri-200 px-3 py-1.5 rounded-full text-sm font-medium">
                      {isFr ? sectorLabels[sector]?.fr : sectorLabels[sector]?.en || sector}
                    </span>
                  ))}
                </div>
              </div>

              {/* Limitations */}
              {machine.limitations.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-lg font-heading font-bold text-amber-200 mb-4">
                    {isFr ? 'Points d\'attention' : 'Points to consider'}
                  </h3>
                  <ul className="space-y-3">
                    {machine.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-amber-100/80">{isFr ? limitation.fr : limitation.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Hardware Components */}
      {gallery.hardware && gallery.hardware.length > 0 && (
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView>
              <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'Composants' : 'Components'}
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                  {isFr ? 'Technologie intégrée' : 'Integrated technology'}
                </TextReveal>
              </div>
            </FadeInView>
            <div className="grid md:grid-cols-3 gap-6">
              {gallery.hardware.map((hw, idx) => (
                <ScrollReveal key={idx} offset={20 + idx * 15}>
                  <SpringCard>
                    <div className="rounded-2xl border border-neutral-100 overflow-hidden bg-neutral-50 hover:border-very-peri-200 transition-colors">
                      <div className="aspect-[3/2] relative bg-white">
                        <Image
                          src={hw.src}
                          alt={isFr ? hw.alt.fr : hw.alt.en}
                          width={hw.w}
                          height={hw.h}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                          {isFr ? hw.label.fr : hw.label.en}
                        </h3>
                      </div>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Software Features */}
      {gallery.software && gallery.software.length > 0 && (
        <section className="py-20 lg:py-32 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView>
              <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                  Orbitvu Station
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                  {isFr ? 'Logiciel tout-en-un' : 'All-in-one software'}
                </TextReveal>
              </div>
            </FadeInView>
            <div className="grid md:grid-cols-2 gap-6">
              {gallery.software.map((feat, idx) => (
                <ScrollReveal key={idx} offset={20 + idx * 10}>
                  <SpringCard hoverY={-4}>
                    <div className="rounded-2xl border border-neutral-100 overflow-hidden bg-white hover:border-very-peri-200 transition-colors">
                      <div className="aspect-[6/5] relative">
                        <Image
                          src={feat.src}
                          alt={isFr ? feat.alt.fr : feat.alt.en}
                          width={feat.w}
                          height={feat.h}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                          {isFr ? feat.label.fr : feat.label.en}
                        </h3>
                      </div>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accessories */}
      {gallery.accessories && gallery.accessories.length > 0 && (
        <section className="py-20 lg:py-32 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView>
              <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                  {isFr ? 'Accessoires' : 'Accessories'}
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                  {isFr ? 'Complétez votre système' : 'Complete your system'}
                </TextReveal>
              </div>
            </FadeInView>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {gallery.accessories.map((acc, idx) => (
                <ScrollReveal key={idx} offset={10 + idx * 8}>
                  <SpringCard hoverY={-4}>
                    <div className="rounded-2xl border border-neutral-100 overflow-hidden bg-white hover:border-very-peri-200 transition-colors">
                      <div className="aspect-square relative bg-neutral-50 p-4">
                        <Image
                          src={acc.src}
                          alt={isFr ? acc.alt.fr : acc.alt.en}
                          width={acc.w}
                          height={acc.h}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-sm font-medium text-future-dusk-700">
                          {isFr ? acc.label.fr : acc.label.en}
                        </p>
                      </div>
                    </div>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* #D Similar Machines */}
      {similarMachines.length > 0 && (
        <section className="py-20 lg:py-32 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeInView>
            <div className="text-center mb-12 lg:mb-16">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Comparer' : 'Compare'}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900">
                {isFr ? 'Systèmes similaires' : 'Similar systems'}
              </h2>
            </div>
            </FadeInView>
            <div className="grid md:grid-cols-3 gap-8">
              {similarMachines.map((similar, idx) => (
                <ScrollReveal key={similar.id} offset={30}>
                  <SpringCard>
                    <Link
                      href={`/studio-photo/${similar.id}`}
                      className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:border-very-peri-200 transition-all"
                    >
                      <div className="p-6">
                        <div className="bg-neutral-50 rounded-xl p-4 mb-4 h-40 flex items-center justify-center">
                          <Image
                            src={getMachineImage(similar.id)}
                            alt={similar.nom}
                            width={200}
                            height={150}
                            className="object-contain max-h-32"
                          />
                        </div>
                        <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2 group-hover:text-very-peri-600 transition-colors">
                          {similar.nom}
                        </h3>
                        <p className="text-sm text-future-dusk-500 mb-3 line-clamp-2">
                          {similar.useCases.slice(0, 3).join(', ')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-very-peri-50 text-very-peri-700 px-2 py-1 rounded-full">
                            {similar.capaciteJour} {isFr ? 'prod/jour' : 'prod/day'}
                          </span>
                          <span className="text-xs bg-neutral-100 text-future-dusk-600 px-2 py-1 rounded-full">
                            {similar.tailleMax}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </SpringCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Training Recommendation — Inverted split: content left, gradient right */}
      <section className="py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <FadeInView direction="left" className="lg:col-span-7">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                PackshotCreator Academy
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-future-dusk-900 mb-3">
                {isFr ? `Maîtrisez votre ${machine.nom}` : `Master your ${machine.nom}`}
              </h2>
              <p className="text-lg text-future-dusk-500 mb-8">
                {isFr
                  ? 'Formez-vous aux studios photo automatisés Orbitvu et maximisez votre productivité. Certifié Qualiopi, financement OPCO disponible.'
                  : 'Train on Orbitvu automated photo studios and maximize your productivity. Qualiopi certified, OPCO funding available.'}
              </p>

              <ul className="space-y-3 mb-8">
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
            </FadeInView>

            <FadeInView direction="right" delay={0.15} className="lg:col-span-5">
              <div className="relative bg-gradient-to-br from-very-peri-500 to-very-peri-700 rounded-2xl p-8 lg:p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <GraduationCap className="h-12 w-12 mb-6 opacity-80" />
                <p className="text-xl font-heading font-bold mb-6">
                  {isFr ? 'Certifications & Financement' : 'Certifications & Funding'}
                </p>
                <div className="space-y-4">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <Award className="h-6 w-6 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Qualiopi</p>
                      <p className="text-xs text-white/70">{isFr ? 'Certification qualité reconnue par l\'État' : 'State-recognized quality certification'}</p>
                    </div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">OPCO</p>
                      <p className="text-xs text-white/70">{isFr ? 'Financement jusqu\'à 100%' : 'Funding up to 100%'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* #C FAQ — Split: sticky heading left + accordion right */}
      {faqItems.length > 0 && (
        <section className="py-20 lg:py-32 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">
                  FAQ
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-6">
                  {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
                </TextReveal>
                <p className="text-lg text-future-dusk-500 leading-relaxed">
                  {isFr
                    ? `Tout ce que vous devez savoir sur le ${machine.nom}.`
                    : `Everything you need to know about the ${machine.nom}.`}
                </p>
              </ScrollReveal>

              <div className="lg:col-span-8 space-y-4">
                {faqItems.map((faq, index) => (
                  <ScrollReveal key={index} offset={20}>
                    <details className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-very-peri-200 transition-colors">
                      <summary className="flex items-center justify-between cursor-pointer p-6 text-future-dusk-900 font-heading font-bold hover:text-very-peri-600 transition-colors">
                        <span className="pr-4">{isFr ? faq.question.fr : faq.question.en}</span>
                        <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-6 text-future-dusk-600 leading-relaxed">
                        {isFr ? faq.answer.fr : faq.answer.en}
                      </div>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA — ADN pattern: bg-black + 2 distinct cards */}
      <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-very-peri-900/30 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <FadeInView>
            <div className="text-center mb-12 lg:mb-16">
              <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                {isFr ? 'Passez à l\'action' : 'Take action'}
              </span>
              <h2 className="text-4xl lg:text-6xl font-heading font-bold leading-[1.1]">
                {isFr ? 'Prêt à transformer votre production ?' : 'Ready to transform your production?'}
              </h2>
            </div>
          </FadeInView>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Card 1 — Gradient peri (3/5) */}
            <FadeInView direction="left" className="lg:col-span-3">
              <div className="relative bg-gradient-to-br from-very-peri-600 to-very-peri-700 rounded-2xl p-8 lg:p-10 overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="relative">
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-3">
                    {isFr ? 'Demandez une démo personnalisée' : 'Request a personalized demo'}
                  </h3>
                  <p className="text-very-peri-100 mb-8 max-w-md">
                    {isFr
                      ? `Testez le ${machine.nom} dans nos showrooms et découvrez comment il peut transformer votre production photo.`
                      : `Try the ${machine.nom} in our showrooms and discover how it can transform your photo production.`}
                  </p>
                  <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
                    <Link href="/contact">
                      {isFr ? 'Demander un devis' : 'Request a quote'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInView>

            {/* Card 2 — Glassmorphism (2/5) */}
            <FadeInView direction="right" delay={0.15} className="lg:col-span-2">
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  <BarChart3 className="h-10 w-10 text-very-peri-400 mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {isFr ? 'Calculez votre ROI' : 'Calculate your ROI'}
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    {isFr
                      ? 'Découvrez en 2 minutes combien vous pourriez économiser avec un studio automatisé.'
                      : 'Discover in 2 minutes how much you could save with an automated studio.'}
                  </p>
                </div>
                <Button asChild size="lg" className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-xl w-full justify-center">
                  <Link href="/studios-photo-automatises#calculateur-roi">
                    <BarChart3 className="mr-2 h-4 w-4" /> {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'}
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
        productSchema({
          name: machine.nom,
          description: `${machine.nom}: ${machine.useCases.join(', ')}`,
          image: `https://www.packshot-creator.com${machineImage}`,
          url: `https://www.packshot-creator.com/${lang}/studio-photo/${slug}`,
          brand: 'Orbitvu',
          category: isFr ? 'Studio Photo Automatisé' : 'Automated Photo Studio',
        }),
        ...(faqItems.length > 0
          ? [faqSchema(faqItems.map((faq) => ({
              question: isFr ? faq.question.fr : faq.question.en,
              answer: isFr ? faq.answer.fr : faq.answer.en,
            })))]
          : []),
      ]} />
    </>
  );
}
