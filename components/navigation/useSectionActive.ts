'use client';

/**
 * Scroll-spy mutualisé des pages longues (règle D44).
 *
 * Une seule instance de ce hook calcule, pour une page donnée, la section active, la
 * visibilité du repère collant et la hauteur de l'en-tête. La barre horizontale
 * (`SommaireCollant`) et le sommaire latéral (`SommaireLateral`) le lisent par le
 * contexte `SectionActiveContext` : les deux navigations restent synchronisées sans se
 * disputer un second scroll-spy (cause du décalage P2 relevé dans R-UX-LONG §3.1, où la
 * barre et le sommaire latéral calculaient la section active selon deux règles
 * différentes). La logique reprise ici est celle, éprouvée, de la barre : dernière section
 * dont le haut a franchi le bas de la barre.
 *
 * - `enabled = false` : le hook ne pose aucun écouteur et renvoie un état inerte. Utilisé
 *   quand la barre est déjà pilotée par un contexte (mode contrôlé), pour éviter justement
 *   un deuxième scroll-spy.
 * - décalage des ancres : chaque section ciblée reçoit un `scroll-margin-top` égal à
 *   en-tête + barre + 16 px (desktop seulement), recalculé au redimensionnement. Les pages
 *   n'ont qu'à porter les `id`.
 */
import { useEffect, useState } from 'react';

export type EtatSection = {
  /** `id` de la section active, ou `null` tant qu'aucune n'a été franchie. */
  actif: string | null;
  /** Le repère collant doit-il être affiché ? */
  visible: boolean;
  /** Hauteur mesurée de l'en-tête collant (px). */
  haut: number;
};

export const HAUTEUR_BARRE = 48;
export const MARGE = 16;
const DESKTOP = '(min-width: 1024px)';

const INERTE: EtatSection = { actif: null, visible: false, haut: 64 };

export function useSectionActive(
  ids: string[],
  opts: { ancreSommaire?: string; ancreFin?: string } = {},
  enabled = true,
): EtatSection {
  const { ancreSommaire, ancreFin } = opts;
  const [actif, setActif] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [haut, setHaut] = useState(64);
  const cle = ids.join('|');

  useEffect(() => {
    if (!enabled || ids.length === 0) return;
    let image = 0;
    const desktop = window.matchMedia(DESKTOP);

    const decaler = (h: number) => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) el.style.scrollMarginTop = desktop.matches ? `${h + HAUTEUR_BARRE + MARGE}px` : '';
      }
    };

    const mesurer = () => {
      image = 0;
      const entete = document.querySelector<HTMLElement>('header.sticky');
      const h = entete ? entete.offsetHeight : 64;
      const bas = h + HAUTEUR_BARRE;
      const sommaire = ancreSommaire ? document.getElementById(ancreSommaire) : null;
      const premiere = document.getElementById(ids[0]);
      const derniere = document.getElementById(ids[ids.length - 1]);
      const fin = ancreFin ? document.getElementById(ancreFin) : null;

      const debutPasse = sommaire
        ? sommaire.getBoundingClientRect().bottom < h
        : premiere
          ? premiere.getBoundingClientRect().top <= bas
          : false;
      const avantFin = fin
        ? fin.getBoundingClientRect().top > bas
        : derniere
          ? derniere.getBoundingClientRect().bottom > bas
          : true;

      let courant: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= bas + MARGE) courant = id;
      }
      setHaut(h);
      setVisible(debutPasse && avantFin);
      setActif(courant);
    };

    const planifier = () => {
      if (!image) image = requestAnimationFrame(mesurer);
    };
    const redimensionner = () => {
      const entete = document.querySelector<HTMLElement>('header.sticky');
      decaler(entete ? entete.offsetHeight : 64);
      planifier();
    };

    redimensionner();
    mesurer();
    window.addEventListener('scroll', planifier, { passive: true });
    window.addEventListener('resize', redimensionner);
    return () => {
      window.removeEventListener('scroll', planifier);
      window.removeEventListener('resize', redimensionner);
      if (image) cancelAnimationFrame(image);
    };
    // `cle` résume `ids` : le hook ne se réinscrit pas si le parent recrée le tableau.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cle, ancreSommaire, ancreFin, enabled]);

  if (!enabled) return INERTE;
  return { actif, visible, haut };
}
