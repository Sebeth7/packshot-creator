# Session Design Autonome

> Ce template est concu pour des sessions autonomes.
> La session lit le design-system.md, analyse la page, et implemente sans attendre de validation section par section.

## Prerequis

Avant de commencer, lire dans cet ordre :
1. `design-system.md` — ADN design, patterns, couleurs, typographie, animations, anti-patterns
2. `app/[lang]/page.tsx` — La Home refaite, reference d'implementation
3. Le fichier de la page a travailler

## Mode operatoire

### Phase 1 — Audit (ne rien modifier)
1. Lire le fichier source de la page
2. Lire les traductions FR dans `messages/fr.json` (namespace de la page)
3. Naviguer sur `https://sysnext.vercel.app/fr/[PAGE]`, scroller et capturer un GIF
4. Produire un diagnostic : nombre de sections, layout de chaque, points forts/faibles
5. Identifier les violations du design-system (grilles monotones, titres trop petits, pas de labels, pas de bold selectif, animations uniformes, sections redondantes)

### Phase 2 — Plan
1. Pour chaque section : quel pattern du design-system s'applique
2. Rythme des fonds (narrative, pas mecanique)
3. Ou placer les images/placeholders
4. Quels textes beneficient du bold selectif
5. Quelles animations et directions choisir
6. Sections a fusionner ou supprimer si redondantes

### Phase 3 — Implementation
1. Modifier le fichier page.tsx
2. Ajouter les nouvelles cles de traduction FR (labels, bold tags, card content distinct)
3. Creer les equivalents EN
4. `npm run build` — zero erreur obligatoire
5. Commit + push

### Phase 4 — Verification
Si la page est deployee, naviguer dessus dans Chrome et verifier le rendu.

## Regles incontournables

- Lire `design-system.md` section 12 (anti-patterns) — ne JAMAIS faire ces choses
- `type="button"` sur tout Button dans un form (sauf submit)
- Responsive prefixes obligatoires (`text-4xl lg:text-6xl`, jamais `text-6xl` seul)
- Traductions : toujours FR + EN
- Ne JAMAIS lancer le dev server sans demander
- Ne JAMAIS utiliser le CLI Vercel
- Terminologie : "systemes" (pas "machines"), "Photo studio + IA", BlendAI.studio

## Reference Apple (si besoin)

Consulter uniquement si la page a un layout complexe qui n'est pas couvert par les patterns du design-system :
- `https://www.apple.com/fr/` — Home : bento grid, sections produit empilees
- `https://www.apple.com/fr/iphone-17e/` — Page produit : label+titre gradient+visuel, bento asymetrique
- `https://www.apple.com/fr/macbook-pro/` — Page pro : fond noir, sticky nav, typo geante

## Composants disponibles

```
AnimatedCounter — compteur anime whileInView (end, prefix, suffix, duration)
FadeInView — fade directionnel (direction: up/down/left/right, delay)
ScrollReveal — parallax Y + opacity au scroll (offset, scale: bool)
TextReveal — titre mot par mot (as: h1-h3, staggerSpeed)
SpringCard — micro-interactions hover/tap (hoverY, hoverScale)
StaggerContainer + StaggerItem — animations en cascade (stagger, direction)
HeroSection + HeroVideo/HeroBackground — hero reutilisable (layout, badge, ctas)
```

## Livrable

1. Page modifiee — build OK
2. Traductions FR + EN a jour
3. Commit + push avec message descriptif
