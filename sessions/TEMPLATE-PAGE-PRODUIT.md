# Template Page Produit — Guide Complet

> Ce document est le template de reference pour toutes les pages produit du site PackshotCreator.
> Cree lors de la refonte de la page Alphashot Pro G2 (session du 28/03/2026).
> Inspire du design-system Apple, de notre Home redesignee, et des pages produit Orbitvu.
>
> **IMPORTANT** : Toutes les pages produit partagent le MEME code source
> (`app/[lang]/studio-photo/[slug]/page.tsx`). Le layout est commun — seules les DONNEES
> changent par machine (dans `machines.ts`). Ce template documente ce layout commun et
> explique comment enrichir les donnees pour chaque machine.

---

## 1. Architecture des sections (ordre definitif)

| # | Section | Fond | Layout | Obligatoire |
|---|---------|------|--------|-------------|
| 1 | Hero Product | `bg-future-dusk-900` (dark) | Split HeroSection | Oui |
| 2 | IA Ready Banner | `gradient amber→peri` | Horizontal icon+text+CTA | Si `isIAReady` |
| 3 | **Product Story** | `bg-white` | Centre Apple + bento grid 2 rows | Oui |
| 4 | Key Stats Ribbon | `bg-future-dusk-900` (dark) | 3 cols AnimatedCounter | Si `keyStats` |
| 5 | Avantages cles | `bg-white` | Featured dark + 2-col grid | Oui |
| 6 | **Specs & Use Cases** | `bg-future-dusk-900` (dark) | Split 7/5 (table + glassmorphism) | Oui |
| 7 | Systemes similaires | `bg-neutral-50` | Grid 3 colonnes | Si similaires |
| 8 | Formation Academy | `bg-white` | Split 7/5 + carte gradient | Oui |
| 9 | FAQ | `bg-neutral-50` | Split sticky 4/8 + accordion | Si `faqItems` |
| 10 | CTA Final (ADN) | `bg-black` | 2 cartes (peri 3/5 + glass 2/5) | Oui |

### Rythme des fonds
```
dark → gradient → white → dark → white → dark → gray → white → gray → black
```
10 sections. Jamais 2 fonds identiques consecutifs. Aucun layout repete consecutivement.

### Carte des layouts (variete)
```
SPLIT → HORIZONTAL → CENTRE+BENTO → CENTRE+3COL → FEATURED+GRID →
SPLIT 7/5 → CENTRE+GRID → SPLIT 7/5 → SPLIT STICKY → CENTRE+2CARTES
```

---

## 2. Checklist par section

### 2.1 Hero Product
- Layout `split` via composant `HeroSection`
- Badge retour `< Tous les studios` en haut
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

### 2.3 Product Story (centre Apple + bento grid)
Fusion de l'ancienne galerie + description. Une seule section avec 2 niveaux.

**Niveau 1 — Heading centre Apple-style**
- Label : `machine.nom` en uppercase tracking
- Titre : `text-4xl lg:text-6xl` — "Studio photo IA pour la photographie de produits"
- Paragraphe descriptif centre avec bold selectif (`lampes virtuelles`, `assistant IA intelligent`)
- Grande respiration (`mb-16 lg:mb-24`) entre heading et bento

**Niveau 2 — Bento grid en 2 rows**
- Row 1 (grid 12 cols) : Packshot placeholder 7 cols (h-[420px]) + Video placeholder 5 cols (dark, Play button, badge "VIDEO DEMO")
- Row 2 (grid 3 cols) : 360° placeholder + Produit reflechissant placeholder + Tuile texte (gradient peri, "Premier studio IA au monde", icone Sparkles)
- Chaque cellule a un badge en bas a gauche (Packshot, 360°, Verre & metal, etc.)
- **1 seul placeholder video** dans toute la page (ici dans la bento grid)

**Pour adapter par machine** : le texte narratif parle de "lampes virtuelles" et "assistant IA"
— ok pour les Alphashot. Pour les grands studios, adapter le paragraphe.

