// completed ui_page_014
import { useTranslation } from '../../hooks/useTranslation';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white tracking-wide">{t.sidebar.settings}</h1>
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white">Sistem Konfiqurasiyası</h2>
        </div>
        <p className="text-xs text-zinc-500">Mərkəzi server, update-lər və FQDN tənzimləmələri.</p>
      </div>
    </div>
  );
}