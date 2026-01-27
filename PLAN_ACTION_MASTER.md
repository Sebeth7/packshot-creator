# 🎯 PLAN D'ACTION MASTER - PackshotCreator Next.js

**Date création :** 25 janvier 2026
**Objectif :** Migration Webflow → Next.js avec amélioration complète
**Principe :** Augmenter sans casser (0 perte SEO, amélioration UX/performance)

---

## 📍 CONTEXTE PROJET

### Situation Actuelle

**Site actuel :** Webflow (packshot-creator.com)
- Bon SEO (~20k clics/an)
- Architecture éprouvée
- Formulaires Pipedrive intégrés
- Contenu riche

**Site Next.js :** En développement (Vercel)
- Next.js 16 + React 19 + TypeScript
- Sanity CMS opérationnel
- Brandbook 2025 implémenté
- Design system complet
- Calculateur ROI ✅ (fonctionnel)

### Objectif Final

**Migration complète Webflow → Next.js avec :**
- ✅ 0 perte SEO (redirections, contenu, structure)
- ✅ Performance supérieure (SSG, optimisations)
- ✅ Nouveau discours (Hardware, IA, Formation)
- ✅ Nouvelles fonctionnalités (calculateurs, LMS, OPCO)
- ✅ UX améliorée (animations, interactivité)

---

## 🎯 VISION STRATÉGIQUE

### Principes Immuables

1. **Préservation SEO** : Aucune URL perdue, redirections testées, contenu équivalent ou supérieur
2. **Construction logique** : Fondations → Fonctionnalités → Optimisations → Analytics
3. **Qualité > Vitesse** : Finir chaque phase complètement avant la suivante
4. **Évolution, pas révolution** : Reprendre ce qui marche sur Webflow, l'améliorer, mais implémenter également les nouveautés
5. **Traçabilité** : Documenter décisions et changements

### Ce qui Doit Être Meilleur

- Performance (Lighthouse >90)
- Animations et micro-interactions
- Discours marketing (Hardware, IA, Formation)
- Outils interactifs (ROI, sélecteurs, simulateurs)
- Parcours utilisateur (conversions)
- Offre formations (inexistante actuellement)

---

## 📊 ÉTAT DES LIEUX

### ✅ Déjà Fait

- Infrastructure Next.js 16 + Sanity CMS
- Design system Brandbook 2025 (90% conforme)
- i18n FR/EN opérationnel
- Blog dual source (Sanity + Webflow fallback)
- 8 articles blog migrés
- Calculateur ROI complet (avec sélecteur machines intégré)
- 17 redirections 301 configurées
- Documentation complète (12 docs créées)

### ❌ Manquant Critique

**Contenu :**
- 0/6 formations créées dans Sanity
- 0/12 pages secteurs `/industrie/*`
- 3 pages légales manquantes
- Page À propos manquante
- 13 articles blog prioritaires

**Fonctionnalités :**
- Formulaires non migrés (Webflow → Next.js/Pipedrive)
- Sélecteur machines non extrait (intégré dans ROI)
- Section OPCO absente
- Simulateur OPCO absent
- LMS non configuré

**SEO Technique :**
- Sitemap.xml non déployé
- Robots.txt manquant
- Hreflang FR/EN absent
- Schema.org non implémenté
- Pages produits à créer

**Analytics :**
- GA4 non configuré
- Events tracking absent
- Goals non définis

**Validation :**
- Redirections 301 non testées
- Tests Lighthouse non faits

---

## 🏗️ PLAN D'ACTION EN 8 PHASES

### PHASE 1 : CONTENU & STRUCTURE (Base) - 50-70h

**Objectif :** Remplir le site de contenu essentiel avant toute optimisation

**Livrables :**
- 6 formations créées dans Sanity (schéma déjà existant)
- 12 pages secteurs `/industrie/*` (chaussures, bijoux, mobilier, food, cosmétiques, etc.)
- 3 pages légales (Mentions, CGV, Confidentialité) - reprendre Webflow
- Page À propos
- Section OPCO pédagogique

