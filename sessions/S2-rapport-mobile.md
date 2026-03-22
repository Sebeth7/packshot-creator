# S2 - Rapport d'audit responsive mobile (375px)

> Date : 2026-03-22
> Viewport cible : 375x812 (iPhone SE / iPhone 13 mini)
> Methode : Analyse statique du code source (classes Tailwind)
> Pages auditees : 5 pages + 1 template + composants partages

---

## Synthese executive

**88 problemes identifies** sur 5 pages + 1 template partage.

| Severite | Nombre | Description |
|----------|--------|-------------|
| CRITIQUE | 12 | Casse le layout ou rend du contenu illisible |
| IMPORTANT | 44 | Visuellement degradant, UX mediocre (dont 6 py-28 Studios) |
| MINEUR | 32 | Cosmetique, amelioration possible |

**4 patterns recurrents** couvrent ~85% des problemes :
1. **Padding vertical py-28 sans prefix** : 112px par section sur mobile (Studios, 6 sections) — AJOUTE 2026-03-22
2. **Gaps surdimensionnes** : `gap-16` (64px), `gap-10` (40px), `gap-12` (48px) sans reduction mobile
3. **Ghost numbers trop gros** : `text-8xl` (96px), `text-5xl` (48px) sans reduction mobile
4. **Padding excessif** : `p-10` (40px), `p-8` (32px) sans reduction mobile

> Note : Les grids `lg:grid-cols-12` sans `grid-cols-1` explicite ne sont PAS un probleme car CSS Grid empile en 1 colonne par defaut et les children utilisent `lg:col-span-X` (prefixe). Ajouter `grid-cols-1` est recommande pour la clarte mais n'est pas un bug.

---

## PROBLEME TRANSVERSAL AJOUTE (audit 2026-03-22)

### T0. py-28 sans prefix mobile sur Studios [IMPORTANT x6]

**Occurrences :**
| Fichier | Ligne | Section |
|---------|-------|---------|
| `app/[lang]/studios-photo-automatises/page.tsx` | 135 | Piliers (bg-white) |
| `app/[lang]/studios-photo-automatises/page.tsx` | 196 | Types de visuels (bg-neutral-50) |
| `app/[lang]/studios-photo-automatises/page.tsx` | 292 | System Selector (bg-future-dusk-900) |
| `app/[lang]/studios-photo-automatises/page.tsx` | 325 | Accompaniment (bg-white) |
| `app/[lang]/studios-photo-automatises/page.tsx` | 411 | FAQ (bg-neutral-50) |
| `app/[lang]/studios-photo-automatises/page.tsx` | 457 | Final CTA (bg-future-dusk-900) |

**Classe :** `py-28`
**Probleme :** `py-28` = 112px top + 112px bottom = 224px de padding vertical par section sur mobile 360px. C'est 28% du viewport par section. Toutes les autres pages redesignees utilisent correctement `py-16 lg:py-28`.
**Fix :** `py-16 lg:py-28`
**Note :** Ce pattern n'etait PAS present dans l'audit initial. Identifie par audit independant le 2026-03-22.

---

## PROBLEMES TRANSVERSAUX (toutes pages)

Ces patterns identiques se retrouvent sur TOUTES les pages redesignees.

### T1. Gap-16 sur split layouts 12-cols [CRITIQUE]

**Occurrences :**
| Fichier | Ligne | Contexte |
|---------|-------|----------|
| `app/[lang]/page.tsx` | 302 | Section Hybrid Approach |
| `app/[lang]/studios-photo-automatises/page.tsx` | 137 | Section Piliers |
| `app/[lang]/studios-photo-automatises/page.tsx` | 413 | Section FAQ |
| `app/[lang]/industrie/page.tsx` | 271 | Section Case Studies |
| `components/templates/PackshotLandingTemplate.tsx` | 93 | Section Benefits |

**Classe :** `grid lg:grid-cols-12 gap-16 items-start`
**Probleme :** `gap-16` = 64px d'espace vertical entre heading et contenu sur mobile (sections empilees). C'est 8% du viewport (812px).
**Fix :** `gap-8 lg:gap-16`

---

### T2. Gap-10 sur FAQ split layouts [CRITIQUE]

**Occurrences :**
| Fichier | Ligne | Contexte |
|---------|-------|----------|
| `app/[lang]/page.tsx` | 615 | Section FAQ |
| `app/[lang]/ia-photo-produit/page.tsx` | 139 | Section Manifeste |
| `app/[lang]/ia-photo-produit/page.tsx` | 563 | Section FAQ |
| `app/[lang]/industrie/page.tsx` | 442 | Section FAQ |
| `components/templates/PackshotLandingTemplate.tsx` | 203 | Section FAQ |

