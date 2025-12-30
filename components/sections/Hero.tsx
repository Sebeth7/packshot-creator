import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeroProps {
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
  ctaHref?: string;
  images?: {
    src: string;
    alt: string;
  }[];
}

export default function Hero({
  titleKey = 'hero.title',
  subtitleKey = 'hero.subtitle',
  ctaKey = 'hero.cta',
  ctaHref = '/contact',
  images = []
}: HeroProps) {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-[600px] bg-neutral-lighter py-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Contenu texte */}
        <div className="space-y-6">
          {/* Badge Distributeur exclusif (OR) */}
          <div className="inline-block">
            <span className="bg-accent-gold text-white font-heading font-semibold text-sm px-4 py-2 rounded-full inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="font-heading text-5xl lg:text-6xl text-neutral-dark leading-tight">
            {t(titleKey)}
          </h1>

          <p className="text-lg lg:text-xl text-neutral-medium leading-relaxed">
            {t(subtitleKey)}
          </p>

          <div className="pt-4">
            <Button
              asChild
              className="bg-primary-turquoise hover:bg-primary-dark text-white px-8 py-6 text-lg"
            >
              <a href={ctaHref}>
                {t(ctaKey)}
              </a>
            </Button>
          </div>
        </div>

        {/* Images produits */}
        {images.length > 0 && (
          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Image principale (dernière de la liste) */}
              {images[images.length - 1] && (
                <div className="relative w-full h-full">
                  <Image
                    src={images[images.length - 1].src}
                    alt={images[images.length - 1].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
