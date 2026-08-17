// completed ui_page_006
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Plus, Server } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

import { listServers } from '../../api/servers';

export default function ServersPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [servers, setServers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const data = await listServers();
        setServers(data || []);
      } catch (err) {
        console.error("Error fetching servers:", err);
        setServers(mockServers);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <span className="text-xs text-[var(--text-secondary)]">Serverlər yüklənir...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">{t.servers.title}</h1>
          <p className="text-xs text-zinc-500 mt-1">Sistemdə olan aktiv infrastrukturlarınız</p>
        </div>
        <button onClick={() => navigate('/servers/new')} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-[var(--text-primary)] transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          {t.servers.add_title}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servers.map((s) => (
          <div 
            key={s.id}
            onClick={() => navigate(`/server/${s.uuid}`)}
            className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-zinc-500/50 cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-indigo-600/10 rounded-lg flex items-center justify-center font-bold text-indigo-400">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)]">{s.name}</h2>
                <p className="text-xs text-zinc-500 mt-1">{s.ip}</p>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        ))}
      </div>
    </div>
  );
}