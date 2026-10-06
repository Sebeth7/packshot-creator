/**
 * Doublures des services externes de la landing catalogue : un Pipedrive en
 * mémoire (API v1, routes utilisées par `lib/catalogue/pipedrive.ts`) et un
 * client Resend factice. Aucun appel réseau : `fetch` n'est jamais le vrai.
 */
import { vi } from 'vitest';
import type { ClientCourriel } from '@/lib/catalogue/resend';

export interface AppelPipedrive {
  methode: string;
  chemin: string;
  url: URL;
  corps?: Record<string, unknown>;
}

type Echec = number | 'reseau' | undefined;

export function fauxPipedrive(echec: (methode: string, chemin: string) => Echec = () => undefined) {
  const personnes: Array<{ id: number; name: string; email: string; org_id: number | null }> = [];
  const organisations: Array<{ id: number; name: string }> = [];
  const notes: Array<{ id: number; content: string; person_id: number; org_id: number | null }> = [];
  const appels: AppelPipedrive[] = [];
  let suivant = 100;

  const ok = (data: unknown) => Response.json({ success: true, data });

  const fetchFaux = vi.fn(async (entree: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(entree));
    const methode = init?.method ?? 'GET';
    const chemin = url.pathname.replace(/^\/v1/, '');
    const corps = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : undefined;
    appels.push({ methode, chemin, url, corps });

    const e = echec(methode, chemin);
    if (e === 'reseau') throw new TypeError('fetch failed');
    if (typeof e === 'number') return Response.json({ success: false, error: 'erreur simulée' }, { status: e });

    if (methode === 'GET' && chemin === '/persons/search') {
      const terme = (url.searchParams.get('term') ?? '').toLowerCase();
      const p = personnes.find((x) => x.email.toLowerCase() === terme);
      return ok({ items: p ? [{ item: { id: p.id, organization: p.org_id ? { id: p.org_id } : null } }] : [] });
    }
    if (methode === 'GET' && chemin === '/notes') {
      const id = Number(url.searchParams.get('person_id'));
      const liste = notes.filter((n) => n.person_id === id);
      return ok(liste.length > 0 ? liste : null);
    }
    if (methode === 'GET' && chemin === '/organizations/search') {
      const terme = url.searchParams.get('term');
      const o = organisations.find((x) => x.name === terme);
      return ok({ items: o ? [{ item: { id: o.id } }] : [] });
    }
    if (methode === 'POST' && chemin === '/organizations') {
      const o = { id: suivant++, name: String(corps?.name) };
      organisations.push(o);
      return ok(o);
    }
    if (methode === 'POST' && chemin === '/persons') {
      const emails = corps?.email as Array<{ value: string }>;
      const p = { id: suivant++, name: String(corps?.name), email: emails[0].value, org_id: (corps?.org_id as number) ?? null };
      personnes.push(p);
      return ok(p);
    }
    const personne = /^\/persons\/(\d+)$/.exec(chemin);
    if (methode === 'PUT' && personne) {
      const p = personnes.find((x) => x.id === Number(personne[1]));
      if (!p) return Response.json({ success: false }, { status: 404 });
      p.org_id = corps?.org_id as number;
      return ok(p);
    }
    if (methode === 'POST' && chemin === '/notes') {
      const n = {
        id: suivant++,
        content: String(corps?.content),
        person_id: corps?.person_id as number,
        org_id: (corps?.org_id as number) ?? null,
      };
      notes.push(n);
      return ok(n);
    }
    const note = /^\/notes\/(\d+)$/.exec(chemin);
    if (methode === 'PUT' && note) {
      const n = notes.find((x) => x.id === Number(note[1]));
      if (!n) return Response.json({ success: false }, { status: 404 });
      n.content = String(corps?.content);
      return ok(n);
    }
    return Response.json({ success: false, error: 'route inconnue' }, { status: 404 });
  });

  return { fetch: fetchFaux as unknown as typeof fetch, fetchFaux, personnes, organisations, notes, appels };
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
