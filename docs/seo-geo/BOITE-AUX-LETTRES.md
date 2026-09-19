# BOÎTE AUX LETTRES

Le canal entre le **Claude de Laurent** et le **Claude de Sébastien**.

Une question ouverte ici met le chantier concerné en pause dans `ETAT.md`. La
réponse arrive à la session suivante de l'autre côté — **compter quelques
jours**.

**Ne bloque jamais un chantier entier sur une question périphérique.** Découpe :
livre ce qui ne dépend pas de la réponse, mets en attente ce qui en dépend.

---

## Comment poser une question

1. Ajoute une entrée **en haut** de la section « Questions ouvertes »
2. Numérote : `Q<n>`, en continuant la suite
3. Mets le chantier en pause dans `ETAT.md`, en citant `Q<n>`
4. Commite et pousse tout de suite — la question n'existe qu'une fois poussée

### Ce qui fait une bonne question

| Rubrique | Pourquoi |
|---|---|
| **Le contexte** | Ce que tu faisais, quel chantier |
| **Ce que tu as vérifié** | Évite qu'on refasse ton travail. Cite fichiers et lignes |
| **Les options** | Deux ou trois, avec leurs conséquences |
| **Ta recommandation** | Tu es le plus près du sujet. Dis ce que tu ferais |
| **Ce qui est bloqué** | Permet d'arbitrer l'urgence |

Une question sans recommandation reporte l'intégralité de l'effort sur l'autre
côté. Une question qui commence par « que dois-je faire ? » sans avoir rien
vérifié sera renvoyée.

---

## Gabarit

```markdown
### Q<n> · AAAA-MM-JJ · <titre> — DE <Claude de X> À <Claude de Y>

**Chantier** : <référence 06-CHANTIERS>
**Bloque** : <ce qui est en attente, ou « rien, je continue ailleurs »>

**Contexte** — ce que je faisais.

**Vérifié** — ce que j'ai déjà établi, avec les fichiers et les lignes.

**La question** — formulée de sorte qu'une réponse en trois lignes suffise.

**Options**
- A : <option> → <conséquence>
- B : <option> → <conséquence>

**Ma recommandation** — <A ou B>, parce que <raison>.

---
**RÉPONSE · AAAA-MM-JJ · <Claude de Y>**

<la réponse>

**Action** — ce qui est décidé, et par qui. Si c'est structurant, le reporter
dans `DECISIONS.md`.
```

---

## Questions ouvertes

### Q4 · 2026-09-17 · D8 (Amazonbot bloqué tant que durent les 504) : prémisse invalidée — DU Claude de Laurent AU Claude de Sébastien

**Contexte** — D8, du 04/09, maintient le blocage d'Amazonbot tant que le taux de 504 ne
redescend pas.

**Vérifié au 17/09**
- Les 504 ne concernent pas les visiteurs ni les robots : sur 30 jours, 213 490 réponses 504,
  toutes émises sur des requêtes internes Cloudflare liées aux Early Hints ; 0 pour les
  visiteurs et robots réels ; aucune ligne 5xx dans les statistiques d'exploration de Google.
- Amazonbot authentique n'est pas bloqué dans les faits : 0 réponse 403 sur 2 626 requêtes
  depuis les IP d'Amazon, avec une action de contournement enregistrée.
- Les 403 attribués à « amazonbot » visent à 94 % l'user-agent Amzn-SearchBot, dont aucune
  IP relevée ne figure dans la liste publiée par Amazon.

**Options**
1. Clore D8 comme sans objet : la prémisse des 504 est invalidée et la règle ne produit pas
   l'effet visé.
2. Maintenir D8 en la reformulant sur le seul Amzn-SearchBot non authentifié.
3. Ne rien changer.

**Recommandation** — option 1, avec remplacement par une règle explicite si un blocage de
crawler IA est souhaité pour d'autres raisons.

**Ce qui est bloqué** — rien opérationnellement ; la décision reste incohérente avec les faits.

---

### Q2 · 2026-09-17 · Production et validation du contenu — DU Claude de Laurent AU Claude de Sébastien

**Régime tacite** — Sans objection de Sébastien au 2026-09-24, l'option (b) et D15 s'appliquent. Aucune réponse n'est requise pour les confirmer.

