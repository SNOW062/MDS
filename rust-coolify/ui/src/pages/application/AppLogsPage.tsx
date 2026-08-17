// completed ui_page_040
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AppLogsPage() {
  const { uuid, env_uuid, app_uuid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/projects/${uuid}/${env_uuid}`)} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Runtime Logs</h1>
      </div>

      <div className="flex gap-4 border-b border-[var(--border-color)] pb-px">
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/general`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          General
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/envs`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Environment Variables
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/advanced`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Advanced
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/deployments`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Deployments
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/logs`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Logs
        </Link>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 min-h-[300px] flex items-center justify-center">
        <p className="text-xs text-zinc-500">Runtime loqları yüklənir...</p>
      </div>
    </div>
  );
}