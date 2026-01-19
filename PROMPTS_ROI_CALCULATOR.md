# PROMPTS SESSIONS ROI CALCULATOR

> Date de création : 11 janvier 2026
> Projet : PackshotCreator - Calculateur ROI Studios Photo Orbitvu
> Structure : 2 sessions spécialisées à lancer séquentiellement

---

# SESSION A : FONDATIONS + WIZARD + QUESTIONS

## MISSION

Créer les fondations du calculateur ROI pour studios photo Orbitvu :
1. Installer les dépendances manquantes
2. Créer les types TypeScript et constantes
3. Implémenter les fonctions de calcul avec gestion des edge cases
4. Créer le wizard multi-étapes avec 8 questions
5. Intégrer la validation Zod

## CONTEXTE PROJET

```
Framework: Next.js 16.1.1 (App Router)
React: 19.2.3
Styling: Tailwind CSS v4 avec @theme inline
i18n: next-intl (FR + EN uniquement)
UI: shadcn/ui (Button, Card, Input, Label, Form installés)
Forms: react-hook-form + Zod
Fonts: Cairo (headings) + Roboto (body)
```

## ÉTAPE 1 : INSTALLATION DÉPENDANCES

Installer via CLI shadcn :
```bash
npx shadcn@latest add slider
npx shadcn@latest add radio-group
npx shadcn@latest add progress
npx shadcn@latest add tooltip
```

Installer packages npm :
```bash
npm install recharts jspdf html2canvas
npm install -D @types/jspdf
```

## ÉTAPE 2 : STRUCTURE FICHIERS À CRÉER

```
components/
├── calculators/
│   └── ROICalculator/
│       ├── index.tsx                    # Export principal
│       ├── ROICalculatorWizard.tsx      # Wizard container
│       ├── steps/
│       │   ├── Step1CurrentSituation.tsx
│       │   ├── Step2ProductionGoals.tsx
│       │   └── Step3Results.tsx         # (placeholder pour Session B)
│       ├── questions/
│       │   ├── QuestionOperators.tsx
│       │   ├── QuestionTimePercentage.tsx
│       │   ├── QuestionExternalProvider.tsx
│       │   ├── QuestionDailyCapacity.tsx
│       │   ├── QuestionAnnualVolume.tsx
│       │   ├── QuestionEquipmentBudget.tsx
│       │   ├── QuestionProductionSplit.tsx
│       │   └── QuestionProductSize.tsx   # NOUVELLE
│       ├── shared/
│       │   ├── WizardProgress.tsx
│       │   ├── QuestionWrapper.tsx
│       │   └── TooltipHelper.tsx
│       └── lib/
│           ├── types.ts
│           ├── constants.ts
│           ├── machines.ts
│           ├── calculations.ts
│           └── validation.ts
```

## ÉTAPE 3 : TYPES TYPESCRIPT

Créer `components/calculators/ROICalculator/lib/types.ts` :

```typescript
// Types pour les inputs utilisateur
export interface UserInputs {
  // Step 1 : Situation actuelle
  nbOperateurs: number;              // 0.5 - 20
  pourcentageTemps: number;          // 10 - 100 (%)
  utiliseSolutionExterne: boolean;
  budgetMensuelExterne?: number;     // 0 - 50000 €/mois
  capaciteJournaliere: number;       // 5 - 300 photos/jour/opérateur

  // Step 2 : Objectifs
  photosAnnuelles: number;           // 100 - 100000
  budgetEquipement?: number;         // 0 - 50000 €/an (optionnel, défaut 7500)
  repartition: {
    packshot: number;                // % (0-100)
    lifestyle: number;               // % (0-100, calculé auto = 100 - packshot)
  };
  tailleProduitsCategory: ProductSizeCategory;
}

// Catégories de taille produits
export type ProductSizeCategory =
  | 'petit'      // < 30cm (bijoux, montres, cosmétiques)
  | 'moyen'      // 30-60cm (chaussures, sacs, électronique)
  | 'grand'      // 60-150cm (mobilier petit, équipement)
  | 'tres-grand'; // > 150cm (mobilier grand, vélos)

// Machine Orbitvu
export interface Machine {
  id: string;
  nom: string;
  prix: number;                      // € HT
  capaciteJour: number;              // photos/jour
  tailleMax: string;
  poidsMax: string;
  tailleCategories: ProductSizeCategory[]; // Catégories supportées
  useCases: string[];
  maintenanceAnnuelle: number;       // € (6% du prix)
  consommablesAnnuels: number;       // €
  imageUrl?: string;                 // Placeholder si non disponible
}

// Résultats des calculs
export interface CalculationResults {
  // Situation actuelle
  coutEmployeurAnnuel: number;
  coutEquipementAnnuel: number;
  coutExterneAnnuel: number;
  coutTotalActuel: number;
  coutParPhotoActuel: number;
  tempsParPhotoHeures: number;
  joursProductionActuels: number;
  capaciteAnnuelleActuelle: number;

  // Avec machine recommandée
  machine: Machine;
  tcoAnnuel: number;
  coutOperateurMachine: number;
  coutTotalMachine: number;
  coutParPhotoMachine: number;
  tempsParPhotoMachine: number;
  joursProductionMachine: number;
  capaciteAnnuelleMachine: number;

  // Comparaison
  economieAnnuelle: number;
  breakEvenMois: number | null;      // null si pas rentable
  roiAn1: number;
  roi3ans: number;
  economie3ans: number;
  economieParPhoto: number;
  economieParPhotoPourcent: number;
  joursEconomises: number;
  gainTempsPourcent: number;
  capaciteResiduelle: number;
  potentielCroissance: number;

  // Flag rentabilité
  isRentable: boolean;
}

// État du wizard
export interface WizardState {
  currentStep: number;
  totalSteps: number;
  inputs: Partial<UserInputs>;
  results: CalculationResults | null;
  isCalculating: boolean;
}

// Props communes pour les questions
export interface QuestionProps {
  value: any;
  onChange: (value: any) => void;
  error?: string;
}
```

## ÉTAPE 4 : CONSTANTES

Créer `components/calculators/ROICalculator/lib/constants.ts` :

```typescript
export const CONSTANTES = {
  salaireMensuelCoutEmployeur: 4000,  // € brut + charges
  nbSemainesTravail: 46,              // 52 - 6 congés
  heuresSemaine: 35,
  joursProduction: 230,               // 46 × 5 jours
  dureeAmortissement: 5,              // années
  budgetEquipementDefaut: 7500,       // € si non renseigné
} as const;

// Labels pour les catégories de taille
export const TAILLE_LABELS: Record<string, { fr: string; en: string; examples: string }> = {
  petit: {
    fr: 'Petit (< 30 cm)',
    en: 'Small (< 30 cm)',
    examples: 'Bijoux, montres, cosmétiques, petite électronique',
  },
  moyen: {
    fr: 'Moyen (30-60 cm)',
    en: 'Medium (30-60 cm)',
    examples: 'Chaussures, sacs, électronique, accessoires',
  },
  grand: {
    fr: 'Grand (60-150 cm)',
    en: 'Large (60-150 cm)',
    examples: 'Petit mobilier, équipement sportif, électroménager',
  },
  'tres-grand': {
    fr: 'Très grand (> 150 cm)',
    en: 'Very large (> 150 cm)',
    examples: 'Mobilier, vélos, grands équipements',
  },
};

// Valeurs par défaut pour le formulaire
export const DEFAULT_VALUES: Partial<UserInputs> = {
  nbOperateurs: 2,
  pourcentageTemps: 80,
  utiliseSolutionExterne: false,
  capaciteJournaliere: 30,
  photosAnnuelles: 5000,
  budgetEquipement: 7500,
  repartition: {
    packshot: 70,
    lifestyle: 30,
  },
  tailleProduitsCategory: 'moyen',
};
```

