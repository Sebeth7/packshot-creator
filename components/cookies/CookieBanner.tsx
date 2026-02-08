'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Settings, X } from 'lucide-react';

type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
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
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return consent?.analytics === true;
}

/** Dispatch a custom event so GoogleAnalytics component can react */
function dispatchConsentUpdate(consent: ConsentCategories) {
  window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: consent }));
}

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentCategories>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

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
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  }, [saveConsent]);

  const saveCustom = useCallback(() => {
    saveConsent(consent);
  }, [consent, saveConsent]);

  /** Called from footer link to reopen banner */
  useEffect(() => {
    const handler = () => {
      const existing = getConsent();
      if (existing) setConsent(existing);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener('open-cookie-banner', handler);
    return () => window.removeEventListener('open-cookie-banner', handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-neutral-200 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-lg font-heading font-bold text-future-dusk-900">
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

            {/* Marketing */}
            <label className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-100 p-4 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-future-dusk-900">{t('marketing')}</p>
                <p className="text-xs text-future-dusk-500 mt-0.5">{t('marketingDesc')}</p>
              </div>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent(prev => ({ ...prev, marketing: e.target.checked }))}
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