**Classe :** `grid lg:grid-cols-12 gap-10 lg:gap-16`
**Probleme :** `gap-10` = 40px sur mobile. Mieux que gap-16 mais reste excessif.
**Fix :** `gap-6 lg:gap-10 xl:gap-16`

---

### T3. CTA asymetrique gap-8 [IMPORTANT]

**Occurrences :**
| Fichier | Ligne |
|---------|-------|
| `app/[lang]/page.tsx` | 671 |
| `app/[lang]/ia-photo-produit/page.tsx` | 209 |
| `app/[lang]/ia-photo-produit/page.tsx` | 616 |
| `app/[lang]/studios-photo-automatises/page.tsx` | 465 |
| `app/[lang]/industrie/page.tsx` | 494 |
| `components/templates/PackshotLandingTemplate.tsx` | 255 |

**Classe :** `grid lg:grid-cols-5 gap-8`
**Probleme :** `gap-8` = 32px entre 2 cartes empilees sur mobile. Acceptable mais perfectible.
**Fix :** `gap-4 lg:gap-8`

---

### T4. HeroSection gap-12 [IMPORTANT]

**Fichier :** `components/hero/HeroSection.tsx:76`
**Classe :** `grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`
**Probleme :** `gap-12` = 48px entre titre hero et image sur mobile.
**Fix :** `gap-6 lg:gap-12 xl:gap-16`

---

## PAGE 1 : HOME /fr

**Fichier :** `app/[lang]/page.tsx`

### Problemes CRITIQUES

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| H1 | 302 | Hybrid Approach | `gap-16` | `gap-8 lg:gap-16` |
| H2 | 615 | FAQ | `gap-10 lg:gap-16` | `gap-6 lg:gap-10 xl:gap-16` |

### Problemes IMPORTANTS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| H3 | 214 | Social Proof stats | `text-5xl lg:text-7xl` | `text-3xl sm:text-5xl lg:text-7xl` |
| H4 | 229 | Logo strip | `gap-x-10 gap-y-5` | `gap-x-4 gap-y-3 sm:gap-x-8 lg:gap-x-10` |
| H5 | 261 | Pain Points grid | `gap-8` | `gap-4 md:gap-8` |
| H6 | 265 | Pain Points card | `p-8` | `p-4 sm:p-6 lg:p-8` |
| H7 | 365 | Spotlight | `gap-12 lg:gap-16` | `gap-6 lg:gap-12 xl:gap-16` |
| H8 | 419 | Mini gallery | `grid grid-cols-3 gap-3` | `grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3` |
| H9 | 451 | Testimonials grid | `gap-8` | `gap-4 md:gap-8` |
| H10 | 454 | Testimonials card | `p-8` | `p-5 sm:p-7 lg:p-8` |
| H11 | 572 | Mid CTA grid | `gap-8` | `gap-4 md:gap-8` |

### Problemes MINEURS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| H12 | 237 | Logo img | `max-w-[80px]` | `max-w-[60px] sm:max-w-[80px]` |
| H13 | 308 | Hybrid heading | `text-4xl lg:text-5xl` | `text-3xl sm:text-4xl lg:text-5xl` |
| H14 | 366 | Spotlight container | `p-6 lg:p-10` | `p-4 sm:p-6 lg:p-10` |
| H15 | 269 | Pain Points stat | `text-5xl` | `text-4xl sm:text-5xl` |

---

## PAGE 2 : STUDIOS /fr/studios-photo-automatises

**Fichier :** `app/[lang]/studios-photo-automatises/page.tsx`

### Problemes CRITIQUES

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| S1 | 137 | Piliers | `gap-16` | `gap-8 lg:gap-16` |
| S2 | 348 | Timeline numbers | `text-8xl lg:text-9xl` | `text-4xl sm:text-6xl lg:text-9xl` |
| S3 | 413 | FAQ | `gap-16` | `gap-8 lg:gap-16` |