## ÉTAPE 5 : DONNÉES MACHINES (13 machines)

Créer `components/calculators/ROICalculator/lib/machines.ts` :

```typescript
import type { Machine, ProductSizeCategory } from './types';

export const MACHINES: Machine[] = [
  {
    id: 'alphashot-micro-v2',
    nom: 'Alphashot Micro Pro v2',
    prix: 15450,
    capaciteJour: 200,
    tailleMax: '16×18×15 cm',
    poidsMax: '1 kg',
    tailleCategories: ['petit'],
    useCases: ['Bijoux', 'Montres', 'Petits objets de luxe', 'Cosmétiques'],
    maintenanceAnnuelle: 927,   // 6%
    consommablesAnnuels: 500,
  },
  {
    id: 'alphashot-360',
    nom: 'Alphashot 360',
    prix: 15000,
    capaciteJour: 200,
    tailleMax: '30×30×30 cm',
    poidsMax: '3 kg',
    tailleCategories: ['petit', 'moyen'],
    useCases: ['Vues 360°', 'E-commerce interactif', 'Catalogues'],
    maintenanceAnnuelle: 900,
    consommablesAnnuels: 500,
  },
  {
    id: 'alphashot-g2',
    nom: 'Alphashot G2',
    prix: 15450,
    capaciteJour: 200,
    tailleMax: '30×30×30 cm',
    poidsMax: '3 kg',
    tailleCategories: ['petit', 'moyen'],
    useCases: ['Chaussures', 'Maroquinerie', 'Cosmétiques', 'Électronique'],
    maintenanceAnnuelle: 927,
    consommablesAnnuels: 500,
  },
  {
    id: 'alphashot-pro-g2',
    nom: 'Alphashot Pro G2',
    prix: 20450,
    capaciteJour: 200,
    tailleMax: '40×40×40 cm',
    poidsMax: '5 kg',
    tailleCategories: ['petit', 'moyen'],
    useCases: ['Packshots pro haute qualité', 'E-commerce premium'],
    maintenanceAnnuelle: 1227,
    consommablesAnnuels: 500,
  },
  {
    id: 'alphashot-xl-v2',
    nom: 'Alphashot XL v2',
    prix: 18950,
    capaciteJour: 200,
    tailleMax: '60×60×100 cm',
    poidsMax: '30 kg',
    tailleCategories: ['moyen', 'grand'],
    useCases: ['Mobilier petit', 'Équipements sportifs', 'Électroménager'],
    maintenanceAnnuelle: 1137,
    consommablesAnnuels: 500,
  },
  {
    id: 'alphashot-xl-wine-v2',
    nom: 'Alphashot XL Wine v2',
    prix: 20450,
    capaciteJour: 200,
    tailleMax: 'Bouteilles vin/spiritueux',
    poidsMax: '5 kg',
    tailleCategories: ['moyen'],
    useCases: ['Vins', 'Spiritueux', 'Bouteilles'],
    maintenanceAnnuelle: 1227,
    consommablesAnnuels: 500,
  },
  {
    id: 'alphashot-xl-pro-v2',
    nom: 'Alphashot XL Pro v2',
    prix: 22450,
    capaciteJour: 200,
    tailleMax: '60×60×100 cm',
    poidsMax: '30 kg',
    tailleCategories: ['moyen', 'grand'],
    useCases: ['Version Pro du XL', 'Éclairage avancé', 'Haute qualité'],
    maintenanceAnnuelle: 1347,
    consommablesAnnuels: 500,
  },
  {
    id: 'alphastudio-compact-v2',
    nom: 'Alphastudio Compact Pro v2',
    prix: 36350,
    capaciteJour: 180,
    tailleMax: '80×80×120 cm',
    poidsMax: '50 kg',
    tailleCategories: ['grand'],
    useCases: ['Mobilier moyen', 'Équipements grands formats'],
    maintenanceAnnuelle: 2181,
    consommablesAnnuels: 800,
  },
  {
    id: 'alphastudio-xxl-v2',
    nom: 'Alphastudio XXL Pro v2',
    prix: 45450,
    capaciteJour: 150,
    tailleMax: '150×150×200 cm',
    poidsMax: '200 kg',
    tailleCategories: ['grand', 'tres-grand'],
    useCases: ['Mobilier grand format', 'Vélos', 'Objets volumineux'],
    maintenanceAnnuelle: 2727,
    consommablesAnnuels: 1000,
  },
  {
    id: 'fashion-studio-basic',
    nom: 'Fashion Studio Basic',
    prix: 56450,
    capaciteJour: 80,
    tailleMax: 'Mannequin taille réelle',
    poidsMax: 'N/A',
    tailleCategories: ['grand', 'tres-grand'],
    useCases: ['Vêtements portés (version simplifiée)'],
    maintenanceAnnuelle: 3387,
    consommablesAnnuels: 1200,
  },
  {
    id: 'fashion-studio',
    nom: 'Fashion Studio Pro v2',
    prix: 84450,
    capaciteJour: 100,
    tailleMax: 'Mannequin taille réelle',
    poidsMax: 'N/A',
    tailleCategories: ['grand', 'tres-grand'],
    useCases: ['Vêtements portés', 'Mode', 'Accessoires portés'],
    maintenanceAnnuelle: 5067,
    consommablesAnnuels: 1500,
  },
  {
    id: 'bike-studio',
    nom: 'Bike Studio',
    prix: 89450,
    capaciteJour: 80,
    tailleMax: 'Vélos complets',
    poidsMax: '30 kg',
    tailleCategories: ['tres-grand'],
    useCases: ['Cycles', 'Vélos', 'Trottinettes'],
    maintenanceAnnuelle: 5367,
    consommablesAnnuels: 1200,
  },
  {
    id: 'furniture-studio',
    nom: 'Furniture Studio',
    prix: 119450,
    capaciteJour: 60,
    tailleMax: 'Mobilier XXL',
    poidsMax: '500 kg',
    tailleCategories: ['tres-grand'],
    useCases: ['Canapés', 'Lits', 'Mobilier grande taille'],
    maintenanceAnnuelle: 7167,
    consommablesAnnuels: 2000,
  },
];

// Fonction helper pour trouver une machine par ID
export function getMachineById(id: string): Machine | undefined {
  return MACHINES.find(m => m.id === id);
}

// Fonction helper pour filtrer les machines par catégorie de taille
export function getMachinesBySize(category: ProductSizeCategory): Machine[] {
  return MACHINES.filter(m => m.tailleCategories.includes(category));
}
```

## ÉTAPE 6 : FONCTIONS DE CALCUL

Créer `components/calculators/ROICalculator/lib/calculations.ts` :

