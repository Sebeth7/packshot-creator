/**
 * Modules pédagogiques interactifs des previews AI Act (B1-B3, C1-C2, D1-D3).
 *
 * Sources : `content/revue-interne/ai-act/modules/<id>/` — `module.json` et
 * `etat_XX.svg`, copiés à l'octet près du ZIP
 * `PSC_AI_ACT_BCD_COMPLET_ANIMATIONS_PATCH_2026-10-02` (dossier `03_ANIMATIONS`).
 * Les `poster.svg` du ZIP, identiques à `etat_01.svg`, ne sont pas repris.
 *
 * Les SVG sont incorporés aux pages en URI `data:` au moment de la build : aucun
 * fichier dans `public/`, aucune route d'asset. Ils n'existent donc que dans le
 * HTML des previews, elles-mêmes en 404 hors Preview (garde `revueInterneAutorisee`).
 *
 * Tous les états sont des schémas conceptuels : ni photographie de référence,
 * ni preuve de fidélité au produit, ni résultat de mesure.
 */
import fs from 'node:fs';
import path from 'node:path';

const DOSSIER = path.join(process.cwd(), 'content/revue-interne/ai-act/modules');

/** Format de `module.json` dans le ZIP (champs utilisés seulement). */
interface ModuleSource {
  id: string;
  article: string;
  section: string;
  title: string;
  caption: string;
  alt: string;
  status: string;
  steps: [string, string][];
}

export interface EtapeModule {
  nom: string;
  description: string;
  /** SVG de l'étape, en URI `data:`. */
  image: string;
}

export interface ModuleRevue {
  id: string;
  /** Slug de la preview qui l'accueille : retouche, mannequins, metadonnees. */
  article: string;
  /** Intertitre H2 sous lequel le module est placé (contrôle de cohérence). */
  section: string;
  titre: string;
  legende: string;
  alt: string;
  /** « SOURCE GRAPHIQUE ATTENDUE » (B, C) ou « FONCTIONNEL PROVISOIRE » (D). */
  statut: string;
  etapes: EtapeModule[];
}

function versUriData(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
}

function lireModule(id: string): ModuleRevue {
  const dossier = path.join(DOSSIER, id);
  const source = JSON.parse(fs.readFileSync(path.join(dossier, 'module.json'), 'utf8')) as ModuleSource;
  if (source.id !== id) throw new Error(`module.json incohérent : ${id} déclare ${source.id}`);
  const etapes = source.steps.map(([nom, description], i) => {
    const fichier = path.join(dossier, `etat_${String(i + 1).padStart(2, '0')}.svg`);
    if (!fs.existsSync(fichier)) throw new Error(`SVG manquant pour ${id}, étape ${i + 1}`);
    return { nom, description, image: versUriData(fs.readFileSync(fichier, 'utf8')) };
  });
  return {
    id,
    article: source.article,
    section: source.section,
    titre: source.title,
    legende: source.caption,
    alt: source.alt,
    statut: source.status,
    etapes,
  };
}

/** Modules d'une preview, dans l'ordre de leurs identifiants. */
export function lireModules(article: string): Map<string, ModuleRevue> {
  const ids = fs
    .readdirSync(DOSSIER)
    .filter((id) => fs.statSync(path.join(DOSSIER, id)).isDirectory())
    .sort();
  const modules = ids.map(lireModule).filter((m) => m.article === article);
  return new Map(modules.map((m) => [m.id, m]));
}
