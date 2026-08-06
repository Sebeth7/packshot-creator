/**
 * Helpers Pipedrive partagés (extraits de app/api/roi-pdf/route.ts pour être
 * réutilisés par la route roi-lead du chat public — CDC §2 : pipeline
 * PackshotCreator id 3, stage « Calculs ROI » id 54).
 */

export const PIPEDRIVE_PIPELINE_ID = 3;
export const PIPEDRIVE_STAGE_ID = 54; // "Calculs ROI"

/** Retrouve une personne par email/téléphone, sinon la crée. */
export async function findOrCreatePipedrivePerson(
  apiToken: string,
  contact: { email?: string; phone?: string; company?: string }
): Promise<number | null> {
  const { email, phone, company } = contact;
  try {
    const searchTerm = email || phone || '';
    const searchField = email ? 'email' : 'phone';

    if (searchTerm) {
      const searchRes = await fetch(
        `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(searchTerm)}&fields=${searchField}&limit=1&api_token=${apiToken}`
      );
      const searchData = await searchRes.json();
      if (searchData.data?.items?.length > 0) {
        return searchData.data.items[0].item.id;
      }
    }

    const personData: Record<string, unknown> = {
      name: company || (email ? email.split('@')[0] : phone || 'Contact ROI Calculator'),
    };
    if (email) personData.email = [{ value: email, primary: true, label: 'work' }];
    if (phone) personData.phone = [{ value: phone, primary: true, label: 'work' }];

    const res = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });
    const data = await res.json();
    return data.data?.id || null;
  } catch (error) {
    console.error('Pipedrive person creation error:', error);
    return null;
  }
}

/** Crée un deal dans le stage « Calculs ROI » et y épingle une note. */
export async function createPipedriveDealWithNote(
  apiToken: string,
  params: { personId: number; title: string; noteContent: string }
): Promise<number | null> {
  try {
    const res = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${apiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: params.title,
        person_id: params.personId,
        pipeline_id: PIPEDRIVE_PIPELINE_ID,
        stage_id: PIPEDRIVE_STAGE_ID,
      }),
    });
    const data = await res.json();
    const dealId = data.data?.id;

    if (dealId) {
      await fetch(`https://api.pipedrive.com/v1/notes?api_token=${apiToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deal_id: dealId,
          content: params.noteContent,
          pinned_to_deal_flag: true,
        }),
      });
    }

    return dealId;
  } catch (error) {
    console.error('Pipedrive deal creation error:', error);
    return null;
  }
}

/** Lignes lisibles pour la note Pipedrive (attribution first-touch). */
export function formatAttributionLines(attribution?: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  landingPage?: string;
}): string[] {
  if (!attribution) return [];
  const lines: string[] = [];
  if (attribution.utmSource) lines.push(`🎯 Source : ${attribution.utmSource}`);
  if (attribution.utmMedium) lines.push(`📡 Medium : ${attribution.utmMedium}`);
  if (attribution.utmCampaign) lines.push(`📣 Campagne : ${attribution.utmCampaign}`);
  if (attribution.utmTerm) lines.push(`🔑 Terme : ${attribution.utmTerm}`);
  if (attribution.utmContent) lines.push(`🧩 Contenu : ${attribution.utmContent}`);
  if (attribution.referrer) lines.push(`🌐 Referrer : ${attribution.referrer}`);
  if (attribution.landingPage) lines.push(`🛬 Landing : ${attribution.landingPage}`);
  return lines;
}
