/**
 * Parcours complet de `/api/catalogue` à travers les VRAIS adaptateurs Resend,
 * branchés sur un client factice. Aucun appel réseau, aucun e-mail, aucun
 * prospect réel. Aucun CRM (décision de Sébastien du 09/10/2026).
 *
 * Scénarios : A (brochure seule), B (consultant), D (échec de l'e-mail),
 * E (Resend refuse tout : aucune trace), J (activation),
 * L (notification : variable dédiée `CATALOGUE_NOTIFICATION_EMAIL`, sans repli,
 * obligatoire), P (aucun CRM : ni Pipedrive, ni autre appel réseau).
 */
import { afterEach, describe, it, expect, vi } from 'vitest';
import { creerGestionnaireCatalogue } from '@/lib/catalogue/gestionnaire';
import { SERVICES_DESACTIVES, servicesCatalogue, type InterrupteursCatalogue } from '@/lib/catalogue/services';
import { SERVICES_REELS_AUTORISES, PUBLICATION_AUTORISEE } from '@/lib/catalogue/activation';
import { PDF_CATALOGUE } from '@/lib/catalogue/pdf';
import { destinatairesNotification } from '@/lib/catalogue/resend';
import { fauxResend } from './doublures';

const ENV = {
  RESEND_API_KEY: 'cle-resend-secrete',
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
  resend = fauxResend(),
  env = ENV,
}: { resend?: ReturnType<typeof fauxResend>; env?: Record<string, string> } = {}) {
  const journal = vi.fn();
  const services = servicesCatalogue(env, { interrupteurs: TOUT_OUVERT, clientCourriel: () => resend.client });
  const g = creerGestionnaireCatalogue({
    services,
    limiter: () => ({ ok: true, resetInSec: 0 }),
    maintenant: () => new Date('2026-10-06T09:00:00Z'),
    journal,
  });
  return { g, journal, resend, services };
}

const interneDe = (resend: ReturnType<typeof fauxResend>) => resend.envois.find((m) => m.to.includes('equipe-a@exemple.test'));

afterEach(() => {
  vi.restoreAllMocks();
});

describe('A — demande de brochure seule', () => {
  it('e-mail du lien, puis notification interne portant la fiche de la demande ; aucun consultant', async () => {
    const { g, resend } = banc();
    const res = await g(requete(corps));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: false });

    expect(resend.envois).toHaveLength(2);
    const e = resend.envois[0];
    expect(e.to).toEqual(['claire@gmail.com']);
    expect(e.from).toBe('PackshotCreator <catalogue@exemple.test>');
    expect(e.subject).toBe('Votre catalogue Orbitvu All-in-One');
    expect(e.html).toContain(PDF_CATALOGUE.url);
    expect(e.html).toContain('/fr/confidentialite');
    expect(e.html).toContain('+33 (0)1 47 42 66 66');
    expect(e.html).toContain('+41 44 580 43 84');
    expect(Object.keys(e)).not.toContain('attachments');

    // Notification interne du lead brochure : après l'e-mail du lien, objet distinct, aucune adresse en dur.
    const interne = resend.envois[1];
    expect(interne.to).toEqual(['equipe-a@exemple.test', 'equipe-b@exemple.test']);
    expect(interne.from).toBe('PackshotCreator <catalogue@exemple.test>');
    expect(interne.subject).toBe('[Brochure] Atelier Exemple');
    for (const attendu of [
      'Nouveau lead brochure',
      'Prénom : Claire',
      'E-mail : claire@gmail.com',
      '[Brochure] Demande du catalogue Orbitvu All-in-One',
      'Type : lead brochure. Ni une demande de démonstration, ni une affaire qualifiée.',
      'Demande de consultant : non.',
      'Brochure : orbitvu_all_in_one_2026_fr (langue : fr)',
      'E-mail : domaine grand public (gmail.com)',
      'Pays : Suisse',
      'Entreprise : Atelier Exemple',
      'Produits : Montres',
      'Page : catalogue_all_in_one',
      'Source : perplexity.ai',
      'Reçue le : 2026-10-06T09:00:00.000Z',
      `Identifiant : ${corps.requestId}`,
      'Lien du catalogue envoyé au prospect : confirmé par Resend.',
    ]) {
      expect(interne.html).toContain(attendu);
      expect(interne.text).toContain(attendu);
    }
    expect(`${interne.subject} ${interne.html} ${interne.text}`).not.toMatch(/ne pas appeler|pas d.appel|recontacté|pipedrive/i);
  });
});

