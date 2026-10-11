/**
 * Route /api/occasion avec des services simulés : aucun appel réseau, aucun
 * e-mail, aucun CRM. Chaque branche d'échec est testée pour qu'aucun faux succès
 * ne soit renvoyé (mission S0 du 11/10/2026).
 */
import { describe, it, expect, vi } from 'vitest';
import { creerGestionnaireOccasion, type DependancesOccasion } from '@/lib/occasion/gestionnaire';
import { SERVICES_OCCASION_DESACTIVES, type ServicesOccasion } from '@/lib/occasion/services';
import type { DemandeRecherche } from '@/lib/occasion/schema';

const corps = {
  firstName: 'Claire',
  email: 'claire@atelier-exemple.fr',
  company: 'Atelier Exemple',
  besoin: 'Bijoux, photos 360, budget serré',
  requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
};

function requete(body: unknown, ip = '203.0.113.7') {
  return new Request('http://localhost/api/occasion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function doublures(references: string[] = [], ouverteJusqua: number | null = null) {
  const ordre: string[] = [];
  const notifier = vi.fn<(d: DemandeRecherche) => Promise<{ id: string }>>(async () => {
    ordre.push('notification');
    return { id: 'msg_interne' };
  });
  const envoyer = vi.fn<(d: DemandeRecherche) => Promise<{ envoye: boolean }>>(async () => {
    ordre.push('accuse');
    return { envoye: true };
  });
  const services: ServicesOccasion = {
    mode: 'reel',
    notification: { notifier },
    accuse: { envoyer },
    referencesDisponibles: () => references,
    ouverteJusqua,
  };
  return { services, notifier, envoyer, ordre };
}

function gestionnaire(services: ServicesOccasion, autres: Partial<DependancesOccasion> = {}) {
  const journal = vi.fn();
  const g = creerGestionnaireOccasion({
    services,
    limiter: () => ({ ok: true, resetInSec: 0 }),
    maintenant: () => new Date('2026-10-11T12:00:00Z'),
    journal,
    ...autres,
  });
  return { g, journal };
}

describe('POST /api/occasion — demande reçue', () => {
  it('recherche sans machine : notification interne PUIS accusé, réponse 200 sans cache', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(await res.json()).toEqual({ ok: true, ackSent: true });
    expect(d.ordre).toEqual(['notification', 'accuse']);
    const demande = d.notifier.mock.calls[0][0];
    expect(demande).toMatchObject({ reference: '', pageSource: 'occasion_studios_orbitvu', recueLe: '2026-10-11T12:00:00.000Z' });
  });

  it('référence réelle disponible : acceptée et transmise', async () => {
    const d = doublures(['OCC-2026-01']);
    const { g } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, reference: 'OCC-2026-01', budget: '15 k€', horizon: 'De 3 à 6 mois' }));
    expect(res.status).toBe(200);
    expect(d.notifier.mock.calls[0][0]).toMatchObject({ reference: 'OCC-2026-01', budget: '15 k€', horizon: 'De 3 à 6 mois' });
  });
});

