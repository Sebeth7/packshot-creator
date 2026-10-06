import type { DemandeCatalogue } from './schema';
import { noteCrmCatalogueHtml, lireSuiviNote, type SuiviCatalogue } from './crm';
import type { EnregistrementCatalogue, StockageCatalogue } from './services';

/**
 * Trace durable des demandes de catalogue dans Pipedrive (règle : `crm.ts`).
 *
 * Même API et même authentification que `/api/contact` et `lib/pipedrive.ts`
 * (API v1, `api_token` en paramètre). Ces helpers existants ne sont pas
 * réutilisés tels quels : ils avalent les erreurs (retour `null`) et créent une
 * affaire, alors qu'ici un échec doit lever (aucun faux succès) et qu'aucune
 * affaire n'est créée.
 *
 * Dédoublonnage : la note porte le requestId. Avant d'écrire, les notes de la
 * personne sont relues ; si l'une porte déjà ce requestId, la demande est
 * reconnue comme rejouée et rien n'est réécrit. Limite : deux requêtes
 * simultanées reçues par deux instances différentes peuvent encore écrire deux
 * notes (fenêtre de quelques centaines de millisecondes).
 *
 * Aucun message d'erreur ne contient le jeton, l'e-mail ou un champ saisi.
 */

const BASE_PIPEDRIVE = 'https://api.pipedrive.com/v1';
const DELAI_MS = 8000;

export class ErreurPipedrive extends Error {
  constructor(operation: string, statut?: number) {
    super(`Pipedrive ${operation}${statut ? ` : HTTP ${statut}` : ''}`);
    this.name = 'ErreurPipedrive';
  }
}

export interface OptionsPipedrive {
  jeton: string;
  fetch?: typeof fetch;
  base?: string;
  delaiMs?: number;
}

interface PersonneTrouvee {
  id: number;
  orgId: number | null;
}

export function stockagePipedrive({ jeton, fetch: f = fetch, base = BASE_PIPEDRIVE, delaiMs = DELAI_MS }: OptionsPipedrive): StockageCatalogue {
  async function appel<T>(
    operation: string,
    methode: 'GET' | 'POST' | 'PUT',
    chemin: string,
    { params = {}, corps }: { params?: Record<string, string>; corps?: unknown } = {},
  ): Promise<T> {
    const url = new URL(`${base}${chemin}`);
    for (const [cle, valeur] of Object.entries(params)) url.searchParams.set(cle, valeur);
    url.searchParams.set('api_token', jeton);
    let reponse: Response;
    try {
      reponse = await f(url, {
        method: methode,
        headers: corps === undefined ? undefined : { 'Content-Type': 'application/json' },
        body: corps === undefined ? undefined : JSON.stringify(corps),
        signal: AbortSignal.timeout(delaiMs),
      });
    } catch {
      throw new ErreurPipedrive(operation);
    }
    let json: { success?: boolean; data?: unknown };
    try {
      json = await reponse.json();
    } catch {
      throw new ErreurPipedrive(operation, reponse.status);
    }
    if (!reponse.ok || json?.success !== true) throw new ErreurPipedrive(operation, reponse.status);
    return json.data as T;
  }

  async function chercherPersonne(email: string): Promise<PersonneTrouvee | null> {
    const data = await appel<{ items?: Array<{ item: { id: number; organization?: { id: number } | null } }> }>(
      'recherche de personne',
      'GET',
      '/persons/search',
      { params: { term: email, fields: 'email', exact_match: 'true', limit: '1' } },
    );
    const item = data?.items?.[0]?.item;
    return item ? { id: item.id, orgId: item.organization?.id ?? null } : null;
  }

  async function chercherNote(personId: number, requestId: string): Promise<{ id: number; content: string } | null> {
    const notes = await appel<Array<{ id: number; content?: string | null }> | null>('lecture des notes', 'GET', '/notes', {
      params: { person_id: String(personId), limit: '500' },
    });
    const note = (notes ?? []).find((n) => typeof n.content === 'string' && n.content.includes(requestId));
    return note ? { id: note.id, content: note.content as string } : null;
  }

  async function trouverOuCreerOrganisation(nom: string): Promise<number> {
    const data = await appel<{ items?: Array<{ item: { id: number } }> }>('recherche d’organisation', 'GET', '/organizations/search', {
      params: { term: nom, fields: 'name', exact_match: 'true', limit: '1' },
    });
    const existante = data?.items?.[0]?.item.id;
    if (existante) return existante;
    const creee = await appel<{ id: number }>('création d’organisation', 'POST', '/organizations', { corps: { name: nom } });
    if (!creee?.id) throw new ErreurPipedrive('création d’organisation');
    return creee.id;
  }

  return {
    async enregistrer(demande: DemandeCatalogue): Promise<EnregistrementCatalogue> {
      const anomalies: string[] = [];
      const personne = await chercherPersonne(demande.email);

      if (personne) {
        const note = await chercherNote(personne.id, demande.requestId);
        if (note) {
          return { reference: String(note.id), personId: personne.id, dejaEnregistree: true, suivi: lireSuiviNote(note.content), anomalies };
        }
      }

      // L'organisation complète la trace ; son échec n'empêche pas la note
      // (l'entreprise y figure en clair) et il est signalé au journal.
      let orgId: number | null = null;
      try {
        orgId = await trouverOuCreerOrganisation(demande.company);
      } catch {
        anomalies.push('catalogue.crm.organisation.echec');
      }

      let personId: number;
      if (personne) {
        personId = personne.id;
        // Une personne déjà rattachée à une autre organisation n'est pas déplacée.
        if (orgId && personne.orgId === null) {
          try {
            await appel('rattachement à l’organisation', 'PUT', `/persons/${personne.id}`, { corps: { org_id: orgId } });
          } catch {
            anomalies.push('catalogue.crm.rattachement.echec');
          }
        }
      } else {
        const creee = await appel<{ id: number }>('création de personne', 'POST', '/persons', {
          corps: {
            name: demande.firstName,
            email: [{ value: demande.email, primary: true, label: 'work' }],
            ...(orgId ? { org_id: orgId } : {}),
          },
        });
        if (!creee?.id) throw new ErreurPipedrive('création de personne');
        personId = creee.id;
      }

      const note = await appel<{ id: number }>('création de la note', 'POST', '/notes', {
        corps: { content: noteCrmCatalogueHtml(demande), person_id: personId, ...(orgId ? { org_id: orgId } : {}) },
      });
      if (!note?.id) throw new ErreurPipedrive('création de la note');
      return { reference: String(note.id), personId, dejaEnregistree: false, anomalies };
    },

    async consignerSuivi(reference: string, demande: DemandeCatalogue, suivi: SuiviCatalogue): Promise<void> {
      await appel('mise à jour de la note', 'PUT', `/notes/${encodeURIComponent(reference)}`, {
        corps: { content: noteCrmCatalogueHtml(demande, suivi) },
      });
    },
  };
}
