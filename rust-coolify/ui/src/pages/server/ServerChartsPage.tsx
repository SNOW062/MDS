// completed ui_page_048
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ServerChartsPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white">Server Charts</h1>
      </div>

      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to={`/server/${uuid}`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Configuration
        </Link>
        <Link to={`/server/${uuid}/proxy`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Proxy
        </Link>
        <Link to={`/server/${uuid}/terminal`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Terminal
        </Link>
        <Link to={`/server/${uuid}/charts`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Monitorinq
        </Link>
        <Link to={`/server/${uuid}/security`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Security
        </Link>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 min-h-[300px] flex items-center justify-center">
        <p className="text-xs text-zinc-500">Real-time CPU and RAM charts loading...</p>
      </div>
    </div>
  );
}