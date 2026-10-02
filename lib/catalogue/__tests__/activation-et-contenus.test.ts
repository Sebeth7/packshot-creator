/**
 * Landing catalogue All-in-One : page non publiée en production avant GO,
 * page FR seule pour le sélecteur de langue, e-mail et règle CRM préparés sans envoi.
 */
import { describe, it, expect } from 'vitest';
import { PUBLICATION_AUTORISEE, pageCatalogueServie, simulationAutorisee } from '@/lib/catalogue/activation';
import { composerCourrielCatalogue } from '@/lib/catalogue/courriel';
import { regleCrmCatalogue, noteCrmCatalogue, ETAPE_PIPEDRIVE_CATALOGUE } from '@/lib/catalogue/crm';
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

describe('règle CRM proposée (non branchée)', () => {
  it('affaire seulement si un consultant est demandé', () => {
    expect(regleCrmCatalogue(demande)).toEqual({ synchroniserContact: true, creerAffaire: false });
    expect(regleCrmCatalogue({ ...demande, consultantOptIn: true }).creerAffaire).toBe(true);
  });

  it('étape Pipedrive non fixée : aucune étape existante réutilisée par défaut', () => {
    expect(ETAPE_PIPEDRIVE_CATALOGUE).toBeNull();
  });

  it('la note porte l’intention, le pays, la demande de consultant et l’attribution', () => {
    const note = noteCrmCatalogue(demande);
    expect(note).toContain('catalogue_download');
    expect(note).toContain('Pays : Suisse');
    expect(note).toContain('Demande de consultant : non');
    expect(note).toContain('Source : perplexity.ai');
    expect(note.toLowerCase()).not.toContain('marketing');
  });
});
