# Registre des écarts de dimensions produit

Application de la règle D45 (R-PRODUCT-DIM). Photographie du **03/10/2026**, `main` `de6c4cd`.

- Référentiel : `data/produits/fiches-techniques.ts` (valeurs du site, fiche fabricant, statut par caractéristique).
- Écarts commerciaux entre catalogues : `data/produits/ecarts-connus.ts`.
- Contrôle : `lib/produits/__tests__/coherence-dimensions.test.ts` (Vitest).
- Inventaire automatique des triplets libres : `npx tsx scripts/produits/inventaire-mentions.mts` (81 triplets, 13 sans correspondance au 03/10).
- Questions : Q20 (`docs/seo-geo/BOITE-AUX-LETTRES.md`).
- Source fabricant : pages publiques `orbitvu.com/products/*`, HTML brut relevé le 03/10/2026 à 05:54 UTC.

Statut « conforme » : correspondance numérique entre la valeur du site et la fiche fabricant consultée, à la date du relevé. Il ne valide pas la correspondance entre la version commerciale PSC et le produit fabricant (« Pro v2 », XL v2, Compact, XXL : Q20.2, Q20.12). Au 03/10, l'objet maximal correspond numériquement pour 11 machines sur 17 ; aucune version n'est validée par ce décompte.

Catégories :
- **A — erreur démontrée** : même produit (nom fabricant identique), valeur du site différente de la source. Correction technique possible après accord de Sébastien sur le périmètre (catalogues de machines : son périmètre).
- **B — contradiction commerciale ou documentaire** : version non établie, sources contradictoires, ou source absente. Aucune valeur remplacée avant la réponse de Sébastien.
- **C — formulation** : valeur imprécise ou attribuée au mauvais produit dans un texte rédigé ; correction dans le circuit éditorial (D42), par ou avec Sébastien pour sa prose.

---

## 1. Caractéristiques des catalogues de machines

Valeurs identiques dans les deux catalogues pour les 16 machines communes (contrôle K1).

