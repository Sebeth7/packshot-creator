import { OPTIN } from '@/lib/occasion/formulaires';
import type { OrigineOccasion } from '@/data/occasion/machines';
import { MESSAGES_ALERTES, type MessagesAlertes } from '@/lib/occasion/alertes/schema';
import { MESSAGES_RECHERCHE, type MessagesRecherche } from '@/lib/occasion/schema';

/**
 * Textes FRANÇAIS de la landing « Studios Orbitvu d'occasion » — version source
 * des traductions EN (`contenu-en.ts`) et DE-CH (`contenu-de-ch.ts`).
 *
 * Source : maquette V4.1 du 10/10/2026 (`maquette-v4-1.html`, livrables de Laurent),
 * reprise telle quelle pour le hero, les machines, la fiche et la garantie.
 * Mission S0 du 11/10/2026 : parcours prioritaire de RECHERCHE d'un studio
 * d'occasion, avec ou sans machine affichée. Sprint final du 11/10 : liste
 * d'alerte en double opt-in. Aucun texte n'affirme une disponibilité, un prix ou
 * un délai.
 *
 * Les annotations et le bandeau de l'aperçu sont des outils INTERNES (Preview,
 * équipe francophone) : ils restent en français dans les trois langues.
 *
 * STATUT : page non publiée (PUBLICATION_AUTORISEE = false). Copy à valider par
 * Sébastien avant toute publication (D13, D16, D42 étape 5).
 */

/** Espace insécable avant la ponctuation haute française. */
const nb = (texte: string) => texte.replace(/ ([?!:;])/g, '\u00a0$1');

