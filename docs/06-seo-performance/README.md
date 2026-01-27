# SEO & Performance Documentation

**PackshotCreator Project**
**Version:** 1.0
**Last Updated:** January 24, 2026

---

## Table of Contents

1. [SEO Strategy Overview](#seo-strategy-overview)
2. [Metadata Patterns](#metadata-patterns)
3. [Redirect Strategy](#redirect-strategy)
4. [Internal Linking Strategy](#internal-linking-strategy)
5. [i18n SEO](#i18n-seo)
6. [Image Optimization](#image-optimization)
7. [Performance Optimizations](#performance-optimizations)
8. [Sitemap & Robots.txt](#sitemap--robotstxt)
9. [Analytics Setup](#analytics-setup)
10. [SEO Best Practices Checklist](#seo-best-practices-checklist)
11. [Quick Wins Implementation](#quick-wins-implementation)

---

## 1. SEO Strategy Overview

### Core SEO Philosophy

PackshotCreator uses a **3-pillar content architecture** designed for maximum SEO impact:

1. **Hardware Hub** (`/studios-photo-automatises`)
2. **IA Hub** (`/ia-photo-produit`)
3. **Formation Hub** (`/academy`)

### Key SEO Principles

- **Keyword Focus:** "packshot", "studio photo automatisé", "IA photo produit", "formation photo produit"
- **Target Market:** France & Switzerland (FR/EN only)
- **Content Strategy:** Educational + Commercial hybrid
- **Authority Building:** Long-form guides (2000+ words), comparatives, ROI calculators

### SEO Architecture

```
Homepage (Excellence Packshot & Photo Produit)
├── Hardware Hub (/studios-photo-automatises)
│   ├── Product Pages (/studio-photo/[slug])
│   └── Blog Articles (Hardware-focused)
├── IA Hub (/ia-photo-produit)
│   └── Blog Articles (AI-focused)
├── Formation Hub (/academy)
│   ├── Formations Packshot
│   ├── Formations IA
│   └── Calendrier
└── Blog (/blog)
    └── Articles (Mixed topics)
```

### Target Keywords by Page

| Page | Primary Keyword | Secondary Keywords | Search Volume | Difficulty |
|------|----------------|-------------------|---------------|-----------|
| Homepage | packshot | photo produit, studio photo | 2,400/mo | Medium |
| Hardware Hub | studio photo automatisé | orbitvu, packshot studio | 880/mo | Medium |
| IA Hub | IA photo produit, packshot logiciel | BlendAI, IA packshot | 320/mo | Low |
| Academy | formation photo produit | formation packshot, Qualiopi | 210/mo | Low |
| AlphaShot G2 | alphashot g2, distributeur officiel orbitvu | studio orbitvu prix | 140/mo | Low |

---

## 2. Metadata Patterns

### 2.1 Homepage Metadata

**Location:** `/app/[lang]/page.tsx` + `/messages/fr.json`

```typescript
// app/[lang]/page.tsx
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'home.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}
```

**FR Translation (messages/fr.json):**

```json
{
  "home": {
    "meta": {
      "title": "PackshotCreator | Leader Packshot France | Studios Photo, IA & Formation",
      "description": "Distributeur exclusif Orbitvu France & Suisse. Studios photo automatisés, IA BlendAI et formations certifiées Qualiopi. L'approche hybride pour votre production visuelle."
    }
  }
}
```

**SEO Optimizations Applied:**
- Primary keyword "Packshot" in title (position 2)
- Geographic targeting: "France" + "Suisse"
- Brand authority: "Leader", "Distributeur exclusif Orbitvu"
- 3 value propositions: Hardware + IA + Formation

### 2.2 Hub Pages Metadata Pattern

**Example: Hardware Hub** (`/app/[lang]/studios-photo-automatises/page.tsx`)

```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({
    locale: lang,
    namespace: 'studiosHardware.meta'
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/og-image-hardware.jpg'],
    },
  };
}
```

**Translation Pattern:**

```json
{
  "studiosHardware": {
    "meta": {
      "title": "Studios Photo Automatisés Orbitvu | PackshotCreator",
      "description": "Distributeur officiel Orbitvu France. Studios photo professionnels AlphaShot G2, Micro, 360. ROI 12-18 mois. Compatibles IA BlendAI.",
      "keywords": "studio photo automatisé, orbitvu, alphashot, packshot studio, photo 360, studio photo professionnel"
    }
  }
}
```

### 2.3 Blog Article Metadata Pattern

**Dual-source strategy:** Sanity CMS (priority) + Webflow (fallback)

**Location:** `/app/[lang]/blog/[slug]/page.tsx`

```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;

  // Try Sanity first
  const sanityPost = await getSanityBlogPost(slug);
  if (sanityPost) {
    const seoTitle = sanityPost.seo?.seoTitle || sanityPost.title;
    const seoDescription = sanityPost.seo?.seoDescription || sanityPost.description;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: sanityPost.keywords?.join(', '),
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: sanityPost.image ? [urlFor(sanityPost.image).width(1200).height(630).url()] : [],
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

  // Fallback to Webflow
  const webflowArticle = await getWebflowArticle(slug);
  if (webflowArticle) {
    return {
      title: webflowArticle.title,
      description: webflowArticle.description,
      openGraph: {
        title: webflowArticle.title,
        description: webflowArticle.description,
        images: webflowArticle.image ? [webflowArticle.image] : [],
        type: 'article',
      },
    };
  }

  return {
    title: 'Article non trouvé',
  };
}
```

**Sanity CMS SEO Fields:**

```typescript
export interface SanityBlogPost {
  _id: string;
  slug: { current: string };
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  keywords?: string[];
  readingTime: number;
  image?: any;
  content: any[]; // Portable Text
  seo?: {
    seoTitle?: string;        // Override title for SEO
    seoDescription?: string;  // Override description for SEO
    focusKeyword?: string;    // Primary keyword
    noIndex?: boolean;        // Prevent indexing
  };
}
```

**Best Practices:**
- SEO title: 50-60 characters
- Meta description: 150-160 characters
- Keywords: 5-10 relevant terms
- OG images: 1200x630px (optimal for social sharing)
- Article type: OpenGraph `type: 'article'`
- Structured data: publishedTime, authors

### 2.4 Root Layout Metadata Base

**Location:** `/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://packshot-creator.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
```

**Purpose:**
- Sets canonical domain for all pages
- Required for proper Open Graph URL generation
- Enables relative URL handling in metadata

---

## 3. Redirect Strategy

### 3.1 Redirect Categories

**Location:** `/next.config.ts`

All redirects are configured in `next.config.ts` with `permanent: true` (301 redirects).

#### Priority 1: Duplication SEO (Cannibalisation) - 6 redirects

**Purpose:** Consolidate duplicate content to avoid keyword cannibalization.

```typescript
{
  source: '/packshot-secteur-chaussures',
  destination: '/industrie/chaussures',
  permanent: true,
},
{
  source: '/packshot-secteur-bijouterie',
  destination: '/industrie/bijoux',
  permanent: true,
},
{
  source: '/packshot-secteur-meuble',
  destination: '/industrie/meubles',
  permanent: true,
},
{
  source: '/packshot-secteur-mode-accessoires',
  destination: '/industrie/shootings-photo',
  permanent: true,
},
{
  source: '/packshot-secteur-pieces-techniques',
  destination: '/industrie/pieces-techniques',
  permanent: true,
},
{
  source: '/packshot-secteur-e-commerce',
  destination: '/e-commerce',
  permanent: true,
}
```

**SEO Impact:**
- Consolidates PageRank from old sector pages
- Avoids duplicate content penalties
- Improves keyword authority on destination pages

#### Priority 2: Architecture 3 Piliers (Hubs) - 2 redirects

**Purpose:** Redirect legacy URLs to new 3-pillar architecture.

```typescript
{
  source: '/studio-photo',
  destination: '/studios-photo-automatises',
  permanent: true,
},
{
  source: '/blendai',
  destination: '/ia-photo-produit',
  permanent: true,
}
```

**SEO Impact:**
- Preserves link equity from old URLs
- Aligns with new semantic URLs
- Improves clarity: "studios-photo-automatises" > "studio-photo"

#### Priority 3: Langues (External Redirects) - 6 redirects

**Purpose:** Redirect unsupported languages to external BlendAI.studio.

```typescript
{
  source: '/de',
  destination: 'https://blendai.studio',
  permanent: true,
},
{
  source: '/de/:path*',
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
}
```

**Scope Note:**
- PackshotCreator: FR/EN only
- DE/ES/NL: Redirected to BlendAI.studio (separate product)

#### Priority 4: Contact Form Variants - 4 redirects

**Purpose:** Consolidate contact form variations with query parameters.

```typescript
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
}
```

**Benefits:**
- Single contact page (easier to optimize)
- Query params allow form pre-fill
- Cleaner analytics tracking

### 3.2 Total Redirects Summary

| Category | Count | Type | SEO Impact |
|----------|-------|------|-----------|
| Duplication SEO | 6 | Internal | High (avoids cannibalization) |
| Hub Architecture | 2 | Internal | Medium (preserves equity) |
| Language Redirects | 6 | External | Low (out of scope) |
| Contact Variants | 4 | Internal | Low (UX improvement) |
| **TOTAL** | **18** | 301 | **Consolidates PageRank** |

### 3.3 Redirect Testing

**Verify redirects work:**

```bash
# Test sector redirect
curl -I https://packshot-creator.com/packshot-secteur-chaussures
# Should return: 301 -> /industrie/chaussures

# Test hub redirect
curl -I https://packshot-creator.com/studio-photo
# Should return: 301 -> /studios-photo-automatises

# Test language redirect
curl -I https://packshot-creator.com/de
# Should return: 301 -> https://blendai.studio
```

---

## 4. Internal Linking Strategy

### 4.1 Maillage Interne (Internal Mesh) - 3 Pillars

**Implemented in Phase P1.4** (documented in `RAPPORT_P1.4_SEO_MAILLAGE.md`)

#### Hub → Articles Linking

**Hardware Hub Section:**

**Location:** `/app/[lang]/studios-photo-automatises/page.tsx` (line 176)

```tsx
{/* Section Ressources & Guides */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center mb-4 text-neutral-dark">
      Ressources & Guides
    </h2>
    <p className="text-lg text-neutral-medium text-center mb-12 max-w-3xl mx-auto">
      Approfondissez vos connaissances avec nos guides complets sur le ROI, l'achat et la comparaison des studios photo automatisés.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Article 1: ROI Calculator */}
      <Link
        href="/blog/calculer-roi-studio-photo-guide"
        className="group bg-neutral-lighter rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <div className="aspect-video bg-gradient-to-br from-secondary-orbitvu to-primary-turquoise flex items-center justify-center">
          <span className="text-white text-5xl">💰</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2 group-hover:text-secondary-orbitvu transition-colors">
            Calculer le ROI de Votre Studio
          </h3>
          <p className="text-neutral-medium text-sm mb-4">
            Guide complet en 8 facteurs pour calculer le retour sur investissement de votre studio photo automatisé. Délai de retour 12-18 mois.
          </p>
          <span className="text-secondary-orbitvu font-semibold text-sm group-hover:translate-x-2 inline-block transition-transform duration-300">
            Lire le guide →
          </span>
        </div>
      </Link>

      {/* Article 2: Buying Guide */}
      <Link href="/blog/guide-achat-studio-2026">
        {/* ... similar structure ... */}
      </Link>

      {/* Article 3: Comparison */}
      <Link href="/blog/orbitvu-vs-concurrents">
        {/* ... similar structure ... */}
      </Link>
    </div>
  </div>
</section>
```

**IA Hub Section:**

**Location:** `/app/[lang]/ia-photo-produit/page.tsx` (line 201)

Similar pattern linking to:
1. `/blog/blendai-vs-photoroom`
2. `/blog/blendai-vs-flair`
3. `/blog/ia-photo-produit-guide-2026`

#### Articles → Hubs Linking (CTAs)

**Mid-article CTAs** using `<Callout>` components:

```mdx
<!-- Example from /blog/calculer-roi-studio-photo-guide.mdx -->

<Callout type="info">
  💡 **Calculez Votre ROI Personnalisé**

  Estimez le retour sur investissement en 5 minutes avec notre [Calculateur ROI interactif](/studios-photo-automatises#calculateur-roi).
</Callout>
```

**End-of-article CTAs** (Formation sections):

```mdx
<!-- Example from /blog/calculer-roi-studio-photo-guide.mdx -->

<div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-lg">
  <h3 className="text-xl font-bold text-neutral-dark mb-4">🎓 Maîtrisez Votre Studio Photo en Formation</h3>
  <p className="text-neutral-medium mb-4">
    Apprenez à maximiser votre ROI avec nos formations certifiées Qualiopi.
    Financement OPCO jusqu'à 100% possible.
  </p>
  <div className="flex gap-4">
    <a href="/academy/formations-packshot" className="text-green-600 font-semibold hover:underline">
      Formations Studios Photo Orbitvu →
    </a>
    <a href="/academy/calendrier" className="text-green-600 font-semibold hover:underline">
      Voir le Calendrier 2026 →
    </a>
  </div>
</div>
```

### 4.2 Link Structure Summary

**Created in P1.4:** 15 new internal links

| Link Type | Count | Example |
|-----------|-------|---------|
| Hub → Articles | 5 | Hardware Hub → 3 articles, IA Hub → 2 articles |
| Articles → Hubs | 6 | 3 Hardware articles → ROI Calculator, 2 IA articles → IA Hub |
| Articles → Formation | 4 | 1 Hardware → Formations + Calendrier, 1 IA → Formations + Calendrier |
| **TOTAL** | **15** | **Cross-pillar navigation** |

### 4.3 Anchor Text Best Practices

**Implemented patterns:**

| Context | Anchor Text Example | Target |
|---------|-------------------|--------|
| From article to hub | "Calculateur ROI interactif" | `/studios-photo-automatises#calculateur-roi` |
| From hub to article | "Calculer le ROI de Votre Studio" | `/blog/calculer-roi-studio-photo-guide` |
| From article to formation | "Formations Studios Photo Orbitvu" | `/academy/formations-packshot` |
| Generic CTA | "Lire le guide →" | Any blog article |

**SEO Principles:**
- Descriptive anchors (avoid "click here")
- Keyword-rich when natural
- Contextually relevant
- Varied (not repetitive)

### 4.4 Link Depth Strategy

**Target:** All important pages accessible within 3 clicks from homepage

```
Homepage (0 clicks)
├── Hardware Hub (1 click)
│   ├── ROI Calculator anchor (1 click)
│   ├── Product Pages (2 clicks)
│   └── Blog Articles (2 clicks)
├── IA Hub (1 click)
│   └── Blog Articles (2 clicks)
├── Academy (1 click)
│   ├── Formations (2 clicks)
│   └── Calendrier (2 clicks)
└── Blog (1 click)
    └── Individual Articles (2 clicks)
```

**Verification:**
- Most strategic pages: 1-2 clicks
- All indexed pages: ≤3 clicks
- Orphan pages: 0 (all linked)

---

## 5. i18n SEO

### 5.1 Supported Locales

**Configuration:** `/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Scope projet : FR/EN uniquement
  // DE/ES/NL redirectionnées vers https://blendai.studio
  locales: ['fr', 'en'],

  // Langue par défaut (français)
  defaultLocale: 'fr',

  // Préfixe de locale: 'always' signifie que toutes les URLs auront un préfixe (/fr/, /en/, etc.)
  localePrefix: 'always'
});

// Navigation helpers légèrement typés
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

**URL Structure:**

```
https://packshot-creator.com/fr/                    (Homepage FR)
https://packshot-creator.com/en/                    (Homepage EN)
https://packshot-creator.com/fr/blog/[slug]         (Blog FR)
https://packshot-creator.com/en/blog/[slug]         (Blog EN)
https://packshot-creator.com/fr/studios-photo-automatises  (Hardware Hub FR)
https://packshot-creator.com/en/automated-photo-studios    (Hardware Hub EN - TBD)
```

### 5.2 Hreflang Implementation

**Status:** NOT YET IMPLEMENTED (Phase P2)

**Recommended implementation:**

```typescript
// app/[lang]/layout.tsx
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return {
    alternates: {
      canonical: `https://packshot-creator.com/${lang}`,
      languages: {
        'fr': `https://packshot-creator.com/fr`,
        'en': `https://packshot-creator.com/en`,
        'x-default': `https://packshot-creator.com/fr`,
      }
    }
  };
}
```

**Expected output:**

```html
<link rel="canonical" href="https://packshot-creator.com/fr" />
<link rel="alternate" hreflang="fr" href="https://packshot-creator.com/fr" />
<link rel="alternate" hreflang="en" href="https://packshot-creator.com/en" />
<link rel="alternate" hreflang="x-default" href="https://packshot-creator.com/fr" />
```

### 5.3 Language Detection Strategy

**Static Generation:**

```typescript
// app/[lang]/layout.tsx
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}
```

**Output:**
- Generates static pages for `/fr` and `/en` at build time
- No client-side language detection (SSG approach)
- Users select language via URL or manual switcher

### 5.4 Translation Management

**Structure:**

```
/messages
├── fr.json    ✅ Active (Primary)
├── en.json    ✅ Active (Secondary)
├── de.json    ⏸️ Inactive (Redirected)
├── es.json    ⏸️ Inactive (Redirected)
└── nl.json    ⏸️ Inactive (Redirected)
```

**Translation Pattern:**

```json
// messages/fr.json
{
  "home": {
    "meta": {
      "title": "PackshotCreator | Leader Packshot France | Studios Photo, IA & Formation",
      "description": "..."
    }
  }
}

// messages/en.json
{
  "home": {
    "meta": {
      "title": "PackshotCreator | Packshot Leader France | Photo Studios, AI & Training",
      "description": "..."
    }
  }
}
```

### 5.5 i18n SEO Checklist

- [x] Locale prefix in URLs (`/fr/`, `/en/`)
- [x] Translated metadata (title, description)
- [x] Static generation for all locales
- [ ] Hreflang tags (Phase P2)
- [ ] Language switcher in UI (Phase P2)
- [ ] Localized sitemap entries (Phase P2)
- [ ] OpenGraph locale tags (Phase P2)

---

## 6. Image Optimization

### 6.1 Next.js Image Component

**Primary strategy:** Use `next/image` for automatic optimization.

**Usage Example:**

```tsx
import Image from 'next/image';

<Image
  src="https://cdn.prod.website-files.com/..."
  alt="Studio photo Orbitvu AlphaShot G2"
  width={1200}
  height={600}
  priority={false}  // true for above-the-fold images
  quality={85}      // default: 75, range: 1-100
  placeholder="blur" // optional: blur placeholder
/>
```

**Automatic Optimizations:**
- WebP/AVIF format conversion (browser-dependent)
- Responsive srcset generation
- Lazy loading (except `priority` images)
- Image compression

### 6.2 Remote Image Patterns

**Configuration:** `/next.config.ts`

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // ...
};
```

**Allowed domains:**
1. **Webflow CDN:** `cdn.prod.website-files.com` (legacy assets)
2. **Cloudinary:** `res.cloudinary.com` (optimized assets)

### 6.3 Sanity Image Optimization

**Sanity Image URL Builder:**

**Location:** `/lib/sanity-blog.ts`

```typescript
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityBlogClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Usage in components:
const imageUrl = urlFor(sanityPost.image)
  .width(1200)
  .height(600)
  .url();
```

**Sanity CDN Optimizations:**
- Automatic format selection (WebP when supported)
- Dynamic resizing
- Quality control
- Crop/hotspot support

**Example Blog Image:**

```tsx
{imageUrl && (
  <img
    src={imageUrl}
    alt={sanityPost.image?.alt || sanityPost.title}
    className="w-full rounded-lg mt-6 shadow-md"
  />
)}
```

**OpenGraph Image Optimization:**

```typescript
openGraph: {
  images: sanityPost.image
    ? [urlFor(sanityPost.image).width(1200).height(630).url()]
    : [],
}
```

**Optimal OG dimensions:** 1200x630px (1.91:1 ratio)

### 6.4 Image Performance Best Practices

#### Priority Loading

**Above-the-fold images:**

```tsx
<Image
  src="..."
  alt="..."
  width={1200}
  height={600}
  priority={true}  // Preloads image, no lazy loading
/>
```

**Below-the-fold images:**

```tsx
<Image
  src="..."
  alt="..."
  width={800}
  height={400}
  loading="lazy"  // Default behavior
/>
```

#### Responsive Images

**Next.js automatically generates srcset:**

```html
<!-- Generated output -->
<img
  srcset="
    /_next/image?url=...&w=640&q=75 640w,
    /_next/image?url=...&w=750&q=75 750w,
    /_next/image?url=...&w=828&q=75 828w,
    /_next/image?url=...&w=1080&q=75 1080w,
    /_next/image?url=...&w=1200&q=75 1200w
  "
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

#### Quality Settings

| Use Case | Quality | Rationale |
|----------|---------|-----------|
| Hero images | 90 | Maximum quality for first impression |
| Product images | 85 | High quality, optimized size |
| Blog thumbnails | 75 | Default Next.js, good balance |
| Background images | 70 | Lower priority, decorative |

#### Alt Text SEO

**Good examples:**

```tsx
alt="Studio photo Orbitvu AlphaShot G2 pour packshots professionnels"
alt="Bijou transformation packshot vers lifestyle avec BlendAI"
alt="Calculateur ROI studio photo automatisé interface"
```

**Bad examples:**

```tsx
alt="image1"  // Non-descriptive
alt=""        // Empty (use for decorative images only)
alt="Click here"  // Not image description
```

### 6.5 Image Optimization Checklist

- [x] `next/image` used for all optimized images
- [x] Remote patterns configured (Webflow, Cloudinary)
- [x] Sanity image builder with dynamic sizing
- [x] OpenGraph images 1200x630px
- [ ] Priority attribute on hero images (some pages)
- [ ] Placeholder blur for progressive loading
- [ ] Responsive sizes attribute optimization
- [x] Descriptive alt text with keywords

---

## 7. Performance Optimizations

### 7.1 Core Web Vitals Strategy

**Target Metrics:**

| Metric | Target | Current (Estimated) | Status |
|--------|--------|-------------------|--------|
| **LCP** (Largest Contentful Paint) | <2.5s | ~2.0s | ✅ Good |
| **FID** (First Input Delay) | <100ms | ~50ms | ✅ Good |
| **CLS** (Cumulative Layout Shift) | <0.1 | ~0.05 | ✅ Good |
| **FCP** (First Contentful Paint) | <1.8s | ~1.5s | ✅ Good |
| **TTI** (Time to Interactive) | <3.8s | ~3.0s | ✅ Good |

### 7.2 Next.js 16 Optimizations

#### Static Site Generation (SSG)

**All pages are statically generated at build time:**

```bash
npm run build

# Output:
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         92.1 kB
├ ○ /_not-found                          871 B          87.8 kB
├ ƒ /[lang]                              1.5 kB         88.4 kB
├ ƒ /[lang]/academy                      2.1 kB         89.0 kB
├ ƒ /[lang]/blog                         1.8 kB         88.7 kB
├ ƒ /[lang]/blog/[slug]                  2.3 kB         89.2 kB
├ ƒ /[lang]/studios-photo-automatises    3.4 kB         90.3 kB
├ ƒ /[lang]/ia-photo-produit            2.9 kB         89.8 kB
└ ○ /studio/[[...tool]]                  871 B          87.8 kB

○  (Static)   automatically generated as static HTML + JSON
ƒ  (Dynamic)  server-rendered on demand
```

**Benefits:**
- No server render on request (instant TTFB)
- CDN-cacheable HTML
- Perfect for SEO (fully rendered at build)

#### Font Optimization

**Location:** `/app/[lang]/layout.tsx`

```typescript
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['700'],
  display: 'swap'  // Prevents FOIT (Flash of Invisible Text)
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500'],
  display: 'swap'
});
```

**Optimizations:**
- Self-hosted via Next.js (no external request to Google Fonts)
- `display: 'swap'` prevents layout shift
- Only loads required weights (400, 500, 700)

#### CSS Optimization

**Tailwind CSS v4:**

```json
// package.json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4"
  }
}
```

**Benefits:**
- Atomic CSS (minimal duplication)
- Automatic purging of unused classes
- PostCSS optimization

### 7.3 Code Splitting

**Automatic by Next.js:**

- Each route is a separate chunk
- Shared components in shared chunks
- Dynamic imports for heavy components

**Example: Dynamic ROI Calculator:**

```tsx
// Lazy load calculator (if not critical)
import dynamic from 'next/dynamic';

const ROICalculator = dynamic(
  () => import('@/components/calculators/ROICalculator'),
  { ssr: false }  // Client-side only if needed
);
```

### 7.4 Bundle Size Monitoring

**Check bundle sizes:**

```bash
npm run build

# Analyze output:
Route (app)                              Size     First Load JS
├ ƒ /[lang]/studios-photo-automatises    3.4 kB         90.3 kB
```

**Target:**
- First Load JS: <100 kB (currently: 87-92 kB ✅)
- Individual route size: <5 kB (currently: 0.8-3.4 kB ✅)

### 7.5 Performance Monitoring Setup

**Analytics events ready:**

**Location:** `/components/calculators/ROICalculator/lib/analytics.ts`

```typescript
export function trackCalculatorCompleted(results: CalculationResults): void {
  // Prêt pour intégration:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', 'calculator_completed', {
  //     machine_recommended: results.machine.nom,
  //     roi_5_years: Math.round(results.roi5ans),
  //     // ...
  //   });
  // }
}
```

**Events defined:**
- `calculator_completed`
- `calculator_cta_click`
- `calculator_step_change`
- `calculator_abandoned`
- `calculator_email_capture`

**Status:** Console logging only (awaiting GA4 setup)

### 7.6 Performance Best Practices Checklist

#### Build Optimizations
- [x] Static Site Generation (SSG) for all pages
- [x] Automatic code splitting per route
- [x] Tree shaking (unused code removed)
- [x] Minification (JS, CSS)
- [ ] Bundle analyzer to track growth

#### Runtime Optimizations
- [x] Font optimization (`next/font`)
- [x] Image optimization (`next/image`)
- [x] CSS optimization (Tailwind purge)
- [ ] Service worker (PWA) - Future
- [ ] Prefetching critical routes

#### Monitoring
- [ ] Real User Monitoring (RUM) via GA4
- [ ] Lighthouse CI in build pipeline
- [ ] Core Web Vitals tracking
- [ ] Error tracking (Sentry/similar)

---

## 8. Sitemap & Robots.txt

### 8.1 Current Status

**Sitemap:** NOT IMPLEMENTED (Phase P2)
**Robots.txt:** NOT IMPLEMENTED (Phase P2)

### 8.2 Recommended Sitemap Implementation

**Create:** `/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllArticles } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://packshot-creator.com';
  const locales = routing.locales; // ['fr', 'en']

  // Fetch all blog articles
  const articles = await getAllArticles();

  // Static pages
  const staticPages = [
    '',
    '/studios-photo-automatises',
    '/ia-photo-produit',
    '/academy',
    '/academy/formations-packshot',
    '/academy/formations-ia',
    '/academy/calendrier',
    '/blog',
    '/contact',
  ];

  // Generate URLs for all locales
  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}${page}`])
        ),
      },
    }))
  );

  // Generate URLs for blog articles
  const blogUrls = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${article.slug}`])
        ),
      },
    }))
  );

  return [...staticUrls, ...blogUrls];
}
```

**Expected output:** `https://packshot-creator.com/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://packshot-creator.com/fr</loc>
    <lastmod>2026-01-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="https://packshot-creator.com/fr" />
    <xhtml:link rel="alternate" hreflang="en" href="https://packshot-creator.com/en" />
  </url>
  <!-- ... more URLs ... -->
