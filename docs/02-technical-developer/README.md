# Technical Developer Documentation

**PackshotCreator Project** - Comprehensive technical reference for developers

Last updated: January 2026

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Tech Stack](#tech-stack)
3. [Project Architecture](#project-architecture)
4. [Development Setup](#development-setup)
5. [Environment Configuration](#environment-configuration)
6. [Development Workflow](#development-workflow)
7. [Build & Deployment](#build--deployment)
8. [Code Conventions](#code-conventions)
9. [Architectural Patterns](#architectural-patterns)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- **Node.js**: v20.19.2+ (LTS)
- **npm**: v10.8.2+
- **Git**: Latest version
- **Sanity.io account**: For CMS access

### Installation (5 minutes)

```bash
# 1. Clone the repository
git clone <repository-url>
cd packshot-creator

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# 4. Start development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000/fr or http://localhost:3000/en
```

### First Run Checklist

- [ ] Development server running on `http://localhost:3000`
- [ ] French homepage loads: `http://localhost:3000/fr`
- [ ] English homepage loads: `http://localhost:3000/en`
- [ ] Sanity Studio accessible: `http://localhost:3000/studio`
- [ ] No console errors in browser

---

## Tech Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **Node.js** | 20.19.2+ | Runtime environment |

### Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **@tailwindcss/typography** | 0.5.19 | Typography plugin |
| **tw-animate-css** | 1.4.0 | Animation utilities |
| **shadcn/ui** | Latest | Headless UI components |
| **Radix UI** | Various | Accessible primitives |
| **Lucide React** | 0.562.0 | Icon library |
| **class-variance-authority** | 0.7.1 | Component variant management |
| **clsx** | 2.1.1 | Conditional classnames |
| **tailwind-merge** | 3.4.0 | Merge Tailwind classes |

### Content Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Sanity** | 5.2.0 | Headless CMS |
| **@sanity/client** | 7.14.0 | Sanity client |
| **next-sanity** | 12.0.10 | Next.js integration |
| **@sanity/vision** | 5.2.0 | GROQ query testing |
| **@sanity/image-url** | 2.0.2 | Image URL builder |
| **@sanity/code-input** | 7.0.6 | Code block editor |

### Internationalization (i18n)

| Technology | Version | Purpose |
|------------|---------|---------|
| **next-intl** | 4.6.1 | i18n for Next.js App Router |

### Content Processing

| Technology | Version | Purpose |
|------------|---------|---------|
| **@next/mdx** | 16.1.1 | MDX support |
| **@mdx-js/loader** | 3.1.1 | MDX loader |
| **@mdx-js/react** | 3.1.1 | MDX React runtime |
| **next-mdx-remote** | 5.0.0 | Remote MDX processing |
| **gray-matter** | 4.0.3 | Frontmatter parsing |

### Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| **react-hook-form** | 7.69.0 | Form management |
| **@hookform/resolvers** | 5.2.2 | Form validation resolvers |
| **zod** | 4.2.1 | Schema validation |

### Utilities & Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **recharts** | 3.6.0 | Chart library (ROI Calculator) |
| **html2canvas-pro** | 1.6.4 | Screenshot generation |
| **jspdf** | 4.0.0 | PDF generation |
| **dotenv** | 17.2.3 | Environment variables |

### Code Quality

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.39.2 | JavaScript/TypeScript linting |
| **eslint-config-next** | 16.1.1 | Next.js ESLint config |

### Fonts

- **Inter**: Primary font (headings) - Google Fonts
- **Roboto**: Secondary font (body) - Google Fonts

---

## Project Architecture

### Directory Structure

```
packshot-creator/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (metadata base)
│   ├── globals.css              # Global styles + Tailwind config
│   ├── [lang]/                  # Internationalized routes
│   │   ├── layout.tsx          # Locale layout (i18n provider)
│   │   ├── page.tsx            # Homepage
│   │   ├── academy/            # Academy section
│   │   ├── blendai/            # BlendAI section (legacy redirect)
│   │   ├── blog/               # Blog (Sanity CMS)
│   │   ├── contact/            # Contact form
│   │   ├── guide/              # Buying guide
│   │   ├── ia-photo-produit/   # AI Product Photo section
│   │   ├── industrie/          # Industry pages
│   │   ├── studio-photo/       # Photo studio (legacy redirect)
│   │   └── studios-photo-automatises/  # Automated photo studios
│   └── studio/                  # Sanity Studio CMS
│       └── [[...tool]]/
│           └── page.tsx        # Studio entry point
│
├── components/                   # React components
│   ├── blog/                    # Blog-specific components
│   ├── calculators/             # Interactive calculators
│   │   └── ROICalculator/      # ROI calculator with charts
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Site header
│   │   └── Footer.tsx          # Site footer
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx
│   │   ├── ClientLogos.tsx
│   │   ├── ThreePillarsSection.tsx
│   │   └── ...
│   ├── shared/                  # Shared/utility components
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       └── ...
│
├── lib/                          # Utility libraries
│   ├── sanity-blog.ts           # Sanity blog queries & types
│   ├── blog.ts                  # Blog utilities
│   ├── utils.ts                 # General utilities (cn function)
│   └── webflow.ts               # Webflow integration utilities
│
├── sanity/                       # Sanity CMS configuration
│   ├── lib/                     # Sanity utilities
│   └── schemas/                 # Content schemas
│       ├── index.ts            # Schema exports
│       ├── blogPost.ts         # Blog post schema
│       ├── callout.ts          # Callout component schema
│       ├── comparisonTable.ts  # Comparison table schema
│       └── formation.ts        # Training/formation schema
│
├── i18n/                         # Internationalization
│   ├── routing.ts               # Route configuration (fr, en)
│   └── request.ts               # i18n request handler
│
├── messages/                     # Translation files
│   ├── fr.json                  # French translations
│   ├── en.json                  # English translations
│   ├── de.json                  # German (legacy)
│   ├── es.json                  # Spanish (legacy)
│   └── nl.json                  # Dutch (legacy)
│
├── content/                      # Static content (legacy)
│   ├── blog/                    # Legacy blog (migrated to Sanity)
│   └── guide/                   # Buying guide content
│
├── public/                       # Static assets
│   ├── blog/                    # Blog images
│   ├── icons/                   # Icon files
│   ├── images/                  # General images
│   └── logos/                   # Brand logos
│       └── clients/             # Client logos
│
├── scripts/                      # Utility scripts
│   ├── migrate-mdx-to-sanity.js # MDX to Sanity migration
│   ├── seed-formations.mjs      # Seed training data
│   ├── check-token.js           # Verify Sanity token
│   ├── fix-guide-achat.js       # Fix buying guide
│   └── publish-draft.js         # Publish draft content
│
├── cloudflare-worker/            # Cloudflare Worker (routing proxy)
│   ├── src/
│   │   └── index.js            # Worker entry point
│   └── wrangler.toml           # Worker configuration
│
├── docs/                         # Documentation
│   └── 02-technical-developer/  # This documentation
│
├── middleware.ts                 # Next.js middleware (i18n routing)
├── next.config.ts               # Next.js configuration
├── sanity.config.ts             # Sanity Studio configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # shadcn/ui configuration
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment (gitignored)
├── PROJECT_GUIDELINES.md        # Project guidelines
└── DESIGN_SYSTEM.md             # Design system documentation
```

### App Router Structure

This project uses **Next.js App Router** with the following routing pattern:

```
/                           → Root layout (metadata)
  /[lang]                   → Locale layout (fr, en)
    /fr                     → French homepage
    /en                     → English homepage
    /fr/blog                → French blog
    /en/blog                → English blog
    /fr/contact             → French contact
    ...
  /studio                   → Sanity Studio (no locale)
```

**Key Points:**

- All user-facing routes are under `/[lang]` for internationalization
- Sanity Studio is at `/studio` (outside locale routing)
- Middleware handles locale detection and routing
- Static params generated for `fr` and `en` locales

---

## Development Setup

### 1. System Requirements

```bash
# Check Node.js version
node --version  # Should be v20.19.2+

# Check npm version
npm --version   # Should be v10.8.2+
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies from `package.json` including:
- Next.js and React
- Tailwind CSS and plugins
- Sanity CMS
- i18n libraries
- UI components

### 3. Configure Sanity

#### Create Sanity Project

1. Visit [sanity.io](https://www.sanity.io/)
2. Create a new project
3. Note your `projectId` and `dataset` name

#### Configure Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-11
SANITY_API_TOKEN=your-api-token
```

**Getting your API Token:**

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token to `SANITY_API_TOKEN`

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Main app**: http://localhost:3000/fr (French) or http://localhost:3000/en (English)
- **Sanity Studio**: http://localhost:3000/studio

### 5. Verify Setup

```bash
# Check Sanity connection
node scripts/check-token.js

# This should output your project details without errors
```

---

## Environment Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Sanity Configuration
# Get these from https://www.sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-11
SANITY_API_TOKEN=your-api-token
```

### Variable Descriptions

| Variable | Purpose | Required | Public |
|----------|---------|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | Yes | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (production/staging) | Yes | Yes |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | Yes | Yes |
| `SANITY_API_TOKEN` | Sanity authentication token | Yes | No |

**Important Notes:**

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- `SANITY_API_TOKEN` is server-side only and should never be committed
- Never commit `.env.local` to version control (already in `.gitignore`)

### Production Environment

For production deployment (Vercel), configure these environment variables in your deployment platform's dashboard.

---

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server (localhost:3000)

# Build
npm run build        # Build production application
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Content Migration
npm run migrate:blog # Migrate MDX blog posts to Sanity
```

### Script Details

#### `npm run dev`

Starts the Next.js development server with:
- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- Server on http://localhost:3000

#### `npm run build`

Creates an optimized production build:
- Compiles TypeScript
- Optimizes images
- Minifies JavaScript/CSS
- Generates static pages
- Output in `.next/` directory

#### `npm run start`

Starts the production server using the built application from `.next/`

#### `npm run lint`

Runs ESLint on the codebase using Next.js ESLint configuration:
- TypeScript rules
- React hooks rules
- Next.js specific rules
- Core Web Vitals rules

### Development Best Practices

1. **Always run development server**
   ```bash
   npm run dev
   ```

2. **Check for TypeScript errors**
   - TypeScript errors appear in terminal during `npm run dev`
   - Fix errors before committing

3. **Test builds locally**
   ```bash
   npm run build
   npm run start
   ```

4. **Lint before committing**
   ```bash
   npm run lint
   ```

5. **Use feature branches**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Build & Deployment

### Build Process

The project uses **Next.js 16.1.1** which supports:
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)
- Edge runtime support

### Production Architecture

This project uses a **dual-deployment architecture**:

```
                      ┌─────────────────────┐
                      │  Cloudflare Worker  │
                      │   (Edge Router)     │
                      └──────────┬──────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
           ┌────────▼────────┐      ┌────────▼────────┐
           │  Next.js App    │      │  Webflow Site   │
           │   (Vercel)      │      │  (Legacy)       │
           └─────────────────┘      └─────────────────┘
```

### Deployment Targets

#### 1. Vercel (Next.js Application)

**Purpose**: Hosts the Next.js application (new pages, blog, contact, etc.)

**Configuration**: Automatic via Vercel + Git integration

**Environment Variables** (set in Vercel dashboard):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-11
SANITY_API_TOKEN=your-api-token
```

**Deploy Process**:
1. Push to main branch
2. Vercel automatically builds and deploys
3. Preview deployments for pull requests
4. Production deployment on merge to main

**Vercel Settings**:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 20.x

#### 2. Cloudflare Workers (Edge Router)

**Purpose**: Routes traffic between Webflow (legacy) and Next.js (new pages)

**Location**: `/cloudflare-worker/`

**Configuration**: `wrangler.toml`
```toml
name = "packshot-router"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
WEBFLOW_ORIGIN = "https://packshot-creator.webflow.io"
NEXTJS_ORIGIN = "https://packshot-creator.vercel.app"
```

**Deploy Process**:
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy worker
cd cloudflare-worker
wrangler deploy
```

**How it works**:
1. All traffic hits Cloudflare Worker first
2. Worker checks if route is migrated to Next.js
3. Proxies request to appropriate backend:
   - Migrated routes → Next.js (Vercel)
   - Legacy routes → Webflow

**Current Routing** (in `cloudflare-worker/src/index.js`):
```javascript
const MIGRATED_ROUTES = [
  // Add routes as they are migrated
  // Example: '/fr/blog', '/en/blog', '/fr/contact'
];
```

### Deployment Checklist

#### Before Deploying to Production

- [ ] All TypeScript errors resolved (`npm run build` succeeds)
- [ ] ESLint passes (`npm run lint`)
- [ ] Test all locale variants (fr, en)
- [ ] Verify Sanity content is published (not draft)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check SEO metadata (title, description)
- [ ] Verify images are optimized
- [ ] Test contact forms
- [ ] Verify external links work
- [ ] Check browser console for errors

#### Vercel Deployment

1. **Connect Repository**
   - Link GitHub repository to Vercel
   - Configure auto-deploy on main branch

2. **Set Environment Variables**
   - Add all variables from `.env.local`
   - Keep `SANITY_API_TOKEN` secret

3. **Deploy**
   - Push to main branch or merge PR
   - Vercel builds and deploys automatically

4. **Update Cloudflare Worker**
   - Update `NEXTJS_ORIGIN` in `wrangler.toml`
   - Deploy worker: `wrangler deploy`
   - Add route to `MIGRATED_ROUTES` in worker

#### Cloudflare Worker Deployment

```bash
# 1. Navigate to worker directory
cd cloudflare-worker

# 2. Update configuration
# Edit wrangler.toml with production URLs

# 3. Deploy
wrangler deploy

# 4. Verify deployment
# Check Cloudflare dashboard for worker status
```

### Migration Strategy

This project is gradually migrating from Webflow to Next.js:

**Phase 1**: Blog, Contact, Key Pages (Current)
**Phase 2**: Industry pages, Product pages
**Phase 3**: Complete migration

**Process**:
1. Develop page in Next.js
2. Test locally
3. Deploy to Vercel (preview)
4. Update `MIGRATED_ROUTES` in Cloudflare Worker
5. Deploy worker
6. Monitor traffic and errors

---

## Code Conventions

### TypeScript

This project uses **TypeScript 5.9.3** with strict mode enabled.

**tsconfig.json highlights**:
```json
{
  "compilerOptions": {
    "strict": true,              // Enable all strict type checks
    "target": "ES2017",          // Target ES2017
    "module": "esnext",          // Use ESNext modules
    "jsx": "react-jsx",          // React 19 JSX transform
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]             // Path alias for imports
    }
  }
}
```

**Type Safety Rules**:
- All components should have explicit prop types
- Use `interface` for object types
- Use `type` for unions and utilities
- Avoid `any` - use `unknown` if type is truly unknown
- Use strict null checks

**Example**:
```typescript
// Good
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText: string;
}

export default function Hero({ title, subtitle, ctaText }: HeroProps) {
  // ...
}

// Avoid
export default function Hero(props: any) {
  // ...
}
```

### React Components

**Component Structure**:
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

// 3. Component
export default function Component({ title, children }: ComponentProps) {
  // Hooks
  const [isOpen, setIsOpen] = useState(false);

  // Event handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Toggle</Button>
      {isOpen && children}
    </div>
  );
}
```

**Naming Conventions**:
- Components: `PascalCase` (e.g., `Hero.tsx`, `BlogGrid.tsx`)
- Files: Match component name (e.g., `Hero.tsx` exports `Hero`)
- Props interfaces: `ComponentNameProps` (e.g., `HeroProps`)
- Event handlers: `handle*` prefix (e.g., `handleClick`, `handleSubmit`)
- Boolean props: `is*`, `has*`, `should*` prefix

### File Organization

**Component Files**:
```
components/
├── ui/                  # Reusable UI primitives (shadcn/ui)
├── sections/            # Page sections (Hero, Features, etc.)
├── layout/              # Layout components (Header, Footer)
├── shared/              # Shared utility components
└── [feature]/           # Feature-specific components
    └── ComponentName.tsx
```

**Page Files** (App Router):
```
app/[lang]/
├── layout.tsx           # Layout for locale
├── page.tsx             # Homepage
└── [section]/
    ├── layout.tsx       # Section layout (optional)
    ├── page.tsx         # Section page
    └── [subsection]/
        └── page.tsx     # Nested page
```

### Styling (Tailwind CSS)

**Tailwind Guidelines**:

1. **Use Tailwind utility classes**
   ```tsx
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
   ```

2. **Use `cn()` for conditional classes**
   ```tsx
   import { cn } from '@/lib/utils';

   <Button className={cn(
     "base-classes",
     isActive && "active-classes",
     isDisabled && "disabled-classes"
   )}>
   ```

3. **Use Design System variables**
   ```tsx
   // Primary color (Very Peri)
   <div className="bg-primary-orbitvu text-white">

   // Section color (contextual)
   <Button variant="section">

   // Accent colors
   <Badge className="bg-accent-lime">
   ```

4. **Responsive design**
   ```tsx
   <div className="text-sm md:text-base lg:text-lg">
   ```

5. **Dark mode** (if implemented)
   ```tsx
   <div className="bg-white dark:bg-gray-900">
   ```

**Custom CSS**:
- Add custom styles in `app/globals.css`
- Use CSS variables for theming
- Avoid inline styles unless dynamic

### ESLint Configuration

**Rules** (from `eslint.config.mjs`):
- Next.js recommended rules
- TypeScript recommended rules
- Core Web Vitals rules

**Run linter**:
```bash
npm run lint
```

**Auto-fix issues**:
```bash
npm run lint -- --fix
```

### Import Order

**Recommended order**:
```typescript
// 1. React and Next.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party libraries
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

// 3. Internal components
import Hero from '@/components/sections/Hero';
import ClientLogos from '@/components/sections/ClientLogos';

// 4. Utilities and types
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/sanity-blog';

// 5. Styles (if needed)
import styles from './Component.module.css';
```

### Path Aliases

Use `@/` for absolute imports:

```typescript
// Good
import { Button } from '@/components/ui/button';
import { getSanityBlogPosts } from '@/lib/sanity-blog';

// Avoid
import { Button } from '../../../components/ui/button';
import { getSanityBlogPosts } from '../../lib/sanity-blog';
```

### Comments

**Use comments for**:
- Complex logic
- Business rules
- Workarounds
- TODO items

**Example**:
```typescript
// HACK: Temporary fix for Sanity image URLs in production
// TODO: Remove once Sanity CDN is properly configured
const imageUrl = process.env.NODE_ENV === 'production'
  ? image.url.replace('cdn.sanity.io', 'cdn.prod.sanity.io')
  : image.url;
```

**Avoid**:
- Obvious comments
- Commented-out code (delete instead)
- Outdated comments

---

## Architectural Patterns

### 1. Internationalization (i18n)

**Implementation**: `next-intl` v4.6.1

**Supported Locales**: `fr` (French), `en` (English)

**Configuration**:

`i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always'  // All URLs have locale prefix (/fr/, /en/)
});
```

**Usage in Components**:
```typescript
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('ComponentName');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Translation Files**:
- `messages/fr.json`: French translations
- `messages/en.json`: English translations

**Structure**:
```json
{
  "ComponentName": {
    "title": "Title in locale",
    "description": "Description in locale"
  }
}
```

**Routing**:
- Middleware in `middleware.ts` handles locale detection
- All routes automatically prefixed with locale
- Example: `/fr/blog`, `/en/blog`

**Link Component**:
```typescript
import { Link } from '@/i18n/routing';

<Link href="/blog">Blog</Link>
// Automatically becomes /fr/blog or /en/blog based on current locale
```

### 2. Design System & Theming

**System**: Orbitvu Brandbook 2025

**Primary Colors**:
- **Very Peri** (`#6667AB`): Primary brand color
- **Future Dusk** (`#4c5578`): Secondary brand color

**Section Colors**:
- **Creation**: Orange (`#ff7809`)
- **Formation**: Light Blue (`#cdcdfd`)
- **Blog**: Lime (`#CBE857`)

**Implementation**:

**CSS Variables** (in `app/globals.css`):
```css
:root {
  --primary-orbitvu: #6667AB;
  --secondary-orbitvu: #4c5578;
  --primary-creation: #ff7809;
  --primary-formation: #cdcdfd;
  --primary-blog: #CBE857;
  /* + 15 shades for each primary color */
  /* + 11 accent colors */
}
```

**Tailwind Classes**:
```tsx
// Primary colors
<div className="bg-primary-orbitvu text-white">

// Section colors (contextual)
<Button variant="section">  // Uses section-specific color

// Extended palettes
<div className="bg-very-peri-500">      // Base Very Peri
<div className="bg-very-peri-100">      // Light Very Peri
<div className="bg-future-dusk-700">    // Dark Future Dusk

// Accent colors
<Badge className="bg-accent-lime">
<Badge className="bg-accent-orange">
```

**Section Layout Pattern**:
```tsx
// app/[lang]/blog/layout.tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--section-primary': 'var(--primary-blog)' } as React.CSSProperties}>
      {children}
    </div>
  );
}
```

This allows components to use `variant="section"` and automatically get the correct color.

**Typography**:
- **Headings**: Inter (bold, 700 weight)
- **Body**: Roboto (400, 500 weights)

```tsx
<h1 className="font-inter font-bold text-5xl">Heading</h1>
<p className="font-roboto text-base">Body text</p>
```

**Full Documentation**: See `DESIGN_SYSTEM.md`

### 3. Content Management (Sanity CMS)

**Studio Location**: `/studio` (accessible at `http://localhost:3000/studio`)

**Configuration**: `sanity.config.ts`

**Schemas**: `sanity/schemas/`
- `blogPost.ts`: Blog post content type
- `formation.ts`: Training/course content type
- `callout.ts`: Callout component for rich text
- `comparisonTable.ts`: Comparison table component

**Querying Content**:

`lib/sanity-blog.ts`:
```typescript
import { sanityBlogClient } from '@/lib/sanity-blog';

// Get all blog posts
const posts = await getSanityBlogPosts();

// Get single post by slug
const post = await getSanityBlogPost('post-slug');
```

**GROQ Queries**:
```typescript
// Example query
const query = `*[_type == "blogPost"] | order(date desc) [0...10] {
  _id,
  slug,
  title,
  description,
  author,
  date,
  category,
  image,
  content
}`;

const posts = await sanityBlogClient.fetch(query);
```

**Portable Text Rendering**:
```tsx
import { PortableText } from '@portabletext/react';

<PortableText
  value={post.content}
  components={{
    block: {
      h2: ({ children }) => <h2 className="text-3xl font-bold">{children}</h2>,
      // Custom renderers for blocks
    },
    types: {
      callout: CalloutComponent,
      comparisonTable: ComparisonTableComponent,
    },
  }}
/>
```

**Image URLs**:
```typescript
import { urlFor } from '@/lib/sanity-blog';

<Image
  src={urlFor(post.image).width(800).height(400).url()}
  alt={post.image.alt}
  width={800}
  height={400}
/>
```

### 4. Form Handling

**Stack**: React Hook Form + Zod validation

**Example** (Contact Form):
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields using react-hook-form */}
    </form>
  );
}
```

### 5. Component Composition (shadcn/ui)

This project uses **shadcn/ui** components, which are:
- Copy-pasted into `components/ui/`
- Built on Radix UI primitives
- Fully customizable
- Type-safe

**Adding New Components**:
```bash
# Example: Add a new dialog component
npx shadcn@latest add dialog
```

**Component Variants** (using `class-variance-authority`):
```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'bg-primary-orbitvu text-white',
        section: 'bg-[var(--section-primary)] text-white',
        secondary: 'bg-secondary-orbitvu text-white',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

### 6. Data Fetching Patterns

**Server Components** (default in App Router):
```typescript
// app/[lang]/blog/page.tsx
import { getSanityBlogPosts } from '@/lib/sanity-blog';

export default async function BlogPage() {
  // Fetch data directly in component
  const posts = await getSanityBlogPosts();

  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
```

**Client Components** (when needed):
```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data client-side
  }, []);

  return <div>{/* ... */}</div>;
}
```

**When to use client components**:
- Interactive components (forms, modals, dropdowns)
- Components using React hooks (`useState`, `useEffect`)
- Browser-only APIs
- Event handlers

### 7. SEO & Metadata

**Page Metadata** (in `page.tsx`):
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  // ...
}
```

**Dynamic Metadata**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getSanityBlogPost(params.slug);

  return {
    title: post.seo?.seoTitle || post.title,
    description: post.seo?.seoDescription || post.description,
  };
}
```

