import { createHash } from 'node:crypto';
import type { MachineOccasion } from '@/data/occasion/machines';
import { ANCRE_DESINSCRIPTION } from '../alertes/courriel';
import type { Famille } from '../formulaires';
import { cheminOccasion, LANGUES_OCCASION, type LangueOccasion } from '../langues';
import { nomModele } from '../stock';
import type { Abonne, Qualification } from './abonnes';
import { composerBulletin, type CourrielBulletin } from './courriel';
import { familleMachine } from './familles';
import { machinesAnnoncables, type SelectionArrivage } from './selection';

/**
 * Brouillon d'un bulletin d'arrivage, à faire valider par Sébastien AVANT tout
 * envoi (décision du 12/10/2026). Aucun réseau ici : le plan se calcule sur le
 * registre et sur une liste d'inscrits déjà qualifiés (`qualifierAbonnes`).
 *
 * Destinataires : chaque inscrit confirmé reçoit les machines de SA famille ;
 * un inscrit « toutes les familles » reçoit toutes les machines du bulletin ;
 * un inscrit dont la famille n'a aucune machine dans ce bulletin ne reçoit rien.
 * Les inscrits sont regroupés en lots (langue, famille, machines) : un même
 * contenu par lot, seul le lien de désinscription personnel change.
 *
 * L'EMPREINTE (SHA-256) résume le contenu exact de chaque lot et la liste exacte
 * des destinataires. L'envoi exige cette empreinte : un brouillon modifié, une
 * machine vendue entre-temps ou un nouvel inscrit changent l'empreinte et
 * imposent une nouvelle validation.
 */

/** Lien affiché à la place du lien personnel dans l'aperçu (jamais envoyé). */
export const JETON_APERCU = 'JETON-PERSONNEL-DE-DESINSCRIPTION';

export interface LotBulletin {
  langue: LangueOccasion;
  famille: Famille | '';
  refs: string[];
  /** Adresses, triées. */
  destinataires: string[];
  /** Contenu du lot, avec le lien de désinscription d'aperçu. */
  apercu: CourrielBulletin;
}

export interface PlanBulletin {
  statut: 'pret';
  id: string;
  /** Bulletin de test : destinataires restreints aux adresses désignées ; aucune machine n'est marquée annoncée. */
  test: boolean;
  base: string;
  refs: string[];
  lots: LotBulletin[];
  totalDestinataires: number;
  /** Inscrits confirmés sans machine de leur famille dans ce bulletin : rien ne leur est envoyé. */
  sansMachineConcernee: number;
  exclus: Qualification['exclus'];
  ecartees: SelectionArrivage['ecartees'];
  empreinte: string;
}

export type Preparation =
  | PlanBulletin
  | { statut: 'rien_a_annoncer'; ecartees: SelectionArrivage['ecartees']; refsInconnues: string[] }
  | { statut: 'aucun_destinataire'; id: string; refs: string[]; exclus: Qualification['exclus']; sansMachineConcernee: number };

function sha256(v: string): string {
  return createHash('sha256').update(v).digest('hex');
}

export function lienDesinscriptionApercu(base: string, langue: LangueOccasion): string {
  return `${base.replace(/\/+$/, '')}${cheminOccasion(langue)}#${ANCRE_DESINSCRIPTION}=${JETON_APERCU}`;
}

/** Identifiant stable d'un bulletin : date et machines annoncées. */
export function identifiantBulletin(refs: readonly string[], maintenant: Date): string {
  return `arrivage-${maintenant.toISOString().slice(0, 10)}-${sha256([...refs].sort().join('+')).slice(0, 8)}`;
}

export function machinesPourFamille(machines: readonly MachineOccasion[], famille: Famille | ''): MachineOccasion[] {
  return famille === '' ? [...machines] : machines.filter((m) => familleMachine(m) === famille);
}

