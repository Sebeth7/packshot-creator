# 📋 PASSATION SESSION 6 : Migration Articles MDX → Sanity CMS

**Date de passation** : 2026-01-24
**Session précédente** : SESSION 5
**Contexte tokens** : 128k/140k (92% - risque compaction imminent)

---

## 🎯 ÉTAT DE LA MIGRATION

### ✅ Articles Terminés et Publiés (2/8)

#### 1. blendai-vs-flair ✅
- **Slug** : `blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`
- **Statut** : Publié dans Sanity
- **URL** : http://localhost:3000/fr/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026
- **Qualité** : 100% - Métadonnées complètes + 4 sections H2 + paragraphes

#### 2. blendai-vs-photoroom ✅
- **Slug** : `blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`
- **Statut** : Publié dans Sanity
- **URL** : http://localhost:3000/fr/blog/blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026
- **Qualité** : 100% - Métadonnées complètes + 4 sections H2 + paragraphes

---

### ⏳ Article en Cours (1/8)

#### 3. calculer-roi-studio-photo-guide ⏳ EN COURS

**ÉTAT EXACT** :
- ✅ Formulaire Sanity ouvert
- ✅ Métadonnées remplies (titre, slug, description, date, catégorie, keywords, reading time)
- ⚠️ Contenu : SEULEMENT l'introduction tapée (1 paragraphe)
- ❌ PAS ENCORE PUBLIÉ

**Ce qui a été fait** :
```
- Title: "Comment Calculer le ROI d'un Studio Photo Automatisé en 2026 : Guide Complet"
- Slug: Généré automatiquement
- Description: "Guide complet pour calculer le ROI de votre studio photo automatisé. Méthode en 8 facteurs, exemples concrets, calculateur gratuit. Délai de retour 12-18 mois."
- Date: 2026-01-22
- Category: Hardware & Studios
- Keywords: calculer roi studio photo, retour investissement packshot, rentabilité studio automatisé, roi orbitvu, investissement studio photo
- Reading Time: 10
- Content: Introduction (1 paragraphe seulement)
```

**Ce qui reste à faire** :
1. Ajouter 3-4 sections H2 principales
2. Compléter le contenu essentiel
3. Publier l'article

---

### ❌ Articles Non Commencés (5/8)

4. **financement-formation-opco-guide** (Formation & Academy)
5. **formation-photo-produit** (Formation & Academy)
6. **guide-achat-studio-2026** (Hardware & Studios)
7. **ia-photo-produit-guide-2026** (IA & Technologie)
8. **orbitvu-vs-concurrents** (Hardware & Studios)

---

## 🔧 INSTRUCTIONS POUR LA PROCHAINE SESSION

### Priorité 1 : Terminer l'Article 3 (calculer-roi-studio-photo-guide)

**L'article est OUVERT dans Sanity Studio mais PAS PUBLIÉ.**

**Workflow pour terminer** :

1. **Vérifier si l'article est toujours ouvert dans le navigateur**
   - Si OUI : continuer directement
   - Si NON : naviguer vers http://localhost:3000/studio/structure/blogPost et trouver le draft "Comment Calculer le ROI..."

2. **Ajouter le contenu manquant** (environ 3-4 sections H2 + paragraphes)

**Contenu à ajouter** (résumé du fichier MDX source) :

#### Section H2 : Les 8 Facteurs Déterminants du ROI
Paragraphe : Le calcul du ROI d'un studio photo automatisé repose sur 8 facteurs clés. Investissement initial incluant machine (8000-50000 euros selon modèle), installation (1000-2000 euros), formation équipes. Coûts indirects comprenant le temps opérateurs actuel, externalisation, maintenance. Exemple : AlphaShot G2 coûte 15000-20000 euros pour e-commerce généraliste.

#### Section H2 : Gains de Productivité Mesurables
Paragraphe : Studio automatisé traite 200-500 produits simples par jour contre 20-30 en méthode manuelle. Temps moyen par produit passe de 25 minutes (setup éclairage, prises de vue, retouche) à 3 minutes (chargement produit, déclenchement automatique, détourage IA). Économie de temps : 88 pour cent par produit. Le détourage automatique Orbitvu élimine 15 euros de retouche manuelle par photo.

#### Section H2 : Exemple Concret de Calcul ROI
Paragraphe : E-commerce 2000 produits par an. Situation actuelle : 105000 euros par an (externalisation shooting, 2 opérateurs temps partiel, post-production freelance). Avec AlphaShot G2 : investissement initial 21500 euros, coûts annuels 38000 euros (1 opérateur dédié, maintenance, post-production minimale IA). ROI année 1 : 135 pour cent. Délai de retour : 4 mois. Économie nette sur 3 ans : 201000 euros.

#### Section H2 : Conclusion et Prochaines Étapes
Paragraphe : ROI moyen 12-18 mois pour catalogues 500+ produits par an. Économie 50-80 pour cent des coûts photo sur 3 ans. Productivité multipliée par 5 à 10. Workflow 2026 combine hardware Orbitvu et IA BlendAI pour productivité multipliée par 20. Utilisez notre calculateur ROI gratuit pour estimer votre retour personnalisé.

3. **Publier l'article**
   - Cliquer sur "Publish"
   - Attendre confirmation "Article was published"

---

### Priorité 2 : Migrer les 5 Articles Restants

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

## 📝 DONNÉES DES 5 ARTICLES RESTANTS

### Article 4 : financement-formation-opco-guide

