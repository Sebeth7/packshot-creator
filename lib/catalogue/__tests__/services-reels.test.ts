/**
 * Parcours complet de `/api/catalogue` à travers les VRAIS adaptateurs
 * (Pipedrive, Resend), branchés sur des doublures : un Pipedrive en mémoire et
 * un client Resend factice. Aucun appel réseau, aucun e-mail, aucun prospect réel.
 *
 * Scénarios de la mission du 06/10/2026 : A (brochure seule), B (consultant),
 * C (échec du stockage), D (échec de l'e-mail), E (échec CRM secondaire),
 * F (idempotence entre instances), J (activation), K (contrat Pipedrive v2 :
 * personnes et organisations en v2, notes en v1, jeton hors des URL v2),
 * L (notification : variable dédiée `CATALOGUE_NOTIFICATION_EMAIL`, sans repli),
 * M (note « [Brochure] » épinglée sur la personne).
 */
import { describe, it, expect, vi } from 'vitest';
import { creerGestionnaireCatalogue } from '@/lib/catalogue/gestionnaire';
import { SERVICES_DESACTIVES, servicesCatalogue, type InterrupteursCatalogue } from '@/lib/catalogue/services';
import { SERVICES_REELS_AUTORISES, PUBLICATION_AUTORISEE } from '@/lib/catalogue/activation';
import { PDF_CATALOGUE } from '@/lib/catalogue/pdf';
import { ErreurPipedrive, stockagePipedrive } from '@/lib/catalogue/pipedrive';
import { destinatairesNotification } from '@/lib/catalogue/resend';
import type { DemandeCatalogue } from '@/lib/catalogue/schema';
import { JETON_DOUBLURE, fauxPipedrive, fauxResend } from './doublures';

const JETON = JETON_DOUBLURE;
const ENV = {
  PIPEDRIVE_API_TOKEN: JETON,
  RESEND_API_KEY: 'cle-resend',
  RESEND_FROM_EMAIL: 'catalogue@exemple.test',
  CATALOGUE_NOTIFICATION_EMAIL: 'equipe-a@exemple.test, equipe-b@exemple.test',
};
const TOUT_OUVERT: InterrupteursCatalogue = { servicesReels: true, pdfEnLigne: true, publication: true };

const corps = {
  firstName: 'Claire',
  email: 'claire@gmail.com',
  company: 'Atelier Exemple',
  country: 'CH',
  products: 'Montres',
  consultantOptIn: false,
  requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b',
  attribution: { utmSource: 'perplexity.ai', landingPage: '/fr/catalogue-orbitvu-all-in-one' },
};

function requete(body: unknown) {
  return new Request('http://localhost/api/catalogue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
    body: JSON.stringify(body),
  });
}

function banc({
  pipedrive = fauxPipedrive(),
  resend = fauxResend(),
  env = ENV,
}: { pipedrive?: ReturnType<typeof fauxPipedrive>; resend?: ReturnType<typeof fauxResend>; env?: Record<string, string> } = {}) {
  const journal = vi.fn();
  const services = servicesCatalogue(env, {
    interrupteurs: TOUT_OUVERT,
    fetch: pipedrive.fetch,
    clientCourriel: () => resend.client,
  });
  const g = creerGestionnaireCatalogue({
    services,
    limiter: () => ({ ok: true, resetInSec: 0 }),
    maintenant: () => new Date('2026-10-06T09:00:00Z'),
    journal,
  });
  return { g, journal, pipedrive, resend, services };
}

function aucuneAffaire(appels: ReturnType<typeof fauxPipedrive>['appels']) {
  return appels.every((a) => !/\/(deals|leads)/.test(a.chemin));
}

