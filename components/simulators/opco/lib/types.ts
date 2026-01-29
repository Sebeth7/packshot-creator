/**
 * Types pour le simulateur d'éligibilité OPCO
 * Basé sur les specs OPCO_Qualiopi_Specs_Simulateur.md
 */

// Statuts professionnels possibles
export type StatutProfessionnel =
  | 'salarie-cdi'
  | 'salarie-cdd'
  | 'interimaire'
  | 'dirigeant-salarie'
  | 'auto-entrepreneur'
  | 'auto-entrepreneur-avec-salaries'
  | 'demandeur-emploi'
  | 'autre';

// Tranches d'effectif entreprise
export type TrancheEffectif =
  | 'moins-11'      // < 11 salariés (TPE)
  | '11-49'         // 11-49 salariés
  | '50-249'        // 50-249 salariés
  | '250-plus';     // 250+ salariés

// Codes OPCO
export type OPCOCode =
  | 'AFDAS'
  | 'ATLAS'
  | 'AKTO'
  | 'OPCO2I'
  | 'OPCO_MOBILITES'
  | 'OPCO_EP'
  | 'OPCO_SANTE'
  | 'CONSTRUCTYS'
  | 'OPCOMMERCE'
  | 'OCAPIAT'
  | 'UNIFORMATION';

// Secteurs d'activité simplifiés
export type SecteurActivite =
  | 'culture-media'           // AFDAS
  | 'banque-assurance'        // ATLAS
  | 'services-entreprises'    // AKTO
  | 'industrie'               // OPCO 2i
  | 'transport-logistique'    // OPCO Mobilités
  | 'commerce-proximite'      // OPCO EP
  | 'e-commerce'              // OPCO EP
  | 'sante'                   // OPCO Santé
  | 'btp'                     // Constructys
  | 'commerce-distribution'   // Opcommerce
  | 'agriculture'             // OCAPIAT
  | 'social-sport'            // Uniformation
  | 'autre';

// Formations PackshotCreator disponibles
export interface FormationDisponible {
  id: string;
  nom: {
    fr: string;
    en: string;
  };
  duree: number;        // heures
  prixHT: number;       // euros
  niveau: 'initiation' | 'perfectionnement' | 'expert';
  description: {
    fr: string;
    en: string;
  };
}

// Profil utilisateur complet
export interface ProfilUtilisateur {
  statut: StatutProfessionnel;
  trancheEffectif?: TrancheEffectif;
  secteurActivite?: SecteurActivite;
  aJourCotisations?: boolean | 'ne-sais-pas';
}

// Formation sélectionnée
export interface FormationSelectionnee {
  formationId: string;
  lienProfessionnel: boolean;
  modalite: 'temps-travail' | 'hors-temps-travail' | 'mixte';
}

// Coordonnées de contact
export interface Coordonnees {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  entreprise?: string;
}

// OPCO avec ses plafonds
export interface OPCO {
  code: OPCOCode;
  nom: string;
  secteurs: SecteurActivite[];
  siteWeb: string;
  plafonds: {
    moins11: PlafondFinancement;
    de11a49: PlafondFinancement;
    plus50: PlafondFinancement;
  };
}

// Plafonds de financement
export interface PlafondFinancement {
  montantAnnuelMax?: number;
  tauxHoraire?: number;
  plafondHeures?: number;
  description?: string;
}

// Résultat d'éligibilité
export interface ResultatEligibilite {
  eligible: boolean;
  opco?: OPCO;
  montantPriseEnCharge?: number;
  montantRestant?: number;
  tauxFinancement?: number;
  raison?: string;
  messagePersonnalise: string;
  redirection?: {
    organisme: string;
    url: string;
    description: string;
  };
  prochainesEtapes?: EtapeDemandeFinancement[];
  casUtilisation: CasUtilisation;
}

// Étapes de demande de financement
export interface EtapeDemandeFinancement {
  numero: number;
  titre: string;
  description: string;
  delai?: string;
  documents?: string[];
}

// Cas d'utilisation pour les messages personnalisés
export type CasUtilisation =
  | 'tpe-financement-total'
  | 'pme-financement-partiel'
  | 'grande-entreprise-plafond'
  | 'auto-entrepreneur'
  | 'demandeur-emploi'
  | 'formation-hors-champ'
  | 'cotisations-non-a-jour'
  | 'eligible-generique';

// État complet du simulateur
export interface SimulateurState {
  step: number;
  profil: Partial<ProfilUtilisateur>;
  formation: Partial<FormationSelectionnee>;
  coordonnees: Partial<Coordonnees>;
  resultat: ResultatEligibilite | null;
}

// Props du simulateur
export interface OPCOSimulatorProps {
  locale?: 'fr' | 'en';
  className?: string;
  onComplete?: (resultat: ResultatEligibilite, coordonnees: Coordonnees) => void;
}
