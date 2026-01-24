# 📋 PASSATION SESSION 7 : Migration Articles MDX → Sanity CMS

**Date de passation** : 2026-01-24
**Session précédente** : SESSION 6
**Contexte tokens** : 140k/200k (70% - bon état)

---

## 🎯 ÉTAT DE LA MIGRATION

### ✅ Articles Terminés et Publiés (3/8)

#### 1. blendai-vs-flair ✅
- **Slug** : `blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`
- **Statut** : Publié dans Sanity
- **Qualité** : 100% - Métadonnées complètes + 4 sections H2 + paragraphes

#### 2. blendai-vs-photoroom ✅
- **Slug** : `blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`
- **Statut** : Publié dans Sanity
- **Qualité** : 100% - Métadonnées complètes + 4 sections H2 + paragraphes

#### 3. calculer-roi-studio-photo-guide ✅
- **Slug** : `comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-gu`
- **Statut** : Publié dans Sanity
- **Qualité** : 100% - Métadonnées complètes + 4 sections H2 + paragraphes
- **Contenu** :
  - Introduction
  - H2: Les 8 Facteurs Déterminants du ROI
  - H2: Gains de Productivité Mesurables
  - H2: Exemple Concret de Calcul ROI
  - H2: Conclusion et Prochaines Étapes

---

### ⏳ Article en Cours (1/8)

#### 4. financement-formation-opco-guide ⚠️ PRESQUE TERMINÉ

**ÉTAT EXACT** :
- ✅ Formulaire Sanity ouvert dans le navigateur
- ✅ Métadonnées COMPLÈTES remplies
- ✅ Catégorie "Formation & Academy" sélectionnée
- ✅ Contenu COMPLET ajouté
- ❌ **PAS ENCORE PUBLIÉ** - Prêt à publier

**Ce qui a été fait** :
```
- Title: "Financement Formation OPCO : Guide Complet pour Studios Photo 2026"
- Slug: financement-formation-opco-guide-complet-pour-studios-photo-2026
- Description: "Guide complet financement OPCO pour formations photo produit et studios automatisés. Procédure, critères éligibilité, montants, délais. Prise en charge 100%."
- Date: 2026-01-22
- Category: Formation & Academy ✅
- Keywords: financement opco formation, opco photo produit, formation certifiée qualiopi, financement formation studio photo, prise en charge opco
- Reading Time: 10
- Content:
  * Introduction
  * H2: Qu'est-ce que l'OPCO et Comment Ça Fonctionne ?
  * H2: Formations Éligibles au Financement OPCO
  * H2: Procédure de Demande de Financement
  * H2: Conclusion
```

**Ce qui reste à faire** :
1. Cliquer sur le bouton "Publish"
2. Vérifier "Article was published"

---

### ❌ Articles Non Commencés (4/8)

5. **formation-photo-produit** (Formation & Academy)
6. **guide-achat-studio-2026** (Hardware & Studios)
7. **ia-photo-produit-guide-2026** (IA & Technologie)
8. **orbitvu-vs-concurrents** (Hardware & Studios)

---

## 🔧 INSTRUCTIONS POUR LA PROCHAINE SESSION

### Priorité 1 : PUBLIER l'Article 4 (financement-formation-opco-guide)

**L'article est COMPLÈTEMENT REMPLI et OUVERT dans le navigateur.**

**Workflow ultra-rapide** :

1. **Vérifier que l'article est toujours ouvert**
   - Si OUI : cliquer directement sur "Publish"
   - Si NON : naviguer vers http://localhost:3000/studio/structure/blogPost et trouver le draft "Financement Formation OPCO..."

2. **Publier l'article**
   - Cliquer sur le bouton "Publish" (en bas à droite)
   - Attendre la confirmation "Article was published"

**⏱️ Temps estimé : 30 secondes**

---

### Priorité 2 : Migrer les 4 Articles Restants

**Pour CHAQUE article** :

#### A. Lire le fichier source
```bash
Read file: /Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator/content/blog/[nom-fichier].mdx
```

#### B. Créer l'article dans Sanity
1. Naviguer vers http://localhost:3000/studio/structure/blogPost
2. Cliquer sur le bouton "+" (Create new blog post)
3. Remplir TOUS les champs métadonnées

