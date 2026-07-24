import React, { useState } from 'react';
import { X, Key, Plus, ShieldCheck, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AddKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (keyData: { name: string; description: string; privateKey: string }) => void;
}

export function AddKeyModal({ isOpen, onClose, onSave }: AddKeyModalProps) {
  const { language } = useLanguage();
  const [name, setName] = useState(`key-ed25519-${Math.floor(1000 + Math.random() * 9000)}`);
  const [description, setDescription] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, description, privateKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Добавление SSH Ключа (Add Private Key)</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Ключи используются для безопасного SSH-подключения к VPS без паролей</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#27272a] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
              Название ключа (Name) <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. production-vps-key"
              className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
              Описание (Description)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Key for Frankfurt Hetzner Cloud Node"
              className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
              Приватный ключ (Private Key)
            </label>
            <textarea
              rows={6}
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="-----BEGIN OPENSSH PRIVATE KEY-----&#10;..."
              className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <p className="text-[11px] text-amber-400/90 mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              Не используйте ключи, защищенные паролем (passphrase-protected keys).
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-[#27272a] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-orange-600/20"
            >
              Сохранить ключ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
