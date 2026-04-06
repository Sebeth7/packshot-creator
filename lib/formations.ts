// lib/formations.ts — Local JSON formation data (migrated from Sanity)

import fs from 'fs';
import path from 'path';

export interface Formation {
  titre: string;
  slug: string;
  categorie: 'packshot' | 'ia';
  niveau: 1 | 2 | 3;
  format: 'blended' | 'presentiel' | 'both';
  prix_blended?: number | null;
  prix_presentiel: number;
  duree_heures: number;
  description_courte: string;
  programme: any[]; // Portable Text blocks (rendered as-is)
  objectifs: string[];
  public_cible: string;
  prerequis?: string;
  eligible_opco: boolean;
  livrables?: string[];
}

const FORMATIONS_DIR = path.join(process.cwd(), 'content', 'formations');

/**
 * Get a single formation by slug
 */
export function getFormation(slug: string): Formation | null {
  const filePath = path.join(FORMATIONS_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Formation;
}

/**
 * Get all formations
 */
export function getAllFormations(): Formation[] {
  if (!fs.existsSync(FORMATIONS_DIR)) return [];

  return fs
    .readdirSync(FORMATIONS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const raw = fs.readFileSync(path.join(FORMATIONS_DIR, f), 'utf-8');
      return JSON.parse(raw) as Formation;
    })
    .sort((a, b) => a.niveau - b.niveau);
}