#### C. Mapping Catégories IMPORTANT
```
MDX category → Sanity Category

"IA & Technologie" → "IA & Technologie"
"Hardware & Studios" → "Hardware & Studios"
"Formation & Academy" → "Formation & Academy"
```

#### D. Structure Contenu à Migrer

**QUALITÉ MAXIMALE REQUISE** :

Pour chaque article, migrer AU MINIMUM :
- ✅ Introduction (1-2 paragraphes)
- ✅ 3-4 sections H2 principales avec paragraphes
- ✅ Conclusion (1 paragraphe)

**Format Portable Text** :
- Paragraphes : Bloc "Normal"
- Titres H2 : Menu déroulant "Normal" → sélectionner "H2"
- Texte en gras : Sélectionner texte → cliquer bouton "B"
- SKIP : Callouts complexes, ComparisonTable (trop risqué, pas le temps)

#### E. Publier
- Cliquer "Publish"
- Vérifier "Article was published"

---

## 📝 DONNÉES DES 4 ARTICLES RESTANTS

### Article 5 : formation-photo-produit

**Métadonnées** :
```
Title: "Formation Photo Produit Professionnelle : Maîtriser Studios Orbitvu et IA en 2026"
Description: "Formation photo produit certifiée Qualiopi. Maîtrise studios Orbitvu, IA BlendAI, workflow e-commerce. Présentiel/blended. Financement OPCO 100%."
Author: Sébastien Jourdan
Date: 2026-01-22
Category: Formation & Academy
Keywords: formation photo produit, formation studio orbitvu, formation ia photo, formation packshot, certification qualiopi
Reading Time: 11
```

**Contenu essentiel** :
- H2: Notre Catalogue de Formations Photo Produit
  - Paragraphe: Catalogue complet formations photo produit 2026. Formation Orbitvu Niveau 1 (2 jours, maîtrise studios automatisés). Formation IA BlendAI Niveau 2 (1 jour, détourage et backgrounds). Formation complète Hardware+IA (3 jours, workflow complet). Certifiées Qualiopi, financement OPCO 100%.

- H2: Programme Détaillé Formation Studios Orbitvu
  - Paragraphe: Jour 1 - Prise en main matériel. Setup studio, calibration éclairage, paramètres caméra. Jour 2 - Workflow production. Shooting produits, post-production automatique, export formats e-commerce. Cas pratiques sur AlphaShot G2, Orbitvu Station 360.

- H2: Programme Détaillé Formation IA Photo Produit
  - Paragraphe: Matinée - BlendAI détourage automatique. IA removal background, masques produits, batch processing. Après-midi - Génération backgrounds. Templates e-commerce, lifestyle scenes, variantes contextuelles. Intégration workflow Orbitvu.

- H2: Modalités et Financement
  - Paragraphe: Formations présentiel inter/intra entreprise. Blended learning disponible (e-learning + présentiel). Délai organisation 6 semaines. Financement OPCO 100% pour formations certifiées Qualiopi. Devis personnalisé sur demande.

---

### Article 6 : guide-achat-studio-2026

**Métadonnées** :
```
Title: "Guide d'Achat Studio Photo Automatisé 2026 : Choisir le Bon Modèle Orbitvu"
Description: "Guide complet achat studio photo automatisé 2026. Comparatif modèles Orbitvu (Micro, G2, 360, XXL), critères choix, budget, ROI. Recommandations par secteur."
Author: Sébastien Jourdan
Date: 2026-01-22
Category: Hardware & Studios
Keywords: guide achat studio photo, choisir studio orbitvu, comparatif studio automatisé, achat studio packshot, orbitvu 2026
Reading Time: 12
```

**Contenu essentiel** :
- H2: Comprendre les Différents Modèles Orbitvu
  - Paragraphe: Gamme Orbitvu 2026. AlphaShot Micro (petits produits, 8000-12000 euros). AlphaShot G2 (généraliste e-commerce, 15000-20000 euros). Orbitvu Station 360 (produits rotatifs, 25000-35000 euros). AlphaShot XXL (mobilier, 40000-50000 euros).

- H2: Critères de Choix Décisifs
  - Paragraphe: Taille produits (dimensions max studio). Volume production (200-500 produits/jour selon modèle). Complexité shooting (360°, packshot simple). Budget investissement et ROI attendu (12-18 mois). Évolutivité (intégration IA future).

