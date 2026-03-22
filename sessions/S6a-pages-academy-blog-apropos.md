# Session S6a : Academy + Formations + A propos — Redesign "Studio Light"

## Objectif
Appliquer le redesign "Studio Light" (layouts varies et uniques par section) aux pages Academy hub, Formations Packshot, Formations IA, et A propos. Pas de Blog hub (hors scope).

## Contexte projet

**PackshotCreator** — 25 ans d'expertise photo produit, distributeur exclusif Orbitvu France/Suisse, equipe de photographes. Formation certifiee Qualiopi, financement OPCO 100%.

**Design "Studio Light"** : Chaque section a un layout UNIQUE (pas de grilles monotones identiques). Patterns disponibles :
- **Split 4/8** : heading sticky gauche, contenu droite
- **Bento grid** : hero card grande gauche + compactes empilees droite
- **Ruban stats** : fond sombre, chiffres geants 7xl blanc
- **Timeline editoriale** : numeros geants 9xl, separateurs
- **FAQ split** : heading sticky gauche, accordeon droite
- **CTA asymetrique** : 3/5 dominant + 2/5 secondaire

**Page de reference** : `app/[lang]/studios-photo-automatises/page.tsx` — LIRE EN ENTIER avant de coder.

**Dossier projet** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

**Composants motion disponibles** (dans `@/components/animations`) :
- `TextReveal` : titre mot par mot (stagger whileInView)
- `ScrollReveal` : parallax Y + opacity au scroll
- `SpringCard` : micro-interactions spring hover/tap
- `FadeInView` : fade-in directionnel (direction="up"|"down"|"left"|"right"|"none")
- `StaggerContainer` + `StaggerItem` : animations en cascade

## Pages a traiter

### 1. Academy Hub (`app/[lang]/academy/page.tsx`)

**Structure ACTUELLE (6 sections + hero) :**
| # | Section | Layout actuel | Ce qui change |
|---|---------|--------------|---------------|
| 1 | Hero | HeroSection split, image pillar-formation.avif | OK — garder, ajouter un tagline plus punchy |
| 2 | Qualiopi | Grid 2 cols (texte + 4 benefices) | Transformer en **ruban** style Social Proof : fond sombre, badges Qualiopi + OPCO geants, chiffres "100% finance OPCO" en 7xl |
| 3 | Formations | Grid 2 cols (2 cartes Packshot + IA) | Transformer en **split 4/8** : heading sticky gauche, 2 cartes empilees droite avec ScrollReveal + SpringCard |
| 4 | Tools | Grid 2 cols (Simulateur OPCO + Calendrier) | Transformer en **fond sombre** : gradient + dot pattern, 2 cartes blanches flottantes shadow-2xl |
| 5 | FAQ | Accordeon centre max-w-4xl | Transformer en **FAQ split** : heading sticky gauche, accordeon droite |
| 6 | CTA Final | Centre gradient | Transformer en **CTA asymetrique 3/5+2/5** |

**Namespace traduction** : `academyHub.*`
**Composants importes** : HeroSection, FadeInView, StaggerContainer, StaggerItem, Button, Image, SchemaOrg

### 2. Formations Packshot (`app/[lang]/academy/formations-packshot/page.tsx`)

**Structure ACTUELLE (5 sections + hero) :**
| # | Section | Layout actuel | Ce qui change |
|---|---------|--------------|---------------|
| 1 | Hero | HeroSection split, badges Qualiopi + OPCO | OK — garder tel quel |
| 2 | Benefits | Grid 3 cols (3 cartes centrees) | Transformer en **bento grid** : hero card grande gauche (Productivite x10) + 2 compactes empilees droite |
| 3 | Catalogue | Grid 3 cols (3 niveaux formation) | Garder mais ajouter **ScrollReveal + SpringCard** sur chaque carte, ghost numbers (01, 02, 03) |
| 4 | Qualiopi/OPCO | Grid 2 cols (Quali + OPCO) | Transformer en **split 4/8** : heading sticky gauche "Financement", contenu droite |
| 5 | CTA Final | Centre gradient very-peri | Transformer en **CTA asymetrique 3/5+2/5** |

