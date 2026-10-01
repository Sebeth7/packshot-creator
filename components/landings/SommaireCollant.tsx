'use client';

/**
 * Barre de sommaire collante de /fr/packshot-mode, desktop seulement (lg et plus).
 *
 * Elle prend le relais du sommaire de la page (#sommaire, bloc « En bref ») une fois
 * celui-ci sorti de l'écran, et disparaît après la FAQ, avant le formulaire. Une
 * barre latérale façon blog (aside w-64) a été écartée : à 1440 px, elle ramènerait
 * le contenu de 1232 à 928 px de large (tableaux et illustrations à -25 %), et la FAQ
 * a déjà sa propre colonne collante.
 *
 * Dix ancres numérotées, mêmes libellés et mêmes cibles que le sommaire de la page ;
 * la section en cours affiche son libellé et porte aria-current="location". Les autres
 * libellés restent dans le nom accessible (sr-only) et apparaissent au survol ou au
 * focus. Nom accessible distinct de celui du sommaire de la page (deux repères « Sommaire »
 * signalés par axe, landmark-unique). Sous lg, rien n'est rendu : le sommaire compact de la
 * page, non collant, suffit.
 * Sans JavaScript, la barre reste masquée.
 */
import { useEffect, useState } from 'react';

type Entree = { id: string; libelle: string };

const HAUTEUR_BARRE = 48;

export default function SommaireCollant({
  titre,
  libelle,
  entrees,
  ancreSommaire,
}: {
  titre: string;
  libelle: string;
  entrees: Entree[];
  ancreSommaire: string;
}) {
  const [visible, setVisible] = useState(false);
  const [actif, setActif] = useState<string | null>(null);
  const [haut, setHaut] = useState(64);

  useEffect(() => {
    let image = 0;
    const mesurer = () => {
      image = 0;
      // En-tête collant du site (components/layout/Header.tsx) : la barre se place dessous.
      const entete = document.querySelector<HTMLElement>('header.sticky');
      const h = entete ? entete.offsetHeight : 64;
      const sommaire = document.getElementById(ancreSommaire);
      const derniere = document.getElementById(entrees[entrees.length - 1].id);
      const apresSommaire = sommaire ? sommaire.getBoundingClientRect().bottom < h : true;
      const avantFin = derniere ? derniere.getBoundingClientRect().bottom > h + HAUTEUR_BARRE : true;
      let courant: string | null = null;
      for (const e of entrees) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top <= h + HAUTEUR_BARRE + 16) courant = e.id;
      }
      setHaut(h);
      setVisible(apresSommaire && avantFin);
      setActif(courant);
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(mesurer);
    };
    mesurer();
    window.addEventListener('scroll', planifier, { passive: true });
    window.addEventListener('resize', planifier);
    return () => {
      window.removeEventListener('scroll', planifier);
      window.removeEventListener('resize', planifier);
      if (image) cancelAnimationFrame(image);
    };
  }, [entrees, ancreSommaire]);

  return (
    <nav
      aria-label={libelle}
      style={{ top: haut }}
      className={`hidden lg:block fixed inset-x-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-5">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-future-dusk-500" aria-hidden="true">
          {titre}
        </span>
        <ol className="flex items-center">
          {entrees.map((e, i) => {
            const numero = String(i + 1).padStart(2, '0');
            const estActif = e.id === actif;
            return (
              <li key={e.id} className="group relative">
                <a
                  href={`#${e.id}`}
                  aria-current={estActif ? 'location' : undefined}
                  className={`flex h-12 items-center gap-2 border-b-2 px-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-500 ${
                    estActif
                      ? 'border-very-peri-500 font-semibold text-very-peri-700'
                      : 'border-transparent text-future-dusk-600 hover:text-very-peri-600'
                  }`}
                >
                  <span className="tabular-nums">{numero}</span>
                  <span className={estActif ? 'whitespace-nowrap' : 'sr-only'}>{e.libelle}</span>
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
      </div>
    </nav>
  );
}
