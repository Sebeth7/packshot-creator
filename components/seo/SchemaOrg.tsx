const SITE_URL = 'https://www.packshot-creator.com';
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const SHOWROOM_ID = `${SITE_URL}/#showroom`;
const PERSON_SEB_ID = `${SITE_URL}/#person-sebastien-jourdan`;
const LOGO_URL = `${SITE_URL}/images/logos/packshot-creator-logo.png`;

interface SchemaOrgProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'PackshotCreator',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    description: 'Distributeur exclusif Orbitvu France & Suisse. Studios photo automatisés, IA BlendAI et formations certifiées Qualiopi.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '254 rue Vendôme',
      addressLocality: 'Lyon',
      postalCode: '69003',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33147426666',
      email: 'sales@sysnext.com',
      contactType: 'sales',
      availableLanguage: ['French', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/packshotcreator-sysnext/',
    ],
    foundingDate: '2004',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    areaServed: ['FR', 'CH', 'BE'],
  };
}

export function websiteSchema(lang: 'fr' | 'en' = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: 'PackshotCreator',
    url: SITE_URL,
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
    publisher: { '@id': ORG_ID },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  brand?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Orbitvu',
    },
    category: product.category,
    manufacturer: {
      '@type': 'Organization',
      name: 'Orbitvu',
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      seller: { '@id': ORG_ID },
    },
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
}) {
  const isNamedAuthor = article.author && article.author !== 'PackshotCreator';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: isNamedAuthor
      ? {
          '@type': 'Person',
          '@id': PERSON_SEB_ID,
          name: article.author,
          jobTitle: 'Dirigeant & Expert Photo Produit',
          url: `${SITE_URL}/fr/a-propos`,
          sameAs: [
            'https://www.linkedin.com/in/sebastienjourdan/',
          ],
          worksFor: { '@id': ORG_ID },
        }
      : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    articleSection: article.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function aggregateRatingSchema(rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PackshotCreator',
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating || 5,
      worstRating: 1,
      reviewCount: rating.reviewCount,
    },
  };
}

export function productWithRatingSchema(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  brand?: string;
  category?: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Orbitvu',
    },
    category: product.category,
    manufacturer: {
      '@type': 'Organization',
      name: 'Orbitvu',
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      seller: { '@id': ORG_ID },
    },
    ...(product.ratingValue && product.reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.ratingValue,
            bestRating: 5,
            worstRating: 1,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };
}

export function itemListSchema(items: { name: string; url: string; position?: number }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position || index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': SHOWROOM_ID,
    name: 'PackshotCreator – Showroom Lyon (Sysnext)',
    image: LOGO_URL,
    url: SITE_URL,
    telephone: '+33147426666',
    email: 'sales@sysnext.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '22 Rue des Frères Lumière',
      addressLocality: 'Saint-Bonnet-de-Mure',
      postalCode: '69720',
      addressCountry: 'FR',
      addressRegion: 'Auvergne-Rhône-Alpes',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.7013014,
      longitude: 5.015408,
    },
    hasMap: 'https://www.google.com/maps?cid=16728861988640520249',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'Belgium' },
    ],
    priceRange: '€€€',
    parentOrganization: { '@id': ORG_ID },
  };
}

export function courseSchema(course: {
  name: string;
  description: string;
  provider?: string;
  url: string;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: course.provider
      ? {
          '@type': 'Organization',
          name: course.provider,
          sameAs: `${SITE_URL}/fr/academy`,
        }
      : { '@id': ORG_ID },
    url: course.url,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      inLanguage: 'fr',
    },
  };
}

export function reviewSchema(review: {
  authorName: string;
  rating: number;
  text: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: review.authorName },
    reviewBody: review.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: review.datePublished,
    itemReviewed: { '@id': ORG_ID },
    publisher: { '@type': 'Organization', name: 'Google' },
  };
}

export function serviceSchema(service: {
  name: string;
  description?: string;
  serviceType?: string;
  url: string;
  areaServed?: string[];
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType || 'Photographie produit automatisée',
    url: service.url,
    provider: { '@id': ORG_ID },
    areaServed: (service.areaServed || ['FR', 'CH', 'BE']).map((code) => ({
      '@type': 'Country',
      name: code,
    })),
    category: service.category,
  };
}
