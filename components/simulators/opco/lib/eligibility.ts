import type {
  ProfilUtilisateur,
  FormationSelectionnee,
  ResultatEligibilite,
  CasUtilisation,
  TrancheEffectif,
  OPCO,
  EtapeDemandeFinancement,
} from './types';
import {
  OPCO_DATA,
  SECTEUR_TO_OPCO,
  FORMATIONS_DISPONIBLES,
  ETAPES_DEMANDE_STANDARD,
} from './constants';

/**
 * Calcule l'éligibilité d'un utilisateur au financement OPCO
 * Basé sur l'arbre de décision du document OPCO_Qualiopi_Specs_Simulateur.md
 */
export function calculerEligibilite(
  profil: ProfilUtilisateur,
  formation: FormationSelectionnee,
  locale: 'fr' | 'en' = 'fr'
): ResultatEligibilite {
  // 1. Vérification du statut professionnel
  if (!estSalarieEligible(profil.statut)) {
    return getResultatNonEligibleStatut(profil.statut, locale);
  }

  // 2. Vérification des cotisations
  if (profil.aJourCotisations === false) {
    return getResultatCotisationsNonAJour(locale);
  }

  // 3. Vérification du lien professionnel
  if (!formation.lienProfessionnel) {
    return getResultatFormationHorsChamp(locale);
  }

  // 4. Identification de l'OPCO
  const opcoCode = profil.secteurActivite
    ? SECTEUR_TO_OPCO[profil.secteurActivite]
    : 'OPCO_EP'; // Par défaut

  const opco = OPCO_DATA[opcoCode];

  // 5. Calcul du financement
  const formationDetails = FORMATIONS_DISPONIBLES.find(f => f.id === formation.formationId);
  if (!formationDetails) {
    return getResultatEligibleGenerique(opco, locale);
  }

  const { montantPriseEnCharge, tauxFinancement, casUtilisation } = calculerMontantFinancement(
    opco,
    profil.trancheEffectif || 'moins-11',
    formationDetails.prixHT
  );

  const montantRestant = formationDetails.prixHT - montantPriseEnCharge;

  return {
    eligible: true,
    opco,
    montantPriseEnCharge,
    montantRestant: Math.max(0, montantRestant),
    tauxFinancement,
    messagePersonnalise: getMessagePersonnalise(casUtilisation, locale, opco, tauxFinancement),
    prochainesEtapes: ETAPES_DEMANDE_STANDARD.map(etape => ({
      ...etape,
      titre: locale === 'en' ? translateEtapeTitre(etape.titre) : etape.titre,
      description: locale === 'en' ? translateEtapeDescription(etape.description) : etape.description,
    })),
    casUtilisation,
  };
}

/**
 * Vérifie si le statut permet l'éligibilité OPCO
 */
function estSalarieEligible(statut: ProfilUtilisateur['statut']): boolean {
  const statutsEligibles = [
    'salarie-cdi',
    'salarie-cdd',
    'interimaire',
    'dirigeant-salarie',
    'auto-entrepreneur-avec-salaries', // Seulement pour leurs salariés
  ];
  return statutsEligibles.includes(statut);
}

/**
 * Calcule le montant de prise en charge selon l'OPCO et l'effectif
 */
function calculerMontantFinancement(
  opco: OPCO,
  trancheEffectif: TrancheEffectif,
  prixFormation: number
): { montantPriseEnCharge: number; tauxFinancement: number; casUtilisation: CasUtilisation } {
  let plafond = opco.plafonds.moins11;
  let casUtilisation: CasUtilisation = 'tpe-financement-total';

  switch (trancheEffectif) {
    case 'moins-11':
      plafond = opco.plafonds.moins11;
      casUtilisation = 'tpe-financement-total';
      break;
    case '11-49':
      plafond = opco.plafonds.de11a49;
      casUtilisation = 'pme-financement-partiel';
      break;
    case '50-249':
    case '250-plus':
      plafond = opco.plafonds.plus50;
      casUtilisation = 'grande-entreprise-plafond';
      break;
  }

  const montantMax = plafond.montantAnnuelMax || 5000;
  const montantPriseEnCharge = Math.min(prixFormation, montantMax);
  const tauxFinancement = Math.round((montantPriseEnCharge / prixFormation) * 100);

  // Ajuster le cas d'utilisation selon le taux
  if (tauxFinancement >= 100) {
    casUtilisation = 'tpe-financement-total';
  } else if (tauxFinancement >= 50) {
    casUtilisation = 'pme-financement-partiel';
  } else {
    casUtilisation = 'grande-entreprise-plafond';
  }

  return { montantPriseEnCharge, tauxFinancement, casUtilisation };
}

/**
 * Résultat pour les statuts non éligibles (auto-entrepreneur, demandeur d'emploi)
 */
