# 🚀 PROMPT SESSION - PHASE 2 IMPLÉMENTATION

**Date prévue :** Février 2026
**Durée estimée :** 12-20h
**Objectif :** Implémenter les composants et fonctionnalités de la Phase 2

---

## 📋 CONTEXTE RAPIDE

Tu es Claude Code, assistant spécialisé en développement Next.js/TypeScript. Cette session est dédiée à l'**implémentation de la Phase 2** du plan de migration PackshotCreator (Webflow → Next.js).

**Phase 1** est terminée à 90% (12 pages industrie créées, navigation opérationnelle).
**Phase 2** (cette session) : Composants & Fonctionnalités interactives.

---

## 🎯 OBJECTIFS CETTE SESSION

Implémenter **4 livrables majeurs** :

### 1. **Sélecteur Machines Standalone** (priorité 1)
Extraire le sélecteur de machines du calculateur ROI en composant réutilisable indépendant.

### 2. **Migration Formulaires** (priorité 1)
Migrer les formulaires Webflow vers Next.js avec intégration Pipedrive.

### 3. **Simulateur OPCO** (priorité 2)
Créer le simulateur d'éligibilité OPCO pour les formations.

### 4. **Slider Avant/Après BlendAI** (priorité 3)
Composant de comparaison visuelle (optionnel si temps).

---

## 📚 DOCUMENTS DE RÉFÉRENCE OBLIGATOIRES

**À lire AVANT de commencer :**

1. **`PLAN_ACTION_MASTER.md`** (racine projet)
   - Contexte complet du projet
   - Phase 2 détaillée (lignes 138-171)
   - Principes immuables
   - État des lieux mis à jour (session 29/01)

2. **`OPCO_Qualiopi_Specs_Simulateur.md`** (racine projet, 45KB)
   - Specs techniques complètes simulateur OPCO
   - Arbre de décision
   - Interfaces TypeScript
   - Cas d'usage avec messages

3. **`Webflow_Forms_Inventory.md`** (scratchpad)
   - Inventaire 3 formulaires Webflow
   - Architecture Pipedrive WebForms
   - 2 options migration (embed vs custom)
   - Champs à mapper

4. **Transcript Agent a88b536** (audit sélecteur machines)
   - Localisation code actuel
   - 20 machines cataloguées
   - Algorithme scoring
   - Plan extraction standalone

5. **`docs/04-components-ui/README.md`**
   - Patterns composants UI
   - Design system Brandbook 2025
   - Conventions code

---

## 🏗️ TÂCHES PHASE 2 - DÉTAILLÉES

### TÂCHE 1 : Sélecteur Machines Standalone (priorité 1)

**Objectif :** Créer composant `<MachineSelector />` réutilisable hors ROI Calculator.

**Étapes :**

1. **Créer structure dossier**
   ```
   components/machine-selector/
   ├── MachineSelector.tsx          # Composant principal
   ├── hooks/
   │   ├── useMachineSelection.ts   # Logique sélection
   │   └── useMachineFilters.ts     # Filtres/tri
   ├── lib/
   │   ├── machineSelector.ts       # Copie ROI/lib
   │   ├── machines.ts              # Copie ROI/lib
   │   └── types.ts                 # Copie ROI/lib
   ├── components/
   │   ├── MachineCard.tsx          # Card une machine
   │   ├── MachineList.tsx          # Grille machines
   │   ├── FilterBar.tsx            # Filtres
   │   ├── SortOptions.tsx          # Options tri
   │   └── MachineModal.tsx         # Détails complets
   └── index.ts                     # Exports
   ```

2. **Extraire et adapter le code**
   - Copier `components/calculators/ROICalculator/lib/machineSelector.ts` → `machine-selector/lib/`
   - Copier `lib/machines.ts` et `lib/types.ts`
   - Créer hook `useMachineSelection()` avec state management

3. **Créer composants UI modulaires**
   - `MachineCard` : Affichage une machine (image, nom, prix, specs)
   - `FilterBar` : Filtres (taille, prix min/max, features, secteur)
   - `MachineList` : Grille responsive machines
   - `SortOptions` : Tri (prix asc/desc, score, capacité)

