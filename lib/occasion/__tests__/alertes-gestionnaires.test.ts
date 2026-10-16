/**
 * Routes de la liste d'alerte avec des services simulés : aucune requête réelle
 * vers Resend, aucun e-mail, aucune écriture réelle.
 */
import { describe, it, expect, vi } from 'vitest';
import { FAMILLES, OPTIN, VERSION_TEXTE_OPTIN } from '@/lib/occasion/formulaires';
import {
  ALERTES_REELLES_AUTORISEES,
  FENETRE_TEST_ALERTES_JUSQUA,
  etatAlertes,
  etatCollecte,
} from '@/lib/occasion/activation';
import { DELAI_RENVOI_MS, creerGestionnairesAlertes, type DependancesAlertes } from '@/lib/occasion/alertes/gestionnaires';
import { creerJeton, DUREE_CONFIRMATION_MS, lireJetonConfirmation, lireJetonDesinscription } from '@/lib/occasion/alertes/jeton';
import { envoiConfirmationResend, registreAlertesResend, PROPRIETES } from '@/lib/occasion/alertes/resend';
import {
  SERVICES_ALERTES_DESACTIVES,
  alertesAffichees,
  alertesOuvertes,
  servicesAlertes,
  type ServicesAlertes,
} from '@/lib/occasion/alertes/services';
import { SEGMENT, TOPIC, fauxClientAlertes } from './alertes-doublures';

const SECRET = 'secret-de-test-0123456789abcdef-0123456789';
const T0 = new Date('2026-10-11T12:00:00Z');
const corps = { email: 'Claire@Atelier.fr', famille: FAMILLES[1], consentement: true, versionConsentement: VERSION_TEXTE_OPTIN };
const ENV = {
  RESEND_API_KEY: 're_factice',
  RESEND_FROM_EMAIL: 'contact@exemple.test',
  OCCASION_ALERTES_SEGMENT_ID: SEGMENT,
  OCCASION_ALERTES_TOPIC_ID: TOPIC,
  OCCASION_ALERTES_SECRET: SECRET,
};
const OUVERTES = { alertes: true, publication: false, fenetreJusqua: '2026-10-11T14:00:00Z' };

