// packshot-router: Cloudflare Worker de migration Webflow → Next.js
// Route /fr/* et /en/* vers Vercel (Next.js), le reste vers Webflow

const NEXTJS_PATTERNS = [
  /^\/(fr|en)(\/|$)/,    // /fr, /en et tout sous-chemin
  /^\/_next\//,           // Assets Next.js (JS, CSS, images)
  /^\/images\//,          // Images statiques (public/images/)
  /^\/logos\//,           // Logos (public/logos/)
  /^\/api\//,             // API routes Next.js
  /^\/calculateur-roi/,   // Page non-localisée
  /^\/sitemap\.xml$/,     // Sitemap généré par Next.js
  /^\/favicon/,           // Favicons
  /^\/robots\.txt$/,      // robots.txt
];

// Slugs blog servis par Next.js. Deux origines :
// (a) 12 articles statiques (pages TSX dans app/[lang]/blog/<slug>/)
// (b) 60 articles FR migrés depuis Webflow vers content/blog/fr/ (Phase 2)
// Tout autre slug sous /(fr|en)/blog/ → Webflow proxy.
const NEXTJS_BLOG_SLUGS = new Set([
  // === 12 articles statiques ===
  'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026',
  'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
  'budget-studio-photo-automatise',
  'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet',
  'comparatif-orbitvu-ortery-styleshoots-2026',
  'financement-formation-opco-guide-complet-pour-studios-photo-2026',
  'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
  'guide-achat-studio-2026',
  'ia-photo-produit-guide-2026',
  'orbitvu-vs-concurrents',
  'prestataire-packshot-vs-studio-interne',
  'studio-ia-vs-ia-generative',

  // === 60 articles FR migrés Webflow → Next.js (Phase 3 — 2026-05-01) ===
  '5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste',
  '8-defis-prodution-contenu-visuel',
  'acheter-studio-photo-packshot-occasion',
  'avantage-du-e-commerce-pour-les-entreprises',
  'avantages-toplight-photographie-produits',
  'boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter',
  'choix-media-guide-de-la-photographie-packshot-4',
  'comment-automatiser-la-creation-de-vos-photographies-animations-de-produits',
  'comment-avoir-des-photos-professionnelles-guide-packshot-produit',
  'comment-avoir-meilleure-photo-produit-e-commerce',
  'comment-avoir-meilleures-images-amazon',
  'comment-choisir-objectif-en-photographie-packshot',
  'comment-ia-revolutionne-production-visuelle',
  'comment-maitriser-le-flou-dans-la-photographie-de-produits',
  'comment-mettre-en-valeur-un-produit-guide-photographie-packshot',
  'comment-shotflow-ameliore-suivi-taches-en-temps-reel',
  'comment-shotflow-permet-accelerer-production-contenus-visuels-mode',
  'comment-shotflow-permet-optimiser-production-contenu',
  'comparatif-de-solutions-de-photographie-automatisee',
  'conseils-photo-le-cadrage-et-la-composition',
  'de-la-photographie-2d-aux-modeles-3d-de-vos-produits-introduction-a-la-photogrammetrie',
  'decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator',
  'e-commerce-4-fondamentaux-pour-reduire-les-abandons-de-panier',
  'e-commerce-8-elements-indispensables-pour-reussir',
  'e-commerce-comment-mettre-en-place-votre-studio-photo',
  'e-commerce-quel-est-le-reel-impact-des-visuels',
  'eclairage-packshots-360-3d-produits',
  'eclairage-photos-produits',
  'est-il-utile-dinternaliser-sa-production-de-photos-packshot',
  'evolution-e-commerce-packshot',
  'focus-sur-lhyperfocus',
  'guide-photographie-packshot-pourquoi-faire-packshots',
  'ia-lumieres-virtuelles-revolution-packshot',
  'interview-visuels-ecommerce-wizishop',
  'joailliers-nos-conseils-pour-reussir-vos-visuels-produits',
  'la-chaussure-un-secteur-incontournable-du-e-commerce-dynamise-avec-packshotcreator',
  'lancement-dune-serie-debooks-dediee-au-ecommerce',
  'les-visuels-au-service-du-referencement-de-votre-e-commerce',
  'logiciel-packshotcreator-ortery-perdu-solution',
  'materiel-photo-guide-photographie-packshot',
  'meubles-decorations-comment-etre-plus-visibles-sur-le-web',
  'optimiser-collaboration-equipe-success-story-shotflow',
  'optimiser-travail-production-visuelle',
  'orbitvu-lautomatisation-au-service-de-la-photographie-3d-360deg',
  'oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg',
  'photographie-2d-de-produits',
  'photographie-360-amazon',
  'photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre',
  'photographie-de-produits-a-360-degres-en-interne',
  'photographie-de-produits-comment-presenter-vos-vetements',
  'photographier-une-bague-comme-un-professionnel-en-8-etapes',
  'pourquoi-choisir-orbitvu-photographie-packshot',
  'promod-revolutionne-ses-shootings-photos-de-mode',
  'quel-format-d-image-pour-le-web',
  'quel-retour-sur-investissement-avec-un-studio-photo-en-interne',
  'quel-studio-photo-type-pour-vos-shootings-produits-en-interne',
  'revolution-e-commerce-les-animations-3d-spheriques-de-produits-pour-le-sport',
  'taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques',
  'utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle',
  'votre-studio-photo-interne-3-bonnes-pratiques-pour-lorganiser',

  // === 55 articles EN migrés Webflow → Next.js (Phase 3 complète — 2026-05-02) ===
  // 3 slugs identiques aux FR (drafts whitelistés) sont naturellement dédupliqués par le Set
  '3-good-practices-for-organizing-the-production-of-your-internal-photo-studio',
  '360-photos-marketplaces',
  '4-fundamentals-for-reducing-abandoned-shopping-carts',
  '5-cameras-realistic-3d-animation',
  '5-questions-before-investing-in-an-in-house-photo-studio',
  '8-challenges-producing-visual-content',
  '8-steps-to-professional-jewelry-photography',
  'advantages-toplight-product-photography',
  'ai-virtual-lights-revolution-packshot',
  'automate-creation-product-photographs-animations',
  'best-image-format-for-the-web',
  'best-photo-studio-in-house-photo-shoots',
  'comparison-of-automated-photography-solutions',
  'e-commerce-6-practices-to-boost-your-conversion-rate',
  'e-commerce-8-elements-success',
  'e-commerce-packshot-evolution',
  'e-commerce-set-up-internal-packshots',
  'focus-on-the-focus-stacking',
  'from-2d-photography-to-3d-models-of-your-products-introduction-to-photogrammetry',
  'furniture-decoration-e-commerce-photography',
  'how-ai-revolutionizing-visual-production',
  'how-shotflow-accelerates-fashion-visual-content-production',
  'how-shotflow-helps-optimize-content-production',
  'how-shotflow-improves-real-time-task-tracking',
  'how-to-avoid-blurry-product-photographs',
  'how-to-choose-best-lens-for-product-photography',
  'how-to-e-commerce-product-photography',
  'how-to-ensure-consistency-between-photos-packshot-photography-guide',
  'how-to-get-best-amazon-product-photos',
  'impact-photographs-product-sheet',
  'interview-laurent-wainberg-founder-packshotcreator',
  'interview-visuals-ecommerce-wizishop',
  'lighting-3d-packshots',
  'lost-packshotcreator-ortery-software-solution',
  'media-photography-complete-guide-to-packshot-photography-4',
  'optimize-team-collaboration-success-story-shotflow',
  'optimizing-visual-production-work',
  'orbitvu-automation-for-3d-360-product-photography',
  'packshot-photography-guide-product-photography-equipment',
  'packshot-photography-guide-why-make-product-packshots',
  'photographie-2d-de-produits',
  'photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre',
  'photographie-de-produits-a-360-degres-en-interne',
  'potential-advantages-e-commerce-businesses',
  'product-photo-lighting',
  'product-photography-how-to-showcase-your-clothing',
  'product-showcase-how-to-packshot-photography-guide',
  'second-hand-packshot-photo-studio',
  'series-e-commerce-ebooks-shooting-products',
  'shoes-the-unmissable-e-business-sector-boosted-with-packshotcreator',
  'technique-photograph-jewelry-tutorial',
  'tips-photo-framing-composition',
  'use-photo-studio-virtual-reality',
  'what-return-on-investment-with-an-internal-photo-studio',
  'why-choose-orbitvu-for-packshot-photography',

  // === Articles natifs Next.js (post-Phase 3) ===
  'generer-images-produit-ia',
]);

