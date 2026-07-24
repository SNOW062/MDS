import React, { useState } from 'react';
import { RotateCcw, StopCircle, Terminal, FileText, Plus } from 'lucide-react';
import { ProxyLogsModal } from './ProxyLogsModal';
import { DynamicConfigurations } from './DynamicConfigurations';
import { NewDynamicConfigurationModal } from './NewDynamicConfigurationModal';

export const ServerProxyTab: React.FC = () => {
  const [proxyType, setProxyType] = useState('traefik');
  const [isProxyRunning, setIsProxyRunning] = useState(true);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isNewConfigOpen, setIsNewConfigOpen] = useState(false);

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      {/* Proxy Status & Control Header */}
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            Proxy Settings
            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full font-mono ${isProxyRunning ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {isProxyRunning ? 'Running (Traefik v3)' : 'Stopped'}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Automatic SSL certificate generation, reverse proxy, and domain routing.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLogsOpen(true)}
            className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            Proxy Logs
          </button>
          <button
            onClick={() => setIsProxyRunning(true)}
            className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            Restart Proxy
          </button>
          <button
            onClick={() => setIsProxyRunning(!isProxyRunning)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isProxyRunning ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            <StopCircle className="w-3.5 h-3.5" />
            {isProxyRunning ? 'Stop Proxy' : 'Start Proxy'}
          </button>
        </div>
      </div>

      {/* Proxy Configuration Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {/* Proxy Type Selection */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            Proxy Engine Type
          </h3>
          <p className="text-xs text-zinc-400">Select the reverse-proxy daemon running on this server node.</p>
          <select
            value={proxyType}
            onChange={(e) => setProxyType(e.target.value)}
            className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
          >
            <option value="traefik">Traefik v3 (Recommended Default)</option>
            <option value="caddy">Caddy Server (Automatic HTTPS)</option>
            <option value="nginx">Nginx Proxy Manager</option>
            <option value="none">None (External Custom Proxy)</option>
          </select>
        </div>

        {/* Dynamic Configurations List (Sub-component) */}
        <DynamicConfigurations onNewConfig={() => setIsNewConfigOpen(true)} />
      </div>

      {/* Modals */}
      <ProxyLogsModal isOpen={isLogsOpen} onClose={() => setIsLogsOpen(false)} />
      <NewDynamicConfigurationModal isOpen={isNewConfigOpen} onClose={() => setIsNewConfigOpen(false)} />
    </div>
  );
};
