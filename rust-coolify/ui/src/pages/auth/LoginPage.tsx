// completed ui_page_029
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Eye, EyeOff } from 'lucide-react';
import mdLogo from '../../assets/MDLOGO.png';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegEnabled, setIsRegEnabled] = useState(true);

  React.useEffect(() => {
    // Fortify::loginView logikası: istifadəçi yoxdursa /register-ə yönləndir
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.is_first_user) {
          navigate('/register', { replace: true });
        }
        setIsRegEnabled(data.is_registration_enabled);
      })
      .catch((err) => console.error('Status fetch error:', err));
  }, [navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email/İstifadəçi adı və şifrə boş ola bilməz.');
      return;
    }

    setLoading(true);
    try {
      // Rust Backend /api/login endpoint-inə POST sorğusu göndəririk!
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let errorMsg = 'Giriş xətası baş verdi.';
        try {
          const errData = await res.json();
          if (errData && errData.error) {
            errorMsg = errData.error;
          }
        } catch (_) {}
        toast.error(errorMsg);
        return;
      }

      const data = await res.json();
      login(data.user, data.token, data.team);
      toast.success('Giriş uğurludur!');
      navigate('/');
    } catch (err: any) {
      toast.error('Serverlə əlaqə xətası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="max-w-md w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={mdLogo} className="h-12 w-12 object-contain rounded-lg mb-3" alt="MasterDeploy Logo" />
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{t.login.title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              EMAIL VƏ YADA İSTİFADƏÇİ ADI
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="admin və ya user@example.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {t.login.password}
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-400 hover:underline">
                {t.login.forgot_password}
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 pr-10 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded bg-[var(--bg-tertiary)] border-[var(--border-color)] text-indigo-600 focus:ring-0"
            />
            <label htmlFor="remember" className="ml-2 text-xs text-[var(--text-secondary)]">
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

        {isRegEnabled && (
          <div className="mt-8 text-center border-t border-[var(--border-color)] pt-6">
            <Link to="/register" className="text-xs text-[var(--text-secondary)] hover:text-white transition-colors">
              {t.login.register_link}
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
