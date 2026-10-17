import { libelleFamille } from '../formulaires';
import { cheminOccasion, type LangueOccasion } from '../langues';

/**
 * E-mails de la liste d'alerte, dans la langue de la page. Deux envois seulement,
 * aucune offre, aucune campagne (GO_CAMPAGNE_EMAIL = NO) :
 * 1. la demande de confirmation (double opt-in), sans lien de désinscription :
 *    le destinataire n'est pas encore inscrit ;
 * 2. après le clic de confirmation qui crée l'inscription, un unique e-mail
 *    « Inscription confirmée » portant le lien personnel de désinscription
 *    (décision de Laurent du 14/10/2026) : un inscrit peut se désinscrire seul
 *    sans attendre un bulletin d'arrivage.
 *
 * Le jeton est placé dans le FRAGMENT de l'URL (`#confirmer-alerte=…`) : il n'est
 * pas transmis au serveur qui sert la page, donc absent de ses journaux. La page
 * affiche un bouton ; seul ce clic confirme (un robot de messagerie qui ouvre le
 * lien ne confirme rien).
 */

export const ANCRE_CONFIRMATION = 'confirmer-alerte';
export const ANCRE_DESINSCRIPTION = 'desinscrire-alerte';

export function lienConfirmation(base: string, jeton: string, langue: LangueOccasion = 'fr'): string {
  return `${base.replace(/\/+$/, '')}${cheminOccasion(langue)}#${ANCRE_CONFIRMATION}=${jeton}`;
}

/**
 * Lien de désinscription, placé dans l'e-mail « Inscription confirmée » et dans
 * chaque bulletin d'arrivage (`lib/occasion/bulletin/**`).
 */
