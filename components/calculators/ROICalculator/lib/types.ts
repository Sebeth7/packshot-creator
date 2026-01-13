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

// Type de contenu supporté
export type ContentType = 'packshot' | '360' | 'video' | 'ghost-mannequin' | 'flat-lay' | 'lifestyle';

// Niveau d'automatisation
export type AutomationLevel = 'manual' | 'semi-auto' | 'full-auto';

// Secteurs d'activité
export type IndustrySector =
  | 'jewelry'      // Bijouterie
  | 'fashion'      // Mode/Vêtements
  | 'footwear'     // Chaussures
  | 'bags'         // Maroquinerie
  | 'cosmetics'    // Cosmétiques
  | 'electronics'  // Électronique
  | 'furniture'    // Mobilier
  | 'wine'         // Vins/Spiritueux
  | 'cycling'      // Cycles/Vélos
  | 'sports'       // Équipements sportifs
  | 'appliances'   // Électroménager
  | 'automotive'   // Automobile/Moto
  | 'general';     // E-commerce général

// Dimensions structurées
export interface Dimensions {
  l: number;  // Longueur en cm
  w: number;  // Largeur en cm
  h: number;  // Hauteur en cm
}

// Texte bilingue
export interface BilingualText {
  fr: string;
  en: string;
}

// Machine Orbitvu (enrichie)
export interface Machine {
  id: string;
  nom: string;
  prix: number;                           // € HT (utilisé pour calculs, non affiché)
  capaciteJour: number;                   // photos/jour
  tailleMax: string;                      // Description textuelle
  poidsMax: string;                       // Description textuelle (peut être kg ou kg/m²)
  tailleCategories: ProductSizeCategory[]; // Catégories supportées
  useCases: string[];
  maintenanceAnnuelle: number;            // € (0 selon specs actuelles)
  consommablesAnnuels: number;            // €
  imageUrl?: string;

  // Nouveaux champs enrichis
  dimensionsMax: Dimensions;              // Dimensions max produit en cm
  poidsMaxKg: number;                     // Poids max en kg (0 si N/A ou charge/m²)
  features: ContentType[];                // Types de contenu supportés
  automationLevel: AutomationLevel;       // Niveau d'automatisation
  idealSectors: IndustrySector[];         // Secteurs idéaux
  volumeRange: { min: number; max: number }; // Photos/an recommandées
  keyAdvantages: BilingualText[];         // Avantages clés
  limitations: BilingualText[];           // Limitations
  spaceRequired: string;                  // Espace requis (ex: "Bureau", "Sol", "Studio")
  studioFootprint?: Dimensions;           // Dimensions du studio en cm
}

// Éligibilité machine (pour le sélecteur)
export interface MachineEligibility {
  machineId: string;
  machine: Machine;
  score: number;                          // 0-100
  isEligible: boolean;
  matchingCriteria: string[];
  missingCriteria: string[];
  keyAdvantages: BilingualText[];
  limitations: BilingualText[];
}

// Critères de sélection utilisateur
export interface SelectionCriteria {
  productDimensions?: Dimensions;         // Dimensions du produit
  productWeight?: number;                 // Poids en kg
  annualVolume: number;                   // Volume annuel visé
  contentTypes: ContentType[];            // Types de contenu souhaités
  sectors?: IndustrySector[];             // Secteurs d'activité
  automationPreference?: AutomationLevel; // Préférence automatisation
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
