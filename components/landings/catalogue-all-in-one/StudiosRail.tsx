'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { GAMME } from './contenu';
import { ID_VIDEO_GAMME, MARGE_HEADER, SEUIL_VIDEO_VISIBLE } from './coordination';
import type { StudioFrise } from './studios';

/**
 * Frise panoramique des studios (V4). Défilement horizontal natif avec points
 * d'accroche : glisser au doigt, molette horizontale, flèches, Début et Fin une fois
 * la liste focalisée, boutons précédent / suivant.
 *
 * Avancée automatique, carte par carte, seulement sur grand écran avec souris et
 * sans `prefers-reduced-motion`, et seulement si :
 * - la frise est visible à moitié au moins ;
 * - la vidéo du hero est hors champ (une seule animation majeure à la fois) ;
 * - ni survol ni focus sur la liste.
 * Toute interaction manuelle l'arrête jusqu'à « Reprendre ». Arrivée au bout, elle
 * s'arrête : pas de boucle, donc aucune carte dupliquée.
 */
const AUTO_POSSIBLE = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
const INTERVALLE_MS = 4500;
const ID_LISTE = 'frise-studios';

function abonner(surChangement: () => void) {
  const mq = window.matchMedia(AUTO_POSSIBLE);
  mq.addEventListener('change', surChangement);
  return () => mq.removeEventListener('change', surChangement);
}

function useAutoPossible(): boolean {
  const reduit = useReducedMotion();
  const ecran = useSyncExternalStore(
    abonner,
    () => window.matchMedia(AUTO_POSSIBLE).matches,
    () => false,
  );
  return ecran && !reduit;
}

/** Largeur d'un pas : une carte et son espacement. */
function pasDe(el: HTMLElement): number {
  const carte = el.querySelector('li');
  if (!carte) return 0;
  const ecart = parseFloat(getComputedStyle(el).columnGap) || 0;
  return carte.getBoundingClientRect().width + ecart;
}

const TOUCHES_MANUELLES = new Set(['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown']);

const bouton =
  'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-future-dusk-800 ring-1 ring-future-dusk-200 transition-colors hover:bg-future-dusk-50 hover:text-future-dusk-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white';

