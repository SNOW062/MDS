import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export const Show: React.FC = () => {
  const [refreshInterval, setRefreshInterval] = useState('5');
  const [historyDays, setHistoryDays] = useState('7');

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Sentinel Realtime Monitoring
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Realtime CPU, RAM, and Disk metrics collector daemon.</p>
        </div>
        <button className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold text-xs rounded-lg transition-colors">
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-2">
          <span className="text-xs text-zinc-400 font-semibold block">Metrics Refresh Rate (s)</span>
          <input
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white font-mono"
          />
        </div>
        <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-2">
          <span className="text-xs text-zinc-400 font-semibold block">Metrics History Retention (Days)</span>
          <input
            type="number"
            value={historyDays}
            onChange={(e) => setHistoryDays(e.target.value)}
            className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white font-mono"
          />
        </div>
        <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-2">
          <span className="text-xs text-zinc-400 font-semibold block">Sentinel Daemon Status</span>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 font-mono">Active & Collecting</span>
          </div>
        </div>
      </div>
    </div>
  );
};
