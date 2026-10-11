// lib/blog.ts — Static articles + articles migrés lus depuis content/

import {
  getAllArticles as getAllMigratedArticles,
  type MigratedArticle,
  type Lang,
} from './content';
import { NOINDEX_EN_BLOG_SLUGS } from './seo-config';

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

export type Article = MigratedArticle | StaticArticle;

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
    description: "Orbitvu, Ortery, StyleShoots : ce que nous pouvons établir sur chaque studio photo automatisé et les points à vérifier. Comparatif rédigé par PackshotCreator, distributeur officiel d'Orbitvu.",
    author: 'PackshotCreator',
    date: '2026-03-22',
    category: 'Hardware & Studios',
    readingTime: 15,
    source: 'static',
  },
  {
    slug: 'studio-ia-vs-ia-generative',
    title: 'Studio photo + IA vs IA générative pure | Comparatif 2026',
    description: "Photo produit IA : outil d'IA générative ou studio automatisé couplé à l'IA ? Les critères à examiner : fidélité, 360°, cohérence catalogue, réglementation.",
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
    description: "Guide IA photo produit 2026 : principes, fonctionnalités (détourage, arrière-plans, retouche), workflow studio + IA et critères de choix pour l'e-commerce.",
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
    description: "BlendAI ou Flair.ai : les critères pour choisir un outil d'IA de visuels produits selon votre usage, catalogue e-commerce ou campagnes marketing, en 2026.",
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'IA & Technologie',
    readingTime: 12,
    image: '/images/blog/blendai-vs-flair-cover.jpg',
    source: 'static',
  },
  {
    slug: 'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
    title: 'BlendAI vs Photoroom : Quel Outil IA pour Vos Visuels Produits en 2026 ?',
    description: "BlendAI ou Photoroom : les critères pour choisir un outil d'IA de visuels produits (détourage, arrière-plans, retouche, volume, intégration) en 2026.",
    author: 'Sébastien Jourdan',
    date: '2026-01-22',
    category: 'IA & Technologie',
    readingTime: 12,
    image: '/images/blog/blendai-vs-photoroom-cover.jpg',
    source: 'static',
  },
  {
    slug: 'orbitvu-vs-concurrents',
    title: 'Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026',
    description: "Orbitvu, StyleShoots, Photomatics : les points à examiner pour choisir un studio photo automatisé en 2026. Guide rédigé par PackshotCreator, distributeur officiel d'Orbitvu.",
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
];

/**
 * Set of static article slugs (each has its own app/[lang]/blog/<slug>/page.tsx).
 * Utilisé par generateStaticParams du template dynamique pour exclure ces slugs.
 */
export const STATIC_ARTICLE_SLUGS: ReadonlySet<string> = new Set(
  STATIC_ARTICLES.map((a) => a.slug),
);

/**
 * Get all articles (static pages + content/ migrés), filtrés par langue et triés par date.
 */
export async function getAllArticles(lang: Lang, limit = 0): Promise<Article[]> {
  const migrated = getAllMigratedArticles(lang);

  // de-ch (Suisse alémanique) n'a AUCUN article statique traduit : seuls les
  // articles migrés présents dans content/blog/de-ch/ sont servis. Inclure les
  // STATIC_ARTICLES (FR) ici polluerait le listing /de-ch/blog et générerait des
  // liens /de-ch/blog/<slug-fr> en 404 (blog/[slug] n'émet que les slugs de-ch).
  const statics =
    lang === 'de-ch'
      ? []
      : lang === 'en'
        ? STATIC_ARTICLES.filter((a) => !NOINDEX_EN_BLOG_SLUGS.has(a.slug))
        : STATIC_ARTICLES;

  const allArticles: Article[] = [
    ...statics,
    ...migrated,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
