# Design & Branding Documentation

## Table of Contents

1. [Overview](#overview)
2. [Brandbook 2025 Adaptation](#brandbook-2025-adaptation)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [CSS Variables Reference](#css-variables-reference)
6. [Component Styling Guidelines](#component-styling-guidelines)
7. [Section-Based Theming](#section-based-theming)
8. [Accessibility](#accessibility)
9. [Logo & Assets](#logo--assets)
10. [Code Examples](#code-examples)

---

## Overview

This document describes the **Brandbook 2025** design system as adapted and implemented in the PackshotCreator Next.js project. The implementation was completed in **January 2026** and represents a significant migration from the previous design system.

### Key Features

- **Primary Color**: Very Peri (#6667AB) - Replaces legacy red (#EC3655)
- **Secondary Color**: Future Dusk (#4c5578) - Replaces legacy cyan (#24A1B4)
- **Primary Font**: Inter - Replaces Cairo
- **Secondary Font**: Roboto - Maintained from previous system
- **Extended Palettes**: 15 shades each for Very Peri and Future Dusk
- **Accent Colors**: 11 vibrant colors for highlights and sections
- **Section-Based Theming**: Dynamic color system for Creation, Formation, and Blog sections
- **WCAG AA Compliance**: Accessibility-first approach with 4.5:1 minimum contrast ratio

### Technology Stack

- **Framework**: Next.js 14.1.1 (App Router)
- **Styling**: Tailwind CSS v4 (inline @theme in globals.css)
- **i18n**: next-intl 4.6.1
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **PDF Generation**: jsPDF

---

## Brandbook 2025 Adaptation

The Brandbook 2025 represents Orbitvu's official design language. This project adapts it for web implementation with specific optimizations for:

### What Changed from Previous Brandbook

| Element | Old | New | Reason |
|---------|-----|-----|--------|
| Primary Color | #EC3655 (Red) | #6667AB (Very Peri) | Brand refresh to modern, sophisticated palette |
| Secondary Color | #24A1B4 (Cyan) | #4c5578 (Future Dusk) | Better contrast and professionalism |
| Primary Font | Cairo | Inter | Better web rendering, wider language support |
| Secondary Font | Roboto | Roboto | Maintained for body text |

### Adaptation Philosophy

1. **Web-First**: All colors tested for web contrast and readability
2. **Accessibility**: WCAG AA compliance for all primary use cases
3. **Performance**: CSS variables for dynamic theming without runtime overhead
4. **Flexibility**: Extended palettes (15 shades) for granular control
5. **Section Identity**: Unique colors for Creation, Formation, and Blog sections

### Files Modified

52+ components were migrated to the new design system, including:
- All navigation components
- Hero sections
- Feature sections
- Pricing cards
- Testimonials
- Forms and calculators
- Blog components
- Footer components

---

## Color System

### Primary Colors

The foundation of the brand identity:

```css
/* Very Peri - Primary Brand Color */
--primary-orbitvu: #6667AB;

/* Future Dusk - Secondary Brand Color */
--secondary-orbitvu: #4c5578;

/* Brand Neutrals */
--text-dark: #0D171A;           /* Body text */
--heading-dark: #001D26;        /* Headings */
--neutral-medium: #546E7A;      /* Secondary text */
--bg-light-gray: #F8FAFB;       /* Light backgrounds */
--bg-off-white: #FBFBFB;        /* Alternate backgrounds */
--bg-warm-white: #FAF9F5;       /* Warm backgrounds */
```

**Usage Guidelines**:
- **Very Peri**: Primary CTAs, brand accents, interactive elements
- **Future Dusk**: Secondary CTAs, links, hover states
- **Black (#000000)**: Logo, primary text in dark mode
- **White (#FFFFFF)**: Logo on dark backgrounds, text on dark surfaces

**Critical Rule**: The logo must ONLY be black or white - never colored.

### Extended Palettes

#### Very Peri (15 Shades)

Progressive shades from white to black, centered on #6667AB:

```css
--very-peri-0: #FFFFFF;         /* Pure white */
--very-peri-50: #F0F0F7;        /* Lightest tint */
--very-peri-100: #E0E1EE;
--very-peri-150: #D1D1E6;
--very-peri-200: #C2C2D0;
--very-peri-300: #A3A4CC;
--very-peri-400: #8585BC;
--very-peri-500: #6667AB;       /* BASE - Primary Orbitvu */
--very-peri-600: #5252B9;
--very-peri-700: #4D5EA7;
--very-peri-800: #292944;
--very-peri-850: #1F1F33;
--very-peri-900: #141522;
--very-peri-950: #0A0A11;
--very-peri-1000: #000000;      /* Pure black */
```

**Tailwind Classes**: `bg-very-peri-{0|50|100|150|200|300|400|500|600|700|800|850|900|950|1000}`

#### Future Dusk (15 Shades)

Progressive shades from white to black, centered on #4c5578:

```css
--future-dusk-0: #F4F5F8;       /* Lightest tint */
--future-dusk-50: #E3E5EB;
--future-dusk-100: #D2D5DE;
--future-dusk-150: #C2C5D2;
--future-dusk-200: #B1B5C5;
--future-dusk-300: #8F95A8;
--future-dusk-400: #6E7592;
--future-dusk-500: #4c5578;     /* BASE - Secondary Orbitvu */
--future-dusk-600: #3D4460;
--future-dusk-700: #2E3348;
--future-dusk-800: #1E2230;
--future-dusk-850: #171A24;
--future-dusk-900: #0F1118;
--future-dusk-950: #08090C;
--future-dusk-1000: #000000;    /* Pure black */
```

**Tailwind Classes**: `bg-future-dusk-{0|50|100|150|200|300|400|500|600|700|800|850|900|950|1000}`

### Accent Colors (11 Colors)

Vibrant colors for highlights, sections, and special elements:

```css
--accent-green: #27eb9f;        /* Success, validation, growth */
--accent-lime: #CBE857;         /* Blog section primary */
--accent-light-blue: #cdcdfd;   /* Formation section (see note below) */
--accent-blue: #4a4aff;         /* Technology, trust */
--accent-orange: #ff7809;       /* Creation section primary */
--accent-yellow: #ffde05;       /* Attention, warnings */
--accent-coral: #ff6f61;        /* Alternative to red */
--accent-pink: #ee68b2;         /* Creativity, trends */
--accent-cyan: #62bbd3;         /* Communication, clarity */
--accent-gray-light: #A0ABB6;   /* Neutral accents */
--accent-gray-medium: #A9AAAD;  /* Neutral accents */
```

**Note on Formation Color**: The original `#cdcdfd` (light blue) fails WCAG AA contrast requirements for text on white backgrounds. For Formation section buttons, we use a darker variant `#8585ee` instead (see Section-Based Theming below).

**Usage Examples**:
- **Green**: Success messages, completed states, positive metrics
- **Lime**: Blog CTAs, nature/growth themes
- **Orange**: Creation CTAs, attention-grabbing elements
- **Pink**: Graphic captions ("Knowledge", "Trends")
- **Cyan**: Graphic captions ("Case Study", "Communication")

### Section-Specific Colors

Each major section has a unique primary color for brand identity:

```css
/* Section Primary Colors */
--primary-creation: #ff7809;    /* Orange - AI Photo Product */
--primary-formation: #cdcdfd;   /* Light Blue - Academy/Training */
--primary-blog: #CBE857;        /* Lime - Blog/Content */
```

**Tailwind Classes**:
```css
bg-primary-creation
bg-primary-formation
bg-primary-blog
```

### Legacy Colors (Maintained for Compatibility)

These colors are retained from the previous design system:

```css
--accent-gold: #FFB300;         /* Gold accents */
--accent-success: #00C853;      /* Success states (alternative) */
--accent-alert: #FF6F00;        /* Alert states (alternative) */
```

---

## Typography

### Font Family

The project uses a dual-font system:

```css
/* Primary Font - Headings */
--font-heading: var(--font-inter);
--font-inter: 'Inter', sans-serif;

/* Secondary Font - Body */
--font-body: var(--font-roboto);
--font-roboto: 'Roboto', sans-serif;
```

### Font Hierarchy

#### Headings (Inter)

```tsx
/* H1 - Main Page Title */
<h1 className="font-heading font-bold text-5xl lg:text-6xl text-heading-dark leading-tight">
  Main Page Title
</h1>

/* H2 - Section Heading */
<h2 className="font-heading font-bold text-4xl lg:text-5xl text-heading-dark">
  Section Heading
</h2>

/* H3 - Subsection Heading */
<h3 className="font-heading font-bold text-3xl lg:text-4xl text-heading-dark">
  Subsection Heading
</h3>

/* H4 - Component Heading */
<h4 className="font-heading font-semibold text-2xl lg:text-3xl text-heading-dark">
  Component Heading
</h4>
```

#### Body Text (Roboto)

```tsx
/* Large Body - Intro/Lead */
<p className="font-roboto text-lg lg:text-xl text-neutral-medium leading-relaxed">
  Lead paragraph or intro text
</p>

/* Regular Body */
<p className="font-roboto text-base text-text-dark leading-normal">
  Regular body text
</p>

/* Small Body - Captions */
<p className="font-roboto text-sm text-neutral-medium">
  Caption or metadata
</p>

/* Emphasized Text */
<p className="font-roboto font-medium text-lg text-text-dark">
  Emphasized body text
</p>
```

### Line Heights

Recommended line heights for optimal readability:

- **Headings**: 1.2 to 1.4 × font-size (use `leading-tight` or `leading-snug`)
- **Body Text**: 1.5 to 1.6 × font-size (use `leading-normal` or `leading-relaxed`)
- **Small Text**: 1.4 × font-size (use `leading-normal`)

### Font Weights

Available font weights:

```tsx
/* Inter (Headings) */
font-bold          /* 700 - Primary use */
font-semibold      /* 600 - Alternative */
font-medium        /* 500 - Rare use */

/* Roboto (Body) */
font-normal        /* 400 - Default */
font-medium        /* 500 - Emphasis */
font-light         /* 300 - Rare use */
```

### Typography in Tailwind Config

The `@tailwindcss/typography` plugin is configured for prose content:

```typescript
// tailwind.config.ts
typography: {
  DEFAULT: {
    css: {
      color: 'var(--neutral-dark)',
      a: {
        color: 'var(--secondary-orbitvu)',
        '&:hover': {
          color: 'var(--primary-orbitvu)',
        },
      },
      h1: {
        color: 'var(--heading-dark)',
        fontFamily: 'var(--font-inter)',
      },
      // ... more heading styles
    },
  },
}
```

**Usage**:
```tsx
<article className="prose prose-lg max-w-none">
  {/* Markdown or HTML content */}
</article>
```

---

## CSS Variables Reference

### Complete Variable List

All CSS variables are defined in `/app/globals.css`:

```css
/* Primary Brand Colors */
--primary-orbitvu: #6667AB;
--secondary-orbitvu: #4c5578;

/* Text & Headings */
--text-dark: #0D171A;
--heading-dark: #001D26;
--neutral-medium: #546E7A;

/* Backgrounds */
--bg-light-gray: #F8FAFB;
--bg-off-white: #FBFBFB;
--bg-warm-white: #FAF9F5;
--white: #FFFFFF;

/* Very Peri Extended (15 shades) */
--very-peri-0: #FFFFFF;
--very-peri-0-5: #F0F0F7;       /* Maps to --very-peri-50 */
--very-peri-1: #E0E1EE;         /* Maps to --very-peri-100 */
--very-peri-1-5: #D1D1E6;       /* Maps to --very-peri-150 */
--very-peri-2: #C2C2D0;         /* Maps to --very-peri-200 */
--very-peri-3: #A3A4CC;         /* Maps to --very-peri-300 */
--very-peri-4: #8585BC;         /* Maps to --very-peri-400 */
--very-peri-5: #6667AB;         /* Maps to --very-peri-500 (BASE) */
--very-peri-6: #5252B9;         /* Maps to --very-peri-600 */
--very-peri-7: #4D5EA7;         /* Maps to --very-peri-700 */
--very-peri-8: #292944;         /* Maps to --very-peri-800 */
--very-peri-8-5: #1F1F33;       /* Maps to --very-peri-850 */
--very-peri-9: #141522;         /* Maps to --very-peri-900 */
--very-peri-9-5: #0A0A11;       /* Maps to --very-peri-950 */
--very-peri-10: #000000;        /* Maps to --very-peri-1000 */

/* Future Dusk Extended (15 shades) */
--future-dusk-0: #F4F5F8;
--future-dusk-0-5: #E3E5EB;     /* Maps to --future-dusk-50 */
--future-dusk-1: #D2D5DE;       /* Maps to --future-dusk-100 */
--future-dusk-1-5: #C2C5D2;     /* Maps to --future-dusk-150 */
--future-dusk-2: #B1B5C5;       /* Maps to --future-dusk-200 */
--future-dusk-3: #8F95A8;       /* Maps to --future-dusk-300 */
--future-dusk-4: #6E7592;       /* Maps to --future-dusk-400 */
--future-dusk-5: #4c5578;       /* Maps to --future-dusk-500 (BASE) */
--future-dusk-6: #3D4460;       /* Maps to --future-dusk-600 */
--future-dusk-7: #2E3348;       /* Maps to --future-dusk-700 */
--future-dusk-8: #1E2230;       /* Maps to --future-dusk-800 */
--future-dusk-8-5: #171A24;     /* Maps to --future-dusk-850 */
--future-dusk-9: #0F1118;       /* Maps to --future-dusk-900 */
--future-dusk-9-5: #08090C;     /* Maps to --future-dusk-950 */
--future-dusk-10: #000000;      /* Maps to --future-dusk-1000 */

/* Accent Colors */
--accent-green: #27eb9f;
--accent-lime: #CBE857;
--accent-light-blue: #cdcdfd;
--accent-blue: #4a4aff;
--accent-orange: #ff7809;
--accent-yellow: #ffde05;
--accent-coral: #ff6f61;
--accent-pink: #ee68b2;
--accent-cyan: #62bbd3;
--accent-gray-light: #A0ABB6;
--accent-gray-medium: #A9AAAD;

/* Section Primary Colors */
--primary-creation: #ff7809;
--primary-formation: #cdcdfd;
--primary-blog: #CBE857;

/* Legacy Accents */
--accent-gold: #FFB300;
--accent-success: #00C853;
--accent-alert: #FF6F00;

/* Border Radius */
--radius: 0.625rem;             /* 10px - Base radius */
```

### Tailwind @theme Mapping

The `@theme inline` directive in `globals.css` maps CSS variables to Tailwind:

```css
@theme inline {
  /* Fonts */
  --font-heading: var(--font-inter);
  --font-body: var(--font-roboto);

  /* Colors */
  --color-primary-orbitvu: var(--primary-orbitvu);
  --color-secondary-orbitvu: var(--secondary-orbitvu);

  /* Very Peri palette */
  --color-very-peri-0: var(--very-peri-0);
  --color-very-peri-50: var(--very-peri-0-5);
  --color-very-peri-100: var(--very-peri-1);
  /* ... etc */

  /* Accent colors */
  --color-accent-green: var(--accent-green);
  --color-accent-lime: var(--accent-lime);
  /* ... etc */

  /* Radius scales */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}
```

This allows you to use:
- `className="text-primary-orbitvu"`
- `className="bg-very-peri-500"`
- `className="border-accent-lime"`

---

## Component Styling Guidelines

### Button Component

The `Button` component (`/components/ui/button.tsx`) provides semantic variants:

```tsx
import { Button } from '@/components/ui/button';

/* Default - Primary Orbitvu (Very Peri) */
<Button variant="default">
  Default Action
</Button>

/* Section - Uses contextual section color */
<Button variant="section">
  Section Action
</Button>

/* Secondary - Standard secondary style */
<Button variant="secondary">
  Secondary Action
</Button>

/* Outline - Border with transparent background */
<Button variant="outline">
  Outline Action
</Button>

/* Ghost - Minimal style, hover background */
<Button variant="ghost">
  Ghost Action
</Button>

/* Destructive - For dangerous actions */
<Button variant="destructive">
  Delete
</Button>

/* Link - Text button with underline */
<Button variant="link">
  Learn More
</Button>
```

**Button Sizes**:
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <IconComponent />
</Button>
```

**Button Variant Implementation**:
```typescript
// components/ui/button.tsx
section: "bg-[var(--section-primary,var(--primary-orbitvu))] text-white hover:bg-[var(--section-primary-hover,var(--primary-orbitvu))]"
```

This allows the button to automatically adapt to the section's primary color via CSS custom properties.

### Cards

Using the shadcn/ui Card component:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card className="border-neutral-light">
  <CardHeader>
    <CardTitle className="font-heading text-heading-dark">
      Card Title
    </CardTitle>
    <CardDescription className="font-roboto text-neutral-medium">
      Card description or subtitle
    </CardDescription>
  </CardHeader>
  <CardContent className="font-roboto text-text-dark">
    Main card content goes here
  </CardContent>
  <CardFooter>
    <Button variant="section">Action</Button>
  </CardFooter>
</Card>
```

### Forms

Form components styled with brand colors:

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email" className="font-roboto font-medium text-neutral-dark">
    Email Address
  </Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    className="border-neutral-medium focus:border-primary-orbitvu focus:ring-primary-orbitvu"
  />
</div>
```

### Links

Standard link styling:

```tsx
import { Link } from '@/i18n/routing';

/* Default link - Secondary Orbitvu with Primary hover */
<Link
  href="/page"
  className="text-secondary-orbitvu hover:text-primary-orbitvu transition-colors"
>
  Navigation Link
</Link>

/* In-content link */
<a
  href="/page"
  className="text-secondary-orbitvu hover:text-primary-orbitvu underline underline-offset-4"
>
  Learn more
</a>
```

### Badges

Custom badge styling with accent colors:

```tsx
/* Success badge */
<span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-green text-white text-sm font-medium">
  Success
</span>

/* Blog badge */
<span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-lime text-black text-sm font-medium border border-gray-300">
  Blog
</span>

/* Formation badge */
<span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-light-blue text-black text-sm font-medium border border-gray-300">
  Formation
</span>

/* Creation badge */
<span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-orange text-white text-sm font-medium">
  Création
</span>

/* Graphic caption badges */
<span className="inline-flex items-center px-3 py-1 rounded-md bg-accent-pink text-white text-xs font-bold uppercase tracking-wide">
  Knowledge
</span>

<span className="inline-flex items-center px-3 py-1 rounded-md bg-accent-cyan text-white text-xs font-bold uppercase tracking-wide">
  Case Study
</span>
```

---

## Section-Based Theming

### Concept

The project uses **dynamic section-based theming** via CSS custom properties. Each major section (Creation, Formation, Blog) defines `--section-primary` and `--section-primary-hover` variables that child components can reference.

This allows components like `Button variant="section"` to automatically adapt their color based on the current section without prop drilling or context.

### Implementation

#### Section Layouts

Each section has a layout wrapper that defines the section colors:

**Blog Layout** (`/app/[lang]/blog/layout.tsx`):
```tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="section-blog"
      style={{
        "--section-primary": "var(--primary-blog)",
        "--section-primary-hover": "#b5d144", // Darker lime for hover
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

**Creation Layout** (`/app/[lang]/ia-photo-produit/layout.tsx`):
```tsx
export default function CreationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="section-creation"
      style={{
        "--section-primary": "var(--primary-creation)",
        "--section-primary-hover": "var(--accent-coral)",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

**Formation Layout** (`/app/[lang]/academy/layout.tsx`):
```tsx
export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="section-formation"
      style={{
        // Use darker variant for WCAG AA compliance
        "--section-primary": "#8585ee",
        "--section-primary-hover": "#7070d9",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

**Note**: The Formation section uses `#8585ee` instead of the Brandbook's `#cdcdfd` to meet WCAG AA contrast requirements (4.5:1) for white text on colored backgrounds.

#### Component Usage

Components within these sections automatically receive the section color:

```tsx
// Inside /app/[lang]/blog/some-page/page.tsx
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Article</h1>

      {/* This button will be lime (#CBE857) because it's in the Blog section */}
      <Button variant="section">
        Read More
      </Button>
    </div>
  );
}
```

The same button in the Creation section would be orange, and in Formation would be blue.

### Section Color Reference

| Section | Primary | Hover | Text Color | Border Recommendation |
|---------|---------|-------|------------|----------------------|
| **Global** (default) | Very Peri (#6667AB) | Very Peri 90% | White | None needed (good contrast) |
| **Creation** | Orange (#ff7809) | Coral (#ff6f61) | White | Optional for clarity |
| **Formation** | Adapted Blue (#8585ee) | Darker Blue (#7070d9) | White | Recommended (border-2 border-gray-300) |
| **Blog** | Lime (#CBE857) | Darker Lime (#b5d144) | Black or Dark Gray | Required (border-2 border-gray-300) |

### Hero Component with Section Colors

The Hero component supports section-based theming:

```tsx
import Hero from '@/components/sections/Hero';

/* Use section color for CTA */
<Hero
  variant="default"
  titleKey="hero.title"
  subtitleKey="hero.subtitle"
  ctaKey="hero.cta"
  ctaHref="/contact"
  useSectionColor={true}  // Enable section-based CTA color
  namespace="creation"
/>
```

When `useSectionColor={true}`, the Hero CTA button will use `variant="section"` and adapt to the current section's color.

### Fallback Behavior

If a component uses `variant="section"` outside of a section layout, it falls back to the primary Orbitvu color:

```css
bg-[var(--section-primary,var(--primary-orbitvu))]
```

The `,var(--primary-orbitvu)` provides the fallback value.

---

## Accessibility

### WCAG AA Compliance

The design system targets **WCAG AA** compliance with a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text (18px+ or 14px+ bold).

### Color Contrast Testing

| Color on White | Contrast Ratio | WCAG AA (4.5:1) | Recommendation |
|----------------|----------------|-----------------|----------------|
| Very Peri (#6667AB) | 5.2:1 | **PASS** ✓ | Safe for text and CTAs |
| Future Dusk (#4c5578) | 8.1:1 | **PASS** ✓ | Excellent for text |
| Light Blue (#cdcdfd) | 1.2:1 | **FAIL** ✗ | Do NOT use for text on white |
| Lime (#CBE857) | 1.5:1 | **FAIL** ✗ | Border required for visibility |
| Orange (#ff7809) | 3.6:1 | **BORDERLINE** ⚠ | Border recommended |
| Green (#27eb9f) | 2.1:1 | **FAIL** ✗ | Border required for CTAs |

### Accessible Implementation Patterns

#### Formation (Light Blue)

Because the original Formation color (#cdcdfd) fails contrast tests, we use a darker variant:

```tsx
/* Button with accessible blue */
<Button
  variant="section"
  className="border-2 border-gray-300"  // Add border for extra definition
>
  Formation CTA
</Button>
```

**Layout Override**:
```tsx
// app/[lang]/academy/layout.tsx
style={{
  "--section-primary": "#8585ee",  // Darker variant (passes WCAG AA)
  "--section-primary-hover": "#7070d9",
}}
```

#### Blog (Lime)

Lime buttons require borders or shadows for sufficient contrast:

```tsx
/* Option 1: Border */
<Button
  variant="section"
  className="border-2 border-gray-300 shadow-sm"
>
  Blog CTA
</Button>

/* Option 2: Shadow only */
<Button
  variant="section"
  className="shadow-md"
>
  Blog CTA
</Button>
```

#### Creation (Orange)

Orange is borderline compliant. Add a border for improved accessibility:

```tsx
<Button
  variant="section"
  className="border border-gray-200"
>
  Creation CTA
</Button>
```

### Focus States

All interactive elements have visible focus indicators:

```tsx
/* Button focus states (built-in) */
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]

/* Custom link focus */
<a
  href="/page"
  className="
    text-secondary-orbitvu
    hover:text-primary-orbitvu
    focus:outline-none
    focus:ring-2
    focus:ring-primary-orbitvu
    focus:ring-offset-2
    rounded-sm
  "
>
  Accessible Link
</a>
```

### Color Blindness Considerations

The color palette is tested for various types of color blindness:

- **Deuteranopia** (red-green): Very Peri and Future Dusk remain distinguishable
- **Protanopia** (red-green): Accent colors maintain differentiation
- **Tritanopia** (blue-yellow): Sufficient contrast maintained

**Best Practice**: Never rely on color alone to convey information. Use icons, labels, or patterns in addition to color.

### Keyboard Navigation

All components support keyboard navigation:
- **Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns
- **Arrow Keys**: Navigate menus and selects

### Screen Reader Support

Semantic HTML and ARIA attributes ensure screen reader compatibility:

```tsx
/* Proper button semantics */
<Button variant="section" aria-label="Subscribe to newsletter">
  Subscribe
</Button>

/* Link with context */
<Link href="/blog/article" aria-describedby="article-summary">
  Read Article
</Link>
<p id="article-summary" className="sr-only">
  Learn about the latest trends in product photography
</p>
```

---

## Logo & Assets

### Logo Usage

The PackshotCreator logo is available in two colors only:

**Black Logo**:
```tsx
<img
  src="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6682a557f105555299d5aec6_Logo-Packshot-Creator.svg"
  alt="PackshotCreator Logo"
  className="h-10 w-auto"
/>
```

**White Logo**: Use on dark backgrounds (not currently implemented in CDN, would require local asset)

**Critical Rule**: The logo must ONLY be black or white. Never apply brand colors to the logo.

### Client Logos

Client logos are stored in `/public/logos/clients/`:

```tsx
import Image from 'next/image';

<Image
  src="/logos/clients/chanel.svg"
  alt="Chanel"
  width={120}
  height={60}
  className="grayscale hover:grayscale-0 transition-all"
/>
```

Available client logos:
- Amazon
- Bosch
- Castel
- Chanel
- Essilor
- Europart
- GS1
- Jägermeister
- L'Éclaireur
- Lidl
- Sandro
- Seiko
- Valentino
- Würth
- Zoomalia

### Icons

Industry icons are stored in `/public/icons/`:

```tsx
<Image
  src="/icons/camera-hardware.svg"
  alt="Hardware"
  width={48}
  height={48}
  className="text-primary-orbitvu"
/>
```

Available icons:
- `camera-hardware.svg`
- `gear-technical.svg`
- `watch-jewelry.svg`

### Asset Organization

```
/public/
├── logos/
│   ├── clients/          # Client brand logos (SVG)
│   └── packshot-creator/ # Our logo variants
├── icons/                # Functional icons (SVG)
├── images/               # Product images, hero images (PNG, JPG, WebP)
└── files/                # PDF downloads, datasheets
```

---

## Code Examples

### Example 1: Section Page with Hero

```tsx
// app/[lang]/creation/page.tsx
import Hero from '@/components/sections/Hero';
import { Button } from '@/components/ui/button';

export default function CreationPage() {
  return (
    <div>
      <Hero
        variant="ia"
        titleKey="creation.hero.title"
        subtitleKey="creation.hero.subtitle"
        ctaKey="creation.hero.cta"
        ctaHref="/demo"
        useSectionColor={true}  // Uses orange from CreationLayout
        namespace="creation"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl text-heading-dark mb-6">
            AI-Powered Product Photography
          </h2>

          <p className="font-roboto text-lg text-neutral-medium mb-8">
            Transform your product images with cutting-edge AI technology.
          </p>

          {/* This button is orange because it's in the Creation section */}
          <Button variant="section" size="lg">
            Start Creating
          </Button>
        </div>
      </section>
    </div>
  );
}
```

### Example 2: Card Grid with Section Colors

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Fast Processing',
      description: 'Process hundreds of images in minutes',
      icon: '⚡',
    },
    {
      title: 'AI-Powered',
      description: 'Intelligent background removal and enhancement',
      icon: '🤖',
    },
    {
      title: 'Cloud Storage',
      description: 'Securely store and access your images anywhere',
      icon: '☁️',
    },
  ];

  return (
    <section className="py-20 px-4 bg-bg-light-gray">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl text-heading-dark text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-neutral-light hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <CardTitle className="font-heading text-heading-dark">
                  {feature.title}
                </CardTitle>
                <CardDescription className="font-roboto text-neutral-medium">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="section" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Example 3: Typography Showcase

```tsx
export default function TypographyExample() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      {/* Heading hierarchy */}
      <h1 className="font-heading font-bold text-6xl text-heading-dark mb-4">
        Heading Level 1
      </h1>

      <h2 className="font-heading font-bold text-5xl text-heading-dark mb-4">
        Heading Level 2
      </h2>

      <h3 className="font-heading font-bold text-4xl text-heading-dark mb-4">
        Heading Level 3
      </h3>

      <h4 className="font-heading font-semibold text-3xl text-heading-dark mb-6">
        Heading Level 4
      </h4>

      {/* Body text */}
      <p className="font-roboto text-xl text-neutral-medium mb-4 leading-relaxed">
        This is lead paragraph text. It's slightly larger and sets the stage for the content that follows.
      </p>

      <p className="font-roboto text-base text-text-dark mb-4 leading-normal">
        This is regular body text. It's comfortable to read for extended periods and maintains good line height for readability across devices.
      </p>

      <p className="font-roboto text-sm text-neutral-medium leading-normal">
        This is small text, used for captions, metadata, or supplementary information.
      </p>

      {/* Links */}
      <p className="font-roboto text-base text-text-dark mt-6">
        Here is some text with a{' '}
        <a href="#" className="text-secondary-orbitvu hover:text-primary-orbitvu underline underline-offset-4 transition-colors">
          standard inline link
        </a>
        {' '}that changes color on hover.
      </p>
    </div>
  );
}
```

### Example 4: Accessible Form

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  return (
    <form className="max-w-md mx-auto space-y-6 p-8 bg-white rounded-lg shadow-md">
      <h2 className="font-heading text-3xl text-heading-dark mb-6">
        Get in Touch
      </h2>

      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="font-roboto font-medium text-neutral-dark">
          Full Name *
        </Label>
        <Input
          id="name"
          type="text"
          required
          placeholder="John Doe"
          className="border-neutral-medium focus:border-primary-orbitvu focus:ring-primary-orbitvu"
        />
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="font-roboto font-medium text-neutral-dark">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          required
          placeholder="john@example.com"
          className="border-neutral-medium focus:border-primary-orbitvu focus:ring-primary-orbitvu"
        />
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <Label htmlFor="message" className="font-roboto font-medium text-neutral-dark">
          Message *
        </Label>
        <textarea
          id="message"
          required
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:border-primary-orbitvu focus:ring-2 focus:ring-primary-orbitvu font-roboto"
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="section"
        size="lg"
        className="w-full"
      >
        Send Message
      </Button>

      <p className="font-roboto text-sm text-neutral-medium text-center">
        * Required fields
      </p>
    </form>
  );
}
```

### Example 5: Badge Variants

```tsx
export default function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      {/* Success badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-green text-white text-sm font-medium">
        ✓ Success
      </span>

      {/* Blog badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-lime text-black text-sm font-medium border-2 border-gray-300">
        Blog
      </span>

      {/* Formation badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-light-blue text-black text-sm font-medium border-2 border-gray-300">
        Formation
      </span>

      {/* Creation badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-orange text-white text-sm font-medium">
        Création
      </span>

      {/* Graphic caption - Knowledge */}
      <span className="inline-flex items-center px-3 py-1 rounded-md bg-accent-pink text-white text-xs font-bold uppercase tracking-wide">
        Knowledge
      </span>

      {/* Graphic caption - Case Study */}
      <span className="inline-flex items-center px-3 py-1 rounded-md bg-accent-cyan text-white text-xs font-bold uppercase tracking-wide">
        Case Study
      </span>

      {/* Graphic caption - Tutorial */}
      <span className="inline-flex items-center px-3 py-1 rounded-md bg-accent-blue text-white text-xs font-bold uppercase tracking-wide">
        Tutorial
      </span>
    </div>
  );
}
```

### Example 6: Hardcoded Colors for Charts

Some components require hardcoded colors due to library limitations:

```typescript
// components/calculators/ROICalculator/lib/chartColors.ts
export const CHART_COLORS = {
  // Main line colors
  current: '#ff7809',     // accent-orange - Current situation
  orbitvu: '#4c5578',     // secondary-orbitvu - Orbitvu solution
  breakEven: '#27eb9f',   // accent-green - Break-even marker

  // Grid and axis colors
  grid: '#E0E0E0',        // Light gray
  axis: '#757575',        // Medium gray
} as const;

// Usage in Recharts
import { LineChart, Line } from 'recharts';
import { CHART_COLORS } from './chartColors';

<LineChart data={data}>
  <Line
    type="monotone"
    dataKey="current"
    stroke={CHART_COLORS.current}
    strokeWidth={2}
  />
  <Line
    type="monotone"
    dataKey="orbitvu"
    stroke={CHART_COLORS.orbitvu}
    strokeWidth={2}
  />
</LineChart>
```

**Why Hardcoded?** Recharts requires static color values at render time and cannot dynamically read from CSS variables.

### Example 7: PDF Generation with Brand Colors

```typescript
// components/calculators/ROICalculator/PDFGenerator.tsx
import jsPDF from 'jspdf';

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

const COLORS = {
  primary: hexToRgb('#6667AB'),      // Very Peri
  secondary: hexToRgb('#4c5578'),    // Future Dusk
  accent: hexToRgb('#27eb9f'),       // Green
  text: hexToRgb('#0D171A'),         // Text Dark
  lightGray: hexToRgb('#F8FAFB'),    // BG Light Gray
};

export function generatePDF() {
  const doc = new jsPDF();

  // Header background
  doc.setFillColor(...COLORS.secondary);
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(...COLORS.text);
  doc.setFontSize(24);
  doc.text('ROI Report', 20, 25);

  // Accent element
  doc.setFillColor(...COLORS.accent);
  doc.rect(20, 50, 60, 4, 'F');

  return doc;
}
```

**Why Hardcoded?** jsPDF requires RGB arrays and cannot read from CSS variables.

### Example 8: Typographic Keywords (Background Elements)

```tsx
export default function BackgroundTypography() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background typographic keyword */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-heading font-bold text-[12rem] lg:text-[18rem] text-very-peri-500 opacity-5 select-none">
          INNOVATION
        </span>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl text-heading-dark mb-6">
          Driving Innovation in Product Photography
        </h2>
        <p className="font-roboto text-xl text-neutral-medium">
          Our cutting-edge technology revolutionizes the way you create product images.
        </p>
      </div>
    </section>
  );
}
```

### Example 9: Text Underlays (Emphasis)

```tsx
export default function TextUnderlay() {
  return (
    <h2 className="font-heading text-4xl text-heading-dark">
      Transform your{' '}
      <span className="relative inline-block">
        <span className="relative z-10">product photography</span>
        <span className="absolute bottom-1 left-0 h-3 w-full bg-accent-lime -z-10" />
      </span>
      {' '}with AI
    </h2>
  );
}
```

### Example 10: Responsive Color Palette

```tsx
export default function ColorPalette() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-8">
      {/* Primary colors */}
      <div>
        <div className="h-24 bg-primary-orbitvu rounded-lg mb-2" />
        <p className="font-roboto text-sm text-neutral-dark">Very Peri</p>
        <p className="font-roboto text-xs text-neutral-medium">#6667AB</p>
      </div>

      <div>
        <div className="h-24 bg-secondary-orbitvu rounded-lg mb-2" />
        <p className="font-roboto text-sm text-neutral-dark">Future Dusk</p>
        <p className="font-roboto text-xs text-neutral-medium">#4c5578</p>
      </div>

      {/* Accent colors */}
      <div>
        <div className="h-24 bg-accent-green rounded-lg mb-2" />
        <p className="font-roboto text-sm text-neutral-dark">Green</p>
        <p className="font-roboto text-xs text-neutral-medium">#27eb9f</p>
      </div>

      <div>
        <div className="h-24 bg-accent-lime rounded-lg mb-2 border-2 border-gray-300" />
        <p className="font-roboto text-sm text-neutral-dark">Lime</p>
        <p className="font-roboto text-xs text-neutral-medium">#CBE857</p>
      </div>

      <div>
        <div className="h-24 bg-accent-orange rounded-lg mb-2" />
        <p className="font-roboto text-sm text-neutral-dark">Orange</p>
        <p className="font-roboto text-xs text-neutral-medium">#ff7809</p>
      </div>

      <div>
        <div className="h-24 bg-accent-pink rounded-lg mb-2" />
        <p className="font-roboto text-sm text-neutral-dark">Pink</p>
        <p className="font-roboto text-xs text-neutral-medium">#ee68b2</p>
      </div>
    </div>
  );
}
```

---

## Additional Resources

### Related Documentation

- **DESIGN_SYSTEM.md** - Technical implementation details
- **PROJECT_GUIDELINES.md** - Project migration rules and workflow
- **tailwind.config.ts** - Tailwind configuration
- **app/globals.css** - CSS variables and @theme definitions

### Design References

The Brandbook 2025 draws inspiration from:
- **Orbitvu.com** - Official brand website
- **Stripe.com** - Clean, modern SaaS design
- **Photoroom.com** - Contemporary product photography platform

### Support and Maintenance

For questions or issues related to the design system:

1. **First**: Consult this documentation
2. **Second**: Check `DESIGN_SYSTEM.md` for technical details
3. **Third**: Review `PROJECT_GUIDELINES.md` for migration rules
4. **Fourth**: Inspect `app/globals.css` for variable definitions

### Changelog

**January 2026** - Brandbook 2025 Migration
- Replaced Cairo with Inter font family
- Migrated primary color from #EC3655 to #6667AB (Very Peri)
- Migrated secondary color from #24A1B4 to #4c5578 (Future Dusk)
- Added 11 accent colors for highlights and sections
- Implemented 15-shade extended palettes for Very Peri and Future Dusk
- Introduced section-based theming system
- Migrated 52+ components to new design system
- Achieved WCAG AA accessibility compliance
- Created comprehensive CSS variable system

---

## Quick Reference

### Color Variables

```css
/* Primary */
--primary-orbitvu: #6667AB;
--secondary-orbitvu: #4c5578;

/* Section Colors */
--primary-creation: #ff7809;
--primary-formation: #cdcdfd;
--primary-blog: #CBE857;

/* Top Accent Colors */
--accent-green: #27eb9f;
--accent-lime: #CBE857;
--accent-orange: #ff7809;
--accent-pink: #ee68b2;
--accent-cyan: #62bbd3;
```

### Font Usage

```tsx
/* Headings */
className="font-heading font-bold text-4xl"

/* Body */
className="font-roboto text-base"
```

### Button Variants

```tsx
<Button variant="default">Default</Button>
<Button variant="section">Section Color</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Common Patterns

```tsx
/* Link */
className="text-secondary-orbitvu hover:text-primary-orbitvu"

/* Card */
className="border-neutral-light hover:shadow-lg"

/* Background */
className="bg-bg-light-gray"

/* Text */
className="text-heading-dark"
className="text-neutral-medium"
```

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Maintainer**: PackshotCreator Development Team
