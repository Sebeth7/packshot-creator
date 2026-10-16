import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { MACHINES_OCCASION, type MachineOccasion } from '@/data/occasion/machines';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { ficheTechnique } from '@/data/produits/fiches-techniques';
import {
  COLLECTE_REELLE_AUTORISEE,
  FENETRE_TEST_JUSQUA,
  PUBLICATION_AUTORISEE,
  etatCollecte,
  exemplesFictifsServis,
  liensOccasionServis,
  pageOccasionServie,
} from '@/lib/occasion/activation';
import { FRAICHEUR_MAX_JOURS, elementsManquants, machinesDisponibles, nomModele } from '@/lib/occasion/stock';
import { routeCouverte } from '@/lib/engagement/regles';
import { avisTestReel, texteBandeau } from '@/components/landings/occasion/contenu';

const MAINTENANT = new Date('2026-10-10T12:00:00Z');

describe('Verrous de publication (GO_PUBLICATION, publication à stock vide, option B, D60)', () => {
  it('page et liens servis en production publiée, ouverts en Preview et en local', () => {
    expect(PUBLICATION_AUTORISEE).toBe(true);
    expect(pageOccasionServie({ VERCEL_ENV: 'production' })).toBe(true);
    expect(liensOccasionServis({ VERCEL_ENV: 'production' })).toBe(true);
    expect(pageOccasionServie({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(liensOccasionServis({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(pageOccasionServie({})).toBe(true);
  });

  it('exemples fictifs jamais servis en production', () => {
    expect(exemplesFictifsServis({ VERCEL_ENV: 'production' })).toBe(false);
    expect(exemplesFictifsServis({ VERCEL_ENV: 'preview' })).toBe(true);
  });

  it('collecte réelle ouverte avec la publication (recherche éprouvée, test réel du 11/10)', () => {
    expect(COLLECTE_REELLE_AUTORISEE).toBe(true);
  });

  it('pas de publication avec des formulaires simulés', () => {
    if (PUBLICATION_AUTORISEE) expect(COLLECTE_REELLE_AUTORISEE).toBe(true);
  });
});

describe('Fenêtre de test réel (protocole de #82, 11/10/2026)', () => {
  const T0 = new Date('2026-10-11T12:00:00Z');
  const fenetre = (fenetreJusqua: string | null, publication = false) => ({ collecte: true, publication, fenetreJusqua });

  it('verrous du code : aucune fenêtre ouverte ; en production, la publication ouvre la collecte', () => {
    expect(FENETRE_TEST_JUSQUA).toBeNull();
    expect(etatCollecte({}, T0)).toEqual({ ouverte: false, jusqua: null });
    expect(etatCollecte({ VERCEL_ENV: 'preview' }, T0)).toEqual({ ouverte: false, jusqua: null });
    expect(etatCollecte({ VERCEL_ENV: 'production' }, T0)).toEqual({ ouverte: true, jusqua: null });
  });

  it('collecte autorisée sans fenêtre, ou fenêtre illisible : fermée hors production', () => {
    expect(etatCollecte({ VERCEL_ENV: 'preview' }, T0, fenetre(null)).ouverte).toBe(false);
    expect(etatCollecte({ VERCEL_ENV: 'preview' }, T0, fenetre('demain')).ouverte).toBe(false);
  });

  it('fenêtre en cours : ouverte jusqu’à l’heure de fin, puis fermée sans nouveau déploiement', () => {
    expect(etatCollecte({ VERCEL_ENV: 'preview' }, T0, fenetre('2026-10-11T14:00:00Z'))).toEqual({ ouverte: true, jusqua: '2026-10-11T14:00:00.000Z' });
    expect(etatCollecte({ VERCEL_ENV: 'preview' }, new Date('2026-10-11T14:00:00Z'), fenetre('2026-10-11T14:00:00Z')).ouverte).toBe(false);
  });

  it('production : la fenêtre ne compte pas, seule la publication décide', () => {
    expect(etatCollecte({ VERCEL_ENV: 'production' }, T0, fenetre('2026-10-11T14:00:00Z')).ouverte).toBe(false);
    expect(etatCollecte({ VERCEL_ENV: 'production' }, T0, fenetre(null, true))).toEqual({ ouverte: true, jusqua: null });
  });
});

describe('Bandeau et avis : ils suivent l’état réel de la collecte', () => {
  const ferme = { active: false, jusqua: null };
  const test = { active: true, jusqua: '2026-10-11T14:00:00.000Z' };

  it('collecte fermée : « recherche fermée (503) », jamais « vrais e-mails »', () => {
    for (const vue of ['reel', 'exemples'] as const) {
      const b = texteBandeau(vue, ferme);
      expect(b.test).toBe(false);
      expect(b.texte).toContain('recherche fermée (503)');
      expect(b.texte).not.toContain('vrais e-mails');
    }
    expect(texteBandeau('exemples', ferme).titre).toBe('Exemples fictifs – aucune offre réelle');
  });

  it('test réel : titre « Test réel en cours », envois réels et heure de fermeture annoncés, jamais « aucune donnée transmise »', () => {
    for (const vue of ['reel', 'exemples'] as const) {
      const b = texteBandeau(vue, test);
      expect(b.test).toBe(true);
      expect(b.titre.startsWith('Test réel en cours')).toBe(true);
      expect(b.texte).toContain('vrais e-mails');
      expect(b.texte).toContain('2026-10-11 14:00 UTC');
      expect(b.texte).not.toMatch(/aucune donnée transmise|fermée \(503\)/);
    }
    expect(texteBandeau('exemples', test).titre).toContain('exemples fictifs');
    expect(avisTestReel(test)).toContain('vrais e-mails');
    expect(avisTestReel(test)).toContain('2026-10-11 14:00 UTC');
  });
});

describe('Registre du stock réel', () => {
  it('vide par défaut : aucune machine réelle établie au 10/10/2026', () => {
    expect(machinesDisponibles(MACHINES_OCCASION, MAINTENANT)).toEqual([]);
  });

  it('aucune machine fictive dans le registre réel', () => {
    expect(MACHINES_OCCASION.filter((m) => m.fictif)).toEqual([]);
  });

  it('toute machine « disponible » du registre a une fiche complète (garantie, photos, historique, état, vérifications)', () => {
    for (const m of MACHINES_OCCASION.filter((x) => x.statut === 'disponible')) {
      expect(elementsManquants(m), m.ref).toEqual([]);
    }
  });

  it('références uniques et modèles du référentiel produit (D45)', () => {
    const refs = MACHINES_OCCASION.map((m) => m.ref);
    expect(new Set(refs).size).toBe(refs.length);
    for (const m of MACHINES_OCCASION) expect(ficheTechnique(m.modeleId), m.ref).toBeDefined();
  });
});

describe('Registre : garde-fous de saisie (data/occasion/AJOUT-MACHINE.md)', () => {
  const ISO_JOUR = /^\d{4}-\d{2}-\d{2}$/;

  it('dates de confirmation au format AAAA-MM-JJ, jamais dans le futur', () => {
    for (const m of MACHINES_OCCASION) {
      expect(m.statutConfirmeLe, m.ref).toMatch(ISO_JOUR);
      expect(Date.parse(`${m.statutConfirmeLe}T00:00:00Z`), m.ref).toBeLessThanOrEqual(Date.now() + 86_400_000);
    }
  });

  it('photos : fichiers présents dans public/, texte alternatif renseigné', () => {
    for (const m of MACHINES_OCCASION) {
      for (const p of m.photos) {
        expect(existsSync(join(process.cwd(), 'public', p.src)), `${m.ref} ${p.src}`).toBe(true);
        expect(p.alt.trim().length, `${m.ref} ${p.src}`).toBeGreaterThan(0);
      }
    }
  });

  it('annonce : seulement après un bulletin réel (identifiant et date d’envoi)', () => {
    for (const m of MACHINES_OCCASION.filter((x) => x.annonce)) {
      expect(m.annonce?.bulletin, m.ref).toMatch(/^arrivage-\d{4}-\d{2}-\d{2}-[0-9a-f]{8}$/);
      expect(m.annonce?.envoyeLe, m.ref).toMatch(ISO_JOUR);
    }
  });

  it('fraîcheur : valeur provisoire de 30 jours, à arbitrer', () => {
    expect(FRAICHEUR_MAX_JOURS).toBe(30);
  });
});

describe('Calcul de l’état depuis la source', () => {
  const base = exemplesFictifs(MAINTENANT)[0];
  const machine = (p: Partial<MachineOccasion>): MachineOccasion => ({ ...base, fictif: false, ...p });

  it('seules les machines « disponibles », confirmées récemment, d’un modèle connu sont affichées', () => {
    const source = [
      machine({ ref: 'A', statut: 'disponible', statutConfirmeLe: '2026-10-01' }),
      machine({ ref: 'B', statut: 'vendue', statutConfirmeLe: '2026-10-09' }),
      machine({ ref: 'C', statut: 'reservee', statutConfirmeLe: '2026-10-09' }),
      machine({ ref: 'D', statut: 'disponible', statutConfirmeLe: '2026-08-01' }),
      machine({ ref: 'E', statut: 'disponible', statutConfirmeLe: '2026-10-09', modeleId: 'inconnu' }),
      machine({ ref: 'F', statut: 'disponible', statutConfirmeLe: 'pas une date' }),
    ];
    expect(machinesDisponibles(source, MAINTENANT).map((m) => m.ref)).toEqual(['A']);
    expect(FRAICHEUR_MAX_JOURS).toBeGreaterThan(0);
  });

  it('une fiche incomplète est signalée champ par champ', () => {
    const incomplete = machine({ historique: ' ', photos: [], garantie: { garant: 'X', duree: '', pointDeDepart: 'Y', exclusions: 'Z' } });
    expect(elementsManquants(incomplete)).toEqual(expect.arrayContaining(['historique', 'photos', 'garantie.duree']));
  });
});

describe('Exemples fictifs de la V4.1', () => {
  const exemples = exemplesFictifs(MAINTENANT);

  it('trois exemples, tous marqués fictifs, tous affichables dans la vue de contrôle', () => {
    expect(exemples.map((m) => m.ref)).toEqual(['OCC-01', 'OCC-02', 'OCC-03']);
    expect(exemples.every((m) => m.fictif === true)).toBe(true);
    expect(machinesDisponibles(exemples, MAINTENANT)).toHaveLength(3);
  });

  it('noms tirés du référentiel produit', () => {
    expect(exemples.map((m) => nomModele(m))).toEqual(['Alphadesk v2', 'Alphashot Micro Pro v2', 'Alphastudio XXL Pro v2']);
  });

  it('aucun prix ni garantie chiffrée dans les données d’exemple', () => {
    const texte = JSON.stringify(exemples);
    expect(texte).not.toMatch(/€|\bEUR\b|\d+\s*(mois|ans?)\b/i);
  });
});

// Parcours B (liste d'alerte) : lib/occasion/__tests__/alertes-*.test.ts.

describe('Pop-in d’engagement', () => {
  it('jamais sur la landing occasion ni sa vue de contrôle ; le hub Studios reste couvert', () => {
    expect(routeCouverte('/fr/studios-photo-automatises/opportunites')).toBe(false);
    expect(routeCouverte('/fr/studios-photo-automatises/opportunites/exemples-fictifs')).toBe(false);
    expect(routeCouverte('/fr/studios-photo-automatises')).toBe(true);
  });
});
