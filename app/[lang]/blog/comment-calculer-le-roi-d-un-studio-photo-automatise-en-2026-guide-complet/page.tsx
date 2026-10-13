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
  const title = "Comment Calculer le ROI d'un Studio Photo Automatisé en 2026 : Guide Complet";
  const description = "Guide complet pour calculer le ROI de votre studio photo automatisé. Méthode en 8 facteurs, exemples concrets, calculateur gratuit. Délai de retour 12-18 mois.";
  const url = `https://www.packshot-creator.com/${lang}/blog/comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet`;

  return {
    title,
    description,
    keywords: 'calculer roi studio photo, retour investissement packshot, rentabilité studio automatisé, roi orbitvu, investissement studio photo',
    alternates: {
      canonical: url,
      languages: buildLanguages('/fr/blog/comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet'),
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
  { id: 'les-8-facteurs-determinants-du-roi', text: 'Les 8 Facteurs Déterminants du ROI', level: 2 },
  { id: 'couts-directs-linvestissement-initial', text: '1. Coûts Directs : L\'Investissement Initial', level: 3 },
  { id: 'couts-indirects-le-cout-reel', text: '2. Coûts Indirects : Le Coût Réel', level: 3 },
  { id: 'gains-de-productivite-lacceleration-mesurable', text: '3. Gains de Productivité', level: 3 },
  { id: 'gains-qualitatifs-au-dela-des-chiffres', text: '4. Gains Qualitatifs', level: 3 },
  { id: 'methodologie-de-calcul-la-formule-roi-complete', text: '5. Méthodologie de Calcul', level: 3 },
  { id: 'calculateur-roi-gratuit', text: '6. Calculateur ROI Gratuit', level: 3 },
  { id: 'facteurs-qualitatifs-limpact-strategique', text: '7. Facteurs Qualitatifs Stratégiques', level: 3 },
  { id: 'faq-roi-studios-photo', text: '8. Questions Fréquentes', level: 3 },
  { id: 'conclusion-investir-en-connaissance-de-cause', text: 'Conclusion', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'Quel est le délai de retour sur investissement d\'un studio photo automatisé ?',
    answer: 'Le délai moyen de retour sur investissement est de 12 à 18 mois pour un catalogue de 500 à 2 000 produits par an. Le ROI atteint 50 à 150 % dès la première année selon le volume et les coûts actuels.',
  },
  {
    question: 'Combien coûte un studio photo automatisé Orbitvu ?',
    answer: 'Le prix d\'un studio Orbitvu varie selon le modèle (AlphaShot Micro, G2, 360 ou XXL) et vos besoins spécifiques (taille des produits, volume, fonctionnalités souhaitées). Demandez un devis personnalisé ou utilisez notre calculateur ROI gratuit pour obtenir une estimation adaptée à votre activité.',
  },
  {
    question: 'Un studio automatisé est-il rentable pour de petits volumes ?',
    answer: 'Le seuil de rentabilité recommandé est de 500 produits par an minimum. En dessous, une solution combinant studio manuel et IA BlendAI peut être plus adaptée.',
  },
  {
    question: 'Quels sont les coûts cachés d\'un studio photo automatisé ?',
    answer: 'Les principaux coûts récurrents sont la maintenance (sur devis), la formation des nouveaux opérateurs (facturée séparément) et les consommables.',
  },
  {
    question: 'Comment financer l\'achat d\'un studio photo automatisé ?',
    answer: "Le leasing professionnel ou un crédit équipement sont possibles ; leurs conditions dépendent de l'organisme financeur. La formation est facturée séparément : Sysnext est certifiée Qualiopi, un financement OPCO est possible selon votre situation.",
  },
  {
    question: 'Quelle est la formule pour calculer le ROI d\'un studio photo ?',
    answer: 'ROI = ((Gains annuels − Coûts annuels) / Investissement initial) × 100. Les gains incluent les économies sur externalisation (30–150 €/photo) et le temps opérateur (gain de 80–90 % par produit).',
  },
  {
    question: 'Un studio Orbitvu est-il compatible avec l\'IA photo produit ?',
    answer: "Les packshots produits par un studio Orbitvu peuvent ensuite être traités par des outils d'IA (détourage, arrière-plans, mises en scène). Les intégrations possibles dépendent de vos outils : contactez-nous pour les vérifier.",
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function CalculerRoiStudioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const articleUrl = `https://www.packshot-creator.com/${lang}/blog/comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet`;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: "Calculer le ROI d'un Studio Photo", url: articleUrl },
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
        title="Comment Calculer le ROI d'un Studio Photo Automatisé en 2026 : Guide Complet"
        subtitle="Méthode en 8 facteurs, exemples concrets, calculateur gratuit. Délai de retour moyen : 12-18 mois."
      >
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-future-dusk-300">
          <span className="px-3 py-1 rounded-full bg-very-peri-500/20 text-very-peri-300 font-medium text-xs uppercase tracking-wide">
            Hardware & Studios
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            10 min de lecture
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
          src="/images/blog/thumbnail-article-nouveau-2.avif"
          alt="Calculer le ROI d'un studio photo automatisé"
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
                  L'acquisition d'un studio photo automatisé représente un investissement stratégique majeur pour toute entreprise e-commerce. Avec des budgets très variables selon le modèle et la configuration retenus, la décision ne peut être prise à la légère. Un ROI mal calculé peut conduire à choisir une machine inadaptée, sous-dimensionnée pour vos besoins futurs, ou au contraire surdimensionnée et sous-exploitée.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Dans ce guide complet, nous vous présentons une <strong>méthode en 8 facteurs</strong> pour calculer le retour sur investissement de votre futur studio photo automatisé. Que vous gériez 500 ou 10 000 références, cette approche vous permettra de prendre une décision éclairée et de justifier votre investissement auprès de votre direction financière.
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Section 1 */}
                <h2 id="les-8-facteurs-determinants-du-roi" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Les 8 Facteurs Déterminants du ROI
                </h2>

                <h3 id="couts-directs-linvestissement-initial" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  1. Coûts Directs : L'Investissement Initial
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le premier facteur à considérer est l'investissement initial complet, qui ne se limite pas au prix d'achat de la machine.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Prix Machine</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Les studios photo automatisés Orbitvu se déclinent en plusieurs gammes selon vos besoins :
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>AlphaShot Micro</strong> : Sur devis (petits objets : bijoux, montres, cosmétiques)</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot G2</strong> : Sur devis (e-commerce généraliste : chaussures, maroquinerie, textile)</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot 360</strong> : Sur devis (vues 360°, vidéos produits)</li>
                  <li className="text-future-dusk-600"><strong>AlphaShot XXL</strong> : Sur devis (grands produits : meubles, électroménager)</li>
                </ul>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Coûts d'Installation</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Au-delà du prix machine, prévoyez :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Livraison et installation sur site</strong> : facturées en supplément, sur devis</li>
                  <li className="text-future-dusk-600"><strong>Aménagement de l'espace</strong> : électricité, éclairage ambiant, mobilier</li>
                  <li className="text-future-dusk-600"><strong>Logiciels complémentaires</strong> : retouche, gestion catalogue</li>
                </ul>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Formation Équipes</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Un facteur souvent sous-estimé mais crucial pour optimiser votre ROI :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Essential Training</strong> (4 h, à distance) : prise en main du studio, facturée séparément</li>
                  <li className="text-future-dusk-600"><strong>Master Training</strong> (7 h, en présentiel) : maîtrise du studio, facturée séparément</li>
                  <li className="text-future-dusk-600"><strong>Financement</strong> : Sysnext est certifiée Qualiopi ; financement OPCO possible selon votre situation</li>
                </ul>

                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Investissement initial total moyen</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Entry-level (Micro)</strong> : Sur devis</li>
                  <li className="text-future-dusk-600"><strong>Mid-range (G2)</strong> : Sur devis</li>
                  <li className="text-future-dusk-600"><strong>Premium (360/XXL)</strong> : Sur devis</li>
                </ul>

                <hr className="my-8 border-neutral-200" />

                {/* Section 2 */}
                <h3 id="couts-indirects-le-cout-reel" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  2. Coûts Indirects : Le Coût Réel de Votre Production Actuelle
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Calculer le ROI nécessite de comprendre vos coûts actuels de production photo, souvent dispersés et sous-estimés.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Temps Opérateurs Actuel</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Mesurez le temps réel consacré à la production photo :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Temps de prise de vue</strong> : Combien de temps par produit (setup + shooting) ?</li>
                  <li className="text-future-dusk-600"><strong>Post-production</strong> : Détourage, retouche, ajustements colorimétriques ?</li>
                  <li className="text-future-dusk-600"><strong>Organisation fichiers</strong> : Nommage, archivage, export multi-formats ?</li>
                </ul>

                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Exemple concret</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Méthode manuelle : 15-30 min par produit (setup éclairage + 5 prises + retouche)</li>
                  <li className="text-future-dusk-600">Studio automatisé : 2-5 min par produit (chargement produit + déclenchement automatique)</li>
                  <li className="text-future-dusk-600"><strong>Gain de productivité : 80-90% du temps</strong></li>
                </ul>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Externalisation Actuelle</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Si vous externalisez tout ou partie de votre production photo :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Coût moyen prestataire</strong> : 30 - 150€ par photo selon qualité et secteur</li>
                  <li className="text-future-dusk-600"><strong>Délais</strong> : 5-15 jours entre livraison produits et réception visuels</li>
                  <li className="text-future-dusk-600"><strong>Qualité variable</strong> : Incohérences colorimétriques, respect de votre charte graphique</li>
                </ul>

                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Calcul annuel externalisation</strong> : 1 000 produits/an × 2 photos/produit × 50€/photo = <strong>100 000€/an</strong>
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Maintenance et Consommables</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">N'oubliez pas les coûts récurrents :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Maintenance studio automatisé</strong> : sur devis</li>
                  <li className="text-future-dusk-600"><strong>Consommables</strong> : électricité, fonds papier si besoin</li>
                </ul>


                <hr className="my-8 border-neutral-200" />

                {/* Section 3 */}
                <h3 id="gains-de-productivite-lacceleration-mesurable" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  3. Gains de Productivité : L'Accélération Mesurable
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le gain de productivité est le facteur ROI le plus immédiat et mesurable.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Volume Produits par Jour</h4>

                <ComparisonTable
                  headers={['Méthode Manuelle', 'Studio Automatisé']}
                  rows={[
                    { label: 'Produits simples/jour', values: ['20-30', '200-500'] },
                    { label: 'Produits complexes/jour', values: ['5-10', '50-100'] },
                    { label: 'Vues 360°/jour', values: ['2-5', '50-100'] },
                    { label: 'Temps setup/produit', values: ['10-15 min', '30 sec'] },
                  ]}
                />

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Temps Moyen par Produit</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Décomposition détaillée</strong> :</p>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Méthode manuelle (25 min total)</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Setup éclairage : 5 min</li>
                  <li className="text-future-dusk-600">Positionnement produit : 3 min</li>
                  <li className="text-future-dusk-600">Prises de vue : 4 min</li>
                  <li className="text-future-dusk-600">Transfert/backup : 2 min</li>
                  <li className="text-future-dusk-600">Détourage/retouche : 11 min</li>
                </ul>
                <p className="mb-2 leading-relaxed text-future-dusk-600"><strong>Studio automatisé (3 min total)</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Chargement produit : 30 sec</li>
                  <li className="text-future-dusk-600">Déclenchement automatique : 1 min</li>
                  <li className="text-future-dusk-600">Transfert automatique : 30 sec</li>
                  <li className="text-future-dusk-600">Détourage automatique : 1 min</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Économie de temps : 88% par produit</strong></p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Réduction Post-Production</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Les studios automatisés Orbitvu intègrent des fonctionnalités qui réduisent le besoin de retouche :
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Détourage automatique</strong></li>
                  <li className="text-future-dusk-600"><strong>Correction chromatique</strong> : balance des blancs automatique</li>
                  <li className="text-future-dusk-600"><strong>Nettoyage arrière-plan</strong> : fond blanc</li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>ROI post-production</strong> : Retouche manuelle 15€/photo × 1 000 photos = 15 000€/an. Retouche minimale IA (10% des photos) : 5€/photo × 100 photos = 500€/an. <strong>Économie : 14 500€/an</strong>.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir l'approche studio + IA
                  </Link>
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Section 4 */}
                <h3 id="gains-qualitatifs-au-dela-des-chiffres" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  4. Gains Qualitatifs : Au-Delà des Chiffres
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Certains bénéfices du studio automatisé ne se mesurent pas directement en euros.
                </p>


                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Cohérence Visuels et Image de Marque</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">L'homogénéité visuelle de votre catalogue renforce la perception qualité de votre marque :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Éclairage constant</strong> : rendu homogène sur le catalogue</li>
                  <li className="text-future-dusk-600"><strong>Cadrage uniforme</strong></li>
                  <li className="text-future-dusk-600"><strong>Colorimétrie maîtrisée</strong></li>
                </ul>


                <hr className="my-8 border-neutral-200" />

                <Callout type="info" title="Calculez Votre ROI Personnalisé">
                  Estimez le retour sur investissement de votre futur studio photo avec notre calculateur gratuit.{' '}
                  <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline font-semibold">
                    Lancer le calculateur gratuit →
                  </Link>
                </Callout>

                <hr className="my-8 border-neutral-200" />

                {/* Section 5 */}
                <h3 id="methodologie-de-calcul-la-formule-roi-complete" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  5. Méthodologie de Calcul : La Formule ROI Complète
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Maintenant que nous avons identifié les 8 facteurs, appliquons la formule ROI classique adaptée aux studios photo.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Formule ROI Classique</h4>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6 font-mono text-sm text-future-dusk-700">
                  ROI = ((Gains annuels - Coûts annuels) / Investissement initial) × 100
                </div>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Exemple Concret : E-commerce 2 000 Produits/An</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Situation actuelle (sans studio)</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">Externalisation shooting : 1 000 produits × 50€ = 50 000€/an</li>
                  <li className="text-future-dusk-600">2 opérateurs internes temps partiel photo : 40 000€/an</li>
                  <li className="text-future-dusk-600">Post-production freelance : 1 000 photos × 15€ = 15 000€/an</li>
                  <li className="text-future-dusk-600"><strong>Total coûts actuels : 105 000€/an</strong></li>
                </ul>
                <p className="mb-4 leading-relaxed text-future-dusk-600"><strong>Situation future (avec un studio automatisé)</strong> :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">
                    Investissement initial (machine + installation + formation) : variable selon le modèle retenu —{' '}
                    <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">
                      obtenez une estimation
                    </Link>
                  </li>
                  <li className="text-future-dusk-600">1 opérateur dédié studio : 35 000€/an</li>
                  <li className="text-future-dusk-600">Maintenance machine : 2 000€/an</li>
                  <li className="text-future-dusk-600">Post-production minimale (IA BlendAI) : 1 000€/an</li>
                  <li className="text-future-dusk-600"><strong>Total coûts annuels : 38 000€/an</strong></li>
                </ul>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6 font-mono text-sm text-future-dusk-700">
                  <div>Gains annuels = 105 000€ - 38 000€ = 67 000€</div>
                </div>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le ROI et le délai de retour exacts dépendent directement de l'investissement initial, lui-même variable selon le modèle retenu : utilisez le calculateur interactif pour obtenir ces deux indicateurs en temps réel à partir de vos données.
                </p>

                <Callout type="success" title="Une Économie Récurrente Significative">
                  Dans cet exemple, le studio génère une <strong>économie nette de 67 000€/an</strong> dès la première année d'exploitation. Le délai de retour et le ROI cumulé exacts varient selon le modèle choisi :{' '}
                  <Link href="/calculateur-roi" className="underline font-semibold">
                    calculez les vôtres gratuitement →
                  </Link>
                </Callout>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">ROI Pluriannuel (3 Ans)</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border border-neutral-200 rounded-xl overflow-hidden">
                    <thead className="bg-future-dusk-900 text-white">
                      <tr>
                        <th className="p-3 text-left font-heading font-semibold">Année</th>
                        <th className="p-3 text-left font-heading font-semibold">Investissement</th>
                        <th className="p-3 text-left font-heading font-semibold">Coûts Annuels</th>
                        <th className="p-3 text-left font-heading font-semibold">Gains</th>
                        <th className="p-3 text-left font-heading font-semibold">ROI Cumulé</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['An 0', 'Selon modèle*', '-', '-', '-100%'],
                        ['An 1', '-', '38 000€', '67 000€', 'Voir calculateur*'],
                        ['An 2', '-', '38 000€', '67 000€', 'Voir calculateur*'],
                        ['An 3', '-', '38 000€', '67 000€', 'Voir calculateur*'],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                          {row.map((cell, j) => (
                            <td key={j} className="p-3 text-future-dusk-600 border-t border-neutral-100">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mb-4 text-sm text-future-dusk-500 italic">
                  * Le montant de l'investissement et le ROI cumulé dépendent du modèle retenu et de votre volume.{' '}
                  <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Obtenez votre projection personnalisée
                  </Link>.
                </p>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <strong>Sur 3 ans</strong> : Économie nette de <strong>201 000€</strong>, pour un investissement initial qui varie selon le modèle choisi.
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Section 6 */}
                <h3 id="calculateur-roi-gratuit" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  6. Calculateur ROI Gratuit : Estimez Votre Retour
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Pour calculer votre ROI personnalisé, nous mettons à votre disposition un <strong>calculateur interactif gratuit</strong>.
                </p>

                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Le calculateur vous interroge sur votre volume et vos coûts de production actuels, puis établit une étude de retour sur investissement par machine. Un rapport PDF peut être obtenu après saisie de votre adresse e-mail.
                </p>


                <div className="text-center my-10">
                  <Link
                    href="/calculateur-roi"
                    className="inline-block bg-very-peri-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-very-peri-700 transition-colors shadow-lg"
                  >
                    Calculer Votre ROI Maintenant →
                  </Link>
                </div>

                <hr className="my-8 border-neutral-200" />

                {/* Section 7 */}
                <h3 id="facteurs-qualitatifs-limpact-strategique" className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3 scroll-mt-24">
                  7. Facteurs Qualitatifs : L'Impact Stratégique
                </h3>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Au-delà des chiffres purs, certains bénéfices stratégiques justifient l'investissement.
                </p>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Amélioration Workflow Équipes</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">L'automatisation libère vos équipes pour des tâches à plus forte valeur ajoutée :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Temps libéré</strong> : du temps réalloué à la stratégie de contenu et au merchandising</li>
                  <li className="text-future-dusk-600"><strong>Motivation équipes</strong> : Fin des tâches répétitives, montée en compétences techniques</li>
                </ul>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Scalabilité : Préparer la Croissance</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">Un studio automatisé bien dimensionné accompagne votre croissance :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Modularité</strong> : Ajout d'un second studio identique si besoin (workflow unifié)</li>
                </ul>

                <h4 className="font-heading text-lg font-semibold text-future-dusk-800 mt-6 mb-3">Flexibilité Multi-Produits</h4>
                <p className="mb-4 leading-relaxed text-future-dusk-600">La gamme Orbitvu couvre plusieurs types de produits, selon le modèle :</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>Packshots simples</strong> → <strong>Vues 360°</strong> → <strong>Vidéos</strong> (selon modèle)</li>
                </ul>

                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                    Découvrir l'approche studio + IA
                  </Link>
                </p>

                <hr className="my-8 border-neutral-200" />

                {/* Section 8 — FAQ */}
                <section className="mt-16 pt-12 border-t border-neutral-200">
                  <h2 id="faq-roi-studios-photo" className="font-heading text-2xl font-bold text-future-dusk-900 mb-8 scroll-mt-24">
                    8. Questions Fréquentes
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

                {/* Conclusion */}
                <h2 id="conclusion-investir-en-connaissance-de-cause" className="font-heading text-2xl font-bold text-future-dusk-900 mt-12 mb-4 scroll-mt-24">
                  Conclusion : Investir en Connaissance de Cause
                </h2>
                <p className="mb-4 leading-relaxed text-future-dusk-600">
                  Calculer le ROI d'un studio photo automatisé nécessite une <strong>approche holistique</strong> intégrant coûts directs, coûts indirects, gains de productivité et bénéfices qualitatifs. La formule classique ROI doit être complétée par une analyse des impacts stratégiques : cohérence visuelle, time-to-market, scalabilité, intégration IA.
                </p>

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Les Points Clés à Retenir</h3>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600"><strong>ROI moyen 12-18 mois</strong> pour catalogues 500+ produits/an</li>
                  <li className="text-future-dusk-600"><strong>Économie 50-80%</strong> des coûts photo sur 3 ans</li>
                  <li className="text-future-dusk-600"><strong>Productivité ×5-10</strong> (de 25 min à 3 min par produit)</li>
                </ol>

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
                    href={{ pathname: '/blog/[slug]', params: { slug: 'guide-achat-studio-2026' } }}
                    className="inline-block border-2 border-neutral-300 text-future-dusk-700 hover:bg-neutral-100 px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                  >
                    Guide d'Achat 2026
                  </Link>
                </div>

                <hr className="my-8 border-neutral-200" />

                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 my-8">
                  <h4 className="text-xl font-heading font-bold text-emerald-800 mb-4 text-center">
                    Formations aux studios photo Orbitvu
                  </h4>
                  <p className="text-emerald-700 mb-6 text-center max-w-2xl mx-auto">
                    Essential Training (distanciel) et Master Training (présentiel) : deux formations pour prendre en main et maîtriser votre studio Orbitvu.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/academy"
                      locale="fr"
                      className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-center"
                    >
                      Découvrir nos formations
                    </Link>
                  </div>
                </div>

                <hr className="my-8 border-neutral-200" />

                <h3 className="font-heading text-xl font-semibold text-future-dusk-800 mt-8 mb-3">Ressources Complémentaires</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li className="text-future-dusk-600">
                    <strong>Studios Photo Automatisés</strong> :{' '}
                    <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">Gamme complète Orbitvu</Link>
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
                    <strong>Guide d'Achat</strong> :{' '}
                    <Link href={{ pathname: '/blog/[slug]', params: { slug: 'guide-achat-studio-2026' } }} className="text-very-peri-600 hover:text-very-peri-700 underline">Choisir le bon studio 2026</Link>
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
        currentSlug="comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet"
        category="Hardware & Studios"
        lang={lang}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: "Comment Calculer le ROI d'un Studio Photo Automatisé en 2026 : Guide Complet",
          description: "Guide complet pour calculer le ROI de votre studio photo automatisé. Méthode en 8 facteurs, exemples concrets, calculateur gratuit. Délai de retour 12-18 mois.",
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