### 8. Image Optimization

**Next.js Image Component**:
```tsx
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // For LCP images
  quality={90}
  placeholder="blur"  // If blurDataURL provided
/>
```

**Remote Images** (configured in `next.config.ts`):
```typescript
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
```

### 9. Redirects (next.config.ts)

**Permanent Redirects** (301):
```typescript
async redirects() {
  return [
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true,  // 301 redirect
    },
    // Legacy language redirects
    {
      source: '/de/:path*',
      destination: 'https://blendai.studio',
      permanent: true,
    },
  ];
},
```

---

## Troubleshooting

### Common Issues

#### 1. Development Server Won't Start

**Symptom**: `npm run dev` fails

**Solutions**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be v20+

# Check for port conflicts
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
```

#### 2. TypeScript Errors

**Symptom**: TypeScript compilation errors

**Solutions**:
```bash
# Check tsconfig.json is valid
npx tsc --noEmit

# Clear TypeScript build cache
rm -rf tsconfig.tsbuildinfo

# Restart TypeScript server in VS Code
# CMD+Shift+P → "TypeScript: Restart TS Server"
```

#### 3. Sanity Connection Issues

**Symptom**: "Unable to connect to Sanity" or 401 errors

**Solutions**:
```bash
# 1. Verify environment variables
cat .env.local
# Ensure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are set

