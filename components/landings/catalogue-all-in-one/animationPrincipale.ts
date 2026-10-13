import { useSyncExternalStore } from 'react';

/**
 * Une seule animation majeure à la fois (V5.1). Le ruban des studios signale quand il
 * défile ; la vidéo du hero se met alors en pause, même si elle est encore en partie
 * visible. Priorité au ruban : le visiteur qui arrive sur la frise la voit bouger,
 * sans attendre que la vidéo soit sortie du champ.
 */
let rubanActif = false;
const abonnes = new Set<() => void>();

export function signalerRuban(actif: boolean) {
  if (rubanActif === actif) return;
  rubanActif = actif;
  abonnes.forEach((f) => f());
}

function abonner(f: () => void) {
  abonnes.add(f);
  return () => {
    abonnes.delete(f);
  };
}

export function useRubanActif(): boolean {
  return useSyncExternalStore(
    abonner,
    () => rubanActif,
    () => false,
  );
}
