// completed ui_comp_062
import React from 'react';
import { X } from 'lucide-react';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SlideOver({ isOpen, onClose, title, children }: SlideOverProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="w-96 bg-[#18181b] border-l border-[#27272a] h-full p-6 shadow-2xl relative z-10 flex flex-col justify-between animate-slide-left">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}