function getResultatNonEligibleStatut(
  statut: ProfilUtilisateur['statut'],
  locale: 'fr' | 'en'
): ResultatEligibilite {
  if (statut === 'auto-entrepreneur') {
    return {
      eligible: false,
      raison: 'statut_non_eligible',
      messagePersonnalise: locale === 'fr'
        ? 'Les auto-entrepreneurs sans salarié ne peuvent pas bénéficier du financement OPCO. Vous cotisez à un FAF (Fonds d\'Assurance Formation) qui peut financer vos formations.'
        : 'Self-employed individuals without employees cannot benefit from OPCO funding. You contribute to a Training Insurance Fund (FAF) that can finance your training.',
      redirection: {
        organisme: 'FAF',
        url: 'https://www.fifpl.fr',
        description: locale === 'fr'
          ? 'Selon votre activité : FAFCEA (artisans), AGEFICE (commerçants), FIFPL (professions libérales)'
          : 'Depending on your activity: FAFCEA (craftsmen), AGEFICE (traders), FIFPL (liberal professions)',
      },
      casUtilisation: 'auto-entrepreneur',
    };
  }

  if (statut === 'demandeur-emploi') {
    return {
      eligible: false,
      raison: 'statut_non_eligible',
      messagePersonnalise: locale === 'fr'
        ? 'Les demandeurs d\'emploi ne sont pas éligibles au financement OPCO, mais vous pouvez bénéficier d\'autres dispositifs via France Travail ou votre CPF.'
        : 'Job seekers are not eligible for OPCO funding, but you can benefit from other schemes via France Travail or your CPF.',
      redirection: {
        organisme: 'France Travail',
        url: 'https://francetravail.fr',
        description: locale === 'fr'
          ? 'AIF, AFPR, POE ou votre CPF personnel'
          : 'Individual Training Aid, Pre-recruitment Training, or your personal CPF',
      },
      casUtilisation: 'demandeur-emploi',
    };
  }

  return {
    eligible: false,
    raison: 'statut_non_eligible',
    messagePersonnalise: locale === 'fr'
      ? 'Votre situation ne permet pas de bénéficier du financement OPCO. Contactez-nous pour étudier d\'autres options.'
      : 'Your situation does not allow for OPCO funding. Contact us to explore other options.',
    casUtilisation: 'auto-entrepreneur',
  };
}

/**
 * Résultat pour cotisations non à jour
 */
function getResultatCotisationsNonAJour(locale: 'fr' | 'en'): ResultatEligibilite {
  return {
    eligible: false,
    raison: 'cotisations_non_a_jour',
    messagePersonnalise: locale === 'fr'
      ? 'Votre entreprise doit être à jour de ses cotisations formation auprès de l\'URSSAF pour bénéficier du financement OPCO. Régularisez votre situation puis revenez effectuer cette simulation.'
      : 'Your company must be up to date with its training contributions to URSSAF to benefit from OPCO funding. Regularize your situation and then come back to run this simulation.',
    casUtilisation: 'cotisations-non-a-jour',
  };
}

/**
 * Résultat pour formation sans lien professionnel
 */
function getResultatFormationHorsChamp(locale: 'fr' | 'en'): ResultatEligibilite {
  return {
    eligible: false,
    raison: 'formation_hors_champ',
    messagePersonnalise: locale === 'fr'
      ? 'Cette formation doit avoir un lien direct avec votre activité professionnelle pour être financée par l\'OPCO. Vous pouvez utiliser votre CPF personnel ou contactez-nous pour étudier d\'autres options.'
      : 'This training must be directly related to your professional activity to be funded by the OPCO. You can use your personal CPF or contact us to explore other options.',
    redirection: {
      organisme: 'Mon Compte Formation',
      url: 'https://moncompteformation.gouv.fr',
      description: locale === 'fr'
        ? 'Utilisez votre CPF pour financer cette formation'
        : 'Use your CPF to fund this training',
    },
    casUtilisation: 'formation-hors-champ',
  };
}

/**
 * Résultat éligible générique (sans formation spécifique)
 */
function getResultatEligibleGenerique(opco: OPCO, locale: 'fr' | 'en'): ResultatEligibilite {
  return {
    eligible: true,
    opco,
    messagePersonnalise: locale === 'fr'
      ? `Vous êtes potentiellement éligible au financement OPCO via ${opco.nom}. Contactez-nous pour une étude personnalisée de votre dossier.`
      : `You are potentially eligible for OPCO funding through ${opco.nom}. Contact us for a personalized review of your file.`,
    prochainesEtapes: ETAPES_DEMANDE_STANDARD,
    casUtilisation: 'eligible-generique',
  };
}

/**
 * Messages personnalisés selon le cas d'utilisation
 */
