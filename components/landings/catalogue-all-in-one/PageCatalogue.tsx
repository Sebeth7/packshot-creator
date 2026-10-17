import Image from 'next/image';
import type { VisuelCatalogue } from './visuels';

/**
 * Page ou double page du catalogue (V5 : exports réels, voir visuels.ts). Le cadre
 * prend le rapport du fichier : aucune déformation, aucun décalage de mise en page.
 * `mobile` : page seule montrée sous 640 px à la place de la double page, illisible
 * à cette largeur ; seule l'image affichée est chargée (chargement différé).
 */
function Cadre({
  visuel,
  sizes,
  priority,
  className,
}: {
  visuel: VisuelCatalogue;
  sizes: string;
  priority: boolean;
  className: string;
}) {
  if (!visuel.src) return null;
  return (
    <div
      data-page-catalogue={visuel.id}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${visuel.width} / ${visuel.height}` }}
    >
      <Image src={visuel.src} alt={visuel.alt} fill sizes={sizes} priority={priority} className="object-contain" />
    </div>
  );
}

export function PageCatalogue({
  visuel,
  mobile,
  sizes,
  sizesMobile = '92vw',
  priority = false,
  className = '',
}: {
  visuel: VisuelCatalogue;
  mobile?: VisuelCatalogue;
  sizes: string;
  sizesMobile?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!mobile) return <Cadre visuel={visuel} sizes={sizes} priority={priority} className={className} />;
  return (
    <>
      <Cadre visuel={mobile} sizes={sizesMobile} priority={false} className={`${className} sm:hidden`} />
      <Cadre visuel={visuel} sizes={sizes} priority={false} className={`${className} hidden sm:block`} />
    </>
  );
}
