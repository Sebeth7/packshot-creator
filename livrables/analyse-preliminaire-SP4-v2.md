# ANALYSE PRÉLIMINAIRE SP4 - v2 (MAJ après SP1)

**Session :** SP4 - Ressources Images
**Créé par :** Session Pilote 4 (Opus)
**Date création :** 1er février 2026
**Date MAJ :** 1er février 2026 (après validation SP1)
**Projet :** PackshotCreator Next.js - Phase 4

---

## RÉSUMÉ EXÉCUTIF

### ✅ DÉBLOCAGE SESSION PILOTE 4

**Statut Couche 0 :** ✅ **VALIDÉE** (SP1 terminée le 1er février 2026)
**Statut Couche 1 :** ✅ **VALIDÉE** (Brandbook complet disponible)

**🎯 SESSION PILOTE 4 PEUT CONTINUER**

### État Actuel des Images (Données Réelles SP1)

**Images disponibles Webflow :** **133 URLs** référencées
**Formats :** AVIF (45%), WebP (30%), SVG (20%), JPEG/PNG (5%)
**Poids total estimé :** 5-8 MB

**Images dans public/images/ :** 5 placeholders SVG uniquement

**Ratio disponible/nécessaire :**
- Images Webflow référencées : 133
- Images dans Next.js : 0 (placeholders uniquement)
- **Gap :** ~133 images à télécharger + images manquantes à générer

---

## 1. DONNÉES SP1 DISPONIBLES

### 1.1 Images Webflow (133 URLs)

**Fichier source :** `livrables/data-webflow/images/images-inventory.md`

#### Catégories d'Images Webflow

| Catégorie | Quantité | Format | Priorité | Statut |
|-----------|----------|--------|----------|--------|
| **Images machines Orbitvu** | 12 | AVIF | 🔴 CRITIQUE | À télécharger |
| **Icônes secteurs** | 12 | SVG | 🔴 CRITIQUE | À télécharger |
| **Logos clients** | 20 | SVG | 🔴 CRITIQUE | À télécharger |
| **Hero gamme 2025** | 1 | AVIF (responsive) | 🔴 CRITIQUE | À télécharger |
| **Open Graph image** | 1 | AVIF | 🔴 CRITIQUE | À télécharger |
| **Slides carrousel hero** | 3 | AVIF | 🟠 IMPORTANT | À télécharger |
| **Images démo (produits)** | 4 | AVIF/WebP | 🟠 IMPORTANT | À télécharger |
| **Image ShotFlow** | 2 | WebP/AVIF | 🟠 IMPORTANT | À télécharger |
| **Opératrice photographiant** | 1 | WebP | 🟠 IMPORTANT | À télécharger |
| **Images blog** | 3 | AVIF | 🟠 IMPORTANT | À télécharger |
| **Autres** | 74+ | Variés | 🟡 SECONDAIRE | À évaluer |

**Total images critiques + importantes :** 59 images

#### Détail Images Machines Orbitvu (Photos Réelles)

1. Alphashot Pro G2 - AVIF
2. Alphashot XL - AVIF
3. Alphashot 360 - AVIF
4. Alphashot Micro v2 - AVIF
5. Alphatable, Alphadesk - AVIF
6. Alphastudio XXL - AVIF
7. Alphastudio Compact - AVIF
8. Plateaux tournants Orbitvu G2 - AVIF
9. Furniture Studio - AVIF
10. Bike Studio - AVIF
11. E-Comm Studio+ - AVIF (dupliqué Furniture)
12. Fashion Studio - AVIF

**Note :** Toutes photos réelles haute qualité, fond transparent/dégradé, format AVIF optimisé.

#### Détail Icônes Secteurs (12 SVG)

1. Agroalimentaire
2. Chaussures
3. High-tech, électroménager
4. Horlogerie, bijouterie
5. Meubles
6. Mode, accessoires
7. Objets d'art, antiquités
8. Optique, lunetterie
9. Pièces techniques
10. Skincare, cosmétiques
11. Sports
12. Vins, spiritueux

**Note :** Tous au format SVG (qualité optimale, poids minimal).

