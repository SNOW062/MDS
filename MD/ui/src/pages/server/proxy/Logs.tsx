import React from 'react';
import { X, Terminal } from 'lucide-react';

interface LogsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Logs: React.FC<LogsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Traefik Proxy Live Logs</h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-black p-4 font-mono text-xs text-emerald-400 h-96 overflow-y-auto space-y-1">
          <div>[INFO] Traefik proxy v3.1.2 started listening on 0.0.0.0:80, 0.0.0.0:443</div>
          <div>[INFO] Configuration reloaded automatically via docker socket daemon listener</div>
          <div>[INFO] Router HTTP app-frontend@docker matched rule Host(`app.example.com`)</div>
          <div className="animate-pulse">[LIVE] Waiting for incoming HTTP requests...</div>
        </div>
      </div>
    </div>
  );
};
