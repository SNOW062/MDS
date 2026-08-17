// completed ui_page_047
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Shield, HelpCircle, RefreshCw } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerProxyPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State-ləri (Orijinal Coolify proxy.blade.php-dən 1-ə-1)
  const [selectedProxy, setSelectedProxy] = useState('TRAEFIK');
  const [generateExactLabels, setGenerateExactLabels] = useState(false);
  const [redirectEnabled, setRedirectEnabled] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [proxySettings, setProxySettings] = useState(`
# Orijinal Traefik Dynamic Configuration
http:
  routers:
    catchall:
      entryPoints:
        - http
      rule: "HostRegexp(\`{host:.+}\`)"
      service: catchall
      priority: 1
  services:
    catchall:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:80"
  `);

  useEffect(() => {
    const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
    if (found) {
      setServer(found);
      setSelectedProxy(found.proxy_type || 'TRAEFIK');
      setGenerateExactLabels(found.generate_exact_labels || false);
      setRedirectEnabled(found.redirect_enabled || false);
      setRedirectUrl(found.redirect_url || '');
      if (found.proxy_settings) {
        setProxySettings(found.proxy_settings);
      }
    }
    setIsLoading(false);
  }, [uuid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      selectedProxy,
      generateExactLabels,
      redirectEnabled,
      redirectUrl,
      proxySettings
    };
    console.log('Backend-ə göndərilən 1-ə-1 Proxy konfiqurasiyası:', payload);
    setIsLoading(false);
    alert('Proxy sazlamaları uğurla qeyd olundu.');
  };

  const handleReset = () => {
    if (window.confirm('Proxy konfiqurasiyasını sıfırlamaq istədiyinizdən əminsiniz? Bütün xüsusi ayarlar silinəcək.')) {
      alert('Proxy konfiqurasiyası sıfırlandı.');
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
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Proxy Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-px">
        <Link to={`/server/${uuid}`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Konfiqurasiya
        </Link>
        <Link to={`/server/${uuid}/private-key`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Private Key
        </Link>
        <Link to={`/server/${uuid}/ca-certificate`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          CA Certificate
        </Link>
        <Link to={`/server/${uuid}/proxy`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Proxy
        </Link>
        <Link to={`/server/${uuid}/resources`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Resources
        </Link>
        <Link to={`/server/${uuid}/log-drains`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Log Drains
        </Link>
        <Link to={`/server/${uuid}/terminal`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Terminal
        </Link>
        <Link to={`/server/${uuid}/charts`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white">
          Monitorinq
        </Link>
        <Link to={`/server/${uuid}/security`} className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-white flex items-center gap-1">
          Security
        </Link>
      </div>

      {/* Konfiqurasiya Formu */}
      <form onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" /> Proxy Configuration
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-950/30 border border-red-900/50 hover:bg-red-900/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              Reset Configuration
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <Save className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>

        {/* Proxy Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Proxy Type</label>
            <select
              value={selectedProxy}
              onChange={(e) => setSelectedProxy(e.target.value)}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="TRAEFIK">Traefik (Coolify Proxy)</option>
              <option value="CADDY">Caddy (Coolify Proxy)</option>
              <option value="NONE">None (Custom Proxy)</option>
            </select>
          </div>
        </div>

        {/* Advanced Options */}
        {selectedProxy !== 'NONE' && (
          <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Advanced Options</h3>
            
            {/* Generate exact labels */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="generateExactLabels"
                checked={generateExactLabels}
                onChange={(e) => setGenerateExactLabels(e.target.checked)}
                className="rounded bg-[#09090b] border-[var(--border-color)] text-indigo-600 focus:ring-indigo-500 mt-0.5"
              />
              <div className="space-y-0.5">
                <label htmlFor="generateExactLabels" className="text-xs font-medium text-zinc-300">
                  Generate labels only for {selectedProxy.toLowerCase()}
                </label>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  If set, all resources will only have docker container labels for {selectedProxy.toLowerCase()}.
                </p>
              </div>
            </div>

            {/* Override request handler (Redirect) */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="redirectEnabled"
                checked={redirectEnabled}
                onChange={(e) => setRedirectEnabled(e.target.checked)}
                className="rounded bg-[#09090b] border-[var(--border-color)] text-indigo-600 focus:ring-indigo-500 mt-0.5"
              />
              <div className="space-y-0.5">
                <label htmlFor="redirectEnabled" className="text-xs font-medium text-zinc-300">
                  Override default request handler
                </label>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Requests to unknown hosts or stopped services will receive a 503 response or be redirected to the URL.
                </p>
              </div>
            </div>

            {redirectEnabled && (
              <div className="space-y-1.5 w-full md:w-96 pl-6">
                <label className="text-xs font-medium text-[var(--text-secondary)]">Redirect to (optional)</label>
                <input
                  type="text"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  placeholder="https://app.coolify.io"
                  className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>
        )}

        {/* Configuration Editor */}
        {selectedProxy !== 'NONE' && (
          <div className="space-y-2 pt-4 border-t border-[var(--border-color)]">
            <label className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
              Configuration file (YAML)
            </label>
            <textarea
              value={proxySettings}
              onChange={(e) => setProxySettings(e.target.value)}
              rows={20}
              className="w-full bg-[#09090b] border border-[var(--border-color)] rounded-lg p-4 font-mono text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        )}
      </form>
    </div>
  );
}