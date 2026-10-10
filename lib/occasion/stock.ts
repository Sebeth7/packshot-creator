import { ficheTechnique } from '@/data/produits/fiches-techniques';
import type { MachineOccasion, OrigineOccasion } from '@/data/occasion/machines';

/**
 * Fraîcheur maximale de la confirmation d'une machine « disponible », en jours.
 * VALEUR PROVISOIRE : le mini-brief V4.1 laisse « [N] jours » à arbitrer.
 * Au-delà, la machine n'est plus affichée, sans erreur de build.
 */
export const FRAICHEUR_MAX_JOURS = 30;

const JOUR_MS = 86_400_000;

/**
 * Libellés des origines (V4.1) : pastille du hero, étiquette de carte, option du
 * formulaire de demande (« Alphadesk v2 — ancien équipement de showroom (OCC-01) »).
 */
export const ORIGINES: Readonly<Record<OrigineOccasion, { libelle: string; carte: string; option: string }>> = {
  showroom: { libelle: 'Showroom', carte: 'Ancien équipement de showroom', option: 'ancien équipement de showroom' },
  demonstration: { libelle: 'Démonstration', carte: 'Machine de démonstration', option: 'démonstration' },
  salon: { libelle: 'Salon', carte: 'Retour de salon', option: 'retour de salon' },
  location: { libelle: 'Retour de location', carte: 'Retour de location', option: 'retour de location' },
  reprise: { libelle: 'Reprise', carte: 'Reprise', option: 'reprise' },
  renouvellement: { libelle: 'Renouvellement', carte: 'Renouvellement de parc', option: 'renouvellement de parc' },
};

/** Nom commercial du modèle, tiré du référentiel produit (D45). */
export function nomModele(machine: Pick<MachineOccasion, 'modeleId'>): string | undefined {
  return ficheTechnique(machine.modeleId)?.nomPsc;
}

/** Confirmation du statut datée de `FRAICHEUR_MAX_JOURS` jours au plus (et pas dans le futur). */
export function confirmationRecente(statutConfirmeLe: string, maintenant: Date): boolean {
  const t = Date.parse(`${statutConfirmeLe}T00:00:00Z`);
  if (Number.isNaN(t)) return false;
  const age = maintenant.getTime() - t;
  return age >= -JOUR_MS && age <= FRAICHEUR_MAX_JOURS * JOUR_MS;
}

/**
 * Machines affichées : statut « disponible », confirmation récente, modèle connu.
 * L'état de la page (avec ou sans machine) se calcule ici, côté serveur, depuis la
 * source de stock ; jamais depuis l'adresse ni un fragment (#alertes).
 */
export function machinesDisponibles(source: readonly MachineOccasion[], maintenant: Date = new Date()): MachineOccasion[] {
  return source.filter(
    (m) => m.statut === 'disponible' && confirmationRecente(m.statutConfirmeLe, maintenant) && nomModele(m) !== undefined,
  );
}

const rempli = (v: string | undefined) => typeof v === 'string' && v.trim() !== '';

/**
 * Éléments manquants d'une fiche, pour une machine réelle « disponible » : les
 * trois promesses du hero (origine et historique, état et vérifications,
 * garantie écrite) et les photos de l'unité. Liste vide : fiche complète.
 */
export function elementsManquants(m: MachineOccasion): string[] {
  const manquants: string[] = [];
  if (!rempli(m.ref)) manquants.push('ref');
  if (!nomModele(m)) manquants.push('modeleId');
  if (!rempli(m.origineDetail)) manquants.push('origineDetail');
  if (!rempli(m.usage)) manquants.push('usage');
  if (!rempli(m.historique)) manquants.push('historique');
  if (!rempli(m.etat)) manquants.push('etat');
  if (!rempli(m.verifications)) manquants.push('verifications');
  if (!rempli(m.logiciel?.licence)) manquants.push('logiciel.licence');
  for (const champ of ['garant', 'duree', 'pointDeDepart', 'exclusions'] as const) {
    if (!rempli(m.garantie?.[champ])) manquants.push(`garantie.${champ}`);
  }
  if (!m.photos?.length || m.photos.some((p) => !rempli(p.src) || !rempli(p.alt))) manquants.push('photos');
  if (Number.isNaN(Date.parse(m.statutConfirmeLe))) manquants.push('statutConfirmeLe');
  return manquants;
}
