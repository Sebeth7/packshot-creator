# SESSION 5E - Integration Medias dans les Pages

**Modele requis : Claude Opus 4.6**
**Methode : Code-only**
**Duree estimee : 1 session (~60K tokens)**
**Prerequis : `npm run dev` doit tourner**

---

## INSTRUCTION CRITIQUE

**LIS CE FICHIER EN ENTIER AVANT DE FAIRE QUOI QUE CE SOIT.**
Lis aussi les 3 fichiers UX/UI obligatoires avant toute implementation :
1. `livrables/BRANDBOOK_WEB_COMPLET.md` (sections pertinentes)
2. `livrables/BRANDBOOK_WEB_ANNEXES.md` (conventions images, animations)
3. `livrables/validation-brandbook.md` (recommandations)

---

## CONTEXTE

Le site packshot-creator.com a des composants media prets a l'emploi (crees en session 5D) mais pas encore integres dans les pages. De plus, les OG images dynamiques ne sont pas encore utilisees dans les metadata.

### Working directory
`/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

### Stack
- Next.js 16.1.1, React 19, TypeScript, Tailwind v4, next-intl FR/EN
- **Link** : `import { Link } from '@/i18n/routing'`
- **Pas d'emojis** -- Lucide icons uniquement

### Composants media disponibles (`components/media/`)
```tsx
import { VideoFacade, ImageGallery, BeforeAfterSlider } from '@/components/media';
```
Voir `livrables/prompts-sessions/S5D-RAPPORT.md` pour la doc et snippets.

### Route OG images
`/api/og?title=...&type=blog|product|page|formation&lang=fr|en` (1200x630, edge runtime)

---

## MISSION

3 chantiers dans cet ordre :

### CHANTIER 1 : OG Images dynamiques (toutes les pages)

Integrer la route `/api/og` dans les `generateMetadata()` de TOUTES les pages qui n'ont pas encore d'OG image custom.

**Methode** :
1. Grep toutes les fonctions `generateMetadata` dans `app/[lang]/`
2. Pour chaque page, verifier si `openGraph.images` est deja defini
3. Si non, ajouter :
```tsx
openGraph: {
  images: [{ url: `/api/og?title=${encodeURIComponent(title)}&type=${type}&lang=${lang}`, width: 1200, height: 630 }],
}
```

**Types a utiliser** :
- `blog` : articles blog
- `product` : fiches machines, studios hub
- `formation` : pages academy
- `page` : toutes les autres pages

### CHANTIER 2 : Inventaire images placeholders

Faire un inventaire exhaustif de toutes les images placeholder/manquantes dans le codebase.

**Methode** :
1. Grep pour `placeholder`, `ImagePlaceholder`, `.svg` dans les composants et pages
2. Grep pour les images referencees dans `/public/images/` qui n'existent pas
3. Lister les images attendues par le rapport 5B (9 images gallery/why-automate)

**Output** : ecrire l'inventaire dans `livrables/inventaire-images.md` avec :
- Chemin attendu
- Usage (quelle page, quelle section)
- Priorite (haute = visible above-the-fold, basse = deep page)
- Dimensions recommandees

### CHANTIER 3 : Integration composants media (la ou pertinent)

Identifier les emplacements ou VideoFacade, ImageGallery, BeforeAfterSlider seraient pertinents et les integrer.

**Candidats probables** :
- **IA Photo Produit** (`/ia-photo-produit`) : BeforeAfterSlider pour montrer avant/apres retouche IA
- **Fiches machines** (`/studio-photo/[slug]`) : ImageGallery pour la galerie produit (si images dispo)
- **Homepage** : VideoFacade pour une demo (si URL YouTube fournie)
- **A propos** : ImageGallery pour les locaux/equipe (si images dispo)

**IMPORTANT** : Si les images/videos ne sont pas encore fournies par le PO, preparer le code avec des placeholders clairs et documenter dans l'inventaire ce qui est attendu. Ne pas bloquer l'integration sur l'absence d'images.

---

## REGLES

1. **Build** : `npm run build` doit passer apres chaque chantier
2. **Tests** : les tests existants ne doivent pas casser
3. **i18n** : alt texts via next-intl
4. **Performance** : `loading="lazy"` sauf above-the-fold, `priority` pour hero images
5. **Brandbook** : respecter les 3 fichiers UX/UI

---

## OUTPUT

Ecrire dans `livrables/prompts-sessions/S5E-RAPPORT.md` + `livrables/inventaire-images.md`
