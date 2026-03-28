# Template Page Produit — Guide Complet

> Ce document est le template de reference pour modifier toutes les pages produit du site PackshotCreator.
> Il a ete cree lors de la refonte de la page Alphashot Pro G2 (session du 28/03/2026).
> Il s'inspire du design-system Apple, de notre Home redesignee, et de la page produit equivalente chez Orbitvu.

---

## 1. Architecture des sections (ordre definitif)

Chaque page produit suit cette sequence de sections. L'ordre est FIXE et ne doit pas etre modifie.

| # | Section | Fond | Layout | Obligatoire |
|---|---------|------|--------|-------------|
| 1 | Hero Product | `bg-future-dusk-900` (dark) | Split HeroSection | Oui |
| 2 | IA Ready Banner | `bg-gradient-to-r from-amber-50 to-very-peri-50` | Horizontal icon+text+CTA | Si machine IA Ready |
| 3 | **Product Story** | `bg-white` | Centre Apple + bento grid (7/5 + tiers) | Oui |
| 4 | Key Stats Ribbon | `bg-future-dusk-900` (dark) | 3 colonnes AnimatedCounter | Si keyStats definis |
| 5 | Avantages cles | `bg-white` | Featured dark full-width + 2-col grid | Oui |
| 6 | **Specs & Use Cases** | `bg-future-dusk-900` (dark) | Split 7/5 (specs table + glassmorphism cards) | Oui |
| 7 | Systemes similaires | `bg-neutral-50` | Grid 3 colonnes | Si machines similaires |
| 8 | Formation Academy | `bg-white` | Split 7/5 + carte gradient | Oui |
| 9 | FAQ | `bg-neutral-50` | Split 4/8 sticky + accordion | Si faqItems definis |
| 10 | CTA Final (ADN) | `bg-black` | 2 cartes (gradient peri 3/5 + glassmorphism 2/5) | Oui |

### Rythme des fonds (alternance dark/light)
```
Hero (dark) → IA Ready (gradient) → Product Story (white) → Stats (dark) →
Avantages (white) → Specs & Use Cases (dark) → Similaires (gray) →
Formation (white) → FAQ (gray) → CTA Final (black)
```
Jamais 2 fonds identiques consecutifs. 10 sections au lieu de 13 (fusions + suppression redondances).

---

## 2. Checklist par section

### 2.1 Hero Product
- Layout `split` via `HeroSection` component
- Badge `< Tous les studios` en haut a gauche
- Titre = `machine.nom` (display auto par HeroSection)
- Subtitle = `machine.useCases.join(' • ')`
- Image produit dans cadre blanc `bg-white rounded-2xl shadow-2xl p-8`
- Badges : Distributeur Exclusif (emerald), Orbitvu (peri), IA Ready (amber) si applicable
- Quick specs : grille 2x2 (`tailleMax`, `poidsMax`, `capaciteJour`, `spaceRequired`)
- 2 CTAs : "Demander un devis" (primary) + "Demander une demo" (secondary)

### 2.2 IA Ready Banner
- Condition : `isIAReady(machine.id)` retourne true
- Layout horizontal : icone Sparkles → texte (label + titre + description) → bouton BlendAI
- Gradient `from-amber-50 to-very-peri-50`
- Lien vers `/ia-photo-produit`

### 2.3 Galerie de resultats (NOUVEAU)
**Inspiration Orbitvu** : section "Exemples de photos, animations 360° et videos"

- Label : `machine.nom` en uppercase tracking
- Titre : `text-4xl lg:text-6xl` — "Exemples de photos, 360° et videos"
- Layout bento grid asymetrique :
  - 1 grande image (col-span-2 row-span-2, aspect-[4/3]) — packshot fond blanc
  - 2 petites images carrees — 360° interactif + produit reflechissant
  - 1 placeholder video (dark, avec bouton Play) — col-span-2 lg:col-span-1
- Chaque cellule a un badge en bas a gauche indiquant le type (Packshot, 360°, Video, etc.)
- **Images** : utiliser des placeholders avec icones tant que les vraies images ne sont pas disponibles
- **Pour chaque machine** : adapter les labels des placeholders aux use cases specifiques

### 2.4 Description + Video (NOUVEAU)
**Inspiration Orbitvu** : section split avec texte narratif + video

- Label : `machine.nom`
- Titre : `text-3xl sm:text-4xl lg:text-5xl` — adapte au produit
- 2 paragraphes narratifs avec **bold selectif** sur les termes cles :
  - Paragraphe 1 : description generale + differenciateurs (IA, eclairage, etc.)
  - Paragraphe 2 : productivite + benefice e-commerce