#### Détail Logos Clients (20 SVG)

Amazon, Essilor Luxottica, Leclaireur, Castel Frères, EuroPart, Chanel, InterSport, Lidl, GS1, Jägermeister, Bosch, Sandro, Pure Red, Seiko, Sacla, Severin, Valentino, Würth, William Grant & Sons, Zoomalia.

**Note :** Social proof puissant, tous SVG.

---

### 1.2 Pages Next.js (20 Routes)

**Fichier source :** `livrables/inventaire-nextjs.md`

#### Statistiques

- **Total pages :** 20 routes
- **Pages complètes :** 17
- **Pages partielles :** 2 (a-propos, academy)
- **Pages placeholder :** 1 (academy/calendrier)
- **Routes dynamiques :** 4

#### Besoins Images par Type de Page

| Type Page | Quantité Pages | Images Nécessaires | Estimation par Page |
|-----------|----------------|-------------------|---------------------|
| Homepage | 1 | Hero, 3 piliers, logos clients, blog (3) | ~8-10 |
| Hubs (Studios, IA, Academy) | 3 | Hero, produits, illustrations | ~10-15 chacun |
| Industries | 12 (dynamiques) | Hero secteur, produits exemples | ~3-5 chacun |
| Produits machines | 20+ (dynamiques) | Photo produit, specs, exemples | ~2-4 chacun |
| Blog | 1 + dynamiques | Hero, featured articles | ~5 + articles |
| Formations | 4 | Hero, formateurs, illustrations | ~3-5 chacun |
| Légales | 3 | Aucune spécifique | 0 |
| Contact | 1 | Map (externe) | 0-1 |

**Total estimé images nécessaires :** 150-250 images

---

### 1.3 Benchmark Orbitvu

**Fichier source :** `livrables/benchmark-orbitvu.md`

#### Insights Visuels Clés

**Palette couleurs Orbitvu :**
- **Primaire :** Rose/Rouge #E63462
- **Secondaire :** Turquoise/Cyan #00BCD4
- **Neutre :** Gris foncé textes, blanc/gris clair fonds

**Style images :**
- Photos produits sur fond transparent ou dégradé circulaire subtil
- Hiérarchie visuelle forte
- Espacement généreux
- Haute qualité, ombres portées légères

**Quick Wins identifiés :**
1. CTA sticky toujours visible
2. Section chiffres clés avec counter animation
3. Cards produits améliorées (bénéfices chiffrés)
4. Section "Trusted by" logos clients
5. Galerie résultats avec badges type contenu
6. Palette 3 couleurs cohérente
7. Hero alternatif gamme produits

---

## 2. IMAGES DISPONIBLES VS MANQUANTES

### 2.1 Récapitulatif Global

| Source | Images Disponibles | Images À Télécharger | Images À Générer | Total |
|--------|-------------------|---------------------|------------------|-------|
| **Webflow (référencées)** | 133 URLs | 133 | 0 | 133 |
| **Orbitvu.com** | Estimé 50-100 | Selon licence | Selon besoins | 50-100 |
| **Génération Gemini** | 0 | 0 | 50-150 | 50-150 |
| **TOTAL ESTIMÉ** | **133** | **133-183** | **50-150** | **233-383** |

### 2.2 Images Webflow : À Télécharger (133)

**Priorité CRITIQUE (46 images) :**
- 12 machines Orbitvu (photos réelles)
- 12 icônes secteurs (SVG)
- 20 logos clients (SVG)
- 1 hero gamme 2025
- 1 Open Graph image

**Priorité IMPORTANTE (13 images) :**
- 3 slides carrousel hero
- 4 images démo produits
- 2 images ShotFlow
- 1 opératrice photographiant
- 3 images blog

**Priorité SECONDAIRE (~74 images) :**
- Autres images Webflow à évaluer selon pertinence

### 2.3 Images Manquantes : À Générer via Gemini

#### A. Hero Images Pages (17 images)

