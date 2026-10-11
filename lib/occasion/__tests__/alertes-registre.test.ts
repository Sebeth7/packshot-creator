/**
 * Adaptateur Resend de la liste d'alerte, avec un client simulé
 * (`alertes-doublures.ts`) : aucune requête réelle, aucune écriture réelle.
 */
import { describe, it, expect } from 'vitest';
import { VERSION_TEXTE_OPTIN } from '@/lib/occasion/formulaires';
import { PROPRIETES, envoiConfirmationResend, registreAlertesResend } from '@/lib/occasion/alertes/resend';
import type { InscriptionAlerte } from '@/lib/occasion/alertes/schema';
import { SEGMENT, TOPIC, fauxClientAlertes } from './alertes-doublures';

const inscription: InscriptionAlerte = {
  email: 'claire@atelier.fr',
  famille: 'Alphatable / Alphadesk',
  versionConsentement: VERSION_TEXTE_OPTIN,
  source: '/fr/studios-photo-automatises/opportunites',
  demandeLe: '2026-10-11T12:00:00.000Z',
  confirmeLe: '2026-10-11T12:05:00.000Z',
};
const T = new Date('2026-10-12T09:00:00Z');

function registre(f = fauxClientAlertes()) {
  return { f, r: registreAlertesResend(f.client, { segmentId: SEGMENT, topicId: TOPIC }) };
}

describe('Confirmation : nouveau contact', () => {
  it('un seul appel de création : segment dédié, topic dédié en opt_in, preuve de consentement complète', async () => {
    const { f, r } = registre();
    expect(await r.confirmer(inscription)).toBe('inscrit');
    expect(f.ecritures().map((a) => a.methode)).toEqual(['contacts.create']);
    const c = f.contacts.get('claire@atelier.fr');
    expect(c?.segments).toEqual(new Set([SEGMENT]));
    expect(c?.topics).toEqual(new Map([[TOPIC, 'opt_in']]));
    expect(c?.properties).toEqual({
      [PROPRIETES.etat]: 'confirme',
      [PROPRIETES.demandeLe]: '2026-10-11T12:00:00.000Z',
      [PROPRIETES.confirmeLe]: '2026-10-11T12:05:00.000Z',
      [PROPRIETES.version]: VERSION_TEXTE_OPTIN,
      [PROPRIETES.source]: '/fr/studios-photo-automatises/opportunites',
      [PROPRIETES.famille]: 'Alphatable / Alphadesk',
    });
  });

  it('aucun champ « unsubscribed », prénom ou nom dans les écritures', async () => {
    const { f, r } = registre();
    await r.confirmer(inscription);
    const texte = JSON.stringify(f.ecritures());
    expect(texte).not.toMatch(/unsubscribed|firstName|lastName|first_name/);
  });
});

