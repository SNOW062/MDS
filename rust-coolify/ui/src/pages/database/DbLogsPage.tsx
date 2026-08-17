// completed ui_page_045
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DbLogsPage() {
  const { uuid, env_uuid, db_uuid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/projects/${uuid}/${env_uuid}`)} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Database Logs</h1>
      </div>

      <div className="flex gap-4 border-b border-[var(--border-color)] pb-px">
        <Link to={`/projects/${uuid}/${env_uuid}/db/${db_uuid}/configuration`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Configuration
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/db/${db_uuid}/backups`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Backups
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/db/${db_uuid}/logs`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Logs
        </Link>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 min-h-[150px] flex items-center justify-center">
        <p className="text-xs text-zinc-500">Verilənlər bazası loqları yüklənir...</p>
      </div>
    </div>
  );
}