describe('O — origine de la demande (pop-in #122)', () => {
  it('origine attendue : une ligne « Origine » dans la notification interne, rien dans l’e-mail du prospect', async () => {
    const { g, resend } = banc();
    const res = await g(requete({ ...corps, origine: 'brochure_exit_sitewide' }));
    expect(res.status).toBe(200);
    const interne = interneDe(resend)!;
    expect(interne.html).toContain('Origine : brochure_exit_sitewide');
    expect(interne.text).toContain('Origine : brochure_exit_sitewide');
    expect(interne.subject).toBe('[Brochure] Atelier Exemple');
    const prospect = resend.envois.find((m) => m.to.includes('claire@gmail.com'))!;
    expect(`${prospect.subject} ${prospect.html} ${prospect.text ?? ''}`).not.toContain('brochure_exit_sitewide');
  });

  it('origine absente : notification inchangée, sans ligne « Origine »', async () => {
    const { g, resend } = banc();
    await g(requete(corps));
    expect(`${interneDe(resend)!.html} ${interneDe(resend)!.text}`).not.toContain('Origine');
  });

  it('valeur inconnue ou forgée : jamais recopiée dans un e-mail, demande traitée normalement', async () => {
    for (const origine of ['<b>forgee</b>', 'utm_campaign=forgee', 'brochure_exit_sitewide-forgee']) {
      const { g, resend } = banc();
      const res = await g(requete({ ...corps, origine }));
      expect(res.status).toBe(200);
      expect(resend.envois).toHaveLength(2);
      for (const m of resend.envois) {
        expect(`${m.subject} ${m.html} ${m.text ?? ''}`).not.toContain('forgee');
        expect(`${m.html} ${m.text ?? ''}`).not.toContain('Origine');
      }
    }
  });
});

describe('B — consultant demandé', () => {
  it('notification « demande à être recontacté » en objet et en tête ; contactRequestAccepted vrai', async () => {
    const { g, resend } = banc();
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: true });
    expect(resend.envois).toHaveLength(2);
    const interne = interneDe(resend);
    expect(interne?.to).toEqual(['equipe-a@exemple.test', 'equipe-b@exemple.test']);
    expect(interne?.subject).toBe('[Brochure] Atelier Exemple - DEMANDE À ÊTRE RECONTACTÉ');
    expect(interne?.html).toMatch(/^<p><strong>LE PROSPECT DEMANDE À ÊTRE RECONTACTÉ/);
    expect(interne?.html).toContain('Demande de consultant : OUI, le prospect demande à être recontacté.');
    expect(interne?.html).toContain('claire@gmail.com');
  });

  it('notification refusée par Resend : contactRequestAccepted faux, brochure remise, échec au journal', async () => {
    const resend = fauxResend((m) =>
      m.to.includes('equipe-a@exemple.test') ? { data: null, error: { message: 'refus' } } : { data: { id: 'ok' }, error: null },
    );
    const { g, journal } = banc({ resend });
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: true, contactRequestAccepted: false });
    expect(journal).toHaveBeenCalledWith('catalogue.notification.echec', expect.any(Object));
  });
});

describe('D — échec de l’e-mail du lien', () => {
  it('brochure disponible, emailSent faux, la notification demande de renvoyer le lien', async () => {
    const resend = fauxResend((m) =>
      m.to.includes('claire@gmail.com') ? { data: null, error: { message: 'adresse refusée' } } : { data: { id: 'ok' }, error: null },
    );
    const { g } = banc({ resend });
    const res = await g(requete(corps));
    expect(await res.json()).toEqual({ ok: true, pdfUrl: PDF_CATALOGUE.url, emailSent: false, contactRequestAccepted: false });
    expect(interneDe(resend)?.html).toContain('Lien du catalogue envoyé au prospect : NON confirmé, à renvoyer.');
  });
});

describe('E — Resend refuse tout : la demande n’a laissé aucune trace', () => {
  it('erreur technique, aucun faux succès, aucune donnée personnelle au journal', async () => {
    const resend = fauxResend(() => ({ data: null, error: { message: 'domaine non vérifié' } }));
    const { g, journal } = banc({ resend });
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: 'technical' });
    expect(journal).toHaveBeenCalledWith('catalogue.aucune_trace', expect.any(Object));
    const trace = JSON.stringify(journal.mock.calls);
    for (const interdit of [ENV.RESEND_API_KEY, corps.email, corps.firstName, corps.company]) expect(trace).not.toContain(interdit);
  });
});

describe('P — aucun CRM (décision de Sébastien du 09/10/2026)', () => {
  it('aucun appel réseau hors Resend, même avec un jeton Pipedrive présent ; aucun lien Pipedrive envoyé', async () => {
    const fetchEspion = vi.spyOn(globalThis, 'fetch');
    const { g, resend } = banc({ env: { ...ENV, PIPEDRIVE_API_TOKEN: 'jeton', PIPEDRIVE_DOMAIN: 'exemple.pipedrive.com' } });
    expect((await g(requete({ ...corps, consultantOptIn: true }))).status).toBe(200);
    expect(fetchEspion).not.toHaveBeenCalled();
    expect(JSON.stringify(resend.envois)).not.toMatch(/pipedrive/i);
  });

  it('le jeton Pipedrive n’est pas requis : route ouverte sans lui', () => {
    expect(servicesCatalogue(ENV, { interrupteurs: TOUT_OUVERT }).mode).toBe('reel');
  });
});

