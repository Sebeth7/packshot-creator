import { STOCKAGE_SESSION_AUTORISE } from './activation';

/**
 * État de session de la pop-in, dans `sessionStorage` seulement : propre à
 * l'onglet, conservé par les navigations internes et les rechargements,
 * effacé à la fin de la session de navigation. Aucun cookie, aucun
 * `localStorage`, aucun identifiant, aucune URL, aucun historique.
 *
 * Contenu, et rien d'autre : `{ "debut": <instant d'arrivée, ms>, "etat":
 * null | "shown" | "dismissed" | "converted" }`.
 *
 * Statut « vie privée » de ce stockage : NON ÉTABLI juridiquement, à
 * intégrer à P4 avant publication. Stockage indisponible ou interdit par
 * `STOCKAGE_SESSION_AUTORISE` : repli sur la mémoire de la page.
 */

export const CLE_STOCKAGE = 'pkc_popin_engagement';

/** Apparition faite, fermée sans conversion, ou suivie d'un clic Démo ou Catalogue. */
export type EtatPopin = 'shown' | 'dismissed' | 'converted';

const ETATS: readonly EtatPopin[] = ['shown', 'dismissed', 'converted'];

type EtatSession = { debut: number | null; etat: EtatPopin | null };

type Stockage = Pick<Storage, 'getItem' | 'setItem'>;

export function creerSession(stockage: Stockage | null) {
  const memoire: EtatSession = { debut: null, etat: null };

  function lire(): EtatSession {
    if (!stockage) return memoire;
    try {
      const brut = stockage.getItem(CLE_STOCKAGE);
      if (!brut) return memoire;
      const v = JSON.parse(brut) as Partial<Record<keyof EtatSession, unknown>>;
      return {
        debut: typeof v.debut === 'number' && Number.isFinite(v.debut) ? v.debut : memoire.debut,
        etat: ETATS.includes(v.etat as EtatPopin) ? (v.etat as EtatPopin) : memoire.etat,
      };
    } catch {
      return memoire;
    }
  }

  function ecrire(e: EtatSession): void {
    memoire.debut = e.debut;
    memoire.etat = e.etat;
    if (!stockage) return;
    try {
      stockage.setItem(CLE_STOCKAGE, JSON.stringify({ debut: e.debut, etat: e.etat }));
    } catch {
      // Navigation privée stricte, quota : l'état reste en mémoire de la page.
    }
  }

  return {
    /**
     * Instant d'arrivée sur le site dans cette session, noté au premier appel.
     * Un instant futur (horloge du poste reculée) est ramené à maintenant.
     */
    debut(maintenant: number): number {
      const e = lire();
      if (e.debut === null || e.debut > maintenant) {
        ecrire({ ...e, debut: maintenant });
        return maintenant;
      }
      return e.debut;
    },
    etat(): EtatPopin | null {
      return lire().etat;
    },
    /** Vrai dès qu'une apparition a eu lieu dans la session, quelle qu'en soit l'issue. */
    dejaAffichee(): boolean {
      return lire().etat !== null;
    },
    marquer(etat: EtatPopin): void {
      ecrire({ ...lire(), etat });
    },
  };
}

let session: ReturnType<typeof creerSession> | null = null;

/** Session de l'onglet courant, créée au premier appel côté client. */
export function sessionPopin() {
  if (!session) {
    let stockage: Stockage | null = null;
    if (STOCKAGE_SESSION_AUTORISE) {
      try {
        stockage = window.sessionStorage;
      } catch {
        stockage = null;
      }
    }
    session = creerSession(stockage);
  }
  return session;
}
