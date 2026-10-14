# Registre des corrections — audits A/B/C/D

**Date** : 2026-10-14 · **Auteur** : Claude de Laurent
**Base** : `main` `6717c4f` · **Autorisations** : GO_CODE / GO_COMMIT / GO_PUSH / GO_PR_DRAFT = YES ; GO_MERGE = NO.

Ce registre clôt la dette des audits A/B/C/D au niveau des **résidus vérifiés**. Il ne refait aucun
audit. La matrice complète par anomalie est dans `01-MATRICE-AUDITS-A-D.csv`. La passe de
réconciliation (12-13/10) reste la source : `PSC_CONSOLIDATION_AUDITS_A_B_C_D_LIVRABLES_2026-10-13.zip`.

## 1. Corrections appliquées par cette PR

| ID audit | Correction | Décision / preuve | Fichiers |
|---|---|---|---|
| B1 | Fondateur = **Laurent Wainberg** rétabli dans `title`/`h1`/`metaTitle`/`description` des 2 interviews (FR+EN, 8 champs) | Fait métier Laurent 14/10 (A3) | `content/blog/fr/decryptages-interviewe-laurent-wainberg-…json`, `content/blog/en/interview-laurent-wainberg-founder-packshotcreator.json` |
| B4 | « distribue **exclusivement** » → « distribue **officiellement** » les solutions Orbitvu | D6 (20/08 : officiel, jamais exclusif) | `content/blog/fr/focus-sur-lhyperfocus.json` |
| D3 | Label « N min de lecture » localisé EN (`lang === 'fr' ? … : '… min read'`), 6 pages | A2 (anomalie i18n) ; motif déjà en vigueur (`budget-studio-photo-automatise`) | `app/[lang]/blog/{ia-photo-produit-guide-2026,blendai-vs-flair-…,orbitvu-vs-concurrents,blendai-vs-photoroom-…,guide-achat-studio-2026,comment-calculer-le-roi-…}/page.tsx` |
| FAQ interviews | Attribution incorrecte « fondateur de la société Sysnext » **retirée** (non transférée) dans la réponse FAQ, FR+EN. FR → « PackshotCreator a introduit dès 2003 en Europe le premier système… » ; EN → « PackshotCreator introduced the first automated product photography system in Europe in 2003. » | Décision éditoriale Laurent du 14/10 | `content/blog/fr/decryptages-…packshotcreator.json`, `content/blog/en/interview-laurent-wainberg-founder-packshotcreator.json` |

**Tests** (R1) : `tsc --noEmit` 0 ; `vitest run` 633/633 ; `verifier-json` 198 valides ; `next build` 390/390, exit 0.

## 2. Corrigé antérieurement / sans objet (rappel, non ré-ouvert)

- **CORRIGÉ sur `main`** : hôte `gs-new-features` (A), ancres CTA ROI → `/calculateur-roi` (D47/#93), `<a>` sans href (#92), ShotFlow, hreflang `generer-images-produit-ia` (#88), 404 `[lang]`, `layout.tsx`, cartes secteurs, blog dynamique, aria-label cartes.
- **SANS OBJET / prémisse fausse** : prix ROI présents en EN ; pixcap/skeelbox/macrosphère = texte (pas de lien) ; 404 racine hors périmètre langue ; secteur **défense** construit et promu (pas abandonné) ; corpus = 140 articles (pas 125).

## 3. Déjà traité par une autre PR — ne pas doubler

- **B2** valeurs `alt` `__wf_reserved_` (66 fichiers / 169 occ) : PR **#113** (Repair Factory PR-B, ALT) sous GO_MERGE conditionnel. Recompter le résidu après fusion de #113.

## 4. HOLD — avec motif et décision/autorisation manquante exacte

| ID | Objet | Type de HOLD | Ce qui manque exactement |
|---|---|---|---|
| C006 | 2 boutons inertes du calculateur ROI (`ContextualCTA.tsx:117,125`) | HOLD AUTORISATION | Calculateur ROI = périmètre Sébastien (`CLAUDE.md`). A1 : ne pas étendre D58. Correctif isolé prêt ; attend un GO propriétaire. |
| D1 | Cas d'usage FR du calculateur ROI (`MachineRecommendation.tsx:205`) + `useCasesI18n` manquant `alphastudio-compact-v2` | HOLD AUTORISATION | Même périmètre Sébastien (calculateur ROI / sélecteur). GO propriétaire. |
| B3 | 3 pages `/en` entièrement en français | HOLD GOUVERNANCE | F1 + D9/D17/D38 : traduction de contenu depuis FR validée ; backlog consolidé. |
| A-dech-fr | 31 liens de-ch → pages FR | HOLD GOUVERNANCE | F1 (maillage/traduction des audits). |
| C-amazon / C-vin | Maillage éditorial `/packshot-amazon` (0 lien), `vin-spiritueux` (faible) | HOLD GOUVERNANCE | F1 (maillage) + backlog consolidé dédoublonné. |
| C-llms | Complétion `llms.txt` (horlogerie, 3 `/solutions/*`, `/industrie-defense`, EN/DE) | HOLD GOUVERNANCE + R8 | Décision de périmètre (rayon large) ; non régression. |
| D2/D7 | `organizationSchema().description` figée FR | HOLD R8 + gels | Rendu sur accueil/F5/Mode (gelés 28/10, 23/11, 26/11) ; dépend de l'arbitrage date D33. |
| C-solutions | Méga-menu « Solutions » non crawlable (SSR) | HOLD DÉCISION | Atténué par Footer SSR ; refonte architecturale à arbitrer (A7). |

## 5. NON ÉTABLI PAR LA SOURCE

- **Corps de l'interview (ligne 20)** : ~~« PackshotCreator, fondateur de la société Sysnext »~~ — **RÉSOLU le 14/10** : attribution retirée (FR+EN), validée par Laurent (voir § 1). Laurent n'est pas affirmé fondateur juridique de Sysnext.
- **Claim « premier système de photographie automatisée en Europe (2003) »** : conservé tel quel dans la phrase corrigée, **non revérifié** par une source dans cette mission. Pas de renforcement. Atténuation éventuelle (« l'un des premiers ») = décision éditoriale distincte, ouverte.
- **CSV primaires A/C/D, registres V4.3 (582) et G5 (208)** : non montés dans la session. Comptage ligne-à-ligne non réalisable ; état documentaire conservé (`00-ÉTAT-SOURCES` de la passe du 12/10). N'empêche pas les corrections ci-dessus, fondées sur des preuves code suffisantes.

## 6. Recommandation de fusion ultérieure

- **Peut recevoir un GO_MERGE** (après CI verte + QA Preview) : la présente PR (B1, B4, D3) — corrections factuelles/i18n à preuve suffisante, hors gels, hors propriété Sébastien.
- **Restent bloquées** : C006 et D1 (GO propriétaire Sébastien) ; B3 / de-ch→FR / Amazon-vin / llms.txt (F1, backlog consolidé) ; D2 (gels + D33) ; C-solutions (décision A7) ; ligne 20 interview (confirmation factuelle Laurent).
