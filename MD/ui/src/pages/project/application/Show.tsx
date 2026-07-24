import React, { useState } from 'react';
import { Layers, Plus, ExternalLink, GitBranch, Box, RefreshCcw } from 'lucide-react';

export const Show: React.FC = () => {
  const [apps, setApps] = useState([
    {
      id: 'app-1',
      name: 'coolify-rust-backend',
      gitRepository: 'github.com/coolify/rust-core',
      gitBranch: 'main',
      buildPack: 'nixpacks',
      fqdn: 'https://api.coolify.local',
      status: 'running'
    }
  ]);

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Applications
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Manage deployed web services, APIs, and microservices.</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Application
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map(app => (
          <div key={app.id} className="bg-[#18181b] border border-[#27272a] hover:border-zinc-700 rounded-xl p-5 space-y-4 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">{app.name}</h3>
                <span className="text-[11px] text-zinc-500 font-mono mt-0.5 flex items-center gap-1">
                  <GitBranch className="w-3 h-3 text-zinc-400" />
                  {app.gitRepository} ({app.gitBranch})
                </span>
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {app.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#27272a]/60 text-xs">
              <span className="text-zinc-400 font-mono">{app.fqdn}</span>
              <a href={app.fqdn} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold">
                Open URL <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