describe('A — demande de brochure seule', () => {
  it('trace CRM (personne, organisation, note), e-mail du lien, aucune affaire, aucun consultant', async () => {
    const { g, pipedrive, resend } = banc();
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: false });

    expect(pipedrive.personnes).toEqual([
      { id: expect.any(Number), name: 'Claire', email: 'claire@gmail.com', org_id: pipedrive.organisations[0].id },
    ]);
    expect(pipedrive.organisations.map((o) => o.name)).toEqual(['Atelier Exemple']);
    expect(pipedrive.notes).toHaveLength(1);
    const note = pipedrive.notes[0];
    expect(note.person_id).toBe(pipedrive.personnes[0].id);
    expect(note.org_id).toBe(pipedrive.organisations[0].id);
    for (const attendu of [
      '[Brochure] Demande du catalogue Orbitvu All-in-One',
      'Type : lead brochure',
      'Demande de consultant : non.',
      'Brochure : orbitvu_all_in_one_2026_fr (langue : fr)',
      'E-mail : domaine grand public (gmail.com)',
      'Pays : Suisse',
      'Produits : Montres',
      'Page : catalogue_all_in_one',
      'Source : perplexity.ai',
      'Reçue le : 2026-10-06T09:00:00.000Z',
      `Identifiant : ${corps.requestId}`,
      'lien par e-mail confirmé',
      'notification interne transmise',
      'consultant non demandé',
    ]) {
      expect(note.content).toContain(attendu);
    }
    expect(note.content).not.toMatch(/ne pas appeler|pas d.appel/i);
    expect(aucuneAffaire(pipedrive.appels)).toBe(true);
    expect(pipedrive.violations).toEqual([]);

    expect(resend.envois).toHaveLength(2);
    const e = resend.envois.find((m) => m.to.includes('claire@gmail.com'))!;
    expect(e.to).toEqual(['claire@gmail.com']);
    expect(e.from).toBe('PackshotCreator <catalogue@exemple.test>');
    expect(e.subject).toBe('Votre catalogue Orbitvu All-in-One');
    expect(e.html).toContain(PDF_CATALOGUE.url);
    expect(e.html).toContain('/fr/confidentialite');
    expect(e.html).toContain('+33 (0)1 47 42 66 66');
    expect(e.html).toContain('+41 44 580 43 84');
    expect(Object.keys(e)).not.toContain('attachments');

    // Notification interne du lead brochure : objet distinct, aucune consigne d'appel, aucune adresse en dur.
    const interne = resend.envois.find((m) => m.to.includes('equipe-a@exemple.test'))!;
    expect(interne.to).toEqual(['equipe-a@exemple.test', 'equipe-b@exemple.test']);
    expect(interne.subject).toBe('[Brochure] Atelier Exemple');
    expect(interne.html).toContain('Nouveau lead brochure');
    expect(interne.html).toContain('Ni une demande de démonstration, ni une affaire qualifiée.');
    expect(interne.html).toContain('Pays : Suisse');
    expect(interne.html).toContain('Produits : Montres');
    expect(interne.html).toContain('Source : perplexity.ai');
    expect(interne.html).toContain(`https://packshotcreator.pipedrive.com/person/${pipedrive.personnes[0].id}`);
    expect(`${interne.subject} ${interne.html} ${interne.text}`).not.toMatch(/ne pas appeler|pas d.appel|recontacté/i);
  });

  it('personne déjà connue : réutilisée, jamais dupliquée ni déplacée vers une autre organisation', async () => {
    const pipedrive = fauxPipedrive();
    pipedrive.organisations.push({ id: 1, name: 'Autre Société' });
    pipedrive.personnes.push({ id: 2, name: 'Claire D.', email: 'claire@gmail.com', org_id: 1 });
    const { g } = banc({ pipedrive });
    expect((await g(requete(corps))).status).toBe(200);
    expect(pipedrive.personnes).toHaveLength(1);
    expect(pipedrive.personnes[0].org_id).toBe(1);
    expect(pipedrive.appels.some((a) => /^(PUT|PATCH)$/.test(a.methode) && a.chemin.startsWith('/persons/'))).toBe(false);
    expect(pipedrive.notes[0].person_id).toBe(2);
    expect(pipedrive.violations).toEqual([]);
  });
});