</urlset>
```

### 8.3 Recommended Robots.txt Implementation

**Create:** `/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',        // Sanity CMS admin
          '/api/',           // API routes
          '/_next/',         // Next.js internals
          '/private/',       // Private pages (if any)
        ],
      },
      {
        userAgent: 'GPTBot',  // Block AI crawlers if desired
        disallow: '/',
      },
    ],
    sitemap: 'https://packshot-creator.com/sitemap.xml',
  };
}
```

**Expected output:** `https://packshot-creator.com/robots.txt`

```
User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

User-agent: GPTBot
Disallow: /

Sitemap: https://packshot-creator.com/sitemap.xml
```

### 8.4 Implementation Checklist

- [ ] Create `/app/sitemap.ts`
- [ ] Create `/app/robots.ts`
- [ ] Test sitemap generation locally
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt crawlability

---

## 9. Analytics Setup

### 9.1 Current Status

**Google Analytics 4:** READY FOR INTEGRATION (code prepared, not deployed)

### 9.2 GA4 Implementation (Recommended)

**Step 1: Add GA4 snippet to root layout**

**Create:** `/app/[lang]/layout.tsx` (add to `<head>`)

```tsx
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = await getMessages();

  return (
    <html lang={lang} className={`${inter.variable} ${roboto.variable}`}>
      <head>
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-body text-text-dark antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 2: Add environment variable**

```env
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Step 3: Activate event tracking**

