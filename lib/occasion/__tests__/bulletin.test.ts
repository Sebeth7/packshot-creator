/**
 * Bulletin d'arrivage « Nouvelles occasions Orbitvu disponibles » (décision du
 * 12/10/2026) : sélection des machines, destinataires, rendu trilingue,
 * empreinte, envoi verrouillé. Doublures seulement : aucun réseau, aucun e-mail,
 * aucune écriture chez Resend.
 */
import { describe, it, expect, vi } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { MachineOccasion } from '@/data/occasion/machines';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { BULLETIN_ENVOI_AUTORISE, bulletinEnvoyable } from '@/lib/occasion/activation';
import { PROPRIETES } from '@/lib/occasion/alertes/resend';
import { lireJetonDesinscription } from '@/lib/occasion/alertes/jeton';
import { familleMachine, modelesNonClasses } from '@/lib/occasion/bulletin/familles';
import { machinesAnnoncables } from '@/lib/occasion/bulletin/selection';
import { langueDeSource, qualifierAbonnes, type ContactLu } from '@/lib/occasion/bulletin/abonnes';
import { composerBulletin } from '@/lib/occasion/bulletin/courriel';
import { apercuBulletin, JETON_APERCU, preparerBulletin, type PlanBulletin } from '@/lib/occasion/bulletin/plan';
import { envoyerBulletin, TAILLE_TRANCHE, type ClientEnvoiBulletin, type MessageBulletin } from '@/lib/occasion/bulletin/envoi';
import { lireContactsOccasion, type ClientLectureAbonnes } from '@/lib/occasion/bulletin/resend';

const T0 = new Date('2026-11-02T09:00:00Z');
const BASE = 'https://www.packshot-creator.com';
const SECRET = 'secret-de-test-0123456789abcdef-0123456789';
const OUVERTS = { bulletin: true, alertes: true, publication: true };

/** Machine RÉELLE de test, fiche complète (jamais dans le registre). */
function machine(ref: string, modeleId: string, autre: Partial<MachineOccasion> = {}): MachineOccasion {
  return {
    ref,
    modeleId,
    origine: 'showroom',
    origineDetail: 'Showroom PackshotCreator',
    usage: 'Exposition et démonstrations',
    statut: 'disponible',
    statutConfirmeLe: '2026-10-30',
    historique: 'Machine de showroom depuis 2024',
    etat: 'Très bon état',
    verifications: 'Contrôle complet par le SAV',
    logiciel: { licence: 'Licence perpétuelle cessible' },
    garantie: { garant: 'PackshotCreator', duree: '6 mois', pointDeDepart: 'Livraison', exclusions: 'Consommables' },
    photos: [{ src: '/images/occasion/x.avif', alt: 'Unité réelle', credit: 'Photo réelle' }],
    traductions: {
      en: { origineDetail: 'PackshotCreator showroom', usage: 'Display and demonstrations' },
      'de-ch': { origineDetail: 'Showroom PackshotCreator', usage: 'Ausstellung und Vorführungen' },
    },
    ...autre,
  };
}

function contact(email: string, autre: Partial<ContactLu> & { famille?: string; source?: string } = {}): ContactLu {
  const { famille = '', source = '/fr/studios-photo-automatises/opportunites', ...reste } = autre;
  return {
    email,
    unsubscribed: false,
    topic: 'opt_in',
    proprietes: {
      [PROPRIETES.etat]: 'confirme',
      [PROPRIETES.confirmeLe]: '2026-10-20T10:00:00.000Z',
      [PROPRIETES.version]: 'occasion-alertes-v3-2026-10-12',
      [PROPRIETES.source]: source,
      [PROPRIETES.famille]: famille,
    },
    ...reste,
  };
}

const ALPHASHOT = 'Alphashot (Micro, 360, Pro, XL)';
const STUDIO = 'Alphastudio (Compact, XXL)';

