/**
 * Moteur ROI généralisé en primitives — types du dossier de modélisation.
 *
 * Principe (CDC_CALCULATEUR_ROI_IA.md §4) : l'IA modélise (elle compose des
 * primitives), le moteur calcule. L'arithmétique est verrouillée ici, avec le
 * modèle économique validé par Seb (commit 4477c2a) :
 *  - économie DIRECTE (cash) = coûts supprimés − coût machine, avant impôt,
 *    sans addition de l'avantage fiscal ;
 *  - temps interne libéré = métrique séparée, jamais agrégée au cash.
 */

export type ComparisonMode = 'vs-existant' | 'contrefactuel' | 'differentiel';

/** Provenance d'une ligne — pilote l'étiquetage honnête des baselines. */
export type LineSource = 'client' | 'referentiel';

/**
 * Ligne de coût cash du scénario de référence (décaissements réels).
 * Les salaires internes n'ont pas leur place ici : ils vont en TimeLine.
 */
export interface CashCostLine {
  id: string;
  label: string;
  frequence: 'recurrent' | 'ponctuel';
  /** €/an — requis si frequence = 'recurrent' */
  montantAnnuel?: number;
  /** € au mois 0 (investissement évité) — requis si frequence = 'ponctuel' */
  montant?: number;
  /** Part du coût que la machine supprime réellement (0-100) */
  pourcentageSupprimable: number;
  source: LineSource;
}

/**
 * Ligne de temps interne (salariés). Valorisée au coût employeur,
 * exposée en jours/an — jamais convertie en économie cash.
 */
export interface TimeLine {
  id: string;
  label: string;
  /** Mode direct : jours-homme par an consacrés à l'activité */
  joursParAn?: number;
  /** Mode par produit : minutes par produit (× volumeAnnuel) */
  minutesParProduit?: number;
  /** Coût employeur mensuel du poste concerné (défaut : constante wizard 4 000 €) */
  coutMensuelEmployeur?: number;
  /** Part de ce temps que la machine libère (0-100) */
  pourcentageLiberable: number;
}

/** Coût de la machine étudiée (ou de la baseline en mode différentiel). */
export type MachineCostInput =
  | {
      source: 'catalogue';
      machineId: string;
      mode: 'achat';
      montantAccessoires?: number;
    }
  | {
      source: 'catalogue';
      machineId: string;
      mode: 'leasing';
      /** Si absente : dérivée de la règle publique ×1,3/60 (lib/leasing.ts) */
      mensualite?: number;
      nbMois?: number;
    }
  | {
      source: 'fourni';
      mode: 'achat';
      /** Prix fourni par l'utilisateur (remise, occasion, devis) — jamais lu au catalogue */
      prix: number;
      label?: string;
      /** Rattachement facultatif à une machine catalogue pour les SPECS (capacité…), jamais pour le prix */
      machineId?: string;
      maintenanceAnnuelle?: number;
      consommablesAnnuels?: number;
      capaciteJour?: number;
    }
  | {
      source: 'fourni';
      mode: 'leasing';
      mensualite: number;
      nbMois: number;
      label?: string;
      machineId?: string;
      capaciteJour?: number;
    };

/**
 * Gain par typologie de fonction (mesure/pesée, packshot, 360°, vidéo…),
 * issu du référentiel « gains par fonction » validé par Seb.
 */
export interface FunctionGain {
  fonction: string;
  label: string;
  /** Minutes de travail manuel évitées par produit */
  minutesParProduit?: number;
  /** €/produit — si absent, dérivé : minutes × taux horaire employeur */
  euroParProduit?: number;
  /** Coût employeur mensuel servant à valoriser les minutes (défaut 4 000 €) */
  coutMensuelEmployeur?: number;
  /** Source du chiffre (référentiel, validation Seb, donnée client) */
  source: string;
}

/** Dossier de modélisation — l'objet que l'IA construit au fil de la conversation. */
export interface RoiDossier {
  mode: ComparisonMode;
  /** Volume annuel de produits visé */
  volumeAnnuel: number;
  /** Capacité actuelle déclarée (produits/jour/opérateur) — sert au contrôle de cohérence */
  capaciteJournaliereActuelle?: number;
  /** Machine étudiée */
  machine: MachineCostInput;
  /** Mode différentiel : la machine de référence (baseline) */
  baselineMachine?: MachineCostInput;
  /** Mode différentiel : fonctions supplémentaires de la machine étudiée */
  functionGains?: FunctionGain[];
  /** Scénario de référence : coûts cash (prestataires, équipement, studio…) */
  cashLines: CashCostLine[];
  /** Scénario de référence : temps interne */
  timeLines: TimeLine[];
  /**
   * Étiquette honnête de la baseline — OBLIGATOIRE en mode contrefactuel
   * (ex. « par rapport à un scénario prestataire à 25 €/photo »),
   * jamais « vos coûts actuels » quand il n'y a pas d'existant.
   */
  baselineLabel?: string;
  /** Repli coût de revient : prix de référence €/produit pour le seuil de rentabilité */
  prixReferenceParProduit?: number;
  /** Durée d'analyse (défaut : durée du leasing, sinon 60 mois) */
  dureeAnalyseMois?: number;
}

