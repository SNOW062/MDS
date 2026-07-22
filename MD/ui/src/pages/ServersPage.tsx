import React, { useState, useEffect } from 'react';
import { Server as ServerIcon, Plus, CheckCircle, RefreshCcw, ShieldCheck, Terminal, Cpu, HardDrive, Activity, ChevronRight } from 'lucide-react';
import { ServerDetailPage } from './ServerDetailPage';
import { useLanguage } from '../context/LanguageContext';

export const ServersPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [servers, setServers] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({
    cpu_usage: 18,
    ram_usage: 42,
    disk_usage: 35,
    cpu_cores: 4,
    ram_total_gb: 8,
    disk_total_gb: 160
  });

  const fetchServers = async () => {
    try {
      const res = await fetch('/api/v1/servers');
      const data = await res.json();
      setServers(data);
    } catch (err) {
      console.error("Failed to fetch servers", err);
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/v1/servers/resources');
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to fetch metrics", err);
    }
  };

  // Sync hash sub-route for selected server
  useEffect(() => {
    fetchServers();
    fetchMetrics();
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/servers/localhost') {
        setSelectedServer('localhost');
      } else if (hash === '#/servers') {
        setSelectedServer(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectServer = (server: string | null) => {
    setSelectedServer(server);
    if (server) {
      window.location.hash = `#/servers/${server}`;
    } else {
      window.location.hash = '#/servers';
    }
  };

  if (selectedServer === 'localhost') {
    return <ServerDetailPage onBack={() => handleSelectServer(null)} />;
  }

  const handleValidate = async (e: React.MouseEvent, serverId: string) => {
    e.stopPropagation();
    setIsValidating(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/v1/servers/validate');
      const data = await res.json();
      if (data.is_reachable) {
        setStatusMessage(t('reachable_usable'));
      }
    } catch {
      setStatusMessage(t('reachable_usable'));
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header with Add Server Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t('servers')}</h1>
          <p className="text-xs text-zinc-400 mt-1">{t('servers_desc')}</p>
        </div>

        <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors shadow-lg shadow-orange-600/20">
          <Plus size={16} />
          <span>{t('add_server')}</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle size={14} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Servers Grid List */}
      <div className="space-y-4">
        {servers.map((server) => (
          <div
            key={server.id}
            onClick={() => handleSelectServer('localhost')}
            className={`bg-[#18181b] border rounded-xl p-6 shadow-2xl relative space-y-4 cursor-pointer transition-all hover:bg-[#1f1f23] ${
              server.is_reachable ? 'border-emerald-500/40 hover:border-emerald-500' : 'border-red-500/40 hover:border-red-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl border ${
                  server.is_reachable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  <ServerIcon size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-white hover:text-purple-400 transition-colors">{server.name}</h2>
                    {server.id === '0' && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {t('default_master')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">{server.description || t('localhost_desc')}</p>
                  <p className={`text-xs font-semibold mt-1 flex items-center space-x-1 ${
                    server.is_reachable ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${server.is_reachable ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span>{server.is_reachable ? t('reachable_usable') : 'Not reachable'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => handleValidate(e, server.id)}
                  disabled={isValidating}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors disabled:opacity-50"
                >
                  <RefreshCcw size={14} className={isValidating ? 'animate-spin' : ''} />
                  <span>{isValidating ? t('validating') : t('validate_server')}</span>
                </button>
                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>

            {/* System Specs Metrics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#27272a]">
              <div className="bg-[#0f0f11] p-3 rounded-lg border border-[#27272a] space-y-1">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span className="flex items-center space-x-1.5">
                    <Cpu size={14} className="text-blue-400" />
                    <span>{t('cpu_cores')}</span>
                  </span>
                  <span className="text-white font-mono font-bold">{metrics.cpu_cores} Cores ({metrics.cpu_usage}%)</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${metrics.cpu_usage}%` }} />
                </div>
              </div>

              <div className="bg-[#0f0f11] p-3 rounded-lg border border-[#27272a] space-y-1">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span className="flex items-center space-x-1.5">
                    <Activity size={14} className="text-cyan-400" />
                    <span>{t('ram_memory')}</span>
                  </span>
                  <span className="text-white font-mono font-bold">{metrics.ram_total_gb} GB ({metrics.ram_usage}%)</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${metrics.ram_usage}%` }} />
                </div>
              </div>

              <div className="bg-[#0f0f11] p-3 rounded-lg border border-[#27272a] space-y-1">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span className="flex items-center space-x-1.5">
                    <HardDrive size={14} className="text-amber-400" />
                    <span>{t('disk_storage')}</span>
                  </span>
                  <span className="text-white font-mono font-bold">{metrics.disk_total_gb} GB ({metrics.disk_usage}%)</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${metrics.disk_usage}%` }} />
                </div>
              </div>
            </div>

            {/* SSH & Docker Status Details */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1 font-mono">
                  <Terminal size={13} className="text-zinc-500" />
                  <span>{server.user}@{server.ip}:{server.port}</span>
                </span>
                <span className="flex items-center space-x-1 text-emerald-400">
                  <ShieldCheck size={13} />
                  <span>{t('private_key')}: default (ID 0)</span>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-500 font-mono">
                <span>{t('docker_version')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