4. **Implémenter composant principal**
   ```tsx
   interface MachineSelectorProps {
     mode?: 'selection' | 'display';
     defaultSize?: ProductSizeCategory;
     onMachineSelect?: (machine: Machine) => void;
     showFilters?: boolean;
     maxMachines?: number;
     locale?: 'fr' | 'en';
     className?: string;
   }
   ```

5. **Intégrer dans ROI Calculator** (remplacer logique inline)

6. **Créer page démo standalone** : `/studio-photo/selecteur-machines`

**Points d'attention :**
- Valider images machines (actuellement undefined → ajouter URLs ou placeholders)
- Vérifier données maintenance annuelle (actuellement 0€)
- Bilingue FR/EN
- Responsive mobile-first
- Tests unitaires hooks

**Validation :**
- [ ] Composant standalone fonctionnel
- [ ] Intégré dans ROI Calculator (non-breaking)
- [ ] Page démo accessible
- [ ] Filtres fonctionnels
- [ ] Responsive

---

### TÂCHE 2 : Migration Formulaires (priorité 1)

**Objectif :** Migrer 2 formulaires Webflow vers Next.js avec intégration Pipedrive.

**Choix architecture (à valider avec utilisateur) :**
- **Option A** : Conserver Pipedrive WebForms (rapide, 2h)
- **Option B** : Custom Next.js forms (flexible, 8-10h)

#### Option A : Pipedrive WebForms (recommandée Phase 2)

**Étapes :**

1. **Créer composants wrappers**
   ```tsx
   // components/forms/PipedriveContactForm.tsx
   'use client';

   import Script from 'next/script';

   export function PipedriveContactForm() {
     return (
       <>
         <div
           className="pipedriveWebForms"
           data-pd-webforms="https://webforms.pipedrive.com/f/bYWdVxnLz..."
         />
         <Script
           src="https://webforms.pipedrive.com/f/loader"
           strategy="lazyOnload"
         />
       </>
     );
   }
   ```

2. **Créer les 2 formulaires**
   - `PipedriveContactForm` (formulaire principal /contact)
   - `PipedriveModalForm` (formulaire court modale)

3. **Intégrer dans pages**
   - Remplacer embeds Webflow
   - Tester soumissions → vérifier Pipedrive

4. **Customiser CSS si possible** (classes Pipedrive limitées)

**Validation :**
- [ ] Formulaires affichés correctement
- [ ] Soumissions créent deals/leads Pipedrive
- [ ] Emails confirmation envoyés
- [ ] Responsive mobile

#### Option B : Custom Forms (si temps disponible)

**Stack :**
- React Hook Form + Zod (validation)
- Server Actions Next.js (soumission)
- API Pipedrive REST

**Étapes :**

1. **Setup validation schemas** (Zod)
2. **Créer Server Actions** (`app/actions/submitContact.ts`)
3. **Développer composants UI forms** (inputs, selects, textarea)
4. **Intégrer API Pipedrive** (créer deals/contacts)
5. **Ajouter anti-spam** (Turnstile/reCAPTCHA)
6. **Tests E2E**

**Validation :**
- [ ] Validation côté client (Zod)
- [ ] Soumissions créent deals Pipedrive via API
- [ ] Messages erreur/succès
- [ ] Anti-spam fonctionnel

---

### TÂCHE 3 : Simulateur OPCO (priorité 2)

**Objectif :** Créer simulateur d'éligibilité financement OPCO pour formations.

**Référence :** `OPCO_Qualiopi_Specs_Simulateur.md` (sections 3, 4, 5)

**Étapes :**