/** Détail du coût machine résolu par le moteur. */
export interface ResolvedMachineCost {
  machineId: string | null;
  machineNom: string | null;
  mode: 'achat' | 'leasing';
  prixSource: 'catalogue' | 'fourni';
  /** Prix d'achat (achat) ou coût total des loyers (leasing) — SENSIBLE en mode public */
  coutTotalInvestissement: number;
  /** Prix d'achat machine + accessoires (achat uniquement) — SENSIBLE en mode public */
  prixMachine: number | null;
  /** TCO annuel : loyers (leasing) ou prix/5 + maintenance + consommables (achat) — SENSIBLE en achat public */
  tcoAnnuel: number;
  /** Charges opérationnelles annuelles hors amortissement */
  coutOperationnelAnnuel: number;
  capaciteJour: number | null;
  nbMois: number;
}

export interface DifferentielResults {
  /** Surcoût de la machine étudiée vs baseline (investissement) */
  deltaInvestissement: number;
  /** Surcoût net après IS 25 % (informatif) */
  deltaInvestissementNetIS: number;
  /** Gain valorisé par produit (Σ fonctions) */
  gainParProduit: number;
  /** Minutes de travail manuel évitées par produit (Σ fonctions) */
  minutesParProduit: number;
  /** Nombre de produits traités pour amortir le surcoût */
  breakEvenProduits: number | null;
  /** Années pour amortir au volume annuel déclaré */
  breakEvenAnnees: number | null;
  /** Gain annuel valorisé au volume déclaré */
  gainAnnuel: number;
  /** Détail par fonction, pour présentation par typologie */
  parFonction: Array<{
    fonction: string;
    label: string;
    minutesParProduit: number;
    euroParProduit: number;
    gainAnnuel: number;
    source: string;
  }>;
  /**
   * Nature du gain : temps opérateur valorisé (pas un décaissement évité) —
   * à présenter comme telle (règle d'étiquetage honnête).
   */
  gainType: 'temps-valorise';
}

/** Lecture coût de revient (repli du mode contrefactuel sans baseline crédible). */
export interface CoutRevientResults {
  coutParProduit: number;
  capaciteAnnuelleMachine: number | null;
  /** Volume annuel à partir duquel la machine devient moins chère que le prix de référence */
  seuilRentabiliteProduitsAn: number | null;
  prixReferenceParProduit: number | null;
}

/** Résultats complets du moteur — AVANT filtrage public. */
export interface RoiEngineResults {
  mode: ComparisonMode;
  baselineLabel: string | null;
  volumeAnnuel: number;

  machine: ResolvedMachineCost;
  baselineMachineResolved: ResolvedMachineCost | null;

  // ===== Économie directe (cash, avant impôt) =====
  /** Décaissements annuels supprimés (part supprimable des lignes récurrentes) */
  cashSupprimeAnnuel: number;
  /** Décaissements ponctuels évités au mois 0 (part supprimable) */
  cashSupprimePonctuel: number;
  /** cashSupprimeAnnuel − tcoAnnuel machine */
  economieAnnuelle: number;
  /** Économie cash cumulée sur la durée d'analyse, nette de l'investissement */
  economieCumulee: number;
  /** ROI cash sur la durée d'analyse (%) */
  roiPourcent: number | null;
  breakEvenMois: number | null;

  // ===== Temps interne libéré (jamais agrégé au cash) =====
  tempsInterneActuelJours: number;
  tempsMachineJours: number | null;
  tempsLibereJours: number;
  valeurTempsLibere: number;
  /** Coût employeur indicatif du temps d'opération machine (utile si 0 temps interne actuel) */
  coutTempsMachineIndicatif: number | null;

  // ===== Capacité =====
  capaciteAnnuelleMachine: number | null;
  capaciteInsuffisante: boolean;
  /** Capacité interne déclarée ≥ 2× volume : confusion mensuel/annuel probable */
  inputsSurcapacite: boolean;

  // ===== Modes spécifiques =====
  differentiel: DifferentielResults | null;
  coutRevient: CoutRevientResults | null;

  // ===== Informatif =====
  avantageFiscalAnnuel: number;
  dureeAnalyseMois: number;
  isLeasing: boolean;
  gainTotalAnnuel: number;
  isRentable: boolean;
}

/**
 * Résultats filtrés pour le contexte LLM public (CDC §3) : aucun champ
 * permettant de retrouver un prix catalogue. Voir publicFilter.ts.
 */
export type PublicRoiResults = Omit<
  RoiEngineResults,
  'machine' | 'baselineMachineResolved' | 'differentiel'
> & {
  machine: {
    machineId: string | null;
    machineNom: string | null;
    mode: 'achat' | 'leasing';
    prixSource: 'catalogue' | 'fourni';
    capaciteJour: number | null;
    nbMois: number;
    /** Loyers annuels uniquement si la mensualité vient de l'utilisateur */
    tcoAnnuel: number | null;
    coutTotalInvestissement: number | null;
    prixMachine: number | null;
  };
  differentiel: (Omit<DifferentielResults, 'deltaInvestissement' | 'deltaInvestissementNetIS'> & {
    deltaInvestissement: number | null;
    deltaInvestissementNetIS: number | null;
  }) | null;
};
