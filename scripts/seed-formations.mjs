import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const formations = [
  {
    _type: 'formation',
    titre: 'IA Photo Produit - Fondation (Niveau 1)',
    slug: { _type: 'slug', current: 'ia-photo-produit-niveau-1' },
    categorie: 'ia',
    niveau: 1,
    format: 'both',
    prix_blended: 650,
    prix_presentiel: 850,
    duree_heures: 7,
    description_courte: 'Maîtrisez BlendAI pour créer des visuels lifestyle professionnels à partir de vos packshots en 1 jour.',
    programme: [
      {
        _type: 'block',
        _key: 'prog1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Module 1: Mindset IA & ROI - Module 2: BlendAI Studio Interface - Module 3: Styles Personnalisés - Module 4: Production Série',
            marks: [],
          },
        ],
      },
    ],
    objectifs: [
      'Générer 10+ visuels lifestyle professionnels',
      'Créer un style personnalisé de marque',
      'Produire des vidéos social media 5-10s',
      'Maîtriser le workflow Quick Mode et Batch Mode',
    ],
    public_cible: 'E-commerce managers, directions marketing, photographes débutants IA',
    prerequis: 'Aucun - Formation adaptée aux débutants',
    eligible_opco: true,
    livrables: [
      '10-12 visuels lifestyle professionnels',
      '1 style personnalisé marque réutilisable',
      '2 vidéos social media',
      'Workflow documenté (PDF)',
      '30 jours support email',
    ],
  },
  {
    _type: 'formation',
    titre: 'IA Photo Produit - Maîtrise Avancée (Niveau 2)',
    slug: { _type: 'slug', current: 'ia-photo-produit-niveau-2' },
    categorie: 'ia',
    niveau: 2,
    format: 'both',
    prix_blended: 1100,
    prix_presentiel: 1500,
    duree_heures: 14,
    description_courte: 'Workflow industriel, batch processing 50-200 SKUs, intégration Photoshop et création 3D à partir de 2D.',
    programme: [
      {
        _type: 'block',
        _key: 'prog2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Module 1: Batch Processing Industriel - Module 2: AI Retouch Série - Module 3: Intégration Photoshop - Module 4: Publicités Multi-Variations - Module 5: Création 3D à partir 2D',
            marks: [],
          },
        ],
      },
    ],
    objectifs: [
      'Traiter 50+ produits en batch cohérent',
      'Maîtriser AI Retouch et variations multiples',
      'Intégrer workflow hybride Photoshop',
      'Créer des modèles 3D simples à partir de packshots',
    ],
    public_cible: 'Professionnels niveau 1 validé, studios photo, agences',
    prerequis: 'Formation Niveau 1 ou équivalent (maîtrise BlendAI de base)',
    eligible_opco: true,
    livrables: [
      '50+ visuels batch cohérents',
      '15 variations publicité',
      '3 visuels finalisés Photoshop pro',
      'Calendrier éditorial 90 jours',
      '60 jours support + 2 lives Q&A',
    ],
  },
  {
    _type: 'formation',
    titre: 'Packshot Photo Produit - Fondation (Niveau 1)',
    slug: { _type: 'slug', current: 'packshot-photo-produit-niveau-1' },
    categorie: 'packshot',
    niveau: 1,
    format: 'presentiel',
    prix_presentiel: 850,
    duree_heures: 7,
    description_courte: 'Maîtrisez la photographie packshot professionnelle : éclairage, composition, retouche et workflow e-commerce.',
    programme: [
      {
        _type: 'block',
        _key: 'prog3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Module 1: Fondamentaux Packshot - Module 2: Éclairage 3-points - Module 3: Retouche Photoshop - Module 4: Workflow Export E-commerce',
            marks: [],
          },
        ],
      },
    ],
    objectifs: [
      'Réaliser un packshot fond blanc conforme Amazon/Cdiscount',
      'Maîtriser l\'éclairage 3-points pour produits',
      'Retoucher avec Photoshop (détourage, ombres portées)',
      'Optimiser workflow et exports multi-formats',
    ],
    public_cible: 'Photographes débutants, e-commerçants, assistants studio',
    prerequis: 'Connaissances Photoshop de base recommandées',
    eligible_opco: true,
    livrables: [
      'Portfolio 15-20 packshots professionnels',
      'Setup éclairage documenté',
      'Actions Photoshop automatisées',
      'Workflow export e-commerce',
    ],
  },
];

async function seedFormations() {
  try {
    console.log('🌱 Seeding formations...');

    for (const formation of formations) {
      const result = await client.create(formation);
      console.log(`✅ Created formation: ${formation.titre} (ID: ${result._id})`);
    }

    console.log('✨ All formations created successfully!');
  } catch (error) {
    console.error('❌ Error seeding formations:', error);
    process.exit(1);
  }
}

seedFormations();
