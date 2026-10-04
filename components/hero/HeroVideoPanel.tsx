'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import type { HeroVideoPanelProps } from './types';

const ECRAN_LARGE = '(min-width: 768px)';

/** Part visible en dessous de laquelle la vidéo est mise en pause (sortie du champ). */
const SEUIL_VISIBLE = 0.3;

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

/**
 * Vidéo 16:9 du hero en panneau (layout `split`), lue entière, sans recadrage :
 * la source porte des textes incrustés qu'un fond `object-cover` couperait.
 * Mêmes règles que HeroVideo :
 * - lecture muette en boucle à partir de 768 px (toujours muette, sans bouton son) ;
 * - en dessous de 768 px, image fixe seulement : la vidéo n'est pas téléchargée ;
 * - image fixe si `prefers-reduced-motion`.
 * En plus : bouton pause (WCAG 2.2.2 : animation en boucle de plus de 5 s) et pause
 * automatique quand la vidéo sort du champ.
 */
export default function HeroVideoPanel({ src, poster, title, labels, className = '' }: HeroVideoPanelProps) {
  const reduit = useReducedMotion();
  const ecranLarge = useEcranLarge();
  const lecture = ecranLarge && !reduit;
  const [pauseVisiteur, setPauseVisiteur] = useState(false);
  const [dansLeChamp, setDansLeChamp] = useState(true);
  const conteneur = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = conteneur.current;
    if (!lecture || !el) return;
    const observateur = new IntersectionObserver(
      ([entree]) => setDansLeChamp(entree.intersectionRatio >= SEUIL_VISIBLE),
      { threshold: [0, SEUIL_VISIBLE, 1] },
    );
    observateur.observe(el);
    return () => observateur.disconnect();
  }, [lecture]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (pauseVisiteur || !dansLeChamp) v.pause();
    // Lecture refusée par le navigateur : le bouton propose « Lire ». Une lecture
    // interrompue par une pause hors champ (AbortError) ne compte pas.
    else v.play().catch((e: unknown) => {
      if (e instanceof DOMException && e.name === 'NotAllowedError') setPauseVisiteur(true);
    });
  }, [lecture, pauseVisiteur, dansLeChamp]);

  const media = 'absolute inset-0 h-full w-full object-contain';

  return (
    <div
      ref={conteneur}
      className={`relative aspect-video overflow-hidden rounded-2xl bg-future-dusk-800 shadow-2xl shadow-black/40 ring-1 ring-white/10 ${className}`}
    >
      {lecture ? (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-label={title}
          className={media}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={title} loading="eager" fetchPriority="high" className={media} />
      )}
      {lecture && (
        <button
          type="button"
          onClick={() => setPauseVisiteur((p) => !p)}
          aria-label={pauseVisiteur ? labels.play : labels.pause}
          className="absolute bottom-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-future-dusk-900/60 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-future-dusk-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-300"
        >
          {pauseVisiteur ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