describe('B — consultant demandé', () => {
  it('note explicite et notification « demande à être recontacté » ; contactRequestAccepted vrai ; aucune affaire', async () => {
    const { g, pipedrive, resend } = banc();
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: true });
    expect(pipedrive.notes[0].content).toContain('Demande de consultant : OUI, le prospect demande à être recontacté.');
    expect(pipedrive.notes[0].content).toContain('consultant demande transmise à l’équipe');
    expect(aucuneAffaire(pipedrive.appels)).toBe(true);

    expect(resend.envois).toHaveLength(2);
    const interne = resend.envois.find((m) => m.to.includes('equipe-a@exemple.test'));
    expect(interne?.to).toEqual(['equipe-a@exemple.test', 'equipe-b@exemple.test']);
    expect(interne?.subject).toBe('[Brochure] Atelier Exemple - DEMANDE À ÊTRE RECONTACTÉ');
    expect(interne?.html).toContain('LE PROSPECT DEMANDE À ÊTRE RECONTACTÉ');
    expect(interne?.html).toContain(`https://packshotcreator.pipedrive.com/person/${pipedrive.personnes[0].id}`);
    expect(interne?.html).toContain('claire@gmail.com');
  });

  it('notification en échec : contactRequestAccepted faux, consigné « NON transmise »', async () => {
    const resend = fauxResend((m) =>
      m.to.includes('equipe-a@exemple.test') ? { data: null, error: { message: 'refus' } } : { data: { id: 'ok' }, error: null },
    );
    const { g, pipedrive } = banc({ resend });
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toMatchObject({ ok: true, emailSent: true, contactRequestAccepted: false });
    expect(pipedrive.notes[0].content).toContain('notification interne NON transmise');
    expect(pipedrive.notes[0].content).toContain('consultant demande NON transmise');
  });

  it('sans CATALOGUE_NOTIFICATION_EMAIL : aucune adresse en dur, rien n’est présumé', async () => {
    const env = { ...ENV, CATALOGUE_NOTIFICATION_EMAIL: '' };
    const { g, resend, services, journal, pipedrive } = banc({ env });
    expect(services.notification).toBeNull();
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toMatchObject({ ok: true, contactRequestAccepted: false });
    expect(resend.envois.map((m) => m.to)).toEqual([['claire@gmail.com']]);
    expect(journal).toHaveBeenCalledWith('catalogue.notification.non_configuree', expect.any(Object));
    expect(pipedrive.notes[0].content).toContain('notification interne non configurée');
  });
});

describe('C — échec du stockage', () => {
  it('note impossible à créer : erreur technique, aucun e-mail, aucun consultant, aucun faux succès', async () => {
    const pipedrive = fauxPipedrive((m, c) => (m === 'POST' && c === '/notes' ? 500 : undefined));
    const { g, resend } = banc({ pipedrive });
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: 'technical' });
    expect(resend.envois).toHaveLength(0); // ni e-mail au prospect, ni notification interne
  });

  it('Pipedrive injoignable : erreur technique', async () => {
    const pipedrive = fauxPipedrive(() => 'reseau');
    const { g, resend } = banc({ pipedrive });
    expect((await g(requete(corps))).status).toBe(500);
    expect(resend.envois).toHaveLength(0);
  });

  it('réponse Pipedrive success:false avec HTTP 200 : traitée comme un échec', async () => {
    const pipedrive = fauxPipedrive();
    pipedrive.fetchFaux.mockResolvedValueOnce(Response.json({ success: false }));
    const { g } = banc({ pipedrive });
    expect((await g(requete(corps))).status).toBe(500);
  });
});

describe('D — échec de l’e-mail', () => {
  it('brochure disponible, emailSent faux, consigné « non confirmé »', async () => {
    const resend = fauxResend(() => ({ data: null, error: { message: 'domaine non vérifié' } }));
    const { g, pipedrive } = banc({ resend });
    const res = await g(requete(corps));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: false, contactRequestAccepted: false });
    expect(pipedrive.notes[0].content).toContain('lien par e-mail non confirmé');
  });
});