function requete(url: string, body: unknown, ip = '203.0.113.7') {
  return new Request(`https://apercu.exemple.test${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function monter(autres: Partial<DependancesAlertes> & { horloge?: { t: Date } } = {}) {
  const f = fauxClientAlertes();
  const horloge = autres.horloge ?? { t: T0 };
  const services: ServicesAlertes =
    autres.services ??
    servicesAlertes(ENV, { verrous: OUVERTES, maintenant: horloge.t, client: () => f.client });
  const journal = vi.fn();
  const g = creerGestionnairesAlertes({
    services,
    limiter: () => ({ ok: true, resetInSec: 0 }),
    maintenant: () => horloge.t,
    journal,
    ...autres,
  });
  return { f, g, journal, horloge, services };
}

type Envoi = { to: string[]; subject: string; text: string; html: string };

/** E-mails envoyés par la doublure, de l'un ou l'autre type. */
function envois(f: ReturnType<typeof fauxClientAlertes>, ancre: 'confirmer-alerte' | 'desinscrire-alerte'): Envoi[] {
  return f.appels
    .filter((a) => a.methode === 'emails.send')
    .map((a) => a.args as Envoi)
    .filter((e) => e.text.includes(`#${ancre}=`));
}

function extraireJeton(texte: string, ancre: 'confirmer-alerte' | 'desinscrire-alerte'): string {
  const m = new RegExp(`#${ancre}=([A-Za-z0-9_-]+)`).exec(texte);
  if (!m) throw new Error('lien absent');
  return m[1];
}

/** Jeton extrait du lien de l'e-mail de confirmation (double opt-in) de rang donné. */
function jetonEnvoye(f: ReturnType<typeof fauxClientAlertes>, rang = 0): string {
  return extraireJeton(envois(f, 'confirmer-alerte')[rang].text, 'confirmer-alerte');
}

describe('Verrous : fermés par défaut, indépendants de la recherche', () => {
  it('ALERTES_REELLES_AUTORISEES faux, aucune fenêtre : services désactivés même avec toute la configuration', () => {
    expect(ALERTES_REELLES_AUTORISEES).toBe(false);
    expect(FENETRE_TEST_ALERTES_JUSQUA).toBeNull();
    expect(servicesAlertes(ENV).mode).toBe('desactive');
    expect(servicesAlertes({ ...ENV, VERCEL_ENV: 'preview' }).mode).toBe('desactive');
  });

  it('indépendance : ouvrir les alertes ne touche pas la recherche, et inversement', () => {
    const alertes = etatAlertes({ VERCEL_ENV: 'preview' }, T0, OUVERTES);
    expect(alertes.ouverte).toBe(true);
    expect(etatCollecte({ VERCEL_ENV: 'preview' }, T0, { collecte: false, publication: false, fenetreJusqua: '2026-10-11T14:00:00Z' }).ouverte).toBe(false);
    const recherche = etatCollecte({ VERCEL_ENV: 'preview' }, T0, { collecte: true, publication: false, fenetreJusqua: '2026-10-11T14:00:00Z' });
    expect(recherche.ouverte).toBe(true);
    expect(etatAlertes({ VERCEL_ENV: 'preview' }, T0).ouverte).toBe(false);
  });

  it('production (www) sans GO de publication : fermée, même fenêtre ouverte', () => {
    expect(servicesAlertes({ ...ENV, VERCEL_ENV: 'production' }, { verrous: OUVERTES, maintenant: T0 }).mode).toBe('desactive');
  });

  it('fenêtre échue ou absente hors production : fermée', () => {
    expect(servicesAlertes(ENV, { verrous: { ...OUVERTES, fenetreJusqua: '2026-10-11T11:00:00Z' }, maintenant: T0 }).mode).toBe('desactive');
    expect(servicesAlertes(ENV, { verrous: { ...OUVERTES, fenetreJusqua: null }, maintenant: T0 }).mode).toBe('desactive');
  });

  it('secret absent ou trop court, segment absent, topic absent, clé ou expéditeur absents : fermée', () => {
    const o = { verrous: OUVERTES, maintenant: T0, client: () => fauxClientAlertes().client };
    for (const env of [
      { ...ENV, OCCASION_ALERTES_SECRET: undefined },
      { ...ENV, OCCASION_ALERTES_SECRET: 'court' },
      { ...ENV, OCCASION_ALERTES_SEGMENT_ID: '' },
      { ...ENV, OCCASION_ALERTES_TOPIC_ID: undefined },
      { ...ENV, RESEND_API_KEY: undefined },
      { ...ENV, RESEND_FROM_EMAIL: '' },
    ]) {
      expect(servicesAlertes(env, o).mode).toBe('desactive');
    }
    expect(servicesAlertes(ENV, o).mode).toBe('reel');
  });

  it('état affiché : actif avec heure de fin pendant la fenêtre, inactif après', () => {
    const s = servicesAlertes(ENV, { verrous: OUVERTES, maintenant: T0, client: () => fauxClientAlertes().client });
    expect(alertesAffichees(s, T0)).toEqual({ active: true, jusqua: '2026-10-11T14:00:00.000Z' });
    expect(alertesOuvertes(s, new Date('2026-10-11T14:00:00Z'))).toBe(false);
    expect(alertesAffichees(SERVICES_ALERTES_DESACTIVES)).toEqual({ active: false, jusqua: null });
  });
});

describe('Routes fermées : 503 sans lire la demande, aucun appel externe', () => {
  it('les trois routes', async () => {
    const { g } = monter({ services: SERVICES_ALERTES_DESACTIVES });
    for (const [h, url] of [
      [g.inscription, '/api/occasion/alertes'],
      [g.confirmation, '/api/occasion/alertes/confirmation'],
      [g.desinscription, '/api/occasion/alertes/desinscription'],
    ] as const) {
      const req = requete(url, corps);
      const lecture = vi.spyOn(req, 'json');
      const res = await h(req);
      expect(res.status).toBe(503);
      expect(await res.json()).toEqual({ ok: false, error: 'alertes_unavailable' });
      expect(lecture).not.toHaveBeenCalled();
    }
  });

  it('fenêtre échue pendant la vie de l’instance : 503 à la demande suivante', async () => {
    const horloge = { t: T0 };
    const { g, f } = monter({ horloge });
    horloge.t = new Date('2026-10-11T14:00:01Z');
    expect((await g.inscription(requete('/api/occasion/alertes', corps))).status).toBe(503);
    expect(f.appels).toEqual([]);
  });
});

describe('Inscription (étape 1 du double opt-in)', () => {
  it('valide : un e-mail de confirmation, AUCUNE écriture de contact, réponse « confirmation_envoyee »', async () => {
    const { g, f } = monter();
    const res = await g.inscription(requete('/api/occasion/alertes', corps));
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(await res.json()).toEqual({ ok: true, etat: 'confirmation_envoyee' });
    expect(f.appels.map((a) => a.methode)).toEqual(['emails.send']);
    expect(f.contacts.size).toBe(0);
  });

  it('jeton : e-mail normalisé, famille, version, source, horodatage de la demande, expiration 48 h ; lien vers l’origine de la requête', async () => {
    const { g, f } = monter();
    await g.inscription(requete('/api/occasion/alertes', corps));
    const texte = (f.appels[0].args as { text: string }).text;
    expect(texte).toContain('https://apercu.exemple.test/fr/studios-photo-automatises/opportunites#confirmer-alerte=');
    const lu = lireJetonConfirmation(jetonEnvoye(f), SECRET, T0);
    expect(lu).toEqual({
      ok: true,
      donnees: {
        type: 'confirmation',
        email: 'claire@atelier.fr',
        langue: 'fr',
        famille: FAMILLES[1],
        versionConsentement: VERSION_TEXTE_OPTIN,
        source: '/fr/studios-photo-automatises/opportunites',
        demandeLe: '2026-10-11T12:00:00.000Z',
        expireLe: T0.getTime() + DUREE_CONFIRMATION_MS,
      },
    });
  });

  it('OCCASION_ALERTES_URL_BASE prioritaire sur l’origine de la requête', async () => {
    const f = fauxClientAlertes();
    const services = servicesAlertes({ ...ENV, OCCASION_ALERTES_URL_BASE: 'https://www.exemple.test' }, { verrous: OUVERTES, maintenant: T0, client: () => f.client });
    const { g } = monter({ services });
    await g.inscription(requete('/api/occasion/alertes', corps));
    expect((f.appels[0].args as { text: string }).text).toContain('https://www.exemple.test/fr/studios-photo-automatises/opportunites#confirmer-alerte=');
  });

  it('champs invalides : 400 avec erreurs par champ, rien n’est envoyé', async () => {
    const { g, f } = monter();
    const res = await g.inscription(requete('/api/occasion/alertes', { email: 'x', famille: 'Inconnue', consentement: false, versionConsentement: VERSION_TEXTE_OPTIN }));
    expect(res.status).toBe(400);
    const b = await res.json();
    expect(b.error).toBe('invalid');
    expect(Object.keys(b.fieldErrors).sort()).toEqual(['consentement', 'email', 'famille']);
    expect(f.appels).toEqual([]);
  });

  it('version du texte périmée : erreur rattachée à la case d’accord', async () => {
    const { g } = monter();
    const b = await (await g.inscription(requete('/api/occasion/alertes', { ...corps, versionConsentement: 'v0' }))).json();
    expect(Object.keys(b.fieldErrors)).toEqual(['consentement']);
  });

  it('données inattendues, corps illisible : 400', async () => {
    const { g, f } = monter();
    expect((await g.inscription(requete('/api/occasion/alertes', { ...corps, prenom: 'Claire' }))).status).toBe(400);
    expect((await g.inscription(requete('/api/occasion/alertes', '{pas du json'))).status).toBe(400);
    expect(f.appels).toEqual([]);
  });

  it('champ piège rempli : 400, aucun envoi, journal sans donnée personnelle', async () => {
    const { g, f, journal } = monter();
    expect((await g.inscription(requete('/api/occasion/alertes', { ...corps, siteWeb: 'http://spam' }))).status).toBe(400);
    expect(f.appels).toEqual([]);
    expect(JSON.stringify(journal.mock.calls)).not.toMatch(/claire|atelier/i);
  });

  it('limitation : 429 avec Retry-After, demande non lue', async () => {
    const { g, f } = monter({ limiter: () => ({ ok: false, resetInSec: 120 }) });
    const req = requete('/api/occasion/alertes', corps);
    const lecture = vi.spyOn(req, 'json');
    const res = await g.inscription(req);
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBe('120');
    expect(lecture).not.toHaveBeenCalled();
    expect(f.appels).toEqual([]);
  });

  it('double clic et rafale sur la même adresse : un seul e-mail par période, même réponse', async () => {
    const horloge = { t: T0 };
    const { g, f } = monter({ horloge });
    const [a, b] = await Promise.all([g.inscription(requete('/api/occasion/alertes', corps)), g.inscription(requete('/api/occasion/alertes', corps))]);
    expect([a.status, b.status]).toEqual([200, 200]);
    expect((await g.inscription(requete('/api/occasion/alertes', { ...corps, email: 'claire@atelier.fr' }))).status).toBe(200);
    expect(f.appels.filter((x) => x.methode === 'emails.send')).toHaveLength(1);
    horloge.t = new Date(T0.getTime() + DELAI_RENVOI_MS);
    await g.inscription(requete('/api/occasion/alertes', corps));
    expect(f.appels.filter((x) => x.methode === 'emails.send')).toHaveLength(2);
  });

  it('panne de l’envoi : 500 « technical », nouvel essai possible aussitôt', async () => {
    const { g, f } = monter();
    f.panne('emails.send');
    const res = await g.inscription(requete('/api/occasion/alertes', corps));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: 'technical' });
    f.retablir('emails.send');
    expect((await g.inscription(requete('/api/occasion/alertes', corps))).status).toBe(200);
  });

  it('réponse Resend sans identifiant : pas de succès', async () => {
    const { g, f } = monter();
    f.panne('emails.send', { sansIdentifiant: true });
    expect((await g.inscription(requete('/api/occasion/alertes', corps))).status).toBe(500);
  });
});

