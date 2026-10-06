'use client';

/**
 * Barre de sommaire horizontale collante, desktop seulement (lg et plus). Règle D44,
 * forme A. Version mutualisée du composant de /packshot-mode
 * (`components/landings/SommaireCollant.tsx`), qui reste en place jusqu'à la fin de la
 * mesure Mode (26/11/2026) ; la bascule de Mode se fera après contrôle de parité.
 *
 * Comportement :
 * - rien n'est rendu sous lg (1 024 px) ; sans JavaScript, la barre reste masquée ;
 * - placée sous l'en-tête collant du site (`header.sticky`, hauteur mesurée), z-40 ;
 * - apparition : quand le sommaire de la page (`ancreSommaire`) est sorti de l'écran,
 *   ou, à défaut, quand la première section atteint le bas de la barre ;
 * - disparition : avant la zone finale `ancreFin` (formulaire, CTA), ou à défaut après
 *   la dernière entrée ;
 * - section active : numéro souligné, `aria-current="location"`, libellé affiché dans un
 *   emplacement fixe à droite des numéros (tronqué s'il est long). Différence voulue avec
 *   la barre de Mode, où le libellé s'insère après le numéro actif : les numéros
 *   suivants s'y décalent à chaque changement de section (CLS de défilement mesuré le
 *   03/10 : 0,036 sur Mode à 1 024 px, 0,080 sur un guide de 12 étapes). Chaque lien
 *   garde le libellé complet dans son nom accessible ; infobulle au survol et au focus ;
 * - décalage des ancres : le composant donne à chaque section ciblée un
 *   `scroll-margin-top` égal à en-tête + barre + 16 px, recalculé au redimensionnement ;
 *   les pages n'ont qu'à porter les `id`.
 * Masquée, la barre n'est pas focalisable (`invisible`).
 */
import { useEffect, useState } from 'react';

export type EntreeSommaire = { id: string; libelle: string };

const HAUTEUR_BARRE = 48;
const MARGE = 16;
const DESKTOP = '(min-width: 1024px)';

export default function SommaireCollant({
  titre,
  libelle,
  entrees,
  ancreSommaire,
  ancreFin,
}: {
  /** Mot affiché à gauche de la barre (« Sommaire », « Contents », « Inhalt »). */
  titre: string;
  /** Nom accessible du repère, distinct de celui du sommaire de la page. */
  libelle: string;
  entrees: EntreeSommaire[];
  ancreSommaire?: string;
  ancreFin?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [actif, setActif] = useState<string | null>(null);
  const [haut, setHaut] = useState(64);
  const cle = entrees.map((e) => e.id).join('|');

  useEffect(() => {
    if (entrees.length === 0) return;
    let image = 0;
    const desktop = window.matchMedia(DESKTOP);

    const decaler = (h: number) => {
      for (const e of entrees) {
        const el = document.getElementById(e.id);
        if (el) el.style.scrollMarginTop = desktop.matches ? `${h + HAUTEUR_BARRE + MARGE}px` : '';
      }
    };

    const mesurer = () => {
      image = 0;
      const entete = document.querySelector<HTMLElement>('header.sticky');
      const h = entete ? entete.offsetHeight : 64;
      const bas = h + HAUTEUR_BARRE;
      const sommaire = ancreSommaire ? document.getElementById(ancreSommaire) : null;
      const premiere = document.getElementById(entrees[0].id);
      const derniere = document.getElementById(entrees[entrees.length - 1].id);
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
      for (const e of entrees) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top <= bas + MARGE) courant = e.id;
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
    // `cle` résume `entrees` : la barre ne se réinscrit pas si le parent recrée le tableau.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cle, ancreSommaire, ancreFin]);

  if (entrees.length === 0) return null;

  return (
    <nav
      aria-label={libelle}
      style={{ top: haut }}
      className={`hidden lg:block fixed inset-x-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-5">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-future-dusk-500" aria-hidden="true">
          {titre}
        </span>
        <ol className="flex shrink-0 items-center">
          {entrees.map((e, i) => {
            const numero = String(i + 1).padStart(2, '0');
            const estActif = e.id === actif;
            return (
              <li key={e.id} className="group relative">
                <a
                  href={`#${e.id}`}
                  aria-current={estActif ? 'location' : undefined}
                  className={`flex h-12 items-center border-b-2 px-2.5 text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-500 ${
                    estActif
                      ? 'border-very-peri-500 font-semibold text-very-peri-700'
                      : 'border-transparent text-future-dusk-600 hover:text-very-peri-600'
                  }`}
                >
                  {numero}
                  <span className="sr-only"> {e.libelle}</span>
                </a>
                {!estActif && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-future-dusk-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    {e.libelle}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        {/* Libellé de la section active dans un emplacement fixe : les numéros ne bougent
            pas quand la section change (pas de décalage de mise en page pendant le défilement). */}
        <span aria-hidden="true" className="min-w-0 flex-1 truncate text-sm font-semibold text-very-peri-700">
          {entrees.find((e) => e.id === actif)?.libelle ?? ''}
        </span>
      </div>
    </nav>
  );
}
