import { createClient } from 'next-sanity';

/**
 * Client pour le contenu PUBLIC (formations, blog, pages)
 * - Pas de token requis (dataset "production" est public)
 * - Utilise le CDN Sanity pour de meilleures performances
 * - Utilisé pour afficher le catalogue de formations, articles de blog, etc.
 */
export const contentClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // CDN activé pour le contenu public
});

/**
 * Client pour les données PRIVÉES (commandes, clients, abonnements)
 * - Requiert un token valide
 * - N'utilise PAS le CDN (données sensibles)
 * - À utiliser UNIQUEMENT côté serveur (API Routes, Server Components)
 *
 * ⚠️ IMPORTANT : Dataset "private" pas encore créé
 * À créer sur Sanity.io quand vous ajouterez les fonctionnalités de commande
 */
export const dataClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_PRIVATE_DATASET || 'private', // Dataset privé (à créer)
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false, // Pas de CDN pour données sensibles
  token: process.env.SANITY_PRIVATE_TOKEN, // Token pour dataset privé (à générer)
});

/**
 * Alias pour rétrocompatibilité
 * @deprecated Préférer contentClient ou dataClient selon le besoin
 */
export const client = contentClient;
