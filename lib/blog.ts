// lib/blog.ts — Static articles + Webflow

import { getWebflowArticles, type WebflowArticle } from './webflow';

export interface StaticArticle {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category?: string;
  readingTime: number;
  image?: string;
  source: 'static';
}

export type Article = WebflowArticle | StaticArticle;

/**
 * All static blog pages (each has its own route in app/[lang]/blog/)
 */
const STATIC_ARTICLES: StaticArticle[] = [
  // — Pages statiques originales —
  {
    slug: 'budget-studio-photo-automatise',
    title: 'Quel budget pour un studio photo automatisé ?',
    description: 'Fourchettes de prix des studios Orbitvu, coût par photo, ROI et financement. Guide transparent pour investir dans un studio photo automatisé.',
    author: 'PackshotCreator',
    date: '2026-03-22',
    category: 'Hardware & Studios',
    readingTime: 12,
    source: 'static',
  },
  {
    slug: 'prestataire-packshot-vs-studio-interne',
    title: 'Prestataire packshot vs studio interne : que choisir ?',
    description: 'Comparatif objectif entre prestataire photo produit et studio packshot interne. Coûts, délais, qualité : tous les critères pour faire le bon choix.',
    author: 'PackshotCreator',
    date: '2026-03-22',
    category: 'Hardware & Studios',
    readingTime: 10,
    source: 'static',
  },
  {
    slug: 'comparatif-orbitvu-ortery-styleshoots-2026',
    title: 'Comparatif Orbitvu vs Ortery vs Styleshoots 2026',
    description: 'Comparaison factuelle des 3 leaders du studio photo automatisé : Orbitvu, Ortery et Styleshoots/Profoto. Prix, productivité, fonctionnalités et support en France.',
    author: 'PackshotCreator',
    date: '2026-03-22',
    category: 'Hardware & Studios',
    readingTime: 15,
    source: 'static',
  },
  {
    slug: 'studio-ia-vs-ia-generative',
    title: 'Studio photo + IA vs IA générative pure | Comparatif 2026',
    description: 'Photo produit IA : faut-il choisir Photoroom ou un studio automatisé ? Comparatif complet fidélité, 360°, cohérence catalogue et réglementation.',
    author: 'PackshotCreator',
    date: '2026-03-22',
    category: 'IA & Technologie',
    readingTime: 12,
    source: 'static',
  },
  // — Articles migrés depuis Sanity/MDX —
  {
    slug: 'ia-photo-produit-guide-2026',
    title: 'IA Photo Produit 2026 : Guide Complet BlendAI pour E-commerce',
    description: 'Guide complet IA photo produit 2026. BlendAI : détourage, backgrounds, retouche automatique. Intégration studios Orbitvu. ROI, workflow, cas d\'usage.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'IA & Technologie',
    readingTime: 13,
    image: '/images/blog/thumbnail-article-nouveau-5.avif',
    source: 'static',
  },
  {
    slug: 'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026',
    title: 'BlendAI vs Flair.ai : Quelle IA pour Vos Campagnes Produits en 2026 ?',
    description: 'Comparatif complet BlendAI vs Flair.ai. E-commerce catalogues vs campagnes marketing. Use cases, qualité rendu, pricing, workflow. Guide objectif 2026.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'IA & Technologie',
    readingTime: 12,
    image: '/blog/blendai-vs-flair-cover.jpg',
    source: 'static',
  },
  {
    slug: 'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
    title: 'BlendAI vs Photoroom : Quel Outil IA pour Vos Visuels Produits en 2026 ?',
    description: 'Comparatif complet BlendAI vs Photoroom. Détourage, backgrounds, retouche, batch processing. Cas d\'usage, pricing, workflow e-commerce. Guide objectif 2026.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'IA & Technologie',
    readingTime: 12,
    image: '/blog/blendai-vs-photoroom-cover.jpg',
    source: 'static',
  },
  {
    slug: 'orbitvu-vs-concurrents',
    title: 'Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026',
    description: 'Comparatif complet Orbitvu vs concurrents (PackshotCreator, StyleShoots, Photorobot). Qualité, prix, fonctionnalités, intégration IA. Guide objectif 2026.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'Hardware & Studios',
    readingTime: 12,
    image: '/images/blog/thumbnail-article-nouveau-3.avif',
    source: 'static',
  },
  {
    slug: 'guide-achat-studio-2026',
    title: 'Guide d\'Achat Studio Photo Automatisé 2026 : Choisir le Bon Modèle Orbitvu',
    description: 'Guide complet achat studio photo automatisé 2026. Comparatif modèles Orbitvu (Micro, G2, 360, XXL), critères choix, budget, ROI. Recommandations par secteur.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'Hardware & Studios',
    readingTime: 12,
    image: '/images/blog/thumbnail-article-nouveau-3.avif',
    source: 'static',
  },
  {
    slug: 'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet',
    title: 'Comment Calculer le ROI d\'un Studio Photo Automatisé en 2026 : Guide Complet',
    description: 'Guide complet pour calculer le ROI de votre studio photo automatisé. Méthode en 8 facteurs, exemples concrets, calculateur gratuit. Délai de retour 12-18 mois.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'Hardware & Studios',
    readingTime: 10,
    image: '/images/blog/thumbnail-article-nouveau-2.avif',
    source: 'static',
  },
  {
    slug: 'financement-formation-opco-guide-complet-pour-studios-photo-2026',
    title: 'Financement Formation OPCO : Guide Complet pour Studios Photo 2026',
    description: 'Guide complet financement OPCO pour formations photo produit et studios automatisés. Procédure, critères éligibilité, montants, délais. Prise en charge 100%.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'Formation & Academy',
    readingTime: 10,
    image: '/blog/financement-opco-cover.jpg',
    source: 'static',
  },
  {
    slug: 'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
    title: 'Formation Photo Produit Professionnelle : Maîtriser Studios Orbitvu et IA en 2026',
    description: 'Formation photo produit certifiée Qualiopi. Maîtrise studios Orbitvu, IA BlendAI, workflow e-commerce. Présentiel/blended. Financement OPCO 100%.',
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'Formation & Academy',
    readingTime: 11,
    image: '/images/blog/thumbnail-article-nouveau-2.avif',
    source: 'static',
  },
];

/**
 * Get all articles (static pages + Webflow), sorted by date
 */
export async function getAllArticles(limit = 8): Promise<Article[]> {
  const webflowArticles = await getWebflowArticles();

  const allArticles: Article[] = [
    ...STATIC_ARTICLES,
    ...webflowArticles,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
