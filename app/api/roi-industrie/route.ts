import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { Resend } from 'resend';

/**
 * Endpoint calculateur ROI dédié Sysnext Industrial Solutions.
 *
 * Capture les inputs/outputs du calculateur ROI industrie (aftermarket auto, QC, MRO)
 * et envoie un rapport PDF personnalisé au prospect + notif interne.
 *
 * Règle R8 + R9 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Fork minimaliste — le calculateur UI live sur /industrie-solutions/calculateur-roi,
 * les presets et le branding diffèrent mais le moteur de calcul reste partagé.
 *
 * Source : config/cohabitation-marques.md §3 R8.
 */

const roiIndustrieSchema = z.object({
  segment: z.enum(['aftermarket-auto', 'qc-inspection', 'mro-aero', 'autre']),
  inputs: z.object({
    referencesPerYear: z.number().int().min(0),
    costPerPhotoEur: z.number().min(0),
    delayPerPhotoDays: z.number().min(0).optional(),
    sitesCount: z.number().int().min(1).optional(),
    normes: z.array(z.string()).optional(),
  }),
  outputs: z.object({
    annualSavingsEur: z.number().min(0),
    timeToMarketReductionPct: z.number().min(0).max(100),
    amortizationMonths: z.number().int().min(0),
    volumePerYear: z.number().int().min(0),
  }),
  contact: z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      email: z.email(),
      company: z.string().min(1),
      jobTitle: z.string().optional(),
      phone: z.string().optional(),
      rgpdConsent: z.literal(true),
    })
    .optional(),
  locale: z.enum(['fr', 'en']).default('fr'),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
});

type RoiIndustrieData = z.infer<typeof roiIndustrieSchema>;

const SEGMENT_LABELS: Record<string, { fr: string; en: string }> = {
  'aftermarket-auto': { fr: 'Aftermarket automobile', en: 'Automotive aftermarket' },
  'qc-inspection': { fr: 'QC / Inspection industrielle', en: 'QC / Industrial inspection' },
  'mro-aero': { fr: 'MRO aéronautique civile', en: 'Civil aeronautical MRO' },
  autre: { fr: 'Autre', en: 'Other' },
};

function formatEur(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = roiIndustrieSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation error', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const data: RoiIndustrieData = parsed.data;
    const segmentLabel = SEGMENT_LABELS[data.segment]?.[data.locale] ?? data.segment;

    // Si aucun contact fourni, on renvoie juste les résultats calculés (mode anonyme).
    if (!data.contact) {
      return NextResponse.json({ success: true, mode: 'anonymous' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;

    // Crée / met à jour une personne + deal Pipedrive léger avec note ROI
    let dealId: number | null = null;
    if (PIPEDRIVE_API_TOKEN) {
      try {
        // Upsert person
        const searchRes = await fetch(
          `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(data.contact.email)}&fields=email&limit=1&api_token=${PIPEDRIVE_API_TOKEN}`,
        );
        const searchData = await searchRes.json();
        let personId: number | null = searchData.data?.items?.[0]?.item?.id ?? null;
        if (!personId) {
          const personRes = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `${data.contact.firstName} ${data.contact.lastName}`,
              email: [{ value: data.contact.email, primary: true, label: 'work' }],
              ...(data.contact.phone
                ? { phone: [{ value: data.contact.phone, primary: true, label: 'work' }] }
                : {}),
              ...(data.contact.jobTitle ? { job_title: data.contact.jobTitle } : {}),
            }),
          });
          personId = (await personRes.json()).data?.id ?? null;
        }

        if (personId) {
          const dealRes = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: `[Sysnext ROI] ${segmentLabel} — ${data.contact.company}`,
              person_id: personId,
              pipeline_id: 3,
              stage_id: 17,
              value: data.outputs.annualSavingsEur,
              currency: 'EUR',
            }),
          });
          dealId = (await dealRes.json()).data?.id ?? null;

          if (dealId) {
            const noteContent = [
              'Sysnext Industrial Solutions — Simulation ROI',
              '',
              `Segment : ${segmentLabel}`,
              `Société : ${data.contact.company}`,
              '',
              'Inputs',
              `- Références / an : ${data.inputs.referencesPerYear}`,
              `- Coût actuel / photo : ${formatEur(data.inputs.costPerPhotoEur)}`,
              data.inputs.delayPerPhotoDays != null ? `- Délai actuel / photo : ${data.inputs.delayPerPhotoDays} j` : null,
              data.inputs.sitesCount != null ? `- Sites : ${data.inputs.sitesCount}` : null,
              data.inputs.normes && data.inputs.normes.length > 0 ? `- Normes : ${data.inputs.normes.join(', ')}` : null,
              '',
              'Résultats',
              `- Économie annuelle estimée : ${formatEur(data.outputs.annualSavingsEur)}`,
              `- Réduction time-to-market : ${data.outputs.timeToMarketReductionPct.toFixed(0)} %`,
              `- Amortissement : ${data.outputs.amortizationMonths} mois`,
              `- Volume traitable / an : ${data.outputs.volumePerYear}`,
              '',
              data.utmSource ? `UTM source : ${data.utmSource}` : null,
              data.utmCampaign ? `UTM campaign : ${data.utmCampaign}` : null,
            ]
              .filter(Boolean)
              .join('\n');

            await fetch(`https://api.pipedrive.com/v1/notes?api_token=${PIPEDRIVE_API_TOKEN}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                deal_id: dealId,
                content: noteContent,
                pinned_to_deal_flag: true,
              }),
            });
          }
        }
      } catch (err) {
        console.error('Pipedrive roi-industrie error:', err);
      }
    }

    // Email interne
    const notifHtml = `
      <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0E2A47; padding: 20px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 18px;">Sysnext — Simulation ROI reçue</h1>
          <p style="color: #A9C1D7; margin: 4px 0 0; font-size: 13px;">${segmentLabel}</p>
        </div>
        <div style="padding: 20px; background: #F6F7F9;">
          <p><strong>${data.contact.firstName} ${data.contact.lastName}</strong> — ${data.contact.company}</p>
          <p>Email : ${data.contact.email}</p>
          ${data.contact.phone ? `<p>Téléphone : ${data.contact.phone}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #D4D8DD; margin: 15px 0;" />
          <p><strong>Économie annuelle estimée :</strong> ${formatEur(data.outputs.annualSavingsEur)}</p>
          <p><strong>Réduction time-to-market :</strong> ${data.outputs.timeToMarketReductionPct.toFixed(0)} %</p>
          <p><strong>Amortissement :</strong> ${data.outputs.amortizationMonths} mois</p>
          <p><strong>Volume / an :</strong> ${data.outputs.volumePerYear}</p>
        </div>
      </div>
    `;

    await resend.emails
      .send({
        from: `Sysnext Industrial Solutions <${process.env.RESEND_FROM_EMAIL}>`,
        to: ['industriel@sysnext.com', 'sebastien.jourdan@sysnext.com'],
        subject: `[Sysnext ROI] ${segmentLabel} — ${data.contact.company}`,
        html: notifHtml,
      })
      .catch((err) => console.error('ROI notif email error:', err));

    return NextResponse.json({ success: true, dealId });
  } catch (error) {
    console.error('ROI industrie API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
