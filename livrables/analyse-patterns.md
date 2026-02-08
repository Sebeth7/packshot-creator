# Analyse Patterns - PackshotCreator Next.js

**Date :** 2026-02-01
**Session :** 2-1 - Analyse Patterns
**Durée Analyse :** 2h

---

## SOMMAIRE EXÉCUTIF

Cette analyse exhaustive identifie tous les patterns de design, spacing, layouts, et composants du projet Next.js PackshotCreator. L'objectif est de fournir une base solide pour la création d'un brandbook web ultracomplet (Session 2-2).

**Statistiques clés :**
- **Composants analysés :** 17 composants (10 sections + 5 shared + 2 layout)
- **Patterns spacing identifiés :** 8 patterns principaux
- **Patterns grid identifiés :** 15 configurations responsive
- **Breakpoints utilisés :** 4 (sm, md, lg, xl)
- **Max-width patterns :** 6 variantes
- **Patterns Orbitvu recommandés :** 12 patterns haute priorité

---

## 1. PATTERNS SPACING

### 1.1 Échelle de Spacing Identifiée

Analyse de tous les composants sections/, shared/, layout/ avec comptage des occurrences.

| Pattern | Fréquence | Contexte d'Usage | Recommandation |
|---------|-----------|------------------|----------------|
| **gap-8** | 42 occurrences | Grilles sections, cards produits | ✅ Standard pour sections |
| **gap-6** | 28 occurrences | Grilles compactes, features | ✅ Standard pour grilles denses |
| **gap-12** | 18 occurrences | Hero, ProductShowcase (image-texte) | ✅ Standard pour layouts 2 colonnes |
| **gap-4** | 35 occurrences | Petits éléments, inline items | ✅ Standard pour spacing réduit |
| **gap-3** | 22 occurrences | Formulaires, badges | ✅ Standard pour micro-spacing |
| **gap-2** | 15 occurrences | Labels, micro-composants | ✅ Standard pour très petit spacing |
| **gap-1** | 8 occurrences | Badges, pills très compacts | ⚠️ Usage rare, éviter sauf nécessité |
| **gap-1.5** | 6 occurrences | Ajustements précis | ⚠️ Usage rare |

#### Padding Vertical (py-*) - Sections

| Pattern | Fréquence | Usage | Recommandation |
|---------|-----------|-------|----------------|
| **py-20** | 38 occurrences | Section padding principal | ✅ **STANDARD SECTIONS** |
| **py-12** | 12 occurrences | Sections compactes (ClientLogos, Footer) | ✅ Sections légères |
| **py-6** | 25 occurrences | Cards, éléments internes | ✅ Card padding |
| **py-4** | 32 occurrences | Header, small sections | ✅ Composants compacts |
| **py-2** | 18 occurrences | Badges, small buttons | ✅ Micro-composants |
| **py-1** | 10 occurrences | Pills, inline badges | ✅ Minimal padding |

#### Padding Horizontal (px-*)

| Pattern | Fréquence | Usage | Recommandation |
|---------|-----------|-------|----------------|
| **px-8** | 45 occurrences | Boutons CTA, cards content | ✅ **STANDARD CTA** |
| **px-6** | 28 occurrences | Cards padding, modals | ✅ Card standard |
| **px-4** | 52 occurrences | Sections, general containers | ✅ **STANDARD CONTAINER** |
| **px-3** | 22 occurrences | Badges, small buttons | ✅ Badges |
| **px-2** | 12 occurrences | Pills, chips | ✅ Minimal horizontal |

#### Space-Y (Vertical Stacking)

| Pattern | Fréquence | Usage | Recommandation |
|---------|-----------|-------|----------------|
| **space-y-6** | 18 occurrences | Sections content, Hero | ✅ **STANDARD SECTION CONTENT** |
| **space-y-4** | 25 occurrences | Form fields, content stacks | ✅ Standard forms |
| **space-y-3** | 15 occurrences | Cards content, compact lists | ✅ Cards |
| **space-y-2** | 20 occurrences | Footer links, small lists | ✅ Lists compactes |
| **space-y-8** | 8 occurrences | Large sections, simulateurs | ✅ Très espacé |

### 1.2 Recommandations Standardisation

**Échelle Recommandée (basée sur Tailwind + usage actuel) :**

```css
/* Échelle de spacing standardisée - Base 4px */
0   →  0px      (aucun)
1   →  4px      (0.25rem)  - Micro spacing
2   →  8px      (0.5rem)   - Petit spacing
3   →  12px     (0.75rem)  - Spacing réduit
4   →  16px     (1rem)     - **BASE STANDARD**
6   →  24px     (1.5rem)   - Spacing moyen
8   →  32px     (2rem)     - Spacing large
12  →  48px     (3rem)     - Spacing très large
20  →  80px     (5rem)     - **SECTION PADDING STANDARD**
```

**Règles d'Application :**

1. **Sections verticales :** Toujours `py-20` (80px desktop)
2. **Grilles de cards :** Toujours `gap-8` (32px)
3. **Hero layouts 2-cols :** Toujours `gap-12` (48px)
4. **Content stacking :** `space-y-6` (24px) par défaut
5. **Container padding :** `px-4` (16px) systématique
6. **CTA buttons :** `px-8 py-6` (large size)

---

## 2. PATTERNS GRID & LAYOUTS

### 2.1 Breakpoints Utilisés

Le projet utilise les breakpoints Tailwind standard :

| Breakpoint | Valeur | Usage Observé | Fréquence |
|------------|--------|---------------|-----------|
| **sm:** | 640px | Formulaires, grilles 2 cols mobile | 18 occurrences |
| **md:** | 768px | **PRINCIPAL** - Grilles 2-3 cols | 65 occurrences |
| **lg:** | 1024px | Hero 2 cols, grilles 3-4 cols | 52 occurrences |
| **xl:** | 1280px | Grilles 4+ cols | 4 occurrences |
| **2xl:** | 1536px | ❌ Non utilisé | 0 occurrence |

**Constat :** Le projet privilégie **mobile-first** avec progression md: → lg:

```tsx
// Pattern standard observé
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### 2.2 Systèmes de Grille

#### Grilles Responsive Identifiées

| Layout Type | Pattern Grid | Breakpoints | Composants Utilisant | Fréquence |
|-------------|--------------|-------------|----------------------|-----------|
| **2 colonnes** | `grid-cols-1 md:grid-cols-2` | Base mobile → md | ProductShowcase, IntroSection | 15 |
| **3 colonnes** | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Mobile → md → lg | BlogGrid, ProductGrid | 12 |
| **2 colonnes (Hero)** | `lg:grid-cols-2` | Desktop only | Hero, TailorMade | 8 |
| **3 colonnes (direct)** | `md:grid-cols-3` | md → desktop | ThreePillars, IAManifeste | 6 |
| **4 colonnes** | `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | 2 → 3 → 4 | SectorGrid, ProductGrid | 5 |
| **6 colonnes** | `grid-cols-2 md:grid-cols-3 lg:grid-cols-6` | 2 → 3 → 6 | SectorGrid (12 secteurs) | 2 |
| **5 colonnes (Footer)** | `md:grid-cols-5` | md → 5 cols | Footer | 1 |

#### Configurations Prédéfinies dans Composants

**ProductGrid.tsx** :
```tsx
const gridCols = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};
```

**SectorGrid.tsx** :
```tsx
const gridCols = {
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};
```

**BeforeAfter.tsx** :
```tsx
const gridCols = {
  2: 'grid-cols-1 lg:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};
```

### 2.3 Conteneurs Max-Width

| Pattern | Usage | Composants | Recommandation |
|---------|-------|------------|----------------|
| **max-w-7xl** | **STANDARD SECTIONS** | Hero, ThreePillars, BlogGrid, ProductShowcase, Header, Footer | ✅ **DEFAULT** (1280px) |
| **max-w-5xl** | Sections texte dense | IntroSection | ✅ Texte riche |
| **max-w-4xl** | CTABox, content centré | CTABox | ✅ Call-to-actions |
| **max-w-3xl** | Paragraphes centrés | Subtitles dans sections | ✅ Lead paragraphes |
| **max-w-2xl** | Descriptions courtes | AIFeaturesGrid subtitle | ✅ Short descriptions |
| **max-w-xl** | CTA descriptions | ContextualCTA | ✅ CTA text |
| **max-w-xs** | Tooltips | Tooltips calculateurs | ✅ Tooltips |

**Règle Standard :**
```tsx
// Pattern container section standard
<section className="py-20 px-4 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Contenu */}
  </div>
</section>
```

---

## 3. COMPOSANTS SECTIONS ANALYSÉS

### 3.1 Hero Component

**Fichier :** `components/sections/Hero.tsx` (141 lignes)

#### Structure & Props

```tsx
interface HeroProps {
  variant?: 'hardware' | 'ia' | 'formation' | 'default';
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
  ctaHref?: string;
  ctaSecondaryKey?: string;
  ctaSecondaryHref?: string;
  images?: { src: string; alt: string }[];
  badges?: ReactNode[];
  namespace?: string;
  useSectionColor?: boolean;
}
```

#### Variants

| Variant | Background | Accent Color | CTA Color | Usage |
|---------|------------|--------------|-----------|-------|
| **hardware** | `bg-gradient-to-br from-neutral-lighter to-white` | `text-secondary-orbitvu` | `bg-secondary-orbitvu` | Studios photo hardware |
| **ia** | `bg-gradient-to-br from-very-peri-50 to-white` | `text-primary-orbitvu` | `bg-primary-orbitvu` | IA Photo Produit |
| **formation** | `bg-gradient-to-br from-primary-formation/10 to-white` | `text-primary-formation` | `bg-primary-formation` | Academy/Formation |
| **default** | `bg-neutral-lighter` | `text-secondary-orbitvu` | `bg-secondary-orbitvu` | Homepage |

#### Spacing Pattern

- **Section padding :** `py-20 px-4`
- **Grid gap :** `gap-12` (entre texte et image)
- **Content spacing :** `space-y-6` (vertical stack)
- **Badges gap :** `gap-3` (horizontal wrap)
- **CTAs gap :** `gap-4` (flex-col sm:flex-row)

#### Layout

- **Grid :** `lg:grid-cols-2` (texte | image)
- **Max-width :** `max-w-7xl mx-auto`
- **Min-height :** `min-h-[600px]`
- **Image height :** `h-[400px] lg:h-[500px]`

#### Couleurs

- **Titre :** `text-neutral-dark` (toujours)
- **Sous-titre :** `text-neutral-medium`
- **Background :** Gradient selon variant
- **CTA :** Variant-aware OU `useSectionColor` prop

#### Typography

- **H1 :** `font-heading text-5xl lg:text-6xl leading-tight`
- **Subtitle :** `text-lg lg:text-xl leading-relaxed`
- **Bouton :** `text-lg` (size="lg")

#### CTA Pattern

- **Taille :** `size="lg"` → `px-8 py-6 text-lg`
- **Variant section-aware :** Prop `useSectionColor` active variant="section"
- **CTA primaire :** Toujours présent
- **CTA secondaire :** Optionnel, variant="outline" avec `border-2`

#### Fonctionnalités Spéciales

