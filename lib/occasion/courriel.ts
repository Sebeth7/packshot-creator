/**
 * Accusé de réception envoyé au prospect, APRÈS la notification interne
 * confirmée (mission S0 du 11/10/2026). Aucune promesse de disponibilité, de
 * prix ni de délai ; aucun contenu marketing, aucune relance, aucun lien vers
 * les parcours du neuf. Texte à valider par Sébastien avant tout envoi réel.
 */

const URL_CONFIDENTIALITE = 'https://www.packshot-creator.com/fr/confidentialite';

export interface AccuseCompose {
  objet: string;
  texte: string;
  html: string;
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function composerAccuseOccasion({ firstName }: { firstName: string }): AccuseCompose {
  const objet = "Votre recherche de studio Orbitvu d'occasion";
  const corps = [
    "Nous avons bien reçu votre demande de recherche d'un studio Orbitvu d'occasion.",
    'Notre équipe l’étudie et revient vers vous si un équipement correspondant à votre besoin peut vous être proposé.',
    'Ce message ne vaut ni offre, ni confirmation de disponibilité.',
  ];

  const texte = [
    `Bonjour ${firstName},`,
    '',
    ...corps,
    '',
    "L'équipe PackshotCreator.",
    '',
    `Politique de confidentialité : ${URL_CONFIDENTIALITE}`,
  ].join('\n');

  const html = [
    `<p>Bonjour ${echapper(firstName)},</p>`,
    ...corps.map((p) => `<p>${echapper(p)}</p>`),
    `<p>L'équipe PackshotCreator.</p>`,
    `<p style="font-size:12px;color:#6b7280"><a href="${URL_CONFIDENTIALITE}">Politique de confidentialité</a></p>`,
  ].join('\n');

  return { objet, texte, html };
}
