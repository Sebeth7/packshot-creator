import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { BookOpen, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { Callout, ComparisonTable, TableOfContents, ArticleCTA, RelatedArticles } from '@/components/blog';
import type { HeadingData } from '@/lib/blog-utils';
import { buildLanguages } from '@/lib/hreflang';

/* ─────────────────────────── Metadata ─────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = 'Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026';
  const description = 'Comparatif complet Orbitvu vs concurrents (PackshotCreator, StyleShoots, Photorobot). Qualité, prix, fonctionnalités, intégration IA. Guide objectif 2026.';

  return {
    title,
    description,
    keywords: 'orbitvu vs concurrents, comparatif studio photo, orbitvu vs styleshoots, orbitvu vs photorobot, meilleur studio automatisé',
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
  { id: 'introduction-le-marche-des-studios-photo-en-2026', text: 'Introduction : Le Marché des Studios Photo en 2026', level: 2 },
  { id: 'orbitvu-vs-styleshoots-le-duel-du-premium', text: 'Orbitvu vs StyleShoots : Le Duel du Premium', level: 2 },
  { id: 'forces-orbitvu', text: 'Forces Orbitvu', level: 3 },
  { id: 'forces-styleshoots', text: 'Forces StyleShoots', level: 3 },
  { id: 'verdict-orbitvu-vs-styleshoots', text: 'Verdict Orbitvu vs StyleShoots', level: 3 },
  { id: 'orbitvu-vs-packshotcreator-contexte-historique', text: 'Orbitvu vs PackshotCreator : Contexte Historique', level: 2 },
  { id: 'orbitvu-vs-photomatics-positionnements-differents', text: 'Orbitvu vs Photomatics : Positionnements Différents', level: 2 },
  { id: 'tableau-comparatif-general-les-3-acteurs', text: 'Tableau Comparatif Général : Les 3 Acteurs', level: 2 },
  { id: 'pourquoi-choisir-orbitvu-les-5-avantages-cles', text: 'Pourquoi Choisir Orbitvu ? Les 5 Avantages Clés', level: 2 },
  { id: 'faq-comparatif', text: 'Questions fréquentes', level: 2 },
  { id: 'conclusion-orbitvu-le-choix-rationnel-2026', text: 'Conclusion : Orbitvu, le Choix Rationnel 2026', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'Orbitvu est-il un fabricant fiable ?',
    answer: "Oui, Orbitvu est leader européen des studios photo automatisés depuis 2003, avec plus de 15 000 machines installées dans 45 pays et une part de marché d'environ 45% en Europe. Les clients français incluent CHANEL, SANDRO, BOSCH, Leroy Merlin et Décathlon.",
  },
  {
    question: 'Le SAV Orbitvu est-il efficace en France ?',
    answer: "Oui, PackshotCreator assure le support officiel Orbitvu en France avec un showroom Paris 11e, un stock de pièces détachées livrables en 24h et 4 techniciens dédiés. Contrairement aux concurrents dont le SAV passe par la Pologne ou les Pays-Bas, tout est géré localement.",
  },
  {
    question: 'Orbitvu est-il compatible avec les logiciels tiers et les PIM ?',
    answer: "Oui, Orbitvu propose une API REST ouverte avec intégrations natives pour BlendAI, Adobe Lightroom/Photoshop, les PIM (Akeneo, Salsify) et les plateformes e-commerce (Shopify, WooCommerce, Magento). StyleShoots propose une API plus limitée avec des intégrations custom plus complexes.",
  },
  {
    question: 'Pourquoi Orbitvu est-il moins cher que StyleShoots à qualité équivalente ?',
    answer: "Orbitvu est fabriqué en Pologne (vs Pays-Bas pour StyleShoots), ce qui génère des coûts de production inférieurs d'environ 15%. Les volumes de production doublés permettent des économies d'échelle supplémentaires. La qualité des capteurs est identique voire supérieure (50 MP Orbitvu vs 42 MP StyleShoots en 2025).",
  },
  {
    question: 'Peut-on tester Orbitvu avant de l\'acheter ?',
    answer: "Oui, PackshotCreator propose des démonstrations gratuites : soit on-site chez vous (déplacement avec machine pour tester vos produits réels, 2–4h), soit au showroom Paris (5–10 produits testés sur place). Demandez votre démo gratuite via le formulaire de contact.",
  },
  {
    question: 'Quelle est la différence principale entre Orbitvu et Photomatics ?',
    answer: "Orbitvu est positionné milieu/haut de gamme (sur devis selon configuration) pour les e-commerçants professionnels avec des volumes importants et une exigence de qualité professionnelle. Photomatics est un produit entry-level DIY (2 000–8 000€) adapté aux TPE et créateurs avec moins de 100 produits par an.",
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
        subtitle="Orbitvu, StyleShoots, Photomatics : analyse en profondeur des forces et faiblesses de chaque solution pour choisir le studio adapté à votre activité et votre budget."
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
              Le marché des studios photo automatisés s'est considérablement structuré ces dernières années. Trois acteurs principaux se distinguent en 2026 : <strong>Orbitvu</strong> (leader européen), <strong>StyleShoots</strong> (premium néerlandais), et <strong>Photomatics</strong> (entry-level américain). Choisir entre ces solutions peut s'avérer complexe tant les positionnements, tarifs et philosophies produit diffèrent.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600 text-lg">
              Dans ce comparatif objectif, nous analysons en profondeur les <strong>forces et faiblesses</strong> de chaque solution, leur <strong>rapport qualité/prix</strong>, et surtout <strong>pour quel type d'entreprise</strong> chaque studio est le plus adapté. Que vous gériez 500 ou 10 000 produits par an, quel que soit votre budget, ce guide vous aidera à faire le choix optimal pour votre activité.
            </p>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 1 : MARCHÉ ── */}

            <h2 id="introduction-le-marche-des-studios-photo-en-2026" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              Introduction : Le Marché des Studios Photo en 2026
            </h2>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Les 3 Acteurs Principaux
            </h3>

            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Orbitvu</strong> (Pologne, fondé en 2003)</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li className="text-future-dusk-600">Positionnement : Leader européen milieu/haut de gamme</li>
              <li className="text-future-dusk-600">Part de marché : ~45% Europe (estimation 2025)</li>
              <li className="text-future-dusk-600">Gamme : AlphaShot Micro, G2, 360, XXL (sur devis selon configuration)</li>
              <li className="text-future-dusk-600">Distributeur France officiel : <strong>PackshotCreator</strong></li>
            </ul>

            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>StyleShoots</strong> (Pays-Bas, fondé en 2014)</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li className="text-future-dusk-600">Positionnement : Premium haut de gamme</li>
              <li className="text-future-dusk-600">Part de marché : ~25% Europe</li>
              <li className="text-future-dusk-600">Gamme : Vertical, Eclipse, Live (25k€ – 60k€)</li>
              <li className="text-future-dusk-600">Distributeur France : Direct StyleShoots + revendeurs agréés</li>
            </ul>

            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Photomatics</strong> (USA, fondé en 2018)</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li className="text-future-dusk-600">Positionnement : Entry-level DIY</li>
              <li className="text-future-dusk-600">Part de marché : ~15% (croissance forte TPE/PME)</li>
              <li className="text-future-dusk-600">Gamme : Studio Box, Pro Kit (2k€ – 8k€)</li>
              <li className="text-future-dusk-600">Distribution : Vente en ligne directe</li>
            </ul>

            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Autres acteurs</strong> (10–15% cumulés) :</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li className="text-future-dusk-600">PackshotCreator (ancienne gamme française, arrêtée en 2018)</li>
              <li className="text-future-dusk-600">Solutions chinoises généralistes (Alibaba, Taobao)</li>
              <li className="text-future-dusk-600">Studios DIY custom (makers, bricolage)</li>
            </ul>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 2 : ORBITVU VS STYLESHOOTS ── */}

            <h2 id="orbitvu-vs-styleshoots-le-duel-du-premium" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              1. Orbitvu vs StyleShoots : Le Duel du Premium
            </h2>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Vue d'Ensemble Comparative
            </h3>
            <ComparisonTable
              headers={['Orbitvu AlphaShot G2', 'StyleShoots Vertical']}
              rows={[
                { label: 'Prix', values: ['Sur devis', '25–30k€'] },
                { label: 'Taille produits', values: ['100×80×80 cm', '100×100×120 cm'] },
                { label: 'Volume/jour', values: ['200–500', '150–300'] },
                { label: 'Temps/produit', values: ['1–2 min', '2–3 min'] },
                { label: 'IA Ready', values: ['✅ Oui (BlendAI natif)', '❌ Non'] },
                { label: 'Support France', values: ['✅ PackshotCreator officiel', '⚠️ Limité'] },
                { label: 'Formation incluse', values: ['✅ 2 jours', '✅ 1 jour'] },
                { label: 'Évolutivité', values: ['✅ Excellente (modules)', '⚠️ Moyenne'] },
              ]}
            />

            <h3 id="forces-orbitvu" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Forces Orbitvu
            </h3>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">1. Prix Compétitif : 15–20% Moins Cher</h4>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Comparaison directe modèles équivalents</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Orbitvu AlphaShot G2</strong> : Sur devis</li>
              <li className="text-future-dusk-600"><strong>StyleShoots Vertical</strong> : 25 000 – 30 000€</li>
              <li className="text-future-dusk-600"><strong>Économie</strong> : économie significative sur investissement initial — contactez-nous pour un comparatif chiffré</li>
            </ul>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Cette différence de prix s'explique par :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Fabrication Pologne</strong> (vs Pays-Bas pour StyleShoots) : Coûts production -15%</li>
              <li className="text-future-dusk-600"><strong>Distribution PackshotCreator</strong> : Pas de multiples intermédiaires</li>
              <li className="text-future-dusk-600"><strong>Volumes production</strong> : Orbitvu produit 2× plus de machines (économies d'échelle)</li>
            </ul>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">2. Software Intuitif : Courbe d'Apprentissage Courte</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Logiciel Orbitvu Station</strong> (inclus à vie) :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Interface visuelle claire (drag &amp; drop)</li>
              <li className="text-future-dusk-600">Workflows pré-configurés par secteur (mode, bijoux, alimentaire)</li>
              <li className="text-future-dusk-600">Automatisations simples (batch, exports)</li>
              <li className="text-future-dusk-600">Compatibilité Windows + macOS</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Comparatif vs StyleShoots</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Temps formation Orbitvu</strong> : 2 jours pour autonomie 90%</li>
              <li className="text-future-dusk-600"><strong>Temps formation StyleShoots</strong> : 3–4 jours (interface complexe, plus de réglages manuels)</li>
            </ul>
            <blockquote className="border-l-4 border-very-peri-300 pl-4 italic text-future-dusk-600 my-4">
              "Nos opérateurs ont été opérationnels en 3 jours avec Orbitvu. StyleShoots nous demandait 1 semaine de formation intensive."
              <footer className="mt-2 not-italic text-sm text-future-dusk-400">— Marie D., Responsable Studio Photo, E-commerce Mode (1 500 références)</footer>
            </blockquote>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">3. IA Ready : Intégration BlendAI Native</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Orbitvu = Seul fabricant avec intégration IA native en 2026.</strong>
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Workflow automatisé Orbitvu → BlendAI</strong> :</p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Capture packshot</strong> Orbitvu (1–2 min)</li>
              <li className="text-future-dusk-600"><strong>Export automatique API</strong> BlendAI (10 sec, aucune manipulation)</li>
              <li className="text-future-dusk-600"><strong>Traitement IA</strong> : Détourage, backgrounds, lifestyle (30–60 sec)</li>
              <li className="text-future-dusk-600"><strong>Import automatique</strong> PIM/DAM (10 sec)</li>
            </ol>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Total temps</strong> : <strong>3–4 minutes</strong> pour 5 déclinaisons produit (fond blanc, détourage, 2 backgrounds, lifestyle)
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>StyleShoots</strong> : Aucune intégration IA native. Export manuel vers logiciels tiers requis.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Impact productivité</strong> : Orbitvu + BlendAI = 250–500 produits traités/jour (1 opérateur) | StyleShoots seul = 150–300 produits/jour
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Découvrir l'intégration complète Orbitvu + BlendAI</Link>
            </p>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">4. Support Français Premium : PackshotCreator Distributeur Officiel</h4>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Hotline française</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Réponse &lt; 2h ouvrées (vs 24–48h StyleShoots)</li>
              <li className="text-future-dusk-600">Techniciens francophones experts Orbitvu</li>
              <li className="text-future-dusk-600">Support téléphonique, email, visio</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Interventions on-site</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">France métropolitaine : 24–48h</li>
              <li className="text-future-dusk-600">DOM-TOM : 48–72h</li>
              <li className="text-future-dusk-600">Suisse : 48h</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pièces détachées</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Stock France (livraison 24h)</li>
              <li className="text-future-dusk-600">vs StyleShoots : Stock Pays-Bas (livraison 3–5 jours)</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Formations avancées</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">3 niveaux certifiés Qualiopi</li>
              <li className="text-future-dusk-600">Financement OPCO 100%</li>
              <li className="text-future-dusk-600">Sessions mensuelles Paris/Lyon</li>
            </ul>
            <blockquote className="border-l-4 border-very-peri-300 pl-4 italic text-future-dusk-600 my-4">
              "Panne logicielle un vendredi soir, technicien PackshotCreator sur site lundi 10h. Avec StyleShoots, on aurait attendu 1 semaine. Ça fait la différence."
              <footer className="mt-2 not-italic text-sm text-future-dusk-400">— Thomas L., Directeur Technique, E-commerce Électronique (3 000 références)</footer>
            </blockquote>

            <h3 id="forces-styleshoots" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Forces StyleShoots
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Objectivité oblige, StyleShoots présente aussi des avantages réels.
            </p>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">1. Design Premium : Esthétique Showroom</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>StyleShoots Vertical</strong> : Design épuré, finitions aluminium brossé, look Apple.
              <strong> Orbitvu AlphaShot</strong> : Design fonctionnel industriel.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Impact</strong> : Si votre studio est visible clients/partenaires, StyleShoots apporte prestige. Si votre studio est back-office, l'esthétique est secondaire.
            </p>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">2. Modes Automatiques Poussés</h4>
            <p className="mb-2 leading-relaxed text-future-dusk-600">
              <strong>StyleShoots Vertical</strong> propose des modes "one-click" avancés :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Mode mannequin invisible (composite automatique)</li>
              <li className="text-future-dusk-600">Mode fantôme (vêtements sans mannequin)</li>
              <li className="text-future-dusk-600">Mode flat-lay automatisé</li>
            </ul>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Orbitvu</strong> : Ces modes existent mais nécessitent plus de réglages manuels (30 sec setup vs 5 sec StyleShoots).
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Impact</strong> : Si vous shootez 90%+ vêtements mode, StyleShoots peut faire gagner 20–30 sec/produit. Si vous shootez produits mixtes, le gain est négligeable.
            </p>

            <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-2">3. Communauté et Réseau</h4>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>StyleShoots</strong> bénéficie d'une communauté active (forums, groupes Facebook, conférences).
              <strong> Orbitvu</strong> : Communauté plus confidentielle (moins de communication externe).
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Impact réel</strong> : Marginal pour l'utilisation quotidienne, mais appréciable pour le networking secteur.
            </p>

            <h3 id="verdict-orbitvu-vs-styleshoots" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Verdict Orbitvu vs StyleShoots
            </h3>
            <Callout type="success" title="Orbitvu gagne sur la plupart des critères">
              <p><strong>Orbitvu l'emporte</strong> sur : Prix (-15–20%), IA Ready (unique), Support France (excellence), Évolutivité (modules), ROI (4–8 mois vs 8–12 mois StyleShoots).</p>
              <p className="mt-2"><strong>StyleShoots l'emporte</strong> sur : Design premium, Modes automatiques mode (marginal), Prestige marque.</p>
              <p className="mt-2"><strong>Recommandation</strong> : <strong>Orbitvu pour 90% des cas d'usage</strong>, sauf si budget illimité et prestige showroom prioritaire.</p>
            </Callout>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 3 : PACKSHOTCREATOR ── */}

            <h2 id="orbitvu-vs-packshotcreator-contexte-historique" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              2. Orbitvu vs PackshotCreator : Contexte Historique
            </h2>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              L'Histoire PackshotCreator
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>PackshotCreator</strong> (société française, fondée en 2004) a été l'un des <strong>pionniers européens</strong> des studios photo automatisés.
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Gamme historique PackshotCreator</strong> (2004–2018) :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">PackshotStudio R3 (équivalent AlphaShot G2 actuel)</li>
              <li className="text-future-dusk-600">PackshotMacro (équivalent AlphaShot Micro)</li>
              <li className="text-future-dusk-600">PackshotRotator (équivalent AlphaShot 360)</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>2018 : Partenariat Officiel Orbitvu</strong></p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pourquoi PackshotCreator a arrêté sa fabrication ?</strong></p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>R&amp;D coûteuse</strong> : Développer une nouvelle génération machines = investissement 2–3M€</li>
              <li className="text-future-dusk-600"><strong>Concurrence Orbitvu</strong> : Technologie supérieure, prix compétitifs</li>
              <li className="text-future-dusk-600"><strong>Décision stratégique</strong> : Devenir <strong>distributeur officiel Orbitvu France/Suisse</strong></li>
            </ol>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages pour clients PackshotCreator</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Continuité service (même équipe support)</li>
              <li className="text-future-dusk-600">Upgrade facilité (ancien PackshotStudio R3 → Orbitvu AlphaShot G2)</li>
              <li className="text-future-dusk-600">Amélioration technologique (Orbitvu Gen 2026 &gt; PackshotCreator Gen 2018)</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Évolution Performances : Ancien vs Nouveau
            </h3>
            <ComparisonTable
              headers={['PackshotStudio R3 (2018)', 'Orbitvu AlphaShot G2 (2026)']}
              rows={[
                { label: 'Temps/produit', values: ['3–5 min', '1–2 min'] },
                { label: 'Qualité capteur', values: ['24 MP', '50 MP'] },
                { label: 'Détourage auto', values: ['85%', '99%+'] },
                { label: 'IA Ready', values: ['❌ Non', '✅ Oui'] },
                { label: 'Software', values: ['Windows uniquement', 'Windows + macOS'] },
                { label: 'Prix équivalent', values: ['Sur devis', 'Sur devis'] },
              ]}
            />
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Bilan</strong> : Performances <strong>×3 supérieures</strong> à prix constant sur 8 ans (inflation ajustée).
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Transition Clients Facilitée
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>PackshotCreator accompagne la migration</strong> :
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Étape 1 : Audit machine actuelle</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Âge, état, utilisation</li>
              <li className="text-future-dusk-600">Compatibilité workflows actuels</li>
              <li className="text-future-dusk-600">Recommandation upgrade (G2, 360, XXL selon besoins)</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Étape 2 : Reprise ancien matériel</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Reprise PackshotStudio R3 : valorisation selon état (sur devis)</li>
              <li className="text-future-dusk-600">Crédit sur achat Orbitvu AlphaShot</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Étape 3 : Formation migration</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">1 journée formation (gratuite pour anciens clients PackshotCreator)</li>
              <li className="text-future-dusk-600">Workflows similaires : Courbe apprentissage minimale</li>
            </ul>
            <blockquote className="border-l-4 border-very-peri-300 pl-4 italic text-future-dusk-600 my-4">
              "Migration de notre ancien PackshotStudio R3 vers AlphaShot G2 en 2 jours. Productivité immédiate ×2, aucune rupture workflow."
              <footer className="mt-2 not-italic text-sm text-future-dusk-400">— Camille R., Responsable Photo, Bijouterie Luxe (2 500 références)</footer>
            </blockquote>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 4 : PHOTOMATICS ── */}

            <h2 id="orbitvu-vs-photomatics-positionnements-differents" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              3. Orbitvu vs Photomatics : Positionnements Différents
            </h2>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Photomatics : L'Alternative Entry-Level
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Photomatics</strong> se positionne sur un segment <strong>radicalement différent</strong> : studios DIY entry-level pour <strong>TPE et créateurs</strong>.
            </p>
            <ComparisonTable
              headers={['Photomatics Studio Box', 'Orbitvu AlphaShot Micro']}
              rows={[
                { label: 'Prix', values: ['2–3k€', 'Sur devis'] },
                { label: 'Taille produits', values: ['40×40×40 cm', '30×30×30 cm'] },
                { label: 'Automatisation', values: ['❌ Manuelle', '✅ Complète'] },
                { label: 'Qualité rendu', values: ['Standard (smartphone/compact)', 'Premium (reflex pro)'] },
                { label: 'Volume/jour', values: ['20–30', '50–100'] },
                { label: 'Formation', values: ['❌ Tutoriels YouTube', '✅ 2 jours on-site'] },
                { label: 'Support', values: ['Email (48–72h)', 'Hotline FR (2h)'] },
              ]}
            />

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Cas d'Usage Photomatics
            </h3>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pour qui Photomatics est adapté ?</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Créateurs Etsy/Shopify (&lt; 100 produits/an)</li>
              <li className="text-future-dusk-600">TPE e-commerce (&lt; 500 références)</li>
              <li className="text-future-dusk-600">Budget limité (&lt; 5 000€)</li>
              <li className="text-future-dusk-600">Utilisation ponctuelle (non quotidienne)</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pour qui Photomatics est INADAPTÉ ?</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">E-commerce scale (&gt; 1 000 produits/an)</li>
              <li className="text-future-dusk-600">Besoin qualité premium (marques luxe)</li>
              <li className="text-future-dusk-600">Production quotidienne intensive</li>
              <li className="text-future-dusk-600">Workflows professionnels (intégration PIM/DAM)</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Cas d'Usage Orbitvu
            </h3>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pour qui Orbitvu est adapté ?</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">E-commerce professionnels (&gt; 500 produits/an)</li>
              <li className="text-future-dusk-600">Marques exigeantes (qualité premium)</li>
              <li className="text-future-dusk-600">Production quotidienne (1 opérateur dédié)</li>
              <li className="text-future-dusk-600">Workflows automatisés (intégration IA, PIM/DAM)</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pour qui Orbitvu est SURDIMENSIONNÉ ?</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Créateurs hobby (&lt; 50 produits/an)</li>
              <li className="text-future-dusk-600">Utilisation mensuelle uniquement</li>
            </ul>

            <Callout type="info" title="Verdict : Segments Distincts">
              <p><strong>Photomatics et Orbitvu ne sont PAS concurrents directs.</strong> Ils répondent à des besoins radicalement différents.</p>
              <p className="mt-2"><strong>Analogie</strong> : Photomatics = Smartphone photo, Orbitvu = Reflex professionnel. Les deux ont leur utilité selon contexte.</p>
            </Callout>

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 5 : TABLEAU GÉNÉRAL ── */}

            <h2 id="tableau-comparatif-general-les-3-acteurs" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              4. Tableau Comparatif Général : Les 3 Acteurs
            </h2>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Synthèse globale pour vision d'ensemble.
            </p>
            <ComparisonTable
              headers={['Orbitvu', 'StyleShoots', 'Photomatics']}
              rows={[
                { label: 'Prix gamme', values: ['Sur devis', '25–60k€', '2–8k€'] },
                { label: 'Positionnement', values: ['Milieu/Haut pro', 'Haut premium', 'Entry DIY'] },
                { label: 'Qualité rendu', values: ['Premium', 'Premium+', 'Standard'] },
                { label: 'Évolutivité', values: ['✅ Excellente', '⚠️ Moyenne', '❌ Limitée'] },
                { label: 'IA Ready', values: ['✅ Oui (BlendAI)', '❌ Non', '❌ Non'] },
                { label: 'Support France', values: ['✅ PackshotCreator', '⚠️ Limité', '❌ Email only'] },
                { label: 'Garantie', values: ['2 ans (ext. 5 ans)', '2 ans', '1 an'] },
                { label: 'Formation', values: ['✅ Certifiée Qualiopi', '✅ On-site', '❌ YouTube'] },
                { label: 'Part marché EU', values: ['~45%', '~25%', '~15%'] },
                { label: 'Idéal pour', values: ['E-com pro 500+', 'Marques luxe', 'Créateurs TPE'] },
              ]}
            />

          <hr className="my-8 border-neutral-200" />

          {/* ── SECTION 6 : 5 AVANTAGES ORBITVU ── */}

            <h2 id="pourquoi-choisir-orbitvu-les-5-avantages-cles" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
              5. Pourquoi Choisir Orbitvu ? Les 5 Avantages Clés
            </h2>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              1. Rapport Qualité/Prix Imbattable
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>15–20% moins cher</strong> que StyleShoots à qualité équivalente.
            </p>
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 font-mono text-sm text-future-dusk-700 my-6">
              <p>Orbitvu AlphaShot G2 : Sur devis</p>
              <p className="mt-1">StyleShoots Vertical : 28 000€</p>
              <p className="mt-1">Économie significative à l'achat — contactez-nous pour un comparatif chiffré</p>
            </div>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              2. IA Ready : Workflow 2026 Complet
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Orbitvu = Seul fabricant intégration IA native.</strong>
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Workflow Hardware + IA</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Studio Orbitvu (capture packshot) : 1–2 min</li>
              <li className="text-future-dusk-600">IA BlendAI (détourage, backgrounds, lifestyle) : 30–60 sec</li>
              <li className="text-future-dusk-600"><strong>Total</strong> : 3–4 min pour 5 déclinaisons complètes</li>
            </ul>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Productivité</strong> : ×20 vs workflow traditionnel (studio + retouche manuelle).
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Découvrir l'approche 3 piliers : Hardware + IA + Formation</Link>
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              3. Support Français Excellence : PackshotCreator
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Distributeur officiel France/Suisse depuis 2018.</strong>
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Garanties support</strong> :</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Hotline &lt; 2h ouvrées</li>
              <li className="text-future-dusk-600">Techniciens on-site 24–48h (France métropolitaine)</li>
              <li className="text-future-dusk-600">Stock pièces détachées France (livraison 24h)</li>
              <li className="text-future-dusk-600">Formations certifiées Qualiopi (financement OPCO 100%)</li>
            </ul>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Satisfaction client</strong> : 98% (enquête 2025 sur 150+ installations).
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              4. Évolutivité : Modules Additionnels
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
              <strong>Avantage</strong> : Investissement initial maîtrisé, upgrade selon besoins futurs réels.
            </p>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>StyleShoots</strong> : Évolutivité limitée, upgrades souvent impossibles (changement machine requis).
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              5. Écosystème Complet : Approche 3 Piliers
            </h3>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>PackshotCreator = Unique acteur proposant écosystème complet</strong> :
            </p>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pilier 1 : Hardware (Orbitvu)</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Gamme complète studios automatisés</li>
              <li className="text-future-dusk-600">Distribution officielle France/Suisse</li>
              <li className="text-future-dusk-600">Support technique premium</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pilier 2 : IA (BlendAI)</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">Intégration native studios Orbitvu</li>
              <li className="text-future-dusk-600">Détourage, backgrounds, lifestyle automatisés</li>
              <li className="text-future-dusk-600">ROI productivité ×20</li>
            </ul>
            <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pilier 3 : Formation (Academy)</strong></p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600">3 niveaux certifiés Qualiopi</li>
              <li className="text-future-dusk-600">Financement OPCO 100%</li>
              <li className="text-future-dusk-600">Formateurs experts 10+ ans</li>
            </ul>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              <strong>Avantage compétitif</strong> : Workflow complet clé en main, un seul interlocuteur pour tout.
            </p>

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
              Conclusion : Orbitvu, le Choix Rationnel 2026
            </h2>
            <p className="mb-4 leading-relaxed text-future-dusk-600">
              Le marché des studios photo automatisés est mature en 2026, avec 3 acteurs positionnés sur des segments distincts. <strong>Orbitvu</strong> s'impose comme le choix rationnel pour <strong>90% des e-commerçants professionnels</strong> grâce à un rapport qualité/prix imbattable, une intégration IA unique, et un support France d'excellence via PackshotCreator.
            </p>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Les 5 Raisons de Choisir Orbitvu
            </h3>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Prix compétitif</strong> : -15–20% vs StyleShoots à qualité équivalente</li>
              <li className="text-future-dusk-600"><strong>IA Ready</strong> : Seul fabricant intégration IA native (workflow 2026)</li>
              <li className="text-future-dusk-600"><strong>Support France</strong> : PackshotCreator distributeur officiel, satisfaction 98%</li>
              <li className="text-future-dusk-600"><strong>Évolutivité</strong> : Modules additionnels (360°, vidéo, 3D) selon besoins futurs</li>
              <li className="text-future-dusk-600"><strong>Écosystème complet</strong> : Approche 3 piliers Hardware + IA + Formation unique</li>
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
                    <td className="px-4 py-3 font-medium text-future-dusk-900">E-commerce pro 500–5 000 produits/an</td>
                    <td className="px-4 py-3 text-center font-bold text-very-peri-700">Orbitvu AlphaShot G2</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">ROI 4–8 mois, polyvalence, IA Ready</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-white">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">Marque luxe budget illimité</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">StyleShoots Vertical</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Design premium, prestige showroom</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">Créateur TPE &lt; 100 produits/an</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Photomatics Studio Box</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Budget entry-level, usage ponctuel</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-white">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">Bijoutier/Horloger</td>
                    <td className="px-4 py-3 text-center font-bold text-very-peri-700">Orbitvu AlphaShot Micro</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Précision extrême, prix accessible</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <td className="px-4 py-3 font-medium text-future-dusk-900">E-commerce 360° / AR-VR</td>
                    <td className="px-4 py-3 text-center font-bold text-very-peri-700">Orbitvu AlphaShot 360</td>
                    <td className="px-4 py-3 text-center text-future-dusk-600">Vues interactives natives, évolutif</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
              Ressources Complémentaires
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="text-future-dusk-600"><strong>Gamme Orbitvu Complète</strong> : <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">Studios Photo Automatisés</Link></li>
              <li className="text-future-dusk-600"><strong>Intégration IA</strong> : <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Workflow Hardware + BlendAI</Link></li>
              <li className="text-future-dusk-600"><strong>Calculateur ROI</strong> : <a href={`/${lang}/studios-photo-automatises#calculateur-roi`} className="text-very-peri-600 hover:text-very-peri-700 underline">Estimez vos économies</a></li>
              <li className="text-future-dusk-600"><strong>Formations</strong> : <Link href="/academy/formations-packshot" className="text-very-peri-600 hover:text-very-peri-700 underline">Academy PackshotCreator</Link></li>
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
          description: 'Comparatif complet Orbitvu vs concurrents (PackshotCreator, StyleShoots, Photorobot). Qualité, prix, fonctionnalités, intégration IA. Guide objectif 2026.',
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
