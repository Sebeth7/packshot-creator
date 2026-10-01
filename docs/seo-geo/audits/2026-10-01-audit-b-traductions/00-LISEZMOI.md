# Audit B — traductions historiques Webflow (01/10/2026)

Livrables de la mission « Audit B » : recherche en lecture seule, base `main` `17fc0b3`. Aucun fichier du site modifié, aucune PR, aucun appel payant.

| # | Fichier | Contenu |
|---|---|---|
| 1 | `INVENTAIRE_WEBFLOW_TRADUCTIONS.csv` | 125 articles servis : origine, HTTP, robots, sitemap, title, H1, metaTitle, description, modifications depuis l'import, qualité, anomalies automatiques, GSC, PR concernée |
| 2 | `AUDIT_LINGUISTIQUE_GLOBAL.md` | Synthèse décisionnelle, corpus et provenance, méthode, résultats, constats transversaux, priorisation, limites |
| 3 | `TABLEAU_FAMILLES_EDITORIALES.csv` | 63 familles. Colonnes demandées : `ID_FAMILLE`, `SLUG_FR`, `SLUG_EN`, `SLUG_DE_CH`, `LANGUE_ORIGINALE_ET_PREUVE`, `QUALITE_FR`, `QUALITE_EN`, `QUALITE_DE_CH`, `ERREURS_CONCRETES`, `CLAIMS_A_REVERIFIER`, `SOURCE_RECONSTRUCTION`, `PRIORITE_SEO`, `PR_EXISTANTE_CONCERNEE`. Colonnes ajoutées : sujet, priorité de reprise, trafic, backlinks, recommandation, dossier |
| 4 | `DOSSIERS_RETRADUCTION_P1/` | 11 dossiers, un par famille prioritaire (voir ci-dessous) |
| 5 | `PLAN_REDEPLOIEMENT_TRADUCTIONS.md` | Lots de PR L0 à L9, volumes, décideurs, tests, ordre, arbitrages A1 à A7, entrée de JOURNAL prête |
| — | `ANOMALIES_DETAILLEES.csv` | Inventaire complet des anomalies : 2 174 lignes (1 869 de relecture, 305 automatiques) |
| — | `CLAIMS_A_REVERIFIER.csv` | 574 affirmations chiffrées ou commerciales, avec source citée et écart FR/EN |

Format des CSV : séparateur `;`, UTF-8, première ligne d'en-tête.

**Annexes** (`ANNEXES/`) :

| Élément | Contenu |
|---|---|
| `RELECTURES_JSON/<ID>.json` | Relectures brutes des 60 familles : notes, justifications, erreurs, claims, diagnostics. Source des CSV |
| `CONSIGNES_RELECTURE.md` | Consignes de relecture |
| `CONSIGNES_DOSSIER.md` | Consignes des dossiers P1 |
| `GSC_REQUETES_P1.md` | Requêtes GSC principales des URL P1 |

## Dossiers P1

| Dossier | Famille | Pourquoi P1 |
|---|---|---|
| `01-interview-fondateur` | `67e2ad27…` | Nom remplacé : `<title>` servi « PackshotCreator, fondateur de PackshotCreator » |
| `02-guide-packshot-pourquoi` | `67d154e9…` | Première famille en trafic (804 clics sur 365 jours) ; FR, EN et de-ch ; ligne de crédit modifiée |
| `03-format-image-web` | `67dd331e…` | 605 clics ; FR, EN et de-ch ; backlink vers l'ancienne URL `/de/` |
| `04-objectif-packshot` | `67dd7e0c…` | 713 clics, EN en tête (« best lens for product photography ») |
| `05-materiel-photo-packshot` | `67d16fc7…` | 526 clics |
| `06-bague-8-etapes` | `67d05615…` | 365 clics |
| `07-logiciel-ortery-perdu` | `681a1a29…` | 251 clics ; page d'entrée des anciens clients (requêtes de marque) |
| `08-joailliers-visuels` | `67d05174…` | 189 clics ; backlink EN |
| `09-cadrage-composition` | `67e41233…` | 168 clics ; backlink EN |
| `10-photo-produit-e-commerce` | `670e262c…` | 149 clics ; 7 467 impressions sur 90 jours |
| `11-photos-professionnelles-coherence` | `67d1ac64…` | 5 511 impressions sur 90 jours, presque aucun clic |

Chaque dossier contient :

| Fichier | Contenu |
|---|---|
| `00-FICHE.md` | Identité, trafic, origine linguistique et preuve, verdicts |
| `01-TEXTE_ACTUEL.md` | Texte intégral servi aujourd'hui, toutes langues (généré depuis le JSON, aucun mot modifié) |
| `02-ORIGINAL_RETROUVE.md` | Texte intégral à l'import Webflow (`56d4bc32`), commits postérieurs, écarts |
| `03-ANOMALIES_ANNOTEES.md` | Toutes les anomalies, avec l'extrait exact et la correction retenue |
| `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md`, `04-PROPOSITION_DE-CH.md` (02 et 03) | Textes intégraux proposés |
| `05-METADONNEES_PROPOSEES.md` | Title, H1, metaTitle, description, alt, légendes ; slug conservé |
| `06-VALIDATION_HUMAINE.md` | Points à trancher, avec le décideur pressenti |

**Champ `author`** : il reste inchangé dans toutes les propositions (arbitrage A1 du plan). Deux variantes sont soumises à décision :
- dossier 04 : « Laurent Wainberg » ;
- dossier 03, EN : « Sébastien Jourdan », pour s'aligner sur le FR et la de-ch.

Les **lignes de crédit** des dossiers 02 et 03 rétablissent « Laurent Wainberg ». Le **corps** de l'interview (dossier 01) le rétablit aussi. Tous ces rétablissements dépendent de l'arbitrage A1.

**Statut des propositions** : non publiées. Le texte français client relève de la validation de Sébastien (D42 étape 5, `01-RAYON-ACTION.md`). L'EN et le de-ch sont rédigés depuis la proposition FR : ils seront à recaler sur le FR validé (D38, D42 étape 7).

## Notes de lecture

- **Notes de qualité** : `A` publiable ; `B` retouches ponctuelles ; `C` réécriture partielle ; `D` traduction automatique visible, retraduction complète ; `X` mauvaise langue.
- **Priorité de reprise** :
  - P0 : défaut d'intégrité servi ;
  - P1 : priorité SEO P1 (au moins 150 clics sur 365 jours ou 5 000 impressions sur 90 jours) ;
  - P2 : priorité SEO P2 et qualité C ou D ;
  - P3 : le reste.
- **GSC** : `gsc-crawl-seo`, lecture seule, données au 28/09/2026, tous pays. Clics sur 365 jours comptés sur les URL actuelles et sur les anciennes URL redirigées par le Worker.
- **Étiquettes** : `[Inférence]` signale une déduction, pas une preuve. « SOURCE ORIGINALE NON ÉTABLIE » signale qu'aucune trace ne prouve la langue d'origine.
