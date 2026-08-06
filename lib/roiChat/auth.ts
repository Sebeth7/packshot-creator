/**
 * Auth interne /roi-pro — magic link limité aux emails @sysnext.com (CDC §2).
 *
 * Sans état serveur : jeton de connexion et cookie de session sont des
 * payloads signés HMAC-SHA256 (secret ROI_CHAT_AUTH_SECRET). Le jeton emailé
 * expire vite (15 min) ; le cookie de session dure 30 jours. Le mode
 * interne/public du chat est déterminé CÔTÉ SERVEUR par ce cookie — jamais
 * par un paramètre client.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

export const ROI_SESSION_COOKIE = 'roi_pro_session';
export const ALLOWED_EMAIL_DOMAIN = 'sysnext.com';

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000; // 15 min
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

function secret(): string {
  const s = process.env.ROI_CHAT_AUTH_SECRET;
  if (!s) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ROI_CHAT_AUTH_SECRET manquant');
    }
    return 'dev-secret-roi-chat-non-prod';
  }
  return s;
}

function b64url(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url');
}

function sign(payload: string, purpose: string): string {
  return createHmac('sha256', secret()).update(`${purpose}.${payload}`).digest('base64url');
}

function pack(data: Record<string, string | number>, purpose: string): string {
  const payload = b64url(JSON.stringify(data));
  return `${payload}.${sign(payload, purpose)}`;
}

function unpack<T>(token: string, purpose: string): T | null {
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload, purpose);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as T;
  } catch {
    return null;
  }
}

export function isAllowedEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+$/.test(normalized) &&
    normalized.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

// ===== Jeton magic link (emailé, 15 min) =====

export function createMagicToken(email: string): string {
  return pack({ email: email.trim().toLowerCase(), exp: Date.now() + MAGIC_LINK_TTL_MS }, 'magic');
}

export function verifyMagicToken(token: string): string | null {
  const data = unpack<{ email: string; exp: number }>(token, 'magic');
  if (!data || typeof data.email !== 'string' || typeof data.exp !== 'number') return null;
  if (Date.now() > data.exp) return null;
  if (!isAllowedEmail(data.email)) return null;
  return data.email;
}

// ===== Cookie de session (30 jours) =====

export interface RoiSession {
  email: string;
  exp: number;
}

export function createSessionCookieValue(email: string): string {
  return pack({ email: email.trim().toLowerCase(), exp: Date.now() + SESSION_TTL_MS }, 'session');
}

export function verifySessionCookieValue(value: string | undefined): RoiSession | null {
  if (!value) return null;
  const data = unpack<RoiSession>(value, 'session');
  if (!data || typeof data.email !== 'string' || typeof data.exp !== 'number') return null;
  if (Date.now() > data.exp) return null;
  if (!isAllowedEmail(data.email)) return null;
  return data;
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_TTL_MS / 1000,
};
