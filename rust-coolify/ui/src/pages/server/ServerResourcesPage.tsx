// completed ui_page_055
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, LayoutGrid } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerResourcesPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'managed' | 'unmanaged'>('managed');

  // Dummy / Mock Resources data (Orijinal database validation strukturları ilə eyni)
  const [managedResources, setManagedResources] = useState<any[]>([]);
  const [unmanagedContainers, setUnmanagedContainers] = useState<any[]>([]);

  useEffect(() => {
    const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
    if (found) {
      setServer(found);
      
      // Real PHP modeled list values
      setManagedResources([
        { project: 'Production API', environment: 'production', name: 'app-service-1', type: 'application', status: 'running' },
        { project: 'Analytics Stack', environment: 'staging', name: 'clickhouse-db', type: 'database', status: 'running' }
      ]);

      setUnmanagedContainers([
        { ID: 'd1c23f7d8a9e', Names: 'portainer', Image: 'portainer/portainer-ce:latest', State: 'running' },
        { ID: 'e9b8c7d6e5f4', Names: 'redis-commander', Image: 'rediscommander/redis-commander:latest', State: 'exited' }
      ]);
    }
    setIsLoading(false);
  }, [uuid]);

  const handleRefresh = () => {
    alert('Resurslar yenilənir...');
  };

  const handleUnmanagedAction = (action: string, id: string) => {
    alert(`Unmanaged konteyner üçün ${action} əmri icra olundu (ID: ${id})`);
  };

  if (isLoading || !server) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white">Server Resources</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to={`/server/${uuid}`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Configuration
        </Link>
        <Link to={`/server/${uuid}/proxy`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Proxy
        </Link>
        <Link to={`/server/${uuid}/terminal`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Terminal
        </Link>
        <Link to={`/server/${uuid}/charts`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Monitorinq
        </Link>
        <Link to={`/server/${uuid}/security`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Security
        </Link>
        <Link to={`/server/${uuid}/resources`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Resources
        </Link>
        <Link to={`/server/${uuid}/log-drains`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Log Drains
        </Link>
      </div>

      {/* Control Actions Bar */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#27272a] pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-indigo-400" /> Managed & Unmanaged Resources
          </h2>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('managed')}
            className={`flex-1 py-3 rounded-lg text-xs font-semibold border transition-all ${
              activeTab === 'managed'
                ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:text-white'
            }`}
          >
            Managed Containers
          </button>
          <button
            onClick={() => setActiveTab('unmanaged')}
            className={`flex-1 py-3 rounded-lg text-xs font-semibold border transition-all ${
              activeTab === 'unmanaged'
                ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400'
                : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:text-white'
            }`}
          >
            Unmanaged Containers
          </button>
        </div>

        {/* Managed Resources Table */}
        {activeTab === 'managed' ? (
          managedResources.length === 0 ? (
            <p className="text-xs text-zinc-500 text-center py-8">No managed resources found.</p>
          ) : (
            <div className="border border-[#27272a] rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#09090b] text-zinc-400 border-b border-[#27272a]">
                    <th className="p-3">Project</th>
                    <th className="p-3">Environment</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-zinc-300">
                  {managedResources.map((res, index) => (
                    <tr key={index}>
                      <td className="p-3">{res.project}</td>
                      <td className="p-3">{res.environment}</td>
                      <td className="p-3 font-semibold text-indigo-400 hover:underline cursor-pointer">{res.name}</td>
                      <td className="p-3 capitalize">{res.type}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-950/30 border border-green-900/50 text-green-400 uppercase">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Unmanaged Resources Table */
          unmanagedContainers.length === 0 ? (
            <p className="text-xs text-zinc-500 text-center py-8">No unmanaged containers found.</p>
          ) : (
            <div className="border border-[#27272a] rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#09090b] text-zinc-400 border-b border-[#27272a]">
                    <th className="p-3">Container Name</th>
                    <th className="p-3">Docker Image</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-zinc-300">
                  {unmanagedContainers.map((res, index) => (
                    <tr key={index}>
                      <td className="p-3 font-semibold">{res.Names}</td>
                      <td className="p-3 font-mono">{res.Image}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${res.State === 'running' ? 'bg-green-950/30 border border-green-900/50 text-green-400' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}>
                          {res.State}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {res.State === 'running' ? (
                          <>
                            <button
                              onClick={() => handleUnmanagedAction('restart', res.ID)}
                              className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                            >
                              Restart
                            </button>
                            <button
                              onClick={() => handleUnmanagedAction('stop', res.ID)}
                              className="bg-red-950/30 border border-red-900/50 hover:bg-red-900/30 text-red-400 px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                            >
                              Stop
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleUnmanagedAction('start', res.ID)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                          >
                            Start
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
