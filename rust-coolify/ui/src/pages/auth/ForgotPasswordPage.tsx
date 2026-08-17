// completed ui_page_031
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Şifrə yeniləmə linki e-poçtunuza göndərildi.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="max-w-md w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Şifrəmi Unutdum</h2>
        <p className="text-xs text-[var(--text-secondary)] mb-6">Şifrənizi yeniləmək üçün e-poçt ünvanınızı daxil edin.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              E-poçt
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="user@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none"
          >
            {loading ? t.common.loading : 'Yeniləmə Linki Göndər'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[var(--border-color)] pt-6">
          <Link to="/login" className="text-xs text-[var(--text-secondary)] hover:text-white transition-colors">
            Giriş səhifəsinə qayıt
          </Link>
        </div>
      </div>
    </div>
  );
}
