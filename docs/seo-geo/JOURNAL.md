# JOURNAL

Une entrée par intervention. **Plus récent en haut. On n'efface jamais.**

Un contrôle d'intégration refuse toute pull request modifiant le site sans
ajouter d'entrée ici.

---

## Gabarit — à copier

```markdown
## AAAA-MM-JJ · <titre court> · <Claude de Laurent | Claude de Sébastien>

**Chantier** : <référence 06-CHANTIERS, ex. C5> | **PR** : #<n> | **Commit** : `<sha>`

**Quoi** — ce qui a changé, en deux lignes maximum.

**Pourquoi** — le constat ou la mesure qui le justifie. Chiffré si possible.

**Fichiers** — `chemin/a.ts`, `chemin/b.json`

**Effet attendu** — ce qui devrait bouger, et sous quel délai.

**Vérifié** — commandes lancées, URL contrôlées, résultat.
**Supposé** — ce qui est tenu pour vrai sans contrôle, et pourquoi.
**Non regardé** — ce qui sort du champ de ce chantier. Ne pas laisser vide sans raison.

**Suite** — ce que ça ouvre, ce que ça bloque, ce qu'il reste.
```

Les trois rubriques **Vérifié / Supposé / Non regardé** ne sont pas
décoratives : le silence sur une dimension laisse croire qu'elle a été couverte.

---

## 2026-09-16 · Mise en place de la gouvernance SEO/GEO · Claude de Sébastien

**Chantier** : gouvernance | **PR** : à ouvrir | **Commit** : branche `docs/gouvernance-seo-geo`

**Quoi** — Création du cadre permettant à Laurent et à son Claude de conduire le
SEO/GEO en autonomie : `CLAUDE.md` à la racine, huit documents dans
`docs/seo-geo/`, quatre fichiers de passerelle vivants, trois workflows
d'intégration continue, un gabarit de pull request, un script de contrôle de
production.

**Pourquoi** — `main` n'avait pas bougé depuis le 04/09/2026, soit douze jours,
alors que le correctif de la cause structurelle n°1 attendait en branche. Le
goulot n'était ni la compétence ni les idées, mais la disponibilité de
Sébastien pour relire et merger. Le trafic organique est passé de 1 857 à
524 clics par mois entre janvier et août, soit -71,8 %.

**Fichiers** — `CLAUDE.md`, `docs/seo-geo/**` (13 fichiers),
`.github/workflows/**` (3), `.github/pull_request_template.md`,
`.github/CODEOWNERS`, `scripts/seo/smoke.mjs`, `playwright.config.ts`

**Effet attendu** — Laurent peut livrer sans attendre Sébastien sur la zone
verte. Les régressions mécaniques sont interceptées avant la production. Les
deux Claude restent synchronisés sans échange de mails.

**Vérifié** — Périmètre technique établi par lecture directe du dépôt et de
l'API GitHub : `origin/main` figé à `ff5658b` depuis le 04/09 · branche
`feat/audit-laurent-0309` poussée et non mergée · `lwainberg` dispose du droit
d'écriture · le ruleset `protect-main` ne bloque que la suppression et le
force-push, sans exiger de PR ni de contrôle · aucun workflow d'intégration
continue n'existait · aucun `CLAUDE.md` n'existait · 26 des 30 documents suivis
à la racine datent de janvier à mars 2026 · Vercel déploie automatiquement, en
Production sur `main` et en Preview sur branche · `lib/supabase.ts` lève au
chargement du module sans `NEXT_PUBLIC_SUPABASE_URL`, donc le build échoue sans
variables d'environnement · `lib/seo-config.ts` est importé par sept fichiers ·
aucun `loading.tsx` n'existe dans `app/` · `alternates.json` contient 61 entrées
pour le blog et 22 pour les guides.

**Supposé** — Le jeton `psc-n8n-publisher` a expiré le 10/09 (date issue de
l'historique projet, non vérifiable via l'API avec les droits actuels) · la
production du Worker diverge encore du dépôt (dernier constat du 03/09) · les
taux de blocage des bots IA sont ceux mesurés par Laurent le 04/09 · les taux de
504 proviennent de `cf_traffic_daily`, base à laquelle cette session n'a pas
accès.

**Non regardé** — L'état réel de la production ce jour (aucun test en ligne
n'a été fait) · le contenu détaillé de la branche `feat/audit-laurent-0309`,
non relu ligne à ligne · la configuration Cloudflare actuelle, WAF, bots et
Worker déployé · la base Supabase de Laurent · le comportement réel des trois
workflows d'intégration continue, qui ne peuvent s'exécuter qu'une fois la
première pull request ouverte.

**Suite** — Le document `06-CHANTIERS.md` liste treize chantiers, dont trois en
P0.

---

### Complément du 16/09 — le cadre a été testé sur lui-même

La PR #2 a servi de premier passage. **Les trois workflows sont verts** :
garde-périmètre 8 s, garde-journal 7 s, contrôles de PR 1 min 48 s — `npm ci`,
`tsc`, intégrité des 186 JSON, lint et `next build` complet avec variables
d'environnement factices.

Deux protections ont été découvertes en écrivant, et closes :

**1. Cloudflare bloque les scripts par empreinte TLS.** Sur
`www.packshot-creator.com`, 17 pages HTML sur 17 répondent 403 malgré un
user-agent Chrome complet ; seuls les fichiers statiques passent, ce qui donne
l'illusion que le site répond. La cible de contrôle automatisé est donc
`https://sysnext.vercel.app`, origine du déploiement de production — même HTML,
sans l'étage Cloudflare.

**2. Les Preview Vercel sont protégés par SSO.** 20 requêtes sur 20 redirigées
vers `vercel.com/sso-api`. Sans jeton de contournement, la porte « Preview
contrôlée » de la procédure ne peut pas être franchie. Le smoke test accepte
désormais `VERCEL_AUTOMATION_BYPASS_SECRET` et reconnaît les deux protections
au lieu de les signaler comme des pannes.

Trois gestes deviennent des prérequis à l'autonomie de Laurent, inscrits dans
`ETAT.md` : créer le jeton de contournement Vercel, ajouter `lwainberg` à
l'équipe Vercel, créer le libellé `zone-rouge-autorisee`.

**Écart réel remonté par le premier contrôle** : `/fr/outil-financement` n'est
pas en `noindex` en production — le correctif attend dans
`feat/audit-laurent-0309` (chantier C1). Marqué comme écart attendu dans le
script, à repasser en contrôle ferme au merge de C1.
