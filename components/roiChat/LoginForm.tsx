'use client';

import { useState } from 'react';
import { Lock, Mail, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function LoginForm({ erreur }: { erreur?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function requestLink() {
    if (!email.trim() || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/roi-auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Erreur lors de la demande.');
        return;
      }
      setStatus('sent');
      setMessage(data.message);
    } catch {
      setStatus('error');
      setMessage('Erreur réseau. Réessayez.');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="w-12 h-12 rounded-xl bg-very-peri-100 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-very-peri-600" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-future-dusk-900 mb-1">
          Calculateur ROI — accès interne
        </h1>
        <p className="text-sm text-future-dusk-500 mb-6">
          Réservé à l&apos;équipe Sysnext. Saisissez votre email @sysnext.com pour recevoir un lien
          de connexion.
        </p>

        {erreur === 'lien-invalide' && (
          <div className="flex items-start gap-2 bg-amber-50 text-amber-800 text-sm rounded-lg p-3 mb-4">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Lien de connexion invalide ou expiré (15 min). Demandez-en un nouveau.</span>
          </div>
        )}

        {status === 'sent' ? (
          <div className="flex items-start gap-2 bg-emerald-50 text-emerald-800 text-sm rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestLink();
            }}
          >
            <label className="block text-sm font-medium text-future-dusk-700 mb-1" htmlFor="email">
              Email professionnel
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-future-dusk-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="prenom.nom@sysnext.com"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-very-peri-500 text-sm"
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-4 py-2 rounded-lg bg-very-peri-600 text-white text-sm font-medium hover:bg-very-peri-700 disabled:opacity-50 transition-colors"
              >
                {status === 'sending' ? 'Envoi…' : 'Recevoir le lien'}
              </button>
            </div>
            {status === 'error' && <p className="text-sm text-red-600 mt-2">{message}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
