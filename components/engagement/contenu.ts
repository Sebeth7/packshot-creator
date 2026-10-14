/**
 * Textes de la pop-in d'engagement : copy validée par Laurent le 09/10/2026,
 * reprise mot pour mot. FR seulement (V1). Hors de `messages/*.json` : ces
 * fichiers sont sérialisés dans le flux RSC de chaque page, y compris les
 * pages gelées ; ici, les textes ne sont chargés qu'à l'ouverture.
 */
export const COPY = {
  surtitre: 'Pas encore prêt pour une démo ?',
  titre: 'Découvrez ce qu’Orbitvu peut apporter à votre production visuelle.',
  texteAvant:
    'Si vous êtes encore en phase d’exploration, recevez le catalogue Orbitvu All-in-One et découvrez ce qu’un ',
  texteGras: 'studio automatisé Orbitvu',
  texteApres: ' peut apporter à votre production visuelle.',
  ctaDemo: 'Demander une démo',
  ctaCatalogue: 'Recevoir le catalogue',
  reassurance: 'France • Suisse • Réponse par e-mail',
  microcopy: 'Le catalogue est envoyé par e-mail.',
  fermer: 'Fermer',
} as const;

