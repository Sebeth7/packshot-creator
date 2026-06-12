import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import {
  SURVEY_VERSION,
  MACHINES,
  ANCIENNETE,
  FREQUENCE,
  TYPES_VISUELS,
  VOLUME_MENSUEL,
  CRITERES,
  BENEFICES,
  IA_MATURITE,
  IA_USAGES,
  labelOf,
  labelsOf,
  type Option,
} from '@/app/etude-clients-2026/survey-config';

const SOURCE = 'operation_a_clients_existants';

const enumFrom = (opts: Option[]) =>
  z.enum(opts.map(o => o.value) as [string, ...string[]]);
const multiFrom = (opts: Option[]) =>
  z.array(enumFrom(opts)).max(opts.length).default([]);
const scale = (min: number, max: number) =>
  z.number().int().min(min).max(max).nullable().optional();
const freeText = (max = 8000) => z.string().trim().max(max).default('');

const schema = z.object({
  pipedrive_org_id: z.string().trim().max(40).nullable().optional(),
  client_email: z.email().nullable().optional().or(z.literal('').transform(() => null)),
  client_name: z.string().trim().max(200).nullable().optional(),
  client_company: z.string().trim().max(200).nullable().optional(),

  q1_machines: multiFrom(MACHINES),
  q1_machines_autre: freeText(300),
  q2_anciennete: enumFrom(ANCIENNETE).nullable().optional(),
  q3_frequence: enumFrom(FREQUENCE).nullable().optional(),
  q4_types_visuels: multiFrom(TYPES_VISUELS),
  q5_volume_mensuel: enumFrom(VOLUME_MENSUEL).nullable().optional(),

  q6_satisfaction_globale: scale(1, 5),
  q7_qualite_images: scale(1, 5),
  q7_productivite: scale(1, 5),
  q7_logiciel: scale(1, 5),
  q7_detourage: scale(1, 5),
  q7_fiabilite: scale(1, 5),
  q7_support: scale(1, 5),
  q8_nps: scale(0, 10),
  q9_benefices: multiFrom(BENEFICES),
  q9_benefices_autre: freeText(300),

  q10_ia_maturite: enumFrom(IA_MATURITE).nullable().optional(),
  q11_ia_usages: multiFrom(IA_USAGES),
  q11_ia_usages_autre: freeText(300),

  q12_workflow: freeText(),
  q13_signal_faible: freeText(),
  remarques_libres: freeText(),

  consent_recontact: z.boolean().default(false),
  consent_newsletter: z.boolean().default(false),
});

