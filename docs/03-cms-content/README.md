# CMS & Content Management Documentation

Complete guide for managing content in the PackshotCreator project using Sanity CMS.

## Table of Contents

1. [Overview](#overview)
2. [Sanity Studio Setup](#sanity-studio-setup)
3. [Content Schemas Reference](#content-schemas-reference)
4. [Portable Text Components](#portable-text-components)
5. [Content Editor Workflow](#content-editor-workflow)
6. [GROQ Queries Guide](#groq-queries-guide)
7. [Dual Content Source System](#dual-content-source-system)
8. [Media Management](#media-management)
9. [SEO Metadata Management](#seo-metadata-management)
10. [Migration Guide](#migration-guide)

---

## Overview

### What is Sanity CMS?

Sanity is a headless CMS (Content Management System) that provides a structured content backend for the PackshotCreator website. Content editors can create and manage blog posts and training content through an intuitive interface, while developers query this content via APIs.

### Key Features

- **Real-time Content Editing**: Changes appear immediately in the Studio
- **Structured Content**: Defined schemas ensure data consistency
- **Portable Text**: Rich text format that's platform-agnostic
- **Custom Components**: Callouts, comparison tables, code blocks
- **SEO Optimization**: Built-in SEO fields and metadata
- **Image Optimization**: Automatic image processing and CDN delivery
- **Version Control**: Built-in content versioning
- **Multi-dataset Support**: Separate public and private datasets

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PackshotCreator Website                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐           ┌──────────────┐                │
│  │   Sanity     │  Primary  │   Webflow    │  Fallback      │
│  │   CMS        ├──────────▶│   CMS        ├───────────┐    │
│  │  (New Posts) │           │  (Archives)  │           │    │
│  └──────┬───────┘           └──────────────┘           │    │
│         │                                               │    │
│         ▼                                               ▼    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │            lib/blog.ts (Content Aggregator)            ││
│  │         Merges & sorts by date descending             ││
│  └─────────────────────────────────────────────────────────┘│
│                          │                                   │
│                          ▼                                   │
│                  Blog Pages Display                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Sanity Studio Setup

### Accessing the Studio

The Sanity Studio is integrated directly into the Next.js application:

**Local Development:**
```
http://localhost:3000/studio
```

**Production:**
```
https://packshot-creator.com/studio
```

### Configuration Files

#### Main Configuration: `/sanity.config.ts`

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

  basePath: '/studio',

  plugins: [
    structureTool(),  // Document management UI
    visionTool(),     // GROQ query testing tool
    codeInput()       // Code block support
  ],

  schema: {
    types: schemaTypes,
  },
});
```

#### Client Configuration: `/sanity/lib/client.ts`

Two separate clients for different use cases:

**Content Client** (Public content):
```typescript
export const contentClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // CDN enabled for better performance
});
```

**Data Client** (Private/sensitive data):
```typescript
export const dataClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_PRIVATE_DATASET || 'private',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false, // No CDN for sensitive data
  token: process.env.SANITY_PRIVATE_TOKEN,
});
```

### Environment Variables

Required variables (add to `.env.local`):

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-api-token

# Optional: Private dataset (for future use)
SANITY_PRIVATE_DATASET=private
SANITY_PRIVATE_TOKEN=your-private-token
```

**How to get these values:**

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. **Project ID**: Found in project settings
4. **Dataset**: Usually "production"
5. **API Token**: Generate in API settings (read or write permissions)

### Studio Route Implementation

The Studio is accessible through a Next.js catch-all route:

**File**: `/app/studio/[[...tool]]/page.tsx`

```typescript
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

---

## Content Schemas Reference

### Schema Structure

All schemas are defined in `/sanity/schemas/` and exported through `/sanity/schemas/index.ts`:

```typescript
import formation from './formation';
import blogPost from './blogPost';
import callout from './callout';
import comparisonTable from './comparisonTable';

export const schemaTypes = [
  formation,
  blogPost,
  callout,
  comparisonTable
];
```

---

### 1. Blog Post Schema

**File**: `/sanity/schemas/blogPost.ts`

#### Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Article title (max 100 chars) |
| `slug` | slug | Yes | URL-friendly identifier |
| `description` | text | Yes | Meta description (150-160 chars) |
| `author` | string | No | Default: "Sébastien Jourdan" |
| `date` | date | Yes | Publication date |
| `category` | string | Yes | One of: IA & Technologie, Hardware & Studios, Formation & Academy |
| `keywords` | array[string] | No | SEO keywords (tag layout) |
| `readingTime` | number | Yes | Estimated reading time in minutes |
| `image` | image | No | Cover image with alt text |
| `content` | array | Yes | Portable Text content |

#### Content Blocks

The `content` field supports:

1. **Text Blocks** with styles:
   - Normal paragraph
   - H1, H2, H3, H4
   - Blockquote

2. **Text Formatting**:
   - **Strong** (bold)
   - *Emphasis* (italic)
   - `Code` (inline code)
   - Links with URL

3. **Custom Components**:
   - Callout (info boxes)
   - ComparisonTable
   - Code blocks (with language selection)

#### SEO Settings

Collapsible advanced SEO section:

```typescript
{
  name: 'seo',
  type: 'object',
  fields: [
    {
      name: 'seoTitle',
      title: 'SEO Title (if different from title)',
      type: 'string',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'seoDescription',
      title: 'SEO Description (if different from description)',
      type: 'text',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string'
    },
    {
      name: 'noIndex',
      title: 'No Index (exclude from search engines)',
      type: 'boolean',
      initialValue: false
    }
  ]
}
```

#### Preview Configuration

```typescript
preview: {
  select: {
    title: 'title',
    author: 'author',
    media: 'image',
    date: 'date'
  },
  prepare(selection) {
    const { title, author, date } = selection;
    return {
      title: title,
      subtitle: `${author} - ${date}`
    };
  }
}
```

---

### 2. Formation Schema

**File**: `/sanity/schemas/formation.ts`

Training course/workshop content type.

#### Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `titre` | string | Yes | Course title (max 100 chars) |
| `slug` | slug | Yes | URL slug |
| `categorie` | string | Yes | "packshot" or "ia" |
| `niveau` | number | Yes | 1 (Foundation), 2 (Mastery), 3 (Expert) |
| `format` | string | Yes | "blended", "presentiel", or "both" |
| `prix_blended` | number | No | Blended learning price (€ HT) |
| `prix_presentiel` | number | Yes | In-person price (€ HT, min 100) |
| `duree_heures` | number | Yes | Duration in hours (1-100) |
| `description_courte` | text | Yes | Short description (max 150 chars) |
| `programme` | array[block] | Yes | Detailed program (Portable Text) |
| `objectifs` | array[string] | Yes | Learning objectives (min 3) |
| `public_cible` | string | Yes | Target audience (max 200 chars) |
| `prerequis` | text | No | Prerequisites |
| `eligible_opco` | boolean | No | OPCO eligible (default: true) |
| `thumbnail` | image | No | Course thumbnail with alt text |
| `livrables` | array[string] | No | Guaranteed deliverables |

---

### 3. Callout Schema

**File**: `/sanity/schemas/callout.ts`

Custom component for highlighting important information.

#### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | "info", "warning", "success", or "alert" |
| `title` | string | No | Callout title (max 100 chars) |
| `content` | array[block] | Yes | Content with basic formatting |

#### Type Options

- ℹ️ **Info**: General information
- ⚠️ **Warning**: Caution/warning messages
- ✅ **Success**: Success messages/tips
- 🔴 **Alert**: Critical alerts/errors

#### Usage in Studio

When editing blog content:
1. Click "+" to add new block
2. Select "Callout"
3. Choose type from radio buttons
4. Add optional title
5. Write content with basic formatting

---

### 4. Comparison Table Schema

**File**: `/sanity/schemas/comparisonTable.ts`

Structured comparison tables for blog posts.

#### Fields

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `headers` | array[string] | 2-5 items | Column headers |
| `rows` | array[object] | Min 1 row | Table rows |

#### Row Object Structure

```typescript
{
  label: string,      // First column (row label)
  values: string[]    // Remaining columns (1-5 values)
}
```

#### Example Data

```json
{
  "headers": ["Feature", "Basic", "Pro", "Enterprise"],
  "rows": [
    {
      "label": "Storage",
      "values": ["10 GB", "100 GB", "Unlimited"]
    },
    {
      "label": "Users",
      "values": ["1", "10", "Unlimited"]
    }
  ]
}
```

---

## Portable Text Components

Portable Text is Sanity's rich text format. It's rendered using custom React components.

### Component Configuration

**File**: `/components/blog/PortableTextComponents.tsx`

#### Block-Level Elements

**Headings:**
```typescript
h1: ({ children }) => (
  <h1 className="font-heading text-4xl font-bold text-neutral-dark mb-6 mt-8">
    {children}
  </h1>
),
h2: ({ children }) => (
  <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-4 mt-8">
    {children}
  </h2>
),
// ... h3, h4
```

**Paragraphs & Quotes:**
```typescript
normal: ({ children }) => (
  <p className="mb-4 leading-relaxed text-neutral-dark">
    {children}
  </p>
),
blockquote: ({ children }) => (
  <blockquote className="border-l-4 border-future-dusk-500 pl-4 italic my-6">
    {children}
  </blockquote>
),
```

#### Text Marks (Inline Formatting)

```typescript
marks: {
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="bg-neutral-light px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  link: ({ value, children }) => (
    <a
      href={value?.href}
      target={value?.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="text-future-dusk-500 hover:text-future-dusk-700 underline"
    >
      {children}
    </a>
  )
}
```

#### Lists

```typescript
list: {
  bullet: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2">
      {children}
    </ul>
  ),
  number: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">
      {children}
    </ol>
  )
}
```

#### Custom Types

**Callout Component:**
```typescript
callout: ({ value }) => {
  const renderContent = () => {
    // Converts Portable Text content to React elements
    return value.content.map((block, idx) => (
      <p key={idx}>
        {block.children?.map((child, childIdx) => {
          if (child.marks?.includes('strong')) {
            return <strong key={childIdx}>{child.text}</strong>;
          }
          if (child.marks?.includes('em')) {
            return <em key={childIdx}>{child.text}</em>;
          }
          return <span key={childIdx}>{child.text}</span>;
        })}
      </p>
    ));
  };

  return (
    <Callout type={value.type} title={value.title}>
      {renderContent()}
    </Callout>
  );
}
```

**Comparison Table:**
```typescript
comparisonTable: ({ value }) => (
  <ComparisonTable
    headers={value.headers || []}
    rows={value.rows || []}
  />
)
```

**Code Blocks:**
```typescript
code: ({ value }) => (
  <pre className="bg-neutral-dark text-white p-4 rounded-lg overflow-x-auto my-6">
    <code className={`language-${value.language || 'text'}`}>
      {value.code}
    </code>
  </pre>
)
```

### Rendering Portable Text

In your page component:

```typescript
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';

// In your component:
<PortableText
  value={sanityPost.content}
  components={portableTextComponents}
/>
```

---

## Content Editor Workflow

### For Non-Technical Users

#### Step 1: Accessing the Studio

1. Navigate to `/studio` in your browser
2. Log in with your Sanity account credentials
3. You'll see the Studio dashboard

#### Step 2: Creating a New Blog Post

1. Click "Blog Post" in the left sidebar
2. Click the "+" button (Create new)
3. Fill in the required fields:

**Basic Information:**
- **Title**: Your article title (appears as H1)
- **Slug**: Click "Generate" to auto-create from title
- **Description**: Short summary for SEO (150-160 chars ideal)
- **Author**: Your name (defaults to Sébastien Jourdan)
- **Date**: Publication date
- **Category**: Choose from dropdown
- **Reading Time**: Estimate in minutes

**Cover Image:**
- Click "Upload" to add an image
- Fill in "Alternative text" (required for accessibility)
- Image should be at least 1200x600px for best quality

#### Step 3: Writing Content

**Adding Text:**
1. Click in the "Content" field
2. Type your content
3. Use the toolbar to format:
   - Select text → Click "B" for bold
   - Select text → Click "I" for italic
   - Select text → Click link icon for hyperlinks

**Adding Headings:**
1. Place cursor on a new line
2. Use the style dropdown (left side)
3. Select H2, H3, or H4
4. Type your heading text

**Adding Lists:**
1. Click the bullet or numbered list icon
2. Type list items, press Enter for new items

**Adding a Callout (Info Box):**
1. Click "+" between paragraphs
2. Select "Callout"
3. Choose type (Info, Warning, Success, Alert)
4. Add title (optional)
5. Write your message

**Adding a Comparison Table:**
1. Click "+" between paragraphs
2. Select "Comparison Table"
3. Click "Add item" in "Headers" to add column headers
4. Click "Add item" in "Rows" to add data rows
5. For each row:
   - Set the "Label" (first column)
   - Add "Values" for remaining columns

**Adding a Code Block:**
1. Click "+" between paragraphs
2. Select "Code"
3. Select language from dropdown
4. Paste or type your code

#### Step 4: SEO Optimization

Expand the "SEO Settings" section at the bottom:

- **SEO Title**: Only if different from main title (max 60 chars)
- **SEO Description**: Only if different from main description
- **Focus Keyword**: Main keyword you're targeting
- **No Index**: Check ONLY if you don't want search engines to index this page

#### Step 5: Publishing

1. Click "Publish" button (top right)
2. The article is now live immediately
3. To edit: Make changes and click "Publish" again

#### Step 6: Unpublishing/Deleting

- **Unpublish**: Not available by default (keep as draft instead)
- **Delete**: Click "..." menu → "Delete" → Confirm

### Content Guidelines

**Title Best Practices:**
- Keep under 60 characters for SEO
- Make it descriptive and engaging
- Include target keyword if possible

**Description Best Practices:**
- 150-160 characters ideal
- Summarize the article value
- Include a call-to-action if appropriate

**Content Writing Tips:**
- Use H2 for main sections
- Use H3 for subsections
- Keep paragraphs short (3-4 sentences)
- Use Callouts to highlight key points
- Add images to break up text
- Use lists for scannable content

**SEO Tips:**
- Include focus keyword in title
- Use focus keyword in first paragraph
- Add keyword variations throughout
- Use descriptive alt text for images
- Internal links to other pages when relevant

---

## GROQ Queries Guide

GROQ (Graph-Relational Object Queries) is Sanity's query language.

### Basic Query Structure

```groq
*[filter] | order(field direction) [range] {
  field1,
  field2,
  nestedObject {
    nestedField
  }
}
```

### Common Queries

#### Get All Blog Posts

**File**: `/lib/sanity-blog.ts`

```typescript
const query = `*[_type == "blogPost"] | order(date desc) [0...100] {
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

const posts = await sanityBlogClient.fetch(query);
```

**Explanation:**
- `*[_type == "blogPost"]` - Get all documents of type "blogPost"
- `| order(date desc)` - Sort by date, newest first
- `[0...100]` - Limit to first 100 results
- `{ ... }` - Select specific fields to return

#### Get Single Blog Post by Slug

```typescript
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

const post = await sanityBlogClient.fetch(query, { slug: 'my-article' });
```

**Explanation:**
- `slug.current == $slug` - Filter by slug parameter
- `[0]` - Get first (and only) result
- `{ slug: 'my-article' }` - Pass parameter values

#### Get Posts by Category

```typescript
const query = `*[_type == "blogPost" && category == $category] | order(date desc) {
  _id,
  slug,
  title,
  description,
  date,
  category
}`;

const posts = await sanityBlogClient.fetch(query, {
  category: 'IA & Technologie'
});
```

#### Get Recent Posts (Limited)

```typescript
const query = `*[_type == "blogPost"] | order(date desc) [0...3] {
  _id,
  slug,
  title,
  description,
  image
}`;

const recentPosts = await sanityBlogClient.fetch(query);
```

#### Search Posts by Keyword

```typescript
const query = `*[
  _type == "blogPost" &&
  (
    title match $searchTerm ||
    description match $searchTerm
  )
] | order(date desc) {
  _id,
  slug,
  title,
  description
}`;

const results = await sanityBlogClient.fetch(query, {
  searchTerm: '*photo*' // Wildcard search
});
```

#### Get Formations by Level

```typescript
const query = `*[_type == "formation" && niveau == $level] {
  _id,
  titre,
  slug,
  niveau,
  prix_presentiel,
  duree_heures
}`;

const formations = await sanityBlogClient.fetch(query, { level: 1 });
```

### Advanced GROQ Features

#### Projections (Transform Data)

```groq
*[_type == "blogPost"][0...10] {
  title,
  "authorName": author,
  "url": "/blog/" + slug.current,
  "imageUrl": image.asset->url
}
```

#### References (Join Data)

```groq
*[_type == "blogPost"] {
  title,
  "authorDetails": author-> {
    name,
    bio
  }
}
```

#### Conditional Fields

```groq
*[_type == "blogPost"] {
  title,
  "hasImage": defined(image),
  "status": select(
    _createdAt > _updatedAt => "new",
    "updated"
  )
}
```

### Testing Queries

Use the **Vision Tool** in Sanity Studio:

1. Go to `/studio`
2. Click "Vision" tab at the top
3. Write your GROQ query
4. Click "Fetch" to see results
5. Refine and test

---

## Dual Content Source System

The PackshotCreator blog uses a dual-source architecture:

1. **Sanity CMS** - New content (primary)
2. **Webflow CMS** - Legacy content (fallback)

### Why Dual Sources?

- **Migration**: Gradual transition from Webflow to Sanity
- **Content Preservation**: Keep historical articles accessible
- **SEO**: Maintain existing URLs and rankings
- **Flexibility**: Use best CMS for each use case

### How It Works

**File**: `/lib/blog.ts`

```typescript
export async function getAllArticles(limit = 8): Promise<Article[]> {
  // Fetch from both sources in parallel
  const [sanityPosts, webflowArticles] = await Promise.all([
    getSanityBlogPosts(),
    getWebflowArticles(),
  ]);

  // Convert Sanity posts to common Article format
  const sanityArticles: SanityArticle[] = sanityPosts.map(post => ({
    _id: post._id,
    slug: post.slug.current,
    title: post.title,
    description: post.description,
    author: post.author,
    date: post.date,
    category: post.category,
    keywords: post.keywords,
    readingTime: post.readingTime,
    image: post.image ? urlFor(post.image).width(800).height(400).url() : undefined,
    source: 'sanity' as const,
    content: '',
  }));

  // Merge and sort by date (most recent first)
  const allArticles = [...sanityArticles, ...webflowArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit > 0 ? allArticles.slice(0, limit) : allArticles;
}
```

### Article Page Resolution

**File**: `/app/[lang]/blog/[slug]/page.tsx`

```typescript
export default async function BlogArticlePage({ params }) {
  const { slug } = await params;

  // 1. Try Sanity first
  const sanityPost = await getSanityBlogPost(slug);
  if (sanityPost) {
    return <SanityArticleView post={sanityPost} />;
  }

  // 2. Fallback to Webflow
  const webflowArticle = await getWebflowArticle(slug);
  if (webflowArticle) {
    return <WebflowArticleView article={webflowArticle} />;
  }

  // 3. Not found
  notFound();
}
```

### Identifying Source

Articles have a `source` field:
- `source: 'sanity'` - From Sanity CMS
- `source: 'webflow'` - From Webflow CMS

In the UI, Webflow articles show a badge:
```typescript
<span className="text-xs bg-neutral-light px-2 py-1 rounded">
  Archive Webflow
</span>
```

### Content Differences

| Feature | Sanity | Webflow |
|---------|--------|---------|
| Content Format | Portable Text (structured) | HTML (raw) |
| Custom Components | Yes (Callout, Tables) | No |
| SEO Fields | Advanced | Basic |
| Editing | Studio UI | Webflow Editor |
| Image Processing | Sanity CDN | Webflow CDN |
| Code Syntax Highlighting | Yes | Limited |

---

## Media Management

### Uploading Images

#### In Studio (Recommended)

1. Navigate to image field
2. Click "Upload" button
3. Select image from computer
4. Image is automatically uploaded to Sanity CDN
5. Add alt text (required)
6. Optional: Set hotspot (focal point)

#### Image Requirements

- **Cover Images**: Minimum 1200x600px
- **Inline Images**: Minimum 800px wide
- **Format**: JPG, PNG, or WebP
- **Size**: Under 5MB (smaller is better)
- **Alt Text**: Always required (accessibility)

### Image Optimization

Sanity automatically optimizes images:

**File**: `/sanity/lib/image.ts`

```typescript
import createImageUrlBuilder from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max');
};
```

### Image URL Builder

Generate optimized URLs:

```typescript
import { urlFor } from '@/lib/sanity-blog';

// Basic usage
const imageUrl = urlFor(post.image).url();

// With dimensions
const thumbnail = urlFor(post.image)
  .width(400)
  .height(300)
  .url();

// With cropping
const cropped = urlFor(post.image)
  .width(1200)
  .height(630)
  .crop('center')
  .url();

// With quality
const compressed = urlFor(post.image)
  .width(800)
  .quality(80)
  .url();

// With format
const webp = urlFor(post.image)
  .width(800)
  .format('webp')
  .url();
```

### Hotspot (Focal Point)

When uploading an image with `hotspot: true`:

1. Click the image in Studio
2. Drag the circular handle to set focal point
3. This ensures important parts aren't cropped when resizing

### Asset Management

View all uploaded assets:

1. Go to Studio
2. Click "Media" (if plugin enabled) or use Vision tool:

```groq
*[_type == "sanity.imageAsset"] {
  _id,
  url,
  originalFilename,
  size,
  "references": count(*[references(^._id)])
}
```

### Deleting Unused Assets

1. Find unused assets via GROQ:
```groq
*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]
```

2. Delete manually or via script
3. Be careful: deletion is permanent

---

## SEO Metadata Management

### Page-Level SEO

Each blog post has built-in SEO fields that generate proper metadata.

#### Metadata Generation

**File**: `/app/[lang]/blog/[slug]/page.tsx`

```typescript
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sanityPost = await getSanityBlogPost(slug);

  if (sanityPost) {
    const seoTitle = sanityPost.seo?.seoTitle || sanityPost.title;
    const seoDescription = sanityPost.seo?.seoDescription || sanityPost.description;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: sanityPost.keywords?.join(', '),

      // Open Graph (social sharing)
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: sanityPost.image
          ? [urlFor(sanityPost.image).width(1200).height(630).url()]
          : [],
        type: 'article',
        publishedTime: sanityPost.date,
        authors: [sanityPost.author]
      },

      // Robots directives
      robots: {
        index: !sanityPost.seo?.noIndex,
        follow: !sanityPost.seo?.noIndex
      }
    };
  }
}
```

### SEO Fields Reference

| Field | Purpose | Best Practice |
|-------|---------|---------------|
| **title** | Page title, appears in browser tab | 50-60 characters, include keyword |
| **description** | Meta description in search results | 150-160 characters, compelling CTA |
| **seo.seoTitle** | Override title for SEO only | Use if title is too long |
| **seo.seoDescription** | Override description for SEO | Use if description is too long |
| **seo.focusKeyword** | Primary keyword to target | Single keyword or phrase |
| **keywords** | Array of related keywords | 5-10 relevant terms |
| **seo.noIndex** | Exclude from search engines | Use for drafts or private content |

### Open Graph Images

Social sharing preview images:

**Optimal Dimensions:**
- Width: 1200px
- Height: 630px
- Aspect ratio: 1.91:1
- Format: JPG or PNG
- Size: Under 1MB

**Generated Automatically:**
```typescript
openGraph: {
  images: [urlFor(sanityPost.image).width(1200).height(630).url()]
}
```

### Keywords Strategy

**In Studio:**
- Add 5-10 relevant keywords
- Include variations of focus keyword
- Add long-tail keywords
- Don't stuff keywords

**Example:**
```json
{
  "keywords": [
    "photo produit",
    "packshot",
    "studio photo automatisé",
    "IA photo produit",
    "e-commerce photography"
  ]
}
```

### Canonical URLs

Automatically handled by Next.js metadata. For custom canonical:

```typescript
return {
  // ... other metadata
  alternates: {
    canonical: `https://packshot-creator.com/blog/${slug}`
  }
}
```

### Structured Data (JSON-LD)

Add to page for rich snippets:

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": sanityPost.title,
  "description": sanityPost.description,
  "image": imageUrl,
  "datePublished": sanityPost.date,
  "author": {
    "@type": "Person",
    "name": sanityPost.author
  }
};

// In component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

---

## Migration Guide

### MDX to Sanity Migration

The project includes a migration script for converting existing MDX blog posts to Sanity.

**Script**: `/scripts/migrate-mdx-to-sanity.js`

#### Running the Migration

```bash
npm run migrate:blog
```

#### What Gets Migrated

✅ **Converted:**
- Frontmatter → Sanity fields
- Markdown content → Portable Text
- Images → Sanity image references
- Metadata → SEO fields

❌ **Manual Conversion Needed:**
- Custom MDX components → Callouts/Tables
- Complex layouts → Restructure
- Embedded scripts → Remove or adapt

#### Migration Process

1. **Pre-Migration:**
   - Backup your content
   - Review MDX files
   - Note custom components

2. **Run Migration:**
   ```bash
   npm run migrate:blog
   ```

3. **Post-Migration:**
   - Review in Studio
   - Fix any conversion issues
   - Add missing components
   - Test on staging

4. **Validation:**
   - Check all fields populated
   - Verify images display
   - Test SEO metadata
   - Review Portable Text rendering

#### Manual Conversion Steps

**Convert HTML to Callouts:**

**Before (MDX):**
```mdx
<div className="info-box">
  **Important:** This is key information.
