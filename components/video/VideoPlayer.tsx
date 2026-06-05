'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { trackVideoStart, trackVideoProgress, trackVideoComplete } from '@/lib/analytics';

interface VideoPlayerProps {
  /** URL du MP4 auto-hébergé (Cloudflare R2) */
  src: string;
  /** Image poster (AVIF) affichée avant lecture */
  poster?: string;
  /** Titre accessible + label des events GA4 */
  title?: string;
  /** Badge optionnel en haut à gauche (ex. "Démo") */
  badge?: string;
  className?: string;
}

/**
 * Lecteur vidéo auto-hébergé (Cloudflare R2), sans aucun branding tiers.
 *
 * - Façade : aucun octet de vidéo n'est chargé avant le clic (préserve les
 *   Core Web Vitals et la data mobile). Visuel identique à YouTubeFacade.
 * - Au clic : <video> natif avec contrôles tactiles, `playsInline` (lecture
 *   inline sur iOS au lieu du plein écran forcé) et plein écran natif dispo.
 * - Tracking GA4 : video_start / video_progress (25/50/75) / video_complete.
 */
export function VideoPlayer({ src, poster, title = 'Vidéo', badge, className = '' }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Jalons GA4 déjà émis (évite les doublons sur timeupdate)
  const firedRef = useRef<Set<number>>(new Set());

  const handlePlay = useCallback(() => setPlaying(true), []);

  // Démarrage fiable : l'attribut `autoPlay` n'est pas honoré de façon constante
  // pour une vidéo avec son (politique autoplay des navigateurs, dépend du Media
  // Engagement Index). On appelle play() explicitement dès le montage du <video>,
  // qui reste dans la fenêtre d'activation transitoire du clic → lecture autorisée.
  useEffect(() => {
    if (!playing) return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p) p.catch(() => { /* bloqué : les contrôles natifs prennent le relais */ });
  }, [playing]);

  const handleStarted = useCallback(() => {
    if (!firedRef.current.has(0)) {
      firedRef.current.add(0);
      trackVideoStart(title);
    }
  }, [title]);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    ([25, 50, 75] as const).forEach((m) => {
      if (pct >= m && !firedRef.current.has(m)) {
        firedRef.current.add(m);
        trackVideoProgress(title, m);
      }
    });
  }, [title]);

  const handleEnded = useCallback(() => trackVideoComplete(title), [title]);

  if (playing) {
    return (
      <div className={`relative rounded-2xl overflow-hidden bg-black ${className}`}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="auto"
          onPlay={handleStarted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative bg-future-dusk-900 rounded-2xl overflow-hidden group cursor-pointer ${className}`}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      aria-label={`Lire la vidéo : ${title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlay(); } }}
    >
      {poster && (
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-very-peri-500/80 transition-all group-hover:scale-110">
          <Play className="h-7 w-7 text-white ml-1" />
        </div>
      </div>

      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-very-peri-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
