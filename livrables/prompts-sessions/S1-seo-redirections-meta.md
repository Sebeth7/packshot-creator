# SESSION S1 - SEO : Redirections et Meta

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~1h**
**Prerequis : S0 terminee**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)
- Le site est LIVE sur packshot-creator.com. Teste en local avant de committer.

## Documents de reference

- **Analyse croisee** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/analyse-croisee-2026-02.md`
- **Donnees GSC** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/ETAT-ANALYSE-2026-02-08.md`
- **Pages.csv** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/Pages.csv` (808 URLs avec clics/impressions)

## Ta mission

3 taches SEO dans next.config.ts et les meta des pages.

---

## Tache 1 : Redirections DE/ES/NL vers /en

**Fichier** : `next.config.ts`

**Etat actuel** (lignes 96-103) :
```typescript
{ source: '/de', destination: 'https://blendai.studio', statusCode: 301 },
{ source: '/de/:path*', destination: 'https://blendai.studio', statusCode: 301 },
{ source: '/es', destination: 'https://blendai.studio', statusCode: 301 },
{ source: '/es/:path*', destination: 'https://blendai.studio', statusCode: 301 },
{ source: '/nl', destination: 'https://blendai.studio', statusCode: 301 },
{ source: '/nl/:path*', destination: 'https://blendai.studio', statusCode: 301 },
```

**Action** :
1. Lis `Pages.csv` pour identifier les URLs DE/ES/NL avec >20 clics sur 3 mois
2. Pour chaque URL DE/ES/NL a fort trafic, cree une redirection individuelle vers l'equivalent EN le plus proche
3. Pour le catch-all, redirige vers `/en`

**Exemples attendus** (a completer avec Pages.csv) :
```typescript
// Top URLs individuelles DE/ES/NL
{ source: '/es/blog/como-elige-mejor-objectivo-foto-paquete', destination: '/en/blog/how-to-choose-best-lens-for-product-photography', statusCode: 301 },
{ source: '/es/guide/que-equipo-elegir-para-foto-joyas', destination: '/en/guide/which-equipment-to-choose-for-jewelry-photo', statusCode: 301 },
{ source: '/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen', destination: '/en/guide/which-equipment-to-choose-for-jewelry-photo', statusCode: 301 },
// ... autres URLs >20 clics

// Catch-all
{ source: '/de', destination: '/en', statusCode: 301 },
{ source: '/de/:path*', destination: '/en', statusCode: 301 },
{ source: '/es', destination: '/en', statusCode: 301 },
{ source: '/es/:path*', destination: '/en', statusCode: 301 },
{ source: '/nl', destination: '/en', statusCode: 301 },
{ source: '/nl/:path*', destination: '/en', statusCode: 301 },
```

**IMPORTANT** : Les redirections individuelles DOIVENT etre placees AVANT les catch-all (Next.js les evalue dans l'ordre).

**Pour mapper les URLs** : Le slug DE/ES ne correspond pas au slug EN. Tu dois :
1. Lire Pages.csv et filtrer les lignes commencant par `/de/`, `/es/`, `/nl/`
2. Pour chaque URL a >20 clics, trouver l'equivalent EN dans le codebase :
   - Pour les blogs : chercher dans Sanity/Webflow (ou dans les slugs de `lib/blog.ts`)
   - Pour les guides : verifier les slugs dans `lib/webflow-guides.ts` ou les redirections existantes
   - Pour les machines : verifier les slugs dans `components/calculators/ROICalculator/lib/machines.ts`
3. Si tu ne trouves pas l'equivalent EN d'une URL specifique, redirige vers la page hub EN la plus proche (ex: `/es/blog/xxx` -> `/en/blog`)

---

## Tache 2 : Verifier les redirections EN machines

**Etat actuel** : La redirection catch-all existe deja (ligne 79) :
```typescript
{ source: '/en/photo-studio/:slug', destination: '/en/studio-photo/:slug', statusCode: 301 },
```

**Action** : Verifier que les slugs correspondent. Lis `machines.ts` pour lister les slugs des 16 machines et confirme que :
- `/en/photo-studio/alphashot-360` redirige correctement vers `/en/studio-photo/alphashot-360`
- etc.

Si certains slugs ont change entre Webflow et Next.js (ex: `alphashot-micro` vs `alphashot-micro-v2`), ajoute des redirections individuelles.

Consulte aussi l'analyse croisee pour les URLs machines EN les plus trafiquees.

---

## Tache 3 : Optimiser meta title/description (10 pages prioritaires)

**Pages cibles** (par impressions decroissantes) :

| Page | Impressions/3m | CTR actuel |
|------|---------------|-----------|
| `/en/blog/packshot-photography-guide-why-make-product-packshots` | 29 683 | 0,3% |
| `/en/guide/which-equipment-to-choose-for-jewelry-photo` | 29 378 | 0,6% |
| `/blog/quel-format-d-image-pour-le-web` | 26 366 | 0,7% |
| `/blog/guide-photographie-packshot-pourquoi-faire-packshots` | 19 105 | 0,7% |
| `/en/blog/best-image-format-for-the-web` | 16 946 | 0,1% |
| `/en/blog/how-to-choose-best-lens-for-product-photography` | 16 778 | 0,2% |
| `/en/blog/how-to-e-commerce-product-photography` | 11 067 | 0,2% |
| `/blog/comment-maitriser-le-flou` | 8 480 | 0,5% |
| `/en/guide/what-settings-to-photograph-jewelry` | 8 558 | 1% |
| `/blog/avantage-du-e-commerce-pour-les-entreprises` | 6 605 | 0,4% |

**Action** :
1. Pour chaque page, determine la source du contenu :
   - Blog : Sanity ou Webflow ? Verifie dans `lib/blog.ts` comment les meta sont generees
   - Guide : Webflow API ? Verifie dans `lib/webflow-guides.ts`
2. Si les meta sont dans le code Next.js (`generateMetadata`), modifie-les directement
3. Si les meta viennent du CMS (Sanity/Webflow), note-le dans le rapport (hors scope code)

**Regles meta** :
- Title : mot-cle principal en debut, 50-60 caracteres, inclure un chiffre ou benefice
- Description : 120-155 caracteres, inclure un call-to-action
- Exemples :
  - Avant : "Packshot photography guide - Why make product packshots"
  - Apres : "Packshot Photography: 7 Reasons Your Products Need Pro Shots (2026 Guide)"

---

## Patterns a respecter

- Ne pas toucher aux imports, layouts, composants -- uniquement `next.config.ts` et les `generateMetadata()`
- Un commit par tache (3 commits)

## Criteres de done

- [ ] `npm run build` passe sans erreur
- [ ] Redirections DE/ES/NL pointent vers /en (individuelles + catch-all)
- [ ] Redirections EN machines verifiees
- [ ] Meta optimisees pour les pages dont le code source est modifiable
- [ ] 3 commits propres

## Compte-rendu

Ecris `/livrables/prompts-sessions/S1-RAPPORT.md` avec :
- Nombre de redirections DE/ES/NL ajoutees (individuelles vs catch-all)
- URLs pour lesquelles tu n'as pas trouve d'equivalent EN
- Pages dont les meta viennent du CMS (non modifiables dans le code)
- Tout probleme rencontre