describe('J — activation : rien de réel sans les interrupteurs du code', () => {
  it('interrupteurs du code : PDF en ligne (06/10), services réels et publication ouverts (GO de Laurent du 09/10)', () => {
    expect(PDF_CATALOGUE.enLigne).toBe(true);
    expect(SERVICES_REELS_AUTORISES).toBe(true);
    expect(PUBLICATION_AUTORISEE).toBe(true);
  });

  it('interrupteurs du code tels quels, production : services réels assemblés avec les trois variables, aucun envoi à la construction', () => {
    const resend = fauxResend();
    const opts = { clientCourriel: () => resend.client };
    expect(servicesCatalogue({ ...ENV, VERCEL: '1', VERCEL_ENV: 'production' }, opts).mode).toBe('reel');
    expect(resend.envois).toHaveLength(0);
  });

  it('interrupteurs du code tels quels : sans CATALOGUE_NOTIFICATION_EMAIL en production, la route reste fermée (503), aucun envoi', async () => {
    const resend = fauxResend();
    const opts = { clientCourriel: () => resend.client };
    const env = { RESEND_API_KEY: ENV.RESEND_API_KEY, RESEND_FROM_EMAIL: ENV.RESEND_FROM_EMAIL, VERCEL: '1', VERCEL_ENV: 'production' };
    expect(servicesCatalogue(env, opts)).toBe(SERVICES_DESACTIVES);
    const g = creerGestionnaireCatalogue({
      services: servicesCatalogue(env, opts),
      limiter: () => ({ ok: true, resetInSec: 0 }),
      journal: () => {},
    });
    const res = await g(requete(corps));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'catalogue_unavailable' });
    expect(resend.envois).toHaveLength(0);
  });

  it('chaque condition manquante ferme la route', () => {
    const opts = (i: Partial<InterrupteursCatalogue>) => ({ interrupteurs: { ...TOUT_OUVERT, ...i } });
    expect(servicesCatalogue(ENV, opts({ servicesReels: false }))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue(ENV, opts({ pdfEnLigne: false }))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, VERCEL_ENV: 'production' }, opts({ publication: false }))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, RESEND_API_KEY: '' }, opts({}))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, RESEND_FROM_EMAIL: '' }, opts({}))).toBe(SERVICES_DESACTIVES);
    expect(servicesCatalogue({ ...ENV, CATALOGUE_NOTIFICATION_EMAIL: '' }, opts({}))).toBe(SERVICES_DESACTIVES);
  });

  it('Preview avec interrupteurs ouverts : services réels assemblés, aucun envoi à la construction', () => {
    const resend = fauxResend();
    const s = servicesCatalogue(
      { ...ENV, VERCEL: '1', VERCEL_ENV: 'preview' },
      { interrupteurs: { ...TOUT_OUVERT, publication: false }, clientCourriel: () => resend.client },
    );
    expect(s.mode).toBe('reel');
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

describe('G — état de la route en lecture (GET) : contrôle d’une publication sans envoi', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function etat(env: Record<string, string>) {
    vi.resetModules();
    for (const [cle, valeur] of Object.entries(env)) vi.stubEnv(cle, valeur);
    const route = await import('@/app/api/catalogue/route');
    const res = route.GET();
    expect(res.headers.get('cache-control')).toContain('no-store');
    return res.json();
  }

  it('production avec les trois variables : disponible ; sans destinataire ou sans clé : indisponible', async () => {
    const prod = { ...ENV, VERCEL: '1', VERCEL_ENV: 'production' };
    expect(await etat(prod)).toEqual({ disponible: true });
    expect(await etat({ ...prod, CATALOGUE_NOTIFICATION_EMAIL: '' })).toEqual({ disponible: false });
    expect(await etat({ ...prod, RESEND_API_KEY: '' })).toEqual({ disponible: false });
  });
});

describe('L — notification catalogue : variable dédiée CATALOGUE_NOTIFICATION_EMAIL, sans repli, obligatoire', () => {
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
  ])('variable %s : aucun repli, aucune trace possible, route fermée (503), aucun envoi', async (_cas, fabriquer) => {
    const { g, resend, services } = banc({ env: fabriquer() as Record<string, string> });
    expect(services).toBe(SERVICES_DESACTIVES);
    const res = await g(requete({ ...corps, consultantOptIn: true }));
    expect(res.status).toBe(503);
    expect(resend.envois).toHaveLength(0);
  });

  it('liste séparée par des virgules ; une seule adresse acceptée', () => {
    expect(destinatairesNotification('sebastien.jourdan@sysnext.com')).toEqual(['sebastien.jourdan@sysnext.com']);
    expect(destinatairesNotification(' a@exemple.test , b@exemple.test ')).toEqual(['a@exemple.test', 'b@exemple.test']);
    expect(destinatairesNotification(undefined)).toEqual([]);
  });
});
