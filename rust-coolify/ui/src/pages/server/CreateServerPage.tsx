// completed ui_page_046
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function CreateServerPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white tracking-wide">{t.servers.add_title}</h1>
      </div>

      <form className="max-w-2xl bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
            Server Adı
          </label>
          <input className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-xs text-white" placeholder="My Production Server" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-2">
            IP Ünvanı
          </label>
          <input className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-xs text-white" placeholder="192.168.1.100" />
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white rounded-lg transition-colors">
          {t.servers.validate_btn}
        </button>
      </form>
    </div>
  );
}