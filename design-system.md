# Design System PackshotCreator

> Ce document est la reference design pour toutes les sessions de travail sur le site.
> Il documente l'ADN visuel commun et les PRINCIPES de design.
> Les patterns decrits ici sont des outils disponibles, PAS une checklist a appliquer partout.
> Chaque page a sa propre structure et ses propres besoins.

---

## 1. Philosophie

Le site vend des systemes photo automatises a 15-50K EUR. Le design doit etre **premium, epure, et a la hauteur du prix**.

**Inspiration Apple — les PRINCIPES, pas les patterns :**
- Hierarchie typographique forte : label categorie → titre display → texte avec bold selectif
- Respiration : espaces genereux, pas de surcharge, 1 idee par section
- Visuels immersifs : les images dominent, le texte accompagne
- Animations narratives : chaque animation sert un propos, rien de gratuit
- Variete de layouts : jamais deux sections consecutives identiques
- Contraste de fonds : le rythme des fonds raconte une histoire (voir section 2)

**CE QUE CA NE VEUT PAS DIRE :**
- Ne PAS copier les sections de la Home sur d'autres pages
- Ne PAS ajouter des sections qui n'existent pas dans la page originale
- Ne PAS inventer du contenu (chiffres, textes, sections)
- Chaque page a deja sa structure et son contenu. On ameliore le DESIGN, pas la structure.

---

## 2. Palette de couleurs

### Couleurs primaires
| Token | Hex | Usage |
|---|---|---|
| `primary-orbitvu` / `very-peri-500` | #6667AB | CTA primaires, accents, liens |
| `secondary-orbitvu` / `future-dusk-500` | #4C5578 | Liens secondaires, texte accentue |
| `heading-dark` | #001D26 | Titres |
| `text-dark` | #0D171A | Corps de texte |
| `neutral-medium` | #546E7A | Texte secondaire, descriptions |

### Fonds de section — Rythme narratif
Le rythme des fonds est **narratif, pas mecanique**. Deux sections claires peuvent se suivre si elles sont visuellement distinctes. Les fonds sombres sont reserves aux moments premium/emotionnels.

