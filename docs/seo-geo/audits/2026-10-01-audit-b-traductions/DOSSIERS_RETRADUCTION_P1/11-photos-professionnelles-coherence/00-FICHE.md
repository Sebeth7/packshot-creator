# Fiche — famille 67d1ac647fa7de7306d86cee

Dossier de retraduction P1, audit B du 01/10/2026. État de référence : `main` `17fc0b3`.

## 1. Identité

| Élément | Valeur |
|---|---|
| ID Webflow | `67d1ac647fa7de7306d86cee` (création de l'item d'après l'ObjectId : 12/03/2025 ; date éditoriale de l'article : 13/03/2024) |
| Sujet | 5e et dernier volet de la série « Le guide complet de la photographie packshot » : homogénéité des photos produits, puis choix entre prestataire externe, studio traditionnel avec freelance et studio automatisé Orbitvu |
| FR | `/fr/blog/comment-avoir-des-photos-professionnelles-guide-packshot-produit` — `content/blog/fr/comment-avoir-des-photos-professionnelles-guide-packshot-produit.json` |
| EN | `/en/blog/how-to-ensure-consistency-between-photos-packshot-photography-guide` — `content/blog/en/how-to-ensure-consistency-between-photos-packshot-photography-guide.json` |
| de-ch | aucune version |
| Correspondance | `content/blog/alternates.json`, l. 117-119 (fr + en) |
| hreflang servis | fr, fr-CH, en, x-default (fr) — relevé sur la page servie le 01/10/2026 |
| Statut HTTP | 200 sur `sysnext.vercel.app` pour les deux langues ; indexables, présentes au sitemap |
| Catégorie / auteur affiché | E-commerce / PackshotCreator (import Webflow : Laurent Wainberg, voir 06) |
| PR concernée | **aucune**. Vérifié le 01/10/2026 : aucune branche distante ne modifie les deux JSON |

## 2. Trafic (Search Console)

Chiffres fournis par la consigne (Supabase `gsc-crawl-seo`, lecture seule) :

| Périmètre | Clics 365 j | Impressions 90 j | Position 90 j |
|---|---|---|---|
| Famille | 49 | 5 511 | — |
| FR | 16, **tous sur l'ancienne URL Webflow** `/blog/comment-avoir-des-photos-professionnelles-guide-packshot-produit` | 4 335 | 32,6 |
| EN | 33 | 1 176 | 38,2 |

Précisions (`work/gsc_by_article.json`) : l'URL FR actuelle cumule 8 016 impressions et 0 clic sur 365 jours ; l'ancienne URL Webflow, 4 944 impressions et 16 clics. L'EN cumule 19 838 impressions sur 365 jours.

Constat : **fortes impressions, très peu de clics**. Le H1 tronqué (« …, 5 »), le `<title>` en Title Case qui n'annonce pas le sujet réel et une description qui ne couvre que la moitié de l'article expliquent au moins en partie ce rendement.

Requêtes principales (365 j, `GSC_REQUETES_P1.md`, clics / impressions / position) :

- FR : photographie de produits 0/819/14,5 ; shooting photo produit 0/644/21,1 ; photographie de produit 0/531/15,9 ; shooting produit 0/424/44,5 ; studio photo produit 0/356/17,8.
- EN : packshot photography 0/2 493/23,7 ; packshot photography studio 0/1 059/34,7 ; product packshot photography 0/718/18,3 ; packshot photographer 1/622/9,2 ; professional packshot photography studio 0/332/6,4.

Backlinks : aucun recensé (`work/backlinks_blog.json`). Liens internes entrants : articles 1, 2 et 4 de la série en FR, articles 1 à 4 en EN, article 1 en de-ch (vers la version FR).

## 3. Origine linguistique et preuve

**Langue originale : français. Traduction EN faite depuis le FR (preuve interne, établie).**

