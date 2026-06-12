'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasAnalyticsConsent } from '@/components/cookies/CookieBanner';

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check initial consent
    setEnabled(hasAnalyticsConsent());

    // Listen for consent updates from cookie banner
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setEnabled(detail?.analytics === true);
    };
    window.addEventListener('cookie-consent-update', handler);
    return () => window.removeEventListener('cookie-consent-update', handler);
  }, []);

  // Track page_view on every client-side navigation (App Router does not reload the page,
  // so gtag('config') only fires on first mount — manual emission below covers all transitions).
  useEffect(() => {
    if (!enabled || !measurementId || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, enabled, measurementId]);

  if (!enabled || !measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              anonymize_ip: true,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}