// Blog EN sans préfixe /en/ — articles vivants sur Webflow à /en/blog/slug
// Redirect 301 /blog/slug → /en/blog/slug pour préserver le link equity
const BLOG_EN_REDIRECTS = new Set([
  '4-fundamentals-for-reducing-abandoned-shopping-carts',
  '5-cameras-realistic-3d-animation',
  '5-questions-before-investing-in-an-in-house-photo-studio',
  '8-challenges-producing-visual-content',
  'advantages-toplight-product-photography',
  'ai-virtual-lights-revolution-packshot',
  'automate-creation-product-photographs-animations',
  'best-image-format-for-the-web',
  'best-photo-studio-in-house-photo-shoots',
  'e-commerce-8-elements-success',
  'focus-on-the-focus-stacking',
  'from-2d-photography-to-3d-models-of-your-products-introduction-to-photogrammetry',
  'furniture-decoration-e-commerce-photography',
  'how-to-avoid-blurry-product-photographs',
  'how-to-choose-best-lens-for-product-photography',
  'how-to-e-commerce-product-photography',
  'how-to-ensure-consistency-between-photos-packshot-photography-guide',
  'how-to-get-best-amazon-product-photos',
  'impact-photographs-product-sheet',
  'interview-laurent-wainberg-founder-packshotcreator',
  'lighting-3d-packshots',
  'optimizing-visual-production-work',
  'orbitvu-automation-for-3d-360-product-photography',
  'packshot-photography-guide-product-photography-equipment',
  'packshot-photography-guide-why-make-product-packshots',
  'potential-advantages-e-commerce-businesses',
  'product-photo-lighting',
  'product-showcase-how-to-packshot-photography-guide',
  'second-hand-packshot-photo-studio',
  'technique-photograph-jewelry-tutorial',
  'tips-photo-framing-composition',
  'what-return-on-investment-with-an-internal-photo-studio',
  'why-choose-orbitvu-for-packshot-photography',
]);

// Guides EN sans préfixe /en/ — vivants sur Webflow à /en/guide/slug
const GUIDE_EN_REDIRECTS = new Set([
  'create-professional-360-animation-of-shoes',
  'how-to-do-focus-stacking-for-ring-photography',
  'how-to-take-multi-angle-photos-of-shoes',
  // AJOUT 2026-04-20 — guide EN migré vers Next.js
  'how-to-make-360-animation-transparent-object',
]);

