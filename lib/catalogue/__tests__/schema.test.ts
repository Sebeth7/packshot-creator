/**
 * Formulaire du catalogue All-in-One : règles fixées par Laurent le 02/10/2026.
 * Quatre champs obligatoires, pays France ou Suisse sans présélection, adresses
 * personnelles acceptées, consultant décoché par défaut, aucun champ marketing.
 */
import { describe, it, expect } from 'vitest';
import {
  champsCatalogueSchema,
  requeteCatalogueSchema,
  MESSAGES_VALIDATION,
  ORIGINES_CATALOGUE,
  PAYS_CATALOGUE,
  origineCatalogue,
} from '@/lib/catalogue/schema';

const saisie = {
  firstName: 'Claire',
  email: 'claire@atelier-exemple.fr',
  company: 'Atelier Exemple',
  country: 'FR',
};

function erreurs(valeurs: Record<string, unknown>) {
  const r = champsCatalogueSchema.safeParse(valeurs);
  if (r.success) return {};
  return Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]));
}

describe('schéma du formulaire catalogue', () => {
  it('accepte les quatre champs obligatoires seuls', () => {
    const r = champsCatalogueSchema.parse(saisie);
    expect(r).toEqual({ ...saisie, products: '', consultantOptIn: false });
  });

  it('exige prénom, e-mail, entreprise et pays, avec les messages du copydeck', () => {
    expect(erreurs({})).toEqual({
      firstName: MESSAGES_VALIDATION.firstName,
      email: MESSAGES_VALIDATION.email,
      company: MESSAGES_VALIDATION.company,
      country: MESSAGES_VALIDATION.country,
    });
    expect(MESSAGES_VALIDATION).toMatchObject({
      firstName: 'Indiquez votre prénom.',
      email: 'Saisissez une adresse e-mail valide.',
      company: 'Indiquez votre entreprise.',
      country: 'Sélectionnez France ou Suisse.',
    });
  });

  it('refuse des champs faits d’espaces et retire les espaces autour des valeurs', () => {
    expect(erreurs({ ...saisie, firstName: '   ', company: '  ' })).toEqual({
      firstName: MESSAGES_VALIDATION.firstName,
      company: MESSAGES_VALIDATION.company,
    });
    const r = champsCatalogueSchema.parse({ ...saisie, firstName: '  Claire ', email: ' claire@atelier-exemple.fr ' });
    expect(r.firstName).toBe('Claire');
    expect(r.email).toBe('claire@atelier-exemple.fr');
  });

  it('borne les longueurs : prénom 60, entreprise 120, produits 120', () => {
    expect(champsCatalogueSchema.safeParse({ ...saisie, firstName: 'a'.repeat(60) }).success).toBe(true);
    expect(champsCatalogueSchema.safeParse({ ...saisie, firstName: 'a'.repeat(61) }).success).toBe(false);
    expect(champsCatalogueSchema.safeParse({ ...saisie, company: 'a'.repeat(120) }).success).toBe(true);
    expect(champsCatalogueSchema.safeParse({ ...saisie, company: 'a'.repeat(121) }).success).toBe(false);
    expect(champsCatalogueSchema.safeParse({ ...saisie, products: 'a'.repeat(120) }).success).toBe(true);
    expect(champsCatalogueSchema.safeParse({ ...saisie, products: 'a'.repeat(121) }).success).toBe(false);
  });

  it('accepte les adresses personnelles : aucune liste de domaines refusés', () => {
    for (const email of ['claire.martin@gmail.com', 'c.martin@outlook.fr', 'claire@bluewin.ch', 'claire@hotmail.com']) {
      expect(champsCatalogueSchema.safeParse({ ...saisie, email }).success, email).toBe(true);
    }
  });

  it('refuse une adresse syntaxiquement invalide', () => {
    for (const email of ['claire', 'claire@', '@exemple.fr', 'claire exemple@fr']) {
      expect(erreurs({ ...saisie, email }), email).toEqual({ email: MESSAGES_VALIDATION.email });
    }
  });

  it('pays : France ou Suisse uniquement, aucune valeur par défaut', () => {
    expect(PAYS_CATALOGUE).toEqual(['FR', 'CH']);
    expect(champsCatalogueSchema.parse({ ...saisie, country: 'CH' }).country).toBe('CH');
    const sansPays: Record<string, unknown> = { ...saisie };
    delete sansPays.country;
    expect(erreurs(sansPays)).toEqual({ country: MESSAGES_VALIDATION.country });
    for (const country of ['', 'DE', 'BE', 'fr', 'France', null]) {
      expect(erreurs({ ...saisie, country }), String(country)).toEqual({ country: MESSAGES_VALIDATION.country });
    }
  });

  it('consultant : décoché par défaut, facultatif, booléen', () => {
    expect(champsCatalogueSchema.parse(saisie).consultantOptIn).toBe(false);
    expect(champsCatalogueSchema.parse({ ...saisie, consultantOptIn: true }).consultantOptIn).toBe(true);
    expect(champsCatalogueSchema.safeParse({ ...saisie, consultantOptIn: 'oui' }).success).toBe(false);
  });

  it('aucun champ marketing ni téléphone : un tel champ envoyé est ignoré', () => {
    const r = requeteCatalogueSchema.parse({
      ...saisie,
      requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
      marketingOptIn: true,
      newsletter: 'yes',
      phone: '+33 6 00 00 00 00',
    });
    expect(Object.keys(r)).not.toContain('marketingOptIn');
    expect(Object.keys(r)).not.toContain('newsletter');
    expect(Object.keys(r)).not.toContain('phone');
    expect(Object.keys(champsCatalogueSchema.shape).sort()).toEqual(
      ['company', 'consultantOptIn', 'country', 'email', 'firstName', 'products'],
    );
  });

  it('la requête exige un requestId au format UUID', () => {
    expect(requeteCatalogueSchema.safeParse(saisie).success).toBe(false);
    expect(requeteCatalogueSchema.safeParse({ ...saisie, requestId: 'abc' }).success).toBe(false);
  });
});

