import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://packshot-creator.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
