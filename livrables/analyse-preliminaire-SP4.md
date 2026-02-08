# ANALYSE PRÉLIMINAIRE - SESSION PILOTE 4 : RESSOURCES IMAGES

**Session :** SP4 - Ressources Images
**Créé par :** Session Pilote 4 (Opus)
**Date :** 1er février 2026
**Projet :** PackshotCreator Next.js - Phase 4

---

## RÉSUMÉ EXÉCUTIF

### État Actuel des Images
- **Images réelles disponibles :** 0
- **Placeholders SVG :** 5 (machines/)
- **Images Webflow récupérées :** 0 (data-webflow/ n'existe pas encore)
- **% Images manquantes :** ~95-100%

### Constat Critique
Le dossier `public/images/` ne contient actuellement que 5 placeholders SVG. La Session Pilote 1 (Inventaires & Données Sources) n'a **pas encore été exécutée**, ce qui signifie :
- Aucun inventaire-nextjs.md (liste des images nécessaires par page)
- Aucun data-webflow/ (images Webflow)
- Aucun benchmark-orbitvu.md (référence images Orbitvu)

### Recommandation
**⚠️ BLOQUER Session Pilote 4 jusqu'à validation Couche 0** (Session Pilote 1 terminée)

Selon le PLAN_TRAVAIL_PHASE4.md :
> **Prérequis Session Pilote 4 :**
> - Couche 0 validée (extraction Webflow)
> - Couche 1 validée (brandbook pour guidelines images)

**Statut actuel :**
- ❌ Couche 0 : Non validée (Session Pilote 1 manquante)
- ✅ Couche 1 : Validée (Brandbook complet disponible)

---

## 1. ÉTAT DES IMAGES ACTUELLES

### 1.1 Images dans `public/images/`

**Total fichiers :** 5
**Format :** SVG (placeholders uniquement)

```
public/images/
└── machines/
    ├── placeholder-flatlay.svg
    ├── placeholder-large.svg
    ├── placeholder-medium.svg
    ├── placeholder-small.svg
    └── placeholder-xlarge.svg
```

### 1.2 Analyse des Placeholders

| Fichier | Type | Utilisation Probable |
|---------|------|----------------------|
| `placeholder-flatlay.svg` | Placeholder | Vue flatlay (vue de dessus) produits |
| `placeholder-large.svg` | Placeholder | Grande image produit (hero) |
| `placeholder-medium.svg` | Placeholder | Image produit standard (grilles) |
| `placeholder-small.svg` | Placeholder | Petite vignette produit |
| `placeholder-xlarge.svg` | Placeholder | Très grande image (homepage hero) |

**Constat :** Ce sont des placeholders, pas des images de production.

### 1.3 Ratio Réelles vs Placeholders

- **Images réelles :** 0% (0/5)
- **Placeholders :** 100% (5/5)

---

## 2. IMAGES DISPONIBLES DEPUIS WEBFLOW

### 2.1 Données Webflow

**Statut :** ❌ Non disponibles

**Raison :** Le dossier `livrables/data-webflow/` n'existe pas. La Session Pilote 1 (Session Spécialisée 1-3 : Extraction Webflow) n'a pas été exécutée.

**Action requise :** Exécuter Session Pilote 1 avant Session Pilote 4.

### 2.2 Images Attendues de Webflow

Selon l'analyse du site actuel packshot-creator.com (Webflow), nous devrions récupérer :

**Images produits (machines Orbitvu) :**
- Orbitvu Station
- Orbitvu Station Pro
- Alphashot
- Alphashot XL
- PhotoBench
- Photo360
- Autres modèles

**Images lifestyle :**
- Photos studios en action
- Opérateurs utilisant les machines
- Résultats produits (bijoux, chaussures, cosmétiques)
- Photos industries (secteurs)

**Images illustrations :**
- Icons secteurs
- Schémas techniques
- Avant/Après exemples
- Logos clients

**Estimation :** 50-100+ images à récupérer depuis Webflow

---

## 3. IMAGES DISPONIBLES DEPUIS ORBITVU

### 3.1 Benchmark Orbitvu

**Statut :** ❌ Non documenté

**Raison :** Le fichier `livrables/benchmark-orbitvu.md` n'existe pas. La Session Pilote 1 (Session Spécialisée 1-4 : Benchmark Orbitvu) n'a pas été exécutée.

**Action requise :** Analyser orbitvu.com pour identifier images de référence.

### 3.2 Images Potentielles d'Orbitvu.com

**Sources probables :**
- `/products` : Photos machines haute qualité
- `/industries` : Photos secteurs (bijoux, mode, cosmétiques, etc.)
- `/gallery` : Exemples résultats clients
- `/case-studies` : Photos lifestyle, témoignages

**Note Copyright :** Toutes les images Orbitvu.com sont propriété d'Orbitvu. Utilisation possible sous réserve d'autorisation ou licence existante.

### 3.3 Estimation Images Orbitvu

**Photos produits (machines) :** 15-20 images haute qualité
**Photos secteurs/industries :** 30-50 images
**Photos lifestyle/résultats :** 20-30 images

**Total estimé :** 65-100 images disponibles depuis orbitvu.com

---

## 4. LISTE IMAGES À GÉNÉRER

### 4.1 Méthodologie

Sans inventaire-nextjs.md, impossible de créer une liste exhaustive. Estimation basée sur :
- Structure typique site SaaS B2B
- Analyse du brandbook (sections documentées)
- Templates de pages (Homepage, Hub, Industrie, Formation, Produit)

### 4.2 Images à Générer (Estimation)

#### A. Hero Images (par page)

| Page | Type Image | Génération Gemini | Priorité |
|------|-----------|-------------------|----------|
| Homepage | Hero générique (produits lifestyle) | ✅ Oui | Haute |
| Studios Photo | Hero studio automatisé | ✅ Oui | Haute |
| IA Photo Produit | Hero IA/technologie | ✅ Oui | Haute |
| Academy | Hero formation/apprentissage | ✅ Oui | Haute |
| 12 x Industries | Hero secteur spécifique | ✅ Oui (x12) | Haute |

**Total Hero :** ~16 images

#### B. Illustrations Sections

| Type | Quantité Estimée | Génération |
|------|------------------|------------|
| Icons secteurs (si non SVG) | 12 | ✅ Oui |
| Illustrations IA/technologie | 4-6 | ✅ Oui |
| Backgrounds/patterns | 3-5 | ✅ Oui |
| Avant/Après exemples | 6-10 | ⚠️ Photos réelles prioritaires |
| Photos lifestyle studios | 10-15 | ✅ Oui si manquantes |

**Total Illustrations :** 35-48 images

#### C. Images Blog/Contenu

| Type | Quantité Estimée | Génération |
|------|------------------|------------|
| Featured images articles | 10-20 | ✅ Oui |
| Images inline articles | 20-30 | ✅ Oui |

**Total Blog :** 30-50 images

### 4.3 Total Estimé Images à Générer

**Minimum :** 81 images
**Maximum :** 114 images

**Note :** Ces chiffres sont des **estimations** sans inventaire précis. La Session 4-1 (Audit Images) devra établir la liste exacte.

---

## 5. DISPONIBILITÉ API GEMINI 2.5

### 5.1 Recherche API

**Recherche effectuée :** 1er février 2026

**Résultats :**

**Modèle disponible :** ✅ **Gemini 2.5 Flash Image**
**Statut :** Production-ready (depuis janvier 2026)
**Accès :** Google AI Studio, Vertex AI, Gemini API

**Modèle avancé :** ✅ **Gemini 3 Pro Image Preview**
**Statut :** Disponible pour assets professionnels haute fidélité
**Capacités :** Rendu 1K, 2K, 4K avec "Thinking" avancé

### 5.2 Tarification

**Gemini 2.5 Flash Image :**
- **Prix :** $30.00 / 1M output tokens
- **Équivalence :** 1 image = 1290 tokens
- **Coût par image :** ~$0.039 (3.9 centimes USD)

**Estimation budget génération :**
- 50 images : ~$2 USD
- 100 images : ~$4 USD
- 200 images : ~$8 USD

**Constat :** Budget très accessible.

### 5.3 Fonctionnalités Clés

**Aspect ratios supportés :** 10 ratios différents
**Watermark :** SynthID invisible (toutes les images)
**Qualité :** Production-ready
**Format sortie :** PNG, JPEG (conversion AVIF ensuite)

### 5.4 Disponibilité Technique

**CLI Gemini local :** ❌ Non installé (vérification effectuée)
**Accès API :** ⚠️ À vérifier (variables d'environnement non trouvées)
**Google AI Studio :** ✅ Accessible via web

**Recommandation :** Utiliser Google AI Studio API ou installer SDK Gemini :
```bash
npm install @google/generative-ai
```

### 5.5 Statut Final

**API Gemini 2.5 disponible :** ✅ **OUI**
**Prête pour génération images :** ✅ **OUI**
**Configuration requise :** Clé API Google AI Studio

---

## 6. GUIDELINES IMAGES (BRANDBOOK)

### 6.1 Section 7 du Brandbook

Le BRANDBOOK_WEB_COMPLET.md contient une section complète "Règles Photos/Images" :

**Section 7.1 : Formats Recommandés**
- **Format prioritaire :** AVIF (meilleure compression)
- **Fallback :** WebP
- **Qualité :** 80-85%
- **Poids max :** 100KB standard, 200KB hero

**Section 7.2 : Next.js Image Component**
- Utilisation obligatoire du composant `<Image>` Next.js
- Lazy loading automatique
- Responsive srcset

**Section 7.3 : Ratios par Type d'Image**
- Hero : 16:9 (1920x1080px)
- Cards produits : 4:3 (1200x900px)
- Vignettes : 1:1 (600x600px)
- Blog featured : 16:9 (1200x675px)

**Section 7.4 : Sizes Attribute (Responsive)**
- Mobile : 100vw
- Tablet : 50vw
- Desktop : 33vw (grilles 3 colonnes)

**Section 7.5 : Alt Text Guidelines**
- Descriptif précis
- Inclure contexte (secteur, produit)
- SEO-friendly

### 6.2 Règles Spécifiques Images Générées

**Style visuel (brandbook) :**
- **Ambiance :** Moderne, corporate, luxe accessible
- **Éclairage :** Studio professionnel, éclairage doux
- **Couleurs :** Palette Very Peri (#6667AB), accents lime/coral/teal
- **Composition :** Aérée, respiration, hiérarchie claire
- **Backgrounds :** Neutres, gradients subtils

**Interdictions :**
- Pas de texte dans les images
- Pas de logos concurrents
- Pas de visages identifiables (RGPD)
- Pas d'images génériques stock photo

---

## 7. STRATÉGIE DE RÉCUPÉRATION IMAGES

### 7.1 Workflow Recommandé

**Étape 1 : Session Pilote 1 (PRÉREQUIS)**
1. Exécuter Session 1-1 : Inventaire Next.js (liste pages + images nécessaires)
2. Exécuter Session 1-2 : Inventaire Webflow (pages équivalentes)
3. Exécuter Session 1-3 : Extraction Webflow (récupération images)
4. Exécuter Session 1-4 : Benchmark Orbitvu (analyse images référence)

**Étape 2 : Session 4-1 (Audit Images)**
1. Croiser inventaires Next.js + Webflow
2. Identifier images récupérées vs manquantes
3. Catégoriser (produits, lifestyle, illustrations)
4. Prioriser génération

**Étape 3 : Session 4-2 (Pipeline Récupération)**
1. Organiser images Webflow récupérées
2. Télécharger images Orbitvu (si autorisées)
3. Nettoyer, renommer, classer

**Étape 4 : Session 4-3 (Génération Gemini)**
1. Créer templates prompts par type
2. Générer images manquantes
3. Valider conformité brandbook

**Étape 5 : Session 4-4 (Optimisation AVIF)**
1. Convertir toutes images en AVIF
2. Optimiser poids (<100KB)
3. Créer fallbacks WebP
4. Intégrer dans Next.js

### 7.2 Sources Priorisées

**Ordre de priorité :**
1. **Webflow actuel** : Images déjà utilisées, approuvées
2. **Orbitvu.com** : Images officielles haute qualité
3. **Génération Gemini 2.5** : Pour combler manques

---

## 8. TYPES D'IMAGES ET SOURCES

### 8.1 Tableau Récapitulatif

| Type Image | Source Prioritaire | Génération si Manquant | Quantité Estimée |
|------------|-------------------|------------------------|------------------|
| **Photos produits (machines)** | Webflow/Orbitvu | ❌ Non (photos réelles obligatoires) | 15-20 |
| **Photos lifestyle studios** | Webflow/Orbitvu | ✅ Oui (Gemini) | 10-15 |
| **Photos secteurs (industries)** | Webflow/Orbitvu | ✅ Oui (Gemini) | 30-50 |
| **Illustrations IA/tech** | À créer | ✅ Oui (Gemini) | 4-6 |
| **Icons secteurs** | SVG manuel ou Gemini | ⚠️ SVG prioritaire | 12 |
| **Backgrounds/patterns** | À créer | ✅ Oui (Gemini) | 3-5 |
| **Avant/Après** | Webflow/Orbitvu | ⚠️ Photos réelles prioritaires | 6-10 |
| **Blog featured images** | À créer | ✅ Oui (Gemini) | 10-20 |
| **Hero images pages** | Webflow ou création | ✅ Oui (Gemini) | 16 |

### 8.2 Règle Critique

**❌ JAMAIS de génération IA pour photos produits (machines Orbitvu)**

Les machines doivent être représentées par des photos réelles professionnelles. Utiliser uniquement :
- Photos Webflow existantes
- Photos orbitvu.com (avec autorisation)
- Photos fournies par Orbitvu (assets officiels)

**Raison :** Crédibilité, précision technique, éviter représentations inexactes.

---

## 9. PIPELINE GÉNÉRATION GEMINI

### 9.1 Templates de Prompts à Créer

Pour chaque type d'image manquante, créer un template de prompt structuré :

**Exemple : Hero Image Industrie (Bijoux)**

```markdown
## Template Prompt : Hero Bijoux

**Style :** Photo professionnelle, corporate, éclairage studio
**Sujet :** Collection de bijoux haut de gamme (bagues, colliers, bracelets) sur présentoir élégant
**Composition :** Vue légèrement inclinée de dessus, fond neutre gradient blanc-gris
**Ambiance :** Luxe accessible, moderne, technologique
**Couleurs dominantes :**
  - Base : Blanc, gris clair, noir
  - Accents : Very Peri (#6667AB) subtil
  - Or/argent des bijoux : Naturel, éclat doux
**Éclairage :** Studio professionnel, softbox, reflets contrôlés
**Format :** 16:9, 1920x1080px minimum
**Qualité :** Haute résolution, net, professionnel
**Ne pas inclure :**
  - Texte, logos, watermarks
  - Visages, mains, personnes
  - Logos concurrents
**Référence brandbook :** Section 7 - Règles Photos/Images
```

### 9.2 Catégories de Templates

**À créer (Session 4-3) :**
1. Hero Images Secteurs (x12 templates)
2. Hero Images Hubs (Studios, IA, Academy)
3. Illustrations Technologie/IA
4. Photos Lifestyle Studios
5. Backgrounds/Patterns
6. Blog Featured Images

**Total templates :** ~20-25 templates réutilisables

### 9.3 Workflow Génération

```
1. Préparer prompt template
   ↓
2. Personnaliser variables (secteur, couleurs, etc.)
   ↓
3. Appeler API Gemini 2.5 Flash Image
   ↓
4. Télécharger image générée (PNG/JPEG)
   ↓
5. Valider conformité brandbook
   ↓
6. Convertir en AVIF (Session 4-4)
   ↓
7. Intégrer dans Next.js
```

### 9.4 Critères Validation

**Image générée acceptée si :**
- ✅ Respect du style brandbook (corporate moderne)
- ✅ Couleurs cohérentes (palette Very Peri)
- ✅ Qualité professionnelle
- ✅ Composition claire, aérée
- ✅ Aucun texte, logo, visage
- ✅ Format/ratio correct

**Image rejetée si :**
- ❌ Style générique stock photo
- ❌ Couleurs discordantes
- ❌ Texte visible
- ❌ Qualité médiocre
- ❌ Composition confuse

---

## 10. OPTIMISATION AVIF

### 10.1 Format Cible

**Format prioritaire :** AVIF
**Raison :** Compression supérieure (-30 à -50% vs WebP/JPEG)

**Qualité :** 80-85%
**Poids max :** 100KB (standard), 200KB (hero)

### 10.2 Outils Conversion

**Recommandations :**
- `sharp` (npm package) : Conversion Node.js
- `squoosh-cli` : CLI Google
- `avif` : CLI dédiée

**Script à créer (Session 4-4) :**
```bash
npm install sharp
```

```js
// convert-to-avif.js
import sharp from 'sharp';

const convertToAvif = async (inputPath, outputPath) => {
  await sharp(inputPath)
    .avif({ quality: 80 })
    .toFile(outputPath);
};
```

### 10.3 Fallback WebP

**Obligation :** Créer fallback WebP pour compatibilité navigateurs anciens.

**Next.js Image :** Gère automatiquement fallback si AVIF non supporté.

---

## 11. PROCHAINES ACTIONS

### 11.1 Actions Immédiates

**❌ BLOQUER Session Pilote 4 actuellement**

**✅ Exécuter d'abord :**
1. **Session Pilote 1** (Inventaires & Données Sources)
   - Session 1-1 : Inventaire Next.js
   - Session 1-2 : Inventaire Webflow
   - Session 1-3 : Extraction Webflow
   - Session 1-4 : Benchmark Orbitvu

2. **Validation Couche 0**
   - Vérifier tous les livrables SP1
   - Confirmer images Webflow récupérées
   - Valider benchmark Orbitvu

**Ensuite seulement :**
3. **Relancer Session Pilote 4**
   - Avec données Couche 0 disponibles
   - Créer analyse-preliminaire-SP4.md MAJ
   - Lancer Session 4-1 (Audit Images)

### 11.2 Actions Session Pilote 4 (Après Couche 0)

**Session 4-1 : Audit Images**
- Croiser inventaires Next.js + Webflow
- Lister images existantes vs manquantes
- Catégoriser et prioriser

**Session 4-2 : Pipeline Récupération**
- Organiser images Webflow
- Télécharger images Orbitvu (autorisées)
- Nettoyer et classer

**Session 4-3 : Génération Gemini**
- Créer templates prompts
- Générer images manquantes
- Valider conformité

**Session 4-4 : Optimisation AVIF**
- Convertir toutes images
- Créer fallbacks WebP
- Intégrer Next.js

---

## 12. CRITÈRES DE VALIDATION COUCHE 2

### 12.1 Checklist Validation

**Couche 2 validée si :**

**Images :**
- [ ] 100% des images nécessaires disponibles (selon inventaire)
- [ ] Photos produits = photos réelles (0% IA)
- [ ] Images lifestyle/illustrations = générées Gemini si manquantes
- [ ] Toutes images conformes brandbook (style, couleurs, composition)

**Formats :**
- [ ] Format AVIF pour 100% des nouvelles images
- [ ] Fallback WebP créé
- [ ] Poids optimisé (<100KB standard, <200KB hero)
- [ ] Ratios corrects (16:9 hero, 4:3 cards, 1:1 vignettes)

**Organisation :**
- [ ] Images classées par type (produits/, industries/, lifestyle/, blog/)
- [ ] Noms de fichiers cohérents et SEO-friendly
- [ ] Alt text préparés (fichier metadata)

**Pipeline :**
- [ ] Templates prompts Gemini créés (20-25 templates)
- [ ] Script conversion AVIF fonctionnel
- [ ] Documentation pipeline disponible

### 12.2 Livrables Attendus

1. **`audit-images.md`** : Liste exhaustive images (existantes + manquantes)
2. **`images-recuperees/`** : Dossier images Webflow/Orbitvu organisées
3. **`systeme-generation-images.md`** : Documentation pipeline Gemini
4. **`templates-prompts/`** : 20-25 templates prompts réutilisables
5. **`convert-to-avif.js`** : Script conversion automatique
6. **`public/images/`** : Toutes images optimisées AVIF+WebP

---

## 13. RISQUES ET MITIGATION

### 13.1 Risques Identifiés

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **Session Pilote 1 non exécutée** | 🔴 Bloquant | Haute | ✅ Exécuter SP1 en priorité |
| **Images Webflow inaccessibles** | 🟠 Moyen | Moyenne | Utiliser Orbitvu + Gemini |
| **Copyright images Orbitvu** | 🟠 Moyen | Moyenne | Vérifier licence, utiliser Gemini si besoin |
| **Qualité Gemini insuffisante** | 🟡 Faible | Faible | Tester Gemini 3 Pro, itérer prompts |
| **Budget API dépassé** | 🟡 Faible | Faible | Budget ~$10 USD (200 images), très accessible |
| **Poids images trop élevé** | 🟡 Faible | Moyenne | Optimisation AVIF agressive (quality 75-80) |

### 13.2 Plan de Contingence

**Si Session Pilote 1 non terminable :**
- Créer inventaire manuel minimal (pages prioritaires)
- Estimer images nécessaires par analyse pages existantes
- Procéder avec génération Gemini pour combler

**Si images Webflow irrécupérables :**
- 100% génération Gemini (sauf produits)
- Contacter Orbitvu pour assets officiels
- Utiliser photos libres de droits (Unsplash Pro) en dernier recours

**Si API Gemini indisponible :**
- Utiliser DALL-E 3 (OpenAI) en alternative
- Utiliser Midjourney (Discord bot)
- Stock photos premium (Adobe Stock, Shutterstock) si nécessaire

---

## 14. CONCLUSION

### 14.1 Statut Global

**🔴 Session Pilote 4 BLOQUÉE**

**Raison :** Dépendances non satisfaites (Couche 0 non validée)

**Action requise :** Exécuter Session Pilote 1 complète avant de continuer.

### 14.2 Disponibilité Technique

**✅ API Gemini 2.5 disponible et prête**
**✅ Brandbook (Couche 1) validé avec guidelines images complètes**
**❌ Données sources (Couche 0) manquantes**

### 14.3 Estimation Effort

**Avec Couche 0 validée :**
- Session 4-1 (Audit) : 2-3h
- Session 4-2 (Récupération) : 3-4h
- Session 4-3 (Génération) : 4-6h (20-25 templates + génération)
- Session 4-4 (Optimisation) : 2-3h (script + conversion batch)

**Total estimé :** 11-16h de travail (4 sessions spécialisées)

### 14.4 Recommandation Finale

**📋 Prochaine étape :**
1. **Informer Session Pilote en Chef** : SP4 bloquée par dépendance SP1
2. **Exécuter Session Pilote 1** : Priorité absolue
3. **Valider Couche 0** : Tous livrables SP1 disponibles
4. **Relancer SP4** : Avec données complètes

**Alternative (si SP1 impossible) :**
- Créer inventaire minimal manuel
- Procéder avec génération Gemini prioritaire
- Itérer avec images réelles ultérieurement

---

**Analyse créée le :** 1er février 2026
**Prochaine action :** Créer `prompt-4-1.md` (en standby jusqu'à validation Couche 0)
**Statut :** ⏸️ EN ATTENTE PRÉREQUIS

---

## SOURCES

- [Gemini API Release Notes](https://ai.google.dev/gemini-api/docs/changelog)
- [Gemini 2.5 Flash Image Documentation](https://ai.google.dev/gemini-api/docs/image-generation)
- [Gemini 2.5 Flash Image Production Ready](https://developers.googleblog.com/en/gemini-2-5-flash-image-now-ready-for-production-with-new-aspect-ratios/)
- [Gemini Models Overview](https://ai.google.dev/gemini-api/docs/models)