**Références :**
- Schema Sanity formations : `sanity/schemas/formation.ts`
- Gap Analysis Contenu : `docs/GAP_ANALYSIS/04-content-gap.md`
- Docs FINAUX : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/formations_blended_architecture.md`

**Approche Claude Code :**
- Task "Content Creation" : Créer toutes les pages/formations en parallèle
- Utiliser schémas Sanity existants
- Copier contenu légal depuis Webflow (adapter UX/UI Brandbook 2025)

**Dépendances :** Aucune (phase de démarrage)

**Validation :**
- [ ] 6 formations visibles dans Sanity Studio
- [ ] 12 pages `/industrie/[slug]` accessibles
- [ ] 3 pages légales publiées
- [ ] Page À propos publiée
- [ ] Section OPCO visible sur page Academy

---

### PHASE 2 : COMPOSANTS & FONCTIONNALITÉS - 12-20h

**Objectif :** Ajouter interactivité maintenant que le contenu existe

**Livrables :**
- Sélecteur machines extrait du calculateur ROI (composant standalone)
- Slider avant/après BlendAI
- Simulateur éligibilité OPCO
- Formulaires migrés Webflow → Next.js/Pipedrive

**Inventaires préalables nécessaires :**
- [ ] Liste complète formulaires Webflow (URL, champs, destination Pipedrive)
- [ ] Spécifications simulateur OPCO (critères éligibilité)

**Références :**
- Calculateur ROI existant : `components/calculators/ROICalculator/`
- Composants UI : `docs/04-components-ui/README.md`
- Forms patterns : React Hook Form + Zod (voir docs technique)

**Approche Claude Code :**
- Task "Interactive Components" : Créer composants UI en parallèle
- Task "Forms Migration" : Migrer formulaires avec connexion Pipedrive

**Dépendances :**
- Phase 1 terminée (contenu existe pour contexte)
- Inventaire formulaires fait

**Validation :**
- [ ] Sélecteur machines accessible standalone (URL dédiée)
- [ ] Slider BlendAI fonctionnel sur page IA
- [ ] Simulateur OPCO fonctionnel
- [ ] Tous formulaires Webflow recréés et testés (soumission → Pipedrive)

---

### PHASE 3 : INTÉGRATIONS EXTERNES - 6-10h

**Objectif :** Connecter systèmes tiers

**Livrables :**
- Plateforme LMS configurée (Thinkific recommandé 99$/mois)
- Intégration Pipedrive finalisée (tous formulaires)

**Décisions à prendre :**
- [ ] Quelle plateforme LMS ? (Thinkific vs autre)
- [ ] Hébergement vidéos formations ? (Vimeo Pro vs Cloudinary)

**Références :**
- Docs FINAUX formations : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/formations_blended_architecture.md`

**Approche Claude Code :**
- Task "Third-party Integrations" : Setup LMS + tests

**Dépendances :**
- Phase 1 terminée (formations créées dans Sanity)
- Phase 2 terminée (formulaires fonctionnels)

**Validation :**
- [ ] LMS accessible et configuré
- [ ] Compte test créé et fonctionnel
- [ ] Lien Sanity formations ↔ LMS établi

---

### PHASE 4 : AMÉLIORATION PAGES EXISTANTES - 40-80h (variable)

**Objectif :** Polir toutes les pages Next.js actuelles

**Scope :**
- Audit complet de toutes les pages existantes
- Enrichir contenu (textes, arguments, SEO)
- Ajouter animations React (Framer Motion)
- Micro-interactions (hover states, transitions)
- Optimiser images (lazy loading, formats modernes)
- Optimiser "Distributeur Officiel" (SEO)