| Fond | Token / Valeur | Usage |
|---|---|---|
| Blanc pur | `bg-white` | Sections de contenu standard |
| Teinte froide | `bg-future-dusk-0` (#F4F5F8) | Distinguer du blanc sans dramatiser |
| Teinte violette | `bg-very-peri-50` (#F0F0F7) | Touche de personnalite |
| Gris clair | `bg-bg-light-gray` (#F8FAFB) | Cards internes, PAS comme fond de section |
| Dark standard | `bg-future-dusk-900` (#0F1118) | Sections dark classiques |
| Noir pur | `bg-black` | Moments premium (final CTA, social proof) |
| Gradients | `from-future-dusk-800 to-very-peri-800` | CTAs, banners |

**Quand changer un fond** : seulement si deux sections adjacentes ont le meme fond, ou si une section emotionnelle/premium est sur fond clair. Ne PAS changer un fond "parce que la Home fait comme ca".

### Accents disponibles
`accent-gold` (#FFB300), `accent-success` (#00C853), `accent-coral` (#FF6F61), `accent-cyan` (#62BBD3), `accent-lime` (#CBE857)

---

## 3. Typographie

### Echelle
| Contexte | Classes |
|---|---|
| Titre section majeure | `text-4xl lg:text-6xl font-heading font-bold` |
| Titre section secondaire | `text-3xl lg:text-4xl font-heading font-bold` |
| Titre de carte | `text-xl` ou `text-2xl font-heading font-bold` |
| Corps de texte | `text-lg text-neutral-medium leading-relaxed` |
| Labels categorie | `text-xs font-semibold uppercase tracking-[0.2em]` |
| Ghost numbers | `text-5xl lg:text-7xl font-heading font-bold text-neutral-100` |
| Stats geantes | `text-4xl sm:text-5xl lg:text-7xl font-heading font-bold` |

### Labels categorie
Ajouter un label au-dessus du titre de CHAQUE section existante qui n'en a pas :
```html
<span class="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-4 block">
  LABEL
</span>
```
Le label decrit la categorie de la section (ex: "NOS STUDIOS", "FAQ", "TEMOIGNAGES"). Il ne faut PAS inventer de nouvelles sections, juste ajouter le label aux sections existantes.

### Gradient de texte
Classe `.text-gradient-peri` — pour max 2-3 elements par page (stats bridge, stats d'accent).

### Bold selectif
Mettre en gras les 2-3 mots cles par paragraphe descriptif. L'oeil doit pouvoir scanner le bold et comprendre le message.

```tsx
{t.rich('section.description', {
  bold: (chunks) => <strong className="text-heading-dark font-semibold">{chunks}</strong>,
})}
```
```json
"description": "Capturez packshots en <bold>3 secondes</bold> avec une qualite <bold>constante</bold>."
```

**Regles** :
- Max 2-3 segments bold par paragraphe
- Bold = chiffres cles, resultats, mots d'impact business
- PAS bold = mots communs, articles, conjonctions

---

## 4. Animations

### Composants disponibles
| Composant | Usage |
|---|---|
| `FadeInView` (direction, delay) | Entree directionnelle |
| `ScrollReveal` (offset, scale) | Parallax au scroll, scale-in pour visuels |
| `TextReveal` (as, staggerSpeed) | Titre mot par mot |
| `SpringCard` (hoverY, hoverScale) | Micro-interactions hover |
| `StaggerContainer` + `StaggerItem` | Cascade |
| `AnimatedCounter` (end, prefix, suffix) | Compteur anime pour stats |

### Principes
1. **Varier les directions** : alterner left/right pour elements cote a cote, pas tout "up"
2. **Decaler les timings** : delay 0.1-0.15s entre elements sequentiels
3. **Scale-in pour les visuels** : `ScrollReveal scale` sur images produit et galleries
4. **Counter pour les stats** : chiffres proeminents → AnimatedCounter
5. **Pas d'animation gratuite** : si un element n'en beneficie pas, ne pas l'animer

---

## 5. Patterns de reference (Home)

> Ces patterns montrent COMMENT la Home a ete construite.
> Ils ne sont PAS a copier sur les autres pages.
> Ils illustrent les PRINCIPES a appliquer differemment selon chaque page.

### Ce qui est ADN commun (appliquer partout)
- Labels categorie au-dessus des titres de section
- Bold selectif dans les paragraphes descriptifs
- Titres display `text-4xl lg:text-6xl` sur sections majeures
- AnimatedCounter sur les stats proeminentes
- Animations directionnelles variees (pas tout "up")
- Rythme narratif des fonds (pas d'alternance mecanique)
- FAQ = split sticky heading + accordion, fond `bg-future-dusk-0`
- CTA final = asymetrique 3/5 + 2/5, fond `bg-black`, contenu DISTINCT entre les 2 cartes
- Padding sections : `py-20 lg:py-32` (standard), `py-16 lg:py-24` (compact)
- Responsive : toujours prefixer les grandes tailles (`text-4xl lg:text-6xl` jamais `text-6xl` seul)

### Ce qui est specifique a la Home (ne PAS copier)
- La section Pain Points avec 3 rows horizontales — c'est le layout choisi pour la HOME
- La section Breather full-bleed — un choix de la Home, pas une obligation
- Le merge de Why Automate dans Hybrid — decision specifique Home
- Les stats 25/500+/3sec/60-85% — donnees specifiques Home

---

## 6. Images

### Convention placeholder
Quand une image manque, utiliser un placeholder visible :
```html
<div class="w-full h-[Xpx] bg-neutral-50 flex items-center justify-center border border-neutral-100 rounded-xl">
  <ImageIcon class="w-8 h-8 text-neutral-300 mx-auto mb-1" strokeWidth={1} />
  <p class="text-xs text-neutral-300">Description + taille</p>
</div>
```

### Ou ajouter des images
Regarder les pages Apple pour comprendre le dimensionnement :
- Visuels produit dans les splits : ~600x500, ratio 6:5
- Images en haut de cartes : ~800x200, ratio 4:1
- Breather full-bleed : 100vw x 400px si la page le justifie
- Gallery : aspect 4:3

---

## 7. Responsive

- Padding sections : `py-20 lg:py-32` standard
- Gaps : `gap-4 md:gap-8` ou `gap-6 lg:gap-16`
- Tailles texte : TOUJOURS prefixer (`text-4xl lg:text-6xl`)
- CTAs : `h-12` standard, `h-14` hero, `px-6` a `px-8`
- `type="button"` sur tout Button dans un form (sauf submit)

---

## 8. Terminologie obligatoire

- "systemes" (jamais "machines")
- "Photo studio + IA" (jamais "hybride" seul)
- BlendAI.studio = solution proprietaire
- "PackshotCreator" (pas "Packshot Creator")

---

## 9. Anti-patterns

1. **Copier les sections de la Home** — Chaque page a sa propre structure. Ne PAS ajouter Pain Points, Breather, ou Social Proof si la page ne les a pas.
2. **Inventer du contenu** — Ne JAMAIS creer de chiffres, textes, ou sections. Si du contenu manque, DEMANDER a l'utilisateur.
3. **Grilles 3 colonnes identiques consecutives** — Varier les layouts entre sections similaires.
4. **Fond identique entre sections adjacentes** — Toujours un contraste visuel.
5. **Animations uniformes** — Varier directions et types.
6. **Titres trop petits** — Headings de section = `text-4xl lg:text-6xl` minimum.
7. **Paragraphes sans bold selectif** — Descriptions longues = 2-3 mots en gras.
8. **Sections sans label categorie** — Chaque section majeure a son label.
9. **Appliquer mecaniquement le design system** — Les regles sont des principes, pas une checklist.