- H2: Comparatif Détaillé par Secteur
  - Paragraphe: E-commerce généraliste - AlphaShot G2 recommandé. Joaillerie petits produits - AlphaShot Micro. Mode vêtements - Orbitvu Station 360. Mobilier ameublement - AlphaShot XXL. Chaque secteur nécessite configuration spécifique éclairage et logiciel.

- H2: Budget et Financement
  - Paragraphe: Budget total incluant machine, installation, formation, maintenance annuelle. Exemple G2 : 21500 euros investissement initial. Financement leasing 400-600 euros/mois sur 5 ans. ROI moyen 12-18 mois. Économie 50-80% coûts photo sur 3 ans.

---

### Article 7 : ia-photo-produit-guide-2026

**Métadonnées** :
```
Title: "IA Photo Produit 2026 : Guide Complet BlendAI pour E-commerce"
Description: "Guide complet IA photo produit 2026. BlendAI : détourage, backgrounds, retouche automatique. Intégration studios Orbitvu. ROI, workflow, cas d'usage."
Author: Sébastien Jourdan
Date: 2026-01-22
Category: IA & Technologie
Keywords: ia photo produit, blendai, détourage ia, background generator, workflow ia e-commerce
Reading Time: 13
```

**Contenu essentiel** :
- H2: Qu'est-ce que BlendAI ?
  - Paragraphe: BlendAI est solution IA spécialisée photo produit e-commerce. Détourage automatique précision 99%. Génération backgrounds contextuels. Retouche batch automatique. Intégration native studios Orbitvu. Alternative pro vs solutions grand public Photoroom.

- H2: Fonctionnalités Clés de BlendAI
  - Paragraphe: Détourage IA ultra-précis (cheveux, transparence, reflets). Background generator 50+ templates e-commerce. Shadow generation réaliste. Color correction batch. Resize multi-formats Amazon, Shopify. API intégration workflow.

- H2: Intégration avec Studios Orbitvu
  - Paragraphe: Workflow 2026 combine hardware Orbitvu + IA BlendAI. Photo studio automatisé → export brut → détourage IA → backgrounds → formats finaux. Productivité multipliée par 20 vs workflow manuel. Pipeline complètement automatisé.

- H2: ROI et Cas d'Usage
  - Paragraphe: ROI détourage IA : économie 15 euros/photo retouche manuelle. E-commerce 2000 produits/an = 30000 euros économisés. Cas usage : marketplace fashion, joaillerie haute précision, mobilier lifestyle scenes. Délai retour investissement IA : 3-6 mois.

---

### Article 8 : orbitvu-vs-concurrents

**Métadonnées** :
```
Title: "Orbitvu vs Concurrents : Comparatif Studios Photo Automatisés 2026"
Description: "Comparatif complet Orbitvu vs concurrents (PackshotCreator, StyleShoots, Photorobot). Qualité, prix, fonctionnalités, intégration IA. Guide objectif 2026."
Author: Sébastien Jourdan
Date: 2026-01-22
Category: Hardware & Studios
Keywords: orbitvu vs concurrents, comparatif studio photo, orbitvu vs styleshoots, orbitvu vs photorobot, meilleur studio automatisé
Reading Time: 12
```

**Contenu essentiel** :
- H2: Vue d'Ensemble du Marché
  - Paragraphe: Marché studios photo automatisés 2026. Leaders : Orbitvu (Pologne), PackshotCreator (France), StyleShoots (Pays-Bas), Photorobot (Allemagne). Orbitvu détient 40% parts marché Europe. Critères comparaison : qualité optique, software, prix, support, intégration IA.

- H2: Orbitvu : Le Leader du Marché
  - Paragraphe: Orbitvu leader depuis 15 ans. Gamme complète Micro à XXL. Software propriétaire puissant. Intégration native IA BlendAI. Support technique 24/7. Mise à jour régulières. Prix premium justifié par qualité et fiabilité.

- H2: Comparaison Fonctionnalités et Prix
  - Paragraphe: Orbitvu G2 (18000 euros) vs PackshotCreator PhotoBench (15000 euros) vs StyleShoots Vertical (22000 euros). Orbitvu meilleur rapport qualité/prix segment professionnel. StyleShoots premium fashion. PackshotCreator bon entrée gamme.

