import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_URL');
}

// Les tables du questionnaire vivent dans le schéma Postgres `survey`,
// isolé du schéma `public` du projet hôte (gsc-crawl-seo). Le schéma doit
// être listé dans les "Exposed schemas" du Data API Supabase.
export function getSupabaseAdmin() {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing env var: SUPABASE_SERVICE_ROLE_KEY (server only)');
  }
  return createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    db: { schema: 'survey' },
  });
}

export function getSupabasePublic(): SupabaseClient {
  if (!SUPABASE_ANON_KEY) {
    throw new Error('Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  return createClient(SUPABASE_URL!, SUPABASE_ANON_KEY);
}
