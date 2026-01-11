// lib/blog.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getWebflowArticles } from './webflow';

export interface MDXArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  content: string; // MDX content
  source: 'mdx';
}

/**
 * Get all local MDX articles
 */
export async function getLocalMDXArticles(limit?: number): Promise<MDXArticle[]> {
  const blogDir = path.join(process.cwd(), 'content/blog');

  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));

  const articles = files.map(file => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug: data.slug || file.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      date: data.date,
      image: data.image,
      category: data.category,
      content,
      source: 'mdx' as const,
    };
  });

  // Sort by date (most recent first)
  const sorted = articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get single MDX article by slug
 */
export async function getLocalArticle(slug: string): Promise<MDXArticle | null> {
  const articles = await getLocalMDXArticles();
  return articles.find(article => article.slug === slug) || null;
}

export type Article = MDXArticle | import('./webflow').WebflowArticle;

/**
 * Get all articles (MDX + Webflow merged)
 */
export async function getAllArticles(limit = 8): Promise<Article[]> {
  const [mdxArticles, webflowArticles] = await Promise.all([
    getLocalMDXArticles(),
    getWebflowArticles(),
  ]);

  // Merge and sort by date
  const allArticles = [...mdxArticles, ...webflowArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
