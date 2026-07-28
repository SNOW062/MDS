// completed ui_page_018
import { useTranslation } from '../../hooks/useTranslation';
import { ShieldAlert } from 'lucide-react';

export default function SshKeysPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-white">{t.security.ssh_keys}</h2>
        <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white rounded-lg transition-colors">
          + Yeni Açar
        </button>
      </div>
      <div className="flex flex-col items-center justify-center p-6 border border-[#27272a] border-dashed rounded-xl min-h-[150px]">
        <ShieldAlert className="h-8 w-8 text-zinc-600 mb-2" />
        <p className="text-xs text-zinc-500">Birinci SSH Açarı mütləqdir.</p>
      </div>
    </div>
  );
}