describe('Confirmation (étape 2) puis désinscription', () => {
  async function inscrire(m: ReturnType<typeof monter>) {
    await m.g.inscription(requete('/api/occasion/alertes', corps));
    return jetonEnvoye(m.f);
  }

  it('jeton valide : contact créé avec la preuve ; « inscrit » ; confirmation répétée « deja_inscrit »', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    m.horloge.t = new Date('2026-10-11T12:30:00Z');
    const res = await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, etat: 'inscrit' });
    const c = m.f.contacts.get('claire@atelier.fr');
    expect(c?.properties[PROPRIETES.demandeLe]).toBe('2026-10-11T12:00:00.000Z');
    expect(c?.properties[PROPRIETES.confirmeLe]).toBe('2026-10-11T12:30:00.000Z');
    expect(c?.properties[PROPRIETES.version]).toBe(VERSION_TEXTE_OPTIN);
    expect(c?.topics.get(TOPIC)).toBe('opt_in');
    expect(await (await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }))).json()).toEqual({ ok: true, etat: 'deja_inscrit' });
  });

  it('double clic simultané sur « Confirmer » : un seul traitement', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    const [a, b] = await Promise.all([
      m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton })),
      m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton })),
    ]);
    expect([(await a.json()).etat, (await b.json()).etat]).toEqual(['inscrit', 'inscrit']);
    expect(m.f.appels.filter((x) => x.methode === 'contacts.create')).toHaveLength(1);
  });

  it('jeton expiré : 410, aucune écriture', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    m.horloge.t = new Date(T0.getTime() + DUREE_CONFIRMATION_MS);
    // La fenêtre de test est échue elle aussi à cette heure : on la prolonge pour isoler l'expiration du jeton.
    const services = servicesAlertes(ENV, { verrous: { ...OUVERTES, fenetreJusqua: '2026-10-20T00:00:00Z' }, maintenant: m.horloge.t, client: () => m.f.client });
    const g2 = creerGestionnairesAlertes({ services, limiter: () => ({ ok: true, resetInSec: 0 }), maintenant: () => m.horloge.t, journal: vi.fn() });
    const res = await g2.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));
    expect(res.status).toBe(410);
    expect(await res.json()).toEqual({ ok: false, error: 'jeton_expire' });
    expect(m.f.contacts.size).toBe(0);
  });

  it('jeton altéré, fabriqué ou de désinscription : 400 « jeton_invalide », aucune écriture', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    const altere = `${jeton.slice(0, -2)}${jeton.endsWith('AA') ? 'BB' : 'AA'}`;
    const desinscription = creerJeton({ type: 'desinscription', email: 'claire@atelier.fr' }, SECRET);
    for (const j of [altere, 'x'.repeat(40), desinscription]) {
      const res = await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton: j }));
      expect(res.status).toBe(400);
      expect((await res.json()).error).toBe('jeton_invalide');
    }
    expect(m.f.contacts.size).toBe(0);
  });

  it('erreur du fournisseur à la confirmation : 500, journal sans donnée personnelle', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    m.f.panne('contacts.create');
    const res = await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));
    expect(res.status).toBe(500);
    expect(JSON.stringify(m.journal.mock.calls)).toContain('contacts.create');
    expect(JSON.stringify(m.journal.mock.calls)).not.toMatch(/claire|atelier/i);
  });

  it('désinscription, puis tentative de réinscription : « desinscrit », pas de réabonnement', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));
    const jd = creerJeton({ type: 'desinscription', email: 'claire@atelier.fr' }, SECRET);
    const res = await m.g.desinscription(requete('/api/occasion/alertes/desinscription', { jeton: jd }));
    expect(await res.json()).toEqual({ ok: true, etat: 'desinscrit' });
    expect(m.f.contacts.get('claire@atelier.fr')?.topics.get(TOPIC)).toBe('opt_out');

    // Nouvelle demande 20 minutes plus tard, puis clic sur le nouveau lien.
    m.horloge.t = new Date(T0.getTime() + DELAI_RENVOI_MS + 5 * 60 * 1000);
    await m.g.inscription(requete('/api/occasion/alertes', corps));
    const nouveau = jetonEnvoye(m.f, 1);
    const r2 = await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton: nouveau }));
    expect(await r2.json()).toEqual({ ok: true, etat: 'desinscrit' });
    expect(m.f.contacts.get('claire@atelier.fr')?.topics.get(TOPIC)).toBe('opt_out');
  });

  it('désinscription avec un jeton de confirmation : refusée', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    expect((await m.g.desinscription(requete('/api/occasion/alertes/desinscription', { jeton }))).status).toBe(400);
  });
});

