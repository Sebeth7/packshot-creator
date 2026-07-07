import { notFound } from 'next/navigation';
import { NavLink as Link } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/button';
import { MACHINES, getMachineById } from '@/components/calculators/ROICalculator/lib/machines';
import type { Machine } from '@/components/calculators/ROICalculator/lib/types';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, AlertTriangle, ArrowRight, ChevronRight, Sparkles, Camera, Ruler, Weight, Zap, Monitor, Award, CalendarDays, GraduationCap, BarChart3, MessageCircleQuestion, ArrowLeftRight, Play, ImageIcon } from 'lucide-react';
import SchemaOrg, { organizationSchema, breadcrumbSchema, productSchema, faqSchema, videoSchema } from '@/components/seo/SchemaOrg';
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { HeroSection } from '@/components/hero';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { OrbitvuViewer } from '@/components/video/OrbitvuViewer';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildLanguages } from '@/lib/hreflang';
import { tx, pickL } from '@/lib/locale-text';

// Gamme complète servie en allemand suisse (/de-ch/fotostudio/[slug]) — Palier 2.
// Les slugs machines sont identiques en de-ch (ids produit, alignés sur le legacy /de/fotostudio/*).
const DE_CH_MACHINES = new Set(MACHINES.map((m) => m.id));

