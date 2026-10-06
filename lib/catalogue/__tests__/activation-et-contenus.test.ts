/**
 * Landing catalogue All-in-One : page non publiée en production avant GO,
 * page FR seule pour le sélecteur de langue, e-mail et règle CRM (aucune affaire).
 */
import { describe, it, expect } from 'vitest';
import { PUBLICATION_AUTORISEE, pageCatalogueServie, simulationAutorisee } from '@/lib/catalogue/activation';
import { composerCourrielCatalogue, LIENS_RETOUR } from '@/lib/catalogue/courriel';
import {
  regleCrmCatalogue,
  noteCrmCatalogue,
  noteCrmCatalogueHtml,
  lireSuiviNote,
  domaineGrandPublic,
  ETAPE_PIPEDRIVE_CATALOGUE,
} from '@/lib/catalogue/crm';
import { localeSwitchHref, navPinLocale } from '@/i18n/deChCoverage';
import type { DemandeCatalogue } from '@/lib/catalogue/schema';

const CHEMIN = '/catalogue-orbitvu-all-in-one';

describe('activation de la page', () => {
  it('pas de publication en production tant que le GO n’est pas donné', () => {
    expect(PUBLICATION_AUTORISEE).toBe(false);
    expect(pageCatalogueServie({ VERCEL: '1', VERCEL_ENV: 'production' })).toBe(false);
  });

  it('servie en local et sur les Preview Vercel', () => {
    expect(pageCatalogueServie({})).toBe(true);
    expect(pageCatalogueServie({ VERCEL: '1', VERCEL_ENV: 'preview' })).toBe(true);
  });

  it('simulation de l’API : poste local uniquement, jamais sur Vercel', () => {
    expect(simulationAutorisee({})).toBe(false);
    expect(simulationAutorisee({ CATALOGUE_SIMULATION: '1' })).toBe(true);
    expect(simulationAutorisee({ CATALOGUE_SIMULATION: '1', VERCEL: '1' })).toBe(false);
    expect(simulationAutorisee({ CATALOGUE_SIMULATION: '1', VERCEL_ENV: 'preview' })).toBe(false);
  });
});

describe('sélecteur de langue sur /fr/catalogue-orbitvu-all-in-one (page FR seule)', () => {
  it('EN et DE-CH mènent à l’accueil de la locale, jamais à une URL /en ou /de-ch inexistante', () => {
    expect(localeSwitchHref(CHEMIN, undefined, 'fr', 'en')).toEqual({ href: '/', locale: 'en' });
    expect(localeSwitchHref(CHEMIN, undefined, 'fr', 'de-ch')).toEqual({ href: '/', locale: 'de-ch' });
    expect(localeSwitchHref(CHEMIN, undefined, 'fr', 'fr')).toEqual({ href: CHEMIN, locale: 'fr' });
  });

  it('un éventuel lien depuis en ou de-ch est épinglé sur /fr', () => {
    expect(navPinLocale('en', CHEMIN)).toBe('fr');
    expect(navPinLocale('de-ch', CHEMIN)).toBe('fr');
    expect(navPinLocale('fr', CHEMIN)).toBeUndefined();
  });
});

const demande: DemandeCatalogue = {
  requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
  recueLe: '2026-10-02T12:00:00.000Z',
  firstName: 'Claire <b>',
  email: 'claire@atelier-exemple.fr',
  company: 'Atelier Exemple',
  country: 'CH',
  products: 'Montres',
  consultantOptIn: false,
  pageSource: 'catalogue_all_in_one',
  attribution: { utmSource: 'perplexity.ai' },
};

