/**
 * `POST /api/contact` avec des doublures exclusivement (G5 du 11/10/2026,
 * arbitrages L08 et L09) : Resend, Pipedrive (fetch) et l'enrichissement sont
 * simulés ; aucune requête réseau, aucun e-mail, aucun appel Gemini.
 *
 * Contrat vérifié :
 * - succès seulement avec une affaire Pipedrive confirmée OU une notification
 *   interne acceptée par Resend (sans `error`, avec un identifiant) ;
 * - double échec : 502, sans confirmation au prospect (un nouvel essai ne la
 *   double pas) ;
 * - aucun identifiant CRM renvoyé au navigateur ;
 * - valeurs saisies échappées dans les e-mails et la note Pipedrive ;
 * - bornes, champ piège, limites par IP et par destinataire.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextRequest } from 'next/server';

const etat = vi.hoisted(() => ({
  resendIndisponible: false,
  envois: [] as Array<{ to: string[]; subject: string; html: string }>,
  reponsesResend: [] as Array<unknown>,
}));
const enrichMock = vi.hoisted(() => vi.fn());

vi.mock('resend', () => ({
  Resend: class {
    emails = {
      send: async (message: { to: string[]; subject: string; html: string }) => {
        etat.envois.push(message);
        const r = etat.reponsesResend.shift() ?? { data: { id: `msg_${etat.envois.length}` }, error: null };
        if (r instanceof Error) throw r;
        return r;
      },
    };
    constructor() {
      if (etat.resendIndisponible) throw new Error('Missing API key');
    }
  },
}));

vi.mock('@/lib/lead-enrichment', async (importOriginal) => {
  const reel = await importOriginal<typeof import('@/lib/lead-enrichment')>();
  return { ...reel, enrichLead: enrichMock };
});

import { POST } from '@/app/api/contact/route';

type Etape = 'personSearch' | 'personCreate' | 'orgSearch' | 'orgCreate' | 'personPut' | 'deal' | 'note';
let pannes: Partial<Record<Etape, 'http500' | 'reseau'>> = {};
const appels: Array<{ etape: Etape; body?: unknown }> = [];

function etapeDe(url: string, method: string): Etape {
  if (url.includes('/persons/search')) return 'personSearch';
  if (url.includes('/organizations/search')) return 'orgSearch';
  if (url.includes('/persons/') && method === 'PUT') return 'personPut';
  if (url.includes('/persons')) return 'personCreate';
  if (url.includes('/organizations')) return 'orgCreate';
  if (url.includes('/deals')) return 'deal';
  if (url.includes('/notes')) return 'note';
  throw new Error(`requête inattendue : ${method} ${url}`);
}

const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
  if (!url.startsWith('https://api.pipedrive.com/')) throw new Error(`réseau interdit : ${url}`);
  const method = init?.method ?? 'GET';
  const etape = etapeDe(url, method);
  appels.push({ etape, body: init?.body ? JSON.parse(String(init.body)) : undefined });
  const panne = pannes[etape];
  if (panne === 'reseau') throw new TypeError('fetch failed');
  if (panne === 'http500') return new Response(JSON.stringify({ success: false }), { status: 500 });
  const donnees: Record<Etape, unknown> = {
    personSearch: { data: { items: [] } },
    orgSearch: { data: { items: [] } },
    personCreate: { data: { id: 11 } },
    orgCreate: { data: { id: 22 } },
    personPut: { data: { id: 11 } },
    deal: { data: { id: 33 } },
    note: { data: { id: 44 } },
  };
  return new Response(JSON.stringify(donnees[etape]), { status: 200 });
});

let compteur = 0;
function demande(surcharges: Record<string, unknown> = {}) {
  compteur += 1;
  return {
    firstName: 'Anna',
    lastName: 'Muster',
    email: `anna.${compteur}@example.ch`,
    company: 'Muster AG',
    sector: 'autre',
    requestType: 'demo',
    rgpdConsent: true,
    newsletter: 'no',
    locale: 'fr',
    ...surcharges,
  };
}

function requete(corps: unknown, ip = `10.0.0.${compteur}`): NextRequest {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(corps),
  }) as unknown as NextRequest;
}

const journal = vi.spyOn(console, 'warn').mockImplementation(() => {});

beforeEach(() => {
  etat.resendIndisponible = false;
  etat.envois.length = 0;
  etat.reponsesResend.length = 0;
  pannes = {};
  appels.length = 0;
  fetchMock.mockClear();
  enrichMock.mockReset();
  enrichMock.mockResolvedValue(null);
  journal.mockClear();
  vi.stubGlobal('fetch', fetchMock);
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'expediteur@example.invalid';
  process.env.PIPEDRIVE_API_TOKEN = 'jeton-test';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('POST /api/contact — contrat de succès (L08)', () => {
  it('affaire et notification : 200, sans identifiant CRM, confirmation envoyée', async () => {
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(etat.envois).toHaveLength(2);
    expect(etat.envois[0].to).not.toContain(expect.stringContaining('example.ch'));
    expect(etat.envois[1].to[0]).toMatch(/example\.ch$/);
    expect(appels.map((a) => a.etape)).toEqual(['personSearch', 'personCreate', 'orgSearch', 'orgCreate', 'personPut', 'deal', 'note']);
  });

  it('jeton absent, notification acceptée : 200 sans appel Pipedrive ni enrichissement', async () => {
    delete process.env.PIPEDRIVE_API_TOKEN;
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(enrichMock).not.toHaveBeenCalled();
  });

  it('jeton absent, notification refusée par Resend ({ error }) : 502, aucune confirmation', async () => {
    delete process.env.PIPEDRIVE_API_TOKEN;
    etat.reponsesResend.push({ data: null, error: { name: 'validation_error' } });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(502);
    expect(etat.envois).toHaveLength(1);
  });

  it('jeton absent, réponse Resend sans identifiant : 502', async () => {
    delete process.env.PIPEDRIVE_API_TOKEN;
    etat.reponsesResend.push({ data: {}, error: null });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(502);
  });

  it('jeton absent, Resend lève une exception : 502', async () => {
    delete process.env.PIPEDRIVE_API_TOKEN;
    etat.reponsesResend.push(new Error('timeout'));
    const res = await POST(requete(demande()));
    expect(res.status).toBe(502);
  });

  it('affaire en échec HTTP, notification acceptée : 200', async () => {
    pannes = { deal: 'http500' };
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
  });

  it('affaire en échec HTTP et notification refusée : 502, aucune confirmation', async () => {
    pannes = { deal: 'http500' };
    etat.reponsesResend.push({ data: null, error: { name: 'internal_server_error' } });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(502);
    expect(etat.envois).toHaveLength(1);
  });

  it('personne trouvée ou créée mais affaire non créée (4xx), notification refusée : 502', async () => {
    pannes = { deal: 'http500' };
    etat.reponsesResend.push({ data: null, error: { name: 'rate_limit_exceeded' } });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(502);
  });

  it('réseau Pipedrive coupé et Resend en exception : 502', async () => {
    pannes = { personSearch: 'reseau', personCreate: 'reseau', orgSearch: 'reseau', orgCreate: 'reseau' };
    etat.reponsesResend.push(new Error('réseau'));
    const res = await POST(requete(demande()));
    expect(res.status).toBe(502);
  });

  it('affaire créée, notification refusée : 200 (l’affaire est la trace), confirmation envoyée', async () => {
    etat.reponsesResend.push({ data: null, error: { name: 'internal_server_error' } });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(etat.envois).toHaveLength(2);
  });

  it('note en échec réseau après l’affaire : l’affaire reste comptée', async () => {
    pannes = { note: 'reseau' };
    etat.reponsesResend.push({ data: null, error: { name: 'internal_server_error' } });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
  });

  it('PUT personne → organisation en échec réseau : l’affaire est quand même créée', async () => {
    pannes = { personPut: 'reseau' };
    etat.reponsesResend.push({ data: null, error: { name: 'internal_server_error' } });
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(appels.some((a) => a.etape === 'deal')).toBe(true);
  });

  it('Resend impossible à construire : 200 si l’affaire existe, 502 sinon', async () => {
    etat.resendIndisponible = true;
    expect((await POST(requete(demande()))).status).toBe(200);
    delete process.env.PIPEDRIVE_API_TOKEN;
    expect((await POST(requete(demande()))).status).toBe(502);
  });

  it('enrichissement appelé (doublure) seulement avec le jeton, sans réseau', async () => {
    await POST(requete(demande()));
    expect(enrichMock).toHaveBeenCalledTimes(1);
  });
});

describe('POST /api/contact — échappement (L09)', () => {
  it('échappe les valeurs saisies dans la notification, la confirmation et la note', async () => {
    const res = await POST(
      requete(
        demande({
          firstName: '<b>Anna</b>',
          company: 'A&B <Co>',
          message: 'Bonjour <script>alert(1)</script>\nDeux & trois',
          pageSource: '/fr/"><img src=x>',
        }),
      ),
    );
    expect(res.status).toBe(200);
    const [notification, confirmation] = etat.envois;
    expect(notification.html).toContain('&lt;b&gt;Anna&lt;/b&gt;');
    expect(notification.html).toContain('A&amp;B &lt;Co&gt;');
    expect(notification.html).toContain('Bonjour &lt;script&gt;alert(1)&lt;/script&gt;<br/>Deux &amp; trois');
    expect(notification.html).toContain('/fr/&quot;&gt;&lt;img src=x&gt;');
    expect(notification.html).not.toMatch(/<script|<img|<b>Anna/);
    expect(confirmation.html).toContain('Bonjour &lt;b&gt;Anna&lt;/b&gt;,');
    const note = appels.find((a) => a.etape === 'note')?.body as { content: string };
    expect(note.content).toContain('A&amp;B &lt;Co&gt;');
    expect(note.content).not.toContain('<script');
  });

  it('échappe le bloc d’enrichissement (site web, IA)', async () => {
    enrichMock.mockResolvedValue({
      company: null,
      website: { domain: 'exemple.fr', title: 't', description: '<img src=x onerror=alert(1)>' },
      aiSummary: '<a href="https://x">clic</a>',
      enrichedAt: '2026-10-11T00:00:00Z',
    });
    await POST(requete(demande()));
    expect(etat.envois[0].html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(etat.envois[0].html).toContain('&lt;a href=&quot;https://x&quot;&gt;clic&lt;/a&gt;');
    expect(etat.envois[0].html).not.toContain('<img src=x');
  });
});

describe('POST /api/contact — validation, piège, limites', () => {
  it.each([
    ['prénom de 101 caractères', { firstName: 'a'.repeat(101) }],
    ['retour à la ligne dans la société', { company: 'Muster\nBcc: x@example.com' }],
    ['message de 5 001 caractères', { message: 'm'.repeat(5001) }],
    ['e-mail invalide', { email: 'pas-un-email' }],
    ['type de demande inconnu', { requestType: 'spam' }],
  ])('refuse : %s (400, aucun envoi)', async (_libelle, surcharge) => {
    const res = await POST(requete(demande(surcharge)));
    expect(res.status).toBe(400);
    expect(etat.envois).toHaveLength(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepte une demande longue mais légitime (message de 5 000 caractères, de-ch)', async () => {
    const res = await POST(requete(demande({ message: 'm'.repeat(5000), locale: 'de-ch' })));
    expect(res.status).toBe(200);
    expect(etat.envois[1].subject).toBe('PackshotCreator — Your request has been received');
  });

  it('champ piège rempli : 400, ni Pipedrive ni e-mail', async () => {
    const res = await POST(requete(demande({ siteWeb: 'https://spam.example' })));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(etat.envois).toHaveLength(0);
  });

  it('limite par destinataire : la 4e demande vers la même adresse dans l’heure reçoit 429', async () => {
    const corps = demande();
    for (let i = 0; i < 3; i++) {
      expect((await POST(requete(corps, `10.1.0.${i}`))).status).toBe(200);
    }
    const res = await POST(requete(corps, '10.1.0.99'));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toMatch(/^\d+$/);
  });

  it('limite par IP : la 11e demande de la même adresse IP dans l’heure reçoit 429', async () => {
    for (let i = 0; i < 10; i++) {
      expect((await POST(requete(demande(), '10.2.0.1'))).status).toBe(200);
    }
    expect((await POST(requete(demande(), '10.2.0.1'))).status).toBe(429);
  });

  it('le journal ne contient ni e-mail ni nom', async () => {
    delete process.env.PIPEDRIVE_API_TOKEN;
    etat.reponsesResend.push({ data: null, error: { name: 'x' } });
    const corps = demande({ firstName: 'Zéphyrine' });
    await POST(requete(corps));
    const texte = JSON.stringify(journal.mock.calls);
    expect(texte).not.toContain(String(corps.email));
    expect(texte).not.toContain('Zéphyrine');
    expect(texte).toContain('aucune_trace');
  });
});
