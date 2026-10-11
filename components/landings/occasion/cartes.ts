import type { MachineOccasion } from '@/data/occasion/machines';
import type { LangueOccasion } from '@/lib/occasion/langues';
import { nomModele } from '@/lib/occasion/stock';
import type { CarteMachine } from './OccasionOrbitvu';

/**
 * Données sérialisables d'une carte, depuis une machine affichable
 * (`machinesDisponibles`), dans la langue de la page : textes de `traductions`
 * en EN et DE-CH (exigés pour une machine réelle, `elementsManquants`).
 */
export function versCartes(machines: readonly MachineOccasion[], langue: LangueOccasion = 'fr'): CarteMachine[] {
  return machines.map((m) => {
    const t = langue === 'fr' ? undefined : m.traductions?.[langue];
    return {
      ref: m.ref,
      nom: nomModele(m) ?? m.modeleId,
      origine: m.origine,
      origineDetail: t?.origineDetail ?? m.origineDetail,
      usage: t?.usage ?? m.usage,
      photo: t?.credit ? { ...m.photos[0], credit: t.credit } : m.photos[0],
      fictif: m.fictif === true,
    };
  });
}
