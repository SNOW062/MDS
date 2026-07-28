// completed ui_comp_060
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl max-w-lg w-full p-6 shadow-2xl relative z-10 animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}