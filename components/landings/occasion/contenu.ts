import { TEXTE_OPTIN } from '@/lib/occasion/formulaires';

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
  titre: 'Soyez informé des prochaines occasions Orbitvu',
  texte: nb(
    "Vous recherchez un modèle particulier ? Laissez-nous votre adresse e-mail pour être informé lorsque de nouveaux équipements d'occasion sont proposés.",
  ),
  champs: {
    email: 'E-mail *',
    famille: 'Famille ou type de studio',
    facultatif: '(facultatif)',
    familleToutes: 'Tous les équipements Orbitvu',
  },
  /** Texte exact et versionné de la case (`lib/occasion/formulaires.ts`), suivi de la marque « obligatoire ». */
  optin: `${TEXTE_OPTIN} *`,
  bouton: "M'avertir des prochaines disponibilités",
  envoi: 'Envoi en cours…',
  mention: nb(
    "Responsable du traitement : Sysnext (PackshotCreator). Un e-mail de confirmation vous est envoyé : sans confirmation, rien n'est enregistré. Chaque message permet de vous désinscrire.",
  ),
  lienConfidentialite: 'Politique de confidentialité',
  points: [
    "Uniquement des équipements Orbitvu d'occasion, avec leur origine",
    nb('Pas de fréquence fixe : un message quand des machines arrivent'),
    'Désinscription possible depuis chaque message',
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
    texte: "Un clic sur le bouton confirme votre inscription aux disponibilités d'équipements Orbitvu d'occasion.",
    bouton: 'Confirmer mon inscription',
    inscritTitre: 'Inscription confirmée',
    inscrit: nb('Vous serez informé des prochaines disponibilités. Chaque message contiendra un lien de désinscription.'),
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
  avisTestReel: nb("Test réel en cours : l'inscription envoie un vrai e-mail de confirmation."),
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
  // Collecte fermée seulement ; pendant une fenêtre de test réel, l'avis est `avisTestReel`.
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
};

/** État de la collecte tel que la page l'affiche (calculé au rendu serveur, `collecteAffichee`). */
export interface CollecteAffichee {
  active: boolean;
  /** Fin de la fenêtre de test (ISO UTC), ou null. */
  jusqua: string | null;
}

/** « 2026-10-12 14:00 UTC » depuis une date ISO. */
export function heureUtc(iso: string): string {
  return `${iso.slice(0, 16).replace('T', ' ')} UTC`;
}

/**
 * Avis du formulaire pendant un test réel : jamais « aucune donnée transmise »
 * quand la route envoie (constat du JOURNAL de #82 du 09/10 : bandeau resté
 * « aucune demande envoyée » pendant le test).
 */
export function avisTestReel(c: CollecteAffichee): string {
  return nb(
    `Test réel en cours : cette demande envoie de vrais e-mails${c.jusqua ? `, jusqu'au ${heureUtc(c.jusqua)} (fermeture automatique ensuite)` : ''}.`,
  );
}

const FERMEE: CollecteAffichee = { active: false, jusqua: null };

/**
 * Titre et texte du bandeau de l'aperçu, selon la vue et l'état RÉEL des deux
 * collectes : recherche (`collecte`) et liste d'alerte (`alertes`), indépendantes.
 */
export function texteBandeau(
  vue: 'reel' | 'exemples',
  c: CollecteAffichee,
  alertes: CollecteAffichee = FERMEE,
): { titre: string; texte: string; test: boolean } {
  const prefixe = vue === 'exemples' ? 'Page non publiée · machines et photos d’illustration · ' : 'Page non publiée · ';
  const fin = (x: CollecteAffichee) => (x.jusqua ? ` jusqu'au ${heureUtc(x.jusqua)}, fermeture automatique ensuite` : '');
  if (c.active || alertes.active) {
    const recherche = c.active
      ? `la recherche envoie de vrais e-mails (notification interne, puis accusé au prospect)${fin(c)}`
      : 'recherche fermée (503)';
    const liste = alertes.active
      ? `liste d'alerte : l'inscription envoie un vrai e-mail de confirmation${fin(alertes)}`
      : "liste d'alerte non activée";
    return {
      titre: vue === 'exemples' ? 'Test réel en cours · exemples fictifs – aucune offre réelle' : 'Test réel en cours',
      texte: `${prefixe}${recherche} · ${liste}`,
      test: true,
    };
  }
  return {
    titre: vue === 'exemples' ? 'Exemples fictifs – aucune offre réelle' : 'Aperçu interne',
    texte: `${prefixe}recherche fermée (503) et liste d'alerte non activée : aucune donnée transmise ni enregistrée`,
    test: false,
  };
}

export const APERCU = {
  etat: nb('État du stock :'),
  vueReelle: 'Stock réel',
  vueExemples: 'Exemples fictifs (3 machines)',
  annotations: 'Annotations',
};
