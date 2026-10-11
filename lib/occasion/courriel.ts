import { urlConfidentialite, type LangueOccasion } from './langues';

/**
 * Accusé de réception envoyé au prospect, APRÈS la notification interne
 * confirmée (mission S0 du 11/10/2026), dans la langue de la page. Aucune
 * promesse de disponibilité, de prix ni de délai ; aucun contenu marketing,
 * aucune relance, aucun lien vers les parcours du neuf. Textes à valider par
 * Sébastien avant tout envoi réel.
 */

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

const TEXTES: Record<
  LangueOccasion,
  { objet: string; salutation: (prenom: string) => string; corps: string[]; signature: string; confidentialite: string }
> = {
  fr: {
    objet: "Votre recherche de studio Orbitvu d'occasion",
    salutation: (p) => `Bonjour ${p},`,
    corps: [
      "Nous avons bien reçu votre demande de recherche d'un studio Orbitvu d'occasion.",
      'Notre équipe l’étudie et revient vers vous si un équipement correspondant à votre besoin peut vous être proposé.',
      'Ce message ne vaut ni offre, ni confirmation de disponibilité.',
    ],
    signature: "L'équipe PackshotCreator.",
    confidentialite: 'Politique de confidentialité',
  },
  en: {
    objet: 'Your search for a pre-owned Orbitvu studio',
    salutation: (p) => `Hello ${p},`,
    corps: [
      'We have received your request to find a pre-owned Orbitvu studio.',
      'Our team is reviewing it and will get back to you if suitable equipment can be offered to you.',
      'This message is neither an offer nor a confirmation of availability.',
    ],
    signature: 'The PackshotCreator team',
    confidentialite: 'Privacy policy',
  },
  'de-ch': {
    objet: 'Ihre Suche nach einem Orbitvu-Occasionsstudio',
    salutation: (p) => `Guten Tag ${p}`,
    corps: [
      'Wir haben Ihre Anfrage für ein Orbitvu-Studio als Occasion erhalten.',
      'Unser Team prüft sie und meldet sich bei Ihnen, falls wir Ihnen ein passendes Gerät anbieten können.',
      'Diese Nachricht ist weder ein Angebot noch eine Bestätigung der Verfügbarkeit.',
    ],
    signature: 'Ihr PackshotCreator-Team',
    confidentialite: 'Datenschutzerklärung (auf Französisch)',
  },
};

export function composerAccuseOccasion({ firstName, langue = 'fr' }: { firstName: string; langue?: LangueOccasion }): AccuseCompose {
  const t = TEXTES[langue];
  const url = urlConfidentialite(langue);

  const texte = [t.salutation(firstName), '', ...t.corps, '', t.signature, '', `${t.confidentialite} : ${url}`].join('\n');

  const html = [
    `<p>${t.salutation(echapper(firstName))}</p>`,
    ...t.corps.map((p) => `<p>${echapper(p)}</p>`),
    `<p>${echapper(t.signature)}</p>`,
    `<p style="font-size:12px;color:#6b7280"><a href="${url}">${echapper(t.confidentialite)}</a></p>`,
  ].join('\n');

  return { objet: t.objet, texte, html };
}
