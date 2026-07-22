import React from 'react';
import { Users, Plus, Shield, UserCheck } from 'lucide-react';

export const TeamsPage: React.FC = () => {
  const members = [
    { name: 'Admin Root', email: 'test@example.com', role: 'Owner', status: 'Active' },
    { name: 'Developer User', email: 'dev@example.com', role: 'Admin', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Teams & Members</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage team members, roles, and resource access policies.</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2">
          <Plus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-[#27272a] bg-[#141416] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users size={18} className="text-orange-500" />
            <h3 className="text-sm font-bold text-white">admin's Team Members</h3>
          </div>
          <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">2 Members</span>
        </div>

        <div className="divide-y divide-[#27272a]">
          {members.map((m, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#1f1f23]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                  {m.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-200">{m.name}</div>
                  <div className="text-xs text-zinc-500 font-mono">{m.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="bg-zinc-800 text-zinc-300 font-mono px-2.5 py-1 rounded border border-zinc-700">{m.role}</span>
                <span className="text-emerald-400 font-mono">● {m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