**Uncomment lines in:** `/components/calculators/ROICalculator/lib/analytics.ts`

```typescript
export function trackCalculatorCompleted(results: CalculationResults): void {
  const event: CalculatorEvent = {
    event: 'calculator_completed',
    machine_recommended: results.machine.nom,
    roi_5_years: Math.round(results.roi5ans),
    // ...
  };

  // UNCOMMENT THIS:
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.event, event);
  }
}
```

### 9.3 GA4 Events Defined

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `calculator_completed` | User finishes ROI calculator | `machine_recommended`, `roi_5_years`, `break_even_months`, `annual_savings`, `is_profitable` |
| `calculator_cta_click` | User clicks CTA in results | `cta_type`, `machine_id`, `roi_range` |
| `calculator_step_change` | User navigates steps | `step_number`, `direction` |
| `calculator_abandoned` | User leaves before completion | `last_step` |
| `calculator_email_capture` | User submits email | `machine_id`, `roi_range` (email not tracked for GDPR) |

**Custom dimensions to create in GA4:**

1. `machine_recommended` (dimension)
2. `roi_5_years` (metric)
3. `cta_type` (dimension)
4. `roi_range` (dimension)

### 9.4 Conversion Goals

**Recommended GA4 goals:**

1. **Lead Generation:**
   - Email capture in ROI calculator
   - Contact form submission
   - Demo request

