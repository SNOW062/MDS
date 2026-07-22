import React from 'react';
import { Search, Bell, Plus, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

interface HeaderProps {
  currentTab: string;
  onOpenSearch: () => void;
  onNewProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenSearch, onNewProject }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'az', label: 'AZ', flag: '🇦🇿' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'tr', label: 'TR', flag: '🇹🇷' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
  ];

  return (
    <header className="h-16 border-b border-[#242427] bg-[#0f0f11]/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Breadcrumb / Title */}
      <div className="flex items-center space-x-3">
        <span className="text-xs uppercase font-mono text-zinc-500 tracking-wider">MasterDeploy</span>
        <span className="text-zinc-600">/</span>
        <span className="text-sm font-semibold capitalize text-zinc-200">{t(currentTab) || currentTab}</span>
      </div>

      {/* Actions, Language & Search */}
      <div className="flex items-center space-x-4">
        {/* Global Language Selector */}
        <div className="flex items-center space-x-1 bg-[#18181b] border border-[#27272a] p-1 rounded-lg">
          <Globe size={14} className="text-zinc-500 ml-1 mr-0.5" />
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2 py-0.5 rounded text-xs font-mono font-semibold transition-all ${
                language === lang.code
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#27272a]'
              }`}
              title={lang.label}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>

        {/* Global Search Bar (Ctrl+K) */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-3 bg-[#18181b] border border-[#27272a] hover:border-zinc-700 text-zinc-400 px-3 py-1.5 rounded-lg text-xs transition-colors w-56 justify-between group"
        >
          <div className="flex items-center space-x-2">
            <Search size={14} className="text-zinc-500 group-hover:text-zinc-300" />
            <span className="truncate">{t('searchPlaceholder')}</span>
          </div>
          <kbd className="bg-[#27272a] text-zinc-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#3f3f46]">
            Ctrl K
          </kbd>
        </button>

        {/* Global + New Resource Button (Coolify Style) */}
        <button
          onClick={onNewProject}
          className="bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md shadow-orange-600/20 active:scale-95"
        >
          <Plus size={15} />
          <span>{t('newResource')}</span>
        </button>

        {/* Notifications & Avatar */}
        <div className="flex items-center space-x-3 pl-2 border-l border-[#242427]">
          <button className="p-2 rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500" />
          </button>

          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 cursor-pointer hover:border-orange-500 transition-colors">
            MD
          </div>
        </div>
      </div>
    </header>
  );
};