type Payload = z.infer<typeof schema>;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`survey:${ip}`, 5);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Trop de soumissions. Réessayez dans ${Math.ceil(rl.resetInSec / 60)} minutes.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Champs invalides', details: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const anyAnswer =
    data.q1_machines.length > 0 ||
    data.q4_types_visuels.length > 0 ||
    data.q9_benefices.length > 0 ||
    data.q11_ia_usages.length > 0 ||
    !!data.q2_anciennete ||
    !!data.q3_frequence ||
    !!data.q5_volume_mensuel ||
    !!data.q10_ia_maturite ||
    data.q6_satisfaction_globale != null ||
    data.q8_nps != null ||
    CRITERES.some(c => data[c.key] != null) ||
    [data.q12_workflow, data.q13_signal_faible, data.remarques_libres].some(s => s && s.trim());

  if (!anyAnswer) {
    return NextResponse.json({ error: 'Veuillez répondre à au moins une question.' }, { status: 400 });
  }

  const row = {
    pipedrive_org_id: data.pipedrive_org_id || null,
    client_email: data.client_email || null,
    client_name: data.client_name || null,
    client_company: data.client_company || null,
    survey_version: SURVEY_VERSION,
    source: SOURCE,
    user_agent: req.headers.get('user-agent')?.slice(0, 500) || null,

    q1_machines: data.q1_machines.length ? data.q1_machines : null,
    q1_machines_autre: data.q1_machines_autre || null,
    q2_anciennete: data.q2_anciennete || null,
    q3_frequence: data.q3_frequence || null,
    q4_types_visuels: data.q4_types_visuels.length ? data.q4_types_visuels : null,
    q5_volume_mensuel: data.q5_volume_mensuel || null,

    q6_satisfaction_globale: data.q6_satisfaction_globale ?? null,
    q7_qualite_images: data.q7_qualite_images ?? null,
    q7_productivite: data.q7_productivite ?? null,
    q7_logiciel: data.q7_logiciel ?? null,
    q7_detourage: data.q7_detourage ?? null,
    q7_fiabilite: data.q7_fiabilite ?? null,
    q7_support: data.q7_support ?? null,
    q8_nps: data.q8_nps ?? null,
    q9_benefices: data.q9_benefices.length ? data.q9_benefices : null,
    q9_benefices_autre: data.q9_benefices_autre || null,

    q10_ia_maturite: data.q10_ia_maturite || null,
    q11_ia_usages: data.q11_ia_usages.length ? data.q11_ia_usages : null,
    q11_ia_usages_autre: data.q11_ia_usages_autre || null,

    q12_workflow: data.q12_workflow || null,
    q13_signal_faible: data.q13_signal_faible || null,
    remarques_libres: data.remarques_libres || null,

    consent_recontact: data.consent_recontact,
    consent_newsletter: data.consent_newsletter,
  };

  // 1) Insert Supabase
  let insertedId: string | null = null;
  try {
    const supa = getSupabaseAdmin();
    const { data: inserted, error } = await supa
      .from('client_survey_responses')
      .insert(row)
      .select('id')
      .single();
    if (error) throw error;
    insertedId = inserted?.id ?? null;
  } catch (err) {
    console.error('[submit-survey] supabase insert error', err);
    return NextResponse.json({ error: 'Impossible d\'enregistrer les réponses. Réessayez plus tard.' }, { status: 500 });
  }

  // 2) Best-effort : email notif, email confirmation client, note Pipedrive
  //    Les échecs ici ne bloquent pas la réponse.
  await Promise.allSettled([
    sendInternalNotification(data, insertedId),
    data.client_email ? sendClientConfirmation(data.client_email, data.client_name) : Promise.resolve(),
    data.pipedrive_org_id ? addPipedriveNote(data.pipedrive_org_id, data, insertedId) : Promise.resolve(),
  ]);

  return NextResponse.json({ ok: true, id: insertedId });
}

// ── Construction HTML partagée (email interne + note Pipedrive) ──

function buildAnswersHtml(d: Payload): string {
  const parts: string[] = [];

  // Synthèse scores en tête : NPS, satisfaction globale, grille critères
  const headline: string[] = [];
  if (d.q8_nps != null) headline.push(`NPS : <strong>${d.q8_nps}/10</strong>`);
  if (d.q6_satisfaction_globale != null) headline.push(`Satisfaction globale : <strong>${d.q6_satisfaction_globale}/5</strong>`);
  const criteres = CRITERES.filter(c => d[c.key] != null)
    .map(c => `<li>${escapeHtml(c.label)} : <strong>${d[c.key]}/5</strong></li>`);
  if (headline.length || criteres.length) {
    parts.push(sectionTitle('Synthèse scores'));
    if (headline.length) parts.push(`<p>${headline.join(' · ')}</p>`);
    if (criteres.length) parts.push(`<ul>${criteres.join('')}</ul>`);
  }

  // Profil & usage
  const profil = [
    line('Solutions utilisées', withAutre(labelsOf(MACHINES, d.q1_machines), d.q1_machines_autre)),
    line('Ancienneté', labelOf(ANCIENNETE, d.q2_anciennete)),
    line('Fréquence d\'utilisation', labelOf(FREQUENCE, d.q3_frequence)),
    line('Types de visuels', labelsOf(TYPES_VISUELS, d.q4_types_visuels)),
    line('Volume mensuel', labelOf(VOLUME_MENSUEL, d.q5_volume_mensuel)),
    line('Bénéfices perçus', withAutre(labelsOf(BENEFICES, d.q9_benefices), d.q9_benefices_autre)),
  ].filter(Boolean);
  if (profil.length) {
    parts.push(sectionTitle('Profil & usage'));
    parts.push(...profil);
  }

  // IA générative
  const ia = [
    line('Maturité IA générative', labelOf(IA_MATURITE, d.q10_ia_maturite)),
    line('Usages IA perçus', withAutre(labelsOf(IA_USAGES, d.q11_ia_usages), d.q11_ia_usages_autre)),
  ].filter(Boolean);
  if (ia.length) {
    parts.push(sectionTitle('IA générative'));
    parts.push(...ia);
  }

  // Verbatims
  parts.push(
    block('Q12 — Workflow autour de la machine', d.q12_workflow),
    block('Q13 — Si une seule chose à changer', d.q13_signal_faible),
    block('Remarques libres', d.remarques_libres),
  );

  return parts.filter(Boolean).join('\n');
}

