import { gestionnaires } from '@/lib/occasion/alertes/instance';

/** Confirmation d'inscription (clic sur le bouton de la page, jamais à l'ouverture du lien). */

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  return gestionnaires.confirmation(req);
}
