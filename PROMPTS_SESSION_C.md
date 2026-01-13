# PROMPTS SESSION C - ROI CALCULATOR V2

> Date : 12 janvier 2026
> Contexte : Sessions A+B terminées, calculateur ROI fonctionnel mais nécessite corrections et évolutions

---

## PROMPT 1 : GEMINI 3 PRO (NotebookLM) - Analyse Brochures Machines

```
Tu es expert en équipements photo professionnels. Analyse les brochures Orbitvu fournies pour extraire :

### 1. CRITÈRES DE SÉLECTION MACHINE
Pour chaque machine, identifie précisément :
- Dimensions max produit (L x l x H en cm)
- Poids max produit (kg)
- Type de produits idéaux (bijoux, chaussures, mobilier, vêtements, etc.)
- Fonctionnalités spécifiques (360°, video, ghost mannequin, etc.)
- Volume de production recommandé (photos/jour réaliste)
- Niveau d'automatisation (manuel, semi-auto, full-auto)
- Espace requis pour installation

### 2. KEYPOINTS PAR MACHINE
Pour chaque machine, liste :
- 3-5 avantages clés (pourquoi choisir cette machine)
- 2-3 limitations (cas où elle n'est pas adaptée)
- Cas d'usage idéaux (secteurs, types de clients)
- Différenciateurs vs machines similaires

### 3. MATRICE DE DÉCISION
Crée une matrice croisant :
- Taille produit (petit/moyen/grand/très grand)
- Volume annuel (< 5000 / 5000-15000 / 15000-50000 / > 50000)
- Type de contenu (packshot seul / 360° / video / lifestyle)
- Budget indicatif (entrée de gamme / milieu / premium)

### 4. RÈGLES D'ÉLIGIBILITÉ
Définis les règles pour qu'un profil client soit éligible à une machine :
- Critères obligatoires (taille, poids)
- Critères recommandés (volume, type contenu)
- Critères bonus (fonctionnalités avancées)

### OUTPUT ATTENDU
Format JSON structuré avec toutes ces données pour intégration dans le code.
```

---

## PROMPT 2 : CLAUDE CODE SESSION C - Implémentation

```
# SESSION C : ROI CALCULATOR V2 - SÉLECTEUR MACHINE AVANCÉ

## CONTEXTE PROJET

Framework: Next.js 16.1.1 (App Router), React 19, Tailwind CSS v4, next-intl (FR/EN)
Chemin: /Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator

### CODE EXISTANT À ANALYSER
Le calculateur ROI existe dans : `components/calculators/ROICalculator/`

Structure actuelle :
- `lib/types.ts` - Types TypeScript
- `lib/constants.ts` - Constantes (salaire 4000€, 230 jours/an, etc.)
- `lib/machines.ts` - 13 machines Orbitvu avec specs basiques
- `lib/calculations.ts` - Fonctions de calcul ROI
- `lib/validation.ts` - Schémas Zod
- `lib/analytics.ts` - Events GA4
- `questions/` - 8 composants questions wizard
- `steps/` - 3 étapes wizard
- `results/` - Composants affichage résultats (HeroMetrics, EvolutionChart, etc.)
- `ROICalculatorWizard.tsx` - Wizard principal

### PROBLÈMES IDENTIFIÉS À CORRIGER
1. **Vérifier tous les calculs ROI** - Des erreurs ont été signalées
2. **L'algorithme de recommandation machine est trop simpliste** - Ne prend en compte que la taille produit
3. **Pas de comparaison multi-machines** - Un profil peut correspondre à plusieurs machines

---

## MISSION SESSION C

### PHASE 1 : AUDIT CALCULS
1. Lire `lib/calculations.ts` en détail
2. Vérifier chaque formule :
   - Coût employeur annuel
   - Coût opérateur machine (corrigé récemment : proportionnel au temps)
   - TCO machine (amortissement 5 ans + maintenance + consommables)
   - Break-even
   - ROI année 1 et 3 ans
3. Tester avec cas limites
4. Documenter les corrections nécessaires

### PHASE 2 : NOUVEAU SÉLECTEUR MACHINE
Implémenter un sélecteur multi-critères basé sur l'analyse Gemini :

#### Nouveaux critères de sélection
- Dimensions produit (L x l x H) - pas juste catégorie
- Poids produit
- Volume annuel objectif
- Type de contenu (packshot / 360° / video / ghost mannequin)
- Secteur d'activité
- Niveau d'automatisation souhaité

#### Nouvelles questions wizard
Ajouter/modifier les questions pour collecter ces critères

#### Algorithme d'éligibilité
```typescript
interface MachineEligibility {
  machineId: string;
  score: number; // 0-100
  isEligible: boolean;
  matchingCriteria: string[];
  missingCriteria: string[];
  keyAdvantages: string[];
  limitations: string[];
}
```

### PHASE 3 : COMPARATEUR MACHINES
Nouveau composant `MachineComparator.tsx` :
- Affiche les 2-4 machines éligibles
- Tableau comparatif specs
- Keypoints avantages/inconvénients
- ROI calculé pour chaque machine
- Recommandation finale avec justification

### PHASE 4 : MISE À JOUR MACHINES.TS
Enrichir les données machines avec :
```typescript
interface Machine {
  // Existant
  id: string;
  nom: string;
  prix: number;
  capaciteJour: number;
  tailleMax: string;
  poidsMax: string;
  tailleCategories: ProductSizeCategory[];
  useCases: string[];
  maintenanceAnnuelle: number;
  consommablesAnnuels: number;