```typescript
import type { UserInputs, CalculationResults, Machine, ProductSizeCategory } from './types';
import { CONSTANTES } from './constants';
import { MACHINES } from './machines';

/**
 * Recommande la machine optimale selon les inputs utilisateur
 */
export function recommanderMachine(inputs: UserInputs): Machine {
  const { photosAnnuelles, repartition, tailleProduitsCategory } = inputs;

  // 1. Filtrer par taille de produits (critère principal)
  const machinesCompatibles = MACHINES.filter(m =>
    m.tailleCategories.includes(tailleProduitsCategory)
  );

  if (machinesCompatibles.length === 0) {
    // Fallback: Alphashot Pro G2 (polyvalent)
    return MACHINES.find(m => m.id === 'alphashot-pro-g2')!;
  }

  // 2. Calculer le besoin de capacité annuelle
  const capaciteRequise = photosAnnuelles / CONSTANTES.joursProduction;

  // 3. Filtrer par capacité suffisante
  const machinesCapables = machinesCompatibles.filter(m =>
    m.capaciteJour >= capaciteRequise
  );

  // Si aucune machine n'a assez de capacité seule, prendre la plus productive
  const candidats = machinesCapables.length > 0
    ? machinesCapables
    : machinesCompatibles;

  // 4. Pour les gros volumes lifestyle (>40%), privilégier les studios plus grands
  if (repartition.lifestyle > 40 && photosAnnuelles > 10000) {
    const studiosGrands = candidats.filter(m =>
      m.id.includes('alphastudio') || m.id.includes('fashion')
    );
    if (studiosGrands.length > 0) {
      // Prendre le moins cher des studios grands
      return studiosGrands.reduce((a, b) => a.prix < b.prix ? a : b);
    }
  }

  // 5. Choisir selon le volume
  // Logique: pour un même volume, prendre la machine la plus adaptée rapport qualité/prix
  if (photosAnnuelles < 5000) {
    // Petit volume: machine la moins chère compatible
    return candidats.reduce((a, b) => a.prix < b.prix ? a : b);
  } else if (photosAnnuelles < 15000) {
    // Volume moyen: version Pro si disponible
    const proVersion = candidats.find(m => m.id.includes('pro'));
    return proVersion || candidats.reduce((a, b) => a.prix < b.prix ? a : b);
  } else {
    // Gros volume: machine avec meilleure capacité
    return candidats.reduce((a, b) => a.capaciteJour > b.capaciteJour ? a : b);
  }
}

/**
 * Calcule tous les métriques ROI
 */
export function calculateROI(inputs: UserInputs): CalculationResults {
  // Valeurs par défaut si optionnelles non renseignées
  const budgetEquipement = inputs.budgetEquipement ?? CONSTANTES.budgetEquipementDefaut;

  // ===== SITUATION ACTUELLE =====

  // 1. Coût employeur annuel
  const coutEmployeurAnnuel =
    inputs.nbOperateurs *
    CONSTANTES.salaireMensuelCoutEmployeur *
    12 *
    (inputs.pourcentageTemps / 100);

  // 2. Coût équipement annuel
  const coutEquipementAnnuel = budgetEquipement;

  // 3. Coût solution externe
  const coutExterneAnnuel = inputs.utiliseSolutionExterne && inputs.budgetMensuelExterne
    ? inputs.budgetMensuelExterne * 12
    : 0;

  // 4. Coût total actuel
  const coutTotalActuel = coutEmployeurAnnuel + coutEquipementAnnuel + coutExterneAnnuel;

  // 5. Capacité annuelle actuelle
  const capaciteAnnuelleActuelle =
    inputs.capaciteJournaliere *
    CONSTANTES.joursProduction *
    inputs.nbOperateurs *
    (inputs.pourcentageTemps / 100);

  // 6. Protection division par zéro
  const photosAnnuelles = Math.max(inputs.photosAnnuelles, 1);

  // 7. Coût par photo actuel
  const coutParPhotoActuel = coutTotalActuel / photosAnnuelles;

  // 8. Temps par photo (heures)
  const heuresTravailAnnuel = CONSTANTES.heuresSemaine * CONSTANTES.nbSemainesTravail;
  const tempsParPhotoHeures =
    (heuresTravailAnnuel * inputs.nbOperateurs * (inputs.pourcentageTemps / 100)) /
    photosAnnuelles;

  // 9. Jours de production actuels
  const joursProductionActuels =
    photosAnnuelles /
    Math.max(inputs.capaciteJournaliere * inputs.nbOperateurs, 1);

  // ===== SITUATION AVEC MACHINE =====

  // 1. Machine recommandée
  const machine = recommanderMachine(inputs);

  // 2. TCO annualisé (sur 5 ans)
  const tcoAnnuel =
    (machine.prix / CONSTANTES.dureeAmortissement) +
    machine.maintenanceAnnuelle +
    machine.consommablesAnnuels;

  // 3. Coût opérateur machine (1 seul suffit)
  const coutOperateurMachine = CONSTANTES.salaireMensuelCoutEmployeur * 12;

  // 4. Coût total avec machine
  const coutTotalMachine = coutOperateurMachine + tcoAnnuel;

  // 5. Capacité annuelle avec machine
  const capaciteAnnuelleMachine = machine.capaciteJour * CONSTANTES.joursProduction;

  // 6. Coût par photo avec machine
  const coutParPhotoMachine = coutTotalMachine / photosAnnuelles;

  // 7. Temps par photo avec machine
  const tempsParPhotoMachine = heuresTravailAnnuel / photosAnnuelles;

  // 8. Jours de production avec machine
  const joursProductionMachine = photosAnnuelles / machine.capaciteJour;

  // ===== COMPARAISON =====

  // 1. Économie annuelle
  const economieAnnuelle = coutTotalActuel - coutTotalMachine;

  // 2. Flag rentabilité
  const isRentable = economieAnnuelle > 0;

  // 3. Break-even (null si pas rentable)
  let breakEvenMois: number | null = null;
  if (isRentable && economieAnnuelle > 0) {
    const economieMensuelle = economieAnnuelle / 12;
    breakEvenMois = machine.prix / economieMensuelle;
  }

  // 4. ROI année 1
  const roiAn1 = isRentable
    ? ((economieAnnuelle - machine.prix) / machine.prix) * 100
    : ((economieAnnuelle - machine.prix) / machine.prix) * 100; // Peut être négatif

  // 5. ROI 3 ans
  const economie3ans = (economieAnnuelle * 3) - machine.prix;
  const roi3ans = (economie3ans / machine.prix) * 100;

  // 6. Économie par photo
  const economieParPhoto = coutParPhotoActuel - coutParPhotoMachine;
  const economieParPhotoPourcent = (economieParPhoto / Math.max(coutParPhotoActuel, 0.01)) * 100;

  // 7. Jours économisés
  const joursEconomises = joursProductionActuels - joursProductionMachine;
  const gainTempsPourcent = (joursEconomises / Math.max(joursProductionActuels, 1)) * 100;

  // 8. Scalabilité
  const capaciteResiduelle = capaciteAnnuelleMachine - photosAnnuelles;
  const potentielCroissance = (capaciteResiduelle / photosAnnuelles) * 100;

  return {
    // Situation actuelle
    coutEmployeurAnnuel,
    coutEquipementAnnuel,
    coutExterneAnnuel,
    coutTotalActuel,
    coutParPhotoActuel,
    tempsParPhotoHeures,
    joursProductionActuels,
    capaciteAnnuelleActuelle,

    // Avec machine
    machine,
    tcoAnnuel,
    coutOperateurMachine,
    coutTotalMachine,
    coutParPhotoMachine,
    tempsParPhotoMachine,
    joursProductionMachine,
    capaciteAnnuelleMachine,

    // Comparaison
    economieAnnuelle,
    breakEvenMois,
    roiAn1,
    roi3ans,
    economie3ans,
    economieParPhoto,
    economieParPhotoPourcent,
    joursEconomises,
    gainTempsPourcent,
    capaciteResiduelle,
    potentielCroissance,

    // Flag
    isRentable,
  };
}

/**
 * Formate un nombre en euros
 */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formate des heures en format lisible
 */
export function formatHeures(heures: number): string {
  if (heures < 1) {
    return `${Math.round(heures * 60)} min`;
  }
  const h = Math.floor(heures);
  const m = Math.round((heures - h) * 60);
  return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`;
}