export function StudiosRail({ studios }: { studios: StudioFrise[] }) {
  const reduit = useReducedMotion();
  const autoPossible = useAutoPossible();
  const section = useRef<HTMLElement>(null);
  const liste = useRef<HTMLUListElement>(null);

  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(false);
  const [arret, setArret] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [videoDansLeChamp, setVideoDansLeChamp] = useState(false);

  const enLecture = autoPossible && !arret && !fin;
  const actif = enLecture && !survol && !focus && visible && !videoDansLeChamp;

  function bornes() {
    const el = liste.current;
    if (!el) return;
    setDebut(el.scrollLeft <= 2);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }

  function manuel(sens: 1 | -1) {
    const el = liste.current;
    setArret(true);
    el?.scrollBy({ left: sens * pasDe(el), behavior: reduit ? 'auto' : 'smooth' });
  }

  function basculer() {
    if (enLecture) {
      setArret(true);
      return;
    }
    if (fin) liste.current?.scrollTo({ left: 0, behavior: 'smooth' });
    setArret(false);
  }

  // Bornes au montage et à chaque redimensionnement de la liste.
  useEffect(() => {
    const el = liste.current;
    if (!el) return;
    const observateur = new ResizeObserver(() => {
      setDebut(el.scrollLeft <= 2);
      setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    });
    observateur.observe(el);
    return () => observateur.disconnect();
  }, []);

  // Interaction manuelle sur la liste : l'avancée automatique s'arrête.
  useEffect(() => {
    const el = liste.current;
    if (!el) return;
    const arreter = () => setArret(true);
    const touche = (e: KeyboardEvent) => {
      if (!TOUCHES_MANUELLES.has(e.key)) return;
      setArret(true);
      // Début / Fin : le navigateur ferait défiler la page verticalement.
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const sansMouvement = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollTo({ left: e.key === 'Home' ? 0 : el.scrollWidth, behavior: sansMouvement ? 'auto' : 'smooth' });
      }
    };
    const molette = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setArret(true);
    };
    el.addEventListener('pointerdown', arreter);
    el.addEventListener('touchstart', arreter, { passive: true });
    el.addEventListener('keydown', touche);
    el.addEventListener('wheel', molette, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', arreter);
      el.removeEventListener('touchstart', arreter);
      el.removeEventListener('keydown', touche);
      el.removeEventListener('wheel', molette);
    };
  }, []);

  // Visibilité de la frise et de la vidéo du hero : observées seulement si l'avancée
  // automatique est possible.
  useEffect(() => {
    const el = section.current;
    if (!autoPossible || !el) return;
    const frise = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.5), {
      threshold: [0, 0.5, 1],
      rootMargin: MARGE_HEADER,
    });
    frise.observe(el);
    const video = document.getElementById(ID_VIDEO_GAMME);
    const hero = video
      ? new IntersectionObserver(([e]) => setVideoDansLeChamp(e.intersectionRatio >= SEUIL_VIDEO_VISIBLE), {
          threshold: [0, SEUIL_VIDEO_VISIBLE, 1],
          rootMargin: MARGE_HEADER,
        })
      : null;
    if (video) hero?.observe(video);
    return () => {
      frise.disconnect();
      hero?.disconnect();
    };
  }, [autoPossible]);

  // Avancée automatique.
  useEffect(() => {
    const el = liste.current;
    if (!actif || !el) return;
    const minuterie = window.setInterval(
      () => el.scrollBy({ left: pasDe(el), behavior: 'smooth' }),
      INTERVALLE_MS,
    );
    return () => window.clearInterval(minuterie);
  }, [actif]);

  return (
    <section
      ref={section}
      aria-labelledby="gamme-titre"
      className="overflow-hidden bg-future-dusk-0 py-12 sm:py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.12em] text-very-peri-600 sm:text-sm">{GAMME.surtitre}</p>
          <h2
            id="gamme-titre"
            className="mt-3 text-3xl font-heading font-bold tracking-tight text-balance text-future-dusk-900 sm:text-4xl"
          >
            {GAMME.h2}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-future-dusk-600 sm:text-lg">{GAMME.texte}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-controls={ID_LISTE}
            aria-label={GAMME.precedent}
            disabled={debut}
            onClick={() => manuel(-1)}
            className={bouton}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-controls={ID_LISTE}
            aria-label={GAMME.suivant}
            disabled={fin}
            onClick={() => manuel(1)}
            className={bouton}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          {autoPossible && (
            <button
              type="button"
              aria-controls={ID_LISTE}
              aria-label={enLecture ? GAMME.pause : GAMME.lecture}
              onClick={basculer}
              className={bouton}
            >
              {enLecture ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      {/* Pleine largeur : la frise déborde à droite du conteneur (carte suivante entrevue).
          Les marges latérales suivent celles du conteneur max-w-7xl. */}
      <ul
        ref={liste}
        id={ID_LISTE}
        aria-label={GAMME.liste}
        tabIndex={0}
        data-lenis-prevent
        onScroll={bornes}
        // Focus et survol de la liste seulement : un clic sur « Reprendre » relance.
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setSurvol(true)}
        onPointerLeave={() => setSurvol(false)}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-px-4 [scrollbar-width:thin] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-400 sm:gap-5 sm:px-6 sm:scroll-px-6 lg:gap-6 lg:px-[max(2rem,calc((100%-80rem)/2+2rem))] lg:scroll-px-[max(2rem,calc((100%-80rem)/2+2rem))]"
      >
        {studios.map((studio) => (
          <li
            key={studio.id}
            className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/2.6)] lg:w-[calc((100%-3rem)/3.3)] xl:w-[calc((100%-4.5rem)/4.3)]"
          >
            <figure className="h-full rounded-2xl bg-white p-3 ring-1 ring-future-dusk-100">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
                <Image
                  src={studio.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 270px, (min-width: 1024px) 280px, (min-width: 640px) 38vw, 72vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="px-1 pb-1 pt-3">
                <span className="block font-heading text-base font-semibold text-future-dusk-900">{studio.nom}</span>
                {studio.famille && <span className="mt-0.5 block text-sm text-future-dusk-600">{studio.famille}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
