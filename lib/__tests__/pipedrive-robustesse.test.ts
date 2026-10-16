/**
 * `lib/pipedrive.ts` avec des doublures exclusivement : aucun appel réseau,
 * aucune écriture CRM. Durcissement repris de #132 le 16/10/2026, au bénéfice de
 * son seul appelant restant, `app/api/roi-lead/route.ts`.
 *
 * Ce que ces cas verrouillent :
 * - une réponse HTTP non `ok` ne compte pas comme une création réussie ;
 * - un corps sans identifiant non plus ;
 * - l'échec de la note n'emporte pas l'affaire : son identifiant est rendu ;
 * - une exception réseau reste rattrapée, sans jamais faire échouer l'appelant ;
 * - le pipeline 3 et l'étape 54 « Calculs ROI » sont inchangés.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  findOrCreatePipedrivePerson,
  createPipedriveDealWithNote,
  PIPEDRIVE_PIPELINE_ID,
  PIPEDRIVE_STAGE_ID,
} from '@/lib/pipedrive';

type Reponse = { status?: number; corps?: unknown; lever?: boolean };
const plan: { search?: Reponse; persons?: Reponse; deals?: Reponse; notes?: Reponse } = {};
const appels: string[] = [];

function etape(url: string): 'search' | 'persons' | 'deals' | 'notes' {
  if (url.includes('/persons/search')) return 'search';
  if (url.includes('/persons')) return 'persons';
  if (url.includes('/deals')) return 'deals';
  if (url.includes('/notes')) return 'notes';
  throw new Error(`requête inattendue : ${url}`);
}

const fetchMock = vi.fn(async (url: string) => {
  if (!url.startsWith('https://api.pipedrive.com/')) throw new Error(`réseau interdit : ${url}`);
  const cle = etape(url);
  appels.push(cle);
  const r = plan[cle] ?? {};
  if (r.lever) throw new TypeError('fetch failed');
  return new Response(JSON.stringify(r.corps ?? { data: { id: 1 } }), { status: r.status ?? 200 });
});

const journal = vi.spyOn(console, 'warn').mockImplementation(() => {});
const erreurs = vi.spyOn(console, 'error').mockImplementation(() => {});

beforeEach(() => {
  for (const cle of Object.keys(plan)) delete plan[cle as keyof typeof plan];
  appels.length = 0;
  fetchMock.mockClear();
  journal.mockClear();
  erreurs.mockClear();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const CONTACT = { email: 'prospect@example.fr', company: 'Exemple SARL' };
const AFFAIRE = { personId: 11, title: 'ROI Calculator - test', noteContent: 'note' };

describe('findOrCreatePipedrivePerson', () => {
  it('personne trouvée par la recherche : rendue sans création', async () => {
    plan.search = { corps: { data: { items: [{ item: { id: 7 } }] } } };
    expect(await findOrCreatePipedrivePerson('jeton', CONTACT)).toBe(7);
    expect(appels).toEqual(['search']);
  });

  it('personne créée : identifiant rendu', async () => {
    plan.search = { corps: { data: { items: [] } } };
    plan.persons = { corps: { data: { id: 22 } } };
    expect(await findOrCreatePipedrivePerson('jeton', CONTACT)).toBe(22);
    expect(appels).toEqual(['search', 'persons']);
  });

  it('création refusée en HTTP (403) : null, refus journalisé, corps non lu', async () => {
    plan.search = { corps: { data: { items: [] } } };
    plan.persons = { status: 403, corps: { data: { id: 99 } } };
    expect(await findOrCreatePipedrivePerson('jeton', CONTACT)).toBeNull();
    expect(JSON.stringify(journal.mock.calls)).toContain('personne non créée');
  });

  it('réponse 200 sans identifiant : null', async () => {
    plan.search = { corps: { data: { items: [] } } };
    plan.persons = { corps: { success: true } };
    expect(await findOrCreatePipedrivePerson('jeton', CONTACT)).toBeNull();
  });

  it('exception réseau : null, sans lever vers l’appelant', async () => {
    plan.search = { lever: true };
    expect(await findOrCreatePipedrivePerson('jeton', CONTACT)).toBeNull();
  });
});

describe('createPipedriveDealWithNote', () => {
  it('affaire et note : identifiant rendu, pipeline 3 et étape 54 inchangés', async () => {
    plan.deals = { corps: { data: { id: 33 } } };
    expect(await createPipedriveDealWithNote('jeton', AFFAIRE)).toBe(33);
    expect(appels).toEqual(['deals', 'notes']);
    expect(PIPEDRIVE_PIPELINE_ID).toBe(3);
    expect(PIPEDRIVE_STAGE_ID).toBe(54);
  });

  it('affaire refusée en HTTP (500) : null, refus journalisé, aucune note tentée', async () => {
    plan.deals = { status: 500, corps: { data: { id: 44 } } };
    expect(await createPipedriveDealWithNote('jeton', AFFAIRE)).toBeNull();
    expect(appels).toEqual(['deals']);
    expect(JSON.stringify(journal.mock.calls)).toContain('affaire non créée');
  });

  it('réponse 200 sans identifiant : null, aucune note tentée', async () => {
    plan.deals = { corps: { success: true } };
    expect(await createPipedriveDealWithNote('jeton', AFFAIRE)).toBeNull();
    expect(appels).toEqual(['deals']);
  });

  it('note en échec réseau après l’affaire : l’affaire reste comptée', async () => {
    plan.deals = { corps: { data: { id: 55 } } };
    plan.notes = { lever: true };
    expect(await createPipedriveDealWithNote('jeton', AFFAIRE)).toBe(55);
    expect(JSON.stringify(journal.mock.calls)).toContain('note non créée');
  });

  it('note refusée en HTTP : l’affaire reste comptée', async () => {
    plan.deals = { corps: { data: { id: 66 } } };
    plan.notes = { status: 400, corps: {} };
    expect(await createPipedriveDealWithNote('jeton', AFFAIRE)).toBe(66);
  });

  it('exception réseau sur l’affaire : null, sans lever vers l’appelant', async () => {
    plan.deals = { lever: true };
    expect(await createPipedriveDealWithNote('jeton', AFFAIRE)).toBeNull();
  });
});
