import React, { useState } from 'react';
import { Key, Plus, Shield, Trash2, Copy, Check } from 'lucide-react';
import type { ToastMessage } from '../../../components/NotificationToast';
import { NotificationToast } from '../../../components/NotificationToast';

export const Index: React.FC = () => {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tokens, setTokens] = useState([
    { id: 'token-1', name: 'CLI Access Token', token: 'md_pat_902f8a192bc87...8271', created: '2026-07-24' }
  ]);

  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    setToast({ id: Date.now().toString(), type, title, message });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('success', 'API Token copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      {toast && <NotificationToast toast={toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-400" />
            API Tokens
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Manage Personal Access Tokens for REST API authentication.</p>
        </div>
        <button
          onClick={() => {
            const newToken = {
              id: `token-${Date.now()}`,
              name: 'New CLI Token',
              token: `md_pat_${Math.random().toString(36).substring(2, 18)}`,
              created: 'Just now'
            };
            setTokens([...tokens, newToken]);
            showToast('success', 'API Token Created!');
          }}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Token
        </button>
      </div>

      <div className="space-y-3">
        {tokens.map(t => (
          <div key={t.id} className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white font-mono">{t.name}</h3>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{t.token}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(t.id, t.token)}
                className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === t.id ? 'Copied' : 'Copy Token'}
              </button>
              <button
                onClick={() => setTokens(tokens.filter(x => x.id !== t.id))}
                className="p-1.5 text-zinc-400 hover:text-red-400 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
