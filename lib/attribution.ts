/**
 * Attribution first-touch de session (mesure GEO/SEO).
 * Capture les utm_* et le referrer externe à l'atterrissage, les persiste en
 * sessionStorage, et les expose pour les soumissions de formulaires
 * (/api/contact, /api/roi-pdf) afin d'attribuer les leads à leur source
 * (trafic IA : chatgpt.com, perplexity.ai… / SEO / campagnes).
 */

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  /** Referrer externe du premier hit de la session */
  referrer?: string;
  /** Première page vue de la session (path + query) */
  landingPage?: string;
}

const STORAGE_KEY = 'pkc_attribution';

const UTM_KEYS: Array<[param: string, field: keyof Attribution]> = [
  ['utm_source', 'utmSource'],
  ['utm_medium', 'utmMedium'],
  ['utm_campaign', 'utmCampaign'],
  ['utm_term', 'utmTerm'],
  ['utm_content', 'utmContent'],
];

function isExternalReferrer(referrer: string): boolean {
  if (!referrer) return false;
  try {
    return new URL(referrer).hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

/**
 * À appeler au premier rendu client. First-touch : ne réécrit pas une
 * attribution déjà capturée dans la session, sauf si de nouveaux utm_*
 * arrivent (nouvelle campagne → on met à jour).
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some(([param]) => params.get(param));
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing && !hasUtm) return;

    const attribution: Attribution = existing ? JSON.parse(existing) : {};

    for (const [param, field] of UTM_KEYS) {
      const value = params.get(param);
      if (value) attribution[field] = value.slice(0, 200);
    }
    if (!attribution.referrer && isExternalReferrer(document.referrer)) {
      attribution.referrer = document.referrer.slice(0, 500);
    }
    if (!attribution.landingPage) {
      attribution.landingPage = (window.location.pathname + window.location.search).slice(0, 500);
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage indisponible (navigation privée stricte…) : best-effort
  }
}

/** Attribution de la session courante, ou null si rien n'a été capturé. */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    return Object.keys(parsed).length > 0 ? parsed : null;
  } catch {
    return null;
  }
}
