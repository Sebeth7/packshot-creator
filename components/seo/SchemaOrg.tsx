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
    '@id': 'https://www.packshot-creator.com/#organization',
    name: 'PackshotCreator',
    url: 'https://www.packshot-creator.com',
    logo: 'https://www.packshot-creator.com/images/logos/packshot-creator-logo.png',
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
      'https://www.linkedin.com/company/packshotcreator/',
    ],
    foundingDate: '2004',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    areaServed: ['FR', 'CH', 'BE'],
    subOrganization: {
      '@type': 'Organization',
      '@id': 'https://www.packshot-creator.com/industrie-solutions/#organization',
      name: 'Sysnext Industrial Solutions',
      url: 'https://www.packshot-creator.com/industrie-solutions',
    },
  };
}

/**
 * Schéma Organization pour Sysnext Industrial Solutions.
 *
 * Entité distincte de PackshotCreator, reliée par parentOrganization.
 * À utiliser EXCLUSIVEMENT sur les pages sous /[lang]/industrie-solutions/*.
 * Règle R6 du contrat d'étanchéité de cohabitation (DR-011 + DR-012).
 * Source : config/cohabitation-marques.md §3 R6.
 */
export function sysnextOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.packshot-creator.com/industrie-solutions/#organization',
    name: 'Sysnext Industrial Solutions',
    alternateName: 'Sysnext',
    url: 'https://www.packshot-creator.com/industrie-solutions',
    logo: 'https://www.packshot-creator.com/images/logos/sysnext-industrial-solutions-logo.png',
    description:
      "Documentation visuelle industrielle standardisée. Stations Orbitvu pilotées par Templates verrouillés, intégrées ERP/PIM/GMAO, utilisables par un opérateur non-photographe. Aftermarket auto, SAV outillage, QC inspection, MRO aéronautique civile, forensique, dispositifs médicaux.",
    slogan: 'La documentation visuelle industrielle standardisée',
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
      email: 'industriel@sysnext.com',
      contactType: 'sales',
      availableLanguage: ['French', 'English'],
      areaServed: ['FR', 'CH'],
    },
    sameAs: [
      'https://www.linkedin.com/showcase/sysnext-industrial-solutions/',
    ],
    parentOrganization: {
      '@type': 'Organization',
      '@id': 'https://www.packshot-creator.com/#organization',
      name: 'PackshotCreator',
      url: 'https://www.packshot-creator.com',
    },
    areaServed: ['FR', 'CH'],
    audience: {
      '@type': 'BusinessAudience',
      name: 'Industrial decision-makers',
      audienceType: 'B2B',
    },
    knowsAbout: [
      'AS9100',
      'IATF 16949',
      'ISO 13485',
      'AS9102 First Article Inspection',
      'EN 9110',
      'EASA Part 145',
      'IPC-A-610',
      'GMP',
      'Documentation visuelle industrielle',
      'Orbitvu',
      'Aftermarket automobile',
      'MRO aéronautique civile',
      "Contrôle qualité inspection visuelle",
      'Forensique civile',
      'Dispositifs médicaux',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PackshotCreator',
    url: 'https://www.packshot-creator.com',
    inLanguage: ['fr', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'PackshotCreator',
    },
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
          name: article.author,
          jobTitle: 'Dirigeant & Expert Photo Produit',
          url: 'https://www.packshot-creator.com/fr/a-propos',
          sameAs: [
            'https://www.linkedin.com/in/sebastienjourdan/',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'PackshotCreator / Sysnext',
          },
        }
      : {
          '@type': 'Organization',
          name: 'PackshotCreator',
          url: 'https://www.packshot-creator.com',
        },
    publisher: {
      '@type': 'Organization',
      name: 'PackshotCreator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.packshot-creator.com/images/logos/packshot-creator-logo.png',
      },
    },
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
    url: 'https://www.packshot-creator.com',
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
    '@type': 'LocalBusiness',
    '@id': 'https://www.packshot-creator.com/#business',
    name: 'PackshotCreator (Sysnext)',
    image: 'https://www.packshot-creator.com/images/logos/packshot-creator-logo.png',
    url: 'https://www.packshot-creator.com',
    telephone: '+33147426666',
    email: 'sales@sysnext.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '254 rue Vendôme',
      addressLocality: 'Lyon',
      postalCode: '69003',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.7580,
      longitude: 4.8320,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    priceRange: '€€€',
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
    provider: {
      '@type': 'Organization',
      name: course.provider || 'PackshotCreator Academy',
      sameAs: 'https://www.packshot-creator.com/fr/academy',
    },
    url: course.url,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      inLanguage: 'fr',
    },
  };
}
