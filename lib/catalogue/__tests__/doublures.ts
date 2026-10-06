/**
 * Doublures des services externes de la landing catalogue : un Pipedrive en
 * mémoire et un client Resend factice. Aucun appel réseau : `fetch` n'est
 * jamais le vrai.
 *
 * Le faux Pipedrive applique le contrat de `lib/catalogue/pipedrive.ts`
 * (migration du 06/10/2026, vérifié sur le client officiel `pipedrive` 33.4.3) :
 * - API v2 (`/api/v2`, jeton dans l'en-tête `x-api-token`, jamais dans l'URL) :
 *   GET /persons/search, POST /persons, PATCH /persons/{id},
 *   GET /organizations/search, POST /organizations ;
 * - API v1 (`/v1`, paramètre `api_token`) : GET /notes, POST /notes, PUT /notes/{id}.
 * Toute autre version, méthode ou authentification est refusée et consignée
 * dans `violations` : une régression vers la v1 fait échouer les tests.
 * Les réponses v2 reprennent les formes des modèles officiels (`success`,
 * `data.items[].item`, `additional_data.next_cursor`).
 */
import { vi } from 'vitest';
import type { ClientCourriel } from '@/lib/catalogue/resend';

export const JETON_DOUBLURE = 'jeton-pipedrive-secret';

type Version = 'v1' | 'v2' | 'inconnue';

export interface AppelPipedrive {
  methode: string;
  version: Version;
  /** Chemin sans préfixe de version, ex. `/persons/search`. */
  chemin: string;
  url: URL;
  entetes: Record<string, string>;
  corps?: Record<string, unknown>;
}

type Echec = number | 'reseau' | undefined;

/** Routes du contrat : `METHODE chemin` (identifiants remplacés par `{id}`) → version attendue. */
const CONTRAT: Record<string, Version> = {
  'GET /persons/search': 'v2',
  'POST /persons': 'v2',
  'PATCH /persons/{id}': 'v2',
  'GET /organizations/search': 'v2',
  'POST /organizations': 'v2',
  'GET /notes': 'v1',
  'POST /notes': 'v1',
  'PUT /notes/{id}': 'v1',
};

function versionEtChemin(pathname: string): { version: Version; chemin: string } {
  if (pathname.startsWith('/api/v2/')) return { version: 'v2', chemin: pathname.slice('/api/v2'.length) };
  if (pathname.startsWith('/v1/')) return { version: 'v1', chemin: pathname.slice('/v1'.length) };
  return { version: 'inconnue', chemin: pathname };
}

function entetesEnObjet(h: HeadersInit | undefined): Record<string, string> {
  const resultat: Record<string, string> = {};
  new Headers(h).forEach((valeur, cle) => {
    resultat[cle] = valeur;
  });
  return resultat;
}

