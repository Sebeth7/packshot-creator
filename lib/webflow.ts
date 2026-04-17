// lib/webflow.ts

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const COLLECTION_ID = process.env.WEBFLOW_BLOG_COLLECTION_ID;

const CMS_LOCALE_ID: Record<'fr' | 'en', string | undefined> = {
  fr: undefined,
  en: '672e1f1758256ef525dbc4c7',
};

// Webflow "Option" fields expose IDs, not labels. Resolve hardcoded until
// the extraction script in Phase 1 snapshots them into local JSON.
const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  '5f78e051722c291d8cbf5ec9fea26fc5': { fr: 'Actualités', en: 'News' },
  '104a291d655dd1b3985ecb9a34c0df8a': { fr: 'E-commerce', en: 'E-commerce' },
  '21dbdefef81c6afd88ac0fb6b4a61478': { fr: 'Produits', en: 'Products' },
  'a0975835d398d479f43208215ebfea18': { fr: 'Innovations', en: 'Innovations' },
};

const AUTHOR_LABELS: Record<string, string> = {
  '1ee1af407b1304f8ec54d409bf4544ab': 'Laurent Wainberg',
};

// Internal paths that existed in Webflow but need a specific rewrite target.
// The full 653-link cleanup lives in the Phase 1 extraction script; this
// proto-level map covers the common aliases so a live-rendered article looks
// correct in preview.
const INTERNAL_PATH_REWRITES: Record<string, string> = {
  '/ancien-studio-photo': '/studios-photo-automatises',
  '/fashion-apparel-photo-studios': '/studio-photo/fashion-studio',
  '/?r=0': '',
};

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

export interface WebflowFaq {
  question: string;
  answer: string;
}

export interface WebflowArticle {
  webflowItemId: string;
  lang: 'fr' | 'en';
  slug: string;
  title: string;
  h1: string;
  metaTitle?: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  categoryId?: string;
  author?: string;
  readingTime?: number;
  content?: string;
  faqs: WebflowFaq[];
  source: 'webflow';
}

function rewriteInternalLinks(html: string, lang: 'fr' | 'en'): string {
  if (!html) return html;
  const prefix = `/${lang}`;

  return html.replace(/href="([^"]+)"/g, (match, href: string) => {
    // Leave anchors, external, mailto/tel, data URIs alone
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return match;
    }
    if (/^https?:\/\//i.test(href)) {
      // Absolute link to our own domain — normalize to relative lang-prefixed path
      try {
        const u = new URL(href);
        if (/(^|\.)packshot-creator\.com$/i.test(u.hostname)) {
          // Drop legacy FR subdomain
          let path = u.pathname + u.search + u.hash;
          if (path === '/' || path === '') path = '';
          return `href="${prefix}${path}"`;
        }
      } catch {
        /* ignore */
      }
      return match;
    }
    // Relative internal path
    let path = href;
    // Apply targeted rewrites for known legacy aliases
    for (const [from, to] of Object.entries(INTERNAL_PATH_REWRITES)) {
      if (path === from || path.startsWith(from + '/') || path.startsWith(from + '?')) {
        path = path.replace(from, to);
        break;
      }
    }
    if (!path.startsWith('/')) return match;
    if (path.startsWith('/fr/') || path.startsWith('/en/') || path === '/fr' || path === '/en') {
      return `href="${path}"`;
    }
    if (path === '/') return `href="${prefix}"`;
    return `href="${prefix}${path}"`;
  });
}

function mapItem(item: any, lang: 'fr' | 'en'): WebflowArticle | null {
  const f = item?.fieldData || {};
  const slug = f.slug || item.slug;
  if (!slug || slug === 'undefined' || !SLUG_RE.test(slug)) return null;

  const name: string = f.name || item.name || '';
  const h1: string = f['titre-principal-h1-et-metatitre'] || name;

  const faqs: WebflowFaq[] = [1, 2, 3, 4, 5]
    .map((n) => ({
      question: f[`faq---question-${n}`] || '',
      answer: f[`faq---reponse-${n}`] || '',
    }))
    .filter((q) => q.question && q.answer);

  const categoryId = typeof f.categorie === 'string' ? f.categorie : undefined;
  const categoryLabel = categoryId && CATEGORY_LABELS[categoryId]
    ? CATEGORY_LABELS[categoryId][lang]
    : undefined;

  const authorId = typeof f.auteur === 'string' ? f.auteur : undefined;
  const authorLabel = authorId && AUTHOR_LABELS[authorId]
    ? AUTHOR_LABELS[authorId]
    : undefined;

  const content = f.contenu ? rewriteInternalLinks(f.contenu, lang) : undefined;

  return {
    webflowItemId: item.id,
    lang,
    slug,
    title: name,
    h1,
    metaTitle: f['meta-titre'] || undefined,
    description: f['meta-description'] || '',
    date: f.date || item.lastPublished || item.createdOn || '',
    image: f['image-principale']?.url,
    category: categoryLabel,
    categoryId,
    author: authorLabel,
    readingTime: typeof f['temps-de-lecture'] === 'number' ? f['temps-de-lecture'] : undefined,
    content,
    faqs,
    source: 'webflow',
  };
}

export async function getWebflowArticles(
  lang: 'fr' | 'en' = 'fr',
  limit = 100
): Promise<WebflowArticle[]> {
  if (!WEBFLOW_API_KEY || !COLLECTION_ID) {
    console.warn('Webflow API not configured');
    return [];
  }

  const params = new URLSearchParams({ limit: String(limit) });
  const cmsLocaleId = CMS_LOCALE_ID[lang];
  if (cmsLocaleId) params.set('cmsLocaleId', cmsLocaleId);

  try {
    const response = await fetch(
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${WEBFLOW_API_KEY}`,
          'accept-version': '1.0.0',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Webflow API error: ${response.status}`);
    }

    const data = await response.json();
    return (data.items || [])
      .map((item: any) => mapItem(item, lang))
      .filter((a: WebflowArticle | null): a is WebflowArticle => a !== null);
  } catch (error) {
    console.error('Error fetching Webflow articles:', error);
    return [];
  }
}

export async function getWebflowArticle(
  slug: string,
  lang: 'fr' | 'en' = 'fr'
): Promise<WebflowArticle | null> {
  const articles = await getWebflowArticles(lang);
  return articles.find((article) => article.slug === slug) || null;
}

/**
 * Resolve the FR/EN slug pair for a given Webflow item.
 * Used to emit accurate <link rel="alternate" hreflang> since FR and EN slugs
 * are different strings that share the same webflowItemId.
 */
export async function getArticleAlternates(
  webflowItemId: string
): Promise<{ fr?: string; en?: string }> {
  const [fr, en] = await Promise.all([
    getWebflowArticles('fr'),
    getWebflowArticles('en'),
  ]);
  return {
    fr: fr.find((a) => a.webflowItemId === webflowItemId)?.slug,
    en: en.find((a) => a.webflowItemId === webflowItemId)?.slug,
  };
}