**Inventaires préalables nécessaires :**
- [ ] Liste toutes pages Next.js actuelles (app/[lang]/*)
- [ ] Priorisation pages (trafic, conversions, stratégique)

**Références :**
- Design system : `docs/01-design-branding/README.md`
- Composants UI : `docs/04-components-ui/README.md`

**Approche Claude Code :**
- Task "Page Enhancement" par groupe de pages similaires
- Task "Animations" : Ajouter Framer Motion globalement

**Dépendances :**
- Phase 1-3 terminées (fonctionnalités complètes)
- Inventaire pages fait

**Validation :**
- [ ] Chaque page auditée et améliorée (checklist par page)
- [ ] Animations fluides (60fps)
- [ ] Images optimisées (<100KB)

---

### PHASE 5 : SEO TECHNIQUE - 10-15h + Pages Produits

**Objectif :** Optimisations SEO maintenant que contenu est stable

**Livrables :**
- Sitemap.xml déployé
- Robots.txt configuré
- Hreflang FR/EN implémenté
- Schema.org FAQ ajouté
- Pages produits créées + Schema.org Product

**Inventaires préalables nécessaires :**
- [ ] Liste produits à créer (AlphaShot, SunStudio, etc.)
- [ ] Specs produits (prix, images, caractéristiques)

**Références :**
- SEO documentation : `docs/06-seo-performance/README.md`
- Gap Analysis SEO : `docs/GAP_ANALYSIS/02-seo-gap.md`

**Approche Claude Code :**
- Task "SEO Technical Setup" : Sitemap, robots, hreflang
- Task "Product Pages" : Créer pages produits avec schema

**Dépendances :**
- Phase 1-4 terminées (contenu stable)
- Inventaire produits fait

**Validation :**
- [ ] Sitemap.xml accessible et valide (Google Search Console)
- [ ] Robots.txt testé
- [ ] Hreflang validé (hreflang checker)
- [ ] Schema.org validé (Google Rich Results Test)

---

### PHASE 6 : ANALYTICS & TRACKING - 4-6h

**Objectif :** Configurer analytics APRÈS URL finale

**Livrables :**
- GA4 configuré (propriété + stream)
- Events tracking (calculateurs, formulaires, CTAs)
- Goals/conversions définis
- Dashboard personnalisé

**Prérequis technique :**
- [ ] URL finale confirmée
- [ ] DNS configuré

**Références :**
- SEO documentation : `docs/06-seo-performance/README.md` (section Analytics)

**Approche Claude Code :**
- Task "Analytics Setup" : Configuration complète GA4

**Dépendances :**
- Phase 1-5 terminées (site complet)
- URL finale active

**Validation :**
- [ ] GA4 reçoit données (test temps réel)
- [ ] Events tracking fonctionnent (test 10 événements)
- [ ] Goals configurés (3 min : devis, formation, téléchargement)

---

### PHASE 7 : VALIDATION PRÉ-PRODUCTION - 3-5h

**Objectif :** Tests finaux avant mise en ligne

**Livrables :**
- 17 redirections 301 testées (aucune erreur)
- Tests Lighthouse (Perf, SEO, A11y >90)
- Tests manuels parcours utilisateur
- Tests formulaires (soumissions Pipedrive)

**Références :**
- Gap Analysis Migration : `docs/GAP_ANALYSIS/05-migration-gap.md`

**Approche Claude Code :**
- Task "Pre-Production QA" : Tests automatisés + rapport

**Dépendances :**
- Phase 1-6 terminées (site complet)

**Validation :**
- [ ] 17/17 redirections fonctionnelles
- [ ] Lighthouse Desktop : Perf >90, SEO 100, A11y >95
- [ ] Lighthouse Mobile : Perf >85, SEO 100, A11y >95
- [ ] Tous formulaires testés et fonctionnels

---

### PHASE 8 : CONTENU BONUS (Post-lancement) - 30-40h

**Objectif :** Enrichissement SEO après mise en ligne

**Livrables :**
- 13 articles blog prioritaires (#12-17 de la liste)
- Articles long-tail SEO

**Articles prioritaires :**
1. Guide IA 2026 (3000 mots)
2. Guide Achat Studio (finaliser 4 sections)
3. Focus-stacking tutoriel
4. Workflow photo produit
5. Limites IA (océan bleu)
6. Google Product Studio vs IA
7. Orbitvu Prix (optimiser existant)
8-13. Autres articles P1

**Références :**
- Gap Analysis Contenu : `docs/GAP_ANALYSIS/04-content-gap.md`
- Docs FINAUX : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Rapport_Opportunites_Articles_Blog_PackshotCreator_2026.md`

**Approche Claude Code :**
- Task "Blog Content" : Rédaction articles en parallèle (outlines)
- Rédaction finale manuelle ou avec LLM + révision humaine

**Dépendances :**
- Site en production
- Analytics opérationnel (mesurer impact)

**Validation :**
- [ ] 13/13 articles publiés et indexés Google
- [ ] Trafic SEO +10-15% (6 mois post-lancement)

---

## 🖼️ PHASE BONUS : IMAGES & VISUELS

**Objectif :** Remplacer toutes images placeholder par vraies images

**Approche :**
- Inventaire images manquantes (par page)
- Génération images IA (Google Gemini 2.5 / Nano-Banana)
- Optimisation (formats modernes, compression)

**Timing :** Parallèle à Phase 4 ou post-Phase 8

**Approche Claude Code :**
- Task "Image Generation" : Générer toutes images manquantes
- Task "Image Optimization" : Compression et formats modernes

---

## 📋 INVENTAIRES NÉCESSAIRES

### À Faire Avant Démarrage

**1. Formulaires Webflow (Phase 2)**
- [ ] URL de chaque formulaire
- [ ] Liste champs (name, type, required)
- [ ] Destination Pipedrive (deal, contact, lead)
- [ ] Actions post-soumission (email, redirect)

**2. Pages Produits (Phase 5)**
- [ ] Liste produits (nom, catégorie)
- [ ] Prix (si affichés)
- [ ] Caractéristiques techniques
- [ ] Images produits

**3. Pages à Améliorer (Phase 4)**
- [ ] Liste toutes pages Next.js actuelles
- [ ] Trafic Google Analytics (si dispo)
- [ ] Priorité stratégique (1-5)

**4. Images Manquantes (Phase Bonus)**
- [ ] Inventaire par page
- [ ] Type image (hero, product, illustration, icon)
- [ ] Dimensions requises

---

## 🎓 FORMATIONS SANITY - Spécifications

### 6 Formations à Créer

**Niveau 1 : Fondation**
- Blended : 650€ (e-learning + 1j présentiel)
- Présentiel : 850€ (2j présentiel)

**Niveau 2 : Maîtrise**
- Blended : 1 100€ (e-learning + 2j présentiel)
- Présentiel : 1 500€ (3j présentiel)

**Niveau 3 : Expert**
- Présentiel seul : 1 800€ (3j présentiel intensif)

**E-learning autonome**
- 450€ (vidéos + quiz, aucun présentiel)

### Champs Requis (Schema formation.ts)

- title, slug, description
- level (1, 2, 3, elearning)
- format (blended, presentiel, elearning)
- price, duration
- program (array de modules)
- prerequisites, objectives
- certification (boolean)
- financementOPCO (boolean)

**Référence complète :** `docs/GAP_ANALYSIS/04-content-gap.md` (section Formations)

---

## 🏭 PAGES SECTEURS - Spécifications

### 12 Pages `/industrie/[slug]`

1. Chaussures
2. Bijoux / Joaillerie
3. Mobilier / Décoration
4. Food / Alimentaire
5. Cosmétiques / Beauté
6. Mode / Textile
7. Électronique / High-Tech
8. Pièces techniques / Industrie
9. Automobile (pièces détachées)
10. Jouets / Puériculture
11. Sport / Outdoor
12. Santé / Médical

### Structure Page Type

- Hero avec image secteur
- Problématiques spécifiques
- Solutions packshot/IA adaptées
- Cas clients (si disponibles)
- Galerie visuels secteur
- CTA devis personnalisé

**Référence :** Pages Webflow actuelles `/industrie/*` (copier structure, améliorer discours)

---

## 📝 FORMULAIRES WEBFLOW - Migration

### Types Formulaires Identifiés

(À compléter avec inventaire Webflow)

**Exemples probables :**
- Contact général
- Demande devis machine
- Demande démo BlendAI
- Inscription formation
- Téléchargement guide/PDF
- Contact distributeur

### Pattern Migration

1. Identifier formulaire Webflow (HTML/champs)
2. Recréer avec React Hook Form + Zod
3. Styling Brandbook 2025
4. Connexion API Pipedrive (webhook ou SDK)
5. Tests soumission (vérifier réception Pipedrive)

**Référence technique :** `docs/04-components-ui/README.md` (section Forms)

---

## 🔗 REDIRECTIONS 301 - Test

### 17 Redirections Configurées

(Liste dans `next.config.ts`)

**Test requis (Phase 7) :**
- Tester chaque redirection manuellement
- Vérifier code HTTP 301 (permanent)
- Vérifier destination correcte
- Documenter résultats (tableau)

**Outils recommandés :**
- Screaming Frog (crawl)
- redirect-checker.org
- Browser DevTools Network

---

## 🎨 PRINCIPES UX/UI

### Améliorations vs Webflow

**Animations React (Framer Motion) :**
- Fade in au scroll
- Hover states élaborés
- Transitions fluides entre pages
- Micro-interactions (buttons, cards)

**Performance :**
- Images next/image (lazy loading auto)
- Formats modernes (WebP, AVIF)
- Fonts optimisées (display: swap)
- Code splitting (automatique Next.js)

**Interactivité :**
- Calculateurs (ROI, sélecteurs)
- Sliders avant/après
- Filtres dynamiques (si portfolio)
- Formulaires avec validation temps réel

**Respect Brandbook 2025 :**
- Couleurs exactes (CSS variables)
- Typographie (Inter, Roboto)
- Espacement cohérent
- Accessibilité WCAG AA

---

## 📚 RÉFÉRENCES DOCUMENTATION

### Documentation Projet (dans `/docs/`)

1. **Design & Branding** : `01-design-branding/README.md`
2. **Technique Développeur** : `02-technical-developer/README.md`
3. **CMS & Contenu** : `03-cms-content/README.md`
4. **Composants UI** : `04-components-ui/README.md`
5. **Architecture & Intégrations** : `05-architecture-integrations/README.md`
6. **SEO & Performance** : `06-seo-performance/README.md`

### Gap Analysis (dans `/docs/GAP_ANALYSIS/`)

1. **Rapport Exécutif** : `00-RAPPORT-EXECUTIF.md`
2. **Architecture Gap** : `01-architecture-gap.md`
3. **SEO Gap** : `02-seo-gap.md`
4. **Design Gap** : `03-design-gap.md`
5. **Contenu Gap** : `04-content-gap.md`
6. **Migration Gap** : `05-migration-gap.md`

### DOCS FINAUX (sources originales)

`/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/`

Documents clés :
- `formations_blended_architecture.md`
- `strategie-mots-cles-packshot-creator.md`
- `design_system_final.md`
- `Architecture_Site_PackshotCreator_2026_Reference.md`

---

## ✅ CHECKLIST VALIDATION GLOBALE

### Avant Mise en Production

**Contenu (Phase 1)**
- [ ] 6 formations Sanity créées et publiées
- [ ] 12 pages secteurs `/industrie/*` publiées
- [ ] 3 pages légales conformes RGPD
- [ ] Page À propos complète
- [ ] Section OPCO visible

**Fonctionnalités (Phase 2-3)**
- [ ] Sélecteur machines standalone fonctionnel
- [ ] Slider BlendAI fonctionnel
- [ ] Simulateur OPCO fonctionnel
- [ ] Tous formulaires migrés et testés (Pipedrive)
- [ ] LMS configuré et accessible

**UX/UI (Phase 4)**
- [ ] Toutes pages auditées et améliorées
- [ ] Animations fluides (Framer Motion)
- [ ] Images optimisées

**SEO (Phase 5)**
- [ ] Sitemap.xml déployé et valide
- [ ] Robots.txt configuré
- [ ] Hreflang FR/EN implémenté
- [ ] Schema.org ajouté (FAQ, Product)
- [ ] Pages produits créées

**Analytics (Phase 6)**
- [ ] GA4 configuré et fonctionnel
- [ ] Events tracking testés
- [ ] Goals définis

**Tests (Phase 7)**
- [ ] 17 redirections 301 testées (100% OK)
- [ ] Lighthouse >90 (Perf, SEO, A11y)
- [ ] Tests manuels parcours utilisateur OK

**Performance**
- [ ] Lighthouse Desktop Perf >90
- [ ] Lighthouse Mobile Perf >85
- [ ] First Load JS <100KB
- [ ] Images <100KB optimisées

**Conformité**
- [ ] RGPD (pages légales + cookies)
- [ ] Accessibilité WCAG AA
- [ ] SEO (métadonnées complètes)

---

## 🚨 POINTS DE VIGILANCE

### Ne JAMAIS Faire

❌ Configurer GA4 avant URL finale
❌ Optimiser SEO avant contenu stable
❌ Passer à phase suivante si phase actuelle incomplète
❌ Casser redirections existantes
❌ Perdre contenu Webflow qui performe en SEO
❌ Ignorer tests avant production

### Toujours Faire

✅ Tester redirections manuellement
✅ Vérifier Pipedrive après migration formulaires
✅ Valider Schema.org (Google Rich Results Test)
✅ Lighthouse audit avant production
✅ Backup Webflow avant basculement DNS
✅ Documenter décisions importantes
✅ Mettre à jour ce document après chaque phase validée, en l'indiquant comme validée

---

## 🎯 SESSIONS CLAUDE CODE - Approche

### Utilisation Tasks

**Quand utiliser Tasks :**
- Créations multiples similaires (6 formations, 12 pages secteurs)
- Migrations répétitives (formulaires)
- Optimisations globales (images, animations)
- Tests automatisés

**Prompt type Task :**
```
Task "Content Creation"
- Créer 6 formations dans Sanity selon schéma formation.ts
- Utiliser specs de docs/GAP_ANALYSIS/04-content-gap.md
- Valider chaque formation dans Studio
```

**Regroupements recommandés :**
- Phase 1 → Task "Content Creation"
- Phase 2 → Task "Interactive Components" + Task "Forms Migration"
- Phase 3 → Task "Third-party Integrations"
- Phase 4 → Task "Page Enhancement" + Task "Animations"
- Phase 5 → Task "SEO Technical Setup" + Task "Product Pages"
- Phase 6 → Task "Analytics Setup"
- Phase 7 → Task "Pre-Production QA"

---

## 📞 DÉCISIONS EN ATTENTE

### À Valider Avant Démarrage

1. **LMS Platform** : Thinkific (99$/mois) ou autre ?
2. **Hébergement vidéos** : Vimeo Pro, YouTube unlisted, ou Cloudinary ?
3. **Tests E2E** : Nécessaires ou skip ? (actuellement no go)
4. **Timing images IA** : Parallèle Phase 4 ou après Phase 8 ?

---

## 🗓️ TIMELINE ESTIMÉE

| Phase | Durée | Timing Cumulé |
|-------|-------|---------------|
| Phase 1 : Contenu | 50-70h | Semaine 1-2 |
| Phase 2 : Composants | 12-20h | Semaine 3 |
| Phase 3 : Intégrations | 6-10h | Semaine 3 |
| Phase 4 : Amélioration pages | 40-80h | Semaine 4-6 |
| Phase 5 : SEO Technique | 10-15h | Semaine 7 |
| Phase 6 : Analytics | 4-6h | Semaine 7 |
| Phase 7 : Validation | 3-5h | Semaine 7 |
| **PRODUCTION** | - | **Semaine 8** |
| Phase 8 : Contenu bonus | 30-40h | Post-production |

**Total avant production :** 125-206h (16-26 jours effectifs)

---

## 📈 SUCCÈS ATTENDUS

### Métriques Cibles (6 mois post-production)

**SEO :**
- Trafic : +15-25% vs baseline Webflow
- Positions : Maintien ou amélioration top 20
- Indexation : 100% pages (vs ~85% Webflow)

**Conversions :**
- Formations : 36-60 inscriptions/an (60k€-100k€ CA)
- Devis machines : +20% vs Webflow
- Téléchargements guides : +30%

**Performance :**
- Lighthouse Desktop : >90 (vs ~75 Webflow)
- Lighthouse Mobile : >85 (vs ~65 Webflow)
- Time to Interactive : <3s (vs ~5s Webflow)

**Utilisateur :**
- Bounce rate : -10%
- Session duration : +20%
- Pages/session : +15%

---

**Ce document est la référence unique pour toutes sessions futures. Chaque session doit :**
1. Lire ce plan avant de démarrer
2. Identifier sa phase
3. Vérifier dépendances remplies
4. Consulter références docs appropriées
5. Valider livrables avant passage phase suivante

**Mise à jour :** Ce document doit être mis à jour après chaque phase complétée.

---

**Version :** 1.0.0
**Dernière mise à jour :** 25 janvier 2026
