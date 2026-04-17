// lib/webflow.ts

const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const COLLECTION_ID = process.env.WEBFLOW_BLOG_COLLECTION_ID;

const CMS_LOCALE_ID: Record<'fr' | 'en', string | undefined> = {
  fr: undefined,
  en: '672e1f1758256ef525dbc4c7',
};

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
  author?: string;
  readingTime?: number;
  content?: string;
  faqs: WebflowFaq[];
  source: 'webflow';
}

const HEX_ID_RE = /^[0-9a-f]{24,32}$/i;
const maybeRef = (v: unknown): string | undefined =>
  typeof v === 'string' && !HEX_ID_RE.test(v) ? v : undefined;

function mapItem(item: any, lang: 'fr' | 'en'): WebflowArticle | null {
  const f = item?.fieldData || {};
  const slug = f.slug || item.slug;
  if (!slug || slug === 'undefined') return null;

  const name: string = f.name || item.name || '';
  const h1: string = f['titre-principal-h1-et-metatitre'] || name;

  const faqs: WebflowFaq[] = [1, 2, 3, 4, 5]
    .map((n) => ({
      question: f[`faq---question-${n}`] || '',
      answer: f[`faq---reponse-${n}`] || '',
    }))
    .filter((q) => q.question && q.answer);

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
    category: maybeRef(f.categorie),
    author: maybeRef(f.auteur),
    readingTime: typeof f['temps-de-lecture'] === 'number' ? f['temps-de-lecture'] : undefined,
    content: f.contenu,
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
