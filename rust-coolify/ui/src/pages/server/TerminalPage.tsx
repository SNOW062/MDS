// completed ui_page_049
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TerminalPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white">SSH Terminal</h1>
      </div>

      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to={`/server/${uuid}`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Configuration
        </Link>
        <Link to={`/server/${uuid}/proxy`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Proxy
        </Link>
        <Link to={`/server/${uuid}/terminal`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Terminal
        </Link>
        <Link to={`/server/${uuid}/charts`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Monitorinq
        </Link>
      </div>

      <div className="bg-[#0c0c0c] border border-[#27272a] rounded-xl p-4 min-h-[400px] flex items-center justify-center font-mono text-xs text-zinc-500">
        Connecting to server SSH...
      </div>
    </div>
  );
}