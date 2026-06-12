-- ============================================================================
-- Table : survey.client_survey_responses — questionnaire v2 (v2_2026_q2)
-- Projet Supabase hôte : gsc-crawl-seo (org packshot-art-prod, plan Pro)
-- Usage : stockage des réponses du questionnaire /etude-clients-2026
--
-- Isolation : schéma Postgres dédié `survey`, séparé du schéma `public` du
-- projet hôte. Aucun droit pour anon/authenticated ; seul service_role accède.
-- IMPORTANT : après exécution, ajouter `survey` aux "Exposed schemas" du
-- Data API (Project Settings → Data API), sinon l'API route échoue.
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS survey;

-- Accès réservé au service_role (utilisé par l'API route serveur).
-- anon / authenticated ne reçoivent volontairement AUCUN droit sur ce schéma.
GRANT USAGE ON SCHEMA survey TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA survey GRANT ALL ON TABLES TO service_role;

CREATE TABLE IF NOT EXISTS survey.client_survey_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    -- Identification (nullable : URL ouverte sans paramètres)
    pipedrive_org_id TEXT,
    client_email TEXT,
    client_name TEXT,
    client_company TEXT,

    -- Métadonnées
    survey_version TEXT DEFAULT 'v2_2026_q2',
    source TEXT DEFAULT 'operation_a_clients_existants',
    user_agent TEXT,

    -- Bloc 1 : équipement & utilisation (valeurs = clés de survey-config.ts)
    q1_machines TEXT[],
    q1_machines_autre TEXT,
    q2_anciennete TEXT,
    q3_frequence TEXT,
    q4_types_visuels TEXT[],
    q5_volume_mensuel TEXT,

    -- Bloc 2 : satisfaction
    q6_satisfaction_globale SMALLINT CHECK (q6_satisfaction_globale BETWEEN 1 AND 5),
    q7_qualite_images SMALLINT CHECK (q7_qualite_images BETWEEN 1 AND 5),
    q7_productivite SMALLINT CHECK (q7_productivite BETWEEN 1 AND 5),
    q7_logiciel SMALLINT CHECK (q7_logiciel BETWEEN 1 AND 5),
    q7_detourage SMALLINT CHECK (q7_detourage BETWEEN 1 AND 5),
    q7_fiabilite SMALLINT CHECK (q7_fiabilite BETWEEN 1 AND 5),
    q7_support SMALLINT CHECK (q7_support BETWEEN 1 AND 5),
    q8_nps SMALLINT CHECK (q8_nps BETWEEN 0 AND 10),
    q9_benefices TEXT[],
    q9_benefices_autre TEXT,

    -- Bloc 3 : IA générative
    q10_ia_maturite TEXT,
    q11_ia_usages TEXT[],
    q11_ia_usages_autre TEXT,

    -- Bloc 4 : questions ouvertes
    q12_workflow TEXT,
    q13_signal_faible TEXT,
    remarques_libres TEXT,

    -- Consentements
    consent_recontact BOOLEAN DEFAULT false,
    consent_newsletter BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_survey_pipedrive
    ON survey.client_survey_responses(pipedrive_org_id);

CREATE INDEX IF NOT EXISTS idx_survey_created
    ON survey.client_survey_responses(created_at DESC);

-- Row Level Security : aucun accès public en lecture.
-- Seule la service_role key (API serveur) peut lire/écrire.
ALTER TABLE survey.client_survey_responses ENABLE ROW LEVEL SECURITY;

-- Pas de policy SELECT/INSERT publique. Tout passe par l'API route serveur
-- qui utilise SUPABASE_SERVICE_ROLE_KEY (bypass RLS par design).

COMMENT ON TABLE survey.client_survey_responses IS
    'Réponses au questionnaire de satisfaction client (opération PackshotCreator 2026, v2).';
COMMENT ON COLUMN survey.client_survey_responses.survey_version IS
    'Permet de distinguer les différentes vagues/versions du questionnaire.';
COMMENT ON COLUMN survey.client_survey_responses.q1_machines IS
    'Clés des solutions cochées (cf. MACHINES dans app/etude-clients-2026/survey-config.ts).';
COMMENT ON COLUMN survey.client_survey_responses.q8_nps IS
    'Net Promoter Score 0-10.';

GRANT ALL ON ALL TABLES IN SCHEMA survey TO service_role;
