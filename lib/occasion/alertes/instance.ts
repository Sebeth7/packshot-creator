import { rateLimit } from '@/lib/rate-limit';
import { creerGestionnairesAlertes } from './gestionnaires';
import { servicesAlertes } from './services';

/**
 * Instance partagée par les trois routes `/api/occasion/alertes/**` (serveur
 * seulement). Limites par adresse IP et par heure, en mémoire de l'instance :
 * 5 inscriptions (comme `/api/occasion`), 20 confirmations ou désinscriptions.
 */
const HEURE_MS = 60 * 60 * 1000;
const LIMITE_INSCRIPTION = 5;
const LIMITE_JETON = 20;

export const services = servicesAlertes();

export const gestionnaires = creerGestionnairesAlertes({
  services,
  limiter: (cle) => rateLimit(cle, cle.startsWith('occasion-alertes-jeton:') ? LIMITE_JETON : LIMITE_INSCRIPTION, HEURE_MS),
});
