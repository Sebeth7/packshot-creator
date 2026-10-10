import type { MachineOccasion } from '@/data/occasion/machines';
import { nomModele } from '@/lib/occasion/stock';
import type { CarteMachine } from './OccasionOrbitvu';

/** Données sérialisables d'une carte, depuis une machine affichable (`machinesDisponibles`). */
export function versCartes(machines: readonly MachineOccasion[]): CarteMachine[] {
  return machines.map((m) => ({
    ref: m.ref,
    nom: nomModele(m) ?? m.modeleId,
    origine: m.origine,
    origineDetail: m.origineDetail,
    usage: m.usage,
    photo: m.photos[0],
    fictif: m.fictif === true,
  }));
}
