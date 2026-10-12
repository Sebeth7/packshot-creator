# Ajouter une machine d'occasion réelle

Registre : `data/occasion/machines.ts` (vide au 12/10/2026). Une machine n'y entre
qu'avec des informations réelles, transmises par Sébastien. Aucun stock fictif,
aucun prix (le registre n'a pas de champ prix).

## 1. Ce que Sébastien transmet

| Champ du registre | À fournir | Exemple de forme |
|---|---|---|
| `ref` | Référence affichée, unique | `OCC-2026-01` |
| `modeleId` | Modèle exact, identifiant de `data/produits/fiches-techniques.ts` | `alphashot-pro-g2` |
| `origine` | `showroom`, `demonstration`, `salon`, `location`, `reprise` ou `renouvellement` | `showroom` |
| `origineDetail` | Précision affichée sur la carte | « Showroom PackshotCreator » |
| `usage` | Usage passé, affiché sur la carte | « Exposition et démonstrations » |
| `historique` | Historique de l'unité | Mise en service, utilisation |
| `etat` | État constaté | Rayures, pièces remplacées |
| `verifications` | Contrôles réellement faits : quoi, par qui, quand | « Contrôle SAV du … » |
| `logiciel.licence` | Licence Orbitvu Station et cession | Licence perpétuelle, frais de transfert Orbitvu |
| `logiciel.stationVersion` | Facultatif | Version installée |
| `essais.images` | Facultatif : images test faites avec la machine | Fichiers |
| `garantie` | `garant`, `duree`, `pointDeDepart`, `exclusions`, par écrit | La garantie constructeur ne suit pas la machine |
| `photos` | Photos de L'UNITÉ VENDUE, jamais génériques ; fichier, texte alternatif, mention | Fichiers dans `public/images/occasion/` |
| `statut` | `disponible`, `reservee`, `vendue` ou `retiree` | `disponible` |
| `statutConfirmeLe` | Date de la dernière confirmation de disponibilité, `AAAA-MM-JJ` | `2026-11-02` |
| `traductions.en`, `traductions['de-ch']` | `origineDetail` et `usage` en anglais et en allemand (Suisse) ; `credit` si la mention diffère | Exigés pour une machine disponible |

Ne jamais remplir `annonce` à la création : ce champ trace le bulletin qui a
annoncé la machine (étape 3).

## 2. Mise en ligne

1. Saisie dans `machines.ts` par commit, sur une branche, puis PR.
2. Les tests refusent une machine « disponible » incomplète
   (`elementsManquants` : origine, historique, état, vérifications, garantie,
   photos, textes EN et DE-CH), un modèle inconnu, une référence en double, une
   photo absente de `public/`, une date mal formée.
3. Fusion : la carte s'affiche dans les trois langues si la page est publiée
   (`PUBLICATION_AUTORISEE`).
4. Fraîcheur : une machine « disponible » dont la confirmation date de plus de
   `FRAICHEUR_MAX_JOURS` jours n'est plus affichée. **30 jours est une valeur
   provisoire, non validée** : reconfirmer la date avant l'échéance.
5. Vente ou réservation : changer `statut` (commit). La carte disparaît.

## 3. Bulletin d'arrivage (si la liste d'alerte est en service)

Décision du 12/10/2026 : un bulletin « Nouvelles occasions Orbitvu disponibles »
par nouvel arrivage vérifié (une ou plusieurs machines), validé par Sébastien.
Jamais périodique, jamais automatique.

1. `npx tsx scripts/occasion-bulletin.mts apercu` : contenu FR, EN, DE-CH, sans réseau.
2. `npx tsx scripts/occasion-bulletin.mts plan` : lecture seule des inscrits
   confirmés chez Resend ; brouillon, nombre de destinataires, exclusions, empreinte.
3. Validation écrite de Sébastien sur ce brouillon et son empreinte.
4. `npx tsx scripts/occasion-bulletin.mts envoyer --empreinte <empreinte> --valide-par "<nom>"`
   (refusé tant que `BULLETIN_ENVOI_AUTORISE`, `ALERTES_REELLES_AUTORISEES` et
   `PUBLICATION_AUTORISEE` ne sont pas vrais).
5. **Aussitôt après** : `annonce: { bulletin: '<identifiant>', envoyeLe: 'AAAA-MM-JJ' }`
   sur chaque machine annoncée, par commit. Une machine annoncée ne l'est plus
   jamais : une correction de fiche n'est pas un nouvel arrivage.
