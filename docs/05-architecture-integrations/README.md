# Architecture & Integrations

Complete technical documentation of the PackshotCreator Next.js architecture, integrations, and progressive migration strategy.

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Next.js App Router Architecture](#nextjs-app-router-architecture)
3. [Internationalization (i18n)](#internationalization-i18n)
4. [Dual Content Sources](#dual-content-sources)
5. [Progressive Migration Strategy](#progressive-migration-strategy)
6. [API Integrations](#api-integrations)
7. [Image Optimization](#image-optimization)
8. [Routing & Redirects](#routing--redirects)
9. [Data Flow Diagrams](#data-flow-diagrams)
10. [Integration Patterns](#integration-patterns)

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     packshot-creator.com                         │
│                      (Cloudflare DNS)                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Cloudflare Worker Router                        │
│              (Progressive Migration Manager)                     │
│                                                                  │
│  - Inspects incoming request path                               │
│  - Routes to Next.js OR Webflow based on MIGRATED_ROUTES        │
│  - Zero downtime migration                                       │
└────────┬──────────────────────────────────────┬─────────────────┘
         │                                      │
         │ Migrated Routes                      │ Non-migrated Routes
         ▼                                      ▼
┌─────────────────────┐               ┌─────────────────────┐
│   Next.js (Vercel)  │               │  Webflow (Legacy)   │
│                     │               │                     │
│ ┌─────────────────┐ │               │  Static hosting     │
│ │  App Router     │ │               │  CMS-managed        │
│ │  (app/)         │ │               │                     │
│ └─────────────────┘ │               └─────────────────────┘
│                     │
│ ┌─────────────────┐ │
│ │  Sanity CMS     │◄├───── Primary content source
│ │  (Headless)     │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │  Webflow API    │◄├───── Fallback content source
│ │  (Backup)       │ │
│ └─────────────────┘ │
└─────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | React framework with SSR/SSG |
| **Hosting** | Vercel | Serverless deployment platform |
| **CMS Primary** | Sanity.io | Headless CMS for blog & content |
| **CMS Fallback** | Webflow API | Legacy content via REST API |
| **i18n** | next-intl | Internationalization (FR/EN) |
| **Routing Layer** | Cloudflare Workers | Progressive migration router |
| **Image CDN** | Sanity Image URL + Cloudinary | Optimized image delivery |
| **Styling** | TailwindCSS | Utility-first CSS |
| **Type Safety** | TypeScript | Static type checking |

---

## Next.js App Router Architecture

### Directory Structure

```
app/
├── layout.tsx                 # Root layout (minimal - just renders children)
├── globals.css                # Global styles
│
├── [lang]/                    # i18n locale parameter (fr/en)
│   ├── layout.tsx             # Locale layout (fonts, NextIntlProvider)
│   ├── page.tsx               # Homepage
│   │
│   ├── blog/
│   │   ├── layout.tsx         # Blog layout wrapper
│   │   ├── page.tsx           # Blog listing (Sanity + Webflow)
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic blog article (dual-source)
│   │
│   ├── academy/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx    # Dynamic formation pages
│   │   ├── calendrier/page.tsx
│   │   ├── formations-ia/page.tsx
│   │   └── formations-packshot/page.tsx
│   │
│   ├── ia-photo-produit/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── studios-photo-automatises/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── guide/
│   │   └── [slug]/page.tsx
│   │
│   ├── industrie/
│   │   └── [slug]/page.tsx
│   │
│   └── studio-photo/
│       └── [slug]/page.tsx
│
└── studio/                    # Sanity Studio
    ├── layout.tsx
    └── [[...tool]]/page.tsx   # Catch-all for Sanity Studio routes
```

### Key App Router Patterns

#### 1. Root Layout (Minimal)
**File:** `/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://packshot-creator.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children; // Just renders locale layout
}
```

**Purpose:** Sets global metadata base URL, delegates everything to locale layout.

#### 2. Locale Layout (i18n Provider)
**File:** `/app/[lang]/layout.tsx`

```typescript
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale })); // ['fr', 'en']
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Validate locale
  if (!routing.locales.includes(lang as 'fr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={lang} className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-body text-text-dark antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Key Features:**
- Static params generation for all locales
- Locale validation (404 if invalid)
- Font optimization (variable fonts)
- NextIntl provider with loaded messages

#### 3. Dynamic Routes with Data Fetching
**File:** `/app/[lang]/blog/[slug]/page.tsx`

```typescript
// Dual-source content fetching pattern
export default async function BlogArticlePage({ params }) {
  const { lang, slug } = await params;

  // 1. Try Sanity first (primary source)
  const sanityPost = await getSanityBlogPost(slug);
  if (sanityPost) {
    return <SanityArticleView post={sanityPost} />;
  }

  // 2. Fallback to Webflow (legacy source)
  const webflowArticle = await getWebflowArticle(slug);
  if (webflowArticle) {
    return <WebflowArticleView article={webflowArticle} />;
  }

  // 3. Not found
  notFound();
}
```

**Pattern:** Primary/Fallback content resolution with graceful degradation.

---

## Internationalization (i18n)

### i18n Strategy

**Approach:** Path-based localization with `next-intl` middleware

```
https://packshot-creator.com/fr/blog       → French
https://packshot-creator.com/en/blog       → English
https://packshot-creator.com/de/blog       → Redirect to blendai.studio
```

### Configuration Files

#### 1. Routing Configuration
**File:** `/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],        // Supported locales (DE/ES/NL redirected)
  defaultLocale: 'fr',           // Default language
  localePrefix: 'always'         // Always show locale in URL (/fr/, /en/)
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

**Key Points:**
- Only FR/EN supported in Next.js
- DE/ES/NL redirect to `blendai.studio` (via `next.config.ts`)
- `localePrefix: 'always'` ensures SEO-friendly URLs

#### 2. Request Configuration
**File:** `/i18n/request.ts`

```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate locale, fallback to default
  if (!locale || !routing.locales.includes(locale as 'fr' | 'en')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**Purpose:** Loads translation messages dynamically based on locale.

#### 3. Middleware (Automatic Locale Detection)
**File:** `/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths EXCEPT:
  // - API routes (/api/*)
  // - Static files (/_next/*, /_vercel/*)
  // - Sanity Studio (/studio/*)
  // - File extensions (*.png, *.jpg, etc.)
  matcher: ['/', '/((?!api|_next|_vercel|studio|.*\\..*).*)']
};
```

**Behavior:**
- Detects locale from URL path (`/fr/*`, `/en/*`)
- Redirects `/` to `/fr/` (default locale)
- Skips middleware for API routes, static files, Sanity Studio

### Translation Files

**Location:** `/messages/[locale].json`

```
messages/
├── fr.json    # French translations
└── en.json    # English translations
```

**Usage in Components:**

```typescript
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('blog'); // Namespace: blog

  return <h1>{t('heading')}</h1>;    // blog.heading from messages
}

// Server Components
import { getTranslations } from 'next-intl/server';

export default async function Page({ params }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  return <h1>{t('heading')}</h1>;
}
```

### Locale-Aware Navigation

```typescript
import { Link } from '@/i18n/routing'; // Type-safe i18n Link

<Link href="/blog">Blog</Link>
// Automatically becomes: /fr/blog or /en/blog
```

---

## Dual Content Sources

### Content Strategy Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    Content Resolution Flow                    │
└──────────────────────────────────────────────────────────────┘

  Request: /blog/quel-format-d-image-pour-le-web
      │
      ▼
  ┌─────────────────┐
  │ Try Sanity CMS  │ ──── Primary Source (NEW content)
  └────────┬────────┘
           │
           ├─ Found? ──► Render Sanity Content (Portable Text)
           │
           └─ Not Found
              │
              ▼
        ┌──────────────────┐
        │ Try Webflow API  │ ──── Fallback Source (LEGACY content)
        └────────┬─────────┘
                 │
                 ├─ Found? ──► Render Webflow Content (HTML)
                 │
                 └─ Not Found ──► 404 Page
```

### 1. Sanity CMS (Primary Source)

**Purpose:** Modern headless CMS for new blog posts and structured content.

**Configuration:** `/sanity.config.ts`

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Packshot-Creator',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',  // Accessible at /studio

  plugins: [
    structureTool(),    // Content structure UI
    visionTool(),       // GROQ query testing
    codeInput()         // Code blocks in content
  ],

  schema: {
    types: schemaTypes  // Custom content schemas
  }
});
```

**Access:** https://packshot-creator.com/studio

**Content Types:**
- `blogPost` - Blog articles (Portable Text)
- `formation` - Training courses
- `callout` - Reusable callout components
- `comparisonTable` - Comparison tables

**Schema Example:** `/sanity/schemas/blogPost.ts`

```typescript
export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Basic metadata
    { name: 'title', type: 'string', validation: Rule => Rule.required().max(100) },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text', validation: Rule => Rule.max(160) },
    { name: 'author', type: 'string', initialValue: 'Sébastien Jourdan' },
    { name: 'date', type: 'date', validation: Rule => Rule.required() },
    { name: 'category', type: 'string' },
    { name: 'keywords', type: 'array', of: [{ type: 'string' }] },
    { name: 'readingTime', type: 'number' },

    // Cover image
    { name: 'image', type: 'image', options: { hotspot: true } },

    // Portable Text content
    {
      name: 'content',
      type: 'array',
      of: [
        { type: 'block' },           // Rich text
        { type: 'callout' },         // Custom callout component
        { type: 'comparisonTable' }, // Custom table component
        { type: 'code' }             // Code blocks
      ]
    },

    // SEO
    { name: 'seo', type: 'object', fields: [...] }
  ]
});
```

### 2. Webflow API (Fallback Source)

**Purpose:** Legacy content source for articles not yet migrated to Sanity.

**Configuration:** `/lib/webflow.ts`

```typescript
const WEBFLOW_API_KEY = process.env.WEBFLOW_API_KEY;
const COLLECTION_ID = process.env.WEBFLOW_BLOG_COLLECTION_ID;

export async function getWebflowArticles(limit = 100): Promise<WebflowArticle[]> {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_KEY}`,
        'accept-version': '1.0.0',
      },
      next: { revalidate: 3600 }, // Cache 1 hour
    }
  );

  const data = await response.json();

  return data.items.map((item: any) => ({
    slug: item.slug,
    title: item.name || item.title,
    description: item['post-summary'] || item.description,
    date: item['created-on'] || item.publishedOn,
    image: item['main-image']?.url,
    category: item.category,
    content: item['post-body'], // Raw HTML
    source: 'webflow'
  }));
}
```

**Content Format:** HTML (rendered with `dangerouslySetInnerHTML`)

### 3. Unified Content API

**File:** `/lib/blog.ts`

```typescript
export async function getAllArticles(limit = 8): Promise<Article[]> {
  // Fetch from BOTH sources in parallel
  const [sanityPosts, webflowArticles] = await Promise.all([
    getSanityBlogPosts(),
    getWebflowArticles(),
  ]);

  // Convert Sanity posts to common format
  const sanityArticles = sanityPosts.map(post => ({
    _id: post._id,
    slug: post.slug.current,
    title: post.title,
    description: post.description,
    date: post.date,
    image: post.image ? urlFor(post.image).width(800).url() : undefined,
    source: 'sanity'
  }));

  // Merge and sort by date
  const allArticles = [...sanityArticles, ...webflowArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
```

**Benefits:**
- Seamless migration from Webflow to Sanity
- No content downtime
- Unified interface for both sources
- Automatic sorting by date

---

## Progressive Migration Strategy

### Cloudflare Worker Router

**Location:** `/cloudflare-worker/`

**Purpose:** Intelligent routing layer that enables zero-downtime progressive migration from Webflow to Next.js.

#### Architecture

```
User Request: packshot-creator.com/blog
         │
         ▼
┌────────────────────────────────────┐
│   Cloudflare Worker (Edge)         │
│                                    │
│   const MIGRATED_ROUTES = [        │
│     '/blog',                       │
│     '/contact',                    │
│     '/academy/formations-ia'       │
│   ];                               │
│                                    │
│   if (isMigrated) {                │
│     → Proxy to Next.js (Vercel)   │
│   } else {                         │
│     → Proxy to Webflow             │
│   }                                │
└────────────────────────────────────┘
```

#### Worker Implementation

**File:** `/cloudflare-worker/src/index.js`

```javascript
const MIGRATED_ROUTES = [
  // Add routes as pages are migrated
  // '/',
  // '/en',
  // '/blog',
  // '/contact'
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Check if route is migrated
    const isMigrated = MIGRATED_ROUTES.some(route =>
      pathname === route || pathname.startsWith(route + '/')
    );

    // Choose origin
    const origin = isMigrated ? env.NEXTJS_ORIGIN : env.WEBFLOW_ORIGIN;
    const targetUrl = new URL(pathname + url.search, origin);

    // Proxy request
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // Add debug headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Served-By', isMigrated ? 'nextjs' : 'webflow');
    newResponse.headers.set('X-Worker-Version', '1.0.0');

    return newResponse;
  }
};
```

#### Environment Variables

**File:** `/cloudflare-worker/wrangler.toml`

```toml
name = "packshot-creator-router"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
NEXTJS_ORIGIN = "https://packshot-creator.vercel.app"
WEBFLOW_ORIGIN = "https://packshot-creator.webflow.io"
```

#### Migration Workflow

1. **Develop page in Next.js**
   ```bash
   npm run dev
   # Test locally at localhost:3000
   ```

2. **Deploy to Vercel**
   ```bash
   git push origin main
   # Auto-deploys to Vercel
   ```

3. **Update Worker routes**
   ```javascript
   // cloudflare-worker/src/index.js
   const MIGRATED_ROUTES = [
     '/blog',       // ← Add new route
     '/contact'
   ];
   ```

4. **Deploy Worker**
   ```bash
   cd cloudflare-worker
   wrangler deploy
   ```

5. **Verify routing**
   ```bash
   curl -I https://packshot-creator.com/blog
   # Check X-Served-By: nextjs
   ```

#### Rollback Process

If a migrated page has issues:

1. **Remove from MIGRATED_ROUTES**
   ```javascript
   const MIGRATED_ROUTES = [
     // '/blog',  ← Comment out problematic route
     '/contact'
   ];
   ```

2. **Redeploy Worker**
   ```bash
   wrangler deploy
   # Traffic instantly routes back to Webflow
   ```

**Benefits:**
- Instant rollback (no DNS changes)
- No downtime
- Page-by-page migration
- Easy A/B testing
- Debug headers for verification

---

## API Integrations

### 1. Sanity Client (GROQ Queries)

**File:** `/lib/sanity-blog.ts`

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityBlogClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
});

// Image URL builder
const builder = imageUrlBuilder(sanityBlogClient);
export function urlFor(source: any) {
  return builder.image(source);
}
```

#### GROQ Query Examples

**Fetch all blog posts:**
```typescript
export async function getSanityBlogPosts(limit = 100): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost"] | order(date desc) [0...${limit}] {
    _id,
    slug,
    title,
    description,
    author,
    date,
    category,
    keywords,
    readingTime,
    image,
    content,
    seo
  }`;

  return sanityBlogClient.fetch(query);
}
```

**Fetch single post by slug:**
```typescript
export async function getSanityBlogPost(slug: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    description,
    author,
    date,
    category,
    keywords,
    readingTime,
    image,
    content,
    seo
  }`;

  return sanityBlogClient.fetch(query, { slug });
}
```

**GROQ Features Used:**
- `*[_type == "blogPost"]` - Filter by document type
- `order(date desc)` - Sort by date descending
- `[0...${limit}]` - Slice results
- `slug.current == $slug` - Parameterized query
- `[0]` - Get first result (single document)

### 2. Webflow REST API

**File:** `/lib/webflow.ts`

**Endpoint:** `https://api.webflow.com/v2/collections/{collectionId}/items`

**Authentication:** Bearer token in headers

```typescript
const response = await fetch(
  `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=${limit}`,
  {
    headers: {
      'Authorization': `Bearer ${WEBFLOW_API_KEY}`,
      'accept-version': '1.0.0',
    },
    next: { revalidate: 3600 }, // Next.js cache: 1 hour
  }
);
```

**Response Format:**
```json
{
  "items": [
    {
      "slug": "article-slug",
      "name": "Article Title",
      "post-summary": "Article description...",
      "created-on": "2024-01-01T00:00:00Z",
      "main-image": { "url": "https://cdn.webflow.com/..." },
      "post-body": "<p>Article HTML content...</p>"
    }
  ]
}
```

**Caching Strategy:**
- `next: { revalidate: 3600 }` - Revalidate every hour
- ISR (Incremental Static Regeneration) on-demand

---

## Image Optimization

### 1. Sanity Image URL Builder

**Transformation Pipeline:**

```typescript
import { urlFor } from '@/lib/sanity-blog';

// Original image reference from Sanity
const imageRef = sanityPost.image;

// Generate optimized URL
const optimizedUrl = urlFor(imageRef)
  .width(1200)           // Resize to 1200px width
  .height(630)           // Crop to 1200x630 (OG image ratio)
  .format('webp')        // Convert to WebP
  .quality(85)           // 85% quality
  .fit('crop')           // Crop to exact dimensions
  .auto('format')        // Auto-detect best format
  .url();

// Result: https://cdn.sanity.io/images/{projectId}/{dataset}/{imageId}-1200x630.webp?q=85
```

**Sanity Image CDN Features:**
- Automatic format detection (WebP, AVIF)
- On-the-fly resizing
- Hotspot/crop support
- Lazy loading metadata
- Global CDN distribution

**Usage Patterns:**

```typescript
// Blog listing thumbnail
urlFor(image).width(800).height(400).url()

// Blog hero image
urlFor(image).width(1200).height(600).url()

// Open Graph image
urlFor(image).width(1200).height(630).url()

// Mobile responsive
urlFor(image).width(600).height(400).url()
```

### 2. Next.js Image Component

**Configuration:** `/next.config.ts`

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com', // Webflow CDN
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',         // Cloudinary
      },
    ],
  },
};
```

**Usage:**

```typescript
import Image from 'next/image';

<Image
  src={post.image}
  alt={post.title}
  width={800}
  height={400}
  className="object-cover"
  priority={false}           // Lazy load by default
  placeholder="blur"         // Show blur placeholder
  blurDataURL={blurData}     // Low-res placeholder
/>
```

**Features:**
- Automatic lazy loading
- Responsive images (srcset)
- WebP/AVIF auto-conversion
- Layout shift prevention
- Priority loading for above-fold images

### 3. Cloudinary Integration

**Use Cases:**
- User-uploaded images
- Dynamic transformations
- Video thumbnails
- Advanced effects (blur, filters)

**Example URL:**
```
https://res.cloudinary.com/{cloud_name}/image/upload/
  c_fill,w_800,h_400,q_auto,f_auto/
  {image_id}.jpg
```

**Transformations:**
- `c_fill` - Crop and fill
- `w_800,h_400` - Dimensions
- `q_auto` - Automatic quality
- `f_auto` - Automatic format (WebP/AVIF)

---

## Routing & Redirects

### 1. App Router File-Based Routing

**Pattern:** File system = URL structure

```
app/[lang]/blog/page.tsx           → /fr/blog, /en/blog
app/[lang]/blog/[slug]/page.tsx    → /fr/blog/article-slug
app/[lang]/academy/page.tsx        → /fr/academy
app/[lang]/academy/[slug]/page.tsx → /fr/academy/formation-slug
```

**Dynamic Segments:**
- `[lang]` - Locale parameter (fr/en)
- `[slug]` - Dynamic route parameter
- `[[...tool]]` - Optional catch-all (Sanity Studio)

### 2. Redirects Configuration

**File:** `/next.config.ts`

```typescript
async redirects() {
  return [
    // ═════════════════════════════════════════════════════════
    // PRIORITY 1: SEO Duplication (Cannibalization) - 6 redirects
    // ═════════════════════════════════════════════════════════
    {
      source: '/packshot-secteur-chaussures',
      destination: '/industrie/chaussures',
      permanent: true, // 301 redirect
    },
    {
      source: '/packshot-secteur-bijouterie',
      destination: '/industrie/bijoux',
      permanent: true,
    },
    // ... more industry redirects

    // ═════════════════════════════════════════════════════════
    // PRIORITY 2: 3-Pillar Architecture (Hubs) - 2 redirects
    // ═════════════════════════════════════════════════════════
    {
      source: '/studio-photo',
      destination: '/studios-photo-automatises',
      permanent: true,
    },
    {
      source: '/blendai',
      destination: '/ia-photo-produit',
      permanent: true,
    },

    // ═════════════════════════════════════════════════════════
    // PRIORITY 3: Language Redirects (External) - 9 redirects
    // ═════════════════════════════════════════════════════════
    {
      source: '/de',
      destination: 'https://blendai.studio',
      permanent: true,
    },
    {
      source: '/de/:path*', // Wildcard: any path after /de/
      destination: 'https://blendai.studio',
      permanent: true,
    },
    {
      source: '/es',
      destination: 'https://blendai.studio',
      permanent: true,
    },
    {
      source: '/es/:path*',
      destination: 'https://blendai.studio',
      permanent: true,
    },
    {
      source: '/nl',
      destination: 'https://blendai.studio',
      permanent: true,
    },
    {
      source: '/nl/:path*',
      destination: 'https://blendai.studio',
      permanent: true,
    },

    // ═════════════════════════════════════════════════════════
    // CONTACT: URL Variants with Query Params
    // ═════════════════════════════════════════════════════════
    {
      source: '/fr/contact/demande-demo',
      destination: '/fr/contact?subject=demo',
      permanent: true,
    },
    {
      source: '/en/contact/request-demo',
      destination: '/en/contact?subject=demo',
      permanent: true,
    },
    {
      source: '/fr/contact/demande-devis-formation',
      destination: '/fr/contact?subject=formation',
      permanent: true,
    },
    {
      source: '/en/contact/training-quote',
      destination: '/en/contact?subject=training',
      permanent: true,
    },
  ];
}
```

**Redirect Types:**
- `permanent: true` → 301 (permanent redirect, cached by browsers)
- `permanent: false` → 307 (temporary redirect)
- `:path*` → Wildcard parameter (matches any path)

**SEO Impact:**
- 301 redirects transfer PageRank
- Prevents duplicate content issues
- Consolidates link equity

### 3. Middleware Routing

**File:** `/middleware.ts`

**Execution Order:**
1. Middleware runs on EVERY request
2. Checks locale in URL path
3. Redirects if no locale found
4. Passes to App Router

**Example Flow:**
```
Request: /blog
  ↓
Middleware detects no locale
  ↓
Redirects to: /fr/blog (default locale)
  ↓
App Router matches: app/[lang]/blog/page.tsx
  ↓
Renders page with { lang: 'fr' }
```

---

## Data Flow Diagrams

### Blog Article Rendering Flow

```
┌────────────────────────────────────────────────────────────────┐
│ User Request: /fr/blog/quel-format-d-image-pour-le-web        │
└────────────────────────────────────────────────────────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │ Middleware: next-intl                │
         │ - Detects locale: fr                 │
         │ - Loads messages/fr.json             │
         └────────────┬────────────────────────┘
                      │
                      ▼
         ┌─────────────────────────────────────┐
         │ App Router: app/[lang]/blog/[slug]   │
         │ - Params: { lang: 'fr', slug: '...' }│
         └────────────┬────────────────────────┘
                      │
                      ▼
         ┌─────────────────────────────────────┐
         │ getSanityBlogPost(slug)              │
         │ - GROQ query to Sanity               │
         │ - Returns: SanityBlogPost | null     │
         └────────────┬────────────────────────┘
                      │
                      ├─ Found? ─────────────────┐
                      │                          │
                      │ Not Found                │ Found
                      ▼                          ▼
         ┌─────────────────────────┐  ┌──────────────────────┐
         │ getWebflowArticle(slug) │  │ Render Sanity View   │
         │ - REST API call          │  │ - PortableText       │
         │ - Returns: Article|null  │  │ - Sanity Image URLs  │
         └────────────┬────────────┘  │ - SEO metadata       │
                      │                └──────────────────────┘
                      ├─ Found? ─────────┐
                      │                  │
                      │ Not Found        │ Found
                      ▼                  ▼
         ┌──────────────────┐  ┌──────────────────────┐
         │ notFound()       │  │ Render Webflow View  │
         │ - 404 Page       │  │ - HTML content       │
         └──────────────────┘  │ - Webflow CDN images │
                               │ - Legacy badge       │
                               └──────────────────────┘
```

### Image Optimization Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Sanity Image Reference in CMS                               │
│ {                                                            │
│   _type: 'image',                                            │
│   asset: { _ref: 'image-abc123-1200x800-jpg' },            │
│   hotspot: { x: 0.5, y: 0.5 }                              │
│ }                                                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
         ┌─────────────────────────────────────┐
         │ urlFor(imageRef)                     │
         │   .width(800)                        │
         │   .height(400)                       │
         │   .format('webp')                    │
         │   .quality(85)                       │
         │   .url()                             │
         └────────────┬────────────────────────┘
                      │
                      ▼
         ┌─────────────────────────────────────┐
         │ Sanity Image CDN                     │
         │ https://cdn.sanity.io/images/        │
         │   {projectId}/{dataset}/             │
         │   image-abc123-800x400.webp?q=85     │
         └────────────┬────────────────────────┘
                      │
                      ▼
         ┌─────────────────────────────────────┐
         │ Next.js Image Component              │
         │ <Image                               │
         │   src={optimizedUrl}                 │
         │   width={800}                        │
         │   height={400}                       │
         │   alt="..."                          │
         │ />                                   │
         └────────────┬────────────────────────┘
                      │
                      ▼
         ┌─────────────────────────────────────┐
         │ Browser Receives:                    │
         │ - WebP image (if supported)          │
         │ - Lazy loading                       │
         │ - Blur placeholder                   │
         │ - Responsive srcset                  │
         └─────────────────────────────────────┘
```

### Progressive Migration Flow

```
┌──────────────────────────────────────────────────────────────┐
│ User: packshot-creator.com/blog                              │
└────────────────────────────┬─────────────────────────────────┘
                             │
                             ▼
         ┌──────────────────────────────────────┐
         │ Cloudflare Worker (Edge)              │
         │                                       │
         │ const MIGRATED_ROUTES = [             │
         │   '/blog',      ← IS MIGRATED         │
         │   '/contact'                          │
         │ ];                                    │
         │                                       │
         │ pathname = '/blog'                    │
         │ isMigrated = true                     │
         └────────────┬─────────────────────────┘
                      │
                      ├─ isMigrated?
                      │
         Yes          │                No
          │           │                 │
          ▼           │                 ▼
┌───────────────────┐ │    ┌──────────────────────┐
│ Proxy to Next.js  │ │    │ Proxy to Webflow     │
│ (Vercel)          │ │    │ (Legacy)             │
│                   │ │    │                      │
│ Headers:          │ │    │ Headers:             │
│ X-Served-By:      │ │    │ X-Served-By:         │
│   nextjs          │ │    │   webflow            │
└───────┬───────────┘ │    └──────┬───────────────┘
        │             │           │
        └─────────────┴───────────┘
                      │
                      ▼
         ┌────────────────────────────────┐
         │ Response to User               │
         │ - Same domain (packshot...)    │
         │ - No user-visible difference   │
         │ - Debug header shows source    │
         └────────────────────────────────┘
```

---

## Integration Patterns

### 1. Server-Side Data Fetching Pattern

**Used in:** All page components in `/app/[lang]/`

```typescript
// Server Component (default in App Router)
export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Fetch data server-side
  const posts = await getAllArticles(0); // 0 = all
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  // Render with data
  return (
    <div>
      {posts.map(post => (
        <ArticleCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

**Benefits:**
- No client-side JavaScript for data fetching
- SEO-friendly (HTML rendered server-side)
- Faster initial page load
- Secure API keys (server-only)

### 2. Metadata Generation Pattern

**File:** `/app/[lang]/blog/[slug]/page.tsx`

```typescript
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;

  // Fetch data for metadata
  const sanityPost = await getSanityBlogPost(slug);

  if (sanityPost) {
    return {
      title: sanityPost.seo?.seoTitle || sanityPost.title,
      description: sanityPost.seo?.seoDescription || sanityPost.description,
      keywords: sanityPost.keywords?.join(', '),
      openGraph: {
        title: sanityPost.title,
        description: sanityPost.description,
        images: [urlFor(sanityPost.image).width(1200).height(630).url()],
        type: 'article',
        publishedTime: sanityPost.date,
        authors: [sanityPost.author]
      },
      robots: {
        index: !sanityPost.seo?.noIndex,
        follow: !sanityPost.seo?.noIndex
      }
    };
  }

  return { title: 'Article non trouvé' };
}
```

**Features:**
- Dynamic metadata per page
- SEO optimization (title, description, OG tags)
- Robots meta (noindex control)
- Social sharing previews

### 3. Parallel Data Fetching Pattern

**File:** `/lib/blog.ts`

```typescript
export async function getAllArticles(limit = 8): Promise<Article[]> {
  // Fetch from BOTH sources in PARALLEL (not sequential)
  const [sanityPosts, webflowArticles] = await Promise.all([
    getSanityBlogPosts(),    // Sanity CMS
    getWebflowArticles(),    // Webflow API
  ]);

  // Merge results
  const allArticles = [...sanityPosts, ...webflowArticles];

  // Sort by date
  allArticles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
```

**Benefits:**
- Faster total load time (parallel vs sequential)
- Resilient (if one source fails, other still works)
- Unified interface

### 4. Portable Text Rendering Pattern

**File:** `/app/[lang]/blog/[slug]/page.tsx`

```typescript
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';

// Render Sanity content
<PortableText
  value={sanityPost.content}
  components={portableTextComponents}
/>
```

**Components:** `/components/blog/PortableTextComponents.tsx`

```typescript
export const portableTextComponents = {
  types: {
    callout: ({ value }) => <Callout type={value.type} content={value.content} />,
    comparisonTable: ({ value }) => <ComparisonTable data={value} />,
    code: ({ value }) => <CodeBlock code={value.code} language={value.language} />,
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-secondary-orbitvu pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-secondary-orbitvu hover:underline">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-neutral-lighter px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
};
```

**Benefits:**
- Type-safe content rendering
- Custom React components for blocks
- Styled output with Tailwind
- Extensible for new content types

### 5. Caching Strategy Pattern

**Next.js Cache Layers:**

```typescript
// 1. Static Generation (Build Time)
export const dynamic = 'force-static'; // Generate at build

// 2. Incremental Static Regeneration (ISR)
export const revalidate = 3600; // Revalidate every hour

// 3. On-Demand Revalidation
// Via Sanity webhook → revalidatePath('/blog')

// 4. API Route Caching
fetch('https://api.webflow.com/...', {
  next: { revalidate: 3600 } // Cache 1 hour
});

// 5. Client-Side Caching
// React Query / SWR (not used in SSR-first approach)
```

**Cache Invalidation Flow:**

```
┌─────────────────────────────────────────────────────────┐
│ Content Editor: Publishes new blog post in Sanity       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────────┐
         │ Sanity Webhook (POST)             │
         │ → https://packshot-creator.com/   │
         │   api/revalidate?path=/blog       │
         └────────────┬──────────────────────┘
                      │
                      ▼
         ┌───────────────────────────────────┐
         │ Next.js API Route                 │
         │ revalidatePath('/blog')           │
         │ revalidatePath('/blog/[slug]')    │
         └────────────┬──────────────────────┘
                      │
                      ▼
         ┌───────────────────────────────────┐
         │ Next.js rebuilds pages            │
         │ - Blog listing                    │
         │ - New article page                │
         │ - Updated cache                   │
         └───────────────────────────────────┘
```

---

## Environment Variables

### Required Environment Variables

**File:** `.env.local`

```bash
# ═══════════════════════════════════════════════════════════
# Sanity CMS
# ═══════════════════════════════════════════════════════════
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# ═══════════════════════════════════════════════════════════
# Webflow API (Fallback)
# ═══════════════════════════════════════════════════════════
WEBFLOW_API_KEY=your_webflow_api_key
WEBFLOW_BLOG_COLLECTION_ID=your_collection_id

# ═══════════════════════════════════════════════════════════
# Cloudflare Worker (Deployment)
# ═══════════════════════════════════════════════════════════
# Set via wrangler.toml or Cloudflare dashboard
NEXTJS_ORIGIN=https://packshot-creator.vercel.app
WEBFLOW_ORIGIN=https://packshot-creator.webflow.io

# ═══════════════════════════════════════════════════════════
# Analytics (Optional)
# ═══════════════════════════════════════════════════════════
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Performance Optimizations

### 1. Static Site Generation (SSG)

```typescript
// Generate static pages at build time
export function generateStaticParams() {
  return routing.locales.map(locale => ({ lang: locale }));
}
```

### 2. Image Optimization

- Sanity Image CDN (automatic WebP/AVIF)
- Next.js `<Image>` component (lazy loading, srcset)
- Cloudinary on-demand transformations

### 3. Code Splitting

- Automatic by Next.js App Router
- Route-based code splitting
- Dynamic imports for heavy components

### 4. Font Optimization

```typescript
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap' // Prevent FOIT (Flash of Invisible Text)
});
```

### 5. Parallel Data Fetching

```typescript
const [sanityPosts, webflowArticles] = await Promise.all([
  getSanityBlogPosts(),
  getWebflowArticles(),
]);
```

---

## Security Considerations

### 1. API Key Management

- Environment variables (not in code)
- Server-side only (not exposed to client)
- Different keys for dev/prod

### 2. Content Security

- Sanity: Validated schemas
- Webflow: `dangerouslySetInnerHTML` (trusted source only)
- No user-generated content rendering

### 3. Rate Limiting

- Sanity: CDN caching (production)
- Webflow: ISR caching (1 hour)
- Cloudflare: Built-in DDoS protection

---

## Monitoring & Debugging

### 1. Debug Headers (Cloudflare Worker)

```bash
curl -I https://packshot-creator.com/blog

X-Served-By: nextjs
X-Worker-Version: 1.0.0
```

### 2. Vercel Logs

```bash
vercel logs
# View real-time deployment logs
```

### 3. Sanity Vision Tool

Access: https://packshot-creator.com/studio
- Test GROQ queries
- Inspect content structure
- Debug schema issues

### 4. Error Boundaries

```typescript
// app/[lang]/error.tsx
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

## Deployment Workflow

### 1. Development

```bash
npm run dev
# Runs on localhost:3000
# Hot reload enabled
```

### 2. Staging (Vercel Preview)

```bash
git push origin feature-branch
# Auto-deploys to preview URL
# https://packshot-creator-git-feature-branch.vercel.app
```

### 3. Production

```bash
git push origin main
# Auto-deploys to production
# https://packshot-creator.vercel.app
```

### 4. Cloudflare Worker Update

```bash
cd cloudflare-worker
wrangler deploy
# Deploys to Cloudflare edge
# Routes traffic to Next.js or Webflow
```

---

## Future Architecture Considerations

### 1. Full Webflow Migration

Once all pages are migrated:

1. Remove Cloudflare Worker
2. Point DNS directly to Vercel
3. Decommission Webflow API calls

### 2. Edge Rendering

Potential migration to Vercel Edge Functions for:
- Faster response times
- Global distribution
- Reduced latency

### 3. API Routes

Add Next.js API routes for:
- Contact form submissions
- Newsletter signups
- Analytics tracking
- Webhook receivers

### 4. Real-time Content

Implement Sanity Live Preview:
- Real-time content updates
- Editor preview mode
- Content synchronization

---

## Related Documentation

- [01-project-overview](../01-project-overview/README.md) - Project context and goals
- [02-setup-development](../02-setup-development/README.md) - Development environment setup
- [03-component-library](../03-component-library/README.md) - Component architecture
- [04-content-management](../04-content-management/README.md) - Sanity CMS guide
- [06-seo-performance](../06-seo-performance/README.md) - SEO and performance optimization

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Sanity Studio
npm run sanity:dev             # Run Sanity Studio locally
npm run sanity:deploy          # Deploy Sanity Studio

# Cloudflare Worker
cd cloudflare-worker
wrangler dev                   # Test Worker locally
wrangler deploy                # Deploy to Cloudflare edge
wrangler tail                  # View Worker logs
```

### Important URLs

- **Production:** https://packshot-creator.com
- **Vercel Preview:** https://packshot-creator.vercel.app
- **Sanity Studio:** https://packshot-creator.com/studio
- **Cloudflare Dashboard:** https://dash.cloudflare.com

---

**Last Updated:** January 2026
**Maintained By:** Development Team
**Status:** Living Document (Updated as architecture evolves)