- Locale primaire de Webflow : FR ; locale EN créée le 08/11/2024 (ObjectId), soit huit mois après la date éditoriale de l'article (13/03/2024).
- Faux amis et calques qui n'existent qu'à partir du texte français (revue linguistique, vérifiés dans `01-TEXTE_ACTUEL.md`) : « a high quality **printing** of your products » (FR « une **impression** de grande qualité ») ; « in order to always **replace** them » (FR « les **replacer** ») ; « taken and **amended** » (FR « prises et **modifiées** ») ; « an employee **based in stock** » (FR « un employé **basé au stock** ») ; « we have **seen and reviewed** » (FR « vu et revu »).
- Segments en gras traduits isolément puis recollés, avec majuscule parasite à l'endroit exact où commence le gras français : « it is therefore **It is important** », « consider **Set up** a traditional photo studio », « **Anyone** can use », « allow you to: **Create** all types of media », « the Fashion Studio **Or** the Bike Studio ».
- Typographie française conservée en EN : « contact us : », « with ease : », « expertise : ».
- Textes alternatifs restés en français sur la page EN.

Écarts depuis l'import Webflow (`56d4bc32`, 18/04/2026) : aucun dans la prose. Seuls ont changé l'auteur (`8ae45f63`), les URL d'images (`44d780f1`), les liens de formation (`fc6c9c6b`, 30/09/2026 : `/fr/academy` en FR comme en EN) et, en EN, les liens Fashion Studio et Bike Studio (`1ebb469c`, `/en/photo-studio/…` → `/en/studio-photo/…`).

## 4. Verdict par langue

| Langue | Qualité (revue) | Verdict | Anomalies relevées (03) |
|---|---|---|---|
| FR | B : texte natif, fluide | **Retouche** : coquilles, typographie, H1, `metaTitle`, textes alternatifs, FAQ réalignée sur la nuance du corps. Pas de réécriture | 55 (dont 7 majeures) |
| EN | D : traduction automatique segmentée | **Retraduction complète** depuis le FR corrigé, textes alternatifs compris | 53 (dont 17 majeures) |

Une anomalie de la revue est retirée parce qu'elle est fausse : `/en/academy` n'est pas « disponible ». Depuis `fc6c9c6b` (30/09/2026), cette URL redirige en 301 vers `/fr/academy` (`next.config.ts`, l. 97). Le lien EN vers `/fr/academy` est donc voulu (détail dans 03).

## 5. Décisions proposées (résumé)

1. **FR** : corriger sans réécrire (55 retouches ponctuelles). Les 3 H2, 8 H3, 6 images, 7 liens et 5 questions de FAQ sont conservés, dans le même ordre. Le paragraphe final, fusionné par Webflow, est scindé en trois.
2. **H1** (qui sert aussi de texte alternatif de l'image principale, de titre `Article` en JSON-LD et de fil d'Ariane) : annoncer le sujet. FR « Guide de la photographie packshot, 5 : des photos produits professionnelles et homogènes » ; EN « Packshot photography guide, 5: consistent, professional product photos ».
3. **`metaTitle` et description** : placer la première requête de chaque langue (« photographie de produits », « packshot photography ») et couvrir les deux moitiés de l'article (homogénéité, choix de la solution).
4. **Textes alternatifs** : six alts réécrits d'après les images elles-mêmes (vues le 01/10/2026 après conversion locale) ; le marqueur `__wf_reserved_decorative` disparaît ; en EN, les alts sont enfin en anglais. Le premier alt associait Orbitvu au contre-exemple de l'article : corrigé.
5. **FAQ** : mêmes questions, réponses réalignées sur le corps. Suppression de « le meilleur compromis », « homogénéité parfaite » et « cohérence parfaite », qui contredisaient la nuance du corps (« Il n'y a pas forcément de solution supérieure aux autres »). Signalé dans 03 et 06.
6. **Claims du corps** : conservés, sauf deux formulations rendues plus prudentes (« sans frais supplémentaires », « le studio fait tout à votre place »). Tous figurent dans 06 pour Sébastien.
7. **EN** : retraduit intégralement depuis le FR corrigé, en anglais américain. « Packshot photography » et « packshot photographer » sont intégrés là où c'est naturel (H1, `metaTitle`, deux H2, un H3).
8. **Slugs conservés**. L'écart d'angle entre les slugs FR (« photos professionnelles ») et EN (« consistency ») est analysé dans 05 : aucune redirection recommandée.
9. **Lien de formation** conservé vers `/fr/academy` dans les deux langues ; la formulation « courte formation » est soumise à Sébastien au regard de l'audit Qualiopi du 16/10/2026 (06).
