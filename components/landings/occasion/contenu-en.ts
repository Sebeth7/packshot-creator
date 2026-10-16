import { OPTIN } from '@/lib/occasion/formulaires';
import { FR, type ContenuOccasion } from './contenu-fr';

/**
 * ENGLISH texts of the pre-owned Orbitvu landing, translated from `contenu-fr.ts`
 * (11/10/2026). Same facts as the French source: no availability, price, delay or
 * discount is stated. Internal preview annotations stay in French (team tool).
 *
 * One deliberate alignment: the distributor block says « France and Switzerland »,
 * as the existing English copy of the site does (messages/en.json), where the
 * French V4.1 source says « en France ». To be confirmed with the copy review.
 */
export const EN: ContenuOccasion = {
  META: {
    title: 'Pre-owned Orbitvu photo studios | PackshotCreator',
    description:
      'Pre-owned Orbitvu packshot photo studios (showroom, demo, trade-in) when available, equipment search on request.',
  },

  HERO: {
    surtitre: 'Pre-owned Orbitvu equipment',
    titre: 'Pre-owned Orbitvu studios, carefully selected.',
    texte:
      'Showroom, demo or trade-in equipment: discover our pre-owned equipment and the key information you need to choose with confidence.',
    reperes: ['Origin and history stated', 'Condition and checks described', 'Warranty set out in writing'],
    ctaRecherche: "I'm looking for a pre-owned studio",
    ctaVoir: 'View the machines',
    photo: {
      src: FR.HERO.photo.src,
      alt: 'PackshotCreator showroom with Orbitvu studios installed',
      credit: 'Real photo · PackshotCreator showroom',
      annotation: FR.HERO.photo.annotation,
    },
    originesTitre: 'Possible origins',
  },

  ORIGINES: {
    showroom: { libelle: 'Showroom', carte: 'Former showroom equipment', option: 'former showroom equipment' },
    demonstration: { libelle: 'Demo', carte: 'Demo machine', option: 'demo machine' },
    salon: { libelle: 'Trade show', carte: 'Back from a trade show', option: 'back from a trade show' },
    location: { libelle: 'Rental return', carte: 'Rental return', option: 'rental return' },
    reprise: { libelle: 'Trade-in', carte: 'Trade-in', option: 'trade-in' },
    renouvellement: { libelle: 'Fleet renewal', carte: 'From a fleet renewal', option: 'fleet renewal' },
  },

  MACHINES: {
    surtitre: 'Available now',
    titre: 'Pre-owned machines currently on offer',
    texte:
      "The selection changes as new machines arrive. Each listing states the machine's origin, its condition and the warranty terms.",
    lienRecherche: 'Not your model? Describe what you are looking for',
    etiquetteFictif: 'Fictitious example',
    reference: 'Ref.',
    libelles: { origine: 'Origin', usage: 'Use', garantie: 'Warranty' },
    garantieCarte: 'Set out in writing',
    bouton: "I'm interested in this machine",
    annotation: FR.MACHINES.annotation,
  },

  RECHERCHE: {
    surtitre: 'Pre-owned search',
    titre: 'Looking for a pre-owned Orbitvu studio?',
    texte:
      'Describe your needs: our team reviews your request and gets back to you if suitable pre-owned equipment can be offered to you, whether or not it is listed on this page.',
    statutVide: 'No machines listed at the moment',
    point: 'Your request is reviewed by the PackshotCreator team',
    alternative: 'Want to hear about upcoming arrivals?',
    lienAlerte: 'Availability alert list',
    champs: {
      firstName: 'First name *',
      email: 'Business email *',
      company: 'Company *',
      besoin: 'Your needs *',
      besoinAide: 'Products to photograph, application or model you are looking for.',
      famille: 'Studio family',
      familleToutes: 'All Orbitvu equipment',
      reference: 'Selected machine',
      referenceAucune: 'None in particular',
      telephone: 'Phone',
      budget: 'Indicative budget (excl. VAT)',
      horizon: 'Purchase timeframe',
      horizonVide: 'Not specified',
      commentaire: 'Comment',
      facultatif: '(optional)',
    },
    mention:
      'Your information is used solely to process your search for pre-owned equipment. Data controller: Sysnext (PackshotCreator).',
    lienConfidentialite: 'Privacy policy',
    annotationMention: FR.RECHERCHE.annotationMention,
    bouton: 'Send my request',
    envoi: 'Sending…',
    avisApercu: 'Preview: this form is not in service yet. No request is sent.',
    etats: {
      recue: 'Request received',
      recueAccuse: 'Thank you. Your request has been passed on to our team. A confirmation email has been sent to you.',
      recueSansAccuse:
        'Thank you. Your request has been passed on to our team. The confirmation email could not be sent: there is no need to submit the form again.',
      indisponibleTitre: 'Form not in service yet',
      indisponible: 'Your request was not sent: no data has been recorded.',
      indisponiblePrevu: FR.RECHERCHE.etats.indisponiblePrevu,
      erreur: 'Your request could not be sent. Your information has been kept in the form: you can try again.',
      limitation: 'Too many requests from this connection. Please try again in a few minutes.',
      reference: 'This machine is no longer offered. You can send your request without a reference.',
    },
    messages: {
      firstName: 'Please enter your first name.',
      email: 'Please enter a valid email address.',
      company: 'Please enter your company.',
      besoin: 'Please describe your needs in a few words.',
      max: (n: number) => `${n} characters maximum.`,
      choix: 'Please choose a value from the list.',
      reference: 'This machine is no longer offered. You can send your request without a reference.',
    },
    invalide: 'Invalid value.',
  },

  MODELES: {
    surtitre: 'Orbitvu references',
    titre: 'Three Orbitvu models, presented with their context of use',
    texte:
      'Each model is shown with its origin and use. Specifications are those of the model; the visuals illustrate the model, not a specific unit. Availability of a unit is confirmed on request.',
    libelles: { origine: 'Origin', usage: 'Use', objet: 'Maximum object size', charge: 'Maximum object weight' },
    bouton: 'Request information',
    besoin: 'Information about the {nom} model.',
    credit: 'Illustrative photo',
  },

  FICHE: {
    surtitre: 'Choose with confidence',
    titre: 'What you will know about each machine',
    texte: 'Each listing brings together the information you need before deciding.',
    annotation: FR.FICHE.annotation,
    themes: [
      { titre: 'Origin and history', texte: 'Where the machine comes from and how it was used.' },
      { titre: 'Condition and checks', texte: 'The condition observed and the checks carried out before sale.' },
      { titre: 'Software and compatibility', texte: 'Orbitvu Station version, licence transfer, compatible cameras.' },
      { titre: 'Documented tests', texte: 'Test images taken with the machine, where available.' },
      { titre: 'Applicable warranty', texte: 'Guarantor, duration, start date and exclusions, in writing before purchase.' },
    ],
  },

  GARANTIE: {
    surtitre: 'Warranty and support',
    titre: 'Clear terms, before you buy',
    texte: 'The terms specific to each machine are provided in writing with the proposal.',
    blocs: [
      {
        titre: 'Warranty',
        texte:
          "Guarantor, duration, start date and exclusions are specified for each machine. The Orbitvu manufacturer's warranty is reserved for the first buyer: it does not transfer with the machine.",
        annotation: FR.GARANTIE.blocs[0].annotation,
      },
      {
        titre: 'Orbitvu Station licence',
        texte:
          'The perpetual licence can be transferred with the machine within the European Economic Area, subject to Orbitvu transfer fees. Subscriptions, including AI features, cannot be transferred.',
      },
      { titre: 'Installation and training', texte: 'By our teams, on quotation.', annotation: FR.GARANTIE.blocs[2].annotation },
      {
        titre: 'Official Orbitvu distributor',
        texte: 'PackshotCreator is the official distributor of Orbitvu studios for France and Switzerland.',
      },
    ],
    showroom: 'Showroom near Lyon, visits by appointment',
    annotationShowroom: FR.GARANTIE.annotationShowroom,
  },

  ALERTES: {
    surtitre: 'New offers',
    titre: 'Receive new offers on pre-owned Orbitvu studios',
    texte:
      'We email you when new pre-owned opportunities become available: choose a machine family, or follow all families.',
    champs: {
      email: 'Email *',
      famille: 'Machine family',
      facultatif: '(optional)',
      familleToutes: 'All families',
      familleAide: 'Leave “All families” selected to receive every new offer.',
    },
    optin: `${OPTIN.en.texte} *`,
    bouton: 'Receive new offers',
    envoi: 'Sending…',
    mention:
      'Your address is used by Sysnext (PackshotCreator) only for these emails. A confirmation email is sent to you: without your confirmation, nothing is recorded.',
    lienConfidentialite: 'Privacy policy',
    points: [
      'One machine family or all families: your choice',
      'An email when new machines become available, with no fixed frequency',
      'Confirmation by email, unsubscribe from any message',
      'Separate from the newsletter: no other communication',
    ],
    fermee: 'Alerts are not open yet: no subscription is recorded for now.',
    etats: {
      attenteTitre: 'Check your inbox',
      attente:
        'We have sent you a confirmation email. Your subscription will only be recorded once you click the link it contains (valid for 48 hours).',
      indisponibleTitre: 'Alerts not open yet',
      indisponible: 'No subscription has been recorded: the alert list is not in service yet.',
      lienRecherche: 'Describe your search now',
      erreur: 'Your subscription could not be sent. Your information has been kept: you can try again.',
      limitation: 'Too many requests from this connection. Please try again in a few minutes.',
    },
    confirmation: {
      titre: 'Confirm your subscription',
      texte: 'One click on the button confirms your subscription to new offers on pre-owned Orbitvu studios.',
      bouton: 'Confirm my subscription',
      inscritTitre: 'Subscription confirmed',
      inscrit: 'You will receive new offers on pre-owned Orbitvu studios when they become available. Every message will include an unsubscribe link.',
      dejaInscritTitre: 'Subscription already confirmed',
      dejaInscrit: 'This address already receives pre-owned Orbitvu alerts: nothing has been changed.',
      desinscritTitre: 'Address unsubscribed',
      desinscrit:
        'This address has unsubscribed: it is not subscribed again automatically. To receive the alerts again, please write to us.',
      expire: 'This confirmation link has expired: please subscribe again using the form.',
      invalide: 'This link is not valid: please subscribe again using the form.',
      erreur: 'The request could not be completed: nothing has been changed, you can try again.',
    },
    desinscription: {
      titre: 'Unsubscribe from pre-owned Orbitvu alerts',
      texte: 'Your other preferences (newsletter, other messages) are not changed.',
      bouton: 'Unsubscribe',
      faitTitre: 'Unsubscription recorded',
      fait: 'You will no longer receive pre-owned Orbitvu alerts. No other communication is affected.',
    },
    envoiJeton: 'Processing…',
    reessayer: 'Try again',
    revenirFormulaire: 'Back to the form',
    avisTestReel: FR.ALERTES.avisTestReel,
    messages: {
      email: 'Please enter a valid email address.',
      famille: 'Please choose a value from the list.',
      consentement: 'Please tick this box to receive availability alerts.',
      version: 'The checkbox text has changed: please reload the page and tick the box again.',
    },
  },

  APERCU: FR.APERCU,
};