describe('Familles des modèles', () => {
  it('chaque modèle du référentiel est classé ; e-comm studio hors des quatre familles', () => {
    expect(modelesNonClasses()).toEqual([]);
    expect(familleMachine({ modeleId: 'alphashot-pro-g2' })).toBe(ALPHASHOT);
    expect(familleMachine({ modeleId: 'alphadesk' })).toBe('Alphatable / Alphadesk');
    expect(familleMachine({ modeleId: 'e-comm-studio-plus' })).toBeNull();
  });
});

describe('Machines annonçables : nouvel arrivage vérifié seulement', () => {
  it('registre réel vide : aucun bulletin', () => {
    expect(MACHINES_OCCASION).toHaveLength(0);
    const p = preparerBulletin({ source: MACHINES_OCCASION, abonnes: qualifierAbonnes([contact('a@atelier.fr')]), base: BASE, maintenant: T0 });
    expect(p.statut).toBe('rien_a_annoncer');
  });

  it('exemples fictifs : jamais annoncés', () => {
    const s = machinesAnnoncables(exemplesFictifs(T0), T0);
    expect(s.machines).toEqual([]);
    expect(s.ecartees.map((e) => e.raison)).toEqual(['fictive', 'fictive', 'fictive']);
  });

  it('réservée, vendue, retirée, confirmation ancienne, modèle inconnu, fiche incomplète, déjà annoncée : écartées', () => {
    const s = machinesAnnoncables(
      [
        machine('R', 'alphadesk', { statut: 'reservee' }),
        machine('V', 'alphadesk', { statut: 'vendue' }),
        machine('W', 'alphadesk', { statut: 'retiree' }),
        machine('A', 'alphadesk', { statutConfirmeLe: '2026-08-01' }),
        machine('M', 'modele-inconnu'),
        machine('I', 'alphadesk', { traductions: { en: { origineDetail: 'x', usage: 'y' } } }),
        machine('D', 'alphadesk', { annonce: { bulletin: 'arrivage-2026-10-25-abcd1234', envoyeLe: '2026-10-25' } }),
        machine('OK', 'alphadesk'),
      ],
      T0,
    );
    expect(s.machines.map((m) => m.ref)).toEqual(['OK']);
    expect(Object.fromEntries(s.ecartees.map((e) => [e.ref, e.raison]))).toEqual({
      R: 'non_disponible',
      V: 'non_disponible',
      W: 'non_disponible',
      A: 'confirmation_ancienne',
      M: 'modele_inconnu',
      I: 'fiche_incomplete',
      D: 'deja_annoncee',
    });
  });

  it('une correction de fiche n’est pas un nouvel arrivage : une machine annoncée le reste', () => {
    const corrigee = machine('D', 'alphadesk', { usage: 'Texte corrigé', annonce: { bulletin: 'arrivage-x', envoyeLe: '2026-10-25' } });
    expect(machinesAnnoncables([corrigee], T0).machines).toEqual([]);
  });

  it('références retenues : les autres sont « non retenues », une référence inconnue est signalée', () => {
    const src = [machine('A', 'alphadesk'), machine('B', 'alphashot-pro-g2')];
    expect(machinesAnnoncables(src, T0, ['B']).ecartees).toEqual([{ ref: 'A', raison: 'non_retenue' }]);
    const p = preparerBulletin({ source: src, abonnes: qualifierAbonnes([]), base: BASE, maintenant: T0, refs: ['Z'] });
    expect(p).toMatchObject({ statut: 'rien_a_annoncer', refsInconnues: ['Z'] });
  });
});