| Page | Description Hero | Ratio | Priorité |
|------|------------------|-------|----------|
| Homepage | Produits lifestyle générique | 16:9 | 🔴 Haute |
| Studios Photo | Studio automatisé en action | 16:9 | 🔴 Haute |
| IA Photo Produit | Technologie IA/création | 16:9 | 🔴 Haute |
| Academy | Formation/apprentissage | 16:9 | 🔴 Haute |
| 12 Industries | Hero spécifique par secteur | 16:9 | 🔴 Haute |
| Produit BlendAI | IA générative produit | 16:9 | 🟡 Moyenne |

#### B. Illustrations Technologie/IA (6-10 images)

- Workflow automation
- IA générative concepts
- Avant/Après transformations
- Diagrammes process
- Features illustrations

#### C. Photos Lifestyle Studios (10-15 images)

- Opérateurs utilisant machines
- Studios en environnement réel
- Produits en cours shooting
- Résultats visuels secteurs

#### D. Backgrounds/Patterns (5-10 images)

- Gradients sections
- Patterns décoratifs subtils
- Formes géométriques
- Textures

#### E. Blog Featured Images (20-30 images)

- Images d'illustration articles
- Visuels pédagogiques
- Screenshots/schemas

**Total génération estimé :** 58-82 images minimum

---

## 3. STRATÉGIE DE RÉCUPÉRATION

### 3.1 Phase 1 : Téléchargement Webflow (Session 4-2)

**Objectif :** Récupérer les 133 URLs Webflow

**Script téléchargement :**
```bash
#!/bin/bash
mkdir -p public/images/{hero,produits,icones,logos,demo,blog,shotflow}

# Télécharger images critiques
wget [URL] -O public/images/[categorie]/[nom-fichier]
```

**Organisation dossiers :**
```
public/images/
├── hero/
│   ├── gamme-2025.avif
│   ├── slide-alphashot-360.avif
│   └── ...
├── produits/
│   ├── alphashot-pro-g2.avif
│   ├── alphashot-xl.avif
│   └── ... (12 machines)
├── icones/
│   ├── agro.svg
│   ├── chaussures.svg
│   └── ... (12 secteurs)
├── logos/
│   ├── amazon.svg
│   ├── chanel.svg
│   └── ... (20 clients)
├── demo/
│   ├── bouteille-vin.avif
│   └── ... (4 produits)
├── blog/
│   └── ... (3 featured)
└── shotflow/
    └── ... (2 images)
```

**Temps estimé :** 2-3h (téléchargement + organisation + validation)

### 3.2 Phase 2 : Images Orbitvu.com

**Vérification licence :**
- Contacter Orbitvu pour autorisation utilisation
- Vérifier si PackshotCreator a droits d'usage
- Alternative : Utiliser uniquement images Webflow + génération Gemini

**Si autorisé :**
- Télécharger photos haute qualité machines
- Télécharger photos secteurs/industries
- Organiser dans dossiers appropriés

**Temps estimé :** 1-2h (si autorisé)

---

## 4. STRATÉGIE DE GÉNÉRATION GEMINI

### 4.1 Templates Prompts à Créer (20-25 templates)

#### Template Type : Hero Industrie

```markdown
**Style :** Photo professionnelle, corporate, éclairage studio
**Sujet :** [Variable: bijoux, chaussures, cosmétiques, etc.]
**Composition :** Vue légèrement inclinée de dessus, fond neutre gradient
**Ambiance :** Moderne, luxe accessible, technologique
**Couleurs dominantes :**
  - Base : Blanc, gris clair
  - Accents : Very Peri (#6667AB) subtil
  - [Couleurs produits spécifiques]
**Éclairage :** Studio professionnel, softbox, reflets contrôlés
**Format :** 16:9, 1920x1080px minimum
**Qualité :** Haute résolution, net, professionnel
**Interdictions :**
  - Texte, logos, watermarks
  - Visages, mains, personnes
  - Marques concurrentes
```

#### Catégories Templates

**Hero Images (16 templates) :**
1. hero-homepage-general
2. hero-studios-automatises
3. hero-ia-photo-produit
4. hero-academy-formation
5-16. hero-industrie-[secteur] (x12)

**Illustrations (6 templates) :**
17. illustration-workflow-automation
18. illustration-ia-generative
19. illustration-avant-apres
20. illustration-features-ia