export const FR = {
  META: {
    title: "Studios Orbitvu d'occasion | PackshotCreator",
    description: nb(
      "Matériels de showroom, de démonstration ou de reprise : découvrez nos équipements Orbitvu d'occasion et les informations essentielles pour choisir en confiance.",
    ),
  },

  HERO: {
    surtitre: "Équipements Orbitvu d'occasion",
    titre: "Des studios Orbitvu d'occasion, sélectionnés avec exigence.",
    texte: nb(
      "Matériels de showroom, de démonstration ou de reprise : découvrez nos équipements d'occasion et les informations essentielles pour choisir en confiance.",
    ),
    reperes: ['Origine et historique indiqués', 'État et vérifications décrits', 'Garantie précisée par écrit'],
    ctaRecherche: "Je recherche un studio d'occasion",
    ctaVoir: 'Voir les machines',
    photo: {
      src: '/images/occasion/showroom-packshotcreator.avif',
      alt: 'Showroom PackshotCreator, studios Orbitvu en place',
      credit: 'Photo réelle · showroom PackshotCreator',
      annotation: 'Lieu, date et droits à confirmer',
    },
    originesTitre: 'Origines possibles',
  },

  /** Libellés des origines (V4.1) : pastille du hero, étiquette de carte, option du formulaire. */
  ORIGINES: {
    showroom: { libelle: 'Showroom', carte: 'Ancien équipement de showroom', option: 'ancien équipement de showroom' },
    demonstration: { libelle: 'Démonstration', carte: 'Machine de démonstration', option: 'démonstration' },
    salon: { libelle: 'Salon', carte: 'Retour de salon', option: 'retour de salon' },
    location: { libelle: 'Retour de location', carte: 'Retour de location', option: 'retour de location' },
    reprise: { libelle: 'Reprise', carte: 'Reprise', option: 'reprise' },
    renouvellement: { libelle: 'Renouvellement', carte: 'Renouvellement de parc', option: 'renouvellement de parc' },
  } as Record<OrigineOccasion, { libelle: string; carte: string; option: string }>,

  MACHINES: {
    surtitre: 'Disponibles en ce moment',
    titre: "Machines d'occasion actuellement proposées",
    texte: nb(
      "La sélection évolue au fil des arrivées. Chaque fiche indique l'origine de la machine, son état et les conditions de garantie.",
    ),
    lienRecherche: 'Pas votre modèle ? Décrivez votre recherche',
    etiquetteFictif: 'Exemple fictif',
    reference: 'Réf.',
    libelles: { origine: 'Origine', usage: 'Usage', garantie: 'Garantie' },
    garantieCarte: 'Précisée par écrit',
    bouton: "Cette machine m'intéresse",
    annotation: "Avant publication : photos de l'unité réellement commercialisée",
  },

  RECHERCHE: {
    surtitre: "Recherche d'occasion",
    titre: nb("Vous recherchez un studio Orbitvu d'occasion ?"),
    texte: nb(
      "Décrivez votre besoin : notre équipe étudie votre demande et revient vers vous si un équipement d'occasion correspondant peut vous être proposé, qu'il soit affiché ou non sur cette page.",
    ),
    statutVide: 'Aucune machine affichée en ce moment',
    point: "Votre demande est étudiée par l'équipe PackshotCreator",
    alternative: nb('Être informé des prochaines arrivées ?'),
    lienAlerte: "Liste d'alerte de disponibilité",
    champs: {
      firstName: 'Prénom *',
      email: 'E-mail professionnel *',
      company: 'Entreprise *',
      besoin: 'Votre besoin *',
      besoinAide: 'Produits à photographier, application ou modèle recherché.',
      famille: 'Famille de studio',
      familleToutes: 'Tous les équipements Orbitvu',
      reference: 'Machine présélectionnée',
      referenceAucune: 'Aucune en particulier',
      telephone: 'Téléphone',
      budget: 'Budget HT indicatif',
      horizon: "Horizon d'achat",
      horizonVide: 'Non précisé',
      commentaire: 'Commentaire',
      facultatif: '(facultatif)',
    },
    mention: nb(
      "Vos informations servent uniquement à traiter votre recherche d'équipement d'occasion. Responsable du traitement : Sysnext (PackshotCreator).",
    ),
    lienConfidentialite: 'Politique de confidentialité',
    annotationMention: "Finalité ajoutée à la politique de confidentialité (article 9) ; durée de conservation à décider",
    bouton: 'Envoyer ma recherche',
    envoi: 'Envoi en cours…',
    // Collecte fermée seulement ; pendant une fenêtre de test réel, l'avis est `avisTestReel` (interne).
    avisApercu: nb("Aperçu : formulaire pas encore en service. Aucune demande n'est transmise."),
    etats: {
      recue: 'Demande reçue',
      recueAccuse: 'Merci. Votre recherche a bien été transmise à notre équipe. Un e-mail de confirmation vous a été envoyé.',
      recueSansAccuse: nb(
        "Merci. Votre recherche a bien été transmise à notre équipe. L'e-mail de confirmation n'a pas pu être envoyé : inutile de renvoyer le formulaire.",
      ),
      indisponibleTitre: 'Formulaire pas encore en service',
      indisponible: nb("Votre demande n'a pas été transmise : aucune donnée n'a été enregistrée."),
      indisponiblePrevu: nb(
        'Aperçu : route /api/occasion fermée (verrou COLLECTE_REELLE_AUTORISEE ou fenêtre de test échue), réponse 503 sans lecture de la demande.',
      ),
      erreur: nb("La demande n'a pas pu être transmise. Vos informations sont conservées dans le formulaire : vous pouvez réessayer."),
      limitation: 'Trop de demandes depuis cette connexion. Réessayez dans quelques minutes.',
      reference: "Cette machine n'est plus proposée. Votre recherche peut être envoyée sans référence.",
    },
    /** Messages de validation affichés par le formulaire. */
    messages: MESSAGES_RECHERCHE as MessagesRecherche,
    /** Message d'un champ refusé par le serveur sans motif propre à la langue. */
    invalide: 'Valeur non valide.',
  },

  FICHE: {
    surtitre: 'Choisir en confiance',
    titre: 'Ce que vous saurez sur chaque machine',
    texte: 'Chaque fiche réunit les informations utiles avant de vous décider.',
    annotation: 'Contenu de chaque fiche à alimenter avant publication',
    themes: [
      { titre: 'Origine et historique', texte: "D'où vient la machine et comment elle a été utilisée." },
      { titre: 'État et vérifications', texte: "L'état constaté et les vérifications réalisées avant la vente." },
      {
        titre: 'Logiciels et compatibilité',
        texte: "Version d'Orbitvu Station, transfert de la licence, appareils photo compatibles.",
      },
      { titre: 'Essais documentés', texte: "Images test réalisées sur la machine, lorsqu'elles existent." },
      { titre: 'Garantie applicable', texte: "Garant, durée, point de départ et exclusions, écrits avant l'achat." },
    ],
  },

  GARANTIE: {
    surtitre: 'Garantie et accompagnement',
    titre: "Des conditions claires, avant l'achat",
    texte: 'Les conditions propres à chaque machine sont remises par écrit avec la proposition.',
    blocs: [
      {
        titre: 'Garantie',
        texte: nb(
          'Garant, durée, point de départ et exclusions précisés pour chaque machine. La garantie constructeur Orbitvu est réservée au premier acheteur : elle ne suit pas la machine.',
        ),
        annotation: 'Conditions PackshotCreator à définir',
      },
      {
        titre: 'Licence Orbitvu Station',
        texte:
          "La licence perpétuelle peut être cédée avec la machine dans l'Espace économique européen, avec des frais de transfert Orbitvu. Les abonnements, dont les fonctions IA, ne se cèdent pas.",
      },
      { titre: 'Installation et formation', texte: 'Par nos équipes, sur devis.', annotation: "À confirmer pour l'occasion" },
      {
        titre: 'Distributeur officiel Orbitvu',
        texte: 'PackshotCreator est distributeur officiel des studios Orbitvu en France.',
      },
    ] as { titre: string; texte: string; annotation?: string }[],
    showroom: 'Showroom près de Lyon, visites sur rendez-vous',
    annotationShowroom: "À confirmer pour les machines d'occasion",
  },

  ALERTES: {
    surtitre: 'Nouvelles offres',
    titre: "Recevez les nouvelles offres de studios Orbitvu d'occasion",
    texte: nb(
      "Nous vous écrivons lorsque de nouvelles opportunités d'occasion sont disponibles : choisissez une famille de machines, ou suivez toutes les familles.",
    ),
    champs: {
      email: 'E-mail *',
      famille: 'Famille de machines',
      facultatif: '(facultatif)',
      familleToutes: 'Toutes les familles',
      familleAide: 'Laissez « Toutes les familles » pour recevoir toutes les nouvelles offres.',
    },
    /** Texte exact et versionné de la case (`OPTIN`), suivi de la marque « obligatoire ». */
    optin: `${OPTIN.fr.texte} *`,
    bouton: 'Recevoir les nouvelles offres',
    envoi: 'Envoi en cours…',
    mention: nb(
      "Votre adresse est utilisée par Sysnext (PackshotCreator) uniquement pour ces envois. Un e-mail de confirmation vous est envoyé : sans votre confirmation, rien n'est enregistré.",
    ),
    lienConfidentialite: 'Politique de confidentialité',
    points: [
      nb('Une famille de machines ou toutes les familles : à vous de choisir'),
      'Un e-mail lorsque de nouvelles machines sont disponibles, sans fréquence fixe',
      'Confirmation par e-mail, désinscription possible depuis chaque message',
      nb('Distincte de la newsletter : aucune autre communication'),
    ],
    // Information honnête tant que la liste n'est pas en service (aucun texte de simulation).
    fermee: nb("Les alertes ne sont pas encore ouvertes : aucune inscription n'est enregistrée pour le moment."),
    etats: {
      attenteTitre: 'Vérifiez votre boîte de réception',
      attente: nb(
        "Nous vous avons envoyé un e-mail de confirmation. Votre inscription ne sera enregistrée qu'après un clic sur le lien qu'il contient (valable 48 heures).",
      ),
      indisponibleTitre: 'Alertes pas encore ouvertes',
      indisponible: nb("Aucune inscription n'a été enregistrée : la liste d'alerte n'est pas encore en service."),
      lienRecherche: 'Décrire votre recherche dès maintenant',
      erreur: nb("L'inscription n'a pas pu être envoyée. Vos informations sont conservées : vous pouvez réessayer."),
      limitation: 'Trop de demandes depuis cette connexion. Réessayez dans quelques minutes.',
    },
    confirmation: {
      titre: 'Confirmer votre inscription',
      texte: "Un clic sur le bouton confirme votre inscription aux nouvelles offres de studios Orbitvu d'occasion.",
      bouton: 'Confirmer mon inscription',
      inscritTitre: 'Inscription confirmée',
      inscrit: nb(
        "Vous recevrez les nouvelles offres de studios Orbitvu d'occasion lorsqu'elles seront disponibles. Chaque message contiendra un lien de désinscription.",
      ),
      dejaInscritTitre: 'Inscription déjà confirmée',
      dejaInscrit: nb("Cette adresse reçoit déjà les alertes Orbitvu d'occasion : rien n'a été modifié."),
      desinscritTitre: 'Adresse désinscrite',
      desinscrit: nb(
        "Cette adresse s'est désinscrite : elle n'est pas réinscrite automatiquement. Pour recevoir de nouveau les alertes, écrivez-nous.",
      ),
      expire: nb('Ce lien de confirmation a expiré : inscrivez-vous de nouveau avec le formulaire.'),
      invalide: nb("Ce lien n'est pas valide : inscrivez-vous de nouveau avec le formulaire."),
      erreur: nb("La demande n'a pas pu aboutir : rien n'a été modifié, vous pouvez réessayer."),
    },
    desinscription: {
      titre: "Se désinscrire des alertes Orbitvu d'occasion",
      texte: 'Vos autres préférences (newsletter, autres messages) ne sont pas modifiées.',
      bouton: 'Me désinscrire',
      faitTitre: 'Désinscription enregistrée',
      fait: nb("Vous ne recevrez plus les alertes Orbitvu d'occasion. Aucune autre communication n'est modifiée."),
    },
    envoiJeton: 'Traitement en cours…',
    reessayer: 'Réessayer',
    revenirFormulaire: 'Revenir au formulaire',
    avisTestReel: nb("Test réel en cours : l'inscription envoie un vrai e-mail de confirmation."),
    /** Messages de validation affichés par le formulaire. */
    messages: MESSAGES_ALERTES as MessagesAlertes,
  },

  /** Bandeau de l'aperçu interne : outil d'équipe, en français dans les trois langues. */
  APERCU: {
    etat: nb('État du stock :'),
    vueReelle: 'Stock réel',
    vueExemples: 'Exemples fictifs (3 machines)',
    annotations: 'Annotations',
  },
};

export type ContenuOccasion = typeof FR;
