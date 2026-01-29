/**
 * Types pour le sélecteur de machines standalone
 * Basé sur les types du calculateur ROI
 */

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

// Machine Orbitvu
export interface Machine {
  id: string;
  nom: string;
  prix: number;                           // € HT
  capaciteJour: number;                   // photos/jour
  tailleMax: string;                      // Description textuelle
  poidsMax: string;                       // Description textuelle
  tailleCategories: ProductSizeCategory[];
  useCases: string[];
  maintenanceAnnuelle: number;
  consommablesAnnuels: number;
  imageUrl?: string;
  dimensionsMax: Dimensions;
  poidsMaxKg: number;
  features: ContentType[];
  automationLevel: AutomationLevel;
  idealSectors: IndustrySector[];
  volumeRange: { min: number; max: number };
  keyAdvantages: BilingualText[];
  limitations: BilingualText[];
  spaceRequired: string;
  studioFootprint?: Dimensions;
}

// Éligibilité machine
export interface MachineEligibility {
  machineId: string;
  machine: Machine;
  score: number;
  isEligible: boolean;
  matchingCriteria: string[];
  missingCriteria: string[];
  keyAdvantages: BilingualText[];
  limitations: BilingualText[];
}

// Critères de sélection
export interface SelectionCriteria {
  productDimensions?: Dimensions;
  productWeight?: number;
  annualVolume: number;
  contentTypes: ContentType[];
  sectors?: IndustrySector[];
  automationPreference?: AutomationLevel;
}

// Options de filtrage pour le sélecteur standalone
export interface MachineSelectorFilters {
  sizeCategory?: ProductSizeCategory;
  priceRange?: { min: number; max: number };
  features?: ContentType[];
  sectors?: IndustrySector[];
  automationLevel?: AutomationLevel;
  searchQuery?: string;
}

// Options de tri
export type SortOption = 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc' | 'name-asc' | 'name-desc';

// Props du sélecteur
export interface MachineSelectorProps {
  mode?: 'selection' | 'display';
  defaultSize?: ProductSizeCategory;
  onMachineSelect?: (machine: Machine) => void;
  showFilters?: boolean;
  showPrices?: boolean;
  maxMachines?: number;
  locale?: 'fr' | 'en';
  className?: string;
  selectedMachineId?: string;
}
