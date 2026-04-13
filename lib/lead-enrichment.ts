/**
 * Lead Enrichment Module
 *
 * Enrichit automatiquement les leads via :
 * 1. API Recherche Entreprises (data.gouv.fr) — données INSEE gratuites
 * 2. Google Gemini — résumé IA + recommandation machine
 */

// ── Types ─────────────────────────────────────────────────────

interface CompanyData {
  nom: string;
  siren: string;
  categorie: string; // PME, ETI, GE
  effectif: string;
  anneeEffectif: string | null;
  naf: string;
  dateCreation: string;
  siege: string;
  adresse: string;
  nbEtablissements: number;
}

export interface EnrichedLead {
  company: CompanyData | null;
  aiSummary: string | null;
}

// ── Mapping effectifs INSEE ───────────────────────────────────

const TRANCHE_EFFECTIF: Record<string, string> = {
  'NN': 'Non renseigné',
  '00': '0 salarié',
  '01': '1-2 salariés',
  '02': '3-5 salariés',
  '03': '6-9 salariés',
  '11': '10-19 salariés',
  '12': '20-49 salariés',
  '21': '50-99 salariés',
  '22': '100-199 salariés',
  '31': '200-249 salariés',
  '32': '250-499 salariés',
  '41': '500-999 salariés',
  '42': '1 000-1 999 salariés',
  '51': '2 000-4 999 salariés',
  '52': '5 000-9 999 salariés',
  '53': '10 000+ salariés',
};

const CATEGORIE_LABELS: Record<string, string> = {
  'PME': 'PME',
  'ETI': 'ETI (Entreprise de Taille Intermédiaire)',
  'GE': 'Grande Entreprise',
  'TPE': 'TPE',
};

// ── 1. Recherche entreprise (data.gouv.fr) ────────────────────

async function searchCompany(companyName: string): Promise<CompanyData | null> {
  try {
    const res = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(companyName)}&page=1&per_page=1`,
      { signal: AbortSignal.timeout(5000) }
    );

    if (!res.ok) return null;
    const data = await res.json();

    if (!data.results?.length) return null;

    const r = data.results[0];
    return {
      nom: r.nom_complet || companyName,
      siren: r.siren || '',
      categorie: CATEGORIE_LABELS[r.categorie_entreprise] || r.categorie_entreprise || 'Non classée',
      effectif: TRANCHE_EFFECTIF[r.tranche_effectif_salarie] || 'Non renseigné',
      anneeEffectif: r.annee_tranche_effectif_salarie || null,
      naf: r.activite_principale || '',
      dateCreation: r.date_creation || '',
      siege: r.siege?.libelle_commune || '',
      adresse: r.siege?.adresse || '',
      nbEtablissements: r.nombre_etablissements || 0,
    };
  } catch (error) {
    console.error('Company search error:', error);
    return null;
  }
}

// ── 2. Résumé IA via Gemini ───────────────────────────────────

async function generateAISummary(
  contactData: {
    firstName: string;
    lastName: string;
    company: string;
    sector: string;
    requestType: string;
    message?: string;
    pageSource?: string;
    machineContext?: string;
  },
  companyData: CompanyData | null
): Promise<string | null> {
  const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) return null;

  try {
    const companyContext = companyData
      ? `Données INSEE : ${companyData.nom}, SIREN ${companyData.siren}, ${companyData.categorie}, ${companyData.effectif}${companyData.anneeEffectif ? ` (${companyData.anneeEffectif})` : ''}, NAF ${companyData.naf}, siège ${companyData.siege}, ${companyData.nbEtablissements} établissement(s), créée le ${companyData.dateCreation}.`
      : 'Aucune donnée INSEE trouvée.';

    const prompt = `You are a sales assistant for PackshotCreator/Sysnext, exclusive Orbitvu distributor in France and Switzerland. You help qualify incoming leads.

Lead context:
- Contact: ${contactData.firstName} ${contactData.lastName}
- Company: ${contactData.company}
- Industry: ${contactData.sector}
- Request type: ${contactData.requestType}
${contactData.message ? `- Message: ${contactData.message}` : ''}
${contactData.pageSource ? `- Source page: ${contactData.pageSource}` : ''}
${contactData.machineContext ? `- Machine viewed: ${contactData.machineContext}` : ''}

${companyContext}

Available machines (smallest to largest):
- Alphashot Micro: small objects (jewelry, watches, cosmetics) up to 32x27cm
- Alphashot Pro G2: medium objects (shoes, bags, electronics) up to 68x62cm
- Alphashot XL: medium-large objects (small furniture, equipment) up to 108x100cm
- Alphashot 360: 360 animation for any object type
- E-Comm Studio: complete e-commerce studio, objects up to 74x68cm
- Fashion Studio: garments on mannequin or hanger
- Furniture Studio: large objects (furniture, bikes, sports equipment)
- Alphatable: flat surface for flat-lay shooting

Reply in plain text (no markdown, no bold, no asterisks). 3-4 lines max, format:
1. Profile: [size, activity, potential in one sentence]
2. Machine(s): [recommendation and why]
3. Priority: [High/Medium/Low + short justification]`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.3,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error('AI summary error:', error);
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────

export async function enrichLead(contactData: {
  firstName: string;
  lastName: string;
  company: string;
  sector: string;
  requestType: string;
  message?: string;
  pageSource?: string;
  machineContext?: string;
}): Promise<EnrichedLead> {
  // Step 1: Company data (fast, ~200ms)
  const company = await searchCompany(contactData.company);

  // Step 2: AI summary (uses company data + contact context, ~1-2s)
  const aiSummary = await generateAISummary(contactData, company);

  return { company, aiSummary };
}

/**
 * Formate les données enrichies en texte pour une note Pipedrive
 */
export function formatEnrichmentNote(enriched: EnrichedLead): string {
  const lines: string[] = ['', '━━━ AUTO-ENRICHMENT ━━━', ''];

  if (enriched.company) {
    const c = enriched.company;
    lines.push(`🏢 ${c.nom}`);
    if (c.siren) lines.push(`📋 SIREN: ${c.siren}`);
    lines.push(`📊 Category: ${c.categorie}`);
    lines.push(`👥 Employees: ${c.effectif}${c.anneeEffectif ? ` (${c.anneeEffectif})` : ''}`);
    if (c.naf) lines.push(`🏭 NAF: ${c.naf}`);
    if (c.dateCreation) lines.push(`📅 Founded: ${c.dateCreation}`);
    if (c.siege) lines.push(`📍 HQ: ${c.adresse}`);
    if (c.nbEtablissements > 1) lines.push(`🏗 ${c.nbEtablissements} locations`);
  } else {
    lines.push('🏢 Company not found in INSEE database');
  }

  if (enriched.aiSummary) {
    lines.push('');
    lines.push('🤖 AI Analysis:');
    lines.push(enriched.aiSummary);
  }

  return lines.join('\n');
}
