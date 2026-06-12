/**
 * Maps machine IDs to their card image paths in /public/images/machines/.
 * Les fichiers ne suivent pas 1:1 les ids (pas de variantes -v2 / -wine / -pro) :
 * ne JAMAIS construire `/images/machines/${id}.avif` directement (HTTP 400).
 */
export function getMachineImage(id: string): string {
  const imageMap: Record<string, string> = {
    'alphashot-micro-v2': '/images/machines/alphashot-micro-v2.avif',
    'alphashot-360': '/images/machines/alphashot-360.avif',
    'alphashot-g2': '/images/machines/alphashot-pro-g2.avif',
    'alphashot-pro-g2': '/images/machines/alphashot-pro-g2.avif',
    'alphashot-xl-v2': '/images/machines/alphashot-xl.avif',
    'alphashot-xl-wine-v2': '/images/machines/alphashot-xl.avif',
    'alphashot-xl-pro-v2': '/images/machines/alphashot-xl.avif',
    'alphadesk': '/images/machines/alphatable-alphadesk.avif',
    'alphatable': '/images/machines/alphatable-alphadesk.avif',
    'alphastudio-compact-v2': '/images/machines/alphastudio-compact.avif',
    'alphastudio-xxl-v2': '/images/machines/alphastudio-xxl.avif',
    'fashion-studio-basic': '/images/machines/fashion-studio.avif',
    'fashion-studio': '/images/machines/fashion-studio.avif',
    'bike-studio': '/images/machines/bike-studio.avif',
    'furniture-studio': '/images/machines/furniture-studio.avif',
    'e-comm-studio-plus': '/images/machines/ecomm-studio-plus.avif',
  };
  return imageMap[id] || '/images/machines/placeholder-medium.svg';
}
