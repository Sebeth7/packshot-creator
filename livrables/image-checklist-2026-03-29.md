# Checklist images - PackshotCreator
> Mis a jour le 29 mars 2026 - audit complet code + dossier images
> Dossier images : `/public/images/`

**Legende statut :**
- **EN PLACE** = image existante et utilisee dans le code
- **MANQUANTE** = referencee dans le code mais fichier absent
- **PLACEHOLDER** = emplacement prevu dans le code (zone grise avec icone), image a fournir
- **ORPHELINE** = fichier sur disque mais non reference dans le code

**Legende type :**
- **Type A** : AVIF transparent (fond transparent + ombre portee). Poids max 50 KB.
- **Type B** : Photo full-width arriere-plan de section avec overlay. Poids max 80 KB.
- **Type C** : Pas d'image necessaire.

---

## COMPTAGE GLOBAL

| Categorie | Nombre |
|---|---|
| Images EN PLACE | ~65 uniques |
| Images PLACEHOLDER (a fournir) | ~170 instances (dont beaucoup sont des templates x15 secteurs / x16 machines) |
| Images MANQUANTE | 1 |
| Images ORPHELINES | ~80+ |

---

## 1. HOMEPAGE (`/`)

### Images en place

| Emplacement | Image | Status |
|---|---|---|
| Hero video | `hero/hero-range-2025.mp4` | EN PLACE |
| Hero poster | `hero/hero-range-2025-poster.avif` | EN PLACE |
| Logos clients (10) | `logos/client-{chanel,amazon,bosch,essilor-luxottica,valentino,sandro,seiko,lidl,wurth,jagermeister}.svg` | EN PLACE |
| Breather image | `hero/hero-studios-wide.avif` | EN PLACE |
| Machine Alphashot Pro G2 | `machines/alphashot-pro-g2.avif` | EN PLACE |
| Carousel machines (6) | `machines/{alphashot-xl,alphastudio-compact,fashion-studio,alphashot-360,bike-studio,alphatable-alphadesk}.avif` | EN PLACE |
| Icones secteurs (12) | `secteurs/{chaussures,horlogerie-bijouterie,meubles,agroalimentaire,skincare-cosmetiques,mode-accessoires,hightech-electromenager,pieces-techniques,vins-spiritueux,optique-lunetterie,sports,objets-art-antiquites}.svg` | EN PLACE |
| Galerie (5/6) | `gallery/{packshot-fondBlanc,360-product,fashion-model,flatlay-composition,jewelry-macro}.avif` | EN PLACE |

### A fournir

| # | Emplacement | Description | Dimensions | Nom fichier | Priorite |
|---|---|---|---|---|---|
| 1 | **Galerie - meuble** | Meuble/canape sur fond transparent | ~800x400 | `gallery/furniture-large.avif` | **MANQUANTE - URGENTE** |
| 2 | S3 Pain Points - illustration droite | Illustration production photo | ~600x400 | `illustrations/home-pain-points.avif` | HAUTE |
| 3 | S4 Hybrid - image sous heading sticky | Image produit | ~500x400 | `illustrations/home-hybrid-hero.avif` | HAUTE |
| 4 | S4 Hybrid - card "Capture" | Studio Orbitvu en action | ~800x200 | `illustrations/home-hybrid-capture.avif` | HAUTE |
| 5 | S4 Hybrid - card "IA" | BlendAI generation de visuels | ~800x200 | `illustrations/home-hybrid-ia.avif` | HAUTE |
| 6 | S4 Hybrid - card "Formation" | Formation en situation | ~800x200 | `illustrations/home-hybrid-formation.avif` | HAUTE |
| 7 | S11 Final CTA - visuel demo | Visuel demo | ~500x180 | `illustrations/home-final-cta.avif` | BASSE |

---

## 2. STUDIOS PHOTO AUTOMATISES (`/studios-photo-automatises`)

### Images en place

| Emplacement | Image | Status |
|---|---|---|
| Hero backgroundImage | `hero/hero-studios-wide.avif` + 4 variants responsive | EN PLACE |
| Logos clients (8) | `logos/client-*.svg` | EN PLACE |
| MachineSelector (dynamique) | `machines/*.avif` via composant | EN PLACE |

### A fournir

| # | Emplacement | Description | Dimensions | Nom fichier | Priorite |
|---|---|---|---|---|---|
| 8 | S3 Orientation - image droite | Systeme Orbitvu en situation | ~600x450 | `illustrations/studios-orientation.avif` | HAUTE |

