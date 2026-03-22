# Inventaire complet des images - Page par page

Pour chaque page : toutes les images utilisees ou a fournir.
Dossier images : `/public/images/`

**Legende inventaire :**
- EN PLACE = image existante et utilisee
- EXISTE = image dans le dossier mais pas utilisee par la page
- MANQUANTE = image referencee dans le code mais fichier absent
- A FOURNIR = emplacement prevu, image a creer

**Legende recommandations (S1-bis, 22 mars 2026) :**
- **Type A** : AVIF transparent (fond transparent + ombre portee). Pour elements qui "flottent". Poids max 50 KB.
- **Type B** : Photo full-width arriere-plan de section avec overlay. Poids max 80 KB.
- **Type C** : Pas d'image necessaire. Section assez impactante sans image.
- Statut reco : OK (image en place et appropriee), A GENERER, PAS NECESSAIRE

---

## 1. Homepage (`/`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `hero/hero-range-2025.avif` | 2860x980 | 43 KB | EN PLACE |
| Hero - image droite (xl) | `hero/hero-range-2025-xl.avif` | 1920x658 | 63 KB | EN PLACE |
| Hero - image droite (lg) | `hero/hero-range-2025-lg.avif` | 1024x351 | 29 KB | EN PLACE |
| Hero - image droite (md) | `hero/hero-range-2025-md.avif` | 768x263 | 20 KB | EN PLACE |
| Hero - image droite (sm) | `hero/hero-range-2025-sm.avif` | 640x219 | 17 KB | EN PLACE |
| Logos clients (10) | `logos/client-*.svg` | SVG | ~2 KB chacun | EN PLACE |
| Pilier Capture | `illustrations/pillar-hardware.avif` | 1024x1024 | 22 KB | EN PLACE |
| Pilier IA | `illustrations/pillar-ia.avif` | 1024x1024 | 33 KB | EN PLACE |
| Pilier Formation | `illustrations/pillar-formation.avif` | 1024x1024 | 28 KB | EN PLACE |
| Galerie - packshot fond blanc | `gallery/packshot-fondBlanc.avif` | ~600x400 | 44 KB | EN PLACE (corrige S1-bis) |
| Galerie - produit 360 | `gallery/360-product.avif` | ~600x400 | 28 KB | EN PLACE (corrige S1-bis) |
| Galerie - fashion model | `gallery/fashion-model.avif` | ~600x400 | 30 KB | EN PLACE (corrige S1-bis) |
| Galerie - flatlay | `gallery/flatlay-composition.avif` | ~600x400 | 37 KB | EN PLACE (corrige S1-bis) |
| Galerie - bijoux macro | `gallery/jewelry-macro.avif` | ~600x400 | 28 KB | EN PLACE (corrige S1-bis) |
| Galerie - meuble | `gallery/furniture-large.avif` | -- | -- | MANQUANTE |
| Why automate - no skills | `why-automate/noSkills.avif` | -- | -- | MANQUANTE (non recommandee -- voir reco S1-bis section 7) |
| Why automate - scalability | `why-automate/scalability.avif` | -- | -- | MANQUANTE (non recommandee -- voir reco S1-bis section 7) |
| Why automate - know how | `why-automate/knowHow.avif` | -- | -- | MANQUANTE (non recommandee -- voir reco S1-bis section 7) |
| Icones secteurs (12) | `secteurs/*.svg` | SVG | ~1 KB chacun | EN PLACE |
| Machine recommandee | `machines/alphashot-pro-g2.avif` | 1000x1000 | 7 KB | EN PLACE |
| Articles blog (3) | dynamique (Sanity/Webflow) | -- | -- | -- |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | Image EN PLACE (hero-range-2025) | OK | - | - | - | - |
| 2 | Social Proof (stats + logos) | Logos SVG EN PLACE | OK | - | - | - | - |
| 3 | Pain Points ("production freine croissance") | Pas d'image | C (garder aere) | Stats chiffrees (30 photos/j, 15-50 EUR, 100%) suffisent visuellement | - | - | - |
| 4 | Solution Pillars (Capture/IA/Formation) | Pas d'image (pillar-*.avif existent mais PAS utilisees ici) | A (integrer existants) | Reutiliser pillar-hardware/ia/formation.avif dans chaque card. La page Studios les utilise, la Homepage non — incoherence. | 400x300 crop | pillar-*.avif (EXISTENT) | HAUTE (code only) |
| 5 | Machine Spotlight (Alphashot Pro G2) | Machine AVIF EN PLACE | OK | - | - | - | - |
| 5b | Mini-galerie (3 types visuels) | 3 images dans le code | A VERIFIER | Les fichiers gallery/*.avif sont listes MANQUANTE mais le site affiche des visuels. Verifier si placeholders ou vrais fichiers | 600x400 | gallery/*.avif | HAUTE |
| 6 | Testimonials (3 temoignages) | Pas d'image | C (garder aere) | Stats + citations suffisent. Design epure. | - | - | - |
| 7 | Why Automate (3 raisons) | Pas d'image | C (garder aere) | Les stats (1h, 10x, 100%) et icones font office d'illustration. NE PAS utiliser les why-automate/*.avif manquantes -- design actuel est meilleur sans | - | - | - |
| 8 | Sectors Grid (12 secteurs) | 12 icones SVG EN PLACE | OK | - | - | - | - |
| 9 | CTA ("Pret a passer a l'action") | Pas d'image | C (pas necessaire) | Section CTA epuree, efficace telle quelle | - | - | - |
| 10 | FAQ (6 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 11 | Final CTA ("Votre prochain packshot") | Pas d'image | C (pas necessaire) | Section CTA de fermeture, texte impactant | - | - | - |

**Resume Homepage : 1 image a generer (furniture-large.avif) + 3 images a INTEGRER dans le code (pillar-*.avif dans section Piliers — changement code, pas generation). Why-automate NON recommandees.**

---

## 2. Studios Photo Automatises (`/studios-photo-automatises`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `hero/hero-studios-wide.avif` | 1536x672 | 25 KB | EN PLACE |
| Hero - image droite (xl) | `hero/hero-studios-wide-xl.avif` | 1536x672 | 24 KB | EN PLACE |
| Hero - image droite (lg) | `hero/hero-studios-wide-lg.avif` | 1024x448 | 15 KB | EN PLACE |
| Hero - image droite (md) | `hero/hero-studios-wide-md.avif` | 768x336 | 10 KB | EN PLACE |
| Hero - image droite (sm) | `hero/hero-studios-wide-sm.avif` | 640x280 | 8 KB | EN PLACE |
| Pilier Hardware | `illustrations/pillar-hardware.avif` | 1024x1024 | 22 KB | EN PLACE |
| Pilier IA | `illustrations/pillar-ia.avif` | 1024x1024 | 33 KB | EN PLACE |
| Pilier Formation | `illustrations/pillar-formation.avif` | 1024x1024 | 28 KB | EN PLACE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | Image EN PLACE (hero-studios-wide) | OK | - | - | - | - |
| 2 | Social Proof (stats + logos) | Stats + 8 logos SVG EN PLACE | OK | - | - | - | - |
| 3 | Approche PackshotCreator (3 piliers) | 3 pillar AVIF EN PLACE | OK | - | - | - | - |
| 4 | Types de visuels (4 cards bento) | Pas d'image (PROBLEME MAJEUR) | A (integrer existants) | 4 cards decrivant des types de PHOTOS sans montrer d'exemple. Les images EXISTENT dans gallery/ mais ne sont pas dans le code. Packshot=gallery/packshot-fondBlanc.avif, 360=gallery/360-product.avif, Mode=gallery/fashion-model.avif, Flat-lay=gallery/flatlay-composition.avif | 600x400 | gallery/*.avif (EXISTENT) | HAUTE (code only) |
| 5 | Grille 16 machines | 16 images machines AVIF EN PLACE | OK | - | - | - | - |
| 6 | Accompagnement A a Z (3 etapes) | Pas d'image | C (garder aere) | Section texte, timeline horizontale. Design propre sans image. | - | - | - |
| 7 | CTA ROI ("Quel est le vrai cout") | Pas d'image | C (pas necessaire) | Bandeau CTA simple | - | - | - |
| 8 | FAQ (6 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 9 | Final CTA (Demo + Guide) | Pas d'image | C (pas necessaire) | 2 cards CTA cote a cote | - | - | - |
| 10 | Cross-links (3 cards) | Pas d'image | C (pas necessaire) | Liens vers IA, Industries, Academy | - | - | - |

**Resume Studios : 0 image a generer, mais 4 images a INTEGRER dans le code (gallery/*.avif dans cards "Types de visuels" — changement code, pas generation). C'est le probleme le plus visible du site : une page photo qui ne montre pas de photos.**

---

## 3. IA Photo Produit (`/ia-photo-produit`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `illustrations/pillar-ia.avif` | 1024x1024 | 33 KB | EN PLACE |
| Hero - fond (pas utilise) | `hero/hero-ia-lifestyle.avif` | 1344x768 | 35 KB | EXISTE |
| Before/After cosmetiques (before) | `before-after/ia-before-after-cosmetiques-1-before.avif` | 1024x1024 | 19 KB | EN PLACE |
| Before/After cosmetiques (after) | `before-after/ia-before-after-cosmetiques-1-after.avif` | 1024x1024 | 107 KB | EN PLACE |
| Before/After mode (before) | `before-after/ia-before-after-mode-1-before.avif` | 1024x1024 | 9 KB | EN PLACE |
| Before/After mode (after) | `before-after/ia-before-after-mode-1-after.avif` | 1024x1024 | 17 KB | EN PLACE |
| Feature integration | `illustrations/ia-feature-integration.avif` | 864x1184 | 22 KB | EN PLACE |
| Feature background generator | `illustrations/ia-feature-background-generator.avif` | 864x1184 | 16 KB | EN PLACE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | pillar-ia.avif EN PLACE | OK | - | - | - | - |
| 2 | Philosophie ("L'IA ne remplace pas la photo") | Pas d'image | C (garder aere) | 3 cards texte. Le message conceptuel passe mieux sans image. | - | - | - |
| 3 | Comparatif "Packshot+IA vs IA pure" (2 cards bento) | Pas d'image | A (AVIF transparent) | Section CLE de differenciation : montre pourquoi BlendAI > IA generique. 2 images side-by-side : resultat BlendAI (fidele au produit) vs resultat IA pure (hallucinations, distorsions). Argument de vente central | 800x400 | illustrations/comparatif-blendai-vs-ia-pure.avif | HAUTE |
| 4 | BlendAI Platform (4 features floating card) | Pas d'image | A (screenshot interface) | Card flottante sur fond noir. Un screenshot de l'interface BlendAI.studio ajouterait credibilite et concretiserait l'outil | 800x500 | illustrations/blendai-interface-screenshot.avif | MOYENNE |
| 5 | Fonctionnalites (4 outils bento) | 2 illustrations probablement EN PLACE mais non rendues (reduce motion?) | A (2 images manquantes) | Hero card "Lifestyle" aux 2/3 vide — BESOIN d'un exemple resultat lifestyle. Card "Arriere-plans" — montage grille multi-fonds. Les 2 autres cards (Retouche, Batch) OK en texte | 600x400 | illustrations/ia-feature-lifestyle-result.avif + ia-feature-backgrounds-grid.avif | HAUTE |
| 6 | Resultats concrets (4 before/after sliders) | 4 paires AVIF EN PLACE (cosmetiques, mode, bijoux, decoration) | OK | Excellent — section la plus impactante de la page | - | - | - |
| 7 | Stats + Testimonial | Pas d'image | C (garder aere) | Chiffres (100+, 5000+, 4.9/5) + citation | - | - | - |
| 8 | Integration Orbitvu | 1 image EN PLACE (ia-feature-integration) | OK | - | - | - | - |
| 9 | FAQ (5 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 10 | CTA ("Transformer vos visuels") | Pas d'image | C (pas necessaire) | - | - | - | - |
| 11 | Cross-links (3 cards) | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume IA : 4 images a generer (comparatif HAUTE, 2 features HAUTE, screenshot MOYENNE). La section before/after est excellente mais les sections Comparatif et Fonctionnalites ne montrent pas ce qu'elles decrivent.**

---

## 4. Academy (`/academy`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `illustrations/pillar-formation.avif` | 1024x1024 | 28 KB | EN PLACE |
| Hero - fond (pas utilise) | `hero/hero-academy.avif` | 1344x768 | 21 KB | EXISTE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | pillar-formation.avif EN PLACE | OK | - | - | - | - |
| 2 | Certifie Qualiopi (badges) | Pas d'image | C (garder aere) | 4 badges texte + icones. Clean. | - | - | - |
| 3 | Nos Formations (2 cards) | Pas d'image | C (garder aere) | Cards formation packshot + IA, texte suffisant | - | - | - |
| 4 | Outils & Ressources (2 cards) | Pas d'image | C (garder aere) | Simulateur OPCO + Calendrier | - | - | - |
| 5 | FAQ (5 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 6 | CTA ("Monter en competences") | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume Academy : 0 image a generer. Page informative, design epure adequat.**

---

## 5. Formations Packshot (`/academy/formations-packshot`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `illustrations/pillar-hardware.avif` | 1024x1024 | 22 KB | EN PLACE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | pillar-hardware.avif EN PLACE | OK | - | - | - | - |
| 2 | Pourquoi se former (3 cards) | Pas d'image | C (garder aere) | Productivite x10, Qualite pro, ROI rapide -- texte + icones | - | - | - |
| 3 | Catalogue formations (3 cards) | Pas d'image | C (garder aere) | Prise en main, Avance 360, Expert Workflow -- cards texte | - | - | - |
| 4 | Certification Qualiopi + OPCO | Pas d'image | C (garder aere) | Badges + listes texte | - | - | - |
| 5 | CTA ("Pret a vous former") | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume Formations Packshot : 0 image a generer.**

---

## 6. Formations IA (`/academy/formations-ia`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `illustrations/pillar-ia.avif` | 1024x1024 | 33 KB | EN PLACE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | pillar-ia.avif EN PLACE | OK | - | - | - | - |
| 2 | Pourquoi se former (3 cards) | Pas d'image | C (garder aere) | Creativite augmentee, Qualite pro, Performance prouvee | - | - | - |
| 3 | Catalogue formations (3 cards) | Pas d'image | C (garder aere) | Decouverte, Avance Workflow, Expert Strategie | - | - | - |
| 4 | Ce que vous apprendrez (4 cards) | Pas d'image | C (garder aere) | Backgrounds, Shadow, Workflow, ROI -- texte clair | - | - | - |
| 5 | Certification Qualiopi + OPCO | Pas d'image | C (garder aere) | Badges + listes texte | - | - | - |
| 6 | CTA ("Revolutionner votre creation") | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume Formations IA : 0 image a generer.**

---

## 7. Formation Detail (`/academy/[slug]`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | -- |

---

## 8. Calendrier (`/academy/calendrier`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | -- |

---

## 9. Simulateur OPCO (`/academy/simulateur-opco`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | -- |

---

## 10. Industrie Hub (`/industrie`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `hero/hero-industries.avif` | 1344x768 | 21 KB | EN PLACE |
| Hero - image droite (xl) | `hero/hero-industries-xl.avif` | 1344x768 | 20 KB | EN PLACE |
| Hero - image droite (lg) | `hero/hero-industries-lg.avif` | 1024x585 | 13 KB | EN PLACE |
| Hero - image droite (md) | `hero/hero-industries-md.avif` | 768x439 | 9 KB | EN PLACE |
| Hero - image droite (sm) | `hero/hero-industries-sm.avif` | 640x366 | 7 KB | EN PLACE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | hero-industries.avif EN PLACE | OK | - | - | - | - |
| 2 | 14 Secteurs (grid cards) | Pas d'image dans cards | C (garder aere) | Cards avec titres + descriptions. Clean et scannable. | - | - | - |
| 3 | Cas concrets (4 temoignages) | Pas d'image | C (garder aere) | Cards texte avec secteur tag + stats. Efficace. | - | - | - |
| 4 | Avantages (3 cards) | Pas d'image | C (garder aere) | Production Acceleree, ROI Rapide, Coherence Absolue -- texte | - | - | - |
| 5 | Processus (Packshot->IA->Diffusion) | Pas d'image | C (garder aere) | Timeline 3 etapes texte. Design structure suffisant. | - | - | - |
| 6 | FAQ (5 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 7 | CTA ("Quel est votre secteur") | Pas d'image | C (pas necessaire) | 2 cards CTA | - | - | - |
| 8 | Cross-links (3 cards) | Pas d'image | C (pas necessaire) | Liens Studios, IA, Academy | - | - | - |

**Resume Industrie Hub : 0 image a generer. Hero en place, reste text-only et efficace.**

---

## 11. Industrie / Secteurs (`/industrie/[slug]`) -- 12 pages

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - image droite | `hero/hero-secteur-{slug}.avif` (dynamique) | 1344x768 | 16-52 KB | EN PLACE |

Images secteurs avec dimensions et variantes responsives :

| Secteur | Base (avif) | Dimensions | Poids | xl | lg | md | sm |
|---------|------------|-----------|-------|-----|-----|-----|-----|
| automobile | `hero-secteur-automobile.avif` | 1344x768 | 52 KB | 1344x768 (51 KB) | 1024x585 (35 KB) | 768x439 (23 KB) | 640x366 (18 KB) |
| bijoux | `hero-secteur-bijoux.avif` | 1344x768 | 34 KB | 1344x768 (33 KB) | 1024x585 (23 KB) | 768x439 (15 KB) | 640x366 (11 KB) |
| chaussures | `hero-secteur-chaussures.avif` | 1344x768 | 26 KB | 1344x768 (25 KB) | 1024x585 (18 KB) | 768x439 (12 KB) | 640x366 (10 KB) |
| cosmetiques | `hero-secteur-cosmetiques.avif` | 1344x768 | 17 KB | 1344x768 (17 KB) | 1024x585 (12 KB) | 768x439 (9 KB) | 640x366 (7 KB) |
| food | `hero-secteur-food.avif` | 1344x768 | 38 KB | 1344x768 (37 KB) | 1024x585 (24 KB) | 768x439 (16 KB) | 640x366 (12 KB) |
| hightech | `hero-secteur-hightech.avif` | 1344x768 | 19 KB | 1344x768 (18 KB) | 1024x585 (14 KB) | 768x439 (10 KB) | 640x366 (8 KB) |
| jouets | `hero-secteur-jouets.avif` | 1344x768 | 16 KB | 1344x768 (15 KB) | 1024x585 (11 KB) | 768x439 (7 KB) | 640x366 (6 KB) |
| mobilier | `hero-secteur-mobilier.avif` | 1344x768 | 21 KB | 1344x768 (20 KB) | 1024x585 (16 KB) | 768x439 (11 KB) | 640x366 (9 KB) |
| mode | `hero-secteur-mode.avif` | 1344x768 | 32 KB | 1344x768 (31 KB) | 1024x585 (20 KB) | 768x439 (12 KB) | 640x366 (9 KB) |
| pieces-tech | `hero-secteur-pieces-tech.avif` | 1344x768 | 21 KB | 1344x768 (20 KB) | 1024x585 (14 KB) | 768x439 (9 KB) | 640x366 (7 KB) |
| sante | `hero-secteur-sante.avif` | 1344x768 | 16 KB | 1344x768 (16 KB) | 1024x585 (12 KB) | 768x439 (9 KB) | 640x366 (7 KB) |
| sport | `hero-secteur-sport.avif` | 1344x768 | 38 KB | 1344x768 (37 KB) | 1024x585 (25 KB) | 768x439 (17 KB) | 640x366 (13 KB) |

Exemples produits par secteur (pages secteurs) :

| Image | Dimensions | Poids | Status |
|-------|-----------|-------|--------|
| `illustrations/exemple-produit-automobile-3.avif` | 1024x1024 | 39 KB | EN PLACE |
| `illustrations/exemple-produit-chaussures-2.avif` | 1024x1024 | 93 KB | EN PLACE |
| `illustrations/exemple-produit-chaussures-3.avif` | 1024x1024 | 32 KB | EN PLACE |
| `illustrations/exemple-produit-mobilier-3.avif` | 1024x1024 | 23 KB | EN PLACE |
| `illustrations/exemple-produit-mode-3.avif` | 1024x1024 | 84 KB | EN PLACE |
| `illustrations/exemple-produit-pieces-tech-1.avif` | 1024x1024 | 81 KB | EN PLACE |
| `illustrations/exemple-produit-pieces-tech-3.avif` | 1024x1024 | 41 KB | EN PLACE |
| `illustrations/exemple-produit-sante-2.avif` | 1024x1024 | 45 KB | EN PLACE |

### Recommandations section par section - template secteur (S1-bis)

Audit sur 3 pages representatives : cosmetiques-beaute, automobile, bijoux-joaillerie.
Le template secteur est identique pour les 14 pages (12 existantes + 2 nouvelles industrie/defense).

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | hero-secteur-{slug}.avif EN PLACE (12/12) | OK | Les 12 hero secteurs existants sont tous en place avec variantes responsives | - | - | - |
| 2 | Defis photo (4-5 bullets) | Pas d'image | C (garder aere) | Liste de defis secteur-specifiques. Texte concis. | - | - | - |
| 3 | Solutions (2 blocs : Studio + BlendAI) | Pas d'image | C (garder aere) | Listes detaillees. Le texte technique suffit. | - | - | - |
| 4 | Cas clients (1 case study) | Pas d'image | C (garder aere) | Card temoignage avec stats. | - | - | - |
| 5 | FAQ (4 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 6 | CTA ("Sublimez vos...") | Pas d'image | C (pas necessaire) | - | - | - | - |
| 7 | Autres secteurs (grid links) | Pas d'image | C (pas necessaire) | Navigation inter-secteurs | - | - | - |

**Note : 2 nouveaux secteurs a creer (industrie-manufacturiere, defense-securite) auront besoin de hero images.**

| Secteur manquant | Fichier propose | Dimensions | Priorite |
|-----------------|----------------|------------|----------|
| industrie-manufacturiere | `hero/hero-secteur-industrie-manufacturiere.avif` + variantes (xl/lg/md/sm) | 1344x768 | HAUTE |
| defense-securite | `hero/hero-secteur-defense-securite.avif` + variantes (xl/lg/md/sm) | 1344x768 | HAUTE |

**Resume Secteurs : 2 hero images a generer pour les 2 nouveaux secteurs. Reste 100% texte = OK.**

---

## 12. Industrie & Defense (`/industrie-defense`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | A FOURNIR (optionnel) |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero | Pas d'image | B (background) | Photo industrielle : ligne de production, atelier precision, inspection piece -- avec overlay gradient future-dusk | 1344x768 + variantes | hero/hero-industrie-defense.avif (+ xl/lg/md/sm) | HAUTE |
| 2 | Pourquoi automatiser (4 pain points) | Pas d'image | C (garder aere) | Cards texte problemes industriels | - | - | - |
| 3 | 8 Technologies Orbitvu (grid) | Pas d'image | C (garder aere) | Grid 8 cards texte avec icones. Dense mais lisible. | - | - | - |
| 4 | 6 Segments industriels | Pas d'image | C (garder aere) | Cards texte avec normes (AS9100, ITAR, etc.) | - | - | - |
| 5 | Resultats mesures (4 stats) | Pas d'image | C (garder aere) | Ruban stats (-90%, 500+, 1 EUR, 30 Mrd) | - | - | - |
| 6 | Cas d'usage (4 use cases : FAI, anti-contrefacon, catalogage, MRO) | Pas d'image | A (2 images resultats) | Section qui decrit des RESULTATS VISUELS concrets sans les montrer. Au minimum : 1 photo piece inspectee (FAI/SuperFocus) + 1 comparaison avant/apres (MRO/Ghost Image) | 600x400 | illustrations/usecase-fai-inspection.avif + usecase-mro-before-after.avif | MOYENNE |
| 7 | Systemes recommandes (3 machines) | Images machines EN PLACE | OK | Reutilise les images machines existantes | - | - | - |
| 8 | Conformite normes (badges) | Pas d'image | C (garder aere) | 7 badges normes + 4 bullets. Design badges suffisant. | - | - | - |
| 9 | FAQ (7 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 10 | CTA ("Etudions votre projet") | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume Industrie-Defense : 1 hero HAUTE + 2 cas d'usage MOYENNE + 2 techs BASSE = 5 images. Page la plus text-heavy du site — le hero noir vide est un probleme critique d'UX.**

---

## 13. Machines (`/studio-photo/[slug]`) -- 16 pages

| Image | Dimensions | Poids | Status |
|-------|-----------|-------|--------|
| `machines/alphashot-micro-v2.avif` | 650x650 | 7 KB | EN PLACE |
| `machines/alphashot-360.avif` | 753x550 | 8 KB | EN PLACE |
| `machines/alphashot-pro-g2.avif` | 1000x1000 | 7 KB | EN PLACE |
| `machines/alphashot-xl.avif` | 549x550 | 6 KB | EN PLACE |
| `machines/alphatable-alphadesk.avif` | 601x550 | 17 KB | EN PLACE |
| `machines/alphastudio-compact.avif` | 576x550 | 4 KB | EN PLACE |
| `machines/alphastudio-xxl.avif` | 414x550 | 3 KB | EN PLACE |
| `machines/fashion-studio.avif` | 818x550 | 7 KB | EN PLACE |
| `machines/bike-studio.avif` | 820x550 | 8 KB | EN PLACE |
| `machines/furniture-studio.avif` | 1381x1324 | 8 KB | EN PLACE |
| `machines/ecomm-studio-plus.avif` | 1381x1324 | 8 KB | EN PLACE |
| `machines/turntable-g2.avif` | 1000x1000 | 5 KB | EN PLACE |

Placeholders (machines sans photo reelle) :

| Image | Format | Status |
|-------|--------|--------|
| `machines/placeholder-flatlay.svg` | SVG | EN PLACE |
| `machines/placeholder-large.svg` | SVG | EN PLACE |
| `machines/placeholder-medium.svg` | SVG | EN PLACE |
| `machines/placeholder-small.svg` | SVG | EN PLACE |
| `machines/placeholder-xlarge.svg` | SVG | EN PLACE |

Hero slides machines (utilises dans le carrousel) :

| Image | Dimensions | Poids | Variantes |
|-------|-----------|-------|-----------|
| `hero/alphashot-360-slide.avif` | 1134x1134 | 16 KB | xl=1134x1134 (26 KB), lg=1024x1024 (37 KB), md=768x768 (28 KB), sm=640x640 (22 KB) |
| `hero/alphashot-micro-v2-slide.avif` | 1000x1000 | 20 KB | xl=1000x1000 (32 KB), lg=1000x1000 (32 KB), md=768x768 (30 KB), sm=640x640 (24 KB) |
| `hero/furniture-studio-slide.avif` | 1000x1000 | 7 KB | xl=1000x1000 (12 KB), lg=1000x1000 (12 KB), md=768x768 (14 KB), sm=640x640 (12 KB) |

### Recommandations section par section - template machine (S1-bis)

Audit sur la page representative : alphashot-pro-g2 (appliquable aux 16 pages produit).

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero (machine + specs) | Image machine AVIF EN PLACE | OK | Chaque machine a son AVIF. 5 ont un placeholder SVG (a remplacer si possible). | - | - | - |
| 2 | IA Ready (compatibilite BlendAI) | Pas d'image | C (garder aere) | Badge + texte. | - | - | - |
| 3 | Stats (3 chiffres cles) | Pas d'image | C (garder aere) | Ruban stats (250 prod/j, 74 LED, 100% auto) | - | - | - |
| 4 | Avantages cles (3 bullets) | Pas d'image | C (garder aere) | Liste courte | - | - | - |
| 5 | Caracteristiques techniques | Pas d'image | C (garder aere) | Tableau specs | - | - | - |
| 6 | Cas d'usage + Points d'attention | Pas d'image | C (garder aere) | Listes | - | - | - |
| 7 | CTA Demo | Pas d'image | C (pas necessaire) | - | - | - | - |
| 8 | Systemes similaires (3 cards) | Images machines EN PLACE | OK | - | - | - | - |
| 9 | Calculateur ROI | Pas d'image | C (pas necessaire) | Lien vers calculateur | - | - | - |
| 10 | Formation recommandee | Pas d'image | C (garder aere) | Card formation + badges Qualiopi/OPCO | - | - | - |
| 11 | FAQ (4 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 12 | CTA Final | Pas d'image | C (pas necessaire) | - | - | - | - |

**Note : 5 machines utilisent des placeholders SVG (flatlay, large, medium, small, xlarge). Remplacer par des photos reelles serait ideal mais BASSE priorite -- les placeholders sont fonctionnels.**

**Resume Machines : 0 image a generer. Pages produit bien structurees.**

---

## 14. Selecteur Machines (`/studio-photo/selecteur-machines`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Images machines | memes que section 13 (dynamique) | -- | -- | EN PLACE |

---

## 15. Contact (`/contact`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - fond (pas utilise) | `hero/hero-contact.avif` | 1344x768 | 19 KB | EXISTE |
| Hero - fond (xl) | `hero/hero-contact-xl.avif` | 1344x768 | 18 KB | EXISTE |
| Hero - fond (lg) | `hero/hero-contact-lg.avif` | 1024x585 | 12 KB | EXISTE |
| Hero - fond (md) | `hero/hero-contact-md.avif` | 768x439 | 7 KB | EXISTE |
| Hero - fond (sm) | `hero/hero-contact-sm.avif` | 640x366 | 5 KB | EXISTE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero ("Contactez-nous") | Pas d'image (hero-contact EXISTE mais pas utilise) | C (garder aere) | Page formulaire. Le design epure met l'accent sur l'action (remplir le formulaire). Une image distrairait. | - | - | - |
| 2 | Trust badges (3 badges) | Pas d'image | C (garder aere) | "Reponse sous 24h", "500+ entreprises", "Demo gratuite" | - | - | - |
| 3 | Formulaire + Coordonnees + mini-FAQ | Pas d'image | C (garder aere) | Formulaire 3CX + carte/coordonnees. Fonctionnel. | - | - | - |

**Resume Contact : 0 image a generer. Les hero-contact.avif EXISTENT dans le dossier mais ne sont PAS recommandees pour le design actuel (formulaire-first).**

---

## 16. A propos (`/a-propos`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - fond (pas utilise) | `hero/hero-a-propos.avif` | 1344x768 | 30 KB | EXISTE |
| Hero - fond (xl) | `hero/hero-a-propos-xl.avif` | 1344x768 | 29 KB | EXISTE |
| Hero - fond (lg) | `hero/hero-a-propos-lg.avif` | 1024x585 | 20 KB | EXISTE |
| Hero - fond (md) | `hero/hero-a-propos-md.avif` | 768x439 | 13 KB | EXISTE |
| Hero - fond (sm) | `hero/hero-a-propos-sm.avif` | 640x366 | 10 KB | EXISTE |
| Timeline innovation | `illustrations/timeline-innovation-6.avif` | 1024x1024 | 21 KB | EN PLACE |

### Recommandations section par section (S1-bis)

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero ("PackshotCreator") | Pas d'image (hero-a-propos EXISTE mais pas utilise) | A (AVIF transparent) | Photo equipe PackshotCreator dans le showroom avec studios Orbitvu visibles. Page entreprise sans visage humain = froid et impersonnel. Critique pour la confiance. | 1024x768 | illustrations/team-showroom.avif | HAUTE |
| 2 | Notre Histoire | Pas d'image | C (garder aere) | 2 paragraphes texte. | - | - | - |
| 3 | Nos Valeurs (3 cards) | Pas d'image | C (garder aere) | Innovation, Performance, Excellence -- icones + texte | - | - | - |
| 4 | Timeline Innovation (9 dates) | 1 image supposee EN PLACE (timeline-innovation-6) mais non rendue | A (2-3 milestones) | 9 dates d'innovation PHYSIQUE (studios, robots, machines) sans montrer les produits. Au minimum 2023 (Orbitvu) et 2024 (Alphashot+IA) — images machines EXISTENT deja | 400x300 | Reutiliser machines/*.avif pour milestones recentes | BASSE |
| 5 | Chiffres (4 stats) | Pas d'image | C (garder aere) | 20+, 150, 4000m2, 16+ studios | - | - | - |
| 6 | CTA ("Travaillons Ensemble") | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume A propos : 1 image HAUTE (equipe/showroom) + 2-3 images timeline BASSE. Page entreprise 100% texte = manque de chaleur humaine.**

---

## 17. Blog (`/blog`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Hero - fond (pas utilise) | `hero/hero-blog.avif` | 1344x768 | 21 KB | EXISTE |
| Hero - fond (xl) | `hero/hero-blog-xl.avif` | 1344x768 | 20 KB | EXISTE |
| Hero - fond (lg) | `hero/hero-blog-lg.avif` | 1024x585 | 13 KB | EXISTE |
| Hero - fond (md) | `hero/hero-blog-md.avif` | 768x439 | 8 KB | EXISTE |
| Hero - fond (sm) | `hero/hero-blog-sm.avif` | 640x366 | 6 KB | EXISTE |
| Articles | dynamique (Sanity/Webflow) | -- | -- | -- |

---

## 18. Blog Article (`/blog/[slug]`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Image article | dynamique (Sanity/Webflow) | -- | -- | -- |

Images blog statiques disponibles :

| Image | Dimensions | Poids | Status |
|-------|-----------|-------|--------|
| `blog/article-ia-lumieres-virtuelles.avif` | 6720x4480 | 389 KB | EN PLACE (TROP GRANDE) |
| `blog/article-logiciel-perdu.avif` | 810x817 | 57 KB | EN PLACE |
| `blog/article-multi-camera-3d.avif` | 8688x5792 | 268 KB | EN PLACE (TROP GRANDE) |
| `blog/thumbnail-article-nouveau-2.avif` | 1344x768 | 41 KB | EN PLACE |
| `blog/thumbnail-article-nouveau-3.avif` | 1344x768 | 36 KB | EN PLACE |
| `blog/thumbnail-article-nouveau-5.avif` | 1344x768 | 42 KB | EN PLACE |

**ATTENTION** : 2 images blog ont des dimensions enormes (6720x4480 et 8688x5792). A redimensionner.

---

## 19. Guide (`/guide`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | -- |

---

## 20. Guide Detail (`/guide/[slug]`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Images etapes | dynamique (Webflow API) | -- | -- | -- |

---

## 21. Besoins Photo Produit (`/besoins-photographie-produit`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | -- |

---

## 22. Questions Cles (`/questions-cles-photographie-produit`)

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image statique | -- | -- | -- | -- |

---

## 23-27. Landings SEO (via template) -- 5 pages

Pages : `/packshot-e-commerce`, `/packshot-amazon`, `/packshot-bijoux`, `/packshot-mode`, `/packshot-industriel`

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Images machines | dynamique (memes que section 13) | -- | -- | EN PLACE |

### Recommandations section par section - PackshotLandingTemplate (S1-bis)

Audit sur la page representative : packshot-bijoux (appliquable aux 5 landings SEO).

| # | Section | Type actuel | Reco | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|------|-------------------|------------|---------|----------|
| 1 | Hero (titre + CTA) | Pas d'image (PROBLEME) | A (AVIF transparent) | Landing SEO sur un TYPE de photo sans montrer un seul exemple. Chaque landing a besoin d'un hero illustrant sa niche : bijoux macro, mode portee, packshot e-commerce, format Amazon, piece industrielle | 800x600 | illustrations/hero-landing-{niche}.avif | HAUTE |
| 2 | Stats (3 chiffres) | Pas d'image | C (garder aere) | 10x, 100%, -80% -- ruban stats | - | - | - |
| 3 | Avantages (5 cards) | Pas d'image | C (garder aere) | Cards avantages texte. Section dense, pas besoin d'images. | - | - | - |
| 4 | Systemes recommandes (2 machines) | Images machines EN PLACE | OK | Reutilise les AVIF machines existantes | - | - | - |
| 5 | FAQ (3 questions) | Pas d'image | C (pas necessaire) | - | - | - | - |
| 6 | CTA ("Pret a sublimer...") | Pas d'image | C (pas necessaire) | - | - | - | - |
| 7 | Cross-links (3 cards) | Pas d'image | C (pas necessaire) | - | - | - | - |

**Resume Landings SEO : 5 hero images a generer (1 par landing, adaptee a la niche). Des landings qui vendent de la PHOTO sans montrer de photo — c'est un non-sens commercial.**

---

## 28-30. Pages legales -- 3 pages

Pages : `/cgu`, `/confidentialite`, `/mentions-legales`

| Emplacement | Image | Dimensions | Poids | Status |
|-------------|-------|-----------|-------|--------|
| Aucune image | -- | -- | -- | pas necessaire |

---

## Composants partages (Header, Footer, etc.)

| Composant | Image | Dimensions | Poids | Status |
|-----------|-------|-----------|-------|--------|
| Header | `logos/packshot-creator-logo.svg` | SVG | -- | EN PLACE |
| Footer | `logos/packshot-creator-logo.svg` | SVG | -- | EN PLACE |
| ClientLogos (20) | `logos/client-*.svg` (20 fichiers) | SVG | ~2 KB chacun | EN PLACE |
| TailorMadeSection | `illustrations/pillar-hardware.avif` | 1024x1024 | 22 KB | EN PLACE |

Logos clients disponibles (20 fichiers SVG) :
`client-amazon`, `client-bosch`, `client-castel-freres`, `client-chanel`, `client-essilor-luxottica`, `client-europart`, `client-gs1`, `client-intersport`, `client-jagermeister`, `client-leclaireur`, `client-lidl`, `client-pure-red`, `client-sacla`, `client-sandro`, `client-seiko`, `client-severin`, `client-valentino`, `client-william-grant-sons`, `client-wurth`, `client-zoomalia`

---

## RESUME GLOBAL AUDIT S1-bis (22 mars 2026) — v2 audit visuel complet

### Images a generer -- liste priorisee

**HAUTE PRIORITE (bloquant / impact conversion direct)**

| # | Image | Type | Page(s) | Description | Dimensions | Fichier propose |
|---|-------|------|---------|-------------|------------|----------------|
| 1 | Hero industrie-defense | B | /industrie-defense | Photo industrielle : atelier precision, inspection piece, ligne de production. Overlay gradient future-dusk | 1344x768 + variantes | hero/hero-industrie-defense.avif |
| 2 | Hero secteur industrie-manufacturiere | B | /industrie/industrie-manufacturiere | Usine/chaine, pieces metalliques. Style des 12 hero secteurs existants | 1344x768 + variantes | hero/hero-secteur-industrie-manufacturiere.avif |
| 3 | Hero secteur defense-securite | B | /industrie/defense-securite | Equipement militaire, maintenance, inspection. Style des 12 hero secteurs existants | 1344x768 + variantes | hero/hero-secteur-defense-securite.avif |
| 4 | Hero landing packshot-bijoux | A | /packshot-bijoux | Macro bijou (bague ou collier), eclats pierres, fond transparent | 800x600 | illustrations/hero-landing-bijoux.avif |
| 5 | Hero landing packshot-mode | A | /packshot-mode | Photo mode portee ou flat-lay vetement, fond transparent | 800x600 | illustrations/hero-landing-mode.avif |
| 6 | Hero landing packshot-e-commerce | A | /packshot-e-commerce | Packshot produit fond blanc type e-commerce, fond transparent | 800x600 | illustrations/hero-landing-ecommerce.avif |
| 7 | Hero landing packshot-amazon | A | /packshot-amazon | Packshot format Amazon avec reperes conformite, fond transparent | 800x600 | illustrations/hero-landing-amazon.avif |
| 8 | Hero landing packshot-industriel | A | /packshot-industriel | Piece technique photographiee en studio, fond transparent | 800x600 | illustrations/hero-landing-industriel.avif |
| 9 | Photo equipe/showroom | A | /a-propos | Photo equipe PackshotCreator dans le showroom avec studios Orbitvu visibles. Humanise la page entreprise | 1024x768 | illustrations/team-showroom.avif |
| 10 | Types visuels : packshot | A | /studios-photo-automatises | Exemple packshot fond blanc (pour card bento "Packshot Fond Blanc") | 600x400 | Reutiliser gallery/packshot-fondBlanc.avif (EN PLACE) |
| 11 | Types visuels : 360 | A | /studios-photo-automatises | Exemple spin 360 (pour card bento "Photo & Video 360") | 600x400 | Reutiliser gallery/360-product.avif (EN PLACE) |
| 12 | Types visuels : mode | A | /studios-photo-automatises | Exemple mode portee (pour card bento "Mode & Mannequin") | 600x400 | Reutiliser gallery/fashion-model.avif (EN PLACE) |
| 13 | Types visuels : flat-lay | A | /studios-photo-automatises | Exemple flat-lay (pour card bento "Flat-Lay & Vue de Dessus") | 600x400 | Reutiliser gallery/flatlay-composition.avif (EN PLACE) |
| 14 | Galerie furniture (manquante) | A | / (galerie homepage) | Meuble/canape sur fond transparent | 600x400 | gallery/furniture-large.avif |
| 15 | Comparatif IA qualite | A | /ia-photo-produit | 2 images side-by-side : resultat BlendAI (fidele) vs resultat IA pure (distorsions). Pour la section Comparatif | 800x400 | illustrations/comparatif-blendai-vs-ia-pure.avif |

**MOYENNE PRIORITE (amelioration significative)**

| # | Image | Type | Page(s) | Description | Dimensions | Fichier propose |
|---|-------|------|---------|-------------|------------|----------------|
| 16 | Screenshot interface BlendAI | A | /ia-photo-produit | Capture ecran de l'interface BlendAI.studio montrant upload+generation | 800x500 | illustrations/blendai-interface-screenshot.avif |
| 17 | Feature "Lifestyle" (IA) | A | /ia-photo-produit | Exemple resultat mise en scene lifestyle (packshot → scene) pour hero card fonctionnalites | 600x400 | illustrations/ia-feature-lifestyle-result.avif |
| 18 | Feature "Arriere-plans" (IA) | A | /ia-photo-produit | Meme produit avec 3-4 fonds differents, montage grille | 600x400 | illustrations/ia-feature-backgrounds-grid.avif |
| 19 | Cas usage FAI (industrie-defense) | A | /industrie-defense | Piece precision documentee (focus stacking, multi-angles) | 600x400 | illustrations/usecase-fai-inspection.avif |
| 20 | Cas usage MRO (industrie-defense) | A | /industrie-defense | Comparaison avant/apres maintenance piece (Ghost Image) | 600x400 | illustrations/usecase-mro-before-after.avif |

**BASSE PRIORITE (nice-to-have)**

| # | Image | Type | Page(s) | Description | Dimensions | Fichier propose |
|---|-------|------|---------|-------------|------------|----------------|
| 21 | Timeline 2023 Orbitvu | A | /a-propos | Photo alliance/showroom Orbitvu pour milestone timeline | 400x300 | illustrations/timeline-2023-orbitvu.avif |
| 22 | Timeline 2024 IA | A | /a-propos | Photo Alphashot Pro G2 pour milestone timeline (reutiliser machines/alphashot-pro-g2.avif) | 400x300 | Reutiliser machines/alphashot-pro-g2.avif |
| 23 | Tech SuperFocus (industrie) | A | /industrie-defense | Exemple resultat focus stacking macro (micro-composant) | 400x300 | illustrations/tech-superfocus-result.avif |
| 24 | Tech Ghost Image (industrie) | A | /industrie-defense | Exemple comparaison avant/apres degradation piece | 400x300 | illustrations/tech-ghost-image-result.avif |

**NOTE : Integration code necessaire (pas juste generation d'images)**
Les images #10-13 (types visuels) EXISTENT deja dans gallery/ mais ne sont PAS integrees dans le code de la section "Types de visuels" de la page Studios. C'est un changement de code, pas une generation d'image.
De meme, les pillar-*.avif EXISTENT mais ne sont pas utilisees sur la homepage (seulement sur Studios). Un changement de code permettrait de les reutiliser.

### Comptage final

| Page | Images OK | A generer | A integrer (existent deja) | Sections C |
|------|-----------|-----------|---------------------------|------------|
| Homepage (/) | 5 | 1 (furniture) | 3 (pillar-*.avif dans cards piliers) | 6 |
| Studios (/studios-photo-automatises) | 4 | 0 | 4 (gallery/*.avif dans cards types visuels) | 6 |
| IA (/ia-photo-produit) | 5 | 4 (comparatif, screenshot, 2 features) | 0 | 5 |
| Industrie Hub (/industrie) | 1 | 0 | 0 | 7 |
| Academy (3 pages) | 3 | 0 | 0 | 14 |
| Contact (/contact) | 0 | 0 | 0 | 3 |
| A propos (/a-propos) | 1 | 1 (equipe) + 2 (timeline, BASSE) | 0 | 3 |
| Industrie-Defense | 0 | 1 (hero) + 4 (cas usage + techs) | 0 | 5 |
| Landings SEO (x5) | 1 | 5 (hero par landing) | 0 | 30 |
| Machines (x16) | 2 | 0 | 0 | 10 |
| Secteurs (x14) | 1 | 2 (nouveaux secteurs) | 0 | 5 |

### Total

- **Images a GENERER : 15 HAUTE + 5 MOYENNE + 4 BASSE = 24 images**
- **Images a INTEGRER dans le code (existent deja) : 7** (pillar-*.avif sur homepage + gallery/*.avif sur Studios "types de visuels")
- **Sections Type C legimitime : ~94** sur ~102 sections — le design epure est correct pour les sections informationnelles (FAQ, CTA, specs, stats)
- **Verdict : le site a un bon squelette mais manque d'images sur les sections de DEMONSTRATION.** Les sections qui expliquent ce que font les produits/services (types de visuels, fonctionnalites IA, comparatif qualite, cas d'usage industriels, heros des landings) n'illustrent pas leur propos. C'est un paradoxe pour un site de photographie.

### Actions pour le PO (generateur Banana 2 / Gemini)

**Sprint 1 — HAUTE priorite (15 images, ~2-3 sessions)**

1. **3 Hero B (background) pour pages sans hero** : industrie-defense, industrie-manufacturiere, defense-securite. Tons neutres industriels, lumiere directionnelle. 5 variantes responsives chacun (base + xl/lg/md/sm).
2. **5 Hero A (AVIF transparent) pour landings SEO** : bijoux macro, mode portee, packshot e-commerce, format Amazon, piece industrielle. Fond transparent, ombre portee. ~800x600 chacun.
3. **1 Photo equipe/showroom** : photo reelle ou generee du showroom PackshotCreator avec studios Orbitvu. Fond transparent.
4. **1 Comparatif BlendAI vs IA pure** : 2 images cote a cote montrant la difference de fidelite produit. Crucial pour la page IA.
5. **1 Galerie furniture** : meuble/canape sur fond transparent. Derniere image manquante de la galerie homepage.
6. **4 images fonctionnalites IA** (si temps) : screenshot interface BlendAI, resultat lifestyle, grille arriere-plans, resultat comparatif.

**Sprint 2 — Integration code (pas d'image a generer)**

7. **Integrer gallery/*.avif dans les cards "Types de visuels"** de la page Studios (4 images EXISTENT, changement code uniquement).
8. **Integrer pillar-*.avif dans les cards piliers** de la Homepage (3 images EXISTENT, changement code uniquement).

**Sprint 3 — BASSE priorite (4 images)**

9. **2-3 images timeline a-propos** : milestones 2023/2024.
10. **2 images technologies industrie** : SuperFocus et Ghost Image results.

---

## Images before/after disponibles

Dossier `before-after/` -- toutes en 1024x1024 :

**Utilisees (page IA) :**

| Image | Poids | Status |
|-------|-------|--------|
| `ia-before-after-cosmetiques-1-before.avif` | 19 KB | EN PLACE |
| `ia-before-after-cosmetiques-1-after.avif` | 107 KB | EN PLACE |
| `ia-before-after-mode-1-before.avif` | 9 KB | EN PLACE |
| `ia-before-after-mode-1-after.avif` | 17 KB | EN PLACE |

**Disponibles mais pas utilisees (toutes 1024x1024) :**

| Image | Poids (before + after) |
|-------|----------------------|
| `ia-before-after-bijoux-1` | 16 KB + 65 KB |
| `ia-before-after-bijoux-2` | 18 KB + 10 KB |
| `ia-before-after-bijoux-3` | 19 KB + 12 KB |
| `ia-before-after-cosmetiques-2` | 27 KB + 9 KB |
| `ia-before-after-cosmetiques-3` | 87 KB + 4 KB |
| `ia-before-after-decoration-1` | 179 KB + 28 KB |
| `ia-before-after-decoration-2` | 11 KB + 41 KB |
| `ia-before-after-decoration-3` | 24 KB + 23 KB |
| `ia-before-after-mode-2` | 19 KB + 9 KB |
| `ia-before-after-mode-3` | 16 KB + 29 KB |
| `before-after-bijoux` | 15 KB + 71 KB |
| `before-after-chaussures` | 17 KB + 17 KB |
| `before-after-cosmetiques` | 17 KB + 40 KB |
| `before-after-meubles` | 16 KB + 10 KB |

---

## Images lifestyle disponibles (pas utilisees)

Dossier `lifestyle/` -- toutes en 1344x768 :

| Image | Poids |
|-------|-------|
| `lifestyle-jouets-puericulture.avif` | 38 KB |
| `lifestyle-mode-textile.avif` | 51 KB |
| `lifestyle-sante-medical.avif` | 63 KB |

---

## Images background/patterns disponibles (pas utilisees)

Dossier `backgrounds/` :

| Image | Dimensions | Poids |
|-------|-----------|-------|
| `background-cta-soft.avif` | 1344x768 | 29 KB |
| `background-hero-gradient.avif` | 1536x672 | 42 KB |
| `pattern-dots-purple.avif` | 1344x768 | 31 KB |
| `pattern-geometric-minimal.avif` | 1344x768 | 68 KB |
| `pattern-gradient-mesh.avif` | 1344x768 | 55 KB |
| `pattern-waves-subtle.avif` | 1344x768 | 46 KB |
| `texture-brushed-light.avif` | 1344x768 | 35 KB |
| `texture-noise-grain.avif` | 1344x768 | 23 KB |

---

## Images demo disponibles (pas utilisees)

Dossier `demo/` :

| Image | Dimensions | Poids |
|-------|-----------|-------|
| `bouteille-vin.avif` | 1000x1000 | 26 KB |
| `enceinte.webp` | 356x532 | 25 KB |
| `frigidaire.webp` | 796x1280 | 22 KB |
| `manette-jeu.webp` | 1280x991 | 35 KB |

---

## Image OG par defaut

| Image | Dimensions | Poids |
|-------|-----------|-------|
| `og/og-default.avif` | 1200x630 | 36 KB |

---

## Resume des images MANQUANTES (referencees dans le code mais absentes)

| Image | Dimensions attendues | Page |
|-------|---------------------|------|
| `gallery/packshot-fondBlanc.avif` | 800x600 min | Homepage |
| `gallery/360-product.avif` | 800x600 min | Homepage |
| `gallery/fashion-model.avif` | 800x600 min | Homepage |
| `gallery/flatlay-composition.avif` | 800x600 min | Homepage |
| `gallery/jewelry-macro.avif` | 800x600 min | Homepage |
| `gallery/furniture-large.avif` | 800x600 min | Homepage |
| `why-automate/noSkills.avif` | 640x480 min | Homepage |
| `why-automate/scalability.avif` | 640x480 min | Homepage |
| `why-automate/knowHow.avif` | 640x480 min | Homepage |

**9 images manquantes, toutes sur la homepage.**

---

## Alertes qualite

| Probleme | Image | Recommandation |
|----------|-------|---------------|
| Image trop grande | `blog/article-ia-lumieres-virtuelles.avif` (6720x4480, 389 KB) | Redimensionner a 1344x896 max |
| Image trop grande | `blog/article-multi-camera-3d.avif` (8688x5792, 268 KB) | Redimensionner a 1344x896 max |

---

---

## AUDIT VISUEL S1 (22/03/2026) — Images a creer

Audit realise par navigation browser sur sysnext.vercel.app, section par section.
Classification : **A** = AVIF transparent flottant, **B** = photo full-width background, **C** = pas d'image.

### BUG CRITIQUE : Animation opacity (prefers-reduced-motion)

Plusieurs pages ont un hero COMPLETEMENT VIDE car le contenu est en opacity 0 (animation whileInView qui ne se declenche pas avec "Reduce motion" active). Ce bug doit etre corrige AVANT l'integration des images.

**Pages touchees :**
- `/fr/ia-photo-produit` — hero vide (titre + image pillar-ia invisible)
- `/fr/contact` — hero vide (titre invisible)
- `/fr/a-propos` — hero vide + section valeurs partiellement invisible
- `/fr/industrie-defense` — hero vide
- `/fr/studio-photo/[slug]` — image machine droite invisible (rectangle gris)
- `/fr/academy` — image pillar-formation non visible dans le hero

### Images a generer — PRIORITE HAUTE

| # | Page | Section | Type | Description du visuel | Dimensions | Nom de fichier propose | Poids max |
|---|------|---------|------|-----------------------|-----------|----------------------|-----------|
| 1 | Home | S4 Hybrid (heading sticky gauche) | A | Studio Orbitvu en production, vu de 3/4, eclairage studio ambiant. L'appareil capture un produit. Fond transparent + ombre portee. | 1024x1024 | `illustrations/home-hybrid-studio.avif` | 50 KB |
| 2 | Home | S7 Pourquoi automatiser (sous les 3 cartes) | A | Operateur devant un AlphaShot, en train de placer un produit. Ambiance pro, eclairage naturel. Fond transparent + ombre. | 1024x1024 | `illustrations/home-why-automate.avif` | 50 KB |
| 3 | Home | S9 Mid CTA (background) | B | Atelier photo industriel en activite. Plusieurs stations de prise de vue, eclairage LED, produits en cours de capture. Ambiance productive. | 1344x768 + variantes sm/md/lg/xl | `backgrounds/home-cta-atelier.avif` | 80 KB |
| 4 | Home | S11 Final CTA (au-dessus des cartes) | A | Produit packshot resultat — parfum ou cosmetique detoure, fond transparent, ombre portee elegante. Represente le "resultat final". | 1024x1024 | `illustrations/home-final-packshot.avif` | 50 KB |
| 5 | Studios | S4 Types de Visuels (hero card "Packshot Fond Blanc") | A | Produit e-commerce sur fond blanc parfait (ex: sneaker, sac, montre). Detoure net, ombre douce. Illustre le resultat packshot. | 1024x1024 | `illustrations/studios-packshot-result.avif` | 50 KB |
| 6 | IA | S5 Fonctionnalites (hero card "Mises en scene lifestyle") | A | Produit dans une mise en scene lifestyle IA (ex: creme dans salle de bain, casque sur bureau design). Montre le resultat BlendAI. | 1024x1024 | `illustrations/ia-lifestyle-result.avif` | 50 KB |
| 7 | Industrie-Defense | Hero (background) | B | Environnement industriel/defense : lignes de production, pieces techniques, ambiance usine propre. Eclairage industriel. | 1344x768 + variantes sm/md/lg/xl | `hero/hero-industrie-defense.avif` | 80 KB |

### Images a generer — PRIORITE MOYENNE (Packshot Landing Heroes)

Les 5 pages /packshot-* utilisent le meme template. Le hero est actuellement un gradient CSS sans image. Ajouter un background photo specifique par verticale renforcerait l'impact.

| # | Page | Section | Type | Description du visuel | Dimensions | Nom de fichier propose | Poids max |
|---|------|---------|------|-----------------------|-----------|----------------------|-----------|
| 8 | packshot-bijoux | Hero (background) | B | Close-up bijoux haute joaillerie sur fond neutre, eclairage studio macro. Bagues, montres, pierres. | 1344x768 + variantes | `backgrounds/hero-packshot-bijoux.avif` | 80 KB |
| 9 | packshot-mode | Hero (background) | B | Vetements sur mannequin ghost, eclairage studio mode. Ambiance fashion shooting. | 1344x768 + variantes | `backgrounds/hero-packshot-mode.avif` | 80 KB |
| 10 | packshot-e-commerce | Hero (background) | B | Selection de produits e-commerce varies sur fond blanc (chaussures, sacs, electronique). Vue catalogue. | 1344x768 + variantes | `backgrounds/hero-packshot-ecommerce.avif` | 80 KB |
| 11 | packshot-amazon | Hero (background) | B | Produits prepares pour Amazon, fond blanc pur, normes marketplace. Pack multi-angle. | 1344x768 + variantes | `backgrounds/hero-packshot-amazon.avif` | 80 KB |
| 12 | packshot-industriel | Hero (background) | B | Pieces techniques, composants, equipements industriels photographies en studio. Precision et detail. | 1344x768 + variantes | `backgrounds/hero-packshot-industriel.avif` | 80 KB |

### Images a generer — OPTIONNEL

| # | Page | Section | Type | Description du visuel | Dimensions | Nom de fichier propose | Poids max |
|---|------|---------|------|-----------------------|-----------|----------------------|-----------|
| 13 | A propos | Valeurs / Hero | A | Photo d'equipe PackshotCreator ou du showroom de Villeurbanne. Ambiance pro et chaleureuse. | 1024x1024 | `illustrations/about-team.avif` | 50 KB |
| 14-25 | Home | S8 Industries (grille secteurs) | A | Mini photos produit par secteur (chaussure, bijou, meuble, etc.) en remplacement des icones SVG. 12 images. | 200x200 | `secteurs/photo-{slug}.avif` | 15 KB chacun |

### Sections auditees — Type C (pas d'image necessaire)

Ces sections ont ete validees comme n'ayant pas besoin d'image :

| Page | Section | Raison |
|------|---------|--------|
| Home | S2 Social Proof | Stats geantes + logos SVG suffisent |
| Home | S3 Pain Points | Cartes avec icones + chiffres, design aere |
| Home | S6 Temoignages | Citations + stats + badges secteur |
| Home | S10 FAQ | Split layout texte pur |
| Studios | S2 Social Proof | Stats + logos |
| Studios | S6 Accompagnement | Timeline editoriale, numeros geants |
| Studios | S7 ROI Teaser | Gradient violet + carte blanche |
| Studios | S8 FAQ | Split layout |
| Studios | S9 CTA Final | Asymetrique gradient |
| IA | S2 Manifeste | Split + cartes numerotees |
| IA | S3 Comparatif | Bento texte comparatif |
| IA | S4 BlendAI | Fond sombre + carte blanche timeline |
| IA | S7 Preuve Sociale | Ruban sombre stats |
| IA | S9 FAQ | Split layout |
| IA | S10 CTA Final | Asymetrique gradient |
| Industrie | S2 Secteurs | Grille icones |
| Industrie | S3 Case Studies | Cartes colorees texte |
| Industrie | S4 Benefits | Bento texte |
| Industrie | S5 Workflow | Fond sombre timeline |
| Packshot-* | S2 Stats | Ruban sombre |
| Packshot-* | S3 Avantages | Split + cartes numerotees |
| Packshot-* | S5 FAQ | Split layout |
| Packshot-* | S6 CTA Final | Asymetrique gradient |
| Contact | Formulaire | Page formulaire, pas d'image |

---

## Specs images recommandees

| Type | Format | Dimensions | Poids max |
|------|--------|-----------|-----------|
| Hero fond | AVIF | 1344x768 (+ variantes sm/md/lg/xl) | <50 KB |
| Hero image droite | AVIF | variable selon page | <50 KB |
| Gallery | AVIF | 800x600 minimum | <200 KB |
| Illustrations | AVIF | 1024x1024 | <100 KB |
| Before/After | AVIF | 1024x1024 | <100 KB |
| Machines | AVIF | variable (fond transparent) | <20 KB |
| Icones secteurs | SVG | -- | <5 KB |
| Logos clients | SVG | -- | <5 KB |
| OG image | AVIF | 1200x630 | <50 KB |
| Video fond | MP4 H.264 | 1920x1080, 10-15s boucle | <5 MB |