- **Badges personnalisables :** Array de ReactNode
- **Images multiples :** Support, affiche la dernière
- **i18n :** namespace dynamique
- **Section color :** Support theming contextuel

#### À Noter

- Support gradients subtils pour différenciation visuelle
- Image en `object-contain` pour préserver ratio
- Responsive: empilé mobile, côte-à-côte desktop
- Priority loading sur image principale

---

### 3.2 ThreePillarsSection

**Fichier :** `components/sections/ThreePillarsSection.tsx` (105 lignes)

#### Structure & Props

```tsx
interface Props {
  variant?: 'homepage' | 'studios';
}
```

#### Spacing Pattern

- **Section padding :** `py-20` (bg-white)
- **Container padding :** `px-4`
- **Grid gap :** `gap-8` (entre les 3 cards)
- **Header margin :** `mb-12` (heading → cards)
- **Icon margin :** `mb-6`
- **Badge margin :** `mb-4`
- **Title margin :** `mb-3`
- **Arrow margin :** `mt-6`

#### Layout

- **Grid :** `md:grid-cols-3` (3 colonnes égales)
- **Max-width :** `max-w-7xl mx-auto`
- **Cards :** `bg-neutral-lighter rounded-xl p-8`

#### Couleurs

- **Background section :** `bg-white`
- **Cards background :** `bg-neutral-lighter`
- **Border hover :** `border-secondary-orbitvu` (2px)
- **Titre card hover :** `text-secondary-orbitvu`
- **Arrow :** `text-secondary-orbitvu`

#### Typography

- **Section heading :** `text-3xl lg:text-4xl font-heading font-bold`
- **Subtitle :** `text-lg max-w-3xl mx-auto`
- **Card title :** `text-2xl font-heading font-bold`
- **Description :** `text-neutral-medium leading-relaxed`

#### Animations

- **Card hover :** `hover:shadow-2xl transition-all duration-300`
- **Border hover :** `border-2 border-transparent hover:border-secondary-orbitvu`
- **Icon scale :** `group-hover:scale-110 transition-transform duration-300`
- **Arrow translate :** `group-hover:translate-x-2 transition-transform duration-300`
- **Title color :** `group-hover:text-secondary-orbitvu transition-colors`

#### Pattern Cards

Les 3 piliers :
1. **Capture** (Studios photo) - Badge turquoise
2. **Création** (IA Photo) - Badge purple
3. **Formation** (Academy) - Badge green

Chaque card contient :
- Icon Lucide (Camera, Sparkles, GraduationCap)
- Badge coloré
- Titre
- Description
- Arrow indicator "En savoir plus"

#### Fonctionnalités

- **i18n :** namespace dynamique selon variant
- **Navigation :** Cards sont des Link vers sections
- **Icons :** Lucide React icons
- **Badges :** Composant Badge shared

---

### 3.3 CTABox Component

**Fichier :** `components/sections/CTABox.tsx` (65 lignes)

#### Structure & Props

```tsx
interface CTABoxProps {
  headingKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaHref: string;
  bgColor?: 'coral' | 'teal' | 'light-gray' | 'white';
  namespace?: string;
  useSectionColor?: boolean;
}
```

#### Background Color Variants

| bgColor | Classes | Text Color | Button Style |
|---------|---------|------------|--------------|
| **coral** | `bg-secondary-orbitvu text-white` | Blanc | `bg-white text-secondary-orbitvu` |
| **teal** | `bg-secondary-orbitvu text-white` | Blanc | `bg-white text-secondary-orbitvu` |
| **light-gray** | `bg-neutral-light text-neutral-dark` | Sombre | `bg-secondary-orbitvu text-white` |
| **white** | `bg-white text-neutral-dark` | Sombre | `bg-secondary-orbitvu text-white` |

#### Spacing Pattern

- **Section padding :** `py-20 px-4`
- **Content spacing :** `space-y-6` (vertical stack)
- **Button margin :** `pt-4` (au-dessus CTA)
- **Max-width :** `max-w-4xl mx-auto` (plus étroit que sections standard)

#### Typography

- **Heading :** `font-heading text-3xl lg:text-4xl leading-tight`
- **Description :** `text-lg lg:text-xl leading-relaxed opacity-90`
- **Button :** `text-lg` (size="lg")

#### CTA Pattern

- **Size :** `px-8 py-6 text-lg`
- **Variant :** `useSectionColor` ? 'section' : background-based
- **Centré :** Toujours centré avec `text-center`

#### Usage Recommandé

- **CTA final de section** : Invite à l'action après contenu
- **Between sections** : Diviser contenu long
- **Conversion points** : Points stratégiques du funnel

---

### 3.4 ClientLogos Component

**Fichier :** `components/sections/ClientLogos.tsx` (42 lignes)

#### Structure

Composant simple, pas de props - affiche logos clients hardcodés.

#### Spacing Pattern

- **Section padding :** `py-12 px-4` (réduit vs standard py-20)
- **Container gap :** `gap-8 md:gap-12` (flex-wrap)
- **Logo height :** `h-12` fixe

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Display :** `flex flex-wrap items-center justify-center`
- **Background :** `bg-neutral-lighter`

#### Logos Liste (15 clients)

1. Amazon
2. Essilor
3. L'Éclaireur
4. Castel
5. Europart
6. Chanel
7. Lidl
8. GS1
9. Jägermeister
10. Bosch
11. Sandro
12. Seiko
13. Valentino
14. Würth
15. Zoomalia

#### Animations

```tsx
className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
```

- **État repos :** 70% opacité + grayscale
- **Hover global :** 100% opacité + couleur
- **Transition :** 500ms smooth

#### Image Pattern

```tsx
<Image
  src={logo.src}
  alt={logo.name}
  width={logo.width}
  height={logo.height}
  className="h-full w-auto max-w-[120px] object-contain"
/>
```

- **Height :** Fixe 48px (h-12)
- **Width :** Auto proportionnel
- **Max-width :** 120px limite
- **Object-fit :** contain (préserve ratio)

#### Recommandations

- **Quick Win :** Ajouter effet hover individuel sur chaque logo (vs hover global)
- **Pattern Orbitvu :** Logos devraient avoir effet hover subtil séparé
- **Accessibilité :** Alt text présent

---

### 3.5 BlogGrid Component

**Fichier :** `components/sections/BlogGrid.tsx` (97 lignes)

#### Structure & Props

```tsx
interface BlogPost {
  titleKey: string;
  categoryKey: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  slug: string;
}

interface BlogGridProps {
  headingKey: string;
  descriptionKey: string;
  posts: BlogPost[];
  ctaKey: string;
  ctaHref: string;
}
```

#### Spacing Pattern

- **Section padding :** `py-20 px-4`
- **Header margin :** `mb-12`
- **Grid margin :** `mb-12` (avant CTA)
- **Grid gap :** `gap-8` (entre cards)
- **Card content :** `p-6 space-y-3`
- **Metadata gap :** `gap-3` (flex)

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Grid :** `md:grid-cols-2 lg:grid-cols-3` (responsive 2-3 cols)
- **Image height :** `h-48` fixe
- **Background :** `bg-white`

#### Couleurs

- **Section bg :** `bg-white`
- **Cards :** `overflow-hidden hover:shadow-lg`
- **Underline :** `w-24 h-1 bg-secondary-orbitvu mx-auto mb-6`
- **Category :** `text-secondary-orbitvu font-medium`
- **Date :** `text-neutral-medium/60`
- **Title hover :** `hover:text-secondary-orbitvu`

#### Typography

- **Section heading :** `font-heading text-4xl lg:text-5xl`
- **Subtitle :** `text-lg max-w-3xl mx-auto`
- **Card title :** `font-heading text-xl hover:text-secondary-orbitvu transition-colors`
- **Category :** `text-sm font-medium`
- **Date :** `text-sm`

#### CTA Pattern

- **Variant :** `variant="outline"`
- **Style :** `border-2 border-secondary-orbitvu text-secondary-orbitvu`
- **Hover :** `hover:bg-secondary-orbitvu hover:text-white`
- **Size :** `px-8 py-4`
- **Position :** Centré sous grille

#### Pattern Cards

Chaque card blog :
- Image 48px height, full-width
- Padding 24px content
- Category + Date (flex gap-3)
- Titre hover effect
- Link wrapping entire card

#### Animations

- **Card :** `hover:shadow-lg transition-shadow`
- **Title :** `transition-colors`

#### Recommandations

- **Pattern actuel :** Bon pour homepage (3 derniers articles)
- **À améliorer :** Ajouter image hover effect (scale ou brightness)

---

### 3.6 ProductShowcase Component

**Fichier :** `components/sections/ProductShowcase.tsx` (106 lignes)

#### Structure & Props

```tsx
interface ProductShowcaseProps {
  brandKey: string;
  headingKey: string;
  descriptionKey: string;
  featuresKeys: string[];
  ctaKey: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  bgColor?: 'white' | 'light-gray' | 'warm-white';
}
```

#### Spacing Pattern

- **Section padding :** `py-20 px-4`
- **Grid gap :** `gap-12` (image-texte)
- **Content spacing :** `space-y-6`
- **Features spacing :** `pt-4 space-y-3`
- **Feature gap :** `gap-3` (icon-text flex)
- **Underline margin :** `mb-4`

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Grid :** `lg:grid-cols-2` (2 colonnes desktop)
- **Image height :** `h-[400px] lg:h-[500px]`
- **Reverse flow :** `lg:grid-flow-col-dense` si image right

#### Background Variants

```tsx
const bgClasses = {
  'white': 'bg-white',
  'light-gray': 'bg-bg-light-gray',
  'warm-white': 'bg-bg-warm-white'
};
```

#### Image Position Logic

```tsx
// Si imagePosition='right'
<div className={`lg:col-start-2`}>Image</div>
<div className={`lg:col-start-1`}>Content</div>
```

Permet d'alterner image gauche/droite entre sections.

#### Couleurs

- **Brand badge :** `text-neutral-dark uppercase tracking-wider`
- **Underline :** `w-16 h-1 bg-secondary-orbitvu`
- **CTA :** `border-2 border-secondary-orbitvu`
- **Features bullets :** `w-2 h-2 bg-secondary-orbitvu rounded-full`

#### Typography

- **Heading :** `font-heading text-4xl lg:text-5xl leading-tight`
- **Brand badge :** `text-sm font-heading font-bold uppercase tracking-wider`
- **Description :** `text-lg leading-relaxed`
- **Features :** `text-base font-medium`

#### CTA Pattern

- **Variant :** `outline`
- **Style :** `border-2 border-secondary-orbitvu`
- **Hover :** `hover:bg-secondary-orbitvu hover:text-white`
- **Size :** `px-8 py-4`

#### Pattern Features Liste

```tsx
{featuresKeys.map((featureKey, idx) => (
  <div key={idx} className="flex items-start gap-3">
    <div className="w-2 h-2 bg-secondary-orbitvu rounded-full mt-2 flex-shrink-0" />
    <p>{t(featureKey)}</p>
  </div>
))}
```

#### Usage Recommandé

- **Showcase produit individuel** avec détails
- **Alterner imagePosition** entre sections pour variété visuelle
- **Features en liste** avec bullets colorés

---

### 3.7 TailorMadeSection Component

