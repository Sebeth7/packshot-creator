import { STOCKAGE_SESSION_AUTORISE } from './activation';

/**
 * État de session de la pop-in : heure d'arrivée sur le site et apparition
 * déjà faite. En mémoire du module par défaut : il survit aux navigations
 * internes (le layout reste monté), pas à un rechargement complet. Recopié
 * dans `sessionStorage` seulement si `STOCKAGE_SESSION_AUTORISE` le permet.
 */

export const CLE_STOCKAGE = 'pkc_popin_engagement';

type EtatSession = { arriveeMs: number | null; affichee: boolean };

type Stockage = Pick<Storage, 'getItem' | 'setItem'>;

export function creerSession(stockage: Stockage | null, autorise: boolean) {
  const etat: EtatSession = { arriveeMs: null, affichee: false };
  let lu = false;

  function lire() {
    if (lu) return;
    lu = true;
    if (!autorise || !stockage) return;
    try {
      const brut = stockage.getItem(CLE_STOCKAGE);
      if (!brut) return;
      const v = JSON.parse(brut) as Partial<EtatSession>;
      if (typeof v.arriveeMs === 'number') etat.arriveeMs = v.arriveeMs;
      if (v.affichee === true) etat.affichee = true;
    } catch {
      // Stockage illisible ou indisponible : l'état reste en mémoire.
    }
  }

  function ecrire() {
    if (!autorise || !stockage) return;
    try {
      stockage.setItem(CLE_STOCKAGE, JSON.stringify(etat));
    } catch {
      // Navigation privée stricte, quota : l'état reste en mémoire.
    }
  }

  return {
    /** Note l'arrivée sur le site au premier appel ; renvoie l'heure retenue. */
    arrivee(maintenant: number): number {
      lire();
      if (etat.arriveeMs === null) {
        etat.arriveeMs = maintenant;
        ecrire();
      }
      return etat.arriveeMs;
    },
    dejaAffichee(): boolean {
      lire();
      return etat.affichee;
    },
    marquerAffichee(): void {
      lire();
      etat.affichee = true;
      ecrire();
    },
  };
}

let session: ReturnType<typeof creerSession> | null = null;

/** Session du navigateur courant, créée au premier appel côté client. */
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
    session = creerSession(stockage, STOCKAGE_SESSION_AUTORISE);
  }
  return session;
}