# 2. Test Sanity token
node scripts/check-token.js

# 3. Check Sanity project settings
# Visit https://www.sanity.io/manage
# Verify projectId and dataset name

# 4. Regenerate API token if needed
# Go to Sanity dashboard → API → Tokens
```

#### 4. Build Failures

**Symptom**: `npm run build` fails

**Solutions**:
```bash
# Check for TypeScript errors
npm run build 2>&1 | grep "error TS"

# Check for ESLint errors
npm run lint

# Clear build cache
rm -rf .next

# Check for missing environment variables
# Ensure all NEXT_PUBLIC_* variables are set

# Build with verbose output
npm run build -- --debug
```

#### 5. Styling Issues (Tailwind)

**Symptom**: Tailwind classes not working

**Solutions**:
```bash
# Verify Tailwind config
cat tailwind.config.ts

# Check content paths include your files
# Should include: './app/**/*.{js,ts,jsx,tsx,mdx}'

# Clear PostCSS cache
rm -rf .next

# Verify globals.css is imported in layout
# Should have: import "./globals.css" in app/layout.tsx
```

#### 6. i18n / Routing Issues

**Symptom**: Locale routes not working, 404 errors

**Solutions**:
```bash
# Check middleware.ts exists and is correct
cat middleware.ts

# Verify routing configuration
cat i18n/routing.ts