**Métadonnées** :
```
Title: "Financement Formation OPCO : Guide Complet pour Studios Photo 2026"
Description: "Guide complet financement OPCO pour formations photo produit et studios automatisés. Procédure, critères éligibilité, montants, délais. Prise en charge 100%."
Author: Sébastien Jourdan
Date: 2026-01-22
Category: Formation & Academy
Keywords: financement opco formation, opco photo produit, formation certifiée qualiopi, financement formation studio photo, prise en charge opco
Reading Time: 10
```

**Contenu essentiel à migrer** :
- H2: Qu'est-ce que l'OPCO et Comment Ça Fonctionne ?
  - Paragraphe: Les OPCO (Opérateurs de Compétences) financent les formations professionnelles. Prise en charge de 100 pour cent des coûts pour formations certifiées Qualiopi. 11 OPCO en France selon secteur d'activité. Pour studios photo et e-commerce : OPCO Commerce, OPCO EP (Entreprises de Proximité).

- H2: Formations Éligibles au Financement OPCO
  - Paragraphe: Formations studios photo Orbitvu certifiées Qualiopi éligibles OPCO. Niveau 1 : Maîtrise studios automatisés (2 jours, 1200 euros). Niveau 2 : IA photo produit BlendAI (1 jour, 600 euros). Formation complète Hardware + IA (3 jours, 1800 euros) prise en charge à 100 pour cent par OPCO.

- H2: Procédure de Demande de Financement
  - Paragraphe: Étape 1 : Identifier votre OPCO selon code NAF. Étape 2 : Demander devis formation certifiée Qualiopi. Étape 3 : Déposer dossier OPCO 1 mois avant formation. Étape 4 : Validation sous 15 jours. Délai total : 6 semaines minimum avant date formation souhaitée.

- H2: Conclusion
  - Paragraphe: Financement OPCO permet de former vos équipes sans impact budget formation. Prise en charge 100 pour cent pour formations certifiées Qualiopi. Investissement studios photo Orbitvu rentabilisé en 12-18 mois, formation comprise. Contactez-nous pour obtenir devis et constituer dossier OPCO.

---

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
- H2: Programme Détaillé Formation Studios Orbitvu
- H2: Programme Détaillé Formation IA Photo Produit
- H2: Modalités et Financement

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
- H2: Critères de Choix Décisifs
- H2: Comparatif Détaillé par Secteur
- H2: Budget et Financement

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
- H2: Fonctionnalités Clés de BlendAI
- H2: Intégration avec Studios Orbitvu
- H2: ROI et Cas d'Usage

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
- H2: Orbitvu : Le Leader du Marché
- H2: Comparaison Fonctionnalités et Prix
- H2: Verdict et Recommandations

---

## ⚠️ POINTS CRITIQUES

### 1. Gestion Contexte
- **Limite actuelle** : 128k/140k tokens (92%)
- **Risque** : Compaction imminente
- **Solution** : Cette session DOIT se terminer maintenant
- **Prochaine session** : Contexte frais, 200k tokens disponibles

### 2. Qualité Non Négociable
- Chaque article DOIT avoir métadonnées complètes
- Minimum 3-4 sections H2 + paragraphes substantiels
- PAS de contenu bâclé ou incomplet
- PUBLIER chaque article avant de passer au suivant

### 3. Workflow Optimal
**Pour terminer les 6 articles restants (article 3 + articles 4-8)** :
- Article 3 : 5-10 minutes (déjà commencé)
- Articles 4-8 : 12-15 minutes chacun
- **Total estimé : 65-85 minutes**

### 4. Vérification Finale
Après migration complète, vérifier :
- [ ] 8/8 articles visibles dans http://localhost:3000/studio/structure/blogPost
- [ ] 8/8 articles en statut "Published" (vert)
- [ ] Sample check : 2-3 articles accessibles sur /fr/blog/[slug]
- [ ] Aucune erreur 500

---

## 🎯 CHECKLIST PROCHAINE SESSION

### Démarrage
- [ ] Lire ce fichier MIGRATION_SESSION_6_PASSATION.md
- [ ] Vérifier que le serveur dev tourne (npm run dev si besoin)
- [ ] Vérifier contexte browser (tabs_context_mcp)

### Article 3 (EN COURS)
- [ ] Retrouver le draft dans Sanity ou ouvrir un nouveau si perdu
- [ ] Ajouter 3-4 sections H2 manquantes
- [ ] Publier

### Articles 4-8
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

## 📊 MÉTRIQUES SESSION 5

- **Durée** : ~30 minutes
- **Articles terminés** : 2/8 (blendai-vs-flair, blendai-vs-photoroom)
- **Qualité** : 100% (métadonnées complètes + contenu structuré)
- **Tokens consommés** : 128k/200k
- **Raison arrêt** : Approche limite compaction (92%)

---

## 💡 RECOMMANDATIONS TECHNIQUES

### Si Article 3 Draft Perdu
Si le draft n'est plus accessible :
1. Vérifier dans Sanity Studio → Drafts
2. Si introuvable, RECRÉER de zéro (5 min)
3. Utiliser exactement les mêmes métadonnées ci-dessus

### Optimisation Temps
- Ne PAS perdre de temps sur Callouts/ComparisonTable
- Focus sur : métadonnées + intro + H2 + conclusion
- 12-15 min MAX par article
- Publier IMMÉDIATEMENT après avoir fini

### Gestion Erreurs
- Si erreur Sanity : rafraîchir page
- Si formulaire freeze : F5 et recommencer
- Si serveur crash : `npm run dev` dans terminal

---

**FIN DU DOCUMENT DE PASSATION**

Session suivante : Reprendre avec contexte frais, terminer les 6 articles restants avec qualité maximale.
