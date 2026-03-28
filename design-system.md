# Design System PackshotCreator

> Ce document est la reference pour toutes les sessions de travail sur le site.
> Il contient l'ADN design commun, les regles, les patterns, et la methodologie a suivre.
> Chaque session travaillant sur une page doit lire ce document EN ENTIER avant de commencer.

---

## 1. Philosophie

Le site vend des systemes photo automatises a 15-50K EUR. Le design doit etre **premium, epure, et a la hauteur du prix**. On s'inspire des techniques Apple (hierarchie typographique, respiration, visuels immersifs, animations narratives) tout en gardant notre identite (palette Very Peri / Future Dusk, tonalite B2B experte).

**Principes fondamentaux :**
- 1 idee = 1 ecran. Chaque section doit avoir un message clair.
- Jamais deux sections consecutives avec le meme layout.
- L'animation sert le storytelling, pas la decoration.
- Le texte est la fondation — les visuels amplitient, ils ne remplacent pas.
- Chaque element gagne sa place. Si un element ne sert pas la conversion, il n'a rien a faire la.

---

## 2. Palette de couleurs

### Couleurs primaires
| Token | Hex | Usage |
|---|---|---|
| `primary-orbitvu` / `very-peri-500` | #6667AB | CTA primaires, accents, liens |
| `secondary-orbitvu` / `future-dusk-500` | #4C5578 | Liens secondaires, texte accentue |
| `heading-dark` | #001D26 | Titres (opacity 0.78) |
| `text-dark` | #0D171A | Corps de texte (opacity 0.8) |
| `neutral-medium` | #546E7A | Texte secondaire, descriptions |

### Fonds de section — Rythme narratif
**REGLE MAJEURE** : Le rythme des fonds est narratif, pas mecanique. Deux sections claires peuvent se suivre si elles sont visuellement distinctes. Les fonds sombres sont reserves aux moments premium/emotionnels.

