import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { User, Shield, Key, Eye, EyeOff } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        toast.success('Profil məlumatları uğurla yeniləndi!');
        // Update local storage
        const localUser = JSON.parse(localStorage.getItem('md_user') || '{}');
        localUser.name = name;
        localUser.email = email;
        localStorage.setItem('md_user', JSON.stringify(localUser));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Profil yenilənərkən xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Server bağlantı xətası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Yeni şifrələr üst-üstə düşmür.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        }),
      });

      if (res.ok) {
        toast.success('Şifrəniz uğurla dəyişdirildi!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Şifrə dəyişdirilərkən xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Server bağlantı xətası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
        <User className="h-6 w-6 text-indigo-400" />
        İstifadəçi Profili (Profile)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Panel: Ümumi Profil Məlumatları */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" />
            Profil Məlumatlarını Yenilə
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">AD SOYAD</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">E-POÇT / İSTİFADƏÇİ ADI</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Yadda saxla
            </button>
          </form>
        </div>

        {/* Sağ Panel: Şifrəni Dəyişdir */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-400" />
            Şifrəni Yenilə
          </h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">CARİ ŞİFRƏ</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">YENİ ŞİFRƏ</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">YENİ ŞİFRƏNİN TƏSDİQİ</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              Şifrəni dəyiş
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}