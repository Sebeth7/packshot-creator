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
    name: 'PackshotCreator',
    url: 'https://www.packshot-creator.com',
    logo: 'https://www.packshot-creator.com/images/logos/packshot-creator-logo.svg',
    description: 'Distributeur exclusif Orbitvu France & Suisse. Studios photo automatisés, IA BlendAI et formations certifiées Qualiopi.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2 Rue de la Chaude Rivière, Parc de la Haute Borne',
      addressLocality: 'Villeneuve-d\'Ascq',
      postalCode: '59650',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-3-20-19-90-90',
      contactType: 'sales',
      availableLanguage: ['French', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/packshotcreator/',
    ],
    foundingDate: '2004',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    areaServed: ['FR', 'CH', 'BE'],
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
  author?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || 'PackshotCreator',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PackshotCreator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.packshot-creator.com/images/logos/packshot-creator-logo.svg',
      },
    },
    articleSection: article.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
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