### 2.4 Key Stats Ribbon
- Label categorie : "En chiffres" / "By the numbers"
- **AnimatedCounter** (PAS de texte statique) : parsing avec `parseInt(value.replace(/[^0-9]/g,''))` + suffix
- Layout : 3 colonnes divisees par `md:divide-x md:divide-white/10`
- Padding : `py-20 lg:py-24`
- **Attention** : ne pas repeter les memes chiffres que la tuile bento (la tuile montre "Premier studio IA", pas un chiffre)

### 2.5 Avantages cles (featured + 2-col grid)
Layout a 2 niveaux — hierarchie visuelle forte.

**Heading centre** : label "Pourquoi ce systeme", titre display `text-4xl lg:text-6xl`

**Avantage 1 — Featured full-width** :
- Fond `bg-future-dusk-900` rounded-2xl, grid 2 cols
- Ghost number `text-7xl lg:text-8xl text-white/5`
- Titre `text-2xl lg:text-3xl` blanc + description `text-future-dusk-300`
- Placeholder image a droite (bg-white/5, prêt pour une vraie image)

**Avantages 2-3 — Grille 2 colonnes** :
- Fonds differencies : `bg-very-peri-50 border-very-peri-100` vs `bg-neutral-50 border-neutral-100`
- Ghost numbers `text-5xl lg:text-6xl`
- Titre + description

**Pour enrichir** : ajouter `description: { fr: '...', en: '...' }` dans `keyAdvantages` de chaque machine.
Sans description, seul le titre s'affiche (retrocompatible).

### 2.6 Specs & Use Cases (split 7/5 fusionné)
Anciennement 3 sections separees (Specs + Use Cases + CTA inter). Maintenant 1 seule section dark.

**Colonne gauche (7/12)** :
- Label "Fiche technique", titre `text-4xl lg:text-5xl` blanc
- Carte blanche `shadow-2xl` avec table de specs (tailleMax, poidsMax, capaciteJour, spaceRequired, studioFootprint)
- Section "Fonctionnalites" en tags badges emerald (Packshot, Vue 360°, Video...)

**Colonne droite (5/12)** — 3 cartes glassmorphism empilees :
- Carte 1 `bg-white/10` : "Cas d'usage ideaux" avec CheckCircle emerald + liste use cases
- Carte 2 `bg-white/10` : "Secteurs ideaux" avec tags `bg-very-peri-500/20`
- Carte 3 `bg-amber-500/10` : "Points d'attention" avec AlertTriangle amber + limitations

**Secteurs traduits** via `sectorLabels` map — ne JAMAIS afficher en anglais brut.

### 2.7 Systemes similaires
- Label : "Comparer", titre display `text-4xl lg:text-5xl`
- Grid 3 colonnes, SpringCard + ScrollReveal
- Chaque carte : image + nom + use cases + badges (prod/jour, taille max)
- Padding : `py-20 lg:py-32`

### 2.8 Formation Academy
- Label : "PackshotCreator Academy"
- Split 7/5 avec carte gradient peri a droite (Qualiopi + OPCO)
- 3 bullet points formation + 2 CTAs (Voir formations + Calendrier)
- Conforme au design-system — ne pas modifier

### 2.9 FAQ
- Label : "FAQ", titre `text-4xl lg:text-5xl` — "Questions frequentes"
- Split sticky 4/8 heading + accordion `<details>`
- Padding : `py-20 lg:py-32`

### 2.10 CTA Final (pattern ADN)
- Fond `bg-black` avec gradient radial subtil
- Label : "Passez a l'action", titre display `text-4xl lg:text-6xl`
- **2 cartes distinctes** :
  - Carte 1 (3/5) : gradient peri, titre + description + CTA blanc "Demander un devis"
  - Carte 2 (2/5) : glassmorphism, icone BarChart3, "Calculez votre ROI" + CTA outline

---

