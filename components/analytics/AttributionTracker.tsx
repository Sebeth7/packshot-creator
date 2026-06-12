'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/**
 * Capture l'attribution first-touch (utm_*, referrer externe, landing page)
 * au premier rendu client. Monté une fois dans le layout.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