describe('Destinataires : inscrits confirmés, non désinscrits, adresses réelles', () => {
  it('exclusions comptées par raison, sans adresse', () => {
    const q = qualifierAbonnes([
      contact('ok@atelier.fr'),
      contact('OK@Atelier.fr'),
      contact('global@atelier.fr', { unsubscribed: true }),
      contact('topic@atelier.fr', { topic: 'opt_out' }),
      contact('jamais@atelier.fr', { topic: null }),
      { ...contact('attente@atelier.fr'), proprietes: { ...contact('x@y.fr').proprietes, [PROPRIETES.etat]: 'desinscrit' } },
      { ...contact('version@atelier.fr'), proprietes: { ...contact('x@y.fr').proprietes, [PROPRIETES.version]: 'autre' } },
      contact('famille@atelier.fr', { famille: 'Inconnue' }),
      contact('test@example.com'),
      contact('test@exemple.fr'),
      contact('qa@boutique.test'),
      contact('pas-une-adresse'),
    ]);
    expect(q.retenus).toEqual([{ email: 'ok@atelier.fr', langue: 'fr', famille: '' }]);
    expect(q.exclus).toEqual({
      doublon: 1,
      desinscrit_global: 1,
      hors_topic: 2,
      non_confirme: 1,
      consentement_inconnu: 1,
      famille_inconnue: 1,
      adresse_de_test: 3,
      adresse_invalide: 1,
    });
  });

  it('langue d’inscription lue dans la page d’origine ; français à défaut', () => {
    expect(langueDeSource('/en/studios-photo-automatises/opportunites')).toBe('en');
    expect(langueDeSource('/de-ch/studios-photo-automatises/opportunites')).toBe('de-ch');
    expect(langueDeSource('/xx/autre')).toBe('fr');
    expect(langueDeSource(undefined)).toBe('fr');
  });
});

describe('Brouillon : familles, lots par langue, empreinte', () => {
  const source = [machine('OCC-2026-01', 'alphashot-pro-g2'), machine('OCC-2026-02', 'alphadesk')];
  const abonnes = qualifierAbonnes([
    contact('toutes@atelier.fr'),
    contact('alphashot@atelier.fr', { famille: ALPHASHOT }),
    contact('studio@atelier.fr', { famille: STUDIO }),
    contact('en@shop.co.uk', { source: '/en/studios-photo-automatises/opportunites', famille: ALPHASHOT }),
    contact('ch@laden.ch', { source: '/de-ch/studios-photo-automatises/opportunites' }),
  ]);
  const prep = preparerBulletin({ source, abonnes, base: BASE, maintenant: T0 }) as PlanBulletin;

  it('une ou plusieurs machines en un seul bulletin ; chaque inscrit reçoit les machines de sa famille', () => {
    expect(prep.statut).toBe('pret');
    expect(prep.refs).toEqual(['OCC-2026-01', 'OCC-2026-02']);
    const lots = prep.lots.map((l) => [l.langue, l.famille, l.refs, l.destinataires]);
    expect(lots).toEqual([
      ['fr', '', ['OCC-2026-01', 'OCC-2026-02'], ['toutes@atelier.fr']],
      ['fr', ALPHASHOT, ['OCC-2026-01'], ['alphashot@atelier.fr']],
      ['en', ALPHASHOT, ['OCC-2026-01'], ['en@shop.co.uk']],
      ['de-ch', '', ['OCC-2026-01', 'OCC-2026-02'], ['ch@laden.ch']],
    ]);
    expect(prep.sansMachineConcernee).toBe(1); // famille Alphastudio : rien à lui envoyer
    expect(prep.totalDestinataires).toBe(4);
  });

  it('famille sans machine pour tous les inscrits : aucun destinataire', () => {
    const p = preparerBulletin({ source: [machine('X', 'alphadesk')], abonnes: qualifierAbonnes([contact('s@atelier.fr', { famille: STUDIO })]), base: BASE, maintenant: T0 });
    expect(p).toMatchObject({ statut: 'aucun_destinataire', sansMachineConcernee: 1 });
  });

  it('empreinte stable ; un nouvel inscrit ou une fiche modifiée la changent', () => {
    const encore = preparerBulletin({ source, abonnes, base: BASE, maintenant: T0 }) as PlanBulletin;
    expect(encore.empreinte).toBe(prep.empreinte);
    const plus = preparerBulletin({ source, abonnes: qualifierAbonnes([...abonnes.retenus.map((a) => contact(a.email)), contact('neuf@atelier.fr')]), base: BASE, maintenant: T0 }) as PlanBulletin;
    expect(plus.empreinte).not.toBe(prep.empreinte);
    const modifiee = preparerBulletin({ source: [machine('OCC-2026-01', 'alphashot-pro-g2', { usage: 'Autre usage' }), source[1]], abonnes, base: BASE, maintenant: T0 }) as PlanBulletin;
    expect(modifiee.empreinte).not.toBe(prep.empreinte);
  });

  it('aperçu de validation : empreinte, machines, nombres ; aucune adresse', () => {
    const a = apercuBulletin(prep, source);
    expect(a).toContain(prep.empreinte);
    expect(a).toContain('Alphashot Pro G2'.split(' ')[0]);
    expect(a).toContain('Destinataires : 4');
    expect(a).not.toMatch(/@atelier\.fr|@shop\.co\.uk|@laden\.ch/);
    expect(a).toContain(JETON_APERCU);
  });
});