- Placeholder video en `aspect-video` avec bouton Play cercle + texte
- **IMPORTANT** : Le texte doit etre adapte pour chaque machine en utilisant les donnees
  de `machine.keyAdvantages`, `machine.faqItems`, et les specs
- **Ne PAS copier-coller** le meme texte pour toutes les machines

### 2.5 Key Stats Ribbon
- Label categorie : "En chiffres" / "By the numbers"
- **AnimatedCounter** sur chaque stat (PAS de texte statique)
- Parsing : `parseInt(stat.value.replace(/[^0-9]/g, ''))` pour le nombre, le reste comme suffix
- Layout : 3 colonnes divisees par `md:divide-x md:divide-white/10`
- Padding augmente : `py-20 lg:py-24`

### 2.6 Avantages cles
- Label : "Pourquoi ce systeme"
- Titre : `text-4xl lg:text-6xl` (display size)
- Layout split sticky 4/8 — heading sticky a gauche, cartes a droite
- **Ghost numbers** : `text-5xl lg:text-7xl text-neutral-100`
- Chaque avantage a :
  - Un titre (`text-lg font-heading font-bold`)
  - **Une description** de 2-3 lignes (`text-sm text-future-dusk-500`) — via `advantage.description`
- Si `advantage.description` n'existe pas, afficher seulement le titre (retrocompatible)
- **Pour enrichir une machine** : ajouter `description: { fr: '...', en: '...' }` dans machines.ts

### 2.7 Caracteristiques techniques
- Label : "Fiche technique"
- Titre : `text-4xl lg:text-5xl` (augmente depuis text-3xl)
- Fond dark + carte blanche flottante `shadow-2xl`
- 2 colonnes : Dimensions & Capacites (gauche) + Fonctionnalites & Secteurs (droite)
- **Secteurs traduits** via `sectorLabels` map — ne JAMAIS afficher en anglais brut
- Fonctionnalites via `featureLabels` map

### 2.8 Cas d'usage & Limites
- **Label categorie** : "Pour qui"
- **Titre de section** : `text-4xl lg:text-5xl` — "Cas d'usage & limites"
- 2 cartes avec icones dans un cercle colore avant le titre
- Carte verte (emerald-50) : use cases avec CheckCircle
- Carte jaune (amber-50) : limitations avec AlertTriangle
- Padding : `py-20 lg:py-32`

### 2.9 CTA Intermediaire
- Centré, dark gradient, 2 CTAs (Reserver demo + Calculer ROI)
- Texte dynamique avec `machine.nom`
- Pas de label (acceptable pour un CTA)

### 2.10 Systemes similaires
- **Label categorie** : "Comparer"
- **Titre** : `text-4xl lg:text-5xl` — "Systemes similaires"
- Grid 3 colonnes avec SpringCard + ScrollReveal
- Chaque carte : image + nom + use cases + badges (prod/jour, taille max)
- Padding : `py-20 lg:py-32`

### 2.11 Formation Academy
- Label : "PackshotCreator Academy"
- Split 7/5 avec carte gradient peri a droite (Qualiopi + OPCO)
- 3 bullet points formation + 2 CTAs (Voir formations + Calendrier)
- Conforme au design-system — ne pas modifier

### 2.12 FAQ
- Label : "FAQ"
- Split 4/8 sticky heading + accordion `<details>`
- Titre : `text-4xl lg:text-5xl` — "Questions frequentes"
- Pattern ADN respecte — ne pas modifier

### 2.13 CTA Final (pattern ADN)
- Fond : `bg-black` (PAS gradient peri)
- Label categorie : "Passez a l'action"
- Titre display : `text-4xl lg:text-6xl`
- **2 cartes distinctes** :
  - Carte 1 (3/5) : gradient peri, titre + description + CTA "Demander un devis"
  - Carte 2 (2/5) : glassmorphism (`bg-white/5 backdrop-blur-sm border-white/10`), icone BarChart3, titre "Calculez votre ROI" + description + CTA outline
- Gradient radial en arriere-plan pour subtilite

---

## 3. Donnees a enrichir dans machines.ts

Pour chaque machine a modifier, les champs suivants doivent etre mis a jour :

### 3.1 keyAdvantages — Ajouter des descriptions
```typescript
keyAdvantages: [
  {
    fr: 'Titre court et percutant',
    en: 'Short punchy title',
    description: {
      fr: 'Description de 2-3 lignes expliquant le benefice concret pour l\'acheteur.',
      en: 'Description of 2-3 lines explaining the concrete benefit for the buyer.',
    },
  },
  // ...
],
```