describe('E — échec CRM secondaire', () => {
  it('organisation impossible : note rattachée à la personne seule, écart au journal', async () => {
    const pipedrive = fauxPipedrive((m, c) => (c.startsWith('/organizations') ? 500 : undefined));
    const { g, journal } = banc({ pipedrive });
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(pipedrive.notes[0].org_id).toBeNull();
    expect(pipedrive.personnes[0].org_id).toBeNull();
    expect(journal).toHaveBeenCalledWith('catalogue.crm.organisation.echec', expect.any(Object));
  });

  it('suivi impossible à consigner : réponse fidèle, écart au journal', async () => {
    const pipedrive = fauxPipedrive((m, c) => (m === 'PUT' && c.startsWith('/notes/') ? 500 : undefined));
    const { g, journal } = banc({ pipedrive });
    const res = await g(requete(corps));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: false });
    expect(journal).toHaveBeenCalledWith('catalogue.crm.suivi.echec', expect.any(Object));
  });
});

describe('F — idempotence au-delà de la mémoire d’une instance', () => {
  it('même requestId reçu par une autre instance : aucune nouvelle note, aucun nouvel e-mail', async () => {
    const pipedrive = fauxPipedrive();
    const resend = fauxResend();
    const instance1 = banc({ pipedrive, resend });
    const instance2 = banc({ pipedrive, resend });
    await instance1.g(requete({ ...corps, consultantOptIn: true }));
    const res = await instance2.g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: true });
    expect(pipedrive.notes).toHaveLength(1);
    expect(pipedrive.personnes).toHaveLength(1);
    expect(resend.envois).toHaveLength(2); // lien + notification interne, une seule fois chacun
    expect(instance2.journal).toHaveBeenCalledWith('catalogue.demande.rejouee', expect.any(Object));
    expect(pipedrive.violations).toEqual([]);
  });

  it('nouvelle demande de la même personne : nouvelle note, personne non dupliquée', async () => {
    const { g, pipedrive } = banc();
    await g(requete(corps));
    await g(requete({ ...corps, requestId: '00000000-0000-4000-8000-0000000000aa' }));
    expect(pipedrive.personnes).toHaveLength(1);
    expect(pipedrive.notes).toHaveLength(2);
  });
});

describe('données personnelles hors des journaux et des erreurs', () => {
  it('ni jeton, ni e-mail, ni prénom, ni entreprise dans le journal ou les erreurs Pipedrive', async () => {
    const pipedrive = fauxPipedrive((m, c) => (c === '/notes' && m === 'POST' ? 500 : undefined));
    const { g, journal } = banc({ pipedrive });
    await g(requete(corps));
    const trace = JSON.stringify(journal.mock.calls);
    for (const interdit of [JETON, corps.email, corps.firstName, corps.company]) expect(trace).not.toContain(interdit);

    const stockage = stockagePipedrive({ jeton: JETON, fetch: fauxPipedrive(() => 500).fetch });
    const erreur = await stockage
      .enregistrer({ ...corps, country: 'CH', pageSource: 'catalogue_all_in_one', recueLe: '2026-10-06T09:00:00.000Z' })
      .catch((e: Error) => e);
    expect(erreur).toBeInstanceOf(Error);
    for (const interdit of [JETON, corps.email, corps.company]) expect(String((erreur as Error).message)).not.toContain(interdit);
  });
});