describe('POST /api/occasion — refus et échecs, sans faux succès', () => {
  it('référence fictive (exemple de Preview) rejetée : 409, aucun envoi', async () => {
    const d = doublures([]);
    const { g } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, reference: 'OCC-01' }));
    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ ok: false, error: 'reference_unavailable' });
    expect(d.notifier).not.toHaveBeenCalled();
    expect(d.envoyer).not.toHaveBeenCalled();
  });

  it('validation : champs obligatoires, e-mail, longueurs, listes fermées', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const res = await g(
      requete({ ...corps, firstName: '', email: 'pas-un-email', besoin: 'x'.repeat(1001), horizon: 'Demain', company: 'a'.repeat(121) }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('invalid');
    expect(Object.keys(body.fieldErrors).sort()).toEqual(['besoin', 'company', 'email', 'firstName', 'horizon']);
    expect(d.notifier).not.toHaveBeenCalled();
  });

  it('corps illisible ou requestId absent : 400', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    expect((await g(requete('{pas du json'))).status).toBe(400);
    expect((await g(requete({ ...corps, requestId: undefined }))).status).toBe(400);
    expect(d.notifier).not.toHaveBeenCalled();
  });

  it('champ piège rempli : 400, aucun envoi, journal sans donnée personnelle', async () => {
    const d = doublures();
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, siteWeb: 'http://spam.example' }));
    expect(res.status).toBe(400);
    expect(d.notifier).not.toHaveBeenCalled();
    expect(journal).toHaveBeenCalledWith('occasion.piege', { requestId: corps.requestId });
  });

  it('limitation : 429 avec Retry-After, demande non lue', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services, { limiter: () => ({ ok: false, resetInSec: 120 }) });
    const res = await g(requete(corps));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBe('120');
    expect(d.notifier).not.toHaveBeenCalled();
  });

  it('panne de la notification interne : 500, AUCUN accusé, nouvel essai possible', async () => {
    const d = doublures();
    d.notifier.mockRejectedValueOnce(new Error('resend error'));
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: 'technical' });
    expect(d.envoyer).not.toHaveBeenCalled();
    expect(journal).toHaveBeenCalledWith('occasion.notification.echec', { requestId: corps.requestId });
    // Le même requestId peut être retenté après un échec.
    const res2 = await g(requete(corps));
    expect(res2.status).toBe(200);
    expect(d.notifier).toHaveBeenCalledTimes(2);
  });

  it('panne du seul accusé : la demande est reçue (200, ackSent false)', async () => {
    const d = doublures();
    d.envoyer.mockResolvedValueOnce({ envoye: false });
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, ackSent: false });
    expect(journal).toHaveBeenCalledWith('occasion.accuse.echec', { requestId: corps.requestId });
  });

  it('accusé qui lève : la demande reste reçue', async () => {
    const d = doublures();
    d.envoyer.mockRejectedValueOnce(new Error('reseau'));
    const { g } = gestionnaire(d.services);
    expect(await (await g(requete(corps))).json()).toEqual({ ok: true, ackSent: false });
  });

  it('anti-doublon de l’instance : même requestId, une seule notification', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const [a, b] = await Promise.all([g(requete(corps)), g(requete(corps))]);
    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    await g(requete(corps));
    expect(d.notifier).toHaveBeenCalledTimes(1);
    expect(d.envoyer).toHaveBeenCalledTimes(1);
  });
});

describe('POST /api/occasion — verrou fermé (COLLECTE_REELLE_AUTORISEE = false)', () => {
  it('503 sans lire la demande, aucun envoi', async () => {
    const { g } = gestionnaire(SERVICES_OCCASION_DESACTIVES);
    const req = requete(corps);
    const lecture = vi.spyOn(req, 'json');
    const res = await g(req);
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'occasion_unavailable' });
    expect(lecture).not.toHaveBeenCalled();
  });
});

describe('POST /api/occasion — fenêtre de test réel (FENETRE_TEST_JUSQUA)', () => {
  // Heure fixe du gestionnaire de test : 2026-10-11T12:00:00Z.
  const FIN = Date.parse('2026-10-11T13:00:00Z');

  it('fenêtre en cours : la demande est traitée', async () => {
    const d = doublures([], FIN);
    const { g } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(d.ordre).toEqual(['notification', 'accuse']);
  });

  it('fenêtre échue (déploiement de test oublié) : 503 sans lire la demande, aucun envoi', async () => {
    const d = doublures([], FIN);
    const { g } = gestionnaire(d.services, { maintenant: () => new Date('2026-10-11T13:00:00Z') });
    const req = requete(corps);
    const lecture = vi.spyOn(req, 'json');
    const res = await g(req);
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'occasion_unavailable' });
    expect(lecture).not.toHaveBeenCalled();
    expect(d.notifier).not.toHaveBeenCalled();
    expect(d.envoyer).not.toHaveBeenCalled();
  });

  it('la fin est revérifiée à chaque demande, pas seulement au démarrage de l’instance', async () => {
    const d = doublures([], FIN);
    let instant = new Date('2026-10-11T12:59:00Z');
    const { g } = gestionnaire(d.services, { maintenant: () => instant });
    expect((await g(requete(corps))).status).toBe(200);
    instant = new Date('2026-10-11T13:01:00Z');
    expect((await g(requete({ ...corps, requestId: '4a2e3d5c-6b7f-4a81-9b2c-1d2e3f4a5b6c' }))).status).toBe(503);
    expect(d.notifier).toHaveBeenCalledTimes(1);
  });
});

describe('Journal : aucune donnée personnelle', () => {
  it('aucun événement ne porte e-mail, prénom, entreprise, téléphone ni besoin', async () => {
    const d = doublures();
    d.notifier.mockRejectedValueOnce(new Error('x'));
    const { g, journal } = gestionnaire(d.services);
    await g(requete({ ...corps, telephone: '0102030405' }));
    await g(requete({ ...corps, siteWeb: 'x' }));
    await g(requete({ ...corps, reference: 'OCC-99' }));
    const texte = JSON.stringify(journal.mock.calls);
    for (const pii of [corps.email, corps.firstName, corps.company, '0102030405', corps.besoin]) {
      expect(texte).not.toContain(pii);
    }
  });
});
