# Inventaire Complet des Images - PackshotCreator

**Date** : 2026-02-09
**Session** : S5E
**Total fichiers dans `/public/images/`** : 312

---

## 1. Images existantes dans /public/images/

### 1.1 Logos clients (`/images/logos/`) - 21 fichiers

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `packshot-creator-logo.svg` | 13K | Header.tsx, Footer.tsx, SchemaOrg.tsx | **Haute** (toutes pages) |
| `client-chanel.svg` | 69K | page.tsx (homepage, logos clients) | **Haute** |
| `client-amazon.svg` | 268K | page.tsx (homepage, logos clients) | **Haute** |
| `client-bosch.svg` | 462K | page.tsx (homepage, logos clients) | **Haute** |
| `client-essilor-luxottica.svg` | 85K | page.tsx (homepage, logos clients) | **Haute** |
| `client-valentino.svg` | 67K | page.tsx (homepage, logos clients) | **Haute** |
| `client-sandro.svg` | 19K | page.tsx (homepage, logos clients) | **Haute** |
| `client-seiko.svg` | 107K | page.tsx (homepage, logos clients) | **Haute** |
| `client-lidl.svg` | 232K | page.tsx (homepage, logos clients) | **Haute** |
| `client-wurth.svg` | 77K | page.tsx (homepage, logos clients) | **Haute** |
| `client-jagermeister.svg` | 153K | page.tsx (homepage, logos clients) | **Haute** |
| `client-castel-freres.svg` | 100K | NON REFERENCE dans le code | Basse |
| `client-europart.svg` | 159K | NON REFERENCE dans le code | Basse |
| `client-intersport.svg` | 115K | NON REFERENCE dans le code | Basse |
| `client-gs1.svg` | 163K | NON REFERENCE dans le code | Basse |
| `client-leclaireur.svg` | 62K | NON REFERENCE dans le code | Basse |
| `client-pure-red.svg` | 69K | NON REFERENCE dans le code | Basse |
| `client-sacla.svg` | 72K | NON REFERENCE dans le code | Basse |
| `client-severin.svg` | 129K | NON REFERENCE dans le code | Basse |
| `client-william-grant-sons.svg` | 133K | NON REFERENCE dans le code | Basse |
| `client-zoomalia.svg` | 35K | NON REFERENCE dans le code | Basse |

> **Note** : Les SVG logos clients sont tres lourds (462K pour Bosch, 268K pour Amazon). Optimisation recommandee.

### 1.2 Machines (`/images/machines/`) - 17 fichiers

#### Photos machines (12 fichiers .avif)

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `alphashot-micro-v2.avif` | 7,3K | studio-photo/[slug], machine-selector | **Haute** |
| `alphashot-360.avif` | 7,4K | studio-photo/[slug], machine-selector (aussi pour alphashot-g2) | **Haute** |
| `alphashot-pro-g2.avif` | 6,4K | page.tsx (homepage), studio-photo/[slug], machine-selector | **Haute** |
| `alphashot-xl.avif` | 5,9K | studio-photo/[slug], machine-selector (xl-v2, xl-wine-v2, xl-pro-v2) | **Haute** |
| `alphatable-alphadesk.avif` | 17K | studio-photo/[slug], machine-selector (alphadesk + alphatable) | Moyenne |
| `alphastudio-compact.avif` | 3,9K | studio-photo/[slug], machine-selector | Moyenne |
| `alphastudio-xxl.avif` | 2,9K | studio-photo/[slug], machine-selector | Moyenne |
| `fashion-studio.avif` | 7,0K | studio-photo/[slug], machine-selector (fashion-studio + fashion-studio-basic) | Moyenne |
| `bike-studio.avif` | 7,6K | studio-photo/[slug], machine-selector | Moyenne |
| `furniture-studio.avif` | 7,6K | studio-photo/[slug], machine-selector | Moyenne |
| `ecomm-studio-plus.avif` | 7,6K | studio-photo/[slug], machine-selector | Moyenne |
| `turntable-g2.avif` | 4,4K | **NON REFERENCE dans le code** | Basse |

