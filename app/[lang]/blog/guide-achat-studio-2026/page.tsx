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
    answer: "Le délai de livraison est actuellement d'environ 12 jours, à titre indicatif et sans garantie. La durée d'installation dépend du système et de la configuration. La livraison et l'installation sont facturées en supplément ; la formation est facturée séparément.",
  },
  {
    question: "Quelle garantie est incluse avec un studio Orbitvu ?",
    answer: "La garantie standard est d'un an ; une extension est possible.",
  },
  {
    question: "Peut-on louer un studio Orbitvu plutôt que l'acheter ?",
    answer: "Le leasing professionnel est une alternative à l'achat comptant. Sa durée et ses conditions dépendent de l'organisme financeur : contactez-nous pour en discuter.",
  },
  {
    question: "Est-il risqué d'acheter un Orbitvu d'occasion ?",
    answer: "Un achat d'occasion demande de vérifier l'état de la machine, la garantie éventuellement restante et la version de son logiciel. Consultez PackshotCreator avant de vous engager.",
  },
  {
    question: "Quel modèle Orbitvu convient le mieux pour la majorité des e-commerçants ?",
    answer: "L'AlphaShot G2 convient à de nombreux e-commerçants : il couvre les produits jusqu'à 100 cm et s'adapte à la mode, à la chaussure et à l'électronique. Son retour sur investissement se situe généralement entre 6 et 12 mois selon le volume, sans garantie.",
  },
  {
    question: "Comment financer l'achat d'un studio photo automatisé ?",
    answer: "Le leasing professionnel ou un crédit équipement sont possibles ; leurs conditions dépendent de l'organisme financeur. Pour la formation, facturée séparément, Sysnext est certifiée Qualiopi : un financement OPCO est possible selon votre situation.",
  },
  {
    question: "Un studio Orbitvu peut-il évoluer avec les besoins futurs ?",
    answer: "Des modules additionnels (360°, vidéo) existent selon les modèles, sur devis. Vérifiez avec nous les options d'évolution de votre modèle avant l'achat.",
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
        subtitle="7 critères objectifs, comparatif Micro / G2 / 360 / XXL, erreurs à éviter, financement. Une méthode pour faire le bon choix."
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
                  Le marché des studios photo automatisés a considérablement évolué ces dernières années. Avec de nombreux modèles disponibles en 2026, aux budgets très variables selon la taille des produits et le niveau d'automatisation, choisir le bon équipement peut rapidement devenir complexe. Une décision mal informée peut vous coûter des dizaines de milliers d'euros en sur-investissement ou, pire encore, en sous-performance chronique.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Ce guide d'achat complet vous présente une <strong>méthodologie en 7 critères objectifs</strong> pour sélectionner le studio photo automatisé adapté à vos besoins actuels et futurs. Que vous photographiiez des bijoux, des chaussures ou des meubles, que vous gériez 500 ou 10 000 références par an, ce guide vous donnera les clés pour faire le bon choix et maximiser votre retour sur investissement.
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
                  <li className="text-future-dusk-600">Adapté aux petits objets</li>
                  <li className="text-future-dusk-600">Compact (80×80 cm au sol)</li>
                  <li className="text-future-dusk-600">Éclairage optimisé petits objets</li>
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
                  <li className="text-future-dusk-600">Polyvalence</li>
                  <li className="text-future-dusk-600">Évolutivité (modules 360°, vidéo)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Limites</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">360° nécessite module additionnel (sur devis)</li>
                  <li className="text-future-dusk-600">Encombrement 150×150 cm au sol</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Pour qui ?</strong> E-commerce généralistes, pure players mode/lifestyle, retailers multi-catégories.
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
                  <li className="text-future-dusk-600">Prix sur devis</li>
                  <li className="text-future-dusk-600">Encombrement important (300×300 cm minimum)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Pour qui ?</strong> Enseignes ameublement, électroménager, équipementiers industriels.</p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Vues 360° et Vidéos : AlphaShot 360</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Produits concernés</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Tous secteurs nécessitant vues interactives</li>
                  <li className="text-future-dusk-600">Catalogues interactifs premium</li>
                  <li className="text-future-dusk-600">Marketplaces acceptant les vues 360°</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Dimensions utiles</strong> : 100×80×80 cm — <strong>Prix</strong> : sur devis</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Vues 360°</li>
                  <li className="text-future-dusk-600">Vidéos produit automatisées</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Limites</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">Temps capture plus long (2-5 min vs 1-2 min)</li>
                  <li className="text-future-dusk-600">Fichiers volumineux</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Pour qui ?</strong> Marques premium, catalogues interactifs.
                </p>

                <Callout type="info" title="Évolutivité G2 → 360">
                  Si vous hésitez entre G2 et 360, envisagez le <strong>G2</strong>, avec un module 360° ajouté plus tard si le besoin se confirme (sur devis).
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 2 */}
                <h3 id="volume-production-dimensionner-la-capacite" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  2. Volume Production : Dimensionner la Capacité
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le volume annuel de produits à photographier détermine la <strong>rentabilité</strong> de votre investissement et le <strong>modèle adapté</strong>.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">&lt; 500 Produits/An : Studio Manuel Recommandé</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Calcul ROI</strong> :</p>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4 font-mono text-sm text-future-dusk-700">
                  <div>Coût studio automatisé : sur devis</div>
                  <div>Économie vs externe : variable selon votre volume (estimation avec le calculateur ROI)</div>
                </div>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Alternative</strong> : studio manuel (fond, éclairage, appareil), complété par un outil d'IA pour le détourage et la retouche. <strong>Pour qui ?</strong> Créateurs, TPE e-commerce &lt; 500 références.
                </p>

                <hr className="my-8 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">500-2 000 Produits/An : AlphaShot Micro ou G2</h4>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4 font-mono text-sm text-future-dusk-700">
                  <div>1 000 produits/an : économie à estimer avec le calculateur ROI</div>
                  <div>Investissement G2 : sur devis</div>
                  <div>Délai retour : généralement 6 à 12 mois selon le volume, sans garantie</div>
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
                  <div>5 000 produits/an : économie à estimer avec le calculateur ROI</div>
                  <div>Investissement G2 ou 360 : sur devis</div>
                  <div>Délai retour : généralement 6 à 12 mois selon le volume, sans garantie</div>
                </div>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Machine recommandée</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>G2</strong> si packshots simples suffisent</li>
                  <li className="text-future-dusk-600"><strong>360</strong> si vues interactives requises</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Organisation</strong> : 1 opérateur dédié ; intégration PIM/DAM à étudier selon vos outils.
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
                  <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">
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
                  <li className="text-future-dusk-600">Prix sur devis</li>
                  <li className="text-future-dusk-600">Détourage automatique intégré</li>
                </ul>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Vues 360° Interactives : AlphaShot 360</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Use cases</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Catalogues interactifs premium</li>
                  <li className="text-future-dusk-600">Marketplaces acceptant les vues 360°</li>
                  <li className="text-future-dusk-600">Applications mobiles (rotation tactile)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Output</strong> : séquences d'images à 360°.</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Vidéos Produits : AlphaShot 360 + Module Vidéo</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Use cases</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Démos produits techniques</li>
                  <li className="text-future-dusk-600">Landing pages publicitaires</li>
                  <li className="text-future-dusk-600">Réseaux sociaux (Instagram, TikTok, YouTube Shorts)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Output</strong> : vidéos produit (rotation, zoom).</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages vidéo</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600">SEO YouTube (référencement Google)</li>
                  <li className="text-future-dusk-600">Viralité réseaux sociaux</li>
                </ul>

                <hr className="my-6 border-neutral-200" />

                <ComparisonTable
                  headers={['Packshot Simple', 'Vue 360°', 'Vidéo']}
                  rows={[
                    { label: 'Machine', values: ['G2', '360', '360 + Module'] },
                    { label: 'Prix', values: ['Sur devis', 'Sur devis', 'Sur devis'] },
                    { label: 'Temps/produit', values: ['1-2 min', '3-5 min', '4-6 min'] },
                    { label: 'Use case principal', values: ['E-commerce', 'Premium', 'Social Media'] },
                  ]}
                />

                <hr className="my-8 border-neutral-200" />

                <Callout type="info" title="Calculez Votre ROI Personnalisé">
                  Avant d'investir, estimez le retour sur investissement selon vos volumes et besoins. Notre calculateur établit une étude par machine.{' '}
                  <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline font-semibold">
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
                  <li className="text-future-dusk-600">Logiciel de pilotage Orbitvu</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce qui n'est PAS inclus</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Livraison et installation on-site (facturées en supplément)</li>
                  <li className="text-future-dusk-600">Formation (Essential ou Master, facturée séparément)</li>
                  <li className="text-future-dusk-600">Maintenance (sur devis)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Financement</strong> : leasing ou crédit équipement, sur devis</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Mid-Range : AlphaShot G2</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce que vous obtenez</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine polyvalente</li>
                  <li className="text-future-dusk-600">Évolutivité (modules 360°, vidéo)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Budget complet recommandé</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine : sur devis</li>
                  <li className="text-future-dusk-600">Installation : sur devis</li>
                  <li className="text-future-dusk-600">Formation : selon le format choisi (Essential ou Master)</li>
                  <li className="text-future-dusk-600"><strong>Total : sur devis</strong></li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Financement</strong> : leasing ou crédit équipement, sur devis<br />
                  <strong>ROI</strong> : généralement 6 à 12 mois selon le volume, sans garantie
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Premium : AlphaShot 360 ou XXL</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Ce que vous obtenez</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machines pour produits volumineux et vues 360°</li>
                  <li className="text-future-dusk-600">Capacités 360° et vidéo</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Budget complet recommandé</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Machine 360 : sur devis</li>
                  <li className="text-future-dusk-600">Installation complexe : sur devis</li>
                  <li className="text-future-dusk-600">Formation : selon le format choisi (Essential ou Master)</li>
                  <li className="text-future-dusk-600"><strong>Total : sur devis</strong></li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Financement</strong> : leasing ou crédit équipement, sur devis<br />
                  <strong>ROI</strong> : généralement 6 à 12 mois selon le volume, sans garantie. Pour les plus grands Alphastudio, le retour observé peut plutôt se situer entre 12 et 18 mois.
                </p>

                <Callout type="warning" title="Attention au sous-dimensionnement">
                  Économiser sur une machine sous-dimensionnée peut vous coûter <strong>très cher en opportunités perdues</strong> (produits non shootables, workflows limités, réinvestissement anticipé).
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 5 */}
                <h3 id="integration-ia-preparer-le-workflow-2026" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  5. Intégration IA : Préparer le Workflow 2026
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Les packshots produits par un studio automatisé peuvent ensuite être traités par des outils d'IA : détourage, arrière-plans, mises en scène. Avant l'achat, vérifiez avec nous les formats d'export et les intégrations possibles avec vos outils (IA, PIM, DAM).
                </p>

                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir l'approche studio + IA
                  </Link>
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 6 */}
                <h3 id="evolutivite-anticiper-vos-besoins-futurs" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  6. Évolutivité : Anticiper Vos Besoins Futurs
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Un studio photo est un investissement de long terme. L'évolutivité est un critère majeur pour éviter un réinvestissement prématuré.
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
                  <li className="text-future-dusk-600"><strong>Plateau motorisé multi-axes</strong> (sur devis) : Rotations complexes</li>
                  <li className="text-future-dusk-600"><strong>Éclairage additionnel</strong> (sur devis)</li>
                </ul>

                <hr className="my-6 border-neutral-200" />


                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Scalabilité : Ajout de Machines</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Si votre volume explose, vous pouvez <strong>dupliquer votre workflow</strong> — scénario passage de 2 000 à 10 000 produits/an : achat 2e AlphaShot G2 identique.
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Avantages</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Formation identique (opérateurs interchangeables)</li>
                  <li className="text-future-dusk-600">Workflows dupliqués (aucune adaptation)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Coût</strong> : sur devis
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Critère 7 */}
                <h3 id="support-et-formation-le-facteur-humain" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  7. Support & Formation : Le Facteur Humain
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Un studio photo automatisé n'est performant que si vos équipes le maîtrisent. Le support technique et la formation comptent donc dans le choix.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Formation : deux formats, facturés séparément</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  La formation n&apos;est pas incluse dans l&apos;achat du studio : elle est facturée séparément. Deux formations aux studios Orbitvu sont proposées : <strong>Essential Training</strong> (4 h, à distance) pour la prise en main, et <strong>Master Training</strong> (7 h, en présentiel) pour la maîtrise du studio. Sysnext est certifiée Qualiopi : un financement OPCO est possible selon votre situation.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href="/academy" locale="fr" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir les formations Orbitvu
                  </Link>
                </p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Support Technique France</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>PackshotCreator = Distributeur officiel Orbitvu France/Suisse</strong>
                </p>

                <Callout type="success" title="Garantie">
                  Toutes les machines Orbitvu bénéficient d'une <strong>garantie standard d'un an</strong>. Une extension est possible.
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
                    { label: 'Idéal pour', values: ['Bijoux, Montres', 'Mode, Chaussures', '360°, Vidéos', 'Meubles, Électro'] },
                  ]}
                />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Détails par Machine</h3>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot Micro : Le Spécialiste Précision</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Adapté aux petits objets</li>
                  <li className="text-future-dusk-600">Compact (gain de place showroom/atelier)</li>
                  <li className="text-future-dusk-600">Adapté aux bijoux et à l'horlogerie</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Taille limitée 30 cm (bloquant pour certains secteurs)</li>
                  <li className="text-future-dusk-600">360° : module additionnel (sur devis)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : Bijouterie haute horlogerie, Cosmétiques premium, Électronique petite taille, Optique et lunetterie.</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot G2 : Le Polyvalent</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Polyvalence (mode, chaussures, électronique)</li>
                  <li className="text-future-dusk-600">Évolutif (modules 360°, vidéo)</li>
                  <li className="text-future-dusk-600">Rapidité (200-500 produits/jour)</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">360° non natif (module en option)</li>
                  <li className="text-future-dusk-600">Encombrement 150×150 cm minimum</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : E-commerce mode et lifestyle, Chaussures et maroquinerie, Équipement sportif, Électronique grand public.</p>

                <hr className="my-6 border-neutral-200" />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">AlphaShot 360 : Le Premium Interactif</h4>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points forts</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Vues 360°</li>
                  <li className="text-future-dusk-600">Vidéos produits automatisées</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Points faibles</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Temps capture plus long</li>
                  <li className="text-future-dusk-600">Fichiers volumineux (gestion stockage)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : Catalogues interactifs, marketplaces acceptant les vues 360°.</p>

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
                  <li className="text-future-dusk-600">Prix sur devis</li>
                  <li className="text-future-dusk-600">Encombrement majeur (300×300 cm)</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Cas d'usage</strong> : Ameublement et décoration, Électroménager gros volume, Équipement industriel, Vélos et mobilité.</p>

                <hr className="my-8 border-neutral-200" />

                {/* ── Processus d'Achat ── */}
                <h2 id="processus-dachat-en-5-etapes" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Processus d'Achat en 5 Étapes
                </h2>
                <p className="mb-6 leading-relaxed text-future-dusk-600">
                  Suivez ces étapes pour sécuriser votre achat.
                </p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 1 : Audit de Vos Besoins</h3>
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
                  <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Calculateur ROI gratuit
                  </Link>{' '}
                  — étude de retour sur investissement selon vos volumes.
                </p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 2 : Sélection Short-List</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Réduisez à 2-3 machines candidates</strong> selon votre audit.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Exemple short-list e-commerce mode</strong> :</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>AlphaShot G2</strong> (choix principal) : polyvalence</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot 360</strong> (alternative premium) : Si vues 360° prioritaires</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot Micro</strong> (fallback) : Si 90%+ produits &lt; 30 cm</li>
                </ol>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 3 : Démonstration</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Testez avant d'acheter.</strong> PackshotCreator propose des <strong>démonstrations sur vos produits</strong>.
                </p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Où</strong> :</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Démo au showroom près de Lyon</strong> : visite et test de vos produits ; autres modalités à convenir avec nous</li>
                </ol>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Apportez</strong> : des produits représentatifs (faciles et complexes)</p>
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
                    Demander une démonstration →
                  </Link>
                </div>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 4 : Commande</h3>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Financement</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li className="text-future-dusk-600"><strong>Leasing professionnel</strong> : conditions selon l'organisme financeur</li>
                  <li className="text-future-dusk-600"><strong>Crédit équipement</strong> : Selon banque et profil entreprise</li>
                  <li className="text-future-dusk-600"><strong>Financement de la formation</strong> : Sysnext est certifiée Qualiopi ; financement OPCO possible selon votre situation</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Délai de livraison</strong> : environ 12 jours actuellement, à titre indicatif et sans garantie</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Étape 5 : Déploiement & Formation</h3>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Installation sur site (facturée en supplément)</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Livraison et déballage</li>
                  <li className="text-future-dusk-600">Installation et calibration</li>
                  <li className="text-future-dusk-600">Tests produits réels</li>
                  <li className="text-future-dusk-600">Validation workflow</li>
                </ul>
                <p className="mb-1 leading-relaxed text-future-dusk-600"><strong>Formation des équipes (facturée séparément)</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Essential Training (4 h, à distance) ou Master Training (7 h, en présentiel)</li>
                </ul>


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
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Symptôme</strong> : acheter un studio sans vérifier comment ses images s'intègrent à vos outils (IA, PIM, DAM).</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Conséquence</strong> : transferts et retouches manuels.</p>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : vérifier avant l'achat les <strong>formats d'export et les intégrations</strong> disponibles avec vos outils.</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Erreur 3 : Oublier les Coûts Cachés</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Coûts souvent oubliés</strong> :</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li className="text-future-dusk-600">Maintenance annuelle (sur devis)</li>
                  <li className="text-future-dusk-600">Formation des nouveaux opérateurs (facturée séparément)</li>
                  <li className="text-future-dusk-600">Évolutions logicielles</li>
                  <li className="text-future-dusk-600">Consommables et fonds</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : Calculer le <strong>TCO (Total Cost of Ownership) sur 5 ans</strong>, pas seulement le prix d'achat.</p>

                <hr className="my-6 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Erreur 4 : Ne Pas Tester Avant Achat</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Symptôme</strong> : Acheter sur catalogue sans démo, découvrir que le rendu ne correspond pas à vos attentes.</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Conséquence</strong> : Déception, sous-utilisation, ROI dégradé.</p>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Solution</strong> : <strong>demander une démonstration</strong> avec vos produits réels.</p>

                <hr className="my-8 border-neutral-200" />

                {/* ── Financement ── */}
                <h2 id="financement-et-aides" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Financement et Aides
                </h2>

                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  L'achat du studio peut être financé par un leasing professionnel ou par un crédit équipement. Durée, taux et apport dépendent de l'organisme financeur.
                </p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Financement de la Formation</h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  La formation est facturée séparément. Sysnext est certifiée Qualiopi : un financement OPCO est possible selon votre situation.
                </p>


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
                  Le choix d'un studio photo automatisé est une décision stratégique qui engage votre production photo sur plusieurs années. Une méthodologie rigoureuse en 7 critères (taille, volume, visuels, budget, IA, évolutivité, support) vous aide à sélectionner la machine adaptée et à éviter les erreurs coûteuses.
                </p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Les 5 Clés de Décision</h3>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Anticipez 3 ans minimum</strong> : Dimensionnez selon vos besoins futurs, pas actuels</li>
                  <li className="text-future-dusk-600"><strong>Privilégiez l'évolutivité</strong> : Modules additionnels &gt; réinvestissement complet</li>
                  <li className="text-future-dusk-600"><strong>Vérifiez les intégrations</strong> : formats d'export et outils (IA, PIM, DAM)</li>
                  <li className="text-future-dusk-600"><strong>Testez avant l'achat</strong> : démonstration avec vos produits réels</li>
                  <li className="text-future-dusk-600"><strong>Calculez le TCO sur 5 ans</strong> : intégrez maintenance, formation et consommables</li>
                </ol>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Machine Polyvalente : AlphaShot G2</h3>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Pourquoi ?</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Polyvalence (mode, chaussures, électronique)</li>
                  <li className="text-future-dusk-600">Évolutivité (modules 360°, vidéo, sur devis)</li>
                  <li className="text-future-dusk-600">ROI généralement de 6 à 12 mois selon le volume, sans garantie</li>
                </ul>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Vos Prochaines Étapes</h3>
                <div className="flex flex-col sm:flex-row gap-4 my-8">
                  <Link
                    href="/calculateur-roi"
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
                    <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">Estimez vos économies</Link>
                  </li>
                  <li className="text-future-dusk-600">
                    <strong>Intégration IA</strong> :{' '}
                    <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">Approche studio + IA</Link>
                  </li>
                  <li className="text-future-dusk-600">
                    <strong>Formations</strong> :{' '}
                    <Link href="/academy" locale="fr" className="text-very-peri-600 hover:text-very-peri-700 underline">Nos formations aux studios Orbitvu</Link>
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