1. **Créer structure dossier**
   ```
   components/simulators/opco/
   ├── OPCOSimulator.tsx            # Composant principal
   ├── steps/
   │   ├── Step1Profil.tsx          # Statut utilisateur
   │   ├── Step2Entreprise.tsx      # Données entreprise
   │   ├── Step3Formation.tsx       # Formation choisie
   │   └── Step4Resultat.tsx        # Résultat éligibilité
   ├── lib/
   │   ├── eligibility.ts           # Logique calcul
   │   ├── types.ts                 # Interfaces
   │   └── constants.ts             # OPCO data, plafonds
   └── index.ts
   ```

2. **Implémenter logique éligibilité** (`lib/eligibility.ts`)
   ```tsx
   interface ProfilUtilisateur {
     statut: 'salarie-cdi' | 'salarie-cdd' | 'interimaire' | 'auto-entrepreneur' | 'demandeur-emploi';
     effectifEntreprise?: number;
     secteurActivite?: string;
   }

   interface ResultatEligibilite {
     eligible: boolean;
     opcoIdentifie: string | null;
     plafondFinancement: number;
     tauxPriseCharge: number;
     message: string;
     prochainePasAction?: string;
   }

   export function calculerEligibilite(
     profil: ProfilUtilisateur,
     formation: FormationSelectionnee
   ): ResultatEligibilite {
     // Implémentation arbre de décision (voir doc OPCO sections 3 et 5)
   }
   ```

3. **Créer composants steps** (formulaire multi-étapes)
   - Step 1 : Statut (salarié, auto-entrepreneur, etc.)
   - Step 2 : Entreprise (effectif, secteur)
   - Step 3 : Formation (choisir parmi 6 formations)
   - Step 4 : Résultat avec message personnalisé

4. **Implémenter les 7 cas d'usage** (messages personnalisés, voir doc OPCO section 5)

5. **Créer page simulateur** : `/academy/simulateur-opco`

6. **Intégrer dans page Academy** (CTA "Vérifier votre éligibilité")

**Points d'attention :**
- Données OPCO 2026 (plafonds par OPCO, voir doc section 6)
- Messages clairs et bienveillants
- Redirection vers bon parcours selon résultat
- Proposition contact si non éligible OPCO (autres financements)
- Bilingue FR/EN

**Validation :**
- [ ] 4 steps fonctionnels
- [ ] 7 cas d'usage testés
- [ ] Messages personnalisés corrects
- [ ] Page `/academy/simulateur-opco` accessible
- [ ] Responsive

---

### TÂCHE 4 : Slider Avant/Après BlendAI (priorité 3, optionnel)

**Objectif :** Composant comparaison visuelle (packshot vs lifestyle IA).

**Étapes :**

1. **Installer lib** : `react-compare-slider` ou équivalent
2. **Créer composant** `components/shared/BeforeAfterSlider.tsx`
3. **Props API**
   ```tsx
   interface BeforeAfterSliderProps {
     beforeImage: string;
     afterImage: string;
     beforeLabel?: string;
     afterLabel?: string;
     className?: string;
   }
   ```
4. **Intégrer dans page IA** (`/ia-photo-produit`)
5. **Ajouter exemples visuels** (packshot → lifestyle)

**Validation :**
- [ ] Slider fonctionnel (drag handle)
- [ ] Labels clairs
- [ ] Responsive mobile
- [ ] Intégré page IA

---

## 🔧 CONVENTIONS & CONTRAINTES

### Stack Technique
- **Framework :** Next.js 16 (App Router)
- **React :** 19
- **TypeScript :** Strict mode
- **Styling :** Tailwind CSS (Brandbook 2025)
- **Forms :** React Hook Form + Zod (si custom forms)
- **i18n :** next-intl
- **Tests :** Vitest (unitaires), Playwright (E2E si temps)

### Conventions Code
- **Composants :** PascalCase, fichiers `.tsx`
- **Hooks :** `use` prefix, fichiers `.ts`
- **Types :** Interfaces pour props, types pour data
- **Imports :** Alias `@/` pour imports absolus
- **Comments :** TSDoc pour fonctions publiques
- **Naming :** Anglais pour code, français pour contenu utilisateur

### Principes Design
- **Mobile-first :** Toujours responsive
- **Accessibilité :** WCAG AA minimum
- **Performance :** Lazy loading images, code splitting
- **Brandbook 2025 :** Couleurs CSS variables, typographie (Inter, Roboto)