export function preparerBulletin(p: {
  source: readonly MachineOccasion[];
  abonnes: Qualification;
  base: string;
  maintenant: Date;
  /** Références retenues ; absent : toutes les machines annonçables. */
  refs?: readonly string[];
  /**
   * Bulletin de TEST : seuls ces inscrits (déjà confirmés et retenus) le
   * reçoivent. Une adresse absente des inscrits n'est jamais ajoutée.
   */
  destinatairesTest?: readonly string[];
}): Preparation {
  const refsInconnues = (p.refs ?? []).filter((r) => !p.source.some((m) => m.ref === r));
  const selection = machinesAnnoncables(p.source, p.maintenant, p.refs);
  if (selection.machines.length === 0) return { statut: 'rien_a_annoncer', ecartees: selection.ecartees, refsInconnues };

  const machines = selection.machines;
  const refs = machines.map((m) => m.ref);
  const id = identifiantBulletin(refs, p.maintenant);

  const parCle = new Map<string, { langue: LangueOccasion; famille: Famille | ''; machines: MachineOccasion[]; destinataires: string[] }>();
  let sansMachineConcernee = 0;
  const test = p.destinatairesTest !== undefined;
  const designes = new Set((p.destinatairesTest ?? []).map((e) => e.trim().toLowerCase()));
  const retenus = (p.abonnes.retenus as Abonne[]).filter((a) => !test || designes.has(a.email));
  for (const a of retenus) {
    const concernees = machinesPourFamille(machines, a.famille);
    if (concernees.length === 0) {
      sansMachineConcernee++;
      continue;
    }
    const cle = `${a.langue}|${a.famille}`;
    const lot = parCle.get(cle) ?? { langue: a.langue, famille: a.famille, machines: concernees, destinataires: [] };
    lot.destinataires.push(a.email);
    parCle.set(cle, lot);
  }

  if (parCle.size === 0) return { statut: 'aucun_destinataire', id, refs, exclus: p.abonnes.exclus, sansMachineConcernee };

  const ordreLangue = (l: LangueOccasion) => LANGUES_OCCASION.indexOf(l);
  const lots: LotBulletin[] = [...parCle.values()]
    .sort((a, b) => ordreLangue(a.langue) - ordreLangue(b.langue) || a.famille.localeCompare(b.famille))
    .map((l) => ({
      langue: l.langue,
      famille: l.famille,
      refs: l.machines.map((m) => m.ref),
      destinataires: [...l.destinataires].sort(),
      apercu: composerBulletin({
        machines: l.machines,
        langue: l.langue,
        famille: l.famille,
        base: p.base,
        lienDesinscription: lienDesinscriptionApercu(p.base, l.langue),
      }),
    }));

  const empreinte = sha256(
    JSON.stringify({ id, test, base: p.base, lots: lots.map((l) => [l.langue, l.famille, l.refs, l.destinataires, l.apercu.objet, l.apercu.texte, l.apercu.html]) }),
  );

  return {
    statut: 'pret',
    id,
    test,
    base: p.base,
    refs,
    lots,
    totalDestinataires: lots.reduce((n, l) => n + l.destinataires.length, 0),
    sansMachineConcernee,
    exclus: p.abonnes.exclus,
    ecartees: selection.ecartees,
    empreinte,
  };
}

const LIBELLE_LANGUE: Record<LangueOccasion, string> = { fr: 'français', en: 'anglais', 'de-ch': 'allemand (Suisse)' };

/**
 * Aperçu lisible du brouillon, pour la validation humaine : machines, lots,
 * nombre de destinataires (sans adresse), exclusions, contenu exact, empreinte.
 */
export function apercuBulletin(prep: Preparation, source: readonly MachineOccasion[]): string {
  if (prep.statut === 'rien_a_annoncer') {
    return [
      'Aucun nouvel arrivage vérifié : aucun bulletin.',
      ...prep.refsInconnues.map((r) => `Référence inconnue du registre : ${r}`),
      ...prep.ecartees.map((e) => `Écartée : ${e.ref} (${e.raison})`),
    ].join('\n');
  }
  const modele = (ref: string) => {
    const m = source.find((x) => x.ref === ref);
    return m ? `${nomModele(m) ?? m.modeleId} (${ref})` : ref;
  };
  const exclus = (e: Qualification['exclus']) =>
    Object.entries(e).map(([raison, n]) => `- ${raison} : ${n}`).join('\n') || '- aucun';
  if (prep.statut === 'aucun_destinataire') {
    return [
      `Bulletin ${prep.id} : aucun destinataire.`,
      `Machines : ${prep.refs.map(modele).join(', ')}`,
      `Inscrits sans machine de leur famille : ${prep.sansMachineConcernee}`,
      'Contacts exclus :',
      exclus(prep.exclus),
    ].join('\n');
  }
  return [
    `# Bulletin d'arrivage ${prep.id} — BROUILLON À VALIDER`,
    ...(prep.test ? ['', 'MODE TEST : destinataires restreints aux adresses désignées ; aucune machine ne sera marquée annoncée.'] : []),
    '',
    `Empreinte : ${prep.empreinte}`,
    `Machines annoncées (${prep.refs.length}) : ${prep.refs.map(modele).join(', ')}`,
    ...prep.ecartees.map((e) => `Machine écartée : ${e.ref} (${e.raison})`),
    `Destinataires : ${prep.totalDestinataires}`,
    `Inscrits confirmés sans machine de leur famille (rien envoyé) : ${prep.sansMachineConcernee}`,
    'Contacts exclus :',
    exclus(prep.exclus),
    '',
    ...prep.lots.flatMap((l, i) => [
      `## Lot ${i + 1} — ${LIBELLE_LANGUE[l.langue]} — ${l.famille || 'toutes les familles'} — ${l.destinataires.length} destinataire(s)`,
      `Machines : ${l.refs.join(', ')}`,
      `Objet : ${l.apercu.objet}`,
      '',
      l.apercu.texte,
      '',
    ]),
  ].join('\n');
}