function sectionTitle(title: string): string {
  return `<h3 style="margin-top:24px;margin-bottom:8px;color:#001D26">${title}</h3>`;
}

function line(title: string, value: string): string {
  if (!value) return '';
  return `<p style="margin:4px 0"><strong>${title} :</strong> ${escapeHtml(value)}</p>`;
}

function withAutre(labels: string, autre: string): string {
  if (!labels) return autre ? `Autre : ${autre}` : '';
  return autre ? `${labels} (précision : ${autre})` : labels;
}

function block(title: string, content: string): string {
  if (!content || !content.trim()) return '';
  return `${sectionTitle(title)}
<div style="white-space:pre-wrap;line-height:1.55;color:#0D171A;background:#FAF9F5;padding:12px 14px;border-radius:8px;border:1px solid #00000010">${escapeHtml(content)}</div>`;
}

function escapeHtml(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Internal notification email ───────────────────────────────
async function sendInternalNotification(data: Payload, insertedId: string | null) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.NOTIFICATION_EMAIL || 'sebastien.jourdan@sysnext.com';
  if (!apiKey || !from) return;

  const resend = new Resend(apiKey);
  const label = data.client_company || data.client_name || data.client_email || 'Sans identifiant';

  const html = [
    `<h2>Nouvelle réponse questionnaire client — ${escapeHtml(label)}</h2>`,
    data.pipedrive_org_id
      ? `<p><strong>Pipedrive org ID :</strong> ${escapeHtml(data.pipedrive_org_id)} · <a href="https://packshotcreator.pipedrive.com/organization/${encodeURIComponent(data.pipedrive_org_id)}">ouvrir la fiche</a></p>`
      : '',
    `<p><strong>Contact :</strong> ${escapeHtml(data.client_name || '-')} — ${escapeHtml(data.client_email || '-')} — ${escapeHtml(data.client_company || '-')}</p>`,
    `<p><strong>Consentements :</strong> recontact=${data.consent_recontact ? 'oui' : 'non'} · newsletter=${data.consent_newsletter ? 'oui' : 'non'}</p>`,
    `<p><strong>ID ligne Supabase :</strong> ${insertedId || '-'}</p>`,
    '<hr>',
    buildAnswersHtml(data),
  ].filter(Boolean).join('\n');

  await resend.emails.send({
    from,
    to,
    subject: `Nouvelle réponse questionnaire — ${label}`,
    html,
  });
}

// ── Client confirmation email ─────────────────────────────────
async function sendClientConfirmation(email: string, name: string | null | undefined) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return;
  const resend = new Resend(apiKey);
  const firstName = (name || '').trim().split(/\s+/)[0] || '';

  await resend.emails.send({
    from,
    to: email,
    subject: 'Merci pour vos réponses — PackshotCreator',
    html: `<p>Bonjour ${escapeHtml(firstName)},</p>
<p>Merci d'avoir pris le temps de répondre à notre étude clients. Vos réponses sont précieuses et vont directement nourrir notre réflexion produit pour les mois à venir.</p>
<p>Si vous avez des questions ou des idées complémentaires, n'hésitez pas à répondre à cet email.</p>
<p>À très bientôt,<br>L'équipe PackshotCreator</p>`,
  });
}

// ── Pipedrive note ────────────────────────────────────────────
async function addPipedriveNote(orgId: string, data: Payload, insertedId: string | null) {
  const token = process.env.PIPEDRIVE_API_TOKEN;
  const domain = process.env.PIPEDRIVE_DOMAIN;
  if (!token || !domain) return;

  const content = [
    `<p><strong>Réponse questionnaire satisfaction 2026</strong> (${SURVEY_VERSION})</p>`,
    `<p>Supabase row id : ${insertedId || '-'}</p>`,
    data.client_name ? `<p>Contact : ${escapeHtml(data.client_name)}</p>` : '',
    `<p>Consentements : recontact=${data.consent_recontact ? 'oui' : 'non'}, newsletter=${data.consent_newsletter ? 'oui' : 'non'}</p>`,
    buildAnswersHtml(data),
  ].filter(Boolean).join('\n');

  const orgIdNum = Number(orgId);
  if (!Number.isFinite(orgIdNum)) return;

  await fetch(`https://${domain}/api/v1/notes?api_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ org_id: orgIdNum, content }),
  }).catch(err => console.error('[submit-survey] pipedrive note error', err));
}