</div>
```

**After (Sanity Studio):**
1. Click "+" in content
2. Select "Callout"
3. Type: Info
4. Content: "This is key information"

**Convert Tables:**

**Before (MDX):**
```markdown
| Feature | Basic | Pro |
|---------|-------|-----|
| Storage | 10GB  | 100GB |
```

**After (Sanity Studio):**
1. Click "+" in content
2. Select "Comparison Table"
3. Headers: ["Feature", "Basic", "Pro"]
4. Add row: Label "Storage", Values ["10GB", "100GB"]

### Rollback Plan

If migration fails:

1. **Content is Safe**: Sanity doesn't delete MDX files
2. **Revert Code**: Keep MDX rendering code until confident
3. **Selective Migration**: Migrate one article at a time
4. **Dual Operation**: Run both systems in parallel

---

## Troubleshooting

### Common Issues

#### Studio Won't Load

**Problem:** Blank screen at `/studio`

**Solutions:**
1. Check environment variables are set
2. Verify project ID is correct
3. Check API token has correct permissions
4. Clear browser cache
5. Check browser console for errors

#### Images Not Displaying

**Problem:** Broken image links in blog posts

**Solutions:**
1. Verify image uploaded to Sanity (not external URL)
2. Check alt text is filled (required)
3. Verify environment variables
4. Check image URL builder configuration
5. Test image URL directly in browser

#### Content Not Updating

**Problem:** Changes in Studio don't appear on site

**Solutions:**
1. Check if using CDN (may take time to invalidate)
2. Force refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
3. Check if correct dataset (production vs. development)
4. Verify API token has read permissions
5. Check Next.js cache (restart dev server)

#### GROQ Query Errors

**Problem:** Query returns no results or errors

**Solutions:**
1. Test query in Vision tool first
2. Check field names match schema
3. Verify filter syntax
4. Check parameter values
5. Look for typos in field names

#### Slug Conflicts

**Problem:** "Slug already exists" error

**Solutions:**
1. Use unique slug for each article
2. Add date or number suffix if needed
3. Check for unpublished drafts with same slug
4. Delete duplicate if found

### Getting Help

**Sanity Documentation:**
- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Reference](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)

**Project Maintainers:**
- Check project README
- Review existing issues
- Contact development team

---

## Best Practices

### Content Creation

1. **Write in Drafts First**: Prepare content before publishing
2. **Use Headings Hierarchy**: H2 → H3 → H4 (don't skip levels)
3. **Add Alt Text**: Always describe images for accessibility
4. **Optimize Images**: Compress before uploading
5. **Preview Before Publishing**: Review in Studio preview
6. **SEO Check**: Fill all SEO fields properly

### Schema Design

1. **Validate Fields**: Use validation rules liberally
2. **Default Values**: Set sensible defaults
3. **Required Fields**: Mark essential fields as required
4. **Field Descriptions**: Help editors with clear descriptions
5. **Preview Configuration**: Make content easy to scan

### Performance

1. **Use CDN**: Enable for production
2. **Limit Query Fields**: Only fetch needed data
3. **Pagination**: Use ranges for large datasets
4. **Image Optimization**: Always use urlFor() with dimensions
5. **Caching**: Configure Next.js ISR appropriately

### Security

1. **Token Management**: Never commit tokens to git
2. **Dataset Separation**: Use separate datasets for public/private
3. **Permission Control**: Grant minimum required permissions
4. **Environment Variables**: Keep credentials in .env files
5. **CORS Configuration**: Restrict to allowed domains

---

## Quick Reference

### Common Commands

```bash
# Start development server (includes Studio)
npm run dev