  // À AJOUTER
  dimensionsMax: { l: number; w: number; h: number }; // cm
  poidsMaxKg: number;
  features: string[]; // '360', 'video', 'ghost-mannequin', etc.
  automationLevel: 'manual' | 'semi-auto' | 'full-auto';
  idealSectors: string[];
  volumeRange: { min: number; max: number }; // photos/an
  keyAdvantages: { fr: string; en: string }[];
  limitations: { fr: string; en: string }[];
  spaceRequired: string; // m²
}
```

### PHASE 5 : FLOW UTILISATEUR RÉVISÉ
1. Questions profil (opérateurs, temps, volume, etc.)
2. Questions produit (dimensions, poids, type contenu)
3. **NOUVEAU : Sélection machine parmi éligibles**
4. Résultats ROI pour machine sélectionnée
5. Option comparer avec autres machines éligibles

---

## FICHIERS À CRÉER/MODIFIER

### Nouveaux fichiers
- `lib/machineSelector.ts` - Algorithme de scoring/éligibilité
- `results/MachineComparator.tsx` - Comparateur multi-machines
- `steps/StepMachineSelection.tsx` - Nouvelle étape sélection

### Fichiers à modifier
- `lib/machines.ts` - Enrichir données
- `lib/types.ts` - Nouveaux types
- `lib/calculations.ts` - Corriger + adapter
- `ROICalculatorWizard.tsx` - Nouveau flow 4 étapes
- Questions si nécessaire

---

## DONNÉES MACHINES (À COMPLÉTER AVEC OUTPUT GEMINI)
[Insérer ici le JSON généré par Gemini après analyse des brochures]

---

## CHECKLIST LIVRAISON
- [ ] Audit calculs documenté
- [ ] Corrections calculs appliquées
- [ ] Nouveaux types TypeScript
- [ ] Données machines enrichies
- [ ] Algorithme sélection machine
- [ ] Composant comparateur
- [ ] Nouvelle étape wizard
- [ ] Tests manuels tous scénarios
- [ ] Build sans erreurs
```

---

## NOTES POUR LA SESSION C

### Commits récents à connaître
- `03fca49` - Fix calcul coût opérateur machine (proportionnel au temps)
- `a1fe63c` - Tableau comparaison = gains temps/production uniquement
- `9c44b69` - Prix machines masqués de l'UI
- `9478057` - Implémentation complète Session A+B

### Points d'attention
- Les prix restent dans le code pour les calculs mais NE PAS les afficher
- Traductions FR/EN obligatoires
- Composants utilisent des LABELS internes (pas next-intl pour les résultats)
- shadcn/ui pour les composants UI
