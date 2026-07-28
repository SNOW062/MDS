// completed ui_page_029
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import mdLogo from '../../assets/MDLOGO.png';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email və şifrə boş ola bilməz.');
      return;
    }

    setLoading(true);
    try {
      // Simulate successful login with a mock user
      const mockUser = {
        id: 1,
        name: 'Master User',
        email: email,
        email_verified_at: new Date().toISOString(),
        two_factor_confirmed_at: null,
        force_password_reset: false,
        marketing_emails: false,
        pending_email: null,
        email_change_code: null,
        email_change_code_expires_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const mockTeam = {
        id: 1,
        name: 'Personal Team',
        uuid: 'team-uuid',
        description: 'Default personal team',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      login(mockUser, 'mock-jwt-token', mockTeam);
      toast.success('Giriş uğurludur!');
      navigate('/');
    } catch (err) {
      toast.error('Giriş xətası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={mdLogo} className="h-12 w-12 object-contain rounded-lg mb-3" alt="MasterDeploy Logo" />
          <h2 className="text-xl font-bold text-white">{t.login.title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
              {t.login.email}
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
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                {t.login.password}
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-400 hover:underline">
                {t.login.forgot_password}
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-sm text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded bg-[#27272a] border-[#3f3f46] text-indigo-600 focus:ring-0"
            />
            <label htmlFor="remember" className="ml-2 text-xs text-[#a1a1aa]">
              {t.login.remember_me}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none"
          >
            {loading ? t.common.loading : t.login.login_btn}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#27272a] pt-6">
          <Link to="/register" className="text-xs text-[#a1a1aa] hover:text-white transition-colors">
            {t.login.register_link}
          </Link>
        </div>
      </div>
    </div>
  );
}
