# Archive de la PR #130 — 15 fichiers à ne pas perdre

**Date** : 2026-10-15 · **Décision** : `GO_ARCHIVE_130` (Laurent, 2026-10-14 17:04:29 UTC) · **Statut de la PR #130** : fermée sans fusion, branche conservée

- Branche d'origine : `claude/vibrant-wright-q18tsp`, HEAD `95426fadfa359f44325fdad53778737eea0a9874`
- `main` de référence : `2ae6e154278c1b9166cbf3af05fd6cc83fa3b454`
- Destination : ce dossier, sur la branche `claude/packshot-creator-pr-cleanup-n5ao8r` (le push d'un tag d'archive a été refusé par la session, HTTP 403).
- Le HEAD de #130 conserve l'arbre complet des 43 fichiers (28 identiques à `main`, 11 divergents, 4 uniques). Cette archive en est une seconde copie indépendante de la branche, limitée aux 15 fichiers.

**Archive** : `pr-130-95426fa-15-fichiers.tar.gz` · 449978 octets · SHA-256 `9dcb44f98f16fae93993569c3e6bdd790589ad45415d703d3b4e6492688514a7`

Aucun fichier n'est déclaré redondant : le classement des divergents repose sur le décompte des lignes ajoutées par #130 et absentes de la version de `main`, pas sur une équivalence de contenu.

## Restauration et vérification

```bash
sha256sum pr-130-95426fa-15-fichiers.tar.gz        # doit rendre 9dcb44f98f16fae93993569c3e6bdd790589ad45415d703d3b4e6492688514a7
tar xzf pr-130-95426fa-15-fichiers.tar.gz
git hash-object 'pr-130-95426fa/<chemin>'            # doit rendre le blob SHA #130 de la ligne du manifeste
git show 95426fadfa359f44325fdad53778737eea0a9874:<chemin>                               # même fichier depuis la branche, tant qu'elle existe
```

## Manifeste

```text
ARCHIVE PR #130 — draft(content): finition série articles studio photo e-commerce
Date de l'archive : 2026-10-15 · décision : GO_ARCHIVE_130 (Laurent, 2026-10-14 17:04:29 UTC)
Branche : claude/vibrant-wright-q18tsp · HEAD : 95426fadfa359f44325fdad53778737eea0a9874
main de référence : 2ae6e154278c1b9166cbf3af05fd6cc83fa3b454
Support : ce tag annoté pointe le commit HEAD de la PR : l'arbre complet des 43 fichiers (28 identiques à main, 11 divergents, 4 uniques) y est conservé, indépendamment de la branche.

== 4 FICHIERS UNIQUES (absents de main) — chemin | blob SHA | octets
app/[lang]/revue-entretiens-s3/page.tsx | 62207968c533f0cf25bdee9ea4f8ead0441757c1 | 22159
content/revue-entretiens-s3/complement.json | 0ecd23cf78f73bbc2dc7b724154ab0205e7b0141 | 25008
content/revue-entretiens-s3/interviews.json | 2146ee957f696e62618b205262c887a1e90bb2c6 | 99409
lib/__tests__/revue-entretiens-s3.test.ts | 1c026338107e36d7a88bd56eba54786f72b2d54c | 7398

== 11 FICHIERS DIVERGENTS — chemin | blob SHA #130 | blob SHA main | octets #130 | classement
app/[lang]/conversations-sebastien-jourdan/page.tsx | 1a9f1928e3bdf9667a8f24b2beafc2523a64c678 | f4258985a581cc2c13fcebac919059a3be5e30da | 24941 | variante à archiver : 7 lignes ajoutées par #130 absentes de main (composant PhotoFigure, légende « Photo »)
components/revue/CroquisZoom.tsx | f1ee3dbe8524a262c2c1e51e7bbf864c1b5f7785 | ea82891849c234276c2986743d92847071487aaa | 5967 | variante à archiver : 11 lignes absentes de main (libellé selon kind photo)
content/conversations-sebastien-jourdan/fr.json | 8b1b0e1de2b4b44ac59a591c0bccfc67e62d6823 | 3158f97b989a2bb45df35e82f40cfacce82796ee | 117337 | variante à archiver : 2 paragraphes (717 car.) absents de main
content/conversations-sebastien-jourdan/en.json | 4ce7367f18b401c01023faaa717295724c673442 | 0d34b6e87854cbd7093a1110e1802d5f4f58852b | 109280 | variante à archiver : 16 lignes (14 618 car.) absentes de main
content/conversations-sebastien-jourdan/de-ch.json | 79926adb9b28530fcf7f795f60653e8552c52816 | 1cedbba2c8b6b7da302eae49e3116fdff7c83bff | 118394 | variante à archiver : 14 lignes (13 023 car.) absentes de main
content/blog/fr/est-il-utile-dinternaliser-sa-production-de-photos-packshot.json | 7603c931b4d1bac642d321399bc3603310db659e | f03e2e0d94347dfa19c2d95fcde1e00511f4357b | 29232 | variante à archiver : version #130 de l'article A ; main porte la version reprise par #139
content/blog/fr/e-commerce-comment-mettre-en-place-votre-studio-photo.json | 4b18e6005901bb215418311aaf784330b97be0ea | d6cd6533243d4a3969ae6d0d7c9cbd6630fb7af3 | 31014 | variante à archiver : version #130 de l'article B (avec photos HOLD) ; main porte la version reprise par #140
lib/__tests__/serie-produire-images.test.ts | 8b74283535c74d27db01bfa5bf8859301fa23c42 | d79100a1918645f74a7bb5ea1d75cd420f472042 | 5474 | variante à archiver : 19 lignes absentes de main
e2e/serie-produire-images.spec.ts | 8cd07df499263d57457eaf7a8c6ce696fa790e0c | a1559b2cfe219ae7a709922ae277f8cac17c4c6b | 4331 | variante à archiver : 6 lignes absentes de main
lib/seo/__tests__/json-ld-techniques.test.ts | 1ecdcbc9cc12fe71664a71a211f7d122b883e229 | 1e75839ea54f5c2b2a1a071d1ff2a068bfdb71a7 | 6151 | variante à archiver : 4 lignes absentes de main
docs/seo-geo/JOURNAL.md | 2568dd5d62cc5755a7b356c4216b776d9850c06d | c0a16b9584ad4ca728ad634d276074dabc4a2a3b | 922135 | apport encore absent de main : 8 entrées du JOURNAL (11 au 13/10 : espace de revue, V2, V3, V3.1, série A/B, hub FR, traductions EN/de-ch) ; append-only, à ne pas perdre

Aucun fichier n'est déclaré redondant : le classement repose sur le décompte des lignes ajoutées par #130 et absentes de la version de main, pas sur une équivalence de contenu.
```
