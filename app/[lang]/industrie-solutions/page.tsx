import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  Factory,
  ClipboardCheck,
  Plane,
  Scale,
  GraduationCap,
} from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import FaqAccordion from '@/components/sysnext/FaqAccordion';

/**
 * Hub Sysnext Industrial Solutions — porte d'entrée du mini-site.
 *
 * Draft matière brute — textes FR à valider/finaliser par Seb (règle d'or 2).
 * Source wireframe détaillé : packshot-industrie-ops/playbooks/web/W01.
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Sysnext Industrial Solutions — Documentation visuelle industrielle'
      : 'Sysnext Industrial Solutions — Industrial visual documentation',
    description: isFr
      ? "Stations Orbitvu pour catalogue aftermarket, QC inspection, MRO aéronautique et forensique. Standardisation, conformité AS9100/IATF/ISO 13485, intégration PIM/ERP/GMAO."
      : "Orbitvu stations for aftermarket catalogue, QC inspection, aeronautical MRO and forensics. Standardisation, AS9100/IATF/ISO 13485 compliance, PIM/ERP/CMMS integration.",
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions`,
      languages: {
        fr: '/fr/industrie-solutions',
        en: '/en/industrie-solutions',
      },
    },
    openGraph: {
      title: isFr
        ? 'Sysnext Industrial Solutions — Documentation visuelle industrielle'
        : 'Sysnext Industrial Solutions — Industrial visual documentation',
      description: isFr
        ? 'Documentation visuelle industrielle standardisée, auditable, intégrée au SI.'
        : 'Standardised, auditable industrial visual documentation, integrated into your IT stack.',
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/industrie-solutions`,
      siteName: 'Sysnext Industrial Solutions',
      locale: isFr ? 'fr_FR' : 'en_US',
    },
  };
}

const verticals = [
  {
    slug: 'catalogue-pieces-detachees',
    icon: Factory,
    titleFr: 'Catalogue pièces détachées',
    titleEn: 'Spare parts catalogue',
    pitchFr:
      'Industrialiser la photo de votre catalogue aftermarket : 300 à 500 pièces par jour, standardisées, intégrées à votre PIM.',
    pitchEn:
      'Industrialise your aftermarket catalogue photography: 300 to 500 parts per day, standardised, integrated into your PIM.',
    badge: 'P1',
  },
  {
    slug: 'controle-qualite-inspection',
    icon: ClipboardCheck,
    titleFr: 'Contrôle qualité & inspection',
    titleEn: 'Quality control & inspection',
    pitchFr:
      'Rapports NCR auto-générés, golden sample visuel, dossier audit AS9100 / IATF / ISO 13485 prêt sur demande.',
    pitchEn:
      'Auto-generated NCR reports, visual golden sample, AS9100 / IATF / ISO 13485 audit folder ready on demand.',
    badge: 'P2',
  },
  {
    slug: 'mro-aeronautique-civile',
    icon: Plane,
    titleFr: 'MRO aéronautique civile',
    titleEn: 'Civil aeronautical MRO',
    pitchFr:
      'Documentation avant/après standardisée avec Ghost Image. Conformité EN 9110 / Part 145, intégration GMAO.',
    pitchEn:
      'Standardised before/after documentation with Ghost Image. EN 9110 / Part 145 compliance, CMMS integration.',
    badge: 'P2',
  },
  {
    slug: 'documentation-forensique',
    icon: Scale,
    titleFr: 'Documentation forensique',
    titleEn: 'Forensic documentation',
    pitchFr:
      'Paramètres verrouillés, horodatage cryptographique, signature numérique. Valeur probatoire garantie.',
    pitchEn:
      'Locked parameters, cryptographic timestamping, digital signature. Guaranteed evidentiary value.',
    badge: 'P3',
  },
  {
    slug: 'formation-technique-ar-vr',
    icon: GraduationCap,
    titleFr: 'Formation technique AR / VR',
    titleEn: 'AR / VR technical training',
    pitchFr:
      'Manuels 360° interactifs, vues éclatées, support AR/VR pour équipes MRO et production.',
    pitchEn:
      'Interactive 360° manuals, exploded views, AR/VR support for MRO and production teams.',
    badge: 'P3',
  },
] as const;

const CLIENT_LOGOS = [
  { name: 'Safran', src: '/images/logos/client-safran.avif', w: 994, h: 228 },
  { name: 'Würth', src: '/images/logos/client-wurth.avif', w: 485, h: 104 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.avif', w: 600, h: 66 },
  { name: 'Seiko', src: '/images/logos/client-seiko.avif', w: 508, h: 99 },
  { name: 'Amazon', src: '/images/logos/client-amazon.avif', w: 409, h: 123 },
  { name: 'Lidl', src: '/images/logos/client-lidl.avif', w: 177, h: 168 },
] as const;

const HUB_STATS = [
  { fr: '556', en: '556', labelFr: 'Prospects industriels identifiés', labelEn: 'Identified industrial prospects' },
  { fr: '19', en: '19', labelFr: 'Clients industriels actifs', labelEn: 'Active industrial clients' },
  { fr: '25', en: '25', labelFr: 'Ans d\'expertise photo technique', labelEn: 'Years of technical photo expertise' },
  { fr: 'FR · CH', en: 'FR · CH', labelFr: 'Zones couvertes', labelEn: 'Areas covered' },
] as const;

const HUB_FAQ_FR = [
  {
    question: "Quelle est la différence avec un studio PackshotCreator classique ?",
    answer:
      "PackshotCreator équipe historiquement les marques e-commerce, retail et luxe (bijoux, mode, cosmétiques, alimentaire). Sysnext Industrial Solutions applique les mêmes technologies Orbitvu à l'industrie B2B avec des exigences différentes : normes de conformité (AS9100, IATF, ISO 13485), intégration ERP/PIM/GMAO, audit-ready, multi-sites. Même entreprise mère, positionnement marché distinct.",
  },
  {
    question: "Qui est derrière Sysnext Industrial Solutions ?",
    answer:
      'Seb Ducros, dirigeant de PackshotCreator depuis janvier 2026. Formation technique, début de carrière ingénieur d\'affaires composants électroniques actifs et passifs. A conçu un système équivalent Orbitvu dans une société précédente : connaissance intime des contraintes industrielles. 25 ans de photographie technique pointue sur matériaux difficiles.',
  },
  {
    question: "Quelles normes les stations Orbitvu supportent-elles ?",
    answer:
      "AS9100 rev D (aéronautique), AS9102 (First Article Inspection), IATF 16949 (automobile), ISO 13485:2016 (dispositifs médicaux), IPC-A-610H (électronique), EN 9110 / EASA Part 145 (MRO aéro), GMP / BPF (pharmaceutique). Le mode paramètres verrouillés + horodatage convient également aux exigences forensique civile.",
  },
  {
    question: "Qualiopi ? Formations financables ?",
    answer:
      "Oui. Packshot-Creator est certifié Qualiopi. Les formations opérateurs, administrateurs station et formations continues sont prises en charge totalement ou partiellement selon votre OPCO (OPCO 2i, AFDAS, Akto). Simulateur OPCO disponible sur le site Academy.",
  },
  {
    question: "Quel est votre périmètre géographique ?",
    answer:
      "France et Suisse francophone pour le moment. Équipe technique et support basés à Lyon. Pour d'autres zones (Belgique, Italie du Nord, Allemagne), nous étudions au cas par cas selon le projet.",
  },
  {
    question: "Comment se déroule un premier échange ?",
    answer:
      "RDV visio 30 minutes avec Seb Ducros. Pas de présentation commerciale type : échange technique, compréhension de votre contexte, identification des points bloquants, recommandations initiales. Sans engagement. Sur ces 30 minutes, vous repartez avec une vision claire de la faisabilité et de l'ordre de grandeur budgétaire.",
  },
];

export default async function SysnextHubPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const faqItems = HUB_FAQ_FR; // Seb traduit EN au moment de la validation éditoriale

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
  ]);
  const faqJsonLd = faqSchema(faqItems);

  return (
    <>
      <SchemaOrg schema={[breadcrumbs, faqJsonLd]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
              {isFr ? 'Documentation visuelle industrielle' : 'Industrial visual documentation'}
            </p>
            <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6">
              {isFr
                ? 'La preuve visuelle devient un livrable industriel.'
                : 'Visual proof becomes an industrial deliverable.'}
            </h1>
            <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
              {isFr
                ? 'Stations Orbitvu pilotées par Templates verrouillés, intégrées à votre ERP/PIM/GMAO, utilisables par un opérateur non-photographe. Aftermarket, QC, MRO, forensique, medical.'
                : 'Orbitvu stations driven by locked Templates, integrated into your ERP/PIM/CMMS, usable by a non-photographer operator. Aftermarket, QC, MRO, forensics, medical.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/industrie-solutions#contact"
                className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
              >
                {isFr ? 'Réserver une démo de 30 minutes' : 'Book a 30-minute demo'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/industrie-solutions/calculateur-roi"
                className="inline-flex items-center justify-center rounded-md border border-sysnext-200/40 bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-700 transition-colors"
              >
                {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-graphite-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-graphite-500 mb-6">
            {isFr ? 'Ils nous font confiance depuis 25 ans' : "Trusted for 25 years"}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {CLIENT_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                className="max-h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Verticals grid */}
      <section className="bg-graphite-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 mb-4 tracking-tight">
              {isFr ? 'Cinq applications industrielles.' : 'Five industrial applications.'}
            </h2>
            <p className="text-graphite-700 leading-relaxed">
              {isFr
                ? 'Une technologie commune, cinq contextes métier, cinq promesses chiffrées.'
                : 'One technology, five business contexts, five measurable promises.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v) => {
              const Icon = v.icon;
              return (
                <Link
                  key={v.slug}
                  href={`/industrie-solutions/${v.slug}`}
                  className="group bg-white rounded-xl border border-graphite-200 p-6 hover:border-sysnext-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sysnext-50 text-sysnext-700 group-hover:bg-sysnext-700 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-sysnext-mono text-xs font-semibold text-calibration-500 tracking-wider">
                      {v.badge}
                    </span>
                  </div>
                  <h3 className="font-sysnext-sans font-semibold text-lg text-sysnext-900 mb-2">
                    {isFr ? v.titleFr : v.titleEn}
                  </h3>
                  <p className="text-sm text-graphite-700 leading-relaxed mb-4">
                    {isFr ? v.pitchFr : v.pitchEn}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-sysnext-700 group-hover:text-sysnext-900">
                    {isFr ? 'Découvrir' : 'Learn more'}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key stats bar */}
      <section className="bg-sysnext-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {HUB_STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-sysnext-sans font-bold text-3xl md:text-4xl text-calibration-500 mb-2">
                  {isFr ? stat.fr : stat.en}
                </div>
                <div className="text-xs text-sysnext-200 leading-tight">
                  {isFr ? stat.labelFr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section id="fondateur" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-sysnext-700 to-sysnext-900 rounded-xl flex items-center justify-center text-sysnext-200 text-sm">
              {isFr ? 'Portrait Seb Ducros — à shooter S2' : 'Seb Ducros portrait — to shoot S2'}
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
              {isFr ? 'Le fondateur' : 'The founder'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight mb-6">
              Seb Ducros
            </h2>
            <div className="space-y-4 text-graphite-700 leading-relaxed">
              <p>
                {isFr
                  ? "Formation technique. Ingénieur d'affaires composants électroniques actifs et passifs en début de carrière — connaissance intime du cycle d'achat industriel B2B."
                  : "Technical background. Business engineer for active and passive electronic components early in career — intimate knowledge of the B2B industrial buying cycle."}
              </p>
              <p>
                {isFr
                  ? "A conçu un système équivalent aux stations Orbitvu dans une société précédente : il connaît les contraintes industrielles et les modes de fonctionnement de l'intérieur."
                  : 'Designed an equivalent to Orbitvu stations in a previous company: he knows industrial constraints and operating modes from the inside.'}
              </p>
              <p>
                {isFr
                  ? "25 ans de photographie technique pointue plus tard, il a racheté Packshot-Creator en janvier 2026 avec une conviction : ouvrir ces stations photo automatisées aux industriels qui souffrent d'une documentation visuelle artisanale."
                  : "25 years of advanced technical photography later, he acquired Packshot-Creator in January 2026 with one conviction: open these automated photo stations to industrials who suffer from artisanal visual documentation."}
              </p>
            </div>
            <Link
              href="/industrie-solutions#contact"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-sysnext-700 hover:text-sysnext-900"
            >
              {isFr ? 'Échanger 30 minutes avec Seb' : 'Talk to Seb for 30 minutes'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-graphite-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-proof-500 uppercase mb-3">
              FAQ
            </p>
            <h2
              id="faq-title"
              className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight"
            >
              {isFr ? 'Questions fréquentes.' : 'Frequently asked questions.'}
            </h2>
          </div>
          <FaqAccordion items={faqItems} titleId="faq-title" />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-sysnext-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-sysnext-sans font-bold text-3xl sm:text-4xl text-white mb-4 tracking-tight">
            {isFr ? "Parlons de votre documentation visuelle." : "Let's talk about your visual documentation."}
          </h2>
          <p className="text-sysnext-200 leading-relaxed mb-8 max-w-xl mx-auto">
            {isFr
              ? '30 minutes avec le fondateur, Seb Ducros. Échange technique, sans engagement.'
              : '30 minutes with founder Seb Ducros. Technical conversation, no commitment.'}
          </p>
          <Link
            href="https://calendly.com/sebastienjourdan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
          >
            {isFr ? 'Réserver un créneau' : 'Book a slot'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