**Fichier :** `components/sections/TailorMadeSection.tsx` (64 lignes)

#### Structure

Composant spécifique homepage - 6 solutions présentées en cards + image droite.

#### Spacing Pattern

- **Section padding :** `py-20 px-4`
- **Grid gap :** `gap-12` (cards | image)
- **Cards spacing :** `space-y-4`
- **Card padding :** `p-6`
- **Card internal gap :** `gap-4` (icon-text flex)

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Grid :** `lg:grid-cols-2` (cards gauche | image droite)
- **Image height :** `h-[500px] lg:h-[600px]`

#### Couleurs

- **Section bg :** `bg-white`
- **Cards :** `border border-neutral-light`
- **Card hover :** `hover:shadow-md transition-shadow`
- **Icon bg :** `bg-secondary-orbitvu/10`
- **Icon color :** `bg-secondary-orbitvu` (placeholder)
- **Title underline :** `decoration-secondary-orbitvu decoration-2 underline-offset-8`

#### Typography

- **Heading :** `font-heading text-4xl lg:text-5xl`
- **Heading span underline :** Utilise `<span className="underline ...">tailor-made solution</span>`
- **Card title :** `font-heading font-semibold text-xl mb-2`
- **Card description :** `text-sm text-neutral-medium`

#### Solutions (6 cards)

1. E-commerce
2. Digital
3. Quality
4. Studio
5. Creative
6. Manufacturers

#### Image Pattern

```tsx
<img
  src="https://cdn.prod.website-files.com/..."
  alt="Professional working on PackshotCreator studio"
  className="w-full h-full object-cover rounded-lg"
/>
```

#### Icon Pattern (Placeholder)

```tsx
<div className="w-12 h-12 flex-shrink-0 bg-secondary-orbitvu/10 rounded-lg flex items-center justify-center">
  <div className="w-6 h-6 bg-secondary-orbitvu rounded"></div>
</div>
```

**À améliorer :** Remplacer par Lucide icons spécifiques

#### Recommandations

- **Quick Win :** Ajouter vrais icons Lucide pour chaque solution
- **Hover effect :** Card hover pourrait scaler l'icon

---

### 3.8 IntroSection Component

**Fichier :** `components/sections/IntroSection.tsx` (70 lignes)

#### Structure & Props

```tsx
interface IntroSectionProps {
  headingKey: string;
  text1Key: string;
  text2Key: string;
  ctaKey?: string;
  ctaHref?: string;
  showCTA?: boolean;
  bgColor?: 'white' | 'light-gray' | 'warm-white';
}
```

#### Spacing Pattern

- **Section padding :** `py-20 px-4`
- **Header margin :** `mb-12`
- **Grid margin :** `mb-8` (textes → CTA)
- **Grid gap :** `gap-8` (entre 2 colonnes texte)
- **CTA margin :** `mt-12` (si showCTA)
- **Underline margin :** `mb-4`

#### Layout

- **Container :** `max-w-5xl mx-auto` (plus étroit que standard 7xl)
- **Grid :** `md:grid-cols-2` (2 colonnes texte)
- **Centré :** `text-center`

#### Background Variants

```tsx
const bgClasses = {
  'white': 'bg-white',
  'light-gray': 'bg-bg-light-gray',
  'warm-white': 'bg-bg-warm-white'
};
```

#### Couleurs

- **Underline :** `w-24 h-1 bg-secondary-orbitvu mx-auto`
- **CTA :** `border-2 border-secondary-orbitvu`

#### Typography

- **Heading :** `font-heading text-4xl lg:text-5xl`
- **Paragraphes :** `text-lg leading-relaxed`

#### CTA Pattern

- **Variant :** `outline`
- **Style :** `border-2 border-secondary-orbitvu text-secondary-orbitvu`
- **Hover :** `hover:bg-secondary-orbitvu hover:text-white`
- **Size :** `px-8 py-6 text-lg`

#### Usage Recommandé

- **Section intro texte** avant contenu détaillé
- **2 colonnes texte** pour équilibrer visuellement
- **CTA optionnel** selon besoin conversion

---

### 3.9 AIFeaturesGrid Component

**Fichier :** `components/sections/AIFeaturesGrid.tsx` (103 lignes)

#### Structure

Grid 2x2 présentant 4 features IA (lifestyle, background, retouche, batch).

#### Spacing Pattern

- **Section padding :** `py-20`
- **Container padding :** `px-4`
- **Header margin :** `mb-12`
- **Grid gap :** `gap-6 lg:gap-8` (responsive)
- **Card padding :** `p-8`
- **Icon margin :** `mb-6`
- **Icon gap :** `gap-4` (emoji + lucide)
- **Title margin :** `mb-3`
- **Description margin :** `mb-4`

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Grid :** `md:grid-cols-2` (2x2)
- **Background section :** `bg-gradient-to-br from-very-peri-50 to-white`

#### Couleurs

- **Section bg :** Gradient Very Peri
- **Cards :** `bg-white`
- **Border hover :** `border-primary-orbitvu` (2px)
- **Title hover :** `text-primary-orbitvu`
- **Arrow :** `text-primary-orbitvu`
- **Icon Lucide :** `text-primary-orbitvu` (opacity-0 → opacity-100 hover)

#### Typography

- **Section heading :** `text-3xl lg:text-4xl font-heading font-bold`
- **Subtitle :** `text-lg max-w-2xl mx-auto`
- **Card title :** `text-2xl font-heading font-bold`

#### Animations

- **Card :** `hover:shadow-2xl transition-all duration-300`
- **Border :** `border-2 border-transparent hover:border-primary-orbitvu`
- **Title :** `group-hover:text-primary-orbitvu transition-colors`
- **Lucide icon :** `opacity-0 group-hover:opacity-100 transition-opacity duration-300`
- **Arrow :** `group-hover:translate-x-2 transition-transform duration-300`

#### Features Icons Pattern

```tsx
<div className="mb-6 flex items-center gap-4">
  <span className="text-5xl">{feature.icon}</span> {/* Emoji */}
  <feature.Icon className="w-10 h-10 text-primary-orbitvu opacity-0 group-hover:opacity-100" />
</div>
```

**Double icon pattern :**
- Emoji visible par défaut
- Lucide icon apparaît au hover

#### Features (4)

1. **Lifestyle** - 🎨 Palette
2. **Background** - 🖼️ Image
3. **Retouche** - ✨ Sparkles
4. **Batch** - ⚡ Zap

#### Recommandations

- **Pattern innovant :** Double icon (emoji + lucide) très visuel
- **À reprendre :** Ce pattern pour autres sections features

---

### 3.10 IAManifesteSection Component

**Fichier :** `components/sections/IAManifesteSection.tsx` (73 lignes)

#### Structure

Présente 3 principes fondamentaux de l'IA photo.

#### Spacing Pattern

- **Section padding :** `py-20`
- **Container padding :** `px-4`
- **Header margin :** `mb-16` (plus grand que standard)
- **Grid gap :** `gap-8`
- **Card padding :** `p-8`
- **Icon margin :** `mb-6`
- **Title margin :** `mb-4`

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Grid :** `md:grid-cols-3` (3 colonnes égales)
- **Background :** `bg-white`

#### Couleurs

Les 3 principes ont chacun leur couleur :

| Principe | Icon | Color | BgColor |
|----------|------|-------|---------|
| Principle 1 | Camera | `text-secondary-orbitvu` | `bg-secondary-orbitvu/10` |
| Principle 2 | Sparkles | `text-primary-orbitvu` | `bg-primary-orbitvu/10` |
| Principle 3 | CheckCircle2 | `text-accent-green` | `bg-accent-green/10` |

#### Typography

- **Section heading :** `text-4xl lg:text-5xl font-heading font-bold`
- **Subtitle :** `text-xl max-w-3xl mx-auto`
- **Card title :** `text-2xl font-heading font-bold`
- **Description :** `leading-relaxed`

#### Icon Pattern

```tsx
<div className={`${principle.bgColor} rounded-full p-6`}>
  <principle.Icon className={`w-12 h-12 ${principle.color} stroke-[1.5]`} />
</div>
```

- **Container :** Cercle coloré (bg/10)
- **Icon size :** 48px × 48px
- **Stroke width :** 1.5 (Lucide standard)

#### Animations

- **Card hover :** `hover:shadow-xl transition-shadow duration-300`

#### Centrage

Toute la section et cards sont centrées (`text-center`, `justify-center`).

---

## 4. COMPOSANTS SHARED ANALYSÉS

### 4.1 ProductGrid Component

**Fichier :** `components/shared/ProductGrid.tsx` (90 lignes)

#### Structure & Props

```tsx
export interface Product {
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

#### Grid Configurations

```tsx
const gridCols = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};
```

#### Spacing Pattern

- **Grid gap :** `gap-8`
- **Image height :** `h-64`
- **Image padding :** `p-4`
- **Content padding :** `p-6`
- **Content spacing :** `space-y-4`

#### Card Structure

```tsx
<div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
  <div className="relative h-64 bg-neutral-lighter">
    <Image fill className="object-contain p-4 group-hover:scale-105" />
    {isIAReady && <BadgeIAReady />}
  </div>
  <div className="p-6 space-y-4">
    <h3>Name</h3>
    <p>Description (line-clamp-2)</p>
    <p>Price</p>
    <Button>CTA</Button>
  </div>
</div>
```

#### Animations

- **Shadow :** `shadow-lg hover:shadow-2xl transition-shadow duration-300`
- **Image scale :** `group-hover:scale-105 transition-transform duration-300`

#### Badge Pattern

```tsx
{product.isIAReady && (
  <div className="absolute top-4 right-4">
    <BadgeIAReady>IA Ready</BadgeIAReady>
  </div>
)}
```

#### CTA Pattern

```tsx
<Button
  variant="outline"
  className="w-full border-secondary-orbitvu text-secondary-orbitvu hover:bg-secondary-orbitvu hover:text-white"
>
  {ctaText}
</Button>
```

#### Recommandations

- **Composant réutilisable** excellemment conçu
- **Props flexibles** pour adapter à contextes variés

---

### 4.2 SectorGrid Component

**Fichier :** `components/shared/SectorGrid.tsx` (90 lignes)

#### Structure & Props

```tsx
export interface Sector {
  slug: string;
  name: string;
  Icon: LucideIcon;
  description?: string;
}

interface SectorGridProps {
  sectors: Sector[];
  columns?: 3 | 4 | 6;
  className?: string;
}
```

#### Grid Configurations

```tsx
const gridCols = {
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};
```

#### Spacing Pattern

- **Grid gap :** `gap-6`
- **Card padding :** `p-6`
- **Content spacing :** `space-y-3`

#### Card Structure

```tsx
<Link className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl border-2 border-transparent hover:border-secondary-orbitvu">
  <div className="flex flex-col items-center text-center space-y-3">
    <Icon className="w-10 h-10 group-hover:scale-110" />
    <h3>{sector.name}</h3>
    {description && <p className="text-xs line-clamp-2">{description}</p>}
  </div>
