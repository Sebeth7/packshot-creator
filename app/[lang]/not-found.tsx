import Link from 'next/link';
import { Home, Search, BookOpen, Camera, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-8xl font-heading font-bold text-white/20">404</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Page introuvable
        </h1>
        <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Découvrez nos solutions ci-dessous.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <Link
            href="/fr"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors group"
          >
            <Camera className="w-8 h-8 text-very-peri-300 group-hover:text-very-peri-200 transition-colors" />
            <span className="text-white font-medium text-sm">Studios Photo</span>
          </Link>
          <Link
            href="/fr/blog"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors group"
          >
            <BookOpen className="w-8 h-8 text-very-peri-300 group-hover:text-very-peri-200 transition-colors" />
            <span className="text-white font-medium text-sm">Blog</span>
          </Link>
          <Link
            href="/fr/academy"
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors group"
          >
            <GraduationCap className="w-8 h-8 text-very-peri-300 group-hover:text-very-peri-200 transition-colors" />
            <span className="text-white font-medium text-sm">Academy</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 px-6 py-3 bg-very-peri-500 hover:bg-very-peri-600 text-white font-medium rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/fr/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" />
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
