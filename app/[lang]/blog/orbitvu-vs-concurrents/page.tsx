import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { BookOpen, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { Callout, TableOfContents, ArticleCTA, RelatedArticles } from '@/components/blog';
import type { HeadingData } from '@/lib/blog-utils';
import { buildLanguages } from '@/lib/hreflang';

/* ─────────────────────────── Metadata ─────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = 'Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026';
  const description = "Orbitvu, StyleShoots, Photomatics : les points à examiner pour choisir un studio photo automatisé en 2026. Guide rédigé par PackshotCreator, distributeur officiel d'Orbitvu.";

  return {
    title,
    description,
    keywords: 'orbitvu vs concurrents, comparatif studio photo, orbitvu vs styleshoots',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/orbitvu-vs-concurrents`,
      languages: buildLanguages('/fr/blog/orbitvu-vs-concurrents'),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/orbitvu-vs-concurrents`,
      siteName: 'PackshotCreator',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      publishedTime: '2026-01-22',
      authors: ['Sébastien Jourdan'],
      images: [{
        url: `https://www.packshot-creator.com/api/og?title=${encodeURIComponent(title)}&type=blog&lang=${lang}`,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/* ─────────────────────────── TOC Headings ─────────────────────────── */

const headings: HeadingData[] = [
  { id: 'introduction-le-marche-des-studios-photo-en-2026', text: 'Introduction : Les Offres Présentées', level: 2 },
  { id: 'orbitvu-vs-styleshoots-le-duel-du-premium', text: 'Orbitvu et StyleShoots', level: 2 },
  { id: 'forces-orbitvu', text: 'Forces Orbitvu', level: 3 },
  { id: 'forces-styleshoots', text: 'Forces StyleShoots', level: 3 },
  { id: 'verdict-orbitvu-vs-styleshoots', text: 'Bien choisir entre Orbitvu et StyleShoots', level: 3 },
  { id: 'orbitvu-vs-packshotcreator-contexte-historique', text: 'Orbitvu vs PackshotCreator : Contexte Historique', level: 2 },
  { id: 'orbitvu-vs-photomatics-positionnements-differents', text: 'Orbitvu et Photomatics', level: 2 },
  { id: 'tableau-comparatif-general-les-3-acteurs', text: 'Synthèse', level: 2 },
  { id: 'pourquoi-choisir-orbitvu-les-5-avantages-cles', text: 'Pourquoi Choisir Orbitvu ? Les 4 Avantages Clés', level: 2 },
  { id: 'faq-comparatif', text: 'Questions fréquentes', level: 2 },
  { id: 'conclusion-orbitvu-le-choix-rationnel-2026', text: 'Conclusion : Choisir son Studio en 2026', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'Orbitvu est-il un fabricant fiable ?',
    answer: "Orbitvu est un fabricant européen de studios photo automatisés, distribué officiellement en France et en Suisse par PackshotCreator.",
  },
  {
    question: 'Le SAV Orbitvu est-il efficace en France ?',
    answer: "PackshotCreator, distributeur officiel, assure le support d'Orbitvu en France.",
  },
  {
    question: 'Orbitvu est-il compatible avec les logiciels tiers et les PIM ?',
    answer: "Les possibilités d'export et d'intégration dépendent du modèle et de vos outils : contactez-nous pour les vérifier avant l'achat.",
  },
  {
    question: 'Peut-on tester Orbitvu avant de l\'acheter ?',
    answer: "Oui, PackshotCreator propose des démonstrations au showroom près de Lyon ; d'autres modalités sont à convenir avec nous. Faites votre demande via le formulaire de contact.",
  },
  {
    question: 'Quelle est la différence principale entre Orbitvu et Photomatics ?',
    answer: "Orbitvu, distribué en France et en Suisse par PackshotCreator, s'adresse aux e-commerçants professionnels, avec un prix sur devis selon la configuration. Nous ne détaillons pas ici l'offre Photomatics, faute de source vérifiée."
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function OrbitvuVsConcurrentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: 'Orbitvu vs Concurrents : Comparatif 2026', url: `https://www.packshot-creator.com/${lang}/blog/orbitvu-vs-concurrents` },
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
          label: 'Hardware & Studios',
          colorClass: 'bg-very-peri-500/15 text-very-peri-300',
        }}
        title="Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026"
        subtitle="Orbitvu, StyleShoots, Photomatics : les points à examiner pour choisir le studio adapté à votre activité."
      >
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-future-dusk-300">
          <span className="px-3 py-1 rounded-full bg-very-peri-500/20 text-very-peri-300 font-medium text-xs uppercase tracking-wide">
            Hardware &amp; Studios
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            12 min de lecture
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            22 janvier 2026
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            Sébastien Jourdan
          </span>
        </div>
      </HeroSection>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-10">
        <img
          src="/images/blog/thumbnail-article-nouveau-3.avif"
          alt="Studio photo automatisé Orbitvu vs concurrents"
          className="w-full rounded-2xl shadow-lg"
          width={1344}
          height={768}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. ARTICLE BODY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Article meta bar */}

            <div className="flex flex-wrap items-center gap-4 text-sm text-future-dusk-400 mb-10 pb-8 border-b border-neutral-100">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-very-peri-600 hover:text-very-peri-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                {isFr ? 'Retour au blog' : 'Back to blog'}
              </Link>
            </div>

          {/* TOC */}

            <div className="mb-12 p-6 rounded-2xl border border-neutral-100 bg-neutral-50">
              <TableOfContents headings={headings} title="Sommaire" collapsible />
            </div>

          {/* ── INTRO ── */}

            <p className="mb-4 leading-relaxed text-future-dusk-600 text-lg">
              Orbitvu, StyleShoots, Photomatics : choisir un studio photo automatisé suppose de comparer des positionnements, des tarifs et des philosophies produit différents.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600 text-lg">
              PackshotCreator est le distributeur officiel d'Orbitvu pour la France et la Suisse. Ce guide présente ce que nous pouvons établir sur Orbitvu et les points à vérifier pour chaque solution : nous ne publions ni caractéristique, ni prix, ni appréciation sur StyleShoots ou Photomatics sans source vérifiée.
            </p>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 1 : MARCHÉ ── */}

            <h2 id="introduction-le-marche-des-studios-photo-en-2026" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              Introduction : Les Offres Présentées
            </h2>

            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Orbitvu</strong> (fabricant européen)</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li className="text-future-dusk-600">Gamme : AlphaShot Micro, G2, 360, XXL (sur devis selon configuration)</li>
              <li className="text-future-dusk-600">Distributeur officiel France et Suisse depuis 2023 : <strong>PackshotCreator</strong></li>
            </ul>

            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>StyleShoots</strong> et <strong>Photomatics</strong> : pour leurs gammes, caractéristiques, tarifs et conditions de distribution, reportez-vous directement à ces fabricants.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Autres options</strong> : studio photo manuel ou montage sur mesure.
            </p>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 2 : ORBITVU VS STYLESHOOTS ── */}

            <h2 id="orbitvu-vs-styleshoots-le-duel-du-premium" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              1. Orbitvu et StyleShoots
            </h2>

            <h3 id="forces-orbitvu" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Forces Orbitvu
            </h3>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">1. Logiciel Orbitvu Station</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Les studios Orbitvu se pilotent avec le logiciel Orbitvu Station, pour la prise de vue et les exports.
            </p>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">2. Traitement IA des Packshots</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Les packshots produits par un studio Orbitvu peuvent ensuite être traités par des outils d'IA : détourage, arrière-plans, mises en scène. Les intégrations possibles dépendent de vos outils ; nous les vérifions avec vous.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Découvrir l'approche studio + IA</Link>
            </p>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">3. Support en France : PackshotCreator, distributeur officiel</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              PackshotCreator, distributeur officiel d'Orbitvu pour la France et la Suisse, assure le support en France.
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Formations</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Essential Training (4 h, à distance) et Master Training (7 h, en présentiel), facturées séparément</li>
              <li className="text-future-dusk-600">Sysnext est certifiée Qualiopi ; financement OPCO possible selon votre situation</li>
            </ul>

            <h3 id="forces-styleshoots" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Forces StyleShoots
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Nous ne détaillons pas ici les caractéristiques de StyleShoots (design, modes automatiques, communauté) : faute de source vérifiée, renseignez-vous directement auprès du fabricant.
            </p>

            <h3 id="verdict-orbitvu-vs-styleshoots" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Bien choisir entre Orbitvu et StyleShoots
            </h3>
            <Callout type="info" title="Critères de choix">
              <p>Le choix dépend de vos produits, de vos volumes, de la place du studio dans vos locaux et des outils à connecter (PIM, DAM, IA).</p>
              <p className="mt-2">Le plus sûr reste de tester vos propres produits : PackshotCreator propose des démonstrations Orbitvu au showroom près de Lyon.</p>
            </Callout>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 3 : PACKSHOTCREATOR ── */}

            <h2 id="orbitvu-vs-packshotcreator-contexte-historique" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              2. Orbitvu vs PackshotCreator : Contexte Historique
            </h2>

            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>PackshotCreator</strong> est une marque lancée en 2004 par la société française Sysnext. Depuis 2023, PackshotCreator est le distributeur officiel d'Orbitvu pour la France et la Suisse.
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Passer d'un Ancien Studio à Orbitvu
            </h3>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Faire le point sur la machine actuelle</strong> : âge, état, utilisation, workflows</li>
              <li className="text-future-dusk-600"><strong>Étudier une éventuelle reprise</strong> de l'ancien matériel : au cas par cas, sur devis</li>
              <li className="text-future-dusk-600"><strong>Prévoir la formation</strong> : Essential Training (4 h, à distance) ou Master Training (7 h, en présentiel), facturée séparément</li>
            </ol>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 4 : PHOTOMATICS ── */}

            <h2 id="orbitvu-vs-photomatics-positionnements-differents" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              3. Orbitvu et Photomatics
            </h2>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Nous ne reproduisons pas ici les caractéristiques, les tarifs ni le positionnement de Photomatics : faute de source vérifiée, renseignez-vous directement auprès du fabricant.
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Cas d'Usage Orbitvu
            </h3>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pour qui Orbitvu est adapté ?</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">E-commerçants professionnels</li>
              <li className="text-future-dusk-600">Marques attentives à la qualité visuelle</li>
              <li className="text-future-dusk-600">Production régulière</li>
              <li className="text-future-dusk-600">Workflows outillés (IA, PIM/DAM), intégrations à vérifier selon vos outils</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pour qui Orbitvu est SURDIMENSIONNÉ ?</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Créateurs avec de très faibles volumes</li>
              <li className="text-future-dusk-600">Utilisation occasionnelle</li>
            </ul>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 5 : SYNTHÈSE ── */}

            <h2 id="tableau-comparatif-general-les-3-acteurs" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              4. Synthèse
            </h2>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Nous ne publions pas de tableau comparatif des trois offres : les données de StyleShoots et de Photomatics ne sont pas vérifiées. Pour Orbitvu, les caractéristiques et le prix sont précisés sur devis, selon la configuration.
            </p>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 6 : AVANTAGES ORBITVU ── */}

            <h2 id="pourquoi-choisir-orbitvu-les-5-avantages-cles" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              5. Pourquoi Choisir Orbitvu ? Les 4 Avantages Clés
            </h2>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              1. Traitement IA des Packshots
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Les packshots peuvent ensuite être traités par des outils d'IA : détourage, arrière-plans, mises en scène.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Découvrir l'approche 3 piliers : Hardware + IA + Formation</Link>
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              2. Support Français : PackshotCreator
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Distributeur officiel France/Suisse depuis 2023.</strong>
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              3. Évolutivité : Modules Additionnels
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Orbitvu AlphaShot évolutif</strong> :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Module 360° (sur devis) : Transformation G2 → G2 360°</li>
              <li className="text-future-dusk-600">Module vidéo (sur devis) : Ajout capture vidéo</li>
              <li className="text-future-dusk-600">Éclairage additionnel (sur devis)</li>
              <li className="text-future-dusk-600">Motorisation charge lourde (sur devis)</li>
            </ul>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Les modules permettent de faire évoluer la machine selon vos besoins.
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              4. Écosystème : Approche 3 Piliers
            </h3>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pilier 1 : Hardware (Orbitvu)</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Gamme de studios automatisés</li>
              <li className="text-future-dusk-600">Distribution officielle France/Suisse</li>
              <li className="text-future-dusk-600">Support technique en France</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pilier 2 : IA (BlendAI)</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Traitement des packshots par IA</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pilier 3 : Formation (Academy)</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Essential Training (4 h, à distance) et Master Training (7 h, en présentiel), facturées séparément</li>
              <li className="text-future-dusk-600">Sysnext est certifiée Qualiopi ; financement OPCO possible selon votre situation</li>
            </ul>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 7 : FAQ ── */}

          <section className="mt-16 pt-12 border-t border-neutral-200">
            <h2 id="faq-comparatif" className="font-heading text-2xl font-bold text-future-dusk-900 mb-8 scroll-mt-24">
              Questions fréquentes
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

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 8 : CONCLUSION ── */}

            <h2 id="conclusion-orbitvu-le-choix-rationnel-2026" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              Conclusion : Choisir son Studio en 2026
            </h2>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Distributeur officiel d'Orbitvu, PackshotCreator recommande ses studios aux <strong>e-commerçants professionnels</strong> : modules additionnels selon les modèles et support en France. Pour StyleShoots ou Photomatics, comparez directement les offres de ces fabricants.
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Les Raisons de Choisir Orbitvu
            </h3>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Support France</strong> : PackshotCreator distributeur officiel</li>
              <li className="text-future-dusk-600"><strong>Évolutivité</strong> : Modules additionnels (360°, vidéo) selon besoins futurs</li>
              <li className="text-future-dusk-600"><strong>Écosystème</strong> : Approche 3 piliers Hardware + IA + Formation</li>
            </ol>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Tableau Décisionnel Rapide
            </h3>
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-future-dusk-900 text-white">
                    <th className="px-4 py-3 text-left font-heading font-bold">Profil</th>
                    <th className="px-4 py-3 text-center font-heading font-bold">Machine Recommandée</th>
                    <th className="px-4 py-3 text-center font-heading font-bold">Pourquoi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">E-commerce pro, catalogue varié</td>
                    <td className="px-4 py-3 text-center font-bold text-very-peri-700">Orbitvu AlphaShot G2</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Polyvalence</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-white">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">Bijoutier/Horloger</td>
                    <td className="px-4 py-3 text-center font-bold text-very-peri-700">Orbitvu AlphaShot Micro</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Format adapté aux petits objets</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">E-commerce 360°</td>
                    <td className="px-4 py-3 text-center font-bold text-very-peri-700">Orbitvu AlphaShot 360</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Vues 360°</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Ressources Complémentaires
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Gamme Orbitvu Complète</strong> : <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">Studios Photo Automatisés</Link></li>
              <li className="text-future-dusk-600"><strong>Intégration IA</strong> : <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Approche studio + IA</Link></li>
              <li className="text-future-dusk-600"><strong>Calculateur ROI</strong> : <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">Estimez vos économies</Link></li>
              <li className="text-future-dusk-600"><strong>Formations</strong> : <Link href="/academy" locale="fr" className="text-very-peri-600 hover:text-very-peri-700 underline">Academy PackshotCreator</Link></li>
            </ul>

        </div>
      </article>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ArticleCTA lang={lang} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. RELATED ARTICLES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <RelatedArticles
        currentSlug="orbitvu-vs-concurrents"
        category="Hardware & Studios"
        lang={lang}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: 'Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026',
          description: "Orbitvu, StyleShoots, Photomatics : les points à examiner pour choisir un studio photo automatisé en 2026. Guide rédigé par PackshotCreator, distributeur officiel d'Orbitvu.",
          url: `https://www.packshot-creator.com/${lang}/blog/orbitvu-vs-concurrents`,
          datePublished: '2026-01-22',
          author: 'Sébastien Jourdan',
          category: 'Hardware & Studios',
        }),
        faqSchema(faqItems),
      ]} />
    </>
  );
}
