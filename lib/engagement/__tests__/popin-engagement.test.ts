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
  it('ni publication ni stockage de session sans GO', () => {
    expect(POPIN_PUBLICATION_AUTORISEE).toBe(false);
    expect(STOCKAGE_SESSION_AUTORISE).toBe(false);
  });

  it('absente de la production Vercel, présente sur Preview et en local', () => {
    expect(popinServie({ VERCEL_ENV: 'production' })).toBe(false);
    expect(popinServie({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(popinServie({})).toBe(true);
  });
});

describe('mémoire de session', () => {
  function stockageFactice() {
    const m = new Map<string, string>();
    return {
      getItem: vi.fn((k: string) => m.get(k) ?? null),
      setItem: vi.fn((k: string, v: string) => void m.set(k, v)),
      m,
    };
  }

  it('stockage non autorisé : rien n’est lu ni écrit, l’état reste en mémoire', () => {
    const s = stockageFactice();
    const session = creerSession(s, false);
    expect(session.arrivee(1000)).toBe(1000);
    expect(session.arrivee(5000)).toBe(1000);
    session.marquerAffichee();
    expect(session.dejaAffichee()).toBe(true);
    expect(s.getItem).not.toHaveBeenCalled();
    expect(s.setItem).not.toHaveBeenCalled();
  });

  it('stockage autorisé : arrivée et apparition relues dans la session', () => {
    const s = stockageFactice();
    const premiere = creerSession(s, true);
    premiere.arrivee(1000);
    premiere.marquerAffichee();
    const suivante = creerSession(s, true);
    expect(suivante.arrivee(9000)).toBe(1000);
    expect(suivante.dejaAffichee()).toBe(true);
    expect(JSON.parse(s.m.get(CLE_STOCKAGE)!)).toEqual({ arriveeMs: 1000, affichee: true });
  });

  it('stockage illisible : aucune erreur, état en mémoire', () => {
    const casse = {
      getItem: () => {
        throw new Error('bloqué');
      },
      setItem: () => {
        throw new Error('bloqué');
      },
    };
    const session = creerSession(casse, true);
    expect(session.arrivee(42)).toBe(42);
    expect(session.dejaAffichee()).toBe(false);
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
