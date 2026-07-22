import React from 'react';
import type { Server } from '../types';
import { Server as ServerIcon, Cpu, HardDrive, Activity, Plus, CheckCircle, RefreshCcw } from 'lucide-react';

export const ServersPage: React.FC = () => {
  const mockServers: Server[] = [
    {
      id: 'srv-local',
      name: 'Localhost (Docker Daemon)',
      ip: '127.0.0.1',
      port: 22,
      user: 'root',
      isReachable: true,
      isBuildServer: true,
      cpuUsage: 18,
      ramUsage: 42,
      diskUsage: 35,
    },
    {
      id: 'srv-prod-vps',
      name: 'Hetzner Production Node',
      ip: '65.108.42.119',
      port: 22,
      user: 'root',
      isReachable: true,
      isBuildServer: false,
      cpuUsage: 34,
      ramUsage: 68,
      diskUsage: 51,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Servers</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Connected VPS nodes, Docker daemons, and build servers.
          </p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors shadow-lg shadow-orange-600/20">
          <Plus size={16} />
          <span>Connect New Server</span>
        </button>
      </div>

      {/* Servers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockServers.map((server) => (
          <div
            key={server.id}
            className="bg-[#18181b] border border-[#27272a] hover:border-zinc-700 rounded-xl p-6 space-y-6 shadow-xl relative"
          >
            {/* Server Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <ServerIcon size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-100">{server.name}</h3>
                  <p className="text-xs font-mono text-zinc-500">
                    {server.user}@{server.ip}:{server.port}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Reachable</span>
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3 pt-2">
              {/* CPU */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400 flex items-center space-x-1">
                    <Cpu size={13} className="text-blue-400" />
                    <span>CPU Usage</span>
                  </span>
                  <span className="text-zinc-200 font-bold">{server.cpuUsage}%</span>
                </div>
                <div className="h-2 w-full bg-[#27272a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${server.cpuUsage}%` }}
                  />
                </div>
              </div>

              {/* RAM */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400 flex items-center space-x-1">
                    <Activity size={13} className="text-cyan-400" />
                    <span>Memory (RAM)</span>
                  </span>
                  <span className="text-zinc-200 font-bold">{server.ramUsage}%</span>
                </div>
                <div className="h-2 w-full bg-[#27272a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${server.ramUsage}%` }}
                  />
                </div>
              </div>

              {/* Disk */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400 flex items-center space-x-1">
                    <HardDrive size={13} className="text-amber-400" />
                    <span>Disk Storage</span>
                  </span>
                  <span className="text-zinc-200 font-bold">{server.diskUsage}%</span>
                </div>
                <div className="h-2 w-full bg-[#27272a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${server.diskUsage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Footer details */}
            <div className="pt-4 border-t border-[#27272a] flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-zinc-600" />
                <span>Docker Engine v28.0</span>
              </div>
              <button className="text-orange-400 hover:underline flex items-center space-x-1 font-medium">
                <RefreshCcw size={12} />
                <span>Validate Connection</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