describe('Contenu trilingue : registre seulement, aucun prix, désinscription', () => {
  const m = [machine('OCC-2026-01', 'alphashot-pro-g2'), machine('OCC-2026-02', 'alphadesk')];
  const lien = (l: string) => `${BASE}/${l}/studios-photo-automatises/opportunites#desinscrire-alerte=abc`;

  it('objet et titre « Nouvelles occasions Orbitvu disponibles » dans chaque langue, une ou plusieurs machines', () => {
    expect(composerBulletin({ machines: [m[0]], langue: 'fr', famille: '', base: BASE, lienDesinscription: lien('fr') }).objet).toMatch(
      /^Nouvelles occasions Orbitvu disponibles : Alphashot/,
    );
    expect(composerBulletin({ machines: m, langue: 'fr', famille: '', base: BASE, lienDesinscription: lien('fr') }).objet).toBe(
      'Nouvelles occasions Orbitvu disponibles : 2 machines',
    );
    expect(composerBulletin({ machines: m, langue: 'en', famille: '', base: BASE, lienDesinscription: lien('en') }).objet).toBe(
      'New pre-owned Orbitvu machines available: 2 machines',
    );
    expect(composerBulletin({ machines: m, langue: 'de-ch', famille: '', base: BASE, lienDesinscription: lien('de-ch') }).objet).toBe(
      'Neue Orbitvu-Occasionen verfügbar: 2 Maschinen',
    );
  });

  it('EN et DE-CH : textes traduits du registre, jamais le français ; liens vers la page de la langue', () => {
    const en = composerBulletin({ machines: m, langue: 'en', famille: '', base: BASE, lienDesinscription: lien('en') });
    expect(en.texte).toContain('PackshotCreator showroom');
    expect(en.texte).toContain('Display and demonstrations');
    expect(en.texte).not.toContain('Exposition et démonstrations');
    expect(en.texte).toContain(`${BASE}/en/studios-photo-automatises/opportunites#machines`);
    const de = composerBulletin({ machines: m, langue: 'de-ch', famille: '', base: BASE, lienDesinscription: lien('de-ch') });
    expect(de.texte).toContain('Ausstellung und Vorführungen');
    expect(de.texte).not.toContain('ß');
    expect(de.texte).toContain('alle Familien');
  });

  it('aucun prix, aucune remise, aucun délai ; disponibilité datée par le registre', () => {
    for (const langue of ['fr', 'en', 'de-ch'] as const) {
      const c = composerBulletin({ machines: m, langue, famille: '', base: BASE, lienDesinscription: lien(langue) });
      expect(`${c.objet} ${c.texte} ${c.html}`).not.toMatch(/€|CHF|EUR|prix|price|Preis|remise|discount|Rabatt|promo|livraison sous|delivery within|Lieferung innert/i);
    }
    expect(composerBulletin({ machines: [m[0]], langue: 'fr', famille: '', base: BASE, lienDesinscription: lien('fr') }).texte).toContain(
      'Disponibilité confirmée le 30 octobre 2026, sous réserve de vente entre-temps.',
    );
  });

  it('désinscription : lien dans le texte et le HTML, en-tête List-Unsubscribe ; HTML échappé', () => {
    const c = composerBulletin({ machines: [machine('<b>X</b>', 'alphadesk')], langue: 'fr', famille: '', base: BASE, lienDesinscription: lien('fr') });
    expect(c.texte).toContain(lien('fr'));
    expect(c.html).toContain(lien('fr'));
    expect(c.entetes['List-Unsubscribe']).toBe(`<${lien('fr')}>`);
    expect(c.html).not.toContain('<b>X</b>');
    expect(c.texte).toContain('distincte de la newsletter');
  });

  it('bulletin sans machine : refusé', () => {
    expect(() => composerBulletin({ machines: [], langue: 'fr', famille: '', base: BASE, lienDesinscription: lien('fr') })).toThrow();
  });
});

