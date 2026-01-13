import type { UserInputs, ProductSizeCategory } from './types';

export const CONSTANTES = {
  salaireMensuelCoutEmployeur: 4000,  // € brut + charges
  nbSemainesTravail: 46,              // 52 - 6 congés
  heuresSemaine: 35,
  joursProduction: 230,               // 46 × 5 jours
  dureeAmortissement: 5,              // années
  budgetEquipementDefaut: 7500,       // € si non renseigné
} as const;

// Labels pour les catégories de taille
export const TAILLE_LABELS: Record<ProductSizeCategory, { fr: string; en: string; examples: string }> = {
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
  nbOperateurs: 1,
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