# Build for production
npm run build

# Migrate MDX to Sanity
npm run migrate:blog
```

### Environment Setup

```bash
# Required variables
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=sk...
```

### Key Files

| File | Purpose |
|------|---------|
| `/sanity.config.ts` | Studio configuration |
| `/sanity/schemas/` | Content type definitions |
| `/sanity/lib/client.ts` | API clients |
| `/lib/sanity-blog.ts` | Blog queries & utilities |
| `/components/blog/PortableTextComponents.tsx` | Rendering config |

### Useful GROQ Snippets

```groq
// All blog posts
*[_type == "blogPost"] | order(date desc)

// Single post by slug
*[_type == "blogPost" && slug.current == "my-slug"][0]

// Count posts
count(*[_type == "blogPost"])

// Recent 5 posts
*[_type == "blogPost"] | order(date desc) [0...5]
```

---

## Changelog

- **2024-01**: Initial Sanity CMS integration
- **2024-01**: Blog migration from MDX to Sanity
- **2024-01**: Dual content source system (Sanity + Webflow)
- **2024-01**: Custom Portable Text components (Callout, ComparisonTable)
- **2024-01**: Formation schema implementation

---

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Portable Text Specification](https://github.com/portabletext/portabletext)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [@portabletext/react Documentation](https://github.com/portabletext/react-portabletext)

---

**Last Updated**: January 2024
**Maintained By**: PackshotCreator Development Team
