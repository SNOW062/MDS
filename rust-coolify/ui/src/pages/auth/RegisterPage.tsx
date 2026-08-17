import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Eye, EyeOff } from 'lucide-react';
import mdLogo from '../../assets/MDLOGO.png';

export default function RegisterPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get('invitation') || undefined;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState(true);

  React.useEffect(() => {
    // Fortify::registerView logikası: istifadəçi varsa və qeydiyyat bağlıdırsa, login-ə at
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        setIsFirstUser(data.is_first_user);
        if (!data.is_first_user && !invitationToken && !data.is_registration_enabled) {
          toast.error('Sərbəst qeydiyyat aktiv deyil. Yalnız dəvət linki ilə qeydiyyatdan keçə bilərsiniz.');
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => console.error('Status fetch error:', err));
  }, [navigate, invitationToken, toast]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email/İstifadəçi adı və şifrə boş ola bilməz.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, invitation: invitationToken }),
      });

      if (!res.ok) {
        let errorMsg = 'Qeydiyyat xətası baş verdi.';
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
      toast.success(invitationToken ? 'Qeydiyyatınız uğurla tamamlandı!' : 'Kök Hesab Yaradıldı! MasterDeploy-a Xoş Gelmisiniz.');
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
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {invitationToken 
              ? 'Sistemə Qeydiyyat (Dəvətlə Giriş)' 
              : isFirstUser 
                ? 'Sistemin İlkin Qeydiyyatı (Root Admin)' 
                : 'Yeni Hesab Yarat'}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 text-center">
            {invitationToken 
              ? 'Siz bu sistemə komanda üzvü olaraq dəvət edilmisiniz. Zəhmət olmasa qeydiyyatdan keçin.'
              : isFirstUser 
                ? 'MasterDeploy-a xoş gəlmisiniz. İlk kök admin hesabınızı və komandanızı yaradın.'
                : 'MasterDeploy platformasında yeni hesabınızı yaradın.'}
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Root Admin"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              E-poçt / İstifadəçi Adı
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="admin və ya admin@masterdeploy.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Şifrə
            </label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none"
          >
            {loading 
              ? t.common.loading 
              : isFirstUser 
                ? 'Kök Hesabı Yarat & Panelə Daxil Ol' 
                : 'Qeydiyyatdan Keç'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[var(--border-color)] pt-6">
          <Link to="/login" className="text-xs text-[var(--text-secondary)] hover:text-white transition-colors">
            {isFirstUser ? 'Artıq kök hesabınız var? Giriş edin' : 'Artıq hesabınız var? Giriş edin'}
          </Link>
        </div>

      </div>
    </div>
  );
}
