/**
 * Prix publics des machines : mensualité de leasing (décision Seb 24/07/2026).
 *
 * Règle : coût total du financement = prix d'achat × LEASING_RATIO, étalé sur
 * LEASING_MONTHS, arrondi au multiple de 5 supérieur. Affichage « à partir de
 * X €/mois » ; pages de-ch en CHF (taux moyen constaté, à réviser avec la grille).
 *
 * La grille des prix d'achat (source) vit dans
 * components/calculators/ROICalculator/lib/machines.ts (champ `prix`) et est
 * maintenue par Seb. PRICE_VALID_UNTIL, exigé par Google dans le balisage
 * Offer, n'est plus une date figée : il glisse de lui-même à chaque build.
 */

export const LEASING_RATIO = 1.3;
export const LEASING_MONTHS = 60;
/** Moyenne EUR→CHF constatée juillet 2026 (0,9155 le 01/07 → 0,929 le 23/07). */
export const EUR_CHF_RATE = 0.93;
/**
 * Fin de validité du prix affiché, exigée par Google dans le balisage `Offer` :
 * 31 décembre de l'année suivant celle du build.
 *
 * Calculée au chargement du module — donc au build pour les pages prérendues —
 * et non écrite en dur : une date figée expire en silence et les fiches
 * passent en avertissement dans Search Console sans que rien ne le signale.
 * Un build du 20/09/2026 produit `2027-12-31`.
 *
 * Aucun prix, aucune devise, aucune mensualité n'est touché par ce calcul.
 */
export const PRICE_VALID_UNTIL = `${new Date().getFullYear() + 1}-12-31`;

export type PriceCurrency = 'EUR' | 'CHF';

export function currencyForLang(lang: string): PriceCurrency {
  return lang === 'de-ch' ? 'CHF' : 'EUR';
}

/**
 * Mensualité de leasing arrondie, ou null si machine sur devis (prix absent/0).
 * Règle Seb 07/08/2026 : prix × 1,3 ÷ nombre de mensualités (60 par défaut
 * pour l'affichage public des fiches) — toujours présentée comme une
 * estimation à faire valider par le service commercial.
 */
export function leasingMonthly(
  prixAchat: number,
  currency: PriceCurrency = 'EUR',
  months: number = LEASING_MONTHS
): number | null {
  if (!prixAchat || prixAchat <= 0 || months <= 0) return null;
  const monthlyEur = (prixAchat * LEASING_RATIO) / months;
  const monthly = currency === 'CHF' ? monthlyEur * EUR_CHF_RATE : monthlyEur;
  return Math.ceil(monthly / 5) * 5;
}

/** « 335 €/mois », "€335/month", « CHF 315.–/Monat » selon la locale. */
export function formatLeasingMonthly(amount: number, lang: string): string {
  if (lang === 'de-ch') return `CHF ${amount.toLocaleString('de-CH')}.–/Monat`;
  if (lang === 'en') return `€${amount.toLocaleString('en-GB')}/month`;
  return `${amount.toLocaleString('fr-FR')} €/mois`;
}
