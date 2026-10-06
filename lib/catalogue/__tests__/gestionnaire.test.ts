/**
 * Route /api/catalogue, avec des services simulés : aucun appel externe.
 * Chaque branche d'échec est testée pour qu'aucun faux succès ne soit renvoyé.
 */
import { describe, it, expect, vi } from 'vitest';
import { creerGestionnaireCatalogue, type DependancesCatalogue } from '@/lib/catalogue/gestionnaire';
import {
  SERVICES_DESACTIVES,
  servicesCatalogue,
  type EnregistrementCatalogue,
  type ServicesCatalogue,
} from '@/lib/catalogue/services';
import type { DemandeCatalogue } from '@/lib/catalogue/schema';
import type { SuiviCatalogue } from '@/lib/catalogue/crm';

const PDF = 'https://exemple.test/catalogue.pdf';

const corps = {
  firstName: 'Claire',
  email: 'claire@atelier-exemple.fr',
  company: 'Atelier Exemple',
  country: 'FR',
  products: 'Bijoux',
  consultantOptIn: false,
  requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
};

function requete(body: unknown, ip = '203.0.113.7') {
  return new Request('http://localhost/api/catalogue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function doublures(surcharge: Partial<ServicesCatalogue> = {}) {
  const enregistrer = vi.fn<(d: DemandeCatalogue) => Promise<EnregistrementCatalogue>>(async () => ({
    reference: 'note-1',
    personId: 7,
    dejaEnregistree: false,
  }));
  const consignerSuivi = vi.fn<(r: string, d: DemandeCatalogue, s: SuiviCatalogue) => Promise<void>>(async () => {});
  const envoyerLien = vi.fn<(d: DemandeCatalogue, u: string) => Promise<{ envoye: boolean }>>(async () => ({ envoye: true }));
  const notifier = vi.fn<(d: DemandeCatalogue, e: EnregistrementCatalogue) => Promise<void>>(async () => {});
  const services: ServicesCatalogue = {
    mode: 'desactive',
    pdfUrl: async () => PDF,
    stockage: { enregistrer, consignerSuivi },
    courriel: { envoyerLien },
    notification: { notifier },
    ...surcharge,
  };
  return { services, enregistrer, consignerSuivi, envoyerLien, notifier };
}

function gestionnaire(services: ServicesCatalogue, autres: Partial<DependancesCatalogue> = {}) {
  const journal = vi.fn();
  const g = creerGestionnaireCatalogue({
    services,
    limiter: () => ({ ok: true, resetInSec: 0 }),
    maintenant: () => new Date('2026-10-02T12:00:00Z'),
    journal,
    ...autres,
  });
  return { g, journal };
}

describe('POST /api/catalogue — parcours accepté', () => {
  it('enregistre, envoie le lien et répond avec l’URL du PDF', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF, emailSent: true, contactRequestAccepted: false });
    expect(d.enregistrer).toHaveBeenCalledTimes(1);
    const demande = d.enregistrer.mock.calls[0][0];
    expect(demande).toMatchObject({
      country: 'FR',
      pageSource: 'catalogue_all_in_one',
      consultantOptIn: false,
      recueLe: '2026-10-02T12:00:00.000Z',
    });
    expect(d.envoyerLien).toHaveBeenCalledWith(demande, PDF);
    // Lead brochure : l'équipe est notifiée, sans demande de consultant.
    expect(d.notifier).toHaveBeenCalledTimes(1);
    expect(d.notifier.mock.calls[0][0].consultantOptIn).toBe(false);
    // Ce qui a été fait est consigné dans la trace.
    expect(d.consignerSuivi).toHaveBeenCalledWith('note-1', demande, {
      emailSent: true,
      notification: 'transmise',
      consultant: 'non_demande',
    });
  });

  it('consultant demandé et transmis : contactRequestAccepted vrai', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toMatchObject({ ok: true, contactRequestAccepted: true });
    expect(d.notifier).toHaveBeenCalledTimes(1);
    expect(d.notifier.mock.calls[0][1]).toMatchObject({ reference: 'note-1', personId: 7 });
    expect(d.consignerSuivi.mock.calls[0][2]).toEqual({ emailSent: true, notification: 'transmise', consultant: 'transmis' });
  });

  it('conserve le pays et l’attribution first-touch', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const attribution = { utmSource: 'chatgpt.com', landingPage: '/fr/catalogue-orbitvu-all-in-one' };
    await g(requete({ ...corps, country: 'CH', attribution }));
    expect(d.enregistrer.mock.calls[0][0]).toMatchObject({ country: 'CH', attribution });
  });
});