### 3.2 Ou trouver le contenu pour enrichir
1. **Page Orbitvu equivalente** (`orbitvu.fr/product/[machine-id]/`) — source primaire
2. **FAQ existantes** dans `machine.faqItems` — contiennent souvent les descriptions detaillees
3. **Brochures Orbitvu** — si disponibles
4. **Ne JAMAIS inventer** — si aucune source n'est disponible, demander a l'utilisateur

### 3.3 Liste des pages produit et leur equivalent Orbitvu

| Notre ID | Notre page | Page Orbitvu |
|----------|-----------|--------------|
| `alphashot-micro-v2` | `/studio-photo/alphashot-micro-v2` | `orbitvu.fr/product/alphashot-micro-pro-v2/` |
| `alphashot-360` | `/studio-photo/alphashot-360` | `orbitvu.fr/product/alphashot-360/` |
| `alphashot-g2` | `/studio-photo/alphashot-g2` | `orbitvu.fr/product/alphashot-g2/` |
| `alphashot-pro-g2` | `/studio-photo/alphashot-pro-g2` | `orbitvu.fr/product/alphashot-pro-g2/` |
| `alphashot-xl-v2` | `/studio-photo/alphashot-xl-v2` | `orbitvu.fr/product/alphashot-xl/` |
| `alphashot-xl-wine-v2` | `/studio-photo/alphashot-xl-wine-v2` | `orbitvu.fr/product/alphashot-xl-wine/` |
| `alphashot-xl-pro-v2` | `/studio-photo/alphashot-xl-pro-v2` | `orbitvu.fr/product/alphashot-xl-pro/` |
| `alphadesk` | `/studio-photo/alphadesk` | `orbitvu.fr/product/alphadesk/` |
| `alphatable` | `/studio-photo/alphatable` | `orbitvu.fr/product/alphatable/` |
| `alphastudio-compact-v2` | `/studio-photo/alphastudio-compact-v2` | `orbitvu.fr/product/alphastudio-compact/` |
| `alphastudio-xxl-v2` | `/studio-photo/alphastudio-xxl-v2` | `orbitvu.fr/product/alphastudio-xxl/` |
| `fashion-studio-basic` | `/studio-photo/fashion-studio-basic` | `orbitvu.fr/product/fashion-studio/` |
| `fashion-studio` | `/studio-photo/fashion-studio` | `orbitvu.fr/product/fashion-studio/` |
| `bike-studio` | `/studio-photo/bike-studio` | `orbitvu.fr/product/bike-studio/` |
| `furniture-studio` | `/studio-photo/furniture-studio` | `orbitvu.fr/product/furniture-studio/` |
| `e-comm-studio-plus` | `/studio-photo/e-comm-studio-plus` | `orbitvu.fr/product/e-comm-studio-plus/` |

---

## 4. Methode de travail pour chaque page produit

### Etape 1 — Analyser la page Orbitvu equivalente
1. Naviguer sur `orbitvu.fr/product/[machine-id]/`
2. Noter : description narrative, features mises en avant, types de produits montres, video disponible
3. Identifier les differenciateurs specifiques a cette machine

### Etape 2 — Verifier les donnees dans machines.ts
1. `keyAdvantages` : ont-ils des descriptions ? Si non, les ajouter en s'inspirant d'Orbitvu + FAQ
2. `limitations` : sont-elles claires et bien formulees ?
3. `keyStats` : sont-ils definis ? Si non, les creer a partir des specs
4. `faqItems` : sont-ils suffisants ? (minimum 3-4)

### Etape 3 — Adapter les textes de la page
Le template (`page.tsx`) est generique et s'adapte automatiquement aux donnees machine.
Mais certains textes sont hardcodes et doivent etre verifies :

1. **Section Galerie** : les labels des placeholders doivent refleter les use cases de la machine
   - Ex: pour Fashion Studio → "Vetement ghost mannequin" au lieu de "Produit reflechissant"
2. **Section Description + Video** : le texte narratif est generique pour les petites machines.
   Pour les grandes machines (Fashion Studio, Bike Studio), il faut adapter le paragraphe.
   - Actuellement le texte parle de "lampes virtuelles" et "assistant IA" — ok pour les Alphashot
   - Pour les studios XL/Fashion, adapter (ex: "plateau tournant motorise", "eclairage continu")
3. **Section CTA Final** : le texte est generique et fonctionne pour toutes les machines

### Etape 4 — Build et verification visuelle
1. `npm run build` — zero erreur obligatoire
2. Verifier la page dans Chrome — screenshot de chaque section
3. Verifier l'alternance des fonds (jamais 2 identiques consecutifs)
4. Verifier que les AnimatedCounter fonctionnent (scroll reveal)

