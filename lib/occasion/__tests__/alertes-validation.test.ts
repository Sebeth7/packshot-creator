/**
 * Liste d'alerte : validation stricte, jetons chiffrés, e-mail de confirmation.
 * Fonctions pures : aucun réseau, aucun e-mail.
 */
import { describe, it, expect } from 'vitest';
import { FAMILLES, TEXTE_OPTIN, TEXTES_OPTIN, VERSION_TEXTE_OPTIN } from '@/lib/occasion/formulaires';
import { EMAIL_MAX, MESSAGES_ALERTES, champsAlerteSchema, requeteAlerteSchema, requeteJetonSchema } from '@/lib/occasion/alertes/schema';
import {
  DUREE_CONFIRMATION_MS,
  creerJeton,
  lireJetonConfirmation,
  lireJetonDesinscription,
  type DonneesConfirmation,
} from '@/lib/occasion/alertes/jeton';
import { ANCRE_CONFIRMATION, composerConfirmationAlerte, lienConfirmation, lienDesinscription } from '@/lib/occasion/alertes/courriel';

const SECRET = 'secret-de-test-0123456789abcdef-0123456789';
const T0 = new Date('2026-10-11T12:00:00Z');
const valide = { email: 'claire@atelier.fr', famille: '', consentement: true, versionConsentement: VERSION_TEXTE_OPTIN };

function issues(r: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }) {
  return r.success ? [] : (r.error?.issues ?? []).map((i) => [String(i.path[0] ?? ''), i.message]);
}

describe('Validation du formulaire et de la requête', () => {
  it('requête valide : e-mail normalisé en minuscules, famille facultative absente → « »', () => {
    const r = requeteAlerteSchema.safeParse({ ...valide, email: '  Claire@Atelier.FR ', famille: undefined });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data).toEqual({ email: 'claire@atelier.fr', famille: '', consentement: true, versionConsentement: VERSION_TEXTE_OPTIN, siteWeb: '' });
  });

  it('e-mail absent, invalide ou trop long : refusé', () => {
    expect(issues(requeteAlerteSchema.safeParse({ ...valide, email: undefined }))).toContainEqual(['email', MESSAGES_ALERTES.email]);
    expect(issues(requeteAlerteSchema.safeParse({ ...valide, email: 'pas-une-adresse' }))).toContainEqual(['email', MESSAGES_ALERTES.email]);
    const long = `${'a'.repeat(EMAIL_MAX - 9)}@exemple.fr`;
    expect(long.length).toBeGreaterThan(EMAIL_MAX);
    expect(requeteAlerteSchema.safeParse({ ...valide, email: long }).success).toBe(false);
  });

  it('famille : liste fermée ; inconnue refusée, chacune des familles acceptée', () => {
    expect(issues(requeteAlerteSchema.safeParse({ ...valide, famille: 'Inconnue' }))).toContainEqual(['famille', MESSAGES_ALERTES.famille]);
    for (const f of FAMILLES) expect(requeteAlerteSchema.safeParse({ ...valide, famille: f }).success).toBe(true);
  });

  it('accord non coché, absent ou « vrai » textuel : refusé', () => {
    for (const consentement of [false, undefined, 'true', 1]) {
      expect(issues(requeteAlerteSchema.safeParse({ ...valide, consentement }))).toContainEqual(['consentement', MESSAGES_ALERTES.consentement]);
    }
  });

  it('version du texte accepté différente de la version affichée : refusée', () => {
    expect(issues(requeteAlerteSchema.safeParse({ ...valide, versionConsentement: 'occasion-alertes-v1-2026-10-10' }))).toContainEqual([
      'versionConsentement',
      MESSAGES_ALERTES.version,
    ]);
  });

  it('données inattendues refusées : prénom, référence de machine fictive, newsletter', () => {
    for (const extra of [{ prenom: 'Claire' }, { reference: 'OCC-01' }, { newsletter: true }, { famille: 'OCC-02' }]) {
      expect(requeteAlerteSchema.safeParse({ ...valide, ...extra }).success).toBe(false);
    }
    expect(champsAlerteSchema.safeParse({ email: 'a@b.fr', consentement: true, prenom: 'x' }).success).toBe(false);
  });

  it('caractères HTML : adresse refusée, champ piège borné', () => {
    expect(requeteAlerteSchema.safeParse({ ...valide, email: '<script>@x.fr' }).success).toBe(false);
    expect(requeteAlerteSchema.safeParse({ ...valide, siteWeb: 'x'.repeat(201) }).success).toBe(false);
  });

  it('jeton : longueur bornée, aucune autre clé', () => {
    expect(requeteJetonSchema.safeParse({ jeton: 'court' }).success).toBe(false);
    expect(requeteJetonSchema.safeParse({ jeton: 'x'.repeat(2049) }).success).toBe(false);
    expect(requeteJetonSchema.safeParse({ jeton: 'x'.repeat(40), email: 'a@b.fr' }).success).toBe(false);
  });

  it('texte de consentement versionné : la version désigne le texte exact', () => {
    expect(TEXTES_OPTIN[VERSION_TEXTE_OPTIN]).toBe(TEXTE_OPTIN);
    expect(TEXTE_OPTIN).toContain('indépendante de la newsletter');
  });
});

