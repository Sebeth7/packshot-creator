import type { Metadata } from 'next';
import SchemaOrg, { sysnextOrganizationSchema } from '@/components/seo/SchemaOrg';

/**
 * Layout racine du sous-arbre Sysnext Industrial Solutions.
 *
 * Périmètre : /[lang]/industrie-solutions/* (règle R1 cohabitation).
 * - Applique les polices IBM Plex (définies dans layout parent)
 * - Injecte le schema Organization Sysnext globalement sur toutes les pages enfants
 * - Le HeaderGate/FooterGate du layout parent bascule automatiquement sur SysnextHeader/SysnextFooter
 *
 * Source : config/cohabitation-marques.md §4.2.
 */

export const metadata: Metadata = {
  title: {
    default: 'Sysnext Industrial Solutions — Documentation visuelle industrielle standardisée',
    template: '%s | Sysnext Industrial Solutions',
  },
  description:
    'Stations Orbitvu pilotées par Templates verrouillés, intégrées ERP/PIM/GMAO, utilisables par un opérateur non-photographe. Aftermarket auto, SAV outillage, QC inspection, MRO aéronautique civile.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SysnextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="font-sysnext-sans text-graphite-900 bg-white min-h-screen"
      data-brand="sysnext-industrial-solutions"
    >
      <SchemaOrg schema={sysnextOrganizationSchema()} />
      {children}
    </div>
  );
}