---

## 5. Composants et imports necessaires

```typescript
// Imports obligatoires pour la page produit
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { HeroSection } from '@/components/hero';

// Icones Lucide utilisees
import {
  CheckCircle, AlertTriangle, ArrowRight, ChevronRight, Sparkles, Camera,
  Ruler, Weight, Zap, Monitor, Award, CalendarDays, GraduationCap,
  BarChart3, MessageCircleQuestion, ArrowLeftRight, Play, ImageIcon, Eye
} from 'lucide-react';
```

---

## 6. Maps de traduction

### sectorLabels (dans la page)
```typescript
const sectorLabels: Record<string, { fr: string; en: string }> = {
  jewelry: { fr: 'Bijouterie', en: 'Jewelry' },
  cosmetics: { fr: 'Cosmetiques', en: 'Cosmetics' },
  electronics: { fr: 'Electronique', en: 'Electronics' },
  general: { fr: 'General', en: 'General' },
  footwear: { fr: 'Chaussures', en: 'Footwear' },
  bags: { fr: 'Maroquinerie', en: 'Bags' },
  wine: { fr: 'Vins & Spiritueux', en: 'Wine & Spirits' },
  fashion: { fr: 'Mode', en: 'Fashion' },
  furniture: { fr: 'Mobilier', en: 'Furniture' },
  sports: { fr: 'Sport', en: 'Sports' },
  cycling: { fr: 'Cycles', en: 'Cycling' },
  appliances: { fr: 'Electromenager', en: 'Appliances' },
  automotive: { fr: 'Automobile', en: 'Automotive' },
};
```

### featureLabels (dans la page)
```typescript
const featureLabels: Record<string, { fr: string; en: string }> = {
  packshot: { fr: 'Packshot', en: 'Packshot' },
  '360': { fr: 'Vue 360°', en: '360° View' },
  video: { fr: 'Video', en: 'Video' },
  'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin' },
  'flat-lay': { fr: 'Flat-Lay', en: 'Flat-Lay' },
  lifestyle: { fr: 'Lifestyle', en: 'Lifestyle' },
};
```

---

## 7. Regles strictes (rappel)

- **Ne JAMAIS ajouter de sections** non listees dans ce template sans validation utilisateur
- **Ne JAMAIS inventer de contenu** — utiliser les sources Orbitvu + FAQ + specs
- **Ne JAMAIS copier les sections de la Home** (Pain Points, Breather, etc.)
- **Terminologie** : "systemes" (pas "machines"), "Photo studio + IA", BlendAI.studio
- **type="button"** sur tout Button dans un form (sauf submit)
- **Traductions** : toujours FR + EN synchronisees
- **AnimatedCounter** : obligatoire pour les stats, jamais de texte statique
- **Bold selectif** : 2-3 mots en gras dans chaque paragraphe descriptif
- **Labels categorie** : chaque section majeure doit en avoir un
- **Titres display** : minimum `text-4xl lg:text-5xl` pour les headings de section

---

## 8. Comparaison structurelle avec Orbitvu (reference)

### Ce qu'Orbitvu fait et que nous faisons mieux
- **Stats animees** (AnimatedCounter) — Orbitvu n'en a pas
- **FAQ structuree** (SEO + Schema.org) — Orbitvu n'en a pas
- **Cross-selling** (systemes similaires) — Orbitvu n'en a pas
- **Formation integree** (Academy + Qualiopi/OPCO) — Orbitvu n'a qu'un lien contact
- **IA Ready banner** + lien BlendAI — differenciateur PackshotCreator

### Ce qu'Orbitvu fait et que nous devons rattraper
- **Galerie de resultats** — Orbitvu montre des exemples de photos produites (CRITIQUE)
- **Video demo** — Orbitvu a une video sur chaque page produit (HAUT)
- **Description narrative riche** — Orbitvu a des paragraphes avec bold selectif (FAIT)
- **Features detaillees avec photos** — Orbitvu montre les composants en detail
  → Pour nous : necessiterait des photos reelles, utiliser des placeholders en attendant
- **Vue 360° interactive** du produit — Orbitvu l'a sur chaque page
  → Pour nous : necessiterait une integration Orbitvu, hors scope actuel

### Priorite des visuels a ajouter (par machine)
1. Photo hero avec produit visible a l'interieur du studio
2. 3-4 exemples de photos produites par le studio
3. Video de demonstration
4. Photos des composants cles (eclairage, plateau, logiciel)