/**
 * Génère les données pour le graphique d'évolution sur 3 ans
 */
export function generateChartData(results: CalculationResults): Array<{
  mois: number;
  actuel: number;
  orbitvu: number;
  economie: number;
}> {
  const data = [];

  for (let mois = 0; mois <= 36; mois++) {
    const coutActuelCumule = (results.coutTotalActuel / 12) * mois;
    const coutOrbituCumule = results.machine.prix + ((results.coutTotalMachine / 12) * mois);

    data.push({
      mois,
      actuel: Math.round(coutActuelCumule),
      orbitvu: Math.round(coutOrbituCumule),
      economie: Math.round(coutActuelCumule - coutOrbituCumule),
    });
  }

  return data;
}
```

## ÉTAPE 7 : VALIDATION ZOD

Créer `components/calculators/ROICalculator/lib/validation.ts` :

```typescript
import { z } from 'zod';

export const step1Schema = z.object({
  nbOperateurs: z.number()
    .min(0.5, 'Minimum 0.5 opérateur')
    .max(20, 'Maximum 20 opérateurs'),
  pourcentageTemps: z.number()
    .min(10, 'Minimum 10%')
    .max(100, 'Maximum 100%'),
  utiliseSolutionExterne: z.boolean(),
  budgetMensuelExterne: z.number()
    .min(0)
    .max(50000)
    .optional(),
  capaciteJournaliere: z.number()
    .min(5, 'Minimum 5 photos/jour')
    .max(300, 'Maximum 300 photos/jour'),
});

export const step2Schema = z.object({
  photosAnnuelles: z.number()
    .min(100, 'Minimum 100 photos/an')
    .max(100000, 'Maximum 100 000 photos/an'),
  budgetEquipement: z.number()
    .min(0)
    .max(50000)
    .optional(),
  repartition: z.object({
    packshot: z.number().min(0).max(100),
    lifestyle: z.number().min(0).max(100),
  }).refine(data => data.packshot + data.lifestyle === 100, {
    message: 'Le total doit faire 100%',
  }),
  tailleProduitsCategory: z.enum(['petit', 'moyen', 'grand', 'tres-grand']),
});

export const fullSchema = step1Schema.merge(step2Schema);

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type FullFormData = z.infer<typeof fullSchema>;
```

## ÉTAPE 8 : COMPOSANT WIZARD PRINCIPAL

Créer `components/calculators/ROICalculator/ROICalculatorWizard.tsx` :

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';

import Step1CurrentSituation from './steps/Step1CurrentSituation';
import Step2ProductionGoals from './steps/Step2ProductionGoals';
import Step3Results from './steps/Step3Results';

import { fullSchema, type FullFormData } from './lib/validation';
import { DEFAULT_VALUES } from './lib/constants';
import { calculateROI } from './lib/calculations';
import type { CalculationResults } from './lib/types';

interface ROICalculatorWizardProps {
  className?: string;
  locale?: 'fr' | 'en';
}

const STEPS = [
  { id: 1, title: { fr: 'Situation actuelle', en: 'Current situation' } },
  { id: 2, title: { fr: 'Objectifs de production', en: 'Production goals' } },
  { id: 3, title: { fr: 'Votre analyse ROI', en: 'Your ROI analysis' } },
];

export default function ROICalculatorWizard({
  className,
  locale = 'fr'
}: ROICalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const methods = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: DEFAULT_VALUES as FullFormData,
    mode: 'onChange',
  });

  const { trigger, getValues, formState: { errors } } = methods;

  const handleNext = useCallback(async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger([
        'nbOperateurs',
        'pourcentageTemps',
        'utiliseSolutionExterne',
        'budgetMensuelExterne',
        'capaciteJournaliere',
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        'photosAnnuelles',
        'budgetEquipement',
        'repartition',
        'tailleProduitsCategory',
      ]);

      if (isValid) {
        // Calculer les résultats
        setIsCalculating(true);
        const values = getValues();

        // Simuler un délai pour l'UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const calculatedResults = calculateROI(values as any);
        setResults(calculatedResults);
        setIsCalculating(false);
      }
    }

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  }, [currentStep, trigger, getValues]);

  const handleBack = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    if (currentStep === 3) {
      setResults(null);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    methods.reset(DEFAULT_VALUES as FullFormData);
    setCurrentStep(1);
    setResults(null);
  }, [methods]);

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className={cn('bg-white rounded-2xl shadow-xl overflow-hidden', className)}>
      {/* Header avec progression */}
      <div className="bg-gradient-to-r from-secondary-orbitvu to-primary-orbitvu px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-heading font-bold text-lg">
            {STEPS[currentStep - 1].title[locale]}
          </h3>
          <span className="text-white/80 text-sm">
            {locale === 'fr' ? 'Étape' : 'Step'} {currentStep}/{STEPS.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2 bg-white/20" />
      </div>

      {/* Contenu */}
      <FormProvider {...methods}>
        <form className="p-6 md:p-8">
          {currentStep === 1 && <Step1CurrentSituation locale={locale} />}
          {currentStep === 2 && <Step2ProductionGoals locale={locale} />}
          {currentStep === 3 && results && (
            <Step3Results results={results} locale={locale} />
          )}

          {/* Loading state */}
          {isCalculating && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary-orbitvu border-t-transparent mb-4" />
              <p className="text-neutral-medium">
                {locale === 'fr' ? 'Calcul de votre ROI en cours...' : 'Calculating your ROI...'}
              </p>
            </div>
          )}

          {/* Navigation */}
          {!isCalculating && (
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-light">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {locale === 'fr' ? 'Retour' : 'Back'}
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="gap-2 bg-secondary-orbitvu hover:bg-primary-orbitvu"
                >
                  {currentStep === 2 ? (
                    <>
                      <Calculator className="w-4 h-4" />
                      {locale === 'fr' ? 'Calculer mon ROI' : 'Calculate my ROI'}
                    </>
                  ) : (
                    <>
                      {locale === 'fr' ? 'Suivant' : 'Next'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  {locale === 'fr' ? 'Recommencer' : 'Start over'}
                </Button>
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
```

## ÉTAPE 9 : COMPOSANTS QUESTIONS (8 questions)

### Question 1 : Nombre d'opérateurs
Créer `components/calculators/ROICalculator/questions/QuestionOperators.tsx`

### Question 2 : Pourcentage temps
Créer `components/calculators/ROICalculator/questions/QuestionTimePercentage.tsx`

### Question 3 : Solution externe
Créer `components/calculators/ROICalculator/questions/QuestionExternalProvider.tsx`

### Question 4 : Capacité journalière
Créer `components/calculators/ROICalculator/questions/QuestionDailyCapacity.tsx`

### Question 5 : Volume annuel
Créer `components/calculators/ROICalculator/questions/QuestionAnnualVolume.tsx`

### Question 6 : Budget équipement
Créer `components/calculators/ROICalculator/questions/QuestionEquipmentBudget.tsx`

### Question 7 : Répartition production
Créer `components/calculators/ROICalculator/questions/QuestionProductionSplit.tsx`

### Question 8 : Taille produits (NOUVELLE)
Créer `components/calculators/ROICalculator/questions/QuestionProductSize.tsx`

