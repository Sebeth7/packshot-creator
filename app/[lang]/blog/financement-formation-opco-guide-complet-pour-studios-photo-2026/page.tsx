import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { BookOpen, Clock, User, Calendar } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import {
  Callout,
  ComparisonTable,
  TableOfContents,
  ArticleCTA,
  RelatedArticles,
} from '@/components/blog';

/* ─────────────────────────── Metadata ─────────────────────────── */

const SLUG = 'financement-formation-opco-guide-complet-pour-studios-photo-2026';
const TITLE = 'Financement Formation OPCO : Guide Complet pour Studios Photo 2026';
const DESCRIPTION =
  'Guide complet financement OPCO pour formations photo produit et studios automatisés. Procédure, critères éligibilité, montants, délais. Prise en charge 100%.';
const PUBLISHED = '2026-01-22';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords:
      'financement opco formation, opco photo produit, formation certifiée qualiopi, financement formation studio photo, prise en charge opco',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/${SLUG}`,
      languages: {
        fr: `/fr/blog/${SLUG}`,
        en: `/en/blog/${SLUG}`,
      },
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/${SLUG}`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      publishedTime: PUBLISHED,
      authors: ['Sébastien Jourdan'],
      images: [
        {
          url: `https://www.packshot-creator.com/api/og?title=${encodeURIComponent(TITLE)}&type=blog&lang=${lang}`,
          width: 1200,
          height: 630,
          alt: TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: DESCRIPTION,
    },
  };
}

/* ─────────────────────────── TOC ─────────────────────────── */