describe('POST /api/catalogue — échecs dits tels quels', () => {
  it('e-mail en échec : PDF accessible, emailSent faux', async () => {
    const d = doublures();
    d.envoyerLien.mockRejectedValueOnce(new Error('resend indisponible'));
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF, emailSent: false, contactRequestAccepted: false });
    expect(journal).toHaveBeenCalledWith('catalogue.courriel.echec', expect.any(Object));
  });

  it('e-mail non confirmé par le service : emailSent faux', async () => {
    const d = doublures();
    d.envoyerLien.mockResolvedValueOnce({ envoye: false });
    const { g } = gestionnaire(d.services);
    expect(await (await g(requete(corps))).json()).toMatchObject({ ok: true, emailSent: false });
  });

  it('aucun service d’e-mail : emailSent faux, jamais présumé', async () => {
    const d = doublures({ courriel: null });
    const { g } = gestionnaire(d.services);
    expect(await (await g(requete(corps))).json()).toMatchObject({ ok: true, emailSent: false });
  });

  it('notification en échec avec consultant demandé : contactRequestAccepted faux, consigné tel quel', async () => {
    const d = doublures();
    d.notifier.mockRejectedValueOnce(new Error('resend indisponible'));
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF, emailSent: true, contactRequestAccepted: false });
    expect(journal).toHaveBeenCalledWith('catalogue.notification.echec', expect.any(Object));
    expect(d.consignerSuivi.mock.calls[0][2]).toEqual({
      emailSent: true,
      notification: 'non_transmise',
      consultant: 'non_transmis',
    });
  });

  it('notification en échec sur une brochure seule : la brochure reste remise, l’échec est consigné', async () => {
    const d = doublures();
    d.notifier.mockRejectedValueOnce(new Error('resend indisponible'));
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF, emailSent: true, contactRequestAccepted: false });
    expect(journal).toHaveBeenCalledWith('catalogue.notification.echec', expect.any(Object));
    expect(d.consignerSuivi.mock.calls[0][2]).toMatchObject({ notification: 'non_transmise', consultant: 'non_demande' });
  });

  it('notification non configurée : jamais présumée, une demande de consultant n’est pas déclarée prise en compte', async () => {
    const d = doublures({ notification: null });
    const { g, journal } = gestionnaire(d.services);
    expect(await (await g(requete({ ...corps, consultantOptIn: true }))).json()).toMatchObject({
      ok: true,
      contactRequestAccepted: false,
    });
    expect(journal).toHaveBeenCalledWith('catalogue.notification.non_configuree', expect.any(Object));
    expect(d.consignerSuivi.mock.calls[0][2]).toMatchObject({ notification: 'non_configuree', consultant: 'non_transmis' });
  });

  it('écart secondaire du CRM signalé par la trace : demande acceptée, écart au journal', async () => {
    const d = doublures();
    d.enregistrer.mockResolvedValueOnce({
      reference: 'note-1',
      dejaEnregistree: false,
      anomalies: ['catalogue.crm.organisation.echec'],
    });
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(journal).toHaveBeenCalledWith('catalogue.crm.organisation.echec', expect.any(Object));
  });

  it('suivi non consigné : la réponse ne change pas, l’échec est signalé', async () => {
    const d = doublures();
    d.consignerSuivi.mockRejectedValueOnce(new Error('pipedrive 500'));
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF, emailSent: true, contactRequestAccepted: false });
    expect(journal).toHaveBeenCalledWith('catalogue.crm.suivi.echec', expect.any(Object));
  });

  it('stockage en échec : erreur technique, aucun e-mail ni CRM', async () => {
    const d = doublures();
    d.enregistrer.mockRejectedValueOnce(new Error('base indisponible'));
    const { g } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: 'technical' });
    expect(d.envoyerLien).not.toHaveBeenCalled();
    expect(d.notifier).not.toHaveBeenCalled();
    expect(d.consignerSuivi).not.toHaveBeenCalled();
  });

  it('PDF absent : catalogue indisponible, rien n’est enregistré', async () => {
    const d = doublures({ pdfUrl: async () => null });
    const { g } = gestionnaire(d.services);
    const res = await g(requete(corps));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'catalogue_unavailable' });
    expect(d.enregistrer).not.toHaveBeenCalled();
    expect(d.envoyerLien).not.toHaveBeenCalled();
  });

  it('PDF en erreur : catalogue indisponible', async () => {
    const d = doublures({ pdfUrl: async () => { throw new Error('stockage du PDF injoignable'); } });
    const { g } = gestionnaire(d.services);
    expect((await g(requete(corps))).status).toBe(503);
    expect(d.enregistrer).not.toHaveBeenCalled();
  });

  it('stockage absent : catalogue indisponible même avec un PDF', async () => {
    const d = doublures({ stockage: null });
    const { g } = gestionnaire(d.services);
    expect((await g(requete(corps))).status).toBe(503);
    expect(d.envoyerLien).not.toHaveBeenCalled();
  });
});