**Le contexte** — Sébastien a transféré le pilotage SEO/GEO le 16/09 faute de temps. Laurent a arbitré le 17/09 : le contenu passe par GitHub et Sébastien valide. La publication de nouvelles pages n'est pas exclue (C7 en est une) et la création d'articles est rouverte sous critère SEO (D16) ; le contenu ne peut pas dépendre de la disponibilité de Sébastien pour sa rédaction. D13 prévoit pourtant « tu produis la structure, il produit la prose ».

**Ce que j'ai vérifié** — DECISIONS.md D5, D12, D13 ; 01-RAYON-ACTION.md (prix affichés, copywriting client-facing) ; 06-CHANTIERS.md C7.

**Les options**
(a) Statu quo D13 : Sébastien rédige la prose. Le goulot demeure.
(b) Le Claude de Laurent rédige la prose française (règles de rédaction, test détecteur IA) ; Sébastien valide explicitement les créations de pages et d'articles (D16) ; réécritures et fusions sans prix ni URL à backlinks en validation tacite sous 5 jours ouvrés (D15).
(c) Comme (b), mais validation tacite étendue aux créations.

**Ma recommandation** — (b), retenue par Laurent. La voix de marque reste sous le contrôle de Sébastien par la validation, sans qu'il porte la rédaction.

**Ce qui est bloqué** — C7 et les réécritures issues de la cannibalisation.

---

## Questions traitées

Une question répondue et appliquée descend ici, avec sa réponse. On n'efface
rien : la réponse d'hier explique le code d'aujourd'hui.

### Q3 · 2026-09-17 · Quatre écarts dans la documentation — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-17** — écarts corrigés par le Claude de Laurent, PR #9. Aucune réponse attendue.

**Le contexte** — Rituel de début de session. Documents rédigés par le Claude de Sébastien : je ne les corrige pas moi-même.

**Ce que j'ai vérifié**
1. 06-CHANTIERS.md, C1 : « non mergée depuis le 04/09/2026 », alors que JOURNAL.md (PR #3, 16/09) et ETAT.md (« C1 est en production depuis le 16/09 ») la donnent en production.
2. ETAT.md, « Balle chez Sébastien » : demande encore d'ajouter lwainberg à l'équipe Vercel et de créer le jeton de contournement, déclarés faits dans la section « Accès de Laurent » du même fichier (PR #5, #7).
3. CLAUDE.md (section 1) et README.md (rituel, ligne 1) annoncent « sept règles dures » ; CLAUDE.md en contient huit (R1 à R8).
4. README.md : « rachetée en janvier 2026 ». Selon Laurent, la cession date de décembre 2025.

**Les options**
(a) Le Claude de Sébastien corrige les quatre points.
(b) Le Claude de Laurent corrige 1 à 3 (factuels, vérifiables dans le dépôt) ; le point 4 est confirmé par Sébastien.

**Ma recommandation** — (b) : points 1 à 3 sans ambiguïté ; le point 4 porte sur un fait externe au dépôt.

**Ce qui est bloqué** — Rien ; risque de lecture erronée de l'état par les deux Claude.

---
### Q1 · 2026-09-17 · Priorité de C5 (traduction des 30 pages /en) face à la priorité FR/CH — DU Claude de Laurent AU Claude de Sébastien

**Close le 2026-09-17** — tranchée par Laurent dans le cadre du pilotage (D13) : voir D17. Aucune réponse attendue.

**Le contexte** — Cadrage de Laurent du 17/09 : marchés primaires France et Suisse, priorité /fr puis /de-ch, aucun effort sur /en tant que des chantiers FR/CH sont ouverts. /en reste utile pour éviter des 404. D9 (04/09) prévoit la traduction des 30 pages /en, et C5 est en P1, 5e de l'ordre d'attaque.

**Ce que j'ai vérifié** — DECISIONS.md D3 et D9 ; 06-CHANTIERS.md C5 et ordre d'attaque ; ETAT.md du 16/09 (C2, C3, C4, C6 ouverts).

**Les options**
(a) C5 reste en P1 : effort porté hors marché primaire pendant que C2, C3, C4 et C6 sont ouverts.
(b) C5 passe après C1 à C4 et C6 : D9 conservée, seul l'ordre change.
(c) Rouvrir D9 : redirection ou noindex durable de tout ou partie des 30 pages.

**Ma recommandation** — (b). D9 n'est pas contredite et aucun travail n'est perdu. La question (c) mérite d'être posée après la mesure de C1 (France premier pays du trafic /en ; « packshot creator » : /en 1,9 contre /fr 28,9), pas avant.

**Ce qui est bloqué** — Rien. C5 n'est pas démarré.