**Pour chaque question, utiliser ce pattern :**

```typescript
'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import type { FullFormData } from '../lib/validation';

interface QuestionXXXProps {
  locale: 'fr' | 'en';
}

export default function QuestionXXX({ locale }: QuestionXXXProps) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<FullFormData>();

  // Logique spécifique...

  return (
    <div className="space-y-4">
      {/* Label avec tooltip */}
      {/* Input/Slider/Radio */}
      {/* Message d'erreur */}
    </div>
  );
}
```

## ÉTAPE 10 : STEPS CONTAINERS

### Step1CurrentSituation.tsx
Wrapper qui contient Questions 1-4

### Step2ProductionGoals.tsx
Wrapper qui contient Questions 5-8

### Step3Results.tsx
Placeholder avec message "À implémenter dans Session B"

## ÉTAPE 11 : INDEX ET EXPORT

Créer `components/calculators/ROICalculator/index.tsx` :

```typescript
export { default as ROICalculator } from './ROICalculatorWizard';
export * from './lib/types';
export * from './lib/calculations';
```

## ÉTAPE 12 : TRADUCTIONS

Ajouter dans `messages/fr.json` sous `studiosHardware` :

```json
"roiCalculator": {
  "heading": "Calculez Votre ROI en 2 Minutes",
  "subtitle": "Découvrez en combien de mois votre investissement sera rentabilisé",
  "step1": {
    "title": "Situation actuelle",
    "operators": {
      "label": "Combien de personnes travaillent sur la production de vos visuels ?",
      "sublabel": "Inclus packshot + lifestyle + retouches",
      "tooltip": "Comptez tous les collaborateurs impliqués, même partiellement",
      "unit": "personne(s)"
    },
    "timePercentage": {
      "label": "Quel pourcentage de leur temps est consacré à la production visuelle ?",
      "sublabel": "Moyenne pondérée si plusieurs opérateurs",
      "tooltip": "Temps réel : shooting + retouches + gestion (hors pauses, admin)"
    },
    "externalProvider": {
      "label": "Faites-vous appel à un prestataire externe ?",
      "budgetLabel": "Budget mensuel moyen prestataire externe",
      "tooltip": "Montant moyen facturé par mois"
    },
    "dailyCapacity": {
      "label": "Combien de photos finalisées produisez-vous par jour ?",
      "sublabel": "Par opérateur, prises de vues + retouches complètes",
      "tooltip": "Photos 100% prêtes à être mises en ligne",
      "unit": "photos/jour/opérateur"
    }
  },
  "step2": {
    "title": "Objectifs de production",
    "annualVolume": {
      "label": "Combien de photos produit devez-vous réaliser par an ?",
      "sublabel": "Objectif total : existant + nouveautés + renouvellement",
      "tooltip": "Comptez TOUS les visuels produits",
      "unit": "photos/an"
    },
    "equipmentBudget": {
      "label": "Budget annuel actuel pour l'équipement photo et logiciels ?",
      "sublabel": "Matériel, éclairage, licences, espace (optionnel)",
      "tooltip": "Amortissement matériel + licences + loyer espace dédié",
      "placeholder": "7 500€ (valeur suggérée)"
    },
    "productionSplit": {
      "label": "Répartition de votre production",
      "sublabel": "Packshot fond blanc vs Lifestyle/mises en scène",
      "packshot": "Packshots fond blanc",
      "lifestyle": "Lifestyle / Mises en scène"
    },
    "productSize": {
      "label": "Quelle est la taille principale de vos produits ?",
      "sublabel": "Pour recommander le studio adapté",
      "small": "Petit (< 30 cm)",
      "smallExamples": "Bijoux, montres, cosmétiques",
      "medium": "Moyen (30-60 cm)",
      "mediumExamples": "Chaussures, sacs, électronique",
      "large": "Grand (60-150 cm)",
      "largeExamples": "Petit mobilier, équipement sportif",
      "veryLarge": "Très grand (> 150 cm)",
      "veryLargeExamples": "Mobilier, vélos, grands équipements"
    }
  },
  "calculating": "Calcul de votre ROI en cours...",
  "navigation": {
    "back": "Retour",
    "next": "Suivant",
    "calculate": "Calculer mon ROI",
    "restart": "Recommencer"
  }
}
```

Ajouter équivalent dans `messages/en.json`.

## ÉTAPE 13 : INTÉGRATION PAGE

Modifier `app/[lang]/studios-photo-automatises/page.tsx` :
- Remplacer l'import de `ROICalculator` depuis `EmbedFrame`
- Importer le nouveau `ROICalculator` depuis `@/components/calculators/ROICalculator`
- Passer la prop `locale={lang}`

## CHECKLIST LIVRAISON SESSION A

- [ ] Dépendances installées (shadcn: slider, radio-group, progress, tooltip + npm: recharts, jspdf, html2canvas)
- [ ] Structure dossiers créée
- [ ] `types.ts` complet avec tous les types
- [ ] `constants.ts` avec constantes et valeurs par défaut
- [ ] `machines.ts` avec les 13 machines et helpers
- [ ] `calculations.ts` avec toutes les fonctions de calcul
- [ ] `validation.ts` avec schémas Zod
- [ ] `ROICalculatorWizard.tsx` fonctionnel
- [ ] 8 composants questions créés
- [ ] 3 composants steps créés (Step3 en placeholder)
- [ ] `index.tsx` avec exports
- [ ] Traductions FR ajoutées dans `messages/fr.json`
- [ ] Traductions EN ajoutées dans `messages/en.json`
- [ ] Page modifiée pour utiliser le nouveau composant
- [ ] Build Next.js sans erreurs
- [ ] Test manuel : wizard navigation fonctionne
- [ ] Test manuel : calculs se lancent à l'étape 3

---
---
---

# SESSION B : RÉSULTATS + GRAPHIQUES + PDF + EMAIL

## PRÉREQUIS

Session A complétée avec succès. Vérifier que :
- Le wizard navigue correctement entre les 3 étapes
- Les calculs se lancent à l'étape 2→3
- Le fichier `Step3Results.tsx` existe (même en placeholder)

## MISSION

1. Implémenter l'affichage complet des résultats (6 sections)
2. Créer les graphiques Recharts (évolution 3 ans)
3. Implémenter la génération PDF
4. Ajouter la capture email pour envoi des résultats
5. Créer le CTA contextuel selon ROI
6. Gérer le cas "non rentable" (Option B)
7. Préparer la structure pour intégration Pipedrive
8. Ajouter les events GA4 (sans intégration)

## STRUCTURE FICHIERS À CRÉER/MODIFIER

```
components/calculators/ROICalculator/
├── results/
│   ├── HeroMetrics.tsx           # 4 KPIs principaux
│   ├── MachineRecommendation.tsx # Machine + image + specs
│   ├── ComparisonTable.tsx       # Tableau avant/après
│   ├── BreakEvenTimeline.tsx     # Timeline visuelle
│   ├── EvolutionChart.tsx        # Graphique Recharts 3 ans
│   ├── AdditionalBenefits.tsx    # 4 cards bénéfices
│   ├── ContextualCTA.tsx         # CTA selon ROI
│   ├── NotProfitableCTA.tsx      # CTA si non rentable
│   ├── EmailCapture.tsx          # Formulaire email
│   └── PDFGenerator.tsx          # Génération PDF
├── steps/
│   └── Step3Results.tsx          # À MODIFIER (remplacer placeholder)
└── lib/
    ├── analytics.ts              # Events GA4
    └── pdfTemplate.ts            # Template PDF
```

