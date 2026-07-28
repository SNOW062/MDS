// completed ui_page_007
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { ArrowLeft, Activity, Settings, Terminal, Shield } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerDetailPage() {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const server = mockServers.find(s => s.uuid === uuid) || mockServers[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">{server.name}</h1>
            <p className="text-xs text-zinc-500">{server.ip}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to={`/server/${uuid}`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Konfiqurasiya
        </Link>
        <Link to={`/server/${uuid}/proxy`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Proxy
        </Link>
        <Link to={`/server/${uuid}/terminal`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5" /> Terminal
        </Link>
        <Link to={`/server/${uuid}/charts`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5" /> Monitorinq
        </Link>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <h2 className="text-sm font-bold text-white">{t.servers.configuration}</h2>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-zinc-500">SSH İstifadəçisi</p>
            <p className="text-[#e4e4e7] font-semibold mt-1">{server.user}</p>
          </div>
          <div>
            <p className="text-zinc-500">SSH Portu</p>
            <p className="text-[#e4e4e7] font-semibold mt-1">{server.port}</p>
          </div>
        </div>
      </div>
    </div>
  );
}