'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Download, Check } from 'lucide-react';
import type { CalculationResults } from '../lib/types';

interface EmailCaptureProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
  onSendPDF: (email: string) => Promise<void>;
}

const LABELS = {
  fr: {
    title: 'Recevez votre analyse complète par email',
    subtitle: 'PDF détaillé avec tous les calculs et la machine recommandée',
    placeholder: 'votre@email.com',
    submit: 'Recevoir le PDF',
    sending: 'Envoi...',
    success: 'Votre analyse ROI a été envoyée !',
    errorInvalid: 'Email invalide',
    errorSending: "Erreur lors de l'envoi",
  },
  en: {
    title: 'Receive your complete analysis by email',
    subtitle: 'Detailed PDF with all calculations and recommended machine',
    placeholder: 'your@email.com',
    submit: 'Get PDF',
    sending: 'Sending...',
    success: 'Your ROI analysis has been sent!',
    errorInvalid: 'Invalid email',
    errorSending: 'Error sending',
  },
};

export default function EmailCapture({ results, locale, onSendPDF }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const t = LABELS[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError(t.errorInvalid);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSendPDF(email);
      setIsSent(true);

      // Track event (structure Pipedrive-ready)
      if (typeof window !== 'undefined') {
        // Prêt pour intégration Pipedrive
        console.log('[Pipedrive Ready]', {
          email,
          machine: results.machine.nom,
          roi3ans: results.roi3ans,
          economieAnnuelle: results.economieAnnuelle,
        });
      }
    } catch (err) {
      setError(t.errorSending);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="bg-accent-success/10 rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-accent-success/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-accent-success" />
        </div>
        <p className="text-accent-success font-medium">
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-lighter rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-turquoise/10 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-primary-turquoise" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-neutral-dark">
            {t.title}
          </h4>
          <p className="text-sm text-neutral-medium">
            {t.subtitle}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Label htmlFor="email" className="sr-only">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder={t.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="gap-2 bg-primary-turquoise hover:bg-primary-dark"
        >
          <Download className="w-4 h-4" />
          {isLoading ? t.sending : t.submit}
        </Button>
      </form>
    </div>
  );
}