# Check translation files exist
ls messages/

# Test locale manually
curl http://localhost:3000/fr
curl http://localhost:3000/en

# Check browser locale detection
# Clear browser cookies and cache
```

#### 7. Image Loading Issues

**Symptom**: Images not loading, 403 errors

**Solutions**:
```bash
# Check next.config.ts remotePatterns
cat next.config.ts | grep remotePatterns

# Verify image path is correct
ls public/images/

# For Sanity images, check urlFor function
# Should use @sanity/image-url

# Check image format is supported
# Supported: jpg, png, webp, avif, svg
```

#### 8. Cloudflare Worker Issues

**Symptom**: Worker not routing correctly

**Solutions**:
```bash
# Check worker configuration
cat cloudflare-worker/wrangler.toml

# Test worker locally
cd cloudflare-worker
wrangler dev

# Check deployed worker
wrangler tail  # View worker logs

# Verify routes in worker code
cat cloudflare-worker/src/index.js

# Check X-Served-By header
curl -I https://your-domain.com | grep X-Served-By
```

#### 9. Performance Issues

**Symptom**: Slow page loads, high memory usage

**Solutions**:
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for large dependencies
npx depcheck

# Optimize images
# Use next/image with proper width/height

# Enable caching for Sanity
# Set useCdn: true in sanity client (production only)

# Use React Server Components
# Avoid 'use client' unless necessary
```

