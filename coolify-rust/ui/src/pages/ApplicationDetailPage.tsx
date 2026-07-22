import React, { useState } from 'react';
import type { Application, EnvVariable } from '../types';
import { 
  Play, 
  Square, 
  RotateCw, 
  ExternalLink, 
  Terminal as TerminalIcon, 
  Key, 
  Clock, 
  Settings, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle
} from 'lucide-react';

interface ApplicationDetailPageProps {
  app: Application;
  onBack: () => void;
}

export const ApplicationDetailPage: React.FC<ApplicationDetailPageProps> = ({ app, onBack }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'env' | 'deployments' | 'logs' | 'settings'>('general');
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const [envVars, setEnvVars] = useState<EnvVariable[]>([
    { id: '1', key: 'PORT', value: '8000', isBuildTime: false, isSecret: false },
    { id: '2', key: 'DATABASE_URL', value: 'postgres://coolify:password@postgres:5432/coolify', isBuildTime: false, isSecret: true },
    { id: '3', key: 'JWT_SECRET', value: 'super-secret-key-coolify-rust-2026', isBuildTime: true, isSecret: true },
  ]);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddEnv = () => {
    if (!newKey.trim()) return;
    setEnvVars([
      ...envVars,
      { id: Date.now().toString(), key: newKey, value: newValue, isBuildTime: false, isSecret: false },
    ]);
    setNewKey('');
    setNewValue('');
  };

  const handleDeleteEnv = (id: string) => {
    setEnvVars(envVars.filter((e) => e.id !== id));
  };

  const mockLogs = [
    "[2026-07-22 12:00:01] INFO  Starting build pipeline for 'coolify-rust-backend'...",
    "[2026-07-22 12:00:02] INFO  Cloning git repository: github.com/coolify/rust-core (branch: main)",
    "[2026-07-22 12:00:04] INFO  Detecting buildpack: Nixpacks Rust environment detected",
    "[2026-07-22 12:00:05] INFO  Building binary with `cargo build --release`...",
    "[2026-07-22 12:00:15] SUCCESS Compiling coolify-core v0.1.0 (E:\\MD\\coolify-rust)",
    "[2026-07-22 12:00:18] SUCCESS Compiling coolify-api v0.1.0",
    "[2026-07-22 12:00:20] INFO  Starting Docker container 'coolify-rust-api' on port 8000:8000",
    "[2026-07-22 12:00:21] SUCCESS Container coolify-rust-api is HEALTHY (200 OK)",
  ];

  return (
    <div className="space-y-6">
      {/* Header Back & Application Summary */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-xs text-zinc-400 hover:text-white bg-[#27272a] px-2.5 py-1 rounded-md transition-colors"
            >
              ← Back to Projects
            </button>
            <h1 className="text-xl font-bold text-white flex items-center space-x-3">
              <span>{app.name}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20">
              <RotateCw size={14} />
              <span>Redeploy</span>
            </button>
            <button className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-600/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
              <Square size={14} />
              <span>Stop</span>
            </button>
          </div>
        </div>

        {/* Info Strip */}
        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-zinc-400 border-t border-[#27272a]/60">
          <div>Repository: <span className="text-zinc-200">{app.gitRepository}</span></div>
          <div>Branch: <span className="text-orange-400">{app.gitBranch}</span></div>
          <div>Buildpack: <span className="text-emerald-400 uppercase">{app.buildPack}</span></div>
          <div>FQDN: <a href={app.fqdn} target="_blank" rel="noreferrer" className="text-orange-400 underline">{app.fqdn}</a></div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#27272a] space-x-6">
        {[
          { id: 'general', label: 'General Configuration', icon: Settings },
          { id: 'env', label: 'Environment Variables', icon: Key },
          { id: 'deployments', label: 'Deployments History', icon: Clock },
          { id: 'logs', label: 'Live Logs & Terminal', icon: TerminalIcon },
          { id: 'settings', label: 'Advanced Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 pb-3 text-xs font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'general' && (
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white">Build & Runtime Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Git Repository URL</label>
              <input
                type="text"
                defaultValue={app.gitRepository}
                className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Git Branch</label>
              <input
                type="text"
                defaultValue={app.gitBranch}
                className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Domains / FQDN</label>
              <input
                type="text"
                defaultValue={app.fqdn}
                className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1">Port Mapping (Exposed:Container)</label>
              <input
                type="text"
                defaultValue={app.ports}
                className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold">
            Save Changes
          </button>
        </div>
      )}

      {activeTab === 'env' && (
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Environment Variables</h3>
              <p className="text-xs text-zinc-400">Environment variables injected into your container runtime.</p>
            </div>
          </div>

          {/* Add New Variable Form */}
          <div className="flex items-center space-x-3 bg-[#101010] p-3 rounded-xl border border-[#27272a]">
            <input
              type="text"
              placeholder="KEY (e.g. DATABASE_URL)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5 text-xs text-zinc-100 font-mono w-1/3 focus:outline-none focus:border-orange-500"
            />
            <input
              type="text"
              placeholder="VALUE"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-[#18181b] border border-[#27272a] rounded-lg px-3 py-1.5 text-xs text-zinc-100 font-mono flex-1 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={handleAddEnv}
              className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>

          {/* Variables Table */}
          <div className="space-y-2">
            {envVars.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-[#141416] border border-[#27272a] px-4 py-2.5 rounded-lg text-xs font-mono"
              >
                <span className="font-bold text-orange-400 w-1/3 truncate">{item.key}</span>
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-zinc-300 truncate">
                    {item.isSecret && !showSecrets[item.id] ? '••••••••••••••••' : item.value}
                  </span>
                  {item.isSecret && (
                    <button
                      onClick={() => setShowSecrets({ ...showSecrets, [item.id]: !showSecrets[item.id] })}
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      {showSecrets[item.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteEnv(item.id)}
                  className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-[#101010] border border-[#27272a] rounded-xl p-4 space-y-2 font-mono text-xs shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <div className="flex items-center space-x-2">
              <TerminalIcon size={16} className="text-orange-500" />
              <span className="text-zinc-300 font-bold">Build & Container Stream Logs</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              Live Stream
            </span>
          </div>

          <div className="space-y-1 py-2 text-zinc-300 overflow-x-auto max-h-96">
            {mockLogs.map((log, idx) => (
              <div key={idx} className="hover:bg-zinc-900/50 px-2 py-0.5 rounded">
                <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('INFO') ? 'text-blue-400' : 'text-zinc-400'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
