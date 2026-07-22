import React, { useEffect, useState } from 'react';
import { Search, Server, FolderKanban, Cpu, Globe, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: string, id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockItems = [
    { type: 'project', id: 'p-1', name: 'My Production Stack', desc: 'Main production environment' },
    { type: 'app', id: 'a-1', name: 'coolify-rust-api', desc: 'Rust Axum Backend Service' },
    { type: 'app', id: 'a-2', name: 'postgres-db-cluster', desc: 'PostgreSQL 15 Database' },
    { type: 'server', id: 's-1', name: 'Localhost (Docker Engine)', desc: '127.0.0.1:22' },
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24">
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b border-[#27272a]">
          <Search size={18} className="text-zinc-500 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent w-full text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {mockItems.length > 0 ? (
            mockItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectResult(item.type, item.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#27272a] text-left transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  {item.type === 'project' && <FolderKanban size={16} className="text-orange-400" />}
                  {item.type === 'app' && <Globe size={16} className="text-emerald-400" />}
                  {item.type === 'server' && <Server size={16} className="text-blue-400" />}
                  <div>
                    <div className="text-sm font-medium text-zinc-200 group-hover:text-white">{item.name}</div>
                    <div className="text-xs text-zinc-500">{item.desc}</div>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {item.type}
                </span>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500 font-mono">No matching resources found</div>
          )}
        </div>
      </div>
    </div>
  );
};
