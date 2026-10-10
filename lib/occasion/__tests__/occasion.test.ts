import { describe, expect, it } from 'vitest';
import { MACHINES_OCCASION, type MachineOccasion } from '@/data/occasion/machines';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { ficheTechnique } from '@/data/produits/fiches-techniques';
import {
  COLLECTE_REELLE_AUTORISEE,
  PUBLICATION_AUTORISEE,
  exemplesFictifsServis,
  liensOccasionServis,
  pageOccasionServie,
} from '@/lib/occasion/activation';
import { FRAICHEUR_MAX_JOURS, elementsManquants, machinesDisponibles, nomModele } from '@/lib/occasion/stock';
import {
  VERSION_TEXTE_OPTIN,
  desinscrire,
  preuveConsentement,
  validerAlerte,
  validerDemande,
  type SaisieDemande,
} from '@/lib/occasion/formulaires';
import { routeCouverte } from '@/lib/engagement/regles';

const MAINTENANT = new Date('2026-10-10T12:00:00Z');

describe('Verrous de publication (GO_PUBLICATION = NO, GO_FORMULAIRES_REELS = NO, 10/10/2026)', () => {
  it('page et liens fermés en production, ouverts en Preview et en local', () => {
    expect(PUBLICATION_AUTORISEE).toBe(false);
    expect(pageOccasionServie({ VERCEL_ENV: 'production' })).toBe(false);
    expect(liensOccasionServis({ VERCEL_ENV: 'production' })).toBe(false);
    expect(pageOccasionServie({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(liensOccasionServis({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(pageOccasionServie({})).toBe(true);
  });

  it('exemples fictifs jamais servis en production', () => {
    expect(exemplesFictifsServis({ VERCEL_ENV: 'production' })).toBe(false);
    expect(exemplesFictifsServis({ VERCEL_ENV: 'preview' })).toBe(true);
  });

  it('aucune collecte réelle', () => {
    expect(COLLECTE_REELLE_AUTORISEE).toBe(false);
  });

  it('pas de publication avec des formulaires simulés', () => {
    if (PUBLICATION_AUTORISEE) expect(COLLECTE_REELLE_AUTORISEE).toBe(true);
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

describe('Parcours B — liste d’attente', () => {
  it('e-mail obligatoire et opt-in explicite ; prénom et famille facultatifs', () => {
    expect(validerAlerte({ email: 'a@b.fr', optin: true })).toEqual({});
    expect(Object.keys(validerAlerte({ email: '', optin: false }))).toEqual(['email', 'optin']);
    expect(validerAlerte({ email: 'a@b.fr', optin: true, famille: 'Inconnue' })).toHaveProperty('famille');
  });

  it('preuve de consentement construite sans stockage, désinscription datée', () => {
    const p = preuveConsentement({ email: ' Contact@Exemple.FR ', optin: true }, '/fr/studios-photo-automatises/opportunites', MAINTENANT);
    expect(p).toEqual({
      email: 'contact@exemple.fr',
      horodatage: '2026-10-10T12:00:00.000Z',
      versionTexte: VERSION_TEXTE_OPTIN,
      pageSource: '/fr/studios-photo-automatises/opportunites',
      etat: 'en_attente',
    });
    expect(desinscrire(p, MAINTENANT)).toMatchObject({ etat: 'desinscrit', dateDesinscription: '2026-10-10T12:00:00.000Z' });
  });
});

describe('Parcours A — demande sur une machine', () => {
  const saisie: SaisieDemande = {
    machine: 'OCC-02', prenom: 'Camille', nom: 'Martin', societe: 'Exemple SA',
    email: 'c.martin@exemple.fr', telephone: '0102030405', rappel: true, rgpd: true,
  };

  it('valide seulement une référence disponible', () => {
    expect(validerDemande(saisie, ['OCC-01', 'OCC-02'])).toEqual({});
    expect(validerDemande(saisie, [])).toHaveProperty('machine');
  });

  it('champs obligatoires et consentement', () => {
    const e = validerDemande({ ...saisie, prenom: '', email: 'x', rgpd: false }, ['OCC-02']);
    expect(Object.keys(e).sort()).toEqual(['email', 'prenom', 'rgpd']);
  });
});

describe('Pop-in d’engagement', () => {
  it('jamais sur la landing occasion ni sa vue de contrôle ; le hub Studios reste couvert', () => {
    expect(routeCouverte('/fr/studios-photo-automatises/opportunites')).toBe(false);
    expect(routeCouverte('/fr/studios-photo-automatises/opportunites/exemples-fictifs')).toBe(false);
    expect(routeCouverte('/fr/studios-photo-automatises')).toBe(true);
  });
});