---

## 3. IA PHOTO PRODUIT (`/ia-photo-produit`)

### Images en place

| Emplacement | Image | Status |
|---|---|---|
| Hero media | `illustrations/pillar-ia.avif` | EN PLACE |
| Before/After (4 paires) | `before-after/ia-before-after-{cosmetiques,mode,bijoux,decoration}-1-{before,after}.avif` | EN PLACE |
| Integration feature | `illustrations/ia-feature-integration.avif` | EN PLACE |

### A fournir

| # | Emplacement | Description | Dimensions | Nom fichier | Priorite |
|---|---|---|---|---|---|
| 9 | S2 Manifeste | Packshot studio Orbitvu | ~500x280 | `illustrations/ia-manifeste.avif` | HAUTE |
| 10 | S3 Comparatif - card BlendAI | Resultat Packshot pro + BlendAI | ~600x160 | `illustrations/ia-comparatif-blendai.avif` | HAUTE |
| 11 | S3 Comparatif - card IA pure | Resultat IA generative pure | ~400x120 | `illustrations/ia-comparatif-pure.avif` | HAUTE |
| 12 | S5 Features - card Lifestyle | Scene lifestyle generee | ~600x200 | `illustrations/ia-feature-lifestyle.avif` | HAUTE |
| 13 | S5 Features - card Mannequin | Photo portee mannequin virtuel | ~600x200 | `illustrations/ia-feature-mannequin.avif` | HAUTE |

---

## 4. INDUSTRIE HUB (`/industrie`)

### Images en place

| Emplacement | Image | Status |
|---|---|---|
| Hero media | `hero/hero-industries.avif` | EN PLACE |

### A fournir

Aucune. Page texte + icones, design epure adequat.

---

## 5. PAGES SECTEUR (`/industrie/[slug]`) -- x17 pages

Template identique pour les 17 secteurs. Chaque page a les memes emplacements PLACEHOLDER.

### A fournir (par secteur)

