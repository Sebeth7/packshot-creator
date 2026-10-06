/**
 * Parcours complet de `/api/catalogue` à travers les VRAIS adaptateurs
 * (Pipedrive, Resend), branchés sur des doublures : un Pipedrive en mémoire et
 * un client Resend factice. Aucun appel réseau, aucun e-mail, aucun prospect réel.
 *
 * Scénarios de la mission du 06/10/2026 : A (brochure seule), B (consultant),
 * C (échec du stockage), D (échec de l'e-mail), E (échec CRM secondaire),
 * F (idempotence entre instances), J (activation).
 */
import { describe, it, expect, vi } from 'vitest';
import { creerGestionnaireCatalogue } from '@/lib/catalogue/gestionnaire';
import { SERVICES_DESACTIVES, servicesCatalogue, type InterrupteursCatalogue } from '@/lib/catalogue/services';
import { SERVICES_REELS_AUTORISES, PUBLICATION_AUTORISEE } from '@/lib/catalogue/activation';
import { PDF_CATALOGUE } from '@/lib/catalogue/pdf';
import { stockagePipedrive } from '@/lib/catalogue/pipedrive';
import { fauxPipedrive, fauxResend } from './doublures';

const JETON = 'jeton-pipedrive-secret';
const ENV = {
  PIPEDRIVE_API_TOKEN: JETON,
  RESEND_API_KEY: 'cle-resend',
  RESEND_FROM_EMAIL: 'catalogue@exemple.test',
  NOTIFICATION_EMAIL: 'equipe-a@exemple.test, equipe-b@exemple.test',
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
    expect(pipedrive.appels.some((a) => a.methode === 'PUT' && a.chemin.startsWith('/persons/'))).toBe(false);
    expect(pipedrive.notes[0].person_id).toBe(2);
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

  it('sans NOTIFICATION_EMAIL : aucune adresse en dur, rien n’est présumé', async () => {
    const env = { ...ENV, NOTIFICATION_EMAIL: '' };
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
  it('interrupteurs du code : services réels non autorisés, PDF hors ligne, publication fermée', () => {
    expect(SERVICES_REELS_AUTORISES).toBe(false);
    expect(PDF_CATALOGUE.enLigne).toBe(false);
    expect(PUBLICATION_AUTORISEE).toBe(false);
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
