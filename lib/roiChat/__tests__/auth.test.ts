import { describe, it, expect } from 'vitest';
import {
  isAllowedEmail,
  createMagicToken,
  verifyMagicToken,
  createSessionCookieValue,
  verifySessionCookieValue,
} from '../auth';

describe('Auth magic link @sysnext.com', () => {
  it('accepte uniquement le domaine sysnext.com', () => {
    expect(isAllowedEmail('sebastien.jourdan@sysnext.com')).toBe(true);
    expect(isAllowedEmail('  Stephane.Gormand@SYSNEXT.COM ')).toBe(true);
    expect(isAllowedEmail('intrus@gmail.com')).toBe(false);
    expect(isAllowedEmail('intrus@sysnext.com.evil.io')).toBe(false);
    expect(isAllowedEmail('intrus@notsysnext.com')).toBe(false);
    expect(isAllowedEmail('')).toBe(false);
  });

  it('roundtrip jeton magic link', () => {
    const token = createMagicToken('seb@sysnext.com');
    expect(verifyMagicToken(token)).toBe('seb@sysnext.com');
  });

  it('rejette un jeton altéré', () => {
    const token = createMagicToken('seb@sysnext.com');
    expect(verifyMagicToken(token.slice(0, -4) + 'AAAA')).toBeNull();
    expect(verifyMagicToken('nimporte.quoi')).toBeNull();
  });

  it('un jeton magic link ne vaut pas cookie de session (purposes séparés)', () => {
    const token = createMagicToken('seb@sysnext.com');
    expect(verifySessionCookieValue(token)).toBeNull();
  });

  it('roundtrip cookie de session', () => {
    const cookie = createSessionCookieValue('seb@sysnext.com');
    const session = verifySessionCookieValue(cookie);
    expect(session?.email).toBe('seb@sysnext.com');
    expect(session!.exp).toBeGreaterThan(Date.now());
  });

  it('rejette un cookie absent ou altéré', () => {
    expect(verifySessionCookieValue(undefined)).toBeNull();
    const cookie = createSessionCookieValue('seb@sysnext.com');
    expect(verifySessionCookieValue(cookie.replace(/.$/, 'x'))).toBeNull();
  });
});
