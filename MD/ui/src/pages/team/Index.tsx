import React, { useState } from 'react';
import { Users, UserPlus, Mail, Shield, Check, Trash2 } from 'lucide-react';

export const Index: React.FC = () => {
  const [members, setMembers] = useState([
    { id: '1', name: 'Nesib M.', email: 'nesib@example.com', role: 'Owner', status: 'Active' },
    { id: '2', name: 'Dev Ops', email: 'dev@example.com', role: 'Admin', status: 'Active' }
  ]);

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Team Members & Access
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Manage team members, roles, and invitation links.</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors">
          <UserPlus className="w-4 h-4" />
          Invite Team Member
        </button>
      </div>

      <div className="space-y-3">
        {members.map(m => (
          <div key={m.id} className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 font-bold flex items-center justify-center text-xs border border-purple-500/30">
                {m.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">{m.name}</h3>
                <p className="text-[11px] text-zinc-500">{m.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#27272a] text-zinc-300 border border-zinc-700">
                {m.role}
              </span>
              <button onClick={() => setMembers(members.filter(x => x.id !== m.id))} className="p-1.5 text-zinc-400 hover:text-red-400 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
