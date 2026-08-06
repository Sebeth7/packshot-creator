/**
 * Dossier vivant du mode public (UX_PROPOSITION_ROI_PUBLIC.md §2).
 *
 * Le modèle matérialise chaque information de qualification captée via le
 * tool update_dossier ; la route relaie l'input en événement SSE
 * {type:'dossier', dossier} et le client fusionne dans son état. Types et
 * fusion sont partagés serveur/client pour rester alignés avec le schéma
 * JSON du tool (tools.ts).
 */

export interface RoiPublicDossier {
  /** Secteur d'activité (ex. cosmétique, horlogerie) */
  secteur?: string;
  /** Situation actuelle : production interne, prestataire, mixte, création d'activité */
  situation?: string;
  /** Produits/an visés */
  volumeAnnuel?: number;
  /** Croissance prévue (texte libre court) */
  croissance?: string;
  /** Types de contenu : packshot, 360°, vidéo… */
  typesContenu?: string[];
  /** Taille des produits (petit / moyen / grand / très grand + précision) */
  tailleProduits?: string;
  /** Prestataire externe : budget, prix/photo, part du flux */
  prestataire?: string;
  /** Temps interne : personnes, part du temps, coût employeur */
  tempsInterne?: string;
  /** Financement : achat, leasing (mensualité/durée si connues) */
  financement?: string;
  /** Modèle envisagé ou recommandé */
  machineEnvisagee?: string;
  /** Autres informations notables (systèmes cibles, contraintes…) */
  autres?: string[];
}

/** Checklist affichée dans le panneau — ordre de la proposition UX. */
export const DOSSIER_CHECKLIST: Array<{ key: keyof RoiPublicDossier; label: string }> = [
  { key: 'secteur', label: 'Secteur' },
  { key: 'situation', label: 'Situation actuelle' },
  { key: 'volumeAnnuel', label: 'Volume annuel' },
  { key: 'typesContenu', label: 'Types de contenu' },
  { key: 'tailleProduits', label: 'Taille des produits' },
  { key: 'prestataire', label: 'Prestataire externe' },
  { key: 'tempsInterne', label: 'Temps interne' },
  { key: 'financement', label: 'Financement' },
];

/** Champs additionnels affichés seulement s'ils sont renseignés. */
export const DOSSIER_EXTRAS: Array<{ key: keyof RoiPublicDossier; label: string }> = [
  { key: 'croissance', label: 'Croissance prévue' },
  { key: 'machineEnvisagee', label: 'Modèle envisagé' },
];

/** Fusion d'une mise à jour partielle (les champs fournis écrasent). */
export function mergeDossier(
  current: RoiPublicDossier,
  update: Partial<RoiPublicDossier>
): RoiPublicDossier {
  const next: RoiPublicDossier = { ...current };
  for (const [key, value] of Object.entries(update)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    (next as Record<string, unknown>)[key] = value;
  }
  return next;
}

/** Valeur d'affichage d'un champ du dossier (null si absent). */
export function formatDossierValue(
  dossier: RoiPublicDossier,
  key: keyof RoiPublicDossier
): string | null {
  const value = dossier[key];
  if (value === undefined) return null;
  if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : null;
  if (typeof value === 'number') {
    return `${value.toLocaleString('fr-FR')}${key === 'volumeAnnuel' ? ' produits/an' : ''}`;
  }
  return String(value);
}

/** Nettoyage/validation basique de l'input du tool update_dossier (serveur). */
export function sanitizeDossierUpdate(input: unknown): Partial<RoiPublicDossier> {
  if (typeof input !== 'object' || input === null) return {};
  const raw = input as Record<string, unknown>;
  const out: Partial<RoiPublicDossier> = {};
  const str = (v: unknown): string | undefined =>
    typeof v === 'string' && v.trim() !== '' ? v.trim().slice(0, 200) : undefined;

  out.secteur = str(raw.secteur);
  out.situation = str(raw.situation);
  out.croissance = str(raw.croissance);
  out.tailleProduits = str(raw.tailleProduits);
  out.prestataire = str(raw.prestataire);
  out.tempsInterne = str(raw.tempsInterne);
  out.financement = str(raw.financement);
  out.machineEnvisagee = str(raw.machineEnvisagee);
  if (typeof raw.volumeAnnuel === 'number' && Number.isFinite(raw.volumeAnnuel) && raw.volumeAnnuel > 0) {
    out.volumeAnnuel = Math.round(raw.volumeAnnuel);
  }
  if (Array.isArray(raw.typesContenu)) {
    const list = raw.typesContenu.filter((v): v is string => typeof v === 'string').map((v) => v.slice(0, 50));
    if (list.length > 0) out.typesContenu = list.slice(0, 10);
  }
  if (Array.isArray(raw.autres)) {
    const list = raw.autres.filter((v): v is string => typeof v === 'string').map((v) => v.slice(0, 200));
    if (list.length > 0) out.autres = list.slice(0, 10);
  }
  // Retire les clés restées undefined pour une fusion propre
  for (const key of Object.keys(out) as Array<keyof RoiPublicDossier>) {
    if (out[key] === undefined) delete out[key];
  }
  return out;
}