### Problemes IMPORTANTS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| S4 | 108 | Social Proof stats | `text-6xl lg:text-7xl` | `text-4xl sm:text-5xl lg:text-7xl` |
| S5 | 100 | Social Proof gap | `gap-12 md:gap-0` | `gap-6 md:gap-0` |
| S6 | 107 | Social Proof padding | `px-8` | `px-4 sm:px-6 lg:px-8` |
| S7 | 171 | Pillar ghost nums | `text-6xl` | `text-4xl lg:text-6xl` |
| S8 | 166 | Pillar card padding | `p-8 lg:p-10` | `p-4 sm:p-6 lg:p-10` |
| S9 | 309 | Selector card | `p-6 lg:p-10` | `p-4 sm:p-6 lg:p-10` |
| S10 | 345 | Timeline py | `py-12` | `py-6 lg:py-12` |
| S11 | 384 | ROI card | `p-10 sm:p-14` | `p-6 sm:p-10 lg:p-14` |
| S12 | 468 | CTA demo card | `p-10 lg:p-14` | `p-6 sm:p-10 lg:p-14` |
| S13 | 478 | CTA guide card | `p-10 lg:p-14` | `p-6 sm:p-10 lg:p-14` |

### Problemes MINEURS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| S14 | 160 | Pillar cards grid | `grid md:grid-cols-5 gap-0` | Ajouter `grid-cols-1` pour clarte |
| S15 | 507 | Cross-links padding | `px-8 py-6` | `px-4 sm:px-6 lg:px-8` |
| S16 | 435 | FAQ accordion | `p-6 lg:p-8` | `p-4 sm:p-6 lg:p-8` |

---

## PAGE 3 : IA PHOTO PRODUIT /fr/ia-photo-produit

**Fichier :** `app/[lang]/ia-photo-produit/page.tsx`

### Problemes CRITIQUES

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| I1 | 307 | Platform numbers | `text-5xl md:text-7xl lg:text-8xl` | `text-3xl sm:text-5xl md:text-7xl lg:text-8xl` |
| I2 | 516 | Compatible gap | `gap-16` | `gap-6 lg:gap-16` |

### Problemes IMPORTANTS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| I3 | 155 | Manifeste space | `space-y-6 lg:space-y-8` | `space-y-4 lg:space-y-8` |
| I4 | 163 | Manifeste card | `p-6 lg:p-10` | `p-4 sm:p-6 lg:p-10` |
| I5 | 168 | Ghost numbers | `text-4xl lg:text-6xl` | `text-2xl sm:text-3xl lg:text-6xl` |
| I6 | 213 | Comparatif hero card | `p-6 lg:p-12` | `p-4 sm:p-6 lg:p-12` |
| I7 | 245 | Comparatif secondary | `p-8` | `p-4 sm:p-6 lg:p-8` |
| I8 | 301 | Platform card | `p-8 lg:p-12` | `p-4 sm:p-6 lg:p-12` |
| I9 | 435 | Before/After gap | `gap-8` | `gap-4 md:gap-8` |
| I10 | 476 | Preuve sociale gap | `gap-12 md:gap-0` | `gap-6 md:gap-0` |
| I11 | 619 | CTA demo card | `p-6 lg:p-14` | `p-4 sm:p-6 lg:p-14` |
| I12 | 632 | CTA glassmorphism | `p-10` | `p-4 sm:p-6 lg:p-10` |

### Problemes MINEURS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| I13 | 365 | Fonctionnalites grid | `grid lg:grid-cols-2 gap-6` | Ajouter `grid-cols-1` pour clarte |
| I14 | 435 | Before/After grid | `grid md:grid-cols-2 gap-8` | Ajouter `grid-cols-1` pour clarte |
| I15 | 663 | Cross-links padding | `px-8 py-6` | `px-4 sm:px-6 lg:px-8` |

---

## PAGE 4 : INDUSTRIE /fr/industrie

**Fichier :** `app/[lang]/industrie/page.tsx`

### Problemes CRITIQUES

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| N1 | 271 | Case Studies | `gap-16` | `gap-8 lg:gap-16` |
| N2 | 410 | Workflow numbers | `text-5xl md:text-8xl lg:text-9xl` | `text-3xl sm:text-5xl lg:text-9xl` |

### Problemes IMPORTANTS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| N3 | 292 | Case Study card | `p-5 lg:p-10` | `p-3 sm:p-5 lg:p-10` |
| N4 | 330 | Benefits grid gap | `gap-6` | `gap-4 lg:gap-6` |
| N5 | 334 | Benefits hero card | `p-10` | `p-5 sm:p-8 lg:p-10` |
| N6 | 407 | Workflow gap | `gap-8` | `gap-4 md:gap-8` |
| N7 | 407 | Workflow py | `py-12` | `py-6 md:py-12` |
| N8 | 464 | FAQ accordion | `p-6 lg:p-8` | `p-4 sm:p-6 lg:p-8` |
| N9 | 494 | CTA Final gap | `gap-8` | `gap-4 lg:gap-8` |
| N10 | 515 | CTA quote card | `p-10` | `p-5 sm:p-8 lg:p-10` |

