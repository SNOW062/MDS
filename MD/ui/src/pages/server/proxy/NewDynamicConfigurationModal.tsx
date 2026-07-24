import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface NewDynamicConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewDynamicConfigurationModal: React.FC<NewDynamicConfigurationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('http:\n  middlewares:\n    my-redirect:\n      redirectScheme:\n        scheme: https');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
          <h3 className="text-sm font-bold text-white">Create Dynamic Traefik Configuration</h3>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">Configuration Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="custom-middleware.yaml"
            className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">YAML Configuration Content</label>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-[#27272a] text-white text-xs font-semibold rounded-lg">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-lg">Save Configuration</button>
        </div>
      </div>
    </div>
  );
};
