/**
 * `POST /api/contact` avec des doublures exclusivement (G5 ; P0 sécurité du
 * 11/10/2026, contrat sans CRM du 15/10/2026) : Resend et l'enrichissement sont
 * simulés, et tout appel réseau échoue le test. Aucun e-mail, aucune dépense.
 *
 * Vérifié :
 * - aucune dépendance Pipedrive : la route n'appelle plus `fetch` ;
 * - contrat de succès : la notification interne est la seule trace ; sans elle,
 *   500 et aucune confirmation au prospect ;
 * - les sept situations d'envoi demandées le 15/10 : Resend accepté, refusé,
 *   réponse sans identifiant, erreur réseau, configuration absente, double clic,
 *   nouvelle tentative ;
 * - valeurs saisies échappées dans les deux e-mails ;
 * - bornes, champ piège, limites par IP et par destinataire inchangées ;
 * - journal sans donnée personnelle.
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

/** Aucun appel réseau n'est attendu : plus de CRM, et l'enrichissement est simulé. */
const fetchMock = vi.fn(async (url: string) => {
  throw new Error(`réseau interdit : ${url}`);
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
  fetchMock.mockClear();
  enrichMock.mockReset();
  enrichMock.mockResolvedValue(null);
  journal.mockClear();
  vi.stubGlobal('fetch', fetchMock);
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'expediteur@example.invalid';
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const REFUS = { data: null, error: { name: 'validation_error' } };
const SANS_IDENTIFIANT = { data: { id: '' }, error: null };

describe('POST /api/contact — aucun CRM (15/10/2026)', () => {
  it('la route n’appelle aucune API externe : seul Resend est sollicité', async () => {
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('aucun identifiant interne dans la réponse', async () => {
    const res = await POST(requete(demande()));
    expect(await res.json()).toEqual({ success: true });
  });

  it('le jeton Pipedrive, s’il traîne encore dans l’environnement, n’a plus d’effet', async () => {
    process.env.PIPEDRIVE_API_TOKEN = 'jeton-residuel';
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    delete process.env.PIPEDRIVE_API_TOKEN;
  });

  it('enrichissement joint à la notification, sans jeton CRM', async () => {
    enrichMock.mockResolvedValue({
      company: null,
      website: { domain: 'exemple.fr', title: 't', description: 'd' },
      aiSummary: 'résumé',
      enrichedAt: '2026-10-15T00:00:00Z',
    });
    await POST(requete(demande()));
    expect(enrichMock).toHaveBeenCalledTimes(1);
    expect(etat.envois[0].html).toContain('résumé');
  });
});

describe('POST /api/contact — contrat de succès : la notification est la trace', () => {
  it('notification acceptée : 200, notification interne puis confirmation au prospect', async () => {
    const corps = demande();
    const res = await POST(requete(corps));
    expect(res.status).toBe(200);
    expect(etat.envois).toHaveLength(2);
    expect(etat.envois[0].to).toEqual(['sebastien.jourdan@sysnext.com', 'stephane.gormand@sysnext.com']);
    expect(etat.envois[0].subject).toBe('[Site Web] Demande de démonstration - Muster AG');
    expect(etat.envois[1].to).toEqual([corps.email]);
  });

  it('Resend refuse la notification ({ error }) : 500, aucune confirmation envoyée', async () => {
    etat.reponsesResend.push(REFUS);
    const res = await POST(requete(demande()));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Request not recorded' });
    expect(etat.envois).toHaveLength(1);
    const texte = JSON.stringify(journal.mock.calls);
    expect(texte).toContain('notification.non_acceptee');
    expect(texte).toContain('aucune_trace');
  });

  it('réponse Resend sans identifiant : traitée comme un refus (500)', async () => {
    etat.reponsesResend.push(SANS_IDENTIFIANT);
    expect((await POST(requete(demande()))).status).toBe(500);
    expect(etat.envois).toHaveLength(1);
  });

  it('erreur réseau pendant la notification : 500, aucune confirmation', async () => {
    etat.reponsesResend.push(new Error('fetch failed'));
    expect((await POST(requete(demande()))).status).toBe(500);
    expect(etat.envois).toHaveLength(1);
  });

  it('confirmation refusée mais notification acceptée : 200, la trace existe', async () => {
    etat.reponsesResend.push({ data: { id: 'msg_notif' }, error: null }, REFUS);
    const res = await POST(requete(demande()));
    expect(res.status).toBe(200);
    expect(etat.envois).toHaveLength(2);
    expect(JSON.stringify(journal.mock.calls)).toContain('confirmation.non_acceptee');
  });

  it('erreur réseau sur la confirmation seule : 200, journalisée', async () => {
    etat.reponsesResend.push({ data: { id: 'msg_notif' }, error: null }, new Error('timeout'));
    expect((await POST(requete(demande()))).status).toBe(200);
    expect(JSON.stringify(journal.mock.calls)).toContain('confirmation.erreur');
  });
});

describe('POST /api/contact — configuration absente : 503, rien n’est tenté', () => {
  it('clé API absente : 503 sans aucun envoi', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(requete(demande()));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: 'Service unavailable' });
    expect(etat.envois).toHaveLength(0);
    expect(JSON.stringify(journal.mock.calls)).toContain('configuration.absente');
  });

  it('adresse d’expédition absente : 503', async () => {
    delete process.env.RESEND_FROM_EMAIL;
    expect((await POST(requete(demande()))).status).toBe(503);
    expect(etat.envois).toHaveLength(0);
  });

  it('client Resend impossible à construire : 503, pas 500', async () => {
    etat.resendIndisponible = true;
    const res = await POST(requete(demande()));
    expect(res.status).toBe(503);
    expect(JSON.stringify(journal.mock.calls)).toContain('resend.indisponible');
  });
});

describe('POST /api/contact — double clic et nouvelle tentative', () => {
  it('double clic : un seul lot d’envois, deux fois la même réponse', async () => {
    const corps = demande();
    const premiere = await POST(requete(corps, '10.9.0.1'));
    const seconde = await POST(requete(corps, '10.9.0.1'));
    expect(premiere.status).toBe(200);
    expect(seconde.status).toBe(200);
    expect(await seconde.json()).toEqual({ success: true });
    expect(etat.envois).toHaveLength(2);
    expect(JSON.stringify(journal.mock.calls)).toContain('demande.dupliquee');
  });

  it('demande modifiée : traitée comme une nouvelle demande', async () => {
    const corps = demande();
    await POST(requete(corps, '10.9.1.1'));
    await POST(requete({ ...corps, message: 'précision ajoutée' }, '10.9.1.1'));
    expect(etat.envois).toHaveLength(4);
  });

  it('nouvelle tentative après échec : rejouée, et acceptée cette fois', async () => {
    const corps = demande();
    etat.reponsesResend.push(REFUS);
    expect((await POST(requete(corps, '10.9.2.1'))).status).toBe(500);
    expect((await POST(requete(corps, '10.9.2.1'))).status).toBe(200);
    expect(etat.envois).toHaveLength(3);
  });
});

describe('POST /api/contact — échappement (L09)', () => {
  it('échappe les valeurs saisies dans la notification et la confirmation', async () => {
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
  });

  it('accepte une demande longue mais légitime (message de 5 000 caractères, de-ch)', async () => {
    const res = await POST(requete(demande({ message: 'm'.repeat(5000), locale: 'de-ch' })));
    expect(res.status).toBe(200);
    expect(etat.envois[1].subject).toBe('PackshotCreator — Your request has been received');
  });

  it('champ piège rempli : 400, aucun envoi', async () => {
    const res = await POST(requete(demande({ siteWeb: 'https://spam.example' })));
    expect(res.status).toBe(400);
    expect(etat.envois).toHaveLength(0);
  });

  it('limite par destinataire : la 4e demande vers la même adresse dans l’heure reçoit 429', async () => {
    const base = demande();
    for (let i = 0; i < 3; i++) {
      expect((await POST(requete({ ...base, message: `essai ${i}` }, `10.1.0.${i}`))).status).toBe(200);
    }
    const res = await POST(requete({ ...base, message: 'essai 4' }, '10.1.0.99'));
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
    etat.reponsesResend.push(REFUS);
    const corps = demande({ firstName: 'Zéphyrine' });
    await POST(requete(corps));
    const texte = JSON.stringify(journal.mock.calls);
    expect(texte).not.toContain(String(corps.email));
    expect(texte).not.toContain('Zéphyrine');
    expect(texte).toContain('notification.non_acceptee');
  });
});
