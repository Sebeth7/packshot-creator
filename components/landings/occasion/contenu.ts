/**
 * Textes de la landing « Studios Orbitvu d'occasion »
 * (/fr/studios-photo-automatises/opportunites).
 *
 * Source : maquette V4.1 du 10/10/2026 (`maquette-v4-1.html`, livrables de Laurent),
 * reprise telle quelle, sans réécriture. Écarts, tous liés à la simulation des
 * formulaires (aucune donnée envoyée, GO_FORMULAIRES_REELS = NO) :
 * - avis « Simulation » dans chaque formulaire et messages de fin « simulée » ;
 * - les messages de confirmation et la mention « Votre demande est transmise
 *   directement à notre équipe commerciale » de la V4.1 restent visibles comme
 *   annotations de l'aperçu (« Texte prévu »), jamais comme un fait.
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
  ctaVoir: 'Voir les machines',
  ctaAlerteStock: "M'alerter des prochaines machines",
  ctaAlerteVide: 'Recevoir les prochaines disponibilités',
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
  lienAlerte: 'Pas votre modèle ? Être alerté',
  etiquetteFictif: 'Exemple fictif',
  libelles: { origine: 'Origine', usage: 'Usage', garantie: 'Garantie' },
  garantieCarte: 'Précisée par écrit',
  bouton: "Cette machine m'intéresse",
  annotation: "Avant publication : photos de l'unité réellement commercialisée",
};

export const ALERTES = {
  statutVide: 'Aucune machine disponible en ce moment',
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
  fin: {
    titre: 'Inscription simulée',
    texte: "Aucune donnée n'a été envoyée ni enregistrée : la liste d'attente n'est pas encore en service.",
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

export const DEMANDE = {
  surtitre: 'Être recontacté',
  titre: nb('Une machine vous intéresse ?'),
  texte: nb('Indiquez-la : un conseiller vous rappelle avec sa fiche complète et ses conditions.'),
  point: 'Un conseiller vous rappelle au sujet de la machine choisie',
  alternative: nb('Vous ne trouvez pas la machine recherchée ?'),
  lienAlerte: 'Recevoir les nouvelles disponibilités',
  champs: {
    machine: 'Machine qui vous intéresse *',
    machineVide: 'Choisir une machine',
    prenom: 'Prénom *',
    nom: 'Nom *',
    societe: 'Société *',
    email: 'E-mail professionnel *',
    telephone: 'Téléphone *',
  },
  rappel: 'Je souhaite être rappelé au sujet de cette machine.',
  rgpdAvant: "J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la ",
  rgpdLien: 'politique de confidentialité',
  rgpdApres: '. *',
  bouton: 'Être recontacté',
  mentionPrevue: nb('Texte prévu après mise en service : « Votre demande est transmise directement à notre équipe commerciale. »'),
  fin: {
    titre: 'Demande simulée',
    machine: nb('Machine choisie :'),
    texte: "Aucune donnée n'a été envoyée ni enregistrée.",
    textePrevu: nb('Texte prévu après mise en service : « Demande transmise. Un conseiller vous rappelle au sujet de la machine choisie. »'),
  },
};

export const CONTACT_GENERAL = {
  surtitre: nb('Un projet à discuter ?'),
  titre: 'Parlez-en à un conseiller',
  texte:
    "Aucune machine d'occasion n'est disponible aujourd'hui. Pour échanger sur votre projet de studio sans attendre, utilisez notre formulaire de contact général.",
  bouton: 'Contacter un conseiller',
};

export const SIMULATION = {
  avis: nb("Simulation : aucune donnée n'est envoyée ni enregistrée."),
  badge: 'Simulation',
};

export const APERCU = {
  reel: {
    titre: 'Aperçu interne',
    texte: 'Page non publiée · formulaires en simulation, aucune donnée envoyée ni enregistrée',
  },
  exemples: {
    titre: 'Exemples fictifs – aucune offre réelle',
    texte: 'Page non publiée · machines et photos d’illustration · formulaires en simulation, aucune donnée envoyée ni enregistrée',
  },
  etat: nb('État du stock :'),
  vueReelle: 'Stock réel',
  vueExemples: 'Exemples fictifs (3 machines)',
  annotations: 'Annotations',
};
