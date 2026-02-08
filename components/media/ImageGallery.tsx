'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
} as const;

const columnClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

function sizesForColumns(columns: 2 | 3 | 4): string {
  switch (columns) {
    case 2:
      return '(max-width: 640px) 100vw, 50vw';
    case 3:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 4:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
  }
}

export function ImageGallery({
  images,
  columns = 3,
  gap = 'md',
  className,
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  const sizes = sizesForColumns(columns);
  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <>
      {/* Grid */}
      <div className={cn('grid', columnClasses[columns], gapClasses[gap], className)}>
        {images.map((image, index) => (
          <figure key={index} className="group">
            <button
              type="button"
              onClick={() => openLightbox(index)}
              aria-label={`Agrandir : ${image.alt}`}
              className="relative block w-full overflow-hidden rounded-xl bg-neutral-100 focus-visible:ring-2 focus-visible:ring-very-peri-500 focus-visible:ring-offset-2"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes={sizes}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            {image.caption && (
              <figcaption className="mt-2 text-sm text-future-dusk-600">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {currentImage && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={(e) => {
            if (e.target === overlayRef.current) closeLightbox();
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Fermer"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Image précédente"
              className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={goToNext}
              aria-label="Image suivante"
              className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Image + caption */}
          <figure className="max-h-[90vh] max-w-[90vw]">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
              className="max-h-[85vh] w-auto h-auto object-contain"
              sizes="90vw"
              priority
            />
            {currentImage.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {currentImage.caption}
              </figcaption>
            )}
          </figure>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {lightboxIndex! + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
