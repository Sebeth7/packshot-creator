import { OPTIN } from '@/lib/occasion/formulaires';
import { FR, type ContenuOccasion } from './contenu-fr';

/**
 * DEUTSCHE Texte (Schweiz) der Landingpage zu Orbitvu-Occasionen, übersetzt aus
 * `contenu-fr.ts` (11.10.2026) und an den Schweizer Markt angepasst: «Occasion»,
 * «Offerte», «MWST», «innert», kein ß. Dieselben Fakten wie die französische
 * Quelle: keine Verfügbarkeit, kein Preis, keine Frist, kein Rabatt. Interne
 * Vorschau-Anmerkungen bleiben auf Französisch (Werkzeug des Teams).
 *
 * Bewusste Angleichung: Der Distributor-Block nennt «Frankreich und die Schweiz»,
 * wie die bestehenden deutschen Texte der Website (messages/de-ch.json); die
 * französische Quelle V4.1 nennt nur Frankreich. Bei der Copy-Prüfung bestätigen.
 *
 * Die Datenschutzerklärung wird nur auf Französisch und Englisch angeboten
 * (i18n/deChCoverage.ts, `DE_CH_PIN_FR`): Der Link führt auf die französische Seite.
 */
export const DE_CH: ContenuOccasion = {
  META: {
    title: 'Orbitvu-Fotostudios als Occasion | PackshotCreator',
    description:
      'Orbitvu-Packshot-Fotostudios als Occasion (Showroom, Demo, Eintausch), sobald verfügbar: Suche auf Anfrage und Benachrichtigung bei neuen Angeboten.',
  },

  HERO: {
    surtitre: 'Orbitvu-Occasionen',
    titre: 'Orbitvu-Studios als Occasion, sorgfältig ausgewählt.',
    texte:
      'Showroom-, Demo- oder Eintauschgeräte: Entdecken Sie unsere Occasionen und alle wichtigen Informationen für einen sicheren Entscheid.',
    reperes: ['Herkunft und Vorgeschichte angegeben', 'Zustand und Prüfungen beschrieben', 'Garantie schriftlich festgehalten'],
    ctaRecherche: 'Ich suche ein Occasionsstudio',
    ctaVoir: 'Maschinen ansehen',
    photo: {
      src: FR.HERO.photo.src,
      alt: 'Showroom von PackshotCreator mit aufgebauten Orbitvu-Studios',
      credit: 'Echtes Foto · Showroom PackshotCreator',
      annotation: FR.HERO.photo.annotation,
    },
    originesTitre: 'Mögliche Herkunft',
  },

  ORIGINES: {
    showroom: { libelle: 'Showroom', carte: 'Ehemaliges Showroom-Gerät', option: 'ehemaliges Showroom-Gerät' },
    demonstration: { libelle: 'Demo', carte: 'Demogerät', option: 'Demogerät' },
    salon: { libelle: 'Messe', carte: 'Messerückläufer', option: 'Messerückläufer' },
    location: { libelle: 'Mietrückläufer', carte: 'Mietrückläufer', option: 'Mietrückläufer' },
    reprise: { libelle: 'Eintausch', carte: 'Eintausch', option: 'Eintausch' },
    renouvellement: { libelle: 'Geräteerneuerung', carte: 'Aus einer Geräteerneuerung', option: 'Geräteerneuerung' },
  },

  MACHINES: {
    surtitre: 'Derzeit verfügbar',
    titre: 'Aktuell angebotene Occasionsmaschinen',
    texte:
      'Die Auswahl ändert sich laufend. Jede Beschreibung nennt die Herkunft der Maschine, ihren Zustand und die Garantiebedingungen.',
    lienRecherche: 'Nicht Ihr Modell? Beschreiben Sie Ihre Suche',
    etiquetteFictif: 'Fiktives Beispiel',
    reference: 'Ref.',
    libelles: { origine: 'Herkunft', usage: 'Einsatz', garantie: 'Garantie' },
    garantieCarte: 'Schriftlich festgehalten',
    bouton: 'Diese Maschine interessiert mich',
    annotation: FR.MACHINES.annotation,
  },

  RECHERCHE: {
    surtitre: 'Occasionssuche',
    titre: 'Sie suchen ein Orbitvu-Studio als Occasion?',
    texte:
      'Beschreiben Sie Ihren Bedarf: Unser Team prüft Ihre Anfrage und meldet sich bei Ihnen, falls wir Ihnen ein passendes Occasionsgerät anbieten können – ob es auf dieser Seite aufgeführt ist oder nicht.',
    statutVide: 'Derzeit keine Maschinen aufgeführt',
    point: 'Ihre Anfrage wird vom PackshotCreator-Team geprüft',
    alternative: 'Über neue Occasionen informiert werden?',
    lienAlerte: 'Verfügbarkeits-Benachrichtigung',
    champs: {
      firstName: 'Vorname *',
      email: 'Geschäftliche E-Mail *',
      company: 'Unternehmen *',
      besoin: 'Ihr Bedarf *',
      besoinAide: 'Zu fotografierende Produkte, Anwendung oder gesuchtes Modell.',
      famille: 'Studiofamilie',
      familleToutes: 'Alle Orbitvu-Geräte',
      reference: 'Vorausgewählte Maschine',
      referenceAucune: 'Keine bestimmte',
      telephone: 'Telefon',
      budget: 'Budget exkl. MWST (Richtwert)',
      horizon: 'Kaufzeitpunkt',
      horizonVide: 'Keine Angabe',
      commentaire: 'Bemerkung',
      facultatif: '(optional)',
    },
    mention:
      'Ihre Angaben dienen ausschliesslich der Bearbeitung Ihrer Occasionsanfrage. Verantwortlich für die Datenbearbeitung: Sysnext (PackshotCreator).',
    lienConfidentialite: 'Datenschutzerklärung (auf Französisch)',
    annotationMention: FR.RECHERCHE.annotationMention,
    bouton: 'Anfrage senden',
    envoi: 'Wird gesendet…',
    avisApercu: 'Vorschau: Formular noch nicht in Betrieb. Es wird keine Anfrage übermittelt.',
    etats: {
      recue: 'Anfrage erhalten',
      recueAccuse: 'Vielen Dank. Ihre Anfrage wurde an unser Team weitergeleitet. Sie haben eine Bestätigung per E-Mail erhalten.',
      recueSansAccuse:
        'Vielen Dank. Ihre Anfrage wurde an unser Team weitergeleitet. Die Bestätigungs-E-Mail konnte nicht gesendet werden: Sie müssen das Formular nicht erneut absenden.',
      indisponibleTitre: 'Formular noch nicht in Betrieb',
      indisponible: 'Ihre Anfrage wurde nicht übermittelt: Es wurden keine Daten gespeichert.',
      indisponiblePrevu: FR.RECHERCHE.etats.indisponiblePrevu,
      erreur: 'Die Anfrage konnte nicht übermittelt werden. Ihre Angaben bleiben im Formular erhalten: Sie können es erneut versuchen.',
      limitation: 'Zu viele Anfragen von dieser Verbindung. Bitte versuchen Sie es in einigen Minuten erneut.',
      reference: 'Diese Maschine wird nicht mehr angeboten. Sie können Ihre Anfrage ohne Referenz senden.',
    },
    messages: {
      firstName: 'Bitte geben Sie Ihren Vornamen ein.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      company: 'Bitte geben Sie Ihr Unternehmen an.',
      besoin: 'Bitte beschreiben Sie Ihren Bedarf in wenigen Worten.',
      max: (n: number) => `Höchstens ${n} Zeichen.`,
      choix: 'Bitte wählen Sie einen Wert aus der Liste.',
      reference: 'Diese Maschine wird nicht mehr angeboten. Sie können Ihre Anfrage ohne Referenz senden.',
    },
    invalide: 'Ungültiger Wert.',
  },

  FICHE: {
    surtitre: 'Mit Sicherheit entscheiden',
    titre: 'Was Sie zu jeder Maschine erfahren',
    texte: 'Jede Beschreibung vereint die wichtigsten Informationen für Ihren Entscheid.',
    annotation: FR.FICHE.annotation,
    themes: [
      { titre: 'Herkunft und Vorgeschichte', texte: 'Woher die Maschine stammt und wie sie eingesetzt wurde.' },
      { titre: 'Zustand und Prüfungen', texte: 'Der festgestellte Zustand und die vor dem Verkauf durchgeführten Prüfungen.' },
      { titre: 'Software und Kompatibilität', texte: 'Version von Orbitvu Station, Lizenzübertragung, kompatible Kameras.' },
      { titre: 'Dokumentierte Tests', texte: 'Testaufnahmen mit der Maschine, sofern vorhanden.' },
      { titre: 'Geltende Garantie', texte: 'Garantiegeber, Dauer, Beginn und Ausschlüsse, schriftlich vor dem Kauf.' },
    ],
  },

  GARANTIE: {
    surtitre: 'Garantie und Begleitung',
    titre: 'Klare Bedingungen, vor dem Kauf',
    texte: 'Die Bedingungen für jede Maschine erhalten Sie schriftlich mit der Offerte.',
    blocs: [
      {
        titre: 'Garantie',
        texte:
          'Garantiegeber, Dauer, Beginn und Ausschlüsse werden für jede Maschine festgelegt. Die Herstellergarantie von Orbitvu gilt nur für den Erstkäufer: Sie geht nicht mit der Maschine über.',
        annotation: FR.GARANTIE.blocs[0].annotation,
      },
      {
        titre: 'Lizenz Orbitvu Station',
        texte:
          'Die unbefristete Lizenz kann innerhalb des Europäischen Wirtschaftsraums (EWR) mit der Maschine übertragen werden; Orbitvu erhebt dafür eine Übertragungsgebühr. Abonnemente, einschliesslich der KI-Funktionen, sind nicht übertragbar.',
      },
      { titre: 'Installation und Schulung', texte: 'Durch unsere Teams, auf Offerte.', annotation: FR.GARANTIE.blocs[2].annotation },
      {
        titre: 'Offizieller Orbitvu-Distributor',
        texte: 'PackshotCreator ist offizieller Distributor der Orbitvu-Studios für Frankreich und die Schweiz.',
      },
    ],
    showroom: 'Showroom bei Lyon, Besuche nach Vereinbarung',
    annotationShowroom: FR.GARANTIE.annotationShowroom,
  },

  ALERTES: {
    surtitre: 'Neue Angebote',
    titre: 'Erhalten Sie neue Angebote für Orbitvu-Studios als Occasion',
    texte:
      'Wir schreiben Ihnen, wenn neue Occasionsangebote verfügbar sind: Wählen Sie eine Gerätefamilie oder verfolgen Sie alle Familien.',
    champs: {
      email: 'E-Mail *',
      famille: 'Gerätefamilie',
      facultatif: '(optional)',
      familleToutes: 'Alle Familien',
      familleAide: 'Lassen Sie «Alle Familien» ausgewählt, um alle neuen Angebote zu erhalten.',
    },
    optin: `${OPTIN['de-ch'].texte} *`,
    bouton: 'Neue Angebote erhalten',
    envoi: 'Wird gesendet…',
    mention:
      'Ihre Adresse wird von Sysnext (PackshotCreator) ausschliesslich für diese E-Mails verwendet. Sie erhalten eine Bestätigungs-E-Mail: Ohne Ihre Bestätigung wird nichts gespeichert.',
    lienConfidentialite: 'Datenschutzerklärung (auf Französisch)',
    points: [
      'Eine Gerätefamilie oder alle Familien: Sie entscheiden',
      'Eine E-Mail, wenn neue Maschinen verfügbar sind, ohne festen Rhythmus',
      'Bestätigung per E-Mail, Abmeldung in jeder Nachricht möglich',
      'Vom Newsletter unabhängig: keine weiteren Mitteilungen',
    ],
    fermee: 'Die Benachrichtigungen sind noch nicht freigeschaltet: Derzeit wird keine Anmeldung gespeichert.',
    etats: {
      attenteTitre: 'Bitte prüfen Sie Ihren Posteingang',
      attente:
        'Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Ihre Anmeldung wird erst gespeichert, wenn Sie auf den darin enthaltenen Link klicken (48 Stunden gültig).',
      indisponibleTitre: 'Benachrichtigungen noch nicht freigeschaltet',
      indisponible: 'Es wurde keine Anmeldung gespeichert: Die Benachrichtigungsliste ist noch nicht in Betrieb.',
      lienRecherche: 'Jetzt Ihre Suche beschreiben',
      erreur: 'Die Anmeldung konnte nicht gesendet werden. Ihre Angaben bleiben erhalten: Sie können es erneut versuchen.',
      limitation: 'Zu viele Anfragen von dieser Verbindung. Bitte versuchen Sie es in einigen Minuten erneut.',
    },
    confirmation: {
      titre: 'Anmeldung bestätigen',
      texte: 'Mit einem Klick auf die Schaltfläche bestätigen Sie Ihre Anmeldung für neue Angebote für Orbitvu-Studios als Occasion.',
      bouton: 'Anmeldung bestätigen',
      inscritTitre: 'Anmeldung bestätigt',
      inscrit: 'Sie erhalten neue Angebote für Orbitvu-Studios als Occasion, wenn sie verfügbar sind. Jede Nachricht enthält einen Abmeldelink.',
      dejaInscritTitre: 'Anmeldung bereits bestätigt',
      dejaInscrit: 'Diese Adresse erhält bereits die Benachrichtigungen zu Orbitvu-Occasionen: Es wurde nichts geändert.',
      desinscritTitre: 'Adresse abgemeldet',
      desinscrit:
        'Diese Adresse hat sich abgemeldet: Sie wird nicht automatisch wieder angemeldet. Wenn Sie die Benachrichtigungen wieder erhalten möchten, schreiben Sie uns.',
      expire: 'Dieser Bestätigungslink ist abgelaufen: Bitte melden Sie sich über das Formular erneut an.',
      invalide: 'Dieser Link ist ungültig: Bitte melden Sie sich über das Formular erneut an.',
      erreur: 'Die Anfrage konnte nicht abgeschlossen werden: Es wurde nichts geändert, Sie können es erneut versuchen.',
    },
    desinscription: {
      titre: 'Von den Benachrichtigungen zu Orbitvu-Occasionen abmelden',
      texte: 'Ihre übrigen Einstellungen (Newsletter, andere Nachrichten) bleiben unverändert.',
      bouton: 'Abmelden',
      faitTitre: 'Abmeldung gespeichert',
      fait: 'Sie erhalten keine Benachrichtigungen zu Orbitvu-Occasionen mehr. Andere Mitteilungen sind nicht betroffen.',
    },
    envoiJeton: 'Wird bearbeitet…',
    reessayer: 'Erneut versuchen',
    revenirFormulaire: 'Zurück zum Formular',
    avisTestReel: FR.ALERTES.avisTestReel,
    messages: {
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      famille: 'Bitte wählen Sie einen Wert aus der Liste.',
      consentement: 'Bitte kreuzen Sie dieses Feld an, um die Benachrichtigungen zu erhalten.',
      version: 'Der Text des Kontrollkästchens hat sich geändert: Bitte laden Sie die Seite neu und kreuzen Sie das Feld erneut an.',
    },
  },

  APERCU: FR.APERCU,
};