**Lifestyle (4 templates) :**
21. lifestyle-studio-operateur
22. lifestyle-produits-shooting
23. lifestyle-resultats-visuels
24. lifestyle-environnement-pro

**Backgrounds (2 templates) :**
25. background-gradient-section
26. background-pattern-geometrique

**Total :** 26 templates

### 4.2 Workflow Génération

```
Pour chaque image à générer:

1. Sélectionner template approprié
   ↓
2. Personnaliser variables (secteur, couleurs, produits)
   ↓
3. Générer prompt complet
   ↓
4. Appeler API Gemini 2.5 Flash Image
   (modèle: gemini-2.5-flash-image)
   ↓
5. Télécharger image générée (PNG/JPEG)
   ↓
6. Validation manuelle:
   - Respect brandbook ?
   - Qualité professionnelle ?
   - Aucun texte/logo ?
   - Composition claire ?
   ↓
7. Si validée → Passer à Session 4-4 (conversion AVIF)
   Si rejetée → Régénérer avec prompt ajusté
```

### 4.3 Estimation Coûts Génération

**API Gemini 2.5 Flash Image :**
- Prix : $30/1M tokens = $0.039 par image
- 1 image = 1290 tokens

**Scénarios :**
- 50 images : ~$2 USD
- 100 images : ~$4 USD
- 150 images : ~$6 USD
- 200 images : ~$8 USD

**Budget recommandé :** $10-15 USD (marge pour tests/régénérations)

### 4.4 Critères Validation Image Générée

**✅ Acceptée si :**
- Style corporate moderne professionnel
- Couleurs cohérentes palette brandbook
- Composition claire, aérée, hiérarchie nette
- Qualité haute résolution
- Aucun texte, logo, visage visible
- Format/ratio correct (16:9, 4:3, 1:1 selon usage)

**❌ Rejetée si :**
- Style générique stock photo
- Couleurs discordantes/criardes
- Texte ou watermarks visibles
- Qualité médiocre/pixellisée
- Composition confuse/surchargée
- Éléments inappropriés (visages, logos)

---

## 5. OPTIMISATION AVIF (Session 4-4)

### 5.1 Objectifs

**Toutes les images doivent être :**
- Format AVIF prioritaire (compression -30 à -50% vs WebP)
- Fallback WebP créé automatiquement
- Poids optimisé : <100KB standard, <200KB hero
- Qualité 80-85%

### 5.2 Outils

**sharp (npm package) - Recommandé :**
```bash
npm install sharp
```

```js
// convert-to-avif.js
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function convertToAvif(inputPath, outputPath) {
  await sharp(inputPath)
    .avif({ quality: 80 })
    .toFile(outputPath);
}

async function convertAll(sourceDir, targetDir) {
  const files = await readdir(sourceDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const input = join(sourceDir, file);
      const output = join(targetDir, file.replace(/\.[^.]+$/, '.avif'));

      await convertToAvif(input, output);
      console.log(`✅ Converted: ${file} → ${output}`);
    }
  }
}
```

### 5.3 Workflow Conversion

```
1. Télécharger/Générer toutes images (formats sources variés)
   ↓
2. Conversion AVIF (quality: 80)
   ↓
3. Création fallback WebP (quality: 85)
   ↓
4. Vérification poids (<100KB standard, <200KB hero)
   ↓
5. Si trop lourd → Réduire quality ou dimensions
   ↓
6. Déployer dans public/images/
   ↓
7. Intégrer Next.js Image component
```

### 5.4 Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/images/produits/alphashot-xl.avif"
  alt="Studio photo automatisé Alphashot XL"
  width={1200}
  height={900}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={80}
  priority={false} // true pour hero images
