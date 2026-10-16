import { trackEvent } from '@/lib/analytics';
import { getAttribution, type Attribution } from '@/lib/attribution';
import { PAGE_SOURCE_OCCASION, type ReponseRecherche } from '@/lib/occasion/schema';
import type { LangueOccasion } from '@/lib/occasion/langues';

/**
 * Événements GA4 de la landing occasion (mission S0 du 11/10/2026), sur le
 * modèle de la landing catalogue (`components/landings/catalogue-all-in-one/mesure.ts`) :
 * - `form_submit` (`form_name: 'occasion_recherche'`) : UNIQUEMENT quand la route a
 *   confirmé la notification interne (`ok: true`), une seule fois par demande ;
 * - `form_error` (`form_name: 'occasion_recherche'`, `reason`) : tout échec.
 * `trackEvent` n'émet rien sans consentement analytique. Une conversion GA4 ne
 * prouve pas la réception humaine : la notification interne est le fait déclencheur.
 *
 * Aucune donnée personnelle : ni e-mail, ni prénom, ni entreprise, ni téléphone,
 * ni besoin, ni budget, ni commentaire. Seulement des drapeaux et l'attribution de
 * session réduite (chemin sans paramètres, domaine du referrer, utm_* écartés
 * s'ils contiennent un « @ »).
 */
export const FORM_NAME_OCCASION = 'occasion_recherche';

type Parametres = Record<string, string>;
const MAX_VALEUR = 100;

function valeurSure(valeur: string | undefined): string | undefined {
  if (!valeur) return undefined;
  const v = valeur.trim();
  if (!v || v.includes('@')) return undefined;
  return v.slice(0, MAX_VALEUR);
}

function cheminSeul(page: string | undefined): string | undefined {
  return page ? valeurSure(page.split(/[?#]/)[0]) : undefined;
}

function domaineSeul(referrer: string | undefined): string | undefined {
  if (!referrer) return undefined;
  try {
    return valeurSure(new URL(referrer).hostname);
  } catch {
    return undefined;
  }
}

/** Paramètres de contexte, sans donnée personnelle. */
export function parametresContexteOccasion(attribution: Attribution | null, langue: LangueOccasion = 'fr'): Parametres {
  const a = attribution ?? {};
  const brut: Record<string, string | undefined> = {
    form_name: FORM_NAME_OCCASION,
    page_type: 'landing_occasion',
    locale: langue,
    page_source: PAGE_SOURCE_OCCASION,
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

/** Événements à émettre pour une réponse de `/api/occasion` (fonction pure, testée). */
export function evenementsReponseOccasion(
  reponse: ReponseRecherche | null,
  referencePreselectionnee: boolean,
): Array<{ nom: string; parametres: Parametres }> {
  if (reponse?.ok === true) {
    return [
      {
        nom: 'form_submit',
        parametres: {
          ack_sent: String(reponse.ackSent),
          reference_preselected: referencePreselectionnee ? 'yes' : 'no',
        },
      },
    ];
  }
  const reason = reponse?.ok === false ? reponse.error : 'technical';
  return [{ nom: 'form_error', parametres: { reason } }];
}

export function mesurerReponseOccasion(reponse: ReponseRecherche | null, referencePreselectionnee: boolean, langue: LangueOccasion = 'fr') {
  const base = parametresContexteOccasion(getAttribution(), langue);
  for (const { nom, parametres } of evenementsReponseOccasion(reponse, referencePreselectionnee)) {
    trackEvent(nom, { ...base, ...parametres });
  }
}
