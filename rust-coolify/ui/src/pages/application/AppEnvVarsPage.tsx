// completed ui_page_036
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';

export default function AppEnvVarsPage() {
  const { uuid, env_uuid, app_uuid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/projects/${uuid}/${env_uuid}`)} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white">Environment Variables</h1>
      </div>

      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/general`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          General
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/envs`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Environment Variables
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/advanced`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Advanced
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/deployments`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Deployments
        </Link>
        <Link to={`/projects/${uuid}/${env_uuid}/app/${app_uuid}/logs`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Logs
        </Link>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-white">Variables</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white rounded-lg transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex gap-3">
            <input className="w-1/3 bg-[#27272a] border border-[#3f3f46] rounded px-3 py-1.5 text-xs text-white" value="PORT" readOnly />
            <input className="flex-1 bg-[#27272a] border border-[#3f3f46] rounded px-3 py-1.5 text-xs text-white" value="3000" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}