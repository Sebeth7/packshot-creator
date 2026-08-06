import { NextRequest, NextResponse } from 'next/server';
import {
  verifyMagicToken,
  createSessionCookieValue,
  ROI_SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from '@/lib/roiChat/auth';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const email = token ? verifyMagicToken(token) : null;

  if (!email) {
    return NextResponse.redirect(new URL('/roi-pro?erreur=lien-invalide', request.nextUrl.origin));
  }

  const response = NextResponse.redirect(new URL('/roi-pro', request.nextUrl.origin));
  response.cookies.set(ROI_SESSION_COOKIE, createSessionCookieValue(email), SESSION_COOKIE_OPTIONS);
  return response;
}
