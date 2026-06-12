# Étude clients PackshotCreator 2026

Page de questionnaire de satisfaction client envoyée aux clients existants
après un appel téléphonique de l'équipe commerciale.

## URL finale

```
https://packshot-creator.com/etude-clients-2026
```

La page est **hors i18n** (exclue du middleware next-intl, comme `/calculateur-roi`).
C'est une page standalone français uniquement.

## URL avec pré-remplissage (envoyée au client après l'appel)

```
/etude-clients-2026?email=client@x.com&name=Jean+Dupont&company=Dupont+SARL&pid=12345
```

| Param  | Rôle                                      |
|--------|-------------------------------------------|
| email  | Pré-rempli, non affiché au client         |
| name   | Pré-rempli, sert aussi au bonjour "{prénom}" |
| company| Pré-rempli                                |
| pid    | `pipedrive_org_id` — stocké en base       |

Si l'URL est ouverte sans paramètres, la réponse est enregistrée sans
identifiants (champs null) — pas d'option d'anonymat côté client (retirée en v2).

## Stack

- **Next.js 16 App Router** (`app/etude-clients-2026/`)
- **Supabase** (projet `Sysnext`, table `client_survey_responses`) — voir
  `docs/etude-clients-2026-init.sql`
- **Resend** pour les emails (notif interne + confirmation client)
- **Pipedrive** : ajoute automatiquement une note sur la fiche org si `pid` fourni
- **Validation** Zod côté serveur, **rate limit** in-memory 5/IP/h

## Variables d'environnement

Voir `.env.example`. Toutes requises :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (secret, jamais côté client)
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NOTIFICATION_EMAIL`
- `PIPEDRIVE_API_TOKEN` + `PIPEDRIVE_DOMAIN` (optionnels ; sans eux, pas de note Pipedrive)

## Setup initial

1. Créer le projet Supabase dédié (ou réutiliser `Sysnext`).
2. Exécuter le SQL `docs/etude-clients-2026-init.sql` dans l'éditeur SQL Supabase.
3. Renseigner les variables d'environnement.
4. Déployer — pas de migration supplémentaire à faire.

## Changer de version de questionnaire (vague suivante)

Le champ `survey_version` distingue les vagues. Le questionnaire est défini dans
**`app/etude-clients-2026/survey-config.ts`** (source unique : options, libellés,
`SURVEY_VERSION`), partagé entre le formulaire et l'API. Pour lancer une V3 :

1. Dans `survey-config.ts`, changer `SURVEY_VERSION` (par ex. `'v3_2026_q4'`) et
   adapter les options si besoin.
2. Si des questions sont ajoutées/supprimées : répercuter sur `SurveyForm.tsx`
   (UI), `route.ts` (schéma Zod + emails/note) et le SQL (`docs/etude-clients-2026-init.sql`).
3. Déployer. Toutes les nouvelles réponses porteront la nouvelle version, les
   anciennes gardent l'ancienne — facile à filtrer en analyse.

Pour faire cohabiter plusieurs versions (A/B test par exemple), ajouter un
paramètre d'URL (`?v=v2`) et brancher dessus la constante côté form + API.

## Données enregistrées

Voir le schéma complet dans `docs/etude-clients-2026-init.sql`. En résumé (v2) :

- Identifiants (email, name, company, pipedrive_org_id) — null si URL sans params
- Bloc 1 équipement/usage : `q1_machines` (+ autre), `q2_anciennete`,
  `q3_frequence`, `q4_types_visuels`, `q5_volume_mensuel`
- Bloc 2 satisfaction : `q6_satisfaction_globale` (1-5), grille `q7_*` (6 × 1-5),
  `q8_nps` (0-10), `q9_benefices` (+ autre)
- Bloc 3 IA générative : `q10_ia_maturite`, `q11_ia_usages` (+ autre)
- Bloc 4 ouvertes : `q12_workflow`, `q13_signal_faible`, `remarques_libres`
- Les choix fermés stockent les clés stables de `survey-config.ts`, les
  multi-choix en `TEXT[]`
- `survey_version`, `source`, `user_agent`, `created_at`
- Consentements `consent_recontact`, `consent_newsletter`

RLS activée ; seul le service role peut lire — tout passe par les API routes.

## Rate limiting

5 soumissions / IP / heure. In-memory, donc par instance serveur. Pour un
volume plus élevé ou une protection plus robuste, remplacer `lib/rate-limit.ts`
par Upstash Redis.

## Tester en local

```
npm run dev
open "http://localhost:3000/etude-clients-2026?name=Jean+Dupont&email=jean@exemple.com&company=Exemple+SARL&pid=12345"
```