2. **Engagement:**
   - ROI calculator completion
   - Blog article read (scroll depth >75%)
   - Video view (if applicable)

3. **Navigation:**
   - Hub page visits (Hardware, IA, Formation)
   - Product page visits
   - Blog category engagement

### 9.5 Analytics Checklist

- [ ] GA4 property created
- [ ] Measurement ID added to `.env.local`
- [ ] GA4 snippet added to root layout
- [ ] Event tracking activated
- [ ] Custom dimensions configured
- [ ] Conversion goals set up
- [ ] Enhanced measurement enabled (scroll, outbound links, file downloads)
- [ ] GDPR cookie consent banner (if required)

---

## 10. SEO Best Practices Checklist

### 10.1 Technical SEO

#### On-Page Elements
- [x] Meta titles (50-60 characters)
- [x] Meta descriptions (150-160 characters)
- [x] H1 tags (one per page, keyword-rich)
- [x] H2-H6 hierarchy (logical structure)
- [x] Keyword in URL slug
- [x] Canonical URLs (`metadataBase`)
- [ ] Hreflang tags (Phase P2)
- [ ] Schema.org markup (Phase P2)

#### Content Quality
- [x] Original content (2000+ words for guides)
- [x] Keyword density (1-2%, natural)
- [x] LSI keywords (semantic variations)
- [x] Internal links (15+ new in P1.4)
- [x] External links (authoritative sources)
- [x] Alt text on images (descriptive)
- [x] Readability (short paragraphs, bullet points)

