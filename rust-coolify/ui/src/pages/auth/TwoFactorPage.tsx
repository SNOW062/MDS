// completed ui_page_033
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';

export default function TwoFactorPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('2FA doğrulaması uğurludur.');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-2">İki Mərhələli Giriş</h2>
        <p className="text-xs text-[#a1a1aa] mb-6">Autentifikator tətbiqinizdəki 6 rəqəmli kodu daxil edin.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              6 Rəqəmli Kod
            </label>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-center text-lg font-bold letter tracking-widest text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="000000"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none"
          >
            {loading ? t.common.loading : 'Doğrula'}
          </button>
        </form>
      </div>
    </div>
  );
}
