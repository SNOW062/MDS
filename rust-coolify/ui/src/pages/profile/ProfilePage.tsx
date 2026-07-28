// completed ui_page_051
import { useTranslation } from '../../hooks/useTranslation';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white tracking-wide">İstifadəçi Profili (Profile)</h1>
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white">Profil Məlumatları</h2>
        </div>
        <p className="text-xs text-zinc-500">Ad, email, şifrə dəyişmə və 2FA tənzimləmələri.</p>
      </div>
    </div>
  );
}