## ÉTAPE 1 : HERO METRICS (4 KPIs)

Créer `components/calculators/ROICalculator/results/HeroMetrics.tsx` :

```typescript
'use client';

import { cn } from '@/lib/utils';
import { Clock, PiggyBank, Camera, TrendingUp } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface HeroMetricsProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    breakeven: 'Machine rentabilisée en',
    savings: 'Économie annuelle',
    savingsNote: "Dès l'année 2",
    perPhoto: 'Économie par photo',
    roi3: 'ROI sur 3 ans',
    roi3Note: 'de bénéfices nets',
    months: 'mois',
  },
  en: {
    breakeven: 'Machine pays for itself in',
    savings: 'Annual savings',
    savingsNote: 'From year 2',
    perPhoto: 'Savings per photo',
    roi3: '3-year ROI',
    roi3Note: 'net benefits',
    months: 'months',
  },
};

export default function HeroMetrics({ results, locale }: HeroMetricsProps) {
  const t = LABELS[locale];

  // Si non rentable, ne pas afficher ces métriques
  if (!results.isRentable) {
    return null;
  }

  const metrics = [
    {
      icon: Clock,
      label: t.breakeven,
      value: results.breakEvenMois
        ? `${Math.round(results.breakEvenMois)} ${t.months}`
        : '-',
      color: 'text-secondary-orbitvu',
      bgColor: 'bg-secondary-orbitvu/10',
      highlight: results.breakEvenMois && results.breakEvenMois < 18,
    },
    {
      icon: PiggyBank,
      label: t.savings,
      value: formatEuro(results.economieAnnuelle),
      sublabel: t.savingsNote,
      color: 'text-accent-success',
      bgColor: 'bg-accent-success/10',
      highlight: true,
    },
    {
      icon: Camera,
      label: t.perPhoto,
      value: `${Math.round(results.economieParPhotoPourcent)}%`,
      sublabel: `${formatEuro(results.economieParPhoto)} ${locale === 'fr' ? 'économisés/photo' : 'saved/photo'}`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      label: t.roi3,
      value: `+${Math.round(results.roi3ans)}%`,
      sublabel: `${formatEuro(results.economie3ans)} ${t.roi3Note}`,
      color: 'text-secondary-orbitvu',
      bgColor: 'bg-secondary-orbitvu/10',
      highlight: results.roi3ans > 200,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-secondary-orbitvu/10 to-secondary-orbitvu/5 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-dark mb-6 text-center">
        {locale === 'fr' ? 'Votre Analyse ROI Personnalisée' : 'Your Personalized ROI Analysis'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={cn(
              'rounded-xl p-4 transition-all',
              metric.bgColor,
              metric.highlight && 'ring-2 ring-secondary-orbitvu ring-offset-2'
            )}
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', metric.bgColor)}>
              <metric.icon className={cn('w-5 h-5', metric.color)} />
            </div>
            <p className="text-sm text-neutral-medium mb-1">{metric.label}</p>
            <p className={cn('text-2xl font-heading font-bold', metric.color)}>
              {metric.value}
            </p>
            {metric.sublabel && (
              <p className="text-xs text-neutral-medium mt-1">{metric.sublabel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## ÉTAPE 2 : MACHINE RECOMMANDÉE

Créer `components/calculators/ROICalculator/results/MachineRecommendation.tsx` :

```typescript
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatEuro } from '../lib/calculations';
import type { Machine } from '../lib/types';

interface MachineRecommendationProps {
  machine: Machine;
  locale: 'fr' | 'en';
}

