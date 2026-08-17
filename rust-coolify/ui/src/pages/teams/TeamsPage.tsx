import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../hooks/useAuth';
import { Plus, Users, Settings, ShieldAlert, Copy, Check, Eye, EyeOff, Trash2 } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  description: string;
  personal_team: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TeamInvitation {
  id: string;
  uuid: string;
  email: string;
  role: string;
  link: string;
  created_at: string;
}

export default function TeamsPage() {
  useDocumentTitle('Team');
  const { t } = useTranslation();
  const toast = useToast();
  const { user: currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'general' | 'members' | 'admin'>('members');
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [enableMcp, setEnableMcp] = useState(false);

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleLinks, setVisibleLinks] = useState<Record<string, boolean>>({});

  // Team creation modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');

  const currentUserMember = members.find((m) => m.id === String(currentUser?.id));
  const currentUserRole = currentUserMember?.role || 'member';

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` };

      const teamRes = await fetch('/api/teams/current', { headers });
      if (teamRes.ok) {
        const teamData = await teamRes.json();
        setTeam(teamData);
        setTeamName(teamData.name || '');
        setTeamDesc(teamData.description || '');
      }

      const membersRes = await fetch('/api/teams/current/members', { headers });
      if (membersRes.ok) {
        const membersData = await membersRes.json();
        setMembers(membersData);
      }

      const invRes = await fetch('/api/teams/current/invitations', { headers });
      if (invRes.ok) {
        const invData = await invRes.json();
        setInvitations(invData);
      }
    } catch (err) {
      console.error('Error fetching team data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ name: newTeamName, description: newTeamDesc }),
      });

      if (res.ok) {
        const newTeam = await res.json();
        toast.success(`"${newTeam.name}" komandası uğurla yaradıldı!`);
        setShowCreateModal(false);
        setNewTeamName('');
        setNewTeamDesc('');
        
        // Switch to the newly created team
        const switchRes = await fetch(`/api/teams/switch/${newTeam.id}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
        });
        if (switchRes.ok) {
          const switchData = await switchRes.json();
          localStorage.setItem('md_token', switchData.token);
          localStorage.setItem('md_team_id', switchData.team_id);
          window.location.reload();
        }
      } else {
        const err = await res.json();
        toast.error(err.error || 'Komanda yaradıla bilmədi.');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/teams/current', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ name: teamName, description: teamDesc }),
      });

      if (res.ok) {
        toast.success('Komanda tənzimləmələri yadda saxlanıldı.');
        fetchData();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/teams/current/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ email: email.trim(), role }),
      });

      if (!res.ok) {
        let errorMsg = 'Dəvət yaradılarkən xəta baş verdi.';
        try {
          const errData = await res.json();
          if (errData && errData.error) {
            errorMsg = errData.error;
          }
        } catch (_) {}
        toast.error(errorMsg);
        return;
      }

      toast.success('Dəvət linki uğurla generasiya olundu!');
      setEmail('');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (memberId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/teams/current/members/${memberId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        toast.success('Üzv rolu uğurla dəyişdirildi!');
        fetchData();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Rol dəyişdirilə bilmədi.');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Bu üzvü komandadan çıxarmaq istədiyinizdən əminsiniz?')) return;
    try {
      const res = await fetch(`/api/teams/current/members/${memberId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
      });
      if (res.ok) {
        toast.success('Üzv komandadan çıxarıldı.');
        fetchData();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Silinmə xətası.');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleCancelInvitation = async (id: string) => {
    if (!confirm('Bu dəvət linkini ləğv etmək istədiyinizdən əminsiniz?')) return;

    try {
      const res = await fetch(`/api/teams/current/invitations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
      });

      if (res.ok) {
        toast.success('Dəvət ləğv edildi.');
        fetchData();
      } else {
        toast.error('Ləğv etmə xətası.');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Dəvət linki kopyalandı!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLinkVisibility = (id: string) => {
    setVisibleLinks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Title Area */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
          <Users className="h-8 w-8 text-indigo-500" />
          Team
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-[#27272a]/20 hover:bg-[#27272a]/40 border border-[var(--border-color)] rounded-md text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
      <div className="text-sm text-[var(--text-secondary)] -mt-4">
        Team wide configurations.
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[var(--border-color)] pb-3 text-xs font-medium">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 -mb-3 transition-colors cursor-pointer ${
            activeTab === 'general'
              ? 'border-b-2 border-indigo-500 text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-3 -mb-3 transition-colors cursor-pointer ${
            activeTab === 'members'
              ? 'border-b-2 border-indigo-500 text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`pb-3 -mb-3 transition-colors cursor-pointer ${
            activeTab === 'admin'
              ? 'border-b-2 border-indigo-500 text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Admin View
        </button>
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="space-y-8 pt-2">
          <div>
            <h2 className="text-xl font-bold text-white">General</h2>
            <div className="text-xs text-[var(--text-secondary)] mt-1">Manage the general settings of this team.</div>
          </div>

          <form onSubmit={handleUpdateTeam} className="flex flex-col lg:flex-row items-end gap-3 max-w-5xl">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] font-bold mb-1.5">Name *</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 h-[38px] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] font-bold mb-1.5">Description</label>
                <input
                  type="text"
                  value={teamDesc}
                  onChange={(e) => setTeamDesc(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 h-[38px] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] px-3 py-2 rounded shrink-0 h-[38px]">
              <input
                type="checkbox"
                id="is_mcp_server_enabled"
                checked={enableMcp}
                onChange={(e) => setEnableMcp(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-[var(--border-color)] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="is_mcp_server_enabled" className="text-xs font-semibold text-[var(--text-primary)] cursor-pointer select-none">
                Enable MCP Server
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 bg-[#27272a]/20 hover:bg-[#27272a]/40 border border-[var(--border-color)] rounded text-xs font-semibold text-white transition-colors cursor-pointer shrink-0 h-[38px]"
            >
              Save
            </button>
          </form>

          {/* Danger Zone */}
          <div className="space-y-4 pt-4 border-t border-[var(--border-color)] max-w-5xl">
            <div>
              <h2 className="text-lg font-bold text-red-500 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Danger Zone
              </h2>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Woah. I hope you know what are you doing.</div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Delete Team</h4>
              {team?.personal_team ? (
                <div className="text-xs text-[var(--text-secondary)]">This is the default team. You can't delete it.</div>
              ) : (
                <div className="text-xs text-[var(--text-secondary)]">This will delete your team. Beware! There is no coming back!</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-8 pt-2">
          {/* Members Table */}
          <div className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-white">Members</h2>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Manage or invite members of this team.</div>
            </div>

            <div className="overflow-x-auto bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl">
              <table className="min-w-full divide-y divide-[var(--border-color)]">
                <thead>
                  <tr className="bg-[var(--bg-tertiary)]/50">
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{member.name || 'İstifadəçi'}</td>
                      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{member.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                          {member.role || 'member'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {member.id === String(currentUser?.id) ? (
                          <span className="text-[var(--text-secondary)] italic">(This is you)</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {(currentUserRole === 'owner' || currentUserRole === 'admin') && (
                              <>
                                {currentUserRole === 'owner' && (
                                  <>
                                    {member.role === 'owner' && (
                                      <>
                                        <button type="button" onClick={() => handleChangeRole(member.id, 'admin')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Admin</button>
                                        <button type="button" onClick={() => handleChangeRole(member.id, 'member')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Member</button>
                                      </>
                                    )}
                                    {member.role === 'admin' && (
                                      <>
                                        <button type="button" onClick={() => handleChangeRole(member.id, 'owner')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Owner</button>
                                        <button type="button" onClick={() => handleChangeRole(member.id, 'member')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Member</button>
                                      </>
                                    )}
                                    {member.role === 'member' && (
                                      <>
                                        <button type="button" onClick={() => handleChangeRole(member.id, 'owner')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Owner</button>
                                        <button type="button" onClick={() => handleChangeRole(member.id, 'admin')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Admin</button>
                                      </>
                                    )}
                                  </>
                                )}
                                {currentUserRole === 'admin' && member.role !== 'owner' && (
                                  <>
                                    {member.role === 'admin' && (
                                      <button type="button" onClick={() => handleChangeRole(member.id, 'member')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Member</button>
                                    )}
                                    {member.role === 'member' && (
                                      <button type="button" onClick={() => handleChangeRole(member.id, 'admin')} className="px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[var(--text-primary)]">To Admin</button>
                                    )}
                                  </>
                                )}
                                {!(currentUserRole === 'admin' && member.role === 'owner') && (
                                  <button type="button" onClick={() => handleRemoveMember(member.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-900/40 rounded text-xs font-semibold transition-colors cursor-pointer">Remove</button>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-[var(--border-color)]" />

          {/* Invite Member Form */}
          {(currentUserRole === 'owner' || currentUserRole === 'admin') && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-white">Invite New Member</h2>
              <form onSubmit={handleInvite} className="flex flex-col md:flex-row items-end gap-3 max-w-4xl">
                <div className="flex-1 flex gap-3 w-full">
                  <div className="flex-1">
                    <label className="block text-[11px] text-[var(--text-secondary)] font-bold mb-1.5">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3.5 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="w-48">
                    <label className="block text-[11px] text-[var(--text-secondary)] font-bold mb-1.5">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3.5 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 h-[38px] transition-colors"
                    >
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer h-[38px]"
                >
                  Generate Invitation Link
                </button>
              </form>
            </div>
          )}

          {/* Pending Invitations Table */}
          {(currentUserRole === 'owner' || currentUserRole === 'admin') && invitations.length > 0 && (
            <div className="space-y-3 pt-4">
              <h2 className="text-lg font-bold text-white">Pending Invitations</h2>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[var(--border-color)]">
                    <thead>
                      <tr className="bg-[var(--bg-tertiary)]/50">
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Via</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Invitation Link</th>
                        <th className="px-6 py-3.5 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {invitations.map((inv) => (
                        <tr key={inv.id} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                          <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{inv.email}</td>
                          <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">Link</td>
                          <td className="px-6 py-4 text-xs text-[var(--text-primary)] font-bold uppercase tracking-wider">{inv.role}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2 max-w-sm">
                              <input
                                type={visibleLinks[inv.id] ? "text" : "password"}
                                value={inv.link}
                                readOnly
                                className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-1.5 text-xs text-[var(--text-secondary)] flex-1 min-w-[200px]"
                              />
                              <button
                                type="button"
                                onClick={() => toggleLinkVisibility(inv.id)}
                                className="p-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:text-white cursor-pointer"
                              >
                                {visibleLinks[inv.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(inv.link, inv.id)}
                                className="px-3 py-1.5 bg-[#27272a]/20 hover:bg-[#27272a]/40 border border-[var(--border-color)] rounded text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                              >
                                {copiedId === inv.id ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                                Copy
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              type="button"
                              onClick={() => handleCancelInvitation(inv.id)}
                              className="p-1.5 bg-red-950/20 hover:bg-red-900/40 border border-red-900/40 text-red-400 rounded transition-colors cursor-pointer"
                              title="Ləğv et"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Admin View Tab */}
      {activeTab === 'admin' && (
        <div className="space-y-4 pt-2">
          <h2 className="text-xl font-bold text-white">Admin View</h2>
          <p className="text-xs text-[var(--text-secondary)]">Manage system settings for this team (Instance Admin only).</p>
          <div className="text-xs text-[var(--text-secondary)] italic">Bu bölmə orijinal Coolify-da yalnız server admistratorlarına görünən tənzimləmələri ehtiva edir.</div>
        </div>
      )}

      {/* Create Team Overlay Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 max-w-md w-full space-y-6 shadow-2xl scale-in duration-200">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-indigo-400" />
                Yeni Komanda Yarat
              </h2>
              <p className="text-xs text-[#a1a1aa]">
                MasterDeploy üzərində yeni layihələr və serverləri idarə etmək üçün komanda əlavə edin.
              </p>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">KOMANDA ADI *</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Məs. Production Team"
                  className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-[#71717a] transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">TƏSVİR (DESCRIPTION)</label>
                <textarea
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                  placeholder="Komanda haqqında qısa məlumat..."
                  rows={3}
                  className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-[#71717a] resize-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-transparent hover:bg-[#27272a] border border-[#3f3f46] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Yaradılır...' : 'Komanda Yarat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}