describe('Confirmation : contact existant (contacts globaux)', () => {
  it('abonné newsletter : ajouté à notre segment et notre topic seulement, autres préférences intactes', async () => {
    const { f, r } = registre();
    f.ajouterContact('claire@atelier.fr', {
      segments: new Set(['seg_newsletter']),
      topics: new Map([['top_newsletter', 'opt_in']]),
      properties: { prenom_newsletter: 'Claire' },
    });
    expect(await r.confirmer(inscription)).toBe('inscrit');
    const c = f.contacts.get('claire@atelier.fr');
    expect(c?.segments).toEqual(new Set(['seg_newsletter', SEGMENT]));
    expect(c?.topics).toEqual(new Map([['top_newsletter', 'opt_in'], [TOPIC, 'opt_in']]));
    expect(c?.properties.prenom_newsletter).toBe('Claire');
    expect(c?.unsubscribed).toBe(false);
    for (const a of f.ecritures()) expect(JSON.stringify(a.args)).not.toContain('top_newsletter');
  });

  it('non abonné à la newsletter : la confirmation Occasion ne l’y inscrit pas', async () => {
    const { f, r } = registre();
    f.ajouterContact('claire@atelier.fr', { topics: new Map([['top_newsletter', 'opt_out']]) });
    await r.confirmer(inscription);
    expect(f.contacts.get('claire@atelier.fr')?.topics.get('top_newsletter')).toBe('opt_out');
  });

  it('déjà inscrit : « deja_inscrit », aucune écriture (confirmation répétée idempotente)', async () => {
    const { f, r } = registre();
    expect(await r.confirmer(inscription)).toBe('inscrit');
    const avant = f.ecritures().length;
    expect(await r.confirmer({ ...inscription, confirmeLe: '2026-10-11T13:00:00.000Z' })).toBe('deja_inscrit');
    expect(f.ecritures().length).toBe(avant);
    expect(f.contacts.get('claire@atelier.fr')?.properties[PROPRIETES.confirmeLe]).toBe('2026-10-11T12:05:00.000Z');
  });

  it('globalement désinscrit : jamais modifié, « desinscrit »', async () => {
    const { f, r } = registre();
    f.ajouterContact('claire@atelier.fr', { unsubscribed: true });
    expect(await r.confirmer(inscription)).toBe('desinscrit');
    expect(f.ecritures()).toEqual([]);
    expect(f.contacts.get('claire@atelier.fr')?.unsubscribed).toBe(true);
  });

  it('désinscrit de la liste Occasion (par notre lien) puis nouvelle confirmation : pas de réinscription', async () => {
    const { f, r } = registre();
    await r.confirmer(inscription);
    await r.desinscrire('claire@atelier.fr', T);
    const avant = f.ecritures().length;
    expect(await r.confirmer({ ...inscription, confirmeLe: '2026-10-13T10:00:00.000Z' })).toBe('desinscrit');
    expect(f.ecritures().length).toBe(avant);
    expect(f.contacts.get('claire@atelier.fr')?.topics.get(TOPIC)).toBe('opt_out');
  });

  it('désinscrit par la page de préférences de Resend (topic seul) : pas de réinscription', async () => {
    const { f, r } = registre();
    await r.confirmer(inscription);
    f.contacts.get('claire@atelier.fr')?.topics.set(TOPIC, 'opt_out');
    expect(await r.confirmer(inscription)).toBe('desinscrit');
  });

  it('reprise d’une confirmation interrompue (segment ajouté, topic non) : complétée sans doublon', async () => {
    const { f, r } = registre();
    f.ajouterContact('claire@atelier.fr', { segments: new Set([SEGMENT]) });
    f.panne('topics.update');
    await expect(r.confirmer(inscription)).rejects.toThrow();
    f.retablir('topics.update');
    expect(await r.confirmer(inscription)).toBe('inscrit');
    expect(f.appels.filter((a) => a.methode === 'segments.add')).toEqual([]);
    expect(f.contacts.get('claire@atelier.fr')?.topics.get(TOPIC)).toBe('opt_in');
  });
});

describe('Confirmation : erreurs du fournisseur, jamais un faux succès', () => {
  it('segment absent chez Resend : la création échoue et lève', async () => {
    const f = fauxClientAlertes({ segmentsExistants: [] });
    await expect(registre(f).r.confirmer(inscription)).rejects.toThrow(/contacts.create : not_found/);
  });

  it('topic absent chez Resend : lève', async () => {
    const f = fauxClientAlertes({ topicsExistants: [] });
    await expect(registre(f).r.confirmer(inscription)).rejects.toThrow(/not_found/);
    const g = fauxClientAlertes({ topicsExistants: [] });
    g.ajouterContact('claire@atelier.fr');
    await expect(registre(g).r.confirmer(inscription)).rejects.toThrow(/contacts.topics.update : not_found/);
  });

  it('erreur à la lecture du contact (autre que « introuvable ») : lève, aucune écriture', async () => {
    const { f, r } = registre();
    f.panne('contacts.get', { error: { name: 'rate_limit_exceeded', statusCode: 429, message: 'x' } });
    await expect(r.confirmer(inscription)).rejects.toThrow(/contacts.get : rate_limit_exceeded/);
    expect(f.ecritures()).toEqual([]);
  });

  it('réponse sans identifiant attendu : lève', async () => {
    const { f, r } = registre();
    f.panne('contacts.create', { sansIdentifiant: true });
    await expect(r.confirmer(inscription)).rejects.toThrow(/sans_identifiant/);
  });

  it('erreur à l’écriture de la preuve : lève', async () => {
    const { f, r } = registre();
    f.ajouterContact('claire@atelier.fr');
    f.panne('contacts.update');
    await expect(r.confirmer(inscription)).rejects.toThrow(/contacts.update/);
  });
});