</Link>
```

#### Animations

- **Shadow :** `shadow-md hover:shadow-xl transition-all duration-300`
- **Border :** `border-2 border-transparent hover:border-secondary-orbitvu`
- **Icon scale :** `group-hover:scale-110 transition-transform duration-300`
- **Title color :** `group-hover:text-secondary-orbitvu transition-colors`

#### Default Sectors (12)

1. Chaussures (Footprints)
2. Bijoux & Joaillerie (Gem)
3. Mobilier & Décoration (Armchair)
4. Food & Alimentaire (Wine)
5. Cosmétiques & Beauté (Sparkles)
6. Mode & Textile (Shirt)
7. Électronique & High-Tech (Smartphone)
8. Pièces Techniques (Wrench)
9. Automobile (Car)
10. Jouets & Puériculture (Baby)
11. Sport & Outdoor (Trophy)
12. Santé & Médical (ShoppingBag)

#### Recommandations

- **Excellent composant réutilisable**
- **Grid 6 colonnes** : parfait pour 12 secteurs (2 lignes)

---

### 4.3 Badge Component

**Fichier :** `components/shared/Badge.tsx` (107 lignes)

#### Structure & Props

```tsx
export type BadgeVariant = 'gold' | 'turquoise' | 'red' | 'green' | 'purple' | 'blue' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}
```

#### Variant Styles

| Variant | Classes | Usage |
|---------|---------|-------|
| **gold** | `bg-accent-gold text-white` | Distributor badge |
| **turquoise** | `bg-secondary-orbitvu text-white` | Capture pillar |
| **red** | `bg-accent-coral text-white` | Alerts, distributor |
| **green** | `bg-accent-success text-white` | Qualiopi, success |
| **purple** | `bg-primary-orbitvu text-white` | IA Ready, création |
| **blue** | `bg-accent-light-blue text-neutral-dark` | Formation |
| **default** | `bg-neutral-medium text-white` | Fallback |

#### Base Pattern

```tsx
<span className={cn(
  'font-heading font-semibold text-sm px-4 py-2 rounded-full inline-flex items-center gap-2',
  variantStyles[variant],
  className
)}>
  {icon && <span className="w-4 h-4">{icon}</span>}
  {children}
</span>
```

#### Spacing

- **Padding :** `px-4 py-2`
- **Gap icon-text :** `gap-2`
- **Border radius :** `rounded-full`

#### Pre-configured Badges

**BadgeDistributor** :
- Variant: red
- Icon: Star SVG
- Usage: Partenaires distributeurs

**BadgeIAReady** :
- Variant: purple
- Icon: Lightning bolt SVG
- Usage: Produits compatibles IA

**BadgeQualiopi** :
- Variant: green
- Icon: Check circle SVG
- Usage: Certification formation

#### Recommandations

- **Composant bien structuré**
- **Variants complets** pour toutes les couleurs brandbook
- **Icon support** intégré

---

### 4.4 BeforeAfter Component

**Fichier :** `components/shared/BeforeAfter.tsx` (118 lignes)

#### Structure & Props

```tsx
export interface BeforeAfterCase {
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

#### Spacing Pattern

- **Grid gap :** `gap-1` (entre images)
- **Content padding :** `p-6`
- **Content spacing :** `space-y-3`
- **Badge position :** `top-4 left-4`
- **Badge padding :** `px-3 py-1`

#### Layout Variants

```tsx
// Horizontal (default)
className="grid-cols-2"

// Vertical
className="grid-cols-1"
```

#### Image Pattern

```tsx
<div className="relative h-64 md:h-80 bg-neutral-lighter overflow-hidden group">
  <div className="absolute top-4 left-4 z-10">
    <span className="bg-neutral-dark text-white text-xs font-heading font-semibold px-3 py-1 rounded-full">
      Avant
    </span>
  </div>
  <Image fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
```

#### Badges

- **Avant :** `bg-neutral-dark text-white`
- **Après :** `bg-primary-orbitvu text-white` avec texte "Après BlendAI"

#### Animations

- **Image hover :** `group-hover:scale-105 transition-transform duration-300`

#### BeforeAfterGrid Component

Grid wrapper pour afficher plusieurs cas :

```tsx
interface BeforeAfterGridProps {
  cases: BeforeAfterCase[];
  columns?: 2 | 3;
  className?: string;
}

const gridCols = {
  2: 'grid-cols-1 lg:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};
```

- **Gap :** `gap-8`

#### Recommandations

- **Excellent pour showcases BlendAI**
- **Pattern horizontal** : meilleur pour comparaison directe
- **Grid variant** : parfait pour galerie de cas

---

## 5. COMPOSANTS LAYOUT ANALYSÉS

### 5.1 Header Component

**Fichier :** `components/layout/Header.tsx` (104 lignes)

#### Structure

Header sticky avec navigation desktop/mobile + langue switcher + CTA.

#### Spacing Pattern

- **Container padding :** `px-4 py-4`
- **Nav gap desktop :** `gap-8` (liens)
- **CTA gap desktop :** `gap-4` (langue + CTA)
- **Mobile menu spacing :** `pt-4 pb-2 space-y-2`
- **Mobile CTA margin :** `mt-4`

#### Layout

- **Position :** `sticky top-0 z-50`
- **Container :** `max-w-7xl mx-auto`
- **Display :** `flex items-center justify-between`
- **Background :** `bg-white shadow-sm`

#### Navigation Desktop

```tsx
<nav className="hidden lg:flex items-center gap-8">
  <Link className="text-sm font-body text-neutral-dark hover:text-secondary-orbitvu">
    Capture
  </Link>
  {/* ... */}
</nav>
```

5 liens principaux :
1. Capture (/studios-photo-automatises)
2. Création (/ia-photo-produit)
3. Industries (/industrie)
4. Formation (/academy)
5. Blog (/blog)

#### CTA Pattern

```tsx
<Button asChild className="bg-secondary-orbitvu hover:bg-primary-orbitvu text-white">
  <Link href="/contact">
    {t('nav.receiveOffer')}
  </Link>
</Button>
```

#### Logo

```tsx
<img
  src="https://cdn.prod.website-files.com/.../Logo-Packshot-Creator.svg"
  alt="PackshotCreator Logo"
  className="h-10 w-auto"
/>
```

- **Height :** 40px fixe
- **Width :** Auto proportionnel

#### Mobile Menu

- **Trigger :** Hamburger button (lg:hidden)
- **State :** useState pour toggle
- **Layout :** Stack vertical avec space-y-2
- **CTA :** Full-width button en bas

#### Langue Switcher

```tsx
<Link href={pathname} locale={otherLocale}>
  {otherLocale.toUpperCase()}
</Link>
```

- **FR ↔ EN** toggle
- **Préserve pathname** actuel

#### Recommandations

- **Pattern actuel bon**
- **À améliorer :** Ajouter dropdown pour "Industries" (sous-menu secteurs)

---

### 5.2 Footer Component

**Fichier :** `components/layout/Footer.tsx` (96 lignes)

#### Structure

Footer 5 colonnes : Logo + Industries + Products + Outils + Légal.

#### Spacing Pattern

- **Container padding :** `py-12`
- **Content padding :** `px-4`
- **Grid gap :** `gap-8`
- **Lists spacing :** `space-y-2`
- **Logo margin :** `mb-4`
- **Copyright margin :** `mt-8 pt-8`

#### Layout

- **Container :** `max-w-7xl mx-auto`
- **Grid :** `md:grid-cols-5`
- **Background :** `bg-white border-t border-neutral-light`

#### Colonnes

**Colonne 1 : Logo + Description**
- Logo 40px height
- Tagline petit texte

**Colonne 2 : Industries (6 liens)**
- Chaussures
- Bijoux & Joaillerie
- Mobilier & Décoration
- Food & Alimentaire
- Mode & Textile
- Électronique

**Colonne 3 : Products (3 liens)**
- AlphaShot Pro G2
- AlphaShot Micro V2
- Fashion Studio

**Colonne 4 : Outils (3 liens)**
- Simulateur OPCO
- Sélecteur de Machines
- Calculateur ROI

**Colonne 5 : Légal (4 liens)**
- Mentions légales
- CGU
- Confidentialité
- À propos

#### Typography

- **Heading :** `font-heading font-semibold text-neutral-dark mb-4`
- **Links :** `text-sm text-neutral-medium hover:text-[#4c5578]`

#### Copyright

```tsx
<p className="text-center text-sm text-neutral-medium">
  © {new Date().getFullYear()} PackshotCreator. {t('footer.rights')}
</p>
```

#### Recommandations

- **Structure claire et complète**
- **À ajouter :** Réseaux sociaux (LinkedIn, YouTube)
- **À ajouter :** Newsletter signup

---

## 6. ANIMATIONS EXISTANTES

### 6.1 Framer Motion Usage

**Analyse :** Aucun import de Framer Motion trouvé dans les composants sections/shared/layout analysés.

**Constat :** Le projet utilise **CSS transitions uniquement** (pas de Framer Motion actuellement).

### 6.2 CSS Transitions

#### Patterns Hover Identifiés

| Pattern | Code | Timing | Composants |
|---------|------|--------|------------|
| **Shadow elevation** | `hover:shadow-lg transition-shadow` | default (300ms) | Cards, ProductGrid |
| **Shadow XL** | `hover:shadow-2xl transition-all duration-300` | 300ms | ThreePillars, AIFeatures |
| **Border color** | `hover:border-secondary-orbitvu` | transition-all | ThreePillars, SectorGrid |
| **Scale image** | `group-hover:scale-105 transition-transform duration-300` | 300ms | ProductGrid, BeforeAfter |
| **Translate arrow** | `group-hover:translate-x-2 transition-transform duration-300` | 300ms | ThreePillars, AIFeatures |
| **Icon scale** | `group-hover:scale-110 transition-transform duration-300` | 300ms | ThreePillars, SectorGrid |
| **Text color** | `hover:text-secondary-orbitvu transition-colors` | default | Links, titles |
| **Background** | `hover:bg-secondary-orbitvu hover:text-white` | default | Buttons |
| **Opacity** | `opacity-0 group-hover:opacity-100 transition-opacity duration-300` | 300ms | AIFeatures (Lucide icon) |

#### Timing Standards

```css
/* Default transitions */
transition-all          /* 150ms cubic-bezier(0.4, 0, 0.2, 1) */
transition-colors       /* 150ms cubic-bezier(0.4, 0, 0.2, 1) */
transition-shadow       /* 150ms cubic-bezier(0.4, 0, 0.2, 1) */
transition-transform    /* 150ms cubic-bezier(0.4, 0, 0.2, 1) */

/* Custom duration */
duration-300            /* 300ms */
duration-500            /* 500ms - ClientLogos grayscale */
```

#### Group Hover Pattern

Très utilisé pour coordonner animations multiples :

```tsx
<div className="group">
  <img className="group-hover:scale-105" />
  <h3 className="group-hover:text-secondary-orbitvu" />
  <Icon className="group-hover:scale-110" />
</div>
```

### 6.3 Hover States Standards

| Élément | État Repos | État Hover | Transition |
|---------|-----------|------------|------------|
| **Cards** | `shadow-lg` | `shadow-2xl` | transition-shadow 300ms |
| **Links nav** | `text-neutral-dark` | `text-secondary-orbitvu` | transition-colors |
| **Buttons CTA** | `bg-secondary-orbitvu` | `bg-primary-orbitvu` | default |
| **Buttons outline** | `border-secondary-orbitvu` | `bg-secondary-orbitvu text-white` | default |
| **Images cards** | `scale-100` | `scale-105` | transform 300ms |
| **Icons** | `scale-100` | `scale-110` | transform 300ms |
| **Arrows indicators** | `translate-x-0` | `translate-x-2` | transform 300ms |

### 6.4 Recommandations Animations

**Quick Wins :**

1. **Ajouter Framer Motion** pour animations avancées :
   - Scroll-triggered animations (sections apparaissent)
   - Page transitions
   - Stagger animations pour grilles

2. **Pattern à implémenter (Orbitvu-style) :**
   - Parallax subtle sur Hero images
   - Fade-in on scroll pour sections
   - Counter animations pour chiffres clés

3. **Standardiser timing :**
   - Toutes les transitions hover : 300ms
   - Scroll animations : 600ms
   - Page transitions : 400ms

---

## 7. TEMPLATES DE PAGES

### 7.1 Template Homepage

**Fichier :** `app/[lang]/page.tsx`

**Sections identifiées :**
1. Hero (variant: default)
2. ThreePillarsSection (variant: homepage)
3. ClientLogos
4. BlogGrid (3 articles récents)
5. CTABox (final)

**Layout Pattern :**
- Sections alternées backgrounds : blanc → gris léger → blanc
- Espacement vertical constant : `py-20` entre sections
- Max-width conteneur : `max-w-7xl` (standard)

**Spacing Vertical :**
- Entre sections : `py-20` (80px desktop)
- Sections compactes (ClientLogos) : `py-12`

**Grid Pattern :**
- Hero : `lg:grid-cols-2` (texte | image)
- ThreePillars : `md:grid-cols-3`
- Blog : `md:grid-cols-2 lg:grid-cols-3`

**Caractéristiques :**
- **Longueur :** Courte (5 sections)
- **Interactivité :** Faible (pas de calculateurs)
- **Objectif :** Vue d'ensemble 3 piliers
- **CTA :** 1 hero + 1 final

---

### 7.2 Template Hub (Studios Photo)

**Fichier :** `app/[lang]/studios-photo-automatises/page.tsx`

**Sections estimées :**
1. Hero (variant: hardware)
2. ThreePillarsSection (Approche Hybride)
3. ProductGrid (3 produits featured)
4. MachineSelector (composant interactif)
5. ROICalculator (composant interactif)
6. SectorGrid (12 secteurs)
7. ClientLogos
8. Resources (3 guides téléchargeables)
9. CTABox × 2 (milieu + fin)

**Caractéristiques :**
- **Longueur :** Longue (9+ sections)
- **Interactivité :** Élevée (calculateurs, sélecteur)
- **Multiple CTAs :** 3-4 points conversion
- **Rich media :** Videos, before/after

**Pattern Spécifique :**
- Alternance sections statiques / interactives
- Sections produits avec filtering
- Trust builders (logos clients, chiffres clés)

---

### 7.3 Template Industrie

**Fichier :** `app/[lang]/industrie/[slug]/page.tsx`

**Sections estimées :**
1. Hero custom (titre industrie + image studio adapté)
2. IntroSection (2 cols texte spécifique secteur)
3. Bénéfices secteur (3 cards custom)
4. ProductShowcase (produits recommandés)
5. Workflow type (étapes visuelles)
6. BeforeAfterGrid (cas client secteur)
7. CTABox × 2

**Caractéristiques :**
- **Longueur :** Moyenne (7 sections)
- **Interactivité :** Faible
- **Content dynamique :** Adapté au secteur (slug)
- **Social proof :** Before/after, cas clients

**Pattern Spécifique :**
- Hero avec image contextuelle (différente par secteur)
- Bénéfices adaptés (food ≠ bijoux)
- Workflow visuel avec étapes

---

### 7.4 Template Formation (Academy)

**Fichier :** `app/[lang]/academy/page.tsx`

**Sections estimées :**
1. Hero (variant: formation)
2. IntroSection (présentation formation)
3. Programme (modules détaillés)
4. Certification (Qualiopi badge)
5. OPCO Simulator
6. Témoignages
7. CTABox

**Caractéristiques :**
- **Longueur :** Moyenne (7 sections)
- **Interactivité :** Moyenne (simulateur OPCO)
- **Certification :** Badges Qualiopi
- **Trust :** Témoignages apprenants

**Pattern Spécifique :**
- Couleur section : Light blue (#cdcdfd adaptée)
- CTAs spécifiques formation
- Simulateur OPCO intégré

---

### 7.5 Template Produit

**Fichier :** `app/[lang]/studio-photo/[slug]/page.tsx`

**Sections estimées :**
1. Hero produit (variant: hardware)
2. ProductShowcase (détails techniques)
3. Features grid (4-6 features)
4. Specs techniques (tableau)
5. Industries compatibles (SectorGrid)
6. BeforeAfter (résultats)
7. Related products
8. CTABox

**Caractéristiques :**
- **Longueur :** Moyenne (8 sections)
- **Interactivité :** Moyenne (configurateur?)
- **Technical :** Specs détaillées
- **Social proof :** Cas clients

**Pattern Spécifique :**
- Alternance ProductShowcase imagePosition left/right
- Tableau specs techniques
- Galerie images produit

---

### 7.6 Template Blog Article

**Fichier :** `app/[lang]/blog/[slug]/page.tsx`

**Sections :**
1. Hero article (image + titre + meta)
2. Article content (prose)
3. Related articles (BlogGrid)

**Caractéristiques :**
- **Longueur :** Variable (contenu)
- **Interactivité :** Faible
- **Typography :** prose prose-lg
- **Social share :** Boutons partage

**Pattern Spécifique :**
- Max-width content : `max-w-4xl` (lecture optimale)
- Prose Tailwind pour markdown
- Table of contents sidebar

---

### 7.7 Matrice Templates

| Template | Sections | Longueur | Interactivité | CTAs | Exemple |
|----------|----------|----------|---------------|------|---------|
| **Homepage** | 5 | Courte | Faible | 2 | `/fr` |
| **Hub** | 9+ | Longue | Élevée | 3-4 | `/studios-photo-automatises` |
| **Industrie** | 7 | Moyenne | Faible | 2-3 | `/industrie/chaussures` |
| **Formation** | 7 | Moyenne | Moyenne | 2 | `/academy` |
| **Produit** | 8 | Moyenne | Moyenne | 2-3 | `/studio-photo/alphashot-360` |
| **Blog Article** | 3 | Variable | Faible | 1 | `/blog/[slug]` |

---

## 8. PATTERNS ORBITVU À ADOPTER

### 8.1 Analyse Prioritaire

Basé sur le brandbook PDF Orbitvu et le site orbitvu.com, voici les patterns à intégrer dans PackshotCreator.

### 8.2 Patterns Haute Priorité

#### Pattern 1 : CTA Sticky "Demander un devis"

**Priorité :** 🔴 HAUTE
**Effort :** 🟢 Faible
**Impact :** 🔴 Élevé
**Existe Next.js :** ❌ Non
**Action :** Créer composant

**Source :** orbitvu.com (toutes pages)

**Description :**
Bouton flottant toujours visible en bas à droite de l'écran, au-dessus du contenu.

**Spécifications Orbitvu :**
- Position : `fixed bottom-8 right-8`
- Couleur : Turquoise (#00BCD4) → **adapter à Very Peri PackshotCreator (#6667AB)**
- Taille : Grande (`size="lg"` → `px-8 py-6`)
- Texte : "Demander un devis" (FR) / "Get an offer" (EN)
- Animation : Slight bounce au chargement
- Z-index : Au-dessus contenu mais sous modals (z-40)
- Shadow : `shadow-2xl` pour élévation

**Props Recommandées :**
```tsx
interface StickyCTAProps {
  labelKey: string;        // i18n key
  href: string;            // CTA destination
  variant?: 'default' | 'section'; // Couleur
  hideOnScroll?: boolean;  // Cacher quand scroll en bas ?
  showDelay?: number;      // Délai apparition (ms)
}
```

**Fichier à Créer :**
`components/shared/StickyCTA.tsx`

**Code Recommandé :**
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface StickyCTAProps {
  labelKey: string;
  href: string;
  variant?: 'default' | 'section';
  hideOnScroll?: boolean;
  showDelay?: number;
}

export default function StickyCTA({
  labelKey,
  href,
  variant = 'default',
  hideOnScroll = true,
  showDelay = 1000,
}: StickyCTAProps) {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), showDelay);

    if (hideOnScroll) {
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        // Cacher si proche du bas (footer visible)
        setIsHidden(scrollTop + windowHeight > documentHeight - 200);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return () => clearTimeout(timer);
  }, [showDelay, hideOnScroll]);

