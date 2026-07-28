// completed ui_page_001
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useProjectStore, projectActions } from '../../stores/projectStore';
import { mockProjects } from '../../mocks/projects';
import { mockServers } from '../../mocks/servers';
import { Plus, Server, FolderGit2, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    // Load mock projects
    projectActions.setProjects(mockProjects);
  }, []);

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">{t.dashboard.title}</h1>
        <p className="text-sm text-zinc-500 mt-1">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Projects Section */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="h-5 w-5 text-indigo-500" />
                <h2 className="text-base font-bold text-white">{t.dashboard.projects_title}</h2>
              </div>
              <button 
                onClick={() => navigate('/projects')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                {t.dashboard.add_project}
              </button>
            </div>

            {projects.length === 0 ? (
              <p className="text-xs text-zinc-500">{t.dashboard.no_projects}</p>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-lg bg-[#27272a]/55 border border-[#3f3f46]/35 flex items-center justify-between hover:border-zinc-500/50 transition-colors"
                  >
                    <div>
                      <span className="text-sm font-bold text-white">{project.name}</span>
                      <p className="text-xs text-zinc-500 mt-0.5">{project.description || 'No description'}</p>
                    </div>
                    <Link
                      to={`/projects`}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Servers Section */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5">
                <Server className="h-5 w-5 text-indigo-500" />
                <h2 className="text-base font-bold text-white">{t.dashboard.servers_title}</h2>
              </div>
              <button 
                onClick={() => navigate('/servers/new')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                {t.dashboard.add_server}
              </button>
            </div>

            <div className="space-y-3">
              {mockServers.map((server) => (
                <div
                  key={server.id}
                  className="p-4 rounded-lg bg-[#27272a]/55 border border-[#3f3f46]/35 flex items-center justify-between hover:border-zinc-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600/10 flex items-center justify-center font-bold text-indigo-400">
                      S
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{server.name}</span>
                      <p className="text-xs text-zinc-500 mt-0.5">{server.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-400">{t.common.active}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
