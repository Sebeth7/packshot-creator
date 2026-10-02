import fs from 'node:fs';
import path from 'node:path';
import { revueInterneAutorisee } from '@/lib/revue-interne/acces';
import { DOSSIER_VISUELS, fichiersIllustrations } from '../../donnees';

/**
 * AVIF des illustrations des previews internes AI Act (B, C, D).
 *
 * Mêmes conditions que les pages : fichiers générés sur une Preview Vercel ou
 * en développement local seulement ; 404 en production, en CI et hors Vercel
 * (`generateStaticParams` vide, `dynamicParams = false`). Les sources restent
 * dans `content/revue-interne/ai-act/visuels/`, hors de `public/` : le site
 * public ne les sert jamais. Seuls les fichiers référencés par les trois JSON
 * sont servis.
 */

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  if (!revueInterneAutorisee('fr', process.env)) return [];
  return fichiersIllustrations().map((fichier) => ({ lang: 'fr', fichier }));
}

export async function GET(_requete: Request, { params }: { params: Promise<{ lang: string; fichier: string }> }) {
  const { lang, fichier } = await params;
  if (!revueInterneAutorisee(lang, process.env) || !fichiersIllustrations().includes(fichier)) {
    return new Response('Introuvable', { status: 404 });
  }
  const contenu = new Uint8Array(fs.readFileSync(path.join(DOSSIER_VISUELS, fichier)));
  return new Response(contenu, {
    headers: {
      'Content-Type': 'image/avif',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