| Machine (PSC) | Caractéristique | Site | Fabricant (03/10) | Statut | Cat. | Q20 |
|---|---|---|---|---|---|---|
| Alphastudio XXL Pro v2 | Version | « XXL Pro v2 » | « Alphastudio XXL » | à arbitrer | B | Q20.2 |
| Alphastudio XXL Pro v2 | Objet maximal | 100 × 90 × 190 cm (l, w, h) | 190 × 90 × 100 cm, axes non précisés | conforme (valeurs) | — | Q20.6 (axes) |
| Alphastudio XXL Pro v2 | Encombrement | 277 × 190 × 273 cm | 247 × 139 × 164 cm, 340 kg | à arbitrer | B | Q20.3 |
| Alphashot XL G2 | Encombrement | 142 × 87 × 176 cm (valeurs de l'Alphashot XL ancienne génération) | 88 × 140 × 197 cm (W × D × H), 140 kg | écart | A | Q20.4 |
| Alphashot Micro Pro v2 | Encombrement | 83 × 52 × 72 cm | 83 × 54 × 72 cm | écart | A | Q20.5 |
| Alphashot Micro Pro v2 | Objet maximal | 18 × 15 × 16 cm | « up to 18 cm long » | 18 conforme ; 15 × 16 non vérifiables | B | Q20.5 |
| Alphatable v2 | Encombrement | 338 × 191 × 268 cm | 255 × 191 × 248 cm (« Alphatable ») | à arbitrer | B | Q20.5 |
| Alphadesk v2 (délistée) | Encombrement | 137 × 123 × 155 cm | 156 × 124 × 138 cm (« Alphadesk ») | à arbitrer | B | Q20.5, Q20.12 |
| Furniture Studio | Objet, encombrement, charge | 250 × 200 × 180 cm ; 500 × 400 × 300 cm ; 500 kg | 300 × 300 × 200 ; 670 × 588 × 302 ; 4 000 kg (bloc identique à E-comm Studio+) | à arbitrer | B | Q20.1 |
| E-Comm Studio+ | Charge | « 1000 kg (4000 kg option) », calcul 1 000 kg | 4 000 kg, sans option | à arbitrer | B | Q20.8 |
| Fashion Studio Pro v2 | Charge | « 200 kg/m² », calcul 0 (non limitant) | ponctuelle 35 kg, surfacique 200 kg | à arbitrer | B | Q20.9 |
| Alphashot XL Pro v2 | Axes | 50 × 70 × 30 cm, hauteur 30 | pas de page fabricant ; articles : 70 h × 50 l × 30 p | non vérifiable | B | Q20.7 |
| Alphashot XL Wine v2, Fashion Studio Basic, Alphashot G2 | Tout | voir référentiel | pas de page fabricant | non vérifiable | B | Q20.10 |
| Alphashot 360, Pro G2, XL v2, Compact Pro v2, Bike Studio | Tout | — | identiques | conforme | — | — (version XL v2, Compact : Q20.2, Q20.12) |

Hors dimensions, même mécanisme de double saisie (Q20.13, Q20.14) :

| Machine | Champ | Sélecteur | Calculateur ROI |
|---|---|---|---|
| Alphashot 360 | Catégories de taille | petit, moyen | petit |
| Alphashot XL G2 | Catégories de taille | grand | moyen, grand (choix daté « Seb 07/08 ») |
| Alphashot Pro G2 | Catégories de taille | petit, moyen | petit |
| Alphashot XL v2 | Catégories de taille | moyen, grand | moyen |
| Alphashot XL Pro v2 | Catégories de taille | moyen, grand | moyen |
| Alphadesk | Cadence par jour | 480 | 300 |
| Alphatable | Cadence par jour | 500 | 300 |
| Furniture Studio | Cadence par jour | 60 | 40 |

---

## 2. Contenus historiques et textes libres

Liste exhaustive au 03/10 des dimensions fausses, suspectes ou imprécises hors catalogues. Méthode : inventaire des triplets (script), recherche des mentions « nombre + cm / kg / m » à moins de 220 caractères d'un nom de machine dans `app`, `components`, `lib`, `messages`, `content`, `data`, `public`, et lecture.

| # | Fichier, clé ou ligne | Langues | Texte | Référence | Nature | Cat. | Circuit | Gel |
|---|---|---|---|---|---|---|---|---|
| H1 | `app/[lang]/blog/guide-achat-studio-2026/page.tsx` l. 190, 198 | FR | « AlphaShot Micro », « Dimensions utiles : 30×30×30 cm » | Micro Pro v2 : 18 cm (fabricant), 18 × 15 × 16 (site) | Faux | C | Sébastien (D42) | #64, #27 |
| H2 | idem l. 89, 215, 223, 705 | FR | « AlphaShot G2 », « jusqu'à 100 cm », « 100×80×80 cm » | Alphashot Pro G2 : 35 × 35 × 40 cm ; Alphashot G2 : délistée, 35 × 35 × 40 (site) | Faux | C | Sébastien | #64, #27 |
| H3 | idem l. 245, 253, 705, « Capacité très grands produits (jusqu'à 2 m) » | FR | « AlphaShot XXL », « 200×150×150 cm » | Alphastudio XXL : 190 × 90 × 100 cm ; aucun « AlphaShot XXL » au catalogue | Faux | C | Sébastien | #64, #27 |
| H4 | idem l. 270, 278, 705 | FR | « AlphaShot 360 », « 100×80×80 cm » | Alphashot 360 : 30 × 30 × 30 cm | Faux | C | Sébastien | #64, #27 |
| H5 | `app/[lang]/blog/orbitvu-vs-concurrents/page.tsx` l. 241 | FR | « Orbitvu AlphaShot G2 » : « 100×80×80 cm » | Pro G2 : 35 × 35 × 40 | Faux | C | Sébastien | #64 |
| H6 | idem l. 490 | FR | « Orbitvu AlphaShot Micro » : « 30×30×30 cm » | Micro : 18 cm | Faux | C | Sébastien | #64 |
| H7 | `content/blog/{fr,en}/ia-lumieres-virtuelles-…`, `ai-virtual-lights-…` | FR, EN | Pro G2 : « produits de 50 × 50 × 50 cm maximum » | 35 × 35 × 40 cm | Faux | C | Sébastien (prose) | — |
| H8 | `content/blog/{fr,en}/5-appareils-photo-en-simultane…`, `5-cameras-realistic-3d-animation` | FR, EN | XL Pro v2 : « dimensions généreuses (142 x 250 x 124 cm) » | Site : 142 × 87 × 176 ; pas de page fabricant | Suspect | B | Q20.7 puis Sébastien | — |
| H9 | idem | FR, EN | XL Pro v2 : « jusqu'à 70 x 50 x 30 cm » | Site : 50 × 70 × 30 (même triplet) | Conforme en valeurs ; axes en jeu | B | Q20.7 | — |
| H10 | `content/blog/{fr,en}/meubles-decorations…`, `furniture-decoration…` | FR, EN | XL Pro v2 : 70 cm de hauteur, 50 cm de largeur, 30 cm de profondeur, 25 kg | Site : h = 30 | Contradiction d'axes | B | Q20.7 | — |
| H11 | `content/blog/fr/meubles-decorations…` | FR | Furniture Studio : « produits allant jusqu'à 4 tonnes » | Site : 500 kg ; fabricant : 4 000 kg | Concorde avec le fabricant, contredit le site | B | Q20.1 | — |
| H12 | `messages/*.json` `packshotIndustriel.faq.q2.answer` | FR, EN, de-ch | XL v2 « jusqu'à 50 cm » | 50 × 30 × 70 cm (70 max) | Imprécis | C | Sébastien | — |
| H13 | `messages/*.json` `questionsCles.questions.q5.answer` | FR, EN, de-ch | « les Viso les produits moyens », « meubles jusqu'à 3 mètres » | Aucune gamme Viso au catalogue ; Furniture 250 cm (site) ou 300 cm (fabricant) | Suspect | B/C | Q20.1, Sébastien | — |
| H14 | `data/secteurs.ts` l. 215, 248 (hub `mobilier-decoration`, texte et FAQPage) | FR | « plateaux 2×3m, hauteur 2.5m », « meubles jusqu'à 3 mètres » | Hauteur 180 cm (site) ou 200 cm (fabricant) | Faux sur la hauteur | B | Q20.1 | — |
| H15 | `messages/*.json` `packshotEcommerce.r7.rows.furniture.gabarit` | FR, EN, de-ch | « Plateforme de 1 000 kg, version 4 000 kg » | Site : 500 kg ; fabricant : 4 000 kg | Contradiction | B | Q20.1 | F5 jusqu'au 23/11 |
| H16 | Fiches EN et de-ch, `tailleMax` et `poidsMax` | EN, de-ch | « Mobilier XXL », « Mannequin taille réelle », « N/A », « (Espace scénique 3×3m) », « (point) / (surface) » affichés en français | Parité de langue | Défaut de traduction | A (forme) | Catalogues : Sébastien | — |
| H17 | `messages/de-ch.json` `industrieDefense.*`, `blogComparatif.*`, `blogBudget.*` | de-ch | Textes en français (valeurs correctes) | Parité | Préexistant | C | D10 pour `industrie-defense` | — |
| H18 | `lib/lead-enrichment.ts` l. 200-208 | prompt interne | Micro « up to 32x27cm » ; Pro G2 « 68x62cm » ; XL « 108x100cm » ; « E-Comm Studio » « 74x68cm » ; XXL, Compact, XL G2, Bike absents | Référentiel | Faux | A (données) | Sébastien (chaîne des leads) | — |
| H19 | `messages/*.json` `blogComparatif.orbitvu.body2` | FR, EN, de-ch | E-Comm Studio+ « 150 000 EUR HT » | Catalogue : 130 000 | Prix, hors périmètre de D45 | — | Sébastien | — |

Concurrents (hors référentiel, non jugés) : StyleShoots « 100×100×120 cm », Photomatics « 40×40×40 cm » (`orbitvu-vs-concurrents`).

Conforme (contrôlé, sans action) : XL G2 60 × 40 × 70 cm (meta de fiche, articles `alphashot-xl-g2-…` FR, EN, de-ch, Mode, F5) ; XXL 190 × 90 × 100 (Mode, F5) et 100x90x190 (`industrieDefense.faq.q7`) ; Pro G2, 360, Compact, Alphatable (tableaux Mode et F5) ; Micro « 18 cm » (Mode, F5, `blogComparatif`) ; plateau 75 cm de l'XL Pro v2 (articles) = plateau de l'Alphashot XL fabricant.

---

## 3. Analyse de `lib/lead-enrichment.ts` (H18)

| Question | Constat (lecture du code, 03/10) |
|---|---|
| Quand le prompt s'exécute | `app/api/contact/route.ts:221-238` : à chaque envoi du formulaire de contact, si `PIPEDRIVE_API_TOKEN` est défini (production) |
| Modèle | Google Gemini `gemini-2.5-flash`, clé `GOOGLE_GEMINI_API_KEY`, température 0,3 (`lib/lead-enrichment.ts:223-231`) |
| Données transmises | Contact, société, secteur, type de demande, message, page d'origine, `machineContext` (machine consultée), données INSEE, site de la société, et la liste « Available machines » aux dimensions fausses |
| Ce que le modèle produit | « Machine(s) : recommandation et pourquoi » en FR et EN |
| Où va la sortie | Courriel de notification interne (`formatEnrichmentHtml`, `route.ts:246`) et note Pipedrive de l'affaire (`formatEnrichmentNote`, `route.ts:331-343`). Jamais vers le prospect |
| Peut-elle recommander à tort | [Inférence] Oui, plausiblement : un prospect à objets de 1 m peut se voir orienter vers « Alphashot XL up to 108x100cm » (XL G2 réel : 60 × 40 × 70) ; l'E-Comm Studio est annoncé « up to 74x68cm » (réel : 300 × 300 × 200) ; l'XXL et la Compact ne sont jamais proposées puisqu'absentes. Cela repose sur le texte du prompt ; aucune note Pipedrive n'a été lue (je n'ai pas accès à cette information) |
| Gravité | Interne : oriente l'équipe commerciale, pas le client. Silencieuse (pas d'erreur, pas d'alerte) |
| Correctif proposé, non appliqué | Construire la liste à partir des catalogues (`MACHINES` non délistées : `nom`, `tailleMax`, `poidsMax`) au lieu d'un texte figé. Fichier à rayon large (`garde-consequences`), chaîne des leads : décision de Sébastien. Tout test du prompt exigerait des appels Gemini payants : exclu sans GO (D43, consigne) |
| Autre point | Le prompt dit « exclusive Orbitvu distributor » ; D6 : « officiel, jamais exclusif ». Hors D45, signalé |

---

## 4. Tenue du registre

- Toute réponse à Q20 met à jour : le référentiel (valeur du site, statut), les deux catalogues dans un même commit, les messages concernés des trois langues, ce registre, le JOURNAL.
- Une valeur sous gel (F5 jusqu'au 23/11, Mode jusqu'au 26/11) attend la fin du gel, sauf décision contraire de Laurent.
- Les entrées C relevant de la prose de Sébastien lui sont transmises ; le Claude de Laurent ne réécrit pas `content/blog/**`.
