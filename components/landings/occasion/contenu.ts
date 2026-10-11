/**
 * Textes de la landing « Studios Orbitvu d'occasion »
 * (/fr/studios-photo-automatises/opportunites).
 *
 * Source : maquette V4.1 du 10/10/2026 (`maquette-v4-1.html`, livrables de Laurent),
 * reprise telle quelle pour le hero, les machines, la fiche et la garantie.
 *
 * Mission S0 du 11/10/2026 (GO_CODE de Laurent) : parcours prioritaire de
 * RECHERCHE d'un studio d'occasion, avec ou sans machine affichée (fait métier de
 * Laurent : des machines peuvent être recherchées à la demande). Textes
 * nouveaux : CTA du hero, section `RECHERCHE`, états du formulaire, message de la
 * liste d'alerte non activée. Copy finale à valider ; aucun texte n'affirme une
 * disponibilité, un prix ou un délai. Bloc « contact général » de la V4.1 retiré :
 * la recherche le remplace.
 *
 * STATUT : page non publiée (PUBLICATION_AUTORISEE = false). Copy à valider par
 * Sébastien avant toute publication (D13, D16, D42 étape 5). Page française
 * seule : ces textes ne sont pas dans messages/*.json.
 */

/** Espace insécable avant la ponctuation haute française. */
const nb = (texte: string) => texte.replace(/ ([?!:;])/g, ' $1');

export const META = {
  title: "Studios Orbitvu d'occasion | PackshotCreator",
  description: nb(
    "Matériels de showroom, de démonstration ou de reprise : découvrez nos équipements Orbitvu d'occasion et les informations essentielles pour choisir en confiance.",
  ),
};

export const HERO = {
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
};

export const MACHINES = {
  surtitre: 'Disponibles en ce moment',
  titre: "Machines d'occasion actuellement proposées",
  texte: nb(
    "La sélection évolue au fil des arrivées. Chaque fiche indique l'origine de la machine, son état et les conditions de garantie.",
  ),
  lienRecherche: 'Pas votre modèle ? Décrivez votre recherche',
  etiquetteFictif: 'Exemple fictif',
  libelles: { origine: 'Origine', usage: 'Usage', garantie: 'Garantie' },
  garantieCarte: 'Précisée par écrit',
  bouton: "Cette machine m'intéresse",
  annotation: "Avant publication : photos de l'unité réellement commercialisée",
};

export const ALERTES = {
  surtitre: 'Alertes de disponibilité',
  titre: 'Ne manquez pas les prochaines machines disponibles.',
  texte:
    "Les équipements Orbitvu d'occasion arrivent au fil des renouvellements de showroom, des démonstrations et des reprises. Inscrivez-vous pour recevoir les nouvelles disponibilités et découvrir les machines qui pourraient vous intéresser.",
  champs: {
    email: 'E-mail professionnel *',
    prenom: 'Prénom',
    famille: 'Famille ou modèle recherché',
    facultatif: '(facultatif)',
    familleToutes: 'Tous les équipements Orbitvu',
  },
  optin:
    "Je souhaite recevoir par e-mail les nouvelles disponibilités d'équipements Orbitvu d'occasion. Cette inscription est indépendante de la newsletter et ne m'abonne à aucune autre communication. *",
  bouton: 'Recevoir les nouvelles disponibilités',
  mention: nb(
    'Responsable du traitement : Sysnext (PackshotCreator). Chaque e-mail contient un lien pour vous désinscrire ou modifier vos préférences.',
  ),
  lienConfidentialite: 'Politique de confidentialité',
  annotationMention: "Durée de conservation et outil d'envoi à définir",
  points: [
    "Uniquement des équipements Orbitvu d'occasion, avec leur origine",
    nb('Pas de fréquence fixe : un message quand des machines arrivent'),
    'Désinscription et préférences accessibles dans chaque e-mail',
  ],
  avis: nb("Liste d'alerte pas encore ouverte : aucune inscription n'est enregistrée."),
  // Liste NON ACTIVÉE (mission S0) : jamais de message de succès, en Preview comme en production.
  fermee: {
    titre: 'Alertes pas encore ouvertes',
    texte: "Aucune inscription n'a été enregistrée : la liste d'alerte n'est pas encore en service.",
    lienRecherche: 'Décrire votre recherche dès maintenant',
    textePrevu: nb(
      'Texte prévu après mise en service : « Votre inscription est prise en compte. Vous serez informé des nouvelles disponibilités. Vous pourrez vous désinscrire ou modifier vos préférences depuis chaque e-mail. »',
    ),
  },
};

export const FICHE = {
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
};

export const GARANTIE = {
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
  ],
  showroom: 'Showroom près de Lyon, visites sur rendez-vous',
  annotationShowroom: "À confirmer pour les machines d'occasion",
};

export const RECHERCHE = {
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
  annotationMention: "Finalité « demandes Occasion » à ajouter à la politique de confidentialité avant toute collecte réelle",
  bouton: 'Envoyer ma recherche',
  envoi: 'Envoi en cours…',
  avisApercu: nb("Aperçu : formulaire pas encore en service. Aucune demande n'est transmise."),
  etats: {
    recue: 'Demande reçue',
    recueAccuse: 'Merci. Votre recherche a bien été transmise à notre équipe. Un e-mail de confirmation vous a été envoyé.',
    recueSansAccuse: nb(
      "Merci. Votre recherche a bien été transmise à notre équipe. L'e-mail de confirmation n'a pas pu être envoyé : inutile de renvoyer le formulaire.",
    ),
    indisponibleTitre: 'Formulaire pas encore en service',
    indisponible: nb("Votre demande n'a pas été transmise : aucune donnée n'a été enregistrée."),
    indisponiblePrevu: nb('Aperçu : route /api/occasion fermée (COLLECTE_REELLE_AUTORISEE = false), réponse 503 sans lecture de la demande.'),
    erreur: nb("La demande n'a pas pu être transmise. Vos informations sont conservées dans le formulaire : vous pouvez réessayer."),
    limitation: 'Trop de demandes depuis cette connexion. Réessayez dans quelques minutes.',
    reference: "Cette machine n'est plus proposée. Votre recherche peut être envoyée sans référence.",
  },
};

export const APERCU = {
  reel: {
    titre: 'Aperçu interne',
    texte: "Page non publiée · formulaires fermés : aucune donnée transmise ni enregistrée",
  },
  exemples: {
    titre: 'Exemples fictifs – aucune offre réelle',
    texte: 'Page non publiée · machines et photos d’illustration · formulaires fermés : aucune donnée transmise ni enregistrée',
  },
  etat: nb('État du stock :'),
  vueReelle: 'Stock réel',
  vueExemples: 'Exemples fictifs (3 machines)',
  annotations: 'Annotations',
};