#### 10. Hot Reload Not Working

**Symptom**: Changes not reflected in browser

**Solutions**:
```bash
# Restart dev server
# Stop server (Ctrl+C)
npm run dev

# Clear browser cache
# Hard refresh: CMD+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Check for file watcher limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Disable any browser extensions
# Particularly ad blockers or React DevTools
```

### Getting Help

1. **Check Documentation**:
   - This file: `docs/02-technical-developer/README.md`
   - Design System: `DESIGN_SYSTEM.md`
   - Project Guidelines: `PROJECT_GUIDELINES.md`

2. **Check Logs**:
   - Development: Check terminal output
   - Production: Check Vercel logs
   - Worker: `wrangler tail` for Cloudflare Worker logs

3. **Next.js Debugging**:
   ```bash
   # Enable debug mode
   DEBUG=* npm run dev
   ```

4. **TypeScript Issues**:
   - Check `tsconfig.json`
   - Run `npx tsc --noEmit` for detailed errors
   - Use VS Code TypeScript server

5. **Community Resources**:
   - Next.js Docs: https://nextjs.org/docs
   - Sanity Docs: https://www.sanity.io/docs
   - Tailwind Docs: https://tailwindcss.com/docs
   - next-intl Docs: https://next-intl-docs.vercel.app

---

## Additional Resources

### Documentation Files

- **PROJECT_GUIDELINES.md**: Migration rules, design system overview
- **DESIGN_SYSTEM.md**: Complete design system documentation
- **README.md**: Basic project information

### External Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [next-intl](https://next-intl-docs.vercel.app)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

### VS Code Extensions (Recommended)

- **ESLint**: Linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind autocomplete
- **TypeScript**: Built-in TypeScript support
- **MDX**: MDX syntax highlighting

### Package Documentation

Check `package.json` for exact versions and links to documentation.

---

## Version History

- **January 2026**: Current version
  - Next.js 16.1.1
  - React 19.2.3
  - Tailwind CSS v4
  - Brandbook 2025 migration complete
  - Blog migrated to Sanity CMS

---

## Support

For questions or issues:

1. Check this documentation
2. Review existing code and patterns
3. Check recent commit history for examples
4. Consult external documentation links

---

**Last Updated**: January 24, 2026

**Maintained By**: Development Team

**Version**: 1.0.0
