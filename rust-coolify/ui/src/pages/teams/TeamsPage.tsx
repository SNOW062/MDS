// completed ui_page_013
import { useTranslation } from '../../hooks/useTranslation';
import { Users } from 'lucide-react';

export default function TeamsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white tracking-wide">Komandalar (Teams)</h1>
      <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a] flex flex-col items-center justify-center min-h-[300px]">
        <Users className="h-12 w-12 text-zinc-600 mb-3" />
        <p className="text-xs text-zinc-500">MasterDeploy komanda və əməkdaşlıq ayarları.</p>
      </div>
    </div>
  );
}