import { trackEvent } from '@/lib/analytics';
import { getAttribution, type Attribution } from '@/lib/attribution';
import { PAGE_SOURCE_CATALOGUE, type ReponseCatalogue } from '@/lib/catalogue/schema';

/**
 * Événements GA4 de la landing catalogue. `trackEvent` n'émet rien sans
 * consentement analytique (gtag absent tant que le visiteur n'a pas accepté).
 * Pipedrive compte les demandes ; GA4 en explique l'origine.
 *
 * Aucune donnée personnelle : ni e-mail, ni prénom, ni entreprise, ni produits.
 * Seulement le pays choisi, l'emplacement du formulaire et l'attribution de la
 * session, réduite : chemin de la première page sans paramètres, domaine du
 * referrer sans chemin, utm_* écartés s'ils contiennent un « @ ».
 * KPI principal : `catalogue_request_accepted`, émis après réponse acceptée du
 * serveur, jamais au clic ni en simulation.
 */
export const FORM_NAME = 'catalogue_all_in_one';

/** Emplacement du formulaire. Un futur CTA ailleurs sur le site portera son propre emplacement (utm_content). */
export const EMPLACEMENT_FORMULAIRE = 'landing_catalogue_formulaire';

export type LieuClic = 'hero' | 'formulaire' | 'consultant';
type Pays = 'FR' | 'CH';
type Parametres = Record<string, string>;

const MAX_VALEUR = 100;

function valeurSure(valeur: string | undefined): string | undefined {
  if (!valeur) return undefined;
  const v = valeur.trim();
  if (!v || v.includes('@')) return undefined;
  return v.slice(0, MAX_VALEUR);
}

function cheminSeul(page: string | undefined): string | undefined {
  if (!page) return undefined;
  return valeurSure(page.split(/[?#]/)[0]);
}

function domaineSeul(referrer: string | undefined): string | undefined {
  if (!referrer) return undefined;
  try {
    return valeurSure(new URL(referrer).hostname);
  } catch {
    return undefined;
  }
}

/** Paramètres de contexte communs aux événements de la landing, sans donnée personnelle. */
export function parametresContexte(attribution: Attribution | null): Parametres {
  const a = attribution ?? {};
  const brut: Record<string, string | undefined> = {
    form_name: FORM_NAME,
    page_source: PAGE_SOURCE_CATALOGUE,
    cta_location: EMPLACEMENT_FORMULAIRE,
    utm_source: valeurSure(a.utmSource),
    utm_medium: valeurSure(a.utmMedium),
    utm_campaign: valeurSure(a.utmCampaign),
    utm_term: valeurSure(a.utmTerm),
    utm_content: valeurSure(a.utmContent),
    first_landing_path: cheminSeul(a.landingPage),
    referrer_host: domaineSeul(a.referrer),
  };
  return Object.fromEntries(Object.entries(brut).filter((e): e is [string, string] => e[1] !== undefined));
}

function contexte(): Parametres {
  return parametresContexte(getAttribution());
}

/** Événements à émettre pour une réponse de `/api/catalogue` (fonction pure, testée). */
export function evenementsReponse(
  reponse: ReponseCatalogue | null,
  country: Pays,
): Array<{ nom: string; parametres: Record<string, string> }> {
  if (reponse?.ok === true) {
    // En simulation locale, rien n'a été accepté : aucun événement de succès.
    if (reponse.simulated) return [];
    return [
      { nom: 'catalogue_request_accepted', parametres: { country, email_sent: String(reponse.emailSent) } },
      ...(reponse.contactRequestAccepted ? [{ nom: 'consultant_request_accepted', parametres: { country } }] : []),
    ];
  }
  const reason = reponse?.ok === false ? reponse.error : 'technical';
  return [{ nom: 'catalogue_request_failed', parametres: { reason } }];
}

export function mesurerReponse(reponse: ReponseCatalogue | null, country: Pays) {
  const base = contexte();
  for (const { nom, parametres } of evenementsReponse(reponse, country)) trackEvent(nom, { ...base, ...parametres });
}

export function mesurerOuverturePdf() {
  trackEvent('catalogue_pdf_open_click', contexte());
}

export function mesurerAppel(country_target: Pays, location: LieuClic) {
  trackEvent('catalogue_click_to_call', { form_name: FORM_NAME, country_target, location });
}