**Namespace traduction** : `formation.catalogue.packshot_*`, `formation.qualiopi.*`, `formation.opco.*`
**Attention** : Beaucoup de texte est HARDCODE dans le fichier (pas dans messages/*.json). Migrer vers les fichiers de traduction si possible, sinon laisser et documenter.

### 3. Formations IA (`app/[lang]/academy/formations-ia/page.tsx`)

**Structure ACTUELLE (6 sections + hero) :**
| # | Section | Layout actuel | Ce qui change |
|---|---------|--------------|---------------|
| 1 | Hero | HeroSection split, gradient custom | OK — garder tel quel |
| 2 | Benefits | Grid 3 cols | Transformer en **bento grid** (meme pattern que Formations Packshot) |
| 3 | Catalogue | Grid 3 cols (3 niveaux) | Ajouter **ScrollReveal + SpringCard**, ghost numbers |
| 4 | What you'll learn | Grid 2 cols (4 features BlendAI) | Transformer en **timeline editoriale** : numeros geants 9xl, features en etapes |
| 5 | Qualiopi/OPCO | Grid 2 cols | Transformer en **split 4/8** (meme que Formations Packshot) |
| 6 | CTA Final | Centre gradient amber | Transformer en **CTA asymetrique 3/5+2/5** |

**Namespace traduction** : `formation.catalogue.ia_*`, donnees hardcodees `IA_COURSES`, `LEARN_FEATURES`

### 4. A propos (`app/[lang]/a-propos/page.tsx`)

**IMPORTANT** : Uniquement ameliorer le layout/design. NE PAS inventer de contenu (pas de bio fondateur, pas de photos equipe). Travailler avec le contenu existant.

**Structure ACTUELLE (6 sections + hero) :**
| # | Section | Layout actuel | Ce qui change |
|---|---------|--------------|---------------|
| 1 | Hero | HeroSection simple (pas split) | Passer en layout="centered" avec un background-image si disponible, sinon garder minimaliste |
| 2 | Mission | Centre avec gradient bg-very-peri-50 | Transformer en **split 4/8** : heading TextReveal gauche, texte mission droite |
| 3 | Values | Grid 3 cols (3 cartes) | Transformer en **bento grid** : hero card grande gauche + 2 compactes droite, ajouter SpringCard |
| 4 | Timeline | Alternating left/right avec ligne verticale | C'est deja un bon layout — **ameliorer** : ajouter ScrollReveal sur chaque item, numeros geants, fond alterne clair/sombre par item |
| 5 | Stats | Grid 4 cols, fond sombre | Transformer en **ruban stats** : chiffres 7xl blanc, gradient lateral, comme Home section 2 |
| 6 | CTA Final | Centre gradient very-peri | Transformer en **CTA asymetrique 3/5+2/5** |

**Namespace traduction** : `about.*`, `about.timeline.*`, `about.stats.*`

## Regles de design

1. **Chaque section doit avoir un layout UNIQUE** — pas 3 grilles 3 colonnes identiques qui se suivent
2. **Alternance fond clair / fond sombre** — eviter 3 sections blanches de suite
3. **Composants motion partout** — TextReveal pour les headings importants, ScrollReveal pour les elements qui arrivent au scroll, SpringCard pour les cartes interactives
4. **Pas de surcharge visuelle** — design epure, professionnel, moderne. Espaces blancs genereux
5. **Patterns CSS** : `py-16 lg:py-28`, `gap-10 lg:gap-16`, `p-5 lg:p-10`
6. **Ghost numbers** : toujours `text-4xl lg:text-6xl` (jamais de grande taille sans prefix mobile)
7. **Terminologie** : "systemes" (pas "machines"), "Photo studio + IA" (pas "hybride")

## Fichiers modifiables
- `app/[lang]/academy/page.tsx`
- `app/[lang]/academy/formations-packshot/page.tsx` (ou le dossier equivalent)
- `app/[lang]/academy/formations-ia/page.tsx` (ou le dossier equivalent)
- `app/[lang]/a-propos/page.tsx`
- Cles de traduction UNIQUEMENT pour ces pages dans `messages/fr.json` et `messages/en.json`

## Fichiers INTERDITS
- Pages batch 2 (studio-photo, contact, defense)
- Pages deja traitees (Home, Studios, IA, Industrie, packshot-*)
- Composants partages dans components/ (sauf si necessaire et documente)
- Blog hub (hors scope)

## Livrable
- 4 pages redesignees avec layouts "Studio Light" varies
- Build OK (`npm run build` sans erreur)
- Rapport dans `sessions/S6a-rapport.md` avec pour chaque page : sections modifiees, layout avant/apres, screenshots si possible