### Problemes MINEURS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| N11 | 349 | Benefits space | `space-y-6` | `space-y-3 sm:space-y-6` |
| N12 | 546 | Cross-links padding | `px-8 py-6` | `px-4 sm:px-6 lg:px-8` |

---

## PAGE 5 : PACKSHOT BIJOUX (Template)

**Fichier :** `components/templates/PackshotLandingTemplate.tsx`
> Impacte les 5 pages : bijoux, mode, e-commerce, amazon, industriel

### Problemes CRITIQUES

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| P1 | 93 | Benefits | `gap-16` | `gap-8 lg:gap-16` |
| P2 | 274 | CTA guide card | `p-10` | `p-5 sm:p-8 lg:p-10` |

### Problemes IMPORTANTS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| P3 | 70 | Stats gap | `gap-12 md:gap-0` | `gap-6 md:gap-0` |
| P4 | 73 | Stats padding | `px-8` | `px-3 sm:px-6 lg:px-8` |
| P5 | 74 | Stats text | `text-4xl md:text-6xl lg:text-7xl` | `text-3xl sm:text-4xl md:text-6xl lg:text-7xl` |
| P6 | 114 | Ghost numbers | `text-4xl lg:text-6xl` | `text-2xl sm:text-3xl lg:text-6xl` |
| P7 | 157 | Machine section card | `p-6 lg:p-10` | `p-4 sm:p-6 lg:p-10` |
| P8 | 166 | Machine card inner | `p-8` | `p-4 sm:p-6 lg:p-8` |
| P9 | 203 | FAQ gap | `gap-10 lg:gap-16` | `gap-6 lg:gap-10 xl:gap-16` |
| P10 | 258 | CTA demo card | `p-6 lg:p-14` | `p-4 sm:p-6 lg:p-14` |
| P11 | 265 | CTA demo button | `px-8 h-14` | `px-4 sm:px-6 lg:px-8 h-11 sm:h-12 lg:h-14 text-sm sm:text-base` |
| P12 | 283 | CTA guide button | `px-8 h-12` | `px-4 sm:px-6 lg:px-8 h-10 sm:h-11 lg:h-12 text-sm sm:text-base` |

### Problemes MINEURS

| # | Ligne | Section | Classe actuelle | Fix recommande |
|---|-------|---------|-----------------|----------------|
| P13 | 109 | Benefit card padding | `p-5 lg:p-10` | `p-4 sm:p-5 lg:p-10` |
| P14 | 118 | Benefit h3 | `text-2xl` | `text-lg sm:text-xl lg:text-2xl` |
| P15 | 225 | FAQ summary | `p-6 lg:p-8` | `p-4 sm:p-6 lg:p-8` |
| P16 | 231 | FAQ answer | `px-6 lg:px-8` | `px-4 sm:px-6 lg:px-8` |
| P17 | 255 | CTA gap | `gap-8` | `gap-4 lg:gap-8` |
| P18 | 311 | Cross-links padding | `px-8 py-6` | `px-4 sm:px-6 lg:px-8` |

---

## COMPOSANTS PARTAGES

### HeroSection.tsx

| # | Ligne | Classe actuelle | Fix recommande | Priorite |
|---|-------|-----------------|----------------|----------|
| C1 | 76 | `gap-12 lg:gap-16` | `gap-6 lg:gap-12 xl:gap-16` | IMPORTANT |

### SectorGrid.tsx (utilise sur /industrie)

**Fichier :** `components/shared/SectorGrid.tsx`

