# Session S5 : Integration images dans le code

## Objectif
Integrer les images generees par Seb dans le code du site. Modifier les layouts pour accueillir les visuels selon leur type (A = transparent flottant, B = full-width background). Redimensionner les images blog surdimensionnees.

## Prerequis
- S1-bis termine : le fichier `livrables/hero-assets-checklist.md` contient les specs completes (type, emplacement, dimensions, nom de fichier)
- Seb a genere les images et les a placees dans `public/images/`
- S2 termine : les fixes responsive ont ete appliques si necessaire

## Contexte projet

**Dossier projet** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

**Design "Studio Light"** : Chaque section a un layout unique. Les images doivent s'integrer dans ce design, pas le casser. La page Studios (`app/[lang]/studios-photo-automatises/page.tsx`) est la REFERENCE qualite — lire cette page pour comprendre comment les images sont integrees.

## Types d'images et leur integration

### Type A : AVIF transparent flottant avec ombre

L'image "flotte" dans le layout avec son ombre naturelle. Pas de fond, pas de border-radius, pas d'overflow-hidden.

**Pattern d'integration :**
```tsx
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SpringCard from '@/components/animations/SpringCard';

{/* Image flottante dans un layout split */}
<ScrollReveal offset={40}>
  <SpringCard>
    <Image
      src="/images/illustrations/nom-image.avif"
      alt="Description accessible"
      width={800}
      height={800}
      className="w-full h-auto"
      loading="lazy"
    />
  </SpringCard>
</ScrollReveal>
```

**Regles type A :**
- Utiliser `<Image>` Next.js avec width/height explicites (pas fill)
- Wrapper dans SpringCard si l'image est dans une carte interactive
- Wrapper dans ScrollReveal si l'image doit avoir un effet parallax
- NE PAS ajouter `rounded-*` ni `overflow-hidden` (l'ombre doit deborder)
- NE PAS ajouter de fond (bg-*) derriere l'image

### Type B : Photo full-width arriere-plan

L'image couvre toute la section en arriere-plan, avec un overlay pour la lisibilite du texte.

**Pattern d'integration :**
```tsx
<section className="py-16 lg:py-28 relative overflow-hidden">
  {/* Image background */}
  <Image
    src="/images/backgrounds/nom-image.avif"
    alt=""
    fill
    className="object-cover"
    loading="lazy"
  />
  {/* Overlay pour lisibilite */}
  <div className="absolute inset-0 bg-future-dusk-900/80" />
  {/* Contenu par-dessus */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
    {/* ... contenu texte ... */}
  </div>
</section>
```

**Regles type B :**
- Utiliser `<Image fill>` avec `object-cover`
- Toujours ajouter un overlay semi-transparent pour la lisibilite
- Le `alt` peut etre vide ("") si l'image est purement decorative
- La section doit avoir `relative overflow-hidden`
- Le contenu doit avoir `relative` pour passer au-dessus de l'overlay

## Images blog surdimensionnees a redimensionner

2 images dans `public/images/blog/` sont enormes et doivent etre redimensionnees :
- `blog/article-ia-lumieres-virtuelles.avif` : 6720x4480, 389 KB → redimensionner a 1344x896, cible <80 KB
- `blog/article-multi-camera-3d.avif` : 8688x5792, 268 KB → redimensionner a 1344x896, cible <80 KB

Utiliser sharp (deja installe dans le projet) :
```bash
npx sharp -i public/images/blog/article-ia-lumieres-virtuelles.avif -o public/images/blog/article-ia-lumieres-virtuelles.avif --width 1344 --quality 70 --format avif
```

## Methode de travail

1. Lire `livrables/hero-assets-checklist.md` — c'est la source de verite pour les images
2. Verifier que les images sont presentes dans `public/images/`
3. Pour chaque image :
   a. Identifier la page et la section cible dans le checklist
   b. Ouvrir le fichier .tsx de la page
   c. Integrer l'image selon le type (A ou B) en suivant les patterns ci-dessus
   d. Verifier que l'import Image est present
   e. Verifier le rendu en lancant un build (`npm run build`)
4. Redimensionner les 2 images blog surdimensionnees
5. Mettre a jour le checklist (statuts "A GENERER" → "EN PLACE")

## Fichiers modifiables
- Tous les fichiers `app/[lang]/**/*.tsx` — pour integrer les images
- `components/templates/PackshotLandingTemplate.tsx` — si des images template sont a integrer
- `public/images/**` — ajout/optimisation d'images
- `livrables/hero-assets-checklist.md` — mise a jour des statuts

## Fichiers INTERDITS
- `messages/fr.json`, `messages/en.json` — pas de changement de traductions
- `components/animations/**` — pas de modification des composants motion
- `components/seo/**` — pas de modification du Schema.org

## Livrable
- Toutes les images integrees selon le checklist
- Images blog surdimensionnees redimensionnees
- Build OK (`npm run build` sans erreur)
- Rapport dans `sessions/S5-rapport-images.md` avec la liste des images integrees et les modifications de code
- `livrables/hero-assets-checklist.md` mis a jour (statuts actualises)
