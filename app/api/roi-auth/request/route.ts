import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createMagicToken, isAllowedEmail, ALLOWED_EMAIL_DOMAIN } from '@/lib/roiChat/auth';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const limited = rateLimit(`roi-auth:${ip}`, 5);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Trop de demandes. Réessayez dans ${limited.resetInSec} s.` },
      { status: 429 }
    );
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 });
  }

  // Réponse identique que l'email soit éligible ou non : pas d'énumération
  const genericResponse = NextResponse.json({
    ok: true,
    message: `Si cette adresse @${ALLOWED_EMAIL_DOMAIN} existe, un lien de connexion vient de lui être envoyé.`,
  });

  if (typeof email !== 'string' || !isAllowedEmail(email)) {
    return genericResponse;
  }

  const token = createMagicToken(email);
  const origin = request.nextUrl.origin;
  const link = `${origin}/api/roi-auth/verify?token=${encodeURIComponent(token)}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `PackshotCreator <${process.env.RESEND_FROM_EMAIL}>`,
    to: email.trim().toLowerCase(),
    subject: 'Connexion au calculateur ROI interne',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Calculateur ROI — accès interne</h2>
        <p>Cliquez sur ce lien pour vous connecter (valable 15 minutes) :</p>
        <p style="margin: 24px 0;">
          <a href="${link}"
             style="background: #e94560; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
            Se connecter à /roi-pro
          </a>
        </p>
        <p style="color: #666; font-size: 13px;">
          Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('[roi-auth] Envoi magic link échoué:', error);
    return NextResponse.json({ error: "L'envoi de l'email a échoué. Réessayez." }, { status: 502 });
  }

  return genericResponse;
}
