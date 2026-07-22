import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [instanceDomain, setInstanceDomain] = useState('http://localhost:8000');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/v1/settings');
        const data = await res.json();
        if (data.auto_update) {
          setAutoUpdate(data.auto_update === 'true');
        }
        if (data.instance_domain) {
          setInstanceDomain(data.instance_domain);
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (key: string, value: string) => {
    try {
      const res = await fetch('/api/v1/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      return await res.json();
    } catch (err) {
      console.error(`Failed to save setting ${key}`, err);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await handleSave('auto_update', autoUpdate ? 'true' : 'false');
    await handleSave('instance_domain', instanceDomain);
    setIsSaving(false);
    alert('Settings saved successfully!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw size={24} className="text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Instance Settings</h1>
        <p className="text-xs text-zinc-400 mt-1">Configure global domains, auto-updates, and instance policies.</p>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6 max-w-2xl shadow-lg">
        <div className="flex items-center space-x-2 pb-4 border-b border-[#27272a]">
          <Settings size={18} className="text-orange-500" />
          <h3 className="text-sm font-bold text-white">General Configuration</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-zinc-400 block mb-1">Instance Domain / FQDN</label>
            <input
              type="text"
              value={instanceDomain}
              onChange={(e) => setInstanceDomain(e.target.value)}
              className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
              placeholder="e.g. http://localhost:8000"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#101010] rounded-lg border border-[#27272a]">
            <div>
              <div className="text-xs font-bold text-white">Auto Update MasterDeploy Instance</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Automatically pull updates from main repository.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-300 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-[#27272a]">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors shadow-lg shadow-orange-600/20"
          >
            <Save size={14} />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
