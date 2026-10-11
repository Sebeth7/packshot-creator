import { domaineGrandPublic } from '@/lib/catalogue/fiche';
import type { DemandeRecherche } from './schema';

/**
 * Fiche `[Occasion]` d'une demande de recherche, portée par la notification
 * interne (`resend.ts`). Une ligne « Clé : valeur » par information, lisible par
 * Sébastien comme par son assistant. Aucun CRM en V1 (mission S0 du 11/10/2026) :
 * la notification est le point de remise de la demande.
 *
 * Aucune promesse : ni disponibilité, ni prix, ni délai. La notification part
 * AVANT l'accusé de réception au prospect : son sort n'est donc pas connu ici.
 */
export function lignesFicheOccasion(d: DemandeRecherche): string[] {
  const a = d.attribution;
  const grandPublic = domaineGrandPublic(d.email);
  return [
    "[Occasion] Recherche d'un studio Orbitvu d'occasion",
    "Type : demande de recherche d'équipement d'occasion. Ni une demande de démonstration, ni un projet d'équipement neuf.",
    `Prénom : ${d.firstName}`,
    `E-mail : ${d.email}`,
    grandPublic ? `E-mail : domaine grand public (${grandPublic})` : null,
    d.telephone ? `Téléphone : ${d.telephone}` : 'Téléphone : non indiqué',
    `Entreprise : ${d.company}`,
    `Besoin : ${d.besoin}`,
    d.famille ? `Famille recherchée : ${d.famille}` : null,
    d.reference ? `Machine présélectionnée : ${d.reference} (disponible au registre lors de la demande)` : 'Machine présélectionnée : aucune',
    d.budget ? `Budget HT indicatif : ${d.budget}` : 'Budget HT indicatif : non indiqué',
    d.horizon ? `Horizon d'achat : ${d.horizon}` : "Horizon d'achat : non indiqué",
    d.commentaire ? `Commentaire : ${d.commentaire}` : null,
    `Page : ${d.pageSource}`,
    a?.utmSource ? `Source : ${a.utmSource}` : null,
    a?.utmMedium ? `Medium : ${a.utmMedium}` : null,
    a?.utmCampaign ? `Campagne : ${a.utmCampaign}` : null,
    a?.utmTerm ? `Terme : ${a.utmTerm}` : null,
    a?.utmContent ? `Contenu : ${a.utmContent}` : null,
    a?.referrer ? `Referrer : ${a.referrer}` : null,
    a?.landingPage ? `Première page : ${a.landingPage}` : null,
    `Reçue le : ${d.recueLe}`,
    `Identifiant : ${d.requestId}`,
    "Accusé de réception au prospect : envoyé après cette notification ; un échec est journalisé avec l'identifiant, sans donnée personnelle.",
  ].filter((ligne): ligne is string => ligne !== null);
}
