'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Settings, X } from 'lucide-react';

type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  /** Contenus externes (vidéos YouTube des articles) : lecteur chargé au clic seulement. */
  externalMedia: boolean;
};

const COOKIE_NAME = 'cookie-consent';
const COOKIE_MAX_AGE = 13 * 30 * 24 * 60 * 60; // ~13 months in seconds

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

function getConsent(): ConsentCategories | null {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    // Cookie antérieur à la catégorie « contenus externes » : absente = refusée.
    return {
      necessary: true,
      analytics: parsed?.analytics === true,
      externalMedia: parsed?.externalMedia === true,
    };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return consent?.analytics === true;
}

export function hasExternalMediaConsent(): boolean {
  const consent = getConsent();
  return consent?.externalMedia === true;
}

/** Dispatch a custom event so GoogleAnalytics component can react */
function dispatchConsentUpdate(consent: ConsentCategories) {
  window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: consent }));
}

/**
 * Recale le bandeau sur la zone visible de l'écran (visual viewport).
 *
 * Sur mobile, une page plus large que l'écran agrandit la fenêtre de mise en
 * page au-delà de la zone visible : relevé du 08/10/2026 sur /fr en Pixel 5,
 * 442 × 818 px de mise en page pour 393 × 727 px visibles. Un bandeau
 * `fixed bottom-0` s'ancre alors 91 px sous le bas de l'écran : le bouton
 * « Personnaliser » sortait de la zone visible et son clic tombait sur
 * « Tout accepter » ou « Tout refuser » (e2e/cookie-banner.spec.ts, Pixel 5).
 * L'écart est mesuré sur la position réelle du bandeau, barres de défilement
 * exclues : sans écart (cas courant, et le desktop), aucun style n'est posé.
 * Zoom volontaire de l'internaute (échelle > 1) : comportement natif conservé.
 */
function fitToVisualViewport(el: HTMLElement) {
  const vv = window.visualViewport;
  el.style.bottom = el.style.left = el.style.right = '';
  if (!vv || vv.scale > 1.01) return;
  const r = el.getBoundingClientRect();
  const px = (n: number) => (n >= 1 ? `${Math.round(n)}px` : '');
  el.style.bottom = px(r.bottom - (vv.offsetTop + vv.height));
  el.style.left = px(vv.offsetLeft - r.left);
  el.style.right = px(r.right - (vv.offsetLeft + vv.width));
}

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentCategories>({
    necessary: true,
    analytics: false,
    externalMedia: false,
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Ouverture demandée (lien du pied de page, fenêtre d'une vidéo) : le focus
  // entre dans le bandeau, puis revient à l'élément d'origine à la fermeture.
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [openRequest, setOpenRequest] = useState(0);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setConsent(existing);
    }
  }, []);

  const saveConsent = useCallback((categories: ConsentCategories) => {
    const final = { ...categories, necessary: true };
    setCookie(COOKIE_NAME, JSON.stringify(final), COOKIE_MAX_AGE);
    setConsent(final);
    setVisible(false);
    setShowDetails(false);
    dispatchConsentUpdate(final);
    // Après le retrait éventuel des lecteurs (cookie-consent-update) : la façade
    // remise en place est de nouveau dans le document.
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (target) requestAnimationFrame(() => { if (target.isConnected) target.focus(); });
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, externalMedia: true });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, externalMedia: false });
  }, [saveConsent]);

  const saveCustom = useCallback(() => {
    saveConsent(consent);
  }, [consent, saveConsent]);

  /** Called from footer link to reopen banner */
  useEffect(() => {
    const handler = (e: Event) => {
      const requested = (e as CustomEvent<{ returnFocus?: HTMLElement | null } | null>).detail?.returnFocus;
      const active = document.activeElement;
      const outside = active instanceof HTMLElement && active !== document.body && !panelRef.current?.contains(active);
      returnFocusRef.current = requested ?? (outside ? active : null);
      const existing = getConsent();
      if (existing) setConsent(existing);
      setShowDetails(true);
      setVisible(true);
      setOpenRequest((n) => n + 1);
    };
    window.addEventListener('open-cookie-banner', handler);
    return () => window.removeEventListener('open-cookie-banner', handler);
  }, []);

  useEffect(() => {
    if (openRequest > 0) cardRef.current?.focus();
  }, [openRequest]);

  useEffect(() => {
    const el = panelRef.current;
    const vv = window.visualViewport;
    if (!visible || !el || !vv) return;
    let frame = 0;
    const fit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => fitToVisualViewport(el));
    };
    fitToVisualViewport(el);
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
    window.addEventListener('resize', fit);
    return () => {
      cancelAnimationFrame(frame);
      vv.removeEventListener('resize', fit);
      vv.removeEventListener('scroll', fit);
      window.removeEventListener('resize', fit);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={panelRef} className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div
        ref={cardRef}
        role="region"
        aria-labelledby="cookie-banner-title"
        tabIndex={-1}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-200 p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 id="cookie-banner-title" className="text-lg font-heading font-bold text-future-dusk-900">
            {t('title')}
          </h2>
          <button
            onClick={rejectAll}
            className="text-future-dusk-400 hover:text-future-dusk-600 transition-colors shrink-0"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-future-dusk-600 mb-5 leading-relaxed">
          {t('description')}
        </p>

        {/* Detail panel */}
        {showDetails && (
          <div className="mb-5 space-y-3">
            {/* Necessary - always on */}
            <label className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 p-4">
              <div>
                <p className="text-sm font-semibold text-future-dusk-900">{t('necessary')}</p>
                <p className="text-xs text-future-dusk-500 mt-0.5">{t('necessaryDesc')}</p>
              </div>
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 rounded accent-very-peri-500"
              />
            </label>

            {/* Analytics */}
            <label className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 p-4 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-future-dusk-900">{t('analytics')}</p>
                <p className="text-xs text-future-dusk-500 mt-0.5">{t('analyticsDesc')}</p>
              </div>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                className="h-4 w-4 rounded accent-very-peri-500"
              />
            </label>

            {/* Contenus externes (vidéos YouTube) */}
            <label className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 p-4 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-future-dusk-900">{t('externalMedia')}</p>
                <p className="text-xs text-future-dusk-500 mt-0.5">{t('externalMediaDesc')}</p>
              </div>
              <input
                type="checkbox"
                checked={consent.externalMedia}
                onChange={(e) => setConsent(prev => ({ ...prev, externalMedia: e.target.checked }))}
                className="h-4 w-4 rounded accent-very-peri-500"
              />
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={acceptAll}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-very-peri-500 hover:bg-very-peri-600 text-white transition-colors"
          >
            {t('acceptAll')}
          </button>
          <button
            onClick={rejectAll}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-transparent border border-future-dusk-300 text-future-dusk-600 hover:bg-neutral-50 transition-colors"
          >
            {t('rejectAll')}
          </button>
          {!showDetails ? (
            <button
              onClick={() => setShowDetails(true)}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-very-peri-600 underline underline-offset-2 hover:text-very-peri-700 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <Settings className="h-3.5 w-3.5" />
              {t('customize')}
            </button>
          ) : (
            <button
              onClick={saveCustom}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-transparent border border-very-peri-300 text-very-peri-600 hover:bg-very-peri-50 transition-colors"
            >
              {t('saveChoices')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
