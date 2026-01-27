import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-white border-t border-neutral-light py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <img
              src="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6682a557f105555299d5aec6_Logo-Packshot-Creator.svg"
              alt="PackshotCreator Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-neutral-medium">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-heading font-semibold text-neutral-dark mb-4">
              {t('footer.industries')}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-medium">
              <li><Link href="/industries/fashion" className="hover:text-[#4c5578]">{t('footer.fashion')}</Link></li>
              <li><Link href="/industries/food" className="hover:text-[#4c5578]">{t('footer.food')}</Link></li>
              <li><Link href="/industries/hightech" className="hover:text-[#4c5578]">{t('footer.hightech')}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-neutral-dark mb-4">
              {t('footer.products')}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-medium">
              <li><Link href="/products/alphashot-pro-g2" className="hover:text-[#4c5578]">{t('footer.alphaShotProG2')}</Link></li>
              <li><Link href="/products/alphashot-micro-v2" className="hover:text-[#4c5578]">{t('footer.alphaShotMicro')}</Link></li>
              <li><Link href="/products/fashion-studio" className="hover:text-[#4c5578]">{t('footer.fashionStudio')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-neutral-dark mb-4">
              Légal
            </h3>
            <ul className="space-y-2 text-sm text-neutral-medium">
              <li><Link href="/mentions-legales" className="hover:text-[#4c5578]">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-[#4c5578]">Confidentialité</Link></li>
              <li><Link href="/a-propos" className="hover:text-[#4c5578]">À propos</Link></li>
            </ul>
          </div>

          {/* Resources (removed - replaced by Legal) */}
          <div className="hidden">
            <h3 className="font-heading font-semibold text-neutral-dark mb-4">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2 text-sm text-neutral-medium">
              <li><Link href="/about" className="hover:text-[#4c5578]">{t('footer.about')}</Link></li>
              <li><Link href="/support" className="hover:text-[#4c5578]">{t('footer.support')}</Link></li>
              <li><Link href="/blog" className="hover:text-[#4c5578]">{t('footer.blog')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-light text-center text-sm text-neutral-medium">
          <p>© {new Date().getFullYear()} PackshotCreator. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