// ============================================================
// Pages définitivement supprimées → 410 Gone
// Source : audit GSC complet (128 URLs en 404 confirmées)
// + AJOUT 2026-04-14 — audit redirections 999 URLs GSC
// + AJOUT 2026-04-16 — audit 429 URLs GSC 404 (269 encore en 404)
// ============================================================
const GONE_PATHS = new Set([
  // FR blog (sans préfixe langue — anciennes URLs pré-Webflow)
  '/blog/11-ans-deja',
  '/blog/chaussures-homme-luxe-lelegance-en-ligne',
  '/blog/codes-et-dernieres-tendances-pour-vos-visuels-produits-sur-les-reseaux-sociaux',
  '/blog/comment-mieux-exporter-son-vin-en-chine-quel-role-jouent-les-visuels-e-commerce',
  '/blog/comment-permettre-a-vos-visiteurs-de-voir-vos-produits-sous-plusieurs-angles',
  '/blog/comment-photographier-des-petits-objets-pour-votre-e-commerce',
  '/blog/conseils-dexperts-pour-des-visuels-produits-efficaces',
  '/blog/decouvrez-lhistoire-dun-fail-du-e-commerce',
  '/blog/donnez-du-relief-a-votre-communication-maestrobot3d-par-packshotcreator',
  '/blog/e-commerce-8-elements-indispensables-pour-reussi',
  '/blog/e-commerce-astuces-diminution-taux-de-rebond',
  '/blog/e-commerce-avec-quel-materiel-photographier-de-petits-objets-en-studio',
  '/blog/e-commerce-comment-prendre-en-photo-vos-bijoux-et-creations-en-studio',
  '/blog/e-commerce-du-stock-physique-de-produits-au-stock-numerique',
  '/blog/e-commerce-les-4-arguments-justifiant-la-necessite-de-produire-vos-propres-visuels',
  '/blog/evolution-du-e-commerce-et-photographie-de-produits',
  '/blog/guide-photo-ecommerce-2018',
  '/blog/instagram-pinterest-lequel-pour-vos-visuels',
  '/blog/la-loupe-cest-bien-le-zoom-progressif-cest-mieux',
  '/blog/les-5-lois-de-lattraction-visuelle-dans-le-e-commerce',
  '/blog/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e-commerce',
  '/blog/les-conseils-de-packshotcreator-pour-2016-dans-le-livre-blanc-de-wizishop',
  '/blog/limportance-du-visuel-pour-un-site-web-e-commerce',
  '/blog/nouveautes-2018-photos-ecommerce',
  '/blog/offrez-a-vos-e-shoppers-un-confort-de-navigation-optimal-sur-votre-site-e-commerce',
  '/blog/optimisez-la-gestion-budgetaire-de-votre-studio-photo-interne',
  '/blog/packshotcreator-lance-son-nouveau-livre-blanc',
  '/blog/peut-on-faire-de-bonnes-images-sans-bon-materiel-photo',
  '/blog/photographie-de-produits-gerez-les-reflets-et-la-transparence',
  '/blog/photos-e-commerce-4-millions-dinternautes-a-seduire-quotidiennement-a-laide-de-centaines-de-photos-de-produits',
  '/blog/retour-du-salon-mondial-de-la-realite-augmentee-awe',
  '/blog/solution-ecommerce-wizishop-nouvelle-version',
  '/blog/studio-photo-interne-ecommerce',
  '/blog/studio-photo-maison-photographie-produit',
  '/blog/une-seconde-vie-pour-vos-photos-de-produits-avec-pinterest',
  '/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22',
  '/blog/webinar-augmenter-votre-taux-de-conversion-grace-a-des-visuels-produit-en-360',
  // EN pages diverses
  '/en/ads-generaliste',
  '/en/besoins',
  '/en/packshot-automatise-packshotcreator',
  '/en/questions-cles',
  '/en/thank-you-page',
  // EN blog
  '/en/blog/11-years-service-product-photography',
  '/en/blog/3-good-practices-for-organizing-the-production-of-your-internal-photo-studio2',
  '/en/blog/3d-object-relief-communication',
  '/en/blog/4-reasons-producing-ecommerce-visuals',
  '/en/blog/automated-photography-solutions-comparison',
  '/en/blog/awe-show-return',
  '/en/blog/boost-your-conversion-rate-with-product-visuals-4-mistakes-to-avoid',
  '/en/blog/can-one-take-good-product-photos-without-good-material',
  '/en/blog/display-clothes-photo-flatlay',
  '/en/blog/e-commerce-8-elements-success-copy',
  '/en/blog/e-commerce-million-users-seduce',
  '/en/blog/e-commerce-stockroom-digital-inventory',
  '/en/blog/e-commerce-tips-reduce-bounce-rate',
  '/en/blog/evolution-e-commerce-packshot',
  '/en/blog/expert-tips-product-photography',
  '/en/blog/guidelines-trends-social-media-images',
  '/en/blog/homemade-photo-studio-product-photography',
  '/en/blog/how-better-export-wine-china-role-e-commerce',
  '/en/blog/how-visitors-see-products-multiple-perspectives',
  '/en/blog/htlm5-360-animations-keys-success-e-commerce',
  '/en/blog/importance-visuals-e-commerce-website',
  '/en/blog/in-house-photo-studio-economies-scale',
  '/en/blog/instagram-pinterest-which-your-e-commerce',
  '/en/blog/law-visual-attraction-ecommerce',
  '/en/blog/luxury-shoes-elegance-online',
  '/en/blog/magnifying-glass-good-zoom-better',
  '/en/blog/news-e-commerce-photos',
  '/en/blog/offer-e-shoppers-optimal-browsing',
  '/en/blog/optimize-budget-management-photo-studio',
  '/en/blog/packshot-invest-orbitvu-photo-studios',
  '/en/blog/packshotcreator-white-book-e-commerce',
  '/en/blog/photograph-a-ring-like-a-professional-in-8-steps',
  '/en/blog/photograph-small-objetcs-e-commerce',
  '/en/blog/photographing-ring-8-steps',
  '/en/blog/product-photo-guide',
  '/en/blog/product-photography-reflections-transparency',
  '/en/blog/roi-in-house-photo-studio',
  '/en/blog/second-life-products-pinterest-e-commerce',
  '/en/blog/small-items-macrophotography-studio',
  '/en/blog/story-e-commerce-failure',
  '/en/blog/tips-wizishop-by-packshotcreator',
  '/en/blog/use-photo-studio-virtual-reality-2',
  '/en/blog/visuals-in-house-saves-time-budget',
  '/en/blog/visuals-referencing-your-e-commerce',
  '/en/blog/webinar-increase-conversion-rate',
  '/en/blog/wizishop-new-version',
  // EN guides
  '/en/guide/animation-360-focus-stacking',
  '/en/guide/comment-photographier-lunettes-e-commerce',
  '/en/guide/convert-product-color-in-product-photography',
  '/en/guide/equipement-photo-360-bijoux',
  '/en/guide/guide-montre',
  '/en/guide/guide-photo-bijoux-pierres-precieuses',
  '/en/guide/realiser-animation-360-professionnelle-chaussures',
  '/en/guide/what-settings-photograph-jewelry',
  '/en/guide/which-settings-for-jewelry-photography',
  // FR guides (sans préfixe)
  '/guide/5-videos-chaussures-ia-alphashot-pro-g2',
  '/guide/conversion-de-couleur',
  '/guide/equipement-photo-360-bijoux',
  '/guide/guide-montre',
  '/guide/guide-photo-bijoux-pierres-precieuses',
  // Legacy paths (ftp, resources, pages, old products)
  '/ftp/PackshotViewer/3D-leicanew/HTML5Viewer.html',
  '/ftp/SYSNEXT_CGV_EN.pdf',
  '/ftp/Sysnext_CGS_EN.pdf',
  '/ftp/Sysnext_CGS_FR.pdf',
  '/ftp/libro-blanco-problematicas-e-business-fotografia-2-0.pdf',
  '/new-get-the-best-out-of-the-new-packshotcreator-2013-software-with-your-nikon-slr-camera',
  '/new-product-photography-software',
  '/pages/tools-components-photography',
  '/resources/files/2019/03/en-packshotcreator-r3-installation-guide.pdf',

  // AJOUT 2026-04-14 — 404-LANGUE-MORTE — 21 entrées
  // Blog/guide DE/ES/NL sur www sans préfixe langue, contenu supprimé
  '/blog/blog-ist-sinnvoll-deine-fotoproduktion-verinnerlichen',
  '/blog/fotografia-de-productos-como-presentar-su-ropa',
  '/blog/hoe-shotflow-de-productie-van-mode-visuele-content-versnelt',
  '/blog/interview-visuele-ecommerce-wizishop',
  '/blog/lost-packshotcreator-ortery-software-solution',
  '/blog/packshotcreator-ortery-software-verloren-loesung',
  '/blog/produktfotografie-beleuchtung',
  '/blog/produktfotografie-wie-sie-ihre-kleidung-prasentieren',
  '/blog/team-samenwerking-optimaliseren-succesverhaal-shotflow',
  '/guide/como-posicionar-reloj-para-fotos-producto',
  '/guide/crear-animacion-360-profesional-de-zapatos',
  '/guide/farbe-eines-produktfotos-andern',
  '/guide/guide-hoe-horloge-plaatsen-voor-fotoshoot',
  '/guide/hoe-benadruk-je-de-texturen-van-producten-in-een-packshot',
  '/guide/hoe-creeer-je-automatische-multi-angle-views-van-een-object',
  '/guide/hoe-creeer-je-een-360-video-van-een-kunstobject',
  '/guide/hoe-focus-stacking-doen-voor-ringfotografie',
  '/guide/hoe-maak-je-meerhoekige-fotos-van-schoenen',
  '/guide/modificar-color-producto-foto',
  '/guide/que-ajustes-para-fotografiar-joyas',
  '/guide/wie-man-ein-schuhvideo-macht',
  '/guide/wie-uhr-vor-shooting-reinigen',

  // AJOUT 2026-04-14 — 404-PRINCIPAL — 18 entrées
  // Pages EN legacy sans préfixe langue, contenu supprimé
  '/automated-photography-solutions-comparison',
  '/boost-your-conversion-rate-with-product-visuals-4-mistakes-to-avoid',
  '/display-clothes-photo-flatlay',
  '/drop-shadow-feature',
  '/ecommerce-jewelry-photography-tutorial',
  '/multiple-formats-product-photography',
  '/new-software-installation-mac',
  '/packshot-monitoring-devices',
  '/packshotcreator-is-a-time-saving-and-stressless-solution-for-product-photography',
  '/studio-photography-rings-360',
  '/time-lapse-software-feature',
  '/transparent-png-file',
  '/ty-challenges-e-commerce-2',
  '/webinars-product-photography-packshot',

  // AJOUT 2026-04-14 — 404-MINEUR — 3 entrées
  '/home',
  '/it',
  '/index.asp',

  // AJOUT 2026-04-16 — audit GSC 429 URLs en 404 — 139 entrées
  // Blog multilingues morts (ES/DE/NL — 87 entrées)
  '/blog/10-consejos-crear-foto-venta',
  '/blog/360-productfotografie-marktplaatsen-amazon',
  '/blog/360-produktfotografie-marktplatze-amazon',
  '/blog/5-camaras-simultaneamente-animacion-3d',
  '/blog/5-kameras-gleichzeitig-realistiche-3d-animationen',
  '/blog/8-pasos-para-fotografiar-joyas-profesionalmente',
  '/blog/8-uitdagingen-produceren-visuele-content',
  '/blog/amazon-produktfotos-wie-man-sie-optimiert',
  '/blog/amp/1',
  '/blog/aprender-fotografia-joyas-ecommerce',
  '/blog/automatiseer-creatie-productfoto-animaties',
  '/blog/automatizar-fotos-productos',
  '/blog/beleuchtung-3d-animationen-360-objekt-packshots',
  '/blog/blog-guia-3-destacar-productos',
  '/blog/boost-der-conversionrate-vermeiden-sie-diese-fehler',
  '/blog/comercio-electronico-8-elementos-para-exito',
  '/blog/como-elige-mejor-objectivo-foto-paquete',
  '/blog/como-evitar-fotografias-productos-borrosas',
  '/blog/como-orbitvu-convirtio-socio-referencia',
  '/blog/como-shotflow-permite-optimizar-produccion-contenido',
  '/blog/como-tener-mejores-fotos-impulsar-ventas-amazon',
  '/blog/concentreer-op-hyperfocus',
  '/blog/concentrese-en-el-hiperenfoque',
  '/blog/consejos-encuadre-composicion',
  '/blog/conversiepercentage-verhoog-beeldmateriaal-6-praktische',
  '/blog/cual-estudio-fotografico-sesiones-fotografia-productos-internas',
  '/blog/de-la-fotografia-2d-a-los-modelos-3d-de-sus-productos-introduccion-a-la-fotogrametria',
  '/blog/e-books-fotos-e-commerce-speciaal-producten',
  '/blog/e-commerce-4-grundlagen-reduzierung-kaufabbruchen',
  '/blog/e-commerce-fotostudio-richte-fur-internen-packshots',
  '/blog/e-commerce-packshot-evolutie',
  '/blog/eine-reihe-foto-e-books-fotografieren-produkte-widmen',
  '/blog/entrevista-laurent-wainberg-fundador-packshotcreator',
  '/blog/estudio-foto-comercio-electronico-configurarlo-packshots-internos',
  '/blog/fotografia-calzado-comercio-electronico-nuestras-soluciones-sector-dinamico',
  '/blog/fotografia-muebles-decoracion-comercio-electronico',
  '/blog/fotos-360-amazon',
  '/blog/fotostudio-produkt-fotoshootings',
  '/blog/fototipps-rahmung-komposition',
  '/blog/fototips-inlijsten-compositie',
  '/blog/gebrauchten-fotostudios',
  '/blog/gids-2-packshot-fotoapparatuur-weten',
  '/blog/gids-4-welke-media',
  '/blog/gids-5-professionelere-fotografies',
  '/blog/guia-1-porque-tomar-foto-paquetes',
  '/blog/guia-2-equipo-fotografico-lo-necesita-saber',
  '/blog/guia-4-que-medio-elegir',
  '/blog/guia-5-obtener-fotografias-profesionales-consistentes',
  '/blog/het-belang-belichting-3d-360-objectpackshots',
  '/blog/hoe-ai-de-visuele-productie-revolutioneert',
  '/blog/hoe-beste-productfoto-verkoop-stimuleren',
  '/blog/impact-fotos-op-productblad-e-commerce',
  '/blog/importancia-iluminacion-animaciones-3d-fotografias-paquetes',
  '/blog/infographik-8-wesentliche-elemente-erfolg',
  '/blog/interview-laurent-wainberg-grunder-packshotcreator',
  '/blog/interview-laurent-wainberg-oprichter-packshotcreator',
  '/blog/konzentrieren-hyperfokus',
  '/blog/leitfaden-packshot-fotografie-warum-packshots-machen',
  '/blog/maximaliseer-potentieel-e-commerce',
  '/blog/meubel-decoratiefotografie-e-commerce',
  '/blog/mobel-dekorationsfotografie-e-commerce',
  '/blog/optimizacion-trabajo-produccion-visual',
  '/blog/orbitvu-automatisering-voor-3d-360-productfotografie',
  '/blog/orbitvu-automatizacion-para-fotografia-3d-360',
  '/blog/packshot-gids-1-maken',
  '/blog/productfoto-10-onfeilbare-maker-verkoopproductfoto',
  '/blog/productfotografie-hoe-uw-kleding-te-presenteren',
  '/blog/productfotografie-orbitvu-go-to-partner',
  '/blog/produkt-vorstellen-leitfaden-packshot-fotografie',
  '/blog/produktfotos-fur-onlineshop-10-unfehlbaren-tipps',
  '/blog/que-formato-para-web',
  '/blog/unscharfe-produktabbildungen-vermeiden',
  '/blog/usa-estudio-foto-hacer-realidad-virtual',
  '/blog/vergleich-von-automatisierten-fotografie-loesungen',
  '/blog/vollstange-anleitung-packshot-fotoausrustung',
  '/blog/von-2d-fotografie-zu-3d-modellen-ihrer-produkte-einfuhrung-in-die-photogrammetrie',
  '/blog/vorteile-des-e-commerce-fur-unternehmen',
  '/blog/vorteile-toplight-produkt-fotografie',
  '/blog/wat-rendement-met-een-intern-fotostudio',
  '/blog/wat-typische-fotostudio-voor-productopnames',
  '/blog/welches-bildformat-ist-das-beste-fur-das-web',
  '/blog/welches-medium-zu-bevorzugen-ist-leitfaden-packshot-fotografie',
  '/blog/welk-beeldformaat-voor-het-web',
  '/blog/welke-techniek-sieraden-e-commerce-fotohandleiding',
  '/blog/wie-haben-professionelle-fotos-anleitungen-packshot-produkt',
  '/blog/wie-man-objektiv-fuer-produktfotografie-auswaehlt',
  '/blog/wie-shotflow-die-content-produktion-optimieren-kann',
  // Guides multilingues morts (ES/DE/NL — 13 entrées)
  '/guide/animacion-360-focus-stacking',
  '/guide/como-crear-una-animacion-360-con-el-asistente-de-ia-de-orbitvu',
  '/guide/como-crear-video-de-zapatos',
  '/guide/como-hacer-focus-stacking-para-fotografiar-anillo',
  '/guide/hoe-creeer-je-een-360-animatie-met-de-orbitvu-ai-assistent',
  '/guide/hoe-een-schoenenvideo-maken',
  '/guide/hoe-focus-stacking-doen-voor-armbandfotografie',
  '/guide/hoe-uitgesneden-sieradenfoto-maken',
  '/guide/lipstick-textuur-foto-ai-verbeteren',
  '/guide/professionele-360-animatie-van-schoenen-maken',
  '/guide/professionelle-360-animation-von-schuhen-erstellen',
  '/guide/que-equipo-elegir-para-foto-joyas',
  '/guide/wie-focus-stacking-fur-ringfotografie-machen',
  // Pages legacy marketing et divers (39 entrées)
  '/2018-guide-e-commerce-photos',
  '/2d-product-photography/amp',
  '/360-product-photography',
  '/3d-products-models',
  '/automask-automated-background-removal',
  '/category/ecommerce/amp',
  '/cdn-cgi/l/email-protection',
  '/challenges-e-commerce',
  '/complementary-solutions/software/packshot-creator',
  '/discover-packshotcreator',
  '/e-commerce-6-good-practices-to-boost-your-conversion-rate',
  '/e-commerce-6-good-practices-to-boost-your-conversion-rate/amp',
  '/fashion-automated-photo-studio/amp',
  '/fotostudios-voor-mode-en-accessoires',
  '/functions-software-packshot',
  '/html5/product-pages/360-blackbag/HTML5Viewer.html',
  '/images/hero/hero-landing-packshot-mode-lg.avif',
  '/lp-attractive-visuals-3',
  '/lp-automatiser-prises-de-vue',
  '/online-demonstration-packshotcreator',
  '/packshotcreator-fashion-retail-industry',
  '/packshotlive',
  '/product-industry/packaging-en',
  '/product-photography-light-sources',
  '/products-animations-360/amp',
  '/promod-is-boosting-its-fashion-photo-shoot-with-packshotspin',
  '/quote-ressources',
  '/range-start/photo-turntable-O3T/advantages',
  '/request-information-product',
  '/review/sport-shoes-still-shot',
  '/revolution-in-the-biggest-polish-online-private-sale-website',
  '/robotic-photo-studio-ecommerce/amp',
  '/second-hand-packshot-photo-studios',
  '/services-packshot-consulting',
  '/software-interactivity-packshotviewer',
  '/software-updates-packshotcreator',
  '/study-case-eyewear-photography-for-ecommerce',
  '/webinar-increase-your-conversion-rate-with-product-visuals-in-360',
  '/webinar-v2',

  // AJOUT 2026-04-14 — 404-SOUS-DOMAINE — 46 entrées
  // Anciennes pages DE/ES/NL/FR sur sous-domaines, pathnames arrivant sur www après DNS
  '/360-drehscheibe-produktfotografie',
  '/animaties-3d',
  '/archivos-personalizados-fotos-productos',
  '/beheer-meerdere-foto-studios',
  '/comparator-features-packshot-studios',
  '/comparator-funcionalidades-estudio-foto',
  '/configurador-estudios-foto',
  '/ecommerce-time-to-market',
  '/estudios-foto-ropa-accesorios-moda',
  '/fotografias-productos-multiangulos',
  '/fotos-360-amazon',
  '/gamme-start/presentation-studios-photo-web-economiques',
  '/gamme-studio/studio-photo-360-bijoux-packshot-macro-r/photographier-montre-joaillerie',
  '/gamme-studio/studio-photo-360-bijoux-packshot-macro-r/presentation',
  '/gamme-studio/table-lumineuse-photo-luminapad/presentation',
  '/image-fantome-transparence-photos',
  '/industry/estudio-fotos-zapatos',
  '/industry/foto-anteojos-estudio',
  '/industry/fotografia-producto-tecnicos',
  '/industry/fotos-packshot-lederwaren-bagage',
  '/industry/moda',
  '/iq-mask-detourage-photo-automatique',
  '/leitfaden-packshot-fotografie-warum-packshots-machen',
  '/medir-fotos-productos',
  '/nutzen-mit-foto-studios-for-visual-produkte',
  '/optimisez-la-gestion-budgetaire-de-votre-studio-photo-interne',
  '/packshotcreator-auf-der-cebit-vom-6-\u2013-10-maerz-2012-vertreten-stand-f61-e-hall-15-planet-reseller',
  '/packshotcreator-is-dat-een-mini-fotostudio',
  '/perfiles-fotos-productos',
  '/photos-et-animations-produits-dans-votre-secteur/equipements-bureautiques',
  '/product/captura-foto-3d',
  '/produkt-messung-feature',
  '/range-pro/foto-studio-enterprise-packshot-creator-x2/prasentation',
  '/review/packshot-bottles-wine',
  '/rich-media-visuelle-3D-produkte-ecommerce-web-umrechnungskurse',
  // /secteur/*/exemples-* → interceptés dans le fetch handler (avant le handler /secteur/*)
  '/software-erfolg-packshotcreator',
  '/sondage-optimisation-photos-e-commerce',
  '/transparant-png-bestand',
  '/vorteile-toplight-produkt-fotografie',
  '/wie-man-objektiv-fuer-produktfotografie-auswaehlt',
  '/zelfgemaakte-fotostudio-productfotografie',
  // AJOUT 2026-04-18 — landing legacy fr.packshot-creator.com citées par articles blog
  // finissent aujourd'hui en 404 via Webflow → passer en 410 Gone pour signal SEO net
  '/fonctions-simplicite',
  '/fonctions-productivite',
  '/fonctions-creativite',
  '/photographie-produits-formats-multiples',
  '/photographie-produits-360',
  '/produit/livestudio-reinvente-la-mise-en-images',
  '/produit/studio-macrophotographie-360-bagues',
  '/produit/plateaux-tournants-360',
  '/produit/packshotalto-mark-2',
  '/pourquoi-choisir-orbitvu-photographie-packshot',
  '/donnez-du-relief-a-votre-communication-maestrobot3d-par-packshotcreator',
  '/webinar-augmenter-votre-taux-de-conversion-grace-a-des-visuels-produit-en-360',
  '/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e\u2011commerce',
  '/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e%E2%80%91commerce',
  '/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e%e2%80%91commerce',
  '/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques',
  '/packshotcreator-cologne-photokina-2018',

  // AJOUT 2026-04-20 — URLs encore 404 au rapport GSC du 2026-04-20
  // Variante courte d'un article mort (vrai slug : /e-commerce-6-good-practices-to-boost-your-conversion-rate)
  '/blog/e-commerce-6-practices-to-boost-your-conversion-rate',
  // Images hero renommées (nouveaux noms : hero-landing-industriel-*.avif, hero-landing-ecommerce-*.avif)
  '/images/hero/hero-landing-packshot-industriel-sm.avif',
  '/images/hero/hero-landing-packshot-industriel-md.avif',
  '/images/hero/hero-landing-packshot-industriel-lg.avif',
  '/images/hero/hero-landing-packshot-industriel-xl.avif',
  '/images/hero/hero-landing-packshot-industriel.avif',
  '/images/hero/hero-landing-packshot-e-commerce-sm.avif',
  '/images/hero/hero-landing-packshot-e-commerce-md.avif',
  '/images/hero/hero-landing-packshot-e-commerce-lg.avif',
  '/images/hero/hero-landing-packshot-e-commerce-xl.avif',
  '/images/hero/hero-landing-packshot-e-commerce.avif',
  '/images/hero/hero-landing-packshot-mode-sm.avif',
  '/images/hero/hero-landing-packshot-mode-md.avif',
  '/images/hero/hero-landing-packshot-mode-xl.avif',
  '/images/hero/hero-landing-packshot-mode.avif',
]);