describe('E-mail « Inscription confirmée » avec lien personnel de désinscription (14/10/2026)', () => {
  async function inscrire(m: ReturnType<typeof monter>, extra: Record<string, unknown> = {}) {
    await m.g.inscription(requete('/api/occasion/alertes', { ...corps, ...extra }));
    return jetonEnvoye(m.f);
  }
  const confirmer = (m: ReturnType<typeof monter>, jeton: string) => m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));

  it('l’e-mail de confirmation (double opt-in) ne porte toujours aucun lien de désinscription', async () => {
    const m = monter();
    await inscrire(m);
    const [e] = m.f.appels.map((a) => a.args as Envoi);
    expect(e.text).not.toContain('#desinscrire-alerte=');
    expect(e.html).not.toContain('#desinscrire-alerte=');
  });

  it('inscription créée : un seul e-mail, au seul inscrit, après l’écriture du contact ; son lien désinscrit réellement', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    expect(await (await confirmer(m, jeton)).json()).toEqual({ ok: true, etat: 'inscrit' });
    const methodes = m.f.appels.map((a) => a.methode);
    expect(methodes).toEqual(['emails.send', 'contacts.get', 'contacts.create', 'emails.send']);
    const [e] = envois(m.f, 'desinscrire-alerte');
    expect(e.to).toEqual(['claire@atelier.fr']);
    expect(e.subject).toBe("Inscription confirmée : nouvelles offres Orbitvu d'occasion");
    expect(e.text).toContain('https://apercu.exemple.test/fr/studios-photo-automatises/opportunites#desinscrire-alerte=');
    expect(e.text).not.toContain('#confirmer-alerte=');
    const jd = extraireJeton(e.text, 'desinscrire-alerte');
    expect(e.html).toContain(`#desinscrire-alerte=${jd}`);
    expect(lireJetonDesinscription(jd, SECRET)).toEqual({ ok: true, donnees: { type: 'desinscription', email: 'claire@atelier.fr' } });

    const res = await m.g.desinscription(requete('/api/occasion/alertes/desinscription', { jeton: jd }));
    expect(await res.json()).toEqual({ ok: true, etat: 'desinscrit' });
    const c = m.f.contacts.get('claire@atelier.fr');
    expect(c?.topics.get(TOPIC)).toBe('opt_out');
    expect(c?.segments.has(SEGMENT)).toBe(false);
    expect(c?.unsubscribed).toBe(false);
    // Non-réinscription : le lien de confirmation initial ne réabonne pas, et rien n'est envoyé.
    expect(await (await confirmer(m, jeton)).json()).toEqual({ ok: true, etat: 'desinscrit' });
    expect(envois(m.f, 'desinscrire-alerte')).toHaveLength(1);
  });

  it('confirmation répétée (« deja_inscrit ») ou adresse désinscrite (« desinscrit ») : aucun nouvel e-mail', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    await confirmer(m, jeton);
    expect(await (await confirmer(m, jeton)).json()).toEqual({ ok: true, etat: 'deja_inscrit' });
    expect(envois(m.f, 'desinscrire-alerte')).toHaveLength(1);

    const d = monter();
    d.f.contacts.set('claire@atelier.fr', {
      id: 'ct_x',
      unsubscribed: true,
      properties: {},
      segments: new Set(),
      topics: new Map(),
    });
    const j2 = await inscrire(d);
    expect(await (await confirmer(d, j2)).json()).toEqual({ ok: true, etat: 'desinscrit' });
    expect(envois(d.f, 'desinscrire-alerte')).toHaveLength(0);
  });

  it('double clic simultané sur « Confirmer » : un seul e-mail « Inscription confirmée »', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    await Promise.all([confirmer(m, jeton), confirmer(m, jeton)]);
    expect(envois(m.f, 'desinscrire-alerte')).toHaveLength(1);
  });

  it('échec de cet envoi : l’inscription reste enregistrée (200 « inscrit »), journal sans donnée personnelle, aucun renvoi au clic suivant', async () => {
    const m = monter();
    const jeton = await inscrire(m);
    m.f.panne('emails.send');
    const res = await confirmer(m, jeton);
    expect(await res.json()).toEqual({ ok: true, etat: 'inscrit' });
    expect(m.f.contacts.get('claire@atelier.fr')?.topics.get(TOPIC)).toBe('opt_in');
    expect(m.journal).toHaveBeenCalledWith('alertes.inscription_confirmee.echec_envoi');
    expect(JSON.stringify(m.journal.mock.calls)).not.toMatch(/claire|atelier/i);
    m.f.retablir('emails.send');
    expect(await (await confirmer(m, jeton)).json()).toEqual({ ok: true, etat: 'deja_inscrit' });
    expect(m.f.appels.filter((a) => a.methode === 'emails.send')).toHaveLength(2);
  });

  it('OCCASION_ALERTES_URL_BASE prioritaire pour le lien de désinscription', async () => {
    const f = fauxClientAlertes();
    const services = servicesAlertes({ ...ENV, OCCASION_ALERTES_URL_BASE: 'https://www.exemple.test' }, { verrous: OUVERTES, maintenant: T0, client: () => f.client });
    const m = monter({ services });
    await m.g.inscription(requete('/api/occasion/alertes', corps));
    const jeton = extraireJeton(envois(f, 'confirmer-alerte')[0].text, 'confirmer-alerte');
    await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));
    expect(envois(f, 'desinscrire-alerte')[0].text).toContain('https://www.exemple.test/fr/studios-photo-automatises/opportunites#desinscrire-alerte=');
  });

  it.each([
    ['en', 'Subscription confirmed: new pre-owned Orbitvu offers', '/en/', 'Unsubscribe'],
    ['de-ch', 'Anmeldung bestätigt: neue Orbitvu-Occasionsangebote', '/de-ch/', 'Abmelden'],
  ] as const)('%s : objet, texte et lien dans la langue de la page', async (langue, objet, chemin, libelle) => {
    const m = monter();
    const jeton = await inscrire(m, { langue, versionConsentement: OPTIN[langue].version });
    expect(await (await confirmer(m, jeton)).json()).toEqual({ ok: true, etat: 'inscrit' });
    const [e] = envois(m.f, 'desinscrire-alerte');
    expect(e.subject).toBe(objet);
    expect(e.text).toContain(`https://apercu.exemple.test${chemin}studios-photo-automatises/opportunites#desinscrire-alerte=`);
    expect(e.html).toContain(`>${libelle}</a>`);
  });
});