## 3. Donnees a enrichir dans machines.ts

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
Le 1er avantage est le "featured" (full-width dark) — le plus important en premier.

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

### 3.4 Machines deja enrichies
- **alphashot-pro-g2** : descriptions avantages ✅, keyStats ✅, faqItems ✅

### 3.5 Machines a enrichir (prochaines sessions)
Toutes les autres machines n'ont PAS de `description` dans leurs `keyAdvantages`.
La session doit :
1. Aller sur la page Orbitvu equivalente
2. Extraire les descriptions des avantages
3. Les ajouter dans `machines.ts`
4. Verifier visuellement que la page est conforme

---

## 4. Methode de travail pour chaque prochaine session

### Ce qui est DEJA FAIT (code commun, ne pas refaire)
- Layout des 10 sections (page.tsx)
- AnimatedCounter sur les stats
- Secteurs traduits FR
- CTA Final pattern ADN
- Bento grid Product Story
- Section fusionnee Specs & Use Cases
- Labels categorie sur toutes les sections

### Ce qu'il faut faire PAR MACHINE

**Etape 1 — Analyser la page Orbitvu equivalente**
1. Naviguer sur `orbitvu.fr/product/[machine-id]/`
2. Noter : description narrative, features, types de produits montres
3. Identifier les differenciateurs specifiques a cette machine

**Etape 2 — Enrichir machines.ts**
1. `keyAdvantages` : ajouter `description: { fr, en }` a chaque avantage
2. `limitations` : preciser (ex: "Taille limitee" → "Taille limitee a 35x35x40 cm")
3. `keyStats` : verifier qu'ils existent et sont pertinents
4. `faqItems` : verifier qu'il y en a minimum 3-4

**Etape 3 — Verifier le texte hardcode de Product Story**
Le paragraphe narratif parle actuellement de "lampes virtuelles" et "assistant IA".
C'est correct pour les Alphashot (IA Ready). Pour les machines sans IA :
- Adapter le texte ou le rendre conditionnel
- Ne PAS inventer — demander a l'utilisateur

**Etape 4 — Build et verification visuelle**
1. `npm run build` — zero erreur
2. Verifier la page dans Chrome
3. Verifier que les AnimatedCounter s'animent au scroll

---

## 5. Composants et imports

```typescript
import { AnimatedCounter, FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';
import { HeroSection } from '@/components/hero';

import {
  CheckCircle, AlertTriangle, ArrowRight, ChevronRight, Sparkles, Camera,
  Ruler, Weight, Zap, Monitor, Award, CalendarDays, GraduationCap,
  BarChart3, MessageCircleQuestion, ArrowLeftRight, Play, ImageIcon, Eye
} from 'lucide-react';
```

---

## 6. Maps de traduction (dans page.tsx)

### sectorLabels
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

### featureLabels
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

## 7. Regles strictes

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

## 8. Comparaison structurelle avec Orbitvu

### Ce que nous faisons mieux
- **Stats animees** (AnimatedCounter) — Orbitvu n'en a pas
- **FAQ structuree** (SEO + Schema.org) — Orbitvu n'en a pas
- **Cross-selling** (systemes similaires) — Orbitvu n'en a pas
- **Formation integree** (Academy + Qualiopi/OPCO) — Orbitvu n'a qu'un lien contact
- **IA Ready banner** + lien BlendAI — differenciateur PackshotCreator
- **Layout Apple-style** avec variete (featured, bento, split, sticky)

### Ce que nous devons rattraper (visuels)
- **Galerie de resultats** — placeholders en place, besoin de VRAIES photos
- **Video demo** — placeholder en place, besoin de la vraie video
- **Vue 360° interactive** du produit — necessiterait une integration Orbitvu

### Priorite des visuels a ajouter par machine
1. Photo hero avec produit visible a l'interieur du studio
2. 3-4 exemples de photos produites par le studio
3. Video de demonstration
4. Photos des composants cles (eclairage, plateau, logiciel)
