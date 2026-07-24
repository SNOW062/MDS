import React, { useState } from 'react';
import { 
  X, GitBranch, Box, Database, Server, Cpu, Layers, HardDrive, 
  Terminal, ArrowRight, Code, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { allTranslations } from '../../i18n/translations';

interface NewResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: string, details?: any) => void;
}

export function NewResourceModal({ isOpen, onClose, onSelectType }: NewResourceModalProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'apps' | 'databases' | 'services'>('apps');

  const t = (key: string): string => {
    return allTranslations[language]?.[key] || allTranslations['en']?.[key] || key;
  };

  if (!isOpen) return null;

  const appTypes = [
    { id: 'public-git', name: 'Public Git Repository', desc: 'Build from GitHub, GitLab or Bitbucket without credentials', icon: GitBranch, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { id: 'private-git', name: 'Private Git Repository', desc: 'Build using Deploy Keys or App Tokens', icon: ShieldCheck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { id: 'dockerfile', name: 'Dockerfile', desc: 'Deploy from a custom Dockerfile', icon: Code, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { id: 'docker-compose', name: 'Docker Compose', desc: 'Deploy multi-container apps from compose.yml', icon: Layers, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { id: 'docker-image', name: 'Existing Docker Image', desc: 'Run pre-built image from Docker Hub / GHCR', icon: Box, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' }
  ];

  const dbTypes = [
    { id: 'postgres', name: 'PostgreSQL', desc: 'Relational Database Engine', version: '16 / 15' },
    { id: 'mysql', name: 'MySQL', desc: 'Popular open-source relational DB', version: '8.0' },
    { id: 'mariadb', name: 'MariaDB', desc: 'Performance-optimized MySQL fork', version: '11.0' },
    { id: 'mongodb', name: 'MongoDB', desc: 'Document NoSQL database engine', version: '7.0' },
    { id: 'redis', name: 'Redis / KeyDB', desc: 'In-Memory Cache & Key-Value store', version: '7.2' },
    { id: 'clickhouse', name: 'ClickHouse', desc: 'Column-oriented DBMS for Big Data analytics', version: '24.0' }
  ];

  const serviceTypes = [
    { id: 'supabase', name: 'Supabase', desc: 'Open Source Firebase Alternative (Auth, DB, Storage)' },
    { id: 'n8n', name: 'n8n Workflow', desc: 'Workflow & API integration automation platform' },
    { id: 'minio', name: 'MinIO S3', desc: 'High Performance S3 Compatible Object Storage' },
    { id: 'pocketbase', name: 'PocketBase', desc: 'Open Source backend in 1 file (Go + SQLite)' },
    { id: 'plausible', name: 'Plausible Analytics', desc: 'Privacy-friendly web analytics tool' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-400" />
              {t('modal.new_resource.title')}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">{t('modal.new_resource.subtitle')}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#27272a] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#27272a] px-6 bg-[#0f0f11]">
          <button
            onClick={() => setActiveTab('apps')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'apps'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            {t('tab.apps')}
          </button>
          <button
            onClick={() => setActiveTab('databases')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'databases'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-4 h-4" />
            {t('tab.databases')}
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'services'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            {t('tab.services')}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'apps' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectType('app', item)}
                    className="p-4 bg-[#0f0f11] border border-[#27272a] rounded-xl hover:border-indigo-500/50 hover:bg-[#27272a]/50 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-lg border ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                          {item.name}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'databases' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dbTypes.map((db) => (
                <div
                  key={db.id}
                  onClick={() => onSelectType('database', db)}
                  className="p-4 bg-[#0f0f11] border border-[#27272a] rounded-xl hover:border-emerald-500/50 hover:bg-[#27272a]/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                        <Database className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a]">
                        v{db.version}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {db.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{db.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => onSelectType('service', srv)}
                  className="p-4 bg-[#0f0f11] border border-[#27272a] rounded-xl hover:border-purple-500/50 hover:bg-[#27272a]/50 transition-all cursor-pointer group flex items-start gap-3"
                >
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                      {srv.name}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#27272a] bg-[#0f0f11] flex items-center justify-between text-xs text-zinc-400">
          <span>{t('modal.new_resource.subtitle')}</span>
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg transition-colors font-medium"
          >
            {t('button.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
