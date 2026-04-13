/**
 * Lead Enrichment Module
 *
 * Enrichit automatiquement les leads via :
 * 1. API Recherche Entreprises (data.gouv.fr) — données INSEE gratuites
 * 2. Fallback domaine email → fetch site web (meta description)
 * 3. Google Gemini — résumé IA + recommandation machine
 */

// ── Types ─────────────────────────────────────────────────────

interface CompanyData {
  source: 'insee' | 'website';
  nom: string;
  siren: string;
  categorie: string;
  effectif: string;
  anneeEffectif: string | null;
  naf: string;
  dateCreation: string;
  siege: string;
  adresse: string;
  nbEtablissements: number;
}

interface WebsiteData {
  domain: string;
  title: string;
  description: string;
}

export interface EnrichedLead {
  company: CompanyData | null;
  website: WebsiteData | null;
  aiSummary: string | null;
}

// ── Mapping effectifs INSEE ───────────────────────────────────

const TRANCHE_EFFECTIF: Record<string, string> = {
  'NN': 'Unknown',
  '00': '0 employees',
  '01': '1-2 employees',
  '02': '3-5 employees',
  '03': '6-9 employees',
  '11': '10-19 employees',
  '12': '20-49 employees',
  '21': '50-99 employees',
  '22': '100-199 employees',
  '31': '200-249 employees',
  '32': '250-499 employees',
  '41': '500-999 employees',
  '42': '1,000-1,999 employees',
  '51': '2,000-4,999 employees',
  '52': '5,000-9,999 employees',
  '53': '10,000+ employees',
};

const CATEGORIE_LABELS: Record<string, string> = {
  'PME': 'SME',
  'ETI': 'Mid-size company',
  'GE': 'Large enterprise',
  'TPE': 'Micro-enterprise',
};

// ── Helpers ───────────────────────────────────────────────────

const GENERIC_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.fr', 'hotmail.com',
  'hotmail.fr', 'outlook.com', 'outlook.fr', 'live.com', 'live.fr',
  'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr', 'laposte.net',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'protonmail.com',
  'proton.me', 'gmx.com', 'gmx.fr', 'mail.com',
]);

function extractDomain(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain || GENERIC_DOMAINS.has(domain)) return null;
  return domain;
}

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
      source: 'insee',
      nom: r.nom_complet || companyName,
      siren: r.siren || '',
      categorie: CATEGORIE_LABELS[r.categorie_entreprise] || r.categorie_entreprise || 'Unclassified',
      effectif: TRANCHE_EFFECTIF[r.tranche_effectif_salarie] || 'Unknown',
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

// ── 2. Fallback : fetch website from email domain ─────────────

async function fetchWebsiteInfo(domain: string): Promise<WebsiteData | null> {
  try {
    const res = await fetch(`https://${domain}`, {
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'PackshotCreator Lead Enrichment Bot',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || '';

    // Extract meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const description = descMatch?.[1]?.trim() || '';

    if (!title && !description) return null;

    return { domain, title, description };
  } catch {
    return null;
  }
}

// ── 3. Résumé IA via Gemini ───────────────────────────────────

async function generateAISummary(
  contactData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    sector: string;
    requestType: string;
    message?: string;
    pageSource?: string;
    machineContext?: string;
  },
  companyData: CompanyData | null,
  websiteData: WebsiteData | null
): Promise<string | null> {
  const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) return null;

  try {
    let companyContext: string;
    if (companyData) {
      companyContext = `INSEE data: ${companyData.nom}, SIREN ${companyData.siren}, ${companyData.categorie}, ${companyData.effectif}${companyData.anneeEffectif ? ` (${companyData.anneeEffectif})` : ''}, NAF ${companyData.naf}, HQ ${companyData.siege}, ${companyData.nbEtablissements} location(s), founded ${companyData.dateCreation}.`;
    } else {
      companyContext = 'No INSEE data found (company may be foreign or not registered in France).';
    }

    if (websiteData) {
      companyContext += `\nWebsite (${websiteData.domain}): "${websiteData.title}". ${websiteData.description}`;
    }

    const emailDomain = extractDomain(contactData.email);
    const emailNote = emailDomain
      ? `Email domain: ${emailDomain} (professional)`
      : `Email: generic/personal address (${contactData.email.split('@')[1]})`;

    const prompt = `You are a sales assistant for PackshotCreator/Sysnext, exclusive Orbitvu distributor in France and Switzerland. You help qualify incoming leads.

Lead context:
- Contact: ${contactData.firstName} ${contactData.lastName}
- ${emailNote}
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
  email: string;
  company: string;
  sector: string;
  requestType: string;
  message?: string;
  pageSource?: string;
  machineContext?: string;
}): Promise<EnrichedLead> {
  // Step 1: Try INSEE search by company name
  const company = await searchCompany(contactData.company);

  // Step 2: If no INSEE data, try website from email domain
  let website: WebsiteData | null = null;
  const domain = extractDomain(contactData.email);

  if (!company && domain) {
    // No French company data — try the company website for context
    website = await fetchWebsiteInfo(domain);
  } else if (domain) {
    // Even with INSEE data, grab website info for extra context
    website = await fetchWebsiteInfo(domain);
  }

  // Step 3: AI summary (uses all available data)
  const aiSummary = await generateAISummary(contactData, company, website);

  return { company, website, aiSummary };
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
    lines.push('🏢 Company not found in INSEE (foreign or unregistered)');
  }

  if (enriched.website) {
    lines.push('');
    lines.push(`🌐 Website: ${enriched.website.domain}`);
    if (enriched.website.title) lines.push(`   ${enriched.website.title}`);
    if (enriched.website.description) {
      const desc = enriched.website.description.length > 200
        ? enriched.website.description.slice(0, 200) + '...'
        : enriched.website.description;
      lines.push(`   ${desc}`);
    }
  }

  if (enriched.aiSummary) {
    lines.push('');
    lines.push('🤖 AI Analysis:');
    lines.push(enriched.aiSummary);
  }

  return lines.join('\n');
}
