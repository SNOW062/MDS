// completed ui_page_054
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Save, RefreshCw, Key, AlertCircle } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerSecurityPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form states (Orijinal TerminalAccess.php və Patches.php ilə 1-ə-1)
  const [isTerminalEnabled, setIsTerminalEnabled] = useState(false);
  const [password, setPassword] = useState('');
  
  // Patches states
  const [updates, setUpdates] = useState<any[]>([]);
  const [totalUpdates, setTotalUpdates] = useState<number | null>(null);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

  useEffect(() => {
    const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
    if (found) {
      setServer(found);
      setIsTerminalEnabled(found.is_terminal_enabled || false);
    }
    setIsLoading(false);
  }, [uuid]);

  const handleToggleTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert('Təhlükəsizlik üçün şifrənizi daxil etməlisiniz.');
      return;
    }
    setIsTerminalEnabled(!isTerminalEnabled);
    alert(`SSH Terminal girişi ${!isTerminalEnabled ? 'aktiv' : 'deaktiv'} edildi.`);
    setPassword('');
  };

  const handleCheckUpdates = () => {
    setIsCheckingUpdates(true);
    setTimeout(() => {
      setTotalUpdates(2);
      setUpdates([
        { package: 'docker-ce', current_version: '24.0.7-1', new_version: '25.0.1-1' },
        { package: 'nginx', current_version: '1.24.0', new_version: '1.25.3' }
      ]);
      setIsCheckingUpdates(false);
    }, 2000);
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
        <h1 className="text-2xl font-bold text-white">Server Security</h1>
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
        <Link to={`/server/${uuid}/security`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Security
        </Link>
      </div>

      {/* SSH Terminal Access Control Form */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="h-4 w-4 text-indigo-400" /> SSH Terminal Access
        </h2>
        <p className="text-xs text-zinc-500">
          Enable or disable direct web-based SSH terminal access for this server. Only administrators can toggle this.
        </p>

        <form onSubmit={handleToggleTerminal} className="space-y-4 max-w-md">
          <div className="flex items-center justify-between bg-[#09090b] border border-[#27272a] p-4 rounded-lg">
            <span className="text-xs font-medium text-zinc-300">Terminal Access Status</span>
            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${isTerminalEnabled ? 'bg-green-950/30 border border-green-900/50 text-green-400' : 'bg-red-950/30 border border-red-900/50 text-red-400'}`}>
              {isTerminalEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Confirm Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sistem şifrənizi daxil edin"
              className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
              isTerminalEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isTerminalEnabled ? 'Disable Terminal Access' : 'Enable Terminal Access'}
          </button>
        </form>
      </div>

      {/* Patches and OS Updates Section (Orijinal Patches.php) */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#27272a] pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" /> OS Patches & Security Updates
          </h2>
          <button
            type="button"
            onClick={handleCheckUpdates}
            disabled={isCheckingUpdates}
            className="flex items-center gap-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isCheckingUpdates ? 'animate-spin' : ''}`} />
            {isCheckingUpdates ? 'Checking...' : 'Check for updates'}
          </button>
        </div>

        {totalUpdates === null ? (
          <p className="text-xs text-zinc-500">No update check performed yet.</p>
        ) : totalUpdates === 0 ? (
          <p className="text-xs text-green-500">Your server OS is up to date!</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-yellow-950/30 border border-yellow-900/30 p-3 rounded-lg text-xs text-yellow-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>There are {totalUpdates} pending package updates available.</span>
            </div>

            <div className="border border-[#27272a] rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#09090b] text-zinc-400 border-b border-[#27272a]">
                    <th className="p-3">Package</th>
                    <th className="p-3">Current Version</th>
                    <th className="p-3">New Version</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-zinc-300">
                  {updates.map((up) => (
                    <tr key={up.package}>
                      <td className="p-3 font-mono">{up.package}</td>
                      <td className="p-3">{up.current_version}</td>
                      <td className="p-3 text-green-400">{up.new_version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => alert('Bütün paketlər yenilənir...')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              Update All Packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
