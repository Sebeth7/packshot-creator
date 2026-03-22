# Session S6a : Pages secondaires batch 1 (Academy, Blog, A propos)

## Objectif
Appliquer le meme traitement UX/design "Studio Light" aux pages Academy, Blog et A propos.

## Contexte
Tu es dans le dossier `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`.

Le concept "Studio Light" a ete applique sur Home, Studios, IA, Industrie, et le template packshot-*.
Chaque section doit avoir un layout unique (pas de grilles monotones).
Composants motion disponibles : TextReveal, ScrollReveal, SpringCard, FadeInView, StaggerContainer.

## Pages a traiter
1. `/fr/academy` (hub) — enrichir, ajouter pricing visible, CTA
2. `/fr/academy/formations-packshot` — enrichir contenu
3. `/fr/academy/formations-ia` — enrichir contenu
4. `/fr/blog` (hub) — redesign layout
5. `/fr/a-propos` — ajouter story fondateur, equipe, timeline

## Decisions cles
- "systemes" pas "machines"
- Terminologie "Photo studio + IA" pas "hybride"
- Utiliser les composants motion partout
- Layouts varies : split sticky, bento, timeline, ruban stats, asymetrique CTA
- Cross-links editoriaux entre pages
- Schema.org si manquant

## Fichiers modifiables
- `app/[lang]/academy/**`
- `app/[lang]/blog/**` (hub uniquement, pas les articles individuels)
- `app/[lang]/a-propos/page.tsx`
- Cles de traduction UNIQUEMENT pour ces pages dans messages/*.json

## Fichiers INTERDITS
- Pages batch 2 (studio-photo, contact, defense)
- Pages deja traitees (Home, Studios, IA, Industrie, packshot-*)
- Composants partages (sauf si necessaire pour les pages de ce batch)

## Livrable
- Pages redesignees avec layouts "Studio Light"
- Build OK
- Rapport dans `sessions/S6a-rapport.md`
- Mise a jour PLAN_PROD.md