export default function MachineRecommendation({ machine, locale }: MachineRecommendationProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-neutral-light">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image placeholder */}
        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-neutral-lighter rounded-lg overflow-hidden flex items-center justify-center">
          {machine.imageUrl ? (
            <Image
              src={machine.imageUrl}
              alt={machine.nom}
              width={192}
              height={192}
              className="object-cover"
            />
          ) : (
            <div className="text-neutral-medium text-sm text-center p-4">
              {locale === 'fr' ? 'Image bientôt disponible' : 'Image coming soon'}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-orbitvu text-white">
              {locale === 'fr' ? 'Machine recommandée' : 'Recommended machine'}
            </span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-neutral-dark">
              {machine.nom}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-neutral-medium">{locale === 'fr' ? 'Prix' : 'Price'}</span>
              <p className="font-bold text-neutral-dark">{formatEuro(machine.prix)} HT</p>
            </div>
            <div>
              <span className="text-neutral-medium">{locale === 'fr' ? 'Capacité' : 'Capacity'}</span>
              <p className="font-bold text-neutral-dark">{machine.capaciteJour} photos/jour</p>
            </div>
            <div>
              <span className="text-neutral-medium">{locale === 'fr' ? 'Taille max' : 'Max size'}</span>
              <p className="font-bold text-neutral-dark">{machine.tailleMax}</p>
            </div>
            <div>
              <span className="text-neutral-medium">{locale === 'fr' ? 'Poids max' : 'Max weight'}</span>
              <p className="font-bold text-neutral-dark">{machine.poidsMax}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-neutral-medium font-medium mb-2">
              {locale === 'fr' ? "Cas d'usage :" : 'Use cases:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {machine.useCases.map(useCase => (
                <span
                  key={useCase}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-neutral-lighter text-neutral-dark"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-secondary-orbitvu hover:bg-primary-orbitvu">
              {locale === 'fr' ? 'Réserver une démo' : 'Book a demo'}
            </Button>
            <Button variant="outline">
              {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## ÉTAPE 3 : GRAPHIQUE ÉVOLUTION 3 ANS

Créer `components/calculators/ROICalculator/results/EvolutionChart.tsx` :

```typescript
'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { generateChartData, formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface EvolutionChartProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Évolution des Coûts sur 3 Ans',
    current: 'Situation actuelle',
    orbitvu: 'Avec Orbitvu',
    breakeven: 'Break-even',
    month: 'Mois',
    cost: 'Coût cumulé',
  },
  en: {
    title: 'Cost Evolution Over 3 Years',
    current: 'Current situation',
    orbitvu: 'With Orbitvu',
    breakeven: 'Break-even',
    month: 'Month',
    cost: 'Cumulative cost',
  },
};

export default function EvolutionChart({ results, locale }: EvolutionChartProps) {
  const t = LABELS[locale];
  const data = generateChartData(results);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-neutral-light">
          <p className="font-bold text-neutral-dark mb-2">{t.month} {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatEuro(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-6">
        {t.title}
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActuel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6F00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6F00" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrbitvu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#24A1B4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#24A1B4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />

            <XAxis
              dataKey="mois"
              tick={{ fill: '#757575', fontSize: 12 }}
              tickLine={{ stroke: '#E0E0E0' }}
            />

            <YAxis
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`}
              tick={{ fill: '#757575', fontSize: 12 }}
              tickLine={{ stroke: '#E0E0E0' }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-neutral-dark">{value}</span>
              )}
            />

            {/* Ligne de break-even */}
            {results.breakEvenMois && (
              <ReferenceLine
                x={Math.round(results.breakEvenMois)}
                stroke="#00C853"
                strokeDasharray="5 5"
                label={{
                  value: t.breakeven,
                  fill: '#00C853',
                  fontSize: 12,
                  position: 'top',
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey="actuel"
              name={t.current}
              stroke="#FF6F00"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActuel)"
            />

            <Area
              type="monotone"
              dataKey="orbitvu"
              name={t.orbitvu}
              stroke="#24A1B4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrbitvu)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Légende explicative */}
      <div className="mt-4 p-4 bg-accent-success/10 rounded-lg">
        <p className="text-sm text-accent-success font-medium">
          {locale === 'fr'
            ? `À partir du mois ${Math.round(results.breakEvenMois || 0)}, chaque euro dépensé génère des économies pures.`
            : `From month ${Math.round(results.breakEvenMois || 0)}, every euro spent generates pure savings.`
          }
        </p>
      </div>
    </div>
  );
}
```

## ÉTAPE 4 : TABLEAU COMPARATIF

Créer `components/calculators/ROICalculator/results/ComparisonTable.tsx`

## ÉTAPE 5 : TIMELINE BREAK-EVEN

Créer `components/calculators/ROICalculator/results/BreakEvenTimeline.tsx`

## ÉTAPE 6 : BÉNÉFICES ADDITIONNELS

Créer `components/calculators/ROICalculator/results/AdditionalBenefits.tsx`

## ÉTAPE 7 : CTA CONTEXTUEL

Créer `components/calculators/ROICalculator/results/ContextualCTA.tsx` :

Afficher selon le ROI :
- ROI > 300% : "Votre ROI est exceptionnel !" + CTA Demo
- ROI > 100% : "Excellent retour sur investissement" + CTA Demo
- ROI ≤ 100% : Utiliser NotProfitableCTA

## ÉTAPE 8 : CTA NON RENTABLE (Option B)

Créer `components/calculators/ROICalculator/results/NotProfitableCTA.tsx` :

```typescript
'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface NotProfitableCTAProps {
  locale: 'fr' | 'en';
}

export default function NotProfitableCTA({ locale }: NotProfitableCTAProps) {
  return (
    <div className="bg-gradient-to-br from-neutral-lighter to-white rounded-2xl p-8 text-center border border-neutral-light">
      <div className="text-5xl mb-4">🔍</div>

      <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-3">
        {locale === 'fr'
          ? 'Votre situation mérite une analyse approfondie'
          : 'Your situation deserves a deeper analysis'
        }
      </h3>

      <p className="text-lg text-neutral-medium mb-6 max-w-2xl mx-auto">
        {locale === 'fr'
          ? 'Nos experts peuvent identifier des optimisations spécifiques à votre activité et vous proposer la solution la plus adaptée.'
          : 'Our experts can identify optimizations specific to your business and offer you the most suitable solution.'
        }
      </p>

      <Button size="lg" className="gap-2 bg-secondary-orbitvu hover:bg-primary-orbitvu">
        <MessageCircle className="w-5 h-5" />
        {locale === 'fr' ? 'Demander une étude gratuite' : 'Request a free analysis'}
      </Button>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-neutral-medium">
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>{locale === 'fr' ? 'Sans engagement' : 'No commitment'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>{locale === 'fr' ? 'Réponse sous 24h' : 'Response within 24h'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>{locale === 'fr' ? 'Conseil personnalisé' : 'Personalized advice'}</span>
        </div>
      </div>
    </div>
  );
}
```

## ÉTAPE 9 : CAPTURE EMAIL

Créer `components/calculators/ROICalculator/results/EmailCapture.tsx` :

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Download, Check } from 'lucide-react';
import type { CalculationResults } from '../lib/types';

interface EmailCaptureProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
  onSendPDF: (email: string) => Promise<void>;
}

export default function EmailCapture({ results, locale, onSendPDF }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError(locale === 'fr' ? 'Email invalide' : 'Invalid email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSendPDF(email);
      setIsSent(true);

      // Track event (structure Pipedrive-ready)
      if (typeof window !== 'undefined') {
        // Prêt pour intégration Pipedrive
        console.log('[Pipedrive Ready]', {
          email,
          machine: results.machine.nom,
          roi3ans: results.roi3ans,
          economieAnnuelle: results.economieAnnuelle,
        });
      }
    } catch (err) {
      setError(locale === 'fr' ? 'Erreur lors de l\'envoi' : 'Error sending');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="bg-accent-success/10 rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-accent-success/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-accent-success" />
        </div>
        <p className="text-accent-success font-medium">
          {locale === 'fr'
            ? 'Votre analyse ROI a été envoyée !'
            : 'Your ROI analysis has been sent!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-lighter rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary-orbitvu/10 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-secondary-orbitvu" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-neutral-dark">
            {locale === 'fr'
              ? 'Recevez votre analyse complète par email'
              : 'Receive your complete analysis by email'
            }
          </h4>
          <p className="text-sm text-neutral-medium">
            {locale === 'fr'
              ? 'PDF détaillé avec tous les calculs et la machine recommandée'
              : 'Detailed PDF with all calculations and recommended machine'
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Label htmlFor="email" className="sr-only">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder={locale === 'fr' ? 'votre@email.com' : 'your@email.com'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="gap-2 bg-secondary-orbitvu hover:bg-primary-orbitvu"
        >
          <Download className="w-4 h-4" />
          {isLoading
            ? (locale === 'fr' ? 'Envoi...' : 'Sending...')
            : (locale === 'fr' ? 'Recevoir le PDF' : 'Get PDF')
          }
        </Button>
      </form>
    </div>
  );
}
```

## ÉTAPE 10 : GÉNÉRATION PDF

Créer `components/calculators/ROICalculator/results/PDFGenerator.tsx` :

```typescript
'use client';

import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CalculationResults } from '../lib/types';
import { formatEuro } from '../lib/calculations';

interface PDFGeneratorProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
  contentRef: React.RefObject<HTMLDivElement>;
}

export async function generatePDF(
  contentRef: React.RefObject<HTMLDivElement>,
  results: CalculationResults,
  locale: 'fr' | 'en'
): Promise<Blob> {
  const content = contentRef.current;
  if (!content) throw new Error('Content not found');

  // Capturer le contenu HTML
  const canvas = await html2canvas(content, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');

  // Créer le PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Header
  pdf.setFillColor(0, 188, 212); // secondary-orbitvu
  pdf.rect(0, 0, pdfWidth, 30, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.text('PackshotCreator', 15, 15);
  pdf.setFontSize(12);
  pdf.text(
    locale === 'fr' ? 'Analyse ROI - Studios Photo Orbitvu' : 'ROI Analysis - Orbitvu Photo Studios',
    15,
    23
  );

  // Date
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  const date = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US');
  pdf.text(date, pdfWidth - 35, 15);

  // Contenu capturé
  const imgWidth = pdfWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let yOffset = 40;
  let remainingHeight = imgHeight;

  while (remainingHeight > 0) {
    const availableHeight = pdfHeight - yOffset - 20;

    if (remainingHeight > availableHeight) {
      // Page suivante nécessaire
      pdf.addImage(
        imgData,
        'PNG',
        10,
        yOffset,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      pdf.addPage();
      yOffset = 20;
      remainingHeight -= availableHeight;
    } else {
      pdf.addImage(
        imgData,
        'PNG',
        10,
        yOffset,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      remainingHeight = 0;
    }
  }

  // Footer sur chaque page
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setTextColor(117, 117, 117); // neutral-medium
    pdf.setFontSize(8);
    pdf.text(
      'www.packshotcreator.com | contact@packshotcreator.com',
      pdfWidth / 2,
      pdfHeight - 10,
      { align: 'center' }
    );
    pdf.text(
      `${i} / ${pageCount}`,
      pdfWidth - 15,
      pdfHeight - 10
    );
  }

  return pdf.output('blob');
}

// Hook pour télécharger le PDF
export function useDownloadPDF(
  results: CalculationResults,
  locale: 'fr' | 'en'
) {
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadPDF = useCallback(async () => {
    const blob = await generatePDF(contentRef, results, locale);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROI-Analysis-${results.machine.nom.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results, locale]);

  return { contentRef, downloadPDF };
}
```

## ÉTAPE 11 : EVENTS ANALYTICS (GA4 Ready)

Créer `components/calculators/ROICalculator/lib/analytics.ts` :

```typescript
import type { CalculationResults, UserInputs } from './types';

// Types pour les events
interface CalculatorEvent {
  event: string;
  [key: string]: any;
}

/**
 * Track calculator completion
 */
export function trackCalculatorCompleted(results: CalculationResults): void {
  const event: CalculatorEvent = {
    event: 'calculator_completed',
    machine_recommended: results.machine.nom,
    machine_id: results.machine.id,
    roi_3_years: Math.round(results.roi3ans),
    break_even_months: results.breakEvenMois ? Math.round(results.breakEvenMois) : null,
    annual_savings: Math.round(results.economieAnnuelle),
    is_profitable: results.isRentable,
  };

  // Log pour debug (remplacer par gtag en prod)
  console.log('[GA4 Event]', event);

  // Prêt pour intégration:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.event, event);
  // }
}

/**
 * Track CTA click
 */
export function trackCTAClick(
  ctaType: 'demo' | 'product_page' | 'email_capture' | 'pdf_download' | 'study_request',
  results: CalculationResults
): void {
  const roiRange = results.roi3ans > 300
    ? 'exceptional'
    : results.roi3ans > 100
      ? 'good'
      : 'moderate';

  const event: CalculatorEvent = {
    event: 'calculator_cta_click',
    cta_type: ctaType,
    machine_id: results.machine.id,
    roi_range: roiRange,
  };

  console.log('[GA4 Event]', event);
}

/**
 * Track step progression
 */
export function trackStepChange(step: number, direction: 'forward' | 'back'): void {
  const event: CalculatorEvent = {
    event: 'calculator_step_change',
    step_number: step,
    direction,
  };

  console.log('[GA4 Event]', event);
}

/**
 * Track calculator abandonment (appelé si l'utilisateur quitte avant la fin)
 */
export function trackCalculatorAbandonment(lastStep: number): void {
  const event: CalculatorEvent = {
    event: 'calculator_abandoned',
    last_step: lastStep,
  };

  console.log('[GA4 Event]', event);
}
```

## ÉTAPE 12 : STEP3 RESULTS COMPLET

Modifier `components/calculators/ROICalculator/steps/Step3Results.tsx` pour intégrer tous les composants :

```typescript
'use client';

import { useRef } from 'react';
import HeroMetrics from '../results/HeroMetrics';
import MachineRecommendation from '../results/MachineRecommendation';
import EvolutionChart from '../results/EvolutionChart';
import ComparisonTable from '../results/ComparisonTable';
import BreakEvenTimeline from '../results/BreakEvenTimeline';
import AdditionalBenefits from '../results/AdditionalBenefits';
import ContextualCTA from '../results/ContextualCTA';
import NotProfitableCTA from '../results/NotProfitableCTA';
import EmailCapture from '../results/EmailCapture';
import { generatePDF } from '../results/PDFGenerator';
import { trackCalculatorCompleted, trackCTAClick } from '../lib/analytics';
import type { CalculationResults } from '../lib/types';

interface Step3ResultsProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

export default function Step3Results({ results, locale }: Step3ResultsProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Track completion au montage
  React.useEffect(() => {
    trackCalculatorCompleted(results);
  }, [results]);

  const handleSendPDF = async (email: string) => {
    trackCTAClick('email_capture', results);

    // Générer le PDF
    const pdfBlob = await generatePDF(contentRef, results, locale);

    // TODO: Envoyer via API (Pipedrive + email)
    // Pour l'instant, téléchargement direct
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROI-Analysis-${results.machine.nom.replace(/\s+/g, '-')}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={contentRef}>
      {results.isRentable ? (
        <>
          {/* Métriques héro */}
          <HeroMetrics results={results} locale={locale} />

          {/* Machine recommandée */}
          <MachineRecommendation machine={results.machine} locale={locale} />

          {/* Graphique évolution 3 ans */}
          <EvolutionChart results={results} locale={locale} />

          {/* Tableau comparatif */}
          <ComparisonTable results={results} locale={locale} />

          {/* Timeline break-even */}
          <BreakEvenTimeline results={results} locale={locale} />

          {/* Bénéfices additionnels */}
          <AdditionalBenefits results={results} locale={locale} />

          {/* CTA contextuel */}
          <ContextualCTA results={results} locale={locale} />

          {/* Capture email */}
          <div className="mt-8">
            <EmailCapture
              results={results}
              locale={locale}
              onSendPDF={handleSendPDF}
            />
          </div>
        </>
      ) : (
        <>
          {/* CTA non rentable - Option B */}
          <NotProfitableCTA locale={locale} />

          {/* Quand même proposer un contact */}
          <div className="mt-8">
            <EmailCapture
              results={results}
              locale={locale}
              onSendPDF={handleSendPDF}
            />
          </div>
        </>
      )}
    </div>
  );
}
```

## ÉTAPE 13 : TRADUCTIONS COMPLÉMENTAIRES

Ajouter dans `messages/fr.json` et `messages/en.json` les clés pour :
- Tous les labels des résultats
- Messages du PDF
- CTA contextuels
- Erreurs de validation

## CHECKLIST LIVRAISON SESSION B

- [ ] `HeroMetrics.tsx` - 4 KPIs avec styling
- [ ] `MachineRecommendation.tsx` - Card machine avec placeholder image
- [ ] `EvolutionChart.tsx` - Graphique Recharts fonctionnel
- [ ] `ComparisonTable.tsx` - Tableau avant/après
- [ ] `BreakEvenTimeline.tsx` - Timeline visuelle
- [ ] `AdditionalBenefits.tsx` - 4 cards bénéfices
- [ ] `ContextualCTA.tsx` - CTA selon ROI
- [ ] `NotProfitableCTA.tsx` - Option B (non rentable)
- [ ] `EmailCapture.tsx` - Formulaire email fonctionnel
- [ ] `PDFGenerator.tsx` - Génération PDF html2canvas + jsPDF
- [ ] `analytics.ts` - Events GA4 structurés
- [ ] `Step3Results.tsx` - Intégration complète
- [ ] Traductions FR/EN complètes
- [ ] Build Next.js sans erreurs
- [ ] Test manuel : affichage résultats rentable
- [ ] Test manuel : affichage résultats non rentable
- [ ] Test manuel : graphique 3 ans fonctionne
- [ ] Test manuel : PDF se génère correctement
- [ ] Test manuel : email capture + téléchargement PDF

---

## NOTES IMPORTANTES

### Intégration Pipedrive (à faire ultérieurement)
Structure de données prête dans `EmailCapture.tsx` :
```typescript
{
  email: string,
  machine: string,
  roi3ans: number,
  economieAnnuelle: number,
  // ... autres métriques
}
```

### Events GA4 (à activer en prod)
Décommenter les appels `window.gtag` dans `analytics.ts` quand GA4 sera configuré.

### Images machines
Les `imageUrl` sont optionnelles. Un placeholder s'affiche si non disponible.
Quand les pages machines seront créées, ajouter les URLs dans `machines.ts`.

---

FIN DES PROMPTS