describe('Désinscription', () => {
  it('inscrit : topic Occasion en opt_out, sorti du segment, datée ; newsletter et statut global intacts', async () => {
    const { f, r } = registre();
    f.ajouterContact('claire@atelier.fr', { segments: new Set(['seg_newsletter']), topics: new Map([['top_newsletter', 'opt_in']]) });
    await r.confirmer(inscription);
    expect(await r.desinscrire('claire@atelier.fr', T)).toBe('desinscrit');
    const c = f.contacts.get('claire@atelier.fr');
    expect(c?.topics).toEqual(new Map([['top_newsletter', 'opt_in'], [TOPIC, 'opt_out']]));
    expect(c?.segments).toEqual(new Set(['seg_newsletter']));
    expect(c?.unsubscribed).toBe(false);
    expect(c?.properties[PROPRIETES.etat]).toBe('desinscrit');
    expect(c?.properties[PROPRIETES.desinscritLe]).toBe('2026-10-12T09:00:00.000Z');
  });

  it('adresse inconnue : aucune création de contact, aucune écriture', async () => {
    const { f, r } = registre();
    expect(await r.desinscrire('inconnu@exemple.fr', T)).toBe('desinscrit');
    expect(f.ecritures()).toEqual([]);
    expect(f.contacts.has('inconnu@exemple.fr')).toBe(false);
  });

  it('erreur du fournisseur : lève (pas de faux « désinscrit »)', async () => {
    const { f, r } = registre();
    await r.confirmer(inscription);
    f.panne('topics.update');
    await expect(r.desinscrire('claire@atelier.fr', T)).rejects.toThrow(/contacts.topics.update/);
  });
});

describe('Envoi de l’e-mail de confirmation', () => {
  const p = { email: 'claire@atelier.fr', famille: '', lien: 'https://exemple.test/x#confirmer-alerte=abc', expireLe: Date.parse('2026-10-13T12:00:00Z') };

  it('au seul inscrit, expéditeur PackshotCreator, identifiant Resend exigé ; aucune écriture de contact', async () => {
    const f = fauxClientAlertes();
    expect(await envoiConfirmationResend(f.client, 'contact@exemple.test').envoyer(p)).toEqual({ id: 'msg_1' });
    const m = f.appels[0].args as { to: string[]; from: string; text: string };
    expect(m.to).toEqual(['claire@atelier.fr']);
    expect(m.from).toBe('PackshotCreator <contact@exemple.test>');
    expect(m.text).toContain(p.lien);
    expect(f.appels.map((a) => a.methode)).toEqual(['emails.send']);
  });

  it('erreur Resend ou réponse sans identifiant : lève', async () => {
    const f = fauxClientAlertes();
    f.panne('emails.send');
    await expect(envoiConfirmationResend(f.client, 'a@b.test').envoyer(p)).rejects.toThrow(/emails.send/);
    const g = fauxClientAlertes();
    g.panne('emails.send', { sansIdentifiant: true });
    await expect(envoiConfirmationResend(g.client, 'a@b.test').envoyer(p)).rejects.toThrow(/sans_identifiant/);
  });
});
