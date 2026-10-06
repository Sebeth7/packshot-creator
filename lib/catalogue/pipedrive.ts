import type { DemandeCatalogue } from './schema';
import { noteCrmCatalogueHtml, lireSuiviNote, type SuiviCatalogue } from './crm';
import type { EnregistrementCatalogue, StockageCatalogue } from './services';

/**
 * Trace durable des demandes de catalogue dans Pipedrive (règle : `crm.ts`).
 *
 * Versions de l'API (migration du 06/10/2026, GO de Laurent) :
 * - personnes et organisations en API v2 : Pipedrive a déprécié leurs points
 *   d'accès v1 au 01/01/2026 et les a mis hors support le 01/08/2026
 *   (changelog développeurs). Contrat vérifié sur le client officiel `pipedrive`
 *   33.4.3 : base `https://api.pipedrive.com/api/v2`, jeton dans l'en-tête
 *   `x-api-token` (jamais dans l'URL), PATCH au lieu de PUT, `emails` au pluriel ;
 * - notes en API v1 (`api_token` en paramètre, comme `/api/contact`) : absentes
 *   de la liste de dépréciation et sans équivalent v2.
 *
 * Les helpers de `lib/pipedrive.ts` et de `/api/contact` (production, toujours
 * en v1) ne sont ni réutilisés ni modifiés : ils avalent les erreurs (retour
 * `null`) et créent une affaire, alors qu'ici un échec doit lever (aucun faux
 * succès) et qu'aucune affaire n'est créée.
 *
 * Dédoublonnage : la note porte le requestId. Avant d'écrire, les notes de la
 * personne sont relues ; si l'une porte déjà ce requestId, la demande est
 * reconnue comme rejouée et rien n'est réécrit. Limite : deux requêtes
 * simultanées reçues par deux instances différentes peuvent encore écrire deux
 * notes (fenêtre de quelques centaines de millisecondes).
 *
 * Aucun message d'erreur ne contient le jeton, l'e-mail ou un champ saisi.
 */

const BASES_PIPEDRIVE = {
  v1: 'https://api.pipedrive.com/v1',
  v2: 'https://api.pipedrive.com/api/v2',
} as const;
const DELAI_MS = 8000;

type VersionApi = keyof typeof BASES_PIPEDRIVE;

export class ErreurPipedrive extends Error {
  constructor(operation: string, statut?: number) {
    super(`Pipedrive ${operation}${statut ? ` : HTTP ${statut}` : ''}`);
    this.name = 'ErreurPipedrive';
  }
}

export interface OptionsPipedrive {
  jeton: string;
  fetch?: typeof fetch;
  /** Pour les tests seulement. */
  bases?: Record<VersionApi, string>;
  delaiMs?: number;
}

interface PersonneTrouvee {
  id: number;
  orgId: number | null;
}

export function stockagePipedrive({ jeton, fetch: f = fetch, bases = BASES_PIPEDRIVE, delaiMs = DELAI_MS }: OptionsPipedrive): StockageCatalogue {
  async function appel<T>(
    operation: string,
    version: VersionApi,
    methode: 'GET' | 'POST' | 'PUT' | 'PATCH',
    chemin: string,
    { params = {}, corps }: { params?: Record<string, string>; corps?: unknown } = {},
  ): Promise<T> {
    const url = new URL(`${bases[version]}${chemin}`);
    for (const [cle, valeur] of Object.entries(params)) url.searchParams.set(cle, valeur);
    const entetes: Record<string, string> = {};
    if (corps !== undefined) entetes['Content-Type'] = 'application/json';
    if (version === 'v2') entetes['x-api-token'] = jeton;
    else url.searchParams.set('api_token', jeton);
    let reponse: Response;
    try {
      reponse = await f(url, {
        method: methode,
        headers: entetes,
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

  /** Identifiant numérique d'une réponse, sinon échec : une forme inattendue ne doit pas créer de doublon. */
  function identifiant(operation: string, valeur: unknown): number {
    if (typeof valeur !== 'number' || !Number.isInteger(valeur) || valeur <= 0) throw new ErreurPipedrive(operation);
    return valeur;
  }

  async function chercherPersonne(email: string): Promise<PersonneTrouvee | null> {
    const operation = 'recherche de personne';
    const data = await appel<{ items?: Array<{ item?: { id?: unknown; organization?: { id?: unknown } | null } }> }>(
      operation,
      'v2',
      'GET',
      '/persons/search',
      { params: { term: email, fields: 'email', exact_match: 'true', limit: '1' } },
    );
    const resultat = data?.items?.[0];
    if (!resultat) return null;
    const orgId = resultat.item?.organization?.id;
    return {
      id: identifiant(operation, resultat.item?.id),
      orgId: orgId === undefined || orgId === null ? null : identifiant(operation, orgId),
    };
  }

  async function chercherNote(personId: number, requestId: string): Promise<{ id: number; content: string } | null> {
    const notes = await appel<Array<{ id: number; content?: string | null }> | null>('lecture des notes', 'v1', 'GET', '/notes', {
      params: { person_id: String(personId), limit: '500' },
    });
    const note = (notes ?? []).find((n) => typeof n.content === 'string' && n.content.includes(requestId));
    return note ? { id: note.id, content: note.content as string } : null;
  }

  async function trouverOuCreerOrganisation(nom: string): Promise<number> {
    const recherche = 'recherche d’organisation';
    const data = await appel<{ items?: Array<{ item?: { id?: unknown } }> }>(recherche, 'v2', 'GET', '/organizations/search', {
      params: { term: nom, fields: 'name', exact_match: 'true', limit: '1' },
    });
    const existante = data?.items?.[0];
    if (existante) return identifiant(recherche, existante.item?.id);
    const creation = 'création d’organisation';
    const creee = await appel<{ id?: unknown }>(creation, 'v2', 'POST', '/organizations', { corps: { name: nom } });
    return identifiant(creation, creee?.id);
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
            await appel('rattachement à l’organisation', 'v2', 'PATCH', `/persons/${personne.id}`, { corps: { org_id: orgId } });
          } catch {
            anomalies.push('catalogue.crm.rattachement.echec');
          }
        }
      } else {
        const creation = 'création de personne';
        const creee = await appel<{ id?: unknown }>(creation, 'v2', 'POST', '/persons', {
          corps: {
            name: demande.firstName,
            emails: [{ value: demande.email, primary: true, label: 'work' }],
            ...(orgId ? { org_id: orgId } : {}),
          },
        });
        personId = identifiant(creation, creee?.id);
      }

      const note = await appel<{ id: number }>('création de la note', 'v1', 'POST', '/notes', {
        corps: { content: noteCrmCatalogueHtml(demande), person_id: personId, ...(orgId ? { org_id: orgId } : {}) },
      });
      if (!note?.id) throw new ErreurPipedrive('création de la note');
      return { reference: String(note.id), personId, dejaEnregistree: false, anomalies };
    },

    async consignerSuivi(reference: string, demande: DemandeCatalogue, suivi: SuiviCatalogue): Promise<void> {
      await appel('mise à jour de la note', 'v1', 'PUT', `/notes/${encodeURIComponent(reference)}`, {
        corps: { content: noteCrmCatalogueHtml(demande, suivi) },
      });
    },
  };
}
