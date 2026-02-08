# Audit Initial du Codebase - 8 fevrier 2026

## Etat du codebase

### Routes existantes (23 pages)
```
app/[lang]/page.tsx                          # Homepage
app/[lang]/a-propos/page.tsx                 # A propos
app/[lang]/academy/page.tsx                  # Academy hub
app/[lang]/academy/[slug]/page.tsx           # Formation detail
app/[lang]/academy/calendrier/page.tsx       # Calendrier (contenu, pas d'embed Pipedrive)
app/[lang]/academy/formations-ia/page.tsx    # Formations IA
app/[lang]/academy/formations-packshot/page.tsx # Formations packshot
app/[lang]/academy/simulateur-opco/page.tsx  # Simulateur OPCO
app/[lang]/blog/page.tsx                     # Blog hub
app/[lang]/blog/[slug]/page.tsx              # Blog detail
app/[lang]/cgu/page.tsx                      # CGU
app/[lang]/confidentialite/page.tsx          # Confidentialite
app/[lang]/contact/page.tsx                  # Contact (Pipedrive form)
app/[lang]/guide/page.tsx                    # Guide hub
app/[lang]/guide/[slug]/page.tsx             # Guide detail
app/[lang]/ia-photo-produit/page.tsx         # IA / BlendAI
app/[lang]/industrie/page.tsx                # Industrie hub
app/[lang]/industrie/[slug]/page.tsx         # Industrie detail
app/[lang]/mentions-legales/page.tsx         # Mentions legales
app/[lang]/studio-photo/[slug]/page.tsx      # Machine detail
app/[lang]/studio-photo/selecteur-machines/page.tsx # Selecteur machines
app/[lang]/studios-photo-automatises/page.tsx # Studios hub
app/studio/[[...tool]]/page.tsx              # Sanity Studio
```

### Dossier vide
- `app/[lang]/blendai/` -- dossier existe mais est vide (la redirection /blendai -> /fr/ia-photo-produit gere le trafic)

### Traductions
- `messages/fr.json` : 632 lignes
- `messages/en.json` : 632 lignes

### Secteurs (data/secteurs.ts) : 12 existants
chaussures, bijoux-joaillerie, mobilier-decoration, food-alimentaire, cosmetiques-beaute, mode-textile, electronique-hightech, pieces-techniques-industrie, automobile-pieces-detachees, jouets-puericulture, sport-outdoor, sante-medical

### FAQPage schema
- Utilise dans : homepage, guide/[slug]
- Absent de : industrie/[slug] (12 pages x 2 langues), academy, guides hub

### GA4 / Analytics
- `components/calculators/ROICalculator/lib/analytics.ts` : tracking events ROI prets (gtag calls)
- AUCUN GA4 global integre (pas de gtag dans layout.tsx)

### Cookie banner
- AUCUN bandeau cookies

### Open Graph
- AUCUNE meta OG dans layout.tsx
- Pas de dossier /public/og/

### Problemes identifies

#### next.config.ts
- Ligne 45 : `/e-commerce` -> `/fr/e-commerce` (ROUTE INEXISTANTE - 404)
- Ligne 67 : `/packshot-secteur-e-commerce` -> `/fr/e-commerce` (ROUTE INEXISTANTE - 404)
- Lignes 98-103 : DE/ES/NL -> blendai.studio (doit pointer vers /en)

#### AIFeaturesGrid.tsx
- 4 liens cassés : `/blendai#lifestyle`, `/blendai#background`, `/blendai#retouche`, `/blendai#batch`

#### References ShotFlow (a nettoyer)
- `next.config.ts:88` : redirect /gestion-workflow-shotflow -> /fr/ia-photo-produit (GARDER)
- `app/[lang]/a-propos/page.tsx:48` : mention timeline 2024
- `messages/fr.json:49-57` : section "shotflow" complete
- `messages/en.json:49-57` : section "shotflow" complete

#### Redirection P1.2 EN machines
- Ligne 79 : `/en/photo-studio/:slug` -> `/en/studio-photo/:slug` -- DEJA EN PLACE
