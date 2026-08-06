// Types pour les inputs utilisateur
export interface UserInputs {
  // Step 1 : Situation actuelle
  nbOperateurs: number;              // 0.5 - 20
  pourcentageTemps: number;          // 10 - 100 (%)
  coutSalarialMensuel?: number;      // € coût total employeur/mois (défaut 4000)
  utiliseSolutionExterne: boolean;
  budgetMensuelExterne?: number;     // 0 - 50000 €/mois
  capaciteJournaliere: number;       // 5 - 300 photos/jour/opérateur

  // Investissement initial envisagé (optionnel)
  investissementInitialActif: boolean;
  montantInvestissementInitial?: number; // € HT (ex: machine concurrente, création studio)

  // Step 2 : Objectifs
  photosAnnuelles: number;           // 100 - 100000
  budgetEquipement?: number;         // 0 - 50000 €/an (optionnel, défaut 3000)
  tailleProduitsCategory: ProductSizeCategory;
  typesContenu: ContentType[];       // Types de contenu souhaités

  // Accessoires complémentaires (achat uniquement, inclus dans le leasing)
  montantAccessoires?: number;         // € HT

  // Leasing (optionnel)
  leasingActif: boolean;
  leasingMachineId?: string;         // ID de la machine en leasing
  leasingMensualite?: number;        // € HT / mois
  leasingNbMois?: number;            // 12 - 84 mois
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
  | 'optics'       // Lunetterie & Optique
  | 'health'       // Santé & Médical
  | 'industrial'   // Industrie & pièces techniques
  | 'watchmaking'  // Horlogerie
  | 'general';     // E-commerce général

// Dimensions structurées
export interface Dimensions {
  l: number;  // Longueur en cm
  w: number;  // Largeur en cm
  h: number;  // Hauteur en cm
}

// Texte bilingue (+ allemand suisse optionnel, fallback → en via pickL)
export interface BilingualText {
  fr: string;
  en: string;
  'de-ch'?: string;
}

// FAQ bilingue pour fiches machines
export interface BilingualFaqItem {
  question: BilingualText;
  answer: BilingualText;
}

// Chiffre clé pour fiches machines
export interface KeyStat {
  value: string;
  label: BilingualText;
  description: BilingualText;
}

// Machine Orbitvu (enrichie)
export interface Machine {
  id: string;
  nom: string;
  prix: number;                           // € HT (utilisé pour calculs, non affiché)
  prixSurDevis?: boolean;                 // si true, machine exclue du calculateur ROI (prix non confirmé Orbitvu)
  delisted?: boolean;                     // si true, exclue de tout affichage/recommandation ; la page produit reste servie
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
  keyAdvantages: (BilingualText & { description?: BilingualText })[];  // Avantages clés (avec description optionnelle)
  limitations: BilingualText[];           // Limitations
  spaceRequired: string;                  // Espace requis (ex: "Bureau", "Sol", "Studio")
  studioFootprint?: Dimensions;           // Dimensions du studio en cm
  faqItems?: BilingualFaqItem[];          // FAQ spécifiques à la machine
  keyStats?: KeyStat[];                   // Chiffres clés (3 max)
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
  coutEmployeurAnnuel: number;       // Salaires internes déclarés (valorisés en temps, pas en cash)
  coutEquipementAnnuel: number;
  coutExterneAnnuel: number;
  coutCashActuel: number;            // Décaissements supprimables : équipement + prestataires externes
  investissementInitialMontant: number; // Montant cash de l'investissement initial envisagé (mois 0)
  coutTotalActuel: number;           // Informatif (CRM) — inclut les salaires, jamais présenté comme économisable
  tempsParPhotoHeures: number;
  joursProductionActuels: number;
  capaciteAnnuelleActuelle: number;

  // Avec machine recommandée
  machine: Machine;
  montantAccessoires: number;            // Accessoires complémentaires (0 en leasing)
  prixTotalPackshotCreator: number;      // machine.prix + accessoires (cash mois 0)
  tcoAnnuel: number;
  coutOperateurMachine: number;
  coutTotalMachine: number;
  tempsParPhotoMachine: number;
  joursProductionMachine: number;
  capaciteAnnuelleMachine: number;

  // Comparaison
  economieAnnuelle: number;          // Économie directe cash avant impôt : coutCashActuel - tcoAnnuel
  tempsLibereJours: number;          // Jours-homme internes libérés par an
  valeurTempsLibere: number;         // Valorisation indicative du temps libéré (coût employeur) — pas du cash
  gainTotalAnnuel: number;           // economieAnnuelle + valeurTempsLibere (pilote isRentable)
  avantageFiscalAnnuel: number;      // Informatif : déductibilité loyers/amortissement (IS 25%)
  breakEvenMois: number | null;      // Break-even trésorerie, null si le cash seul ne couvre pas
  dureeAnalyseMois: number;          // Durée du contrat en leasing, 60 mois en achat
  roiAn1: number;
  economieAn1: number;               // Économie cash nette année 1
  roi5ans: number;                   // ROI cash sur dureeAnalyseMois
  economie5ans: number;              // Économie cash nette cumulée sur dureeAnalyseMois
  joursEconomises: number;
  gainTempsPourcent: number;
  capaciteResiduelle: number;
  potentielCroissance: number;

  // Flags
  isRentable: boolean;
  capaciteInsuffisante: boolean;       // true si le volume dépasse la capacité max de la machine
  inputsSurcapacite: boolean;          // true si la capacité interne déclarée ≥ 2× l'objectif (saisie suspecte)
  isLeasing: boolean;                  // true si calcul en mode leasing
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