function shouldReturn410(path) {
  // 1. Exact match
  if (GONE_PATHS.has(path)) return true;
  // 2. Pattern: suffix -mod or contains -old-
  if (path.endsWith('-mod') || path.includes('-old-')) return true;
  // 3. Prefix: /ftp/ /resources/ /pages/ /commun/
  if (path.startsWith('/ftp/') || path.startsWith('/resources/') || path.startsWith('/pages/') || path.startsWith('/commun/')) return true;
  // 4. Double lang prefix /en/en/
  if (path.startsWith('/en/en/')) return true;
  // 5. Trailing /amp or /amp/ sur des paths supprimés
  if (path.endsWith('/amp') || path.endsWith('/amp/')) {
    const base = path.replace(/\/amp\/?$/, '');
    if (GONE_PATHS.has(base)) return true;
  }
  // 6. Query strings sur des paths supprimés (ignorer les params)
  const pathWithoutQuery = path.split('?')[0];
  if (pathWithoutQuery !== path && GONE_PATHS.has(pathWithoutQuery)) return true;
  // 7. Trailing slash variant
  const pathNoSlash = path.endsWith('/') ? path.slice(0, -1) : path;
  if (pathNoSlash !== path && GONE_PATHS.has(pathNoSlash)) return true;
  // 8. /industry/*/examples-* /industry/*/ejemplos-* /industry/*/beispiele-* (galeries mortes)
  if (path.startsWith('/industry/') && /\/(examples?|ejemplos|beispiele)-/.test(path)) return true;
  return false;
}

