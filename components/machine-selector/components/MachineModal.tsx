'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import type { Machine, BilingualText } from '../lib/types';

interface MachineModalProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (machine: Machine) => void;
  locale?: 'fr' | 'en';
  showPrice?: boolean;
}

// Fonction pour obtenir le texte bilingue
function getText(text: BilingualText, locale: 'fr' | 'en'): string {
  return text[locale] || text.fr;
}

// Fonction utilitaire pour formater le prix
function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Labels
const FEATURE_LABELS: Record<string, { fr: string; en: string; icon: string }> = {
  'packshot': { fr: 'Packshot', en: 'Packshot', icon: '📷' },
  '360': { fr: 'Vue 360°', en: '360° View', icon: '🔄' },
  'video': { fr: 'Vidéo', en: 'Video', icon: '🎬' },
  'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin', icon: '👤' },
  'flat-lay': { fr: 'Flat-lay', en: 'Flat-lay', icon: '⬇️' },
  'lifestyle': { fr: 'Lifestyle', en: 'Lifestyle', icon: '✨' },
};

const AUTOMATION_LABELS: Record<string, { fr: string; en: string }> = {
  'manual': { fr: 'Manuel', en: 'Manual' },
  'semi-auto': { fr: 'Semi-automatique', en: 'Semi-automatic' },
  'full-auto': { fr: 'Entièrement automatique', en: 'Fully automatic' },
};

export function MachineModal({
  machine,
  isOpen,
  onClose,
  onSelect,
  locale = 'fr',
  showPrice = false,
}: MachineModalProps) {
  const [imageError, setImageError] = useState(false);

  // Reset image error when machine changes
  useEffect(() => {
    setImageError(false);
  }, [machine?.id]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence>
    {isOpen && machine && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{machine.nom}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
              {!imageError && machine.imageUrl ? (
                <Image
                  src={machine.imageUrl}
                  alt={machine.nom}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center text-gray-400">
                    <svg className="w-20 h-20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{machine.nom}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-4">
              {/* Prix */}
              {showPrice && (
                <div className="text-3xl font-bold text-brand-red">
                  {formatPrice(machine.prix)} <span className="text-base font-normal text-gray-500">HT</span>
                </div>
              )}

              {/* Specs principales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {locale === 'fr' ? 'Taille max produit' : 'Max product size'}
                  </div>
                  <div className="font-semibold text-gray-900">{machine.tailleMax}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {locale === 'fr' ? 'Poids max' : 'Max weight'}
                  </div>
                  <div className="font-semibold text-gray-900">{machine.poidsMax}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {locale === 'fr' ? 'Capacité/jour' : 'Capacity/day'}
                  </div>
                  <div className="font-semibold text-gray-900">{machine.capaciteJour} photos</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {locale === 'fr' ? 'Espace requis' : 'Space required'}
                  </div>
                  <div className="font-semibold text-gray-900">{machine.spaceRequired}</div>
                </div>
              </div>

              {/* Automatisation */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {locale === 'fr' ? 'Niveau d\'automatisation' : 'Automation level'}
                </div>
                <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {AUTOMATION_LABELS[machine.automationLevel]?.[locale]}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {locale === 'fr' ? 'Fonctionnalités' : 'Features'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {machine.features.map((feature) => {
                    const label = FEATURE_LABELS[feature];
                    return (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        <span>{label?.icon}</span>
                        <span>{label?.[locale]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Use cases */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {locale === 'fr' ? 'Cas d\'usage idéaux' : 'Ideal use cases'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {machine.useCases.map((useCase, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-sm rounded-full"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Avantages et limitations */}
          <div className="grid md:grid-cols-2 gap-6 p-6 pt-0">
            {/* Avantages */}
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {locale === 'fr' ? 'Points forts' : 'Key advantages'}
              </h3>
              <ul className="space-y-2">
                {machine.keyAdvantages.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-green-900">
                    <span className="text-green-500 mt-0.5">+</span>
                    <span>{getText(advantage, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div className="bg-amber-50 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {locale === 'fr' ? 'À considérer' : 'Considerations'}
              </h3>
              <ul className="space-y-2">
                {machine.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-amber-900">
                    <span className="text-amber-500 mt-0.5">-</span>
                    <span>{getText(limitation, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Volume recommandé */}
          <div className="p-6 pt-0">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                {locale === 'fr' ? 'Volume annuel recommandé' : 'Recommended annual volume'}
              </h3>
              <div className="text-blue-900">
                {machine.volumeRange.min.toLocaleString()} - {machine.volumeRange.max.toLocaleString()} {locale === 'fr' ? 'photos/an' : 'photos/year'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <Link
            href={`/studio-photo/${machine.id}`}
            className="text-sm font-medium text-very-peri-600 hover:text-very-peri-700 transition-colors"
          >
            {locale === 'fr' ? 'Voir la fiche complète →' : 'View full details →'}
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {locale === 'fr' ? 'Fermer' : 'Close'}
            </button>
            {onSelect && (
              <button
                onClick={() => {
                  onSelect(machine);
                  onClose();
                }}
                className="px-6 py-2.5 text-white bg-brand-red rounded-lg hover:bg-brand-red/90 transition-colors font-medium"
              >
                {locale === 'fr' ? 'Sélectionner cette machine' : 'Select this machine'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
    )}
    </AnimatePresence>
  );
}
