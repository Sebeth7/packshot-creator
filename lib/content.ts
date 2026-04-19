// lib/content.ts — Source locale pour blog et guides migrés de Webflow.
// Lit les JSON produits par scripts/extract-webflow-content.mjs.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'content/blog');
const GUIDES_DIR = path.join(ROOT, 'content/guides');

export type Lang = 'fr' | 'en';

export interface MigratedFaq {
  question: string;
  answer: string;
}

export interface MigratedArticle {
  webflowItemId: string;
  lang: Lang;
  slug: string;
  title: string;
  h1: string;
  metaTitle: string | null;
  description: string;
  date: string;
  image: string | null;
  imageSource: string | null;
  category: string | null;
  categoryId: string | null;
  author: string | null;
  readingTime: number | null;
  content: string;
  faqs: MigratedFaq[];
  source: 'webflow';
}

export interface MigratedGuideStep {
  position: number;
  title: string;
  content: string;
  image: string | null;
  imageSource: string | null;
  structuredText: string | null;
}

export interface MigratedGuide {
  webflowItemId: string;
  lang: Lang;
  slug: string;
  title: string;
  h1: string;
  metaTitle: string | null;
  description: string;
  date: string;
  image: string | null;
  imageSource: string | null;
  categoryId: string | null;
  duration: string | null;
  tool: string | null;
  logistics: string | null;
  introText: string;
  introMedia: string | null;
  steps: MigratedGuideStep[];
  faqs: MigratedFaq[];
  source: 'webflow';
}

export interface AlternatesMap {
  [webflowItemId: string]: { fr: string | null; en: string | null };
}

const cache = {
  blog: { fr: null as Map<string, MigratedArticle> | null, en: null as Map<string, MigratedArticle> | null },
  guides: { fr: null as Map<string, MigratedGuide> | null, en: null as Map<string, MigratedGuide> | null },
  blogAlternates: null as AlternatesMap | null,
  guideAlternates: null as AlternatesMap | null,
};

function readJsonSync<T>(file: string): T | null {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function loadCollection<T extends { slug: string }>(dir: string, lang: Lang): Map<string, T> {
  const map = new Map<string, T>();
  const langDir = path.join(dir, lang);
  if (!fs.existsSync(langDir)) return map;
  const files = fs.readdirSync(langDir).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const full = path.join(langDir, file);
    const data = readJsonSync<T>(full);
    if (data && data.slug) map.set(data.slug, data);
  }
  return map;
}

function getBlogMap(lang: Lang): Map<string, MigratedArticle> {
  if (!cache.blog[lang]) cache.blog[lang] = loadCollection<MigratedArticle>(BLOG_DIR, lang);
  return cache.blog[lang]!;
}

function getGuideMap(lang: Lang): Map<string, MigratedGuide> {
  if (!cache.guides[lang]) cache.guides[lang] = loadCollection<MigratedGuide>(GUIDES_DIR, lang);
  return cache.guides[lang]!;
}

// -------------------- Blog --------------------

export function getArticle(slug: string, lang: Lang): MigratedArticle | null {
  return getBlogMap(lang).get(slug) ?? null;
}

export function getAllArticles(lang: Lang): MigratedArticle[] {
  return Array.from(getBlogMap(lang).values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllArticleSlugs(lang: Lang): string[] {
  return Array.from(getBlogMap(lang).keys());
}

export function getBlogAlternates(webflowItemId: string): { fr: string | null; en: string | null } {
  if (!cache.blogAlternates) {
    cache.blogAlternates =
      readJsonSync<AlternatesMap>(path.join(BLOG_DIR, 'alternates.json')) ?? {};
  }
  return cache.blogAlternates[webflowItemId] ?? { fr: null, en: null };
}

// -------------------- Guides --------------------

export function getGuide(slug: string, lang: Lang): MigratedGuide | null {
  return getGuideMap(lang).get(slug) ?? null;
}

export function getAllGuides(lang: Lang): MigratedGuide[] {
  return Array.from(getGuideMap(lang).values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAllGuideSlugs(lang: Lang): string[] {
  return Array.from(getGuideMap(lang).keys());
}

export function getGuideAlternates(webflowItemId: string): { fr: string | null; en: string | null } {
  if (!cache.guideAlternates) {
    cache.guideAlternates =
      readJsonSync<AlternatesMap>(path.join(GUIDES_DIR, 'alternates.json')) ?? {};
  }
  return cache.guideAlternates[webflowItemId] ?? { fr: null, en: null };
}
