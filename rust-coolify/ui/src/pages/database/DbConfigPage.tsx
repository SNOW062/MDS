// completed ui_page_043
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DbConfigPage() {
  const { uuid, env_uuid, db_uuid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/projects/${uuid}/${env_uuid}`)} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white">PostgreSQL Config</h1>
      </div>

      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to={`/projects/${uuid}/${env_uuid}/db/${db_uuid}/configuration`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Configuration
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/db/${db_uuid}/backups`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Backups
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/db/${db_uuid}/logs`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Logs
        </Link>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">PostgreSQL database details</h3>
        <p className="text-xs text-zinc-500">Credentials, hostname, internal and public ports.</p>
      </div>
    </div>
  );
}