describe('e-mail de transmission du lien (composé, non envoyé)', () => {
  const pdf = 'https://exemple.test/catalogue.pdf';
  const c = composerCourrielCatalogue({ firstName: demande.firstName, pdfUrl: pdf });

  it('objet, lien, téléphones France et Suisse, confidentialité', () => {
    expect(c.objet).toBe('Votre catalogue Orbitvu All-in-One');
    for (const partie of [c.texte, c.html]) {
      expect(partie).toContain(pdf);
      expect(partie).toContain('+33 (0)1 47 42 66 66');
      expect(partie).toContain('+41 44 580 43 84');
      expect(partie).toContain('/fr/confidentialite');
    }
  });

  it('chemins de retour : démonstration et calculateur ROI, libellés publiés, adresses fixes du site', () => {
    expect(LIENS_RETOUR.map((l) => [l.libelle, l.url])).toEqual([
      ['Demander une démo', 'https://www.packshot-creator.com/fr/contact'],
      ['Calculer mon ROI', 'https://www.packshot-creator.com/fr/calculateur-roi'],
    ]);
    for (const partie of [c.texte, c.html]) {
      for (const l of LIENS_RETOUR) {
        expect(partie).toContain(l.url);
        expect(partie).toContain(l.libelle);
      }
      // D37 : aucun lien vers F5 avant le 23/11 ; aucune URL hors du site et du PDF.
      expect(partie).not.toContain('packshot-e-commerce');
      const urls = partie.match(/https?:[^\s"<]+/g) ?? [];
      for (const u of urls) expect(u === pdf || u.startsWith('https://www.packshot-creator.com/fr/')).toBe(true);
    }
  });

  it('aucune promesse d’appel ni de délai de rappel', () => {
    for (const partie of [c.texte, c.html]) {
      expect(partie.toLowerCase()).not.toMatch(/vous rappel|recontacter sous|24 heures|sous 24/);
    }
  });

  it('aucun contenu marketing, aucune pièce jointe annoncée', () => {
    for (const partie of [c.texte, c.html]) {
      expect(partie.toLowerCase()).not.toMatch(/newsletter|lettre d.information|promotion|offre|pièce jointe/);
    }
  });

  it('échappe le prénom dans la version HTML', () => {
    expect(c.html).toContain('Bonjour Claire &lt;b&gt;,');
    expect(c.html).not.toContain('<b>,');
  });
});

describe('règle CRM V1 (06/10/2026) : lead brochure tracé, sans affaire', () => {
  it('aucune affaire, ni pour une brochure seule, ni pour une demande de consultant', () => {
    expect(regleCrmCatalogue(demande)).toEqual({ synchroniserContact: true, creerAffaire: false, signalerConsultant: false });
    expect(regleCrmCatalogue({ ...demande, consultantOptIn: true })).toEqual({
      synchroniserContact: true,
      creerAffaire: false,
      signalerConsultant: true,
    });
  });

  it('étape Pipedrive non fixée : aucune étape existante réutilisée par défaut', () => {
    expect(ETAPE_PIPEDRIVE_CATALOGUE).toBeNull();
  });

  it('la note porte l’intention, le pays, la demande de consultant et l’attribution', () => {
    const note = noteCrmCatalogue(demande);
    expect(note).toContain('[Brochure]');
    expect(note).toContain('Type : lead brochure. Ni une demande de démonstration, ni une affaire qualifiée.');
    expect(note).toContain('Pays : Suisse');
    expect(note).toContain('Demande de consultant : non.');
    expect(note).toContain('Brochure : orbitvu_all_in_one_2026_fr (langue : fr)');
    expect(note).toContain('Source : perplexity.ai');
    expect(note.toLowerCase()).not.toContain('marketing');
    // Aucune interdiction ni consigne d'appel codée (fait métier de Laurent du 06/10).
    expect(note).not.toMatch(/ne pas appeler|pas d.appel/i);
    expect(noteCrmCatalogue({ ...demande, consultantOptIn: true })).toContain(
      'Demande de consultant : OUI, le prospect demande à être recontacté.',
    );
  });

  it('adresse grand public acceptée et seulement signalée dans la note', () => {
    expect(domaineGrandPublic('claire@Gmail.com')).toBe('gmail.com');
    expect(domaineGrandPublic('anna@bluewin.ch')).toBe('bluewin.ch');
    expect(domaineGrandPublic('a@hotmail.fr')).toBe('hotmail.fr');
    expect(domaineGrandPublic('claire@atelier-exemple.fr')).toBeNull();
    expect(noteCrmCatalogue(demande)).not.toContain('domaine grand public');
    expect(noteCrmCatalogue({ ...demande, email: 'claire@outlook.com' })).toContain('E-mail : domaine grand public (outlook.com)');
  });

  it('version Pipedrive : champs saisis échappés, suivi relu à l’identique', () => {
    const suivi = { emailSent: true, notification: 'transmise', consultant: 'transmis' } as const;
    const html = noteCrmCatalogueHtml({ ...demande, company: 'A <script>' }, suivi);
    expect(html).toContain('Entreprise : A &lt;script&gt;');
    expect(html).not.toContain('<script>');
    expect(lireSuiviNote(html)).toEqual(suivi);
    for (const s of [
      { emailSent: false, notification: 'non_transmise', consultant: 'non_transmis' },
      { emailSent: true, notification: 'non_configuree', consultant: 'non_demande' },
    ] as const) {
      expect(lireSuiviNote(noteCrmCatalogueHtml(demande, s))).toEqual(s);
    }
    expect(lireSuiviNote(noteCrmCatalogueHtml(demande))).toBeNull();
  });
});
