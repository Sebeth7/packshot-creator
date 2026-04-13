'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { HeroVideoProps } from './types';

/**
 * Autoplay muted loop video background for heroes.
 * On mobile (<768px): shows poster image only (no video download).
 * Falls back to poster image when reduced motion is enabled.
 */
export default function HeroVideo({
  src,
  poster,
  className = '',
}: HeroVideoProps) {
  const shouldReduce = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (shouldReduce) {
      setShowVideo(false);
      return;
    }
    const mq = window.matchMedia('(min-width: 768px)');
    setShowVideo(mq.matches);
    const handler = (e: MediaQueryListEvent) => setShowVideo(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [shouldReduce]);

  if (!showVideo) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900/80 via-future-dusk-900/50 to-transparent" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`} aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900/80 via-future-dusk-900/50 to-transparent" />
    </div>
  );
}
