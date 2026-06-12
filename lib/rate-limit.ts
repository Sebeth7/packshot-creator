const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;

export function rateLimit(key: string, max: number, windowMs = WINDOW_MS): { ok: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const cutoff = now - windowMs;
  const list = (HITS.get(key) ?? []).filter(t => t > cutoff);
  if (list.length >= max) {
    const oldest = list[0];
    return { ok: false, remaining: 0, resetInSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
  }
  list.push(now);
  HITS.set(key, list);
  return { ok: true, remaining: max - list.length, resetInSec: 0 };
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