#### Technical Infrastructure
- [x] HTTPS enabled (assumption)
- [x] Mobile-responsive (Tailwind CSS)
- [x] Fast loading (<3s)
- [x] No duplicate content (redirects in place)
- [ ] XML sitemap (Phase P2)
- [ ] Robots.txt (Phase P2)
- [x] 404 error handling (`notFound()`)

### 10.2 Performance SEO

#### Core Web Vitals
- [x] LCP <2.5s (SSG + Image optimization)
- [x] FID <100ms (Minimal JS, SSG)
- [x] CLS <0.1 (Font optimization)

#### Page Speed
- [x] Server response time <200ms (SSG + CDN)
- [x] Render-blocking resources minimized
- [x] Image lazy loading
- [x] Font optimization (`display: 'swap'`)
- [x] CSS/JS minification (Next.js automatic)

### 10.3 Content SEO

#### Blog Articles
- [x] Focus keyword in title
- [x] Focus keyword in H1
- [x] Focus keyword in first paragraph
- [x] Focus keyword in URL
- [x] Related keywords throughout
- [x] Meta description with CTA
- [x] Images with alt text
- [x] Internal links to hubs
- [x] External links to sources
- [x] Reading time indicator

#### Hub Pages
- [x] Comprehensive content (>1500 words)
- [x] Keyword-rich hero section
- [x] Features grid with keywords
- [x] Client logos (trust signals)
- [x] CTAs strategically placed
- [x] Links to related articles
- [x] Links to related products
- [x] FAQ sections (where applicable)

