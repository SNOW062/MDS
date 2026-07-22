import React, { useState } from 'react';
import { Variable, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export const SharedVariablesPage: React.FC = () => {
  const [variables, setVariables] = useState([
    { id: '1', key: 'GLOBAL_CDN_URL', value: 'https://cdn.coolify.local', isSecret: false },
    { id: '2', key: 'SHARED_REDIS_PASSWORD', value: 'super-secure-redis-pass', isSecret: true },
  ]);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    if (!newKey.trim()) return;
    setVariables([...variables, { id: Date.now().toString(), key: newKey, value: newValue, isSecret: false }]);
    setNewKey('');
    setNewValue('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Shared Variables</h1>
        <p className="text-xs text-zinc-400 mt-1">Global environment variables shared across all applications.</p>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex items-center space-x-3 bg-[#101010] p-3 rounded-xl border border-[#27272a]">
          <input
            type="text"
            placeholder="KEY"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5 text-xs font-mono w-1/3 text-zinc-100 focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            placeholder="VALUE"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5 text-xs font-mono flex-1 text-zinc-100 focus:outline-none focus:border-orange-500"
          />
          <button onClick={handleAdd} className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold">
            Add Variable
          </button>
        </div>

        <div className="space-y-2">
          {variables.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-[#141416] border border-[#27272a] px-4 py-2.5 rounded-lg text-xs font-mono">
              <span className="font-bold text-orange-400 w-1/3">{item.key}</span>
              <div className="flex-1 flex items-center space-x-2">
                <span className="text-zinc-300">{item.isSecret && !showSecrets[item.id] ? '••••••••••••' : item.value}</span>
                {item.isSecret && (
                  <button onClick={() => setShowSecrets({ ...showSecrets, [item.id]: !showSecrets[item.id] })} className="text-zinc-500 hover:text-zinc-300">
                    {showSecrets[item.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                )}
              </div>
              <button onClick={() => setVariables(variables.filter((v) => v.id !== item.id))} className="text-rose-400 hover:text-rose-300">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
