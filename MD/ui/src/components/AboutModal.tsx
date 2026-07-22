import React from 'react';
import { X, Cpu, ShieldCheck, Zap, Server, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#141417] border border-[#27272a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-[#242427] p-1.5 rounded-full transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Modal Banner & Logo */}
        <div className="bg-gradient-to-b from-orange-500/10 via-[#18181b] to-[#141417] p-8 text-center border-b border-[#27272a]/60 space-y-4">
          <div className="inline-block relative">
            <img
              src="/logo.png"
              alt="MasterDeploy MD Logo"
              className="w-24 h-24 object-contain mx-auto drop-shadow-[0_0_25px_rgba(249,115,22,0.3)] animate-pulse"
            />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-mono">
              Master<span className="text-orange-500">Deploy</span> (MD)
            </h2>
            <p className="text-xs font-mono text-orange-400 mt-1 font-semibold">
              High-Performance Self-Hosted PaaS Engine in Rust 🦀
            </p>
          </div>
        </div>

        {/* Bio & Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto font-sans">
          {/* Overview Bio */}
          <div className="space-y-2 text-xs text-zinc-300 leading-relaxed bg-[#1b1b1e] p-4 rounded-xl border border-[#2b2b2f]">
            <p>
              <strong className="text-white font-mono">MasterDeploy (MD)</strong> — Coolify platformasının 
              <strong className="text-orange-400"> Rust dilində </strong> sıfırdan yenidən icra olunmuş ultra-sürətli, 
              təhlükəsiz və az resurs istehlak edən analoqudur.
            </p>
            <p className="text-zinc-400">
              Bu proqram vasitəsilə öz VPS serverlərinizdə Git repozitoriyalarını, Docker konteynerlərini, verilənlər bazalarını (Postgres, Redis, MySQL) tək kliklə avtomatik yığa və idarə edə bilərsiniz.
            </p>
          </div>

          {/* Key Advantages Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#18181b] p-3 rounded-xl border border-[#27272a] space-y-1">
              <div className="flex items-center space-x-2 text-orange-400 font-bold font-mono">
                <Zap size={15} />
                <span>Yüksək Sürət</span>
              </div>
              <p className="text-[11px] text-zinc-400">Laravel-in 300MB RAM yeyiminə qarşı Rust API cəmi ~15MB RAM istifadə edir.</p>
            </div>

            <div className="bg-[#18181b] p-3 rounded-xl border border-[#27272a] space-y-1">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold font-mono">
                <ShieldCheck size={15} />
                <span>Memory Safe</span>
              </div>
              <p className="text-[11px] text-zinc-400">Rust dili sayəsində memory leak və təhlükəsizlik xətaları sıfıra endirilib.</p>
            </div>

            <div className="bg-[#18181b] p-3 rounded-xl border border-[#27272a] space-y-1">
              <div className="flex items-center space-x-2 text-blue-400 font-bold font-mono">
                <Server size={15} />
                <span>SSH & Docker Engine</span>
              </div>
              <p className="text-[11px] text-zinc-400">Bollard (Docker API) və Russh (SSH client) ilə birbaşa konteyner idarəetməsi.</p>
            </div>

            <div className="bg-[#18181b] p-3 rounded-xl border border-[#27272a] space-y-1">
              <div className="flex items-center space-x-2 text-purple-400 font-bold font-mono">
                <Cpu size={15} />
                <span>Tokio Async Engine</span>
              </div>
              <p className="text-[11px] text-zinc-400">Minlərlə paralel sorğunu və canlı loq axınlarını mikrosaniyələrdə icra edir.</p>
            </div>
          </div>

          {/* Tech Badges */}
          <div className="pt-2 border-t border-[#27272a] flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded">Rust 1.85</span>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded">Axum Framework</span>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-1 rounded">Tokio Runtime</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded">SQLx PostgreSQL</span>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded">React + Vite</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#101012] p-4 border-t border-[#27272a] flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-mono">MasterDeploy (MD) v4.0 (Rust)</span>
          <button
            onClick={onClose}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
};
