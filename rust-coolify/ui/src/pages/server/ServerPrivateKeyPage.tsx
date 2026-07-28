// completed ui_page_057
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Key, Plus } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerPrivateKeyPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [privateKeys, setPrivateKeys] = useState<any[]>([]);

  useEffect(() => {
    const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
    if (found) {
      setServer(found);
      setPrivateKeys([
        { id: 1, uuid: 'k1', name: 'Default SSH Key', description: 'Default key for local deployment', public_key: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA...' },
        { id: 2, uuid: 'k2', name: 'Backup Server Key', description: 'Key reserved for backup node connection', public_key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACA...' }
      ]);
    }
    setIsLoading(false);
  }, [uuid]);

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    alert('Public key paneli mübadilə buferinə kopyalandı.');
  };

  const handleSetPrivateKey = (id: number) => {
    alert(`Server üçün şəxsi açar dəyişdirildi (ID: ${id})`);
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
        <h1 className="text-2xl font-bold text-white">Private Keys</h1>
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
        <Link to={`/server/${uuid}/resources`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Resources
        </Link>
        <Link to={`/server/${uuid}/private-key`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Private Key
        </Link>
        <Link to={`/server/${uuid}/ca-certificate`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          CA Certificate
        </Link>
      </div>

      {/* Main Panel */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#27272a] pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-400" /> Private Keys Configuration
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Yeni açar yaradılması paneli.')}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> Add Private Key
            </button>
            <button
              onClick={() => alert('Bağlantı yoxlanılır...')}
              className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              Check Connection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {privateKeys.map((pk) => (
            <div key={pk.id} className="bg-[#09090b] border border-[#27272a] p-4 rounded-lg flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold text-white">{pk.name}</h3>
                <p className="text-[10px] text-zinc-500 mt-1">{pk.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(pk.public_key)}
                  className="bg-[#27272a] hover:bg-[#3f3f46] text-white py-1.5 rounded text-[10px] font-semibold transition-colors"
                >
                  Copy Public Key
                </button>
                {server.private_key_id === pk.id ? (
                  <button
                    type="button"
                    disabled
                    className="bg-indigo-950/20 border border-indigo-900/30 text-indigo-400 py-1.5 rounded text-[10px] font-semibold cursor-not-allowed"
                  >
                    Currently Used
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetPrivateKey(pk.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded text-[10px] font-semibold transition-colors"
                  >
                    Use This Key
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
