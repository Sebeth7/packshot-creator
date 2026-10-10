import type { MachineOccasion } from './machines';

/**
 * Les trois exemples FICTIFS de la maquette V4.1 (10/10/2026), pour le contrôle
 * interne de l'état « machines disponibles ». Ce ne sont pas des offres :
 * - servis seulement par la vue /fr/studios-photo-automatises/opportunites/exemples-fictifs,
 *   jamais en production (`exemplesFictifsServis`, lib/occasion/activation.ts) ;
 * - marqués `fictif: true` : bandeau « Exemples fictifs – aucune offre réelle » et
 *   pastille « Exemple fictif » sur chaque carte ;
 * - photos d'illustration, jamais présentées comme celles d'une unité disponible.
 *
 * Photos : recadrages de la V4.1 tirés de photos du showroom déjà présentes dans
 * le dépôt (`blog/67dbae6ac24274cca942103f.avif`, `guides/67d99183a2299f1c17eaaa90.avif`),
 * droits non établis ; exemple 3 : `machines/alphastudio-xxl/hero.avif`, droits
 * confirmés (JOURNAL), à la place de la vignette de salon Orbitvu de la V4.1
 * (personnes visibles, accord d'OVTECH non obtenu, fichier absent du dépôt).
 *
 * `statutConfirmeLe` prend la date du rendu : l'exemple n'a pas de date réelle.
 */
export function exemplesFictifs(maintenant: Date = new Date()): MachineOccasion[] {
  const jour = maintenant.toISOString().slice(0, 10);
  const commun = {
    statut: 'disponible' as const,
    statutConfirmeLe: jour,
    etat: 'Exemple fictif',
    verifications: 'Exemple fictif',
    logiciel: { licence: 'Exemple fictif' },
    garantie: {
      garant: 'Exemple fictif',
      duree: 'Exemple fictif',
      pointDeDepart: 'Exemple fictif',
      exclusions: 'Exemple fictif',
    },
    fictif: true,
  };
  return [
    {
      ...commun,
      ref: 'OCC-01',
      modeleId: 'alphadesk',
      origine: 'showroom',
      origineDetail: 'Showroom PackshotCreator',
      usage: 'Exposition et démonstrations',
      historique: 'Exemple fictif',
      photos: [{ src: '/images/occasion/exemple-alphadesk.avif', alt: '', credit: "Photo d'illustration" }],
    },
    {
      ...commun,
      ref: 'OCC-02',
      modeleId: 'alphashot-micro-v2',
      origine: 'demonstration',
      origineDetail: 'Démonstrations clients',
      usage: 'Bijoux et horlogerie',
      historique: 'Exemple fictif',
      photos: [{ src: '/images/occasion/exemple-micro.avif', alt: '', credit: "Photo d'illustration" }],
    },
    {
      ...commun,
      ref: 'OCC-03',
      modeleId: 'alphastudio-xxl-v2',
      origine: 'salon',
      origineDetail: 'Salon professionnel',
      usage: 'Présentation sur stand',
      historique: 'Exemple fictif',
      photos: [{ src: '/images/machines/alphastudio-xxl/hero.avif', alt: '', credit: "Photo d'illustration" }],
    },
  ];
}
