# Analyse Préliminaire - Session Pilote 6 : Animations & Polish

**Date :** 7 février 2026
**Technologie :** Framer Motion v12.33.0
**Scope :** Animations scroll-reveal, stagger, micro-interactions, transitions composants interactifs

---

## 1. Composants Animation Créés

### `components/animations/` (4 fichiers)

| Composant | Rôle | Props clés |
|-----------|------|------------|
| **FadeInView** | Fade-in au scroll avec direction | `direction` (up/down/left/right/none), `delay`, `duration`, `as` |
| **StaggerContainer** | Parent stagger (délai progressif entre enfants) | `stagger` (défaut 0.1s), `delay`, `amount` |
| **StaggerItem** | Enfant du stagger, apparition avec direction | `direction` (up par défaut) |
| **index.ts** | Barrel export | - |

### Caractéristiques communes
- Tous `"use client"` (requis par Framer Motion)
- Tous respectent `useReducedMotion()` (accessibilité)
- Easing brandbook : `[0, 0, 0.2, 1]` (easeOut)
- Durée standard : 0.5s (fade), 0.1s stagger
- `whileInView` + `viewport: { once: true }` (animation unique au scroll)

---

## 2. Audit Transitions CSS Existantes

### Conservées en CSS pur (pas de migration Framer Motion)
- `transition-colors duration-200` sur boutons et liens hover
- `transition-transform duration-300` + `group-hover:scale-105` sur images cartes
- `transition-shadow` sur cartes hover
- `group-hover:translate-x-1` / `translate-x-2` sur flèches

### Migrées vers Framer Motion
- Scroll reveal (opacity + translateY) : toutes les sections
- Stagger grilles : cartes produits, secteurs, blog, guides, features
- Transitions entre étapes : ROICalculatorWizard, OPCOSimulator
- Modal overlay : MachineModal (AnimatePresence + backdrop fade)

### Règle appliquée
> CSS pour hover/focus simples, Framer Motion pour scroll-reveal, stagger, layout animations, AnimatePresence.

---

## 3. Couverture des Animations par Page

### Pages avec animations complètes (19/22 pages utiles)

| Page | FadeInView | Stagger | Spécifique |
|------|:---:|:---:|:---:|
| Homepage | x | x | - |
| Studios Photo (hub) | x | x | - |
| Studio Photo [slug] | x | x | - |
| Sélecteur Machines | x | x | - |
| IA Photo Produit | x | x | - |
| Industrie (hub) | x | x | - |
| Industrie [slug] | x | x | - |
| Academy (hub) | x | x | - |
| Academy [slug] | x | x | courseSchema |
| Formations Packshot | x | x | - |
| Formations IA | x | x | - |
| Simulateur OPCO | x | x | - |
| Calendrier | x | x | - |
| Blog (hub) | x | x | - |
| Blog [slug] | x | - | - |
| Guide (hub) | x | x | - |
| Guide [slug] | x | x | - |
| Contact | x | - | - |
| A propos | x | x | - |

### Pages sans animations (intentionnel)
- **CGU** - Page légale statique, pas d'animation nécessaire
- **Confidentialité** - Page légale statique
- **Mentions légales** - Page légale statique

### Composants partagés animés
- `AIFeaturesGrid` - StaggerContainer + StaggerItem
- `BlogGrid` - StaggerContainer + StaggerItem
- `ThreePillarsSection` - FadeInView + StaggerContainer + StaggerItem
- `ProductGrid` - StaggerContainer + StaggerItem
- `SectorGrid` - StaggerContainer + StaggerItem

### Composants interactifs (Framer Motion direct)
- `ROICalculatorWizard` - AnimatePresence + motion.div (transitions étapes directionnelles)
- `OPCOSimulator` - AnimatePresence + motion.div (transitions formulaire)
- `MachineModal` - AnimatePresence + motion.div (overlay + slide-up)

---

## 4. Corrections Appliquées

### Page `academy/[slug]` (refonte complète)
- **Link** : `next/link` → `@/i18n/routing` (pattern projet)
- **Tokens cassés** : `neutral-dark`, `neutral-medium`, `neutral-light`, `neutral-lighter`, `secondary-orbitvu` → tokens brandbook
- **Emojis** : `✓` → `<CheckCircle>`, `📦` → `<Package>`, `💶` → `<Euro>` (Lucide icons)
- **i18n** : Textes hardcodés FR → conditionnel `isFr`
- **Design** : Hero gradient brandbook, cards `rounded-2xl border border-neutral-100`
- **SEO** : Ajout `courseSchema`, `breadcrumbSchema`, alternates

---

## 5. Performance

### Stratégie bundle
- Composants wrapper dans `components/animations/` (tree-shakable)
- Framer Motion importé uniquement dans les composants `"use client"`
- Pages server-side non impactées (les wrappers sont des composants client boundary)

### Principes 60fps respectés
- Animations uniquement sur `opacity` et `transform` (GPU-accelerated)
- Pas d'animation sur `width`, `height`, `margin`, `padding`
- `viewport: { once: true }` - animation unique, pas de recalcul au scroll

### Accessibilité
- `useReducedMotion()` dans FadeInView et StaggerContainer
- Fallback : rendu statique sans animation quand `prefers-reduced-motion: reduce`

---

## 6. Build Status

- **Compilation** : OK (8.6s Turbopack)
- **Pages statiques** : 138/138 générées
- **Erreurs** : 0
- **Warnings** : 2 (middleware deprecated, @sanity/image-url deprecated export - non liés aux animations)