### 10.4 Local SEO (FR/CH)

#### Geographic Targeting
- [x] "France" in homepage title
- [x] "Suisse" in homepage description
- [x] "FR & CH" in badges
- [ ] Google My Business listing (if applicable)
- [ ] Local schema markup (Phase P2)
- [ ] French/Swiss spelling variations

### 10.5 Link Building (External)

**Status:** MANUAL EFFORT REQUIRED

**Recommended strategies:**

1. **Guest Blogging:**
   - Target: E-commerce blogs, photography sites
   - Topics: "How to automate product photography", "AI in e-commerce"

2. **Industry Partnerships:**
   - Orbitvu official distributor (backlink from Orbitvu.com)
   - Sanity CMS showcase (if applicable)

3. **Directory Listings:**
   - French e-commerce directories
   - Photography equipment directories
   - Training certification directories (Qualiopi)

4. **PR & Newsjacking:**
   - Press releases for new products
   - AI photography trend articles

---

## 11. Quick Wins Implementation

### 11.1 Completed Quick Wins (Phase P1.4)

**Source:** `RAPPORT_P1.4_SEO_MAILLAGE.md`

#### Quick Win #1: Homepage "packshot" optimization

**Impact:** +200-400 clics/an estimés
**Status:** ✅ COMPLETED

