# SESSION 5D - Infrastructure Medias (peut tourner en parallele avec 5A et 5C)

**Modele requis : Claude Opus 4.6**
**Methode : Code-only (creation de composants)**
**Duree estimee : 1 session (~50K tokens)**
**Prerequis : `npm run dev -- -p 3333` pour verification**
**PARALLELISABLE avec 5A et 5C** : cette session cree des composants NOUVEAUX, sans modifier les pages existantes.

---

## INSTRUCTION CRITIQUE

**LIS CE FICHIER EN ENTIER AVANT DE FAIRE QUOI QUE CE SOIT.**

---

## CONTEXTE

Le site packshot-creator.com manque d'infrastructure pour les medias riches (videos, galeries, OG images dynamiques). Le PO gerera le remplacement des images placeholder par les vraies images a la fin. Cette session prepare les composants et l'infrastructure.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Stack
- Next.js 16.1.1, React 19, TypeScript, Tailwind v4, next-intl
- Images : `next/image`, format AVIF/WebP dans `/public/images/`
- Pas d'emojis, Lucide icons uniquement

---

## MISSION

Creer les **composants et l'infrastructure** necessaires pour les medias riches. Tu ne MODIFIES PAS les pages existantes (c'est le role de 5B). Tu crees des composants prets a l'emploi.

---

## SCOPE STRICT - FICHIERS AUTORISES

Tu peux CREER des fichiers dans :
```
components/media/              # Nouveaux composants medias
app/api/og/                    # Route API pour OG images dynamiques (si applicable)
```

Tu peux MODIFIER uniquement :
```
messages/fr.json               # Cles i18n pour les composants medias
messages/en.json               # Cles i18n pour les composants medias
```

**NE TOUCHE PAS** aux fichiers de pages (`app/[lang]/*/page.tsx`), aux composants existants hors `media/`, ni a `lib/`.

---

## COMPOSANTS A CREER

### 1. VideoFacade (`components/media/VideoFacade.tsx`)
Pattern "facade" pour les videos YouTube/Vimeo : affiche un thumbnail cliquable, charge le player uniquement au clic. Economise ~500KB de JS au chargement initial.

**Props** :
```typescript
interface VideoFacadeProps {
  videoId: string
  provider: 'youtube' | 'vimeo'
  title: string
  thumbnailUrl?: string          // Override du thumbnail auto
  aspectRatio?: '16/9' | '4/3'  // Default 16/9
  className?: string
}
```

**Comportement** :
- Affiche le thumbnail (auto-genere depuis YouTube/Vimeo ou custom)
- Overlay avec bouton play (icone Lucide `Play`)
- Au clic : remplace par l'iframe du player (autoplay)
- `loading="lazy"` sur le thumbnail
- Accessible : `aria-label`, focus visible
- Responsive : width 100%, aspect-ratio CSS

**Thumbnail auto** :
- YouTube : `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg`
- Vimeo : necessite API call ou thumbnail custom

### 2. ImageGallery (`components/media/ImageGallery.tsx`)
Galerie d'images responsive avec lightbox simple.

**Props** :
```typescript
interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    width: number
    height: number
    caption?: string
  }[]
  columns?: 2 | 3 | 4            // Default 3
  gap?: 'sm' | 'md' | 'lg'       // Default 'md'
  className?: string
}
```

**Comportement** :
- Grille responsive (columns desktop, 2 tablet, 1 mobile)
- `next/image` avec `sizes` correct pour chaque breakpoint
- Au clic sur une image : lightbox (modal plein ecran avec fond sombre)
- Navigation prev/next dans le lightbox (fleches + clavier)
- Fermeture : clic overlay, bouton X, touche Escape
- Caption sous chaque image dans la grille et dans le lightbox
- `loading="lazy"` sur toutes les images sauf la premiere
- Animations douces (transition opacity)

### 3. OG Image dynamique (`app/api/og/route.tsx`)
Route API Next.js qui genere des images OG dynamiques via `@vercel/og` (ImageResponse).

**Query params** :
```
/api/og?title=Mon+Article&type=blog&lang=fr
/api/og?title=Alphashot+Pro+G2&type=product&lang=fr
/api/og?title=Academy&type=page&lang=fr
```

**Design** :
- 1200x630px
- Fond gradient Future Dusk (comme le hero)
- Logo PackshotCreator en haut a gauche
- Titre en blanc, police bold, max 3 lignes
- Badge type (Blog, Produit, Formation, etc.) en Very Peri
- Texte "packshot-creator.com" en bas

**Types** :
- `blog` : design article (icone article)
- `product` : design produit (icone camera)
- `page` : design generique
- `formation` : design academy (icone graduation)

**Note** : `@vercel/og` est deja inclus dans Next.js 16. Verifier avec `next/og`.

### 4. BeforeAfterSlider (`components/media/BeforeAfterSlider.tsx`)
Slider interactif avant/apres pour montrer l'impact de l'IA ou de la retouche.

**Props** :
```typescript
interface BeforeAfterSliderProps {
  before: { src: string; alt: string; label?: string }
  after: { src: string; alt: string; label?: string }
  width: number
  height: number
  initialPosition?: number       // 0-100, default 50
  className?: string
}
```

**Comportement** :
- 2 images superposees, divisees par un slider vertical draggable
- Labels "Avant" / "Apres" (ou custom) dans les coins
- Drag sur le slider pour reveler plus/moins de chaque image
- Touch support (mobile)
- Accessible : slider avec `role="slider"`, `aria-valuemin/max/now`
- `next/image` pour les deux images
- Fallback reduce motion : afficher les 2 images cote a cote

**Note** : un composant `BeforeAfter.tsx` existe dans `components/shared/`. Le lire d'abord pour voir s'il peut etre ameliore plutot que d'en creer un nouveau.

### 5. Barrel export (`components/media/index.ts`)
```typescript
export { VideoFacade } from './VideoFacade'
export { ImageGallery } from './ImageGallery'
export { BeforeAfterSlider } from './BeforeAfterSlider'
```

---

## REGLES

1. **Build** : `npm run build` doit passer
2. **Tests existants** : ne doivent pas casser
3. **SSR-safe** : tous les composants interactifs doivent etre `'use client'`
4. **Performance** : lazy loading, pas de bundle JS inutile au chargement
5. **Accessibilite** : ARIA labels, focus visible, keyboard navigation
6. **Pas de dependances externes** : tout en code natif (pas de lightbox lib, pas de slider lib)
7. **i18n** : labels via `next-intl` (ou props pour la flexibilite)

---

## OUTPUT ATTENDU

### Rapport
Ecrire dans `livrables/prompts-sessions/S5D-RAPPORT.md` :

```markdown
# Rapport Session 5D - Infrastructure Medias

## Resume
- Composants crees : X/4
- Route API : OUI/NON
- Build : OK/FAIL

## Detail

### 1. VideoFacade
- Statut : FAIT / NON FAIT
- Fichier : components/media/VideoFacade.tsx
- Lignes : X
- Features : [liste]

[... pour chaque composant ...]

## Utilisation
Exemples d'integration pour la session 5B :
[code snippets d'utilisation de chaque composant]

## Recommandations
[...]
```

---

## REGLES ANTI AUTO-COMPACT

1. **Creer dans l'ordre** : VideoFacade -> ImageGallery -> OG Route -> BeforeAfterSlider
2. **Build apres chaque composant**
3. **Si le contexte approche des 80%** : ecrire le rapport et STOP
4. **Verifier** le composant existant `components/shared/BeforeAfter.tsx` AVANT de creer BeforeAfterSlider
