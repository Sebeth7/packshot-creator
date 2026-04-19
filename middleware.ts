import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Détecte si la requête arrive depuis une source outbound Sysnext.
 * Sources supportées :
 * - UTM source explicite : utm_source=sysnext-linkedin|sysnext-email|sysnext-outbound
 * - Referer email outbound (Smartlead / HeyReach tracking)
 *
 * Règle H4 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Source : config/cohabitation-marques.md §5.2.
 */
function isSysnextOutboundSource(request: NextRequest): boolean {
  const { searchParams } = request.nextUrl;
  const utmSource = searchParams.get('utm_source') ?? '';

  if (utmSource.startsWith('sysnext-')) {
    return true;
  }

  const referer = request.headers.get('referer') ?? '';
  if (
    referer.includes('smartlead') ||
    referer.includes('heyreach') ||
    referer.includes('go.sysnext.com')
  ) {
    return true;
  }

  return false;
}

/**
 * Détecte les chemins "home-like" à router vers Sysnext si source outbound.
 * On ne redirige que les entrées sans préfixe Sysnext explicite.
 */
function isHomeLikePath(pathname: string): boolean {
  return pathname === '/' || pathname === '/fr' || pathname === '/en';
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // H4 : routing par UTM / referer outbound Sysnext
  if (isHomeLikePath(pathname) && isSysnextOutboundSource(request)) {
    const locale = pathname === '/en' ? 'en' : 'fr';
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/industrie-solutions`;
    // Préserve les UTMs pour le tracking analytics côté page
    return NextResponse.redirect(url, 307);
  }

  // Par défaut : middleware i18n next-intl
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API routes, static files, and standalone pages
  matcher: ['/', '/((?!api|_next|_vercel|calculateur-roi|.*\\..*).*)'],
};
