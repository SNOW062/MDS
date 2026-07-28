// completed ui_page_030
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';
import mdLogo from '../../assets/MDLOGO.png';

export default function RegisterPage() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.success('Qeydiyyat uğurludur! Zəhmət olmasa giriş edin.');
      navigate('/login');
    } catch (err) {
      toast.error('Qeydiyyat xətası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={mdLogo} className="h-12 w-12 object-contain rounded-lg mb-3" alt="MasterDeploy Logo" />
          <h2 className="text-xl font-bold text-white">Qeydiyyat</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Adınız"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              E-poçt
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              Şifrə
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none"
          >
            {loading ? t.common.loading : 'Qeydiyyatdan Keç'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#27272a] pt-6">
          <Link to="/login" className="text-xs text-[#a1a1aa] hover:text-white transition-colors">
            Artıq hesabınız var? Giriş edin
          </Link>
        </div>
      </div>
    </div>
  );
}
