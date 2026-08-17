// completed ui_page_057 — Rewritten with OpenApi client (Show.php parity)
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft, Key, Plus, Trash2, RefreshCw,
  CheckCircle, XCircle, Loader2, Copy, Check, Shield, AlertCircle
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { listPrivateKeys, createPrivateKey, deletePrivateKey, type PrivateKey } from '../../api/security';
import OpenApi from '../../api/OpenApi';
import { mockPrivateKeys } from '../../mocks/private_keys';

type ConnectionStatus = 'idle' | 'checking' | 'reachable' | 'unreachable';

const SERVER_TABS = (uuid: string) => [
  { to: `/server/${uuid}`, label: 'Konfigurasiya' },
  { to: `/server/${uuid}/private-key`, label: 'Private Key' },
  { to: `/server/${uuid}/ca-certificate`, label: 'CA Certificate' },
  { to: `/server/${uuid}/proxy`, label: 'Proxy' },
  { to: `/server/${uuid}/resources`, label: 'Resources' },
  { to: `/server/${uuid}/log-drains`, label: 'Log Drains' },
  { to: `/server/${uuid}/terminal`, label: 'Terminal' },
  { to: `/server/${uuid}/charts`, label: 'Monitorinq' },
  { to: `/server/${uuid}/security`, label: 'Security' },
];

