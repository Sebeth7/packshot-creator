import type { Machine, ProductSizeCategory } from './types';

/**
 * Base de données des machines Orbitvu
 * Source de vérité : Analyse Gemini des brochures + recherches complémentaires
 * Maintenance annuelle = 0€ pour toutes les machines
 */
export const MACHINES: Machine[] = [
  // ============================================
  // PETITS PRODUITS (< 30cm)
  // ============================================
  {
    id: 'alphashot-micro-v2',
    nom: 'Alphashot Micro Pro v2',
    prix: 15450,
    capaciteJour: 200,
    tailleMax: '18×15×16 cm',
    poidsMax: '1 kg',
    tailleCategories: ['petit'],
    useCases: ['Bijoux', 'Montres', 'Pierres précieuses', 'Pièces de monnaie', 'Petits composants'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 18, w: 15, h: 16 },
    poidsMaxKg: 1,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['jewelry', 'cosmetics'],
    volumeRange: { min: 1000, max: 50000 },
    keyAdvantages: [
      { fr: 'Élimination automatique de l\'arrière-plan avec IQ Mask', en: 'Automatic background removal with IQ Mask' },
      { fr: 'Éclairage spécialisé pour faire briller les produits (bijoux/pierres)', en: 'Specialized lighting to make products shine (jewelry/gems)' },
      { fr: 'Macro et Super Focus pour les détails', en: 'Macro and Super Focus for details' },
    ],
    limitations: [
      { fr: 'Limité aux très petits objets (< 1kg)', en: 'Limited to very small objects (< 1kg)' },
    ],
    spaceRequired: 'Bureau',
    studioFootprint: { l: 83, w: 52, h: 72 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot Micro Pro v2 ?', en: 'What types of products can be photographed with the Alphashot Micro Pro v2?' },
        answer: { fr: 'L\'Alphashot Micro Pro v2 est concu pour les produits de tres petite taille jusqu\'a 18x15x16 cm et 1 kg : bijoux, montres, pierres precieuses, pieces de monnaie et petits composants. Grace a ses fonctions Macro et Super Focus, il capture les details les plus fins avec une precision remarquable. Il produit des packshots, des vues 360 et des videos en qualite professionnelle.', en: 'The Alphashot Micro Pro v2 is designed for very small products up to 18x15x16 cm and 1 kg: jewelry, watches, gemstones, coins and small components. Thanks to its Macro and Super Focus functions, it captures the finest details with remarkable precision. It produces packshots, 360 views and videos in professional quality.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot Micro Pro v2 ?', en: 'How much space is needed to install the Alphashot Micro Pro v2?' },
        answer: { fr: 'L\'Alphashot Micro Pro v2 se pose simplement sur un bureau. Son empreinte compacte de 83x52 cm et sa hauteur de 72 cm le rendent facile a integrer dans n\'importe quel espace de travail. Aucun amenagement special n\'est necessaire, un simple bureau solide suffit.', en: 'The Alphashot Micro Pro v2 simply sits on a desk. Its compact footprint of 83x52 cm and height of 72 cm make it easy to integrate into any workspace. No special setup is needed, a simple sturdy desk is sufficient.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot Micro Pro v2 ?', en: 'How does training on the Alphashot Micro Pro v2 work?' },
        answer: { fr: 'PackshotCreator propose une formation complete a la prise en main de l\'Alphashot Micro Pro v2. Notre organisme est certifie Qualiopi, ce qui signifie que la formation peut etre financee par votre OPCO. En general, une demi-journee suffit pour maitriser les fonctions principales grace a l\'automatisation complete de la machine.', en: 'PackshotCreator offers comprehensive training on the Alphashot Micro Pro v2. Our organization is Qualiopi certified, meaning training can be funded by your OPCO. Generally, half a day is sufficient to master the main functions thanks to the machine\'s full automation.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot Micro Pro v2 ?', en: 'What are the financing options for the Alphashot Micro Pro v2?' },
        answer: { fr: 'Plusieurs solutions de financement sont disponibles : leasing sur 36 ou 60 mois, location avec option d\'achat, ou acquisition directe. Avec une capacite de 200 produits par jour, le retour sur investissement est generalement atteint en quelques mois pour les entreprises ayant un flux regulier de petits produits a photographier.', en: 'Several financing solutions are available: leasing over 36 or 60 months, rental with purchase option, or direct acquisition. With a capacity of 200 products per day, the return on investment is generally reached within a few months for businesses with a regular flow of small products to photograph.' },
      },
    ],
    keyStats: [
      { value: '200', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne en mode automatise', en: 'Daily production capacity in automated mode' } },
      { value: '360\u00B0', label: { fr: 'rotation produit', en: 'product rotation' }, description: { fr: 'Vues 360 degres automatiques pour chaque produit', en: 'Automatic 360-degree views for each product' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Niveau d\'automatisation complet avec IQ Mask et Super Focus', en: 'Full automation level with IQ Mask and Super Focus' } },
    ],
  },
  {
    id: 'alphashot-360',
    nom: 'Alphashot 360',
    prix: 12450,
    capaciteJour: 200,
    tailleMax: '30×30×30 cm',
    poidsMax: '3 kg',
    tailleCategories: ['petit'],
    useCases: ['Lunettes', 'Petits appareils électroniques', 'Cosmétiques', 'Chaussures (petites)'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 30, w: 30, h: 30 },
    poidsMaxKg: 3,
    features: ['packshot', '360'],
    automationLevel: 'full-auto',
    idealSectors: ['cosmetics', 'electronics', 'general'],
    volumeRange: { min: 500, max: 15000 },
    keyAdvantages: [
      { fr: 'Photos web prêtes en quelques secondes', en: 'Web-ready photos in seconds' },
      { fr: 'Portes sur deux côtés pour accès facile', en: 'Doors on both sides for easy access' },
      { fr: 'Ajustement rapide de la position caméra', en: 'Quick camera position adjustment' },
    ],
    limitations: [
      { fr: 'Poids limité à 3kg, non adapté aux objets lourds', en: 'Weight limited to 3kg, not suitable for heavy objects' },
    ],
    spaceRequired: 'Bureau',
    studioFootprint: { l: 115, w: 69, h: 64 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot 360 ?', en: 'What types of products can be photographed with the Alphashot 360?' },
        answer: { fr: 'L\'Alphashot 360 est ideal pour les produits jusqu\'a 30x30x30 cm et 3 kg : lunettes, cosmetiques, petits appareils electroniques et chaussures de petite taille. Il excelle dans la creation de packshots et de vues 360 interactives prets pour le web en quelques secondes. Ses portes des deux cotes facilitent la mise en place rapide des produits.', en: 'The Alphashot 360 is ideal for products up to 30x30x30 cm and 3 kg: eyewear, cosmetics, small electronic devices and small shoes. It excels at creating packshots and interactive 360 views ready for the web in seconds. Its doors on both sides make quick product placement easy.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot 360 ?', en: 'How much space is needed to install the Alphashot 360?' },
        answer: { fr: 'L\'Alphashot 360 est un studio compact qui se pose sur un bureau standard. Avec des dimensions de 115x69 cm et une hauteur de 64 cm, il s\'integre facilement dans un espace de travail existant. C\'est la solution ideale pour demarrer la photo produit professionnelle sans amenagement particulier.', en: 'The Alphashot 360 is a compact studio that sits on a standard desk. With dimensions of 115x69 cm and a height of 64 cm, it easily fits into an existing workspace. It\'s the ideal solution to start professional product photography without any special setup.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot 360 ?', en: 'How does training on the Alphashot 360 work?' },
        answer: { fr: 'PackshotCreator fournit une formation sur site ou a distance pour l\'Alphashot 360. Notre certification Qualiopi permet le financement par votre OPCO. La machine etant entierement automatisee, la prise en main est rapide : comptez une demi-journee pour etre autonome sur les packshots et les vues 360.', en: 'PackshotCreator provides on-site or remote training for the Alphashot 360. Our Qualiopi certification allows funding through your OPCO. As the machine is fully automated, getting started is quick: expect half a day to become autonomous on packshots and 360 views.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot 360 ?', en: 'What are the financing options for the Alphashot 360?' },
        answer: { fr: 'L\'Alphashot 360 est notre solution d\'entree de gamme avec un excellent rapport qualite-prix. Le financement est possible en leasing, en location avec option d\'achat ou en acquisition directe. Avec 200 produits photographiables par jour, les entreprises constatent un retour sur investissement rapide par rapport a la sous-traitance photo.', en: 'The Alphashot 360 is our entry-level solution with excellent value for money. Financing is available through leasing, rental with purchase option or direct acquisition. With 200 products photographable per day, businesses see a fast return on investment compared to outsourced photography.' },
      },
    ],
    keyStats: [
      { value: '200', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne en automatique', en: 'Daily production capacity in automatic mode' } },
      { value: '360\u00B0', label: { fr: 'vues interactives', en: 'interactive views' }, description: { fr: 'Creation de vues 360 interactives pour le web', en: 'Creation of interactive 360 views for the web' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete de la prise de vue', en: 'Full automation of the shooting process' } },
    ],
  },
  {
    id: 'alphashot-g2',
    nom: 'Alphashot G2',
    prix: 15450,
    capaciteJour: 200,
    tailleMax: '30×30×30 cm',
    poidsMax: '3 kg',
    tailleCategories: ['petit'],
    useCases: ['Chaussures', 'Maroquinerie', 'Cosmétiques', 'Électronique'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 30, w: 30, h: 30 },
    poidsMaxKg: 3,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['footwear', 'bags', 'cosmetics', 'electronics'],
    volumeRange: { min: 1000, max: 20000 },
    keyAdvantages: [
      { fr: 'Nouvelle génération de l\'Alphashot 360', en: 'New generation of Alphashot 360' },
      { fr: 'Éclairage LED amélioré', en: 'Improved LED lighting' },
      { fr: 'Interface logicielle modernisée', en: 'Modernized software interface' },
    ],
    limitations: [
      { fr: 'Poids limité à 3kg', en: 'Weight limited to 3kg' },
    ],
    spaceRequired: 'Bureau',
    studioFootprint: { l: 115, w: 69, h: 64 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot G2 ?', en: 'What types of products can be photographed with the Alphashot G2?' },
        answer: { fr: 'L\'Alphashot G2 est la nouvelle generation du studio compact, ideal pour les produits jusqu\'a 30x30x30 cm et 3 kg. Il est particulierement adapte aux chaussures, a la maroquinerie, aux cosmetiques et a l\'electronique. Il produit des packshots, des vues 360 et des videos grace a son eclairage LED ameliore et son interface modernisee.', en: 'The Alphashot G2 is the new generation compact studio, ideal for products up to 30x30x30 cm and 3 kg. It is particularly suited for shoes, leather goods, cosmetics and electronics. It produces packshots, 360 views and videos thanks to its improved LED lighting and modernized interface.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot G2 ?', en: 'How much space is needed to install the Alphashot G2?' },
        answer: { fr: 'L\'Alphashot G2 ne necessite qu\'un espace bureau. Avec une empreinte de 115x69 cm et une hauteur de 64 cm, il se place sur un bureau ou une table de travail standard. Son installation est immediate, sans travaux ni amenagement specifique requis.', en: 'The Alphashot G2 only requires desk space. With a footprint of 115x69 cm and a height of 64 cm, it sits on a standard desk or work table. Installation is immediate, with no construction work or specific setup required.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot G2 ?', en: 'How does training on the Alphashot G2 work?' },
        answer: { fr: 'PackshotCreator assure la formation complete sur l\'Alphashot G2 avec son interface logicielle modernisee. En tant qu\'organisme certifie Qualiopi, la formation est eligible au financement OPCO. Grace a l\'automatisation totale et a l\'interface intuitive de la nouvelle generation, vos equipes sont operationnelles en une demi-journee.', en: 'PackshotCreator provides full training on the Alphashot G2 with its modernized software interface. As a Qualiopi certified organization, training is eligible for OPCO funding. Thanks to full automation and the intuitive new generation interface, your teams are operational in half a day.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot G2 ?', en: 'What are the financing options for the Alphashot G2?' },
        answer: { fr: 'L\'Alphashot G2 est disponible en leasing, location avec option d\'achat ou achat direct. Avec une capacite de 200 produits par jour incluant packshot, 360 et video, l\'investissement se rentabilise rapidement. Nos conseillers PackshotCreator vous accompagnent pour definir la formule la plus adaptee a votre activite.', en: 'The Alphashot G2 is available through leasing, rental with purchase option or direct purchase. With a capacity of 200 products per day including packshot, 360 and video, the investment pays for itself quickly. Our PackshotCreator advisors help you find the formula best suited to your business.' },
      },
    ],
    keyStats: [
      { value: '200', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne tous contenus confondus', en: 'Daily production capacity across all content types' } },
      { value: '3', label: { fr: 'types de contenu', en: 'content types' }, description: { fr: 'Packshot, 360 et video en un seul studio', en: 'Packshot, 360 and video in one studio' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec interface nouvelle generation', en: 'Full automation with new generation interface' } },
    ],
  },
  {
    id: 'alphashot-pro-g2',
    nom: 'Alphashot Pro G2',
    prix: 20450,
    capaciteJour: 250,
    tailleMax: '35×35×40 cm',
    poidsMax: '10 kg',
    tailleCategories: ['petit'],
    useCases: ['Produits réfléchissants/transparents', 'Cosmétiques', 'Électronique'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 35, w: 35, h: 40 },
    poidsMaxKg: 10,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['cosmetics', 'electronics', 'general'],
    volumeRange: { min: 5000, max: 60000 },
    keyAdvantages: [
      { fr: 'Premier studio photo IA au monde (détection auto des réglages)', en: 'World\'s first AI photo studio (auto settings detection)' },
      { fr: 'Productivité extrême (250 produits/jour)', en: 'Extreme productivity (250 products/day)' },
      { fr: '74 sources lumineuses pour objets complexes', en: '74 light sources for complex objects' },
    ],
    limitations: [
      { fr: 'Taille produit limitée (intermédiaire)', en: 'Limited product size (intermediate)' },
    ],
    spaceRequired: 'Sol/Table robuste',
    studioFootprint: { l: 112, w: 71, h: 72 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot Pro G2 ?', en: 'What types of products can be photographed with the Alphashot Pro G2?' },
        answer: { fr: 'L\'Alphashot Pro G2 est le premier studio photo dote d\'intelligence artificielle. Il excelle avec les produits jusqu\'a 35x35x40 cm et 10 kg, en particulier les objets complexes comme les produits reflechissants ou transparents (flacons, verrerie, metallerie). Ses 74 sources lumineuses permettent un eclairage parfait quelle que soit la matiere du produit.', en: 'The Alphashot Pro G2 is the first photo studio equipped with artificial intelligence. It excels with products up to 35x35x40 cm and 10 kg, especially complex objects like reflective or transparent products (bottles, glassware, metalwork). Its 74 light sources provide perfect lighting regardless of the product material.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot Pro G2 ?', en: 'How much space is needed to install the Alphashot Pro G2?' },
        answer: { fr: 'L\'Alphashot Pro G2 necessite un espace sol ou une table robuste pouvant supporter son poids. Son empreinte de 112x71 cm et sa hauteur de 72 cm en font un studio relativement compact au vu de ses performances. Prevoyez un espace au sol ou une table solide dans votre zone de production photo.', en: 'The Alphashot Pro G2 requires floor space or a sturdy table to support its weight. Its footprint of 112x71 cm and height of 72 cm make it a relatively compact studio given its performance. Plan for floor space or a solid table in your photo production area.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot Pro G2 ?', en: 'How does training on the Alphashot Pro G2 work?' },
        answer: { fr: 'La formation PackshotCreator sur l\'Alphashot Pro G2 couvre l\'utilisation de l\'intelligence artificielle integree et des 74 sources lumineuses. Notre certification Qualiopi ouvre droit au financement OPCO. L\'IA simplifie considerablement la prise en main : la machine detecte automatiquement les reglages optimaux, ce qui reduit le temps de formation a une journee environ.', en: 'PackshotCreator training on the Alphashot Pro G2 covers the use of integrated artificial intelligence and the 74 light sources. Our Qualiopi certification qualifies for OPCO funding. The AI significantly simplifies getting started: the machine automatically detects optimal settings, reducing training time to about one day.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot Pro G2 ?', en: 'What are the financing options for the Alphashot Pro G2?' },
        answer: { fr: 'L\'Alphashot Pro G2 est financable en leasing, location ou achat direct. Avec 250 produits par jour et une IA qui elimine les erreurs de reglage, le gain de productivite est immediat. Le ROI est generalement atteint des la premiere annee pour les entreprises ayant un volume de 5 000 photos ou plus par an.', en: 'The Alphashot Pro G2 can be financed through leasing, rental or direct purchase. With 250 products per day and AI that eliminates setting errors, the productivity gain is immediate. ROI is generally achieved within the first year for businesses with a volume of 5,000 or more photos per year.' },
      },
    ],
    keyStats: [
      { value: '250', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Productivite extreme grace a l\'intelligence artificielle', en: 'Extreme productivity thanks to artificial intelligence' } },
      { value: '74', label: { fr: 'sources lumineuses', en: 'light sources' }, description: { fr: 'Eclairage complet pour objets complexes, reflechissants et transparents', en: 'Complete lighting for complex, reflective and transparent objects' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Premier studio photo IA au monde avec detection automatique', en: 'World\'s first AI photo studio with automatic detection' } },
    ],
  },

  // ============================================
  // PRODUITS MOYENS (30-60cm)
  // ============================================
  {
    id: 'alphashot-xl-v2',
    nom: 'Alphashot XL v2',
    prix: 18950,
    capaciteJour: 200,
    tailleMax: '50×30×70 cm',
    poidsMax: '25 kg',
    tailleCategories: ['moyen'],
    useCases: ['Chaussures', 'Sacs', 'Jouets', 'Électronique'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 50, w: 30, h: 70 },
    poidsMaxKg: 25,
    features: ['packshot', '360', 'video'],
    automationLevel: 'semi-auto',
    idealSectors: ['footwear', 'bags', 'electronics', 'general'],
    volumeRange: { min: 1000, max: 30000 },
    keyAdvantages: [
      { fr: 'Polyvalence pour produits moyens (sacs, chaussures)', en: 'Versatility for medium products (bags, shoes)' },
      { fr: 'Kit suspension disponible en option', en: 'Suspension kit available as option' },
      { fr: 'Support multi-caméras (jusqu\'à 5)', en: 'Multi-camera support (up to 5)' },
    ],
    limitations: [
      { fr: 'Non adapté pour mannequins vivants ou gros mobilier', en: 'Not suitable for live mannequins or large furniture' },
    ],
    spaceRequired: 'Sol',
    studioFootprint: { l: 142, w: 87, h: 176 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot XL v2 ?', en: 'What types of products can be photographed with the Alphashot XL v2?' },
        answer: { fr: 'L\'Alphashot XL v2 est concu pour les produits de taille moyenne jusqu\'a 50x30x70 cm et 25 kg : chaussures, sacs a main, jouets, electronique grand format. Il supporte jusqu\'a 5 cameras simultanees et dispose d\'un kit suspension optionnel pour les prises de vue en levitation. Il produit des packshots, des vues 360 et des videos.', en: 'The Alphashot XL v2 is designed for medium-sized products up to 50x30x70 cm and 25 kg: shoes, handbags, toys, large electronics. It supports up to 5 simultaneous cameras and has an optional suspension kit for levitation shots. It produces packshots, 360 views and videos.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot XL v2 ?', en: 'How much space is needed to install the Alphashot XL v2?' },
        answer: { fr: 'L\'Alphashot XL v2 est un studio au sol qui necessite un espace dedie. Son empreinte est de 142x87 cm avec une hauteur de 176 cm. Prevoyez un espace au sol d\'environ 2 m2 avec un degagement suffisant devant et sur les cotes pour manipuler les produits. Un sol plat et stable est recommande.', en: 'The Alphashot XL v2 is a floor-standing studio that requires dedicated space. Its footprint is 142x87 cm with a height of 176 cm. Plan for about 2 sqm of floor space with sufficient clearance in front and on the sides to handle products. A flat, stable floor is recommended.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot XL v2 ?', en: 'How does training on the Alphashot XL v2 work?' },
        answer: { fr: 'PackshotCreator dispense une formation pratique sur l\'Alphashot XL v2 incluant la gestion multi-cameras et le kit suspension. La certification Qualiopi de notre organisme rend la formation eligible au financement OPCO. Comptez une journee pour maitriser les differents modes de prise de vue et l\'optimisation des eclairages.', en: 'PackshotCreator provides hands-on training on the Alphashot XL v2 including multi-camera management and the suspension kit. Our organization\'s Qualiopi certification makes training eligible for OPCO funding. Allow one day to master the different shooting modes and lighting optimization.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot XL v2 ?', en: 'What are the financing options for the Alphashot XL v2?' },
        answer: { fr: 'L\'Alphashot XL v2 est disponible en leasing, location avec option d\'achat ou acquisition directe. Avec 200 produits par jour et la polyvalence pour traiter chaussures, sacs et electronique, il offre un retour sur investissement rapide. Nos commerciaux realisent une etude personnalisee en fonction de votre volume annuel.', en: 'The Alphashot XL v2 is available through leasing, rental with purchase option or direct acquisition. With 200 products per day and the versatility to handle shoes, bags and electronics, it offers a fast return on investment. Our sales team provides a personalized study based on your annual volume.' },
      },
    ],
    keyStats: [
      { value: '200', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne pour produits moyens', en: 'Daily production capacity for medium products' } },
      { value: '5', label: { fr: 'cameras simultanees', en: 'simultaneous cameras' }, description: { fr: 'Support multi-cameras pour angles multiples en une seule prise', en: 'Multi-camera support for multiple angles in a single shot' } },
      { value: 'Semi', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Semi-automatisation avec controle operateur pour la precision', en: 'Semi-automation with operator control for precision' } },
    ],
  },
  {
    id: 'alphashot-xl-wine-v2',
    nom: 'Alphashot XL Wine v2',
    prix: 20450,
    capaciteJour: 200,
    tailleMax: 'Bouteilles vin/spiritueux',
    poidsMax: '5 kg',
    tailleCategories: ['moyen'],
    useCases: ['Vins', 'Spiritueux', 'Bouteilles'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 40, w: 40, h: 50 },
    poidsMaxKg: 5,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['wine'],
    volumeRange: { min: 1000, max: 25000 },
    keyAdvantages: [
      { fr: 'Spécialisé pour bouteilles et étiquettes', en: 'Specialized for bottles and labels' },
      { fr: 'Éclairage optimisé pour le verre', en: 'Lighting optimized for glass' },
      { fr: 'Rendu parfait des reflets', en: 'Perfect reflection rendering' },
    ],
    limitations: [
      { fr: 'Spécialisé vins/spiritueux uniquement', en: 'Specialized for wine/spirits only' },
    ],
    spaceRequired: 'Sol',
    studioFootprint: { l: 142, w: 87, h: 176 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot XL Wine v2 ?', en: 'What types of products can be photographed with the Alphashot XL Wine v2?' },
        answer: { fr: 'L\'Alphashot XL Wine v2 est specialement concu pour la photographie de bouteilles de vin, spiritueux et boissons. Son eclairage est optimise pour le verre et les etiquettes, eliminant les reflets indesirables tout en restituant fidellement les couleurs des robes et des etiquettes. Il produit packshots, vues 360 et videos de bouteilles jusqu\'a 5 kg.', en: 'The Alphashot XL Wine v2 is specially designed for photographing bottles of wine, spirits and beverages. Its lighting is optimized for glass and labels, eliminating unwanted reflections while faithfully reproducing the colors of wines and labels. It produces packshots, 360 views and videos of bottles up to 5 kg.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot XL Wine v2 ?', en: 'How much space is needed to install the Alphashot XL Wine v2?' },
        answer: { fr: 'L\'Alphashot XL Wine v2 est un studio au sol avec une empreinte de 142x87 cm et une hauteur de 176 cm. Il necessite un espace dedie stable, idealement dans votre chai, cave de degustation ou atelier. Prevoyez environ 2 m2 au sol avec un acces facile pour la manipulation des bouteilles.', en: 'The Alphashot XL Wine v2 is a floor-standing studio with a footprint of 142x87 cm and a height of 176 cm. It requires a stable dedicated space, ideally in your cellar, tasting room or workshop. Plan for about 2 sqm of floor space with easy access for bottle handling.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot XL Wine v2 ?', en: 'How does training on the Alphashot XL Wine v2 work?' },
        answer: { fr: 'La formation PackshotCreator sur le XL Wine couvre les specificites de la photo de bouteilles : gestion des reflets sur verre, capture des etiquettes et rendu des couleurs. Notre certification Qualiopi permet le financement par votre OPCO. L\'automatisation complete du systeme permet une prise en main rapide en une demi-journee.', en: 'PackshotCreator training on the XL Wine covers the specifics of bottle photography: managing reflections on glass, label capture and color rendering. Our Qualiopi certification allows funding through your OPCO. The complete automation of the system allows quick mastery in half a day.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot XL Wine v2 ?', en: 'What are the financing options for the Alphashot XL Wine v2?' },
        answer: { fr: 'L\'Alphashot XL Wine v2 est disponible en leasing, location ou achat. Pour les domaines viticoles, negociants et caves, avec 200 bouteilles photographiees par jour, l\'investissement est vite rentabilise face a la sous-traitance photo. Les frais de consommables sont minimes (environ 500 EUR par an) et la maintenance est incluse.', en: 'The Alphashot XL Wine v2 is available through leasing, rental or purchase. For wine estates, merchants and cellars, with 200 bottles photographed per day, the investment quickly pays for itself compared to outsourced photography. Consumable costs are minimal (about 500 EUR per year) and maintenance is included.' },
      },
    ],
    keyStats: [
      { value: '200', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Bouteilles photographiees par jour en mode automatique', en: 'Bottles photographed per day in automatic mode' } },
      { value: '360\u00B0', label: { fr: 'rotation bouteille', en: 'bottle rotation' }, description: { fr: 'Vue 360 pour montrer toutes les faces de la bouteille et l\'etiquette', en: '360 view to show all sides of the bottle and label' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Eclairage et prise de vue entierement automatises pour le verre', en: 'Fully automated lighting and shooting for glass' } },
    ],
  },
  {
    id: 'alphashot-xl-pro-v2',
    nom: 'Alphashot XL Pro v2',
    prix: 22450,
    capaciteJour: 200,
    tailleMax: '50×70×30 cm',
    poidsMax: '25 kg',
    tailleCategories: ['moyen'],
    useCases: ['Version Pro du XL', 'Éclairage avancé', 'Haute qualité'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 500,
    dimensionsMax: { l: 50, w: 70, h: 30 },
    poidsMaxKg: 25,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['footwear', 'bags', 'electronics', 'general'],
    volumeRange: { min: 5000, max: 40000 },
    keyAdvantages: [
      { fr: 'Version Pro avec éclairages coulissants pour contrôle précis', en: 'Pro version with sliding lights for precise control' },
      { fr: 'Laser de centrage et portes coulissantes des deux côtés', en: 'Centering laser and sliding doors on both sides' },
      { fr: 'Contrôle jusqu\'à 5 caméras simultanément', en: 'Control up to 5 cameras simultaneously' },
    ],
    limitations: [
      { fr: 'Coût plus élevé que le XL standard', en: 'Higher cost than standard XL' },
    ],
    spaceRequired: 'Sol',
    studioFootprint: { l: 142, w: 87, h: 176 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphashot XL Pro v2 ?', en: 'What types of products can be photographed with the Alphashot XL Pro v2?' },
        answer: { fr: 'L\'Alphashot XL Pro v2 est la version professionnelle pour les produits moyens jusqu\'a 50x70x30 cm et 25 kg. Il est ideal pour les chaussures, sacs, electronique et tout produit necessitant un eclairage de precision. Ses eclairages coulissants, son laser de centrage et le controle de 5 cameras simultanees garantissent des resultats de qualite superieure.', en: 'The Alphashot XL Pro v2 is the professional version for medium products up to 50x70x30 cm and 25 kg. It is ideal for shoes, bags, electronics and any product requiring precision lighting. Its sliding lights, centering laser and control of 5 simultaneous cameras ensure superior quality results.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphashot XL Pro v2 ?', en: 'How much space is needed to install the Alphashot XL Pro v2?' },
        answer: { fr: 'L\'Alphashot XL Pro v2 est un studio au sol avec une empreinte de 142x87 cm et une hauteur de 176 cm. Ses portes coulissantes des deux cotes necessitent un degagement lateral. Prevoyez un espace d\'environ 3 m2 au total pour une utilisation confortable avec les eclairages coulissants et l\'acces produit.', en: 'The Alphashot XL Pro v2 is a floor-standing studio with a footprint of 142x87 cm and a height of 176 cm. Its sliding doors on both sides require lateral clearance. Plan for a total space of about 3 sqm for comfortable use with sliding lights and product access.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphashot XL Pro v2 ?', en: 'How does training on the Alphashot XL Pro v2 work?' },
        answer: { fr: 'La formation PackshotCreator sur le XL Pro v2 couvre les eclairages coulissants, le laser de centrage et la gestion multi-cameras. Notre certification Qualiopi permet la prise en charge par votre OPCO. Prevoyez une journee de formation pour maitriser toutes les fonctionnalites avancees et les templates de prise de vue.', en: 'PackshotCreator training on the XL Pro v2 covers sliding lights, centering laser and multi-camera management. Our Qualiopi certification allows coverage by your OPCO. Allow one day of training to master all advanced features and shooting templates.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphashot XL Pro v2 ?', en: 'What are the financing options for the Alphashot XL Pro v2?' },
        answer: { fr: 'L\'Alphashot XL Pro v2 est disponible en leasing, location avec option d\'achat ou achat direct. La version Pro offre un gain de qualite significatif par rapport au XL standard, particulierement apprecie par les marques exigeantes. Avec 200 produits par jour et un controle qualite optimise, le retour sur investissement est rapide pour les volumes superieurs a 5 000 photos par an.', en: 'The Alphashot XL Pro v2 is available through leasing, rental with purchase option or direct purchase. The Pro version offers a significant quality improvement over the standard XL, particularly appreciated by demanding brands. With 200 products per day and optimized quality control, the return on investment is fast for volumes above 5,000 photos per year.' },
      },
    ],
    keyStats: [
      { value: '200', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne en qualite Pro', en: 'Daily production capacity in Pro quality' } },
      { value: '5', label: { fr: 'cameras simultanees', en: 'simultaneous cameras' }, description: { fr: 'Controle multi-cameras pour angles multiples', en: 'Multi-camera control for multiple angles' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec eclairages coulissants et laser', en: 'Full automation with sliding lights and laser' } },
    ],
  },

  // ============================================
  // FLAT-LAY (Vue de dessus)
  // ============================================
  {
    id: 'alphadesk',
    nom: 'Alphadesk v2',
    prix: 17450,
    capaciteJour: 300,
    tailleMax: '85×70×5 cm',
    poidsMax: '10 kg',
    tailleCategories: ['petit', 'moyen'],
    useCases: ['Vêtements à plat', 'Tissus', 'Accessoires', 'Petits objets plats'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 400,
    dimensionsMax: { l: 85, w: 70, h: 5 },
    poidsMaxKg: 10,
    features: ['packshot', 'flat-lay', 'video'],
    automationLevel: 'semi-auto',
    idealSectors: ['fashion', 'general'],
    volumeRange: { min: 2000, max: 50000 },
    keyAdvantages: [
      { fr: 'Détourage immédiat pour le textile à plat', en: 'Immediate clipping for flat textiles' },
      { fr: 'Boutons de capture instantanée physiques pour rapidité', en: 'Physical instant capture buttons for speed' },
      { fr: 'Outils Ghost image pour alignement parfait', en: 'Ghost image tools for perfect alignment' },
    ],
    limitations: [
      { fr: 'Limité à la 2D (vue de dessus uniquement)', en: 'Limited to 2D (top-down view only)' },
      { fr: 'Hauteur produit max 5cm', en: 'Max product height 5cm' },
    ],
    spaceRequired: 'Bureau',
    studioFootprint: { l: 137, w: 123, h: 155 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphadesk v2 ?', en: 'What types of products can be photographed with the Alphadesk v2?' },
        answer: { fr: 'L\'Alphadesk v2 est specialise dans la photographie a plat (flat-lay) de produits jusqu\'a 85x70 cm et 5 cm d\'epaisseur. Il est ideal pour les vetements plies ou etales, les tissus, les accessoires de mode, les foulards et tous les objets plats. Avec 480 produits par jour, c\'est la machine la plus rapide de la gamme pour le textile.', en: 'The Alphadesk v2 specializes in flat-lay photography of products up to 85x70 cm and 5 cm thick. It is ideal for folded or laid-out clothing, fabrics, fashion accessories, scarves and all flat objects. With 480 products per day, it is the fastest machine in the range for textiles.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphadesk v2 ?', en: 'How much space is needed to install the Alphadesk v2?' },
        answer: { fr: 'L\'Alphadesk v2 est un poste de travail de type bureau avec une empreinte de 137x123 cm et une hauteur de 155 cm. Il s\'installe dans un espace bureau standard. Prevoyez un degagement autour du plan de travail pour deposer et retirer les produits facilement et avoir acces aux boutons de capture instantanee.', en: 'The Alphadesk v2 is a desk-type workstation with a footprint of 137x123 cm and a height of 155 cm. It fits in a standard office space. Plan for clearance around the work surface to easily place and remove products and access the instant capture buttons.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphadesk v2 ?', en: 'How does training on the Alphadesk v2 work?' },
        answer: { fr: 'La formation PackshotCreator sur l\'Alphadesk v2 couvre le detourage automatique, les outils Ghost image pour l\'alignement et les techniques de mise a plat textile. Notre certification Qualiopi permet le financement par votre OPCO. La prise en main est rapide grace aux boutons de capture physiques et a l\'interface intuitive.', en: 'PackshotCreator training on the Alphadesk v2 covers automatic clipping, Ghost image tools for alignment and flat-lay textile techniques. Our Qualiopi certification allows funding through your OPCO. Getting started is quick thanks to physical capture buttons and the intuitive interface.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphadesk v2 ?', en: 'What are the financing options for the Alphadesk v2?' },
        answer: { fr: 'L\'Alphadesk v2 est financable en leasing, location ou achat direct. Avec 480 produits par jour, c\'est l\'une des machines les plus productives de la gamme. Pour les enseignes de mode ou les marques textiles avec de gros volumes de references, le retour sur investissement est particulierement rapide par rapport a un studio photo traditionnel.', en: 'The Alphadesk v2 can be financed through leasing, rental or direct purchase. With 480 products per day, it is one of the most productive machines in the range. For fashion retailers or textile brands with large volumes of references, the return on investment is particularly fast compared to a traditional photo studio.' },
      },
    ],
    keyStats: [
      { value: '300', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Solution rapide et specialisee pour le textile a plat', en: 'Fast and specialized solution for flat textiles' } },
      { value: '2D', label: { fr: 'flat-lay specialise', en: 'specialized flat-lay' }, description: { fr: 'Vue de dessus optimisee pour vetements et accessoires', en: 'Top-down view optimized for clothing and accessories' } },
      { value: 'Semi', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Semi-automatisation avec boutons de capture instantanee', en: 'Semi-automation with instant capture buttons' } },
    ],
  },
  {
    id: 'alphatable',
    nom: 'Alphatable v2',
    prix: 46450,
    capaciteJour: 300,
    tailleMax: '165×112×5 cm',
    poidsMax: '80 kg',
    tailleCategories: ['moyen', 'grand'],
    useCases: ['Grands vêtements', 'Tapis', 'Carrelage', 'Tissus grands formats'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 600,
    dimensionsMax: { l: 165, w: 112, h: 5 },
    poidsMaxKg: 80,
    features: ['packshot', 'flat-lay', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['fashion', 'furniture', 'general'],
    volumeRange: { min: 5000, max: 100000 },
    keyAdvantages: [
      { fr: 'Grand format pour vêtements complets (manteaux, robes)', en: 'Large format for complete garments (coats, dresses)' },
      { fr: 'Guidage laser pour positionnement précis', en: 'Laser guidance for precise positioning' },
      { fr: 'Zoom motorisé via logiciel', en: 'Motorized zoom via software' },
    ],
    limitations: [
      { fr: 'Limité à la 2D (vue de dessus uniquement)', en: 'Limited to 2D (top-down view only)' },
      { fr: 'Encombrement au sol important', en: 'Significant floor space required' },
    ],
    spaceRequired: 'Sol',
    studioFootprint: { l: 338, w: 191, h: 268 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphatable v2 ?', en: 'What types of products can be photographed with the Alphatable v2?' },
        answer: { fr: 'L\'Alphatable v2 est le studio flat-lay grand format, capable de photographier des produits jusqu\'a 165x112 cm et 80 kg. Il est ideal pour les grands vetements (manteaux, robes, pantalons deplies), les tapis, les carrelages, les tissus d\'ameublement et tous les articles de grande surface a photographier a plat. Avec 500 produits par jour, c\'est la machine la plus productive de la gamme.', en: 'The Alphatable v2 is the large-format flat-lay studio, capable of photographing products up to 165x112 cm and 80 kg. It is ideal for large garments (coats, dresses, unfolded trousers), carpets, tiles, upholstery fabrics and all large surface items to photograph flat. With 500 products per day, it is the most productive machine in the range.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphatable v2 ?', en: 'How much space is needed to install the Alphatable v2?' },
        answer: { fr: 'L\'Alphatable v2 est un equipement au sol imposant avec une empreinte de 338x191 cm et une hauteur de 268 cm. Prevoyez un espace dedie d\'environ 8 a 10 m2 pour l\'installation et la circulation autour de la table. La hauteur sous plafond doit etre d\'au moins 3 metres. C\'est un investissement en espace justifie par la productivite exceptionnelle.', en: 'The Alphatable v2 is a large floor-standing piece of equipment with a footprint of 338x191 cm and a height of 268 cm. Plan for a dedicated space of about 8 to 10 sqm for installation and circulation around the table. Ceiling height must be at least 3 meters. It\'s a space investment justified by exceptional productivity.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphatable v2 ?', en: 'How does training on the Alphatable v2 work?' },
        answer: { fr: 'La formation PackshotCreator sur l\'Alphatable v2 inclut le guidage laser, le zoom motorise et les techniques de mise a plat grand format. Notre certification Qualiopi permet la prise en charge financiere par votre OPCO. Comptez une journee de formation pour exploiter pleinement les capacites de l\'equipement, y compris les automatismes de prise de vue en serie.', en: 'PackshotCreator training on the Alphatable v2 includes laser guidance, motorized zoom and large-format flat-lay techniques. Our Qualiopi certification allows financial coverage by your OPCO. Allow one day of training to fully leverage the equipment\'s capabilities, including batch shooting automation.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphatable v2 ?', en: 'What are the financing options for the Alphatable v2?' },
        answer: { fr: 'L\'Alphatable v2 est financable en leasing, location avec option d\'achat ou acquisition directe. Avec 500 produits par jour et la capacite de traiter des articles de grande taille, c\'est un outil de production a haut rendement. Pour les enseignes textiles ou les fabricants de revetements avec plus de 5 000 references par an, le ROI est generalement atteint en moins d\'un an.', en: 'The Alphatable v2 can be financed through leasing, rental with purchase option or direct acquisition. With 500 products per day and the ability to handle large items, it is a high-throughput production tool. For textile retailers or covering manufacturers with more than 5,000 references per year, ROI is generally achieved in less than one year.' },
      },
    ],
    keyStats: [
      { value: '300', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Studio flat-lay grand format haute productivite', en: 'High-productivity large-format flat-lay studio' } },
      { value: '165cm', label: { fr: 'surface max', en: 'max surface' }, description: { fr: 'Plan de travail de 165x112 cm pour grands vetements et tissus', en: 'Work surface of 165x112 cm for large garments and fabrics' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec guidage laser et zoom motorise', en: 'Full automation with laser guidance and motorized zoom' } },
    ],
  },

  // ============================================
  // GRANDS PRODUITS (60-150cm)
  // ============================================
  {
    id: 'alphastudio-compact-v2',
    nom: 'Alphastudio Compact Pro v2',
    prix: 36350,
    capaciteJour: 180,
    tailleMax: '100×70×190 cm',
    poidsMax: '100 kg',
    tailleCategories: ['grand'],
    useCases: ['Valises', 'Petits meubles', 'Sacs', 'Outils'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 800,
    dimensionsMax: { l: 100, w: 70, h: 190 },
    poidsMaxKg: 100,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['bags', 'furniture', 'sports', 'general'],
    volumeRange: { min: 5000, max: 40000 },
    keyAdvantages: [
      { fr: 'Flexibilité pour objets moyens à gros (jusqu\'à la valise)', en: 'Flexibility for medium to large objects (up to suitcase)' },
      { fr: 'Magic Table pour suspendre les objets sans fond visible', en: 'Magic Table to suspend objects without visible background' },
      { fr: 'Charge admissible élevée (100kg)', en: 'High load capacity (100kg)' },
    ],
    limitations: [
      { fr: 'Hauteur un peu juste pour mannequins vivants adultes', en: 'Height a bit limited for adult live mannequins' },
    ],
    spaceRequired: 'Studio',
    studioFootprint: { l: 178, w: 136, h: 183 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphastudio Compact Pro v2 ?', en: 'What types of products can be photographed with the Alphastudio Compact Pro v2?' },
        answer: { fr: 'L\'Alphastudio Compact Pro v2 accueille des produits jusqu\'a 100x70x190 cm et 100 kg : valises, petits meubles, sacs de grande taille, outils et equipements sportifs. Grace a la Magic Table, les produits peuvent etre suspendus sans fond visible pour un rendu professionnel. Il produit packshots, vues 360 et videos avec un eclairage studio complet.', en: 'The Alphastudio Compact Pro v2 accommodates products up to 100x70x190 cm and 100 kg: suitcases, small furniture, large bags, tools and sports equipment. Thanks to the Magic Table, products can be suspended without a visible background for a professional result. It produces packshots, 360 views and videos with complete studio lighting.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphastudio Compact Pro v2 ?', en: 'How much space is needed to install the Alphastudio Compact Pro v2?' },
        answer: { fr: 'L\'Alphastudio Compact Pro v2 necessite un espace studio dedie avec une empreinte de 178x136 cm et une hauteur de 183 cm. Prevoyez un espace d\'environ 4 a 5 m2 incluant l\'acces pour charger les produits lourds. Le sol doit etre plan et suffisamment solide pour supporter la charge de 100 kg sur le plateau tournant.', en: 'The Alphastudio Compact Pro v2 requires a dedicated studio space with a footprint of 178x136 cm and a height of 183 cm. Plan for a space of about 4 to 5 sqm including access to load heavy products. The floor must be level and strong enough to support the 100 kg load on the turntable.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphastudio Compact Pro v2 ?', en: 'How does training on the Alphastudio Compact Pro v2 work?' },
        answer: { fr: 'PackshotCreator propose une formation complete sur l\'Alphastudio Compact Pro v2 couvrant la Magic Table, les reglages d\'eclairage studio et les workflows de prise de vue 360. En tant qu\'organisme certifie Qualiopi, la formation est finançable par votre OPCO. Prevoyez une a deux journees pour maitriser l\'ensemble des fonctionnalites.', en: 'PackshotCreator offers comprehensive training on the Alphastudio Compact Pro v2 covering the Magic Table, studio lighting settings and 360 shooting workflows. As a Qualiopi certified organization, training can be funded by your OPCO. Allow one to two days to master all features.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphastudio Compact Pro v2 ?', en: 'What are the financing options for the Alphastudio Compact Pro v2?' },
        answer: { fr: 'L\'Alphastudio Compact Pro v2 est disponible en leasing, location avec option d\'achat ou acquisition directe. Avec 180 produits par jour et la capacite de traiter des objets de grande taille et lourds, il represente un investissement strategique. Le retour sur investissement est souvent atteint en 12 a 18 mois pour les entreprises traitant plus de 5 000 references par an.', en: 'The Alphastudio Compact Pro v2 is available through leasing, rental with purchase option or direct acquisition. With 180 products per day and the ability to handle large and heavy objects, it represents a strategic investment. Return on investment is often achieved in 12 to 18 months for businesses processing more than 5,000 references per year.' },
      },
    ],
    keyStats: [
      { value: '180', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne pour grands produits', en: 'Daily production capacity for large products' } },
      { value: '100kg', label: { fr: 'charge max', en: 'max load' }, description: { fr: 'Plateau tournant supportant jusqu\'a 100 kg', en: 'Turntable supporting up to 100 kg' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec Magic Table integree', en: 'Full automation with integrated Magic Table' } },
    ],
  },
  {
    id: 'alphastudio-xxl-v2',
    nom: 'Alphastudio XXL Pro v2',
    prix: 45450,
    capaciteJour: 150,
    tailleMax: '100×70×190 cm',
    poidsMax: '100 kg',
    tailleCategories: ['grand', 'tres-grand'],
    useCases: ['Mannequins vivants', 'Vêtements (Ghost)', 'Gros bagages', 'Meubles'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 1000,
    dimensionsMax: { l: 100, w: 70, h: 190 },
    poidsMaxKg: 100,
    features: ['packshot', '360', 'video', 'ghost-mannequin', 'lifestyle'],
    automationLevel: 'full-auto',
    idealSectors: ['fashion', 'furniture', 'general'],
    volumeRange: { min: 15000, max: 80000 },
    keyAdvantages: [
      { fr: 'Solution tout-en-un pour la mode (plat, ghost, porté)', en: 'All-in-one solution for fashion (flat, ghost, worn)' },
      { fr: 'Éclairage LED surdimensionné pour qualité impression', en: 'Oversized LED lighting for print quality' },
      { fr: 'Détourage automatique même pour modèles', en: 'Automatic clipping even for models' },
    ],
    limitations: [
      { fr: 'IQ-Mask parfois imparfait sur modèles en mouvement', en: 'IQ-Mask sometimes imperfect on moving models' },
    ],
    spaceRequired: 'Grand Studio',
    studioFootprint: { l: 277, w: 190, h: 273 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'Alphastudio XXL Pro v2 ?', en: 'What types of products can be photographed with the Alphastudio XXL Pro v2?' },
        answer: { fr: 'L\'Alphastudio XXL Pro v2 est la solution tout-en-un pour la mode et les grands produits jusqu\'a 100x70x190 cm et 100 kg. Il gere les packshots, les vues 360, les videos, le ghost mannequin et les prises de vue lifestyle avec mannequins vivants. Il convient egalement au gros bagage, aux meubles de taille moyenne et a tout produit necessitant un eclairage studio professionnel.', en: 'The Alphastudio XXL Pro v2 is the all-in-one solution for fashion and large products up to 100x70x190 cm and 100 kg. It handles packshots, 360 views, videos, ghost mannequin and lifestyle shots with live models. It also suits large luggage, medium-sized furniture and any product requiring professional studio lighting.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'Alphastudio XXL Pro v2 ?', en: 'How much space is needed to install the Alphastudio XXL Pro v2?' },
        answer: { fr: 'L\'Alphastudio XXL Pro v2 necessite un grand studio avec une empreinte de 277x190 cm et une hauteur de 273 cm. Prevoyez un espace dedie d\'environ 8 a 10 m2 avec une hauteur sous plafond de 3 metres minimum. L\'acces doit permettre l\'entree de mannequins et de produits volumineux. Un eclairage ambiant maitrise est recommande.', en: 'The Alphastudio XXL Pro v2 requires a large studio with a footprint of 277x190 cm and a height of 273 cm. Plan for a dedicated space of about 8 to 10 sqm with a minimum ceiling height of 3 meters. Access must allow entry for models and bulky products. Controlled ambient lighting is recommended.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'Alphastudio XXL Pro v2 ?', en: 'How does training on the Alphastudio XXL Pro v2 work?' },
        answer: { fr: 'La formation PackshotCreator sur l\'Alphastudio XXL Pro v2 couvre les 5 types de contenu (packshot, 360, video, ghost mannequin, lifestyle), le detourage automatique IQ-Mask et la gestion des mannequins vivants. Notre certification Qualiopi rend la formation eligible OPCO. Prevoyez deux journees pour maitriser l\'ensemble des workflows.', en: 'PackshotCreator training on the Alphastudio XXL Pro v2 covers all 5 content types (packshot, 360, video, ghost mannequin, lifestyle), IQ-Mask automatic clipping and live model management. Our Qualiopi certification makes training OPCO eligible. Allow two days to master all workflows.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'Alphastudio XXL Pro v2 ?', en: 'What are the financing options for the Alphastudio XXL Pro v2?' },
        answer: { fr: 'L\'Alphastudio XXL Pro v2 est financable en leasing, location ou achat direct. C\'est un investissement strategique pour les entreprises de mode et de retail ayant un gros volume. Avec 150 produits par jour et 5 types de contenu differents, il remplace a lui seul un studio photo complet, offrant un retour sur investissement attractif pour les volumes superieurs a 15 000 photos par an.', en: 'The Alphastudio XXL Pro v2 can be financed through leasing, rental or direct purchase. It is a strategic investment for fashion and retail businesses with high volume. With 150 products per day and 5 different content types, it single-handedly replaces a complete photo studio, offering an attractive return on investment for volumes above 15,000 photos per year.' },
      },
    ],
    keyStats: [
      { value: '150', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne tous types de contenu', en: 'Daily production capacity across all content types' } },
      { value: '5', label: { fr: 'types de contenu', en: 'content types' }, description: { fr: 'Packshot, 360, video, ghost mannequin et lifestyle', en: 'Packshot, 360, video, ghost mannequin and lifestyle' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec detourage IQ-Mask integre', en: 'Full automation with integrated IQ-Mask clipping' } },
    ],
  },

  // ============================================
  // TRÈS GRANDS PRODUITS (> 150cm)
  // ============================================
  {
    id: 'fashion-studio-basic',
    nom: 'Fashion Studio Basic',
    prix: 56450,
    capaciteJour: 80,
    tailleMax: 'Mannequin taille réelle',
    poidsMax: 'N/A',
    tailleCategories: ['grand', 'tres-grand'],
    useCases: ['Mode portée (version simplifiée)'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 1200,
    dimensionsMax: { l: 200, w: 100, h: 200 },
    poidsMaxKg: 0,
    features: ['packshot', '360', 'video', 'ghost-mannequin', 'lifestyle'],
    automationLevel: 'semi-auto',
    idealSectors: ['fashion'],
    volumeRange: { min: 5000, max: 30000 },
    keyAdvantages: [
      { fr: 'Studio dédié à la mode à prix d\'entrée', en: 'Dedicated fashion studio at entry price' },
      { fr: 'Conçu pour mannequins humains', en: 'Designed for human models' },
    ],
    limitations: [
      { fr: 'Version simplifiée sans miroir virtuel', en: 'Simplified version without virtual mirror' },
      { fr: 'Moins de fonctionnalités que la version Pro', en: 'Fewer features than Pro version' },
    ],
    spaceRequired: 'Très Grand Studio',
    studioFootprint: { l: 600, w: 300, h: 292 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec le Fashion Studio Basic ?', en: 'What types of products can be photographed with the Fashion Studio Basic?' },
        answer: { fr: 'Le Fashion Studio Basic est dedie a la photographie de mode avec mannequins vivants taille reelle, dans un espace scenique pouvant accueillir des produits jusqu\'a 200x100x200 cm. Il produit des packshots, des vues 360, des videos, des prises ghost mannequin et des photos lifestyle. C\'est la version d\'entree de la gamme Fashion Studio, ideale pour les marques de mode souhaitant internaliser leurs shootings.', en: 'The Fashion Studio Basic is dedicated to fashion photography with life-size live models, in a stage space accommodating products up to 200x100x200 cm. It produces packshots, 360 views, videos, ghost mannequin shots and lifestyle photos. It is the entry version of the Fashion Studio range, ideal for fashion brands looking to bring their shoots in-house.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer le Fashion Studio Basic ?', en: 'How much space is needed to install the Fashion Studio Basic?' },
        answer: { fr: 'Le Fashion Studio Basic necessite un tres grand studio avec une empreinte de 600x300 cm et une hauteur de 292 cm. Prevoyez un espace dedie d\'au moins 25 m2 avec une hauteur sous plafond de 3 metres minimum. L\'espace doit permettre la circulation des mannequins et l\'acces aux differentes zones du studio (habillage, maquillage).', en: 'The Fashion Studio Basic requires a very large studio with a footprint of 600x300 cm and a height of 292 cm. Plan for a dedicated space of at least 25 sqm with a minimum ceiling height of 3 meters. The space must allow model circulation and access to different studio areas (wardrobe, makeup).' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur le Fashion Studio Basic ?', en: 'How does training on the Fashion Studio Basic work?' },
        answer: { fr: 'La formation PackshotCreator sur le Fashion Studio Basic couvre les 5 types de contenu photo/video de mode, la gestion des mannequins vivants et les workflows ghost mannequin. Notre certification Qualiopi permet le financement par votre OPCO. Prevoyez deux a trois journees de formation pour maitriser les differents modes de prise de vue.', en: 'PackshotCreator training on the Fashion Studio Basic covers all 5 fashion photo/video content types, live model management and ghost mannequin workflows. Our Qualiopi certification allows funding through your OPCO. Allow two to three days of training to master the different shooting modes.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour le Fashion Studio Basic ?', en: 'What are the financing options for the Fashion Studio Basic?' },
        answer: { fr: 'Le Fashion Studio Basic est financable en leasing, location avec option d\'achat ou acquisition directe. C\'est le point d\'entree de la gamme Fashion, offrant un excellent rapport qualite-prix pour les marques de mode. Avec 80 produits par jour et 5 types de contenu, il permet de remplacer la sous-traitance photo mode et d\'obtenir un retour sur investissement significatif.', en: 'The Fashion Studio Basic can be financed through leasing, rental with purchase option or direct acquisition. It is the entry point of the Fashion range, offering excellent value for fashion brands. With 80 products per day and 5 content types, it allows replacing outsourced fashion photography and achieving a significant return on investment.' },
      },
    ],
    keyStats: [
      { value: '80', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne en mode fashion', en: 'Daily production capacity in fashion mode' } },
      { value: '5', label: { fr: 'types de contenu', en: 'content types' }, description: { fr: 'Packshot, 360, video, ghost mannequin et lifestyle', en: 'Packshot, 360, video, ghost mannequin and lifestyle' } },
      { value: 'Semi', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Semi-automatisation adaptee aux prises avec mannequins vivants', en: 'Semi-automation adapted for live model shoots' } },
    ],
  },
  {
    id: 'fashion-studio',
    nom: 'Fashion Studio Pro v2',
    prix: 84450,
    capaciteJour: 100,
    tailleMax: '200×100×200 cm (Espace scénique 3×3m)',
    poidsMax: '200 kg/m²',
    tailleCategories: ['grand', 'tres-grand'],
    useCases: ['Mode portée', 'Défilé vidéo', 'Stylisme complet'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 1500,
    dimensionsMax: { l: 200, w: 100, h: 200 },
    poidsMaxKg: 0, // Charge au m² plutôt qu'en kg fixe
    features: ['packshot', '360', 'video', 'ghost-mannequin', 'lifestyle'],
    automationLevel: 'semi-auto',
    idealSectors: ['fashion'],
    volumeRange: { min: 15000, max: 60000 },
    keyAdvantages: [
      { fr: 'Outils d\'interaction modèle (miroir virtuel, signaux)', en: 'Model interaction tools (virtual mirror, signals)' },
      { fr: 'Lumière Kick lights pour effets de mode', en: 'Kick lights for fashion effects' },
      { fr: 'Conçu spécifiquement pour flux vidéo/photo de mode', en: 'Specifically designed for fashion video/photo workflow' },
    ],
    limitations: [
      { fr: 'Encombrement très important (plus de 8m de long)', en: 'Very large footprint (over 8m long)' },
      { fr: 'Spécialisé mode, moins polyvalent pour packshot pur', en: 'Specialized for fashion, less versatile for pure packshot' },
    ],
    spaceRequired: 'Très Grand Studio',
    studioFootprint: { l: 847, w: 301, h: 292 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec le Fashion Studio Pro v2 ?', en: 'What types of products can be photographed with the Fashion Studio Pro v2?' },
        answer: { fr: 'Le Fashion Studio Pro v2 est la reference pour la photographie de mode professionnelle. Avec un espace scenique de 3x3m, il accueille mannequins vivants, vetements portes, videos de defile et stylisme complet. Il integre un miroir virtuel pour le modele, des Kick lights pour les effets de mode et produit les 5 types de contenu : packshot, 360, video, ghost mannequin et lifestyle.', en: 'The Fashion Studio Pro v2 is the reference for professional fashion photography. With a 3x3m stage space, it accommodates live models, worn clothing, runway videos and complete styling. It integrates a virtual mirror for the model, Kick lights for fashion effects and produces all 5 content types: packshot, 360, video, ghost mannequin and lifestyle.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer le Fashion Studio Pro v2 ?', en: 'How much space is needed to install the Fashion Studio Pro v2?' },
        answer: { fr: 'Le Fashion Studio Pro v2 est un equipement majeur avec une empreinte de 847x301 cm et une hauteur de 292 cm. Il necessite un tres grand studio dedie de plus de 30 m2 avec une hauteur sous plafond d\'au moins 3 metres. L\'espace doit inclure les zones de circulation des mannequins, l\'espace scenique de 3x3m et les zones techniques.', en: 'The Fashion Studio Pro v2 is a major piece of equipment with a footprint of 847x301 cm and a height of 292 cm. It requires a very large dedicated studio of over 30 sqm with a ceiling height of at least 3 meters. The space must include model circulation areas, the 3x3m stage space and technical areas.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur le Fashion Studio Pro v2 ?', en: 'How does training on the Fashion Studio Pro v2 work?' },
        answer: { fr: 'La formation PackshotCreator sur le Fashion Studio Pro v2 est la plus complete de notre offre. Elle couvre le miroir virtuel, les Kick lights, la gestion des mannequins vivants, les 5 types de contenu et les workflows de post-production. Finançable par votre OPCO grace a notre certification Qualiopi, prevoyez trois journees pour une maitrise complete.', en: 'PackshotCreator training on the Fashion Studio Pro v2 is the most comprehensive in our offering. It covers the virtual mirror, Kick lights, live model management, all 5 content types and post-production workflows. Fundable by your OPCO thanks to our Qualiopi certification, allow three days for complete mastery.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour le Fashion Studio Pro v2 ?', en: 'What are the financing options for the Fashion Studio Pro v2?' },
        answer: { fr: 'Le Fashion Studio Pro v2 est un investissement premium financable en leasing, location ou achat direct. Pour les maisons de mode, les agences et les grands retailers traitant plus de 15 000 photos par an, il remplace un studio photo traditionnel avec equipe technique. Le gain de productivite (100 produits/jour) et la qualite constante offrent un ROI significatif sur 3 a 5 ans.', en: 'The Fashion Studio Pro v2 is a premium investment available through leasing, rental or direct purchase. For fashion houses, agencies and large retailers processing more than 15,000 photos per year, it replaces a traditional photo studio with technical crew. The productivity gain (100 products/day) and consistent quality offer a significant ROI over 3 to 5 years.' },
      },
    ],
    keyStats: [
      { value: '100', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne en mode fashion professionnel', en: 'Daily production capacity in professional fashion mode' } },
      { value: '3x3m', label: { fr: 'espace scenique', en: 'stage space' }, description: { fr: 'Espace scenique de 9 m2 pour mannequins vivants et styling', en: '9 sqm stage space for live models and styling' } },
      { value: 'Semi', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Semi-automatisation avec outils d\'interaction mannequin', en: 'Semi-automation with model interaction tools' } },
    ],
  },
  {
    id: 'bike-studio',
    nom: 'Bike Studio',
    prix: 89450,
    capaciteJour: 70,
    tailleMax: '200×100×200 cm',
    poidsMax: '35 kg (point) / 200 kg (surface)',
    tailleCategories: ['tres-grand'],
    useCases: ['Vélos', 'Cycles', 'Trottinettes', 'Équipements cyclistes'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 1200,
    dimensionsMax: { l: 200, w: 100, h: 200 },
    poidsMaxKg: 35,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['cycling', 'sports'],
    volumeRange: { min: 3000, max: 20000 },
    keyAdvantages: [
      { fr: 'Système de suspension spécialisé pour vélos', en: 'Specialized suspension system for bikes' },
      { fr: '12 panneaux LED (190 000 lumens total)', en: '12 LED panels (190,000 lumens total)' },
      { fr: 'Support jusqu\'à 5 caméras simultanément', en: 'Support for up to 5 cameras simultaneously' },
    ],
    limitations: [
      { fr: 'Spécialisé vélos uniquement', en: 'Specialized for bikes only' },
      { fr: 'Encombrement important (~25m²)', en: 'Large footprint (~25m²)' },
    ],
    spaceRequired: 'Entrepôt',
    studioFootprint: { l: 847, w: 301, h: 292 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec le Bike Studio ?', en: 'What types of products can be photographed with the Bike Studio?' },
        answer: { fr: 'Le Bike Studio est l\'unique solution au monde specialisee pour la photographie de velos, cycles, trottinettes et equipements cyclistes. Son systeme de suspension brevete maintient le velo en l\'air pour des vues 360 sans support visible. Les 12 panneaux LED (190 000 lumens) assurent un eclairage parfait des cadres, des roues et des composants. Il supporte jusqu\'a 35 kg en charge ponctuelle et 200 kg en charge surfacique.', en: 'The Bike Studio is the world\'s only solution specialized for photographing bicycles, cycles, scooters and cycling equipment. Its patented suspension system holds the bike in the air for 360 views without visible support. The 12 LED panels (190,000 lumens) ensure perfect lighting of frames, wheels and components. It supports up to 35 kg point load and 200 kg surface load.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer le Bike Studio ?', en: 'How much space is needed to install the Bike Studio?' },
        answer: { fr: 'Le Bike Studio necessite un espace de type entrepot avec une empreinte de 847x301 cm et une hauteur de 292 cm. Prevoyez un espace dedie d\'environ 25 m2 avec une hauteur sous plafond de 3 metres minimum et une alimentation electrique adequate pour les 12 panneaux LED. L\'acces doit permettre l\'entree de velos et d\'equipements volumineux.', en: 'The Bike Studio requires a warehouse-type space with a footprint of 847x301 cm and a height of 292 cm. Plan for a dedicated space of about 25 sqm with a minimum ceiling height of 3 meters and adequate electrical supply for the 12 LED panels. Access must allow entry of bikes and bulky equipment.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur le Bike Studio ?', en: 'How does training on the Bike Studio work?' },
        answer: { fr: 'La formation PackshotCreator sur le Bike Studio couvre le systeme de suspension specialise, le reglage des 12 panneaux LED, la gestion multi-cameras (jusqu\'a 5) et les workflows de prise de vue 360 pour velos. Notre certification Qualiopi permet le financement par votre OPCO. Prevoyez deux journees pour une maitrise complete du systeme.', en: 'PackshotCreator training on the Bike Studio covers the specialized suspension system, adjustment of the 12 LED panels, multi-camera management (up to 5) and 360 shooting workflows for bikes. Our Qualiopi certification allows funding through your OPCO. Allow two days for complete mastery of the system.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour le Bike Studio ?', en: 'What are the financing options for the Bike Studio?' },
        answer: { fr: 'Le Bike Studio est financable en leasing, location avec option d\'achat ou acquisition directe. Pour les fabricants de velos, les distributeurs et les plateformes e-commerce cycles traitant plus de 3 000 references par an, il represente un investissement strategique. Les 70 velos par jour et la qualite constante garantissent un retour sur investissement solide face a la sous-traitance photo specialisee.', en: 'The Bike Studio can be financed through leasing, rental with purchase option or direct acquisition. For bike manufacturers, distributors and cycle e-commerce platforms processing more than 3,000 references per year, it represents a strategic investment. The 70 bikes per day and consistent quality guarantee a solid return on investment versus outsourced specialized photography.' },
      },
    ],
    keyStats: [
      { value: '70', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Velos photographies par jour en mode automatise', en: 'Bikes photographed per day in automated mode' } },
      { value: '190K', label: { fr: 'lumens', en: 'lumens' }, description: { fr: '12 panneaux LED totalisant 190 000 lumens pour un eclairage parfait', en: '12 LED panels totaling 190,000 lumens for perfect lighting' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec suspension et rotation specialisees', en: 'Full automation with specialized suspension and rotation' } },
    ],
  },
  {
    id: 'furniture-studio',
    nom: 'Furniture Studio',
    prix: 119450,
    capaciteJour: 60,
    tailleMax: 'Mobilier XXL',
    poidsMax: '500 kg',
    tailleCategories: ['tres-grand'],
    useCases: ['Canapés', 'Lits', 'Mobilier grande taille'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 2000,
    dimensionsMax: { l: 250, w: 200, h: 180 },
    poidsMaxKg: 500,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['furniture', 'appliances'],
    volumeRange: { min: 2000, max: 15000 },
    keyAdvantages: [
      { fr: 'Conçu spécifiquement pour le mobilier lourd', en: 'Specifically designed for heavy furniture' },
      { fr: 'Plateau haute capacité (500kg)', en: 'High capacity turntable (500kg)' },
      { fr: 'Éclairage optimisé pour grands volumes', en: 'Lighting optimized for large volumes' },
    ],
    limitations: [
      { fr: 'Investissement important', en: 'Significant investment' },
      { fr: 'Nécessite grand espace dédié', en: 'Requires large dedicated space' },
    ],
    spaceRequired: 'Entrepôt',
    studioFootprint: { l: 500, w: 400, h: 300 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec le Furniture Studio ?', en: 'What types of products can be photographed with the Furniture Studio?' },
        answer: { fr: 'Le Furniture Studio est concu pour le mobilier de grande taille et les objets lourds jusqu\'a 250x200x180 cm et 500 kg : canapes, lits, armoires, tables, mobilier de bureau et electromenager lourd. Son plateau haute capacite supporte 500 kg, permettant de photographier en 360 les meubles les plus imposants. Il produit des packshots, des vues 360 et des videos de qualite catalogue.', en: 'The Furniture Studio is designed for large furniture and heavy objects up to 250x200x180 cm and 500 kg: sofas, beds, wardrobes, tables, office furniture and heavy appliances. Its high-capacity turntable supports 500 kg, allowing 360 photography of the most imposing furniture. It produces packshots, 360 views and catalog-quality videos.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer le Furniture Studio ?', en: 'How much space is needed to install the Furniture Studio?' },
        answer: { fr: 'Le Furniture Studio necessite un espace de type entrepot avec une empreinte de 500x400 cm et une hauteur de 300 cm. Prevoyez un espace dedie d\'au moins 25 a 30 m2 avec une hauteur sous plafond de 3,5 metres, un sol industriel capable de supporter 500 kg sur le plateau tournant et un acces pour chariot elevateur ou transpalette.', en: 'The Furniture Studio requires a warehouse-type space with a footprint of 500x400 cm and a height of 300 cm. Plan for a dedicated space of at least 25 to 30 sqm with a ceiling height of 3.5 meters, an industrial floor capable of supporting 500 kg on the turntable and access for forklift or pallet truck.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur le Furniture Studio ?', en: 'How does training on the Furniture Studio work?' },
        answer: { fr: 'PackshotCreator assure une formation complete sur le Furniture Studio incluant la manipulation securisee des produits lourds, le reglage de l\'eclairage pour grands volumes et les workflows 360 optimises. En tant qu\'organisme certifie Qualiopi, la formation est finançable par votre OPCO. Prevoyez deux journees pour maitriser l\'equipement et les techniques specifiques au mobilier.', en: 'PackshotCreator provides comprehensive training on the Furniture Studio including safe handling of heavy products, lighting adjustment for large volumes and optimized 360 workflows. As a Qualiopi certified organization, training can be funded by your OPCO. Allow two days to master the equipment and furniture-specific techniques.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour le Furniture Studio ?', en: 'What are the financing options for the Furniture Studio?' },
        answer: { fr: 'Le Furniture Studio est financable en leasing, location ou achat direct. C\'est un investissement majeur justifie par le cout eleve de la photo de mobilier en sous-traitance. Avec 60 meubles par jour et une qualite constante, les fabricants et distributeurs de mobilier traitant plus de 2 000 references par an constatent un retour sur investissement solide sur 2 a 3 ans.', en: 'The Furniture Studio can be financed through leasing, rental or direct purchase. It is a major investment justified by the high cost of outsourced furniture photography. With 60 pieces of furniture per day and consistent quality, furniture manufacturers and distributors processing more than 2,000 references per year see a solid return on investment over 2 to 3 years.' },
      },
    ],
    keyStats: [
      { value: '60', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Meubles photographies par jour en automatique complet', en: 'Furniture pieces photographed per day in fully automatic mode' } },
      { value: '500kg', label: { fr: 'charge max', en: 'max load' }, description: { fr: 'Plateau tournant haute capacite pour mobilier lourd', en: 'High-capacity turntable for heavy furniture' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete pour production en serie de mobilier', en: 'Full automation for furniture batch production' } },
    ],
  },
  {
    id: 'e-comm-studio-plus',
    nom: 'E-Comm Studio+',
    prix: 150000,
    capaciteJour: 150,
    tailleMax: '300×300×200 cm',
    poidsMax: '1000 kg (4000 kg option)',
    tailleCategories: ['tres-grand'],
    useCases: ['Canapés', 'Meubles volumineux', 'Motos', 'Électroménager lourd'],
    maintenanceAnnuelle: 0,
    consommablesAnnuels: 2500,
    dimensionsMax: { l: 300, w: 300, h: 200 },
    poidsMaxKg: 1000,
    features: ['packshot', '360', 'video'],
    automationLevel: 'full-auto',
    idealSectors: ['furniture', 'appliances', 'automotive'],
    volumeRange: { min: 5000, max: 50000 },
    keyAdvantages: [
      { fr: 'Aucune limite de taille pour meubles standards', en: 'No size limit for standard furniture' },
      { fr: 'Plateau supportant 1 tonne (option 4 tonnes)', en: 'Turntable supporting 1 ton (4 ton option)' },
      { fr: 'Plateforme rotative 5m de diamètre', en: '5m diameter rotating platform' },
    ],
    limitations: [
      { fr: 'Nécessite espace et puissance électrique importants (9000W)', en: 'Requires significant space and electrical power (9000W)' },
      { fr: 'Investissement très élevé', en: 'Very high investment' },
    ],
    spaceRequired: 'Entrepôt',
    studioFootprint: { l: 670, w: 588, h: 302 },
    faqItems: [
      {
        question: { fr: 'Quels types de produits peut-on photographier avec l\'E-Comm Studio+ ?', en: 'What types of products can be photographed with the E-Comm Studio+?' },
        answer: { fr: 'L\'E-Comm Studio+ est la solution ultime pour les tres grands produits jusqu\'a 300x300x200 cm : canapes, meubles volumineux, motos, electromenager lourd et tout produit XXL. Son plateau rotatif de 5 metres de diametre supporte 1 tonne (option 4 tonnes). Il produit des packshots, des vues 360 et des videos de qualite e-commerce pour les objets les plus imposants.', en: 'The E-Comm Studio+ is the ultimate solution for very large products up to 300x300x200 cm: sofas, bulky furniture, motorcycles, heavy appliances and any XXL product. Its 5-meter diameter rotating platform supports 1 ton (4-ton option). It produces packshots, 360 views and e-commerce quality videos for the most imposing objects.' },
      },
      {
        question: { fr: 'Quel espace est necessaire pour installer l\'E-Comm Studio+ ?', en: 'How much space is needed to install the E-Comm Studio+?' },
        answer: { fr: 'L\'E-Comm Studio+ necessite un entrepot avec une empreinte de 670x588 cm et une hauteur de 302 cm. Prevoyez un espace d\'environ 40 a 50 m2 avec une alimentation electrique de 9000W, un sol industriel renforce pour supporter le plateau de 1 tonne et un acces pour vehicules et chariots elevateurs. C\'est une installation industrielle a part entiere.', en: 'The E-Comm Studio+ requires a warehouse with a footprint of 670x588 cm and a height of 302 cm. Plan for a space of about 40 to 50 sqm with a 9000W electrical supply, reinforced industrial flooring to support the 1-ton platform and access for vehicles and forklifts. It is a full-scale industrial installation.' },
      },
      {
        question: { fr: 'Comment se deroule la formation sur l\'E-Comm Studio+ ?', en: 'How does training on the E-Comm Studio+ work?' },
        answer: { fr: 'La formation PackshotCreator sur l\'E-Comm Studio+ est la plus avancee de notre offre. Elle couvre la gestion du plateau 5m, les protocoles de securite pour produits lourds, l\'optimisation de l\'eclairage pour grands volumes et les workflows de production en serie. Finançable par votre OPCO via notre certification Qualiopi, prevoyez deux a trois journees de formation.', en: 'PackshotCreator training on the E-Comm Studio+ is the most advanced in our offering. It covers management of the 5m platform, safety protocols for heavy products, lighting optimization for large volumes and batch production workflows. Fundable by your OPCO through our Qualiopi certification, allow two to three days of training.' },
      },
      {
        question: { fr: 'Quelles sont les options de financement pour l\'E-Comm Studio+ ?', en: 'What are the financing options for the E-Comm Studio+?' },
        answer: { fr: 'L\'E-Comm Studio+ est l\'investissement le plus important de la gamme, disponible en leasing, location ou achat direct. Avec 150 produits par jour et la capacite de traiter des objets jusqu\'a 1 tonne (ou 4 tonnes en option), c\'est une solution industrielle qui se justifie pour les grands distributeurs de mobilier, les constructeurs motos et les marques d\'electromenager. Le ROI est calcule sur 3 a 5 ans.', en: 'The E-Comm Studio+ is the most significant investment in the range, available through leasing, rental or direct purchase. With 150 products per day and the ability to handle objects up to 1 ton (or 4 tons as an option), it is an industrial solution justified for large furniture retailers, motorcycle manufacturers and appliance brands. ROI is calculated over 3 to 5 years.' },
      },
    ],
    keyStats: [
      { value: '150', label: { fr: 'produits/jour', en: 'products/day' }, description: { fr: 'Capacite de production quotidienne pour tres grands produits', en: 'Daily production capacity for very large products' } },
      { value: '1T', label: { fr: 'charge plateau', en: 'platform load' }, description: { fr: 'Plateau rotatif de 5m supportant 1 tonne (option 4 tonnes)', en: '5m rotating platform supporting 1 ton (4-ton option)' } },
      { value: '100%', label: { fr: 'automatise', en: 'automated' }, description: { fr: 'Automatisation complete avec plateforme industrielle 5m', en: 'Full automation with 5m industrial platform' } },
    ],
  },
];

// Fonction helper pour trouver une machine par ID
export function getMachineById(id: string): Machine | undefined {
  return MACHINES.find(m => m.id === id);
}

// Fonction helper pour filtrer les machines par catégorie de taille
export function getMachinesBySize(category: ProductSizeCategory): Machine[] {
  return MACHINES.filter(m => m.tailleCategories.includes(category));
}

// Fonction helper pour filtrer les machines par feature
export function getMachinesByFeature(feature: Machine['features'][number]): Machine[] {
  return MACHINES.filter(m => m.features.includes(feature));
}

// Fonction helper pour filtrer les machines par secteur
export function getMachinesBySector(sector: Machine['idealSectors'][number]): Machine[] {
  return MACHINES.filter(m => m.idealSectors.includes(sector));
}
