'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { HERO } from './contenu';
import { MARGE_HEADER, SEUIL_VIDEO_VISIBLE } from './coordination';

/**
 * Variante locale de components/hero/HeroVideo.tsx (non modifié), pour un panneau
 * éditorial et non un fond de section. Mêmes fichiers et mêmes règles :
 * - lecture muette en boucle à partir de 768 px ;
 * - en dessous de 768 px, image fixe seulement : la vidéo n'est pas téléchargée ;
 * - image fixe si `prefers-reduced-motion`.
 * Différences : pas de voile sombre latéral (prévu pour un texte posé sur la vidéo),
 * cadrage réglable, bouton pause (WCAG 2.2.2 : animation en boucle de plus de 5 s),
 * et pause automatique quand la vidéo sort du champ (coordination.ts).
 */
const ECRAN_LARGE = '(min-width: 768px)';

function abonner(surChangement: () => void) {
  const mq = window.matchMedia(ECRAN_LARGE);
  mq.addEventListener('change', surChangement);
  return () => mq.removeEventListener('change', surChangement);
}

/** Vrai à partir de 768 px ; faux côté serveur (image fixe au premier rendu, comme HeroVideo). */
function useEcranLarge(): boolean {
  return useSyncExternalStore(
    abonner,
    () => window.matchMedia(ECRAN_LARGE).matches,
    () => false,
  );
}

export function VideoStudio({
  id,
  src,
  poster,
  cadrage = '50% 50%',
  className = '',
  mediaClassName = '',
}: {
  id?: string;
  src: string;
  poster: string;
  /** `object-position` de la vidéo et de l'image fixe. */
  cadrage?: string;
  className?: string;
  /** Classes ajoutées à la vidéo et à l'image fixe (agrandissement de recadrage). */
  mediaClassName?: string;
}) {
  const reduit = useReducedMotion();
  const ecranLarge = useEcranLarge();
  const video = ecranLarge && !reduit;
  // Pause demandée par le visiteur, distincte de la pause hors champ.
  const [pauseVisiteur, setPauseVisiteur] = useState(false);
  const [dansLeChamp, setDansLeChamp] = useState(true);
  const conteneur = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = conteneur.current;
    if (!video || !el) return;
    const observateur = new IntersectionObserver(
      ([entree]) => setDansLeChamp(entree.intersectionRatio >= SEUIL_VIDEO_VISIBLE),
      { threshold: [0, SEUIL_VIDEO_VISIBLE, 1], rootMargin: MARGE_HEADER },
    );
    observateur.observe(el);
    return () => observateur.disconnect();
  }, [video]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (pauseVisiteur || !dansLeChamp) v.pause();
    // Lecture refusée par le navigateur : le bouton propose « Lire ». Une lecture
    // interrompue par une pause hors champ (AbortError) ne compte pas.
    else v.play().catch((e: unknown) => {
      if (e instanceof DOMException && e.name === 'NotAllowedError') setPauseVisiteur(true);
    });
  }, [video, pauseVisiteur, dansLeChamp]);

  const media = `absolute inset-0 h-full w-full object-cover ${mediaClassName}`;

  return (
    <div ref={conteneur} id={id} className={`relative overflow-hidden ${className}`}>
      {video ? (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          className={media}
          style={{ objectPosition: cadrage }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className={media}
          style={{ objectPosition: cadrage }}
        />
      )}
      {video && (
        <button
          type="button"
          onClick={() => setPauseVisiteur((p) => !p)}
          aria-label={pauseVisiteur ? HERO.lecture : HERO.pause}
          className="absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-future-dusk-900/60 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-future-dusk-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-300"
        >
          {pauseVisiteur ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