export function lienDesinscription(base: string, jeton: string, langue: LangueOccasion = 'fr'): string {
  return `${base.replace(/\/+$/, '')}${cheminOccasion(langue)}#${ANCRE_DESINSCRIPTION}=${jeton}`;
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const FORMATS: Record<LangueOccasion, { locale: string; fuseau: string }> = {
  fr: { locale: 'fr-FR', fuseau: 'Europe/Paris' },
  en: { locale: 'en-GB', fuseau: 'Europe/Paris' },
  'de-ch': { locale: 'de-CH', fuseau: 'Europe/Zurich' },
};

function date(ms: number, langue: LangueOccasion): string {
  const f = FORMATS[langue];
  return new Date(ms).toLocaleString(f.locale, { timeZone: f.fuseau, dateStyle: 'long', timeStyle: 'short' });
}

const TEXTES: Record<
  LangueOccasion,
  {
    objet: string;
    salutation: string;
    tous: string;
    demande: (famille: string) => string;
    consigne: string;
    bouton: string;
    expiration: (d: string) => string;
    independance: string;
    desinscription: string;
    ignorer: string;
    signature: string;
  }
> = {
  fr: {
    objet: "Confirmez votre inscription aux nouvelles offres Orbitvu d'occasion",
    salutation: 'Bonjour,',
    tous: 'toutes les familles',
    demande: (f) => `Vous avez demandé à recevoir par e-mail les nouvelles offres de studios Orbitvu d'occasion (${f}).`,
    consigne: 'Pour confirmer votre inscription, ouvrez ce lien puis cliquez sur « Confirmer mon inscription » :',
    bouton: 'Confirmer mon inscription',
    expiration: (d) => `Ce lien expire le ${d}. Sans confirmation, aucune inscription n'est enregistrée.`,
    independance: 'Cette liste est indépendante de la newsletter : elle ne vous abonne à aucune autre communication.',
    desinscription: 'Chaque message vous permettra de vous désinscrire.',
    ignorer: "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
    signature: 'PackshotCreator',
  },
  en: {
    objet: 'Confirm your subscription to new pre-owned Orbitvu offers',
    salutation: 'Hello,',
    tous: 'all families',
    demande: (f) => `You asked to receive emails about new offers on pre-owned Orbitvu studios (${f}).`,
    consigne: 'To confirm your subscription, open this link and click “Confirm my subscription”:',
    bouton: 'Confirm my subscription',
    expiration: (d) => `This link expires on ${d}. Without confirmation, no subscription is recorded.`,
    independance: 'This list is separate from the newsletter: it does not sign you up for any other communication.',
    desinscription: 'Every message will let you unsubscribe.',
    ignorer: 'If you did not make this request, please ignore this message.',
    signature: 'PackshotCreator',
  },
  'de-ch': {
    objet: 'Bitte bestätigen Sie Ihre Anmeldung für neue Orbitvu-Occasionsangebote',
    salutation: 'Guten Tag',
    tous: 'alle Familien',
    demande: (f) => `Sie möchten per E-Mail neue Angebote für Orbitvu-Studios als Occasion erhalten (${f}).`,
    consigne: 'Um Ihre Anmeldung zu bestätigen, öffnen Sie diesen Link und klicken Sie auf «Anmeldung bestätigen»:',
    bouton: 'Anmeldung bestätigen',
    expiration: (d) => `Dieser Link ist bis ${d} gültig. Ohne Bestätigung wird keine Anmeldung gespeichert.`,
    independance: 'Diese Liste ist vom Newsletter unabhängig: Sie werden für keine weiteren Mitteilungen angemeldet.',
    desinscription: 'Jede künftige E-Mail mit neuen Angeboten enthält einen Abmeldelink.',
    ignorer: 'Falls Sie diese Anfrage nicht gestellt haben, können Sie diese Nachricht ignorieren.',
    signature: 'PackshotCreator',
  },
};

export interface CourrielConfirmation {
  objet: string;
  texte: string;
  html: string;
}

export function composerConfirmationAlerte(p: { lien: string; famille: string; expireLe: number; langue?: LangueOccasion }): CourrielConfirmation {
  const langue = p.langue ?? 'fr';
  const t = TEXTES[langue];
  const famille = p.famille ? libelleFamille(p.famille, langue) : t.tous;
  const fin = date(p.expireLe, langue);
  const lignes = [
    t.salutation,
    '',
    t.demande(famille),
    t.consigne,
    p.lien,
    '',
    t.expiration(fin),
    t.independance,
    t.desinscription,
    t.ignorer,
    '',
    t.signature,
  ];
  const html = [
    `<p>${echapper(t.salutation)}</p>`,
    `<p>${echapper(t.demande(famille))}</p>`,
    `<p><a href="${echapper(p.lien)}">${echapper(t.bouton)}</a></p>`,
    `<p>${echapper(t.expiration(fin))}</p>`,
    `<p>${echapper(t.independance)}</p>`,
    `<p>${echapper(t.desinscription)}</p>`,
    `<p>${echapper(t.ignorer)}</p>`,
    `<p>${echapper(t.signature)}</p>`,
  ].join('\n');
  return { objet: t.objet, texte: lignes.join('\n'), html };
}

const TEXTES_INSCRIPTION: Record<
  LangueOccasion,
  {
    objet: string;
    salutation: string;
    confirmee: (famille: string) => string;
    independance: string;
    desinscription: string;
    lienLibelle: string;
    signature: string;
  }
> = {
  fr: {
    objet: "Inscription confirmée : nouvelles offres Orbitvu d'occasion",
    salutation: 'Bonjour,',
    confirmee: (f) => `Votre inscription est confirmée : vous recevrez par e-mail les nouvelles offres de studios Orbitvu d'occasion (${f}) lorsqu'elles seront disponibles.`,
    independance: 'Cette liste est indépendante de la newsletter.',
    desinscription: 'Pour vous désinscrire à tout moment, utilisez ce lien :',
    lienLibelle: 'Me désinscrire',
    signature: 'PackshotCreator',
  },
  en: {
    objet: 'Subscription confirmed: new pre-owned Orbitvu offers',
    salutation: 'Hello,',
    confirmee: (f) => `Your subscription is confirmed: you will receive emails about new offers on pre-owned Orbitvu studios (${f}) when they become available.`,
    independance: 'This list is separate from the newsletter.',
    desinscription: 'To unsubscribe at any time, use this link:',
    lienLibelle: 'Unsubscribe',
    signature: 'PackshotCreator',
  },
  'de-ch': {
    objet: 'Anmeldung bestätigt: neue Orbitvu-Occasionsangebote',
    salutation: 'Guten Tag',
    confirmee: (f) => `Ihre Anmeldung ist bestätigt: Sie erhalten per E-Mail neue Angebote für Orbitvu-Studios als Occasion (${f}), wenn sie verfügbar sind.`,
    independance: 'Diese Liste ist vom Newsletter unabhängig.',
    desinscription: 'Über diesen Link können Sie sich jederzeit abmelden:',
    lienLibelle: 'Abmelden',
    signature: 'PackshotCreator',
  },
};

/** E-mail « Inscription confirmée », avec le lien personnel de désinscription. */
export function composerInscriptionConfirmee(p: { lienDesinscription: string; famille: string; langue?: LangueOccasion }): CourrielConfirmation {
  const langue = p.langue ?? 'fr';
  const t = TEXTES_INSCRIPTION[langue];
  const famille = p.famille ? libelleFamille(p.famille, langue) : TEXTES[langue].tous;
  const lignes = [t.salutation, '', t.confirmee(famille), t.independance, '', t.desinscription, p.lienDesinscription, '', t.signature];
  const html = [
    `<p>${echapper(t.salutation)}</p>`,
    `<p>${echapper(t.confirmee(famille))}</p>`,
    `<p>${echapper(t.independance)}</p>`,
    `<p>${echapper(t.desinscription)} <a href="${echapper(p.lienDesinscription)}">${echapper(t.lienLibelle)}</a></p>`,
    `<p>${echapper(t.signature)}</p>`,
  ].join('\n');
  return { objet: t.objet, texte: lignes.join('\n'), html };
}