export default function ServerPrivateKeyPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [keys, setKeys] = useState<PrivateKey[]>([]);
  const [currentKeyUuid, setCurrentKeyUuid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settingKeyUuid, setSettingKeyUuid] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState({ name: '', description: '', private_key: '' });
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!uuid) return;
    setIsLoading(true);
    setIsApiError(false);
    try {
      // Server-e aid available-keys endpointinden calisaq
      try {
        const res = await OpenApi.get(`/servers/${uuid}/available-keys`);
        const d = res.data;
        const availableKeys: PrivateKey[] = (d.available_keys || []).map((k: any) => ({
          uuid: k.id || k.uuid || '',
          name: k.name,
          description: k.description || null,
          is_git_related: false,
          created_at: k.created_at,
          public_key: k.public_key || null
        }));
        setKeys(availableKeys.length > 0 ? availableKeys : mockPrivateKeys);
        setCurrentKeyUuid(d.current_private_key_id || null);
        if (availableKeys.length === 0) setIsApiError(true);
      } catch {
        // Fallback: global key siyahisi
        const data = await listPrivateKeys();
        const filtered = (data || []).filter(k => !k.is_git_related);
        setKeys(filtered.length > 0 ? filtered : mockPrivateKeys);
        if (filtered.length === 0) setIsApiError(true);
      }
    } catch {
      setKeys(mockPrivateKeys);
      setIsApiError(true);
    } finally {
      setIsLoading(false);
    }
  }, [uuid]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Coolify: setPrivateKey()
  const handleSetPrivateKey = async (keyUuid: string) => {
    if (!uuid) return;
    setSettingKeyUuid(keyUuid);
    try {
      await OpenApi.post(`/servers/${uuid}/private-key`, { private_key_id: keyUuid });
      setCurrentKeyUuid(keyUuid);
      toast.success('Private key ugurla yenilendi!');
      // Coolify: validateConnection with new key
      setConnectionStatus('checking');
      const connRes = await OpenApi.post(`/servers/${uuid}/check-connection`, {});
      const connData = connRes.data;
      setConnectionStatus(connData.success ? 'reachable' : 'unreachable');
      if (!connData.success) toast.error(connData.message || 'Server erisemez.');
    } catch {
      toast.error('Acar teyın edilərkən xeta.');
    } finally {
      setSettingKeyUuid(null);
    }
  };

  // Coolify: generatePrivateKey()
  const handleGenerateKey = async (type: 'ed25519' | 'rsa') => {
    setIsGenerating(true);
    const name = `key-${type}-${Math.random().toString(36).substring(2, 7)}`;
    try {
      const res = await OpenApi.post('/security/keys/generate', {
        name,
        description: `Auto-generated ${type.toUpperCase()} key`,
        key_type: type
      });
      if (res.data?.public_key) {
        navigator.clipboard.writeText(res.data.public_key);
        toast.success(`${type.toUpperCase()} acari yaradildi. Public key panova kopyalandi!`);
      } else {
        toast.success(`${type.toUpperCase()} acari uğurla yaradildi!`);
      }
      fetchData();
    } catch {
      toast.error('Acar yaradila bilmedi.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Coolify: checkConnection()
  const handleCheckConnection = async () => {
    if (!uuid) return;
    setConnectionStatus('checking');
    try {
      const res = await OpenApi.post(`/servers/${uuid}/validate`, { install: false });
      const isOk = res.data?.message?.toLowerCase().includes('success') || res.status === 200;
      setConnectionStatus(isOk ? 'reachable' : 'unreachable');
      toast[isOk ? 'success' : 'error'](res.data?.message || (isOk ? 'Server erisebilir.' : 'Server erisemez.'));
    } catch {
      setConnectionStatus('unreachable');
      toast.error('Baglantı xetası.');
    }
  };

  const handleDeleteKey = async (keyUuid: string) => {
    if (!confirm('Bu SSH acarini silmek istədiginizden əminsiniz?')) return;
    try {
      await deletePrivateKey(keyUuid);
      toast.success('Acar silindi.');
      fetchData();
    } catch {
      toast.error('Acar silinerkən xeta.');
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.name.trim() || !newKey.private_key.trim()) {
      toast.error('Ad ve Private Key mecburidir.');
      return;
    }
    setIsSaving(true);
    try {
      await createPrivateKey({
        name: newKey.name.trim(),
        description: newKey.description.trim() || undefined,
        private_key: newKey.private_key.trim()
      });
      toast.success('Acar elave edildi!');
      setNewKey({ name: '', description: '', private_key: '' });
      setShowAddForm(false);
      fetchData();
    } catch {
      toast.error('Acar saxlanilarkən xeta.');
    } finally {
      setIsSaving(false);
    }
  };

  const copyKey = (text: string, id: string) => {
    navigator.clipboard.writeText(text || '');
    setCopiedKeyId(id);
    toast.success('Acar panova kopyalandi.');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const tabs = SERVER_TABS(uuid || '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/servers')}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Private Keys</h1>
      </div>

      {/* Server Tabs */}
      <div className="flex flex-wrap gap-0 border-b border-[var(--border-color)]">
        {tabs.map(tab => {
          const isActive = tab.to === `/server/${uuid}/private-key`;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 -mb-px ${
                isActive
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" />
            Private Keys Konfigurasyonu
          </h2>
          {connectionStatus !== 'idle' && (
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              connectionStatus === 'checking' ? 'bg-amber-500/10 text-amber-400'
              : connectionStatus === 'reachable' ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
            }`}>
              {connectionStatus === 'checking' && <Loader2 className="h-3 w-3 animate-spin" />}
              {connectionStatus === 'reachable' && <CheckCircle className="h-3 w-3" />}
              {connectionStatus === 'unreachable' && <XCircle className="h-3 w-3" />}
              {connectionStatus === 'checking' ? 'Yoxlanilir...' : connectionStatus === 'reachable' ? 'Erisebilir' : 'Erisemir'}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleGenerateKey('ed25519')} disabled={isGenerating}
            className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50">
            {isGenerating ? <Loader2 className="h-3 w-3 animate-spin inline mr-1" /> : null}ED25519 Yarat
          </button>
          <button onClick={() => handleGenerateKey('rsa')} disabled={isGenerating}
            className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50">
            RSA Yarat
          </button>
          <button onClick={() => setShowAddForm(p => !p)}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer">
            <Plus className="h-3.5 w-3.5" /> Manual Elave Et
          </button>
          <button onClick={handleCheckConnection} disabled={connectionStatus === 'checking'}
            className="flex items-center gap-1 bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer">
            <RefreshCw className={`h-3.5 w-3.5 ${connectionStatus === 'checking' ? 'animate-spin' : ''}`} />
            Baglantını Yoxla
          </button>
        </div>
      </div>

      {/* API Error Banner */}
      {isApiError && (
        <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-400">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>Backend cavab vermir — numune acarlar gosterilir. Real acarlar ucun serverin islediginden emin olun.</span>
        </div>
      )}

      {/* Manual Add Form */}
      {showAddForm && (
        <form onSubmit={handleManualAdd} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-5 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Yeni Sexsi Acar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase">Ad *</label>
              <input type="text" value={newKey.name} onChange={e => setNewKey(p => ({ ...p, name: e.target.value }))}
                placeholder="Mes. production-key"
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 h-[38px]" required />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase">Acıqlama</label>
              <input type="text" value={newKey.description} onChange={e => setNewKey(p => ({ ...p, description: e.target.value }))}
                placeholder="Isteye bagli"
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 h-[38px]" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase">Private Key (PEM) *</label>
            <textarea value={newKey.private_key} onChange={e => setNewKey(p => ({ ...p, private_key: e.target.value }))}
              placeholder={"-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----"}
              rows={5} className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 resize-none" required />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] text-white rounded text-xs font-semibold cursor-pointer">
              Legv Et
            </button>
            <button type="submit" disabled={isSaving}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold cursor-pointer disabled:opacity-60">
              {isSaving ? 'Saxlanilir...' : 'Acari Saxla'}
            </button>
          </div>
        </form>
      )}

      {/* Key Cards */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
          <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
          <span className="text-xs text-[var(--text-secondary)]">Acarlar yuklenir...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keys.map(pk => {
            const keyId = pk.uuid || pk.id || '';
            const isCurrentKey = currentKeyUuid === keyId;
            const isSetting = settingKeyUuid === keyId;
            return (
              <div key={keyId} className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                isCurrentKey ? 'bg-indigo-950/20 border-indigo-900/40' : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-indigo-900/40'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Key className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      <h3 className="text-xs font-bold text-white truncate">{pk.name}</h3>
                      {isCurrentKey && (
                        <span className="px-1.5 py-0.5 bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 rounded text-[9px] font-bold uppercase shrink-0">
                          Aktiv
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5 pl-5">{pk.description || 'Acıqlama daxil edilmeyib.'}</p>
                    {pk.public_key && (
                      <p className="text-[9px] font-mono text-zinc-600 truncate bg-black/30 px-2 py-1 rounded mt-1.5 ml-5">
                        {pk.public_key.substring(0, 55)}...
                      </p>
                    )}
                    <p className="text-[9px] text-zinc-600 mt-1 pl-5">{new Date(pk.created_at).toLocaleDateString('az-AZ')}</p>
                  </div>
                  {!isApiError && (
                    <button onClick={() => handleDeleteKey(keyId)} className="text-zinc-600 hover:text-red-500 transition-colors p-1 shrink-0">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => copyKey(pk.public_key || pk.private_key || '', keyId)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-[var(--bg-tertiary)] hover:bg-[#3f3f46] text-white rounded text-[10px] font-semibold transition-colors cursor-pointer"
                  >
                    {copiedKeyId === keyId
                      ? <><Check className="h-3 w-3 text-emerald-400" /> Kopyalandi</>
                      : <><Copy className="h-3 w-3" /> Key Kopyala</>}
                  </button>
                  {isCurrentKey ? (
                    <button disabled className="flex-1 py-1.5 bg-indigo-950/30 border border-indigo-900/30 text-indigo-500 rounded text-[10px] font-semibold cursor-not-allowed">
                      Istifade Olunur
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSetPrivateKey(keyId)}
                      disabled={isSetting || isApiError}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-semibold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {isSetting ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                      Bu Acari Secin
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