#### Placeholders machines (5 fichiers .svg)

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `placeholder-small.svg` | 728B | Fallback potentiel (non reference directement) | Basse |
| `placeholder-medium.svg` | 803B | studio-photo/[slug] fallback (`imageMap[id] \|\| placeholder-medium.svg`) | Moyenne |
| `placeholder-large.svg` | 816B | Non reference directement | Basse |
| `placeholder-xlarge.svg` | 869B | Non reference directement | Basse |
| `placeholder-flatlay.svg` | 883B | Non reference directement | Basse |

### 1.3 Illustrations (`/images/illustrations/`) - 28 fichiers (14 paires avif+webp)

| Fichier | Taille (avif/webp) | Utilise dans | Priorite |
|---------|-------------------|-------------|----------|
| `pillar-hardware` | 21K / 20K | page.tsx, studios-photo, TailorMadeSection, formations-packshot | **Haute** |
| `pillar-ia` | 32K / 29K | page.tsx, studios-photo, ia-photo-produit, formations-ia | **Haute** |
| `pillar-formation` | 27K / 22K | page.tsx, studios-photo, academy | **Haute** |
| `ia-feature-background-generator` | 16K / 15K | ia-photo-produit | Moyenne |
| `ia-feature-integration` | 22K / 21K | ia-photo-produit | Moyenne |
| `timeline-innovation-6` | 21K / 20K | NON REFERENCE dans le code | Basse |
| `exemple-produit-sante-2` | 44K / 39K | NON REFERENCE dans le code | Basse |
| `exemple-produit-pieces-tech-3` | 41K / 31K | NON REFERENCE dans le code | Basse |
| `exemple-produit-pieces-tech-1` | 79K / 59K | NON REFERENCE dans le code | Basse |
| `exemple-produit-mode-3` | 82K / 51K | NON REFERENCE dans le code | Basse |
| `exemple-produit-mobilier-3` | 23K / 21K | NON REFERENCE dans le code | Basse |
| `exemple-produit-chaussures-3` | 31K / 30K | NON REFERENCE dans le code | Basse |
| `exemple-produit-chaussures-2` | 91K / 69K | NON REFERENCE dans le code | Basse |
| `exemple-produit-automobile-3` | 39K / 33K | NON REFERENCE dans le code | Basse |

> **Note** : Seuls les fichiers .avif sont references dans le code. Les .webp servent de fallback navigateur mais ne sont pas explicitement appeles.

### 1.4 Heroes (`/images/hero/`) - 134 fichiers

#### Hero principal homepage (6 fichiers)

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `hero-range-2025.avif` | 42K | page.tsx (homepage hero) | **Haute** |
| `hero-range-2025-sm.avif` | 16K | NON REFERENCE (responsive variant) | Moyenne |
| `hero-range-2025-md.avif` | 20K | NON REFERENCE (responsive variant) | Moyenne |
| `hero-range-2025-lg.avif` | 28K | NON REFERENCE (responsive variant) | Moyenne |
| `hero-range-2025-xl.avif` | 61K | NON REFERENCE (responsive variant) | Moyenne |

> Pas de fallback .webp pour hero-range-2025

#### Heroes slides homepage (15 fichiers)

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `alphashot-360-slide.avif` | 15K | NON REFERENCE dans le code | Basse |
| `alphashot-360-slide-sm.avif` | 22K | NON REFERENCE (responsive) | Basse |
| `alphashot-360-slide-md.avif` | 27K | NON REFERENCE (responsive) | Basse |
| `alphashot-360-slide-lg.avif` | 36K | NON REFERENCE (responsive) | Basse |
| `alphashot-360-slide-xl.avif` | 26K | NON REFERENCE (responsive) | Basse |
| `alphashot-micro-v2-slide.avif` | 19K | NON REFERENCE dans le code | Basse |
| `alphashot-micro-v2-slide-sm.avif` | 24K | NON REFERENCE (responsive) | Basse |
| `alphashot-micro-v2-slide-md.avif` | 29K | NON REFERENCE (responsive) | Basse |
| `alphashot-micro-v2-slide-lg.avif` | 31K | NON REFERENCE (responsive) | Basse |
| `alphashot-micro-v2-slide-xl.avif` | 31K | NON REFERENCE (responsive) | Basse |
| `furniture-studio-slide.avif` | 6,4K | NON REFERENCE dans le code | Basse |
| `furniture-studio-slide-sm.avif` | 12K | NON REFERENCE (responsive) | Basse |
| `furniture-studio-slide-md.avif` | 14K | NON REFERENCE (responsive) | Basse |
| `furniture-studio-slide-lg.avif` | 12K | NON REFERENCE (responsive) | Basse |
| `furniture-studio-slide-xl.avif` | 12K | NON REFERENCE (responsive) | Basse |

