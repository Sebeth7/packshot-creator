// Carte de proximité sectorielle — maillage interne contextuel inter-hubs.
// Issu du rapport SEO/GEO Laurent (juin 2026, constat n°1 / T2) : la section
// « Autres secteurs » des pages /industrie/[slug] n'exposait que les 8 premiers
// secteurs de DEFAULT_SECTORS, laissant les 9 hubs récents quasi sans lien
// contextuel entrant. Cette carte associe chaque hub à 4-6 secteurs connexes,
// de sorte que chaque hub (récents inclus) reçoive des inliens contextuels.
//
// Les slugs doivent correspondre à data/secteurs.ts (slugs canoniques).

export const SECTOR_RELATED_MAP: Record<string, string[]> = {
  'chaussures': ['mode-textile', 'sport-outdoor', 'lunetterie', 'cosmetiques-beaute', 'bijoux-joaillerie'],
  'bijoux-joaillerie': ['horlogerie', 'lunetterie', 'cosmetiques-beaute', 'mode-textile', 'mobilier-decoration'],
  'mobilier-decoration': ['food-alimentaire', 'vin-spiritueux', 'electronique-hightech', 'cosmetiques-beaute'],
  'vin-spiritueux': ['food-alimentaire', 'mobilier-decoration', 'cosmetiques-beaute', 'bijoux-joaillerie'],
  'cosmetiques-beaute': ['bijoux-joaillerie', 'sante-medical', 'food-alimentaire', 'mode-textile', 'vin-spiritueux'],
  'mode-textile': ['chaussures', 'sport-outdoor', 'bijoux-joaillerie', 'lunetterie', 'horlogerie'],
  'electronique-hightech': ['automobile-pieces-detachees', 'pieces-techniques-industrie', 'jouets-puericulture', 'industrie-manufacturiere'],
  'pieces-techniques-industrie': ['automobile-pieces-detachees', 'industrie-manufacturiere', 'electronique-hightech', 'defense-securite'],
  'automobile-pieces-detachees': ['pieces-techniques-industrie', 'electronique-hightech', 'industrie-manufacturiere', 'sport-outdoor'],
  'jouets-puericulture': ['food-alimentaire', 'sport-outdoor', 'electronique-hightech', 'cosmetiques-beaute'],
  'sport-outdoor': ['chaussures', 'mode-textile', 'jouets-puericulture', 'automobile-pieces-detachees'],
  'sante-medical': ['cosmetiques-beaute', 'pieces-techniques-industrie', 'industrie-manufacturiere', 'defense-securite'],
  'industrie-manufacturiere': ['pieces-techniques-industrie', 'automobile-pieces-detachees', 'electronique-hightech', 'defense-securite', 'sante-medical'],
  'defense-securite': ['pieces-techniques-industrie', 'industrie-manufacturiere', 'electronique-hightech', 'sante-medical'],
  'lunetterie': ['bijoux-joaillerie', 'mode-textile', 'cosmetiques-beaute', 'chaussures', 'horlogerie'],
  'food-alimentaire': ['vin-spiritueux', 'cosmetiques-beaute', 'mobilier-decoration', 'jouets-puericulture'],
  'horlogerie': ['bijoux-joaillerie', 'lunetterie', 'cosmetiques-beaute', 'mode-textile'],
};
