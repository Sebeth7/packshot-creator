// Composant principal
export { OPCOSimulator } from './OPCOSimulator';

// Steps
export { Step1Profil } from './steps/Step1Profil';
export { Step2Entreprise } from './steps/Step2Entreprise';
export { Step3Formation } from './steps/Step3Formation';
export { Step4Resultat } from './steps/Step4Resultat';

// Lib
export { calculerEligibilite, formatMontant, getFormationById } from './lib/eligibility';
export {
  OPCO_DATA,
  SECTEUR_TO_OPCO,
  FORMATIONS_DISPONIBLES,
  ETAPES_DEMANDE_STANDARD,
  STATUT_LABELS,
  EFFECTIF_LABELS,
  SECTEUR_LABELS,
} from './lib/constants';

// Types
export type {
  OPCOSimulatorProps,
  SimulateurState,
  ProfilUtilisateur,
  FormationSelectionnee,
  Coordonnees,
  ResultatEligibilite,
  StatutProfessionnel,
  TrancheEffectif,
  SecteurActivite,
  OPCOCode,
  OPCO,
  PlafondFinancement,
  EtapeDemandeFinancement,
  CasUtilisation,
  FormationDisponible,
} from './lib/types';
