import { createClient } from '@sanity/client';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

const formations = [
  // FORMATION 1: Niveau 1 Fondation - Blended
  {
    _type: 'formation',
    titre: 'De Packshot à Lifestyle en 1 Jour - Blended Learning',
    slug: {
      _type: 'slug',
      current: 'niveau-1-fondation-blended',
    },
    categorie: 'packshot',
    niveau: 1,
    format: 'blended',
    prix_blended: 650,
    prix_presentiel: 850,
    duree_heures: 7,
    description_courte:
      'Transformez vos packshots en visuels lifestyle professionnels grâce à l\'IA. Format blended : 4h e-learning + 3h présentiel.',
    programme: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'PHASE 1 - E-LEARNING ASYNCHRONE (4h, 1-2 semaines avant présentiel)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 1 : Mindset IA & ROI (45min)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : Démythification IA photo produit (15min)\n' },
          { _type: 'span', text: '• Vidéo : Calcul ROI réel vs shooting traditionnel (10min)\n' },
          { _type: 'span', text: '• Vidéo : Showcases clients avant/après (10min)\n' },
          {
            _type: 'span',
            text: '• Exercice : Calculer ROI personnel (tableau Excel fourni, 10min)\n',
          },
          { _type: 'span', text: '• Quiz validation : 10 questions (5min)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: 'MODULE 2 : BlendAI Studio - Interface & Premiers Pas (1h15)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Vidéo : Tour interface (Photo Studio, Video Studio, Styles) (15min)\n',
          },
          { _type: 'span', text: '• Vidéo : Workflow Quick Mode détaillé (20min)\n' },
          {
            _type: 'span',
            text: '• Tutoriel interactif : Générer 1er visuel lifestyle guidé (20min)\n',
          },
          {
            _type: 'span',
            text: '• Vidéo : Système crédits et optimisation budget (10min)\n',
          },
          {
            _type: 'span',
            text: '• Exercice obligatoire : Générer 3 visuels lifestyle (10min)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 3 : Styles Personnalisés - DNA de Marque (1h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Vidéo : Importance cohérence marque vs IA générique (12min)\n',
          },
          { _type: 'span', text: '• Vidéo : Méthodologie création style custom (18min)\n' },
          { _type: 'span', text: '• Vidéo : Sélection images références (2-10 images) (10min)\n' },
          {
            _type: 'span',
            text: '• Exercice obligatoire : Créer 1 style custom marque (15min)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 4 : Production Série & Cohérence (1h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : Batch Mode vs Quick Mode (15min)\n' },
          {
            _type: 'span',
            text: '• Vidéo : Variations contextuelles (café, rue, studio...) (15min)\n',
          },
          { _type: 'span', text: '• Vidéo : AI Retouch pour ajustements mineurs (15min)\n' },
          {
            _type: 'span',
            text: '• Exercice obligatoire : Produire mini-série 5 visuels cohérents (15min)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'PHASE 2 - PRÉSENTIEL/VISIO LIVE (3h, demi-journée)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '14h00 - 14h30 | REVUE EXERCICES & Q&A (30min)\n',
            marks: ['strong'],
          },
          { _type: 'span', text: '• Tour de table : présentation participants (5min)\n' },
          { _type: 'span', text: '• Revue collective exercices pré-formation (15min)\n' },
          { _type: 'span', text: '• Q&A déblocages techniques (10min)\n\n' },
          {
            _type: 'span',
            text: '14h30 - 16h00 | WORKSHOP INTENSIF PRODUCTION (1h30)\n',
            marks: ['strong'],
          },
          {
            _type: 'span',
            text: '• Brief : Créer série 10 visuels cohérents (même ambiance, produits variés)\n',
          },
          { _type: 'span', text: '• Production live : Chaque participant travaille sur ses produits\n' },
          {
            _type: 'span',
            text: '• Coaching individualisé : formateur passe voir chacun (5-10min/participant)\n\n',
          },
          {
            _type: 'span',
            text: '16h00 - 16h30 | VIDÉOS SOCIAL MEDIA (30min)\n',
            marks: ['strong'],
          },
          { _type: 'span', text: '• Démo : Transformer image → vidéo 5-10s (10min)\n' },
          { _type: 'span', text: '• Pratique flash : Créer 2 vidéos produit (15min)\n\n' },
          {
            _type: 'span',
            text: '16h30 - 17h00 | RETOUCHE & PLAN D\'ACTION (30min)\n',
            marks: ['strong'],
          },
          { _type: 'span', text: '• Plan d\'action 30 jours : Workflow répétable\n' },
          { _type: 'span', text: '• Présentation Niveau 2 + offre BlendAI Studio' },
        ],
      },
    ],
    objectifs: [
      'Maîtriser l\'interface BlendAI Studio et générer vos premiers visuels lifestyle en moins de 5 minutes',
      'Créer un style visuel personnalisé reflétant l\'identité de votre marque',
      'Produire 10-12 visuels professionnels cohérents pour vos campagnes marketing',
      'Transformer vos packshots en vidéos courtes optimisées pour les réseaux sociaux',
      'Calculer et justifier le ROI de l\'IA photo produit pour convaincre votre direction',
    ],
    public_cible:
      'E-commerçants, photographes packshot, responsables marketing, équipes créatives cherchant à accélérer leur production visuelle avec l\'IA',
    prerequis: 'Aucun prérequis technique. Ordinateur avec connexion internet stable.',
    eligible_opco: true,
    livrables: [
      '10-12 visuels lifestyle professionnels créés pendant la formation',
      '2 vidéos social media 5-10s prêtes à publier',
      '1 style personnalisé marque réutilisable',
      'Workflow documenté (PDF téléchargeable)',
      'Calculateur ROI (Excel template)',
      '30 jours accès e-learning post-formation',
      '30 jours support email formateur',
    ],
  },

  // FORMATION 2: Niveau 1 Fondation - Présentiel
  {
    _type: 'formation',
    titre: 'De Packshot à Lifestyle en 1 Jour - Présentiel Premium',
    slug: {
      _type: 'slug',
      current: 'niveau-1-fondation-presentiel',
    },
    categorie: 'packshot',
    niveau: 1,
    format: 'presentiel',
    prix_blended: null,
    prix_presentiel: 850,
    duree_heures: 7,
    description_courte:
      'Journée intensive présentielle : interactions maximales, coaching 1:1 personnalisé, networking premium et livrables supérieurs.',
    programme: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Programme Journée Complète (9h-17h)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '09h00 - 09h30 | ACCUEIL & MINDSET IA (30min)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Café + networking participants\n' },
          { _type: 'span', text: '• Présentation + démythification IA (version enrichie)\n' },
          { _type: 'span', text: '• ROI calculé ensemble (interactif)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '09h30 - 11h00 | BLENDAI STUDIO - PRISE EN MAIN GUIDÉE (1h30)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Interface + workflow (version longue, tous les détails)\n' },
          {
            _type: 'span',
            text: '• Hands-on immédiat : Chaque participant génère 5 visuels lifestyle\n',
          },
          {
            _type: 'span',
            text: '• Coaching 1:1 : formateur aide chacun individuellement (15-20min total/participant)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '11h00 - 11h15 | PAUSE CAFÉ' }],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '11h15 - 12h30 | STYLES PERSONNALISÉS - ATELIER (1h15)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Méthodologie approfondie (cas multiples)\n' },
          {
            _type: 'span',
            text: '• Workshop collaboratif : Création style en groupe + styles individuels\n',
          },
          { _type: 'span', text: '• Critique constructive styles (peer review)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '12h30 - 13h30 | DÉJEUNER (inclus - networking)' }],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '13h30 - 15h00 | PRODUCTION SÉRIE INTENSIVE (1h30)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Challenge : Produire 15-20 visuels cohérents\n' },
          { _type: 'span', text: '• Coaching continu formateur\n' },
          { _type: 'span', text: '• Variations avancées (contextes multiples)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '15h00 - 15h15 | PAUSE' }],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '15h15 - 16h15 | RETOUCHE HYBRIDE IA + MANUELLE (1h)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Workflow Photoshop léger (démonstration approfondie)\n' },
          { _type: 'span', text: '• Brief retouche experte : comment demander (exemples réels)\n' },
          { _type: 'span', text: '• Démo retouche complexe live (bijou ou lunettes)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '16h15 - 16h50 | VIDÉOS SOCIAL MEDIA AVANCÉES (35min)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Créer 3-4 vidéos différents formats\n' },
          { _type: 'span', text: '• Optimisations avancées (transitions, effets)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '16h50 - 17h00 | CERTIFICATION & PLAN D\'ACTION (10min)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Remise certificat Qualiopi\n' },
          { _type: 'span', text: '• Plan 30-60-90 jours personnalisé\n' },
          { _type: 'span', text: '• Networking final + photo groupe' },
        ],
      },
    ],
    objectifs: [
      'Maîtriser l\'interface BlendAI Studio avec coaching 1:1 personnalisé',
      'Créer un style visuel personnalisé ET un style collaboratif de groupe',
      'Produire 15-20 visuels professionnels cohérents (plus qu\'en blended)',
      'Transformer vos packshots en 3-4 vidéos courtes optimisées pour les réseaux sociaux',
      'Découvrir les workflows hybrides IA + Photoshop pour la retouche avancée',
    ],
    public_cible:
      'E-commerçants, photographes packshot, responsables marketing privilégiant les interactions maximales et le networking premium',
    prerequis: 'Aucun prérequis technique. Ordinateur portable recommandé.',
    eligible_opco: true,
    livrables: [
      '15-20 visuels lifestyle professionnels (plus qu\'en blended)',
      '3-4 vidéos social media prêtes à publier',
      '1 style personnalisé marque + 1 style collaboratif groupe',
      'Déjeuner networking inclus (valeur 25€)',
      'Certificat Qualiopi physique remis en main propre',
      '60 jours support email formateur (vs 30j blended)',
      '1 call de suivi personnalisé 30min à J+15 (exclusif présentiel)',
    ],
  },

  // FORMATION 3: Niveau 2 Maîtrise - Blended
  {
    _type: 'formation',
    titre: 'Workflow Industriel & Technologies 3D - Blended Learning',
    slug: {
      _type: 'slug',
      current: 'niveau-2-maitrise-blended',
    },
    categorie: 'packshot',
    niveau: 2,
    format: 'blended',
    prix_blended: 1100,
    prix_presentiel: 1500,
    duree_heures: 14,
    description_courte:
      'Passez à l\'échelle avec le batch processing industriel, Photoshop hybride et création 3D. 8h e-learning + 6h présentiel intensif.',
    programme: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'PHASE 1 - E-LEARNING ASYNCHRONE (8h, 2 semaines avant)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 1 : Batch Processing Industriel (2h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : Différence Quick vs Batch Mode (20min)\n' },
          { _type: 'span', text: '• Vidéo : Méthodologie traiter 50-200 SKUs (30min)\n' },
          { _type: 'span', text: '• Vidéo : Préparation fichiers (naming, organisation) (20min)\n' },
          { _type: 'span', text: '• Vidéo : Gestion variations (même produit, 5 contextes) (20min)\n' },
          { _type: 'span', text: '• Exercice : Batch 30 produits fictifs fournis (30min)\n' },
          { _type: 'span', text: '• Quiz validation (10min)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 2 : AI Retouch Série & Cohérence (1h30)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : AI Retouch variations (poses multiples) (25min)\n' },
          { _type: 'span', text: '• Vidéo : Créer familles visuelles cohérentes (20min)\n' },
          { _type: 'span', text: '• Cas pratique : Série bijoux (10 produits) (30min)\n' },
          { _type: 'span', text: '• Exercice : Créer famille 8 produits (15min)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: 'MODULE 3 : Intégration Photoshop (Workflow Hybride) (2h)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : Export BlendAI → Photoshop (15min)\n' },
          { _type: 'span', text: '• Vidéo : Masking précis produits complexes (30min)\n' },
          { _type: 'span', text: '• Vidéo : Compositing multi-layers (25min)\n' },
          { _type: 'span', text: '• Vidéo : Color grading professionnel (20min)\n' },
          { _type: 'span', text: '• Exercice : Finaliser 2 visuels complexes (30min)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 4 : Publicités Multi-Variations (1h30)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : Créer 10-20 variations pub (25min)\n' },
          { _type: 'span', text: '• Vidéo : A/B testing visuel (15min)\n' },
          { _type: 'span', text: '• Vidéo : Formats pub (Meta, Google, Pinterest) (20min)\n' },
          { _type: 'span', text: '• Exercice : Campagne 10 variations (30min)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 5 : Création 3D à partir 2D (1h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéo : Introduction 3D & ROI (15min)\n' },
          { _type: 'span', text: '• Vidéo : Technologies 2D→3D accessibles (20min)\n' },
          { _type: 'span', text: '• Démonstration : Packshot → modèle 3D (15min)\n' },
          { _type: 'span', text: '• Exercice : Tenter créer 1 modèle 3D simple (10min, optionnel)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'PHASE 2 - PRÉSENTIEL/VISIO LIVE (1 journée, 6h)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '09h00 - 09h30 | REVUE PROJETS & TROUBLESHOOTING (30min)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '09h30 - 11h30 | WORKSHOP PHOTOSHOP HYBRIDE AVANCÉ (2h)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Cas complexes : bijoux détails (pierres, reflets)\n' },
          { _type: 'span', text: '• Pratique : Chacun finalise 3 visuels niveau publication\n' },
          { _type: 'span', text: '• Coaching individualisé formateur' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '11h45 - 13h00 | STRATÉGIE CONTENU 12 MOIS (1h15)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Framework calendrier éditorial visuel\n' },
          { _type: 'span', text: '• Répartition formats optimale (statique/vidéo)\n' },
          { _type: 'span', text: '• Cohérence multi-canal (Instagram/Site/Amazon)\n' },
          { _type: 'span', text: '• Workshop : Créer calendrier 3 mois (template fourni)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          { _type: 'span', text: '14h00 - 15h30 | VIDÉOS AVANCÉES & 3D PRATIQUE (1h30)' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Vidéos Pro 1080p vs Standard 720p\n' },
          { _type: 'span', text: '• Atelier : Créer 2 vidéos Pro 1080p\n' },
          { _type: 'span', text: '• Démo 3D live : Créer modèle 3D simple\n' },
          { _type: 'span', text: '• Export formats 3D (GLB, OBJ, USDZ)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '15h45 - 16h30 | ROI & BUSINESS CASE (45min)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Calculer ROI précis (temps, coûts, conversions)\n' },
          { _type: 'span', text: '• Template business case Direction/DAF\n' },
          { _type: 'span', text: '• Exercice : Business case personnel (chiffres entreprise)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '16h30 - 17h00 | FINALISATION PROJET FIL ROUGE & CERTIFICATION (30min)',
          },
        ],
      },
    ],
    objectifs: [
      'Maîtriser le batch processing industriel pour traiter 50-200 SKUs efficacement',
      'Intégrer Photoshop dans votre workflow IA pour des retouches niveau publication',
      'Créer 15 variations publicitaires cohérentes pour vos campagnes A/B testing',
      'Découvrir la création 3D à partir de packshots 2D',
      'Construire un calendrier éditorial visuel 90 jours exécutable',
    ],
    public_cible:
      'E-commerçants avec catalogues importants (50+ SKUs), équipes créatives, photographes souhaitant industrialiser leur production',
    prerequis:
      'Avoir suivi Niveau 1 ou avoir des bases IA photo produit. Connaissances Photoshop recommandées.',
    eligible_opco: true,
    livrables: [
      '50+ visuels batch cohérents produits en formation',
      '15 variations publicité campagne complète',
      '3 visuels finalisés Photoshop niveau pro',
      '2 vidéos Pro 1080p',
      '1 modèle 3D simple (démo)',
      'Calendrier éditorial 90 jours prêt à exécuter',
      'Business case ROI présentable à votre direction',
      '60 jours support email + 2 lives Q&A groupe',
    ],
  },

  // FORMATION 4: Niveau 2 Maîtrise - Présentiel
  {
    _type: 'formation',
    titre: 'Workflow Industriel & Technologies 3D - Présentiel Premium',
    slug: {
      _type: 'slug',
      current: 'niveau-2-maitrise-presentiel',
    },
    categorie: 'packshot',
    niveau: 2,
    format: 'presentiel',
    prix_blended: null,
    prix_presentiel: 1500,
    duree_heures: 14,
    description_courte:
      '2 jours intensifs ultra-personnalisés : batch industriel, Photoshop avancé, 3D, stratégie. Groupe restreint 6 participants max.',
    programme: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Programme 2 Jours Complets (14h)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'JOUR 1 - BATCH & WORKFLOWS (7h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Batch processing approfondi (2h vs 1h30 blended)\n' },
          { _type: 'span', text: '• AI Retouch avancé avec cas multiples (1h30)\n' },
          { _type: 'span', text: '• Déjeuner inclus + networking (1h)\n' },
          {
            _type: 'span',
            text: '• Photoshop hybride (2h vs 1h30 blended, plus de pratique)\n',
          },
          { _type: 'span', text: '• Publicités multi-variations (1h30)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'JOUR 2 - 3D, VIDÉOS & STRATÉGIE (7h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• 3D approfondi : 2-3 modèles créés (2h vs 1h blended)\n' },
          { _type: 'span', text: '• Vidéos avancées + shoppable videos (1h30)\n' },
          { _type: 'span', text: '• Déjeuner inclus + networking (1h)\n' },
          { _type: 'span', text: '• Stratégie contenu 12 mois (1h30)\n' },
          { _type: 'span', text: '• ROI & business case (1h)\n' },
          { _type: 'span', text: '• Projets personnels + feedback (1h, exclusif présentiel)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'BONUS PRÉSENTIEL' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• 2 déjeuners networking inclus (valeur 50€)\n' },
          {
            _type: 'span',
            text: '• 3 calls suivi 30min (J+15, J+30, J+60 vs 2 lives groupe blended)\n',
          },
          { _type: 'span', text: '• Accès 90 jours support (vs 60j blended)\n' },
          { _type: 'span', text: '• Certificat physique + photo groupe\n' },
          { _type: 'span', text: '• Networking alumni (groupe privé LinkedIn)' },
        ],
      },
    ],
    objectifs: [
      'Maîtriser le batch processing industriel avec coaching intensif 2 jours',
      'Créer 2-3 modèles 3D complets (vs démo blended)',
      'Finaliser 5 visuels Photoshop niveau publication',
      'Construire une stratégie contenu visuel 12 mois complète',
      'Présenter un business case ROI convaincant à votre direction',
    ],
    public_cible:
      'E-commerçants catalogues importants, photographes pro, équipes marketing privilégiant formation intensive et networking exclusif',
    prerequis:
      'Avoir suivi Niveau 1 ou avoir des bases IA photo produit. Photoshop recommandé.',
    eligible_opco: true,
    livrables: [
      '60+ visuels batch (vs 50+ blended)',
      '20 variations pub (vs 15 blended)',
      '5 visuels Photoshop pro (vs 3 blended)',
      '3 vidéos Pro 1080p (vs 2 blended)',
      '2-3 modèles 3D (vs 1 démo blended)',
      'Calendrier 12 mois (vs 90j blended)',
      'Business case + présentation PowerPoint',
      '90 jours support + 3 calls 1:1 personnalisés',
    ],
  },

  // FORMATION 5: Niveau 3 Expert - Présentiel seul
  {
    _type: 'formation',
    titre: 'Stratégie Visuelle IA & Optimisation Avancée - Expert',
    slug: {
      _type: 'slug',
      current: 'niveau-3-expert-presentiel',
    },
    categorie: 'packshot',
    niveau: 3,
    format: 'presentiel',
    prix_blended: null,
    prix_presentiel: 1800,
    duree_heures: 14,
    description_courte:
      'Formation expert 2 jours : audit marque, stratégie omnicanal, consulting externe. Format mentorat intensif, groupe 4-6 max.',
    programme: [
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'JOUR 1 - AUDIT & OPTIMISATION (7h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Positionnement expert (45min)\n' },
          { _type: 'span', text: '• Audit visuel marque - méthodologie (1h30)\n' },
          { _type: 'span', text: '• Optimisation workflows complexes (1h15)\n' },
          { _type: 'span', text: '• Déjeuner inclus (1h)\n' },
          { _type: 'span', text: '• Outils IA complémentaires écosystème (1h30)\n' },
          { _type: 'span', text: '• Gestion projets IA complexes (1h30)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'JOUR 2 - STRATÉGIE & CONSULTING (7h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Stratégie contenu omnicanal 12 mois (1h30)\n' },
          { _type: 'span', text: '• Mesure performance & optimisation (1h15)\n' },
          { _type: 'span', text: '• Déjeuner inclus (1h)\n' },
          { _type: 'span', text: '• Formation interne & change management (1h15)\n' },
          { _type: 'span', text: '• Consulting externe & positionnement marché (1h15)\n' },
          { _type: 'span', text: '• Projets personnels + mentorat (1h)' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'BONUS NIVEAU 3' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• 2 déjeuners inclus\n' },
          { _type: 'span', text: '• 6 mois mentorat : 1 appel/mois 30min (vs 90j N2)\n' },
          { _type: 'span', text: '• Accès alumni network privé\n' },
          { _type: 'span', text: '• Certification Expert Packshot-Creator (badge LinkedIn)\n' },
          { _type: 'span', text: '• Opportunités co-consulting (missions partagées)' },
        ],
      },
    ],
    objectifs: [
      'Réaliser des audits visuels complets de marques avec méthodologie éprouvée',
      'Construire une stratégie visuelle omnicanal 12 mois exécutable',
      'Optimiser des workflows IA complexes multi-outils (BlendAI, Midjourney, Photoshop...)',
      'Structurer une offre consulting IA photo produit commercialisable',
      'Former vos équipes internes et gérer le change management',
    ],
    public_cible:
      'Consultants, photographes experts, responsables marketing senior souhaitant monétiser leur expertise IA photo produit',
    prerequis:
      'Avoir suivi Niveau 2 OU avoir 6+ mois expérience intensive IA photo produit. Maîtrise Photoshop requise.',
    eligible_opco: true,
    livrables: [
      '2 rapports audit marques complets (méthodologie réutilisable)',
      'Workflow automatisé personnalisé (schéma + doc technique)',
      'Stratégie visuelle 12 mois exécutable',
      'Dashboard KPIs performance (Google Sheets/Looker)',
      'Offre consulting structurée commercialisable',
      'Plan formation équipe interne',
      '6 mois mentorat (6 calls 30min mensuels)',
      'Certification Expert + badge LinkedIn officiel',
    ],
  },

  // FORMATION 6: E-learning Autonome
  {
    _type: 'formation',
    titre: 'Niveau 1 IA Autonome - E-learning Pur',
    slug: {
      _type: 'slug',
      current: 'elearning-autonome-niveau-1',
    },
    categorie: 'ia',
    niveau: 1,
    format: 'blended',
    prix_blended: 450,
    prix_presentiel: null,
    duree_heures: 4,
    description_courte:
      'Formation 100% e-learning à votre rythme + 2 calls 1:1 personnalisés. Idéal profils autonomes et petits budgets.',
    programme: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Contenu E-learning (4h à votre rythme)',
            marks: ['strong'],
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 1 : Mindset IA & ROI (45min)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Démythification IA photo produit\n' },
          { _type: 'span', text: '• Calcul ROI réel vs shooting traditionnel\n' },
          { _type: 'span', text: '• Showcases clients avant/après\n' },
          { _type: 'span', text: '• Exercice : Calculer votre ROI personnel' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 2 : BlendAI Studio Interface (1h15)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Tour complet interface\n' },
          { _type: 'span', text: '• Workflow Quick Mode détaillé\n' },
          { _type: 'span', text: '• Tutoriel interactif : 1er visuel lifestyle\n' },
          { _type: 'span', text: '• Système crédits et optimisation budget' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 3 : Styles Personnalisés (1h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Importance cohérence marque\n' },
          { _type: 'span', text: '• Méthodologie création style custom\n' },
          { _type: 'span', text: '• Sélection images références\n' },
          { _type: 'span', text: '• Exercice : Créer votre style marque' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'MODULE 4 : Production Série (1h)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Batch Mode vs Quick Mode\n' },
          { _type: 'span', text: '• Variations contextuelles\n' },
          { _type: 'span', text: '• AI Retouch ajustements\n' },
          { _type: 'span', text: '• Exercice : Mini-série 5 visuels cohérents' },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '2 CALLS 1:1 PERSONNALISÉS (30min chacun)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Call 1 (J+7) : Déblocage technique, revue premiers visuels\n',
          },
          { _type: 'span', text: '• Call 2 (J+21) : Optimisation workflow, plan d\'action 30 jours' },
        ],
      },
    ],
    objectifs: [
      'Maîtriser BlendAI Studio en autonomie totale à votre rythme',
      'Créer un style visuel personnalisé pour votre marque',
      'Produire vos premiers visuels lifestyle professionnels',
      'Calculer et justifier le ROI de l\'IA photo produit',
    ],
    public_cible:
      'Profils très autonomes, petits budgets, freelances, micro-entreprises, entrepreneurs solos',
    prerequis: 'Aucun. Grande autonomie et rigueur requises.',
    eligible_opco: true,
    livrables: [
      '4h e-learning vidéos accessibles 30 jours',
      '2 calls 1:1 personnalisés 30min (J+7 et J+21)',
      'Exercices pratiques guidés',
      'Templates et outils (calculateur ROI, workflow)',
      '30 jours support email',
    ],
  },
];

async function createFormations() {
  console.log('🚀 Début création des 6 formations...\n');

  for (const [index, formation] of formations.entries()) {
    try {
      const result = await client.create(formation);
      console.log(`✅ Formation ${index + 1}/6 créée : "${formation.titre}"`);
      console.log(`   ID: ${result._id}`);
      console.log(`   Slug: ${formation.slug.current}\n`);
    } catch (error) {
      console.error(`❌ Erreur création formation ${index + 1}/6:`, error);
    }
  }

  console.log('✅ Création des 6 formations terminée !');
  console.log('\n📍 Accéder aux formations : http://localhost:3000/studio/structure/formation');
}

createFormations();
