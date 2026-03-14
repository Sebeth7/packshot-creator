addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // === PROXY NEXT.JS : Routes migrées vers Vercel ===
  const NEXTJS_ORIGIN = 'https://packshot-creator.vercel.app'
  const MIGRATED_ROUTES = ['/calculateur-roi']
  
  const isNextAsset = pathname.startsWith('/_next/')
  const isMigrated = isNextAsset || MIGRATED_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )
  
  if (isMigrated) {
    const targetUrl = new URL(pathname + url.search, NEXTJS_ORIGIN)
    const proxyResponse = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
    const newResponse = new Response(proxyResponse.body, proxyResponse)
    newResponse.headers.set('X-Served-By', 'nextjs')
    return newResponse
  }
  // === FIN PROXY NEXT.JS ===
  
  // Configuration des chemins 410 - Structure optimisée
  // Patterns globaux pour tous les chemins
  const globalPatterns = [
    path => path.endsWith('-mod'),
    path => path.includes('-old-')
  ]
  
  // Chemins communs à toutes les langues (de, en, es, nl)
  const commonMultiLangPaths = new Set([
    'packshot-secteur-bijouterie',
    'packshot-secteur-chaussures', 
    'packshot-secteur-e-commerce',
    'packshot-secteur-meuble',
    'packshot-secteur-mode-accessoires',
    'packshot-secteur-pieces-techniques',
    'packshot-automatise-PackshotCreator',
    'packshot-packshotcreator',
    'packshot-packshotcreator/packshot-amazon',
    'packshot-packshotcreator/packshot-bijoux',
    'packshot-packshotcreator/packshot-e-commerce',
    'packshot-packshotcreator/packshot-fashion',
    'packshot-packshotcreator/packshot-fond-blanc',
    'packshot-packshotcreator/packshot-grands-produits',
    'packshot-packshotcreator/packshot-horlogerie',
    'packshot-packshotcreator/packshot-industriel',
    'packshot-packshotcreator/packshot-lille',
    'packshot-packshotcreator/packshot-luxe',
    'packshot-packshotcreator/packshot-lyon',
    'packshot-packshotcreator/packshot-mannequin',
    'packshot-packshotcreator/packshot-mode',
    'packshot-packshotcreator/packshot-orbitvu',
    'packshot-packshotcreator/packshot-petits-produits',
    'packshot-packshotcreator/packshot-photo-produit',
    'packshot-packshotcreator/packshot-photographe',
    'packshot-packshotcreator/packshot-pret-a-porter',
    'packshot-packshotcreator/packshot-produit',
    'packshot-packshotcreator/packshot-video',
    'p4ck5h0t2025cr34t0r38xyzq7lm9pv6k8dr2jt5'
  ])
  
  // Chemins spécifiques par langue
  const specificPaths = {
    de: new Set([
      'ads-chaussures', 'besoins', 'es', 'questions-cles', 'time-lapse-software-feature/',
      'blog/11-jahre-produktfotografie', 'blog/3d-objektmodelle-entlasten-kommunikation',
      'blog/5-goldene-regeln-fur-visuelle-interaktion', 'blog/bilder-fur-eine-bessere-referenzierung-ihres-e-commerce',
      'blog/comment-automatiser-la-creation-de-vos-photographies-animations-de-produits',
      'blog/die-bedeutung-grafiken-e-commerce-website', 'blog/die-logistische-organisation-ihres-firmeninternen-fotostudios',
      'blog/e-commerce-4-grunde-warum-es-unabdingbar-ist-seine-bilder-selbst-zu-produzieren',
      'blog/e-commerce-4-millionen-internetnutzer-hunderten', 'blog/e-commerce-webinar-steigern-konversionsrate-362-producktbildern',
      'blog/ein-zweites-leben-produkte-fotos-pinterest', 'blog/grundregeln-und-neuste-trends-fur-produktbilder-in-den-social-media',
      'blog/html-360-animationen-schussel-erfold-website', 'blog/internes-fotostudio-3-methoden-organisation',
      'blog/ist-sinnvoll-deine-fotoproduktion-verinnerlichen', 'blog/kannst-ohne-gute-kameraausrustung-gute-machen',
      'blog/lupe-gut-progressive-zoom-besser', 'blog/luxus-herrenschuhe-eleganz-online',
      'blog/makrofotografie-ausrustung-gegenstande', 'blog/neuheiten-2018-fotos-onlinehandel',
      'blog/nutze-fotostudio-virtuelle-realitat-2', 'blog/photographie-de-produits-comment-presenter-vos-vetements',
      'blog/produktfoto-beleuchtung', 'blog/produktfotografie-spiegelungen-transparenzen-umgehen',
      'blog/ratgeber-bildmaterial-onlinehandel-2018', 'blog/ruckkehr-awe-show',
      'blog/selbstgebautes-fotostudio-produkt-fotografie', 'blog/steigern-konversionsrate-4-fehler',
      'blog/webinare-noch-einmal', 'blog/wenn-hauseigene-fotostudio-skaleneffekte-reimt',
      'blog/whitepaper-fur-e-commerce', 'blog/wie-ermoglichen-besuchern-produkte-meheren-persepektiven',
      'blog/wie-fotografiere-objekte-deinen-e-commerce', 'blog/wie-konnen-wein-besser-china-exportieren-e-commerce-visuals',
      'blog/wie-mache-fotos-deinem-schmuck-deinen-kreationen', 'industrie/bouteilles',
      'blog/como-tener-mejores-fotos-impulsar-ventas-amazon',
      'branchen/estudio-fotograficos-belleza',
      'branchen/estudio-fotograficos-joyas',
      'branchen/fotografia-producto-tecnicos',
      'branchen/fotos-culinarias-estudios-packshot',
      'branchen/moda'
    ]),
        
    en: new Set([
      'besoins', 'es',
      'blog/11-years-service-product-photography', 'blog/3d-object-relief-communication',
      'blog/4-reasons-producing-ecommerce-visuals', 'blog/avantages-toplight-photographie-produits',
      'blog/boost-your-conversion-rate-with-product-visuals-4-mistakes-to-avoid',
      'blog/comment-automatiser-la-creation-de-vos-photographies-animations-de-produits',
      'blog/comparatif-de-solutions-de-photographie-automatisee', 'blog/e-commerce-8-elements-success-copy',
      'blog/e-commerce-million-users-seduce', 'blog/e-commerce-tips-reduce-bounce-rate',
      'blog/expert-tips-product-photography', 'blog/how-better-export-wine-china-role-e-commerce',
      'blog/how-visitors-see-products-multiple-perspectives', 'blog/htlm5-360-animations-keys-success-e-commerce',
      'blog/importance-visuals-e-commerce-website', 'blog/instagram-pinterest-which-your-e-commerce',
      'blog/luxury-shoes-elegance-online', 'blog/magnifying-glass-good-zoom-better',
      'blog/news-e-commerce-photos', 'blog/optimize-budget-management-photo-studio',
      'blog/packshotcreator-white-book-e-commerce', 'blog/photograph-small-objetcs-e-commerce',
      'blog/photographing-ring-8-steps', 'blog/product-photo-guide',
      'blog/product-photography-reflections-transparency', 'blog/second-life-products-pinterest-e-commerce',
      'blog/use-photo-studio-virtual-reality-2', 'blog/visuals-in-house-saves-time-budget',
      'en/creator-connected-photo-studios', 'en/needs-product-photography',
      'how-to-e-commerce-product-photography/', 'industrie/bijoux', 'industrie/bouteilles',
      'industrie/high-tech-electromenager-informatique', 'industrie/meubles',
      'studio-photo/orbitvu-kit-mini-midi'
    ]),
    
    es: new Set([
      'ads-chaussures', 'ads-generaliste', 'es/productos', 'produkte', 'questions-cles',
      'blog/360-photos-marketplaces', 'blog/4-milones-usarios-seducir-con-fotos-productos',
      'blog/aumente-tasa-de-conversion-imagenes-productos-4-errores-evitar',
      'blog/comercio-electronico-5-consejos-reducir-rebote', 'blog/comment-ia-revolutionne-production-visuelle',
      'blog/como-exportar-mejor-vino-china-desempenan-comercio-electronico',
      'blog/como-permites-visitantes-vean-productos-multiples-perspectivas',
      'blog/comparacion-soluciones-foto-automatizadas', 'blog/configura-estudio-foto-domestico-foto-productos',
      'blog/consejos-expertos-fotografia-producto-eficaz', 'blog/descubra-historia-fracaso-comercio-electronico',
      'blog/ecommerce-como-fotografiar-joyas', 'blog/es-util-internalizar-produccion-fotografica',
      'blog/estudio-fotografico-interno-3-praticas-organizarlo', 'blog/estudio-interno-economias-escala',
      'blog/evolucion-comercio-electronico-invertir-nuevos-estudios', 'blog/evolucion-e-commerce-packshot',
      'blog/evolution-e-commerce-packshot', 'blog/fotografiar-anillo-profesional-8-pasos',
      'blog/fotografia-producto-presentas-ropa-plana', 'blog/fotografia-producto-reflejos-transparencia',
      'blog/guia-3-destacar-productos', 'blog/iluminacion-fotos-productos',
      'blog/importancia-imagenes-para-sitio-comercio-electronico',
      'blog/instagram-pinterest-cual-fotografias-comercio-electronico',
      'blog/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e-commerce',
      'blog/leyes-atraccion-visual-ecommerce', 'blog/lupa-buena-zoom-progresivo-mejor',
      'blog/modelos-3d-alivie-su-comunicacion', 'blog/optimiza-gestion-prepuesto-estudio-fotografico-interno',
      'blog/packshotcreator-el-libro-blanco', 'blog/puedes-hacer-buenas-imagenes-sin-buen-camara',
      'blog/que-formato-para-wweb', 'blog/retorno-inversion-estudio-foto-interno',
      'blog/ultimas-tendencias-fotos-productos', 'blog/una-segunda-vida-para-productos-fotos-de-comercio-pinterest',
      'blog/vuelve-show-awe', 'blog/zapatos-hombre-lujo-elegancia-online',
      'fotostudio/alphastudio-xxl', 'fotostudio/alphatable', 'industrie/bijoux',
      'industrie/bouteilles', 'industrie/estudio-foto-productos-deporte',
      'photo-studio/360-turntables', 'photo-studio/alphashot-micro', 'sector/eyewear'
    ]),
    
    nl: new Set([
      'ads-chaussures', 'ads-generaliste', 'es', 'produkte', 'disclaimer-copy',
      'blog/360-photos-marketplaces', 'blog/3d-verlichting-uw-communicatie',
      'blog/4-miljoen-internetgebruikers-verleiden-honderden-productfotos',
      'blog/codes-nieuwste-trends-productbeelden-sociale-netwerken',
      'blog/comment-automatiser-la-creation-de-vos-photographies-animations-de-produits',
      'blog/e-commerce-8-essentiele-elementen-succes', 'blog/e-commerce-hoe-fotos-sieraden-creaties-studio',
      'blog/e-commerce-tips-bouncerpercentage', 'blog/eclairage-photos-produits',
      'blog/evolution-e-commerce-packshot', 'blog/fotostudio-rijmt-schaamvoorden',
      'blog/gebruik-fotostudio-virtual-reality-2', 'blog/he-ervoor-bezoekers-producten-meerdere-perspectieven-kunnen',
      'blog/hoe-fotografeer-kleine-objecten-e-commerce', 'blog/hoe-kun-wijn-exporteren-china',
      'blog/html-animaties-sleutels-succes-e-commercesites', 'blog/instagram-pinterest-welke-e-commercefotos',
      'blog/interne-fotostudio-3-praktische-tips', 'blog/is-nuttig-uw-packshot-fotoproductie-internaliseren',
      'blog/kun-goede-beelden-maken-camera-apparatuur', 'blog/luxe-herenschoenen-elegantie-online',
      'blog/produceren-beeldmateriaal-reactiviteit', 'blog/productfoto-e-commerce-gids',
      'blog/productfotografie-hoe-presenteer-kleding-plat', 'blog/productfotografie-reflecties-transparantie-beheren',
      'blog/ring-fotograferen-professional-8-stappen', 'blog/tips-experts-effectieve-productfotografie',
      'blog/vergelijking-geautomatiseerde-fotografieoplossingen', 'blog/vergrootglas-goed-progressieve-zoom-beter',
      'blog/verhoog-conversiepercentage-productafbeeldingen', 'blog/whitepaper-packshotcreator-voor-e-commerceprofessionals',
      'blog/wizishop-lanceert-nieuwe-versie-tool', 'blog/zelfgemaakte-fotostudio-productfotografie',
      'industrie/bouteilles', 'industrie/meubles', 'studio-photo/orbitvu-kit-mini-midi'
    ])
  }
  
  // Guides communs (structure similaire entre langues)
  const commonGuidePatterns = new Set([
    'guide/comment-creer-animation-360-avec-assistant-ia-orbitvu',
    'guide/comment-creer-video-360-objet-art',
    'guide/comment-creer-vues-multi-angles-automatique-objet',
    'guide/comment-faire-photos-multi-angles-chaussures',
    'guide/comment-faire-video-chaussures',
    'guide/comment-nettoyer-montre-avant-shooting',
    'guide/modifier-couleur-produit-photo',
    'guide/quel-equipement-choisir-pour-photo-bijoux'
  ])
  
  // Fonction pour vérifier les chemins ads-generaliste (excluant les chemins racines exacts)
  function isAdsGeneralisteSubpath(path) {
    const adsGeneralisteRoots = ['/de/ads-generaliste', '/en/ads-generaliste', '/es/ads-generaliste', '/nl/ads-generaliste']
    
    if (adsGeneralisteRoots.includes(path)) {
      return false
    }
    
    return adsGeneralisteRoots.some(root => path.startsWith(root + '/'))
  }
  
  // Fonction principale de vérification 410
  function shouldReturn410(path) {
    // 1. Vérifier les patterns globaux
    if (globalPatterns.some(pattern => pattern(path))) {
      return true
    }
    
    // 2. Vérifier les sous-chemins ads-generaliste
    if (isAdsGeneralisteSubpath(path)) {
      return true
    }
    
    // 3. Analyser les chemins avec préfixe de langue
    const langMatch = path.match(/^\/(de|en|es|nl)\/(.+)$/)
    if (langMatch) {
      const [, lang, pathPart] = langMatch
      
      // Vérifier les chemins communs multi-langues
      if (commonMultiLangPaths.has(pathPart)) {
        return true
      }
      
      // Vérifier les guides communs
      if (commonGuidePatterns.has(pathPart)) {
        return true
      }
      
      // Vérifier les chemins spécifiques à cette langue
      if (specificPaths[lang] && specificPaths[lang].has(pathPart)) {
        return true
      }
    }
    
    return false
  }
  
  // Vérifier si le chemin doit retourner 410
  if (shouldReturn410(pathname)) {
    const redirectUrl = 'https://www.packshot-creator.com'
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Moved | PackshotCreator</title>
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="refresh" content="5;url=${redirectUrl}">
</head>
<body>
    <p><strong>📸 Ready for the next step in product photography?</strong></p>
    <p>To enhance your experience on <a href="${redirectUrl}">www.packshot-creator.com</a>, this page has been removed.</p>
    <p>✨ You'll be redirected to our latest studios in <span id="countdown">5</span> seconds…</p>
    <p><a href="${redirectUrl}">Go now</a> | <a href="#" onclick="cancelRedirect(); return false;">Stay here</a></p>
    
    <script>
        let timeLeft = 5;
        let redirectCanceled = false;
        
        function updateCountdown() {
            if (redirectCanceled) return;
            
            document.getElementById('countdown').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                window.location.href = '${redirectUrl}';
                return;
            }
            
            timeLeft--;
            setTimeout(updateCountdown, 1000);
        }
        
        function cancelRedirect() {
            redirectCanceled = true;
            document.getElementById('countdown').textContent = '∞';
        }
        
        updateCountdown();
    </script>
</body>
</html>`
    
    return new Response(html, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=31536000',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    })
  }
  
  // Pour toutes les autres requêtes, continuer vers l'origine
  return fetch(request)
}