function isWebflowContent(pathname) {
  // Phase 3 finalisée (2026-05-02) : 100% du périmètre blog+guides servi par Next.js.
  // Tout slug inconnu sous /(fr|en)/blog/* ou /(fr|en)/guide/* est traité par Next.js
  // (qui sert une 404 avec la charte 2026, plutôt qu'une 404 Webflow ancienne charte).
  return false;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Non-www → www (301) pour éviter contenu dupliqué
    if (url.hostname === 'packshot-creator.com') {
      const wwwUrl = new URL(url);
      wwwUrl.hostname = 'www.packshot-creator.com';
      return Response.redirect(wwwUrl.toString(), 301);
    }

    // Racine → détection langue via Accept-Language (/fr si francophone, /en sinon)
    // Logique : seuls les francophones explicites ont /fr ; tout le reste (en, de, es, nl, bot, etc.) → /en
    if (pathname === '/') {
      const acceptLang = request.headers.get('Accept-Language') || '';
      const firstLang = acceptLang.split(',')[0].trim().toLowerCase();
      const target = firstLang.startsWith('fr') ? '/fr' : '/en';
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `${url.origin}${target}`,
          'Cache-Control': 'no-cache',
          'Vary': 'Accept-Language',
        },
      });
    }

    // ============================================================
    // Anciennes URLs FR sans préfixe /fr/ → redirection 301
    // (dans le Worker car next.config.ts ne les voit jamais —
    //  le Worker route vers Webflow avant)
    // ============================================================
    const LEGACY_REDIRECTS = {
      '/contact': '/fr/contact',
      '/a-propos': '/fr/a-propos',
      '/mentions-legales': '/fr/mentions-legales',
      '/confidentialite': '/fr/confidentialite',
      '/cgu': '/fr/cgu',
      '/ia-photo-produit': '/fr/ia-photo-produit',
      '/studios-photo-automatises': '/fr/studios-photo-automatises',
      '/e-commerce': '/fr/blog',
      '/industrie': '/fr/industrie',
      '/studio-photo': '/fr/studios-photo-automatises',
      '/blendai': '/fr/ia-photo-produit',
      '/logiciel': '/fr/ia-photo-produit',
      '/formation': '/fr/academy',
      '/formations': '/fr/academy',
      '/produits': '/fr/studios-photo-automatises',
      '/gestion-workflow-shotflow': '/fr/ia-photo-produit',
      '/ancien-studio-photo': '/fr/studios-photo-automatises',
      '/packshot-secteur-chaussures': '/fr/industrie/chaussures',
      '/packshot-secteur-bijouterie': '/fr/industrie/bijoux-joaillerie',
      '/packshot-secteur-meuble': '/fr/industrie/mobilier-decoration',
      '/packshot-secteur-mode-accessoires': '/fr/industrie/mode-textile',
      '/packshot-secteur-pieces-techniques': '/fr/industrie/pieces-techniques-industrie',
      '/packshot-secteur-e-commerce': '/fr/blog',

      // AJOUT 2026-04-14 — Chaînes raccourcies — 23 entrées
      // Court-circuitent les redirections intermédiaires Webflow (économise 1-2 hops)
      '/configurateur-produit': '/fr/ia-photo-produit',
      '/logiciels-packshotcreator': '/fr/studios-photo-automatises',
      '/toutes-les-gammes-studios-photo-packshotcreator': '/fr/studios-photo-automatises',
      '/comparateur-packshot-studios-photo-produits': '/fr/studios-photo-automatises',
      '/presentation-societe-corporate': '/fr/contact',
      '/fonctionnalite-ombre-portee': '/fr',
      '/industry/wine-spirits': '/en/industrie/vin-spiritueux',
      '/industry/packaging': '/en/industrie',
      '/jewelry-photo-studios': '/en/studio-photo/alphashot-micro-v2',
      '/small-items-macrophotography-studio': '/en/studio-photo/alphashot-micro-v2',
      '/bottle-product-photography-testimonial': '/en/industrie/vin-spiritueux',
      '/how-to-e-commerce-product-photography': '/en/studios-photo-automatises',
      '/amp': '/fr/blog',

      // AJOUT 2026-04-16 — Pages EN avec slugs FR (Webflow réutilisait les mêmes slugs) — 5 entrées
      '/en/automatiser': '/en/studios-photo-automatises',
      '/en/createur-des-studios-photos-connectes': '/en/a-propos',
      '/en/disclaimer-copy': '/en/mentions-legales',
      '/en/produits': '/en/studio-photo/selecteur-machines',
      '/en/solutions': '/en/studios-photo-automatises',

      // AJOUT 2026-04-20 — Slugs FR sous /en/guide/ → équivalent EN (via alternates.json)
      '/en/guide/comment-faire-photos-multi-angles-chaussures': '/en/guide/how-to-take-multi-angle-photos-of-shoes',
      '/en/guide/comment-obtenir-fond-blanc-parfait-sans-detourage-produit': '/en/guide/how-to-get-a-perfect-white-background-without-product-cutout',
      '/en/guide/visuels-collection-produits-homogenes': '/en/guide/consistent-product-image-collection',

      // AJOUT 2026-04-14 — Guides EN sans préfixe /en/ — 3 entrées
      '/guide/what-settings-to-photograph-jewelry': '/en/guide/what-settings-to-photograph-jewelry',
      '/guide/how-to-position-watch-before-shooting-photo': '/en/guide/how-to-position-watch-before-shooting-photo',
      '/guide/which-equipment-to-choose-for-jewelry-photo': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
    };

    // Vérifier les redirections exactes
    if (LEGACY_REDIRECTS[pathname]) {
      return Response.redirect(`${url.origin}${LEGACY_REDIRECTS[pathname]}`, 301);
    }

    // Redirections index uniquement (les /blog/:slug et /guide/:slug restent sur Webflow)
    if (pathname === '/blog') {
      return Response.redirect(`${url.origin}/fr/blog`, 301);
    }
    if (pathname === '/guide') {
      return Response.redirect(`${url.origin}/fr/guide`, 301);
    }
    if (pathname === '/academy') {
      return Response.redirect(`${url.origin}/fr/academy`, 301);
    }
    // /blog/:slug et /guide/:slug → PAS de redirect, servis par Webflow (contenu legacy encore live)
    // /academy/:path → PAS de redirect, servi par Webflow (slugs différents entre Webflow et Next.js)
    if (pathname.startsWith('/industrie/')) {
      return Response.redirect(`${url.origin}/fr${pathname}`, 301);
    }
    if (pathname.startsWith('/packshot-packshotcreator')) {
      return Response.redirect(`${url.origin}/fr`, 301);
    }
    if (pathname.startsWith('/studio-photo/')) {
      return Response.redirect(`${url.origin}/fr${pathname}`, 301);
    }
    if (pathname.startsWith('/accessoires')) {
      return Response.redirect(`${url.origin}/fr/studios-photo-automatises`, 301);
    }

    // AJOUT 2026-04-14 — /secteur/*/exemples-* → 410 (pages supprimées, AVANT le handler /secteur/*)
    if (pathname.startsWith('/secteur/') && pathname.includes('/exemples-')) {
      return new Response(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Gone | PackshotCreator</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="5;url=${url.origin}/fr"></head><body><p>This page has been permanently removed.</p><p>Redirecting to <a href="${url.origin}/fr">packshot-creator.com</a>\u2026</p></body></html>`,
        {
          status: 410,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=86400',
            'X-Robots-Tag': 'noindex, nofollow',
          },
        }
      );
    }

    // AJOUT 2026-04-14 — Handler /secteur/* → /fr/industrie/* (court-circuite Webflow)
    // Avant : /secteur/bijoux → Webflow 301 /industrie/bijoux → Worker 301 /fr/industrie/bijoux
    // Après : /secteur/bijoux → Worker 301 /fr/industrie/bijoux (1 hop au lieu de 2)
    if (pathname.startsWith('/secteur/')) {
      const slug = pathname.replace(/^\/secteur\//, '').replace(/\/$/, '');
      return Response.redirect(`${url.origin}/fr/industrie/${slug}`, 301);
    }

    // AJOUT 2026-04-14 — Handler /produit/* → /fr/studio-photo/* (court-circuite Webflow)
    const PRODUIT_REDIRECTS = {
      '/produit/bike-studio': '/en/studio-photo/bike-studio',
      '/produit/e-comm-studio': '/fr/studio-photo/e-comm-studio',
      '/produit/fashion-studio': '/fr/studio-photo/fashion-studio',
      '/produit/studio-photo-bijoux-gemmes': '/fr/studio-photo/alphashot-micro',
    };
    if (PRODUIT_REDIRECTS[pathname]) {
      return Response.redirect(`${url.origin}${PRODUIT_REDIRECTS[pathname]}`, 301);
    }

    // AJOUT 2026-04-14 — Handler /product/* → /en/studio-photo/* (court-circuite Webflow)
    const PRODUCT_REDIRECTS = {
      '/product/bike-studio': '/en/studio-photo/bike-studio',
      '/product/e-comm-studio': '/en/studio-photo/e-comm-studio-plus',
      '/product/fashion-studio': '/en/studio-photo/fashion-studio',
      '/product/packshotmacro-dl-gemstones': '/en/studio-photo/alphashot-micro-v2',
      '/product/photo-studio-r3': '/en/studio-photo/alphashot-xl-v2',
      // AJOUT 2026-04-16 — 6 anciennes fiches produit EN
      '/product/360-photo-studio-diamonds-gemstones': '/en/studio-photo/alphashot-micro-v2',
      '/product/livestudio-fotos-automatizada': '/en/studios-photo-automatises',
      '/product/livestudio-renews-image-capturing/caracteristiques-livestudio': '/en/studios-photo-automatises',
      '/product/packshot-rotating-plate/caracteristiques-packshotspin-series': '/en/studios-photo-automatises',
      '/product/packshotspin-jewelry': '/en/studio-photo/alphashot-micro-v2',
      '/product/packshotstudio-modular-lighting': '/en/studios-photo-automatises',
    };
    const productPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    if (PRODUCT_REDIRECTS[productPath]) {
      return Response.redirect(`${url.origin}${PRODUCT_REDIRECTS[productPath]}`, 301);
    }

    // AJOUT 2026-04-14 — Handler /how-to/* → destinations finales (court-circuite Webflow + catch-all DE/ES/NL)
    // Avant : /how-to/X → Webflow 301 /de/guide/Y → Worker 301 /en → 3 hops inutiles
    // Après : /how-to/X → Worker 301 destination finale
    const HOWTO_REDIRECTS = {
      // → guides EN spécifiques
      '/how-to/einstellungen-foto-schmuck': '/en/guide/what-settings-to-photograph-jewelry',
      '/how-to/equipamiento-foto-joyeria': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/how-to/fotografiar-gafas-tienda-online': '/en/guide/how-to-photograph-glasses-for-e-commerce',
      '/how-to/objektive-foto-schmuck': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/how-to/posicionar-reloj-antes-fotografiarlo': '/en/guide/how-to-position-watch-before-shooting-photo',
      '/how-to/que-objetivos-fotos-joyas': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/how-to/welke-fotolenzen-gebruiken-sieraden': '/en/guide/what-settings-to-photograph-jewelry',
      '/how-to/ausrustung-schmuckfotografie-studio': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/how-to/camera-instellingen-sieraden-fotos': '/en/guide/what-settings-to-photograph-jewelry',
      '/how-to/360-diamond-sparkle-view': '/en/studio-photo/alphashot-micro-v2',
      '/how-to/turntable-360-jewels': '/en/studios-photo-automatises',
      // → guides FR
      '/how-to/fabriquer-plateau-tournant-360-bijoux': '/fr/studio-photo/alphashot-micro',
      '/how-to/photographie-360-colliers-suspendus': '/fr/studio-photo/alphashot-micro',
      '/how-to/equipments-photo-360-bijoux': '/fr/guide/quel-equipement-choisir-pour-photo-bijoux',
      '/how-to/equipments-photo-bijoux-studio': '/fr/guide/quel-equipement-choisir-pour-photo-bijoux',
      '/how-to/objectifs-photos-bijoux': '/fr/guide/quel-equipement-choisir-pour-photo-bijoux',
      '/how-to/reglages-photo-bijoux': '/fr/guide/quels-reglages-pour-photographier-bijoux',
      '/how-to/focus-stacking-bijoux': '/fr/guide/comment-faire-focus-stacking-pour-photographier-bracelet',
      '/how-to/photographier-lunettes-ecommerce': '/fr/guide/comment-photographier-lunettes-e-commerce',
      '/how-to/photos-multi-angles-chaussures': '/fr/guide/comment-faire-photos-multi-angles-chaussures',
      '/how-to/comment-nettoyer-montre': '/fr/guide/comment-nettoyer-montre-avant-shooting',
      '/how-to/comment-positionner-une-montre': '/fr/guide/comment-positionner-montre-avant-shooting-photo',
      '/how-to/positionner-bijoux-photographie': '/fr/guide/comment-prendre-photo-nette-bijoux-sans-fond',
      // → /en catch-all (langues mortes sans équivalent EN spécifique)
      '/how-to/brillen-onlinehandel-fotografieren': '/en',
      '/how-to/conversion-color-producto': '/en',
      '/how-to/fokus-stapelung-handbuch-photoshop': '/en',
      '/how-to/foto-sieraden-studio-apparatuur': '/en',
      '/how-to/positioniert-schmuck-fotografie': '/en',
      '/how-to/tutorial-fotograf-uhr': '/en',
      '/how-to/video-360-zapatos': '/en',
      '/how-to/camara-fotografiar-joyas': '/en',
      // AJOUT 2026-04-16 — 1 how-to EN
      '/how-to/how-to-photograph-eyewear': '/en/guide/comment-photographier-lunettes-e-commerce',
    };
    const howtoPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    if (HOWTO_REDIRECTS[howtoPath]) {
      return Response.redirect(`${url.origin}${HOWTO_REDIRECTS[howtoPath]}`, 301);
    }

    // AJOUT 2026-04-16 — Blog EN sans préfixe → /en/blog/slug (articles vivants sur Webflow EN)
    // Intercepte AVANT le proxy Webflow pour rediriger proprement
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.slice(6).replace(/\/$/, '');
      if (BLOG_EN_REDIRECTS.has(slug)) {
        return Response.redirect(`${url.origin}/en/blog/${slug}`, 301);
      }
    }

    // AJOUT 2026-04-16 — Guides EN sans préfixe → /en/guide/slug
    if (pathname.startsWith('/guide/')) {
      const slug = pathname.slice(7).replace(/\/$/, '');
      if (GUIDE_EN_REDIRECTS.has(slug)) {
        return Response.redirect(`${url.origin}/en/guide/${slug}`, 301);
      }
    }

    // AJOUT 2026-04-16 — /industry/*/examples-* → 410 (galeries mortes, AVANT le catch-all)
    if (pathname.startsWith('/industry/') && /\/(examples?|ejemplos|beispiele)-/.test(pathname)) {
      return new Response(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Gone | PackshotCreator</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="5;url=${url.origin}/fr"></head><body><p>This page has been permanently removed.</p><p>Redirecting to <a href="${url.origin}/fr">packshot-creator.com</a>\u2026</p></body></html>`,
        {
          status: 410,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=86400',
            'X-Robots-Tag': 'noindex, nofollow',
          },
        }
      );
    }

    // AJOUT 2026-04-16 — /industry/* → /en/industrie (catch-all, court-circuite Webflow)
    if (pathname.startsWith('/industry/') || pathname === '/industry') {
      return Response.redirect(`${url.origin}/en/industrie`, 301);
    }

    // DE/ES/NL → /en (301) — ces langues ne sont plus maintenues
    // Redirections spécifiques pour les pages à fort trafic GSC
    const LANG_SPECIFIC_REDIRECTS = {
      '/es/blog/como-elige-mejor-objectivo-foto-paquete': '/en/blog/how-to-choose-best-lens-for-product-photography',
      '/es/blog/aprender-fotografia-joyas-ecommerce': '/en/blog/technique-photograph-jewelry-tutorial',
      '/es/blog/8-pasos-para-fotografiar-joyas-profesionalmente': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/es/guide/que-equipo-elegir-para-foto-joyas': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/es/guide/que-ajustes-para-fotografiar-joyas': '/en/guide/what-settings-to-photograph-jewelry',
      '/es/guide/como-fotografiar-gafas-para-e-commerce': '/en/guide/how-to-photograph-glasses-for-e-commerce',
      '/es/guide/como-posicionar-reloj-para-fotos-producto': '/en/guide/how-to-position-watch-before-shooting-photo',
      '/es/guide/crear-animacion-360-profesional-de-zapatos': '/en/guide/create-professional-360-animation-of-shoes',
      '/es/guide/como-hacer-video-zapatos': '/en/guide/how-to-make-shoe-video',
      '/de/blog/welches-bildformat-ist-das-beste-fur-das-web': '/en/blog/best-image-format-for-the-web',
      '/de/blog/8-schritte-zur-professionellen-schmuckfotografie': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/de/guide/wie-man-schuhvideo-macht': '/en/guide/how-to-make-shoe-video',
      '/de/guide/welche-einstellungen-zum-fotografieren-von-schmuck': '/en/guide/what-settings-to-photograph-jewelry',
      '/de/fotostudio/alphashot-g2': '/en/studio-photo/alphashot-g2',
      '/nl/blog/8-stappen-voor-professionele-sieradenfotografie': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/nl/guide/welke-instellingen-om-sieraden-te-fotograferen': '/en/guide/what-settings-to-photograph-jewelry',
    };

    if (/^\/(de|es|nl)(\/|$)/.test(pathname)) {
      const target = LANG_SPECIFIC_REDIRECTS[pathname] || '/en';
      return Response.redirect(`${url.origin}${target}`, 301);
    }

    // ============================================================
    // 410 Gone — Pages définitivement supprimées (pré-Webflow + legacy)
    // Interceptées AVANT le proxy Webflow pour éviter des 404 soft
    // ============================================================
    if (shouldReturn410(pathname)) {
      return new Response(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Gone | PackshotCreator</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="5;url=${url.origin}/fr"></head><body><p>This page has been permanently removed.</p><p>Redirecting to <a href="${url.origin}/fr">packshot-creator.com</a>\u2026</p></body></html>`,
        {
          status: 410,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=86400',
            'X-Robots-Tag': 'noindex, nofollow',
          },
        }
      );
    }

    // Blog/guide avec slug Webflow → forcer vers Webflow (évite 500 Next.js)
    const forceWebflow = isWebflowContent(pathname);
    const isNextJS = !forceWebflow && NEXTJS_PATTERNS.some((p) => p.test(pathname));
    const origin = isNextJS ? env.NEXTJS_ORIGIN : env.WEBFLOW_ORIGIN;

    const targetUrl = new URL(pathname + url.search, origin);

    const headers = new Headers(request.headers);
    // Garder le Host original (www.packshot-creator.com) pour que Vercel
    // reconnaisse le domaine configuré dans le projet

    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual',
    });

    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });

    newResponse.headers.set('X-Served-By', isNextJS ? 'nextjs' : 'webflow');

    return newResponse;
  },
};