function fauxEnvoi(panneTranche?: number) {
  const appels: { messages: MessageBulletin[]; cle: string }[] = [];
  let n = 0;
  const client: ClientEnvoiBulletin = {
    batch: {
      send: vi.fn(async (messages: MessageBulletin[], o: { idempotencyKey: string }) => {
        appels.push({ messages, cle: o.idempotencyKey });
        if (panneTranche !== undefined && appels.length === panneTranche) return { data: null, error: { name: 'rate_limit_exceeded', statusCode: 429 } };
        return { data: { data: messages.map(() => ({ id: `msg_${++n}` })) }, error: null };
      }),
    },
  };
  return { client, appels };
}

describe('Envoi : verrouillé, validé, désinscription personnelle', () => {
  const source = [machine('OCC-2026-01', 'alphashot-pro-g2')];
  const plan = (n = 3) =>
    preparerBulletin({
      source,
      abonnes: qualifierAbonnes(Array.from({ length: n }, (_, i) => contact(`client${i}@atelier.fr`))),
      base: BASE,
      maintenant: T0,
    }) as PlanBulletin;
  const options = (p: PlanBulletin, client: ClientEnvoiBulletin, autre = {}) => ({
    client,
    expediteur: 'occasions@exemple.test',
    secret: SECRET,
    source,
    autorisation: { empreinte: p.empreinte, valideePar: 'Sébastien Jourdan' },
    maintenant: T0,
    verrous: OUVERTS,
    ...autre,
  });

  it('verrous du code fermés : aucune campagne possible, aucun appel', async () => {
    expect(BULLETIN_ENVOI_AUTORISE).toBe(false);
    expect(bulletinEnvoyable()).toBe(false);
    const { client } = fauxEnvoi();
    const p = plan();
    const sansVerrous = { ...options(p, client), verrous: undefined };
    expect(await envoyerBulletin(p, sansVerrous)).toEqual({ statut: 'refuse', raison: 'verrou_ferme' });
    for (const v of [
      { bulletin: true, alertes: false, publication: true },
      { bulletin: true, alertes: true, publication: false },
      { bulletin: false, alertes: true, publication: true },
    ]) {
      expect((await envoyerBulletin(p, options(p, client, { verrous: v }))).statut).toBe('refuse');
    }
    expect(client.batch.send).not.toHaveBeenCalled();
  });

  it('empreinte différente, validation anonyme, secret absent : refus sans appel', async () => {
    const { client } = fauxEnvoi();
    const p = plan();
    expect(await envoyerBulletin(p, options(p, client, { autorisation: { empreinte: 'autre', valideePar: 'Sébastien Jourdan' } }))).toMatchObject({ raison: 'empreinte_differente' });
    expect(await envoyerBulletin(p, options(p, client, { autorisation: { empreinte: p.empreinte, valideePar: ' ' } }))).toMatchObject({ raison: 'validation_absente' });
    expect(await envoyerBulletin(p, options(p, client, { secret: 'court' }))).toMatchObject({ raison: 'secret_absent' });
    expect(client.batch.send).not.toHaveBeenCalled();
  });

  it('machine vendue ou fiche modifiée depuis la validation : refus', async () => {
    const { client } = fauxEnvoi();
    const p = plan();
    const vendue = [machine('OCC-2026-01', 'alphashot-pro-g2', { statut: 'vendue' })];
    expect(await envoyerBulletin(p, options(p, client, { source: vendue }))).toMatchObject({ raison: 'machine_plus_annoncable' });
    const modifiee = [machine('OCC-2026-01', 'alphashot-pro-g2', { usage: 'Autre usage' })];
    expect(await envoyerBulletin(p, options(p, client, { source: modifiee }))).toMatchObject({ raison: 'empreinte_differente' });
    expect(client.batch.send).not.toHaveBeenCalled();
  });

  it('envoi validé : un message par inscrit, lien de désinscription personnel et valide, tranches de 100 idempotentes', async () => {
    const { client, appels } = fauxEnvoi();
    const p = plan(205);
    const r = await envoyerBulletin(p, options(p, client));
    expect(r).toMatchObject({ statut: 'envoye', envoyes: 205, aMarquer: ['OCC-2026-01'] });
    expect(appels.map((a) => a.messages.length)).toEqual([TAILLE_TRANCHE, TAILLE_TRANCHE, 5]);
    expect(new Set(appels.map((a) => a.cle)).size).toBe(3);
    const premier = appels[0].messages[0];
    expect(premier.to).toHaveLength(1);
    const jeton = premier.text.match(/#desinscrire-alerte=([\w-]+)/)?.[1] ?? '';
    expect(lireJetonDesinscription(jeton, SECRET)).toEqual({ ok: true, donnees: { type: 'desinscription', email: premier.to[0] } });
    expect(premier.headers['List-Unsubscribe']).toContain(jeton);
    expect(premier.text).not.toContain(JETON_APERCU);
    expect(premier.tags).toContainEqual({ name: 'programme', value: 'occasion-arrivage' });
  });

  it('panne d’une tranche : envoi interrompu, rien à marquer ; relance avec les mêmes clés d’idempotence', async () => {
    const { client, appels } = fauxEnvoi(2);
    const p = plan(150);
    const r = await envoyerBulletin(p, options(p, client));
    expect(r).toMatchObject({ statut: 'interrompu', envoyes: 100, echec: { lot: 1, tranche: 2, code: 'rate_limit_exceeded' }, aMarquer: [] });
    const relance = fauxEnvoi();
    await envoyerBulletin(p, options(p, relance.client));
    expect(relance.appels.map((a) => a.cle)).toEqual(appels.map((a) => a.cle));
  });
});

describe('Bulletin de test : inscrits désignés seulement, avant publication', () => {
  const source = [machine('OCC-2026-01', 'alphashot-pro-g2')];
  const abonnes = qualifierAbonnes([contact('reel@atelier.fr'), contact('test.laurent@atelier.fr'), contact('test.seb@atelier.fr')]);
  const prep = preparerBulletin({
    source,
    abonnes,
    base: BASE,
    maintenant: T0,
    destinatairesTest: ['Test.Laurent@atelier.fr', 'test.seb@atelier.fr', 'inconnu@atelier.fr'],
  }) as PlanBulletin;

  it('destinataires restreints aux inscrits désignés ; une adresse non inscrite n’est jamais ajoutée', () => {
    expect(prep.test).toBe(true);
    expect(prep.lots.flatMap((l) => l.destinataires)).toEqual(['test.laurent@atelier.fr', 'test.seb@atelier.fr']);
    expect(apercuBulletin(prep, source)).toContain('MODE TEST');
    const reel = preparerBulletin({ source, abonnes, base: BASE, maintenant: T0 }) as PlanBulletin;
    expect(reel.test).toBe(false);
    expect(reel.empreinte).not.toBe(prep.empreinte);
  });

  it('publication non exigée pour le test ; liste en service et verrou d’envoi exigés ; aucune machine marquée', async () => {
    const { client } = fauxEnvoi();
    const base = {
      client,
      expediteur: 'occasions@exemple.test',
      secret: SECRET,
      source,
      autorisation: { empreinte: prep.empreinte, valideePar: 'Sébastien Jourdan' },
      maintenant: T0,
    };
    expect(await envoyerBulletin(prep, { ...base, verrous: { bulletin: true, alertes: false, publication: false } })).toMatchObject({ raison: 'verrou_ferme' });
    expect(await envoyerBulletin(prep, { ...base, verrous: { bulletin: false, alertes: true, publication: false } })).toMatchObject({ raison: 'verrou_ferme' });
    expect(client.batch.send).not.toHaveBeenCalled();
    const r = await envoyerBulletin(prep, { ...base, verrous: { bulletin: true, alertes: true, publication: false } });
    expect(r).toMatchObject({ statut: 'envoye', envoyes: 2, aMarquer: [] });
  });

  it('bulletin réel : la publication reste exigée', async () => {
    const { client } = fauxEnvoi();
    const reel = preparerBulletin({ source, abonnes, base: BASE, maintenant: T0 }) as PlanBulletin;
    const r = await envoyerBulletin(reel, {
      client,
      expediteur: 'occasions@exemple.test',
      secret: SECRET,
      source,
      autorisation: { empreinte: reel.empreinte, valideePar: 'Sébastien Jourdan' },
      maintenant: T0,
      verrous: { bulletin: true, alertes: true, publication: false },
    });
    expect(r).toMatchObject({ raison: 'verrou_ferme' });
  });
});

describe('Lecture des inscrits chez Resend (doublure, lecture seule)', () => {
  it('pagination, propriétés, topic Occasion ; aucune écriture', async () => {
    const pages = [
      { data: [{ id: 'c1', email: 'a@atelier.fr', unsubscribed: false }], has_more: true },
      { data: [{ id: 'c2', email: 'b@atelier.fr', unsubscribed: false }], has_more: false },
    ];
    const client: ClientLectureAbonnes = {
      contacts: {
        list: vi.fn(async (o: { after?: string }) => ({ data: o.after === 'c1' ? pages[1] : pages[0], error: null })),
        get: vi.fn(async (o: { email: string }) => ({
          data: { id: o.email, unsubscribed: o.email.startsWith('b'), properties: { [PROPRIETES.etat]: { type: 'string', value: 'confirme' } } },
          error: null,
        })),
        topics: {
          list: vi.fn(async () => ({ data: { data: [{ id: 'top_occasion', subscription: 'opt_in' as const }, { id: 'top_news', subscription: 'opt_out' as const }], has_more: false }, error: null })),
        },
      },
    };
    const contacts = await lireContactsOccasion(client, { segmentId: 'seg', topicId: 'top_occasion', pauseMs: 0 });
    expect(contacts).toEqual([
      { email: 'a@atelier.fr', unsubscribed: false, topic: 'opt_in', proprietes: { [PROPRIETES.etat]: 'confirme' } },
      { email: 'b@atelier.fr', unsubscribed: true, topic: 'opt_in', proprietes: { [PROPRIETES.etat]: 'confirme' } },
    ]);
    expect(client.contacts.list).toHaveBeenCalledTimes(2);
  });

  it('erreur de lecture : arrêt, aucun brouillon partiel', async () => {
    const client: ClientLectureAbonnes = {
      contacts: {
        list: async () => ({ data: null, error: { name: 'restricted_api_key' } }),
        get: async () => ({ data: null, error: null }),
        topics: { list: async () => ({ data: null, error: null }) },
      },
    };
    await expect(lireContactsOccasion(client, { segmentId: 's', topicId: 't', pauseMs: 0 })).rejects.toThrow('contacts.list');
  });
});

describe('Aucun circuit automatique', () => {
  function fichiers(dossier: string): string[] {
    return readdirSync(dossier).flatMap((f) => {
      const p = join(dossier, f);
      return statSync(p).isDirectory() ? fichiers(p) : [p];
    });
  }

  it('aucune route, page ou tâche planifiée n’importe le bulletin ; aucun cron Vercel', () => {
    const racine = process.cwd();
    const app = fichiers(join(racine, 'app')).filter((f) => /\.(ts|tsx)$/.test(f));
    for (const f of app) expect(readFileSync(f, 'utf8')).not.toMatch(/occasion\/bulletin/);
    let vercel = '';
    try {
      vercel = readFileSync(join(racine, 'vercel.json'), 'utf8');
    } catch {
      vercel = '';
    }
    expect(vercel).not.toMatch(/"crons"/);
  });
});
