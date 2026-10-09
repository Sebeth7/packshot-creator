/**
 * Pop-in d'engagement : règles d'apparition, couverture des routes,
 * interrupteurs, mémoire de session et mesure sans donnée personnelle.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  BANDE_HAUTE_PX,
  ORIGINE_CATALOGUE,
  PROFONDEUR_MINIMALE,
  ROUTES_GELEES,
  TEMPS_MINIMAL_MS,
  URL_CATALOGUE,
  estIntentionDeSortie,
  pretePourSortie,
  profondeurLecture,
  routeCouverte,
  type EtatEligibilite,
} from '../regles';
import { POPIN_PUBLICATION_AUTORISEE, STOCKAGE_SESSION_AUTORISE, popinServie } from '../activation';
import { CLE_STOCKAGE, creerSession } from '../session';
import { signalerClic, signalerFermeture, signalerImpression } from '../mesure';

const PRETE: EtatEligibilite = {
  desktop: true,
  routeCouverte: true,
  dejaAffichee: false,
  ecouleMs: TEMPS_MINIMAL_MS,
  profondeurMax: PROFONDEUR_MINIMALE,
  bandeauCookiesFerme: true,
  autreFenetreOuverte: false,
};

describe('conditions cumulatives', () => {
  it('60 s, 70 % et desktop réunis : prête pour l’intention de sortie', () => {
    expect(pretePourSortie(PRETE)).toBe(true);
  });

  it('aucune apparition avant 60 s', () => {
    expect(pretePourSortie({ ...PRETE, ecouleMs: TEMPS_MINIMAL_MS - 1 })).toBe(false);
  });

  it('aucune apparition sous 70 % de lecture', () => {
    expect(pretePourSortie({ ...PRETE, profondeurMax: 0.69 })).toBe(false);
  });

  it('jamais sur mobile, une route exclue, une seconde fois, sous le bandeau cookies ou une autre fenêtre', () => {
    expect(pretePourSortie({ ...PRETE, desktop: false })).toBe(false);
    expect(pretePourSortie({ ...PRETE, routeCouverte: false })).toBe(false);
    expect(pretePourSortie({ ...PRETE, dejaAffichee: true })).toBe(false);
    expect(pretePourSortie({ ...PRETE, bandeauCookiesFerme: false })).toBe(false);
    expect(pretePourSortie({ ...PRETE, autreFenetreOuverte: true })).toBe(false);
  });
});

describe('profondeur de lecture', () => {
  it('part parcourue, bornée entre 0 et 1', () => {
    expect(profondeurLecture(0, 800, 4000)).toBeCloseTo(0.2);
    expect(profondeurLecture(2000, 800, 4000)).toBeCloseTo(0.7);
    expect(profondeurLecture(5000, 800, 4000)).toBe(1);
    expect(profondeurLecture(-50, 800, 4000)).toBeCloseTo(0.2);
  });

  it('une page plus courte que l’écran est lue en entier', () => {
    expect(profondeurLecture(0, 900, 700)).toBe(1);
  });
});

describe('intention de sortie', () => {
  it('sortie du document par le haut, en remontant', () => {
    expect(estIntentionDeSortie({ clientY: 0, relatedTarget: null, dernierY: 40 })).toBe(true);
    expect(estIntentionDeSortie({ clientY: -3, relatedTarget: null, dernierY: null })).toBe(true);
  });

  it('pas sur une sortie latérale ou basse', () => {
    expect(estIntentionDeSortie({ clientY: 400, relatedTarget: null, dernierY: 400 })).toBe(false);
    expect(estIntentionDeSortie({ clientY: BANDE_HAUTE_PX + 1, relatedTarget: null, dernierY: 60 })).toBe(false);
  });

  it('pas quand la souris passe sur un autre élément de la page', () => {
    expect(estIntentionDeSortie({ clientY: 0, relatedTarget: {}, dernierY: 40 })).toBe(false);
  });

  it('pas quand la souris descend', () => {
    expect(estIntentionDeSortie({ clientY: 10, relatedTarget: null, dernierY: 2 })).toBe(false);
  });
});

describe('couverture des routes', () => {
  it('couverture large du site FR', () => {
    for (const chemin of [
      '/fr/studios-photo-automatises',
      '/fr/blog/guide-achat-studio-2026',
      '/fr/guide/animation-360-focus-stacking',
      '/fr/studio-photo/alphashot-360',
      '/fr/industrie/bijoux-joaillerie',
      '/fr/solutions/documentation-technique-visuelle',
      '/fr/besoins-photographie-produit',
      '/fr/a-propos',
      '/fr/blog/',
    ]) {
      expect(routeCouverte(chemin), chemin).toBe(true);
    }
  });

  it('exclusions obligatoires de la V1', () => {
    for (const chemin of [
      '/fr/contact',
      '/fr/calculateur-roi',
      '/fr/calculateur',
      '/fr/outil-financement',
      '/fr/catalogue-orbitvu-all-in-one',
      '/fr/catalogue-orbitvu-all-in-one?origine=brochure_exit_sitewide',
      '/fr/mentions-legales',
      '/fr/cgu',
      '/fr/confidentialite',
      '/fr/academy',
      '/fr/contact/merci',
      '/fr/demande/confirmation',
    ]) {
      expect(routeCouverte(chemin), chemin).toBe(false);
    }
  });

  it('pages gelées exclues, sans levée automatique', () => {
    for (const chemin of ['/fr', '/fr/', '/fr/packshot-e-commerce', '/fr/packshot-mode', '/fr/industrie/mode-textile']) {
      expect(routeCouverte(chemin), chemin).toBe(false);
    }
    expect(ROUTES_GELEES.map((g) => g.jusqua)).toEqual(['28/10/2026', '23/11/2026', '26/11/2026', '26/11/2026']);
  });

  it('ni EN ni de-ch', () => {
    for (const chemin of ['/en/studios-photo-automatises', '/en', '/de-ch/ia-photo-produit', '/de-ch']) {
      expect(routeCouverte(chemin), chemin).toBe(false);
    }
  });
});

describe('lien catalogue', () => {
  it('porte l’origine de la pop-in et aucun UTM', () => {
    const url = new URL(URL_CATALOGUE, 'https://www.packshot-creator.com');
    expect(url.pathname).toBe('/fr/catalogue-orbitvu-all-in-one');
    expect(url.searchParams.get('origine')).toBe(ORIGINE_CATALOGUE);
    expect(ORIGINE_CATALOGUE).toBe('brochure_exit_sitewide');
    expect([...url.searchParams.keys()].some((k) => k.startsWith('utm_'))).toBe(false);
  });
});

describe('interrupteurs', () => {
  it('pas de publication sans GO ; état de session en sessionStorage (décision du 09/10)', () => {
    expect(POPIN_PUBLICATION_AUTORISEE).toBe(false);
    expect(STOCKAGE_SESSION_AUTORISE).toBe(true);
  });

  it('absente de la production Vercel, présente sur Preview et en local', () => {
    expect(popinServie({ VERCEL_ENV: 'production' })).toBe(false);
    expect(popinServie({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(popinServie({})).toBe(true);
  });
});

describe('état de session', () => {
  /** sessionStorage factice : une instance = un onglet ; recréer la session = recharger la page. */
  function onglet() {
    const m = new Map<string, string>();
    return {
      getItem: vi.fn((k: string) => m.get(k) ?? null),
      setItem: vi.fn((k: string, v: string) => void m.set(k, v)),
      m,
    };
  }

  it('l’instant d’arrivée survit au rechargement : le temps se cumule entre pages', () => {
    const s = onglet();
    expect(creerSession(s).debut(1_000)).toBe(1_000);
    // Page suivante ou rechargement, 30 s plus tard : même arrivée.
    expect(creerSession(s).debut(31_000)).toBe(1_000);
    expect(creerSession(s).debut(62_000)).toBe(1_000);
  });

  it('une nouvelle session (autre onglet, session close) repart de zéro', () => {
    creerSession(onglet()).debut(1_000);
    const neuve = creerSession(onglet());
    expect(neuve.debut(500_000)).toBe(500_000);
    expect(neuve.dejaAffichee()).toBe(false);
  });

  it('apparition, fermeture ou conversion : plus d’apparition après rechargement', () => {
    for (const etat of ['shown', 'dismissed', 'converted'] as const) {
      const s = onglet();
      creerSession(s).debut(1_000);
      creerSession(s).marquer(etat);
      const apres = creerSession(s);
      expect(apres.dejaAffichee(), etat).toBe(true);
      expect(apres.etat()).toBe(etat);
    }
  });

  it('contenu stocké minimal : instant d’arrivée et état, rien d’autre', () => {
    const s = onglet();
    const session = creerSession(s);
    session.debut(1_000);
    session.marquer('dismissed');
    expect([...s.m.keys()]).toEqual([CLE_STOCKAGE]);
    expect(JSON.parse(s.m.get(CLE_STOCKAGE)!)).toEqual({ debut: 1_000, etat: 'dismissed' });
  });

  it('valeur stockée invalide ou instant futur : ignorés sans erreur', () => {
    const s = onglet();
    s.m.set(CLE_STOCKAGE, '{"debut":"hier","etat":"autre"}');
    const session = creerSession(s);
    expect(session.debut(5_000)).toBe(5_000);
    expect(session.dejaAffichee()).toBe(false);
    s.m.set(CLE_STOCKAGE, JSON.stringify({ debut: 99_000, etat: null }));
    expect(creerSession(s).debut(10_000)).toBe(10_000);
    s.m.set(CLE_STOCKAGE, 'pas du JSON');
    expect(creerSession(s).dejaAffichee()).toBe(false);
  });

  it('sessionStorage indisponible : repli en mémoire de la page, sans erreur', () => {
    const casse = {
      getItem: () => {
        throw new Error('bloqué');
      },
      setItem: () => {
        throw new Error('bloqué');
      },
    };
    const session = creerSession(casse);
    expect(session.debut(42)).toBe(42);
    expect(session.debut(90)).toBe(42);
    session.marquer('shown');
    expect(session.dejaAffichee()).toBe(true);
    const sansStockage = creerSession(null);
    expect(sansStockage.debut(7)).toBe(7);
    expect(sansStockage.dejaAffichee()).toBe(false);
  });
});

describe('mesure GA4', () => {
  const evenements: unknown[][] = [];

  afterEach(() => {
    evenements.length = 0;
    vi.unstubAllGlobals();
  });

  it('impression, démo, catalogue, fermeture : libellés fixes, sans donnée personnelle', () => {
    vi.stubGlobal('window', { gtag: (...a: unknown[]) => evenements.push(a) });
    signalerImpression();
    signalerClic('demo');
    signalerClic('brochure');
    signalerFermeture('escape');
    expect(evenements).toEqual([
      ['event', 'exit_modal_view', { cta_location: 'exit_modal' }],
      ['event', 'cta_click', { cta_name: 'demo', cta_location: 'exit_modal' }],
      ['event', 'cta_click', { cta_name: 'brochure', cta_location: 'exit_modal' }],
      ['event', 'cta_click', { cta_name: 'close', cta_location: 'exit_modal', close_method: 'escape' }],
    ]);
    const cles = new Set(evenements.flatMap((e) => Object.keys(e[2] as object)));
    expect([...cles].sort()).toEqual(['close_method', 'cta_location', 'cta_name']);
    expect(JSON.stringify(evenements)).not.toMatch(/@|utm_/);
  });
});
