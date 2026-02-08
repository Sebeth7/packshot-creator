import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.packshot-creator.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