function getMessagePersonnalise(
  cas: CasUtilisation,
  locale: 'fr' | 'en',
  opco?: OPCO,
  taux?: number
): string {
  const messages: Record<CasUtilisation, { fr: string; en: string }> = {
    'tpe-financement-total': {
      fr: `Excellente nouvelle ! Votre entreprise de moins de 11 salariés peut bénéficier d'une prise en charge à ${taux}% via ${opco?.nom || 'votre OPCO'}. Les TPE bénéficient des plafonds les plus favorables.`,
      en: `Great news! Your company with less than 11 employees can benefit from ${taux}% coverage through ${opco?.nom || 'your OPCO'}. Small businesses benefit from the most favorable ceilings.`,
    },
    'pme-financement-partiel': {
      fr: `Bonne nouvelle ! Votre formation peut être financée à ${taux}% par ${opco?.nom || 'votre OPCO'}. Le reste peut être couvert par le plan de formation de votre entreprise ou un co-financement CPF.`,
      en: `Good news! Your training can be funded at ${taux}% by ${opco?.nom || 'your OPCO'}. The remainder can be covered by your company's training plan or CPF co-financing.`,
    },
    'grande-entreprise-plafond': {
      fr: `Votre entreprise peut bénéficier d'une prise en charge OPCO plafonnée à ${taux}%. Les grandes entreprises disposent généralement de budgets formation dédiés pour compléter.`,
      en: `Your company can benefit from OPCO coverage capped at ${taux}%. Large companies usually have dedicated training budgets to supplement.`,
    },
    'auto-entrepreneur': {
      fr: `En tant qu'auto-entrepreneur, vous pouvez bénéficier d'un financement via votre FAF (Fonds d'Assurance Formation). Contactez l'AGEFICE, le FIFPL ou le FAFCEA selon votre activité.`,
      en: `As a self-employed person, you can benefit from funding through your FAF (Training Insurance Fund). Contact AGEFICE, FIFPL or FAFCEA depending on your activity.`,
    },
    'demandeur-emploi': {
      fr: `En tant que demandeur d'emploi, le financement OPCO n'est pas accessible directement. Vous pouvez utiliser votre CPF ou solliciter France Travail pour une aide individuelle à la formation (AIF).`,
      en: `As a job seeker, OPCO funding is not directly available. You can use your CPF or request France Travail for individual training assistance (AIF).`,
    },
    'formation-hors-champ': {
      fr: `Cette formation ne correspond pas à un lien direct avec votre activité professionnelle. Le financement OPCO nécessite un lien professionnel. Vous pouvez utiliser votre CPF personnel.`,
      en: `This training is not directly related to your professional activity. OPCO funding requires a professional link. You can use your personal CPF.`,
    },
    'cotisations-non-a-jour': {
      fr: `Le financement OPCO nécessite que l'entreprise soit à jour de ses cotisations URSSAF. Régularisez votre situation pour bénéficier de la prise en charge.`,
      en: `OPCO funding requires the company to be up to date with URSSAF contributions. Regularize your situation to benefit from coverage.`,
    },
    'eligible-generique': {
      fr: `Vous êtes éligible au financement OPCO. Contactez-nous pour une estimation précise de votre prise en charge.`,
      en: `You are eligible for OPCO funding. Contact us for a precise estimate of your coverage.`,
    },
  };

  return messages[cas]?.[locale] || messages['eligible-generique'][locale];
}

/**
 * Traductions simples pour les étapes (version anglaise)
 */
function translateEtapeTitre(titre: string): string {
  const traductions: Record<string, string> = {
    'Identifier votre OPCO': 'Identify your OPCO',
    'Constituer le dossier': 'Prepare the file',
    'Déposer la demande': 'Submit the application',
    'Attendre la validation': 'Wait for validation',
    'Suivre la formation': 'Attend the training',
    'Transmettre les justificatifs': 'Submit supporting documents',
  };
  return traductions[titre] || titre;
}

function translateEtapeDescription(description: string): string {
  const traductions: Record<string, string> = {
    'Confirmez votre rattachement auprès de votre service RH ou sur le site de l\'OPCO.':
      'Confirm your affiliation with your HR department or on the OPCO website.',
    'Rassemblez les documents nécessaires pour la demande.':
      'Gather the necessary documents for the application.',
    'Soumettez votre demande en ligne sur l\'espace de votre OPCO.':
      'Submit your application online on your OPCO portal.',
    'L\'OPCO étudie votre dossier et vous envoie l\'accord de prise en charge.':
      'The OPCO reviews your file and sends you the funding agreement.',
    'Participez à la formation et conservez les justificatifs (émargement, attestation).':
      'Attend the training and keep the supporting documents (attendance, certificate).',
    'Envoyez les documents de fin de formation pour déclencher le paiement.':
      'Send the end-of-training documents to trigger payment.',
  };
  return traductions[description] || description;
}

/**
 * Obtient une formation par son ID
 */
export function getFormationById(id: string): FormationSelectionnee | undefined {
  const formation = FORMATIONS_DISPONIBLES.find(f => f.id === id);
  if (!formation) return undefined;
  return {
    formationId: formation.id,
    lienProfessionnel: true,
    modalite: 'temps-travail',
  };
}

/**
 * Formate un montant en euros
 */
export function formatMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(montant);
}
