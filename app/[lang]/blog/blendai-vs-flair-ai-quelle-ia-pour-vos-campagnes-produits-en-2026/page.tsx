import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { TableOfContents, ArticleCTA, RelatedArticles } from '@/components/blog';
import { buildLanguages } from '@/lib/hreflang';

/* ─────────────────────────── Metadata ─────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = 'BlendAI vs Flair.ai : Quelle IA pour Vos Campagnes Produits en 2026 ?';
  const description = "BlendAI ou Flair.ai : les critères pour choisir un outil d'IA de visuels produits selon votre usage, catalogue e-commerce ou campagnes marketing, en 2026.";

  return {
    title,
    description,
    keywords: 'blendai vs flair, ia photo produit, flair ai, campagnes visuelles, lifestyle generator',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`,
      languages: buildLanguages('/fr/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026'),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`,
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

/* ─────────────────────────── TOC ─────────────────────────── */

const headings = [
  { id: '1-blendai-vs-flairai-positionnements-radicalement-differents', text: '1. Deux Usages Différents', level: 2 },
  { id: 'blendai-lia-specialisee-e-commerce-catalogues', text: 'BlendAI : les Visuels Catalogue', level: 3 },
  { id: 'flairai-lia-creative-pour-campagnes-marketing', text: 'Flair.ai', level: 3 },
  { id: 'la-difference-fondamentale', text: 'Les Critères à Comparer', level: 3 },
  { id: '2-comparaison-fonctionnalites-4-criteres-critiques', text: '2. Tester sur Vos Produits', level: 2 },
  { id: '4-cas-dusage-quand-choisir-blendai-vs-flairai', text: '3. Cas d\'Usage', level: 2 },
  { id: 'quand-choisir-blendai', text: 'Production Régulière de Visuels Catalogue', level: 3 },
  { id: 'quand-choisir-flairai', text: 'Campagnes Ponctuelles', level: 3 },
  { id: 'approche-complementaire-blendai-catalogue-flairai-campagnes', text: 'Approche Complémentaire', level: 3 },
  { id: '5-approche-hybride-packshotcreator-hardware-ia-roi-maximal', text: '4. Approche PackshotCreator', level: 2 },
  { id: '6-faq-comparatif-blendai-vs-flairai', text: '5. FAQ BlendAI et Flair.ai', level: 2 },
  { id: 'conclusion-choisir-en-fonction-de-votre-besoin-reel', text: 'Conclusion', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'Peut-on utiliser BlendAI ET Flair.ai simultanément ?',
    answer: 'Les deux outils peuvent servir des usages distincts : l\'un pour le catalogue, l\'autre pour les campagnes. Vérifiez alors les coûts cumulés et les conditions d\'usage de chaque outil.',
  },
  {
    question: 'Flair.ai peut-il remplacer BlendAI pour catalogues ?',
    answer: 'Cela dépend de vos exigences de fidélité, de cohérence, de volume et d\'intégration. Nous ne détaillons pas les fonctionnalités de Flair.ai, faute de source vérifiée : testez les outils sur un échantillon de vos produits.',
  },
  {
    question: 'BlendAI peut-il faire des visuels créatifs comme Flair ?',
    answer: 'Les possibilités de mise en scène de BlendAI se vérifient sur vos propres produits, lors d\'une démonstration.',
  },
  {
    question: 'Quel est le prix exact de BlendAI ?',
    answer: 'BlendAI est proposé sur devis, selon votre volume. Contactez-nous pour un devis personnalisé.',
  },
  {
    question: 'Flair.ai a-t-il une API pour automatisation ?',
    answer: 'Nous ne détaillons pas l\'offre de Flair.ai, faute de source vérifiée : reportez-vous à la documentation de l\'éditeur. Pour BlendAI, les possibilités d\'intégration se vérifient avec nous selon vos outils.',
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function BlendaiVsFlairPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: 'BlendAI vs Flair.ai', url: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026` },
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
          label: 'IA & Technologie',
          colorClass: 'bg-very-peri-500/15 text-very-peri-300',
        }}
        title="BlendAI vs Flair.ai : Quelle IA pour Vos Campagnes Produits en 2026 ?"
        subtitle="BlendAI ou Flair.ai : les critères pour choisir un outil d'IA de visuels produits selon votre usage, catalogue e-commerce ou campagnes marketing, en 2026."
      >
        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-future-dusk-300">
          <span className="px-3 py-1 rounded-full bg-very-peri-500/20 text-very-peri-300 font-medium text-xs uppercase tracking-wide">
            IA & Technologie
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
          src="/images/blog/blendai-vs-flair-cover.jpg"
          alt="Comparatif BlendAI vs Flair.ai pour la photo produit"
          className="w-full rounded-2xl shadow-lg"
          width={1344}
          height={768}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. ARTICLE BODY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:flex lg:gap-12">

          {/* TOC sidebar */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-24">
              <TableOfContents headings={headings} title="Sommaire" />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

              {/* Intro */}
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <strong>BlendAI</strong> et <strong>Flair.ai</strong> sont deux outils d'IA appliqués aux visuels produits. Le choix entre eux dépend d'abord de votre usage : production régulière de visuels pour un catalogue e-commerce, ou création ponctuelle de visuels de campagne.
              </p>
              <p className="mb-8 leading-relaxed text-future-dusk-600">
                Ce guide ne publie ni caractéristique, ni tarif, ni performance de Flair.ai sans source vérifiée, et ne reprend pour BlendAI aucun chiffre de performance non vérifié. Il propose les critères à examiner et la méthode pour comparer les deux outils sur vos propres produits.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 1 */}
              <h2 id="1-blendai-vs-flairai-positionnements-radicalement-differents" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                1. Deux Usages Différents
              </h2>

              <h3 id="blendai-lia-specialisee-e-commerce-catalogues" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                BlendAI : les Visuels Catalogue
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Sur ce site, <strong>BlendAI</strong> est présenté pour la déclinaison de packshots en visuels e-commerce (arrière-plans, mises en scène) destinés aux fiches produits. Ses capacités, ses intégrations et son tarif, sur devis, se vérifient avec nous sur vos propres produits.
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Découvrir BlendAI et l'IA photo produit
                </Link>
              </p>

              <hr className="my-8 border-neutral-200" />

              <h3 id="flairai-lia-creative-pour-campagnes-marketing" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Flair.ai
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Nous ne détaillons pas ici les fonctionnalités, les limites ni les tarifs de <strong>Flair.ai</strong> : faute de source vérifiée, reportez-vous directement à l'éditeur.
              </p>

              <hr className="my-8 border-neutral-200" />

              <h3 id="la-difference-fondamentale" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Les Critères à Comparer
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600"><strong>Fidélité au produit source :</strong> couleurs, textures, proportions, à contrôler sur vos propres produits</li>
                <li className="text-future-dusk-600"><strong>Cohérence d'une série :</strong> même rendu d'un produit à l'autre</li>
                <li className="text-future-dusk-600"><strong>Volume :</strong> nombre de visuels à produire et possibilité de traitement par lots</li>
                <li className="text-future-dusk-600"><strong>Intégration :</strong> export et connexion à vos outils (PIM, DAM, CMS)</li>
                <li className="text-future-dusk-600"><strong>Coût :</strong> selon votre volume et la formule retenue</li>
                <li className="text-future-dusk-600"><strong>Conditions d'usage :</strong> droits sur les visuels générés</li>
              </ul>

              <hr className="my-8 border-neutral-200" />

              {/* Section 2 */}
              <h2 id="2-comparaison-fonctionnalites-4-criteres-critiques" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                2. Tester sur Vos Produits
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Les présentations d'éditeurs et les comparatifs ne remplacent pas un test. Préparez un échantillon représentatif de votre catalogue (matières difficiles, couleurs à respecter, objets réfléchissants), soumettez-le aux outils envisagés et comparez les résultats selon les critères ci-dessus.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 4 */}
              <h2 id="4-cas-dusage-quand-choisir-blendai-vs-flairai" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                3. Cas d'Usage
              </h2>

              <h3 id="quand-choisir-blendai" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Production Régulière de Visuels Catalogue
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Si votre besoin principal est de produire régulièrement des visuels homogènes pour vos fiches produits, privilégiez les critères de fidélité, de cohérence, de volume et d'intégration à vos outils.
              </p>

              <h3 id="quand-choisir-flairai" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Campagnes Ponctuelles
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Si votre besoin principal est de créer ponctuellement des visuels de campagne (réseaux sociaux, publicité), la liberté créative et la variété des mises en scène pèsent davantage.
              </p>

              <h3 id="approche-complementaire-blendai-catalogue-flairai-campagnes" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Approche Complémentaire
              </h3>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Les deux usages peuvent coexister, avec un outil pour le catalogue et un autre pour les campagnes. Vérifiez alors les coûts cumulés et les conditions d'usage de chaque outil.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 5 */}
              <h2 id="5-approche-hybride-packshotcreator-hardware-ia-roi-maximal" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                4. Approche PackshotCreator : Studio + IA + Formation
              </h2>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                L'IA photo produit part d'une capture : un packshot de qualité constante facilite son traitement par IA. L'approche <strong>PackshotCreator</strong> associe trois piliers.
              </p>

              <h4 className="text-lg font-heading font-semibold text-future-dusk-900 mt-6 mb-3">1. Hardware : Studios Orbitvu</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Studios automatisés Orbitvu (AlphaShot G2, 360, XXL)</li>
                <li className="text-future-dusk-600">Temps : 30 secondes par packshot</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Explorer la gamme studios Orbitvu
                </Link>
              </p>

              <h4 className="text-lg font-heading font-semibold text-future-dusk-900 mt-6 mb-3">2. IA : BlendAI</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Déclinaison des packshots par IA (arrière-plans, mises en scène)</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Découvrir BlendAI
                </Link>
              </p>

              <h4 className="text-lg font-heading font-semibold text-future-dusk-900 mt-6 mb-3">3. Formation : Academy (studios Orbitvu)</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Essential Training (4 h, à distance) : prise en main de votre studio Orbitvu</li>
                <li className="text-future-dusk-600">Master Training (7 h, en présentiel) : maîtrise de votre studio Orbitvu</li>
                <li className="text-future-dusk-600">Formation facturée séparément ; Sysnext est certifiée Qualiopi : un financement OPCO est possible selon votre situation</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/academy" locale="fr" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Voir catalogue formations
                </Link>
              </p>

              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Notre calculateur établit une étude de retour sur investissement par machine, selon vos volumes.{' '}
                <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Calculer votre ROI personnalisé
                </Link>
              </p>

              <hr className="my-8 border-neutral-200" />
              {/* Section 6 — FAQ */}
              <h2 id="6-faq-comparatif-blendai-vs-flairai" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                5. FAQ BlendAI et Flair.ai
              </h2>

              <div className="space-y-4 mb-8">
                {faqItems.map((item) => (
                  <details key={item.question} className="group rounded-2xl border border-neutral-100 bg-neutral-50 overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:bg-neutral-100 transition-colors [&::-webkit-details-marker]:hidden">
                      <span className="font-heading font-bold text-future-dusk-900">{item.question}</span>
                    </summary>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-future-dusk-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>

              <hr className="my-8 border-neutral-200" />

              {/* Conclusion */}
              <h2 id="conclusion-choisir-en-fonction-de-votre-besoin-reel" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                Conclusion : Choisir en Fonction de Votre Besoin Réel
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Le choix entre <strong>BlendAI</strong> et <strong>Flair.ai</strong> dépend de votre usage : production régulière de visuels catalogue ou campagnes ponctuelles. Comparez les outils sur vos propres produits, selon les critères de ce guide.
              </p>

              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">Les 3 Questions Décisives</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600"><strong>Fréquence :</strong> production régulière ou campagnes ponctuelles ?</li>
                <li className="text-future-dusk-600"><strong>Priorité :</strong> fidélité au produit ou liberté créative ?</li>
                <li className="text-future-dusk-600"><strong>Volume :</strong> combien de visuels à produire, et avec quelle intégration à vos outils ?</li>
              </ul>

              <hr className="my-8 border-neutral-200" />

              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">Prochaines Étapes</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <Link href="/contact" className="text-very-peri-600 hover:text-very-peri-700 underline">Demander une démo BlendAI</Link> — Testez BlendAI sur vos propres produits
                </li>
                <li className="text-future-dusk-600">
                  <Link href="/calculateur-roi" className="text-very-peri-600 hover:text-very-peri-700 underline">Calculer votre ROI</Link> — Étude de retour sur investissement par machine, selon vos volumes
                </li>
                <li className="text-future-dusk-600">
                  <Link href="/academy" locale="fr" className="text-very-peri-600 hover:text-very-peri-700 underline">Découvrir les Formations</Link> — Essential Training (4 h, à distance) et Master Training (7 h, en présentiel), facturées séparément ; Sysnext est certifiée Qualiopi : financement OPCO possible selon votre situation
                </li>
              </ul>

              <hr className="my-8 border-neutral-200" />
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">Ressources Complémentaires</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600">
                  <strong>Guide IA Photo Produit 2026 :</strong>{' '}
                  <Link href={{ pathname: '/blog/[slug]', params: { slug: 'ia-photo-produit-guide-2026' } }} className="text-very-peri-600 hover:text-very-peri-700 underline">Lire l'article complet</Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>BlendAI vs Photoroom :</strong>{' '}
                  <Link href={{ pathname: '/blog/[slug]', params: { slug: 'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026' } }} className="text-very-peri-600 hover:text-very-peri-700 underline">Lire l'article</Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Hub IA Photo Produit :</strong>{' '}
                  <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">L'IA photo produit</Link>
                </li>
                <li className="text-future-dusk-600">
                  <strong>Studios Photo Orbitvu :</strong>{' '}
                  <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">Gamme complète</Link>
                </li>
              </ul>

              <p className="text-sm text-future-dusk-400 mt-8">
                <strong>Auteur :</strong> Sébastien Jourdan, Expert Photo Produit &amp; IA — <strong>Dernière mise à jour :</strong> 22 janvier 2026
              </p>

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
      <RelatedArticles currentSlug="blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026" category="IA & Technologie" lang={lang} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: 'BlendAI vs Flair.ai : Quelle IA pour Vos Campagnes Produits en 2026 ?',
          description: "BlendAI ou Flair.ai : les critères pour choisir un outil d'IA de visuels produits selon votre usage, catalogue e-commerce ou campagnes marketing, en 2026.",
          url: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`,
          datePublished: '2026-01-22',
          author: 'Sébastien Jourdan',
          category: 'IA & Technologie',
        }),
        faqSchema(faqItems),
      ]} />
    </>
  );
}