describe('POST /api/catalogue — validation et anti-abus', () => {
  it('pays absent : 400 avec le message du champ, aucun service appelé', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const sansPays: Record<string, unknown> = { ...corps };
    delete sansPays.country;
    const res = await g(requete(sansPays));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      ok: false,
      error: 'invalid',
      fieldErrors: { country: 'Sélectionnez France ou Suisse.' },
    });
    expect(d.enregistrer).not.toHaveBeenCalled();
  });

  it('pays hors France et Suisse refusé côté serveur', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    expect((await g(requete({ ...corps, country: 'DE' }))).status).toBe(400);
  });

  it('corps illisible : 400', async () => {
    const { g } = gestionnaire(doublures().services);
    const res = await g(requete('{pas du json'));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'invalid' });
  });

  it('champ piège rempli : 400, aucun effet', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, siteWeb: 'https://spam.example' }));
    expect(res.status).toBe(400);
    expect(d.enregistrer).not.toHaveBeenCalled();
  });

  it('double clic : deux requêtes simultanées, un seul enregistrement, même réponse', async () => {
    const d = doublures();
    let liberer: () => void = () => {};
    d.enregistrer.mockImplementationOnce(
      () => new Promise<EnregistrementCatalogue>((r) => { liberer = () => r({ reference: 'note-1', dejaEnregistree: false }); }),
    );
    const { g } = gestionnaire(d.services);
    const p1 = g(requete({ ...corps, consultantOptIn: true }));
    const p2 = g(requete({ ...corps, consultantOptIn: true }));
    await new Promise((r) => setTimeout(r, 0));
    liberer();
    const [r1, r2] = await Promise.all([p1, p2]);
    expect(await r1.json()).toEqual(await r2.json());
    expect(d.enregistrer).toHaveBeenCalledTimes(1);
    expect(d.envoyerLien).toHaveBeenCalledTimes(1);
    expect(d.notifier).toHaveBeenCalledTimes(1);
  });

  it('demande déjà tracée (autre instance) : aucun effet rejoué, suivi consigné repris', async () => {
    const d = doublures();
    d.enregistrer.mockResolvedValueOnce({
      reference: 'note-1',
      dejaEnregistree: true,
      suivi: { emailSent: true, notification: 'transmise', consultant: 'transmis' },
    });
    const { g, journal } = gestionnaire(d.services);
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF, emailSent: true, contactRequestAccepted: true });
    expect(d.envoyerLien).not.toHaveBeenCalled();
    expect(d.notifier).not.toHaveBeenCalled();
    expect(d.consignerSuivi).not.toHaveBeenCalled();
    expect(journal).toHaveBeenCalledWith('catalogue.demande.rejouee', expect.any(Object));
  });

  it('demande déjà tracée sans suivi lisible : rien n’est présumé', async () => {
    const d = doublures();
    d.enregistrer.mockResolvedValueOnce({ reference: 'note-1', dejaEnregistree: true, suivi: null });
    const { g } = gestionnaire(d.services);
    expect(await (await g(requete(corps))).json()).toEqual({
      ok: true,
      pdfUrl: PDF,
      emailSent: false,
      contactRequestAccepted: false,
    });
    expect(d.envoyerLien).not.toHaveBeenCalled();
  });

  it('nouvel essai après acceptation, même requestId : aucun effet rejoué', async () => {
    const d = doublures();
    const { g } = gestionnaire(d.services);
    await g(requete(corps));
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(d.enregistrer).toHaveBeenCalledTimes(1);
    expect(d.envoyerLien).toHaveBeenCalledTimes(1);
  });

  it('nouvel essai après un échec technique, même requestId : la demande est retraitée', async () => {
    const d = doublures();
    d.enregistrer.mockRejectedValueOnce(new Error('base indisponible'));
    const { g } = gestionnaire(d.services);
    expect((await g(requete(corps))).status).toBe(500);
    expect((await g(requete(corps))).status).toBe(200);
    expect(d.enregistrer).toHaveBeenCalledTimes(2);
  });

  it('limitation atteinte : 429 avec Retry-After, aucun service appelé', async () => {
    const d = doublures();
    const vus = new Map<string, number>();
    const { g } = gestionnaire(d.services, {
      limiter: (cle) => {
        const n = (vus.get(cle) ?? 0) + 1;
        vus.set(cle, n);
        return n > 2 ? { ok: false, resetInSec: 120 } : { ok: true, resetInSec: 0 };
      },
    });
    await g(requete({ ...corps, requestId: '00000000-0000-4000-8000-000000000001' }));
    await g(requete({ ...corps, requestId: '00000000-0000-4000-8000-000000000002' }));
    const res = await g(requete({ ...corps, requestId: '00000000-0000-4000-8000-000000000003' }));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBe('120');
    expect(await res.json()).toEqual({ ok: false, error: 'rate_limited', retryAfterSec: 120 });
    expect(d.enregistrer).toHaveBeenCalledTimes(2);
    expect([...vus.keys()]).toEqual(['catalogue:203.0.113.7']);
  });

  it('le journal ne contient ni e-mail, ni prénom, ni entreprise', async () => {
    const d = doublures();
    d.enregistrer.mockRejectedValueOnce(new Error('base indisponible'));
    const { g, journal } = gestionnaire(d.services);
    await g(requete({ ...corps, consultantOptIn: true }));
    const trace = JSON.stringify(journal.mock.calls);
    expect(trace).not.toContain(corps.email);
    expect(trace).not.toContain(corps.firstName);
    expect(trace).not.toContain(corps.company);
  });
});

