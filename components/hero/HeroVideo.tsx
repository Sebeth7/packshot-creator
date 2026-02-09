'use client';

import { useReducedMotion } from 'framer-motion';
import type { HeroVideoProps } from './types';

/**
 * Autoplay muted loop video background for heroes.
 * Falls back to poster image when reduced motion is enabled.
 */
export default function HeroVideo({
  src,
  poster,
  className = '',
}: HeroVideoProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={`absolute inset-0 z-0 ${className}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
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
        preload="metadata"
        poster={poster}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900/80 via-future-dusk-900/50 to-transparent" />
    </div>
  );
}
