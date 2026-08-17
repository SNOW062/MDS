// completed ui_page_056
import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2, KeyRound, Loader2, Copy, Check, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';
import { listPrivateKeys, createPrivateKey, deletePrivateKey, type PrivateKey } from '../../api/security';
import { mockPrivateKeys } from '../../mocks/private_keys';

// Generate endpoint ucun OpenApi
import OpenApi from '../../api/OpenApi';


export default function SshKeysPage() {
  const { t } = useTranslation();
  const toast = useToast();

  const [keys, setKeys] = useState<PrivateKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const [newKey, setNewKey] = useState({
    name: '',
    description: '',
    private_key: ''
  });

  const fetchKeys = async () => {
    setIsLoading(true);
    setIsApiError(false);
    try {
      const data = await listPrivateKeys();
      // is_git_related=false olanlari filtrele (Coolify davranisi)
      const filtered = (data || []).filter(k => !k.is_git_related);
      if (filtered.length > 0) {
        setKeys(filtered);
      } else {
        setKeys(mockPrivateKeys);
        setIsApiError(true);
      }
    } catch {
      setKeys(mockPrivateKeys);
      setIsApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchKeys(); }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.name.trim() || !newKey.private_key.trim()) {
      toast.error('Acar adi ve Private Key mecburidir.');
      return;
    }
    setIsSubmitting(true);
    try {
      await createPrivateKey({
        name: newKey.name.trim(),
        description: newKey.description.trim() || undefined,
        private_key: newKey.private_key.trim()
      });
      toast.success('SSH Private Key ugurla elave edildi!');
      setNewKey({ name: '', description: '', private_key: '' });
      setShowAddForm(false);
      fetchKeys();
    } catch {
      toast.error('Acar saxlanilarkən xeta bas verdi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateKey = async (type: 'ed25519' | 'rsa') => {
    setIsSubmitting(true);
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
        toast.success(`${type.toUpperCase()} acari yaradildi!`);
      }
      fetchKeys();
    } catch {
      toast.error('Acar yaradila bilmedi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteKey = async (uuid: string) => {
    if (!confirm('Bu SSH acarini silmek istədiginizden əminsiniz?')) return;
    try {
      await deletePrivateKey(uuid);
      toast.success('SSH acari silindi.');
      fetchKeys();
    } catch {
      toast.error('Acar silinerkən xeta.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text || '');
    setCopiedKeyId(id);
    toast.success('Acar kopyalandi.');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
        <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-secondary)]">Acarlar yuklenir...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-md font-bold text-white flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-indigo-500" />
            {t.security?.ssh_keys || 'SSH Keys'}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Serverlerle tehlukesiz SSH baglantisi ucun acarlar.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <button
            onClick={() => generateKey('ed25519')}
            disabled={isSubmitting}
            className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-3 w-3 animate-spin inline mr-1" /> : null}
            ED25519 Yarat
          </button>
          <button
            onClick={() => generateKey('rsa')}
            disabled={isSubmitting}
            className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            RSA Yarat
          </button>
          <button
            onClick={() => setShowAddForm(prev => !prev)}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Manual Elave Et
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
        <form onSubmit={handleCreateKey} className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] p-5 rounded-xl space-y-4 max-w-3xl">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Yeni Sexsi Acar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase">Acar Adi *</label>
              <input
                type="text"
                value={newKey.name}
                onChange={e => setNewKey(p => ({ ...p, name: e.target.value }))}
                placeholder="Mes. production-key"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 h-[38px]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase">Acıqlama</label>
              <input
                type="text"
                value={newKey.description}
                onChange={e => setNewKey(p => ({ ...p, description: e.target.value }))}
                placeholder="Isteye bagli"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 h-[38px]"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase">Private Key (PEM) *</label>
            <textarea
              value={newKey.private_key}
              onChange={e => setNewKey(p => ({ ...p, private_key: e.target.value }))}
              placeholder={"-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----"}
              rows={6}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 resize-none"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] text-white rounded text-xs font-semibold cursor-pointer"
            >
              Legv Et
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? 'Saxlanilir...' : 'Acari Saxla'}
            </button>
          </div>
        </form>
      )}

      {/* Key Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keys.map(key => {
          const keyId = key.uuid || key.id || '';
          const displayText = key.public_key || key.private_key || '—';
          return (
            <div
              key={keyId}
              className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex flex-col justify-between gap-3 hover:border-indigo-900/50 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 min-w-0">
                    <Key className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                    <h3 className="text-xs font-bold text-white truncate">{key.name}</h3>
                  </div>
                  {!isApiError && (
                    <button
                      onClick={() => handleDeleteKey(keyId)}
                      className="text-zinc-600 hover:text-red-500 transition-colors p-1 shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 pl-5">
                  {key.description || 'Acıqlama daxil edilmeyib.'}
                </p>
                {/* Public key preview */}
                {key.public_key && (
                  <div className="mt-2 pl-5">
                    <p className="text-[9px] font-mono text-zinc-600 truncate bg-black/30 px-2 py-1 rounded">
                      {key.public_key.substring(0, 60)}...
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                <span className="text-[9px] text-zinc-600">
                  {new Date(key.created_at).toLocaleDateString('az-AZ')}
                </span>
                <button
                  onClick={() => copyToClipboard(displayText, keyId)}
                  className="flex items-center gap-1 text-[10px] font-semibold cursor-pointer transition-colors"
                  style={{ color: copiedKeyId === keyId ? '#34d399' : '#818cf8' }}
                >
                  {copiedKeyId === keyId ? (
                    <><Check className="h-3.5 w-3.5" /> Kopyalandi!</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" /> Acari Kopyala</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
