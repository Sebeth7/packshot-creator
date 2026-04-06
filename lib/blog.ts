// lib/blog.ts — Local MDX + Webflow + static pages

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getWebflowArticles, type WebflowArticle } from './webflow';

export interface MdxArticle {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category?: string;
  keywords?: string[];
  readingTime: number;
  image?: string;
  content: string; // raw MDX body (without frontmatter)
  source: 'mdx';
}

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

export type Article = MdxArticle | WebflowArticle | StaticArticle;

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Static blog pages that have their own route but should appear in the listing
 */
const STATIC_ARTICLES: StaticArticle[] = [
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
];

/**
 * Read all MDX articles from content/blog/
 */
function getMdxArticles(): MdxArticle[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  return files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    // Slug: use frontmatter slug if present, otherwise derive from filename
    const slug = data.slug || filename.replace('.mdx', '');

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      author: data.author || 'Sébastien Jourdan',
      date: data.date || '',
      category: data.category,
      keywords: data.keywords,
      readingTime: data.readingTime || 10,
      image: data.image,
      content,
      source: 'mdx' as const,
    };
  });
}

/**
 * Get a single MDX article by slug
 */
export function getMdxArticle(slug: string): MdxArticle | null {
  const articles = getMdxArticles();
  return articles.find(a => a.slug === slug) || null;
}

/**
 * Get all articles (MDX + static pages + Webflow merged), sorted by date
 */
export async function getAllArticles(limit = 8): Promise<Article[]> {
  const [mdxArticles, webflowArticles] = await Promise.all([
    Promise.resolve(getMdxArticles()),
    getWebflowArticles(),
  ]);

  // Merge all sources
  const allArticles: Article[] = [
    ...mdxArticles.map(({ content, ...rest }) => ({ ...rest, content: '', source: 'mdx' as const })),
    ...STATIC_ARTICLES,
    ...webflowArticles,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