export function fauxPipedrive(
  echec: (methode: string, chemin: string) => Echec = () => undefined,
  { jeton = JETON_DOUBLURE }: { jeton?: string } = {},
) {
  const personnes: Array<{ id: number; name: string; email: string; org_id: number | null }> = [];
  const organisations: Array<{ id: number; name: string }> = [];
  const notes: Array<{ id: number; content: string; person_id: number; org_id: number | null }> = [];
  const appels: AppelPipedrive[] = [];
  const violations: string[] = [];
  let suivant = 100;

  const ok = (data: unknown, additional_data?: unknown) =>
    Response.json({ success: true, data, ...(additional_data === undefined ? {} : { additional_data }) });
  const refus = (status: number, raison: string) => {
    violations.push(raison);
    return Response.json({ success: false, error: raison, error_info: 'doublure', data: null, additional_data: null }, { status });
  };
  const personneV2 = (p: (typeof personnes)[number]) => ({
    id: p.id,
    name: p.name,
    org_id: p.org_id,
    emails: [{ value: p.email, primary: true, label: 'work' }],
  });

  const fetchFaux = vi.fn(async (entree: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(entree));
    const methode = init?.method ?? 'GET';
    const { version, chemin } = versionEtChemin(url.pathname);
    const entetes = entetesEnObjet(init?.headers);
    const corps = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : undefined;
    appels.push({ methode, version, chemin, url, entetes, corps });

    const route = `${methode} ${chemin.replace(/\/\d+$/, '/{id}')}`;
    const attendue = CONTRAT[route];
    if (!attendue) return refus(405, `route hors contrat : ${version} ${route}`);
    if (version !== attendue) return refus(410, `version non conforme : ${route} attendu en ${attendue}, reçu en ${version}`);

    if (version === 'v2') {
      if (url.searchParams.has('api_token') || url.href.includes(jeton)) return refus(401, `jeton dans une URL v2 : ${route}`);
      if (entetes['x-api-token'] !== jeton) return refus(401, `en-tête x-api-token absent ou faux : ${route}`);
    } else if (url.searchParams.get('api_token') !== jeton) {
      return refus(401, `paramètre api_token absent ou faux : ${route}`);
    }

    const e = echec(methode, chemin);
    if (e === 'reseau') throw new TypeError('fetch failed');
    if (typeof e === 'number') return Response.json({ success: false, error: 'erreur simulée' }, { status: e });

    if (route === 'GET /persons/search') {
      const terme = (url.searchParams.get('term') ?? '').toLowerCase();
      const p = personnes.find((x) => x.email.toLowerCase() === terme);
      const item = p && {
        id: p.id,
        type: 'person',
        name: p.name,
        emails: [p.email],
        organization: p.org_id ? { id: p.org_id, name: organisations.find((o) => o.id === p.org_id)?.name ?? '', address: null } : null,
      };
      return ok({ items: item ? [{ result_score: 1, item }] : [] }, { next_cursor: null });
    }
    if (route === 'GET /organizations/search') {
      const terme = (url.searchParams.get('term') ?? '').toLowerCase();
      const o = organisations.find((x) => x.name.toLowerCase() === terme);
      return ok({ items: o ? [{ result_score: 1, item: { id: o.id, type: 'organization', name: o.name, address: null } }] : [] }, { next_cursor: null });
    }
    if (route === 'POST /organizations') {
      if (typeof corps?.name !== 'string' || corps.name.length === 0) return refus(400, 'organisation sans nom');
      const o = { id: suivant++, name: corps.name };
      organisations.push(o);
      return ok({ ...o, address: null });
    }
    if (route === 'POST /persons') {
      if ('email' in (corps ?? {})) return refus(400, 'champ v1 « email » envoyé en v2');
      const emails = corps?.emails;
      const valides =
        Array.isArray(emails) &&
        emails.length > 0 &&
        emails.every((m) => typeof m?.value === 'string' && typeof m?.primary === 'boolean' && typeof m?.label === 'string');
      if (!valides || typeof corps?.name !== 'string') return refus(400, 'personne v2 mal formée');
      const p = { id: suivant++, name: corps.name, email: (emails as Array<{ value: string }>)[0].value, org_id: (corps.org_id as number) ?? null };
      personnes.push(p);
      return ok(personneV2(p));
    }
    if (route === 'PATCH /persons/{id}') {
      const p = personnes.find((x) => x.id === Number(chemin.split('/').pop()));
      if (!p) return Response.json({ success: false, error: 'personne inconnue' }, { status: 404 });
      p.org_id = corps?.org_id as number;
      return ok(personneV2(p));
    }
    if (route === 'GET /notes') {
      const id = Number(url.searchParams.get('person_id'));
      const liste = notes.filter((n) => n.person_id === id);
      return ok(liste.length > 0 ? liste : null);
    }
    if (route === 'POST /notes') {
      const n = {
        id: suivant++,
        content: String(corps?.content),
        person_id: corps?.person_id as number,
        org_id: (corps?.org_id as number) ?? null,
      };
      notes.push(n);
      return ok(n);
    }
    // PUT /notes/{id}
    const n = notes.find((x) => x.id === Number(chemin.split('/').pop()));
    if (!n) return Response.json({ success: false, error: 'note inconnue' }, { status: 404 });
    n.content = String(corps?.content);
    return ok(n);
  });

  return { fetch: fetchFaux as unknown as typeof fetch, fetchFaux, personnes, organisations, notes, appels, violations };
}

export type MessageEnvoye = Parameters<ClientCourriel['emails']['send']>[0];

export function fauxResend(reponse?: (m: MessageEnvoye) => { data: { id: string } | null; error: unknown }) {
  const envois: MessageEnvoye[] = [];
  const send = vi.fn(async (m: MessageEnvoye) => {
    envois.push(m);
    return reponse ? reponse(m) : { data: { id: `msg_${envois.length}` }, error: null };
  });
  const client: ClientCourriel = { emails: { send } };
  return { client, envois, send };
}
