'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Download, Check } from 'lucide-react';
import type { CalculationResults } from '../lib/types';
import { trackEmailCapture } from '../lib/analytics';

interface EmailCaptureProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
  onSendPDF: (email: string) => Promise<void>;
}

const LABELS = {
  fr: {
    title: 'Téléchargez votre analyse complète',
    subtitle: 'PDF détaillé avec tous les calculs et le modèle recommandé',
    placeholder: 'votre@email.com',
    submit: 'Télécharger le PDF',
    sending: 'Téléchargement...',
    success: 'Votre analyse ROI a été téléchargée !',
    errorInvalid: 'Email invalide',
    errorSending: "Erreur lors de l'envoi",
  },
  en: {
    title: 'Download your complete analysis',
    subtitle: 'Detailed PDF with all calculations and recommended model',
    placeholder: 'your@email.com',
    submit: 'Download PDF',
    sending: 'Downloading...',
    success: 'Your ROI analysis has been downloaded!',
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

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setError(t.errorInvalid);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSendPDF(email);
      setIsSent(true);
      trackEmailCapture(email, results);
    } catch (err) {
      setError(t.errorSending);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="bg-emerald-50 rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-emerald-600" />
        </div>
        <p className="text-emerald-600 font-medium">
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-very-peri-100 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-very-peri-600" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-future-dusk-900">
            {t.title}
          </h4>
          <p className="text-sm text-future-dusk-500">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Label htmlFor="email" className="sr-only">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder={t.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); } }}
            className="w-full"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Button
          type="button"
          disabled={isLoading}
          onClick={handleSubmit}
          className="gap-2 bg-very-peri-500 hover:bg-very-peri-600"
        >
          <Download className="w-4 h-4" />
          {isLoading ? t.sending : t.submit}
        </Button>
      </div>
    </div>
  );
}
