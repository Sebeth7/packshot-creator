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
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}
