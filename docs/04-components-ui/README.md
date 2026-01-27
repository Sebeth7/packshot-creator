# Components & UI Documentation

**Version:** 1.0
**Last Updated:** January 2026
**Project:** PackshotCreator

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [UI Components (Radix-based)](#ui-components-radix-based)
4. [Shared Components](#shared-components)
5. [Section Components](#section-components)
6. [Blog Components](#blog-components)
7. [Calculator Components](#calculator-components)
8. [Form Patterns](#form-patterns)
9. [Styling Patterns](#styling-patterns)
10. [Internationalization](#internationalization)

---

## Overview

The PackshotCreator project uses a component-based architecture with multiple layers:

- **UI Components**: Low-level primitives built on Radix UI
- **Shared Components**: Reusable business components
- **Section Components**: Page-level sections with i18n
- **Blog Components**: Content-specific components for Sanity CMS
- **Calculator Components**: Complex ROI calculator with wizard flow

### Technology Stack

- **UI Framework**: React 18+ / Next.js 15
- **Component Library**: Radix UI primitives
- **Styling**: Tailwind CSS + CVA (Class Variance Authority)
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl
- **CMS**: Sanity (for blog)

---

## Architecture

```
components/
├── ui/                    # Radix UI-based primitives
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── form.tsx
│   ├── slider.tsx
│   ├── tooltip.tsx
│   ├── radio-group.tsx
│   ├── label.tsx
│   └── progress.tsx
│
├── shared/               # Reusable business components
│   ├── Badge.tsx
│   ├── BeforeAfter.tsx
│   ├── ProductGrid.tsx
│   ├── SectorGrid.tsx
│   └── EmbedFrame.tsx
│
├── sections/            # Page-level sections
│   ├── Hero.tsx
│   ├── ThreePillarsSection.tsx
│   ├── AIFeaturesGrid.tsx
│   ├── ProductShowcase.tsx
│   ├── BlogGrid.tsx
│   ├── ClientLogos.tsx
│   ├── CTABox.tsx
│   ├── IntroSection.tsx
│   ├── TailorMadeSection.tsx
│   └── IAManifesteSection.tsx
│
├── blog/                # Blog-specific components
│   ├── Callout.tsx
│   ├── ComparisonTable.tsx
│   ├── TableOfContents.tsx
│   ├── PortableTextComponents.tsx
│   └── index.ts
│
├── calculators/         # ROI Calculator
│   └── ROICalculator/
│       ├── index.tsx
│       ├── lib/
│       │   ├── validation.ts      (Zod schemas)
│       │   ├── calculations.ts     (ROI logic)
│       │   ├── types.ts
│       │   └── machines.ts
│       ├── steps/
│       ├── questions/
│       ├── results/
│       └── shared/
│
└── layout/              # Layout components
    ├── Header.tsx
    └── Footer.tsx
```

---

## UI Components (Radix-based)

All UI components are built on top of Radix UI primitives for accessibility and composability.

### Button

**File:** `/components/ui/button.tsx`

Built with **CVA (Class Variance Authority)** for type-safe variants.

#### Variants

```typescript
variant:
  | 'default'      // Primary Orbitvu violet
  | 'destructive'  // Red for dangerous actions
  | 'outline'      // Border with transparent bg
  | 'secondary'    // Secondary gray
  | 'ghost'        // Transparent hover
  | 'link'         // Text link style
  | 'section'      // CSS variable-based (adapts to section)

size:
  | 'default'      // h-9
  | 'sm'          // h-8
  | 'lg'          // h-10
  | 'icon'        // size-9 (square)
  | 'icon-sm'     // size-8
  | 'icon-lg'     // size-10
```

#### Usage

```tsx
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

// Basic usage
<Button variant="default" size="lg">
  Click me
</Button>

// With Link (polymorphic with asChild)
<Button asChild variant="section">
  <Link href="/contact">Contact</Link>
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <SearchIcon />
</Button>
```

#### Props API

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'section';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  asChild?: boolean;  // Use Radix Slot for polymorphic behavior
  className?: string;
  // + all native button props
}
```

#### Accessibility Features

- Focus visible ring with 3px width
- Disabled state with opacity and pointer-events-none
- Aria-invalid support for form integration

---

### Input

**File:** `/components/ui/input.tsx`

Accessible text input with focus states and validation support.

#### Usage

```tsx
import { Input } from '@/components/ui/input';

<Input
  type="email"
  placeholder="email@example.com"
  aria-invalid={!!error}
/>
```

#### Features

- Focus-visible ring (3px with primary color)
- Aria-invalid styling (destructive border/ring)
- File input styling support
- Dark mode support (bg-input/30)
- Selection styling (primary color)

---

### Card

**File:** `/components/ui/card.tsx`

Compound component for card layouts.

#### Components

- `Card` - Container
- `CardHeader` - Header with grid layout for title + action
- `CardTitle` - Title text
- `CardDescription` - Subtitle/description
- `CardAction` - Action button area (top-right)
- `CardContent` - Main content
- `CardFooter` - Footer area

#### Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Short description</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon">⋮</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Layout Features

- Uses CSS Grid in CardHeader for automatic title/action layout
- Container queries (@container/card-header)
- Flexible gap-6 spacing
- Border utilities for dividers (border-t, border-b)

---

### Form Components

**File:** `/components/ui/form.tsx`

React Hook Form integration with Radix UI primitives.

#### Components

- `Form` - FormProvider wrapper
- `FormField` - Controller wrapper with context
- `FormItem` - Container with unique ID generation
- `FormLabel` - Label with error state
- `FormControl` - Input wrapper with aria attributes
- `FormDescription` - Help text
- `FormMessage` - Error message display

#### Usage

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

#### Accessibility

- Automatic ID generation for aria-describedby
- Error state propagation via aria-invalid
- Focus management
- Screen reader friendly error messages

---

### Slider

**File:** `/components/ui/slider.tsx`

Radix Slider with Tailwind styling.

#### Usage

```tsx
import { Slider } from '@/components/ui/slider';

<Slider
  value={[50]}
  onValueChange={(values) => setValue(values[0])}
  min={0}
  max={100}
  step={1}
/>

// Multiple thumbs
<Slider
  value={[20, 80]}
  onValueChange={(values) => setRange(values)}
  min={0}
  max={100}
/>
```

#### Features

- Horizontal and vertical orientation
- Multiple thumbs support
- Focus ring on thumb
- Disabled state styling

---

### Tooltip

**File:** `/components/ui/tooltip.tsx`

Radix Tooltip with portal rendering.

#### Usage

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <HelpCircle />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Helpful information here</p>
  </TooltipContent>
</Tooltip>
```

#### Features

- Portal rendering (appears above all content)
- Arrow indicator
- Fade + zoom animations
- Zero delay by default (customizable)

---

### RadioGroup

**File:** `/components/ui/radio-group.tsx`

Radix RadioGroup with custom indicator.

#### Usage

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="opt1" />
    <Label htmlFor="opt1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="opt2" />
    <Label htmlFor="opt2">Option 2</Label>
  </div>
</RadioGroup>
```

---

### Label

**File:** `/components/ui/label.tsx`

Radix Label primitive with styling.

#### Usage

```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

---

### Progress

**File:** `/components/ui/progress.tsx`

Progress bar for loading states.

#### Usage

```tsx
import { Progress } from '@/components/ui/progress';

<Progress value={60} />
```

---

## Shared Components

### Badge

**File:** `/components/shared/Badge.tsx`

Versatile badge component with predefined variants.

#### Variants

```typescript
type BadgeVariant =
  | 'gold'      // Gold accent
  | 'turquoise' // Secondary Orbitvu color
  | 'red'       // Coral accent
  | 'green'     // Success accent
  | 'purple'    // Primary Orbitvu color
  | 'blue'      // Light blue
  | 'default';  // Neutral gray
```

#### Usage

```tsx
import Badge, { BadgeIAReady, BadgeQualiopi } from '@/components/shared/Badge';

// Basic badge
<Badge variant="turquoise">New</Badge>

// With icon
<Badge variant="purple" icon={<Sparkles />}>
  IA Ready
</Badge>

// Predefined badges
<BadgeIAReady>IA Ready</BadgeIAReady>
<BadgeQualiopi>Certifié Qualiopi</BadgeQualiopi>
```

#### Predefined Badges

- **BadgeIAReady**: Purple badge with lightning icon
- **BadgeQualiopi**: Green badge with checkmark icon
- **BadgeDistributor**: Red badge with star icon

---

### BeforeAfter

**File:** `/components/shared/BeforeAfter.tsx`

Before/After comparison component for showcasing AI transformations.

#### Usage

```tsx
import BeforeAfter, { BeforeAfterGrid } from '@/components/shared/BeforeAfter';

const caseData = {
  before: {
    src: '/images/before.jpg',
    alt: 'Before BlendAI',
  },
  after: {
    src: '/images/after.jpg',
    alt: 'After BlendAI',
  },
  title: 'Product Background Removal',
  description: 'Clean background in seconds',
  sector: 'E-commerce',
};

// Single comparison
<BeforeAfter case={caseData} layout="horizontal" />

// Grid of comparisons
<BeforeAfterGrid
  cases={[caseData1, caseData2, caseData3]}
  columns={2}
/>
```

#### Props

```typescript
interface BeforeAfterCase {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  title: string;
  description?: string;
  sector?: string;
}

interface BeforeAfterProps {
  case: BeforeAfterCase;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}
```

---

### ProductGrid

**File:** `/components/shared/ProductGrid.tsx`

Grid component for displaying products (hardware studios).

#### Usage

```tsx
import ProductGrid from '@/components/shared/ProductGrid';

const products = [
  {
    slug: 'alphashot-micro',
    name: 'Alphashot Micro',
    description: 'Compact photo studio',
    price: 'À partir de 8 990€',
    image: '/images/alphashot-micro.jpg',
    imageAlt: 'Alphashot Micro studio',
    isIAReady: true,
  },
  // ...
];

<ProductGrid
  products={products}
  columns={3}
  showPrice={true}
  ctaText="En savoir plus"
/>
```

#### Props

```typescript
interface Product {
  slug: string;
  name: string;
  description?: string;
  price?: string;
  image: string;
  imageAlt: string;
  isIAReady?: boolean;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  showPrice?: boolean;
  ctaText?: string;
}
```

#### Features

- Responsive grid (1 col mobile → 2/3/4 cols desktop)
- Hover effects (scale image, shadow)
- BadgeIAReady overlay for AI-compatible products
- Link to product detail page

---

## Section Components

Section components are page-level building blocks with built-in internationalization.

### Hero

**File:** `/components/sections/Hero.tsx`

Versatile hero section with variant support.

#### Variants

```typescript
type HeroVariant = 'hardware' | 'ia' | 'formation' | 'default';
```

Each variant has its own gradient background and accent color:

- **hardware**: Gray gradient, turquoise accent
- **ia**: Purple gradient (Very Peri), violet accent
- **formation**: Green gradient, formation color
- **default**: Neutral gray

#### Usage

```tsx
import Hero from '@/components/sections/Hero';
import { BadgeIAReady } from '@/components/shared/Badge';

<Hero
  variant="ia"
  titleKey="hero.title"
  subtitleKey="hero.subtitle"
  ctaKey="hero.cta"
  ctaHref="/contact"
  ctaSecondaryKey="hero.ctaSecondary"
  ctaSecondaryHref="/demo"
  namespace="iaPhotoProduit"
  useSectionColor={true}
  images={[
    { src: '/images/product.jpg', alt: 'Product image' }
  ]}
  badges={[
    <BadgeIAReady>IA Ready</BadgeIAReady>
  ]}
/>
```

#### Props

```typescript
interface HeroProps {
  variant?: HeroVariant;
  titleKey?: string;           // i18n key for title
  subtitleKey?: string;         // i18n key for subtitle
  ctaKey?: string;              // i18n key for CTA button
  ctaHref?: string;
  ctaSecondaryKey?: string;
  ctaSecondaryHref?: string;
  images?: Array<{ src: string; alt: string }>;
  badges?: ReactNode[];
  namespace?: string;           // i18n namespace (default: 'home')
  useSectionColor?: boolean;    // Use CSS variable for button color
}
```

---

### ThreePillarsSection

**File:** `/components/sections/ThreePillarsSection.tsx`

Displays the three main pillars: Capture, Creation, Formation.

#### Usage

```tsx
import ThreePillarsSection from '@/components/sections/ThreePillarsSection';

<ThreePillarsSection variant="homepage" />
// or
<ThreePillarsSection variant="studios" />
```

#### Features

- Camera, Sparkles, GraduationCap icons from Lucide
- Colored badges (turquoise, purple, green)
- Hover effects (scale icon, border, shadow)
- Links to respective pages

---

### AIFeaturesGrid

**File:** `/components/sections/AIFeaturesGrid.tsx`

2x2 grid showcasing BlendAI features.

#### Features

- Lifestyle generation
- Background removal
- Retouching
- Batch processing

#### Usage

```tsx
import AIFeaturesGrid from '@/components/sections/AIFeaturesGrid';

<AIFeaturesGrid />
```

#### Features

- Emoji + icon animation on hover
- Links to BlendAI feature anchors
- Gradient background (Very Peri → white)

---

### CTABox

**File:** `/components/sections/CTABox.tsx`

Call-to-action box with customizable styling.

#### Usage

```tsx
import CTABox from '@/components/sections/CTABox';

<CTABox
  titleKey="cta.title"
  descriptionKey="cta.description"
  ctaKey="cta.button"
  ctaHref="/contact"
  namespace="home"
/>
```

---

## Blog Components

### Callout

**File:** `/components/blog/Callout.tsx`

Styled callout boxes for blog articles.

#### Types

```typescript
type CalloutType = 'info' | 'warning' | 'success' | 'alert';
```

#### Usage

```tsx
import { Callout } from '@/components/blog/Callout';

<Callout type="info" title="Important">
  <p>This is important information.</p>
</Callout>

<Callout type="warning" title="Warning">
  <p>Be careful with this.</p>
</Callout>
```

#### Styling

- **info**: Blue (Very Peri) background with left border
- **warning**: Yellow background with orange text
- **success**: Green background
- **alert**: Red background

---

### ComparisonTable

**File:** `/components/blog/ComparisonTable.tsx`

Comparison tables for blog content.

#### Usage

```tsx
import { ComparisonTable } from '@/components/blog/ComparisonTable';

<ComparisonTable
  headers={['Méthode A', 'Méthode B', 'Méthode C']}
  rows={[
    {
      label: 'Coût',
      values: ['1000€', '1500€', '2000€'],
    },
    {
      label: 'Temps',
      values: ['2h', '3h', '4h'],
    },
  ]}
/>
```

#### Features

- Sticky header with Orbitvu color
- Alternating row colors
- Hover effect on rows
- Responsive overflow-x-auto

---

### TableOfContents

**File:** `/components/blog/TableOfContents.tsx`

Auto-generated table of contents from article headings.

#### Usage

```tsx
import { TableOfContents } from '@/components/blog/TableOfContents';

// In article layout
<aside>
  <TableOfContents />
</aside>
```

#### Features

- Extracts H2 and H3 from article
- Intersection Observer for active heading
- Smooth scroll to heading
- Indentation for H3 (nested)

---

### PortableTextComponents

**File:** `/components/blog/PortableTextComponents.tsx`

Custom renderers for Sanity Portable Text.

#### Usage

```tsx
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';

<PortableText
  value={article.body}
  components={portableTextComponents}
/>
```

#### Custom Types

- **callout**: Renders Callout component
- **comparisonTable**: Renders ComparisonTable
- **code**: Code block with syntax highlighting

#### Block Styles

- H1, H2, H3, H4 with custom typography
- Blockquote with left border
- Normal paragraph

#### Marks

- **strong**: Bold text
- **em**: Italic text
- **code**: Inline code with monospace font
- **link**: External links open in new tab

---

## Calculator Components

The ROI Calculator is a complex multi-step wizard with form validation, calculations, and result visualization.

### Architecture

```
calculators/ROICalculator/
├── index.tsx                      # Export
├── ROICalculatorWizard.tsx        # Main wizard component
├── lib/
│   ├── validation.ts              # Zod schemas
│   ├── calculations.ts            # ROI calculation logic
│   ├── types.ts                   # TypeScript types
│   ├── machines.ts                # Machine catalog
│   ├── machineSelector.ts         # Machine recommendation
│   ├── constants.ts               # Business constants
│   └── analytics.ts               # Analytics tracking
├── steps/
│   ├── Step1CurrentSituation.tsx
│   ├── Step2ProductionGoals.tsx
│   └── Step3Results.tsx
├── questions/                     # Individual form questions
│   ├── QuestionOperators.tsx
│   ├── QuestionTimePercentage.tsx
│   ├── QuestionExternalProvider.tsx
│   ├── QuestionDailyCapacity.tsx
│   ├── QuestionAnnualVolume.tsx
│   ├── QuestionEquipmentBudget.tsx
│   ├── QuestionProductionSplit.tsx
│   └── QuestionProductSize.tsx
├── results/                       # Result visualization
│   ├── HeroMetrics.tsx
│   ├── ComparisonTable.tsx
│   ├── EvolutionChart.tsx
│   ├── BreakEvenTimeline.tsx
│   ├── MachineRecommendation.tsx
│   ├── AdditionalBenefits.tsx
│   └── EmailCapture.tsx
└── shared/                        # Shared calculator components
    ├── WizardProgress.tsx
    ├── TooltipHelper.tsx
    └── QuestionWrapper.tsx
```

### Validation Schemas

**File:** `/components/calculators/ROICalculator/lib/validation.ts`

```typescript
import { z } from 'zod';

// Step 1: Current situation
export const step1Schema = z.object({
  nbOperateurs: z.number()
    .int('Nombre entier requis')
    .min(1, 'Minimum 1 opérateur')
    .max(20, 'Maximum 20 opérateurs'),
  pourcentageTemps: z.number()
    .min(10, 'Minimum 10%')
    .max(100, 'Maximum 100%'),
  utiliseSolutionExterne: z.boolean(),
  budgetMensuelExterne: z.number()
    .min(0)
    .max(50000)
    .optional(),
  capaciteJournaliere: z.number()
    .min(5, 'Minimum 5 photos/jour')
    .max(300, 'Maximum 300 photos/jour'),
});

// Step 2: Production goals
export const step2Schema = z.object({
  photosAnnuelles: z.number()
    .min(100, 'Minimum 100 photos/an')
    .max(100000, 'Maximum 100 000 photos/an'),
  budgetEquipement: z.number()
    .min(0)
    .max(50000)
    .optional(),
  repartition: z.object({
    packshot: z.number().min(0).max(100),
    lifestyle: z.number().min(0).max(100),
  }).refine(data => data.packshot + data.lifestyle === 100, {
    message: 'Le total doit faire 100%',
  }),
  tailleProduitsCategory: z.enum(['petit', 'moyen', 'grand', 'tres-grand']),
});

export const fullSchema = step1Schema.merge(step2Schema);
```

### ROI Calculation Logic

**File:** `/components/calculators/ROICalculator/lib/calculations.ts`

#### Key Functions

```typescript
// Recommend optimal machine based on user inputs
export function recommanderMachine(inputs: UserInputs): Machine;

// Calculate all ROI metrics
export function calculateROI(inputs: UserInputs): CalculationResults;

// Format currency
export function formatEuro(value: number): string;

// Format time
export function formatHeures(heures: number): string;

// Generate chart data for 5-year projection
export function generateChartData(results: CalculationResults): ChartData[];
```

#### Calculation Breakdown

**Current Situation:**
- Employee cost (salary × headcount × % time)
- Equipment cost (annual budget)
- External provider cost (monthly × 12)
- Cost per photo
- Time per photo
- Daily capacity

**With Orbitvu Machine:**
- Recommended machine (based on volume, product size, content type)
- TCO (Total Cost of Ownership) over 5 years
- Operator cost (reduced to 1 operator, proportional time)
- Cost per photo with machine
- Time per photo (automated)

**Comparison Metrics:**
- Annual savings
- Break-even point (months)
- ROI Year 1
- ROI 5 years
- Savings per photo
- Days saved
- Residual capacity
- Growth potential

### Question Components

Each question is a self-contained component with:
- Bilingual labels (FR/EN)
- Tooltip helper
- Form integration (React Hook Form)
- Validation display

**Example:** `/components/calculators/ROICalculator/questions/QuestionOperators.tsx`

```tsx
'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

export default function QuestionOperators({ locale }: { locale: 'fr' | 'en' }) {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const value = watch('nbOperateurs') || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Label className="text-base font-medium text-neutral-dark">
            Combien de personnes travaillent sur la production de vos visuels ?
          </Label>
          <p className="text-sm text-neutral-medium mt-1">
            Inclus packshot + lifestyle + retouches
          </p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="text-neutral-medium">
              <HelpCircle className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Comptez tous les collaborateurs impliqués</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Slider
        value={[value]}
        onValueChange={(vals) => setValue('nbOperateurs', vals[0], { shouldValidate: true })}
        min={1}
        max={20}
        step={1}
      />

      {errors.nbOperateurs && (
        <p className="text-sm text-red-500">{errors.nbOperateurs.message}</p>
      )}
    </div>
  );
}
```

### Usage Example

```tsx
import { ROICalculator } from '@/components/calculators/ROICalculator';

export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-20">
      <ROICalculator locale="fr" />
    </div>
  );
}
```

---

## Form Patterns

### React Hook Form + Zod Pattern

The project uses a consistent pattern for form handling:

1. **Define Zod schema** for validation
2. **Create form with useForm** and zodResolver
3. **Wrap in Form component** (FormProvider)
4. **Use FormField** for each input
5. **Handle submission** with type-safe data

#### Complete Example

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// 1. Define schema
const contactSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Format: 0123456789'),
  type: z.enum(['demo', 'quote', 'support']),
  message: z.string().min(10, 'Minimum 10 caractères'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  // 2. Create form
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'demo',
      message: '',
    },
  });

  // 5. Handle submission
  const onSubmit = async (data: ContactFormData) => {
    console.log('Valid data:', data);
    // Send to API...
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input placeholder="Jean Dupont" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jean@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type field (RadioGroup) */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de demande</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="demo" id="demo" />
                    <Label htmlFor="demo">Demander une démo</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="quote" id="quote" />
                    <Label htmlFor="quote">Obtenir un devis</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="support" id="support" />
                    <Label htmlFor="support">Support technique</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Envoi...' : 'Envoyer'}
        </Button>
      </form>
    </Form>
  );
}
```

---

## Styling Patterns

### CVA (Class Variance Authority)

Used for type-safe component variants.

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border bg-transparent hover:bg-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### cn() Utility

**File:** `/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Purpose:**
- Combines class names with clsx
- Merges Tailwind classes intelligently (later classes override earlier ones)

**Usage:**

```tsx
// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  { "disabled-class": isDisabled }
)} />

// Merging with prop className
<Button className={cn("custom-margin", props.className)} />
```

### Section Color System

Components can adapt to section-specific colors using CSS variables.

**Button variant="section":**

```tsx
<Button variant="section">
  Call to Action
</Button>
```

This button uses CSS variables:
- `--section-primary` (defined per section)
- Falls back to `--primary-orbitvu`

**Utility functions:**

```typescript
// From /lib/utils.ts
export function getSectionPrimaryColor(pathname: string): string {
  if (pathname.includes('/blog')) return 'bg-primary-blog hover:bg-primary-blog/90';
  if (pathname.includes('/creation')) return 'bg-primary-creation hover:bg-primary-creation/90';
  if (pathname.includes('/formation')) return 'bg-primary-formation hover:bg-primary-formation/90';
  return 'bg-primary-orbitvu hover:bg-primary-orbitvu/90';
}
```

---

## Internationalization

All components use **next-intl** for internationalization.

### Pattern

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent({ namespace = 'common' }) {
  const t = useTranslations(namespace);

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Translation Files

Located in `/messages/{locale}.json`:

```json
{
  "home": {
    "hero": {
      "title": "Automatisez vos photos produits",
      "subtitle": "Studios photo robotisés et IA générative",
      "cta": "Demander une démo"
    },
    "threePillars": {
      "heading": "Nos 3 piliers",
      "capture": {
        "badge": "Capture",
        "title": "Studios photo automatisés",
        "description": "..."
      }
    }
  }
}
```

### Typed Routing with i18n

```tsx
import { Link } from '@/i18n/routing';

// Automatic locale prefixing
<Link href="/contact">Contact</Link>
// → /fr/contact or /en/contact
```

---

## Best Practices

### Component Creation

1. **Start with UI primitives** (Button, Input, Card)
2. **Compose into shared components** (Badge, ProductGrid)
3. **Build sections** with i18n support
4. **Use TypeScript** for props definition
5. **Add data-slot attributes** for testing/debugging

### Accessibility

- Use semantic HTML (`<button>`, `<nav>`, `<article>`)
- Radix UI provides ARIA attributes automatically
- Add aria-label/aria-describedby where needed
- Support keyboard navigation
- Focus visible states on all interactive elements

### Performance

- Use `'use client'` only when needed (forms, interactions)
- Server components by default
- Lazy load heavy components
- Optimize images with Next.js Image component

### Styling

- Use Tailwind utility classes
- Extract repeated patterns into CVA variants
- Use `cn()` for conditional classes
- Follow the color system (primary-orbitvu, secondary-orbitvu, etc.)

---

## Common Patterns

### Polymorphic Components (asChild)

```tsx
// Button as link
<Button asChild>
  <Link href="/contact">Contact</Link>
</Button>

// Custom element
<Button asChild>
  <a href="https://external.com" target="_blank">External</a>
</Button>
```

### Compound Components

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardAction><Button>Action</Button></CardAction>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Form Fields with Validation

```tsx
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormDescription>Help text</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

---

## Component Quick Reference

| Component | Type | Use Case |
|-----------|------|----------|
| Button | UI | Actions, links, forms |
| Input | UI | Text input, email, number |
| Card | UI | Content containers |
| Form* | UI | Form fields with validation |
| Slider | UI | Range selection |
| Tooltip | UI | Help text |
| RadioGroup | UI | Single choice selection |
| Badge | Shared | Labels, status indicators |
| BeforeAfter | Shared | AI transformation showcase |
| ProductGrid | Shared | Product catalog display |
| Hero | Section | Page headers |
| ThreePillarsSection | Section | Service overview |
| AIFeaturesGrid | Section | Feature showcase |
| Callout | Blog | Important notes |
| ComparisonTable | Blog | Side-by-side comparison |
| TableOfContents | Blog | Article navigation |
| ROICalculator | Calculator | Multi-step wizard form |

---

## File Locations Reference

```
/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator/components/

UI Components:
- ui/button.tsx
- ui/input.tsx
- ui/card.tsx
- ui/form.tsx
- ui/slider.tsx
- ui/tooltip.tsx
- ui/radio-group.tsx
- ui/label.tsx
- ui/progress.tsx

Shared Components:
- shared/Badge.tsx
- shared/BeforeAfter.tsx
- shared/ProductGrid.tsx
- shared/SectorGrid.tsx
- shared/EmbedFrame.tsx

Section Components:
- sections/Hero.tsx
- sections/ThreePillarsSection.tsx
- sections/AIFeaturesGrid.tsx
- sections/CTABox.tsx
- sections/BlogGrid.tsx
- sections/ClientLogos.tsx
- sections/ProductShowcase.tsx
- sections/IntroSection.tsx
- sections/TailorMadeSection.tsx
- sections/IAManifesteSection.tsx

Blog Components:
- blog/Callout.tsx
- blog/ComparisonTable.tsx
- blog/TableOfContents.tsx
- blog/PortableTextComponents.tsx

Calculator:
- calculators/ROICalculator/ (35 files)
  - index.tsx
  - ROICalculatorWizard.tsx
  - lib/validation.ts
  - lib/calculations.ts
  - lib/types.ts
  - steps/ (3 files)
  - questions/ (8 files)
  - results/ (11 files)
  - shared/ (3 files)
```

---

## Next Steps

For more information on:
- **Routing & i18n**: See routing documentation
- **Data Fetching**: See Sanity CMS integration docs
- **Deployment**: See deployment guide
- **Testing**: See testing strategy docs

---

**Document Version:** 1.0
**Last Updated:** January 2026
**Maintained by:** PackshotCreator Development Team