describe('origine de la demande (pop-in #122) : liste fermée, jamais recopiée telle quelle', () => {
  const requeteValide = { ...saisie, requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b' };

  it('V1 : une seule origine attendue, brochure_exit_sitewide', () => {
    expect(ORIGINES_CATALOGUE).toEqual(['brochure_exit_sitewide']);
    expect(origineCatalogue('brochure_exit_sitewide')).toBe('brochure_exit_sitewide');
  });

  it('valeur attendue conservée par le schéma de la route', () => {
    const r = requeteCatalogueSchema.parse({ ...requeteValide, origine: 'brochure_exit_sitewide' });
    expect(r.origine).toBe('brochure_exit_sitewide');
  });

  it('origine absente : comportement inchangé, demande acceptée sans origine', () => {
    const r = requeteCatalogueSchema.parse(requeteValide);
    expect(r.origine).toBeUndefined();
  });

  it('valeur inconnue, variante de casse, UTM, balise ou valeur non textuelle : ignorée, la demande reste acceptée', () => {
    for (const origine of [
      'Brochure_Exit_Sitewide',
      ' brochure_exit_sitewide',
      'brochure_exit_sitewide&utm_source=x',
      'utm_source=newsletter',
      '<script>alert(1)</script>',
      'x'.repeat(5000),
      '',
      null,
      42,
      ['brochure_exit_sitewide'],
      { valeur: 'brochure_exit_sitewide' },
    ]) {
      const r = requeteCatalogueSchema.safeParse({ ...requeteValide, origine });
      expect(r.success, JSON.stringify(origine).slice(0, 40)).toBe(true);
      if (r.success) expect(r.data.origine).toBeUndefined();
      expect(origineCatalogue(origine)).toBeUndefined();
    }
  });
});
