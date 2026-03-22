import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Calculateur interne',
};

export default function CalculateurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
