import React, { useState } from 'react';
import { Plus, FileCode, Trash2 } from 'lucide-react';

interface DynamicConfigurationsProps {
  onNewConfig: () => void;
}

export const DynamicConfigurations: React.FC<DynamicConfigurationsProps> = ({ onNewConfig }) => {
  const [configs, setConfigs] = useState([
    { name: 'redirect-www-to-non-www.yaml', path: '/etc/traefik/dynamic/redirect.yaml' },
    { name: 'custom-headers-middleware.yaml', path: '/etc/traefik/dynamic/headers.yaml' }
  ]);

  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCode className="w-4 h-4 text-emerald-400" />
            Dynamic Configurations
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Traefik middleware and dynamic routing YAML files.</p>
        </div>
        <button
          onClick={onNewConfig}
          className="px-3 py-1.5 bg-[#22173a] hover:bg-[#2c1d4b] border border-purple-600/40 text-purple-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Config
        </button>
      </div>

      <div className="space-y-2">
        {configs.map((cfg, idx) => (
          <div key={idx} className="bg-[#0f0f11] border border-[#27272a] rounded-lg p-3 flex items-center justify-between text-xs">
            <div>
              <div className="font-mono font-bold text-white">{cfg.name}</div>
              <div className="font-mono text-[10px] text-zinc-500">{cfg.path}</div>
            </div>
            <button
              onClick={() => setConfigs(configs.filter((_, i) => i !== idx))}
              className="p-1.5 text-zinc-400 hover:text-red-400 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