describe('J — activation : rien de réel sans les interrupteurs du code', () => {
  it('interrupteurs du code : PDF en ligne (06/10), services réels non autorisés, publication fermée', () => {
    expect(PDF_CATALOGUE.enLigne).toBe(true);
    expect(SERVICES_REELS_AUTORISES).toBe(false);
    expect(PUBLICATION_AUTORISEE).toBe(false);
  });

  it('PDF en ligne ne suffit pas : sans services réels, la route reste fermée (503), aucun appel', async () => {
    const pipedrive = fauxPipedrive();
    const resend = fauxResend();
    const opts = { fetch: pipedrive.fetch, clientCourriel: () => resend.client };
    // Interrupteurs du code tels quels (PDF en ligne, services réels faux), tous les secrets présents.
    for (const VERCEL_ENV of ['preview', 'production', undefined]) {
      const env = { ...ENV, VERCEL: '1', ...(VERCEL_ENV ? { VERCEL_ENV } : {}) };
      expect(servicesCatalogue(env, opts)).toBe(SERVICES_DESACTIVES);
    }
    const g = creerGestionnaireCatalogue({
      services: servicesCatalogue({ ...ENV, VERCEL: '1', VERCEL_ENV: 'preview' }, opts),
      limiter: () => ({ ok: true, resetInSec: 0 }),
      journal: () => {},
    });
    const res = await g(requete(corps));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'catalogue_unavailable' });
    expect(pipedrive.appels).toHaveLength(0);
    expect(resend.envois).toHaveLength(0);
  });

  it('avec tous les secrets, Preview comme production : route fermée tant que les interrupteurs sont faux', () => {
    for (const VERCEL_ENV of ['preview', 'production', undefined]) {
      expect(servicesCatalogue({ ...ENV, VERCEL: '1', ...(VERCEL_ENV ? { VERCEL_ENV } : {}) })).toBe(SERVICES_DESACTIVES);
    }
  });

  it('chaque condition manquante ferme la route', () => {
    const opts = (i: Partial<InterrupteursCatalogue>) => ({ interrupteurs: { ...TOUT_OUVERT, ...i } });
    expect(servicesCatalogue(ENV, opts({ servicesReels: false }))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue(ENV, opts({ pdfEnLigne: false }))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, VERCEL_ENV: 'production' }, opts({ publication: false }))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, PIPEDRIVE_API_TOKEN: '' }, opts({}))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, RESEND_API_KEY: '' }, opts({}))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, RESEND_FROM_EMAIL: '' }, opts({}))).toBe(SERVICES_DESACTIVES);
  });

  it('Preview avec interrupteurs ouverts : services réels assemblés, aucun appel à la construction', () => {
    const pipedrive = fauxPipedrive();
    const resend = fauxResend();
    const s = servicesCatalogue(
      { ...ENV, VERCEL: '1', VERCEL_ENV: 'preview' },
      { interrupteurs: { ...TOUT_OUVERT, publication: false }, fetch: pipedrive.fetch, clientCourriel: () => resend.client },
    );
    expect(s.mode).toBe('reel');
    expect(pipedrive.appels).toHaveLength(0);
    expect(resend.envois).toHaveLength(0);
  });

  it('URL du PDF : R2 hors dépôt, empreinte du fichier source désigné', () => {
    const url = new URL(PDF_CATALOGUE.url);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('videos.packshot-creator.com');
    expect(url.pathname).toMatch(/^\/catalogues\/[a-z0-9-]+\.pdf$/);
    expect(PDF_CATALOGUE.sha256).toBe('0d72b2079706546e241f029f38836985e152ef2af956104322fd343bfc6730e5');
    expect(PDF_CATALOGUE.octets).toBe(15_380_434);
    expect(PDF_CATALOGUE.pages).toBe(28);
  });
});

