/**
 * Textes de la landing catalogue Orbitvu All-in-One — repris sans modification du
 * copydeck V2 du 02/10/2026 (kit d'intégration, 05_SPECIFICATIONS/01_COPYDECK_FR_V2.md).
 *
 * STATUT : PROPOSÉ — relecture métier de Sébastien avant publication (D42, étape 5).
 * Page française unique, commune à la France et à la Suisse : ces textes ne sont
 * pas dans messages/*.json, faute de version EN ou de-ch.
 *
 * Typographie : `insecables` remplace l'espace avant « ? », « ! », « : » et « ; »
 * par une espace insécable, pour qu'aucun signe ne passe seul à la ligne. Le texte
 * du copydeck n'est pas modifié.
 */

/** Espace insécable avant la ponctuation haute française. */
export function insecables(texte: string): string {
  return texte.replace(/ ([?!:;])/g, '\u00A0$1');
}

function typographie<T>(valeur: T): T {
  if (typeof valeur === 'string') return insecables(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => typographie(v)) as T;
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([cle, v]) => [cle, typographie(v)])) as T;
  }
  return valeur;
}

export const TELEPHONES = {
  FR: { pays: 'France', affiche: '+33 (0)1 47 42 66 66', href: 'tel:+33147426666' },
  CH: { pays: 'Suisse', affiche: '+41 44 580 43 84', href: 'tel:+41445804384' },
} as const;

export const META = {
  title: 'Catalogue Orbitvu All-in-One 2026 | PackshotCreator',
  description:
    'Quel studio Orbitvu pour vos produits ? Découvrez le catalogue All-in-One : 28 pages, 10 systèmes et leurs applications. Téléchargement France et Suisse.',
} as const;

export const HERO = typographie({
  surtitre: 'CATALOGUE ORBITVU · ÉDITION 2026',
  h1: 'Quel studio Orbitvu pour vos produits ? Découvrez le catalogue All-in-One.',
  valeur:
    'Du bijou au mobilier, explorez dix systèmes de photographie produit automatisée, leurs applications et leurs caractéristiques dans un seul catalogue.',
  reperes: ['28 pages', '10 systèmes', 'PDF en français'],
  signature: 'PackshotCreator, distributeur officiel Orbitvu en France et en Suisse.',
  altCouverture: 'Couverture du catalogue Orbitvu All-in-One, édition française 2026, sur fond sombre.',
} as const);

export const FORMULAIRE = typographie({
  titre: 'Recevoir le catalogue',
  promesse: 'Recevez automatiquement le lien pour télécharger le catalogue.',
  prenom: { label: 'Prénom', placeholder: 'Votre prénom' },
  email: { label: 'E-mail professionnel', placeholder: 'prenom@entreprise.com' },
  entreprise: { label: 'Entreprise', placeholder: 'Nom de votre entreprise' },
  pays: { label: 'Pays', options: [{ valeur: 'FR', libelle: 'France' }, { valeur: 'CH', libelle: 'Suisse' }] },
  produits: { label: 'Vos produits', placeholder: 'Bijoux, mode, mobilier…' },
  facultatif: '(facultatif)',
  consultant: 'Je souhaite être contacté(e) par un consultant PackshotCreator.',
  cta: 'Recevoir le catalogue',
  reassurance: 'Accès immédiat au catalogue après validation du formulaire. Aucune démonstration obligatoire.',
  donnees: {
    avant:
      'Vos coordonnées sont utilisées pour traiter votre demande et vous envoyer le lien du catalogue. Un consultant vous contacte uniquement si vous en faites la demande. Consultez notre ',
    lien: 'politique de confidentialité',
    apres: '.',
  },
  question: 'Une question ?',
} as const);

export const ETATS = typographie({
  envoi: 'Préparation de votre catalogue…',
  succesTitre: 'Votre catalogue est prêt.',
  succesTexte: 'Vous pouvez le consulter dès maintenant.',
  ouvrir: 'Ouvrir le catalogue',
  emailConfirme: 'Le lien de téléchargement vous a également été envoyé par e-mail.',
  emailNonConfirme:
    "Votre catalogue est disponible ci-dessous. Nous n'avons pas pu confirmer l'envoi du lien par e-mail.",
  consultantAccepte: "Votre demande d'échange avec un consultant PackshotCreator a été prise en compte.",
  consultantInvitation: "Envie d'en parler ? Contactez un consultant PackshotCreator.",
  erreur: "Votre demande n'a pas pu être finalisée. Réessayez dans quelques instants.",
  reessayer: 'Réessayer',
  limitation:
    'Plusieurs tentatives ont été détectées. Merci de réessayer un peu plus tard ou de nous contacter par téléphone.',
  indisponible: 'Le fichier est momentanément indisponible. Réessayez ou contactez-nous.',
} as const);

export const INTERIEUR = typographie({
  surtitre: "À L'INTÉRIEUR",
  h2: 'Feuilletez le catalogue avant de le recevoir.',
  intro: "Un aperçu de la gamme, des images et de la matrice qui aide à s'orienter parmi les systèmes Orbitvu.",
  microCta: 'Recevoir le catalogue complet',
} as const);

export const CONTENU_CATALOGUE = typographie({
  surtitre: 'CE QUE VOUS Y TROUVEREZ',
  h2: "Une vue d'ensemble pour commencer à choisir.",
  lignes: [
    {
      titre: 'La gamme selon vos produits',
      texte:
        "Une matrice présente dix systèmes et les rapproche de différentes catégories de produits et d'applications.",
      pages: 'Pages 6–7.',
    },
    {
      titre: 'Des fiches concrètes',
      texte:
        'Pour chaque système : les caractéristiques présentées par Orbitvu, les gabarits concernés et des exemples de prises de vue.',
      pages: 'Pages 8–25.',
    },
    {
      titre: "Du produit à l'image",
      texte:
        "Cinq étapes pour visualiser le workflow Orbitvu Station, de l'identification du produit à la publication, puis des exemples de réalisations.",
      pages: 'Pages 4–5 et 26–27.',
    },
  ],
} as const);

export const FINAL = typographie({
  catalogue: {
    surtitre: 'LE CATALOGUE ALL-IN-ONE',
    titre: 'Prêt à explorer la gamme ?',
    texte: 'Recevez le catalogue Orbitvu en français et parcourez-le à votre rythme.',
    bouton: 'Recevoir le catalogue',
  },
  consultant: {
    surtitre: 'UN INTERLOCUTEUR À VOTRE ÉCOUTE',
    titre: 'Vous souhaitez en parler ?',
    texte:
      'Un consultant PackshotCreator peut vous aider à vous orienter dans la gamme selon les produits que vous photographiez.',
    zones: 'Zones desservies : France et Suisse.',
    demo: 'Demander une démonstration',
  },
} as const);