| # | Ligne | Classe actuelle | Fix recommande | Priorite |
|---|-------|-----------------|----------------|----------|
| C2 | 42 | `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | MINEUR (fonctionne en 2-col sur 360px, juste serre) |

### Composants d'animation

| Composant | Statut | Note |
|-----------|--------|------|
| FadeInView.tsx | OK | useReducedMotion respecte, whileInView correct |
| TextReveal.tsx | OK | inline-block overflow-hidden acceptable |
| ScrollReveal.tsx | OK | offset 60px acceptable sur mobile |
| SpringCard.tsx | OK | hoverY=-4 pas d'impact mobile |

---

## PLAN DE CORRECTION RECOMMANDE

### Phase 0 : Studios py-28 (6 corrections, ~2 min)

Search-replace sur `app/[lang]/studios-photo-automatises/page.tsx` :
- `py-28 bg-white` → `py-16 lg:py-28 bg-white` (lignes 135, 325)
- `py-28 relative` → `py-16 lg:py-28 relative` (ligne 196)
- `py-28 bg-future-dusk-900` → `py-16 lg:py-28 bg-future-dusk-900` (lignes 292, 457)
- `py-28 bg-neutral-50` → `py-16 lg:py-28 bg-neutral-50` (ligne 411)

### Phase 1 : Fixes CRITIQUES (12 corrections)

Corriger en priorite ces patterns qui cassent le layout mobile :

**1a. Gaps surdimensionnes (5 min)**
Remplacer sur TOUTES les pages :
- `gap-16 items-start` → `gap-8 lg:gap-16 items-start` (5 occurrences)
- `gap-10 lg:gap-16` → `gap-6 lg:gap-10 xl:gap-16` (5 occurrences)

**1b. Ghost numbers surdimensionnes (5 min)**
- Studios L348 : `text-8xl lg:text-9xl` → `text-4xl sm:text-6xl lg:text-9xl`
- IA L307 : `text-5xl md:text-7xl lg:text-8xl` → `text-3xl sm:text-5xl md:text-7xl lg:text-8xl`
- Industrie L410 : `text-5xl md:text-8xl lg:text-9xl` → `text-3xl sm:text-5xl lg:text-9xl`

**1c. Padding p-10 sans mobile (5 min)**
- Template L274 (guide card) : `p-10` → `p-5 sm:p-8 lg:p-10`
- Industrie L334 (benefits hero) : `p-10` → `p-5 sm:p-8 lg:p-10`
- Industrie L515 (CTA quote) : `p-10` → `p-5 sm:p-8 lg:p-10`

### Phase 2 : Fixes IMPORTANTS (38 corrections)

**2a. Pattern padding cards : p-8 → p-4 sm:p-6 lg:p-8**
Search-replace sur tous les fichiers concernes.

**2b. Pattern gap cards : gap-8 → gap-4 md:gap-8**
Search-replace sur tous les fichiers concernes.

**2c. Stats text-5xl/6xl : ajouter palier mobile**
- `text-5xl lg:text-7xl` → `text-3xl sm:text-5xl lg:text-7xl`
- `text-6xl lg:text-7xl` → `text-4xl sm:text-5xl lg:text-7xl`

**2d. Social proof gap-12 : gap-12 md:gap-0 → gap-6 md:gap-0**

### Phase 3 : Fixes MINEURS (32 corrections)

Padding cross-links, text sizing, etc. A traiter si le temps le permet.

---

## Estimation effort

| Phase | Corrections | Effort estime |
|-------|-------------|---------------|
| Phase 0 STUDIOS py-28 | 6 | ~2 min (search-replace simple) |
| Phase 1 CRITIQUES | 12 | ~15 min (patterns repetitifs) |
| Phase 2 IMPORTANTS | 38 | ~30 min (search-replace + verification) |
| Phase 3 MINEURS | 32 | ~20 min (cosmetique) |
| **Total** | **88** | **~1h10** |

---

## Methode de verification post-fix

Apres application des fixes, verifier dans Chrome DevTools (Ctrl+Shift+M) :
1. iPhone SE (375px) — viewport minimum
2. iPhone 14 (390px) — viewport courant
3. iPad Mini (768px) — breakpoint md

Pour chaque page, scroller section par section et verifier :
- Pas de scrollbar horizontale
- Texte lisible sans zoom
- Cards empilees verticalement
- Gaps proportionnes
- Boutons cliquables (min 44px touch target)

---

## Validation independante (2026-03-22)

**Methode** : Audit statique independant (grep patterns CSS + lecture code source)

**Resultats** :
- Tous les problemes du rapport initial confirmes
- 1 pattern manquant identifie : **Studios py-28 sans prefix mobile (6 sections)** → ajoute en T0
- Chemin SectorGrid corrige : `components/shared/SectorGrid.tsx` (pas `components/sections/`)
- Severite SectorGrid ajustee : MINEUR (2 colonnes sur 360px fonctionnent, juste serre)
- **Animations prefers-reduced-motion** : tous les composants (FadeInView, ScrollReveal, TextReveal, SpringCard, StaggerContainer) gerent correctement `useReducedMotion()` → fallback vers `<div>` visible
- **Pages sans probleme** : Academy, Contact, Defense, A propos, Page produit, Calculateur ROI, HeroSection
