// completed ui_page_032
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Şifrələr eyni deyil.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success('Şifrəniz uğurla yeniləndi.');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Yeni Şifrə Təyin Et</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              Yeni Şifrə
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              Şifrənin Təkrarı
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none"
          >
            {loading ? t.common.loading : 'Şifrəni Yenilə'}
          </button>
        </form>
      </div>
    </div>
  );
}