/>
```

**Next.js gère automatiquement :**
- Fallback WebP si AVIF non supporté
- Lazy loading
- Responsive srcset
- Optimisation tailles

---

## 6. PLAN D'ACTION SESSION 4-1 (Audit Images)

### 6.1 Inputs Session 4-1

**Fichiers à analyser :**
1. ✅ `livrables/data-webflow/images/images-inventory.md` (133 URLs)
2. ✅ `livrables/inventaire-nextjs.md` (20 pages)
3. ✅ `livrables/inventaire-webflow.md` (128 pages Webflow)
4. ✅ `livrables/benchmark-orbitvu.md` (patterns visuels)
5. ✅ `livrables/BRANDBOOK_WEB_COMPLET.md` (Section 7 - Règles images)

**Objectif Session 4-1 :**
Créer audit exhaustif avec :
- Liste précise images disponibles Webflow (133)
- Liste images nécessaires par page Next.js
- Mapping Webflow → Next.js
- Images manquantes à générer (catégorisées)
- Plan d'action Sessions 4-2, 4-3, 4-4

### 6.2 Outputs Attendus Session 4-1

**Livrables :**
1. `livrables/audit-images.md` (audit complet)
2. `livrables/images-par-page.csv` (référence rapide)
3. `livrables/templates-a-creer.md` (liste templates prompts Gemini)

**Contenu audit :**
- Inventaire par page (images nécessaires)
- Images disponibles Webflow (détail 133)
- Images disponibles Orbitvu (si applicable)
- Images à générer Gemini (liste + templates)
- Images bloquées (produits réels manquants)
- Récapitulatif par catégorie
- Plan d'action Sessions 4-2, 4-3, 4-4

---

## 7. PLAN D'ACTION SESSION 4-2 (Récupération)

### 7.1 Objectif

**Télécharger et organiser les 133 images Webflow dans `public/images/`**

### 7.2 Méthodologie

**Étape 1 : Créer structure dossiers**
```bash
mkdir -p public/images/{hero,produits,icones,logos,demo,blog,shotflow,og}
```

**Étape 2 : Télécharger images par catégorie**
- Script bash avec wget/curl
- Validation téléchargement (vérifier taille > 0)
- Renommer fichiers (noms SEO-friendly)

**Étape 3 : Organiser et nettoyer**
- Ranger par catégorie
- Supprimer doublons
- Vérifier intégrité fichiers

**Étape 4 : Créer inventaire téléchargé**
- Liste fichiers téléchargés
- Checksums
- Métadonnées (dimensions, poids)

### 7.3 Outputs Attendus

1. `public/images/` complété avec 133 images
2. `livrables/images-recuperees/README.md` (inventaire)
3. Script `scripts/download-webflow-images.sh`

---

## 8. PLAN D'ACTION SESSION 4-3 (Génération Gemini)

### 8.1 Objectif

**Créer système de génération d'images via Gemini 2.5 avec templates de prompts**

### 8.2 Méthodologie

**Étape 1 : Créer templates prompts (26 templates)**
- Hero images (16)
- Illustrations (6)
- Lifestyle (4)
- Backgrounds (2)

**Étape 2 : Générer images manquantes**
- Personnaliser prompts par template
- Appeler API Gemini 2.5 Flash Image
- Télécharger images générées
- Validation manuelle (critères brandbook)

**Étape 3 : Itérations et ajustements**
- Régénérer si qualité insuffisante
- Ajuster prompts selon résultats
- Documenter prompts finaux validés

### 8.3 Outputs Attendus

1. `livrables/templates-prompts/` (26 templates markdown)
2. `livrables/systeme-generation-images.md` (documentation)
3. `scripts/generate-with-gemini.js` (script Node.js)
4. Images générées dans dossier temporaire (avant AVIF)

---

## 9. PLAN D'ACTION SESSION 4-4 (Optimisation AVIF)

### 9.1 Objectif

**Convertir toutes les images en AVIF optimisé + fallback WebP**

### 9.2 Méthodologie

**Étape 1 : Installation outils**
```bash
npm install sharp
```

**Étape 2 : Conversion batch**
- Convertir toutes images en AVIF (quality 80)
- Créer fallbacks WebP (quality 85)
- Vérifier poids (<100KB standard, <200KB hero)

**Étape 3 : Optimisation**
- Réduire quality si poids trop élevé
- Redimensionner si nécessaire
- Créer versions responsive (srcset)

**Étape 4 : Intégration Next.js**
- Remplacer placeholders par vraies images
- Utiliser Next.js Image component
- Vérifier lazy loading et responsive

### 9.3 Outputs Attendus

1. `public/images/` avec toutes images AVIF+WebP
2. `scripts/convert-to-avif.js` (script conversion)
3. Documentation intégration Next.js

---

## 10. CRITÈRES VALIDATION COUCHE 2

### Checklist Validation

**Couche 2 validée si :**

**Images :**
- [ ] 100% des images nécessaires disponibles (selon audit 4-1)
- [ ] Photos produits = photos réelles Webflow/Orbitvu (0% IA)
- [ ] Images lifestyle/illustrations = générées Gemini si manquantes
- [ ] Toutes images conformes brandbook (style, couleurs, composition)

**Formats :**
- [ ] Format AVIF pour 100% des images
- [ ] Fallback WebP créé pour toutes
- [ ] Poids optimisé (<100KB standard, <200KB hero)
- [ ] Ratios corrects (16:9 hero, 4:3 cards, 1:1 vignettes)

**Organisation :**
- [ ] Images classées par catégorie (hero/, produits/, icones/, etc.)
- [ ] Noms fichiers cohérents et SEO-friendly
- [ ] Alt text préparés (métadonnées)

**Pipeline :**
- [ ] Templates prompts Gemini créés (20-25 templates)
- [ ] Script conversion AVIF fonctionnel
- [ ] Documentation pipeline disponible

---

## 11. ESTIMATION EFFORT GLOBAL

### Par Session Spécialisée

| Session | Tâches Principales | Durée Estimée |
|---------|-------------------|---------------|
| **4-1** | Audit exhaustif, mapping, catégorisation | 3-4h |
| **4-2** | Téléchargement 133 images, organisation | 2-3h |
| **4-3** | Création 26 templates + génération 50-100 images | 6-8h |
| **4-4** | Conversion AVIF batch + intégration Next.js | 3-4h |

**Total estimé :** 14-19h (4 sessions spécialisées)

### Répartition Coûts

| Poste | Montant |
|-------|---------|
| API Gemini 2.5 (50-150 images) | $2-6 USD |
| Marge tests/régénérations | $4-9 USD |
| **Total budget API** | **$10-15 USD** |

---

## 12. RISQUES ET MITIGATION

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Images Webflow inaccessibles | 🟠 Moyen | Faible | URLs valides dans inventory, CDN stable |
| Copyright images Orbitvu | 🟡 Faible | Moyenne | Vérifier licence, utiliser Gemini si besoin |
| Qualité Gemini insuffisante | 🟡 Faible | Faible | Tester Gemini 3 Pro, itérer prompts |
| Poids images trop élevé | 🟡 Faible | Moyenne | Optimisation AVIF agressive (quality 75) |
| Temps génération dépassé | 🟡 Faible | Moyenne | Prioriser images critiques, générer par lots |

---

## 13. CONCLUSION

### ✅ Session Pilote 4 Prête à Continuer

**Prérequis satisfaits :**
- ✅ Couche 0 validée (SP1 terminée)
- ✅ Couche 1 validée (Brandbook disponible)
- ✅ Données images disponibles (133 URLs Webflow)
- ✅ Inventaire pages Next.js complet (20 pages)
- ✅ Benchmark Orbitvu documenté
- ✅ API Gemini 2.5 disponible et prête

**Données Clés :**
- 133 images Webflow à télécharger
- 50-150 images à générer via Gemini
- 26 templates prompts à créer
- Budget API : $10-15 USD
- Effort : 14-19h sur 4 sessions

### 🎯 Prochaine Étape

**Lancer Session 4-1 (Audit Images)** avec prompt-4-1.md pour :
1. Audit exhaustif images nécessaires par page
2. Mapping précis Webflow → Next.js
3. Catégorisation images à générer
4. Plan d'action détaillé Sessions 4-2, 4-3, 4-4

---

**Analyse MAJ créée le :** 1er février 2026
**Statut :** ✅ PRÊTE - Session Pilote 4 peut continuer
**Prochaine action :** Finaliser prompts 4-2, 4-3, 4-4 puis lancer Session 4-1
