// completed ui_page_007
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ArrowLeft, Activity, Terminal, Shield, Save, RefreshCw, Server as ServerIcon, Settings, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerDetailPage() {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Orijinal Coolify Show.php State-ləri ilə 1-ə-1 eyni front-end state strukturu
  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  // Form inputları
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ip, setIp] = useState('');
  const [user, setUser] = useState('');
  const [port, setPort] = useState('22');
  const [connectionTimeout, setConnectionTimeout] = useState(10);
  const [wildcardDomain, setWildcardDomain] = useState('');
  const [serverTimezone, setServerTimezone] = useState('UTC');
  const [isBuildServer, setIsBuildServer] = useState(false);
  const [isSwarmManager, setIsSwarmManager] = useState(false);
  const [isSwarmWorker, setIsSwarmWorker] = useState(false);

  // Cloud Provider Status göstəriciləri
  const [hetznerServerStatus, setHetznerServerStatus] = useState<string | null>(null);
  const [vultrInstanceStatus, setVultrInstanceStatus] = useState<string | null>(null);
  const [digitalOceanDropletStatus, setDigitalOceanDropletStatus] = useState<string | null>(null);

  // Timezones siyahısı
  const timezones = [
    'UTC', 'Europe/London', 'Europe/Paris', 'Europe/Istanbul', 'Asia/Baku', 'America/New_York', 'Asia/Tokyo'
  ];

  useEffect(() => {
    const fetchServerData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/servers/${uuid}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setServer(data);
          setName(data.name || '');
          setDescription(data.description || '');
          setIp(data.ip || '');
          setUser(data.user || 'root');
          setPort(String(data.port || 22));
          setConnectionTimeout(Number(data.connection_timeout || 10));
          setWildcardDomain(data.wildcard_domain || '');
          setServerTimezone(data.server_timezone || 'UTC');
          setIsBuildServer(data.is_build_server || false);
          setIsSwarmManager(data.is_swarm_manager || false);
          setIsSwarmWorker(data.is_swarm_worker || false);

          setHetznerServerStatus(data.hetzner_server_status || null);
          setVultrInstanceStatus(data.vultr_instance_status || null);
          setDigitalOceanDropletStatus(data.digitalocean_droplet_status || null);
        } else {
          // Fallback to mock
          const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
          if (found) {
            setServer(found);
            setName(found.name || '');
            setDescription(found.description || '');
            setIp(found.ip || '');
            setUser(found.user || 'root');
            setPort(String(found.port || 22));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServerData();
  }, [uuid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        name,
        description: description || null,
        ip,
        user,
        port: parseInt(port),
        connection_timeout: connectionTimeout,
        wildcard_domain: wildcardDomain || null,
        server_timezone: serverTimezone,
        is_build_server: isBuildServer,
        is_swarm_manager: isSwarmManager,
        is_swarm_worker: isSwarmWorker,
        concurrent_builds: server.concurrent_builds || 1,
        is_sentinel_enabled: server.is_sentinel_enabled || false,
        sentinel_token: server.sentinel_token || null,
        sentinel_metrics_refresh_rate_seconds: server.sentinel_metrics_refresh_rate_seconds || 2,
        sentinel_metrics_history_days: server.sentinel_metrics_history_days || 7,
        sentinel_push_interval_seconds: server.sentinel_push_interval_seconds || 10,
        sentinel_custom_url: server.sentinel_custom_url || null
      };

      const res = await fetch(`/api/servers/${uuid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('md_token')}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updated = await res.json();
        setServer(updated);
        alert('Sazlamalar uğurla qeyd olundu.');
      } else {
        alert('Sazlamaları qeyd edərkən xəta baş verdi.');
      }
    } catch (err: any) {
      alert('Xəta baş verdi: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkStatus = async (provider: string) => {
    try {
      const res = await fetch(`/api/servers/${uuid}/status?provider=${provider.toLowerCase()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('md_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (provider === 'Hetzner') setHetznerServerStatus(data.status);
        if (provider === 'Vultr') setVultrInstanceStatus(data.status);
        if (provider === 'DigitalOcean') setDigitalOceanDropletStatus(data.status);
        alert(`${provider} statusu: ${data.status}`);
      }
    } catch (err) {
      alert('Status yoxlanarkən xəta baş verdi.');
    }
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
      {/* Header və Geri düyməsi */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">{name || 'Server Details'}</h1>
            <p className="text-xs text-zinc-500">{ip}</p>
          </div>
        </div>
      </div>

      {/* Tabs - Orijinal Navbar */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-px">
        <Link to={`/server/${uuid}`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Konfiqurasiya
        </Link>
        <Link to={`/server/${uuid}/private-key`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Private Key
        </Link>
        <Link to={`/server/${uuid}/ca-certificate`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          CA Certificate
        </Link>
        <Link to={`/server/${uuid}/proxy`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Proxy
        </Link>
        <Link to={`/server/${uuid}/resources`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Resources
        </Link>
        <Link to={`/server/${uuid}/log-drains`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Log Drains
        </Link>
        <Link to={`/server/${uuid}/terminal`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5" /> Terminal
        </Link>
        <Link to={`/server/${uuid}/charts`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5" /> Monitorinq
        </Link>
        <Link to={`/server/${uuid}/security`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" /> Security
        </Link>
      </div>

      {/* Cloud Providers Status Bar */}
      {(server.hetzner_server_id || server.vultr_instance_id || server.digitalocean_droplet_id) && (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            {server.hetzner_server_id && (
              <div className="flex items-center gap-2 bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-lg text-xs">
                <span className="text-[var(--text-secondary)]">Hetzner Status:</span>
                <span className={`font-bold ${hetznerServerStatus === 'running' ? 'text-green-500' : 'text-red-500'}`}>
                  {hetznerServerStatus || 'Checking...'}
                </span>
                <button onClick={() => checkStatus('Hetzner')} className="p-1 hover:text-white"><RefreshCw className="h-3 w-3" /></button>
              </div>
            )}
            {server.vultr_instance_id && (
              <div className="flex items-center gap-2 bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-lg text-xs">
                <span className="text-[var(--text-secondary)]">Vultr Status:</span>
                <span className={`font-bold ${vultrInstanceStatus === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {vultrInstanceStatus || 'Checking...'}
                </span>
                <button onClick={() => checkStatus('Vultr')} className="p-1 hover:text-white"><RefreshCw className="h-3 w-3" /></button>
              </div>
            )}
            {server.digitalocean_droplet_id && (
              <div className="flex items-center gap-2 bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-lg text-xs">
                <span className="text-[var(--text-secondary)]">DigitalOcean Status:</span>
                <span className={`font-bold ${digitalOceanDropletStatus === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {digitalOceanDropletStatus || 'Checking...'}
                </span>
                <button onClick={() => checkStatus('DigitalOcean')} className="p-1 hover:text-white"><RefreshCw className="h-3 w-3" /></button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Konfiqurasiya Formu */}
      <form onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Settings className="h-4 w-4 text-indigo-400" /> General Settings
          </h2>
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Wildcard Domain */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1">
              Wildcard Domain
              <span title="A wildcard domain allows you to receive a randomly generated domain for your new applications."><HelpCircle className="h-3 w-3 text-zinc-500 cursor-help" /></span>
            </label>
            <input
              type="text"
              value={wildcardDomain}
              onChange={(e) => setWildcardDomain(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* IP Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">IP Address / Domain</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* User */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">User</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Port */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Port</label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* SSH Connection Timeout */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1">
              SSH Connection Timeout (s)
              <span title="Seconds to wait for SSH connection before failing. Default: 10."><HelpCircle className="h-3 w-3 text-zinc-500 cursor-help" /></span>
            </label>
            <input
              type="number"
              value={connectionTimeout}
              onChange={(e) => setConnectionTimeout(parseInt(e.target.value))}
              min="1"
              max="300"
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Server Timezone */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Server Timezone</label>
            <select
              value={serverTimezone}
              onChange={(e) => setServerTimezone(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          {/* Concurrent Builds Limit */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1">
              Limit of concurrent builds
              <span title="Number of builds that can run at the same time on this server."><HelpCircle className="h-3 w-3 text-zinc-500 cursor-help" /></span>
            </label>
            <input
              type="number"
              min="1"
              value={server.concurrent_builds || 1}
              onChange={(e) => setServer({ ...server, concurrent_builds: parseInt(e.target.value) })}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Checkbox Options */}
        <div className="border-t border-[var(--border-color)] pt-4 space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isBuildServer"
                checked={isBuildServer}
                onChange={(e) => setIsBuildServer(e.target.checked)}
                className="rounded bg-[#09090b] border-[var(--border-color)] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isBuildServer" className="text-xs font-medium text-zinc-300">
                Use it as a build server?
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isSwarmManager"
                checked={isSwarmManager}
                disabled={isSwarmWorker}
                onChange={(e) => {
                  setIsSwarmManager(e.target.checked);
                  if (e.target.checked) setIsSwarmWorker(false);
                }}
                className="rounded bg-[#09090b] border-[var(--border-color)] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isSwarmManager" className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                Is it a Swarm Manager?
                <span className="text-[10px] text-yellow-500 bg-yellow-950/30 px-1.5 py-0.5 rounded border border-yellow-900/50">Deprecated</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isSwarmWorker"
                checked={isSwarmWorker}
                disabled={isSwarmManager}
                onChange={(e) => {
                  setIsSwarmWorker(e.target.checked);
                  if (e.target.checked) setIsSwarmManager(false);
                }}
                className="rounded bg-[#09090b] border-[var(--border-color)] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isSwarmWorker" className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                Is it a Swarm Worker?
                <span className="text-[10px] text-yellow-500 bg-yellow-950/30 px-1.5 py-0.5 rounded border border-yellow-900/50">Deprecated</span>
              </label>
            </div>
          </div>
        </div>

        {/* Docker engine configuration & installation status */}
        <div className="border-t border-[var(--border-color)] pt-4 space-y-4">
          <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Docker Engine Status</h3>
          <div className="flex items-center justify-between bg-[#09090b] border border-[var(--border-color)] p-4 rounded-lg">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-zinc-300">Docker Engine</span>
              <p className="text-[10px] text-zinc-500">Quraşdırılma və qoşulma yoxlanışı statusu.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-green-950/30 border border-green-900/50 text-green-400 uppercase">
                Installed (v24.0.7)
              </span>
              <button
                type="button"
                onClick={() => alert('Server yenidən yoxlanılır (revalidate)...')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                Revalidate Server
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Sentinel (Monitorinq) Ayarları Formu */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Activity className="h-4 w-4 text-indigo-400" /> Sentinel (Monitorinq Agent)
            </h2>
            <span title="Sentinel reports your server's & container's health and collects metrics."><HelpCircle className="h-3.5 w-3.5 text-zinc-500 cursor-help" /></span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const updated = !server.is_sentinel_enabled;
                setServer({ ...server, is_sentinel_enabled: updated });
                alert(updated ? 'Sentinel aktiv edildi.' : 'Sentinel deaktiv edildi.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                server.is_sentinel_enabled 
                  ? 'bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-900/30' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {server.is_sentinel_enabled ? 'Sentinel-i Deaktiv Et' : 'Sentinel-i Aktiv Et'}
            </button>
          </div>
        </div>

        {server.is_sentinel_enabled && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Coolify URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Coolify URL</label>
                <input
                  type="text"
                  value={server.sentinel_custom_url || ''}
                  onChange={(e) => setServer({ ...server, sentinel_custom_url: e.target.value })}
                  placeholder="https://coolify.yourdomain.com"
                  className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Sentinel Token */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Sentinel Token</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={server.sentinel_token || ''}
                    onChange={(e) => setServer({ ...server, sentinel_token: e.target.value })}
                    className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button 
                    type="button" 
                    onClick={() => alert('Yeni token yaradıldı.')}
                    className="bg-[var(--bg-tertiary)] hover:bg-[#3f3f46] text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Yenilə
                  </button>
                </div>
              </div>

              {/* Metrics rate */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1">
                  Metrics rate (seconds)
                  <span title="Interval used for gathering metrics. Lower values result in more disk space usage."><HelpCircle className="h-3 w-3 text-zinc-500 cursor-help" /></span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={server.sentinel_metrics_refresh_rate_seconds || 2}
                  onChange={(e) => setServer({ ...server, sentinel_metrics_refresh_rate_seconds: parseInt(e.target.value) })}
                  className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Metrics history */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1">
                  Metrics history (days)
                  <span title="Number of days to retain metrics data for."><HelpCircle className="h-3 w-3 text-zinc-500 cursor-help" /></span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={server.sentinel_metrics_history_days || 7}
                  onChange={(e) => setServer({ ...server, sentinel_metrics_history_days: parseInt(e.target.value) })}
                  className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Push interval */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1">
                  Push interval (seconds)
                  <span title="Interval at which metrics data is sent to the collector."><HelpCircle className="h-3 w-3 text-zinc-500 cursor-help" /></span>
                </label>
                <input
                  type="number"
                  min="10"
                  value={server.sentinel_push_interval_seconds || 10}
                  onChange={(e) => setServer({ ...server, sentinel_push_interval_seconds: parseInt(e.target.value) })}
                  className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Server Hardware Metadata Info Panel */}
      {server.server_metadata && (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Server Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-zinc-500">OS</p>
              <p className="text-zinc-300 font-semibold mt-1">{server.server_metadata.os || 'N/A'}</p>
            </div>
            <div>
              <p className="text-zinc-500">Architecture</p>
              <p className="text-zinc-300 font-semibold mt-1">{server.server_metadata.arch || 'N/A'}</p>
            </div>
            <div>
              <p className="text-zinc-500">Kernel</p>
              <p className="text-zinc-300 font-semibold mt-1">{server.server_metadata.kernel || 'N/A'}</p>
            </div>
            <div>
              <p className="text-zinc-500">CPU Cores</p>
              <p className="text-zinc-300 font-semibold mt-1">{server.server_metadata.cpus || 'N/A'}</p>
            </div>
            <div>
              <p className="text-zinc-500">RAM</p>
              <p className="text-zinc-300 font-semibold mt-1">
                {server.server_metadata.memory_bytes ? `${Math.round(server.server_metadata.memory_bytes / 1073741824)} GB` : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}