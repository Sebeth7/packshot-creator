// Mapping secteur slug -> machine IDs recommandees
// Genere par l'outil de mapping le 29/03/2026

export const SECTOR_MACHINE_MAP: Record<string, string[]> = {
  'chaussures': ['alphashot-xl-v2', 'alphashot-xl-pro-v2'],
  'bijoux-joaillerie': ['alphashot-micro-v2', 'alphashot-pro-g2'],
  'lunetterie': ['alphashot-pro-g2'],
  'cosmetiques-beaute': ['alphashot-micro-v2', 'alphashot-360', 'alphashot-pro-g2'],
  'mode-textile': ['alphadesk', 'alphatable', 'alphastudio-xxl-v2', 'fashion-studio-basic', 'fashion-studio', 'e-comm-studio-plus'],
  'food-alimentaire': ['alphashot-xl-g2', 'alphashot-xl-v2', 'alphashot-xl-pro-v2', 'alphadesk'],
  'electronique-hightech': ['alphashot-micro-v2', 'alphashot-360', 'alphashot-xl-g2', 'alphashot-pro-g2', 'alphashot-xl-v2', 'alphashot-xl-pro-v2'],
  'mobilier-decoration': ['alphatable', 'alphastudio-compact-v2', 'alphastudio-xxl-v2', 'furniture-studio', 'e-comm-studio-plus'],
  'sport-outdoor': ['alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphastudio-compact-v2', 'alphastudio-xxl-v2', 'fashion-studio-basic', 'bike-studio'],
  'automobile-pieces-detachees': ['alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphastudio-compact-v2', 'e-comm-studio-plus'],
  'jouets-puericulture': ['alphashot-xl-pro-v2', 'alphastudio-compact-v2'],
  'sante-medical': ['alphashot-pro-g2', 'alphashot-xl-pro-v2'],
  'pieces-techniques-industrie': ['alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphastudio-compact-v2', 'alphastudio-xxl-v2'],
  'industrie-manufacturiere': ['alphashot-micro-v2', 'alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphastudio-compact-v2', 'alphastudio-xxl-v2'],
  'defense-securite': ['alphashot-micro-v2', 'alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphastudio-compact-v2', 'alphastudio-xxl-v2'],
  'vin-spiritueux': ['alphashot-xl-wine-v2', 'alphashot-xl-v2', 'alphashot-xl-pro-v2'],
  'horlogerie': ['alphashot-micro-v2', 'alphashot-360', 'alphashot-pro-g2'],
};