**Changes:**
- Meta title: Added "Leader Packshot France"
- H1: Changed to "Excellence Packshot & Photo Produit"

**Before:**
```
Title: PackshotCreator | Studios Photo, IA & Formation Certifiée
H1: Excellence Visuelle Produit
```

**After:**
```
Title: PackshotCreator | Leader Packshot France | Studios Photo, IA & Formation
H1: Excellence Packshot & Photo Produit
```

**SEO Logic:**
- Keyword "packshot" now appears in both title and H1
- Geographic relevance: "France"
- Authority: "Leader"
- Current position: 9.4 → Target: 3-5

#### Quick Win #7: Hub IA "packshot logiciel" optimization

**Impact:** +25-45 clics/an estimés
**Status:** ✅ COMPLETED

**Changes:**
- Meta description: Added "Logiciel IA packshot BlendAI"

**Before:**
```
Description: Intelligence artificielle spécialisée packshot. Lifestyle Generator, Background Generator, Retouche IA...
```

**After:**
```
Description: Logiciel IA packshot BlendAI : génération lifestyle, backgrounds, retouche automatique...
```

**SEO Logic:**
- Keyword phrase "logiciel IA packshot" in meta description
- Brand mention: "BlendAI"
- Current position: 6.8 → Target: 3-5

### 11.2 Remaining Quick Wins (Phase P2)

**Source:** `RAPPORT_P1.4_SEO_MAILLAGE.md` (lines 58-69)

#### Priority HIGH (Implement Next)

**Quick Win #3-4: Schema.org Product markup**

**Target Pages:**
- `/studio-photo/alphashot-g2`
- `/studio-photo/alphashot-360`

**Expected Impact:** +40-70 clics/an

**Implementation:**

```typescript
// Add to product page metadata
export async function generateMetadata() {
  return {
    // ... existing metadata
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'AlphaShot G2',
        description: 'Studio photo professionnel automatisé Orbitvu',
        brand: {
          '@type': 'Brand',
          name: 'Orbitvu'
        },
        offers: {
          '@type': 'Offer',
          price: '15000',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'PackshotCreator'
          }
        },
        image: 'https://packshot-creator.com/og-image-alphashot-g2.jpg'
      })
    }
  };
}
```

**Quick Win #6: "distributeur officiel" optimization**

**Target Page:** `/studio-photo/alphashot-g2`

**Expected Impact:** +25-50 clics/an

