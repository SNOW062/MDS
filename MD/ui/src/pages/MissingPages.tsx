import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Key } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { allTranslations } from '../i18n/translations';
import { AddKeyModal } from '../components/modals/AddKeyModal';

export function KeysPage() {
  const { language } = useLanguage();
  const t = (key: string) => allTranslations[language]?.[key] || allTranslations['en']?.[key] || key;

  const [isAddKeyOpen, setIsAddKeyOpen] = useState(false);
  const [keysList, setKeysList] = useState([
    { id: '0', name: 'Default Coolify Host SSH Key', fingerprint: 'SHA256:4k9Xz...8Mpq1L', isDefault: true }
  ]);

  const handleSaveKey = (keyData: { name: string; description: string; privateKey: string }) => {
    const newKey = {
      id: Date.now().toString(),
      name: keyData.name,
      fingerprint: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
      isDefault: false
    };
    setKeysList(prev => [...prev, newKey]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            {t('keys.title')}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">{t('keys.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsAddKeyOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" />
          {t('button.add_key')}
        </button>
      </div>

      <div className="space-y-3">
        {keysList.map(item => (
          <div key={item.id} className="p-5 bg-[#18181b] border border-[#27272a] hover:border-emerald-500/30 rounded-xl space-y-3 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    {item.name}
                    {item.isDefault && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                        Default
                      </span>
                    )}
                  </h4>
                  <p className="text-xs font-mono text-zinc-500 mt-0.5">{item.fingerprint}</p>
                </div>
              </div>
              <span className="text-xs text-zinc-400 bg-[#0f0f11] px-3 py-1 rounded border border-[#27272a]">
                Active for localhost
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Dark-Mode Add Key Modal (No Browser Alert/Prompt!) */}
      <AddKeyModal
        isOpen={isAddKeyOpen}
        onClose={() => setIsAddKeyOpen(false)}
        onSave={handleSaveKey}
      />
    </div>
  );
}

export function DestinationsPage() {
  const { language } = useLanguage();
  const t = (key: string) => allTranslations[language]?.[key] || allTranslations['en']?.[key] || key;

  const [destinations] = useState([
    { id: 'dest-local', name: 'Localhost Docker Engine', type: 'Standalone Docker', isDefault: true, status: 'Active' },
    { id: 'dest-remote-1', name: 'Frankfurt Production Cluster', type: 'Docker Swarm', isDefault: false, status: 'Active' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            {t('destinations.title')}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">{t('destinations.subtitle')}</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('button.create')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations.map((dest) => (
          <div key={dest.id} className="p-5 bg-[#18181b] border border-[#27272a] rounded-xl space-y-4 hover:border-indigo-500/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    {dest.name}
                    {dest.isDefault && (
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
                        Default
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-zinc-400">{dest.type}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StoragePage() {
  const { language } = useLanguage();
  const t = (key: string) => allTranslations[language]?.[key] || allTranslations['en']?.[key] || key;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            {t('storage.title')}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">{t('storage.subtitle')}</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('button.create')}
        </button>
      </div>

      <div className="p-8 bg-[#18181b] border border-[#27272a] rounded-xl text-center space-y-3">
        <h3 className="text-base font-semibold text-white">{t('storage.title')}</h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">{t('storage.subtitle')}</p>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { language } = useLanguage();
  const t = (key: string) => allTranslations[language]?.[key] || allTranslations['en']?.[key] || key;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-[#27272a] pb-5">
        <h1 className="text-2xl font-bold text-white">{t('profile.title')}</h1>
        <p className="text-xs text-zinc-400 mt-1">{t('profile.subtitle')}</p>
      </div>

      <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl space-y-4">
        <h3 className="text-sm font-semibold text-white">{t('profile.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Name / Username</label>
            <input type="text" defaultValue="Admin User" className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Email</label>
            <input type="email" defaultValue="admin@masterdeploy.local" className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-colors">
          {t('button.save')}
        </button>
      </div>
    </div>
  );
}
