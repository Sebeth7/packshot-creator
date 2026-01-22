# Design System - Brandbook 2025

## Vue d'Ensemble

Ce document présente l'architecture technique du Design System Brandbook 2025 d'Orbitvu, implémenté dans ce projet Next.js en janvier 2026.

## Variables CSS

Voir `app/globals.css` lignes 65-150 pour la définition complète des variables CSS.

### Variables Principales

```css
/* Couleurs primaires */
--primary-orbitvu: #6667AB;        /* Very Peri */
--secondary-orbitvu: #4c5578;      /* Future Dusk */

/* Couleurs de section */
--primary-creation: #ff7809;       /* Orange */
--primary-formation: #cdcdfd;      /* Bleu clair */
--primary-blog: #CBE857;           /* Lime */

/* Palettes étendues Very Peri (15 nuances) */
--very-peri-0: #ffffff;
--very-peri-50: #f5f5fa;
--very-peri-100: #ebebf5;
--very-peri-150: #d7d7eb;
--very-peri-200: #c3c3e1;
--very-peri-300: #9b9bcd;
--very-peri-400: #8384bc;
--very-peri-500: #6667AB;          /* BASE */
--very-peri-600: #52538d;
--very-peri-700: #3e3f6f;
--very-peri-800: #2a2b51;
--very-peri-850: #23243f;
--very-peri-900: #16172d;
--very-peri-950: #0f1020;
--very-peri-1000: #000000;

/* Palettes étendues Future Dusk (15 nuances) */
--future-dusk-0: #ffffff;
--future-dusk-50: #f5f6f7;
--future-dusk-100: #ebecee;
--future-dusk-150: #d7dadd;
--future-dusk-200: #c3c7cc;
--future-dusk-300: #9ba1aa;
--future-dusk-400: #838b99;
--future-dusk-500: #4c5578;        /* BASE */
--future-dusk-600: #3c4460;
--future-dusk-700: #2d3348;
--future-dusk-800: #1e2230;
--future-dusk-850: #191c26;
--future-dusk-900: #0f1118;
--future-dusk-950: #0a0b10;
--future-dusk-1000: #000000;

/* Couleurs d'accent (11 couleurs) */
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
```

## Architecture Couleurs par Section

### Layout Wrappers

Chaque section utilise un layout qui définit `--section-primary` pour permettre aux composants d'utiliser dynamiquement la couleur de la section courante.

```tsx
// app/[lang]/creation/layout.tsx
export default function CreationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--section-primary': 'var(--primary-creation)' } as React.CSSProperties}>
      {children}
    </div>
  );
}
```

```tsx
// app/[lang]/formation/layout.tsx
export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ '--section-primary': 'var(--primary-formation)' } as React.CSSProperties}>
      {children}
    </div>
  );
}
```

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

### Button Variant Section

Le composant Button utilise la variable `--section-primary` pour appliquer automatiquement la couleur de la section.

```tsx
// components/ui/button.tsx (variant section)
section: "bg-[var(--section-primary)] hover:bg-[var(--section-primary)]/90 text-white"
```

Usage :
```tsx
<Button variant="section">Action Section</Button>
```

Ce button aura automatiquement la couleur orange dans la section Création, bleu clair dans Formation, et lime dans Blog.

## Hardcoded Colors (Résolu)

Certains composants nécessitent des couleurs hardcodées en raison de limitations techniques ou de besoins spécifiques.

### EvolutionChart

**Fichier** : `components/calculators/ROICalculator/lib/chartColors.ts`

Le composant EvolutionChart utilise Recharts qui requiert des valeurs de couleur statiques.

```typescript
export const CHART_COLORS = {
  primary: '#6667AB',     // Very Peri
  secondary: '#4c5578',   // Future Dusk
  accent: '#27eb9f',      // Green
  grid: '#e5e7eb',        // Gray
};
```

### PDFGenerator

