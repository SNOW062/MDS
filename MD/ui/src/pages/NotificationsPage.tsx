import React from 'react';
import { Bell, MessageSquare, Send, Mail, Webhook } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const channels = [
    { name: 'Discord Bot', icon: MessageSquare, status: 'Enabled', desc: 'Deploy notifications via Discord Webhook' },
    { name: 'Telegram Bot', icon: Send, status: 'Disabled', desc: 'Realtime deployment alerts via Telegram Bot' },
    { name: 'SMTP Email', icon: Mail, status: 'Enabled', desc: 'Server health and backup email alerts' },
    { name: 'Custom Webhook', icon: Webhook, status: 'Disabled', desc: 'Send JSON payloads to external Webhooks' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Notifications</h1>
        <p className="text-xs text-zinc-400 mt-1">Configure alert channels for deployments, server health, and backups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((c, i) => {
          const Icon = c.icon;
          const isEnabled = c.status === 'Enabled';
          return (
            <div key={i} className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-zinc-400">{c.desc}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isEnabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                  {c.status}
                </span>
              </div>
              <button className="w-full bg-[#27272a] hover:bg-zinc-700 text-xs text-zinc-200 font-semibold py-2 rounded-lg transition-colors border border-zinc-600">
                Configure Settings
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
