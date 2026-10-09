import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { BookOpen, Clock, User } from 'lucide-react';
import SchemaOrg, { breadcrumbSchema, articleSchema, faqSchema } from '@/components/seo/SchemaOrg';
import { HeroSection } from '@/components/hero';
import { TableOfContents, ArticleCTA, RelatedArticles } from '@/components/blog';
import { buildLanguages } from '@/lib/hreflang';

/* ─────────────────────────── Metadata ─────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const title = 'BlendAI vs Photoroom : Quel Outil IA pour Vos Visuels Produits en 2026 ?';
  const description = "BlendAI ou Photoroom : les critères pour choisir un outil d'IA de visuels produits (détourage, arrière-plans, retouche, volume, intégration) en 2026.";

  return {
    title,
    description,
    keywords: 'blendai vs photoroom, ia photo produit, détourage ia, background generator, batch processing',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`,
      languages: buildLanguages('/fr/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026'),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`,
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
  { id: '1-blendai-vs-photoroom-vue-densemble', text: '1. BlendAI et Photoroom : Vue d\'Ensemble', level: 2 },
  { id: 'blendai-lia-specialisee-e-commerce-haute-qualite', text: 'BlendAI', level: 3 },
  { id: 'photoroom-lapp-mobile-simple-et-accessible', text: 'Photoroom', level: 3 },
  { id: '2-comparaison-fonctionnalites-4-criteres-decisifs', text: '2. Les Critères à Comparer', level: 2 },
  { id: '4-cas-dusage-quand-choisir-blendai-vs-photoroom', text: '3. Cas d\'Usage', level: 2 },
  { id: 'quand-choisir-blendai', text: 'Production Régulière de Visuels Catalogue', level: 3 },
  { id: 'quand-choisir-photoroom', text: 'Usage Ponctuel ou Petits Volumes', level: 3 },
  { id: 'approche-hybride-photoroom-prototyping-blendai-production', text: 'Approche Hybride', level: 3 },
  { id: '5-approche-hybride-packshotcreator-hardware-ia-workflow-optimal', text: '4. Approche PackshotCreator', level: 2 },
  { id: '6-faq-comparatif-blendai-vs-photoroom', text: '5. FAQ BlendAI et Photoroom', level: 2 },
  { id: 'conclusion-choisir-en-fonction-de-votre-realite', text: 'Conclusion', level: 2 },
];

/* ─────────────────────────── FAQ ─────────────────────────── */

const faqItems = [
  {
    question: 'BlendAI et Photoroom sont-ils compatibles ?',
    answer: 'Ce sont deux outils distincts. Leurs possibilités d\'échange de fichiers se vérifient auprès de chaque éditeur ; vous pouvez aussi les utiliser pour des usages différents.',
  },
  {
    question: 'Puis-je migrer de Photoroom vers BlendAI ?',
    answer: 'Les formats d\'images acceptés par BlendAI et la reprise de vos visuels existants se vérifient avec nous, sur un échantillon de vos fichiers.',
  },
  {
    question: 'Quel est le prix exact de BlendAI ?',
    answer: 'BlendAI est proposé sur devis, selon votre volume et votre besoin. Contactez-nous pour un devis personnalisé.',
  },
  {
    question: 'Photoroom peut-il traiter 1 000 produits ?',
    answer: 'Nous ne détaillons pas les capacités de Photoroom, faute de source vérifiée : reportez-vous à l\'éditeur. Pour BlendAI, le traitement de votre volume se vérifie avec nous.',
  },
  {
    question: 'Quelle solution pour débutant e-commerce ?',
    answer: 'Le choix dépend de votre volume, de vos produits et de votre budget. Testez les outils sur un échantillon de vos produits avant de vous engager.',
  },
];

/* ─────────────────────────── Page ─────────────────────────── */

export default async function BlendaiVsPhotoroomPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
    { name: 'Blog', url: `https://www.packshot-creator.com/${lang}/blog` },
    { name: 'BlendAI vs Photoroom', url: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026` },
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
        title="BlendAI vs Photoroom : Quel Outil IA pour Vos Visuels Produits en 2026 ?"
        subtitle="BlendAI ou Photoroom : les critères pour choisir un outil d'IA de visuels produits (détourage, arrière-plans, retouche, volume, intégration) en 2026."
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
          src="/images/blog/blendai-vs-photoroom-cover.jpg"
          alt="Comparatif BlendAI vs Photoroom pour les visuels e-commerce"
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
                <strong>BlendAI</strong> et <strong>Photoroom</strong> sont deux outils d'IA appliqués aux visuels produits : détourage, arrière-plans, retouche. Le choix entre eux dépend de votre volume, de vos produits et de vos outils.
              </p>
              <p className="mb-8 leading-relaxed text-future-dusk-600">
                Ce guide ne publie ni caractéristique, ni tarif, ni performance de Photoroom sans source vérifiée, et ne reprend pour BlendAI aucun chiffre de performance non vérifié. Il propose les critères à examiner et la méthode pour comparer les deux outils sur vos propres produits.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 1 */}
              <h2 id="1-blendai-vs-photoroom-vue-densemble" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                1. BlendAI et Photoroom : Vue d'Ensemble
              </h2>

              <h3 id="blendai-lia-specialisee-e-commerce-haute-qualite" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                BlendAI
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Sur ce site, <strong>BlendAI</strong> est présenté pour la déclinaison de packshots en visuels e-commerce (détourage, arrière-plans, mises en scène) destinés aux fiches produits. Ses capacités, ses intégrations et son tarif, sur devis, se vérifient avec nous sur vos propres produits.
              </p>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Découvrir BlendAI et l'IA photo produit
                </Link>
              </p>

              <hr className="my-8 border-neutral-200" />

              <h3 id="photoroom-lapp-mobile-simple-et-accessible" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Photoroom
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Nous ne détaillons pas ici les fonctionnalités, les limites ni les tarifs de <strong>Photoroom</strong> : faute de source vérifiée, reportez-vous directement à l'éditeur.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 2 */}
              <h2 id="2-comparaison-fonctionnalites-4-criteres-decisifs" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                2. Les Critères à Comparer
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600"><strong>Détourage :</strong> netteté des bords et tenue sur les matières difficiles (verre, bijoux, textile, transparence)</li>
                <li className="text-future-dusk-600"><strong>Arrière-plans :</strong> fonds prédéfinis ou générés, cohérence d'un produit à l'autre</li>
                <li className="text-future-dusk-600"><strong>Retouche :</strong> corrections disponibles et respect des couleurs du produit</li>
                <li className="text-future-dusk-600"><strong>Volume :</strong> nombre d'images à traiter et possibilité de traitement par lots</li>
                <li className="text-future-dusk-600"><strong>Intégration :</strong> export et connexion à vos outils (PIM, DAM, CMS)</li>
                <li className="text-future-dusk-600"><strong>Coût :</strong> selon votre volume et la formule retenue</li>
              </ul>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Les présentations d'éditeurs et les comparatifs ne remplacent pas un test. Préparez un échantillon représentatif de votre catalogue, soumettez-le aux outils envisagés et comparez les résultats selon ces critères.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 4 */}
              <h2 id="4-cas-dusage-quand-choisir-blendai-vs-photoroom" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                3. Cas d'Usage
              </h2>

              <h3 id="quand-choisir-blendai" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Production Régulière de Visuels Catalogue
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Si vous produisez régulièrement des visuels pour un catalogue, ou si vos produits comportent des matières difficiles, privilégiez les critères de détourage, de cohérence, de volume et d'intégration à vos outils.
              </p>

              <h3 id="quand-choisir-photoroom" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Usage Ponctuel ou Petits Volumes
              </h3>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Si vous traitez peu d'images, de façon ponctuelle, la simplicité d'usage et le coût d'entrée pèsent davantage.
              </p>

              <h3 id="approche-hybride-photoroom-prototyping-blendai-production" className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">
                Approche Hybride
              </h3>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                Les deux outils peuvent servir des usages distincts, par exemple des essais rapides d'un côté et la production du catalogue de l'autre. Vérifiez alors les coûts cumulés et les conditions d'usage de chaque outil.
              </p>

              <hr className="my-8 border-neutral-200" />

              {/* Section 5 */}
              <h2 id="5-approche-hybride-packshotcreator-hardware-ia-workflow-optimal" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                4. Approche PackshotCreator : Studio + IA + Formation
              </h2>
              <p className="mb-6 leading-relaxed text-future-dusk-600">
                L'IA photo produit part d'une capture : un packshot de qualité constante facilite son traitement par IA. L'approche <strong>PackshotCreator</strong> associe trois piliers.
              </p>

              <h4 className="text-lg font-heading font-semibold text-future-dusk-900 mt-6 mb-3">1. Hardware : Studios Orbitvu</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Studios automatisés Orbitvu (AlphaShot G2, 360, XXL)</li>
                <li className="text-future-dusk-600"><strong>Temps :</strong> 30 secondes par packshot</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/studios-photo-automatises" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Explorer la gamme studios Orbitvu
                </Link>
              </p>

              <h4 className="text-lg font-heading font-semibold text-future-dusk-900 mt-6 mb-3">2. IA : BlendAI</h4>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">Déclinaison des packshots par IA (détourage, arrière-plans, mises en scène)</li>
              </ul>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                <Link href="/ia-photo-produit" className="text-very-peri-600 hover:text-very-peri-700 underline">
                  Découvrir BlendAI et l'IA photo produit
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
              <h2 id="6-faq-comparatif-blendai-vs-photoroom" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                5. FAQ BlendAI et Photoroom
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
              <h2 id="conclusion-choisir-en-fonction-de-votre-realite" className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 mt-10 mb-6">
                Conclusion : Choisir en Fonction de Votre Réalité
              </h2>
              <p className="mb-4 leading-relaxed text-future-dusk-600">
                Le choix entre <strong>BlendAI</strong> et <strong>Photoroom</strong> dépend de votre volume, de vos produits et de vos outils. Comparez-les sur vos propres produits, selon les critères de ce guide.
              </p>

              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">Les 3 Questions à Se Poser</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="text-future-dusk-600"><strong>Volume :</strong> combien d'images à traiter, et à quelle fréquence ?</li>
                <li className="text-future-dusk-600"><strong>Produits :</strong> vos produits comportent-ils des matières difficiles (verre, bijoux, textile) ?</li>
                <li className="text-future-dusk-600"><strong>Workflow :</strong> usage ponctuel, ou production à intégrer à vos outils ?</li>
              </ul>

              <hr className="my-8 border-neutral-200" />

              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mt-8 mb-4">Prochaines Étapes</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="text-future-dusk-600">
                  <Link href="/contact" className="text-very-peri-600 hover:text-very-peri-700 underline">Tester BlendAI</Link> — Demandez une démonstration de BlendAI avec vos propres produits
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
                  <strong>BlendAI vs Flair.ai :</strong>{' '}
                  <Link href={{ pathname: '/blog/[slug]', params: { slug: 'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026' } }} className="text-very-peri-600 hover:text-very-peri-700 underline">Lire l'article</Link>
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
      <RelatedArticles currentSlug="blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026" category="IA & Technologie" lang={lang} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. SCHEMA ORG
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <SchemaOrg schema={[
        breadcrumbSchema(breadcrumbs),
        articleSchema({
          title: 'BlendAI vs Photoroom : Quel Outil IA pour Vos Visuels Produits en 2026 ?',
          description: "BlendAI ou Photoroom : les critères pour choisir un outil d'IA de visuels produits (détourage, arrière-plans, retouche, volume, intégration) en 2026.",
          url: `https://www.packshot-creator.com/${lang}/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`,
          datePublished: '2026-01-22',
          author: 'Sébastien Jourdan',
          category: 'IA & Technologie',
        }),
        faqSchema(faqItems),
      ]} />
    </>
  );
}