| # | Emplacement | Description | Dimensions | Priorite |
|---|---|---|---|---|
| 14 | Hero - media split right | Visuel secteur (produit representatif) | ~640x480 | HAUTE |
| 15 | S2 Problematiques | Illustration defis secteur | ~500x240 | MOYENNE |
| 16 | S3 Solutions - card hardware | Visuel solution studio | ~800x180 | MOYENNE |
| 17 | S3 Solutions - card IA | Visuel solution BlendAI | ~800x180 | MOYENNE |
| 18 | S8 Machines - cards | Photo machine recommandee | ~800x140 | BASSE (fallback vers machines/*.avif existants) |

**Secteurs concernes (17)** : chaussures, bijoux-joaillerie, mobilier-decoration, food-alimentaire, cosmetiques-beaute, mode-textile, electronique-hightech, pieces-techniques-industrie, automobile-pieces-detachees, jouets-puericulture, sport-outdoor, sante-medical, industrie-manufacturiere, defense-securite, lunetterie, vin-spiritueux + 1 potentiel

**Noms fichiers proposes** : `secteurs/hero-{slug}.avif` (ex: `secteurs/hero-chaussures.avif`)

**Note** : les hero-secteur-*.avif EXISTENT dans `/images/hero/` (12 secteurs avec 5 variantes responsive chaque) mais ne sont PAS references dans le code actuel des pages secteur. Ils pourraient etre reutilises avec une modification code.

**Volume : ~85 images si on fait tout, ~17 si on ne fait que les hero**

---

## 6. INDUSTRIE-DEFENSE (`/industrie-defense`)

### Images en place

| Emplacement | Image | Status |
|---|---|---|
| Logos clients (10) | `logos/client-*.svg` | EN PLACE |

### A fournir

Aucun placeholder dans le code actuel. La page utilise uniquement des icones Lucide et du texte.

---

## 7. PAGES MACHINES (`/studio-photo/[slug]`) -- x16 pages

Template identique pour les 16 machines. Les images machines existent, mais la bento grid contient des placeholders.

### Images en place (par machine)

Image hero machine via `getMachineImage()` -- toutes EN PLACE.

### A fournir (par machine)

| # | Emplacement | Description | Dimensions | Priorite |
|---|---|---|---|---|
| 19 | Bento - packshot fond blanc | Photo packshot resultat fond blanc auto | ~800x420 | MOYENNE |
| 20 | Bento - video demo | Video ou capture video | ~800x420 | BASSE |
| 21 | Bento - animation 360 | Capture animation 360 | ~400x264 | MOYENNE |
| 22 | Bento - produit reflechissant | Produit a surface reflechissante | ~400x264 | MOYENNE |
| 23 | Key advantage - feature visual | Visuel fonctionnalite cle | ~400x224 | BASSE |

**Noms fichiers proposes** : `machines/{slug}-packshot.avif`, `machines/{slug}-360.avif`, etc.

**Volume : ~80 images si on fait tout (5 par machine x 16)**

**Approche recommandee** : creer un set GENERIQUE reutilisable (1 photo packshot, 1 animation 360, etc.) plutot que 80 images individuelles. Ou ne pas remplir ces placeholders et garder le design actuel (les machines sont bien illustrees par leur image hero).

---

## 8. ACADEMY (3 pages)

### Images en place

| Page | Image | Status |
|---|---|---|
| Academy hub | `illustrations/pillar-formation.avif` | EN PLACE |
| Formations packshot | `illustrations/pillar-hardware.avif` + `pillar-formation.avif` | EN PLACE |
| Formations IA | `illustrations/pillar-ia.avif` + `ia-feature-background-generator.avif` | EN PLACE |

### A fournir

Aucune. Pages epurees, design adequat.

---

## 9. PACKSHOT LANDING PAGES (x5)

Pages : `/packshot-bijoux`, `/packshot-mode`, `/packshot-e-commerce`, `/packshot-amazon`, `/packshot-industriel`

Template commun `PackshotLandingTemplate.tsx`.

### Images en place

| Emplacement | Image | Status |
|---|---|---|
| Logos clients (10) | `logos/client-*.svg` | EN PLACE |

### A fournir (par landing)

| # | Emplacement | Description | Dimensions | Priorite |
|---|---|---|---|---|
| 24 | Breather - visuel showroom | Photo/visuel showroom ou resultat photo | 100%x400px | MOYENNE |
| 25 | S3 Benefits - visuel produit | Produit representatif de la niche | ~500x300 | HAUTE |

**Noms fichiers proposes** :
- `illustrations/landing-bijoux-hero.avif`
- `illustrations/landing-mode-hero.avif`
- `illustrations/landing-ecommerce-hero.avif`
- `illustrations/landing-amazon-hero.avif`
- `illustrations/landing-industriel-hero.avif`

**Volume : 10 images (2 par landing)**

---

## 10. SOLUTIONS/[SLUG] (x3 pages : documentation-technique-visuelle, documentation-qualite-produit, documentation-probatoire)

### A fournir (par solution)

| # | Emplacement | Description | Dimensions | Priorite |
|---|---|---|---|---|
| 26 | Workflow - image heading | Workflow Orbitvu | ~500x280 | MOYENNE |
| 27 | Etapes workflow (3-4 par page) | Illustration etape | ~800x160 | BASSE |
| 28 | Machines cards | Photo machine | ~800x140 | BASSE (machines/*.avif reutilisables) |

**Volume : ~20 images si tout, ~4 si hero seulement**

---

## 11. PAGES SECONDAIRES

| Page | A fournir | Priorite |
|---|---|---|
| Contact | Rien | -- |
| A propos | Rien (pas de placeholder dans le code) | -- |
| Blog (hub + articles) | Dynamique CMS | -- |
| Guide (hub + articles) | Dynamique Webflow | -- |
| Besoins photo | 1 visuel CTA (500x180) | BASSE |
| Questions cles | 1 visuel CTA (500x180) | BASSE |
| Calculateur ROI | Rien (reutilise hero-studios-wide) | -- |
| Simulateur OPCO | Rien | -- |
| Calendrier | Rien | -- |
| Pages legales (x3) | Rien | -- |

---

## RESUME : IMAGES A CREER PAR PRIORITE

### HAUTE (impact conversion direct) -- 13 images uniques

| # | Image | Type | Dimensions | Fichier |
|---|---|---|---|---|
| 1 | Galerie meuble (MANQUANTE) | A | 800x400 | `gallery/furniture-large.avif` |
| 2 | Home pain points illustration | A | 600x400 | `illustrations/home-pain-points.avif` |
| 3 | Home hybrid hero image | A | 500x400 | `illustrations/home-hybrid-hero.avif` |
| 4 | Home hybrid card Capture | A | 800x200 | `illustrations/home-hybrid-capture.avif` |
| 5 | Home hybrid card IA | A | 800x200 | `illustrations/home-hybrid-ia.avif` |
| 6 | Home hybrid card Formation | A | 800x200 | `illustrations/home-hybrid-formation.avif` |
| 7 | Studios orientation | A | 600x450 | `illustrations/studios-orientation.avif` |
| 8 | IA manifeste | A | 500x280 | `illustrations/ia-manifeste.avif` |
| 9 | IA comparatif BlendAI | A | 600x160 | `illustrations/ia-comparatif-blendai.avif` |
| 10 | IA comparatif pure | A | 400x120 | `illustrations/ia-comparatif-pure.avif` |
| 11 | IA feature lifestyle | A | 600x200 | `illustrations/ia-feature-lifestyle.avif` |
| 12 | IA feature mannequin | A | 600x200 | `illustrations/ia-feature-mannequin.avif` |
| 13 | Landing bijoux/mode/ecommerce/amazon/industriel produit (x5) | A | 500x300 | `illustrations/landing-{niche}-hero.avif` |

### MOYENNE (amelioration significative) -- ~30 images

| Categorie | Quantite | Description |
|---|---|---|
| Secteurs hero (x17) | 17 | Visuel produit par secteur (640x480) -- OU reutiliser les hero-secteur-*.avif existants (12 deja sur disque) |
| Landings breather (x5) | 5 | Visuel showroom (100%x400) |
| Machines bento (set generique) | ~5 | 1 packshot + 1 360 + 1 reflechissant + 1 feature (reutilisable sur 16 pages) |
| Solutions workflow (x3) | 3 | Visuel workflow par solution |

### BASSE (nice-to-have) -- ~10 images

| Categorie | Quantite |
|---|---|
| Home final CTA | 1 |
| Secteurs problematiques (x15) | 15 (ou skip) |
| Pages secondaires CTA (x2) | 2 |
| Machines bento video/feature | variable |

---

## IMAGES ORPHELINES (a nettoyer ou reutiliser)

### Reutilisables immediatement (existent, pas dans le code)

| Image | Taille | Reutilisation possible |
|---|---|---|
| `hero/hero-secteur-*.avif` (12 secteurs x 5 variants) | ~60 fichiers | Pages secteur hero (modification code necessaire) |
| `hero/hero-a-propos*.avif` (5 variants) | ~100 KB | Page A propos hero background |
| `hero/hero-blog*.avif` (5 variants) | ~70 KB | Page Blog hub hero background |
| `hero/hero-contact*.avif` (5 variants) | ~60 KB | Page Contact hero background |
| `hero/hero-ia-lifestyle*.avif` (5 variants) | ~130 KB | Page IA hero background alternative |
| `hero/hero-academy*.avif` (5 variants) | ~80 KB | Page Academy hero background |
| `before-after/ia-before-after-*-{2,3}*.avif` (12 fichiers) | ~400 KB | Enrichir la section before-after page IA |
| `illustrations/exemple-produit-*.avif` (7 fichiers) | ~400 KB | Pages secteur ou landing pages |
| `logos/client-{intersport,europart,gs1,sacla,pure-red,leclaireur,severin,william-grant-sons,castel-freres,zoomalia}.svg` | ~1 MB | Enrichir les barres logos clients |

### A supprimer (reliquats)

| Image | Raison |
|---|---|
| `why-automate/*.avif` (3 fichiers) | Ancien layout, decision de ne pas utiliser |
| `demo/*.avif/.webp` (4 fichiers) | Fichiers demo non utilises |
| `backgrounds/*.avif/.webp` (16 fichiers) | Patterns generes jamais integres |
| Tous les `.webp` dupliquant des `.avif` | Redundants |

---

## SPECS TECHNIQUES

| Type | Format | Dimensions | Poids max |
|---|---|---|---|
| Hero background | AVIF | 1344x768 + variants (sm 640x366, md 768x439, lg 1024x585, xl 1344x768) | <80 KB base |
| Illustration | AVIF transparent | Variable selon emplacement (voir tableaux) | <50 KB |
| Gallery | AVIF | 800x600 min | <200 KB |
| Before/After | AVIF | 1024x1024 | <100 KB |
| Machine | AVIF transparent | Variable | <30 KB |
| Icone secteur | SVG | Vectoriel | <5 KB |
| Logo client | SVG | Vectoriel | <5 KB |
| Video hero | MP4 H.264 | 1920x1080, 10-15s boucle | <5 MB |
