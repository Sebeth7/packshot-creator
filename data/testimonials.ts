export interface Testimonial {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  dateRelative: string;
  dateISO: string;
  text: string;
  sourceUrl: string;
  categories: ('general' | 'formation' | 'studios')[];
  isLocalGuide?: boolean;
}

export const GMB_URL = 'https://www.google.com/maps/place/PackshotCreator+-+Orbitvu/@45.7013014,5.015408,17z';
export const GMB_AGGREGATE = { ratingValue: 4.7, reviewCount: 83 } as const;

export const testimonials: Testimonial[] = [
  {
    id: 'alexis-ritacco-2026-03',
    name: 'Alexis Ritacco',
    rating: 5,
    dateRelative: 'il y a 2 mois',
    dateISO: '2026-03-08',
    text: 'Très satisfait du service client. Un grand merci à Stéphane Gromand, qui a su me guider de A à Z, et parfois même au-delà de ce qui était attendu.',
    sourceUrl: GMB_URL,
    categories: ['general', 'studios'],
    isLocalGuide: true,
  },
  {
    id: 'pierre-michel-rogozyk-2025-11',
    name: 'Pierre Michel Rogozyk',
    rating: 5,
    dateRelative: 'modifié il y a 6 mois',
    dateISO: '2025-11-08',
    text: "Nous utilisons ce type d'appareils depuis 2010. D'abord sur PackShotCreator puis sur Orbitvu depuis 2018. Orbitvu est à mes yeux incomparable en terme de qualité de rendu et d'intelligence du fonctionnement.",
    sourceUrl: GMB_URL,
    categories: ['general', 'studios'],
    isLocalGuide: true,
  },
  {
    id: 'saima-altunkaya-2025-08',
    name: 'Saima Altunkaya',
    rating: 5,
    dateRelative: 'il y a 9 mois',
    dateISO: '2025-08-08',
    text: "J'ai eu le plaisir de réaliser une séance photo pour une marque de cosmétiques dans les locaux de Packshot Creator en utilisant l'Alphashot Pro G2. L'accueil de Laurent et Stéphane a été exceptionnel.",
    sourceUrl: GMB_URL,
    categories: ['general', 'studios'],
  },
  {
    id: 'manon-facon-2025-05',
    name: 'Manon Facon',
    rating: 5,
    dateRelative: 'il y a 1 an',
    dateISO: '2025-05-08',
    text: "J'ai suivi une formation sur Packshot avec Océane, c'était très intéressant et totalement à la hauteur de mes attentes. La disponibilité, le professionnalisme et le sérieux du service sont tout à fait recommandables.",
    sourceUrl: GMB_URL,
    categories: ['general', 'studios', 'formation'],
  },
  {
    id: 'tiffany-b-2026-04',
    name: 'Tiffany B.',
    rating: 5,
    dateRelative: 'il y a 1 mois',
    dateISO: '2026-04-08',
    text: "J'ai appelé l'assistance dans le cadre professionnel et ils m'ont immédiatement aidé. On a pu débloquer la situation rapidement et facilement. Merci Stéphane.",
    sourceUrl: GMB_URL,
    categories: ['general', 'studios'],
  },
  {
    id: 'remi-brageu-2020-05',
    name: 'Rémi Brageu',
    rating: 5,
    dateRelative: 'il y a 6 ans',
    dateISO: '2020-05-08',
    text: "Utilisateur de Packshot Creator et de la plateforme O3T, je suis pleinement satisfait de cet ensemble. Je fais de la photogrammétrie d'objets et ce dispositif m'a fait gagner un temps précieux.",
    sourceUrl: GMB_URL,
    categories: ['general', 'studios'],
  },
  {
    id: 'samantha-smith-2023-05',
    name: 'Samantha Smith',
    rating: 5,
    dateRelative: 'il y a 3 ans',
    dateISO: '2023-05-08',
    text: 'Nous avons beaucoup apprécié cette formation axée sur le client. Nous en avons tiré de nombreux bénéfices. Caroline était une formatrice formidable !',
    sourceUrl: GMB_URL,
    categories: ['general', 'studios', 'formation'],
  },
  {
    id: 'monique-boullanger-2014-05',
    name: 'Monique Boullanger',
    rating: 5,
    dateRelative: 'il y a 12 ans',
    dateISO: '2014-05-08',
    text: "Voilà une société que je recommande ainsi que son matériel. Le Packshot Creator est sans faille même après plusieurs années. L'équipe commerciale et technique reste toujours à l'écoute.",
    sourceUrl: GMB_URL,
    categories: ['general', 'studios'],
  },
  {
    id: 'sfar-imen-2015-05',
    name: 'Sfar Imen',
    rating: 5,
    dateRelative: 'il y a 11 ans',
    dateISO: '2015-05-08',
    text: "Très bon service client. Un grand merci au formateur (M° Mohsen) pour son service et son expertise, merci pour votre disponibilité et vos conseils.",
    sourceUrl: GMB_URL,
    categories: ['formation'],
  },
  {
    id: 'nicolas-lebreton-2014-05',
    name: 'Nicolas Lebreton',
    rating: 4,
    dateRelative: 'il y a 12 ans',
    dateISO: '2014-05-08',
    text: "Équipe technique Packshot Creator compétente et sympathique (nos besoins matériels et logiciels étaient vraiment spécifiques). Merci au formateur pour son accompagnement et son expertise.",
    sourceUrl: GMB_URL,
    categories: ['formation'],
  },
];

export function getTestimonialsByCategory(category: 'general' | 'formation' | 'studios'): Testimonial[] {
  return testimonials.filter((t) => t.categories.includes(category));
}
