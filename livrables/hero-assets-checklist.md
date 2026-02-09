# Hero Assets Checklist - PO Review

## Statut actuel des assets hero

Toutes les images hero existantes sont en `/public/images/hero/` avec variantes responsives (sm/md/lg/xl) en AVIF.

### Images hero existantes (19 images)

| Page | Image actuelle | Formats dispo | Status |
|------|---------------|---------------|--------|
| Homepage | `hero-range-2025.avif` | AVIF + 4 variantes | OK |
| Studios Hub | `hero-studios-wide.avif` | AVIF + WebP + 4 variantes | OK |
| IA Photo Produit | `pillar-ia.avif` (illustrations/) | AVIF seul, pas de variantes | A optimiser |
| Academy | `pillar-formation.avif` (illustrations/) | AVIF seul, pas de variantes | A optimiser |
| Blog | `hero-blog.avif` | AVIF + WebP + 4 variantes | Non utilise (hero texte seul) |
| Contact | `hero-contact.avif` | AVIF + WebP + 4 variantes | Non utilise (hero texte seul) |
| A propos | `hero-a-propos.avif` | AVIF + WebP + 4 variantes | Non utilise (hero texte seul) |
| Industrie Hub | `hero-industries.avif` | AVIF + WebP + 4 variantes | OK |
| IA Lifestyle | `hero-ia-lifestyle.avif` | AVIF + WebP + 4 variantes | Non utilise |

### Images hero secteurs (12 images)

| Secteur | Image | Formats | Status |
|---------|-------|---------|--------|
| Automobile | `hero-secteur-automobile.avif` | AVIF + WebP + 4 variantes | OK |
| Bijoux | `hero-secteur-bijoux.avif` | AVIF + WebP + 4 variantes | OK |
| Chaussures | `hero-secteur-chaussures.avif` | AVIF + WebP + 4 variantes | OK |
| Cosmetiques | `hero-secteur-cosmetiques.avif` | AVIF + WebP + 4 variantes | OK |
| Food | `hero-secteur-food.avif` | AVIF + WebP + 4 variantes | OK |
| Hightech | `hero-secteur-hightech.avif` | AVIF + WebP + 4 variantes | OK |
| Jouets | `hero-secteur-jouets.avif` | AVIF + WebP + 4 variantes | OK |
| Mobilier | `hero-secteur-mobilier.avif` | AVIF + WebP + 4 variantes | OK |
| Mode | `hero-secteur-mode.avif` | AVIF + WebP + 4 variantes | OK |
| Pieces tech | `hero-secteur-pieces-tech.avif` | AVIF + WebP + 4 variantes | OK |
| Sante | `hero-secteur-sante.avif` | AVIF + WebP + 4 variantes | OK |
| Sport | `hero-secteur-sport.avif` | AVIF + WebP + 4 variantes | OK |

---

## Assets manquants / a fournir

### Videos hero (priorite haute)

Les composants `HeroVideo` et `HeroBackground` sont prets. Il manque les videos.

| Page cible | Video attendue | Specs |
|------------|---------------|-------|
| Homepage | Video studio Orbitvu en action (boucle) | MP4 H.264, 1920x1080, 10-15s loop, <5MB, muted |
| Studios Hub | Video gamme machines (optionnel) | MP4 H.264, 1920x1080, 10-15s loop, <5MB, muted |

**Pour chaque video :**
- Poster image (premier frame en AVIF, 1920x1080)
- Compresser a <5MB pour mobile
- Format: MP4 H.264 pour compatibilite universelle

### Images background full-bleed (priorite moyenne)

Ces pages utilisent actuellement un gradient CSS seul. Une image background rendrait le hero plus impactant :

| Page | Image suggeree | Dimensions |
|------|---------------|------------|
| Homepage | Photo studio ambiance (en plus de la video) | 1920x1080 + variantes sm/md/lg/xl |
| Academy | Photo session formation | 1920x1080 + variantes |
| A propos | Photo equipe Sysnext/showroom | 1920x1080 + variantes |
| Contact | Photo accueil/bureaux | 1920x1080 + variantes |
| Blog | Photo ambiance creative | 1920x1080 + variantes |

### Images media zone droite (split layout)

Ces images sont deja en place mais pourraient etre ameliorees :

| Page | Image actuelle | Amelioration suggeree |
|------|---------------|----------------------|
| IA Photo Produit | `pillar-ia.avif` (640x480) | Photo before/after IA ou render 3D |
| Academy | `pillar-formation.avif` (640x480) | Photo reelle session formation |

---

## Specifications techniques des images

### Images hero (full-bleed background)
- **Format** : AVIF (prioritaire), WebP (fallback)
- **Dimensions base** : 1920x1080
- **Variantes responsives** (nommage : `{nom}-sm.avif`, `-md.avif`, `-lg.avif`, `-xl.avif`) :
  - sm : 640x360
  - md : 1024x576
  - lg : 1440x810
  - xl : 1920x1080
- **Poids cible** : <200KB par variante, <500KB pour xl
- **Ratio** : 16:9

### Images media zone droite (split layout)
- **Dimensions** : 640x480 minimum, 720x520 ideal
- **Format** : AVIF
- **Poids** : <150KB
- **Style** : fond transparent ou detourable, sujet centre

### Videos hero
- **Format** : MP4 H.264
- **Dimensions** : 1920x1080
- **Duree** : 10-15 secondes, boucle seamless
- **Poids** : <5MB
- **Audio** : aucun (muted)
- **Poster** : premier frame en AVIF, memes dimensions

---

## Composant HeroImage - utilisation des variantes

Le composant `HeroImage` (`components/hero/HeroImage.tsx`) charge automatiquement les variantes responsives si elles existent :

```
(max-width: 640px)  -> {basePath}-sm.avif
(max-width: 1024px) -> {basePath}-md.avif
(max-width: 1440px) -> {basePath}-lg.avif
Default             -> {basePath}-xl.avif
```

Les images existantes dans `/public/images/hero/` ont deja ces variantes. Toute nouvelle image doit suivre ce pattern de nommage.