const headings = [
  { id: 'cest-quoi-un-opco', text: "1. C'est Quoi un OPCO ?", level: 2 },
  { id: 'definition-simple', text: 'Définition Simple', level: 3 },
  { id: 'les-11-opco-en-france', text: 'Les 11 OPCO en France', level: 3 },
  { id: 'fonctionnement-du-financement', text: 'Fonctionnement du Financement', level: 3 },
  { id: 'formations-packshot-creator-eligibles-opco', text: '2. Formations PackshotCreator Éligibles OPCO', level: 2 },
  { id: 'catalogue-formations-packshot', text: 'Catalogue Formations Packshot (3 Niveaux)', level: 3 },
  { id: 'catalogue-formations-ia-photo-produit', text: 'Catalogue Formations IA Photo Produit', level: 3 },
  { id: 'comment-faire-financer-par-lopco', text: "3. Comment Faire Financer par l'OPCO ? (5 Étapes)", level: 2 },
  { id: 'opco-par-secteur-tableau-complet', text: '4. OPCO Par Secteur : Tableau Complet', level: 2 },
  { id: 'cas-pratiques-3-profils-types', text: '5. Cas Pratiques : 3 Profils Types', level: 2 },
  { id: 'avantages-formations-certifiees-qualiopi', text: '6. Avantages Formations Certifiées Qualiopi', level: 2 },
  { id: 'faq-financement-opco', text: '7. Questions Fréquentes', level: 2 },
  { id: 'telecharger-le-pack-documents-opco', text: '8. Télécharger le Pack Documents OPCO', level: 2 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'Mon entreprise cotise-t-elle à un OPCO ?',
    answer: 'Oui, toutes les entreprises françaises cotisent automatiquement — c\'est une obligation légale. Les cotisations formation représentent environ 1 % de la masse salariale et sont redistribuées via les OPCO.',
  },
  {
    question: 'Combien de formations puis-je financer par an via l\'OPCO ?',
    answer: 'Cela dépend de votre budget disponible : 500 à 3 000 € par salarié selon la taille de l\'entreprise. Avec 2 000 €/an, vous pouvez financer une formation Niveau 2 (1 800 €) ou trois formations Niveau 1 IA (600 € × 3).',
  },
  {
    question: 'Les formations à distance (Blended) sont-elles éligibles OPCO ?',
    answer: 'Oui, les formations Blended (70 % e-learning + 30 % présentiel) sont totalement éligibles OPCO. Depuis la réforme 2019, l\'OPCO finance aussi bien le présentiel que le distanciel dès lors que l\'organisme est certifié Qualiopi.',
  },
  {
    question: 'Quel est le délai pour obtenir un financement OPCO ?',
    answer: 'Comptez 6 à 12 semaines entre la demande et le début de la formation : constitution du dossier (1 semaine), validation OPCO (2–4 semaines), marge de sécurité (3–7 semaines). Déposez le dossier avant toute inscription.',
  },
  {
    question: 'PackshotCreator est-il certifié Qualiopi ?',
    answer: 'Oui, PackshotCreator est certifié Qualiopi depuis 2022 (renouvellement 2025, valide jusqu\'en 2028). Le taux de validation des dossiers OPCO est de 98 % sur plus de 150 dossiers déposés.',
  },
  {
    question: 'Puis-je cumuler financement OPCO et CPF ?',
    answer: 'Oui, dans certains cas : si la formation se déroule hors temps de travail, ou si le budget OPCO est insuffisant. Un cas fréquent : OPCO finance 80 % et le CPF complète les 20 % restants pour les formations premium de plus de 2 000 €.',
  },
  {
    question: 'Que se passe-t-il si mon dossier OPCO est refusé ?',
    answer: 'Les refus sont très rares (2 % pour les formations PackshotCreator). Les causes principales sont un dossier incomplet ou un budget OPCO épuisé. PackshotCreator vous accompagne dans la correction et la ré-soumission.',
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function FinancementOpcoGuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: TITLE, url: `https://www.packshot-creator.com/${lang}/blog/${SLUG}` },
  ];

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection
        layout="centered"
        align="left"
        compact
        badge={{
          icon: <BookOpen className="h-4 w-4" />,
          label: 'Formation & Academy',
          colorClass: 'bg-very-peri-500/15 text-very-peri-300',
        }}
        title={TITLE}
        subtitle={DESCRIPTION}
      >
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-future-dusk-300">
          <span className="px-3 py-1 rounded-full bg-very-peri-500/20 text-very-peri-300 font-medium text-xs uppercase tracking-wide">
            Formation &amp; Academy
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            10 min de lecture
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            Sébastien Jourdan
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            22 janvier 2026
          </span>
        </div>
      </HeroSection>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-10">
        <img
          src="/blog/financement-opco-cover.jpg"
          alt="Financement OPCO pour formations photo produit"
          className="w-full rounded-2xl shadow-lg"
          width={1344}
          height={768}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. ARTICLE LAYOUT (TOC + body)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:flex lg:gap-12">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <TableOfContents headings={headings} title="Sommaire" />
            </div>
          </aside>

          {/* Article body */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Intro */}

              <p className="mb-4 leading-relaxed text-future-dusk-600 text-lg">
                Les formations professionnelles représentent un investissement stratégique, mais leur coût
                (500–2 000 € par jour) freine de nombreuses entreprises et salariés. Pourtant, une solution
                de financement méconnue existe et permet de prendre en charge{' '}
                <strong>jusqu&apos;à 100 % du coût des formations</strong> : les{' '}
                <strong>OPCO</strong> (Opérateurs de Compétences).
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>PackshotCreator</strong> est certifié <strong>Qualiopi</strong> depuis 2022, ce qui rend
                toutes nos formations éligibles au financement OPCO. Concrètement, cela signifie que vous pouvez
                suivre nos formations <strong>Packshot</strong>, <strong>IA photo produit</strong> ou{' '}
                <strong>Workflow e-commerce</strong> sans débourser un euro, grâce aux cotisations formation que
                votre entreprise verse déjà chaque mois.
              </p>
              <p className="mb-8 leading-relaxed text-future-dusk-600">
                Dans ce guide complet, nous détaillons le fonctionnement des OPCO, les étapes pour obtenir un
                financement à 100 %, le catalogue complet de nos formations éligibles, et 3 cas pratiques concrets.
                Que vous soyez salarié, indépendant ou chef d&apos;entreprise, découvrez comment transformer vos
                droits formation en compétences concrètes.
              </p>
              <hr className="my-8 border-neutral-200" />

            {/* Section 1 */}

              <h2
                id="cest-quoi-un-opco"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                1. C&apos;est Quoi un OPCO ? (Définition et Fonctionnement)
              </h2>

              <h3
                id="definition-simple"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Définition Simple
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>OPCO</strong> = <strong>Opérateur de Compétences</strong>
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Un OPCO est un <strong>organisme agréé par l&apos;État</strong> qui collecte les contributions
                formation des entreprises (via les charges sociales) et finance les formations professionnelles
                des salariés et dirigeants.
              </p>

              <Callout type="info" title="Définition officielle">
                Les OPCO sont des organismes paritaires (gérés par employeurs et syndicats) chargés de{' '}
                <strong>financer l&apos;apprentissage</strong> et{' '}
                <strong>d&apos;accompagner les entreprises</strong> dans leurs projets de formation. Ils
                remplacent les anciens OPCA depuis la réforme de 2019.
              </Callout>

              <p className="mb-2 leading-relaxed text-future-dusk-600">
                <strong>En résumé</strong> :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Toutes les entreprises cotisent automatiquement pour la formation (obligation légale)
                </li>
                <li className="text-future-dusk-600">
                  Les OPCO redistribuent ces fonds pour financer vos formations
                </li>
                <li className="text-future-dusk-600">
                  Vous ne payez rien de votre poche : vous utilisez un budget qui existe déjà
                </li>
              </ul>
              <hr className="my-8 border-neutral-200" />

              <h3
                id="les-11-opco-en-france"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Les 11 OPCO en France (Par Secteur)
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Chaque entreprise dépend d&apos;un OPCO selon son <strong>secteur d&apos;activité</strong> (code
                NAF/APE). Voici les 11 OPCO existants en 2026 :
              </p>

              <ComparisonTable
                headers={['OPCO', 'Secteurs Couverts', 'Exemples Activités']}
                rows={[
                  { label: 'OPCO Commerce', values: ['Commerce, distribution, retail', 'E-commerce, magasins, marketplaces'] },
                  { label: 'OPCO Entreprises de Proximité', values: ['Artisanat, TPE, services', 'Photographes, artisans, services'] },
                  { label: 'OPCO 2i', values: ['Industrie, métallurgie, chimie', 'Production industrielle, fabrication'] },
                  { label: 'AFDAS', values: ['Culture, médias, communication', 'Studios photo, agences créatives'] },
                  { label: 'ATLAS', values: ['Assurances, banques, conseil', 'Services financiers, consulting'] },
                  { label: 'OPCO Santé', values: ['Santé, social, médico-social', 'Établissements santé'] },
                  { label: 'AKTO', values: ["Services à forte intensité de main d'œuvre", 'Hôtellerie, restauration, propreté'] },
                  { label: 'OCAPIAT', values: ['Agriculture, pêche, agroalimentaire', 'Secteur agricole, alimentaire'] },
                  { label: 'OPCO Mobilités', values: ['Transports, logistique', 'Transport routier, logistique'] },
                  { label: 'OPCO Construction', values: ['BTP, construction', 'Bâtiment, travaux publics'] },
                  { label: 'Uniformation', values: ['Cohésion sociale, ESS', 'Associations, économie sociale'] },
                ]}
              />

              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Trouvez votre OPCO</strong> : Consultez votre code NAF/APE (sur Kbis ou bulletin
                salaire) puis identifiez l&apos;OPCO correspondant via{' '}
                <a
                  href="https://travail-emploi.gouv.fr/ministere/acteurs/partenaires/opco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-very-peri-600 hover:text-very-peri-700 underline"
                >
                  le site officiel du Ministère du Travail
                </a>
                .
              </p>
              <hr className="my-8 border-neutral-200" />

              <h3
                id="fonctionnement-du-financement"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Fonctionnement du Financement
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Montant disponible par an</strong> :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>TPE (&lt;11 salariés)</strong> : 500–1 500 € par salarié
                </li>
                <li className="text-future-dusk-600">
                  <strong>PME (11–50 salariés)</strong> : 1 000–2 000 € par salarié
                </li>
                <li className="text-future-dusk-600">
                  <strong>ETI (&gt;50 salariés)</strong> : 1 500–3 000 € par salarié
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Important</strong> : Ces montants sont <strong>indicatifs</strong> et varient selon
                l&apos;OPCO et les accords de branche. Contactez votre OPCO pour connaître votre enveloppe exacte.
              </p>
              <hr className="my-8 border-neutral-200" />

            {/* Section 2 */}

              <h2
                id="formations-packshot-creator-eligibles-opco"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                2. Formations PackshotCreator Éligibles OPCO
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>PackshotCreator</strong> est certifié <strong>Qualiopi</strong> depuis 2022
                (renouvellement 2025), ce qui rend <strong>toutes nos formations éligibles</strong> au
                financement OPCO et CPF.
              </p>

              <h3
                id="catalogue-formations-packshot"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Catalogue Formations Packshot (3 Niveaux)
              </h3>

              {/* Niveau 1 */}
              <div className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50 my-6">
                <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-3">
                  Niveau 1 : Maîtrise Studios Orbitvu (Débutant)
                </h4>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600"><strong>Durée</strong> : 2 jours (14h)</li>
                  <li className="text-future-dusk-600"><strong>Prix</strong> : 1 200 € (Présentiel) | 950 € (Blended)</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : E-commerçants débutants, assistants studio, chefs de produit</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Programme</strong> :</p>
                <ol className="list-decimal pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Fondamentaux packshot studio (éclairage, composition, exposition)</li>
                  <li className="text-future-dusk-600">Prise en main studios automatisés Orbitvu (AlphaShot G2, Micro)</li>
                  <li className="text-future-dusk-600">Workflow complet : Capture → Post-production → Export e-commerce</li>
                  <li className="text-future-dusk-600">Intégration Shopify/WooCommerce</li>
                </ol>
                <p className="mb-3 text-future-dusk-600">
                  <strong>Certification</strong> : Attestation de compétences PackshotCreator
                </p>
                <Link
                  href="/academy/formations-packshot"
                  className="text-very-peri-600 hover:text-very-peri-700 underline"
                >
                  Voir détails formation Niveau 1
                </Link>
              </div>

              {/* Niveau 2 */}
              <div className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50 my-6">
                <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-3">
                  Niveau 2 : Optimisation Workflow &amp; 360° (Intermédiaire)
                </h4>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600"><strong>Durée</strong> : 3 jours (21h)</li>
                  <li className="text-future-dusk-600"><strong>Prix</strong> : 1 800 € (Présentiel) | 1 400 € (Blended)</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Photographes juniors, responsables e-commerce, ayant suivi Niveau 1</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Programme</strong> :</p>
                <ol className="list-decimal pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Packshot 360° et vidéo produit tournante</li>
                  <li className="text-future-dusk-600">Focus stacking et macro photographie</li>
                  <li className="text-future-dusk-600">Workflow automatisé (batch processing, actions Photoshop)</li>
                  <li className="text-future-dusk-600">Intégration avancée (PIM, DAM, API)</li>
                  <li className="text-future-dusk-600">ROI et optimisation temps/produit</li>
                </ol>
                <p className="mb-3 text-future-dusk-600">
                  <strong>Certification</strong> : Attestation de compétences PackshotCreator Niveau 2
                </p>
                <Link
                  href="/academy/formations-packshot"
                  className="text-very-peri-600 hover:text-very-peri-700 underline"
                >
                  Voir détails formation Niveau 2
                </Link>
              </div>

              {/* Niveau 3 */}
              <div className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50 my-6">
                <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-3">
                  Niveau 3 : Expert Packshot &amp; Gestion Studio (Expert)
                </h4>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600"><strong>Durée</strong> : 3 jours (21h)</li>
                  <li className="text-future-dusk-600"><strong>Prix</strong> : 1 800 € (Présentiel uniquement)</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Photographes seniors, directeurs studio, formateurs internes</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Programme</strong> :</p>
                <ol className="list-decimal pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Studio photo haute performance (architecture, workflow)</li>
                  <li className="text-future-dusk-600">Produits complexes (bijoux haute horlogerie, verre, liquides)</li>
                  <li className="text-future-dusk-600">Gestion couleur professionnelle (calibration, profils ICC)</li>
                  <li className="text-future-dusk-600">Optimisation ROI studio (KPIs, lean management)</li>
                  <li className="text-future-dusk-600">Certification formateur interne</li>
                </ol>
                <p className="mb-3 text-future-dusk-600">
                  <strong>Certification</strong> : Certification Formateur Interne PackshotCreator
                </p>
                <Link
                  href="/academy/formations-packshot"
                  className="text-very-peri-600 hover:text-very-peri-700 underline"
                >
                  Voir détails formation Niveau 3
                </Link>
              </div>

              <h3
                id="catalogue-formations-ia-photo-produit"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Catalogue Formations IA Photo Produit (2 Niveaux)
              </h3>

              {/* IA Niveau 1 */}
              <div className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50 my-6">
                <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-3">
                  Niveau 1 : BlendAI Initiation (Débutant)
                </h4>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600"><strong>Durée</strong> : 1 jour (7h)</li>
                  <li className="text-future-dusk-600"><strong>Prix</strong> : 600 € (Présentiel) | 480 € (Blended)</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Photographes, e-commerçants, marketeurs</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Programme</strong> :</p>
                <ol className="list-decimal pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Fondamentaux IA photo produit (BlendAI, Photoroom, Flair)</li>
                  <li className="text-future-dusk-600">Interface BlendAI et premiers workflows</li>
                  <li className="text-future-dusk-600">Lifestyle Generator : Packshot → Mise en scène</li>
                  <li className="text-future-dusk-600">Background Generator : Fonds contextuels</li>
                  <li className="text-future-dusk-600">Retouche automatisée et batch processing</li>
                </ol>
                <p className="mb-3 text-future-dusk-600">
                  <strong>Certification</strong> : Attestation de compétences IA Photo Produit
                </p>
                <Link
                  href="/academy/formations-ia"
                  className="text-very-peri-600 hover:text-very-peri-700 underline"
                >
                  Voir détails formation IA Niveau 1
                </Link>
              </div>

              {/* IA Niveau 2 */}
              <div className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50 my-6">
                <h4 className="font-heading text-lg font-bold text-future-dusk-900 mb-3">
                  Niveau 2 : BlendAI Avancé &amp; Automatisation (Intermédiaire)
                </h4>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600"><strong>Durée</strong> : 2 jours (14h)</li>
                  <li className="text-future-dusk-600"><strong>Prix</strong> : 1 200 € (Présentiel) | 950 € (Blended)</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Équipes photo confirmées, ayant suivi Niveau 1</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Programme</strong> :</p>
                <ol className="list-decimal pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Prompt engineering avancé (résultats sur-mesure)</li>
                  <li className="text-future-dusk-600">API BlendAI et automatisation (webhooks, intégration PIM/DAM)</li>
                  <li className="text-future-dusk-600">Workflow Orbitvu → BlendAI automatisé</li>
                  <li className="text-future-dusk-600">Gestion catalogues 10 000+ produits</li>
                  <li className="text-future-dusk-600">Optimisation ROI et analytics</li>
                </ol>
                <p className="mb-3 text-future-dusk-600">
                  <strong>Certification</strong> : Certification BlendAI Expert
                </p>
                <Link
                  href="/academy/formations-ia"
                  className="text-very-peri-600 hover:text-very-peri-700 underline"
                >
                  Voir détails formation IA Niveau 2
                </Link>
              </div>

              <p className="mb-2 font-semibold text-future-dusk-800">Formats Disponibles</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Présentiel</strong> : Formation dans nos locaux (Paris 11e ou Lyon 2e) — Immersion
                  totale, manipulation équipements, networking
                </li>
                <li className="text-future-dusk-600">
                  <strong>Blended</strong> : 70 % e-learning + 30 % présentiel (2–4h pratique) — Flexibilité,
                  prix réduit (−20 %), compatible emploi du temps chargé
                </li>
              </ul>

              <Callout type="success" title="Prix réduit Blended">
                Le format Blended permet d&apos;économiser <strong>200–400 € par formation</strong> tout en
                conservant la pratique essentielle (30 % présentiel).
              </Callout>
              <hr className="my-8 border-neutral-200" />

            {/* Section 3 */}

              <h2
                id="comment-faire-financer-par-lopco"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                3. Comment Faire Financer par l&apos;OPCO ? (5 Étapes)
              </h2>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Étape 1 : Identifier Votre OPCO (15 minutes)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Méthode 1 — Via votre code NAF/APE</strong> : Trouvez votre code NAF/APE (sur Kbis,
                  bulletin salaire, ou Infogreffe), puis identifiez l&apos;OPCO correspondant dans le tableau
                  ci-dessus.
                </li>
                <li className="text-future-dusk-600">
                  <strong>Méthode 2 — Via votre service RH</strong> : Votre service RH connaît votre OPCO
                  (contact régulier pour gestion formation).
                </li>
                <li className="text-future-dusk-600">
                  <strong>Méthode 3 — Assistance PackshotCreator</strong> : Nous vous aidons à identifier votre
                  OPCO gratuitement (contactez-nous avec votre SIRET).
                </li>
              </ul>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Étape 2 : Vérifier Vos Droits Formation (10 minutes)
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">Budget disponible :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Consultez votre budget formation entreprise (service RH ou OPCO directement)
                </li>
                <li className="text-future-dusk-600">
                  Vérifiez votre CPF salarié si formation hors temps de travail (moncompteformation.gouv.fr)
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Critères éligibilité :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Salarié en CDI, CDD (&gt;6 mois), ou alternance ✅</li>
                <li className="text-future-dusk-600">Indépendant (autoentrepreneur, profession libérale) ✅</li>
                <li className="text-future-dusk-600">Chef d&apos;entreprise (gérant, dirigeant) ✅</li>
                <li className="text-future-dusk-600">
                  Demandeur d&apos;emploi (Pôle Emploi) ⚠️ (financement spécifique, pas OPCO)
                </li>
              </ul>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Étape 3 : Monter Votre Dossier OPCO (1 semaine)
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">
                Documents requis (fournis par PackshotCreator) :
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Devis formation détaillé</strong> : Prix, durée, dates, programme
                </li>
                <li className="text-future-dusk-600">
                  <strong>Convention de formation</strong> : Contrat tripartite (entreprise – organisme – OPCO)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Programme pédagogique complet</strong> : Objectifs, compétences, horaires
                </li>
                <li className="text-future-dusk-600">
                  <strong>Certificat Qualiopi PackshotCreator</strong> : Preuve certification (obligatoire OPCO)
                </li>
              </ol>
              <p className="mb-2 font-semibold text-future-dusk-800">Votre rôle :</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Télécharger le formulaire de demande sur le site de votre OPCO
                </li>
                <li className="text-future-dusk-600">
                  Joindre nos 4 documents + informations entreprise (SIRET, effectif, etc.)
                </li>
                <li className="text-future-dusk-600">
                  Déposer le dossier sur la plateforme en ligne de votre OPCO
                </li>
              </ol>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Assistance PackshotCreator</strong> : Nous vous accompagnons dans la constitution du
                dossier (remplissage formulaire, documents manquants, contact OPCO).
              </p>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Étape 4 : Validation OPCO (2–4 semaines)
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">
                Délai moyen : 2–4 semaines (variable selon OPCO et période)
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">OPCO Commerce : 2–3 semaines</li>
                <li className="text-future-dusk-600">OPCO 2i : 3–4 semaines</li>
                <li className="text-future-dusk-600">AFDAS : 2–3 semaines</li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Critères validation :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Formation certifiée Qualiopi ✅ (PackshotCreator OK)</li>
                <li className="text-future-dusk-600">Budget disponible entreprise ✅</li>
                <li className="text-future-dusk-600">Cohérence formation / activité entreprise ✅</li>
                <li className="text-future-dusk-600">Dossier complet (aucun document manquant) ✅</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Taux validation</strong> : <strong>98 %</strong> pour nos formations (sur 150+ dossiers
                déposés depuis 2022).
              </p>

              <Callout type="warning" title="CRITIQUE : Anticipation requise">
                Le dossier OPCO doit être déposé <strong>AVANT le début de la formation</strong>. Un dossier
                déposé après sera systématiquement rejeté.
                <br />
                <br />
                <strong>Anticipez 4–8 semaines minimum</strong> entre demande et date formation.
              </Callout>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Étape 5 : Formation et Remboursement
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">
                Cas 1 : Prise en charge directe (tiers-payant)
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">L&apos;OPCO règle directement PackshotCreator</li>
                <li className="text-future-dusk-600">Vous ne payez rien ✅</li>
                <li className="text-future-dusk-600">
                  <strong>Mode le plus fréquent</strong> (80 % des cas)
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Cas 2 : Remboursement</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Vous réglez la formation à PackshotCreator
                </li>
                <li className="text-future-dusk-600">L&apos;OPCO vous rembourse sous 30–60 jours</li>
                <li className="text-future-dusk-600">
                  <strong>Moins fréquent</strong> (20 % des cas, TPE principalement)
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">À l&apos;issue de la formation :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Émargement signé (attestation présence envoyée à l&apos;OPCO)
                </li>
                <li className="text-future-dusk-600">Évaluation des compétences acquises</li>
                <li className="text-future-dusk-600">
                  <strong>Attestation de formation</strong> ou <strong>Certificat</strong> (Niveau 3)
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Taux de remboursement</strong> : <strong>100 %</strong> pour formations Qualiopi (dans
                la limite de votre enveloppe annuelle OPCO).
              </p>
              <hr className="my-8 border-neutral-200" />

            {/* Section 4 */}

              <h2
                id="opco-par-secteur-tableau-complet"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                4. OPCO Par Secteur : Tableau Complet
              </h2>

              <ComparisonTable
                headers={["Secteur d'Activité", 'OPCO', 'Délai Validation', 'Budget Moyen']}
                rows={[
                  { label: 'E-commerce, retail, distribution', values: ['OPCO Commerce', '2–3 semaines', '1 500–2 500 €/an'] },
                  { label: 'Artisans, photographes, TPE', values: ['OPCO EP', '3–4 semaines', '500–1 500 €/an'] },
                  { label: 'Industrie, production', values: ['OPCO 2i', '3–4 semaines', '2 000–3 000 €/an'] },
                  { label: 'Studios photo, agences créatives', values: ['AFDAS', '2–3 semaines', '1 500–2 500 €/an'] },
                  { label: 'Services, conseil', values: ['ATLAS', '2–3 semaines', '1 500–2 000 €/an'] },
                  { label: 'Hôtellerie, restauration', values: ['AKTO', '3–4 semaines', '1 000–2 000 €/an'] },
                ]}
              />

              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Note</strong> : Budgets indicatifs moyens. Montants exacts selon taille entreprise et
                accords de branche.
              </p>
              <hr className="my-8 border-neutral-200" />

            {/* Section 5 */}

              <h2
                id="cas-pratiques-3-profils-types"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                5. Cas Pratiques : 3 Profils Types
              </h2>

              {/* Cas 1 */}
              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Cas 1 : Salarié E-commerce (OPCO Commerce)
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">Profil :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Thomas, Chef de produit e-commerce chez distributeur équipement sportif (50 salariés)
                </li>
                <li className="text-future-dusk-600">OPCO : <strong>OPCO Commerce</strong></li>
                <li className="text-future-dusk-600">
                  Formation souhaitée : <strong>Maîtrise Studios Orbitvu (Niveau 1)</strong> — 1 200 €
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Démarches :</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Thomas contacte son service RH (demande formation)</li>
                <li className="text-future-dusk-600">
                  RH valide pertinence formation (gestion catalogue 2 000 produits)
                </li>
                <li className="text-future-dusk-600">RH monte dossier OPCO avec documents PackshotCreator</li>
                <li className="text-future-dusk-600">
                  Dépôt dossier OPCO Commerce (4 semaines avant formation)
                </li>
                <li className="text-future-dusk-600">Validation OPCO sous 3 semaines</li>
              </ol>
              <p className="mb-2 font-semibold text-future-dusk-800">Résultat :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Prise en charge 100 %</strong> (1 200 € financés par OPCO)
                </li>
                <li className="text-future-dusk-600">Thomas suit formation 2 jours (présentiel Paris)</li>
                <li className="text-future-dusk-600">Entreprise ne débourse rien ✅</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Gain entreprise</strong> : 1 200 € + compétences Thomas (ROI formation en 2–3 mois)
              </p>
              <hr className="my-8 border-neutral-200" />

              {/* Cas 2 */}
              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Cas 2 : Indépendant Photographe (OPCO EP)
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">Profil :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Marie, photographe indépendante (autoentrepreneur)</li>
                <li className="text-future-dusk-600">OPCO : <strong>OPCO Entreprises de Proximité</strong></li>
                <li className="text-future-dusk-600">
                  Formation souhaitée : <strong>BlendAI Initiation (Niveau 1)</strong> — 600 €
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Démarches :</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Marie identifie son OPCO (OPCO EP pour artisans/photographes)
                </li>
                <li className="text-future-dusk-600">
                  Marie télécharge formulaire OPCO EP (site officiel)
                </li>
                <li className="text-future-dusk-600">
                  Marie joint devis + programme PackshotCreator
                </li>
                <li className="text-future-dusk-600">Dépôt dossier en ligne (6 semaines avant formation)</li>
                <li className="text-future-dusk-600">Validation OPCO EP sous 3–4 semaines</li>
              </ol>
              <p className="mb-2 font-semibold text-future-dusk-800">Résultat :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Prise en charge 100 %</strong> (600 € financés par OPCO)
                </li>
                <li className="text-future-dusk-600">
                  Marie suit formation 1 jour (format Blended : e-learning + 2h présentiel)
                </li>
                <li className="text-future-dusk-600">Marie ne paie rien ✅</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Gain Marie</strong> : 600 € + maîtrise BlendAI (augmentation CA via offre IA)
              </p>
              <hr className="my-8 border-neutral-200" />

              {/* Cas 3 */}
              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Cas 3 : Chef d&apos;Entreprise (OPCO selon secteur)
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">Profil :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">David, fondateur e-commerce bijoux artisanaux (3 salariés)</li>
                <li className="text-future-dusk-600">OPCO : <strong>OPCO Commerce</strong></li>
                <li className="text-future-dusk-600">
                  Formation souhaitée : <strong>Niveau 1 Packshot + Niveau 1 IA</strong> — 1 800 € total
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Démarches :</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  David contacte OPCO Commerce (vérification budget disponible)
                </li>
                <li className="text-future-dusk-600">
                  Budget OK : 2 000 €/an disponibles pour David (dirigeant)
                </li>
                <li className="text-future-dusk-600">
                  David monte dossier avec aide PackshotCreator
                </li>
                <li className="text-future-dusk-600">
                  Dépôt dossier 6 semaines avant formation
                </li>
                <li className="text-future-dusk-600">Validation OPCO sous 3 semaines</li>
              </ol>
              <p className="mb-2 font-semibold text-future-dusk-800">Résultat :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Prise en charge 100 %</strong> (1 800 € financés)
                </li>
                <li className="text-future-dusk-600">
                  David suit Niveau 1 Packshot (2 jours) + Niveau 1 IA (1 jour)
                </li>
                <li className="text-future-dusk-600">Entreprise économise 1 800 € ✅</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>ROI David</strong> : 1 800 € économisés + compétences pour internaliser production photo
                (économie 15 000 €/an vs prestataires externes)
              </p>
              <hr className="my-8 border-neutral-200" />

            {/* Section 6 */}

              <h2
                id="avantages-formations-certifiees-qualiopi"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                6. Avantages Formations Certifiées Qualiopi
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Qualiopi</strong> est le label national de qualité des organismes de formation. Il est{' '}
                <strong>obligatoire</strong> depuis janvier 2022 pour qu&apos;une formation soit financée par
                un OPCO ou le CPF.
              </p>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                <strong>PackshotCreator est certifié Qualiopi</strong> ✅ (certification obtenue en 2022,
                renouvelée en 2025, valide jusqu&apos;en 2028)
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                1. Qualité Pédagogique Validée
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Organisme certificateur agréé (Afnor Certification)
                </li>
                <li className="text-future-dusk-600">
                  Audit annuel (processus, supports, évaluations)
                </li>
                <li className="text-future-dusk-600">
                  7 critères qualité (dont adaptation publics, moyens pédagogiques, formateurs)
                </li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                2. Formateurs Experts Certifiés
              </h3>
              <p className="mb-2 font-semibold text-future-dusk-800">
                Sébastien Jourdan — Formateur principal PackshotCreator
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>20 ans d&apos;expérience</strong> packshot luxe (clients : CHANEL, Van Cleef &amp;
                  Arpels, BOSCH, SANDRO)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Formateur agréé Orbitvu</strong> depuis 2019
                </li>
                <li className="text-future-dusk-600">
                  <strong>Expert IA photo produit</strong> (BlendAI, prompt engineering, workflows automatisés)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Certification formateur professionnel</strong> (2018)
                </li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                3. Programmes Conformes RNCP
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Nos programmes respectent les <strong>référentiels métiers</strong> (compétences attendues
                photographe packshot, opérateur studio automatisé) conformément au Répertoire National des
                Certifications Professionnelles.
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                4. Suivi Personnalisé Post-Formation
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Accès formateur par email pendant 3 mois</li>
                <li className="text-future-dusk-600">
                  Documentation technique (manuels PDF, fiches pratiques)
                </li>
                <li className="text-future-dusk-600">
                  Invitation webinaires trimestriels (nouvelles fonctionnalités, retours d&apos;expérience)
                </li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                5. Mise à Jour Contenu 2026
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Intégration nouveautés 2026 (Orbitvu AlphaShot XXL, BlendAI v3)
                </li>
                <li className="text-future-dusk-600">
                  Cas pratiques clients récents (catalogues 2025–2026)
                </li>
                <li className="text-future-dusk-600">
                  Évolutions workflow e-commerce (Shopify 2026, WooCommerce 9)
                </li>
              </ul>
              <hr className="my-8 border-neutral-200" />

            {/* Section 7 — FAQ */}

              <section className="mt-16 pt-12 border-t border-neutral-200">
                <h2
                  id="faq-financement-opco"
                  className="font-heading text-2xl font-bold text-future-dusk-900 mb-8 scroll-mt-24"
                >
                  7. Questions Fréquentes
                </h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details key={i} className="group border border-neutral-200 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-future-dusk-900 hover:bg-neutral-50 transition-colors">
                        {item.question}
                        <span className="ml-4 text-very-peri-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="px-6 pb-4 text-future-dusk-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <Callout type="success">
                <p className="font-bold text-lg mb-2">Formations Certifiées Qualiopi 100 % Finançables</p>
                <p className="mb-3">
                  Découvrez notre catalogue complet de formations packshot et IA photo produit. Tous les
                  niveaux, financement OPCO 100 %, sessions mensuelles Paris/Lyon.
                </p>
                <Link
                  href="/academy"
                  className="inline-block bg-accent-green hover:opacity-90 text-white px-5 py-2 rounded-lg font-semibold transition-opacity"
                >
                  Voir le catalogue formations →
                </Link>
              </Callout>
              <hr className="my-8 border-neutral-200" />

            {/* Section 8 */}

              <h2
                id="telecharger-le-pack-documents-opco"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                8. Télécharger le Pack Documents OPCO
              </h2>
              <p className="mb-2 font-semibold text-future-dusk-800">
                Documents fournis par PackshotCreator pour montage dossier OPCO :
              </p>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Devis formation détaillé</strong> (PDF)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Convention de formation tripartite</strong> (PDF)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Programme pédagogique complet</strong> (PDF, 5–10 pages)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Certificat Qualiopi</strong> (PDF)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Guide montage dossier OPCO</strong> (PDF, 3 pages)
                </li>
              </ol>
              <Link
                href="/contact"
                className="text-very-peri-600 hover:text-very-peri-700 underline"
              >
                Demander le Pack Documents OPCO
              </Link>
              <hr className="my-8 border-neutral-200" />

            {/* Conclusion */}

              <h2
                id="conclusion"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Conclusion : Transformez Vos Droits Formation en Compétences
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Le financement OPCO représente une <strong>opportunité exceptionnelle</strong> : des formations
                professionnelles de qualité, <strong>entièrement gratuites</strong>, grâce à des cotisations que
                votre entreprise verse déjà chaque mois. Ne laissez pas ce budget dormir.
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Les 3 Points Clés à Retenir
              </h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Financement 100 %</strong> : OPCO prend en charge l&apos;intégralité du coût (dans
                  limite enveloppe)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Certification Qualiopi</strong> : PackshotCreator certifié depuis 2022
                  (renouvellement 2025)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Anticipation requise</strong> : Déposez votre dossier{' '}
                  <strong>6–12 semaines avant</strong> la formation
                </li>
              </ol>

              <Callout type="success" title="Étapes recommandées">
                <p className="mb-2">
                  <strong>Étape 1</strong> : Identifier votre OPCO (code NAF/APE ou contact RH)
                </p>
                <p className="mb-2">
                  <strong>Étape 2</strong> : Choisir votre formation (Packshot Niveau 1–3, IA Niveau 1–2)
                </p>
                <p className="mb-2">
                  <strong>Étape 3</strong> : Télécharger le Pack Documents OPCO
                </p>
                <p className="mb-2">
                  <strong>Étape 4</strong> : Nous contacter pour accompagnement montage dossier
                </p>
                <p>
                  <strong>Étape 5</strong> : Déposer dossier OPCO (6–8 semaines avant formation)
                </p>
              </Callout>

              <p className="mt-8 mb-4 font-semibold text-future-dusk-800">Prendre RDV Conseiller Formation</p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Besoin d&apos;aide pour identifier votre OPCO, choisir la formation adaptée, monter votre
                dossier ou vérifier votre éligibilité ? Prenez RDV avec notre conseiller formation (gratuit,
                30 minutes, visio ou téléphone).
              </p>
              <div className="flex flex-col sm:flex-row gap-4 my-8">
                <Link
                  href="/contact"
                  className="inline-block bg-accent-green hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-opacity shadow-lg text-center"
                >
                  Prendre RDV Conseiller
                </Link>
                <Link
                  href="/academy"
                  className="inline-block bg-very-peri-600 hover:bg-very-peri-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg text-center"
                >
                  Voir Catalogue Formations
                </Link>
              </div>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Ressources Complémentaires
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Catalogue Formations Packshot</strong> :{' '}
                  <Link href="/academy/formations-packshot" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Voir les 3 niveaux
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Catalogue Formations IA</strong> :{' '}
                  <Link href="/academy/formations-ia" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Voir les 2 niveaux
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Calendrier et Inscription</strong> :{' '}
                  <Link href="/academy/calendrier" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Dates disponibles 2026
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Formation Photo Produit 2026</strong> :{' '}
                  <Link
                    href="/blog/formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026"
                    className="text-very-peri-600 hover:text-very-peri-700 underline"
                  >
                    Article complet
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Guide IA Photo Produit 2026</strong> :{' '}
                  <Link
                    href="/blog/ia-photo-produit-guide-2026"
                    className="text-very-peri-600 hover:text-very-peri-700 underline"
                  >
                    Lire l&apos;article
                  </Link>
                </li>
              </ul>

              <p className="mt-8 text-sm text-future-dusk-400">
                <strong>Auteur</strong> : Sébastien Jourdan, Photographe Packshot &amp; Formateur Certifié
                Qualiopi — <strong>Dernière mise à jour</strong> : 22 janvier 2026
              </p>

          </article>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ArticleCTA lang={lang} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. RELATED ARTICLES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <RelatedArticles currentSlug={SLUG} category="Formation & Academy" lang={lang} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg
        schema={[
          breadcrumbSchema(breadcrumbs),
          articleSchema({
            title: TITLE,
            description: DESCRIPTION,
            url: `https://www.packshot-creator.com/${lang}/blog/${SLUG}`,
            datePublished: PUBLISHED,
            author: 'Sébastien Jourdan',
            category: 'Formation & Academy',
          }),
          faqSchema(faqItems),
        ]}
      />
    </>
  );
}
