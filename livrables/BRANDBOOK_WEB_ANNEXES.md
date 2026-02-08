# BRANDBOOK WEB - ANNEXES

**Complément de :** `BRANDBOOK_WEB_COMPLET.md`
**Version :** 1.0.0
**Date :** 2026-02-01
**Sections :** 6-9 (Iconographie, Images, Animations, États)

---

## TABLE OF CONTENTS

6. [Iconographie](#6-iconographie)
   - 6.1 [Set d'Icônes](#61-set-dicônes)
   - 6.2 [Tailles Standardisées](#62-tailles-standardisées)
   - 6.3 [Couleurs selon Contexte](#63-couleurs-selon-contexte)
   - 6.4 [Icons Fonctionnelles vs Décoratives](#64-icons-fonctionnelles-vs-décoratives)

7. [Règles Photos/Images](#7-règles-photosimages)
   - 7.1 [Formats Recommandés](#71-formats-recommandés)
   - 7.2 [Next.js Image Component](#72-nextjs-image-component)
   - 7.3 [Ratios par Type d'Image](#73-ratios-par-type-dimage)
   - 7.4 [Sizes Attribute (Responsive)](#74-sizes-attribute-responsive)
   - 7.5 [Alt Text Guidelines](#75-alt-text-guidelines)

8. [Animations Guidelines](#8-animations-guidelines)
   - 8.1 [Durées Standard](#81-durées-standard)
   - 8.2 [Easings (Timing Functions)](#82-easings-timing-functions)
   - 8.3 [Patterns Animation Courants](#83-patterns-animation-courants)
   - 8.4 [Performance Considerations](#84-performance-considerations)

9. [États Interactifs](#9-états-interactifs)
   - 9.1 [États Boutons](#91-états-boutons)
   - 9.2 [États Links](#92-états-links)
   - 9.3 [États Cards](#93-états-cards)
   - 9.4 [États Form Inputs](#94-états-form-inputs)

10. [Quick Wins & Roadmap](#10-quick-wins--roadmap)

---

# 6. ICONOGRAPHIE

## 6.1 Set d'Icônes

**Librairie utilisée :** Lucide React

Lucide est une librairie d'icônes open-source, fork de Feather Icons, avec plus de 1000+ icônes cohérentes et personnalisables.

**Installation :**
```bash
npm install lucide-react
```

**Import :**
```tsx
import { Camera, Sparkles, GraduationCap, Check, ArrowRight, X, Menu } from 'lucide-react';
```

### Icons Principales Utilisées

| Icon | Nom Lucide | Usage | Composants |
|------|------------|-------|------------|
| 📷 Camera | `Camera` | Studios photo, capture | ThreePillars, IAManifeste |
| ✨ Sparkles | `Sparkles` | IA, création, magie | ThreePillars, AIFeatures |
| 🎓 GraduationCap | `GraduationCap` | Formation, academy | ThreePillars |
| ✓ Check | `Check` | Validation, features | ProductShowcase, Lists |
| → ArrowRight | `ArrowRight` | Navigation, CTA | ThreePillars, Cards |
| × X | `X` | Fermer, supprimer | Modals, Mobile menu |
| ☰ Menu | `Menu` | Menu hamburger | Header mobile |
| 🎨 Palette | `Palette` | Lifestyle, couleurs | AIFeatures |
| 🖼️ Image | `Image` | Background removal | AIFeatures |
| ⚡ Zap | `Zap` | Batch, rapidité | AIFeatures |
| ✔️ CheckCircle2 | `CheckCircle2` | Succès, validation | IAManifeste |
| 🔍 Search | `Search` | Recherche | Header, Forms |
| 📧 Mail | `Mail` | Contact, newsletter | Footer, Contact |
| 📱 Phone | `Phone` | Téléphone | Contact |
| 🌐 Globe | `Globe` | Langues, international | Header i18n |

**Total icons projet :** ~30 icons Lucide utilisées

---

## 6.2 Tailles Standardisées

**Basé sur :** analyse-patterns.md Section 6

| Contexte | Taille | Classe | Exemple |
|----------|--------|--------|---------|
| **Inline text** | 16px | `w-4 h-4` ou `size-4` | Icons dans boutons, labels |
| **Standard** | 24px | `w-6 h-6` ou `size-6` | Icons sections, navigation |
| **Large** | 32px | `w-8 h-8` ou `size-8` | Icons hero, features highlights |
| **Extra Large** | 48px | `w-12 h-12` ou `size-12` | Icons principaux sections |
| **Huge** | 64px | `w-16 h-16` ou `size-16` | Icons decoratives (rare) |

### Stroke Width

Lucide supporte `stroke-width` personnalisable :

```tsx
// Standard (défaut)
<Camera className="w-6 h-6" /> // stroke-width: 2

// Fin
<Camera className="w-6 h-6 stroke-[1.5]" />

// Épais
<Camera className="w-6 h-6 stroke-[2.5]" />
```

**Recommandation :** Utiliser `stroke-[1.5]` pour cohérence avec Brandbook Orbitvu

---

## 6.3 Couleurs selon Contexte

### Icons Colorées (Brand Colors)

```tsx
// Icon primaire (Very Peri)
<Camera className="w-6 h-6 text-primary-orbitvu" />

// Icon secondaire (Future Dusk)
<Sparkles className="w-6 h-6 text-secondary-orbitvu" />

// Icon accent (selon contexte)
<GraduationCap className="w-8 h-8 text-accent-green" />
```

### Icons dans Boutons (Héritent Couleur Texte)

```tsx
// Button default - icon hérite blanc
<Button variant="default">
  <Check className="w-4 h-4" />
  Confirmer
</Button>

// Button outline - icon hérite couleur texte
<Button variant="outline">
  <ArrowRight className="w-4 h-4" />
  En savoir plus
</Button>
```

### Icons Neutres

```tsx
// Gris foncé
<Menu className="w-6 h-6 text-neutral-dark" />

// Gris moyen
<Search className="w-5 h-5 text-neutral-medium" />

// Blanc (sur fond sombre)
<X className="w-6 h-6 text-white" />
```

### Icons avec Background Circulaire

Pattern utilisé dans IAManifesteSection, ThreePillars :

```tsx
<div className="bg-secondary-orbitvu/10 rounded-full p-6">
  <Camera className="w-12 h-12 text-secondary-orbitvu stroke-[1.5]" />
</div>
```

**Variations :**
- Background opacity : `/10` (10%), `/20` (20%)
- Padding : `p-4`, `p-6`, `p-8` selon taille icon
- Couleurs : Assortir background et icon (même couleur base)

---

## 6.4 Icons Fonctionnelles vs Décoratives

### Icons Fonctionnelles (Accessibilité)

Icons qui portent du sens doivent avoir `aria-label` ou `aria-describedby` :

```tsx
// Icon button (seule, sans texte)
<button aria-label="Fermer le modal">
  <X className="w-6 h-6" />
</button>

// Icon link
<Link href="/contact" aria-label="Nous contacter">
  <Mail className="w-5 h-5" />
</Link>
```

### Icons Décoratives (Aria-hidden)

Icons qui accompagnent du texte explicite sont décoratives :

```tsx
// Icon + texte visible
<Button>
  <Check className="w-4 h-4" aria-hidden="true" />
  Confirmer
</Button>

// Feature avec icon décorative
<div className="flex items-start gap-4">
  <Camera className="w-6 h-6 text-primary-orbitvu flex-shrink-0" aria-hidden="true" />
  <div>
    <h4>Studios Photo Automatisés</h4>
    <p>Description...</p>
  </div>
</div>
```

**Règle :** Si le texte adjacent décrit déjà l'action/contenu, `aria-hidden="true"`

---

# 7. RÈGLES PHOTOS/IMAGES

## 7.1 Formats Recommandés

**Ordre de priorité :**

1. **AVIF** (recommandé) - Meilleure compression (~30% plus petit que WebP)
2. **WebP** (fallback) - Large support navigateurs (~25% plus petit que PNG)
3. **PNG** (fallback final) - Compatibilité universelle

**Next.js Image Component** gère automatiquement les formats via `next/image` :
- Conversion AVIF/WebP automatique si navigateur supporte
- Fallback PNG/JPEG si nécessaire
- Optimisation taille/qualité à la volée

### Quand Utiliser Chaque Format

| Format | Usage | Avantages | Inconvénients |
|--------|-------|-----------|---------------|
| **AVIF** | Photos produits, hero images | Compression excellente, qualité élevée | Support navigateurs récent (95%+) |
| **WebP** | Toutes images | Bon compromis qualité/taille | Support 97%+ navigateurs |
| **PNG** | Logos, icons, transparence | Lossless, transparence parfaite | Fichiers plus lourds |
| **JPEG** | Photos sans transparence | Universellement supporté | Pas de transparence, compression avec pertes |
| **SVG** | Icons, logos, illustrations | Scalable, léger | Pas adapté photos |

---

## 7.2 Next.js Image Component

**TOUJOURS utiliser `next/image` pour images :**

```tsx
import Image from 'next/image';

<Image
  src="/images/product.avif"
  alt="Studio photo AlphaShot 360"
  width={800}
  height={600}
  quality={90}
  priority={false} // true pour images above-fold (hero)
  placeholder="blur" // optionnel, si blurDataURL fourni
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Props Essentielles

| Prop | Type | Usage |
|------|------|-------|
| `src` | string | Path image (local ou URL) |
| `alt` | string | **OBLIGATOIRE** - Description accessible |
| `width` | number | Largeur intrinsèque (pixels) |
| `height` | number | Hauteur intrinsèque (pixels) |
| `quality` | number (1-100) | Qualité compression (défaut: 75, hero: 90) |
| `priority` | boolean | Chargement prioritaire (hero, LCP) |
| `fill` | boolean | Remplit container parent (alternative width/height) |
| `sizes` | string | Media queries responsive |
| `placeholder` | 'blur' \| 'empty' | Placeholder pendant chargement |

### Modes d'Utilisation

**Mode 1 : Width/Height Explicites**
```tsx
<Image
  src="/product.avif"
  alt="Produit"
  width={800}
  height={600}
  // Ratio 4:3 préservé
/>
```

**Mode 2 : Fill (Container Parent)**
```tsx
<div className="relative w-full h-64">
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    className="object-cover"
  />
</div>
```

---

## 7.3 Ratios par Type d'Image

**Basé sur :** analyse-patterns.md + standards web

| Type Image | Ratio | Dimensions Exemple | Usage |
|------------|-------|-------------------|-------|
| **Produit carré** | 1:1 | 800×800 | Cards produits, grilles ProductGrid |
| **Produit portrait** | 3:4 | 600×800 | Fiches produits détaillées, zoom |
| **Hero landscape** | 16:9 | 1920×1080 | Backgrounds hero, headers |
| **Hero ultra-wide** | 21:9 | 2560×1080 | Hero immersifs |
| **Blog thumbnail** | 16:9 | 1200×675 | Cards blog, articles |
| **Logo client** | Variable | 200×100 (approx) | Section ClientLogos |
| **Before/After** | 1:1 ou 4:3 | 800×800 ou 800×600 | Galerie résultats BeforeAfter |
| **Avatar** | 1:1 | 200×200 | Témoignages, équipe |

### Object-fit Values

```tsx
// Cover : Remplit tout l'espace (peut cropper)
<Image className="object-cover" />

// Contain : Image entière visible (peut avoir espaces vides)
<Image className="object-contain" />

// Fill : Étire pour remplir (déforme ratio)
<Image className="object-fill" />
```

**Recommandations :**
- `object-cover` : Hero backgrounds, thumbnails blog
- `object-contain` : Produits (préserver tout le produit), logos

---

## 7.4 Sizes Attribute (Responsive)

Le `sizes` attribute indique au navigateur quelle taille d'image charger selon viewport.

**Syntaxe :**
```tsx
sizes="(condition) width, (condition) width, default-width"
```

**Exemples :**

```tsx
// Card dans grille 3 colonnes
<Image
  src="/product.avif"
  alt="Produit"
  width={800}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
// Mobile : 100% viewport
// Tablet : 50% viewport (2 cols)
// Desktop : 33% viewport (3 cols)

// Hero pleine largeur
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  sizes="100vw"
/>

// Sidebar 1/3 layout
<Image
  src="/aside.jpg"
  alt="Sidebar"
  width={400}
  height={600}
  sizes="(max-width: 1024px) 100vw, 33vw"
/>
```

**Pourquoi c'est important :**
- Optimise bande passante (charge image adaptée)
- Améliore performance (LCP)
- Next.js génère automatiquement plusieurs tailles

---

## 7.5 Alt Text Guidelines

**Règle d'or :** Décrire le contenu/fonction de l'image pour quelqu'un qui ne peut pas la voir.

### Bonnes Pratiques

**✅ Bon alt text :**
- Descriptif et spécifique
- Mentionne contexte si pertinent
- ~125 caractères max (lecteurs d'écran)
- Pas de "image de", "photo de" (redondant)

**Exemples :**

```tsx
// ✅ Bon
<Image alt="Studio photo AlphaShot 360 avec plateau tournant et éclairage LED" />
<Image alt="Avant/après retouche IA - Chaussure de sport sur fond blanc" />
<Image alt="Logo client Chanel" />

// ❌ Mauvais
<Image alt="Studio" />
<Image alt="Image1" />
<Image alt="Photo de produit" />
<Image alt="" /> // Sauf si décorative
```

### Images Décoratives

Si image purement décorative (n'ajoute pas d'information) :

```tsx
<Image
  alt=""
  aria-hidden="true"
  src="/decoration.svg"
/>
```

**Quand alt vide ?**
- Patterns background
- Formes décoratives
- Images illustratives qui dupliquent texte adjacent

### Images Complexes

Pour infographies, diagrammes :

```tsx
<figure>
  <Image
    alt="Diagramme workflow automatisation photo produit"
    src="/workflow.png"
    width={1200}
    height={800}
  />
  <figcaption className="sr-only">
    {/* Description détaillée pour lecteurs d'écran */}
    Workflow en 5 étapes : 1. Placement produit, 2. Capture automatique...
  </figcaption>
</figure>
```

---

# 8. ANIMATIONS GUIDELINES

**Basé sur :** analyse-patterns.md Section 6 + Framer Motion

## 8.1 Durées Standard

| Type Animation | Durée | Usage | Exemples |
|----------------|-------|-------|----------|
| **Micro-interaction** | 150-200ms | Hover buttons, focus | Button hover, link hover |
| **Transition simple** | 300-400ms | Fade in, slide, scale | Card hover, modal open |
| **Animation complexe** | 500-700ms | Stagger, séquences | Grid stagger, multi-step |
| **Counter/Number** | 1500-2000ms | Chiffres qui montent | StatsSection counters |
| **Page transition** | 400-600ms | Route changes | Page enter/exit |

**Règle générale :** Plus l'animation est subtile/fréquente, plus elle doit être rapide.

### Durées en Code

```tsx
// Tailwind (via duration utilities)
className="transition-all duration-200"   // 200ms
className="transition-all duration-300"   // 300ms
className="transition-all duration-500"   // 500ms

// Framer Motion
transition={{ duration: 0.3 }}            // 300ms
transition={{ duration: 0.5 }}            // 500ms
```

---

## 8.2 Easings (Timing Functions)

**Basé sur :** Standards Framer Motion + CSS easings

### Easings Recommandés

```tsx
// Framer Motion easings
const easings = {
  // Décélération naturelle (sortie rapide, arrivée lente)
  easeOut: [0, 0, 0.2, 1],

  // Smooth des deux côtés
  easeInOut: [0.4, 0, 0.2, 1],

  // Rebond subtil
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 20
  },

  // Rebond prononcé
  bounce: {
    type: 'spring',
    stiffness: 400,
    damping: 10
  }
};
```

### Usage par Contexte

| Contexte | Easing | Raison |
|----------|--------|--------|
| **Hover (entrée)** | easeOut | Réaction rapide, stabilisation douce |
| **Hover (sortie)** | easeInOut | Retour naturel |
| **Scroll reveal** | easeOut | Apparition naturelle |
| **Modal open** | spring (subtil) | Feeling dynamique |
| **Notification** | bounce | Attire attention |

### Tailwind Easings

```tsx
// ease-linear
transition-all ease-linear

// ease-in
transition-all ease-in

// ease-out (recommandé général)
transition-all ease-out

// ease-in-out
transition-all ease-in-out
```

---

## 8.3 Patterns Animation Courants

### Pattern 1 : Fade In au Scroll

**Framer Motion :**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
>
  {/* Contenu */}
</motion.div>
```

**Paramètres :**
- `initial` : État départ (invisible, 20px en bas)
- `whileInView` : État visible (opaque, position normale)
- `viewport.once` : Animation une seule fois
- `viewport.margin` : Trigger 100px avant viewport

---

### Pattern 2 : Stagger Children

**Animation séquentielle d'items (grille cards, liste) :**

```tsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // 100ms entre chaque enfant
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid md:grid-cols-3 gap-8"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>
      <Card {...item} />
    </motion.div>
  ))}
</motion.div>
```

---

### Pattern 3 : Counter Animation (Chiffres)

**Utiliser librairie `react-countup` :**

```tsx
import CountUp from 'react-countup';

<CountUp
  end={9500}
  duration={2}
  separator=","
  suffix="+"
  enableScrollSpy       // Déclenche au scroll
  scrollSpyOnce         // Une seule fois
  useEasing={true}
  easingFn={(t, b, c, d) => {
    // easeOutExpo
    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
  }}
/>
```

**Exemple StatsSection :**
```tsx
<div className="text-center">
  <div className="text-6xl font-bold text-primary-orbitvu mb-2">
    <CountUp end={500} suffix="+" duration={2} enableScrollSpy />
  </div>
  <p className="text-lg text-neutral-medium">Clients dans le monde</p>
</div>
```

---

### Pattern 4 : Hover Effects (CSS)

**Card Lift :**
```tsx
<div className="transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
  {/* Card content */}
</div>
```

**Image Zoom :**
```tsx
<div className="overflow-hidden">
  <img className="transition-transform duration-300 hover:scale-105" />
</div>
```

**Button Scale :**
```tsx
<button className="transition-transform active:scale-95">
  Click me
</button>
```

---

### Pattern 5 : Skeleton Loading

```tsx
<div className="animate-pulse">
  <div className="h-48 bg-neutral-light rounded-lg mb-4" />
  <div className="h-4 bg-neutral-light rounded w-3/4 mb-2" />
  <div className="h-4 bg-neutral-light rounded w-1/2" />
</div>
```

---

## 8.4 Performance Considerations

### ✅ Optimisé (GPU-Accelerated)

Animer **uniquement** ces propriétés pour performance optimale :

- `opacity`
- `transform` (translate, scale, rotate)

```tsx
// ✅ Performant
className="transition-opacity duration-300"
className="transition-transform duration-300"
className="transition-all duration-300" // Si seulement opacity/transform
```

### ❌ À Éviter (Cause Reflow)

- `width`, `height` (reflow layout)
- `top`, `left`, `bottom`, `right` (reflow layout)
- `margin`, `padding` (reflow layout)

```tsx
// ❌ Non performant
className="transition-all duration-300 hover:w-full" // width change = reflow

// ✅ Alternative performante
className="transition-transform duration-300 hover:scale-x-110" // transform scale
```

### Will-Change (Utiliser avec Parcimonie)

```tsx
// Uniquement si animation complexe et fréquente
className="will-change-transform hover:scale-110"

// ❌ Ne pas mettre sur tous les éléments (surcharge GPU)
```

### Viewport Once (Scroll Animations)

```tsx
// ✅ Animation une seule fois
<motion.div
  whileInView={...}
  viewport={{ once: true }}
>

// ❌ Animation à chaque scroll (surcharge)
<motion.div
  whileInView={...}
  viewport={{ once: false }}
>
```

### Limiter Animations Simultanées

**Règle :** Maximum 10-15 animations simultanées

```tsx
// Si grille 30 items, stagger avec delay suffisant
staggerChildren: 0.05 // 50ms (vs 100ms si peu d'items)
```

### Reduced Motion (Accessibilité)

Respecter préférence utilisateur `prefers-reduced-motion` :

```tsx
// Tailwind
<div className="motion-safe:animate-bounce motion-reduce:animate-none">

// Framer Motion (automatique)
// Framer Motion détecte et désactive automatiquement animations si prefers-reduced-motion
```

---

# 9. ÉTATS INTERACTIFS

Documentation complète des états hover, focus, active, disabled pour tous composants.

## 9.1 États Boutons

### Default State

```tsx
<Button variant="default">
  Action
</Button>
```

Classes appliquées :
- `bg-primary-orbitvu text-white`
- `px-6 py-3` (size default)
- `rounded-md`

---

### Hover State

```tsx
// Assombrissement background + légère élévation
className="hover:bg-primary-orbitvu/90 hover:shadow-lg transition-all duration-200"
```

**Effets hover standards :**
- Background : Assombrissement 10% (`/90`)
- Shadow : Augmentation subtile
- Cursor : `cursor-pointer` (automatique)

---

### Focus State (Accessibilité Clavier)

```tsx
// Ring visible pour navigation clavier
className="focus-visible:ring-2 focus-visible:ring-primary-orbitvu focus-visible:ring-offset-2"
```

**Pourquoi `focus-visible` vs `focus` ?**
- `focus-visible` : Ring uniquement clavier (pas au clic souris)
- `focus` : Ring toujours (clavier + souris) - moins UX

---

### Active State (Click Press)

```tsx
// Scale down légère au clic
className="active:scale-95 transition-transform"
```

**Feedback tactile :** Utilisateur voit que le clic est enregistré

---

### Disabled State

```tsx
<Button disabled>
  Action Indisponible
</Button>
```

Classes appliquées :
- `opacity-50` (grisé 50%)
- `cursor-not-allowed`
- `pointer-events-none` (bloque tous événements)

```tsx
// États disabled explicites
disabled:opacity-50
disabled:cursor-not-allowed
disabled:pointer-events-none
```

---

### Loading State

```tsx
<Button disabled>
  <Loader2 className="w-4 h-4 animate-spin mr-2" />
  Chargement...
</Button>
```

---

## 9.2 États Links

### Default

```tsx
<Link
  href="/page"
  className="text-secondary-orbitvu underline-offset-4"
>
  En savoir plus
</Link>
```

---

### Hover

```tsx
className="text-secondary-orbitvu hover:text-primary-orbitvu hover:underline transition-colors duration-200"
```

**Effets :**
- Couleur : Secondary → Primary
- Underline : Apparaît au hover

---

### Focus (Accessibilité)

```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary-orbitvu focus:ring-offset-2 rounded-sm"
```

---

### Active (Pressed)

```tsx
className="active:text-primary-orbitvu/80"
```

---

### Visited (Optionnel)

```tsx
// Généralement évité sur sites web modernes (UX)
// Mais si nécessaire:
className="visited:text-purple-700"
```

---

## 9.3 États Cards

### Default

```tsx
<Card className="border border-neutral-light bg-white">
  {/* Content */}
</Card>
```

---

### Hover

```tsx
<Card className="
  border border-neutral-light
  hover:shadow-xl
  hover:-translate-y-1
  transition-all duration-300
">
  {/* Élévation + ombre */}
</Card>
```

**Effet :** Card "se soulève" au hover (affordance lien)

---

### Focus-Within

```tsx
<Card className="
  focus-within:ring-2
  focus-within:ring-primary-orbitvu
  focus-within:ring-offset-2
">
  {/* Ring si enfant (link, button) a focus */}
</Card>
```

**Usage :** Card contenant Link - ring si focus keyboard sur link

---

### Active

```tsx
<Card className="active:scale-[0.98] transition-transform">
  {/* Légère compression au clic */}
</Card>
```

---

## 9.4 États Form Inputs

### Default

```tsx
<Input
  type="text"
  className="
    border border-neutral-medium
    bg-white
    rounded-md
    px-4 py-2
  "
/>
```

---

### Focus

```tsx
<Input className="
  border-neutral-medium
  focus:border-primary-orbitvu
  focus:ring-2
  focus:ring-primary-orbitvu/20
  focus:outline-none
  transition-all
" />
```

**Effets :**
- Border : Neutral → Primary
- Ring : Apparaît (opacity 20%)
- Outline : Supprimé (remplacé par ring)

---

### Disabled

```tsx
<Input
  disabled
  className="
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:bg-neutral-lighter
  "
/>
```

---

### Error State (aria-invalid)

```tsx
<Input
  aria-invalid={true}
  className="
    aria-invalid:border-destructive
    aria-invalid:ring-destructive/20
    aria-invalid:focus:ring-destructive/20
  "
/>
```

**Avec message erreur :**
```tsx
<div className="space-y-2">
  <Input aria-invalid={true} aria-describedby="email-error" />
  <p id="email-error" className="text-sm text-destructive">
    Email invalide
  </p>
</div>
```

---

### Success State

```tsx
<Input
  aria-invalid={false}
  className="
    border-accent-green
    focus:ring-accent-green/20
  "
/>

{/* Icon success */}
<div className="relative">
  <Input />
  <Check className="absolute right-3 top-3 w-5 h-5 text-accent-green" />
</div>
```

---

# 10. QUICK WINS & ROADMAP

**Basé sur :** analyse-patterns.md Section 10

## 10.1 Quick Wins (Haute Priorité + Faible Effort)

| # | Quick Win | Effort | Impact | Durée | Fichiers |
|---|-----------|--------|--------|-------|----------|
| **1** | **CTA Sticky "Demander un devis"** | 🟢 Faible | 🔴 Élevé | 2h | Créer `StickyCTA.tsx` |
| **2** | **Section Chiffres Clés (3 cols)** | 🟢 Faible | 🔴 Élevé | 3h | Créer `StatsSection.tsx` |
| **3** | **Hover logos clients individuels** | 🟢 Faible | 🟡 Moyen | 1h | Modifier `ClientLogos.tsx` |
| **4** | **Binôme CTAs Hero** | 🟢 Faible | 🟡 Moyen | 1h | Modifier `Hero.tsx` (déjà supporté) |
| **5** | **Augmenter spacing sections** | 🟢 Faible | 🟡 Moyen | 30min | Global find/replace py-20 → py-24 |
| **6** | **Typographic Keywords** | 🟢 Faible | 🟡 Moyen | 1h | Pattern CSS documenter |
| **7** | **Text Underlays colorés** | 🟢 Faible | 🟡 Moyen | 1h | Pattern CSS documenter |
| **8** | **Trusted By avec chiffre** | 🟢 Faible | 🟡 Moyen | 2h | Améliorer `ClientLogos.tsx` |
| **9** | **Image hover scale** | 🟢 Faible | 🟡 Moyen | 30min | ✅ Déjà implémenté |
| **10** | **Graphic Captions** | 🟢 Faible | 🟡 Moyen | 1h | Étendre `Badge.tsx` |

**Total Quick Wins :** 10 patterns
**Durée totale estimée :** 12-15h
**Impact conversion estimé :** +15-25%

---

## 10.2 Ordre d'Implémentation Recommandé

### Phase 1 : Conversion Immédiate (Semaine 1)

1. **CTA Sticky** (2h) - Impact conversion immédiat
2. **Section Chiffres Clés** (3h) - Trust & social proof
3. **Trusted By avec chiffre** (2h) - Renforce crédibilité

**Impact Phase 1 :** +10-15% conversion estimé

---

### Phase 2 : Polish Visuel (Semaine 2)

4. **Hover logos individuels** (1h)
5. **Typographic Keywords** (1h)
6. **Text Underlays** (1h)
7. **Graphic Captions** (1h)

**Impact Phase 2 :** +5% engagement

---

### Phase 3 : Optimisations (Semaine 2)

8. **Augmenter spacing** (30min)
9. **Binôme CTAs Hero** (1h)
10. **Vérification responsive** (2h)

**Impact Phase 3 :** Polish final

---

## STATISTIQUES ANNEXES

**Sections documentées :** 4/4 (Sections 6-9)
- Iconographie : 30+ icons Lucide, 5 tailles standardisées
- Images : 8 ratios types, guidelines alt text
- Animations : 5 patterns courants, performance tips
- États : 4 composants types (Button, Link, Card, Input)

**Quick Wins :** 10 identifiés, roadmap 3 phases

**Taille fichier :** ~1500 lignes

---

## CHANGELOG

**v1.0.0 - 2026-02-01**
- ✅ Section 6 : Iconographie (Lucide React)
- ✅ Section 7 : Règles Photos/Images (Next.js Image)
- ✅ Section 8 : Animations (Framer Motion + CSS)
- ✅ Section 9 : États Interactifs (4 composants)
- ✅ Section 10 : Quick Wins & Roadmap

**Fichier principal :** `BRANDBOOK_WEB_COMPLET.md` (Sections 1-5)

---

**FIN DES ANNEXES**
