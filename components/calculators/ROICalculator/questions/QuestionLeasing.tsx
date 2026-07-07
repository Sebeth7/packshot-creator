'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { FullFormData } from '../lib/validation';
import { MACHINES } from '../lib/machines';

interface QuestionLeasingProps {
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    toggle: 'Vous avez reçu une offre de leasing ?',
    toggleSub: 'Calculez votre ROI en intégrant les conditions de votre offre de leasing',
    activate: 'Oui, simuler en leasing',
    deactivate: 'Non, calculer en achat',
    machine: 'Modèle concerné',
    machinePlaceholder: 'Sélectionnez le modèle',
    mensualite: 'Mensualité HT',
    mensualitePlaceholder: 'Ex: 850',
    mensualiteSuffix: '€ / mois',
    nbMois: 'Durée du contrat',
    nbMoisSuffix: 'mois',
  },
  en: {
    toggle: 'Have you received a leasing offer?',
    toggleSub: 'Calculate your ROI based on your leasing offer terms',
    activate: 'Yes, simulate leasing',
    deactivate: 'No, calculate purchase',
    machine: 'Model',
    machinePlaceholder: 'Select the model',
    mensualite: 'Monthly payment (excl. tax)',
    mensualitePlaceholder: 'Ex: 850',
    mensualiteSuffix: '€ / month',
    nbMois: 'Contract duration',
    nbMoisSuffix: 'months',
  },
  'de-ch': {
    toggle: 'Haben Sie ein Leasingangebot erhalten?',
    toggleSub: 'Berechnen Sie Ihren ROI unter Berücksichtigung der Konditionen Ihres Leasingangebots',
    activate: 'Ja, Leasing simulieren',
    deactivate: 'Nein, als Kauf berechnen',
    machine: 'Betroffenes Modell',
    machinePlaceholder: 'Modell auswählen',
    mensualite: 'Monatliche Rate (exkl. MwSt.)',
    mensualitePlaceholder: 'z. B.: 850',
    mensualiteSuffix: '€ / Monat',
    nbMois: 'Vertragslaufzeit',
    nbMoisSuffix: 'Monate',
  },
};

export default function QuestionLeasing({ locale }: QuestionLeasingProps) {
  const { watch, setValue, formState: { errors } } = useFormContext<FullFormData>();
  const t = LABELS[locale] ?? LABELS.en;

  const isActive = watch('leasingActif') || false;
  const machineId = watch('leasingMachineId') || '';
  const mensualite = watch('leasingMensualite');
  const nbMois = watch('leasingNbMois');

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div
        className={cn(
          'rounded-xl border-2 p-5 transition-all cursor-pointer',
          isActive
            ? 'border-very-peri-500 bg-very-peri-50'
            : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
        )}
        onClick={() => {
          setValue('leasingActif', !isActive, { shouldValidate: true });
          if (isActive) {
            // Reset leasing fields when deactivating
            setValue('leasingMachineId', undefined);
            setValue('leasingMensualite', undefined);
            setValue('leasingNbMois', undefined);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium text-future-dusk-900 cursor-pointer">
              {t.toggle}
            </Label>
            <p className="text-sm text-future-dusk-500 mt-1">{t.toggleSub}</p>
          </div>
          <div className={cn(
            'w-12 h-7 rounded-full transition-colors flex items-center px-1',
            isActive ? 'bg-very-peri-500' : 'bg-neutral-300'
          )}>
            <div className={cn(
              'w-5 h-5 rounded-full bg-white shadow-sm transition-transform',
              isActive ? 'translate-x-5' : 'translate-x-0'
            )} />
          </div>
        </div>
      </div>

      {/* Champs leasing (conditionnels) */}
      {isActive && (
        <div className="space-y-4 pl-4 border-l-2 border-very-peri-300 ml-2">
          {/* Machine */}
          <div>
            <Label htmlFor="leasing-machine" className="text-sm font-medium text-future-dusk-900">
              {t.machine}
            </Label>
            <select
              id="leasing-machine"
              value={machineId}
              onChange={(e) => setValue('leasingMachineId', e.target.value, { shouldValidate: true })}
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-future-dusk-900 focus:border-very-peri-500 focus:outline-none focus:ring-1 focus:ring-very-peri-500"
            >
              <option value="">{t.machinePlaceholder}</option>
              {MACHINES.filter((m) => !m.prixSurDevis && !m.delisted).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom}
                </option>
              ))}
            </select>
            {errors.leasingMachineId && (
              <p className="text-sm text-red-500 mt-1">{String(errors.leasingMachineId.message)}</p>
            )}
          </div>

          {/* Mensualité + Durée sur une ligne */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="leasing-mensualite" className="text-sm font-medium text-future-dusk-900">
                {t.mensualite}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="leasing-mensualite"
                  type="number"
                  min={100}
                  max={20000}
                  placeholder={t.mensualitePlaceholder}
                  value={mensualite ?? ''}
                  onChange={(e) => setValue('leasingMensualite', e.target.value ? Number(e.target.value) : undefined, { shouldValidate: true })}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-future-dusk-500">
                  {t.mensualiteSuffix}
                </span>
              </div>
              {errors.leasingMensualite && (
                <p className="text-sm text-red-500 mt-1">{String(errors.leasingMensualite.message)}</p>
              )}
            </div>

            <div>
              <Label htmlFor="leasing-nbmois" className="text-sm font-medium text-future-dusk-900">
                {t.nbMois}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="leasing-nbmois"
                  type="number"
                  min={12}
                  max={84}
                  value={nbMois ?? ''}
                  onChange={(e) => setValue('leasingNbMois', e.target.value ? Number(e.target.value) : undefined, { shouldValidate: true })}
                  className="pr-14"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-future-dusk-500">
                  {t.nbMoisSuffix}
                </span>
              </div>
              {errors.leasingNbMois && (
                <p className="text-sm text-red-500 mt-1">{String(errors.leasingNbMois.message)}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