---

## 📝 WORKFLOW SESSION

### 1. Démarrage (5 min)
- Lire `PLAN_ACTION_MASTER.md` (section Phase 2)
- Lire docs référence (OPCO, Webflow forms, audit machines)
- Confirmer ordre priorités avec utilisateur

### 2. Implémentation (10-18h)
- Commencer par Tâche 1 (Sélecteur machines)
- Puis Tâche 2 (Formulaires, valider option A vs B)
- Puis Tâche 3 (Simulateur OPCO)
- Tâche 4 si temps disponible

### 3. Tests & Validation (2h)
- Tester chaque composant créé
- Build Next.js sans erreurs
- Vérifier responsive mobile
- Valider accessibilité basique

### 4. Documentation & Commit (1h)
- Documenter nouveaux composants (README)
- Commit + push (messages clairs)
- Mettre à jour `PLAN_ACTION_MASTER.md` (Phase 2 complétée)

---

## ✅ CRITÈRES DE SUCCÈS

### Livrables minimum (Must-have)
- [ ] Sélecteur machines standalone fonctionnel
- [ ] Sélecteur intégré dans ROI Calculator (non-breaking)
- [ ] 2 formulaires migrés (Pipedrive embed OU custom)
- [ ] Simulateur OPCO fonctionnel (4 steps, 7 cas)
- [ ] Pages démo accessibles
- [ ] Build Next.js sans erreurs
- [ ] Responsive mobile OK
- [ ] Commit + push effectués

### Bonus (Nice-to-have)
- [ ] Slider avant/après BlendAI
- [ ] Tests unitaires hooks
- [ ] Storybook stories
- [ ] Documentation Notion/Confluence

---

## 🚨 POINTS DE VIGILANCE

### Bloquants potentiels
- **API Pipedrive** : Vérifier clé API disponible (si custom forms)
- **Images machines** : Actuellement undefined, ajouter placeholders ou vraies URLs
- **Données OPCO** : Utiliser plafonds 2026 du doc (ne pas inventer)
- **Breaking changes ROI** : Tester que l'extraction sélecteur ne casse pas le calculateur

### Si bloqué
1. Demander clarification utilisateur
2. Documenter le blocage
3. Passer à tâche suivante
4. Revenir après clarification

---

## 📞 QUESTIONS À POSER EN DÉBUT DE SESSION

1. **Formulaires** : Option A (Pipedrive embed) ou B (custom Next.js) ?
2. **Images machines** : Ajouter placeholders ou attendre vraies images ?
3. **Priorité slider** : Impératif ou optionnel Phase 2 ?
4. **Tests E2E** : Requis Phase 2 ou reporter Phase 7 ?

---

## 📚 RESSOURCES ADDITIONNELLES

### Documentation Technique
- Next.js App Router : https://nextjs.org/docs/app
- React Hook Form : https://react-hook-form.com/
- Zod : https://zod.dev/
- Pipedrive API : https://developers.pipedrive.com/

### Design System
- Voir `docs/01-design-branding/README.md`
- Tailwind config : `tailwind.config.ts`
- CSS variables Brandbook : `app/globals.css`

### Composants Existants
- Calculateur ROI : `components/calculators/ROICalculator/`
- Patterns UI : `docs/04-components-ui/README.md`

---

## 🎯 OBJECTIF FINAL PHASE 2

**Site avec fonctionnalités interactives complètes** :
- Sélecteur machines accessible partout
- Formulaires de contact opérationnels
- Simulateur OPCO guidant prospects formations
- Expérience utilisateur enrichie vs Webflow

**État après Phase 2** :
- Phase 1 : 90% (reste pages légales + formations Sanity)
- **Phase 2 : 100%**
- Phase 3 : 0% (intégrations externes)

---

**🚀 Bonne session d'implémentation !**

**Note pour Claude Code :** Push systématiquement après chaque commit (préférence utilisateur confirmée).