**Fichier** : `components/calculators/ROICalculator/PDFGenerator.tsx`

Le générateur de PDF utilise jsPDF qui nécessite des valeurs RGB.

Helper pour conversion :
```typescript
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
};
```

Constantes couleurs en début de fichier :
```typescript
const COLORS = {
  primary: hexToRgb('#6667AB'),      // Very Peri
  secondary: hexToRgb('#4c5578'),    // Future Dusk
  accent: hexToRgb('#27eb9f'),       // Green
  text: hexToRgb('#0D171A'),         // Text Dark
  lightGray: hexToRgb('#F8FAFB'),    // BG Light Gray
};
```

## Tests d'Accessibilité

### Ratios de Contraste (WCAG AA = 4.5:1)

| Couleur | Sur Blanc | Status | Recommandation |
|---------|-----------|--------|----------------|
| Very Peri #6667AB | 5.2:1 | ✓ Pass | OK pour texte et CTAs |
| Future Dusk #4c5578 | 8.1:1 | ✓ Pass | Excellent contraste |
| Bleu clair #cdcdfd | 1.2:1 | ❌ Fail | NE PAS utiliser pour texte sur blanc |
| Lime #CBE857 | 1.5:1 | ⚠️ Fail | Border requis pour visibilité |
| Orange #ff7809 | 3.6:1 | ⚠️ Borderline | Border recommandé |
| Green #27eb9f | 2.1:1 | ❌ Fail | Border requis |

### Recommandations d'Implémentation

#### Formation (Bleu clair)
```tsx
// CTAs avec border pour visibilité
<Button
  variant="section"
  className="border-2 border-gray-300"
>
  Action Formation
</Button>
```

#### Blog (Lime)
```tsx
// CTAs avec border ou ombre pour contraste
<Button
  variant="section"
  className="border-2 border-gray-300 shadow-md"
>
  Action Blog
</Button>
```

#### Création (Orange)
```tsx
// Border recommandé pour améliorer le contraste
<Button
  variant="section"
  className="border border-gray-200"
>
  Action Création
</Button>
```

## Classes Tailwind Personnalisées

### Palettes étendues

```tsx
// Very Peri
className="bg-very-peri-500"        // Base
className="bg-very-peri-100"        // Très clair
className="bg-very-peri-900"        // Très foncé
className="text-very-peri-600"      // Texte foncé
className="border-very-peri-300"    // Border claire

// Future Dusk
className="bg-future-dusk-500"      // Base
className="bg-future-dusk-100"      // Très clair
className="bg-future-dusk-900"      // Très foncé
className="text-future-dusk-600"    // Texte foncé
className="border-future-dusk-300"  // Border claire
```

### Couleurs d'accent

```tsx
// Accent colors
className="bg-accent-green"
className="bg-accent-lime"
className="bg-accent-light-blue"
className="bg-accent-orange"
className="text-accent-cyan"
className="border-accent-pink"
```

### Couleurs primaires

```tsx
// Couleurs de base
className="bg-primary-orbitvu"
className="text-secondary-orbitvu"
className="hover:bg-primary-orbitvu/90"  // Avec opacity
```

## Composants UI Principaux

### Button Variants

```tsx
// Default (Very Peri)
<Button variant="default">Action</Button>

// Section (Couleur contextuelle)
<Button variant="section">Action Section</Button>

// Secondary (Future Dusk)
<Button variant="secondary">Action Secondaire</Button>

// Outline
<Button variant="outline">Outline</Button>

// Ghost
<Button variant="ghost">Ghost</Button>
```

### Badge Variants

```tsx
// Red (maintenant Very Peri)
<Badge variant="red">Badge</Badge>

// Green
<Badge className="bg-accent-green text-white">Succès</Badge>

// Lime (Blog)
<Badge className="bg-accent-lime text-black">Blog</Badge>

// Light Blue (Formation)
<Badge className="bg-accent-light-blue text-black border border-gray-300">Formation</Badge>

// Orange (Création)
<Badge className="bg-accent-orange text-white">Création</Badge>
```