describe('Jetons chiffrés du double opt-in', () => {
  const donnees: DonneesConfirmation = {
    type: 'confirmation',
    email: 'claire@atelier.fr',
    famille: FAMILLES[0],
    versionConsentement: VERSION_TEXTE_OPTIN,
    source: '/fr/studios-photo-automatises/opportunites',
    demandeLe: T0.toISOString(),
    expireLe: T0.getTime() + DUREE_CONFIRMATION_MS,
  };

  it('aller-retour : données intactes ; l’adresse n’apparaît pas dans le jeton', () => {
    const j = creerJeton(donnees, SECRET);
    expect(j).not.toContain('claire');
    expect(Buffer.from(j, 'base64url').toString('latin1')).not.toContain('claire');
    expect(lireJetonConfirmation(j, SECRET, T0)).toEqual({ ok: true, donnees });
  });

  it('jeton expiré : refusé comme expiré (48 h)', () => {
    const j = creerJeton(donnees, SECRET);
    expect(lireJetonConfirmation(j, SECRET, new Date(T0.getTime() + DUREE_CONFIRMATION_MS - 1)).ok).toBe(true);
    expect(lireJetonConfirmation(j, SECRET, new Date(T0.getTime() + DUREE_CONFIRMATION_MS))).toEqual({ ok: false, raison: 'expire' });
  });

  it('jeton altéré, tronqué, d’un autre secret ou fabriqué : invalide', () => {
    const j = creerJeton(donnees, SECRET);
    const brut = Buffer.from(j, 'base64url');
    brut[20] ^= 1;
    expect(lireJetonConfirmation(brut.toString('base64url'), SECRET, T0)).toEqual({ ok: false, raison: 'invalide' });
    expect(lireJetonConfirmation(j.slice(0, -4), SECRET, T0).ok).toBe(false);
    expect(lireJetonConfirmation(j, `${SECRET}-autre`, T0).ok).toBe(false);
    expect(lireJetonConfirmation(Buffer.from(JSON.stringify(donnees)).toString('base64url'), SECRET, T0).ok).toBe(false);
  });

  it('types séparés : un jeton de confirmation ne désinscrit pas, et inversement', () => {
    const c = creerJeton(donnees, SECRET);
    const d = creerJeton({ type: 'desinscription', email: 'claire@atelier.fr' }, SECRET);
    expect(lireJetonDesinscription(c, SECRET).ok).toBe(false);
    expect(lireJetonConfirmation(d, SECRET, T0).ok).toBe(false);
    expect(lireJetonDesinscription(d, SECRET)).toEqual({ ok: true, donnees: { type: 'desinscription', email: 'claire@atelier.fr' } });
  });

  it('secret trop court : refusé', () => {
    expect(() => creerJeton(donnees, 'court')).toThrow();
  });
});

describe('E-mail de confirmation', () => {
  it('lien dans le fragment de la page, jamais en paramètre de requête', () => {
    const l = lienConfirmation('https://exemple.test/', 'abc');
    expect(l).toBe(`https://exemple.test/fr/studios-photo-automatises/opportunites#${ANCRE_CONFIRMATION}=abc`);
    expect(l).not.toContain('?');
    expect(lienDesinscription('https://exemple.test', 'xyz')).toContain('#desinscrire-alerte=xyz');
  });

  it('contenu : expiration, aucune inscription sans clic, indépendance de la newsletter, aucune offre ni prix', () => {
    const c = composerConfirmationAlerte({ lien: 'https://exemple.test/x#confirmer-alerte=abc', famille: '', expireLe: T0.getTime() + DUREE_CONFIRMATION_MS });
    expect(c.objet).toBe("Confirmez votre inscription aux alertes Orbitvu d'occasion");
    expect(c.texte).toContain('tous les équipements Orbitvu');
    expect(c.texte).toContain("Sans confirmation, aucune inscription n'est enregistrée.");
    expect(c.texte).toContain('indépendante de la newsletter');
    expect(c.texte).toContain('13 octobre 2026');
    expect(c.texte).not.toMatch(/€|prix|offre spéciale|promotion/i);
  });

  it('HTML échappé (famille et lien)', () => {
    const c = composerConfirmationAlerte({ lien: 'https://exemple.test/"><script>', famille: '<b>x</b>', expireLe: T0.getTime() });
    expect(c.html).not.toContain('<script>');
    expect(c.html).not.toContain('<b>x</b>');
    expect(c.html).toContain('&lt;b&gt;x&lt;/b&gt;');
  });
});
