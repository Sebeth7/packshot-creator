import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  Clock,
  Euro,
  UserX,
  AlertTriangle,
  Lock,
  Zap,
  Plug,
  Check,
  X,
  CircleDashed,
} from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import FaqAccordion from '@/components/sysnext/FaqAccordion';

/**
 * Landing vaisseau amiral Sysnext Industrial Solutions — Catalogue pièces détachées aftermarket.
 *
 * Wireframe source : packshot-industrie-ops/playbooks/web/W01-wireframe-landing-catalogue-pieces-detachees.md
 * Segment P1 : aftermarket auto + équipementiers + SAV outillage.
 *
 * Draft matière brute — textes FR à valider/retravailler par Seb (règle d'or 2).
 * Les accroches commerciales, micro-copy CTA et formulations FAQ sont à finaliser
 * avec la signature éditoriale Seb. Le contenu actuel = matière brute structurelle.
 */

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';
  return {
    title: isFr
      ? 'Catalogue pièces détachées : industrialiser la photo aftermarket'
      : 'Spare parts catalogue: industrialise your aftermarket photography',
    description: isFr
      ? 'Stations Orbitvu pour catalogue aftermarket auto & équipementiers. 300-500 pièces/jour, intégration PIM/ERP, ROI < 18 mois. Démo 30 min avec Seb Ducros.'
      : 'Orbitvu stations for aftermarket auto catalogue. 300-500 parts/day, PIM/ERP integration, ROI < 18 months. 30-min demo with Seb Ducros.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/industrie-solutions/catalogue-pieces-detachees`,
      languages: {
        fr: '/fr/industrie-solutions/catalogue-pieces-detachees',
        en: '/en/industrie-solutions/catalogue-pieces-detachees',
      },
    },
    openGraph: {
      title: isFr
        ? 'Catalogue pièces détachées : industrialiser la photo aftermarket'
        : 'Spare parts catalogue: industrialise your aftermarket photography',
      description: isFr
        ? 'Stations Orbitvu pour catalogue aftermarket. 300-500 pièces/jour, ROI < 18 mois.'
        : 'Orbitvu stations for aftermarket catalogue. 300-500 parts/day, ROI < 18 months.',
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/industrie-solutions/catalogue-pieces-detachees`,
      siteName: 'Sysnext Industrial Solutions',
      locale: isFr ? 'fr_FR' : 'en_US',
    },
  };
}

const CLIENT_LOGOS = [
  { name: 'Safran', src: '/images/logos/client-safran.avif', w: 994, h: 228 },
  { name: 'Würth', src: '/images/logos/client-wurth.avif', w: 485, h: 104 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.avif', w: 600, h: 66 },
  { name: 'Seiko', src: '/images/logos/client-seiko.avif', w: 508, h: 99 },
  { name: 'Amazon', src: '/images/logos/client-amazon.avif', w: 409, h: 123 },
  { name: 'Lidl', src: '/images/logos/client-lidl.avif', w: 177, h: 168 },
] as const;

const KEY_STATS = [
  { fr: '÷ 5', en: '÷ 5', labelFr: 'Time-to-market catalogue', labelEn: 'Catalogue time-to-market' },
  { fr: '÷ 15', en: '÷ 15', labelFr: 'Coût par image amorti', labelEn: 'Cost per image amortised' },
  { fr: '300–500', en: '300–500', labelFr: 'Pièces / jour / opérateur', labelEn: 'Parts / day / operator' },
  { fr: '< 1 €', en: '< €1', labelFr: 'Coût image amorti 3 ans', labelEn: 'Image cost amortised over 3 years' },
  { fr: '0 %', en: '0 %', labelFr: 'Dérive charte (Templates verrouillés)', labelEn: 'Charter drift (locked Templates)' },
  { fr: '25 ans', en: '25 years', labelFr: 'Expertise Packshot-Creator', labelEn: 'Packshot-Creator expertise' },
] as const;

const INTEGRATIONS = [
  { category: 'PIM', items: ['Akeneo', 'Quable', 'Plytix', 'Contentserv'] },
  { category: 'DAM', items: ['Adobe Experience Manager', 'Bynder', 'Canto'] },
  { category: 'ERP', items: ['SAP', 'Oracle', 'Infor', 'Dynamics 365'] },
  { category: 'Formats', items: ['JPG', 'PNG transparent', 'AVIF', 'WebP', 'TIFF', 'GLB', 'USDZ'] },
] as const;

const METHODOLOGY = [
  { stepFr: 'Audit catalogue & cadrage Templates', stepEn: 'Catalogue audit & Template scoping', duration: '1 sem' },
  { stepFr: 'Installation station', stepEn: 'Station installation', duration: '1–2 j' },
  { stepFr: 'Formation opérateurs (Qualiopi)', stepEn: 'Operator training (Qualiopi)', duration: '2 j' },
  { stepFr: 'Pilote sur 100 pièces', stepEn: 'Pilot on 100 parts', duration: '1 sem' },
  { stepFr: 'Intégration PIM / ERP', stepEn: 'PIM / ERP integration', duration: '1–2 sem' },
  { stepFr: 'Mise en production & support', stepEn: 'Production & ongoing support', duration: 'Continu' },
] as const;

const FAQ_FR = [
  {
    question: 'Quelle taille de pièces peut-on photographier ?',
    answer:
      "La gamme Orbitvu couvre de la micro-pièce (AlphaShot Micro v2, composants électroniques, pièces < 10 cm) aux pièces volumineuses (AlphaStudio XXL v2, jusqu'à plusieurs mètres). La station la plus fréquente en aftermarket auto est l'AlphaShot Pro G2 (pièces standard moyennes) ou l'AlphaShot XL v2 (pièces moyennes-grandes). Nous dimensionnons la station selon votre mix catalogue.",
  },
  {
    question: "Combien de temps pour former un opérateur ?",
    answer:
      'Deux jours de formation Qualiopi suffisent pour qu\'un opérateur non-photographe produise des captures conformes charte. L\'IA Photo Assistant guide les réglages. Les Templates verrouillés garantissent la répétabilité d\'une journée à l\'autre.',
  },
  {
    question: "Comment s'intègre la solution avec notre PIM Akeneo ?",
    answer:
      "Connecteur natif disponible : l'export depuis la station Orbitvu pousse directement les visuels avec nommage SKU automatique, formats multiples (JPG, PNG transparent, AVIF, WebP, TIFF) et métadonnées dans l'attribut PIM correspondant. Même logique pour Quable, Plytix, Contentserv. Intégrations personnalisées via API REST.",
  },
  {
    question: 'Quel est le coût total d\'une station ?',
    answer:
      "CAPEX indicatif selon le pack : Discovery 30–50 k€ (1 station + formation), Standard 60–120 k€ (1 station + connecteur PIM + 3 j formation + 12 mois support), Premium multi-sites 150–400 k€ (2–4 stations + intégration ERP + Templates groupe + support 24 mois). Financement possible : OPCO (Qualiopi), leasing, crédit-bail. Devis chiffré envoyé dans les 48 h après RDV découverte.",
  },
  {
    question: "Que se passe-t-il si nous changeons de PIM dans 5 ans ?",
    answer:
      "Les Templates et les visuels produits sont exportables à tout moment dans des formats standards ouverts (JPG, PNG, AVIF, WebP, TIFF, GLB pour le 3D). L'intégration PIM se reconfigure : nouveau connecteur, remapping des attributs, mais vos actifs restent intacts. Nous accompagnons la migration sur demande.",
  },
  {
    question: "Avez-vous des références dans l'aftermarket auto ?",
    answer:
      "Oui, plusieurs équipementiers Tier 1/2 et distributeurs spécialisés font partie du portefeuille Packshot-Creator depuis plusieurs années : Faurecia / Forvia, Continental Aftermarket & Services, Schaeffler Automotive Aftermarket, Precisium / Alliance Automotive, Würth Industrie Service. Détail confidentiel partagé en RDV selon votre profil.",
  },
  {
    question: 'La formation est-elle finançable OPCO ?',
    answer:
      'Oui. Packshot-Creator est certifié Qualiopi depuis plusieurs années. Les formations opérateurs et administrateurs station sont prises en charge totalement ou partiellement selon votre OPCO (OPCO 2i, AFDAS, Akto…). Un simulateur OPCO est disponible sur notre site Academy.',
  },
  {
    question: 'Quels formats d\'export sont supportés ?',
    answer:
      "JPG, PNG (transparent), AVIF, WebP, TIFF haute résolution, GLB et USDZ (pour la réalité augmentée). Le paramétrage d'export est configuré par Template : pour une même capture, vous obtenez automatiquement toutes les variantes dont votre écosystème a besoin (catalogue web, fiche produit marketplace, dossier technique PDF, AR commerce).",
  },
  {
    question: 'Comment garantir la cohérence multi-sites ?',
    answer:
      "Les Templates sont versionnés et peuvent être partagés entre sites : un Template validé à Lyon est déployable à Barcelone, Turin, Poznań sans dérive. Chaque capture peut être horodatée et signée numériquement pour auditabilité. La comparaison entre sites (Ghost Image) permet de détecter immédiatement toute dérive opérateur.",
  },
  {
    question: 'Est-ce compatible avec nos exigences IATF 16949 ?',
    answer:
      "Oui. Les stations Orbitvu supportent la documentation PPAP (Production Part Approval Process), le contrôle visuel sortie ligne avec Templates dédiés, et la traçabilité des visuels pour audit. Le mode « paramètres verrouillés + horodatage » convient également à vos exigences VDA 6.3 et APQP.",
  },
  {
    question: 'Quelle est la garantie matériel ?',
    answer:
      "Garantie constructeur Orbitvu 2 ans pièces et main-d'œuvre, extensible jusqu'à 5 ans. Support de niveau 1 assuré en direct par Packshot-Creator depuis la France. SLA support standard : réponse < 4 h ouvrées, intervention sur site < 5 j ouvrés en métropole.",
  },
  {
    question: 'Pouvons-nous tester la solution avant achat ?',
    answer:
      "Oui. Nous proposons un POC de 15 jours sur site ou en showroom avec vos propres pièces. Objectif : valider le workflow, chiffrer le ROI avec vos vraies données, former un opérateur pilote. Gratuit et sans engagement. Taux de conversion POC → commande observé : 50 à 60 %.",
  },
];

const FAQ_EN = FAQ_FR.map((f) => ({ question: f.question, answer: f.answer })); // placeholder EN = FR draft, Seb traduit

export default async function CataloguePiecesDetacheesPage({ params }: PageProps) {
  const { lang } = await params;
  const isFr = lang === 'fr';
  const faqItems = isFr ? FAQ_FR : FAQ_EN;

  const breadcrumbs = breadcrumbSchema([
    { name: 'Sysnext Industrial Solutions', url: `https://www.packshot-creator.com/${lang}/industrie-solutions` },
    { name: isFr ? 'Catalogue pièces détachées' : 'Spare parts catalogue', url: `https://www.packshot-creator.com/${lang}/industrie-solutions/catalogue-pieces-detachees` },
  ]);

  const faqJsonLd = faqSchema(faqItems);

  return (
    <>
      <SchemaOrg schema={[breadcrumbs, faqJsonLd]} />

      {/* ═════════════════════════════════════════════
          HERO
      ═════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-sysnext-900 to-sysnext-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-sysnext-200">
              <li>
                <Link href="/industrie-solutions" className="hover:text-white">
                  Sysnext Industrial Solutions
                </Link>
              </li>
              <li>/</li>
              <li className="text-white font-medium">
                {isFr ? 'Catalogue pièces détachées' : 'Spare parts catalogue'}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-4">
              {isFr ? 'Aftermarket auto · SAV outillage' : 'Automotive aftermarket · Industrial tooling service'}
            </p>
            <h1 className="font-sysnext-sans font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-6">
              {isFr
                ? 'Industrialiser la photo de votre catalogue aftermarket.'
                : 'Industrialise your aftermarket catalogue photography.'}
            </h1>
            <p className="text-lg text-sysnext-200 leading-relaxed mb-10 max-w-2xl">
              {isFr
                ? '300 à 500 pièces par jour, standardisées, intégrées à votre PIM. Coût par image amorti < 1 €, time-to-market divisé par 5. Opérateur non-photographe. ROI < 18 mois.'
                : '300 to 500 parts per day, standardised, integrated into your PIM. Amortised cost < €1 per image, time-to-market divided by 5. Non-photographer operator. ROI < 18 months.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/industrie-solutions#contact"
                className="inline-flex items-center justify-center rounded-md bg-calibration-500 px-6 py-3 text-base font-semibold text-sysnext-900 hover:bg-calibration-500/90 transition-colors shadow-md"
              >
                {isFr ? 'Réserver une démo de 30 minutes' : 'Book a 30-minute demo'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center rounded-md border border-sysnext-200/40 bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-700 transition-colors"
              >
                {isFr ? 'Calculer mon ROI' : 'Calculate my ROI'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          TRUST BAR — 6 logos clients industriels
      ═════════════════════════════════════════════ */}
      <section className="bg-white border-b border-graphite-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-graphite-500 mb-6">
            {isFr ? 'Références industrielles depuis 25 ans' : 'Industrial references for 25 years'}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo.name} className="relative h-10 w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-graphite-500 mt-4 italic">
            {isFr
              ? 'Faurecia · Continental Aftermarket · Schaeffler · Precisium · EFI Automotive · Würth Industrie parmi d\'autres références aftermarket.'
              : 'Faurecia · Continental Aftermarket · Schaeffler · Precisium · EFI Automotive · Würth Industrie among other aftermarket references.'}
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 1 — DOULEURS
      ═════════════════════════════════════════════ */}
      <section className="bg-graphite-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-proof-500 uppercase mb-3">
              {isFr ? 'La réalité du catalogue aftermarket aujourd\'hui' : 'The reality of aftermarket catalogues today'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-3xl sm:text-4xl text-sysnext-900 tracking-tight">
              {isFr ? 'Quatre douleurs qui coûtent cher.' : 'Four painful realities that cost you.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                titleFr: 'Time-to-market étouffé',
                titleEn: 'Suffocated time-to-market',
                textFr: 'Une pièce produite aujourd\'hui est photo-disponible dans 3 semaines au mieux. La concurrence asiatique met en ligne en 72 heures.',
                textEn: 'A part produced today is photo-available in 3 weeks at best. Asian competitors go online in 72 hours.',
              },
              {
                icon: Euro,
                titleFr: 'Coût photo qui explose',
                titleEn: 'Spiralling photo cost',
                textFr: '5 à 50 € par image externalisée × 8 000 nouvelles références / an = budget colossal, non maîtrisé, peu flexible.',
                textEn: '€5 to €50 per externalised image × 8,000 new SKUs per year = a massive, uncontrolled, inflexible budget.',
              },
              {
                icon: UserX,
                titleFr: 'Dépendance photographe',
                titleEn: 'Photographer dependency',
                textFr: 'Un photographe part, le savoir part avec lui. Multi-sites = multi-styles. Pas de cohérence groupe.',
                textEn: 'A photographer leaves, the know-how leaves with them. Multi-sites = multi-styles. No group consistency.',
              },
              {
                icon: AlertTriangle,
                titleFr: 'Charte cassée',
                titleEn: 'Broken charter',
                textFr: '30 % de rejets PIM en moyenne. Allers-retours sans fin. Catalogue incohérent entre gammes et sites.',
                textEn: '30% average PIM rejection rate. Endless back-and-forth. Incoherent catalogue across product lines and sites.',
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-white rounded-xl border border-graphite-200 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-proof-200/60 text-proof-500 mb-4">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-sysnext-sans font-semibold text-lg text-sysnext-900 mb-2">
                    {isFr ? card.titleFr : card.titleEn}
                  </h3>
                  <p className="text-sm text-graphite-700 leading-relaxed">
                    {isFr ? card.textFr : card.textEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 2 — SOLUTION 3 COLONNES
      ═════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
              {isFr ? 'La solution Sysnext Industrial Solutions' : 'The Sysnext Industrial Solutions answer'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-3xl sm:text-4xl text-sysnext-900 tracking-tight">
              {isFr ? 'Standardisation. Vitesse. Intégration.' : 'Standardisation. Speed. Integration.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                titleFr: 'Standardisation',
                titleEn: 'Standardisation',
                subtitleFr: 'Templates verrouillés, charte respectée à 100 %',
                subtitleEn: 'Locked Templates, charter enforced 100 %',
                bulletsFr: [
                  '1 set de Templates par gamme',
                  'Paramètres figés (éclairage, angle, focale, post-prod)',
                  '0 dérive opérateur',
                  'Multi-sites alignés',
                ],
                bulletsEn: [
                  '1 Template set per product line',
                  'Locked parameters (lighting, angle, focal length, post-processing)',
                  '0 operator drift',
                  'Multi-site alignment',
                ],
              },
              {
                icon: Zap,
                titleFr: 'Vitesse',
                titleEn: 'Speed',
                subtitleFr: '300 à 500 pièces par jour, par opérateur non-photographe',
                subtitleEn: '300 to 500 parts per day, per non-photographer operator',
                bulletsFr: [
                  'Workflow 1 clic',
                  'IA Photo Assistant',
                  'Détourage IQ Mask temps réel',
                  'Export auto multi-format',
                ],
                bulletsEn: [
                  'One-click workflow',
                  'AI Photo Assistant',
                  'Real-time IQ Mask cut-out',
                  'Automated multi-format export',
                ],
              },
              {
                icon: Plug,
                titleFr: 'Intégration',
                titleEn: 'Integration',
                subtitleFr: 'Connecté à votre PIM, ERP, DAM existants',
                subtitleEn: 'Connected to your existing PIM, ERP, DAM',
                bulletsFr: [
                  'Connecteurs natifs Akeneo · Quable · Plytix',
                  'API REST documentée',
                  'Nommage SKU automatique',
                  'Export multi-format simultané',
                ],
                bulletsEn: [
                  'Native Akeneo · Quable · Plytix connectors',
                  'Documented REST API',
                  'Automatic SKU naming',
                  'Simultaneous multi-format export',
                ],
              },
            ].map((col, idx) => {
              const Icon = col.icon;
              return (
                <div key={idx} className="border-t-2 border-calibration-500 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sysnext-50 text-sysnext-700 mb-4">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-sysnext-sans font-bold text-xl text-sysnext-900 mb-2">
                    {isFr ? col.titleFr : col.titleEn}
                  </h3>
                  <p className="text-sm font-medium text-sysnext-700 mb-4">
                    {isFr ? col.subtitleFr : col.subtitleEn}
                  </p>
                  <ul className="space-y-2">
                    {(isFr ? col.bulletsFr : col.bulletsEn).map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-graphite-700">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-calibration-500" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 4 — CHIFFRES CLÉS
      ═════════════════════════════════════════════ */}
      <section className="bg-sysnext-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {KEY_STATS.map((stat, idx) => (
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

      {/* ═════════════════════════════════════════════
          SECTION 5 — CALCULATEUR ROI (placeholder renvoi)
      ═════════════════════════════════════════════ */}
      <section id="calculator" className="bg-graphite-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
            {isFr ? 'ROI chiffré' : 'Measurable ROI'}
          </p>
          <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 mb-4 tracking-tight">
            {isFr
              ? 'Calculez votre économie annuelle en 2 minutes.'
              : 'Calculate your annual savings in 2 minutes.'}
          </h2>
          <p className="text-graphite-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            {isFr
              ? 'Entrez votre volume annuel de références, le coût actuel par photo et le délai moyen. Le calculateur estime votre économie, la réduction de time-to-market et la durée d\'amortissement.'
              : 'Enter your annual SKU volume, current cost per photo and average lead time. The calculator estimates savings, time-to-market reduction and amortisation period.'}
          </p>
          <Link
            href="/industrie-solutions/calculateur-roi"
            className="inline-flex items-center justify-center rounded-md bg-sysnext-700 px-6 py-3 text-base font-semibold text-white hover:bg-sysnext-900 transition-colors shadow-md"
          >
            {isFr ? 'Ouvrir le calculateur' : 'Open calculator'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 6 — INTÉGRATIONS
      ═════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-proof-500 uppercase mb-3">
              {isFr ? 'Écosystème industriel' : 'Industrial ecosystem'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight">
              {isFr ? 'Connecté à votre existant.' : 'Connected to your stack.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATIONS.map((cat) => (
              <div key={cat.category} className="bg-graphite-50 rounded-xl p-6 border border-graphite-200">
                <h3 className="font-sysnext-mono font-semibold text-sm tracking-wider uppercase text-sysnext-700 mb-4">
                  {cat.category}
                </h3>
                <ul className="space-y-2 text-sm text-graphite-900">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CircleDashed className="h-3 w-3 text-calibration-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-graphite-500 italic mt-6">
            {isFr
              ? 'API REST documentée pour intégrations sur mesure.'
              : 'Documented REST API for custom integrations.'}
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 7 — COMPARATIF TABLEAU
      ═════════════════════════════════════════════ */}
      <section className="bg-graphite-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-proof-500 uppercase mb-3">
              {isFr ? 'Comparatif' : 'Comparison'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight">
              {isFr
                ? 'Sysnext vs les alternatives du marché.'
                : 'Sysnext vs market alternatives.'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-graphite-200 overflow-hidden">
              <thead className="bg-sysnext-900 text-white">
                <tr>
                  <th className="text-left font-sysnext-sans font-semibold text-sm px-5 py-4">
                    {isFr ? 'Critère' : 'Criteria'}
                  </th>
                  <th className="text-center font-sysnext-sans font-medium text-sm px-5 py-4">
                    {isFr ? 'Photographe externe' : 'External photographer'}
                  </th>
                  <th className="text-center font-sysnext-sans font-medium text-sm px-5 py-4">
                    {isFr ? 'Smartphone interne' : 'Internal smartphone'}
                  </th>
                  <th className="text-center font-sysnext-sans font-bold text-sm px-5 py-4 bg-calibration-500 text-sysnext-900">
                    Sysnext
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Coût par image', '5–50 €', 'Caché (temps tech)', '< 1 € amorti'],
                  ['Délai / image', '5–10 jours', 'Variable', '< 1 minute'],
                  ['Standardisation', 'Variable', 'Quasi nulle', 'Templates verrouillés'],
                  ['Cohérence multi-sites', 'Non', 'Non', 'Oui'],
                  ['Intégration PIM / ERP', 'Manuelle', 'Manuelle', 'API native'],
                  ['Autonomie équipe', 'Non', 'Oui sans qualité', 'Oui avec qualité'],
                  ['Audit-ready (preuve)', 'Non', 'Non', 'Horodatage + signature'],
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-graphite-200">
                    <td className="px-5 py-3 font-medium text-sysnext-900">{row[0]}</td>
                    <td className="px-5 py-3 text-center text-graphite-700">{row[1]}</td>
                    <td className="px-5 py-3 text-center text-graphite-700">{row[2]}</td>
                    <td className="px-5 py-3 text-center font-semibold text-sysnext-900 bg-calibration-200/30">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 8 — ÉTUDE DE CAS (placeholder S5)
      ═════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-sysnext-50 to-white rounded-2xl border border-sysnext-200 p-10 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-sysnext-700 uppercase mb-3">
              {isFr ? 'Étude de cas à venir' : 'Case study coming soon'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-2xl text-sysnext-900 mb-3">
              {isFr
                ? 'Un équipementier auto Tier 1 publie son retour d\'expérience.'
                : 'A Tier 1 auto supplier publishes its case study.'}
            </h2>
            <p className="text-graphite-700 leading-relaxed max-w-2xl mx-auto mb-6">
              {isFr
                ? 'Publication prévue mai 2026 — chiffres consolidés et retour opérationnel sur 6 mois d\'usage industriel.'
                : 'Publication scheduled for May 2026 — consolidated figures and operational feedback after 6 months of industrial use.'}
            </p>
            <Link
              href="/industrie-solutions#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sysnext-700 hover:text-sysnext-900"
            >
              {isFr ? 'Recevoir l\'étude dès publication' : 'Receive the case study on release'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 9 — MÉTHODOLOGIE 6 ÉTAPES
      ═════════════════════════════════════════════ */}
      <section className="bg-graphite-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-calibration-500 uppercase mb-3">
              {isFr ? 'Méthodologie de déploiement' : 'Deployment methodology'}
            </p>
            <h2 className="font-sysnext-sans font-bold text-3xl text-sysnext-900 tracking-tight">
              {isFr
                ? 'De la signature à la production : 4 à 6 semaines.'
                : 'From signature to production: 4 to 6 weeks.'}
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY.map((step, idx) => (
              <li
                key={idx}
                className="relative bg-white rounded-xl border border-graphite-200 p-6"
              >
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-sysnext-900 text-white font-sysnext-sans font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="pl-2">
                  <h3 className="font-sysnext-sans font-semibold text-base text-sysnext-900 mb-1">
                    {isFr ? step.stepFr : step.stepEn}
                  </h3>
                  <p className="text-xs font-sysnext-mono text-graphite-500 uppercase tracking-wider">
                    {step.duration}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          SECTION 10 — FONDATEUR
      ═════════════════════════════════════════════ */}
      <section id="fondateur" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-sysnext-700 to-sysnext-900 rounded-xl flex items-center justify-center text-sysnext-200 text-sm">
              {isFr ? 'Portrait Seb Ducros' : 'Seb Ducros portrait'}
              <br />
              {isFr ? '(à shooter S2)' : '(to shoot S2)'}
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
                  ? 'Formation technique. Ingénieur d\'affaires composants électroniques actifs et passifs en début de carrière — connaissance intime du cycle d\'achat industriel B2B.'
                  : 'Technical background. Business engineer for active and passive electronic components in the early career — intimate knowledge of the B2B industrial purchasing cycle.'}
              </p>
              <p>
                {isFr
                  ? 'A conçu un système équivalent aux stations Orbitvu dans une société précédente : il connaît les contraintes industrielles et les modes de fonctionnement de l\'intérieur.'
                  : 'Designed a system equivalent to Orbitvu stations in a previous company: he knows industrial constraints and operating modes from the inside.'}
              </p>
              <p>
                {isFr
                  ? '25 ans de photographie technique pointue plus tard, il a racheté Packshot-Creator en janvier 2026 avec une conviction : ouvrir ces stations photo automatisées aux industriels qui souffrent d\'une documentation visuelle artisanale.'
                  : '25 years of advanced technical photography later, he acquired Packshot-Creator in January 2026 with one conviction: open these automated photo stations to industrials who suffer from artisanal visual documentation.'}
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

      {/* ═════════════════════════════════════════════
          SECTION 11 — FAQ
      ═════════════════════════════════════════════ */}
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

      {/* ═════════════════════════════════════════════
          CTA FINAL
      ═════════════════════════════════════════════ */}
      <section id="contact" className="bg-sysnext-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-sysnext-sans font-bold text-3xl sm:text-4xl text-white mb-4 tracking-tight">
            {isFr
              ? 'Votre catalogue mérite mieux que 3 semaines d\'attente.'
              : 'Your catalogue deserves better than 3 weeks of waiting.'}
          </h2>
          <p className="text-sysnext-200 leading-relaxed mb-8 max-w-xl mx-auto">
            {isFr
              ? '30 minutes avec Seb Ducros. Sans engagement. 100 % technique.'
              : '30 minutes with Seb Ducros. No commitment. 100 % technical.'}
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