| Fond | Token / Valeur | Usage |
|---|---|---|
| Blanc pur | `bg-white` | Sections de contenu standard |
| Teinte froide | `bg-future-dusk-0` (#F4F5F8) | FAQ, sections d'info qui doivent se distinguer du blanc |
| Teinte violette | `bg-very-peri-50` (#F0F0F7) | Sections qui veulent une touche de personnalite |
| Gris clair | `bg-bg-light-gray` (#F8FAFB) | Cards, conteneurs internes (PAS comme fond de section principal) |
| Dark standard | `bg-future-dusk-900` (#0F1118) | Sections dark classiques (testimonials, social proof) |
| Noir pur | `bg-black` | Moments premium/dramatiques (final CTA, hero alternative) |
| Gradients | `from-future-dusk-800 to-very-peri-800` | CTAs, banners accentues |

**Exemple de rythme (Home)** : dark hero → black → white → tinted → white → dark → white → tinted → black

### Accents sous-exploites (a utiliser avec parcimonie)
`accent-gold` (#FFB300) — badges, highlights
`accent-success` (#00C853) — checkmarks, validations
`accent-coral` (#FF6F61), `accent-cyan` (#62BBD3), `accent-lime` (#CBE857) — disponibles pour differencier les pages par couleur accent

---

## 3. Typographie

### Echelle
| Contexte | Classes | Taille resultante |
|---|---|---|
| Titre hero | `text-4xl sm:text-5xl lg:text-6xl` | 36→48→60px |
| Titre section **majeure** | `text-4xl lg:text-6xl` | 36→60px |
| Titre section secondaire | `text-3xl lg:text-4xl` | 30→36px |
| Titre de carte / sous-section | `text-xl` ou `text-2xl` | 20-24px |
| Corps de texte | `text-lg` | 18px |
| Texte secondaire / descriptions | `text-sm` ou `text-base` | 14-16px |
| Labels categorie | `text-xs uppercase tracking-[0.2em]` | 12px |
| Ghost numbers | `text-5xl lg:text-7xl` | 48→72px |
| Stats geantes | `text-4xl sm:text-5xl lg:text-7xl` | 36→72px |

### Familles
- `font-heading` (Inter) — Titres, stats, labels
- `font-body` (Roboto) — Corps de texte

### Gradient de texte
Classe CSS `.text-gradient-peri` pour les moments cles (stats, bridge phrases, titres d'accent).
- Usage : max 2-3 elements par page
- Jamais sur les CTA ou le corps de texte

### Labels categorie
**Chaque section majeure** doit avoir un label au-dessus du titre :
```html
<span class="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
  LABEL
</span>
```
Couleurs de labels : `text-primary-orbitvu` (defaut), `text-red-500` (problemes), `text-very-peri-400` (sur fond dark), `text-accent-gold` (badges produit).

### Bold selectif (technique Apple)
Dans les paragraphes descriptifs, mettre en gras les **2-3 mots cles** que l'oeil doit scanner.

**Implementation** : utiliser `t.rich()` de next-intl avec des balises `<bold>` dans les JSON de traduction.

```tsx
// Dans le composant
{t.rich('section.description', {
  bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
})}
```

```json
// Dans le fichier de traduction
"description": "Capturez packshots en <bold>3 secondes</bold> avec une qualite <bold>constante</bold>."
```

**Regles du bold selectif** :
- Max 2-3 segments bold par paragraphe
- Mettre en bold : chiffres cles, resultats, mots d'impact business
- Ne PAS mettre en bold : mots communs, articles, conjonctions
- Le bold doit fonctionner comme un "scan path" — on doit comprendre le message rien qu'en lisant les mots en gras

---

## 4. Animations — Composants et regles

### Composants disponibles
| Composant | Props cles | Usage |
|---|---|---|
| `FadeInView` | `direction` (up/down/left/right/none), `delay`, `duration` | Animation d'entree directionnelle |
| `ScrollReveal` | `offset`, `scale` (bool) | Parallax Y + opacity lies au scroll |
| `TextReveal` | `as` (h1-h3), `staggerSpeed` | Titre mot par mot |
| `SpringCard` | `hoverY`, `hoverScale` | Micro-interactions hover/tap |
| `StaggerContainer` + `StaggerItem` | `stagger`, `direction` | Animations en cascade |
| `AnimatedCounter` | `end`, `prefix`, `suffix`, `duration` | Compteur anime whileInView |

### Regles d'animation
1. **Varier les directions** — Ne pas tout faire "up". Alterner left/right pour les elements cote a cote, utiliser "right" pour les elements qui arrivent de la droite dans un split layout.
2. **Decaler les timings** — Utiliser `delay` pour que titre, texte et CTA arrivent sequentiellement. Ecart recommande : 0.1-0.15s entre elements.
3. **Scale-in pour les visuels** — Activer `scale` sur ScrollReveal pour les images produit, galleries, visuels immersifs. Ca donne un effet de "zoom in" subtil.
4. **Counter anime pour les stats** — Tout chiffre afiche de maniere proeminente devrait utiliser AnimatedCounter.
5. **Pas d'animation gratuite** — Si un element ne beneficie pas de l'animation, ne pas l'animer.

### Patterns d'animation par contexte
- **Split layout (texte gauche, visuel droite)** : texte `direction="left"`, visuel `direction="right"` ou `scale`
- **Cartes en grille** : `StaggerContainer` + `StaggerItem`
- **Cartes empilees** : chaque carte avec `FadeInView` et `delay` incremental
- **Titres de section** : `TextReveal` (mot par mot)
- **Stats** : `AnimatedCounter` dans un `StaggerContainer`
- **Pain points / lignes horizontales** : alterner `direction="left"` et `direction="right"`

---

## 5. Patterns de sections

### 5.1 Hero
- Layout : centre ou split
- Fond : gradient dark avec video/image background via `HeroSection` + `HeroVideo`/`HeroBackground`
- Badge au-dessus du titre (`accent-gold` par defaut)
- 2 CTAs max (primaire + secondaire)
- Micro-stats ou reassurance sous les CTAs
- `py-20 lg:py-28` (gere par HeroSection)

### 5.2 Social Proof (stats + logos)
- Fond : `bg-black` (premium)
- Stats : `AnimatedCounter` dans une grille 4 colonnes avec `lg:divide-x`
- Logos : bandeau horizontal, opacity 40%, hover 70%, `invert` pour blanc sur noir
- `py-16 lg:py-24`

### 5.3 Pain Points / Problematique
- Fond : `bg-white`
- Label rouge (`text-red-500`)
- Layout : **lignes horizontales full-width** (stat gauche + texte droite), PAS de grille 3 colonnes
- Chaque ligne a une bordure de couleur accent correspondante
- Bridge phrase en gradient sous les cartes
- Animations : directions alternees left/right

### 5.4 Approche / Piliers (pattern sticky split)
- Fond : teinte (`bg-future-dusk-0` ou `bg-very-peri-50`)
- Layout : `grid lg:grid-cols-12`, colonne sticky 4/12 gauche + cartes 8/12 droite
- Colonne sticky contient : label + titre display + subtitle (bold selectif) + CTAs + stats compactes (merged from other sections if applicable) + image placeholder
- Cartes droite : image en haut + icone + ghost number + titre + description (bold selectif)
- Ghost numbers : `text-5xl lg:text-7xl text-neutral-100`
- `py-20 lg:py-32`

### 5.5 Product Spotlight
- Fond : `bg-white`
- Layout : split 2 colonnes egalitaires
- Image gauche avec `ScrollReveal scale` (zoom-in subtil)
- Texte droite : badge + titre + description (bold selectif) + checklist + CTAs
- Gallery optionnelle en pleine largeur sous les 2 colonnes, avec `ScrollReveal scale`
- `py-20 lg:py-32`

### 5.6 Testimonials
- Fond : dark (`bg-future-dusk-900`) avec gradient subtil overlay
- Label en `text-very-peri-400`
- Layout **asymetrique** : 1 featured (col-span-7) + 2 stacked (col-span-5)
- Featured : stat geante en gradient + longue quote + attribution complete
- Cards : `bg-white/5 backdrop-blur-sm border-white/10`
- `py-20 lg:py-32`

### 5.7 Grille de liens (Industries, etc.)
- Fond : `bg-white`
- Label + titre display + subtitle
- Grille : `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
- Chaque item : icone + texte, fond `bg-bg-light-gray`, hover shadow + border peri
- Lien "voir tout" sous la grille avec ArrowRight
- `py-20 lg:py-32`

### 5.8 FAQ (split sticky)
- Fond : teinte (`bg-future-dusk-0`)
- Layout : `grid lg:grid-cols-12`, heading sticky 4/12 + accordion 8/12
- Accordion : `<details>` natif HTML, bordure qui change au open
- `py-20 lg:py-32`

### 5.9 Final CTA
- Fond : `bg-black` (premium) avec dot-pattern subtil
- Heading centre display + subtitle + micro-testimonial
- Layout asymetrique `lg:grid-cols-5` : carte primaire 3/5 (gradient peri) + carte secondaire 2/5 (glassmorphism)
- **Contenu distinct** entre les 2 cartes (ne JAMAIS dupliquer le meme texte)
- `py-20 lg:py-32`

### 5.10 Breather (image full-bleed)
- Pas de padding lateral, pas de max-width
- `h-[280px] lg:h-[400px]`
- `ScrollReveal scale` pour effet zoom-in au scroll
- Usage : entre 2 sections de contenu dense pour creer une pause visuelle
- Max 1 par page

---

## 6. Responsive

### Padding sections
- Standard : `py-20 lg:py-32`
- Compact (social proof, banners) : `py-16 lg:py-24`
- Hero : gere par le composant HeroSection

### Gaps
- Grilles : `gap-4 md:gap-8` ou `gap-6 lg:gap-16`
- Espace entre titre et contenu : `mb-14 lg:mb-16` ou `mb-16 lg:mb-20`

### Tailles de texte
Toujours prefixer les grandes tailles : `text-4xl lg:text-6xl`, jamais `text-6xl` seul.
Ghost numbers : `text-5xl lg:text-7xl` (jamais de grande taille sans prefix mobile).

### CTAs
- Hauteur : `h-12` standard, `h-14` hero
- Padding : `px-6` a `px-8`
- `type="button"` sur tout Button dans un form (sauf submit)

---

## 7. Images

### Tailles de reference (inspirees Apple)
| Contexte | Taille | Ratio |
|---|---|---|
| Breather full-bleed | 100vw x 400px | ~3.5:1 |
| Split layout (image cote) | ~600x500 | ~6:5 |
| Image dans carte Hybrid | ~800x200 | ~4:1 |
| Image dans colonne sticky | ~500x400 | 4:3 |
| Mini gallery | 33vw, aspect 4:3 | 4:3 |
| Image dans carte CTA | ~500x180 | ~2.8:1 |

### Convention placeholder
Quand une image n'est pas encore disponible, utiliser :
```html
<div class="w-full h-[Xpx] bg-neutral-50 flex items-center justify-center border border-neutral-100 rounded-xl">
  <div class="text-center">
    <ImageIcon class="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
    <p class="text-xs text-neutral-300">Description + taille recommandee</p>
  </div>
</div>
```

### Formats
- Photos : AVIF (priorite) ou WebP
- Icones/logos : SVG
- Images transparentes : AVIF avec canal alpha

---

## 8. Terminologie obligatoire

- "systemes" (jamais "machines")
- "Photo studio + IA" (jamais "hybride" seul)
- BlendAI.studio = solution proprietaire
- "PackshotCreator" (pas "Packshot Creator")

---

## 9. Methodologie pour les sessions de travail sur les pages

### Etape 1 — Comprendre la page
1. Lire le fichier source de la page (`app/[lang]/nom-page/page.tsx` ou equivalent)
2. Lire les traductions FR correspondantes dans `messages/fr.json`
3. Naviguer sur la page deployee (`https://sysnext.vercel.app/fr/...`) et la scroller entierement
4. Lister : nombre de sections, layout de chaque section, points forts/faibles

### Etape 2 — Analyser et comparer
1. **Lire ce design-system.md** — comprendre les regles et patterns
2. **Regarder la Home comme reference** (`app/[lang]/page.tsx`) — voir comment les patterns sont implementes
3. Identifier les problemes de la page : monotonie de layouts, sections trop denses, manque d'images, typographie trop timide, animations uniformes
4. **Si necessaire** (pages produit ou vitrine complexes), aller voir les pages Apple comme reference :
   - Home Apple : `https://www.apple.com/fr/` — bento grid, sections produit empilees
   - Page produit : `https://www.apple.com/fr/iphone-17e/` — label+titre+visuel, carrousel features, bento asymetrique
   - Page pro : `https://www.apple.com/fr/macbook-pro/` — fond noir, sticky nav, typo geante, video immersive

### Etape 3 — Planifier les modifications
Pour chaque section de la page :
1. Quel pattern de ce design-system s'applique ? (FAQ split, grille d'icones, split sticky, etc.)
2. Le layout est-il unique par rapport aux sections voisines ? Si deux sections se ressemblent, en changer une.
3. Quels fonds appliquer pour creer un rythme narratif ? (cf. section 2)
4. Ou placer les images/placeholders ?
5. Quels textes beneficieraient du bold selectif ?
6. Quelles animations choisir ? (cf. section 4)

### Etape 4 — Implementer
1. Modifier le fichier page.tsx section par section
2. Mettre a jour les traductions FR (ajouter labels, bold tags, nouvelles cles si besoin)
3. Creer les traductions EN equivalentes
4. Build (`npm run build`) pour verifier
5. NE PAS lancer le dev server sans demander
6. NE PAS utiliser le CLI Vercel

### Etape 5 — Verifier et commit
1. Verifier que le build passe sans erreur
2. Naviguer sur la page dans Chrome si deployee
3. Commit avec message descriptif
4. Push sur main

---

## 10. Decisions specifiques a chaque type de page

Chaque page a ses propres besoins. Voici un framework de decision :

### Pages produit (studios-photo-automatises, studio-photo/[slug])
- **Accent** : les visuels produit doivent dominer
- **Patterns cles** : Hero split avec machine, specs techniques, comparaison, CTA fort
- Considerer une barre sticky produit (nom + CTA "Demander une demo")
- Les sections dark sont pour les moments "wow" (specs, video)

### Pages pilier (ia-photo-produit, academy)
- **Accent** : explication du concept + preuve de valeur
- **Patterns cles** : Split sticky avec piliers, testimonials, FAQ
- Plus de texte explicatif, bold selectif important

### Pages industrie (industrie/[slug])
- **Accent** : specificite metier + resultats concrets
- **Patterns cles** : Hero avec visuel sectoriel, pain points specifiques au secteur, gallery de resultats
- Adapter les couleurs accent selon le secteur si pertinent

### Pages conversion (contact, calculateur)
- **Accent** : formulaire et reassurance
- Layout sobre, pas de surcharge visuelle
- Social proof compact (logos + 1 stat)

### La Home (reference)
- C'est la page vitrine. Elle doit donner une vue d'ensemble en ~9 sections.
- Elle a ete refaite avec tous les patterns decrits ci-dessus.
- **Fichier de reference** : `app/[lang]/page.tsx`

---

## 11. Ce qui est ADN commun vs specifique

### ADN commun (toutes les pages)
- Palette de couleurs et tokens
- Echelle typographique et font families
- Composants d'animation (FadeInView, ScrollReveal, etc.)
- Labels categorie au-dessus des titres de section
- Bold selectif dans les paragraphes descriptifs
- Pattern FAQ split sticky
- Pattern CTA asymetrique 3/5 + 2/5
- Regle `type="button"` sur les Button dans les forms
- Responsive prefixes obligatoires sur les grandes tailles

### Specifique a chaque page
- Choix des sections et leur ordre
- Nombre de sections
- Couleurs de fond (le rythme narratif)
- Taille et placement des images
- Contenu et copy
- Couleur accent de la page (si differente de very-peri)

---

## 12. Anti-patterns — A ne JAMAIS faire

1. **3 cartes identiques en grille** — C'est le probleme #1 qu'on a corrige sur la Home. Chaque triplet de contenus similaires doit avoir un layout unique (horizontal rows, asymetrique 7/5, stats typography-driven, split sticky).
2. **Dupliquer le contenu entre sections** — Si 2 sections disent la meme chose, en fusionner une dans l'autre.
3. **Fond identique entre 2 sections consecutives** — Toujours un contraste visuel entre sections adjacentes.
4. **Animations uniformes** — Varier directions, timings, types (fade vs scroll vs scale).
5. **Titres trop petits** — Les headings de section doivent etre en taille display (`text-4xl lg:text-6xl`), pas `text-3xl`.
6. **Sections sans label categorie** — Chaque section majeure a son label.
7. **Paragraphes sans bold selectif** — Les descriptions longues doivent avoir 2-3 mots cles en gras.
8. **Images manquantes** — Chaque page doit avoir au moins 3-4 visuels. Utiliser des placeholders si les images ne sont pas encore pretes.
