import { trackEvent } from '@/lib/analytics';
import { getAttribution, type Attribution } from '@/lib/attribution';
import { BROCHURE_ID, LANGUE_CATALOGUE, PAGE_SOURCE_CATALOGUE, type ReponseCatalogue } from '@/lib/catalogue/schema';

/**
 * Événements GA4 de la landing catalogue, alignés sur les règles brochure de
 * Sébastien (§ 6) et sur les conventions de `lib/analytics.ts` :
 * - `form_submit` (`form_name: 'brochure_form'`) : demande ACCEPTÉE par le
 *   serveur, une seule fois par demande ; la demande de consultant y est un
 *   paramètre (`consultant_request`), pas un second événement, pour ne pas
 *   compter deux conversions pour une seule demande ;
 * - `brochure_download` : clic sur « Ouvrir le catalogue » ;
 * - `form_error` (`form_name: 'brochure_form'`, `reason`) : échec, sur le modèle
 *   de `form_submit` (aucun événement d'échec n'existait sur le site).
 * `trackEvent` n'émet rien sans consentement analytique (gtag absent tant que le
 * visiteur n'a pas accepté). La notification interne recense les leads
 * brochure ; GA4 en explique l'origine.
 *
 * Aucune donnée personnelle : ni e-mail, ni prénom, ni entreprise, ni produits.
 * Seulement le pays choisi, l'emplacement du formulaire et l'attribution de la
 * session, réduite : chemin de la première page sans paramètres, domaine du
 * referrer sans chemin, utm_* écartés s'ils contiennent un « @ ».
 */
export const FORM_NAME = 'brochure_form';

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
    brochure_id: BROCHURE_ID,
    page_type: 'landing_catalogue',
    locale: LANGUE_CATALOGUE,
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
  consultantDemande = false,
): Array<{ nom: string; parametres: Record<string, string> }> {
  if (reponse?.ok === true) {
    // En simulation locale, rien n'a été accepté : aucun événement de succès.
    if (reponse.simulated) return [];
    return [
      {
        nom: 'form_submit',
        parametres: {
          country,
          email_sent: String(reponse.emailSent),
          // accepted : transmis à l'équipe ; not_confirmed : demandé, transmission en échec ; none : non demandé.
          consultant_request: reponse.contactRequestAccepted ? 'accepted' : consultantDemande ? 'not_confirmed' : 'none',
        },
      },
    ];
  }
  const reason = reponse?.ok === false ? reponse.error : 'technical';
  return [{ nom: 'form_error', parametres: { reason } }];
}

export function mesurerReponse(reponse: ReponseCatalogue | null, country: Pays, consultantDemande = false) {
  const base = contexte();
  for (const { nom, parametres } of evenementsReponse(reponse, country, consultantDemande)) {
    trackEvent(nom, { ...base, ...parametres });
  }
}

/** Clic sur « Ouvrir le catalogue » (état de succès) : `brochure_download`. */
export function mesurerOuverturePdf() {
  trackEvent('brochure_download', contexte());
}

export function mesurerAppel(country_target: Pays, location: LieuClic) {
  trackEvent('catalogue_click_to_call', { form_name: FORM_NAME, country_target, location });
}