> **Note** : Ces 3 slides hero sont presentes dans le file system mais ne sont plus references dans le code. Elles semblent etre un vestige d'un carrousel supprime.

#### Heroes pages principales (avec variantes responsives + webp)

Chaque hero principal existe en 6 variantes : `.avif`, `.webp`, `-sm.avif`, `-md.avif`, `-lg.avif`, `-xl.avif`

| Base | Taille (avif) | Utilise dans | Priorite |
|------|--------------|-------------|----------|
| `hero-studios-wide` | 25K | studios-photo-automatises | **Haute** |
| `hero-industries` | 20K | industrie/page.tsx | **Haute** |
| `hero-ia-lifestyle` | 34K | NON REFERENCE directement (ia-photo-produit n'utilise pas de hero image) | Moyenne |
| `hero-contact` | 18K | NON REFERENCE dans le code | Basse |
| `hero-blog` | 20K | NON REFERENCE dans le code | Basse |
| `hero-academy` | 20K | NON REFERENCE dans le code | Basse |
| `hero-a-propos` | 29K | NON REFERENCE dans le code | Basse |

> Variantes responsives (-sm/-md/-lg/-xl) NON UTILISEES dans le code. Les fichiers .webp non plus.

#### Heroes secteurs (12 secteurs x 6 variantes = 72 fichiers)

| Base | Taille (avif) | Utilise via `hero-secteur-${slug.split('-')[0]}` | Priorite |
|------|--------------|--------------------------------------------------|----------|
| `hero-secteur-chaussures` | 26K | OUI (slug: chaussures) | **Haute** |
| `hero-secteur-bijoux` | 33K | OUI (slug: bijoux-joaillerie -> bijoux) | **Haute** |
| `hero-secteur-mobilier` | 21K | OUI (slug: mobilier-decoration -> mobilier) | **Haute** |
| `hero-secteur-food` | 37K | OUI (slug: food-alimentaire -> food) | **Haute** |
| `hero-secteur-cosmetiques` | 17K | OUI (slug: cosmetiques-beaute -> cosmetiques) | **Haute** |
| `hero-secteur-mode` | 31K | OUI (slug: mode-textile -> mode) | **Haute** |
| `hero-secteur-hightech` | 18K | NON - slug electronique-hightech -> "electronique" mais fichier = "hightech" | **PROBLEME** |
| `hero-secteur-pieces-tech` | 21K | NON - slug pieces-techniques-industrie -> "pieces" mais fichier = "pieces-tech" | **PROBLEME** |
| `hero-secteur-automobile` | 51K | OUI (slug: automobile-pieces-detachees -> automobile) | **Haute** |
| `hero-secteur-jouets` | 16K | OUI (slug: jouets-puericulture -> jouets) | **Haute** |
| `hero-secteur-sport` | 37K | OUI (slug: sport-outdoor -> sport) | **Haute** |
| `hero-secteur-sante` | 16K | OUI (slug: sante-medical -> sante) | **Haute** |

> Chaque secteur hero a aussi : `.webp`, `-sm.avif`, `-md.avif`, `-lg.avif`, `-xl.avif` (variantes responsives non utilisees dans le code).

### 1.5 Before/After (`/images/before-after/`) - 64 fichiers (32 paires avif+webp)

#### Before/After classiques (8 paires avif+webp)

| Fichier base | Taille (avif) | Utilise dans | Priorite |
|-------------|--------------|-------------|----------|
| `before-after-bijoux-before` | 14K | NON REFERENCE dans le code | Basse |
| `before-after-bijoux-after` | 69K | NON REFERENCE dans le code | Basse |
| `before-after-chaussures-before` | 16K | NON REFERENCE dans le code | Basse |
| `before-after-chaussures-after` | 17K | NON REFERENCE dans le code | Basse |
| `before-after-cosmetiques-before` | 16K | NON REFERENCE dans le code | Basse |
| `before-after-cosmetiques-after` | 39K | NON REFERENCE dans le code | Basse |
| `before-after-meubles-before` | 16K | NON REFERENCE dans le code | Basse |
| `before-after-meubles-after` | 10K | NON REFERENCE dans le code | Basse |

#### Before/After IA - Bijoux (6 paires avif+webp)

| Fichier base | Taille (avif) | Utilise dans | Priorite |
|-------------|--------------|-------------|----------|
| `ia-before-after-bijoux-1-before` | 15K | NON REFERENCE dans le code | Basse |
| `ia-before-after-bijoux-1-after` | 63K | NON REFERENCE dans le code | Basse |
| `ia-before-after-bijoux-2-before` | 18K | NON REFERENCE dans le code | Basse |
| `ia-before-after-bijoux-2-after` | 10K | NON REFERENCE dans le code | Basse |
| `ia-before-after-bijoux-3-before` | 18K | NON REFERENCE dans le code | Basse |
| `ia-before-after-bijoux-3-after` | 12K | NON REFERENCE dans le code | Basse |

#### Before/After IA - Cosmetiques (6 paires avif+webp)

| Fichier base | Taille (avif) | Utilise dans | Priorite |
|-------------|--------------|-------------|----------|
| `ia-before-after-cosmetiques-1-before` | 18K | NON REFERENCE dans le code | Basse |
| `ia-before-after-cosmetiques-1-after` | 104K | NON REFERENCE dans le code | Basse |
| `ia-before-after-cosmetiques-2-before` | 26K | NON REFERENCE dans le code | Basse |
| `ia-before-after-cosmetiques-2-after` | 8,6K | NON REFERENCE dans le code | Basse |
| `ia-before-after-cosmetiques-3-before` | 85K | NON REFERENCE dans le code | Basse |
| `ia-before-after-cosmetiques-3-after` | 3,5K | NON REFERENCE dans le code | Basse |

#### Before/After IA - Decoration (6 paires avif+webp)

| Fichier base | Taille (avif) | Utilise dans | Priorite |
|-------------|--------------|-------------|----------|
| `ia-before-after-decoration-1-before` | 175K | NON REFERENCE dans le code | Basse |
| `ia-before-after-decoration-1-after` | 27K | NON REFERENCE dans le code | Basse |
| `ia-before-after-decoration-2-before` | 11K | NON REFERENCE dans le code | Basse |
| `ia-before-after-decoration-2-after` | 40K | NON REFERENCE dans le code | Basse |
| `ia-before-after-decoration-3-before` | 23K | NON REFERENCE dans le code | Basse |
| `ia-before-after-decoration-3-after` | 22K | NON REFERENCE dans le code | Basse |

#### Before/After IA - Mode (6 paires avif+webp)

| Fichier base | Taille (avif) | Utilise dans | Priorite |
|-------------|--------------|-------------|----------|
| `ia-before-after-mode-1-before` | 9,0K | NON REFERENCE dans le code | Basse |
| `ia-before-after-mode-1-after` | 17K | NON REFERENCE dans le code | Basse |
| `ia-before-after-mode-2-before` | 19K | NON REFERENCE dans le code | Basse |
| `ia-before-after-mode-2-after` | 8,5K | NON REFERENCE dans le code | Basse |
| `ia-before-after-mode-3-before` | 16K | NON REFERENCE dans le code | Basse |
| `ia-before-after-mode-3-after` | 28K | NON REFERENCE dans le code | Basse |

> **Note** : AUCUNE image before-after n'est actuellement referencee dans le code. Le composant `BeforeAfterSlider` et `BeforeAfter` existent mais ne sont importes nulle part. Ces images sont preparees pour le Chantier 3 (integration medias).

### 1.6 Backgrounds (`/images/backgrounds/`) - 16 fichiers (8 paires avif+webp)

| Fichier base | Taille (avif/webp) | Utilise dans | Priorite |
|-------------|-------------------|-------------|----------|
| `background-hero-gradient` | 41K / 33K | NON REFERENCE dans le code | Basse |
| `background-cta-soft` | 28K / 24K | NON REFERENCE dans le code | Basse |
| `pattern-dots-purple` | 30K / 26K | NON REFERENCE dans le code | Basse |
| `pattern-geometric-minimal` | 67K / 48K | NON REFERENCE dans le code | Basse |
| `pattern-gradient-mesh` | 54K / 48K | NON REFERENCE dans le code | Basse |
| `pattern-waves-subtle` | 45K / 41K | NON REFERENCE dans le code | Basse |
| `texture-brushed-light` | 34K / 30K | NON REFERENCE dans le code | Basse |
| `texture-noise-grain` | 23K / 25K | NON REFERENCE dans le code | Basse |

> **Note** : AUCUN background n'est reference dans le code. Ces images sont preparees pour un enrichissement visuel futur.

### 1.7 Secteurs (`/images/secteurs/`) - 12 fichiers SVG

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `chaussures.svg` | 918B | page.tsx (homepage, grille secteurs) | **Haute** |
| `horlogerie-bijouterie.svg` | 1,8K | page.tsx (homepage, grille secteurs) | **Haute** |
| `meubles.svg` | 817B | page.tsx (homepage, grille secteurs) | **Haute** |
| `agroalimentaire.svg` | 872B | page.tsx (homepage, grille secteurs) | **Haute** |
| `skincare-cosmetiques.svg` | 861B | page.tsx (homepage, grille secteurs) | **Haute** |
| `mode-accessoires.svg` | 905B | page.tsx (homepage, grille secteurs) | **Haute** |
| `hightech-electromenager.svg` | 760B | page.tsx (homepage, grille secteurs) | **Haute** |
| `pieces-techniques.svg` | 665B | page.tsx (homepage, grille secteurs) | **Haute** |
| `vins-spiritueux.svg` | 789B | page.tsx (homepage, grille secteurs) | **Haute** |
| `optique-lunetterie.svg` | 772B | page.tsx (homepage, grille secteurs) | **Haute** |
| `sports.svg` | 856B | page.tsx (homepage, grille secteurs) | **Haute** |
| `objets-art-antiquites.svg` | 720B | page.tsx (homepage, grille secteurs) | **Haute** |

### 1.8 Demo (`/images/demo/`) - 4 fichiers

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `bouteille-vin.avif` | 25K | ia-photo-produit (demo avant/apres IA) | Moyenne |
| `frigidaire.webp` | 21K | NON REFERENCE dans le code | Basse |
| `manette-jeu.webp` | 35K | NON REFERENCE dans le code | Basse |
| `enceinte.webp` | 25K | NON REFERENCE dans le code | Basse |

### 1.9 Lifestyle (`/images/lifestyle/`) - 6 fichiers (3 paires avif+webp)

| Fichier base | Taille (avif/webp) | Utilise dans | Priorite |
|-------------|-------------------|-------------|----------|
| `lifestyle-sante-medical` | 61K / 47K | NON REFERENCE dans le code | Basse |
| `lifestyle-mode-textile` | 49K / 42K | NON REFERENCE dans le code | Basse |
| `lifestyle-jouets-puericulture` | 38K / 30K | NON REFERENCE dans le code | Basse |

> **Note** : Preparees pour enrichissement des pages secteur mais non integrees.

### 1.10 Blog (`/images/blog/`) - 9 fichiers

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `article-logiciel-perdu.avif` | 55K | NON REFERENCE dans le code (blog via Sanity CMS) | Basse |
| `article-ia-lumieres-virtuelles.avif` | 380K | NON REFERENCE dans le code | Basse |
| `article-multi-camera-3d.avif` | 262K | NON REFERENCE dans le code | Basse |
| `thumbnail-article-nouveau-2.avif` | 40K | NON REFERENCE dans le code | Basse |
| `thumbnail-article-nouveau-2.webp` | 25K | NON REFERENCE dans le code | Basse |
| `thumbnail-article-nouveau-3.avif` | 35K | NON REFERENCE dans le code | Basse |
| `thumbnail-article-nouveau-3.webp` | 29K | NON REFERENCE dans le code | Basse |
| `thumbnail-article-nouveau-5.avif` | 41K | NON REFERENCE dans le code | Basse |
| `thumbnail-article-nouveau-5.webp` | 31K | NON REFERENCE dans le code | Basse |

> **Note** : Les images blog sont servies par Sanity CMS. Ces fichiers locaux ne sont pas utilises.

### 1.11 OG (`/images/og/`) - 1 fichier

| Fichier | Taille | Utilise dans | Priorite |
|---------|--------|-------------|----------|
| `og-default.avif` | 35K | NON REFERENCE (OG images maintenant dynamiques via /api/og) | Basse |

### 1.12 Images hors `/images/` (racine `/public/`)

| Fichier | Utilise dans | Priorite |
|---------|-------------|----------|
| `favicon.ico` (dans `/app/`) | Layout Next.js (automatique) | **Haute** |
| `file.svg` | Template Next.js par defaut, non utilise | Basse |
| `vercel.svg` | Template Next.js par defaut, non utilise | Basse |
| `globe.svg` | Template Next.js par defaut, non utilise | Basse |
| `window.svg` | Template Next.js par defaut, non utilise | Basse |
| `next.svg` | Template Next.js par defaut, non utilise | Basse |

---

## 2. Images referencees dans le code mais MANQUANTES

### 2.1 Dossier `/images/gallery/` - ABSENT (6 images manquantes)

| Chemin attendu | Reference dans | Section | Priorite |
|---------------|---------------|---------|----------|
| `/images/gallery/packshot-fondBlanc.avif` | app/[lang]/page.tsx:64 | Homepage galerie | **Haute** |
| `/images/gallery/360-product.avif` | app/[lang]/page.tsx:65 | Homepage galerie | **Haute** |
| `/images/gallery/fashion-model.avif` | app/[lang]/page.tsx:66 | Homepage galerie | **Haute** |
| `/images/gallery/flatlay-composition.avif` | app/[lang]/page.tsx:67 | Homepage galerie | **Haute** |
| `/images/gallery/jewelry-macro.avif` | app/[lang]/page.tsx:68 | Homepage galerie | **Haute** |
| `/images/gallery/furniture-large.avif` | app/[lang]/page.tsx:69 | Homepage galerie | **Haute** |

> **CRITIQUE** : Le dossier `/images/gallery/` n'existe pas du tout. La section galerie de la homepage sera cassee.

### 2.2 Dossier `/images/why-automate/` - ABSENT (3 images manquantes)

| Chemin attendu | Reference dans | Section | Priorite |
|---------------|---------------|---------|----------|
| `/images/why-automate/noSkills.avif` | app/[lang]/page.tsx:564 | Homepage "Pourquoi automatiser" | **Haute** |
| `/images/why-automate/scalability.avif` | app/[lang]/page.tsx:564 | Homepage "Pourquoi automatiser" | **Haute** |
| `/images/why-automate/knowHow.avif` | app/[lang]/page.tsx:564 | Homepage "Pourquoi automatiser" | **Haute** |

> **CRITIQUE** : Le dossier `/images/why-automate/` n'existe pas. La section "Pourquoi automatiser" de la homepage sera cassee.

### 2.3 Heroes secteurs manquants (mismatch slug/fichier)

| Chemin attendu (genere par le code) | Fichier existant | Probleme | Priorite |
|-------------------------------------|-----------------|---------|----------|
| `/images/hero/hero-secteur-electronique.avif` | `hero-secteur-hightech.avif` | slug `electronique-hightech` -> split('-')[0] = `electronique` | **Haute** |
| `/images/hero/hero-secteur-pieces.avif` | `hero-secteur-pieces-tech.avif` | slug `pieces-techniques-industrie` -> split('-')[0] = `pieces` | **Haute** |
| `/images/hero/hero-secteur-industrie.avif` | AUCUN | slug `industrie-manufacturiere` -> split('-')[0] = `industrie` | **Haute** |
| `/images/hero/hero-secteur-defense.avif` | AUCUN | slug `defense-securite` -> split('-')[0] = `defense` | **Haute** |

> **CRITIQUE** : 4 pages secteur ont un hero casse. Pour `electronique` et `pieces`, le fichier existe mais avec un nom different. Pour `industrie` et `defense` (nouveaux secteurs), aucun fichier n'existe.

---

## 3. Images non-utilisees (dans /public/ mais pas referencees)

### 3.1 Images probablement inutiles (supprimer possible)

| Fichier | Taille | Action recommandee |
|---------|--------|-------------------|
| `public/file.svg` | - | Supprimer (template Next.js) |
| `public/vercel.svg` | - | Supprimer (template Next.js) |
| `public/globe.svg` | - | Supprimer (template Next.js) |
| `public/window.svg` | - | Supprimer (template Next.js) |
| `public/next.svg` | - | Supprimer (template Next.js) |
| `images/og/og-default.avif` | 35K | Supprimer (OG dynamiques maintenant) |
| `images/machines/turntable-g2.avif` | 4,4K | Conserver (machine existante, a referencer) |

### 3.2 Images preparees mais pas encore integrees (conserver - Chantier 3)

| Categorie | Nb fichiers | Taille totale approx. | Action recommandee |
|-----------|------------|----------------------|-------------------|
| before-after/ | 64 | ~1.8 MB | Conserver - pour integration BeforeAfterSlider |
| backgrounds/ | 16 | ~550 KB | Conserver - pour enrichissement visuel |
| lifestyle/ | 6 | ~270 KB | Conserver - pour pages secteur |
| blog/ | 9 | ~900 KB | Evaluer - les blogs viennent de Sanity |
| demo/ (3 non utilises) | 3 | ~80 KB | Conserver - potentiel pour demo IA |

### 3.3 Logos clients non affiches (10 sur 20)

| Fichier | Taille | Action recommandee |
|---------|--------|-------------------|
| `client-castel-freres.svg` | 100K | Ajouter au carousel ou supprimer |
| `client-europart.svg` | 159K | Ajouter au carousel ou supprimer |
| `client-intersport.svg` | 115K | Ajouter au carousel ou supprimer |
| `client-gs1.svg` | 163K | Ajouter au carousel ou supprimer |
| `client-leclaireur.svg` | 62K | Ajouter au carousel ou supprimer |
| `client-pure-red.svg` | 69K | Ajouter au carousel ou supprimer |
| `client-sacla.svg` | 72K | Ajouter au carousel ou supprimer |
| `client-severin.svg` | 129K | Ajouter au carousel ou supprimer |
| `client-william-grant-sons.svg` | 133K | Ajouter au carousel ou supprimer |
| `client-zoomalia.svg` | 35K | Ajouter au carousel ou supprimer |

### 3.4 Illustrations non referencees (8 paires avif+webp)

| Fichier base | Action recommandee |
|-------------|-------------------|
| `timeline-innovation-6` | Conserver - potentiel pour page a-propos |
| `exemple-produit-sante-2` | Conserver - pour pages secteur |
| `exemple-produit-pieces-tech-3` | Conserver - pour pages secteur |
| `exemple-produit-pieces-tech-1` | Conserver - pour pages secteur |
| `exemple-produit-mode-3` | Conserver - pour pages secteur |
| `exemple-produit-mobilier-3` | Conserver - pour pages secteur |
| `exemple-produit-chaussures-3` | Conserver - pour pages secteur |
| `exemple-produit-chaussures-2` | Conserver - pour pages secteur |
| `exemple-produit-automobile-3` | Conserver - pour pages secteur |

### 3.5 Heroes non references (variantes responsives + webp + slides)

| Categorie | Nb fichiers | Action recommandee |
|-----------|------------|-------------------|
| Variantes responsives (-sm, -md, -lg, -xl) | ~80 | Conserver pour future utilisation `<picture>` ou supprimer si non prevu |
| Fallbacks .webp | ~15 | Idem |
| Hero slides (alphashot-360-slide, etc.) | 15 | Supprimer si le carousel a ete retire |
| hero-ia-lifestyle | 6 | Conserver - potentiel pour page IA |
| hero-contact | 6 | Conserver - potentiel pour page contact |
| hero-blog | 6 | Conserver - potentiel pour page blog |
| hero-academy | 6 | Conserver - potentiel pour page academy |
| hero-a-propos | 6 | Conserver - potentiel pour page a-propos |

---

## 4. Placeholders et images temporaires

| Composant/Page | Type placeholder | Image attendue | Dimensions recommandees |
|---------------|-----------------|---------------|----------------------|
| Homepage galerie (GALLERY_IMAGES) | Image manquante (dossier `/gallery/` inexistant) | 6 photos produit qualite studio | packshot: 800x800, 360: 400x400, fashion: 400x600, flatlay: 400x400, jewelry: 400x400, furniture: 800x400 |
| Homepage "Why Automate" | Image manquante (dossier `/why-automate/` inexistant) | 3 photos illustrant les benefices | 800x600 (aspect 4/3 dans le code) |
| Blog articles (homepage) | `ImagePlaceholder` composant | Fallback quand article Sanity n'a pas d'image | 1200x675 (ratio 16/9) |
| Machine (fallback) | `placeholder-medium.svg` | Quand machine non trouvee dans imageMap | SVG responsive |
| Machine (MachineCard/Modal) | Div gris avec icone Camera | Quand `imageError=true` ou pas d'imageUrl | 400x300 |
| Secteur hero (4 secteurs) | Image cassee (404) | Heroes pour electronique, pieces, industrie, defense | 640x480 (dans le code) |

---

## 5. Resume

### Compteurs

| Categorie | Total |
|-----------|-------|
| **Images existantes dans /public/images/** | **312** |
| Images effectivement referencees dans le code | **~47 fichiers uniques** |
| **Images MANQUANTES (referencees mais absentes)** | **13** |
| Images non-referencees dans le code | **~265** |
| Placeholders actifs dans le code | **3 types** |

### Detail des images referencees (~47 fichiers uniques)

| Source | Nombre |
|--------|--------|
| Logo PackshotCreator (Header, Footer, SchemaOrg) | 1 |
| Logos clients homepage | 10 |
| Icones secteurs homepage | 12 |
| Pillar illustrations (homepage, studios, IA, academy) | 3 (x2 = 6 fichiers avif+webp) |
| Hero homepage | 1 |
| Hero studios-photo | 1 |
| Hero industries | 1 |
| Hero secteurs (via slug dynamique) | 10 sur 14 fonctionnent |
| Photos machines (machine-selector + studio-photo pages) | 11 |
| Machine placeholder fallback | 1 |
| IA feature illustrations | 2 |
| Demo bouteille-vin | 1 |
| Machine homepage (alphashot-pro-g2) | 1 (deja compte) |

### Bugs critiques identifies

1. **6 images gallery MANQUANTES** -> section homepage cassee
2. **3 images why-automate MANQUANTES** -> section homepage cassee
3. **2 hero secteurs MISMATCH** (electronique/hightech, pieces/pieces-tech) -> 2 pages secteur avec hero 404
4. **2 hero secteurs ABSENTS** (industrie, defense) -> 2 pages secteur avec hero 404

### Optimisations recommandees

1. **Logos SVG trop lourds** : Bosch (462K), Amazon (268K), Lidl (232K) -> optimiser avec SVGO
2. **Variantes responsives non utilisees** : ~80 fichiers hero -sm/-md/-lg/-xl non references -> integrer via `<picture>` ou supprimer
3. **Fichiers .webp dupliques** : les .webp ne sont jamais references (Next.js Image gere le format) -> evaluer suppression
4. **Template Next.js** : 5 SVG dans public/ a supprimer (file.svg, vercel.svg, globe.svg, window.svg, next.svg)
5. **Before-after (64 fichiers)** : prets pour integration via composant `BeforeAfterSlider` (Chantier 3)
6. **Blog images locales** : probablement inutiles car blog via Sanity CMS