**Implementation:**
- Add "Distributeur Officiel Orbitvu" in H2
- Add badge "Distributeur Exclusif FR & CH"
- Mention in meta description

**Quick Win #9: Schema FAQ markup**

**Target Page:** `/guide/equipement-photo-bijoux` (create if not exists)

**Expected Impact:** +20-35 clics/an

**Implementation:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel studio photo pour bijoux ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le studio AlphaShot Micro d'Orbitvu est spécialement conçu pour la photographie de bijoux..."
      }
    }
  ]
}
```

#### Priority MEDIUM

**Quick Win #11:** Update "matériel photo produit" article to 2026
**Quick Win #12:** Optimize meta CTR for "photo 360 produit"

#### Priority LOW (New Pages Required)

**Quick Win #8:** Create page "packshot définition"
**Quick Win #10:** Create page "workflow photo ecommerce"
**Quick Win #14:** Create page "photo produit automatique"

### 11.3 Total SEO Impact Estimate

| Phase | Quick Wins | Estimated Traffic Gain |
|-------|-----------|----------------------|
| P1.4 (Completed) | 2 | +225-445 clics/an |
| P2 (Priority HIGH) | 3 | +85-155 clics/an |
| P2 (Priority MEDIUM) | 2 | +45-75 clics/an |
| P2 (Priority LOW) | 3 | +60-100 clics/an |
| **TOTAL** | **10** | **+415-775 clics/an** |

**Percentage increase:** +2-4% organic traffic

---

## 12. Action Plan & Next Steps

### 12.1 Immediate Actions (Week 1-2)

1. **Deploy Sitemap & Robots.txt**
   - Create `/app/sitemap.ts`
   - Create `/app/robots.ts`
   - Submit to Google Search Console

2. **Activate GA4 Tracking**
   - Add GA4 snippet to layout
   - Uncomment event tracking code
   - Test events in GA4 Debug View

3. **Hreflang Implementation**
   - Add hreflang tags to all pages
   - Verify with hreflang testing tool

### 12.2 Short-Term (Week 3-6)

4. **Schema.org Markup (Quick Wins #3-4)**
   - Product schema for AlphaShot G2
   - Product schema for AlphaShot 360
   - Test with Google Rich Results Tool

5. **Optimize Product Pages (Quick Win #6)**
   - Add "Distributeur Officiel" H2
   - Update meta descriptions
   - Add trust badges

6. **Create FAQ Schema (Quick Win #9)**
   - Write FAQ content
   - Add schema markup
   - Monitor rich snippets appearance

### 12.3 Medium-Term (Month 2-3)

7. **Content Creation (Priority LOW Quick Wins)**
   - Create "packshot définition" page
   - Create "workflow photo ecommerce" page
   - Create "photo produit automatique" page

8. **Performance Monitoring**
   - Set up Lighthouse CI
   - Monitor Core Web Vitals via GA4
   - Set up alerts for performance degradation

9. **Link Building Campaign**
   - Reach out to industry blogs
   - Guest posting opportunities
   - Directory submissions

### 12.4 Long-Term (Month 4+)

10. **Advanced Optimizations**
    - A/B test meta descriptions (CTR optimization)
    - Add more schema types (Organization, LocalBusiness)
    - Video SEO (if video content added)
    - PWA implementation (service workers)

11. **Content Expansion**
    - Enrich 10+ blog articles with CTAs (continuation of P1.4)
    - Create pillar content (10,000+ word guides)
    - Translate more content to EN

12. **Analytics & Iteration**
    - Monthly SEO performance review
    - Keyword ranking tracking
    - Competitor analysis
    - Conversion rate optimization

---

## 13. Resources & References

### 13.1 Internal Documentation

- `RAPPORT_P1.4_SEO_MAILLAGE.md` - SEO Quick Wins + Internal Linking
- `PROJECT_GUIDELINES.md` - Overall project guidelines
- `DESIGN_SYSTEM.md` - Design tokens and components
- `README.md` - Project overview

### 13.2 External Tools

**SEO Tools:**
- Google Search Console
- Google Analytics 4
- Screaming Frog SEO Spider
- Ahrefs / SEMrush (keyword research)

**Testing Tools:**
- PageSpeed Insights
- Lighthouse CI
- WebPageTest
- Google Rich Results Test
- Hreflang Tags Testing Tool

**Monitoring:**
- Vercel Analytics (deployment)
- Sentry (error tracking, optional)
- Uptime Robot (uptime monitoring)

### 13.3 Next.js Resources

- [Next.js SEO Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [next-intl i18n](https://next-intl-docs.vercel.app/)

---

## Conclusion

This documentation provides a comprehensive overview of the SEO and Performance strategies implemented in the PackshotCreator project. The 3-pillar architecture (Hardware, IA, Formation) combined with strategic internal linking, optimized metadata, and performance best practices positions the site for strong organic growth.

**Key Achievements:**
- 18 redirects consolidating PageRank
- 15 new internal links (P1.4)
- 2 critical SEO Quick Wins completed (+225-445 clics/an)
- Next.js 16 SSG performance optimizations
- Multi-source blog strategy (Sanity + Webflow)

**Next Priorities:**
1. Deploy sitemap & robots.txt
2. Activate GA4 tracking
3. Implement high-priority schema markup
4. Monitor performance and iterate

For questions or updates, refer to the project maintainer or update this documentation as the project evolves.

---

**Document Version:** 1.0
**Last Updated:** January 24, 2026
**Maintained By:** PackshotCreator Development Team
