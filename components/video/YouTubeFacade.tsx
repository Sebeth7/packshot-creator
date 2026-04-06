'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  poster?: string;
  title?: string;
  badge?: string;
  className?: string;
}

/**
 * Lightweight YouTube facade — shows a poster image with a play button.
 * The actual YouTube iframe is only loaded when the user clicks.
 * This saves ~500KB+ of initial page weight vs embedding the iframe directly.
 */
export function YouTubeFacade({ videoId, poster, title = 'Video', badge, className = '' }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = poster || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className={`relative rounded-2xl overflow-hidden ${className}`}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`relative bg-future-dusk-900 rounded-2xl overflow-hidden group cursor-pointer ${className}`}
      onClick={() => setPlaying(true)}
      role="button"
      tabIndex={0}
      aria-label={`Play ${title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPlaying(true); }}
    >
      {poster ? (
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        />
      ) : (
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          loading="lazy"
        />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center">
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