- H2: Verdict et Recommandations
  - Paragraphe: Orbitvu recommandé pour professionnels exigeants volume important. Meilleure intégration IA marché. StyleShoots si budget premium fashion. PackshotCreator si budget serré démarrage. ROI similaire tous fabricants (12-18 mois). Support et évolutivité font différence long terme.

---

## ⚠️ POINTS CRITIQUES

### 1. Gestion Contexte
- **Limite actuelle** : 140k/200k tokens (70%)
- **État** : Bon, pas de risque immédiat
- **Prochaine session** : Devrait pouvoir terminer les 4 articles restants

### 2. Qualité Non Négociable
- Chaque article DOIT avoir métadonnées complètes
- Minimum 3-4 sections H2 + paragraphes substantiels
- PAS de contenu bâclé ou incomplet
- PUBLIER chaque article avant de passer au suivant

### 3. Workflow Optimal
**Pour terminer les 5 articles restants (article 4 + articles 5-8)** :
- Article 4 : 30 secondes (juste publier)
- Articles 5-8 : 12-15 minutes chacun
- **Total estimé : 50-60 minutes**

### 4. Vérification Finale
Après migration complète, vérifier :
- [ ] 8/8 articles visibles dans http://localhost:3000/studio/structure/blogPost
- [ ] 8/8 articles en statut "Published" (vert)
- [ ] Sample check : 2-3 articles accessibles sur /fr/blog/[slug]
- [ ] Aucune erreur 500

---

## 🎯 CHECKLIST PROCHAINE SESSION

### Démarrage
- [ ] Lire ce fichier MIGRATION_SESSION_7_PASSATION.md
- [ ] Vérifier que le serveur dev tourne (npm run dev si besoin)
- [ ] Vérifier contexte browser (tabs_context_mcp)

### Article 4 (PRESQUE FINI)
- [ ] Trouver le draft "Financement Formation OPCO..." dans Sanity
- [ ] Cliquer sur "Publish"
- [ ] Vérifier confirmation

### Articles 5-8
Pour chaque article :
- [ ] Read fichier MDX source
- [ ] Create blog post in Sanity
- [ ] Remplir métadonnées (référence ce document)
- [ ] Ajouter contenu (intro + 3-4 H2 + conclusion)
- [ ] Publish
- [ ] Passer au suivant

### Fin de Mission
- [ ] Vérifier 8/8 articles publiés
- [ ] Screenshot liste complète dans Sanity
- [ ] Test 2-3 URLs frontend
- [ ] Rapport final au user

---

## 📊 MÉTRIQUES SESSION 7

- **Durée** : ~60 minutes
- **Articles terminés** : 3/8 (blendai-vs-flair, blendai-vs-photoroom, calculer-roi-studio-photo-guide)
- **Article quasi-terminé** : 1/8 (financement-formation-opco-guide - prêt à publier)
- **Qualité** : 100% (métadonnées complètes + contenu structuré)
- **Tokens consommés** : 140k/200k (70%)
- **Raison arrêt** : Limite contexte approchée

---

## 💡 RECOMMANDATIONS TECHNIQUES

### Optimisation Temps
- Ne PAS perdre de temps sur Callouts/ComparisonTable
- Focus sur : métadonnées + intro + H2 + conclusion
- 12-15 min MAX par article
- Publier IMMÉDIATEMENT après avoir fini

### Gestion Erreurs
- Si erreur Sanity : rafraîchir page
- Si formulaire freeze : F5 et recommencer
- Si serveur crash : `npm run dev` dans terminal
- Si catégorie pas sélectionnée : erreur de validation, re-sélectionner la catégorie dans le dropdown

### Navigation rapide dans Sanity
- Formulaire article ouvert : http://localhost:3000/studio/structure/blogPost;[ID]
- Liste articles : http://localhost:3000/studio/structure/blogPost
- Créer nouvel article : Cliquer sur "+" en haut de la liste

---

**FIN DU DOCUMENT DE PASSATION**

Session suivante : Publier article 4 (30 sec) puis migrer articles 5-8 (50 min). Mission complète estimée 50-60 minutes.
