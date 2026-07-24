import React, { useState, useEffect } from 'react';
import { Server as ServerIcon, Plus, CheckCircle, RefreshCcw, ShieldCheck, Terminal, Cpu, HardDrive, Activity, ChevronRight } from 'lucide-react';
import { ServerDetailPage } from './ServerDetailPage';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_LOCALHOST_SERVER = {
  id: '0',
  name: 'localhost',
  description: "This is the server where MasterDeploy is running on. Don't delete this!",
  ip: '127.0.0.1',
  port: 22,
  user: 'root',
  is_reachable: true,
  is_build_server: true,
};

export const ServersPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [servers, setServers] = useState<any[]>([DEFAULT_LOCALHOST_SERVER]);
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
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setServers(data);
        } else {
          setServers([DEFAULT_LOCALHOST_SERVER]);
        }
      }
    } catch (err) {
      setServers([DEFAULT_LOCALHOST_SERVER]);
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/v1/servers/resources');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch {
      // keep fallback metrics
    }
  };

  useEffect(() => {
    fetchServers();
    fetchMetrics();
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/servers/') && hash !== '#/servers') {
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t('servers') || 'Servers'}</h1>
          <p className="text-xs text-zinc-400 mt-1">{t('servers_desc') || 'Manage your VPS servers and deployment nodes'}</p>
        </div>

        <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors shadow-lg shadow-orange-600/20">
          <Plus size={16} />
          <span>{t('add_server') || '+ Add Server'}</span>
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
                    {(server.id === '0' || server.name === 'localhost') && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {t('default_master') || 'DEFAULT MASTER'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">{server.description || t('localhost_desc') || "This is the server where MasterDeploy is running on. Don't delete this!"}</p>
                  <p className={`text-xs font-semibold mt-1 flex items-center space-x-1 ${
                    server.is_reachable ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${server.is_reachable ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span>{server.is_reachable ? (t('reachable_usable') || 'Reachable / Usable') : 'Not reachable'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => handleValidate(e, server.id)}
                  disabled={isValidating}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <RefreshCcw size={16} className={isValidating ? 'animate-spin' : ''} />
                </button>
                <ChevronRight size={18} className="text-zinc-500" />
              </div>
            </div>

            {/* Metrics Footer Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#27272a]/60 text-xs">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Cpu size={14} className="text-purple-400" />
                <span>CPU: {metrics.cpu_usage}% ({metrics.cpu_cores} Cores)</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-400">
                <Activity size={14} className="text-emerald-400" />
                <span>RAM: {metrics.ram_usage}% ({metrics.ram_total_gb} GB)</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-400">
                <HardDrive size={14} className="text-amber-400" />
                <span>Disk: {metrics.disk_usage}% ({metrics.disk_total_gb} GB)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