describe('K — contrat Pipedrive v2 (migration du 06/10) : personnes et organisations en v2, notes en v1', () => {
  const trace = (appels: ReturnType<typeof fauxPipedrive>['appels']) =>
    appels.map((a) => `${a.version} ${a.methode} ${a.chemin.replace(/\/\d+$/, '/{id}')}`);
  const demande: DemandeCatalogue = {
    ...corps,
    country: 'CH',
    pageSource: 'catalogue_all_in_one',
    recueLe: '2026-10-06T09:00:00.000Z',
  };

  it('nouvelle personne : appels du contrat dans l’ordre, adresses officielles, aucune violation', async () => {
    const { g, pipedrive } = banc();
    expect((await g(requete(corps))).status).toBe(200);
    expect(trace(pipedrive.appels)).toEqual([
      'v2 GET /persons/search',
      'v2 GET /organizations/search',
      'v2 POST /organizations',
      'v2 POST /persons',
      'v1 POST /notes',
      'v1 PUT /notes/{id}',
    ]);
    for (const a of pipedrive.appels) {
      const prefixe = a.version === 'v2' ? 'https://api.pipedrive.com/api/v2/' : 'https://api.pipedrive.com/v1/';
      expect(`${a.url.origin}${a.url.pathname}`.startsWith(prefixe)).toBe(true);
    }
    expect(pipedrive.violations).toEqual([]);
  });

  it('personne connue sans organisation : notes relues en v1, rattachement par PATCH v2 portant { org_id } seul', async () => {
    const pipedrive = fauxPipedrive();
    pipedrive.personnes.push({ id: 7, name: 'Claire', email: 'claire@gmail.com', org_id: null });
    const { g } = banc({ pipedrive });
    expect((await g(requete(corps))).status).toBe(200);
    expect(trace(pipedrive.appels)).toEqual([
      'v2 GET /persons/search',
      'v1 GET /notes',
      'v2 GET /organizations/search',
      'v2 POST /organizations',
      'v2 PATCH /persons/{id}',
      'v1 POST /notes',
      'v1 PUT /notes/{id}',
    ]);
    const rattachement = pipedrive.appels.find((a) => a.methode === 'PATCH')!;
    expect(rattachement.chemin).toBe('/persons/7');
    expect(rattachement.corps).toEqual({ org_id: pipedrive.organisations[0].id });
    expect(pipedrive.personnes).toEqual([{ id: 7, name: 'Claire', email: 'claire@gmail.com', org_id: pipedrive.organisations[0].id }]);
    expect(pipedrive.notes[0].person_id).toBe(7);
    expect(pipedrive.violations).toEqual([]);
  });

  it('jeton : en-tête x-api-token en v2, jamais dans une URL v2 ; paramètre api_token en v1 (notes) seulement', async () => {
    const { g, pipedrive } = banc();
    await g(requete({ ...corps, consultantOptIn: true }));
    const v2 = pipedrive.appels.filter((a) => a.version === 'v2');
    const v1 = pipedrive.appels.filter((a) => a.version === 'v1');
    expect(v2).toHaveLength(4);
    expect(v1).toHaveLength(2);
    for (const a of v2) {
      expect(a.entetes['x-api-token']).toBe(JETON);
      expect(a.url.href).not.toContain(JETON);
      expect(a.url.searchParams.has('api_token')).toBe(false);
    }
    for (const a of v1) {
      expect(a.url.searchParams.get('api_token')).toBe(JETON);
      expect(a.entetes['x-api-token']).toBeUndefined();
    }
  });

  it('recherches v2 : term, fields, exact_match et limit du contrat, sans pagination par décalage', async () => {
    const { g, pipedrive } = banc();
    await g(requete(corps));
    const params = (chemin: string) => Object.fromEntries(pipedrive.appels.find((a) => a.chemin === chemin)!.url.searchParams);
    expect(params('/persons/search')).toEqual({ term: 'claire@gmail.com', fields: 'email', exact_match: 'true', limit: '1' });
    expect(params('/organizations/search')).toEqual({ term: 'Atelier Exemple', fields: 'name', exact_match: 'true', limit: '1' });
  });

  it('créations v2 : emails au pluriel (value, primary, label) et org_id, jamais le champ v1 « email » ; organisation { name }', async () => {
    const { g, pipedrive } = banc();
    await g(requete(corps));
    const personne = pipedrive.appels.find((a) => a.methode === 'POST' && a.chemin === '/persons')!;
    expect(personne.corps).toEqual({
      name: 'Claire',
      emails: [{ value: 'claire@gmail.com', primary: true, label: 'work' }],
      org_id: pipedrive.organisations[0].id,
    });
    expect(personne.entetes['content-type']).toBe('application/json');
    const organisation = pipedrive.appels.find((a) => a.methode === 'POST' && a.chemin === '/organizations')!;
    expect(organisation.corps).toEqual({ name: 'Atelier Exemple' });
  });

  it.each([400, 401, 403, 404, 410, 429, 500])(
    'réponse v2 en erreur (HTTP %i, success:false) : échec, ni jeton ni donnée saisie dans le message',
    async (statut) => {
      const pipedrive = fauxPipedrive((m, c) => (c === '/persons/search' ? statut : undefined));
      const erreur = await stockagePipedrive({ jeton: JETON, fetch: pipedrive.fetch })
        .enregistrer(demande)
        .catch((e: Error) => e);
      expect(erreur).toBeInstanceOf(ErreurPipedrive);
      expect((erreur as Error).message).toBe(`Pipedrive recherche de personne : HTTP ${statut}`);
      for (const interdit of [JETON, corps.email, corps.company, corps.firstName]) {
        expect((erreur as Error).message).not.toContain(interdit);
      }
      expect(pipedrive.personnes).toHaveLength(0);
      expect(pipedrive.notes).toHaveLength(0);
    },
  );

  it('forme v2 inattendue (résultat de recherche sans identifiant) : échec, aucune personne, aucune note, aucun e-mail', async () => {
    const pipedrive = fauxPipedrive();
    pipedrive.fetchFaux.mockResolvedValueOnce(Response.json({ success: true, data: { items: [{ result_score: 1, item: {} }] } }));
    const { g, resend } = banc({ pipedrive });
    expect((await g(requete(corps))).status).toBe(500);
    expect(pipedrive.personnes).toHaveLength(0);
    expect(pipedrive.notes).toHaveLength(0);
    expect(resend.envois).toHaveLength(0);
  });

  it('création v2 sans identifiant numérique : échec, aucune note', async () => {
    const pipedrive = fauxPipedrive();
    const vraiFetch = pipedrive.fetchFaux.getMockImplementation()!;
    pipedrive.fetchFaux.mockImplementation(async (entree, init) =>
      init?.method === 'POST' && String(entree).endsWith('/api/v2/persons')
        ? Response.json({ success: true, data: { id: '12' } })
        : vraiFetch(entree, init),
    );
    const { g } = banc({ pipedrive });
    expect((await g(requete(corps))).status).toBe(500);
    expect(pipedrive.notes).toHaveLength(0);
  });

  it('la doublure refuse une régression : v1 pour une personne, v2 pour une note, PUT en v2, jeton dans l’URL, champ « email »', async () => {
    const { fetch, violations } = fauxPipedrive();
    const v1 = 'https://api.pipedrive.com/v1';
    const v2 = 'https://api.pipedrive.com/api/v2';
    const entete = { 'x-api-token': JETON };
    const statut = async (url: string, init?: RequestInit) => (await fetch(url, init)).status;
    expect(await statut(`${v1}/persons/search?term=x&api_token=${JETON}`)).toBe(410);
    expect(await statut(`${v1}/organizations?api_token=${JETON}`, { method: 'POST', body: '{"name":"X"}' })).toBe(410);
    expect(await statut(`${v2}/notes`, { headers: entete })).toBe(410);
    expect(await statut(`${v2}/persons/7`, { method: 'PUT', headers: entete, body: '{}' })).toBe(405);
    expect(await statut(`${v2}/persons/search?term=x&api_token=${JETON}`, { headers: entete })).toBe(401);
    expect(await statut(`${v2}/persons/search?term=x`)).toBe(401);
    expect(
      await statut(`${v2}/persons`, {
        method: 'POST',
        headers: entete,
        body: JSON.stringify({ name: 'X', email: [{ value: 'x@exemple.test', primary: true, label: 'work' }] }),
      }),
    ).toBe(400);
    const note = (corps: Record<string, unknown>) =>
      statut(`${v1}/notes?api_token=${JETON}`, { method: 'POST', body: JSON.stringify({ content: 'x', person_id: 1, ...corps }) });
    expect(await note({ pinned_to_person_flag: 2 })).toBe(400);
    expect(await note({ pinned_to_deal_flag: 1 })).toBe(400);
    expect(violations).toHaveLength(9);
  });
});

