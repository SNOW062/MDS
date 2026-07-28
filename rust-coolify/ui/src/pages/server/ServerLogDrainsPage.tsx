// completed ui_page_056
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Shield, HelpCircle } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerLogDrainsPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // New Relic Config
  const [isLogDrainNewRelicEnabled, setIsLogDrainNewRelicEnabled] = useState(false);
  const [logDrainNewRelicLicenseKey, setLogDrainNewRelicLicenseKey] = useState('');
  const [logDrainNewRelicBaseUri, setLogDrainNewRelicBaseUri] = useState('https://log-api.eu.newrelic.com/log/v1');

  // Axiom Config
  const [isLogDrainAxiomEnabled, setIsLogDrainAxiomEnabled] = useState(false);
  const [logDrainAxiomApiKey, setLogDrainAxiomApiKey] = useState('');
  const [logDrainAxiomDatasetName, setLogDrainAxiomDatasetName] = useState('');

  // Custom FluentBit Config
  const [isLogDrainCustomEnabled, setIsLogDrainCustomEnabled] = useState(false);
  const [logDrainCustomConfig, setLogDrainCustomConfig] = useState('');
  const [logDrainCustomConfigParser, setLogDrainCustomConfigParser] = useState('');

  useEffect(() => {
    const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
    if (found) {
      setServer(found);
      setIsLogDrainNewRelicEnabled(found.is_log_drain_newrelic_enabled || false);
      setLogDrainNewRelicLicenseKey(found.log_drain_newrelic_license_key || '');
      setLogDrainNewRelicBaseUri(found.log_drain_newrelic_base_uri || 'https://log-api.eu.newrelic.com/log/v1');

      setIsLogDrainAxiomEnabled(found.is_log_drain_axiom_enabled || false);
      setLogDrainAxiomApiKey(found.log_drain_axiom_api_key || '');
      setLogDrainAxiomDatasetName(found.log_drain_axiom_dataset_name || '');

      setIsLogDrainCustomEnabled(found.is_log_drain_custom_enabled || false);
      setLogDrainCustomConfig(found.log_drain_custom_config || '');
      setLogDrainCustomConfigParser(found.log_drain_custom_config_parser || '');
    }
    setIsLoading(false);
  }, [uuid]);

  const handleSubmit = (provider: string) => {
    setIsLoading(true);
    let payload = {};
    if (provider === 'newrelic') {
      payload = { isLogDrainNewRelicEnabled, logDrainNewRelicLicenseKey, logDrainNewRelicBaseUri };
    } else if (provider === 'axiom') {
      payload = { isLogDrainAxiomEnabled, logDrainAxiomApiKey, logDrainAxiomDatasetName };
    } else if (provider === 'custom') {
      payload = { isLogDrainCustomEnabled, logDrainCustomConfig, logDrainCustomConfigParser };
    }

    console.log(`Backend-ə göndərilən 1-ə-1 Log Drain (${provider}) konfiqurasiyası:`, payload);
    setIsLoading(false);
    alert('Log Drain sazlamaları uğurla qeyd olundu.');
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
        <h1 className="text-2xl font-bold text-white">Log Drains</h1>
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
        <Link to={`/server/${uuid}/log-drains`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          Log Drains
        </Link>
      </div>

      {/* Main Containers */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-8">
        <div className="border-b border-[#27272a] pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" /> Log Drain Providers
          </h2>
          <p className="text-xs text-zinc-500">Sends service logs to 3rd party tools.</p>
        </div>

        {/* New Relic Form */}
        <div className="border border-[#27272a] rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white">New Relic</h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLogDrainNewRelicEnabled"
                checked={isLogDrainNewRelicEnabled}
                onChange={(e) => setIsLogDrainNewRelicEnabled(e.target.checked)}
                className="rounded bg-[#09090b] border-[#27272a] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isLogDrainNewRelicEnabled" className="text-xs font-medium text-zinc-300">Enabled</label>
            </div>
          </div>

          {isLogDrainNewRelicEnabled && (
            <div className="space-y-4 pt-2 border-t border-[#27272a]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">License Key</label>
                  <input
                    type="password"
                    value={logDrainNewRelicLicenseKey}
                    onChange={(e) => setLogDrainNewRelicLicenseKey(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Endpoint</label>
                  <input
                    type="text"
                    value={logDrainNewRelicBaseUri}
                    onChange={(e) => setLogDrainNewRelicBaseUri(e.target.value)}
                    placeholder="https://log-api.eu.newrelic.com/log/v1"
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                onClick={() => handleSubmit('newrelic')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                Save New Relic
              </button>
            </div>
          )}
        </div>

        {/* Axiom Form */}
        <div className="border border-[#27272a] rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white">Axiom</h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLogDrainAxiomEnabled"
                checked={isLogDrainAxiomEnabled}
                onChange={(e) => setIsLogDrainAxiomEnabled(e.target.checked)}
                className="rounded bg-[#09090b] border-[#27272a] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isLogDrainAxiomEnabled" className="text-xs font-medium text-zinc-300">Enabled</label>
            </div>
          </div>

          {isLogDrainAxiomEnabled && (
            <div className="space-y-4 pt-2 border-t border-[#27272a]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">API Key</label>
                  <input
                    type="password"
                    value={logDrainAxiomApiKey}
                    onChange={(e) => setLogDrainAxiomApiKey(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Dataset Name</label>
                  <input
                    type="text"
                    value={logDrainAxiomDatasetName}
                    onChange={(e) => setLogDrainAxiomDatasetName(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                onClick={() => handleSubmit('axiom')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                Save Axiom
              </button>
            </div>
          )}
        </div>

        {/* Custom FluentBit Form */}
        <div className="border border-[#27272a] rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white">Custom FluentBit</h3>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLogDrainCustomEnabled"
                checked={isLogDrainCustomEnabled}
                onChange={(e) => setIsLogDrainCustomEnabled(e.target.checked)}
                className="rounded bg-[#09090b] border-[#27272a] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isLogDrainCustomEnabled" className="text-xs font-medium text-zinc-300">Enabled</label>
            </div>
          </div>

          {isLogDrainCustomEnabled && (
            <div className="space-y-4 pt-2 border-t border-[#27272a]">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Custom FluentBit Configuration</label>
                  <textarea
                    value={logDrainCustomConfig}
                    onChange={(e) => setLogDrainCustomConfig(e.target.value)}
                    rows={6}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 font-mono text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-400">Custom Parser Configuration</label>
                  <textarea
                    value={logDrainCustomConfigParser}
                    onChange={(e) => setLogDrainCustomConfigParser(e.target.value)}
                    rows={4}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 font-mono text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                onClick={() => handleSubmit('custom')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              >
                Save Custom FluentBit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
