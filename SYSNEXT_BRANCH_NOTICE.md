# ⚠ Notice — Branche `feat/sysnext-industrial` en cours

> **À lire par toute session de travail sur le repo `packshot-creator/` à partir du 2026-04-19.**

---

## Contexte

Une branche Git dédiée `feat/sysnext-industrial` est en cours de développement actif pour ajouter un **mini-site industrie B2B** sous `/[lang]/industrie-solutions/*`.

Ce mini-site est la marque commerciale **Sysnext Industrial Solutions** (endorsement de PackshotCreator), destiné à une audience industrielle B2B (aftermarket auto, MRO aéronautique, QC inspection, forensique, médical). Cible 2026 : premières signatures.

Ne pas confondre avec le sous-arbre `/[lang]/industrie/*` existant (hub e-commerce retail PKC, 15-16 secteurs), qui reste **intact** et non touché par cette branche.

## Où est le travail

- **Branche** : `feat/sysnext-industrial` (push remote sur GitHub `Sebeth7/packshot-creator`)
- **Preview Vercel** : URL preview auto-générée à chaque push (voir dashboard Vercel)
- **Repo ops associé** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-industrie-ops/` (gestion projet, stratégie, config, playbooks)
- **Source de vérité architecture** : `packshot-industrie-ops/config/cohabitation-marques.md`
- **Décisions formalisées** : `packshot-industrie-ops/DECISIONS.md` DR-011 + DR-012

## Règles pour les sessions qui travaillent sur `main`

### Tu peux

- Modifier toutes les pages **hors** `/[lang]/industrie-solutions/*` sans aucune précaution
- Modifier les 15 secteurs retail sous `/[lang]/industrie/*` (inchangés par Sysnext)
- Deployer en prod depuis `main` à volonté

### Attention conflits possibles

Si tu modifies un des 7 fichiers partagés suivants, il y aura conflit à la fusion de `feat/sysnext-industrial` → `main` :

| Fichier | Modification Sysnext |
|---|---|
| `app/globals.css` | Ajout namespace CSS `--sysnext-*`, `--calibration-*`, `--proof-*`, `--graphite-*` + polices IBM Plex |
| `app/[lang]/layout.tsx` | HeaderGate/FooterGate remplacent Header/Footer direct + 3 polices IBM Plex chargées |
| `app/[lang]/page.tsx` | `<SysnextEntryBanner />` ajoutée en tête (bloc 0 avant hero) |
| `middleware.ts` | Logique H4 : redirection par UTM `sysnext-*` et referer outbound vers `/industrie-solutions` |
| `next.config.ts` | Redirect 301 `/industrie-defense` → `/industrie-solutions` |
| `components/seo/SchemaOrg.tsx` | Ajout `sysnextOrganizationSchema()` + `subOrganization` dans `organizationSchema()` |
| `public/robots.txt` | Référence du second sitemap `/sitemap-sysnext.xml` |

**Convention** : si tu dois modifier un de ces fichiers, préviens la session Sysnext (via message à Seb) ou merge rapide sur `feat/sysnext-industrial` pour éviter dérive.

### Fichiers exclusifs à la branche Sysnext (zéro conflit)

Toute cette arborescence n'existe que sur `feat/sysnext-industrial` :

```
app/[lang]/industrie-solutions/          (layout + page hub + futures verticales)
app/api/contact-industrie/               (endpoint dédié)
app/api/roi-industrie/                   (endpoint dédié)
app/sitemap-sysnext.xml/                 (route handler sitemap)
components/sysnext/                      (SysnextHeader, SysnextFooter, SysnextEntryBanner)
components/layout/HeaderGate.tsx         (bascule transparente)
components/layout/FooterGate.tsx         (bascule transparente)
public/industrie-solutions/llms.txt      (llms.txt Sysnext)
public/llms.txt                          (llms.txt racine PKC)
```

## Règles de merge

- La branche `feat/sysnext-industrial` ne sera mergée dans `main` **qu'après validation complète** de Seb (contenu + tests + identité visuelle finalisée + audit SEO OK)
- Timing prévu : S2-S6 selon avancement. Horizon plancher S3 si urgence marché.
- Merge = mise en production immédiate (site packshot-creator.com live sur Vercel)

## Si doute

Demander à Seb avant de toucher un fichier listé dans la matrice de conflits. La documentation complète du projet Sysnext est dans le repo `packshot-industrie-ops/`.

---

**Dernière mise à jour** : 2026-04-19
**Session source** : S1 Piste A infrastructure Sysnext
**Contact** : Seb Ducros (sebphot@gmail.com)
