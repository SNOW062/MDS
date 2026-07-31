import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';
import { Users, UserPlus, Mail, Trash2, Shield, Copy, Check } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
}

interface TeamInvitation {
  id: number;
  uuid: string;
  email: string;
  role: string;
  link: string;
  created_at: string;
}

export default function TeamsPage() {
  const { t } = useTranslation();
  const toast = useToast();

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const membersRes = await fetch('/api/teams/current/members');
      if (membersRes.ok) {
        const membersData = await membersRes.json();
        setMembers(membersData);
      }

      const invRes = await fetch('/api/teams/current/invitations');
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

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Zəhmət olmasa e-poçt ünvanını daxil edin.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/teams/current/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
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
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelInvitation = async (id: number) => {
    if (!confirm('Bu dəvət linkini ləğv etmək istədiyinizdən əminsiniz?')) return;

    try {
      const res = await fetch(`/api/teams/current/invitations/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Dəvət uğurla ləğv edildi.');
        fetchData();
      } else {
        toast.error('Ləğv etmə xətası.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Dəvət linki kopyalandı!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-400" />
          Komanda Tənzimləmələri (Teams)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol tərəf: Üzv dəvət et */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 h-fit space-y-6">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-indigo-400" />
            Yeni Üzv Dəvət Et
          </h2>
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">E-POÇT ÜNVANI</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#a1a1aa] font-semibold mb-2">ROL</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="member">Member (Oxuma/Yazma)</option>
                <option value="viewer">Viewer (Yalnız Oxuma)</option>
                <option value="admin">Admin (Tam Səlahiyyət)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Yaradılır...' : 'Dəvət Linki Generasiya Et'}
            </button>
          </form>
        </div>

        {/* Sağ tərəf: Aktiv Üzvlər & Dəvətlər */}
        <div className="lg:col-span-2 space-y-6">
          {/* Siyahı: Aktiv Üzvlər */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              Aktiv Üzvlər ({members.length})
            </h2>
            <div className="divide-y divide-[#27272a]">
              {members.map((member) => (
                <div key={member.id} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name || 'İstifadəçi'}</p>
                    <p className="text-xs text-[#a1a1aa]">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Siyahı: Pending Dəvətlər */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-400" />
              Gözləyən (Pending) Dəvətlər ({invitations.length})
            </h2>
            {invitations.length === 0 ? (
              <p className="text-xs text-[#a1a1aa] italic">Hal-hazırda gözləyən dəvət linki yoxdur.</p>
            ) : (
              <div className="divide-y divide-[#27272a]">
                {invitations.map((inv) => (
                  <div key={inv.id} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{inv.email}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[#27272a] text-indigo-300 px-2 py-0.5 rounded font-bold uppercase">
                          {inv.role}
                        </span>
                        <span className="text-[10px] text-[#a1a1aa]">
                          {inv.created_at ? new Date(inv.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(inv.link, inv.id)}
                        className="p-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-zinc-300 hover:text-white rounded transition-colors"
                        title="Dəvət linkini kopyala"
                      >
                        {copiedId === inv.id ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleCancelInvitation(inv.id)}
                        className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded transition-colors"
                        title="Dəvəti ləğv et"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}