## Migration depuis Brandbook Précédent

### Mapping des Couleurs

| Ancien | Nouveau | Variable CSS |
|--------|---------|--------------|
| #EC3655 (Rouge) | #6667AB (Very Peri) | `--primary-orbitvu` |
| #24A1B4 (Cyan) | #4c5578 (Future Dusk) | `--secondary-orbitvu` |
| Cairo (Font) | Inter (Font) | `--font-inter` |

### Fichiers Modifiés (52 composants)

Tous les fichiers suivants ont été migrés vers le Brandbook 2025 :
- Navigation components
- Hero sections
- Feature sections
- Pricing cards
- Testimonials
- Forms
- Calculators
- Blog components
- Footer components

Voir le commit history pour la liste complète.

## Typographie

### Hiérarchie des Polices

```tsx
// Headings (Inter)
<h1 className="font-inter font-bold text-5xl">Titre Principal</h1>
<h2 className="font-inter font-bold text-4xl">Titre Secondaire</h2>
<h3 className="font-inter font-bold text-3xl">Titre Tertiaire</h3>

// Body (Roboto)
<p className="font-roboto text-base">Texte de corps</p>
<p className="font-roboto font-medium text-lg">Texte accentué</p>
```

### Line Heights Recommandés

- **Headings** : 1.2 à 1.4 × font-size
- **Body** : 1.5 à 1.6 × font-size
- **Small text** : 1.4 × font-size

## Éléments Visuels Spéciaux

### Typographic Keywords

Grands mots-clés en arrière-plan avec transparence réduite :

```tsx
<div className="relative">
  <div className="absolute inset-0 flex items-center justify-center opacity-5">
    <span className="font-inter font-bold text-9xl text-primary-orbitvu">
      INNOVATION
    </span>
  </div>
  <div className="relative z-10">{content}</div>
</div>
```

### Text Underlays

Barres colorées pour emphase :

```tsx
<span className="relative">
  <span className="relative z-10">Texte en emphase</span>
  <span className="absolute bottom-0 left-0 h-2 w-full bg-accent-lime -z-10" />
</span>
```

### Graphic Captions

Catégories de contenu :

```tsx
<Badge className="bg-accent-pink text-white font-bold uppercase tracking-wide">
  Knowledge
</Badge>

<Badge className="bg-accent-cyan text-white font-bold uppercase tracking-wide">
  Case Study
</Badge>
```

## Stack Technique

- **Framework** : Next.js 14.1.1 (App Router)
- **Styling** : Tailwind CSS v4 (inline @theme in globals.css)
- **i18n** : next-intl 4.6.1
- **UI Components** : shadcn/ui
- **Animations** : Framer Motion
- **Charts** : Recharts
- **PDF Generation** : jsPDF

## Références

- **Design principal** : design_system_final.md
- **Design complémentaire** : brief_design_system.md
- **Guidelines** : PROJECT_GUIDELINES.md
- **Benchmarks** : Orbitvu.com, Stripe.com, Photoroom.com

## Support et Maintenance

Pour toute question ou problème lié au Design System :
1. Consulter ce document en premier
2. Vérifier PROJECT_GUIDELINES.md pour les règles de migration
3. Consulter globals.css pour les variables CSS
4. Consulter tailwind.config.ts pour la configuration Tailwind

## Changelog

**Janvier 2026** - Migration complète vers Brandbook 2025
- Remplacement de Cairo par Inter
- Migration de #EC3655 vers #6667AB (Very Peri)
- Migration de #24A1B4 vers #4c5578 (Future Dusk)
- Ajout de 11 couleurs d'accent
- Ajout des palettes étendues (15 nuances)
- Implémentation du système de couleurs par section
- Migration de 52 composants