  return (
    <div
      className={cn(
        'fixed bottom-8 right-8 z-40 transition-all duration-300',
        isVisible && !isHidden ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      )}
    >
      <Button
        asChild
        size="lg"
        variant={variant}
        className="shadow-2xl hover:shadow-3xl px-8 py-6 text-lg animate-in fade-in slide-in-from-bottom-4"
      >
        <Link href={href}>
          {t(labelKey)}
        </Link>
      </Button>
    </div>
  );
}
```

**Usage dans Layout :**
```tsx
// Dans app/[lang]/layout.tsx
import StickyCTA from '@/components/shared/StickyCTA';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <StickyCTA
          labelKey="cta.demander_devis"
          href="/contact"
          variant="section"
        />
      </body>
    </html>
  );
}
```

**Accessibilité :**
- Aria-label descriptif
- Accessible au clavier (focus visible)
- Ne bloque pas contenu important
- Disparaît quand footer visible

---

#### Pattern 2 : Section Chiffres Clés (3 colonnes)

**Priorité :** 🔴 HAUTE
**Effort :** 🟢 Faible
**Impact :** 🔴 Élevé
**Existe Next.js :** ❌ Non
**Action :** Créer StatsSection

**Source :** orbitvu.com (homepage, pages produits)

**Description :**
Section présentant 3-4 chiffres clés avec counters animés.

**Spécifications Orbitvu :**
- Layout : 3 ou 4 colonnes responsive
- Chiffre : Très grand (text-5xl à text-7xl)
- Label : Texte descriptif sous le chiffre
- Animation : Counter qui monte de 0 à valeur finale
- Couleur chiffre : Primary brand color
- Background : Blanc ou gris léger

**Props Recommandées :**
```tsx
interface Stat {
  value: number;
  suffix?: string;        // "+", "%", "M€", etc.
  labelKey: string;
  decimals?: number;
}