describe('services réels : fermés par défaut', () => {
  it('par défaut, la route est fermée : 503, aucun succès', async () => {
    const { g } = gestionnaire(SERVICES_DESACTIVES);
    const res = await g(requete(corps));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'catalogue_unavailable' });
  });

  it('des secrets présents en Preview ou en production n’activent aucun service', () => {
    const secrets = {
      PIPEDRIVE_API_TOKEN: 'jeton',
      RESEND_API_KEY: 'cle',
      CATALOGUE_PDF_URL: PDF,
      CATALOGUE_SIMULATION: '1',
    };
    for (const VERCEL_ENV of ['preview', 'production']) {
      expect(servicesCatalogue({ ...secrets, VERCEL: '1', VERCEL_ENV })).toBe(SERVICES_DESACTIVES);
    }
    expect(servicesCatalogue({ PIPEDRIVE_API_TOKEN: 'jeton', RESEND_API_KEY: 'cle' })).toBe(SERVICES_DESACTIVES);
  });

  it('simulation locale : réponse marquée simulated, ni e-mail ni consultant déclarés', async () => {
    const services = servicesCatalogue({ CATALOGUE_SIMULATION: '1' });
    expect(services.mode).toBe('simulation');
    const { g } = gestionnaire(services);
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({
      ok: true,
      pdfUrl: 'about:blank',
      emailSent: false,
      contactRequestAccepted: false,
      simulated: true,
    });
  });
});