describe('Parcours en anglais et en allemand (Suisse)', () => {
  it('EN : e-mail en anglais vers /en/…, jeton et source de la langue, contact créé avec la source anglaise', async () => {
    const m = monter();
    const res = await m.g.inscription(requete('/api/occasion/alertes', { ...corps, langue: 'en', versionConsentement: OPTIN.en.version }));
    expect(res.status).toBe(200);
    const envoi = m.f.appels[0].args as { subject: string; text: string };
    expect(envoi.subject).toBe('Confirm your subscription to new pre-owned Orbitvu offers');
    expect(envoi.text).toContain('https://apercu.exemple.test/en/studios-photo-automatises/opportunites#confirmer-alerte=');
    const jeton = jetonEnvoye(m.f);
    const lu = lireJetonConfirmation(jeton, SECRET, T0);
    expect(lu.ok && lu.donnees.langue).toBe('en');
    expect(lu.ok && lu.donnees.source).toBe('/en/studios-photo-automatises/opportunites');
    await m.g.confirmation(requete('/api/occasion/alertes/confirmation', { jeton }));
    const c = m.f.contacts.get('claire@atelier.fr');
    expect(c?.properties[PROPRIETES.source]).toBe('/en/studios-photo-automatises/opportunites');
    expect(c?.properties[PROPRIETES.version]).toBe(OPTIN.en.version);
  });

  it('DE-CH : version française envoyée avec la langue de-ch → refusée (texte accepté non prouvé)', async () => {
    const m = monter();
    const res = await m.g.inscription(requete('/api/occasion/alertes', { ...corps, langue: 'de-ch', versionConsentement: OPTIN.fr.version }));
    expect(res.status).toBe(400);
    expect(Object.keys((await res.json()).fieldErrors)).toEqual(['consentement']);
    expect(m.f.appels).toEqual([]);
  });
});

describe('Adaptateurs injectés : aucune dépendance cachée', () => {
  it('les services réels n’utilisent que le client fourni', async () => {
    const f = fauxClientAlertes();
    const envoi = envoiConfirmationResend(f.client, 'a@b.test');
    const registre = registreAlertesResend(f.client, { segmentId: SEGMENT, topicId: TOPIC });
    await envoi.envoyer({ email: 'x@y.fr', famille: '', lien: 'https://e.test/#confirmer-alerte=a', expireLe: 0 });
    await envoi.inscriptionConfirmee({ email: 'x@y.fr', famille: '', lienDesinscription: 'https://e.test/#desinscrire-alerte=a' });
    await registre.desinscrire('x@y.fr', T0);
    expect(f.appels.map((a) => a.methode)).toEqual(['emails.send', 'emails.send', 'contacts.get']);
  });
});
