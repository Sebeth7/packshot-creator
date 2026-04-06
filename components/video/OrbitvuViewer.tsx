'use client';

import { useEffect, useRef } from 'react';

interface OrbitvuViewerProps {
  /** Orbitvu SUN share ID (e.g. "W2VVEnzxvCD8t2A8qqJNBQ") */
  shareId: string;
  /** Orbittour script number (e.g. "217258") */
  scriptId: string;
  /** Orbittour CDN version hash (e.g. "14921a33") */
  cdnHash?: string;
  className?: string;
}

/**
 * Embeds an Orbitvu SUN 360° interactive viewer.
 * Loads the orbittour script dynamically and renders the viewer in a container div.
 * All 360° images are served from Orbitvu's CDN — zero weight on our hosting.
 */
export function OrbitvuViewer({ shareId, scriptId, cdnHash = '14921a33', className = '' }: OrbitvuViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // Create the target div that orbittour expects
    const targetId = `orbittour-${shareId}`;
    if (containerRef.current && !document.getElementById(targetId)) {
      const div = document.createElement('div');
      div.id = targetId;
      div.style.width = '100%';
      div.style.height = '100%';
      containerRef.current.appendChild(div);
    }

    // Load the product-specific orbittour script
    const script = document.createElement('script');
    script.src = `https://orbitvu.co/share/${shareId}/${scriptId}/orbittour/script`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      try { document.body.removeChild(script); } catch {}
    };
  }, [shareId, scriptId, cdnHash]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    />
  );
}
