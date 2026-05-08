import { Star } from 'lucide-react';
import SchemaOrg, { reviewSchema } from '@/components/seo/SchemaOrg';
import { GMB_URL, GMB_AGGREGATE, type Testimonial } from '@/data/testimonials';

interface Props {
  items: Testimonial[];
  lang: 'fr' | 'en';
  headline?: string;
  subhead?: string;
}

export default function TestimonialsSection({ items, lang, headline, subhead }: Props) {
  const isFr = lang === 'fr';
  const defaultHeadline = isFr ? 'Ce que disent nos clients' : 'What our clients say';
  const defaultSub = isFr
    ? 'Une sélection d\'avis publiés sur Google par nos clients.'
    : 'A selection of reviews published on Google by our clients.';

  const schemas = items.map((t) =>
    reviewSchema({
      authorName: t.name,
      rating: t.rating,
      text: t.text,
      datePublished: t.dateISO,
    })
  );

  return (
    <section className="py-20 lg:py-28 bg-future-dusk-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-heading-dark mb-4">
            {headline || defaultHeadline}
          </h2>
          <p className="text-lg text-future-dusk-600 max-w-2xl mx-auto">
            {subhead || defaultSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <article
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col"
            >
              <div
                className="flex items-center gap-1 mb-3"
                aria-label={isFr ? `Note : ${t.rating} étoiles sur 5` : `Rating: ${t.rating} stars out of 5`}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`}
                  />
                ))}
              </div>
              <blockquote className="text-future-dusk-700 leading-relaxed mb-4 flex-1">
                « {t.text} »
              </blockquote>
              <footer className="text-sm text-future-dusk-500 pt-4 border-t border-neutral-100">
                <div className="font-semibold text-future-dusk-800">
                  {t.name}
                  {t.isLocalGuide && (
                    <span className="ml-2 text-xs font-normal text-very-peri-500">
                      Local Guide
                    </span>
                  )}
                </div>
                <div className="text-xs">{t.dateRelative}</div>
              </footer>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 text-sm text-future-dusk-500">
          {isFr
            ? `Avis publiés sur Google — Packshot Creator (${GMB_AGGREGATE.ratingValue.toString().replace('.', ',')}/5 sur ${GMB_AGGREGATE.reviewCount} avis). `
            : `Reviews published on Google — Packshot Creator (${GMB_AGGREGATE.ratingValue}/5 over ${GMB_AGGREGATE.reviewCount} reviews). `}
          <a
            href={GMB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-very-peri-500 hover:underline font-medium"
          >
            {isFr ? 'Voir tous les avis sur Google' : 'See all Google reviews'}
          </a>
        </div>
      </div>

      <SchemaOrg schema={schemas} />
    </section>
  );
}