describe('L — notification catalogue : variable dédiée CATALOGUE_NOTIFICATION_EMAIL, sans repli (décision du 06/10)', () => {
  const sansVariable = (): Record<string, string> =>
    Object.fromEntries(Object.entries(ENV).filter(([cle]) => cle !== 'CATALOGUE_NOTIFICATION_EMAIL'));

  it('seule la variable du catalogue est lue : NOTIFICATION_EMAIL (questionnaire) ne reçoit jamais la notification', async () => {
    const env = { ...ENV, NOTIFICATION_EMAIL: 'questionnaire@exemple.test' };
    const { g, resend } = banc({ env });
    expect(await (await g(requete({ ...corps, consultantOptIn: true }))).json()).toMatchObject({ contactRequestAccepted: true });
    const interne = resend.envois.find((m) => m.subject.startsWith('[Brochure]'))!;
    expect(interne.to).toEqual(['equipe-a@exemple.test', 'equipe-b@exemple.test']);
    expect(resend.envois.flatMap((m) => m.to)).not.toContain('questionnaire@exemple.test');
  });

  it.each([
    ['absente, NOTIFICATION_EMAIL présente', () => ({ ...sansVariable(), NOTIFICATION_EMAIL: 'questionnaire@exemple.test' })],
    ['absente', () => sansVariable()],
    ['vide', () => ({ ...ENV, CATALOGUE_NOTIFICATION_EMAIL: '' })],
    ['sans adresse valide', () => ({ ...ENV, CATALOGUE_NOTIFICATION_EMAIL: 'pas-une-adresse, ' })],
  ])('variable %s : aucun repli, notification absente, consultant non déclaré transmis, absence journalisée et consignée', async (_cas, fabriquer) => {
    const { g, resend, services, journal, pipedrive } = banc({ env: fabriquer() as Record<string, string> });
    expect(services.mode).toBe('reel');
    expect(services.notification).toBeNull();
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: false });
    expect(resend.envois.map((m) => m.to)).toEqual([['claire@gmail.com']]);
    expect(journal).toHaveBeenCalledWith('catalogue.notification.non_configuree', expect.any(Object));
    expect(pipedrive.notes[0].content).toContain('notification interne non configurée');
    expect(pipedrive.notes[0].content).toContain('consultant demande NON transmise');
  });

  it('destinataire métier prévu (leads@sysnext.com) : une seule adresse retenue ; liste séparée par des virgules', () => {
    expect(destinatairesNotification('leads@sysnext.com')).toEqual(['leads@sysnext.com']);
    expect(destinatairesNotification(' a@exemple.test , b@exemple.test ')).toEqual(['a@exemple.test', 'b@exemple.test']);
    expect(destinatairesNotification(undefined)).toEqual([]);
  });
});

