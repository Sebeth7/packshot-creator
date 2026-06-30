# Rapport Claude Code — Suivi d'exécution des quick wins (rapports du 30/06)

Réponse aux deux rapports livrés le 30/06 (`PSC_RAPPORT_EXPERT_CONSOLIDE_2026-06-30.md` et `PSC_QUICKWINS_2026-06-30.md`). Conformément à la méthode habituelle : chaque allégation a été vérifiée contre le code réel avant exécution — pas d'allégation prise pour acquise. Commits `74dff0c` et `d8b4156`, poussés sur `main`.

---

## 0. Déjà traité avant cette session

Le point de conformité sur les prix Orbitvu (CONF-2 du rapport quick wins) était déjà réglé par une session antérieure le 30/06 (commit `3cfa2e7`, brief du 27/06) : 9 articles assainis, JSON-LD `offers` retiré, 49 liens internes repointés. Périmètre plus large que ce que listait le rapport (5 articles). Vérification exhaustive faite : aucun prix Orbitvu résiduel.

---

## 1. CONF-1 — « Distributeur exclusif » → « Distributeur officiel »

**Allégation du rapport** : 12 occurrences (template page produit ligne 564 + 11 en blog).

**Constat réel** : 23 occurrences corrigées sur 9 fichiers. Le rapport sous-estimait parce qu'il n'avait grepé que la forme masculine singulier `exclusif`, ratant :
- la forme féminine (« Distribution exclusiv**e** »),
- l'anglais capitalisé (« **Exclusive** Distributor »),
- l'allemand (« **Exklusiver** Distributor »),
- et surtout les fichiers `messages/fr.json` / `en.json` / `de-ch.json`, absents de son périmètre — qui contiennent pourtant le badge affiché en haut de la page d'accueil et de la page produit principale (`/studios-photo-automatises`), donc parmi les emplacements les plus visibles du site.

Laissé intact tout usage du mot sans rapport avec le statut de distributeur : fonctionnalités produit (« éclairage **exclusif** »), ancien partenariat Ortery (2003–2024, contrat distinct, non concerné par la clause Orbitvu).

---

## 2. QW-1 — CTA calculateur ROI sur le template guide

Fait. Le template `guide/[slug]` réutilise désormais le composant `ArticleCTA` (Contact + Calculateur ROI), déjà en place sur tous les articles de blog, à la place du lien `/contact` générique.

**Bonus trouvé en testant** : le bouton « Calculer mon ROI » d'`ArticleCTA` pointait vers une ancre `#roi` qui n'existe nulle part sur le site — bug présent depuis le départ sur **tous** les articles de blog. Repointé vers `/calculateur-roi`, la vraie page.

## 3. QW-2 — Formulaire inline sur la money page produit

Fait. `ContactForm` intégré directement sur `/studios-photo-automatises`, sur le modèle des pages secteur (`/industrie/[slug]`).

**Bug réel trouvé et corrigé en testant** : le texte du formulaire (boutons radio « Oui/Non », « Demande de démonstration », etc.) était invisible — blanc sur fond blanc, hérité du `text-white` posé sur la section parente. Corrigé sur cette page, **puis retrouvé identique sur les 16 fiches produit existantes** (vérifié sur `alphashot-pro-g2`) et corrigé pour tout le catalogue, pas seulement la page neuve.

## 4. QW-8 — Suisse romande, correction technique au rapport

Le commentaire de code obsolète (`lib/hreflang.ts`, annonçant `de-ch` comme « différé » alors qu'actif depuis le 29/06) a été mis à jour.

**Mais la recommandation du rapport était techniquement erronée** : « activer `deCh` pour `fr-CH` » aurait fait servir du contenu **allemand** aux Suisses **francophones** — `deCh` est le paramètre de la locale Suisse alémanique, sans rapport avec `fr-CH`. Non appliqué. Le sujet Suisse romande (actuellement `/fr` en position 48 vs `/en` en position 8,8 sur ce marché) reste donc ouvert et à requalifier — probablement via signal local (CHF, showroom CH) sur les pages FR génériques plutôt qu'une nouvelle locale dédiée, vu l'ampleur du chantier de-ch déjà livré pour comparaison.

---

## 5. QW-7 — Cannibalisation Alphashot Pro G2 / G2 : remplacement par la XL G2

**Diagnostic du rapport confirmé, mais cause racine plus profonde que prévu.** Ce n'est pas un problème de contenu éditorial insuffisamment différencié : le code forçait **le partage des mêmes images et de la même galerie produit** entre `alphashot-g2` et `alphashot-pro-g2` (fallback explicite dans `studio-photo/[slug]/page.tsx`), faute d'images dédiées au modèle standard sur le disque. Un correctif éditorial seul n'aurait rien changé au signal de duplicate content vu par Google.

Décision Seb : remplacer l'Alphashot G2 (modèle entrée de gamme, 30×30×30cm/3kg) par l'**Alphashot XL G2**, nouvelle machine Orbitvu (60×40×70cm/25kg, mesure laser + pesée intégrée en variante MDC, 170 LED pilotées IA, double caméra Canon EOS R). Specs vérifiées sur orbitvu.com et orbitvu.fr, recoupées avec une demande Google déjà naissante : la requête « alphashot xl g2 » fait déjà 18 impressions, captées aujourd'hui par **orbitvu.fr lui-même**, faute de page PSC dédiée.

**Réalisé** :
- Nouvelle fiche produit complète (specs, FAQ, argumentaire) dans les deux sources de données machines, en FR/EN/DE-CH.
- 5 visuels officiels Orbitvu téléchargés et auto-hébergés (hero, panneaux LED, plateau + balance, 2 packshots démo). Pas de viewer 360° ni vidéo : aucun tournage PSC dédié à ce jour pour ce modèle.
- Sitemap, mapping sectoriel, couverture de-ch, pages secteur Amazon/e-commerce — tous repointés.
- Redirections 301 ajoutées dans le Worker Cloudflare pour les URLs actuellement vivantes (`/fr`, `/en`, `/de-ch`) **— nécessite un déploiement Worker (wrangler) pour prendre effet, pas encore fait.**
- Tests e2e de redirection mis à jour.

**Laissé en l'état (arbitrage nécessaire)** :
- **Prix interne du calcul ROI** : Orbitvu n'affiche aucun tarif public pour cette machine. Un montant a été estimé par calibrage avec le reste de la gamme, à confirmer avec Orbitvu avant mise en production — ce chiffre alimente directement le ROI montré aux prospects.
- **~45 fichiers de blog/guides** mentionnent encore « Alphashot G2 » en prose ou lient vers l'ancienne URL. Le 301 absorbe ça techniquement (aucun lien mort), mais plusieurs de ces textes décrivent des caractéristiques qui ne s'appliquent plus (ex. « jusqu'à 3kg », alors que la XL G2 monte à 25kg) — une relecture éditoriale est nécessaire avant correction, pas un simple remplacement de texte.

---

## 6. Hors périmètre de cette session

Chantiers éditoriaux purs (maillage horlogerie, bloc ROI/leasing page vin, cas clients EEAT, différenciation copywriting), et les deux runs DataForSEO payants (scoring micro vin/horlogerie, scoring micro Suisse) — nécessitent respectivement de la rédaction humaine et un go explicite côté Seb.

**Vérification finale** : `tsc --noEmit` sans erreur sur l'ensemble, testé en navigateur (pages modifiées, formulaires, redirection 404 propre en local). Deux commits distincts poussés sur `main` (`74dff0c`, `d8b4156`).
