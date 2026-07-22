import React from 'react';
import type { Project, Application } from '../types';
import { Play, Square, RefreshCw, ExternalLink, Plus, Folder, Server, GitBranch, ShieldCheck } from 'lucide-react';

interface ProjectsPageProps {
  onSelectApplication: (app: Application) => void;
  onNewResource: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectApplication, onNewResource }) => {
  const mockProjects: Project[] = [
    {
      id: 'proj-1',
      name: 'Default Project',
      description: 'Main production environment for web services & API',
      environments: [
        {
          id: 'env-prod',
          name: 'production',
          applications: [
            {
              id: 'app-1',
              name: 'coolify-rust-backend',
              gitRepository: 'github.com/coolify/rust-core',
              gitBranch: 'main',
              buildPack: 'nixpacks',
              fqdn: 'https://api.coolify.local',
              ports: '8000:8000',
              status: 'running',
              serverId: 'srv-local',
              environmentId: 'env-prod',
              createdAt: '2026-07-22',
            },
            {
              id: 'app-2',
              name: 'postgres-database-standalone',
              gitRepository: 'docker.io/library/postgres:15-alpine',
              gitBranch: 'latest',
              buildPack: 'dockerfile',
              fqdn: 'https://db.coolify.local',
              ports: '5432:5432',
              status: 'running',
              serverId: 'srv-local',
              environmentId: 'env-prod',
              createdAt: '2026-07-22',
            },
            {
              id: 'app-3',
              name: 'redis-cache-service',
              gitRepository: 'docker.io/library/redis:7',
              gitBranch: 'latest',
              buildPack: 'dockerfile',
              fqdn: '',
              ports: '6379:6379',
              status: 'stopped',
              serverId: 'srv-local',
              environmentId: 'env-prod',
              createdAt: '2026-07-22',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your applications, databases, and services grouped by environments.
          </p>
        </div>
        <button
          onClick={onNewResource}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors shadow-lg shadow-orange-600/20"
        >
          <Plus size={16} />
          <span>Add New Application</span>
        </button>
      </div>

      {/* Projects List */}
      {mockProjects.map((project) => (
        <div key={project.id} className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden shadow-lg">
          {/* Project Header */}
          <div className="px-6 py-4 border-b border-[#27272a] flex items-center justify-between bg-[#141416]">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Folder size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-100">{project.name}</h2>
                <p className="text-xs text-zinc-400">{project.description}</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-700">
              1 Environment
            </span>
          </div>

          {/* Environments */}
          <div className="p-6 space-y-6">
            {project.environments.map((env) => (
              <div key={env.id} className="space-y-4">
                {/* Environment Badge */}
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    Environment: <span className="text-emerald-400">{env.name}</span>
                  </h3>
                </div>

                {/* Applications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {env.applications.map((app) => {
                    const isRunning = app.status === 'running';
                    const isBuilding = app.status === 'building';
                    return (
                      <div
                        key={app.id}
                        onClick={() => onSelectApplication(app)}
                        className="bg-[#1b1b1e] border border-[#27272a] hover:border-orange-500/40 p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01] hover:shadow-xl group relative overflow-hidden"
                      >
                        {/* Top Indicator */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center text-zinc-300 font-bold group-hover:text-orange-400 transition-colors">
                              {app.name[0].toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-zinc-100 group-hover:text-orange-400 transition-colors truncate max-w-[160px]">
                                {app.name}
                              </h4>
                              <div className="flex items-center space-x-1.5 text-[11px] text-zinc-500 font-mono mt-0.5">
                                <GitBranch size={12} />
                                <span>{app.gitBranch}</span>
                              </div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                              isRunning
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : isBuilding
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isRunning ? 'bg-emerald-400 animate-pulse' : isBuilding ? 'bg-amber-400 animate-ping' : 'bg-rose-400'
                              }`}
                            />
                            <span className="capitalize">{app.status}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4 pt-3 border-t border-[#27272a]/60 space-y-1.5 text-xs">
                          {app.fqdn ? (
                            <div className="flex items-center justify-between text-zinc-400">
                              <span className="text-[11px] font-mono text-zinc-500">Domain:</span>
                              <a
                                href={app.fqdn}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-orange-400 hover:underline flex items-center space-x-1 truncate max-w-[170px]"
                              >
                                <span className="truncate">{app.fqdn.replace('https://', '')}</span>
                                <ExternalLink size={11} />
                              </a>
                            </div>
                          ) : null}

                          <div className="flex items-center justify-between text-zinc-400">
                            <span className="text-[11px] font-mono text-zinc-500">Port Mapping:</span>
                            <span className="font-mono text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-[11px]">
                              {app.ports}
                            </span>
                          </div>
                        </div>

                        {/* Hover Overlay Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
