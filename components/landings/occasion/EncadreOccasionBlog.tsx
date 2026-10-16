import { NavLink as Link } from '@/components/layout/NavLink';
import { liensOccasionServis } from '@/lib/occasion/activation';
import { LIEN_OCCASION, maillageBlogOccasion } from '@/lib/occasion/navigation';

/**
 * Encadré de maillage sous les articles de blog sur l'achat d'occasion, vers la
 * landing « Offres d'occasion » de la même langue (lib/occasion/navigation.ts).
 * Rendu côté serveur, seulement pour les articles listés et seulement si la page
 * est servie (`liensOccasionServis()`) : absent de la production tant que la
 * publication n'est pas autorisée.
 */
export default function EncadreOccasionBlog({ slug, lang }: { slug: string; lang: string }) {
  const texte = maillageBlogOccasion(slug, lang);
  if (!texte || !liensOccasionServis()) return null;
  return (
    <section className="py-10 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 p-6" data-test="maillage-occasion">
          <p className="text-sm text-future-dusk-500 mb-1">{texte.surtitre}</p>
          <Link
            href={LIEN_OCCASION.href}
            className="text-lg font-heading font-semibold text-very-peri-700 hover:text-very-peri-800 transition-colors"
          >
            {texte.lien}
          </Link>
          <p className="mt-2 text-sm text-future-dusk-600">{texte.precision}</p>
        </div>
      </div>
    </section>
  );
}
