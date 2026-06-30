import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { BookOpen, Clock, User } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { Callout, ComparisonTable, TableOfContents, ArticleCTA, RelatedArticles } from '@/components/blog';
import { buildLanguages } from '@/lib/hreflang';

/* ─────────────────────────── Metadata ─────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = "Guide d'Achat Studio Photo Automatisé 2026 : Choisir le Bon Modèle Orbitvu";
  const description = "Guide complet achat studio photo automatisé 2026. Comparatif modèles Orbitvu (Micro, G2, 360, XXL), critères choix, budget, ROI. Recommandations par secteur.";
  const url = `https://www.packshot-creator.com/${lang}/blog/guide-achat-studio-2026`;

  return {
    title,
    description,
    keywords: 'guide achat studio photo, choisir studio orbitvu, comparatif studio automatisé, achat studio packshot, orbitvu 2026',
    alternates: {
      canonical: url,
      languages: buildLanguages('/fr/blog/guide-achat-studio-2026'),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
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

/* ─────────────────────────── TOC headings ─────────────────────────── */

const tocHeadings = [
  { id: 'les-7-criteres-de-selection-essentiels', text: 'Les 7 Critères de Sélection Essentiels', level: 2 },
  { id: 'taille-produits-dimensionnement-critique', text: '1. Taille Produits', level: 3 },
  { id: 'volume-production-dimensionner-la-capacite', text: '2. Volume Production', level: 3 },
  { id: 'type-de-visuels-packshots-360-videos', text: '3. Type de Visuels', level: 3 },
  { id: 'budget-disponible-trouver-le-bon-equilibre', text: '4. Budget Disponible', level: 3 },
  { id: 'integration-ia-preparer-le-workflow-2026', text: '5. Intégration IA', level: 3 },
  { id: 'evolutivite-anticiper-vos-besoins-futurs', text: '6. Évolutivité', level: 3 },
  { id: 'support-et-formation-le-facteur-humain', text: '7. Support & Formation', level: 3 },
  { id: 'comparatif-complet-les-4-machines-orbitvu', text: 'Comparatif Complet : Les 4 Machines', level: 2 },
  { id: 'processus-dachat-en-5-etapes', text: 'Processus d\'Achat en 5 Étapes', level: 2 },
  { id: 'erreurs-courantes-a-eviter', text: 'Erreurs Courantes à Éviter', level: 2 },
  { id: 'financement-et-aides', text: 'Financement et Aides', level: 2 },
  { id: 'faq-achat-studios-photo', text: 'Questions fréquentes', level: 2 },
  { id: 'conclusion-choisir-en-connaissance-de-cause', text: 'Conclusion', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: "Quel délai entre la commande et l'installation d'un studio Orbitvu ?",
    answer: "Pour les machines en stock France, le délai est de 2 à 3 semaines. Pour un import direct depuis la Pologne, comptez 6 à 10 semaines. En pratique, anticipez 8 à 12 semaines entre la commande et le go-live, en intégrant la livraison, l'installation et la formation initiale.",
  },
  {
    question: "Quelle garantie est incluse avec un studio Orbitvu ?",
    answer: "La garantie constructeur standard est de 2 ans (pièces et main d'œuvre), extensible jusqu'à 5 ans sur devis. Elle couvre les défauts matériels et les interventions technicien on-site, mais pas l'usure normale (ampoules, backgrounds) ni les dommages accidentels.",
  },
  {
    question: "Peut-on louer un studio Orbitvu plutôt que l'acheter ?",
    answer: "Orbitvu ne propose pas de location classique. L'alternative est le leasing professionnel, qui permet de financer la machine sur 3 à 5 ans avec option d'achat en fin de contrat. Pour les entreprises souhaitant maîtriser leur trésorerie, c'est souvent la solution recommandée.",
  },
  {
    question: "Est-il risqué d'acheter un Orbitvu d'occasion ?",
    answer: "C'est déconseillé dans la plupart des cas : les machines d'occasion sont souvent hors garantie, la formation initiale n'est pas transférable, et la décote n'est que de 30 à 40% — soit une économie réelle limitée pour un risque accru. Une exception est acceptable pour les machines de moins de 2 ans avec garantie transférable, à vérifier avec PackshotCreator.",
  },
  {
    question: "Quel modèle Orbitvu convient le mieux pour la majorité des e-commerçants ?",
    answer: "L'AlphaShot G2 est recommandé pour 90% des cas : il couvre les produits jusqu'à 100 cm, offre une polyvalence maximale pour la mode, la chaussure et l'électronique, et affiche un ROI de 4 à 8 mois pour les volumes supérieurs à 1 000 produits par an. Les modules 360° et vidéo sont ajoutables à tout moment.",
  },
  {
    question: "Comment financer l'achat d'un studio photo automatisé ?",
    answer: "Plusieurs options existent : le leasing professionnel (mensualités lissées sur 36 à 60 mois), le crédit-bail, ou les aides à l'investissement (BPI France, crédit impôt innovation selon secteur). Pour les PME industrielles, des dispositifs régionaux peuvent couvrir jusqu'à 30% de l'investissement.",
  },
  {
    question: "Un studio Orbitvu peut-il évoluer avec les besoins futurs ?",
    answer: "Oui, c'est l'un des points forts d'Orbitvu : des modules additionnels (360°, vidéo, 3D scan) sont disponibles après achat, les mises à jour logicielles sont gratuites (2 à 3 par an), et les pièces détachées sont disponibles pendant 7 à 10 ans. La compatibilité ascendante garantit que les anciens modèles restent compatibles avec les nouveaux logiciels.",
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function GuideAchatStudio2026Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const articleUrl = `https://www.packshot-creator.com/${lang}/blog/guide-achat-studio-2026`;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: "Guide d'Achat Studio Photo 2026", url: articleUrl },
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
        title="Guide d'Achat Complet : Choisir Votre Studio Photo Automatisé en 2026"
        subtitle="7 critères objectifs, comparatif Micro / G2 / 360 / XXL, erreurs à éviter, financement. La méthode éprouvée pour faire le bon choix."
      >
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-future-dusk-300">
          <span className="px-3 py-1 rounded-full bg-very-peri-500/20 text-very-peri-300 font-medium text-xs uppercase tracking-wide">
            Hardware & Studios
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            12 min de lecture
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            Sébastien Jourdan — 22 janvier 2026
          </span>
        </div>
      </HeroSection>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-10">
        <img
          src="/images/blog/thumbnail-article-nouveau-3.avif"
          alt="Guide achat studio photo automatisé Orbitvu 2026"
          className="w-full rounded-2xl shadow-lg"
          width={1344}
          height={768}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. ARTICLE BODY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">

            {/* Main content */}
            <div>

                {/* Introduction */}
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le marché des studios photo automatisés a considérablement évolué ces dernières années. Avec plus de 20 modèles disponibles en 2026, aux budgets très variables selon la taille des produits et le niveau d'automatisation, choisir le bon équipement peut rapidement devenir complexe. Une décision mal informée peut vous coûter des dizaines de milliers d'euros en sur-investissement ou, pire encore, en sous-performance chronique.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Ce guide d'achat complet vous présente une <strong>méthodologie en 7 critères objectifs</strong> pour sélectionner le studio photo automatisé parfaitement adapté à vos besoins actuels et futurs. Que vous photographiiez des bijoux, des chaussures ou des meubles, que vous gériez 500 ou 10 000 références par an, ce guide vous donnera les clés pour faire le bon choix et maximiser votre retour sur investissement.
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* ── Critères ── */}
                <h2 id="les-7-criteres-de-selection-essentiels" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Les 7 Critères de Sélection Essentiels
                </h2>

                {/* Critère 1 */}
                <h3 id="taille-produits-dimensionnement-critique" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  1. Taille Produits : Dimensionnement Critique
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le premier critère de sélection est la <strong>taille maximum des produits</strong> que vous photographierez. Choisir une machine trop petite rendra certains produits impossibles à shooter, tandis qu'une machine surdimensionnée augmentera inutilement votre investissement.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Petits Objets (&lt; 30 cm) : AlphaShot Micro</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Produits concernés</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Bijoux (bagues, colliers, bracelets)</li>
                  <li className="text-future-dusk-600">Montres et horlogerie</li>
                  <li className="text-future-dusk-600">Cosmétiques (flacons, palettes)</li>
                  <li className="text-future-dusk-600">Électronique petite taille (écouteurs, accessoires)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Dimensions utiles</strong> : 30×30×30 cm — <strong>Prix</strong> : sur devis</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Précision extrême (macro intégré)</li>
                  <li className="text-future-dusk-600">Compact (80×80 cm au sol)</li>
                  <li className="text-future-dusk-600">Éclairage optimisé petits objets</li>
                  <li className="text-future-dusk-600">Prix d'entrée accessible</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Limites</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Taille maximum stricte 30 cm</li>
                  <li className="text-future-dusk-600">Pas de 360° natif (extension possible)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Pour qui ?</strong> Bijoutiers, horlogers, e-commerce cosmétiques, secteur luxe petite maroquinerie.</p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Produits Moyens (30-100 cm) : AlphaShot G2</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Produits concernés</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Chaussures et maroquinerie</li>
                  <li className="text-future-dusk-600">Textile et mode (vêtements pliés)</li>
                  <li className="text-future-dusk-600">Équipement sportif moyen</li>
                  <li className="text-future-dusk-600">Électronique grand public</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Dimensions utiles</strong> : 100×80×80 cm — <strong>Prix</strong> : sur devis</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Polyvalence maximale</li>
                  <li className="text-future-dusk-600">80% des produits e-commerce compatibles</li>
                  <li className="text-future-dusk-600">Évolutivité (modules 360°, vidéo)</li>
                  <li className="text-future-dusk-600">Rapport qualité/prix optimal</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Limites</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">360° nécessite module additionnel (sur devis)</li>
                  <li className="text-future-dusk-600">Encombrement 150×150 cm au sol</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Pour qui ?</strong> E-commerce généralistes, pure players mode/lifestyle, retailers multi-catégories.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Machine la plus vendue en France (2024-2025)</strong> : 60% des studios automatisés installés sont des AlphaShot G2.
                </p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Grands Produits (100-200 cm) : AlphaShot XXL</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Produits concernés</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Meubles (chaises, tables, luminaires)</li>
                  <li className="text-future-dusk-600">Électroménager (réfrigérateurs, machines à laver)</li>
                  <li className="text-future-dusk-600">Vélos et équipement sportif XXL</li>
                  <li className="text-future-dusk-600">Bagagerie grand format</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Dimensions utiles</strong> : 200×150×150 cm — <strong>Prix</strong> : sur devis</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Capacité très grands produits</li>
                  <li className="text-future-dusk-600">Éclairage haute puissance adapté</li>
                  <li className="text-future-dusk-600">Motorisation charge lourde (jusqu'à 150 kg)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Limites</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Prix élevé</li>
                  <li className="text-future-dusk-600">Encombrement important (300×300 cm minimum)</li>
                  <li className="text-future-dusk-600">Consommation électrique importante</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Pour qui ?</strong> Enseignes ameublement, électroménager, équipementiers industriels.</p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Vues 360° et Vidéos : AlphaShot 360</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Produits concernés</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Tous secteurs nécessitant vues interactives</li>
                  <li className="text-future-dusk-600">E-commerce AR/VR ready</li>
                  <li className="text-future-dusk-600">Catalogues interactifs premium</li>
                  <li className="text-future-dusk-600">Marketplaces (Amazon 360, Cdiscount 360)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Dimensions utiles</strong> : 100×80×80 cm — <strong>Prix</strong> : sur devis</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Vues 360° natives (24, 36 ou 72 images)</li>
                  <li className="text-future-dusk-600">Vidéos produit automatisées</li>
                  <li className="text-future-dusk-600">Export 3D/CGI (modélisation)</li>
                  <li className="text-future-dusk-600">Compatible réalité augmentée</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Limites</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Prix 2× supérieur G2</li>
                  <li className="text-future-dusk-600">Temps capture plus long (2-5 min vs 1-2 min)</li>
                  <li className="text-future-dusk-600">Fichiers volumineux (20-50 MB par produit 360°)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Pour qui ?</strong> Marques premium, e-commerce AR/VR, catalogues interactifs, formation technique (manuels 3D).
                </p>

                <Callout type="info" title="Évolutivité G2 → 360">
                  Si vous hésitez entre G2 et 360, privilégiez le <strong>G2 + module 360° ultérieur</strong> (économie immédiate substantielle, upgrade possible dans 1-2 ans selon besoins).
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 2 */}
                <h3 id="volume-production-dimensionner-la-capacite" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  2. Volume Production : Dimensionner la Capacité
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le volume annuel de produits à photographier détermine la <strong>rentabilité</strong> de votre investissement et le <strong>modèle optimal</strong>.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">&lt; 500 Produits/An : Studio Manuel Recommandé</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Calcul ROI</strong> :</p>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4 font-mono text-sm text-future-dusk-700">
                  <div>Coût studio automatisé : sur devis</div>
                  <div>Économie vs externe : variable selon votre volume (estimation avec le calculateur ROI)</div>
                  <div>Délai retour : 12-18 mois</div>
                </div>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Alternative</strong> : Studio manuel (fond, éclairage, appareil) + IA BlendAI pour automatiser détourage/retouche. <strong>Budget</strong> : 3 000 - 5 000€ (équipement) + 50€/mois (BlendAI). <strong>Pour qui ?</strong> Créateurs, TPE e-commerce &lt; 500 références.
                </p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">500-2 000 Produits/An : AlphaShot Micro ou G2</h4>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4 font-mono text-sm text-future-dusk-700">
                  <div>1 000 produits/an : économies substantielles sur la sous-traitance photo</div>
                  <div>Investissement G2 : sur devis</div>
                  <div>Délai retour : 5-6 mois ✅</div>
                </div>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Machine recommandée</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Micro</strong> si 100% produits &lt; 30 cm (bijoux, cosmétiques)</li>
                  <li className="text-future-dusk-600"><strong>G2</strong> si produits mixtes ou évolution prévue</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Capacité</strong> : 200-500 produits/jour (G2), suffisant pour 2 000 produits/an avec 1 opérateur.
                </p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">2 000-10 000 Produits/An : AlphaShot G2 ou 360</h4>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4 font-mono text-sm text-future-dusk-700">
                  <div>5 000 produits/an : économies substantielles sur la sous-traitance photo</div>
                  <div>Investissement G2 ou 360 : sur devis</div>
                  <div>Délai retour : 1-2 mois ✅✅</div>
                </div>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Machine recommandée</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>G2</strong> si packshots simples suffisent</li>
                  <li className="text-future-dusk-600"><strong>360</strong> si vues interactives requises (marketplace, AR/VR)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Organisation</strong> : 1 opérateur dédié + workflows automatisés (intégration PIM/DAM).
                </p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">&gt; 10 000 Produits/An : MultiStation ou Dual Setup</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Volume industriel</strong> : Nécessite infrastructure multi-machines.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Solutions</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>2-3 AlphaShot G2 en parallèle</strong> : 2-3 opérateurs, workflow dupliqué</li>
                  <li className="text-future-dusk-600"><strong>MultiStation</strong> (modèle industriel) : Gestion simultanée 4-6 produits</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Investissement</strong> : sur devis. <strong>Pour qui ?</strong> Industriels, pure players &gt;5 000 références, distributeurs multi-marques.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href={{ pathname: '/studios-photo-automatises', hash: 'calculateur-roi' }} className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Calculer le ROI de votre studio selon votre volume
                  </Link>
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 3 */}
                <h3 id="type-de-visuels-packshots-360-videos" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  3. Type de Visuels : Packshots, 360°, Vidéos
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Le type de visuels requis influence directement le choix du modèle.</p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Packshots Simples (Fond Blanc) : AlphaShot G2</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Use cases</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Fiches produits e-commerce standards</li>
                  <li className="text-future-dusk-600">Catalogues imprimés</li>
                  <li className="text-future-dusk-600">Marketplaces (Amazon, Cdiscount, eBay)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Output</strong> : 1-3 angles par produit, fond blanc pur, export JPEG/PNG haute qualité.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages G2</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Rapidité (1-2 min par produit)</li>
                  <li className="text-future-dusk-600">Coût optimal (sur devis)</li>
                  <li className="text-future-dusk-600">Détourage automatique intégré</li>
                </ul>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Vues 360° Interactives : AlphaShot 360</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Use cases</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Catalogues interactifs premium</li>
                  <li className="text-future-dusk-600">E-commerce AR/VR ready</li>
                  <li className="text-future-dusk-600">Marketplaces premium (Amazon 360 Spin)</li>
                  <li className="text-future-dusk-600">Applications mobiles (rotation tactile)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Output</strong> : 24, 36 ou 72 images par rotation, HTML5 viewer intégré, export GIF animé ou vidéo MP4.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages 360</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Engagement utilisateur +40%</li>
                  <li className="text-future-dusk-600">Taux conversion +15-25% (études secteur)</li>
                  <li className="text-future-dusk-600">Réduction retours produits (-30%)</li>
                </ul>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Vidéos Produits : AlphaShot 360 + Module Vidéo</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Use cases</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Démos produits techniques</li>
                  <li className="text-future-dusk-600">Landing pages publicitaires</li>
                  <li className="text-future-dusk-600">Réseaux sociaux (Instagram, TikTok, YouTube Shorts)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Output</strong> : Vidéos MP4 Full HD (1920×1080), rotations fluides 30-60 fps, zooms progressifs automatisés.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages vidéo</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Format 2026 dominant (70% trafic web = vidéo)</li>
                  <li className="text-future-dusk-600">SEO YouTube (référencement Google)</li>
                  <li className="text-future-dusk-600">Viralité réseaux sociaux</li>
                </ul>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Animations 3D/CGI : AlphaShot 360 + Export 3D</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Use cases</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Configurateurs produits 3D</li>
                  <li className="text-future-dusk-600">Réalité augmentée (essai virtuel)</li>
                  <li className="text-future-dusk-600">Manuels techniques interactifs</li>
                  <li className="text-future-dusk-600">Modélisation 3D pour marketing</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600">
                  <strong>Output</strong> : Modèles 3D (OBJ, FBX, GLTF), textures haute résolution, compatible moteurs 3D (Unity, Unreal).
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Investissement</strong> : AlphaShot 360 (sur devis) + logiciels 3D (500 - 2 000€/an)
                </p>

                <ComparisonTable
                  headers={['Packshot Simple', 'Vue 360°', 'Vidéo', 'Animation 3D']}
                  rows={[
                    { label: 'Machine', values: ['G2', '360', '360 + Module', '360 + 3D'] },
                    { label: 'Prix', values: ['Sur devis', 'Sur devis', 'Sur devis', 'Sur devis'] },
                    { label: 'Temps/produit', values: ['1-2 min', '3-5 min', '4-6 min', '5-10 min'] },
                    { label: 'Use case principal', values: ['E-commerce', 'Premium', 'Social Media', 'AR/VR'] },
                  ]}
                />

                <hr className="my-8 border-neutral-200" />

                <Callout type="info" title="Calculez Votre ROI Personnalisé">
                  Avant d'investir, estimez précisément le retour sur investissement selon vos volumes et besoins. Notre calculateur vous recommande la machine adaptée.{' '}
                  <Link href={{ pathname: '/studios-photo-automatises', hash: 'calculateur-roi' }} className="text-very-peri-600 hover:text-very-peri-700 underline font-semibold">
                    Lancer le calculateur gratuit →
                  </Link>
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 4 */}
                <h3 id="budget-disponible-trouver-le-bon-equilibre" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  4. Budget Disponible : Trouver le Bon Équilibre
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Votre budget détermine la gamme accessible, mais attention au piège du sous-dimensionnement.</p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Entry-Level : AlphaShot Micro</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce que vous obtenez</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine complète opérationnelle</li>
                  <li className="text-future-dusk-600">Formation 2 jours incluse</li>
                  <li className="text-future-dusk-600">Logiciel Orbitvu inclus (vie)</li>
                  <li className="text-future-dusk-600">Support technique 1 an</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce qui n'est PAS inclus</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Installation on-site (sur devis)</li>
                  <li className="text-future-dusk-600">Formation avancée (+ 650 - 1 100€)</li>
                  <li className="text-future-dusk-600">Maintenance année 2+ (sur devis)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Financement</strong> : Leasing 36 mois : sur devis | Crédit équipement : Selon banque</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Mid-Range : AlphaShot G2</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce que vous obtenez</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine polyvalente (80% use cases)</li>
                  <li className="text-future-dusk-600">Évolutivité (modules 360°, vidéo)</li>
                  <li className="text-future-dusk-600">Formation 2 jours incluse</li>
                  <li className="text-future-dusk-600">Support 1 an</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Budget complet recommandé</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine : sur devis</li>
                  <li className="text-future-dusk-600">Installation : sur devis</li>
                  <li className="text-future-dusk-600">Formation avancée : 1 100€</li>
                  <li className="text-future-dusk-600"><strong>Total : sur devis</strong></li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Financement</strong> : Leasing 48 mois : sur devis | Amortissement comptable : 5 ans<br />
                  <strong>ROI</strong> : 4-8 mois si volume &gt; 1 000 produits/an
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Premium : AlphaShot 360 ou XXL</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce que vous obtenez</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machines haute performance</li>
                  <li className="text-future-dusk-600">Capacités avancées (360°, vidéo, 3D)</li>
                  <li className="text-future-dusk-600">Formation premium 3 jours</li>
                  <li className="text-future-dusk-600">Support prioritaire 2 ans</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Budget complet recommandé</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine 360 : sur devis</li>
                  <li className="text-future-dusk-600">Installation complexe : sur devis</li>
                  <li className="text-future-dusk-600">Formation expert : 1 800€</li>
                  <li className="text-future-dusk-600"><strong>Total : sur devis</strong></li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Financement</strong> : Leasing 60 mois : sur devis | Crédit professionnel : Taux 2-3%<br />
                  <strong>ROI</strong> : 2-4 mois si volume &gt; 5 000 produits/an
                </p>

                <Callout type="warning" title="Attention au sous-dimensionnement">
                  Économiser sur une machine sous-dimensionnée peut vous coûter <strong>très cher en opportunités perdues</strong> (produits non shootables, workflows limités, réinvestissement nécessaire dans 2 ans).
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 5 */}
                <h3 id="integration-ia-preparer-le-workflow-2026" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  5. Intégration IA : Préparer le Workflow 2026
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  En 2026, l'intégration de l'IA photo produit n'est plus une option mais un <strong>standard de l'industrie</strong>. Tous les studios Orbitvu sont <strong>IA Ready</strong>, avec compatibilité native BlendAI.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Qu'est-ce qu'un Studio "IA Ready" ?</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Définition</strong> : Studio capable d'exporter automatiquement les packshots vers une plateforme IA pour traitement automatisé.
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Workflow IA intégré</strong> :</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Capture studio Orbitvu</strong> (1-2 min) : Packshot fond blanc haute qualité</li>
                  <li className="text-future-dusk-600"><strong>Export automatique BlendAI</strong> (10 sec) : API directe, aucune manipulation</li>
                  <li className="text-future-dusk-600"><strong>Traitement IA</strong> (30-60 sec) : Détourage, backgrounds, lifestyle, retouche</li>
                  <li className="text-future-dusk-600"><strong>Import automatique PIM/DAM</strong> (10 sec) : Visuels prêts e-commerce</li>
                </ol>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Gain de productivité total</strong> : <strong>92-95%</strong> vs workflow traditionnel (studio + retouche manuelle).
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Use Cases IA Photo Produit</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>1. Détourage Automatique</strong></p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Précision 99%+ (mieux que détourage Photoshop manuel)</li>
                  <li className="text-future-dusk-600">Gestion produits complexes (cheveux, verre, transparence)</li>
                  <li className="text-future-dusk-600">Batch 1 000+ images en 1h</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>2. Backgrounds Contextuels</strong></p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Remplacer fond blanc par décors lifestyle</li>
                  <li className="text-future-dusk-600">Cohérence marque (style guide personnalisable)</li>
                  <li className="text-future-dusk-600">Génération IA custom (texte → arrière-plan)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>3. Lifestyle Generator</strong></p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Transformer packshot en mise en scène réaliste</li>
                  <li className="text-future-dusk-600">Économie 95% vs shooting mannequin traditionnel</li>
                  <li className="text-future-dusk-600">Use case mode, bijoux, cosmétiques</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>4. Retouche Automatisée</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Suppression défauts (poussière, rayures)</li>
                  <li className="text-future-dusk-600">Ajustement couleurs (balance, saturation)</li>
                  <li className="text-future-dusk-600">Ombres et reflets automatiques</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir l'intégration complète Hardware + IA
                  </Link>
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 6 */}
                <h3 id="evolutivite-anticiper-vos-besoins-futurs" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  6. Évolutivité : Anticiper Vos Besoins Futurs
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Un studio photo représente un investissement 5-7 ans. L'évolutivité est un critère majeur pour éviter un réinvestissement prématuré.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Modules Additionnels Disponibles</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>AlphaShot G2 évolutif</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Module 360°</strong> (sur devis) : Transformation G2 simple en G2 360°</li>
                  <li className="text-future-dusk-600"><strong>Module vidéo</strong> (sur devis) : Ajout capture vidéo</li>
                  <li className="text-future-dusk-600"><strong>Éclairage additionnel</strong> (sur devis) : Renfort puissance lumière</li>
                  <li className="text-future-dusk-600"><strong>Motorisation charge lourde</strong> (sur devis) : Produits jusqu'à 50 kg</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>AlphaShot 360 évolutif</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Module 3D/CGI</strong> (sur devis) : Export modèles 3D</li>
                  <li className="text-future-dusk-600"><strong>Plateau motorisé multi-axes</strong> (sur devis) : Rotations complexes</li>
                  <li className="text-future-dusk-600"><strong>Éclairage premium</strong> (sur devis) : Rendu studio photographe</li>
                </ul>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Upgrades Software Gratuits</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600">Orbitvu met à jour gratuitement ses logiciels :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Nouvelles fonctionnalités (2-3 updates/an)</li>
                  <li className="text-future-dusk-600">Optimisations performances</li>
                  <li className="text-future-dusk-600">Compatibilité OS récents (Windows, macOS)</li>
                  <li className="text-future-dusk-600">Intégrations API (nouvelles plateformes)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Valeur</strong> : Économie de 500-1 000€/an vs logiciels concurrents (upgrades payants).
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Scalabilité : Ajout de Machines</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Si votre volume explose, vous pouvez <strong>dupliquer votre workflow</strong> — scénario passage de 2 000 à 10 000 produits/an : achat 2e AlphaShot G2 identique.
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Formation identique (opérateurs interchangeables)</li>
                  <li className="text-future-dusk-600">Workflows dupliqués (aucune adaptation)</li>
                  <li className="text-future-dusk-600">Pièces détachées communes (maintenance simplifiée)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Coût</strong> : sur devis (machine seule, pas d'installation complexe)
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 7 */}
                <h3 id="support-et-formation-le-facteur-humain" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  7. Support & Formation : Le Facteur Humain
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Un studio photo automatisé n'est performant que si vos équipes le maîtrisent. Le support technique et la formation sont des critères différenciants majeurs.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Formation Incluse (2 Jours)</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Programme formation de base</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Jour 1 : Installation, calibration, paramétrage</li>
                  <li className="text-future-dusk-600">Jour 2 : Workflows produits, best practices, troubleshooting</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Niveau atteint</strong> : Autonomie opérationnelle basique (80% use cases). <strong>Limites</strong> : Produits complexes (verre, bijoux haute horlogerie) nécessitent formation avancée.
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Formations Avancées Certifiées Qualiopi</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>PackshotCreator Academy</strong> propose 3 niveaux de formation certifiés Qualiopi (financement OPCO 100%) :
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Niveau 1 - Maîtrise Studios Orbitvu</strong> (2 jours, 1 200€)</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Optimisation workflows par secteur</li>
                  <li className="text-future-dusk-600">Gestion produits complexes</li>
                  <li className="text-future-dusk-600">Intégration IA BlendAI</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Opérateurs confirmés</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Niveau 2 - Optimisation Workflow</strong> (3 jours, 1 800€)</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Intégration PIM/DAM</li>
                  <li className="text-future-dusk-600">Automatisation batch</li>
                  <li className="text-future-dusk-600">Gestion colorimétrie avancée</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Responsables studio</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Niveau 3 - Expert 360° & Vidéo</strong> (2 jours, 1 400€)</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Vues 360° haute qualité</li>
                  <li className="text-future-dusk-600">Vidéos produits professionnelles</li>
                  <li className="text-future-dusk-600">Export 3D/CGI</li>
                  <li className="text-future-dusk-600"><strong>Public</strong> : Spécialistes techniques</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href="/academy/formations-packshot" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir les formations Orbitvu
                  </Link>
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Support Technique France</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>PackshotCreator = Distributeur officiel Orbitvu France/Suisse</strong>
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages support FR</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Hotline française</strong> : Réponse &lt; 2h ouvrées</li>
                  <li className="text-future-dusk-600"><strong>Techniciens sur site</strong> : Intervention 24-48h (France métropolitaine)</li>
                  <li className="text-future-dusk-600"><strong>Pièces détachées</strong> : Stock FR, livraison 24h</li>
                  <li className="text-future-dusk-600"><strong>Mises à jour logicielles</strong> : Assistance installation gratuite</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Contrat maintenance</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Standard</strong> (sur devis) : Hotline, interventions à distance</li>
                  <li className="text-future-dusk-600"><strong>Premium</strong> (sur devis) : + interventions on-site illimitées</li>
                </ul>

                <Callout type="success" title="Garantie constructeur">
                  Toutes les machines Orbitvu bénéficient d'une <strong>garantie constructeur 2 ans</strong> (pièces et main d'œuvre). Extension possible jusqu'à 5 ans.
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* ── Comparatif Complet ── */}
                <h2 id="comparatif-complet-les-4-machines-orbitvu" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Comparatif Complet : Les 4 Machines Orbitvu
                </h2>
                <p className="mb-6 leading-relaxed text-future-dusk-600">
                  Synthèse comparative des 4 modèles principaux pour faciliter votre décision.
                </p>

                <ComparisonTable
                  headers={['AlphaShot Micro', 'AlphaShot G2', 'AlphaShot 360', 'AlphaShot XXL']}
                  rows={[
                    { label: 'Taille max produit', values: ['30×30×30 cm', '100×80×80 cm', '100×80×80 cm', '200×150×150 cm'] },
                    { label: 'Prix', values: ['Sur devis', 'Sur devis', 'Sur devis', 'Sur devis'] },
                    { label: 'Volume/jour', values: ['50-100', '200-500', '100-300', '100-200'] },
                    { label: 'Temps/produit', values: ['1-2 min', '1-2 min', '3-5 min', '3-5 min'] },
                    { label: '360° natif', values: ['Non (option)', 'Non (option)', 'Oui', 'Non (option)'] },
                    { label: 'Vidéo', values: ['Non', 'Module', 'Module', 'Module'] },
                    { label: 'IA Ready', values: ['Oui', 'Oui', 'Oui', 'Oui'] },
                    { label: 'Idéal pour', values: ['Bijoux, Montres', 'Mode, Chaussures', '360°, Vidéos', 'Meubles, Électro'] },
                  ]}
                />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Détails par Machine</h3>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot Micro : Le Spécialiste Précision</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Précision extrême (macro intégré, netteté parfaite)</li>
                  <li className="text-future-dusk-600">Compact (gain de place showroom/atelier)</li>
                  <li className="text-future-dusk-600">Prix accessible (ROI 6-10 mois)</li>
                  <li className="text-future-dusk-600">Parfait bijoux/horlogerie (reflets contrôlés)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Taille limitée 30 cm (bloquant pour certains secteurs)</li>
                  <li className="text-future-dusk-600">360° nécessite module additionnel coûteux</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : Bijouterie haute horlogerie, Cosmétiques premium, Électronique petite taille, Optique et lunetterie.</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot G2 : Le Polyvalent Best-Seller</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Polyvalence maximale (80% produits e-commerce)</li>
                  <li className="text-future-dusk-600">Rapport qualité/prix imbattable</li>
                  <li className="text-future-dusk-600">Évolutif (modules 360°, vidéo)</li>
                  <li className="text-future-dusk-600">Rapidité (200-500 produits/jour)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">360° non natif (module en option)</li>
                  <li className="text-future-dusk-600">Encombrement 150×150 cm minimum</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : E-commerce mode et lifestyle, Chaussures et maroquinerie, Équipement sportif, Électronique grand public. <strong>Machine recommandée 90% des cas.</strong></p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot 360 : Le Premium Interactif</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Vues 360° natives (24-72 images)</li>
                  <li className="text-future-dusk-600">Vidéos produits automatisées</li>
                  <li className="text-future-dusk-600">Export 3D/CGI (modélisation)</li>
                  <li className="text-future-dusk-600">Compatible AR/VR (réalité augmentée)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Prix élevé (2× G2)</li>
                  <li className="text-future-dusk-600">Temps capture plus long</li>
                  <li className="text-future-dusk-600">Fichiers volumineux (gestion stockage)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : Catalogues interactifs premium, E-commerce AR/VR ready, Marketplaces exigeantes (Amazon 360), Formation technique (manuels 3D).</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot XXL : Le Géant Industriel</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Capacité très grands produits (jusqu'à 2 m)</li>
                  <li className="text-future-dusk-600">Motorisation charge lourde (150 kg)</li>
                  <li className="text-future-dusk-600">Éclairage haute puissance adapté</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Prix élevé (sur devis)</li>
                  <li className="text-future-dusk-600">Encombrement majeur (300×300 cm)</li>
                  <li className="text-future-dusk-600">Consommation électrique importante</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : Ameublement et décoration, Électroménager gros volume, Équipement industriel, Vélos et mobilité.</p>

                <hr className="my-8 border-neutral-200" />

                {/* ── Processus d'Achat ── */}
                <h2 id="processus-dachat-en-5-etapes" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Processus d'Achat en 5 Étapes
                </h2>
                <p className="mb-6 leading-relaxed text-future-dusk-600">
                  Suivez cette méthodologie éprouvée pour sécuriser votre achat et maximiser votre ROI.
                </p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 1 : Audit de Vos Besoins (1-2 Semaines)</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Questions clés à vous poser :</strong></p>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Volume</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Combien de produits à photographier par an ?</li>
                  <li className="text-future-dusk-600">Croissance prévue sur 3 ans ?</li>
                  <li className="text-future-dusk-600">Saisonnalité (pics de charge) ?</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Produits</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Taille min/max des produits ?</li>
                  <li className="text-future-dusk-600">Matières complexes (verre, métal, textile) ?</li>
                  <li className="text-future-dusk-600">Besoin vues 360° ou vidéos ?</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Budget</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Budget disponible (achat direct ou leasing) ?</li>
                  <li className="text-future-dusk-600">ROI attendu (délai retour acceptable) ?</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Équipe</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Opérateurs dédiés ou polyvalents ?</li>
                  <li className="text-future-dusk-600">Niveau technique actuel ?</li>
                  <li className="text-future-dusk-600">Formation nécessaire ?</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Outil recommandé</strong> :{' '}
                  <Link href={{ pathname: '/studios-photo-automatises', hash: 'calculateur-roi' }} className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Calculateur ROI gratuit
                  </Link>{' '}
                  — résultats instantanés, recommandation machine personnalisée, export PDF pour présentation direction.
                </p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 2 : Sélection Short-List (3-5 Jours)</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Réduisez à 2-3 machines candidates</strong> selon votre audit.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Exemple short-list e-commerce mode</strong> :</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>AlphaShot G2</strong> (choix principal) : Polyvalence, prix optimal</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot 360</strong> (alternative premium) : Si vues 360° prioritaires</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot Micro</strong> (fallback) : Si 90%+ produits &lt; 30 cm</li>
                </ol>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 3 : Démonstration Gratuite (1 Journée)</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Ne JAMAIS acheter sans tester.</strong> PackshotCreator propose des <strong>démos gratuites en conditions réelles</strong>.
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>2 options</strong> :</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Démo on-site chez vous</strong> : Nous venons avec la machine, test vos produits réels</li>
                  <li className="text-future-dusk-600"><strong>Démo showroom Paris</strong> : Visite showroom + test 5-10 produits</li>
                </ol>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Durée</strong> : 2-4h | <strong>Apportez</strong> : 5-10 produits représentatifs (faciles + complexes)</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce que vous validez</strong> :</p>
                <ul className="list-disc pl-6 mb-6 space-y-1">
                  <li className="text-future-dusk-600">Qualité rendu (netteté, couleurs, détourage)</li>
                  <li className="text-future-dusk-600">Vitesse réelle (temps par produit)</li>
                  <li className="text-future-dusk-600">Facilité d'utilisation (courbe apprentissage)</li>
                  <li className="text-future-dusk-600">Workflow complet (capture → export → intégration)</li>
                </ul>

                <div className="text-center my-8">
                  <Link
                    href="/contact"
                    className="inline-block bg-very-peri-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-very-peri-700 transition-colors shadow-lg"
                  >
                    Demander une Démo Gratuite →
                  </Link>
                </div>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 4 : Négociation & Commande (1 Semaine)</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Éléments à négocier :</strong></p>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Prix machine</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Prix public vs prix PackshotCreator distributeur officiel (-10-15%)</li>
                  <li className="text-future-dusk-600">Remises volume (si achat multiple machines)</li>
                  <li className="text-future-dusk-600">Bundle machine + formation (-5-10%)</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Services inclus</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Installation on-site (négociable selon distance)</li>
                  <li className="text-future-dusk-600">Formation avancée (upgrade niveau 2)</li>
                  <li className="text-future-dusk-600">Maintenance année 1 étendue</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Financement</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600"><strong>Leasing professionnel</strong> : 36-60 mois, taux 1,5-3%</li>
                  <li className="text-future-dusk-600"><strong>Crédit équipement</strong> : Selon banque et profil entreprise</li>
                  <li className="text-future-dusk-600"><strong>Paiement comptant</strong> : Remise négociable -3-5%</li>
                  <li className="text-future-dusk-600"><strong>Financement formation OPCO</strong> : 100% pris en charge si certifié Qualiopi</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Délai livraison</strong> : 4-8 semaines (stock FR ou import Pologne)</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 5 : Déploiement & Formation (1-2 Semaines)</h3>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Installation on-site (Jour 1-2)</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Livraison et déballage</li>
                  <li className="text-future-dusk-600">Installation et calibration</li>
                  <li className="text-future-dusk-600">Tests produits réels</li>
                  <li className="text-future-dusk-600">Validation workflow</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Formation équipes (Jour 3-4)</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Formation de base (incluse) : 2 jours</li>
                  <li className="text-future-dusk-600">Workflows par type de produits</li>
                  <li className="text-future-dusk-600">Best practices secteur</li>
                  <li className="text-future-dusk-600">Troubleshooting courant</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Suivi post-formation</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Support technique hotline (illimité pendant 3 mois)</li>
                  <li className="text-future-dusk-600">Session de suivi à distance (1 mois après installation)</li>
                  <li className="text-future-dusk-600">Accès formateur email (3 mois)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Go-Live</strong> : Début production réelle (Semaine 3)</p>

                <Callout type="success" title="Accompagnement garanti">
                  PackshotCreator vous accompagne jusqu'à l'autonomie complète de vos équipes. <strong>Satisfaction client 98%</strong> (enquête 2025 sur 150+ installations).
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* ── Erreurs ── */}
                <h2 id="erreurs-courantes-a-eviter" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Erreurs Courantes à Éviter
                </h2>
                <p className="mb-6 leading-relaxed text-future-dusk-600">Apprenez des erreurs des autres pour sécuriser votre investissement.</p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Erreur 1 : Sous-Estimer le Volume Futur</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Symptôme</strong> : Acheter un AlphaShot Micro alors que votre catalogue passera de 500 à 2 000 produits dans 18 mois.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Conséquence</strong> : Réinvestissement dans un G2 (perte sèche significative sur la machine initiale).</p>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : Anticiper la croissance sur <strong>3 ans minimum</strong>. En cas de doute, privilégier la machine supérieure (évolutivité).</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Erreur 2 : Ignorer l'Intégration IA</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Symptôme</strong> : Acheter un studio sans vérifier la compatibilité IA (certains concurrents Orbitvu ne sont PAS IA Ready).</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Conséquence</strong> : Workflows manuels en 2026-2027, perte compétitivité, réinvestissement forcé.</p>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : Exiger explicitement la <strong>compatibilité IA native</strong> (API BlendAI, exports automatisés).</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Erreur 3 : Oublier les Coûts Cachés</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Coûts souvent oubliés</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Maintenance annuelle (sur devis)</li>
                  <li className="text-future-dusk-600">Formation continue équipes (500 - 1 000€/an)</li>
                  <li className="text-future-dusk-600">Évolutions logicielles (gratuit Orbitvu, payant concurrents)</li>
                  <li className="text-future-dusk-600">Consommables et backgrounds (200€/an)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : Calculer le <strong>TCO (Total Cost of Ownership) sur 5 ans</strong>, pas seulement le prix d'achat.</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Erreur 4 : Ne Pas Tester Avant Achat</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Symptôme</strong> : Acheter sur catalogue sans démo, découvrir que le rendu ne correspond pas à vos attentes.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Conséquence</strong> : Déception, sous-utilisation, ROI dégradé.</p>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : <strong>TOUJOURS demander une démo gratuite</strong> avec vos produits réels.</p>

                <hr className="my-8 border-neutral-200" />

                {/* ── Financement ── */}
                <h2 id="financement-et-aides" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Financement et Aides
                </h2>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Leasing Professionnel</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Pas de sortie de trésorerie immédiate</li>
                  <li className="text-future-dusk-600">Loyers déductibles fiscalement</li>
                  <li className="text-future-dusk-600">Option rachat en fin de contrat (valeur symbolique)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Conditions</strong> : Durée 36-60 mois | Taux 1,5-3% | Apport 0-10%</p>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6 font-mono text-sm text-future-dusk-700">
                  <div>Machine : sur devis</div>
                  <div>Leasing 48 mois à 2% : mensualités lissées selon le montant financé</div>
                  <div>Économie photo : à estimer selon votre volume</div>
                  <div>Gain net : estimable avec le calculateur ROI</div>
                </div>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Crédit Équipement Bancaire</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Propriété immédiate machine</li>
                  <li className="text-future-dusk-600">Amortissement comptable sur 3-5 ans</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Inconvénients</strong> : Sortie trésorerie initiale (apport 20-30%) | Taux variables selon banque (2-5%)</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Aides OPCO pour Formation</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Les <strong>formations certifiées Qualiopi</strong> sont éligibles au financement OPCO (Opérateurs de Compétences). <strong>Prise en charge</strong> : 100% du coût formation (1 100 - 1 800€).
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Démarches</strong> :</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Identifier votre OPCO (selon secteur activité)</li>
                  <li className="text-future-dusk-600">Monter dossier (nous vous accompagnons)</li>
                  <li className="text-future-dusk-600">Validation OPCO (4-8 semaines)</li>
                  <li className="text-future-dusk-600">Formation réglée directement par OPCO</li>
                </ol>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Amortissement Comptable</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Durée recommandée</strong> : 3-5 ans (selon usage intensif ou modéré)</p>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6 font-mono text-sm text-future-dusk-700">
                  <div>Machine : sur devis</div>
                  <div>Amortissement 5 ans : montant annuel proportionnel au prix d'achat</div>
                  <div>Économie fiscale (IS 25%) : à calculer selon votre investissement</div>
                </div>

                <hr className="my-8 border-neutral-200" />

                {/* ── FAQ ── */}
                <section className="mt-16 pt-12 border-t border-neutral-200">
                  <h2 id="faq-achat-studios-photo" className="font-heading text-2xl font-bold text-future-dusk-900 mb-8 scroll-mt-24">
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

                {/* ── Conclusion ── */}
                <h2 id="conclusion-choisir-en-connaissance-de-cause" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Conclusion : Choisir en Connaissance de Cause
                </h2>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le choix d'un studio photo automatisé est une décision stratégique qui impactera votre production photo pendant 5-7 ans. Une méthodologie rigoureuse en 7 critères (taille, volume, visuels, budget, IA, évolutivité, support) vous permet de sélectionner la machine optimale et d'éviter les erreurs coûteuses.
                </p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Les 5 Clés de Décision</h3>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Anticipez 3 ans minimum</strong> : Dimensionnez selon vos besoins futurs, pas actuels</li>
                  <li className="text-future-dusk-600"><strong>Privilégiez l'évolutivité</strong> : Modules additionnels &gt; réinvestissement complet</li>
                  <li className="text-future-dusk-600"><strong>Exigez IA Ready</strong> : Workflow 2026 = Hardware + IA intégré</li>
                  <li className="text-future-dusk-600"><strong>TESTEZ avant achat</strong> : Démo gratuite avec vos produits réels obligatoire</li>
                  <li className="text-future-dusk-600"><strong>Calculez le TCO 5 ans</strong> : Coûts cachés (maintenance, formation) = 20-30% du budget</li>
                </ol>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Machine Recommandée 90% des Cas : AlphaShot G2</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pourquoi ?</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Polyvalence 80% produits e-commerce</li>
                  <li className="text-future-dusk-600">Rapport qualité/prix imbattable</li>
                  <li className="text-future-dusk-600">Évolutivité maximale (modules 360°, vidéo)</li>
                  <li className="text-future-dusk-600">ROI 4-8 mois si volume &gt; 1 000 produits/an</li>
                </ul>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Vos Prochaines Étapes</h3>
                <div className="flex flex-col sm:flex-row gap-4 my-8">
                  <Link
                    href={{ pathname: '/studios-photo-automatises', hash: 'calculateur-roi' }}
                    className="inline-block bg-very-peri-600 hover:bg-very-peri-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                  >
                    Calculer Mon ROI
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block border-2 border-very-peri-600 text-very-peri-600 hover:bg-very-peri-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                  >
                    Demander une Démo
                  </Link>
                  <Link
                    href="/studios-photo-automatises"
                    className="inline-block border-2 border-neutral-300 text-future-dusk-700 hover:bg-neutral-100 px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                  >
                    Voir Gamme Complète
                  </Link>
                </div>

                <hr className="my-8 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Ressources Complémentaires</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">
                    <strong>Calculateur ROI</strong> :{' '}
                    <Link href={{ pathname: '/studios-photo-automatises', hash: 'calculateur-roi' }} className="text-very-peri-600 hover:text-very-peri-700 underline">Estimez vos économies en 5 min</Link>
                  </li>
                  <li className="text-future-dusk-600">
                    <strong>Intégration IA</strong> :{' '}
                    <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Workflow Hardware + BlendAI</Link>
                  </li>
                  <li className="text-future-dusk-600">
                    <strong>Formations</strong> :{' '}
                    <Link href="/academy/formations-packshot" className="text-very-peri-600 hover:text-very-peri-700 underline">Maîtriser votre studio 2-3 jours</Link>
                  </li>
                  <li className="text-future-dusk-600">
                    <strong>Guide ROI</strong> :{' '}
                    <Link href={{ pathname: '/blog/[slug]', params: { slug: 'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet' } }} className="text-very-peri-600 hover:text-very-peri-700 underline">Méthode calcul ROI complète</Link>
                  </li>
                </ul>

            </div>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={tocHeadings} title="Sommaire" />
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ArticleCTA lang={lang} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. RELATED ARTICLES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <RelatedArticles
        currentSlug="guide-achat-studio-2026"
        category="Hardware & Studios"
        lang={lang}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: "Guide d'Achat Studio Photo Automatisé 2026 : Choisir le Bon Modèle Orbitvu",
          description: "Guide complet achat studio photo automatisé 2026. Comparatif modèles Orbitvu (Micro, G2, 360, XXL), critères choix, budget, ROI. Recommandations par secteur.",
          url: articleUrl,
          datePublished: '2026-01-22',
          author: 'Sébastien Jourdan',
          category: 'Hardware & Studios',
        }),
        faqSchema(faqItems),
      ]} />
    </>
  );
}
