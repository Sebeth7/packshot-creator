/**
 * Anti-abus du chat ROI public (CDC §3, UX §8 lot 6).
 *
 * Trois couches :
 *  1. rate limiting par IP (lib/rate-limit, fenêtre 1 h) — appliqué en route ;
 *  2. caps de session : nombre de messages, longueur des messages, tokens de
 *     sortie par requête — constantes ci-dessous ;
 *  3. budget mensuel d'alerte : compteur de tokens best-effort (mémoire
 *     d'instance serverless — remis à zéro au recyclage, PAS un plafond
 *     comptable) + email d'alerte Resend une fois le seuil franchi.
 *     Le vrai garde-fou de facturation reste le budget/alerting du dashboard
 *     Anthropic (console.anthropic.com, à configurer par Seb — cf. CDC §9).
 */

import { Resend } from 'resend';

// ===== Caps du mode public =====

/** Requêtes / heure / IP (le mode interne garde son propre couple email+IP) */
export const PUBLIC_RATE_LIMIT_PER_HOUR = 20;
/** Longueur max de l'historique renvoyé par le client (≈ 30 tours) */
export const PUBLIC_MAX_MESSAGES = 60;
/** Taille max d'un message utilisateur (collage d'un brief complet accepté) */
export const PUBLIC_MAX_INPUT_CHARS = 4000;
/** max_tokens par tour assistant en public (interne : défaut provider 4096) */
export const PUBLIC_MAX_TOKENS_PER_TURN = 2048;
/** Tours de tools max par requête en public (interne : 8) */
export const PUBLIC_MAX_TOOL_ROUNDS = 6;

// ===== Budget mensuel d'alerte (best-effort, par instance) =====

const DEFAULT_MONTHLY_TOKEN_ALERT = 20_000_000; // ~60 $ de Sonnet en sortie

let counterMonth = '';
let tokensThisMonth = 0;
let alertSentForMonth = '';

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

function monthlyThreshold(): number {
  const raw = Number(process.env.ROI_CHAT_MONTHLY_TOKEN_ALERT);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_MONTHLY_TOKEN_ALERT;
}

/**
 * Enregistre la consommation d'une requête et déclenche l'alerte si le seuil
 * mensuel est franchi. À appeler après chaque tour assistant.
 */
export function recordTokenUsage(mode: string, inputTokens: number, outputTokens: number): void {
  const month = currentMonth();
  if (month !== counterMonth) {
    counterMonth = month;
    tokensThisMonth = 0;
  }
  // Pondération grossière : l'input (souvent caché) coûte ~5× moins que l'output
  tokensThisMonth += Math.round(inputTokens / 5) + outputTokens;

  console.log(
    `[roi-chat:usage] mode=${mode} in=${inputTokens} out=${outputTokens} monthWeighted=${tokensThisMonth}`
  );

  const threshold = monthlyThreshold();
  if (tokensThisMonth >= threshold && alertSentForMonth !== month) {
    alertSentForMonth = month;
    console.warn(`[roi-chat:budget] Seuil mensuel d'alerte franchi (${tokensThisMonth} ≥ ${threshold})`);
    void sendBudgetAlert(month, tokensThisMonth, threshold);
  }
}

async function sendBudgetAlert(month: string, tokens: number, threshold: number): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) return;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
      to: ['sebastien.jourdan@sysnext.com'],
      subject: `[ROI Chat] Alerte budget tokens — seuil mensuel franchi (${month})`,
      html: `<p>Le calculateur ROI conversationnel a dépassé le seuil d'alerte mensuel de consommation.</p>
<p><strong>${tokens.toLocaleString('fr-FR')}</strong> tokens pondérés (seuil : ${threshold.toLocaleString('fr-FR')}) — compteur best-effort d'une instance serverless : la consommation réelle est à vérifier sur console.anthropic.com.</p>
<p>Seuil configurable via la variable d'environnement <code>ROI_CHAT_MONTHLY_TOKEN_ALERT</code> (dashboard Vercel).</p>`,
    });
  } catch (err) {
    console.error('[roi-chat:budget] envoi alerte impossible', err);
  }
}
