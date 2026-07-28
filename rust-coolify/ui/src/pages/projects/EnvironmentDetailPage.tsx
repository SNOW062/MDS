// completed ui_page_004
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { ArrowLeft, Box, Database, Sparkles, Plus } from 'lucide-react';
import { mockProjects } from '../../mocks/projects';

export default function EnvironmentDetailPage() {
  const { uuid, env_uuid } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const project = mockProjects.find(p => p.uuid === uuid) || mockProjects[0];
  const env = project.environments?.find(e => e.uuid === env_uuid) || project.environments?.[0];

  if (!env) return <div className="text-zinc-500">Mühit tapılmadı</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/projects')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">{project.name}</h1>
            <p className="text-xs text-zinc-500">Mühit: <span className="text-indigo-400 font-semibold">{env.name}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applications */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">{t.projects.applications}</h3>
            </div>
            <button className="p-1 rounded bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          {env.applications?.map(app => (
            <div
              key={app.id}
              onClick={() => navigate(`/projects/${uuid}/${env_uuid}/app/${app.uuid}/general`)}
              className="p-3 bg-[#27272a]/40 border border-[#3f3f46]/30 rounded-lg hover:border-zinc-500 cursor-pointer transition-colors"
            >
              <p className="text-xs font-bold text-white">{app.name}</p>
              <p className="text-[10px] text-zinc-500 mt-1">{app.fqdn}</p>
            </div>
          ))}
        </div>

        {/* Databases */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">{t.projects.databases}</h3>
            </div>
            <button className="p-1 rounded bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          {env.postgresqls?.map(db => (
            <div
              key={db.id}
              onClick={() => navigate(`/projects/${uuid}/${env_uuid}/db/${db.uuid}/configuration`)}
              className="p-3 bg-[#27272a]/40 border border-[#3f3f46]/30 rounded-lg hover:border-zinc-500 cursor-pointer transition-colors"
            >
              <p className="text-xs font-bold text-white">{db.name}</p>
              <p className="text-[10px] text-zinc-500 mt-1">{db.image}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">{t.projects.services}</h3>
            </div>
            <button className="p-1 rounded bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-zinc-500">Heç bir xidmət əlavə edilməyib.</p>
        </div>
      </div>
    </div>
  );
}