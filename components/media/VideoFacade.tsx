'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoFacadeProps {
  videoId: string;
  provider: 'youtube' | 'vimeo';
  title: string;
  thumbnailUrl?: string;
  aspectRatio?: '16/9' | '4/3';
  className?: string;
}

function getThumbnailUrl(provider: 'youtube' | 'vimeo', videoId: string): string {
  if (provider === 'youtube') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  // Vimeo requires API call for auto-thumbnail; use placeholder
  return '';
}

function getEmbedUrl(provider: 'youtube' | 'vimeo', videoId: string): string {
  if (provider === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
}

export function VideoFacade({
  videoId,
  provider,
  title,
  thumbnailUrl,
  aspectRatio = '16/9',
  className,
}: VideoFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const resolvedThumbnail = thumbnailUrl || getThumbnailUrl(provider, videoId);
  const embedUrl = getEmbedUrl(provider, videoId);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePlay();
      }
    },
    [handlePlay]
  );

  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-2xl bg-neutral-900', className)}
      style={{ aspectRatio }}
    >
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          aria-label={`Lire la vidéo : ${title}`}
          onClick={handlePlay}
          onKeyDown={handleKeyDown}
          className="group absolute inset-0 cursor-pointer"
        >
          {resolvedThumbnail && (
            <Image
              src={resolvedThumbnail}
              alt={title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              unoptimized={resolvedThumbnail.startsWith('https://img.youtube.com')}
            />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-very-peri-500 group-focus-visible:ring-offset-2">
              <Play className="h-7 w-7 text-future-dusk-900 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
