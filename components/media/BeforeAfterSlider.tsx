'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SliderImage {
  src: string;
  alt: string;
  label?: string;
}

interface BeforeAfterSliderProps {
  before: SliderImage;
  after: SliderImage;
  width: number;
  height: number;
  initialPosition?: number;
  className?: string;
}

export function BeforeAfterSlider({
  before,
  after,
  width,
  height,
  initialPosition = 50,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  // Touch events
  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = 2;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    }
  }, []);

  const beforeLabel = before.label || 'Avant';
  const afterLabel = after.label || 'Après';

  // Reduced motion fallback: side-by-side
  if (prefersReducedMotion) {
    return (
      <div className={cn('grid grid-cols-2 gap-2 rounded-2xl overflow-hidden', className)}>
        <figure className="relative">
          <Image src={before.src} alt={before.alt} width={width / 2} height={height} className="w-full h-auto object-cover" />
          <span className="absolute top-3 left-3 rounded-full bg-neutral-900/70 px-3 py-1 text-xs font-semibold text-white">
            {beforeLabel}
          </span>
        </figure>
        <figure className="relative">
          <Image src={after.src} alt={after.alt} width={width / 2} height={height} className="w-full h-auto object-cover" />
          <span className="absolute top-3 right-3 rounded-full bg-very-peri-600/80 px-3 py-1 text-xs font-semibold text-white">
            {afterLabel}
          </span>
        </figure>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative select-none overflow-hidden rounded-2xl bg-neutral-100', className)}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* After image (full, underneath) */}
      <Image
        src={after.src}
        alt={after.alt}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Before image (clipped via clip-path so image stays at full-width position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before.src}
          alt={before.alt}
          width={width}
          height={height}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-neutral-900/70 px-3 py-1 text-xs font-semibold text-white pointer-events-none z-10">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-very-peri-600/80 px-3 py-1 text-xs font-semibold text-white pointer-events-none z-10">
        {afterLabel}
      </span>

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical line */}
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-md" style={{ left: '50%', transform: 'translateX(-50%)' }} />

        {/* Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Curseur avant/après"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'flex h-10 w-10 cursor-ew-resize items-center justify-center',
            'rounded-full bg-white shadow-lg',
            'transition-transform duration-150',
            'hover:scale-110 focus-visible:ring-2 focus-visible:ring-very-peri-500 focus-visible:ring-offset-2',
            isDragging && 'scale-110'
          )}
        >
          <GripVertical className="h-5 w-5 text-future-dusk-600" />
        </div>
      </div>
    </div>
  );
}
