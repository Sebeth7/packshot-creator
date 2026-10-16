import { gestionnaires } from '@/lib/occasion/alertes/instance';

/** Désinscription de la liste Occasion seulement : newsletter et autres préférences inchangées. */

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  return gestionnaires.desinscription(req);
}
