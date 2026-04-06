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

const SLUG =
  'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026';
const TITLE =
  'Formation Photo Produit Professionnelle : Maîtriser Studios Orbitvu et IA en 2026';
const DESCRIPTION =
  'Formation photo produit certifiée Qualiopi. Maîtrise studios Orbitvu, IA BlendAI, workflow e-commerce. Présentiel/blended. Financement OPCO 100%.';
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
      'formation photo produit, formation studio orbitvu, formation ia photo, formation packshot, certification qualiopi',
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
  { id: 'pourquoi-se-former-a-la-photo-produit-en-2026', text: 'Pourquoi Se Former à la Photo Produit en 2026 ?', level: 2 },
  { id: 'roi-formation-lautonomie-genere-des-economies-massives', text: "ROI Formation : L'Autonomie Génère des Économies", level: 3 },
  { id: 'qualite-et-coherence-visuelle', text: 'Qualité et Cohérence Visuelle', level: 3 },
  { id: 'competences-2026-packshot-studio-ia-photo-produit', text: 'Compétences 2026 : Packshot Studio + IA', level: 3 },
  { id: 'les-3-niveaux-de-formation-photo-produit', text: 'Les 3 Niveaux de Formation Photo Produit', level: 2 },
  { id: 'niveau-1-debutant', text: 'Niveau 1 — Débutant (7h, 650–850 €)', level: 3 },
  { id: 'niveau-2-intermediaire', text: 'Niveau 2 — Intermédiaire (14h, 1 100–1 500 €)', level: 3 },
  { id: 'niveau-3-expert', text: 'Niveau 3 — Expert (21h, 1 800 €)', level: 3 },
  { id: 'formations-packshot-vs-formations-ia-photo-produit', text: 'Formations Packshot vs Formations IA', level: 2 },
  { id: 'financement-opco-100-pris-en-charge', text: 'Financement OPCO : 100 % Pris en Charge', level: 2 },
  { id: 'format-blended-flexibilite-maximale', text: 'Format Blended : Flexibilité Maximale', level: 2 },
  { id: 'le-formateur-sebastien-jourdan', text: 'Le Formateur : Sébastien Jourdan', level: 2 },
  { id: 'calendrier-inscription', text: 'Calendrier & Inscription', level: 2 },
  { id: 'faq-formation-photo-produit', text: 'Questions Fréquentes', level: 2 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'Combien coûte une formation photo produit professionnelle ?',
    answer: 'Les formations PackshotCreator vont de 650 € (Niveau 1, 7h, format Blended) à 1 800 € (Niveau 3, 21h, présentiel). Toutes sont finançables à 100 % par votre OPCO grâce à la certification Qualiopi.',
  },
  {
    question: 'Faut-il des prérequis pour suivre une formation packshot ?',
    answer: 'Le Niveau 1 est accessible aux débutants complets, sans expérience photo requise. Pour le Niveau 2 (IA incluse), la maîtrise du Niveau 1 est obligatoire car l\'IA ne peut pas corriger un mauvais packshot source.',
  },
  {
    question: 'En combien de temps peut-on rentabiliser une formation photo produit ?',
    answer: 'Le seuil de rentabilité est atteint en 3 à 6 mois. À 50–150 € par photo externalisée, un catalogue de 1 000 produits coûte 50 000–150 000 € par an ; après formation et acquisition d\'un studio (~20 000 €), le coût marginal descend à 2–5 € par photo.',
  },
  {
    question: 'Quelle est la différence entre formation packshot et formation IA photo produit ?',
    answer: 'La formation packshot porte sur la capture en studio (éclairage, cadrage, Orbitvu). La formation IA apprend à transformer ces packshots en visuels lifestyle avec BlendAI. Les deux sont complémentaires et l\'IA nécessite de maîtriser le packshot en prérequis.',
  },
  {
    question: 'Les formations PackshotCreator sont-elles disponibles en dehors de Paris ?',
    answer: 'Oui, les sessions ont lieu à Paris 11e et à Lyon 2e (partenaire). Le format Blended (70 % e-learning à distance + 30 % présentiel en studio) permet de minimiser les déplacements.',
  },
  {
    question: 'Qui anime les formations photo produit PackshotCreator ?',
    answer: 'Sébastien Jourdan, photographe packshot depuis 2005 avec 20 ans d\'expérience (CHANEL, Van Cleef & Arpels, BOSCH), formateur agréé Orbitvu depuis 2019 et expert IA photo produit. Les groupes sont limités à 4–8 participants pour un suivi individualisé.',
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function FormationPhotoProduitPage({
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
            11 min de lecture
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
          src="/images/blog/thumbnail-article-nouveau-2.avif"
          alt="Formation photo produit professionnelle Orbitvu et IA"
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
                L&apos;e-commerce représente aujourd&apos;hui plus de 15 % du commerce de détail mondial, et
                ce chiffre ne cesse de croître. Dans cet univers ultra-compétitif,{' '}
                <strong>la qualité des visuels produit est devenue le facteur décisif</strong> pour convertir
                un visiteur en client. Pourtant, la majorité des entreprises e-commerce font face à un double
                problème : des équipes non formées aux techniques professionnelles de packshot, et des budgets
                photo externalisée qui explosent (50–150 € par photo).
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                La solution ? <strong>Se former à la photo produit professionnelle</strong> et acquérir
                l&apos;autonomie complète sur votre production visuelle. Nos formations certifiées{' '}
                <strong>Qualiopi</strong> vous permettent de maîtriser le packshot studio, l&apos;IA photo
                produit et les workflows e-commerce modernes, tout en bénéficiant d&apos;un{' '}
                <strong>financement OPCO à 100 %</strong> (votre formation peut être entièrement gratuite).
              </p>
              <p className="mb-8 leading-relaxed text-future-dusk-600">
                Que vous soyez e-commerçant débutant, photographe produit ou directeur studio, découvrez nos{' '}
                <strong>3 niveaux de formation</strong> adaptés à chaque profil, du débutant complet à
                l&apos;expert IA.
              </p>
              <div className="my-8">
                <Link
                  href="/contact"
                  className="inline-block bg-accent-green hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-opacity shadow-lg"
                >
                  Obtenir un devis OPCO gratuit
                </Link>
              </div>
              <hr className="my-8 border-neutral-200" />

            {/* Section : Pourquoi se former */}

              <h2
                id="pourquoi-se-former-a-la-photo-produit-en-2026"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Pourquoi Se Former à la Photo Produit en 2026 ?
              </h2>

              <h3
                id="roi-formation-lautonomie-genere-des-economies-massives"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                ROI Formation : L&apos;Autonomie Génère des Économies Massives
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Externaliser la production photo produit coûte en moyenne{' '}
                <strong>50 à 150 € par photo</strong>. Pour un catalogue e-commerce de 1 000 références avec
                2–3 variantes par produit, vous atteignez rapidement un budget annuel de{' '}
                <strong>50 000 à 150 000 €</strong>. Et ces coûts se répètent chaque saison, à chaque nouveau
                produit, à chaque mise à jour.
              </p>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                À l&apos;inverse, investir dans une <strong>formation professionnelle</strong> (650–1 800 €)
                combinée à un <strong>studio photo automatisé</strong> (~15 000–20 000 €) vous permet
                d&apos;atteindre le <strong>seuil de rentabilité en 3 à 6 mois seulement</strong>.
              </p>

              <p className="mb-3 font-semibold text-future-dusk-800">
                Tableau ROI : Comparatif sur 3 ans
              </p>
              <ComparisonTable
                headers={['Prestataire Externe', 'Formation + Studio Interne']}
                rows={[
                  { label: 'Investissement initial', values: ['0 €', '20 000 € (studio + formation)'] },
                  { label: 'Coût par photo', values: ['50–150 €', '2–5 € (coût marginal)'] },
                  { label: 'Coût annuel (1 000 photos/an)', values: ['50 000–150 000 €', '2 000–5 000 €'] },
                  { label: 'Coût sur 3 ans', values: ['150 000–450 000 €', '26 000 €'] },
                  { label: 'ROI', values: ['N/A', "92–95 % d'économie"] },
                  { label: 'Délai rentabilité', values: ['N/A', '3–6 mois'] },
                ]}
              />

              <h3
                id="qualite-et-coherence-visuelle"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Qualité et Cohérence Visuelle : Maîtrisez Votre Identité de Marque
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Lorsque vous externalisez votre production photo, vous dépendez de la disponibilité, des
                standards qualité et de la compréhension de votre identité visuelle par des prestataires
                externes. Résultat : <strong>incohérences chromatiques, délais imprévisibles, et perte de
                contrôle</strong> sur l&apos;image de marque.
              </p>
              <p className="mb-2 leading-relaxed text-future-dusk-600">
                En formant vos équipes en interne, vous garantissez :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Cohérence absolue</strong> : Même éclairage, même colorimétrie, même style sur
                  100 % de votre catalogue
                </li>
                <li className="text-future-dusk-600">
                  <strong>Réactivité maximale</strong> : Shoot à la demande, sans dépendre des plannings
                  externes
                </li>
                <li className="text-future-dusk-600">
                  <strong>Maîtrise totale</strong> : Votre charte graphique respectée à 100 %, votre
                  identité préservée
                </li>
              </ul>

              <h3
                id="competences-2026-packshot-studio-ia-photo-produit"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Compétences 2026 : Packshot Studio + IA Photo Produit
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Les formations photo produit modernes ne se limitent plus au simple packshot fond blanc.
                En 2026, <strong>l&apos;IA photo produit</strong> a révolutionné le workflow e-commerce. Une
                formation complète doit couvrir :
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Packshot studio automatisé</strong> : Maîtrise des studios Orbitvu (AlphaShot,
                  Station M), éclairage LED contrôlé, prises de vue 360°, focus stacking
                </li>
                <li className="text-future-dusk-600">
                  <strong>IA photo produit</strong> : Utilisation de BlendAI pour générer des visuels
                  lifestyle, backgrounds contextuels, retouches automatisées
                </li>
                <li className="text-future-dusk-600">
                  <strong>Workflow complet</strong> : De la capture studio à la diffusion e-commerce
                  (Shopify, WooCommerce, Magento)
                </li>
              </ol>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Nos formations intègrent ces <strong>3 piliers fondamentaux</strong> pour vous rendre
                opérationnel sur l&apos;intégralité de la chaîne de production photo e-commerce.
              </p>

              <Callout type="success" title="Cas client réel">
                Un pure player mode (500 références) a atteint le ROI de sa formation en{' '}
                <strong>4 mois</strong>, économisant 45 000 € la première année en internalisant sa
                production photo.
              </Callout>

              <Link
                href="/studios-photo-automatises"
                className="text-very-peri-600 hover:text-very-peri-700 underline"
              >
                Découvrir nos solutions studios automatisés
              </Link>
              <hr className="my-8 border-neutral-200" />

            {/* Section : 3 niveaux */}

              <h2
                id="les-3-niveaux-de-formation-photo-produit"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Les 3 Niveaux de Formation Photo Produit
              </h2>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Nos formations sont structurées en <strong>3 niveaux progressifs</strong> pour s&apos;adapter
                à votre profil et à vos objectifs. Chaque niveau est certifié <strong>Qualiopi</strong> et
                éligible au <strong>financement OPCO à 100 %</strong>.
              </p>

              {/* Niveau 1 */}
              <h3
                id="niveau-1-debutant"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Niveau 1 — Débutant : Les Fondamentaux du Packshot (7h, 650–850 €)
              </h3>

              <p className="mb-2 font-semibold text-future-dusk-800">Pour qui ?</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>E-commerçants débutants</strong> sans expérience photo
                </li>
                <li className="text-future-dusk-600">
                  <strong>Assistants studio</strong> débutant dans le packshot produit
                </li>
                <li className="text-future-dusk-600">
                  <strong>Chefs de produit / Marketeurs</strong> souhaitant comprendre le workflow photo
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Prérequis</p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Aucun prérequis technique. Accessible à tous.
              </p>

              <p className="mb-2 font-semibold text-future-dusk-800">Objectifs pédagogiques</p>
              <p className="mb-2 text-future-dusk-600">À l&apos;issue de cette formation, vous serez capable de :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Maîtriser les bases du packshot studio (éclairage, composition, exposition)
                </li>
                <li className="text-future-dusk-600">
                  Comprendre le fonctionnement d&apos;un studio automatisé Orbitvu AlphaShot
                </li>
                <li className="text-future-dusk-600">
                  Réaliser des packshots fond blanc conformes aux standards e-commerce
                </li>
                <li className="text-future-dusk-600">
                  Effectuer une post-production de base (détourage, ajustements colorimétriques)
                </li>
                <li className="text-future-dusk-600">
                  Intégrer les visuels dans un workflow e-commerce (export, nommage, intégration)
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Programme détaillé (7 heures)</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Fondamentaux de la photo produit</strong> (1h) — Spécificités du packshot vs photo
                  publicitaire, standards e-commerce, comprendre la lumière
                </li>
                <li className="text-future-dusk-600">
                  <strong>Éclairage et composition produit</strong> (2h) — Schémas d&apos;éclairage
                  classiques (3 points, 5 points), gestion des reflets et transparences, composition produit
                </li>
                <li className="text-future-dusk-600">
                  <strong>Prise en main studio Orbitvu AlphaShot</strong> (2h) — Installation, calibration,
                  interface logicielle, capture automatisée fond blanc, vues multiples
                </li>
                <li className="text-future-dusk-600">
                  <strong>Post-production de base</strong> (1h) — Détourage automatique et manuel,
                  ajustements colorimétriques, export haute qualité
                </li>
                <li className="text-future-dusk-600">
                  <strong>Workflow e-commerce</strong> (1h) — Nommage et organisation des fichiers,
                  formats d&apos;export (JPEG, PNG, WebP), intégration Shopify / WooCommerce
                </li>
              </ol>

              <p className="mb-2 font-semibold text-future-dusk-800">Format et tarifs</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Format Blended</strong> (recommandé) : 70 % e-learning asynchrone + 30 %
                  présentiel (2h pratique studio) — <strong>Tarif : 650 €</strong>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Format Présentiel</strong> : 7h en présentiel complet — <strong>Tarif : 850 €</strong>
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Financement OPCO : Prise en charge à 100 %</strong>
              </p>
              <hr className="my-8 border-neutral-200" />

              {/* Niveau 2 */}
              <h3
                id="niveau-2-intermediaire"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Niveau 2 — Intermédiaire : Packshot Avancé + IA Photo Produit (14h, 1 100–1 500 €)
              </h3>

              <p className="mb-2 font-semibold text-future-dusk-800">Pour qui ?</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Photographes produit juniors</strong> avec 6+ mois d&apos;expérience packshot
                </li>
                <li className="text-future-dusk-600">
                  <strong>Responsables e-commerce</strong> gérant un catalogue 100+ produits
                </li>
                <li className="text-future-dusk-600">
                  <strong>Ayant suivi le Niveau 1</strong> ou équivalent
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Prérequis</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Niveau 1 validé OU 6 mois d&apos;expérience packshot studio
                </li>
                <li className="text-future-dusk-600">
                  Maîtrise des bases de l&apos;exposition et de l&apos;éclairage
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Objectifs pédagogiques</p>
              <p className="mb-2 text-future-dusk-600">À l&apos;issue de cette formation, vous serez capable de :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Réaliser des packshots 360° et vidéos produit
                </li>
                <li className="text-future-dusk-600">
                  Maîtriser le focus stacking et la macro photographie produit
                </li>
                <li className="text-future-dusk-600">
                  Utiliser l&apos;IA photo produit (BlendAI) pour générer des visuels lifestyle
                </li>
                <li className="text-future-dusk-600">
                  Automatiser la retouche avec des workflows batch
                </li>
                <li className="text-future-dusk-600">
                  Intégrer l&apos;IA dans votre pipeline e-commerce
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Programme détaillé (14 heures)</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Packshot 360° et vidéo produit</strong> (3h) — Configuration studio 360°,
                  capture et assemblage automatique, export GIF/MP4 pour e-commerce
                </li>
                <li className="text-future-dusk-600">
                  <strong>Focus stacking et macro photographie produit</strong> (2h) — Principe du focus
                  stacking, équipement et configuration, assemblage logiciel
                </li>
                <li className="text-future-dusk-600">
                  <strong>Introduction à l&apos;IA photo produit (BlendAI)</strong> (3h) — Fondamentaux,
                  interface BlendAI, Lifestyle Generator : packshot → mise en scène, Background Generator
                </li>
                <li className="text-future-dusk-600">
                  <strong>Retouche avancée Photoshop</strong> (2h) — Techniques avancées, gestion des
                  matières complexes (verre, métal, bijoux), masques et sélections
                </li>
                <li className="text-future-dusk-600">
                  <strong>Workflow automatisé et batch processing</strong> (2h) — Automatisation Photoshop,
                  batch processing IA, gestion colorimétrie à grande échelle
                </li>
                <li className="text-future-dusk-600">
                  <strong>Intégration e-commerce avancée</strong> (2h) — API Shopify / WooCommerce /
                  Magento, automatisation des uploads, DAM et organisation
                </li>
              </ol>

              <p className="mb-2 font-semibold text-future-dusk-800">Format et tarifs</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Format Blended</strong> : 70 % e-learning + 30 % présentiel (4h pratique) —{' '}
                  <strong>Tarif : 1 100 €</strong>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Format Présentiel</strong> : 14h en présentiel complet —{' '}
                  <strong>Tarif : 1 500 €</strong>
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Financement OPCO : Prise en charge à 100 %</strong>
              </p>
              <hr className="my-8 border-neutral-200" />

              {/* Niveau 3 */}
              <h3
                id="niveau-3-expert"
                className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24"
              >
                Niveau 3 — Expert : IA Avancée + Gestion Studio Complète (21h, 1 800 €)
              </h3>

              <p className="mb-2 font-semibold text-future-dusk-800">Pour qui ?</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Photographes produit seniors</strong> avec 2+ ans d&apos;expérience
                </li>
                <li className="text-future-dusk-600">
                  <strong>Directeurs de studios photo</strong> gérant des équipes
                </li>
                <li className="text-future-dusk-600">
                  <strong>Formateurs internes</strong> souhaitant certifier leurs compétences
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Prérequis</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Niveau 2 validé OU 2 ans d&apos;expérience packshot + IA
                </li>
                <li className="text-future-dusk-600">
                  Maîtrise confirmée des studios automatisés
                </li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Objectifs pédagogiques</p>
              <p className="mb-2 text-future-dusk-600">À l&apos;issue de cette formation, vous serez capable de :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Maîtriser l&apos;IA avancée (Lifestyle Generator, fine-tuning sur votre charte)
                </li>
                <li className="text-future-dusk-600">Gérer un studio photo haute performance</li>
                <li className="text-future-dusk-600">Optimiser le ROI d&apos;un studio photo interne</li>
                <li className="text-future-dusk-600">Former vos équipes aux bonnes pratiques</li>
                <li className="text-future-dusk-600">Obtenir la certification formateur interne</li>
              </ul>

              <p className="mb-2 font-semibold text-future-dusk-800">Programme détaillé (21 heures)</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Studio photo haute performance</strong> (4h) — Architecture studio pro,
                  équipements avancés (Orbitvu Station XXL), produits complexes (bijoux, verre, liquides)
                </li>
                <li className="text-future-dusk-600">
                  <strong>IA avancée : Lifestyle, Backgrounds, Batch</strong> (6h) — Prompt engineering
                  avancé, fine-tuning IA sur votre charte, API BlendAI, catalogues 10 000+ produits
                </li>
                <li className="text-future-dusk-600">
                  <strong>Gestion couleur professionnelle</strong> (3h) — Calibration complète, profils
                  ICC personnalisés, colorimétrie avancée (spectrophotomètre, deltaE)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Éclairage produits complexes</strong> (4h) — Bijoux et pierres précieuses,
                  verre et transparence, métaux et reflets contrôlés, tissus et textures
                </li>
                <li className="text-future-dusk-600">
                  <strong>Optimisation ROI studio</strong> (2h) — Calcul de rentabilité, KPIs photo
                  produit, amélioration continue et lean management
                </li>
                <li className="text-future-dusk-600">
                  <strong>Certification formateur interne</strong> (2h) — Pédagogie et transmission,
                  création de supports de formation, évaluation et suivi des apprenants
                </li>
              </ol>

              <p className="mb-2 font-semibold text-future-dusk-800">Format et tarif</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Format Présentiel uniquement</strong> : 21h en présentiel (3 jours) —{' '}
                  <strong>Tarif : 1 800 €</strong>
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Financement OPCO : Prise en charge à 100 %</strong>
              </p>
              <hr className="my-8 border-neutral-200" />

              {/* Tableau récap */}
              <p className="mb-3 font-semibold text-future-dusk-800">
                Tableau récapitulatif des 3 niveaux
              </p>
              <ComparisonTable
                headers={['Niveau 1', 'Niveau 2', 'Niveau 3']}
                rows={[
                  { label: 'Durée', values: ['7h', '14h', '21h'] },
                  { label: 'Tarif Blended', values: ['650 €', '1 100 €', 'N/A'] },
                  { label: 'Tarif Présentiel', values: ['850 €', '1 500 €', '1 800 €'] },
                  { label: 'Public', values: ['Débutants', 'Intermédiaires', 'Experts'] },
                  { label: 'Prérequis', values: ['Aucun', 'Niveau 1 ou 6 mois XP', 'Niveau 2 ou 2 ans XP'] },
                  { label: 'IA Photo Produit', values: ['Non', 'Oui (intro)', 'Oui (avancé)'] },
                  { label: 'Certification', values: ['Attestation', 'Attestation', 'Formateur interne'] },
                ]}
              />
              <hr className="my-8 border-neutral-200" />

            {/* Section : Packshot vs IA */}

              <h2
                id="formations-packshot-vs-formations-ia-photo-produit"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Formations Packshot vs Formations IA Photo Produit
              </h2>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Nos formations couvrent <strong>deux domaines complémentaires</strong> : le{' '}
                <strong>packshot studio</strong> (capture photo réelle) et{' '}
                <strong>l&apos;IA photo produit</strong> (transformation et création assistée par IA).
                Comprendre la différence est essentiel pour choisir votre parcours.
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Formations Packshot : La Base de Tout (Capture)
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Le <strong>packshot studio</strong> consiste à photographier vos produits dans des conditions
                contrôlées pour obtenir des visuels haute qualité fond blanc. C&apos;est la{' '}
                <strong>base indispensable</strong> de toute production photo e-commerce.
              </p>
              <p className="mb-2 font-semibold text-future-dusk-800">Focus des formations packshot :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Maîtrise des <strong>studios automatisés Orbitvu</strong> (AlphaShot G2, Station M, Station
                  XXL)
                </li>
                <li className="text-future-dusk-600">
                  Techniques d&apos;<strong>éclairage professionnel</strong> (lumière diffuse, gestion des
                  reflets)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Composition et cadrage</strong> produit
                </li>
                <li className="text-future-dusk-600">
                  <strong>Packshot 360°</strong> et vidéo produit tournante
                </li>
                <li className="text-future-dusk-600">
                  <strong>Focus stacking</strong> pour produits nécessitant une profondeur de champ extrême
                </li>
                <li className="text-future-dusk-600">
                  <strong>Post-production traditionnelle</strong> (détourage, ajustements)
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Matériel utilisé</strong> : Studios Orbitvu, éclairages LED, trépieds, optiques macro
              </p>
              <Link
                href="/studios-photo-automatises"
                className="text-very-peri-600 hover:text-very-peri-700 underline"
              >
                Explorer les studios Orbitvu professionnels
              </Link>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Formations IA Photo Produit : La Transformation (Création)
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                L&apos;<strong>IA photo produit</strong> ne remplace PAS le packshot : elle le{' '}
                <strong>prolonge et le multiplie</strong>. À partir d&apos;un packshot fond blanc de qualité,
                l&apos;IA génère des déclinaisons lifestyle, des backgrounds contextuels et automatise la
                retouche.
              </p>
              <p className="mb-2 font-semibold text-future-dusk-800">Focus des formations IA :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Utilisation de <strong>BlendAI</strong> (solution IA spécialisée packshot)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Lifestyle Generator</strong> : Transformer un packshot en mise en scène lifestyle
                  réaliste
                </li>
                <li className="text-future-dusk-600">
                  <strong>Background Generator</strong> : Remplacer le fond blanc par des arrière-plans
                  contextuels
                </li>
                <li className="text-future-dusk-600">
                  <strong>Retouche automatisée</strong> : Suppression défauts, harmonisation couleurs, batch
                  processing
                </li>
                <li className="text-future-dusk-600">
                  <strong>Workflow complet</strong> : Studio Orbitvu → IA → E-commerce
                </li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Prérequis</strong> : Maîtrise du packshot Niveau 1 minimum (vous devez d&apos;abord
                savoir créer un bon packshot source)
              </p>
              <Link
                href="/ia-photo-produit"
                className="text-very-peri-600 hover:text-very-peri-700 underline"
              >
                Découvrir BlendAI et l&apos;IA photo produit
              </Link>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Parcours Recommandé : Du Débutant à l&apos;Expert
              </h3>
              <div className="my-6 p-6 rounded-2xl bg-neutral-50 border border-neutral-100 font-mono text-sm text-future-dusk-600 space-y-1">
                <p>Débutant complet</p>
                <p className="pl-6">↓</p>
                <p>[Niveau 1 - Packshot Fondamentaux] (7h)</p>
                <p className="pl-6">↓</p>
                <p>Maîtrise packshot studio de base</p>
                <p className="pl-6">↓</p>
                <p>[Niveau 2 - Packshot Avancé + IA] (14h)</p>
                <p className="pl-6">↓</p>
                <p>Maîtrise packshot avancé + IA photo produit</p>
                <p className="pl-6">↓</p>
                <p>[Niveau 3 - Expert IA + Gestion Studio] (21h)</p>
                <p className="pl-6">↓</p>
                <p>Expert complet : Packshot + IA + Management</p>
              </div>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                <strong>Conseil</strong> : Ne sautez JAMAIS le Niveau 1, même si vous avez déjà une
                expérience photo. Le packshot produit a des spécificités uniques (éclairage diffus, gestion
                des matières, colorimétrie stricte) qui diffèrent de la photo publicitaire traditionnelle.
              </p>

              <Callout type="info" title="Pourquoi commencer par le packshot ?">
                L&apos;IA photo produit ne peut pas corriger un mauvais packshot source. Si votre photo de
                base est floue, mal éclairée ou mal cadrée, les résultats IA seront médiocres.{' '}
                <strong>La qualité du packshot détermine 80 % de la qualité finale.</strong>
              </Callout>

              <Link
                href="/blog/ia-photo-produit-guide-2026"
                className="text-very-peri-600 hover:text-very-peri-700 underline"
              >
                Lire notre guide complet IA photo produit 2026
              </Link>
              <hr className="my-8 border-neutral-200" />

            {/* Section : Financement OPCO */}

              <h2
                id="financement-opco-100-pris-en-charge"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Financement OPCO : 100 % Pris en Charge
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>La bonne nouvelle</strong> : Toutes nos formations sont certifiées{' '}
                <strong>Qualiopi</strong>, ce qui les rend <strong>éligibles au financement OPCO</strong>.
                Concrètement, cela signifie que <strong>votre formation peut être entièrement gratuite</strong>,
                remboursée par votre Opérateur de Compétences.
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Qu&apos;est-ce que l&apos;OPCO ?
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>OPCO</strong> = <strong>Opérateur de Compétences</strong>. Un OPCO est un organisme
                agréé par l&apos;État qui collecte les contributions formation des entreprises (via les charges
                sociales) et finance les formations professionnelles des salariés et dirigeants.
              </p>
              <p className="mb-2 font-semibold text-future-dusk-800">
                Les 11 OPCO en France (selon votre secteur) :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>OPCO Commerce</strong> : E-commerce, retail, distribution
                </li>
                <li className="text-future-dusk-600">
                  <strong>OPCO Entreprises de Proximité</strong> : Artisans, TPE, services
                </li>
                <li className="text-future-dusk-600">
                  <strong>OPCO 2i</strong> : Industrie, chimie, métallurgie
                </li>
                <li className="text-future-dusk-600">
                  <strong>AFDAS</strong> : Culture, médias, communication
                </li>
                <li className="text-future-dusk-600">
                  <strong>ATLAS</strong> : Assurances, banques, conseil
                </li>
                <li className="text-future-dusk-600">Et 6 autres OPCO sectoriels</li>
              </ul>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                <strong>Montant disponible</strong> : Chaque entreprise dispose d&apos;une enveloppe annuelle
                de <strong>500 à 3 000 € par salarié</strong> selon sa taille (TPE, PME, ETI).
              </p>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Pourquoi la Certification Qualiopi est Cruciale
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Qualiopi</strong> est le label national de qualité des organismes de formation. Il est{' '}
                <strong>obligatoire</strong> depuis 2022 pour qu&apos;une formation soit financée par un OPCO.
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>PackshotCreator est certifié Qualiopi</strong> ✅ (certification obtenue en 2024,
                valide jusqu&apos;en 2027). Ce que cela garantit :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Processus pédagogique validé</strong> par un auditeur externe indépendant
                </li>
                <li className="text-future-dusk-600">
                  <strong>Formateurs certifiés</strong> et qualifiés (Sébastien Jourdan : 20 ans
                  d&apos;expertise packshot luxe)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Programmes conformes</strong> aux standards RNCP
                </li>
                <li className="text-future-dusk-600">
                  <strong>Suivi qualité</strong> et évaluation des apprenants
                </li>
              </ul>

              <Callout type="success" title="Garantie financement">
                Nous accompagnons systématiquement nos clients dans leurs démarches OPCO.{' '}
                <strong>Taux de validation : 98 %</strong> (sur 150+ dossiers déposés depuis 2024).
              </Callout>
              <hr className="my-8 border-neutral-200" />

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Les 3 Étapes pour Obtenir le Financement OPCO
              </h3>

              <p className="mb-2 font-semibold text-future-dusk-800">
                Étape 1 : Demander un devis formation (5 minutes)
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Contactez-nous pour recevoir un <strong>devis détaillé</strong> comprenant programme
                pédagogique complet, objectifs, durée, format et tarif. Réponse sous 24h ouvrées.
              </p>
              <div className="my-6">
                <Link
                  href="/contact"
                  className="inline-block bg-accent-green hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-opacity shadow-lg"
                >
                  Demander un devis OPCO gratuit
                </Link>
              </div>
              <hr className="my-8 border-neutral-200" />

              <p className="mb-2 font-semibold text-future-dusk-800">
                Étape 2 : Constitution et dépôt du dossier OPCO (1 semaine)
              </p>
              <p className="mb-2 text-future-dusk-600">
                Documents fournis par PackshotCreator :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Devis détaillé</li>
                <li className="text-future-dusk-600">Convention de formation</li>
                <li className="text-future-dusk-600">Programme pédagogique complet</li>
                <li className="text-future-dusk-600">Certificat Qualiopi</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Délai de validation OPCO : 2 à 3 semaines en moyenne.{' '}
                <strong>Important</strong> : Le dossier doit être déposé <strong>AVANT le début de la
                formation</strong>. Anticipez 1 mois minimum.
              </p>
              <hr className="my-8 border-neutral-200" />

              <p className="mb-2 font-semibold text-future-dusk-800">
                Étape 3 : Formation et remboursement (immédiat ou différé)
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Cas 1 : Prise en charge directe</strong> : L&apos;OPCO règle directement
                  PackshotCreator → Vous ne payez rien
                </li>
                <li className="text-future-dusk-600">
                  <strong>Cas 2 : Remboursement</strong> : Vous réglez la formation, puis l&apos;OPCO vous
                  rembourse sous 30 jours
                </li>
              </ul>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                <strong>Taux de remboursement</strong> : 100 % pour les formations Qualiopi (dans la limite
                de votre enveloppe annuelle OPCO)
              </p>

              <div className="flex flex-col sm:flex-row gap-4 my-8">
                <Link
                  href="/contact"
                  className="inline-block bg-accent-green hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-opacity text-center shadow-lg"
                >
                  Obtenir un devis OPCO
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-very-peri-600 hover:bg-very-peri-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center shadow-lg"
                >
                  Vérifier mon éligibilité
                </Link>
              </div>
              <hr className="my-8 border-neutral-200" />

            {/* Section : Format Blended */}

              <h2
                id="format-blended-flexibilite-maximale"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Format Blended : Flexibilité Maximale
              </h2>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Le format <strong>Blended Learning</strong> (ou formation hybride) combine le meilleur de
                l&apos;e-learning asynchrone et du présentiel pour un apprentissage flexible et efficace.{' '}
                <strong>Blended</strong> = <strong>70 % e-learning</strong> (à votre rythme) +{' '}
                <strong>30 % présentiel</strong> (pratique studio).
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Avantages du Format Blended
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Prix réduit</strong> : −200 € en moyenne vs présentiel pur (Niveau 1 : 650 € vs
                  850 € ; Niveau 2 : 1 100 € vs 1 500 €)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Flexibilité totale</strong> : Suivez la théorie quand vous voulez, où vous voulez,
                  compatible avec emploi du temps chargé
                </li>
                <li className="text-future-dusk-600">
                  <strong>Pratique préservée</strong> : La manipulation physique du matériel est maintenue
                  (2h Niveau 1, 4h Niveau 2), feedback direct du formateur
                </li>
                <li className="text-future-dusk-600">
                  <strong>Même certification</strong> : Attestation identique au format 100 % présentiel
                </li>
              </ul>

              <p className="mb-3 font-semibold text-future-dusk-800">
                Comparatif Blended vs Présentiel Pur
              </p>
              <ComparisonTable
                headers={['Format Blended', 'Format Présentiel']}
                rows={[
                  { label: 'Prix Niveau 1', values: ['650 €', '850 €'] },
                  { label: 'Prix Niveau 2', values: ['1 100 €', '1 500 €'] },
                  { label: 'Durée présentiel', values: ['2–4h', '7–14h'] },
                  { label: 'Flexibilité', values: ['✅ Haute', '❌ Faible'] },
                  { label: 'Pratique studio', values: ['✅ Oui (30 %)', '✅ Oui (100 %)'] },
                  { label: 'Certification', values: ['✅ Oui', '✅ Oui'] },
                  { label: 'Financement OPCO', values: ['✅ 100 %', '✅ 100 %'] },
                  { label: 'Compatible salariés', values: ['✅ Oui', '⚠️ Nécessite 1–3 jours'] },
                ]}
              />

              <Callout type="info" title="Notre conseil">
                Pour les <strong>Niveaux 1 et 2</strong>, le format <strong>Blended est idéal</strong> :
                vous économisez 200 € tout en conservant la pratique essentielle. Pour le{' '}
                <strong>Niveau 3</strong>, le format présentiel sur 3 jours permet une immersion totale
                nécessaire à ce niveau d&apos;expertise.
              </Callout>
              <hr className="my-8 border-neutral-200" />

            {/* Section : Le Formateur */}

              <h2
                id="le-formateur-sebastien-jourdan"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Le Formateur : Sébastien Jourdan, Expert Photo Produit Luxe
              </h2>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                20 Ans d&apos;Expertise au Service de Votre Formation
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>Sébastien Jourdan</strong> est photographe packshot et formateur certifié depuis
                2005. Spécialisé dans la <strong>photographie produit luxe</strong> (bijouterie, haute
                horlogerie, maroquinerie), il a formé plus de 300 professionnels depuis 2018.
              </p>
              <p className="mb-2 font-semibold text-future-dusk-800">Parcours :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  2005–2018 : Photographe packshot studio (clients : CHANEL, Van Cleef &amp; Arpels, BOSCH,
                  SANDRO)
                </li>
                <li className="text-future-dusk-600">
                  2018 : Obtention de la certification formateur professionnel
                </li>
                <li className="text-future-dusk-600">
                  2020 : Spécialisation IA photo produit (BlendAI, Photoroom)
                </li>
                <li className="text-future-dusk-600">
                  2024 : Certification Qualiopi PackshotCreator
                </li>
              </ul>
              <p className="mb-2 font-semibold text-future-dusk-800">Expertise technique :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  Maîtrise complète des studios automatisés <strong>Orbitvu</strong> (formateur agréé
                  Orbitvu depuis 2019)
                </li>
                <li className="text-future-dusk-600">
                  Spécialiste packshot <strong>bijoux et montres haute horlogerie</strong> (gestion des
                  reflets, transparence, pierres précieuses)
                </li>
                <li className="text-future-dusk-600">
                  Expert <strong>IA photo produit</strong> (BlendAI, prompt engineering, workflows
                  automatisés)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Colorimétrie avancée</strong> (calibration, profils ICC, gestion couleur
                  end-to-end)
                </li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Approche Pédagogique : Pratique &gt; Théorie
              </h3>
              <blockquote className="my-6 pl-6 border-l-4 border-very-peri-300 text-future-dusk-600 italic">
                &quot;La photo produit s&apos;apprend par la pratique, pas en regardant des slides
                PowerPoint. 80 % du temps de mes formations est consacré à la manipulation en studio,
                20 % seulement à la théorie.&quot;
                <br />
                <span className="not-italic font-medium">— Sébastien Jourdan</span>
              </blockquote>
              <p className="mb-2 font-semibold text-future-dusk-800">Méthodologie :</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Apprentissage par l&apos;erreur</strong> : Vous photographiez, vous analysez le
                  résultat, vous corrigez
                </li>
                <li className="text-future-dusk-600">
                  <strong>Cas réels clients</strong> : Travail sur vos propres produits (apportez 3–5
                  produits à photographier)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Feedback personnalisé</strong> : Analyse individuelle de vos résultats avec
                  recommandations
                </li>
                <li className="text-future-dusk-600">
                  <strong>Groupes réduits</strong> : 4 à 8 participants maximum pour un suivi optimal
                </li>
              </ul>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Témoignages Apprenants
              </h3>
              <div className="space-y-4 my-6">
                <blockquote className="pl-6 border-l-4 border-very-peri-300 text-future-dusk-600 italic">
                  &quot;Formation exceptionnelle. ROI atteint en 2 mois grâce à l&apos;internalisation de
                  notre production packshot. Sébastien maîtrise parfaitement son sujet et transmet avec
                  clarté.&quot;
                  <br />
                  <span className="not-italic font-medium">
                    — Marie L., Responsable e-commerce, SANDRO (Niveau 2, 2025)
                  </span>
                </blockquote>
                <blockquote className="pl-6 border-l-4 border-very-peri-300 text-future-dusk-600 italic">
                  &quot;Excellent formateur, pédagogue et patient. J&apos;étais débutant complet, je repars
                  avec toutes les compétences pour shooter nos 200 produits en autonomie.&quot;
                  <br />
                  <span className="not-italic font-medium">
                    — Thomas D., Fondateur e-commerce bijoux (Niveau 1, 2025)
                  </span>
                </blockquote>
                <blockquote className="pl-6 border-l-4 border-very-peri-300 text-future-dusk-600 italic">
                  &quot;Le module IA (BlendAI) a transformé notre workflow. Nous générons maintenant 5
                  déclinaisons lifestyle par produit en 2 minutes. Formation indispensable en 2026.&quot;
                  <br />
                  <span className="not-italic font-medium">
                    — Camille R., Chef de produit cosmétiques (Niveau 2, 2025)
                  </span>
                </blockquote>
              </div>
              <hr className="my-8 border-neutral-200" />

            {/* Section : Calendrier */}

              <h2
                id="calendrier-inscription"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Calendrier &amp; Inscription
              </h2>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Prochaines Sessions 2026
              </h3>

              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <p className="font-heading font-bold text-future-dusk-900 mb-3">
                    Formation Niveau 1 — Débutant (7h)
                  </p>
                  <ul className="space-y-2 text-sm text-future-dusk-600">
                    <li>15–16 février 2026 — Paris 11e</li>
                    <li>12–13 mars 2026 — Lyon 2e</li>
                    <li>9–10 avril 2026 — Paris 11e</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <p className="font-heading font-bold text-future-dusk-900 mb-3">
                    Formation Niveau 2 — Intermédiaire (14h)
                  </p>
                  <ul className="space-y-2 text-sm text-future-dusk-600">
                    <li>5–7 mars 2026 — Lyon 2e</li>
                    <li>2–4 avril 2026 — Paris 11e</li>
                    <li>7–9 mai 2026 — Paris 11e</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-100">
                  <p className="font-heading font-bold text-future-dusk-900 mb-3">
                    Formation Niveau 3 — Expert (21h)
                  </p>
                  <ul className="space-y-2 text-sm text-future-dusk-600">
                    <li>20–23 avril 2026 — Paris 11e</li>
                    <li>15–18 juin 2026 — Paris 11e</li>
                  </ul>
                </div>
              </div>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Modalités Pratiques
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Lieux</strong> : Studio PackshotCreator — 75011 Paris (métro Voltaire) | Studio
                  partenaire — 69002 Lyon (métro Cordeliers)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Taille des groupes</strong> : 4 minimum / 8 maximum (garantie qualité pédagogique)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Matériel fourni</strong> : Studios Orbitvu AlphaShot G2 et Station M, éclairages
                  LED, postes informatiques avec logiciels (Lightroom, Photoshop, BlendAI), supports
                  pédagogiques (manuels PDF, fiches pratiques)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Certification</strong> : Attestation de formation ou Certificat (Niveau 3), accès
                  formateur par email pendant 3 mois post-formation
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 my-8">
                <Link
                  href="/contact"
                  className="inline-block bg-very-peri-600 hover:bg-very-peri-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg text-center"
                >
                  Réserver ma place
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-accent-green hover:opacity-90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-opacity shadow-lg text-center"
                >
                  Demander un devis OPCO
                </Link>
              </div>
              <hr className="my-8 border-neutral-200" />

            {/* FAQ */}

              <section className="mt-16 pt-12 border-t border-neutral-200">
                <h2 id="faq-formation-photo-produit" className="font-heading text-2xl font-bold text-future-dusk-900 mb-8 scroll-mt-24">
                  Questions Fréquentes
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

            {/* Conclusion */}

              <h2
                id="conclusion"
                className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24"
              >
                Conclusion : Investissez dans Vos Compétences Photo Produit
              </h2>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                La <strong>formation photo produit</strong> n&apos;est pas une dépense, c&apos;est un{' '}
                <strong>investissement stratégique</strong> avec un ROI mesurable en 3 à 6 mois. En 2026,
                maîtriser le packshot studio ET l&apos;IA photo produit est devenu indispensable pour toute
                entreprise e-commerce sérieuse.
              </p>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Les 5 Raisons de Se Former Maintenant
              </h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>ROI rapide</strong> : Économie de 75–95 % sur la production photo vs externalisation
                </li>
                <li className="text-future-dusk-600">
                  <strong>Autonomie totale</strong> : Ne dépendez plus des prestataires externes, maîtrisez
                  votre identité visuelle
                </li>
                <li className="text-future-dusk-600">
                  <strong>Compétences 2026</strong> : Packshot + IA = workflow e-commerce moderne et
                  compétitif
                </li>
                <li className="text-future-dusk-600">
                  <strong>Financement OPCO 100 %</strong> : Votre formation peut être entièrement gratuite
                  (certification Qualiopi)
                </li>
                <li className="text-future-dusk-600">
                  <strong>Format flexible</strong> : Blended learning compatible avec votre emploi du temps
                </li>
              </ol>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Vos Prochaines Étapes
              </h3>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600">
                  Identifier votre niveau (Débutant, Intermédiaire, Expert)
                </li>
                <li className="text-future-dusk-600">
                  Demander un devis formation OPCO (formulaire ci-dessous)
                </li>
                <li className="text-future-dusk-600">
                  Déposer votre dossier OPCO (nous vous accompagnons)
                </li>
                <li className="text-future-dusk-600">
                  Suivre votre formation et devenir autonome
                </li>
              </ol>

              <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                Ressources Complémentaires
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Studios photo automatisés</strong> :{' '}
                  <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir la gamme Orbitvu
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>IA photo produit</strong> :{' '}
                  <Link href="/blog/ia-photo-produit-guide-2026" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Guide complet BlendAI 2026
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Solutions IA</strong> :{' '}
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Hub IA PackshotCreator
                  </Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Guide financement OPCO</strong> :{' '}
                  <Link
                    href="/blog/financement-formation-opco-guide-complet-pour-studios-photo-2026"
                    className="text-very-peri-600 hover:text-very-peri-700 underline"
                  >
                    Guide complet financement OPCO
                  </Link>
                </li>
              </ul>

              <div className="text-center my-12">
                <Link
                  href="/contact"
                  className="inline-block bg-accent-green hover:opacity-90 text-white font-bold px-10 py-5 rounded-lg text-xl transition-opacity shadow-xl"
                >
                  Obtenir un Devis OPCO Gratuit
                </Link>
              </div>

              <p className="mt-8 text-sm text-future-dusk-400">
                <strong>Auteur</strong> : Sébastien Jourdan, Photographe Packshot &amp; Formateur Certifié
                Qualiopi — <strong>Dernière mise à jour</strong> : 10 janvier 2026
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
