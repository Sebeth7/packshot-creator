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
    <section className="relative min-h-[600px] bg-bg-warm-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Contenu texte */}
        <div className="space-y-6">
          <h1 className="font-heading text-5xl lg:text-6xl text-heading-dark leading-tight">
            {t(titleKey)}
          </h1>

          <p className="text-lg lg:text-xl text-text-dark leading-relaxed">
            {t(subtitleKey)}
          </p>

          <div className="pt-4">
            <Button
              asChild
              className="bg-primary-coral hover:bg-primary-coral/90 text-white px-8 py-6 text-lg"
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