describe('M — note « [Brochure] » épinglée sur la fiche personne (pinned_to_person_flag, décision du 06/10)', () => {
  it('nouvelle demande : note créée épinglée sur la personne, drapeau repris à la mise à jour du suivi, aucun autre épinglage', async () => {
    const { g, pipedrive } = banc();
    expect((await g(requete(corps))).status).toBe(200);
    const creation = pipedrive.appels.find((a) => a.methode === 'POST' && a.chemin === '/notes')!;
    expect(creation.corps).toEqual({
      content: expect.stringContaining('[Brochure]'),
      person_id: pipedrive.personnes[0].id,
      org_id: pipedrive.organisations[0].id,
      pinned_to_person_flag: 1,
    });
    const suivi = pipedrive.appels.find((a) => a.methode === 'PUT' && a.chemin.startsWith('/notes/'))!;
    expect(suivi.corps).toEqual({ content: expect.stringContaining('lien par e-mail confirmé'), pinned_to_person_flag: 1 });
    expect(pipedrive.notes).toHaveLength(1);
    expect(pipedrive.notes[0].pinned_to_person_flag).toBe(1);
    expect(pipedrive.violations).toEqual([]);
  });

  it('demande de consultant : même note épinglée, aucune affaire ni Lead', async () => {
    const { g, pipedrive } = banc();
    await g(requete({ ...corps, consultantOptIn: true }));
    expect(pipedrive.notes[0].pinned_to_person_flag).toBe(1);
    expect(pipedrive.notes[0].content).toContain('Demande de consultant : OUI');
    expect(aucuneAffaire(pipedrive.appels)).toBe(true);
    expect(pipedrive.violations).toEqual([]);
  });

  it('demande rejouée par une autre instance : aucune nouvelle note, épinglage inchangé', async () => {
    const pipedrive = fauxPipedrive();
    const resend = fauxResend();
    await banc({ pipedrive, resend }).g(requete(corps));
    const avant = pipedrive.appels.length;
    await banc({ pipedrive, resend }).g(requete(corps));
    expect(pipedrive.notes).toHaveLength(1);
    expect(pipedrive.notes[0].pinned_to_person_flag).toBe(1);
    expect(pipedrive.appels.slice(avant).some((a) => a.chemin.startsWith('/notes') && a.methode !== 'GET')).toBe(false);
  });
});