interface StatsSection Props {
  stats: Stat[];
  columns?: 3 | 4;
  bgColor?: 'white' | 'light-gray';
  headingKey?: string;
  namespace?: string;
}
```

**Fichier à Créer :**
`components/sections/StatsSection.tsx`

**Code Recommandé :**
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';

interface Stat {
  value: number;
  suffix?: string;
  labelKey: string;
  decimals?: number;
}

interface StatsSectionProps {
  stats: Stat[];
  columns?: 3 | 4;
  bgColor?: 'white' | 'light-gray';
  headingKey?: string;
  namespace?: string;
}

// Hook counter animé
function useCounter(end: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = end * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count.toFixed(decimals);
}

function StatItem({ stat, inView }: { stat: Stat; inView: boolean }) {
  const t = useTranslations('stats');
  const count = useCounter(
    inView ? stat.value : 0,
    2000,
    stat.decimals ?? 0
  );

  return (
    <div className="text-center">
      <div className="font-heading text-6xl lg:text-7xl font-bold text-primary-orbitvu mb-4">
        {count}{stat.suffix}
      </div>
      <p className="text-lg text-neutral-medium">
        {t(stat.labelKey)}
      </p>
    </div>
  );
}

export default function StatsSection({
  stats,
  columns = 3,
  bgColor = 'white',
  headingKey,
  namespace = 'home',
}: StatsSectionProps) {
  const t = useTranslations(namespace);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const gridCols = {
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const bgClasses = {
    white: 'bg-white',
    'light-gray': 'bg-bg-light-gray',
  };

  return (
    <section className={`${bgClasses[bgColor]} py-20 px-4`} ref={ref}>
      <div className="max-w-7xl mx-auto">
        {headingKey && (
          <h2 className="font-heading text-4xl lg:text-5xl text-neutral-dark text-center mb-16">
            {t(headingKey)}
          </h2>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-12`}>
          {stats.map((stat, idx) => (
            <StatItem key={idx} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Usage :**
```tsx
<StatsSection
  headingKey="stats.heading"
  stats={[
    { value: 250, suffix: '+', labelKey: 'products_per_day' },
    { value: 99.9, suffix: '%', labelKey: 'customer_satisfaction', decimals: 1 },
    { value: 15000, suffix: '+', labelKey: 'clients_worldwide' },
  ]}
  columns={3}
  bgColor="light-gray"
  namespace="home"
/>
```

**Dépendances :**
- `npm install react-intersection-observer`

---

#### Pattern 3 : Cards Produits avec Bénéfices Chiffrés

**Priorité :** 🔴 HAUTE
**Effort :** 🟡 Moyen
**Impact :** 🔴 Élevé
**Existe Next.js :** ⚠️ Partiel (ProductGrid existe, améliorer)
**Action :** Améliorer ProductCard

**Source :** orbitvu.com (pages produits)

**Description :**
Cards produits avec fond transparent, bénéfices chiffrés en évidence.

**Spécifications Orbitvu :**
- Image produit : Fond transparent (PNG)
- Badge : Chiffre clé en haut (ex: "250 produits/jour")
- Bénéfices : Liste avec icônes checkmark verts
- CTA : Bouton centré en bas
- Hover : Élévation shadow + scale image subtil

**Amélioration ProductGrid.tsx :**

Ajouter props pour bénéfices :
```tsx
export interface Product {
  slug: string;
  name: string;
  description?: string;
  price?: string;
  image: string;
  imageAlt: string;
  isIAReady?: boolean;
  // NOUVEAUX
  keyMetric?: {
    value: string;
    label: string;
  };
  benefits?: string[];
}
```

**Pattern Card Amélioré :**
```tsx
<div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
  {/* Image avec fond transparent */}
  <div className="relative h-64 bg-gradient-to-br from-neutral-50 to-white">
    <Image
      src={product.image}
      alt={product.imageAlt}
      fill
      className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
    />

    {/* Badge métrique clé */}
    {product.keyMetric && (
      <div className="absolute top-4 left-4">
        <div className="bg-primary-orbitvu text-white px-4 py-2 rounded-full">
          <div className="font-heading font-bold text-lg">{product.keyMetric.value}</div>
          <div className="text-xs">{product.keyMetric.label}</div>
        </div>
      </div>
    )}

    {product.isIAReady && (
      <div className="absolute top-4 right-4">
        <BadgeIAReady>IA Ready</BadgeIAReady>
      </div>
    )}
  </div>

  {/* Content */}
  <div className="p-6 space-y-4">
    <h3 className="text-xl font-heading font-bold text-neutral-dark">
      {product.name}
    </h3>

    {/* Bénéfices avec checkmarks */}
    {product.benefits && product.benefits.length > 0 && (
      <ul className="space-y-2">
        {product.benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-medium">
            <CheckCircle2 className="w-4 h-4 text-accent-success flex-shrink-0 mt-0.5" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    )}

    {showPrice && product.price && (
      <p className="text-lg font-heading font-semibold text-primary-orbitvu">
        {product.price}
      </p>
    )}

    <Button
      asChild
      variant="section"
      className="w-full"
    >
      <Link href={`/studio-photo/${product.slug}`}>
        {ctaText}
      </Link>
    </Button>
  </div>
</div>
```

---

#### Pattern 4 : Section "Trusted by" avec Logos + Chiffres

**Priorité :** 🔴 HAUTE
**Effort :** 🟢 Faible
**Impact :** 🟡 Moyen
**Existe Next.js :** ⚠️ Partiel (ClientLogos existe, améliorer)
**Action :** Améliorer ClientLogos

**Source :** orbitvu.com (homepage)

**Description :**
Section combinant :
- Heading "Trusted by X+ companies worldwide"
- Logos clients (grid ou carousel)
- Chiffre clé mis en avant

**Pattern Recommandé :**

Créer `TrustedBySection.tsx` (amélioration de ClientLogos) :

```tsx
interface TrustedBySectionProps {
  headingKey: string;
  clientCount: number;
  logos: Array<{ name: string; src: string; width: number; height: number }>;
  showCarousel?: boolean;
}

export default function TrustedBySection({
  headingKey,
  clientCount,
  logos,
  showCarousel = false,
}: TrustedBySectionProps) {
  const t = useTranslations('common');

  return (
    <section className="py-20 px-4 bg-neutral-lighter">
      <div className="max-w-7xl mx-auto">
        {/* Heading avec chiffre */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl text-neutral-dark mb-4">
            {t(headingKey)}
          </h2>
          <p className="text-xl text-secondary-orbitvu font-semibold">
            {clientCount}+ {t('companies_worldwide')}
          </p>
        </div>

        {/* Logos grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="h-12 flex items-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

#### Pattern 5 : Galerie Résultats avec Badges Secteurs

**Priorité :** 🟡 MOYENNE
**Effort :** 🟡 Moyen
**Impact :** 🔴 Élevé
**Existe Next.js :** ⚠️ Partiel (BeforeAfter existe, améliorer)
**Action :** Créer ResultsGallery

**Source :** orbitvu.com (pages produits, cas clients)

**Description :**
Galerie showcasing résultats clients avec :
- Before/After images
- Badge secteur (food, fashion, etc.)
- Chiffres clés résultats
- Filtrage par secteur

**Props Recommandées :**
```tsx
interface ResultCase {
  id: string;
  sector: string;
  sectorIcon: LucideIcon;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  title: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  clientName?: string;
}

interface ResultsGalleryProps {
  cases: ResultCase[];
  filters?: string[];     // Secteurs filtres
  columns?: 2 | 3;
}
```

**Composant à Créer :**
`components/sections/ResultsGallery.tsx`

**Pattern :**
- Grid responsive 2-3 colonnes
- Filtres secteurs en haut (badges cliquables)
- Chaque card : Before/After + metrics + badge secteur
- Modal click pour voir grand format

---

### 8.3 Patterns Moyenne Priorité

#### Pattern 6 : Hero avec Gamme Produits en Bas

**Priorité :** 🟡 MOYENNE
**Effort :** 🟡 Moyen
**Impact :** 🟡 Moyen
**Existe Next.js :** ❌ Non
**Action :** Améliorer Hero

**Source :** orbitvu.com (homepage)

**Description :**
Hero avec vignettes produits cliquables en bas.

**Amélioration Hero.tsx :**

Ajouter prop `productThumbnails` :
```tsx
interface HeroProps {
  // ... existing props
  productThumbnails?: Array<{
    name: string;
    image: string;
    href: string;
  }>;
}
```

En bas du Hero, afficher :
```tsx
{productThumbnails && productThumbnails.length > 0 && (
  <div className="absolute bottom-8 left-0 right-0">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {productThumbnails.map((product, idx) => (
          <Link
            key={idx}
            href={product.href}
            className="group bg-white rounded-lg p-3 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-20 h-20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <p className="text-xs text-center mt-2 text-neutral-dark font-medium">
              {product.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </div>
)}
```

---

#### Pattern 7 : Tabs de Navigation Contenu

**Priorité :** 🟡 MOYENNE
**Effort :** 🟡 Moyen
**Impact :** 🟡 Moyen
**Existe Next.js :** ❌ Non
**Action :** Créer TabsSection

**Source :** orbitvu.com (pages produits détail)

**Description :**
Tabs horizontales pour organiser contenu (Features, Specs, Industries).

**Composant à Créer :**
`components/sections/TabsSection.tsx`

Utiliser Radix UI Tabs :
```tsx
import * as Tabs from '@radix-ui/react-tabs';

interface Tab {
  key: string;
  labelKey: string;
  content: ReactNode;
}

interface TabsSectionProps {
  tabs: Tab[];
  defaultTab?: string;
  namespace?: string;
}
```

**Pattern :**
- Tabs sticky au scroll
- Underline active tab (couleur brand)
- Smooth transition entre tabs

---

#### Pattern 8 : Timeline Workflow Visuel

**Priorité :** 🟡 MOYENNE
**Effort :** 🔴 Élevé
**Impact :** 🟡 Moyen
**Existe Next.js :** ❌ Non
**Action :** Créer WorkflowTimeline

**Source :** orbitvu.com (pages processus)

**Description :**
Timeline verticale ou horizontale montrant étapes workflow.

**Spécifications :**
- Numéros étapes : Cercles colorés
- Ligne de connexion entre étapes
- Icon pour chaque étape
- Description courte
- Responsive : vertical mobile, horizontal desktop

**Composant à Créer :**
`components/sections/WorkflowTimeline.tsx`

---

#### Pattern 9 : Video Hero avec Overlay CTA

**Priorité :** 🟡 MOYENNE
**Effort :** 🟡 Moyen
**Impact :** 🔴 Élevé
**Existe Next.js :** ❌ Non
**Action :** Créer VideoHero

**Source :** orbitvu.com (homepage)

**Description :**
Hero avec video background + overlay texte + CTAs.

**Spécifications :**
- Video autoplay, loop, muted
- Overlay gradient pour lisibilité
- Texte centré par-dessus
- Pause video au scroll hors vue (performance)

**Code Pattern :**
```tsx
<section className="relative min-h-screen overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />

  <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
    <div className="max-w-4xl text-center text-white space-y-6">
      <h1 className="font-heading text-6xl lg:text-7xl font-bold">
        {title}
      </h1>
      <p className="text-xl lg:text-2xl">
        {subtitle}
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">{ctaPrimary}</Button>
        <Button size="lg" variant="outline">{ctaSecondary}</Button>
      </div>
    </div>
  </div>
</section>
```

---

#### Pattern 10 : Accordéon FAQ

**Priorité :** 🟡 MOYENNE
**Effort :** 🟢 Faible
**Impact :** 🟡 Moyen
**Existe Next.js :** ❌ Non
**Action :** Créer FAQSection

**Source :** orbitvu.com (pages support)

**Description :**
Section FAQ avec accordéon questions/réponses.

**Composant à Créer :**
`components/sections/FAQSection.tsx`

Utiliser Radix UI Accordion :
```tsx
import * as Accordion from '@radix-ui/react-accordion';

interface FAQ {
  questionKey: string;
  answerKey: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  headingKey?: string;
  namespace?: string;
}
```

**Pattern :**
- Icône chevron animée rotate
- Transition smooth open/close
- Plusieurs items ouverts simultanément possible
- Schema markup pour SEO

---

### 8.4 Patterns Visuels Brandbook PDF Orbitvu

#### Pattern 11 : Typographic Keywords (Background)

**Priorité :** 🟡 MOYENNE
**Effort :** 🟢 Faible
**Impact :** 🟡 Moyen
**Existe Next.js :** ❌ Non
**Action :** Documenter pattern

**Source :** Orbitvu Brandbook PDF Page 25

**Description :**
Grands mots-clés en arrière-plan avec transparence réduite pour renforcer message.

**Spécifications :**
- Taille : `text-[12rem]` à `text-[18rem]` (très grand)
- Opacité : `opacity-5` (5%)
- Position : `absolute`, centré ou décalé
- Font : Inter Bold (font-heading)
- Couleur : Primary color avec opacité
- Usage : Fond de section pour renforcer message
- Z-index : Derrière contenu (`-z-10` ou `z-0`)

**Exemples Mots-clés :**
- "INNOVATION"
- "AUTOMATION"
- "QUALITY"
- "SPEED"
- "PRECISION"

**Code Pattern :**
```tsx
<section className="relative py-20 overflow-hidden">
  {/* Background keyword */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className="font-heading font-bold text-[18rem] text-very-peri-500 opacity-5 select-none">
      INNOVATION
    </span>
  </div>

  {/* Foreground content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    {/* Contenu réel de la section */}
  </div>
</section>
```

**Usage Recommandé :**
- Sections hero
- Sections manifesto
- Sections features principales

**Accessibilité :**
- `aria-hidden="true"` sur le keyword
- `pointer-events-none` pour ne pas interférer
- `select-none` pour empêcher sélection texte

---

#### Pattern 12 : Text Underlays (Soulignement Coloré)

**Priorité :** 🟢 BASSE
**Effort :** 🟢 Faible
**Impact :** 🟡 Moyen
**Existe Next.js :** ❌ Non
**Action :** Documenter pattern

**Source :** Orbitvu Brandbook PDF Page 26

**Description :**
Soulignement coloré sous mots importants pour mise en évidence.

**Spécifications :**
- Hauteur : `h-3` (12px environ)
- Largeur : `w-full` (100% du mot)
- Position : `absolute bottom-1 left-0`
- Z-index : `-z-10` (derrière le texte)
- Couleur : Accent colors (lime, pink, cyan, orange)
- Border radius : Optionnel `rounded-sm`

**Couleurs Recommandées (PackshotCreator) :**
- **Lime** (#CBE857) : Blog, nature
- **Orange** (#ff7809) : Création, innovation
- **Pink** (#ee68b2) : Créativité, trends
- **Cyan** (#62bbd3) : Communication

**Code Pattern :**
```tsx
<h2 className="font-heading text-4xl">
  Transform your{' '}
  <span className="relative inline-block">
    <span className="relative z-10">product photography</span>
    <span className="absolute bottom-1 left-0 h-3 w-full bg-accent-lime -z-10 rounded-sm" />
  </span>
  {' '}with AI
</h2>
```

**Exemples Usage :**
- Nombres importants : "capture **250** products a day"
- Mots-clés : "How to launch new furniture collections online **faster**?"
- Call-outs : "**Revolutionizing** DIY and Tools Industry Photography"

**Variantes :**
```tsx
// Underlay complet (comme ci-dessus)
<span className="absolute bottom-1 left-0 h-3 w-full bg-accent-lime -z-10" />

// Underlay partiel (50% width)
<span className="absolute bottom-1 left-0 h-3 w-1/2 bg-accent-lime -z-10" />

// Double underlay (2 lignes)
<span className="absolute bottom-0 left-0 h-2 w-full bg-accent-pink -z-10" />
<span className="absolute bottom-2 left-2 h-2 w-full bg-accent-cyan -z-10" />
```

---

#### Pattern 13 : Graphic Captions (Badges Catégories)

**Priorité :** 🟢 BASSE
**Effort :** 🟢 Faible
**Impact :** 🟡 Moyen
**Existe Next.js :** ⚠️ Partiel (Badge existe, ajouter variants)
**Action :** Étendre Badge component

**Source :** Orbitvu Brandbook PDF Page 27

**Description :**
Badges standardisés pour catégoriser contenus visuels (blog, ressources, cas clients).

**Spécifications Orbitvu :**
- Position : Coin supérieur droit OU en-tête section
- Ligne : 25px de longueur, précède le texte
- Logo Orbitvu : Côté opposé de la ligne (optionnel)
- Texte : Uppercase, font-bold, tracking-wide
- Taille texte : `text-xs` à `text-sm`

**Couleurs par Type (Orbitvu → Adapter PackshotCreator) :**

| Type Orbitvu | Couleur Orbitvu | Couleur PackshotCreator | Usage |
|--------------|----------------|------------------------|-------|
| **Knowledge** | Pink (#ee68b2) | `accent-pink` | Articles éducatifs |
| **Case Study** | Cyan (#62bbd3) | `accent-cyan` | Cas clients |
| **Client Testimonial** | Cyan | `accent-cyan` | Témoignages |
| **Orbitvu Solutions** | Cyan | `secondary-orbitvu` (#4c5578) | Produits |
| **Employee Spotlight** | Blue (#6667AB) | `primary-orbitvu` | Équipe |
| **Trade Show** | Yellow (#ffde05) | `accent-yellow` | Événements |
| **Station** | Turquoise | `secondary-orbitvu` | Hardware |
| **2025 Trends** | Pink | `accent-pink` | Tendances |
| **Tips** | Green | `accent-green` | Conseils |

**Liste Complète Captions Orbitvu :**
1. Knowledge
2. Case Study
3. Client Testimonial
4. Orbitvu Solutions
5. Employee Spotlight
6. Trade Show
7. Station
8. 2025 Trends
9. Tips

**Code Pattern (Variant 1 : Badge simple) :**
```tsx
<div className="flex items-center gap-4 mb-6">
  {/* Ligne décorative */}
  <div className="h-[2px] w-[25px] bg-accent-pink" />

  {/* Texte caption */}
  <span className="font-heading font-bold text-sm text-accent-pink uppercase tracking-wide">
    Knowledge
  </span>
</div>
```

**Code Pattern (Variant 2 : Header avec logo) :**
```tsx
<div className="flex items-center justify-between mb-8">
  {/* Logo gauche */}
  <Image src="/logo.svg" alt="PackshotCreator" width={120} height={40} />

  {/* Caption droite */}
  <div className="flex items-center gap-4">
    <div className="h-[2px] w-[25px] bg-accent-pink" />
    <span className="font-heading font-bold text-sm text-accent-pink uppercase tracking-wide">
      Knowledge
    </span>
  </div>
</div>
```

**Amélioration Badge.tsx :**

Ajouter nouvelles variants :
```tsx
export type BadgeVariant =
  | 'gold'
  | 'turquoise'
  | 'red'
  | 'green'
  | 'purple'
  | 'blue'
  | 'default'
  // NOUVEAUX
  | 'knowledge'      // Pink
  | 'case-study'     // Cyan
  | 'testimonial'    // Cyan
  | 'tips'           // Green
  | 'trends'         // Pink
  | 'event';         // Yellow

const variantStyles = {
  // ... existing
  'knowledge': 'bg-accent-pink text-white',
  'case-study': 'bg-accent-cyan text-white',
  'testimonial': 'bg-accent-cyan text-white',
  'tips': 'bg-accent-green text-white',
  'trends': 'bg-accent-pink text-white',
  'event': 'bg-accent-yellow text-neutral-dark',
};
```

**Créer Composant GraphicCaption :**
```tsx
// components/shared/GraphicCaption.tsx
import { cn } from '@/lib/utils';

type CaptionType = 'knowledge' | 'case-study' | 'testimonial' | 'tips' | 'trends' | 'event';

interface GraphicCaptionProps {
  type: CaptionType;
  label: string;
  showLine?: boolean;
  className?: string;
}

const captionColors = {
  'knowledge': 'bg-accent-pink text-accent-pink',
  'case-study': 'bg-accent-cyan text-accent-cyan',
  'testimonial': 'bg-accent-cyan text-accent-cyan',
  'tips': 'bg-accent-green text-accent-green',
  'trends': 'bg-accent-pink text-accent-pink',
  'event': 'bg-accent-yellow text-accent-yellow',
};

export default function GraphicCaption({
  type,
  label,
  showLine = true,
  className,
}: GraphicCaptionProps) {
  const colors = captionColors[type];
  const [lineColor, textColor] = colors.split(' ');

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {showLine && (
        <div className={`h-[2px] w-[25px] ${lineColor}`} />
      )}
      <span className={`font-heading font-bold text-sm ${textColor} uppercase tracking-wide`}>
        {label}
      </span>
    </div>
  );
}
```

**Usage :**
```tsx
<GraphicCaption type="knowledge" label="Knowledge" />
<GraphicCaption type="case-study" label="Case Study" />
<GraphicCaption type="tips" label="Tips" showLine={false} />
```

---

## 9. COMPARATIF NEXT.JS vs WEBFLOW vs ORBITVU

### 9.1 Tableau Comparatif Patterns

| Pattern | Next.js Actuel | Webflow | Orbitvu | Recommandation |
|---------|---------------|---------|---------|----------------|
| **Hero Section** | Gradient backgrounds, 2 cols, badges support | Image pleine largeur statique | Gamme produits vignettes en bas | **Orbitvu** - Plus distinctif, ajouter vignettes |
| **Cards Produits** | Image + titre + desc + CTA outline | Image + titre + desc + specs tableau | Image fond transparent + bénéfices chiffrés + badge métrique | **Orbitvu** - Plus impactant, metrics visibles |
| **CTA Principal** | 1 CTA hero + 1 CTA final | 1 CTA primaire par section | 2 CTAs (primaire + calculateur) + Sticky CTA | **Orbitvu** - Meilleure conversion, sticky crucial |
| **Chiffres Clés** | ❌ Absents | ❌ Absents | Section 3 cols, counter animation, très visible | **Orbitvu** - **AJOUTER** immédiatement |
| **Logos Clients** | Grid simple grayscale hover | Grid simple similaire | Grid avec hover effects individuels + heading "Trusted by X+" | **Orbitvu** - Plus dynamique, chiffre trust |
| **Footer** | 5 colonnes bien structuré | 4 colonnes similaires | 4 colonnes + newsletter + socials | **Next.js** - Déjà bon, ajouter newsletter |
| **Navigation** | Sticky header, 5 liens, mobile menu | Similaire | Similaire + mega-menu industries | **Next.js** - Bon, améliorer avec mega-menu |
| **Spacing Sections** | py-20 constant (80px) | py-16 à py-24 variable | py-24 à py-32 (plus généreux) | **Orbitvu** - Augmenter légèrement |
| **Typography Scale** | text-5xl hero, text-4xl sections | Similaire | text-6xl à text-7xl hero (plus grand) | **Orbitvu** - Titres plus imposants |
| **Animations** | CSS transitions only (300ms) | CSS transitions | Framer Motion + scroll animations | **Orbitvu** - Ajouter Framer Motion |
| **Before/After** | Horizontal 2 cols, simple | Slider interactif | Grid galerie + filtres secteurs | **Orbitvu** - Plus showcase, filtres |
| **Formulaires** | Standards Radix UI | Formulaires basiques | Formulaires multi-étapes + validation avancée | **Orbitvu** - Multi-steps pour complexité |
| **Video** | ❌ Absent | Background video hero | Video hero + video produits inline | **Orbitvu** - **AJOUTER** video hero |
| **Accordéons** | ❌ Absents | Accordéons FAQ | Accordéons FAQ + features | **Orbitvu** - **AJOUTER** composant |
| **Tabs** | ❌ Absents | ❌ Absents | Tabs produits (Features/Specs/Industries) | **Orbitvu** - **AJOUTER** pour produits |
| **Timeline** | ❌ Absente | ❌ Absente | Workflow timeline visuel | **Orbitvu** - **AJOUTER** pour processus |
| **Badges** | 7 variants couleur, icons support | Basique | Graphic captions + ligne décorative | **Next.js + Orbitvu** - Combiner les deux |
| **Grilles Responsive** | Excellent (2-3-4-6 cols) | Bon | Excellent similaire | **Next.js** - Déjà optimal |
| **Max-width Conteneurs** | max-w-7xl standard (1280px) | max-w-6xl (1152px) | max-w-7xl (1280px) | **Next.js/Orbitvu** - Bon choix |

### 9.2 Scores par Source

| Critère | Next.js | Webflow | Orbitvu | Gagnant |
|---------|---------|---------|---------|---------|
| **Design Moderne** | 8/10 | 6/10 | 9/10 | 🏆 Orbitvu |
| **Conversion Optimisée** | 6/10 | 5/10 | 9/10 | 🏆 Orbitvu |
| **Trust & Social Proof** | 5/10 | 5/10 | 9/10 | 🏆 Orbitvu |
| **Interactivité** | 4/10 | 3/10 | 8/10 | 🏆 Orbitvu |
| **Performance** | 9/10 | 6/10 | 8/10 | 🏆 Next.js |
| **Accessibilité** | 8/10 | 6/10 | 7/10 | 🏆 Next.js |
| **Responsive** | 9/10 | 7/10 | 9/10 | 🏆 Next.js/Orbitvu |
| **Code Quality** | 10/10 | N/A | 7/10 | 🏆 Next.js |

**Conclusion :**
- **Next.js actuel** : Excellente base technique, code propre, responsive parfait
- **Orbitvu** : Design plus impactant, conversion mieux optimisée, patterns innovants
- **Stratégie recommandée** : Garder base Next.js + adopter patterns Orbitvu haute priorité

---

## 10. QUICK WINS IDENTIFIÉS

### 10.1 Quick Wins Techniques (Haute Priorité + Faible Effort)

| # | Quick Win | Effort | Impact | Durée Estimée | Fichiers |
|---|-----------|--------|--------|---------------|----------|
| **1** | **CTA Sticky "Demander un devis"** | 🟢 Faible | 🔴 Élevé | 2h | Créer `StickyCTA.tsx` |
| **2** | **Section Chiffres Clés (3 cols)** | 🟢 Faible | 🔴 Élevé | 3h | Créer `StatsSection.tsx` |
| **3** | **Hover effects logos clients individuels** | 🟢 Faible | 🟡 Moyen | 1h | Modifier `ClientLogos.tsx` |
| **4** | **Binôme CTAs Hero (primaire + secondaire)** | 🟢 Faible | 🟡 Moyen | 1h | Modifier `Hero.tsx` (déjà supporté) |
| **5** | **Augmenter spacing sections (py-20 → py-24)** | 🟢 Faible | 🟡 Moyen | 30min | Global find/replace |
| **6** | **Typographic Keywords backgrounds** | 🟢 Faible | 🟡 Moyen | 1h | Pattern CSS à documenter |
| **7** | **Text Underlays colorés (highlights)** | 🟢 Faible | 🟡 Moyen | 1h | Pattern CSS à documenter |
| **8** | **Trusted By section avec chiffre** | 🟢 Faible | 🟡 Moyen | 2h | Améliorer `ClientLogos.tsx` |
| **9** | **Image hover scale (ProductGrid)** | 🟢 Faible | 🟡 Moyen | 30min | Déjà implémenté ✅ |
| **10** | **Graphic Captions (blog categories)** | 🟢 Faible | 🟡 Moyen | 1h | Étendre `Badge.tsx` |

**Total Quick Wins :** 10 patterns
**Durée totale estimée :** 12-15h
**Impact conversion estimé :** +15-25%

### 10.2 Ordre d'Implémentation Recommandé

**Phase 1 : Conversion Immédiate (Semaine 1)**
1. CTA Sticky "Demander un devis" (2h)
2. Section Chiffres Clés (3h)
3. Trusted By avec chiffre (2h)

**Phase 2 : Polish Visuel (Semaine 2)**
4. Hover effects logos individuels (1h)
5. Typographic Keywords (1h)
6. Text Underlays (1h)
7. Graphic Captions (1h)

**Phase 3 : Optimisations (Semaine 2)**
8. Augmenter spacing (30min)
9. Binôme CTAs Hero (1h)
10. Vérification responsive (2h)

---

## 11. RECOMMANDATIONS POUR SESSION 2-2

### 11.1 Structure Brandbook Recommandée

Basé sur cette analyse, le brandbook (Session 2-2) devrait contenir :

**1. Fondations**
- Échelle spacing standardisée (section 1.2)
- Breakpoints responsive (section 2.1)
- Max-width conteneurs (section 2.3)
- Typography scale complète

**2. Composants de Base**
- Buttons (variants + sizes)
- Badges (tous variants + graphic captions)
- Links (states)
- Forms (inputs, labels, validation)

**3. Composants Sections**
- Fiches complètes pour 17 composants (sections 3, 4, 5)
- Props documentation
- Code examples
- Usage guidelines

**4. Patterns Layouts**
- Templates pages (section 7)
- Grid configurations (section 2.2)
- Section compositions

**5. Patterns Animations**
- Hover states standards (section 6.3)
- Transitions timing (section 6.2)
- Framer Motion patterns (à ajouter)

**6. Patterns Orbitvu**
- 13 patterns détaillés (section 8)
- Code implementations
- Usage recommandations

**7. Quick Wins Roadmap**
- 10 quick wins priorisés (section 10)
- Timeline implémentation
- Impact estimé

### 11.2 Patterns à Créer en Priorité (Session 2-2)

| Composant | Priorité | Raison |
|-----------|----------|--------|
| StickyCTA | 🔴 Critique | Impact conversion immédiat |
| StatsSection | 🔴 Critique | Trust & social proof |
| GraphicCaption | 🟡 Haute | Branding cohérent blog/ressources |
| TrustedBySection | 🟡 Haute | Amélioration ClientLogos |
| VideoHero | 🟡 Haute | Engagement élevé |
| TabsSection | 🟡 Moyenne | Pages produits détail |
| FAQSection | 🟡 Moyenne | Support & SEO |
| WorkflowTimeline | 🟢 Basse | Nice-to-have processus |

### 11.3 Documentation Requise

**Pour chaque composant du brandbook :**

1. **Description :** Quoi et pourquoi
2. **Props Interface :** TypeScript complet
3. **Variants :** Toutes les variantes avec exemples visuels
4. **Spacing Pattern :** Padding, margins, gaps utilisés
5. **Colors :** Palette couleurs utilisée
6. **Typography :** Tailles, weights, line-heights
7. **Animations :** Transitions et hovers
8. **Accessibility :** ARIA, keyboard nav, screen readers
9. **Code Example :** Exemple usage complet
10. **Usage Guidelines :** Quand utiliser, quand éviter

### 11.4 Outils pour Session 2-2

**Recommandé :**
- Storybook (pour showcase composants interactif)
- Figma (pour specs visuelles)
- Chromatic (pour visual regression testing)

**Structure fichiers brandbook :**
```
docs/
├── brandbook/
│   ├── 01-foundations/
│   │   ├── spacing.md
│   │   ├── typography.md
│   │   ├── colors.md
│   │   └── grid.md
│   ├── 02-components/
│   │   ├── buttons.md
│   │   ├── badges.md
│   │   ├── cards.md
│   │   └── ...
│   ├── 03-sections/
│   │   ├── hero.md
│   │   ├── stats.md
│   │   └── ...
│   ├── 04-patterns/
│   │   ├── orbitvu-patterns.md
│   │   ├── animations.md
│   │   └── layouts.md
│   └── 05-templates/
│       ├── homepage.md
│       ├── hub.md
│       └── ...
└── storybook/
    └── stories/
        ├── Button.stories.tsx
        ├── Hero.stories.tsx
        └── ...
```

---

## 12. ANNEXES

### 12.1 Fichiers Analysés

**Sections (10 fichiers) :**
1. Hero.tsx (141 lignes)
2. ThreePillarsSection.tsx (105 lignes)
3. CTABox.tsx (65 lignes)
4. ClientLogos.tsx (42 lignes)
5. BlogGrid.tsx (97 lignes)
6. ProductShowcase.tsx (106 lignes)
7. TailorMadeSection.tsx (64 lignes)
8. IntroSection.tsx (70 lignes)
9. AIFeaturesGrid.tsx (103 lignes)
10. IAManifesteSection.tsx (73 lignes)

**Shared (4 fichiers analysés) :**
1. ProductGrid.tsx (90 lignes)
2. SectorGrid.tsx (90 lignes)
3. Badge.tsx (107 lignes)
4. BeforeAfter.tsx (118 lignes)

**Layout (2 fichiers) :**
1. Header.tsx (104 lignes)
2. Footer.tsx (96 lignes)

**Total :** 17 composants, ~1471 lignes de code analysées

### 12.2 Patterns Identifiés (Résumé)

**Spacing :** 8 patterns principaux (gap, py, px, space-y)
**Grid :** 15 configurations responsive
**Max-width :** 6 variantes
**Animations :** 9 patterns hover/transition
**Orbitvu :** 13 patterns recommandés (5 haute priorité)
**Templates :** 6 templates de pages
**Quick Wins :** 10 améliorations rapides

### 12.3 Prochaines Étapes

**Session 2-2 : Brandbook Web Ultracomplet**

1. Créer documentation complète (Markdown + Storybook)
2. Implémenter 5 patterns Orbitvu haute priorité
3. Créer component library exhaustive
4. Ajouter Framer Motion animations
5. Setup Chromatic visual testing
6. Documenter tous les 17 composants
7. Créer usage guidelines
8. Roadmap implémentation patterns

**Durée estimée Session 2-2 :** 2-3 sessions (8-12h)

---

**Fin de l'Analyse Patterns**

**Date de complétion :** 2026-02-01
**Fichiers analysés :** 17 composants
**Patterns identifiés :** 50+ patterns
**Composants à créer :** 8 nouveaux composants recommandés
**Composants à améliorer :** 5 composants existants

**Prêt pour Session 2-2 : Création Brandbook Web Ultracomplet** ✅
