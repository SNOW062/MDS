import React, { useState, useEffect } from 'react';
import { Users, Plus, Shield, UserCheck, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const TeamsPage: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Admin');

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/v1/teams');
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch team members", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    try {
      const res = await fetch('/api/v1/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteName,
          email: inviteEmail,
          role: inviteRole,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchMembers();
        setShowInviteModal(false);
        setInviteName('');
        setInviteEmail('');
      } else {
        alert('Failed to invite member: ' + data.message);
      }
    } catch (err: any) {
      alert('Error inviting member: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Teams & Members</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage team members, roles, and resource access policies.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors"
        >
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
          <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
            {members.length} {members.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>

        <div className="divide-y divide-[#27272a]">
          {members.map((m) => (
            <div key={m.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#1f1f23] transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                  {m.name ? m.name[0].toUpperCase() : '?'}
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

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#27272a] flex items-center justify-between bg-[#141416]">
              <h3 className="text-sm font-bold text-white">Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-zinc-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleInvite} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-[#101010] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-orange-500 focus:outline-none"
                >
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="text-xs text-zinc-400 hover:text-white px-4 py-2 rounded-lg bg-[#27272a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