// Map machine IDs to local image files
function getMachineImage(id: string): string {
  const imageMap: Record<string, string> = {
    'alphashot-micro-v2': '/images/machines/alphashot-micro-v2.avif',
    'alphashot-360': '/images/machines/alphashot-360.avif',
    'alphashot-xl-g2': '/images/machines/alphashot-xl-g2.avif',
    'alphashot-pro-g2': '/images/machines/alphashot-pro-g2.avif',
    'alphashot-xl-v2': '/images/machines/alphashot-xl.avif',
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

// Base publique des vidéos démo auto-hébergées (Cloudflare R2, bucket packshot-videos).
// Fichiers nommés `<youtubeId>.mp4`. Domaine custom = videos.packshot-creator.com.
const R2_VIDEO_BASE = 'https://videos.packshot-creator.com';

// Métadonnées vidéo — uploadDate (REQUIS par Google pour les rich results vidéo) et
// duration, relevées sur les pages /watch YouTube d'origine (source : ld+json YouTube).
// Clé = youtubeId (= nom du fichier sur R2). À mettre à jour si une vidéo est remplacée.
const VIDEO_META: Record<string, { uploadDate: string; duration: string }> = {
  'Xq0vG-cr2bc': { uploadDate: '2026-06-11', duration: 'PT1M23S' }, // alphashot-xl-g2
  'tR-6RBucmWw': { uploadDate: '2024-10-22', duration: 'PT1M48S' }, // alphashot-pro-g2
  'IWcXbWzVEYQ': { uploadDate: '2023-12-12', duration: 'PT1M59S' }, // alphashot-micro-v2
  'g6DABbE2lgs': { uploadDate: '2024-02-12', duration: 'PT1M43S' }, // alphashot-360
  '1GnZ_pexOGw': { uploadDate: '2023-07-03', duration: 'PT1M23S' }, // alphashot-xl
  'nLRk83owzgI': { uploadDate: '2024-03-20', duration: 'PT1M13S' }, // alphastudio-compact
  'J_MNV-zIGrA': { uploadDate: '2023-04-25', duration: 'PT1M58S' }, // alphastudio-xxl
  '8C4hmYaSitk': { uploadDate: '2021-10-21', duration: 'PT1M36S' }, // alphatable / alphadesk
  'R-err-JDU_w': { uploadDate: '2021-05-14', duration: 'PT55S' },   // fashion-studio
  'eMBa5epGf7E': { uploadDate: '2023-11-24', duration: 'PT1M44S' }, // bike-studio
  '5O2-WKmre_Y': { uploadDate: '2023-05-24', duration: 'PT1M41S' }, // e-comm-studio
  'Ejg8nOp9x-0': { uploadDate: '2024-01-02', duration: 'PT2M20S' }, // furniture-studio
};

interface ProductGallery {
  /** Bento grid — large packshot result (row1 left, 7/12) */
  bentoPackshot?: { src: string; alt: { fr: string; en: string }; w: number; h: number };
  /** Bento grid — Orbitvu SUN 360° viewer (row1 right, 5/12) */
  orbitvu360?: { shareId: string; scriptId: string };
  /** Full-width YouTube video section */
  video?: { youtubeId: string; poster?: string };
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
  const b = (machineId: string) => `/images/machines/${machineId}`;
  const img = (machineId: string, file: string, fr: string, en: string, w: number, h: number) =>
    ({ src: `${b(machineId)}/${file}`, alt: { fr, en }, w, h });
  const labeled = (machineId: string, file: string, fr: string, en: string, labelFr: string, labelEn: string, w: number, h: number) =>
    ({ src: `${b(machineId)}/${file}`, alt: { fr, en }, label: { fr: labelFr, en: labelEn }, w, h });

  const galleries: Record<string, ProductGallery> = {
    // ── ALPHASHOT XL G2 ── (visuels officiels Orbitvu, auto-hébergés — pas de shoot PSC dédié pour le moment)
    'alphashot-xl-g2': {
      bentoPackshot: img('alphashot-xl-g2', 'hero.avif', 'Alphashot XL G2, vue studio', 'Alphashot XL G2, studio view', 1600, 893),
      video: { youtubeId: 'Xq0vG-cr2bc', poster: `${b('alphashot-xl-g2')}/hero.avif` },
      bentoRow2: [
        img('alphashot-xl-g2', 'packshot-angled.avif', 'Alphashot XL G2, vue studio de trois quarts', 'Alphashot XL G2, angled studio view', 1200, 1153),
        img('alphashot-xl-g2', 'packshot-macro.avif', 'Exemple de photographie industrielle réalisable avec l\'Alphashot XL G2', 'Example of industrial photography achievable with the Alphashot XL G2', 714, 447),
        img('alphashot-xl-g2', 'packshot-operator.avif', 'Opérateur utilisant l\'Alphashot XL G2 pour une prise de vue', 'Operator using the Alphashot XL G2 for a shoot', 880, 586),
      ],
      advantageHero: img('alphashot-xl-g2', 'advantage-open-doors.avif', 'Chambre ouverte de l\'Alphashot XL G2, éclairage LED et bras caméra', 'Open chamber of the Alphashot XL G2, LED lighting and camera arm', 1400, 1004),
      hardware: [
        labeled('alphashot-xl-g2', 'hw-panel-lighting.avif', '170 panneaux LED pilotés par IA', '170 AI-controlled LED panels', 'Éclairage virtuel', 'Virtual lighting', 1400, 1004),
        labeled('alphashot-xl-g2', 'hw-turntable.avif', 'Plateau tournant motorisé avec balance intégrée (MDC)', 'Motorized turntable with integrated scale (MDC)', 'Plateau + mesure', 'Turntable + measurement', 570, 377),
        labeled('alphashot-xl-g2', 'hw-camera-mount.avif', 'Double support caméra Canon EOS R', 'Dual Canon EOS R camera mount', 'Support caméra', 'Camera mount', 570, 377),
      ],
      software: [
        labeled('alphashot-xl-g2', 'soft-station-capture.avif', 'Interface de capture Orbitvu Station sur Alphashot XL MDC G2', 'Orbitvu Station capture interface on the Alphashot XL MDC G2', 'Capture', 'Capture', 1400, 875),
        labeled('alphashot-xl-g2', 'soft-ai-ocr.avif', 'Lecture IA des étiquettes et structuration des données produit', 'AI label reading and product data structuring', 'OCR IA', 'AI OCR', 1400, 945),
      ],
    },
    // ── ALPHASHOT PRO G2 ──
    'alphashot-pro-g2': {
      bentoPackshot: img('alphashot-pro-g2', 'packshot-mascara.avif', 'Packshot mascara NARS', 'NARS mascara packshot', 1080, 1080),
      orbitvu360: { shareId: 'W2VVEnzxvCD8t2A8qqJNBQ', scriptId: '217258' },
      video: { youtubeId: 'tR-6RBucmWw', poster: `${b('alphashot-pro-g2')}/session.avif` },
      bentoRow2: [
        img('alphashot-pro-g2', 'packshot-eyeshadow.avif', 'Packshot palette maquillage', 'Eyeshadow palette packshot', 1080, 1080),
        img('alphashot-pro-g2', 'packshot-popcorn.avif', 'Packshot machine à popcorn', 'Popcorn maker packshot', 1080, 1080),
        img('alphashot-pro-g2', 'packshot-sunglasses-360.avif', 'Packshot lunettes de soleil', 'Sunglasses packshot', 600, 600),
      ],
      advantageHero: img('alphashot-pro-g2', 'soft-ai-detourage.avif', 'Détourage automatique IA', 'AI background removal', 1305, 1100),
      hardware: [
        labeled('alphashot-pro-g2', 'hw-panel-lighting.avif', 'Panneau éclairage LED virtuel', 'Virtual LED panel', 'Éclairage virtuel', 'Virtual lighting', 439, 435),
        labeled('alphashot-pro-g2', 'hw-turntable.avif', 'Plateau tournant motorisé', 'Motorized turntable', 'Plateau motorisé', 'Motorized turntable', 439, 435),
      ],
      software: [
        labeled('alphashot-pro-g2', 'soft-lighting.avif', 'Contrôle éclairage Orbitvu Station', 'Lighting control', 'Contrôle éclairage', 'Lighting control', 1305, 1100),
        labeled('alphashot-pro-g2', 'soft-postprod.avif', 'Post-production automatique', 'Auto post-production', 'Post-production', 'Post-production', 1305, 1100),
        labeled('alphashot-pro-g2', 'soft-export.avif', 'Export multi-canal', 'Multi-channel export', 'Export multi-canal', 'Multi-channel export', 1304, 1100),
        labeled('alphashot-pro-g2', 'soft-ai-detourage.avif', 'Détourage IA automatique', 'AI background removal', 'Détourage IA', 'AI removal', 1305, 1100),
      ],
    },
    // ── ALPHASHOT MICRO V2 ──
    'alphashot-micro-v2': {
      bentoPackshot: img('alphashot-micro-v2', 'packshot-ring.avif', 'Packshot bague sur fond blanc', 'Ring packshot white background', 300, 300),
      orbitvu360: { shareId: 'toSuU4T5ZMkm264rJPBAAe', scriptId: '212198' },
      video: { youtubeId: 'IWcXbWzVEYQ', poster: `${b('alphashot-micro-v2')}/session.avif` },
      bentoRow2: [
        img('alphashot-micro-v2', 'packshot-necklace.avif', 'Packshot collier', 'Necklace packshot', 300, 600),
        img('alphashot-micro-v2', 'packshot-watch-360.avif', 'Packshot montre 360°', 'Watch 360° packshot', 600, 600),
        img('alphashot-micro-v2', 'packshot-ring-gold.avif', 'Packshot bague or', 'Gold ring packshot', 300, 300),
      ],
      advantageHero: img('alphashot-micro-v2', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphashot-micro-v2', 'hw-reflection.avif', 'Système anti-reflets', 'Anti-reflection system', 'Anti-reflets', 'Anti-reflection', 1304, 1100),
        labeled('alphashot-micro-v2', 'hw-lights-4.avif', 'Éclairage LED intégré', 'Integrated LED lighting', 'Éclairage LED', 'LED lighting', 652, 550),
        labeled('alphashot-micro-v2', 'hw-lighting.avif', 'Système d\'éclairage', 'Lighting system', 'Éclairage', 'Lighting', 700, 700),
      ],
      software: [
        labeled('alphashot-micro-v2', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage auto', 'Auto removal', 1304, 1100),
        labeled('alphashot-micro-v2', 'soft-superfocus.avif', 'Super Focus macro', 'Super Focus macro', 'Super Focus', 'Super Focus', 1304, 1100),
        labeled('alphashot-micro-v2', 'soft-retouch.avif', 'Retouche automatique', 'Auto retouch', 'Retouche', 'Retouch', 1304, 1100),
        labeled('alphashot-micro-v2', 'soft-templates.avif', 'Templates personnalisés', 'Custom templates', 'Templates', 'Templates', 1304, 1100),
      ],
    },
    // ── ALPHASHOT 360 ──
    'alphashot-360': {
      bentoPackshot: img('alphashot-360', 'packshot-wallet.avif', 'Packshot portefeuille', 'Wallet packshot', 1080, 1080),
      video: { youtubeId: 'g6DABbE2lgs', poster: `${b('alphashot-360')}/hero.avif` },
      bentoRow2: [
        img('alphashot-360', 'packshot-camera.avif', 'Packshot appareil photo', 'Camera packshot', 1080, 1080),
        img('alphashot-360', 'packshot-perfume.avif', 'Packshot parfum', 'Perfume packshot', 300, 600),
        img('alphashot-360', 'packshot-toy.avif', 'Packshot jouet', 'Toy packshot', 300, 300),
      ],
      advantageHero: img('alphashot-360', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphashot-360', 'hw-360-view.avif', 'Vue 360° intégrée', 'Integrated 360° view', 'Vue 360°', '360° view', 1051, 1050),
        labeled('alphashot-360', 'hw-motorized-zoom.avif', 'Zoom motorisé', 'Motorized zoom', 'Zoom motorisé', 'Motorized zoom', 439, 435),
        labeled('alphashot-360', 'hw-led.avif', 'Éclairage LED', 'LED lighting', 'LED', 'LED', 438, 435),
      ],
      software: [
        labeled('alphashot-360', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('alphashot-360', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('alphashot-360', 'soft-lighting.avif', 'Contrôle éclairage', 'Lighting control', 'Éclairage', 'Lighting', 1304, 1100),
        labeled('alphashot-360', 'soft-export.avif', 'Export multi-canal', 'Multi-channel export', 'Export', 'Export', 1304, 1100),
      ],
    },
    // ── ALPHASHOT XL ──
    'alphashot-xl-v2': {
      bentoPackshot: img('alphashot-xl', 'packshot-keyboard.avif', 'Packshot clavier', 'Keyboard packshot', 300, 300),
      video: { youtubeId: '1GnZ_pexOGw', poster: `${b('alphashot-xl')}/hero.avif` },
      bentoRow2: [
        img('alphashot-xl', 'packshot-speaker.avif', 'Packshot enceinte', 'Speaker packshot', 300, 600),
        img('alphashot-xl', 'packshot-shoe-360.avif', 'Packshot chaussure 360°', 'Shoe 360° packshot', 600, 600),
        img('alphashot-xl', 'packshot-bag.avif', 'Packshot sac', 'Bag packshot', 300, 300),
      ],
      advantageHero: img('alphashot-xl', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphashot-xl', 'hw-studio.avif', 'Vue d\'ensemble studio', 'Studio overview', 'Studio', 'Studio', 1920, 946),
        labeled('alphashot-xl', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 439, 435),
        labeled('alphashot-xl', 'hw-led.avif', 'Éclairage LED', 'LED lighting', 'LED', 'LED', 439, 435),
      ],
      software: [
        labeled('alphashot-xl', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('alphashot-xl', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('alphashot-xl', 'soft-lighting.avif', 'Contrôle éclairage', 'Lighting control', 'Éclairage', 'Lighting', 1304, 1100),
        labeled('alphashot-xl', 'soft-export.avif', 'Export multi-canal', 'Multi-channel export', 'Export', 'Export', 1304, 1100),
      ],
    },
    // ── ALPHASTUDIO COMPACT ──
    'alphastudio-compact-v2': {
      bentoPackshot: img('alphastudio-compact', 'packshot-chair.avif', 'Packshot chaise', 'Chair packshot', 1080, 1080),
      orbitvu360: { shareId: 'mdkgtBZcnzjRYNUHyRKdh6', scriptId: '169132' },
      video: { youtubeId: 'nLRk83owzgI', poster: `${b('alphastudio-compact')}/hero.avif` },
      bentoRow2: [
        img('alphastudio-compact', 'packshot-karcher.avif', 'Packshot nettoyeur haute pression', 'Pressure washer packshot', 1080, 1080),
        img('alphastudio-compact', 'packshot-bag.avif', 'Packshot sac', 'Bag packshot', 1080, 1080),
        img('alphastudio-compact', 'packshot-speaker.avif', 'Packshot enceinte', 'Speaker packshot', 300, 300),
      ],
      advantageHero: img('alphastudio-compact', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphastudio-compact', 'hw-led.avif', 'Éclairage LED', 'LED lighting', 'LED', 'LED', 438, 436),
        labeled('alphastudio-compact', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 439, 436),
        labeled('alphastudio-compact', 'hw-diffusers.avif', 'Diffuseurs latéraux', 'Side diffusers', 'Diffuseurs', 'Diffusers', 439, 435),
      ],
      software: [
        labeled('alphastudio-compact', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('alphastudio-compact', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('alphastudio-compact', 'soft-lighting.avif', 'Contrôle éclairage', 'Lighting control', 'Éclairage', 'Lighting', 1304, 1100),
        labeled('alphastudio-compact', 'soft-ecommerce.avif', 'Intégration e-commerce', 'E-commerce integration', 'E-commerce', 'E-commerce', 1304, 1100),
      ],
    },
    // ── ALPHASTUDIO XXL ──
    'alphastudio-xxl-v2': {
      bentoPackshot: img('alphastudio-xxl', 'packshot-jacket.avif', 'Packshot veste', 'Jacket packshot', 1080, 1080),
      orbitvu360: { shareId: 'BtmKBPaKrDfgee6uNETQAc', scriptId: '169062' },
      video: { youtubeId: 'J_MNV-zIGrA', poster: `${b('alphastudio-xxl')}/hero.avif` },
      bentoRow2: [
        img('alphastudio-xxl', 'packshot-skirt.avif', 'Packshot jupe', 'Skirt packshot', 1080, 1080),
        img('alphastudio-xxl', 'packshot-suitcase-360.avif', 'Packshot valise 360°', 'Suitcase 360° packshot', 600, 600),
        img('alphastudio-xxl', 'packshot-model-video.avif', 'Vidéo mannequin', 'Model video', 300, 600),
      ],
      advantageHero: img('alphastudio-xxl', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphastudio-xxl', 'hw-studio.avif', 'Vue d\'ensemble studio', 'Studio overview', 'Studio XXL', 'XXL Studio', 1920, 946),
        labeled('alphastudio-xxl', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 439, 436),
        labeled('alphastudio-xxl', 'hw-column-stand.avif', 'Colonne motorisée', 'Motorized column', 'Colonne', 'Column', 439, 435),
      ],
      software: [
        labeled('alphastudio-xxl', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('alphastudio-xxl', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('alphastudio-xxl', 'soft-lighting.avif', 'Contrôle éclairage', 'Lighting control', 'Éclairage', 'Lighting', 1304, 1100),
        labeled('alphastudio-xxl', 'soft-export.avif', 'Export multi-canal', 'Multi-channel export', 'Export', 'Export', 1304, 1100),
      ],
    },
    // ── ALPHATABLE / ALPHADESK ──
    'alphadesk': {
      bentoPackshot: img('alphatable-alphadesk', 'packshot-coat.avif', 'Packshot flat-lay manteau', 'Flat-lay coat packshot', 1200, 1200),
      orbitvu360: { shareId: 'pk8sM2ak2D6BamQyzri9r3', scriptId: '191142' },
      video: { youtubeId: '8C4hmYaSitk', poster: `${b('alphatable-alphadesk')}/hero.avif` },
      bentoRow2: [
        img('alphatable-alphadesk', 'packshot-blouse.avif', 'Packshot blouse enfant', 'Kid blouse packshot', 1200, 1105),
        img('alphatable-alphadesk', 'packshot-dungarees.avif', 'Packshot salopette', 'Dungarees packshot', 1200, 1215),
        img('alphatable-alphadesk', 'packshot-dress.avif', 'Packshot robe enfant', 'Kid dress packshot', 1200, 1215),
      ],
      advantageHero: img('alphatable-alphadesk', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphatable-alphadesk', 'hw-lights.avif', 'Éclairage LED', 'LED lighting', 'Éclairage', 'Lighting', 438, 436),
        labeled('alphatable-alphadesk', 'hw-motorized-zoom.avif', 'Zoom motorisé', 'Motorized zoom', 'Zoom motorisé', 'Motorized zoom', 439, 435),
        labeled('alphatable-alphadesk', 'hw-button.avif', 'Bouton de commande', 'Control button', 'Commande', 'Control', 439, 436),
      ],
      software: [
        labeled('alphatable-alphadesk', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('alphatable-alphadesk', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('alphatable-alphadesk', 'soft-export.avif', 'Export multi-canal', 'Multi-channel export', 'Export', 'Export', 1304, 1100),
      ],
    },
    'alphatable': {
      bentoPackshot: img('alphatable-alphadesk', 'packshot-coat.avif', 'Packshot flat-lay manteau', 'Flat-lay coat packshot', 1200, 1200),
      orbitvu360: { shareId: 'pk8sM2ak2D6BamQyzri9r3', scriptId: '191142' },
      video: { youtubeId: '8C4hmYaSitk', poster: `${b('alphatable-alphadesk')}/hero.avif` },
      bentoRow2: [
        img('alphatable-alphadesk', 'packshot-blouse.avif', 'Packshot blouse enfant', 'Kid blouse packshot', 1200, 1105),
        img('alphatable-alphadesk', 'packshot-dungarees.avif', 'Packshot salopette', 'Dungarees packshot', 1200, 1215),
        img('alphatable-alphadesk', 'packshot-dress.avif', 'Packshot robe enfant', 'Kid dress packshot', 1200, 1215),
      ],
      advantageHero: img('alphatable-alphadesk', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('alphatable-alphadesk', 'hw-lights.avif', 'Éclairage LED', 'LED lighting', 'Éclairage', 'Lighting', 438, 436),
        labeled('alphatable-alphadesk', 'hw-motorized-zoom.avif', 'Zoom motorisé', 'Motorized zoom', 'Zoom motorisé', 'Motorized zoom', 439, 435),
      ],
      software: [
        labeled('alphatable-alphadesk', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('alphatable-alphadesk', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('alphatable-alphadesk', 'soft-export.avif', 'Export multi-canal', 'Multi-channel export', 'Export', 'Export', 1304, 1100),
      ],
    },
    // ── FASHION STUDIO ──
    'fashion-studio-basic': {
      bentoPackshot: img('fashion-studio', 'packshot-sport-1.avif', 'Photo mode sport', 'Sport fashion photo', 720, 1080),
      orbitvu360: { shareId: 'BQGVkbgPwMMWJSeXKkjmb5', scriptId: '131515' },
      video: { youtubeId: 'R-err-JDU_w', poster: `${b('fashion-studio')}/hero.avif` },
      bentoRow2: [
        img('fashion-studio', 'packshot-sport-2.avif', 'Photo mode sport 2', 'Sport fashion photo 2', 720, 1080),
        img('fashion-studio', 'packshot-sport-4.avif', 'Photo mode sport 4', 'Sport fashion photo 4', 720, 1080),
        img('fashion-studio', 'packshot-video.avif', 'Vidéo mannequin', 'Model video', 565, 565),
      ],
      advantageHero: img('fashion-studio', 'soft-lights.avif', 'Éclairage contrôlé par logiciel', 'Software-controlled lighting', 653, 551),
      hardware: [
        labeled('fashion-studio', 'hw-studio.avif', 'Vue d\'ensemble studio', 'Studio overview', 'Fashion Studio', 'Fashion Studio', 1920, 946),
        labeled('fashion-studio', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 439, 436),
        labeled('fashion-studio', 'hw-led.avif', 'Éclairage LED', 'LED lighting', 'LED', 'LED', 438, 436),
      ],
      software: [
        labeled('fashion-studio', 'soft-templates.avif', 'Templates personnalisés', 'Custom templates', 'Templates', 'Templates', 1304, 1100),
        labeled('fashion-studio', 'soft-clip-merging.avif', 'Fusion de clips', 'Clip merging', 'Fusion clips', 'Clip merging', 652, 550),
        labeled('fashion-studio', 'soft-upload.avif', 'Publication directe', 'Direct publishing', 'Publication', 'Publishing', 1304, 1100),
      ],
    },
    'fashion-studio': {
      bentoPackshot: img('fashion-studio', 'packshot-sport-1.avif', 'Photo mode sport', 'Sport fashion photo', 720, 1080),
      orbitvu360: { shareId: 'BQGVkbgPwMMWJSeXKkjmb5', scriptId: '131515' },
      video: { youtubeId: 'R-err-JDU_w', poster: `${b('fashion-studio')}/hero.avif` },
      bentoRow2: [
        img('fashion-studio', 'packshot-sport-2.avif', 'Photo mode sport 2', 'Sport fashion photo 2', 720, 1080),
        img('fashion-studio', 'packshot-sport-4.avif', 'Photo mode sport 4', 'Sport fashion photo 4', 720, 1080),
        img('fashion-studio', 'packshot-video.avif', 'Vidéo mannequin', 'Model video', 565, 565),
      ],
      advantageHero: img('fashion-studio', 'soft-lights.avif', 'Éclairage contrôlé par logiciel', 'Software-controlled lighting', 653, 551),
      hardware: [
        labeled('fashion-studio', 'hw-studio.avif', 'Vue d\'ensemble studio', 'Studio overview', 'Fashion Studio', 'Fashion Studio', 1920, 946),
        labeled('fashion-studio', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 439, 436),
        labeled('fashion-studio', 'hw-led.avif', 'Éclairage LED', 'LED lighting', 'LED', 'LED', 438, 436),
      ],
      software: [
        labeled('fashion-studio', 'soft-templates.avif', 'Templates personnalisés', 'Custom templates', 'Templates', 'Templates', 1304, 1100),
        labeled('fashion-studio', 'soft-clip-merging.avif', 'Fusion de clips', 'Clip merging', 'Fusion clips', 'Clip merging', 652, 550),
        labeled('fashion-studio', 'soft-upload.avif', 'Publication directe', 'Direct publishing', 'Publication', 'Publishing', 1304, 1100),
      ],
    },
    // ── BIKE STUDIO ──
    'bike-studio': {
      bentoPackshot: img('bike-studio', 'packshot-angle-1.avif', 'Packshot vélo angle', 'Bike angle packshot', 1080, 1093),
      orbitvu360: { shareId: 'KQejRGFGhuey2oUXhPkwrT', scriptId: '162118' },
      video: { youtubeId: 'eMBa5epGf7E', poster: `${b('bike-studio')}/hero.avif` },
      bentoRow2: [
        img('bike-studio', 'packshot-front.avif', 'Packshot vélo face', 'Bike front packshot', 1080, 994),
        img('bike-studio', 'packshot-tire.avif', 'Packshot pneu vélo', 'Bike tire packshot', 1080, 1093),
        img('bike-studio', 'packshot-360.avif', 'Vue 360° vélo', 'Bike 360° view', 285, 570),
      ],
      advantageHero: img('bike-studio', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 652, 550),
      hardware: [
        labeled('bike-studio', 'hw-session.avif', 'Session photo vélo', 'Bike photo session', 'Session', 'Session', 1440, 700),
        labeled('bike-studio', 'hw-suspension.avif', 'Système de suspension', 'Suspension system', 'Suspension', 'Suspension', 450, 450),
        labeled('bike-studio', 'hw-lights.avif', 'Éclairage studio', 'Studio lighting', 'Éclairage', 'Lighting', 652, 550),
      ],
      software: [
        labeled('bike-studio', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 652, 550),
        labeled('bike-studio', 'soft-templates.avif', 'Templates Orbitvu Station', 'Orbitvu Station templates', 'Templates', 'Templates', 652, 550),
        labeled('bike-studio', 'soft-upload.avif', 'Publication directe', 'Direct publishing', 'Publication', 'Publishing', 652, 550),
      ],
    },
    // ── E-COMM STUDIO+ ──
    'e-comm-studio-plus': {
      bentoPackshot: img('e-comm-studio', 'packshot-cabinet.avif', 'Packshot meuble rouge', 'Red cabinet packshot', 1069, 1080),
      orbitvu360: { shareId: 'g3rdCvWUXjSjuwxtiTte5h', scriptId: '207312' },
      video: { youtubeId: '5O2-WKmre_Y', poster: `${b('e-comm-studio')}/hero.avif` },
      bentoRow2: [
        img('e-comm-studio', 'packshot-fridge.avif', 'Packshot réfrigérateur', 'Fridge packshot', 1081, 1080),
        img('e-comm-studio', 'packshot-sofa-360.avif', 'Canapé 360°', 'Sofa 360°', 571, 570),
        img('e-comm-studio', 'packshot-quad.avif', 'Packshot quad', 'Quad packshot', 285, 285),
      ],
      advantageHero: img('e-comm-studio', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('e-comm-studio', 'hw-studio.avif', 'Vue d\'ensemble E-Comm Studio', 'E-Comm Studio overview', 'Studio', 'Studio', 1920, 946),
        labeled('e-comm-studio', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 440, 437),
        labeled('e-comm-studio', 'hw-lamp.avif', 'Éclairage', 'Lighting', 'Éclairage', 'Lighting', 439, 437),
      ],
      software: [
        labeled('e-comm-studio', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('e-comm-studio', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('e-comm-studio', 'soft-lights.avif', 'Contrôle éclairage', 'Lighting control', 'Éclairage', 'Lighting', 1305, 1100),
        labeled('e-comm-studio', 'soft-publish.avif', 'Publication directe', 'Direct publishing', 'Publication', 'Publishing', 1304, 1100),
      ],
    },
    // ── FURNITURE STUDIO ──
    'furniture-studio': {
      bentoPackshot: img('furniture-studio', 'packshot-chair.avif', 'Packshot chaise rouge', 'Red chair packshot', 1081, 1081),
      orbitvu360: { shareId: 'g3rdCvWUXjSjuwxtiTte5h', scriptId: '207312' },
      video: { youtubeId: 'Ejg8nOp9x-0', poster: `${b('furniture-studio')}/hero.avif` },
      bentoRow2: [
        img('furniture-studio', 'packshot-lamp.avif', 'Packshot lampe jaune', 'Yellow lamp packshot', 1081, 1081),
        img('furniture-studio', 'packshot-shelf.avif', 'Packshot étagère rouge', 'Red shelf packshot', 1081, 1081),
        img('furniture-studio', 'packshot-sofa-360.avif', 'Canapé 360°', 'Sofa 360°', 292, 293),
      ],
      advantageHero: img('furniture-studio', 'soft-bg-removal.avif', 'Détourage automatique', 'Auto background removal', 1304, 1100),
      hardware: [
        labeled('furniture-studio', 'hw-studio.avif', 'Vue d\'ensemble Furniture Studio', 'Furniture Studio overview', 'Studio', 'Studio', 1920, 946),
        labeled('furniture-studio', 'hw-turntable.avif', 'Plateau tournant', 'Turntable', 'Plateau', 'Turntable', 440, 437),
      ],
      software: [
        labeled('furniture-studio', 'soft-bg-removal.avif', 'Détourage automatique', 'Background removal', 'Détourage', 'Removal', 1304, 1100),
        labeled('furniture-studio', 'soft-templates.avif', 'Templates', 'Templates', 'Templates', 'Templates', 1304, 1100),
        labeled('furniture-studio', 'soft-lights.avif', 'Contrôle éclairage', 'Lighting control', 'Éclairage', 'Lighting', 1305, 1100),
        labeled('furniture-studio', 'soft-publish.avif', 'Publication directe', 'Direct publishing', 'Publication', 'Publishing', 1304, 1100),
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
  ['alphashot-xl-g2', 'alphashot-micro-v2', 'alphashot-360', 'alphashot-pro-g2'].includes(id);

function getSimilarMachines(machine: Machine): Machine[] {
  return MACHINES.filter(
    (m) =>
      m.id !== machine.id &&
      !m.delisted &&
      m.tailleCategories.some((cat) => machine.tailleCategories.includes(cat))
  ).slice(0, 3);
}

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  // fr + en : toutes les machines.
  for (const lang of ['fr', 'en']) for (const m of MACHINES) out.push({ lang, slug: m.id });
  // de-ch : uniquement les 3 machines cœur.
  for (const slug of DE_CH_MACHINES) out.push({ lang: 'de-ch', slug });
  return out;
}

// SEO overrides for specific product pages (keyword + CTR optimization)
const seoOverrides: Record<string, { fr: { title: string; description: string }; en: { title: string; description: string }; 'de-ch'?: { title: string; description: string } }> = {
  'alphashot-xl-g2': {
    fr: {
      title: 'Alphashot XL G2 | Studio Photo & Mesure Produit Automatisé Orbitvu',
      description: 'Alphashot XL G2 (variante MDC) : packshots, 360°, vidéo, mesure laser et pesée intégrées en un seul cycle. Jusqu\'à 60×40×70 cm, 25 kg. Distributeur officiel Orbitvu.',
    },
    en: {
      title: 'Alphashot XL G2 | Automated Product Photography & Measurement | Orbitvu',
      description: 'Alphashot XL G2 (MDC variant): packshots, 360° spins, video, laser measurement and weighing in one cycle. Up to 60×40×70 cm, 25 kg. Official Orbitvu distributor.',
    },
    'de-ch': {
      title: 'Alphashot XL G2 | Automatisierte Produktfotografie & Messung | Orbitvu',
      description: 'Alphashot XL G2 (MDC-Variante): Packshots, 360°-Ansichten, Video, Lasermessung und Wägung in einem Zyklus. Bis 60×40×70 cm, 25 kg. Offizieller Orbitvu-Distributor.',
    },
  },
  'alphashot-360': {
    fr: {
      title: 'Photo 360 Produit | Alphashot 360 — Studio Automatisé Orbitvu',
      description: 'Creez des photos 360 produit automatisees avec l\'Alphashot 360 Orbitvu. Rotation interactive, fond blanc, detourage automatique. Demandez une demo gratuite.',
    },
    en: {
      title: '360 Product Photography | Alphashot 360 — Automated Orbitvu Studio',
      description: 'Create automated 360 product photos with the Alphashot 360 by Orbitvu. Interactive rotation, white background, auto clipping. Request a free demo.',
    },
    'de-ch': {
      title: '360-Grad Produktfotografie | Alphashot 360 — Automatisiertes Orbitvu Studio',
      description: 'Erstellen Sie automatisierte 360-Grad Produktfotos mit dem Alphashot 360 von Orbitvu. Interaktive Rotation, weisser Hintergrund, automatisches Freistellen. Demo anfordern.',
    },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);
  if (!machine) return { title: 'Product not found' };

  const override = seoOverrides[slug];

  const title = override
    ? pickL(lang, { fr: override.fr.title, en: override.en.title, 'de-ch': override['de-ch']?.title })
    : tx(lang,
        `${machine.nom} | Studio Photo Automatisé Orbitvu`,
        `${machine.nom} | Automated Photo Studio Orbitvu`,
        `${machine.nom} | Automatisiertes Fotostudio Orbitvu`);

  const description = override
    ? pickL(lang, { fr: override.fr.description, en: override.en.description, 'de-ch': override['de-ch']?.description })
    : tx(lang,
        `${machine.nom} — Distributeur officiel Orbitvu. Studio photo automatisé pour ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].fr}`,
        `${machine.nom} — Official Orbitvu distributor. Automated photo studio for ${machine.useCases.join(', ')}. ${machine.keyAdvantages[0].en}`,
        `${machine.nom} — Offizieller Orbitvu-Distributor. Automatisiertes Fotostudio für ${machine.useCases.join(', ')}. ${pickL('de-ch', machine.keyAdvantages[0])}`);

  return {
    title,
    description,
    alternates: {
      canonical: lang === 'de-ch'
        ? `https://www.packshot-creator.com/de-ch/fotostudio/${slug}`
        : `https://www.packshot-creator.com/${lang}/studio-photo/${slug}`,
      languages: buildLanguages(`/fr/studio-photo/${slug}`, {
        en: `/en/studio-photo/${slug}`,
        ...(DE_CH_MACHINES.has(slug) ? { deCh: `/de-ch/fotostudio/${slug}` } : {}),
      }),
    },
    openGraph: {
      title,
      images: [{ url: `/api/og?title=${encodeURIComponent(machine.nom)}&type=product&lang=${lang}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?title=${encodeURIComponent(machine.nom)}&type=product&lang=${lang}`],
    },
  };
}

export default async function StudioPhotoProductPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const machine = getMachineById(slug);
  if (!machine) notFound();
  // de-ch (Suisse alémanique) : seules les 3 machines cœur sont servies. Toute autre
  // machine sous /de-ch/fotostudio/* renvoie 404 (le middleware next-intl réécrit l'URL
  // localisée et contourne dynamicParams=false : garde explicite nécessaire).
  if (lang === 'de-ch' && !DE_CH_MACHINES.has(slug)) notFound();

  const machineImage = getMachineImage(machine.id);
  const iaReady = isIAReady(machine.id);
  const gallery = getProductGallery(machine.id);

  const similarMachines = getSimilarMachines(machine);
  const faqItems = machine.faqItems || [];
  const keyStats = machine.keyStats || [];

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'Studios Photo', 'Photo Studios', 'Fotostudios'), url: `https://www.packshot-creator.com/${lang}/studios-photo-automatises` },
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
          label: tx(lang, 'Tous les studios', 'All studios', 'Alle Studios'),
          colorClass: 'text-very-peri-300',
        }}
        title={machine.nom}
        subtitle={machine.useCases.join(' \u2022 ')}
        ctas={[
          { label: tx(lang, 'Demander un devis', 'Request a quote', 'Offerte anfordern'), href: '/contact', variant: 'primary' },
          { label: tx(lang, 'Demander une démo', 'Request a demo', 'Demo anfordern'), href: '/contact', variant: 'secondary' },
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
            <Award className="h-4 w-4" /> {tx(lang, 'Distributeur Officiel Orbitvu France & Suisse', 'Official Orbitvu Distributor France & Switzerland', 'Offizieller Orbitvu-Distributor Frankreich & Schweiz')}
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
              <Ruler className="h-3.5 w-3.5" /> {tx(lang, 'Taille max', 'Max size', 'Max. Grösse')}
            </div>
            <div className="font-bold text-white">{machine.tailleMax}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
              <Weight className="h-3.5 w-3.5" /> {tx(lang, 'Poids max', 'Max weight', 'Max. Gewicht')}
            </div>
            <div className="font-bold text-white">{machine.poidsMax}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
              <Zap className="h-3.5 w-3.5" /> {tx(lang, 'Capacité/jour', 'Capacity/day', 'Kapazität/Tag')}
            </div>
            <div className="font-bold text-white">{machine.capaciteJour} {tx(lang, 'produits', 'products', 'Produkte')}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-very-peri-300 text-xs mb-1">
              <Monitor className="h-3.5 w-3.5" /> {tx(lang, 'Espace requis', 'Space required', 'Platzbedarf')}
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
                  <span className="text-sm text-future-dusk-500">Orbitvu Station</span>
                </div>
                <h2 className="text-2xl font-heading font-bold text-future-dusk-900 mb-2">
                  {tx(lang, 'Compatible avec les modules de retouche IA Orbitvu Station', 'Compatible with Orbitvu Station AI retouching modules', 'Kompatibel mit den KI-Retusche-Modulen von Orbitvu Station')}
                </h2>
                <p className="text-future-dusk-500">
                  {tx(lang,
                    'Profitez des modules de retouche IA intégrés à Orbitvu Station : détourage automatique, assistant d\'éclairage et structuration des données produit.',
                    'Take advantage of the AI retouching modules built into Orbitvu Station: automatic background removal, lighting assistant and product data structuring.',
                    'Nutzen Sie die in Orbitvu Station integrierten KI-Retusche-Module: automatisches Freistellen, Beleuchtungsassistent und Strukturierung der Produktdaten.')}
                </p>
              </div>
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
                {tx(lang,
                  'Studio photo IA pour la photographie de produits',
                  'AI photo studio for product photography',
                  'KI-Fotostudio für die Produktfotografie')}
              </TextReveal>
              <p className="text-lg lg:text-xl text-future-dusk-500 leading-relaxed">
                {lang === 'fr'
                  ? <>Le {machine.nom} est la première solution de photographie alimentée par l&apos;IA. Équipé de <strong className="text-future-dusk-900 font-semibold">lampes virtuelles</strong> et d&apos;un <strong className="text-future-dusk-900 font-semibold">assistant IA intelligent</strong>, il reproduit un studio professionnel dans un format compact.</>
                  : lang === 'de-ch'
                  ? <>Der {machine.nom} ist die erste KI-gestützte Fotolösung. Ausgestattet mit <strong className="text-future-dusk-900 font-semibold">virtuellen Leuchten</strong> und einem <strong className="text-future-dusk-900 font-semibold">intelligenten KI-Assistenten</strong>, bildet er ein professionelles Studio in einem kompakten Format ab.</>
                  : <>The {machine.nom} is the first AI-powered photography solution. Equipped with <strong className="text-future-dusk-900 font-semibold">virtual lights</strong> and an <strong className="text-future-dusk-900 font-semibold">intelligent AI assistant</strong>, it replicates a professional studio in a compact format.</>}
              </p>
            </div>
          </FadeInView>

          {/* Bento grid — Apple "Points forts" style */}
          {/* Row 1: 7/5 split, ou pleine largeur si pas de vue 360° */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 mb-4 lg:mb-5">
            <ScrollReveal className={gallery.orbitvu360 ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <div className="relative bg-white rounded-2xl overflow-hidden h-72 lg:h-[420px] group border border-neutral-100">
                {gallery.bentoPackshot ? (
                  <div className="absolute inset-0 p-6 lg:p-10 flex items-center justify-center">
                    <Image
                      src={gallery.bentoPackshot.src}
                      alt={pickL(lang, gallery.bentoPackshot.alt)}
                      width={gallery.bentoPackshot.w}
                      height={gallery.bentoPackshot.h}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-future-dusk-400 p-8">
                    <ImageIcon className="h-12 w-12 mb-4 opacity-30" />
                    <p className="text-sm font-medium text-center opacity-50">
                      {tx(lang, 'Photo packshot — fond blanc automatique', 'Packshot photo — automatic white background', 'Packshot-Foto — automatischer weisser Hintergrund')}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm text-future-dusk-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">Packshot</span>
                </div>
              </div>
            </ScrollReveal>

            {gallery.orbitvu360 && (
              <ScrollReveal offset={20} className="lg:col-span-5">
                <div className="relative bg-white rounded-2xl overflow-hidden h-72 lg:h-[420px] border border-neutral-100">
                  <OrbitvuViewer
                    shareId={gallery.orbitvu360.shareId}
                    scriptId={gallery.orbitvu360.scriptId}
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-very-peri-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      360°
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Row 2: packshot gallery — adapts to number of images */}
          {gallery.bentoRow2 && gallery.bentoRow2.length > 0 && (
            <div className={`grid gap-4 lg:gap-5 ${
              gallery.bentoRow2.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' :
              gallery.bentoRow2.length === 3 ? 'grid-cols-2 lg:grid-cols-3' :
              'grid-cols-2'
            }`}>
              {gallery.bentoRow2.map((img, idx) => (
                <ScrollReveal key={idx} offset={30 + idx * 10}>
                  <div className="relative bg-white rounded-2xl overflow-hidden border border-neutral-100 group">
                    <div className="aspect-square p-4 lg:p-6 flex items-center justify-center">
                      <Image
                        src={img.src}
                        alt={pickL(lang, img.alt)}
                        width={img.w}
                        height={img.h}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full-width Video Demo */}
      {gallery.video && (
        <section className="py-20 lg:py-28 bg-future-dusk-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-future-dusk-900 via-future-dusk-800 to-future-dusk-900" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <FadeInView>
              <div className="text-center mb-10">
                <span className="text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-4 block">
                  {tx(lang, 'Vidéo démo', 'Demo video', 'Demo-Video')}
                </span>
                <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white">
                  {tx(lang, `Le ${machine.nom} en action`, `The ${machine.nom} in action`, `Der ${machine.nom} in Aktion`)}
                </h2>
              </div>
            </FadeInView>
            <ScrollReveal>
              <VideoPlayer
                src={`${R2_VIDEO_BASE}/${gallery.video.youtubeId}.mp4`}
                poster={gallery.video.poster}
                title={tx(lang, `${machine.nom} en action`, `${machine.nom} in action`, `${machine.nom} in Aktion`)}
                className="aspect-video w-full rounded-2xl shadow-2xl shadow-black/30"
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* #A Key Stats — Dark ribbon */}
      {keyStats.length > 0 && (
        <section className="py-20 lg:py-24 bg-future-dusk-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900 via-very-peri-800/30 to-future-dusk-900" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <FadeInView>
              <p className="text-center text-xs font-semibold text-very-peri-400 uppercase tracking-[0.2em] mb-10">
                {tx(lang, 'En chiffres', 'By the numbers', 'In Zahlen')}
              </p>
            </FadeInView>
            <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-white/10">
              {keyStats.map((stat, index) => {
                // Valeurs sans chiffre ('Semi') ou composées ('3x3m') : affichage brut sans compteur
                const match = stat.value.match(/^([^0-9]*?)(\d+)(.*)$/);
                return (
                  <StaggerItem key={index}>
                    <div className="text-center px-4 sm:px-6 lg:px-8">
                      <p className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                        {match ? (
                          <AnimatedCounter end={parseInt(match[2], 10)} prefix={match[1]} suffix={match[3]} duration={2} />
                        ) : stat.value}
                      </p>
                      <p className="mt-2 text-sm font-medium text-future-dusk-300 uppercase tracking-wider">
                        {pickL(lang, stat.label)}
                      </p>
                      <p className="mt-1 text-xs text-future-dusk-400">
                        {pickL(lang, stat.description)}
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
                {tx(lang, 'Pourquoi ce système', 'Why this system', 'Warum dieses System')}
              </span>
              <TextReveal as="h2" className="text-4xl lg:text-6xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                {tx(lang, 'Avantages clés', 'Key advantages', 'Wichtige Vorteile')}
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
                      {pickL(lang, machine.keyAdvantages[0])}
                    </h3>
                    {machine.keyAdvantages[0].description && (
                      <p className="text-future-dusk-300 leading-relaxed">
                        {pickL(lang, machine.keyAdvantages[0].description)}
                      </p>
                    )}
                  </div>
                  <div className="bg-white/5 rounded-xl h-48 lg:h-56 flex items-center justify-center overflow-hidden">
                    {gallery.advantageHero ? (
                      <Image
                        src={gallery.advantageHero.src}
                        alt={pickL(lang, gallery.advantageHero.alt)}
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
                      {pickL(lang, advantage)}
                    </h3>
                    {advantage.description && (
                      <p className="text-sm text-future-dusk-500 leading-relaxed">
                        {pickL(lang, advantage.description)}
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
                {tx(lang, 'Fiche technique', 'Technical sheet', 'Technisches Datenblatt')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-10">
                {tx(lang, 'Caractéristiques', 'Specifications', 'Technische Daten')}
              </h2>

              <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <div className="space-y-0">
                  {[
                    { label: tx(lang, 'Taille produit max', 'Max product size', 'Max. Produktgrösse'), value: machine.tailleMax },
                    { label: tx(lang, 'Poids max', 'Max weight', 'Max. Gewicht'), value: machine.poidsMax },
                    { label: tx(lang, 'Capacité journalière', 'Daily capacity', 'Tageskapazität'), value: `${machine.capaciteJour} ${tx(lang, 'produits', 'products', 'Produkte')}` },
                    { label: tx(lang, 'Espace requis', 'Space required', 'Platzbedarf'), value: machine.spaceRequired },
                    ...(machine.studioFootprint ? [{ label: tx(lang, 'Encombrement studio', 'Studio footprint', 'Studio-Stellfläche'), value: `${machine.studioFootprint.l}x${machine.studioFootprint.w}x${machine.studioFootprint.h} cm` }] : []),
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3.5 border-b border-neutral-100 last:border-0">
                      <span className="text-future-dusk-500">{spec.label}</span>
                      <span className="font-medium text-future-dusk-900">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <h4 className="text-sm font-semibold text-future-dusk-900 uppercase tracking-wider mb-3">
                    {tx(lang, 'Fonctionnalités', 'Features', 'Funktionen')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {machine.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {pickL(lang, featureLabels[feature] ?? { fr: feature, en: feature })}
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
                  {tx(lang, 'Cas d\'usage idéaux', 'Ideal use cases', 'Ideale Anwendungsfälle')}
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
                  {tx(lang, 'Secteurs idéaux', 'Ideal sectors', 'Ideale Branchen')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {machine.idealSectors.map((sector) => (
                    <span key={sector} className="bg-very-peri-500/20 text-very-peri-200 px-3 py-1.5 rounded-full text-sm font-medium">
                      {pickL(lang, sectorLabels[sector] ?? { fr: sector, en: sector })}
                    </span>
                  ))}
                </div>
              </div>

              {/* Limitations */}
              {machine.limitations.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-lg font-heading font-bold text-amber-200 mb-4">
                    {tx(lang, 'Points d\'attention', 'Points to consider', 'Zu beachten')}
                  </h3>
                  <ul className="space-y-3">
                    {machine.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-amber-100/80">{pickL(lang, limitation)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeInView>
          </div>
        </div>
      </section>

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
                  {tx(lang, 'Logiciel tout-en-un', 'All-in-one software', 'All-in-one-Software')}
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
                          alt={pickL(lang, feat.alt)}
                          width={feat.w}
                          height={feat.h}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-heading font-bold text-future-dusk-900">
                          {pickL(lang, feat.label)}
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
                  {tx(lang, 'Accessoires', 'Accessories', 'Zubehör')}
                </span>
                <TextReveal as="h2" className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">
                  {tx(lang, 'Complétez votre système', 'Complete your system', 'Ergänzen Sie Ihr System')}
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
                          alt={pickL(lang, acc.alt)}
                          width={acc.w}
                          height={acc.h}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <p className="text-sm font-medium text-future-dusk-700">
                          {pickL(lang, acc.label)}
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
                {tx(lang, 'Comparer', 'Compare', 'Vergleichen')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900">
                {tx(lang, 'Systèmes similaires', 'Similar systems', 'Ähnliche Systeme')}
              </h2>
            </div>
            </FadeInView>
            <div className="grid md:grid-cols-3 gap-8">
              {similarMachines.map((similar, idx) => (
                <ScrollReveal key={similar.id} offset={30}>
                  <SpringCard>
                    <Link
                      href={{ pathname: '/studio-photo/[slug]', params: { slug: similar.id } }}
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
                            {similar.capaciteJour} {tx(lang, 'prod/jour', 'prod/day', 'Prod./Tag')}
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
                {tx(lang, `Maîtrisez votre ${machine.nom}`, `Master your ${machine.nom}`, `Meistern Sie Ihren ${machine.nom}`)}
              </h2>
              <p className="text-lg text-future-dusk-500 mb-8">
                {tx(lang,
                  'Formez-vous aux studios photo automatisés Orbitvu et maximisez votre productivité. Certifié Qualiopi, financement OPCO disponible.',
                  'Train on Orbitvu automated photo studios and maximize your productivity. Qualiopi certified, OPCO funding available.',
                  'Lassen Sie sich an den automatisierten Orbitvu-Fotostudios schulen und maximieren Sie Ihre Produktivität. Qualiopi-zertifiziert.')}
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  tx(lang, 'Prise en main complète de votre studio', 'Full studio onboarding', 'Vollständige Einarbeitung in Ihr Studio'),
                  tx(lang, 'Optimisation des workflows de production', 'Production workflow optimization', 'Optimierung der Produktions-Workflows'),
                  tx(lang, 'Best practices e-commerce et marketplaces', 'E-commerce and marketplace best practices', 'Best Practices für E-Commerce und Marktplätze'),
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
                    {tx(lang, 'Voir les formations', 'View training', 'Schulungen ansehen')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/academy/calendrier">
                    <CalendarDays className="mr-2 h-4 w-4" /> {tx(lang, 'Calendrier', 'Calendar', 'Kalender')}
                  </Link>
                </Button>
              </div>
            </FadeInView>

            <FadeInView direction="right" delay={0.15} className="lg:col-span-5">
              <div className="relative bg-gradient-to-br from-very-peri-500 to-very-peri-700 rounded-2xl p-8 lg:p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <GraduationCap className="h-12 w-12 mb-6 opacity-80" />
                <p className="text-xl font-heading font-bold mb-6">
                  {tx(lang, 'Certifications & Financement', 'Certifications & Funding', 'Zertifizierungen & Finanzierung')}
                </p>
                <div className="space-y-4">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <Award className="h-6 w-6 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Qualiopi</p>
                      <p className="text-xs text-white/70">{tx(lang, 'Certification qualité reconnue par l\'État', 'State-recognized quality certification', 'Staatlich anerkannte Qualitätszertifizierung')}</p>
                    </div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 shrink-0" />
                    <div>
                      <p className="font-bold text-sm">OPCO</p>
                      <p className="text-xs text-white/70">{tx(lang, 'Financement jusqu\'à 100%', 'Funding up to 100%', 'Finanzierung bis zu 100%')}</p>
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
                  {tx(lang, 'Questions fréquentes', 'Frequently asked questions', 'Häufige Fragen')}
                </TextReveal>
                <p className="text-lg text-future-dusk-500 leading-relaxed">
                  {tx(lang,
                    `Tout ce que vous devez savoir sur le ${machine.nom}.`,
                    `Everything you need to know about the ${machine.nom}.`,
                    `Alles, was Sie über den ${machine.nom} wissen müssen.`)}
                </p>
              </ScrollReveal>

              <div className="lg:col-span-8 space-y-4">
                {faqItems.map((faq, index) => (
                  <ScrollReveal key={index} offset={20}>
                    <details className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-very-peri-200 transition-colors">
                      <summary className="flex items-center justify-between cursor-pointer p-6 text-future-dusk-900 font-heading font-bold hover:text-very-peri-600 transition-colors">
                        <span className="pr-4">{pickL(lang, faq.question)}</span>
                        <ChevronRight className="h-5 w-5 text-future-dusk-400 shrink-0 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-6 pb-6 text-future-dusk-600 leading-relaxed">
                        {pickL(lang, faq.answer)}
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
                {tx(lang, 'Passez à l\'action', 'Take action', 'Werden Sie aktiv')}
              </span>
              <h2 className="text-4xl lg:text-6xl font-heading font-bold leading-[1.1]">
                {tx(lang, 'Prêt à transformer votre production ?', 'Ready to transform your production?', 'Bereit, Ihre Produktion zu transformieren?')}
              </h2>
            </div>
          </FadeInView>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Contact form (3/5) */}
            <FadeInView direction="left" className="lg:col-span-3">
              <div className="bg-white text-future-dusk-900 rounded-2xl p-6 lg:p-10">
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-future-dusk-900 mb-2">
                  {tx(lang, 'Demandez une démo personnalisée', 'Request a personalized demo', 'Persönliche Demo anfordern')}
                </h3>
                <p className="text-future-dusk-500 mb-6">
                  {tx(lang,
                    `Testez le ${machine.nom} dans nos showrooms et découvrez comment il peut transformer votre production photo.`,
                    `Try the ${machine.nom} in our showrooms and discover how it can transform your photo production.`,
                    `Testen Sie den ${machine.nom} in unseren Showrooms und entdecken Sie, wie er Ihre Fotoproduktion transformieren kann.`)}
                </p>
                <ContactForm locale={lang as 'fr' | 'en' | 'de-ch'} compact defaultRequestType="demo" machineContext={machine.nom} />
              </div>
            </FadeInView>

            {/* Card 2 — Glassmorphism (2/5) */}
            <FadeInView direction="right" delay={0.15} className="lg:col-span-2">
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  <BarChart3 className="h-10 w-10 text-very-peri-400 mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {tx(lang, 'Calculez votre ROI', 'Calculate your ROI', 'Berechnen Sie Ihren ROI')}
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    {tx(lang,
                      'Découvrez en 2 minutes combien vous pourriez économiser avec un studio automatisé.',
                      'Discover in 2 minutes how much you could save with an automated studio.',
                      'Erfahren Sie in 2 Minuten, wie viel Sie mit einem automatisierten Studio sparen könnten.')}
                  </p>
                </div>
                <Button asChild size="lg" className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-xl w-full justify-center">
                  <Link href="/calculateur-roi">
                    <BarChart3 className="mr-2 h-4 w-4" /> {tx(lang, 'Calculer mon ROI', 'Calculate my ROI', 'Meinen ROI berechnen')}
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
          category: tx(lang, 'Studio Photo Automatisé', 'Automated Photo Studio', 'Automatisiertes Fotostudio'),
        }),
        ...(faqItems.length > 0
          ? [faqSchema(faqItems.map((faq) => ({
              question: pickL(lang, faq.question),
              answer: pickL(lang, faq.answer),
            })))]
          : []),
        ...(gallery.video && VIDEO_META[gallery.video.youtubeId]
          ? [videoSchema({
              name: tx(lang, `${machine.nom} en action — démo vidéo`, `${machine.nom} in action — demo video`, `${machine.nom} in Aktion — Demo-Video`),
              description: tx(lang,
                `Démonstration du studio photo automatisé ${machine.nom} (Orbitvu) : ${machine.useCases.join(', ')}.`,
                `Demo of the ${machine.nom} automated photo studio (Orbitvu): ${machine.useCases.join(', ')}.`,
                `Demonstration des automatisierten Fotostudios ${machine.nom} (Orbitvu): ${machine.useCases.join(', ')}.`),
              // Miniature JPEG auto-hébergée sur R2 (l'AVIF poster n'est pas un format supporté par Google)
              thumbnailUrl: `${R2_VIDEO_BASE}/${gallery.video.youtubeId}.jpg`,
              uploadDate: VIDEO_META[gallery.video.youtubeId].uploadDate,
              duration: VIDEO_META[gallery.video.youtubeId].duration,
              contentUrl: `${R2_VIDEO_BASE}/${gallery.video.youtubeId}.mp4`,
            })]
          : []),
      ]} />
    </>
  );
}
