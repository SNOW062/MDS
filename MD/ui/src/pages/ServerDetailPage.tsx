import React, { useState } from 'react';
import {
  ArrowLeft, CheckCircle, RefreshCcw, Eye, EyeOff, ShieldCheck, Terminal as TerminalIcon,
  Server as ServerIcon, Cpu, HardDrive, Activity, Play, StopCircle, Trash2, Key, Lock,
  Globe, Settings, AlertTriangle, Layers, ShieldAlert, Terminal
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NotificationToast } from '../components/NotificationToast';
import type { ToastMessage } from '../components/NotificationToast';

interface ServerDetailPageProps {
  onBack?: () => void;
}

export const ServerDetailPage: React.FC<ServerDetailPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'configuration' | 'proxy' | 'sentinel' | 'resources' | 'terminal' | 'security'>('configuration');
  const [subTab, setSubTab] = useState<'general' | 'private_key' | 'ca_certificate' | 'swarm'>('general');
  const [showIp, setShowIp] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(true);

  // Toast Notification State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // General Form State
  const [name, setName] = useState('localhost');
  const [description, setDescription] = useState("This is the server where MasterDeploy is running on. Don't delete this!");
  const [wildcardDomain, setWildcardDomain] = useState('https://app.example.com');
  const [ip, setIp] = useState('127.0.0.1');
  const [user, setUser] = useState('root');
  const [port, setPort] = useState('22');
  const [timeout, setTimeoutVal] = useState('10');
  const [timezone, setTimezone] = useState('UTC');

  // Proxy Form State
  const [proxyType, setProxyType] = useState<'TRAEFIK' | 'CADDY' | 'NONE'>('TRAEFIK');
  const [redirectEnabled, setRedirectEnabled] = useState(false);
  const [traefikVersion, setTraefikVersion] = useState('v3.1');

  // Private Key Form State
  const [privateKeyContent, setPrivateKeyContent] = useState('');
  const [privateKeys, setPrivateKeys] = useState<any[]>([]);
  const [currentKeyId, setCurrentKeyId] = useState('0');
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);

  // CA Certificate Form State
  const [caCert, setCaCert] = useState('');

  // Swarm Form State
  const [swarmEnabled, setSwarmEnabled] = useState(false);
  const [swarmNodeRole, setSwarmNodeRole] = useState<'manager' | 'worker'>('manager');

  // Security Form State
  const [cleanupInterval, setCleanupInterval] = useState('0 0 * * *');
  
  // Sentinel Form State
  const [sentinelEnabled, setSentinelEnabled] = useState(false);
  const [sentinelToken, setSentinelToken] = useState('dummy-sentinel-token-12345');
  const [sentinelMetricsRate, setSentinelMetricsRate] = useState('60');
  const [sentinelHistoryDays, setSentinelHistoryDays] = useState('7');
  const [sentinelPushInterval, setSentinelPushInterval] = useState('60');
  const [isSyncingSentinel, setIsSyncingSentinel] = useState(false);

  // Terminal State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[SYSTEM] Connecting to MasterDeploy Local Engine via SSH (root@127.0.0.1:22)...',
    '[SSH] Authenticated with default PrivateKey (ID 0).',
    '[DOCKER] Docker Daemon v28.0.1 is active.',
    '[STATUS] Server localhost is HEALTHY & READY for deployments.'
  ]);
  const [commandInput, setCommandInput] = useState('');

  const fetchPrivateKeys = async () => {
    try {
      const res = await fetch('/api/v1/private_keys');
      const data = await res.json();
      setPrivateKeys(data);
    } catch (err) {
      console.error("Failed to fetch private keys", err);
    }
  };

  React.useEffect(() => {
    const fetchServerData = async () => {
      try {
        const res = await fetch('/api/v1/servers');
        const data = await res.json();
        const server = data.find((s: any) => s.id === '0');
        if (server) {
          setName(server.name);
          setIp(server.ip);
          setPort(server.port.toString());
          setUser(server.user);
          if (server.private_key_id) {
            setCurrentKeyId(server.private_key_id);
          }
          if (server.proxy_type) {
            setProxyType(server.proxy_type.toUpperCase() as any);
          }
          if (server.proxy_version) {
            setTraefikVersion(server.proxy_version);
          }
          setSentinelEnabled(server.sentinel_enabled);
          if (server.sentinel_token) {
            setSentinelToken(server.sentinel_token);
          }
          if (server.sentinel_metrics_refresh_rate) {
            setSentinelMetricsRate(server.sentinel_metrics_refresh_rate.toString());
          }
          if (server.sentinel_metrics_history_days) {
            setSentinelHistoryDays(server.sentinel_metrics_history_days.toString());
          }
          if (server.sentinel_push_interval) {
            setSentinelPushInterval(server.sentinel_push_interval.toString());
          }
          // Load private key
          try {
            const keyRes = await fetch('/api/v1/private_keys/0');
            const keyData = await keyRes.json();
            if (keyData.status === 'success') {
              setPrivateKeyContent(keyData.private_key);
            }
          } catch (err) {
            console.error("Failed to load private key", err);
          }
        }
      } catch (err) {
        console.error("Failed to load server data", err);
      }
    };
    fetchServerData();
    fetchPrivateKeys();
  }, []);

  const handleSaveGeneral = async () => {
    try {
      const res = await fetch('/api/v1/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: '0',
          name,
          ip,
          port: parseInt(port),
          user,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: 'Server settings updated successfully.',
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to update server settings.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to connect to backend API.',
      });
    }
  };

  const handleSavePrivateKey = async () => {
    try {
      const res = await fetch('/api/v1/private_keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: '0',
          name: 'default',
          private_key: privateKeyContent,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: 'Private key updated successfully.',
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to update private key.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to update private key.',
      });
    }
  };

  const handleGenerateKey = async (type: 'rsa' | 'ed25519') => {
    const keyName = prompt('Enter a name for the new key:', `key-${type}-${Date.now().toString().slice(-4)}`);
    if (!keyName) return;

    try {
      const res = await fetch('/api/v1/private_keys/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: keyName,
          key_type: type,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: `Successfully generated ${type.toUpperCase()} key: ${keyName}`,
        });
        fetchPrivateKeys();
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to generate key.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to generate key.',
      });
    }
  };

  const handleUseKey = async (keyId: string) => {
    try {
      const res = await fetch(`/api/v1/servers/0/private_key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          private_key_id: keyId,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCurrentKeyId(keyId);
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: 'Server private key updated successfully.',
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to associate private key.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to associate private key.',
      });
    }
  };

  const handleAddManually = async () => {
    const keyName = prompt('Enter a name for the new key:');
    if (!keyName) return;
    const keyVal = prompt('Paste your private key content:');
    if (!keyVal) return;

    try {
      const res = await fetch('/api/v1/private_keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: keyName,
          private_key: keyVal,
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: 'Key added successfully.',
        });
        fetchPrivateKeys();
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to save key.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to save key.',
      });
    }
  };

  const [isDeployingProxy, setIsDeployingProxy] = useState(false);

  const handleSaveProxy = async () => {
    setIsDeployingProxy(true);
    try {
      // Save settings to db
      await fetch('/api/v1/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: '0',
          name,
          ip,
          port: parseInt(port),
          user,
          proxy_type: proxyType.toLowerCase(),
          proxy_version: traefikVersion,
        }),
      });
      
      // Deploy proxy using /api/v1/servers/:id/proxy/deploy
      const deployRes = await fetch(`/api/v1/servers/0/proxy/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proxy_type: proxyType.toLowerCase(),
        }),
      });
      const deployData = await deployRes.json();
      
      if (deployData.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: `Proxy configured and deployed successfully:\n${deployData.message}`,
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: deployData.message || 'Failed to deploy proxy.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Error occurred during proxy configuration.',
      });
    } finally {
      setIsDeployingProxy(false);
    }
  };

  const handleSaveSentinel = async () => {
    try {
      const res = await fetch('/api/v1/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: '0',
          name,
          ip,
          port: parseInt(port),
          user,
          proxy_type: proxyType.toLowerCase(),
          proxy_version: traefikVersion,
          sentinel_enabled: sentinelEnabled,
          sentinel_token: sentinelToken,
          sentinel_metrics_refresh_rate: parseInt(sentinelMetricsRate),
          sentinel_metrics_history_days: parseInt(sentinelHistoryDays),
          sentinel_push_interval: parseInt(sentinelPushInterval),
        }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: 'Sentinel configuration saved successfully.',
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to save Sentinel configuration.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to save Sentinel configuration.',
      });
    }
  };

  const handleSyncSentinel = async () => {
    setIsSyncingSentinel(true);
    try {
      const res = await fetch(`/api/v1/servers/0/sentinel/sync`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Success',
          message: data.message || 'Sentinel daemon synced successfully.',
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Error',
          message: data.message || 'Failed to sync Sentinel daemon.',
        });
      }
    } catch (err: any) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error',
        message: err.message || 'Error occurred during Sentinel daemon sync.',
      });
    } finally {
      setIsSyncingSentinel(false);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setToast(null);
    try {
      const res = await fetch('/api/v1/servers/validate');
      const data = await res.json();
      if (data.is_reachable) {
        setIsValidated(true);
        setToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Server is reachable and validated!',
          message: 'MasterDeploy successfully authenticated via SSH (root@127.0.0.1:22).'
        });
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Server is not reachable.',
          message: 'Please validate your configuration and connection.',
          docUrl: 'https://coolify.io/docs/knowledge-base/server/openssh',
          errorDetails: 'The payload is invalid.'
        });
      }
    } catch {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Server is not reachable.',
        message: 'Please validate your configuration and connection.',
        docUrl: 'https://coolify.io/docs/knowledge-base/server/openssh',
        errorDetails: 'The payload is invalid.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    setTerminalLogs((prev) => [
      ...prev,
      `root@localhost:~# ${commandInput}`,
      `Executing '${commandInput}' on localhost... OK`
    ]);
    setCommandInput('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-zinc-100 relative">
      {/* Toast Notification Alert (Coolify 1-to-1 Style) */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold tracking-tight text-white">{t('server')}</h1>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {t('reachable')}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">{name}</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center space-x-6 border-b border-[#27272a] text-sm font-medium">
        <button
          onClick={() => setActiveTab('configuration')}
          className={`pb-3 transition-colors relative flex items-center space-x-2 ${
            activeTab === 'configuration' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Settings size={15} />
          <span>{t('configuration')}</span>
          {activeTab === 'configuration' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('proxy')}
          className={`pb-3 transition-colors relative flex items-center space-x-2 ${
            activeTab === 'proxy' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Globe size={15} />
          <span>{t('proxy')}</span>
          {activeTab === 'proxy' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('sentinel')}
          className={`pb-3 transition-colors relative flex items-center space-x-2 ${
            activeTab === 'sentinel' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ShieldCheck size={15} />
          <span>Sentinel</span>
          {activeTab === 'sentinel' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 transition-colors relative flex items-center space-x-2 ${
            activeTab === 'resources' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Layers size={15} />
          <span>{t('resources')}</span>
          {activeTab === 'resources' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          className={`pb-3 transition-colors relative flex items-center space-x-2 ${
            activeTab === 'terminal' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <TerminalIcon size={15} />
          <span>{t('terminal')}</span>
          {activeTab === 'terminal' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 transition-colors relative flex items-center space-x-2 ${
            activeTab === 'security' ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Lock size={15} />
          <span>{t('security')}</span>
          {activeTab === 'security' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: CONFIGURATION */}
      {activeTab === 'configuration' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
          {/* Sub-Sidebar */}
          <div className="md:col-span-3 space-y-1">
            <button
              onClick={() => setSubTab('general')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                subTab === 'general' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              {t('general')}
            </button>
            <button
              onClick={() => setSubTab('private_key')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                subTab === 'private_key' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              {t('private_key')}
            </button>
            <button
              onClick={() => setSubTab('ca_certificate')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                subTab === 'ca_certificate' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              {t('ca_certificate')}
            </button>
            <button
              onClick={() => setSubTab('swarm')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                subTab === 'swarm' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              {t('swarm')}
            </button>
          </div>

          {/* Sub-Tab Content */}
          <div className="md:col-span-9 space-y-6">
            {subTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">{t('general')}</h2>
                  <button
                    onClick={handleSaveGeneral}
                    className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    {t('save')}
                  </button>
                </div>

                {/* Coolify Purple Validate Server Button */}
                <button
                  onClick={handleValidate}
                  disabled={isValidating}
                  className="w-full py-3.5 bg-[#4c1d95] hover:bg-[#5b21b6] text-white text-sm font-semibold rounded-lg shadow-lg shadow-purple-900/30 transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCcw size={16} className={isValidating ? 'animate-spin' : ''} />
                  <span>{isValidating ? t('validating') : t('validate_server')}</span>
                </button>

                {/* Form Fields */}
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">
                        {t('name')} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">{t('description')}</label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">{t('wildcard_domain')}</label>
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={wildcardDomain}
                      onChange={(e) => setWildcardDomain(e.target.value)}
                      className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8">
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">
                        {t('ip_address')} <span className="text-amber-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showIp ? 'text' : 'password'}
                          value={ip}
                          onChange={(e) => setIp(e.target.value)}
                          className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none pr-10 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowIp(!showIp)}
                          className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
                        >
                          {showIp ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">
                        {t('user')} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-400 mb-1">
                        {t('port')} <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {subTab === 'private_key' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-white">Private Key</h2>
                  <div className="relative">
                    <button
                      onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                      className="bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors border border-purple-700"
                    >
                      <span>+ Add</span>
                      <span className="text-[10px]">▼</span>
                    </button>
                    {isAddDropdownOpen && (
                      <div className="absolute left-0 mt-1 w-44 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50 py-1 text-xs">
                        <button
                          onClick={() => {
                            setIsAddDropdownOpen(false);
                            handleGenerateKey('ed25519');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        >
                          + Generate ED25519
                        </button>
                        <button
                          onClick={() => {
                            setIsAddDropdownOpen(false);
                            handleGenerateKey('rsa');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        >
                          + Generate RSA
                        </button>
                        <button
                          onClick={() => {
                            setIsAddDropdownOpen(false);
                            handleAddManually();
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border-t border-zinc-800"
                        >
                          + Add manually
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleValidate}
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-850 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Check connection
                  </button>
                </div>

                <p className="text-xs text-zinc-400">Change your server's private key.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {privateKeys.map((key) => {
                    const isUsed = currentKeyId === key.id;
                    return (
                      <div key={key.id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-white">{key.name}</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            {key.description || (key.id === '0' ? 'Default key for localhost server' : 'Custom added key')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              const textToCopy = key.public_key || key.private_key;
                              if (!textToCopy) {
                                setToast({ id: Date.now().toString(), type: 'error', title: 'Error', message: 'No public key available to copy.' });
                                return;
                              }
                              navigator.clipboard.writeText(textToCopy);
                              setToast({
                                id: Date.now().toString(),
                                type: 'success',
                                title: 'Copied',
                                message: 'Public key copied to clipboard.',
                              });
                            }}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-zinc-700"
                          >
                            Copy public key
                          </button>
                          {isUsed ? (
                            <button
                              disabled
                              className="bg-zinc-950 text-zinc-500 text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-850 cursor-not-allowed"
                            >
                              Currently used
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUseKey(key.id)}
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-zinc-700"
                            >
                              Use this key
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {subTab === 'ca_certificate' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">{t('ca_certificate')}</h2>
                  <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    {t('save')}
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-zinc-400">{t('ca_certificate')}</label>
                  <textarea
                    rows={6}
                    value={caCert}
                    onChange={(e) => setCaCert(e.target.value)}
                    placeholder="-----BEGIN CERTIFICATE-----"
                    className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {subTab === 'swarm' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">{t('swarm')}</h2>
                  <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    {t('save')}
                  </button>
                </div>
                <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Docker Swarm Mode</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Toggle Swarm mode on this server node.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={swarmEnabled}
                        onChange={(e) => setSwarmEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                    </label>
                  </div>

                  {swarmEnabled && (
                    <div className="space-y-2 pt-2 border-t border-[#27272a]">
                      <label className="block text-xs font-semibold text-zinc-400">Node Role</label>
                      <select
                        value={swarmNodeRole}
                        onChange={(e) => setSwarmNodeRole(e.target.value as any)}
                        className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      >
                        <option value="manager">Manager</option>
                        <option value="worker">Worker</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROXY */}
      {activeTab === 'proxy' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{t('proxy')}</h2>
            <button
              onClick={handleSaveProxy}
              disabled={isDeployingProxy}
              className="bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
            >
              {isDeployingProxy ? 'Deploying...' : t('save')}
            </button>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Proxy Type</label>
                <select
                  value={proxyType}
                  onChange={(e) => setProxyType(e.target.value as any)}
                  className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="TRAEFIK">Traefik (Default)</option>
                  <option value="CADDY">Caddy</option>
                  <option value="NONE">None</option>
                </select>
              </div>

              {proxyType === 'TRAEFIK' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Traefik Version</label>
                  <input
                    type="text"
                    value={traefikVersion}
                    onChange={(e) => setTraefikVersion(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#27272a]">
              <div>
                <h3 className="text-sm font-bold text-white">Redirect WWW to Non-WWW</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Automatically strip www. prefix from domains.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={redirectEnabled}
                  onChange={(e) => setRedirectEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SENTINEL */}
      {activeTab === 'sentinel' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white">Sentinel</h2>
              <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                {sentinelEnabled ? 'Active' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveSentinel}
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
              >
                {t('save')}
              </button>
              {sentinelEnabled && (
                <button
                  onClick={handleSyncSentinel}
                  disabled={isSyncingSentinel}
                  className="bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-900 text-zinc-300 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {isSyncingSentinel ? 'Syncing...' : 'Sync & Start'}
                </button>
              )}
            </div>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Enable Sentinel</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Sentinel collects server CPU, memory, and disk health metrics.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sentinelEnabled}
                  onChange={(e) => setSentinelEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
              </label>
            </div>

            {sentinelEnabled && (
              <div className="space-y-6 pt-6 border-t border-[#27272a]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Sentinel Token</label>
                    <input
                      type="password"
                      value={sentinelToken}
                      onChange={(e) => setSentinelToken(e.target.value)}
                      className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Coolify / MD Collector URL</label>
                    <input
                      type="text"
                      disabled
                      value="http://localhost:8000"
                      className="w-full bg-zinc-900 border border-[#27272a] rounded-lg px-3 py-2 text-xs text-zinc-400 outline-none font-mono cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Metrics rate (seconds)</label>
                    <input
                      type="number"
                      value={sentinelMetricsRate}
                      onChange={(e) => setSentinelMetricsRate(e.target.value)}
                      className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Metrics history (days)</label>
                    <input
                      type="number"
                      value={sentinelHistoryDays}
                      onChange={(e) => setSentinelHistoryDays(e.target.value)}
                      className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Push interval (seconds)</label>
                    <input
                      type="number"
                      value={sentinelPushInterval}
                      onChange={(e) => setSentinelPushInterval(e.target.value)}
                      className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{t('resources')}</h2>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-900 border-b border-[#27272a] text-zinc-400 font-semibold">
                  <th className="p-4">Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a] text-zinc-300">
                <tr className="hover:bg-zinc-800/20">
                  <td className="p-4 font-bold text-white">masterdeploy-engine</td>
                  <td className="p-4 font-mono text-zinc-400">System Core (Rust)</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Running
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-zinc-500 hover:text-white transition-colors">Logs</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="p-4 font-bold text-white">masterdeploy-ui</td>
                  <td className="p-4 font-mono text-zinc-400">Web App (Vite)</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Running
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-zinc-500 hover:text-white transition-colors">Logs</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TERMINAL */}
      {activeTab === 'terminal' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{t('terminal')}</h2>
          </div>

          <div className="bg-black border border-[#27272a] rounded-xl overflow-hidden font-mono text-xs shadow-2xl flex flex-col h-96">
            <div className="bg-zinc-900 border-b border-[#27272a] px-4 py-2 flex items-center justify-between text-zinc-400">
              <span className="flex items-center space-x-2">
                <TerminalIcon size={14} className="text-orange-500" />
                <span>Interactive Web SSH Terminal</span>
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-zinc-300">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">{log}</div>
              ))}
            </div>

            <form onSubmit={handleRunCommand} className="bg-zinc-900/60 p-3 border-t border-[#27272a] flex items-center space-x-2">
              <span className="text-orange-500 font-bold font-mono pl-1">root@localhost:~#</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Enter shell command..."
                className="flex-1 bg-transparent text-white border-none outline-none font-mono text-xs focus:ring-0 pl-1"
              />
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY */}
      {activeTab === 'security' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{t('security')}</h2>
            <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
              {t('save')}
            </button>
          </div>

          <div className="bg-[#18181b] border border-[#27272a] p-6 rounded-xl space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-400">Docker Cleanup Schedule (Cron Syntax)</label>
              <input
                type="text"
                value={cleanupInterval}
                onChange={(e) => setCleanupInterval(e.target.value)}
                className="w-full bg-[#18181b] border border-[#27272a] focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
              />
              <p className="text-[10px] text-zinc-500">Run automatic prune logic to reclaim disk space from unused Docker layers.</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#27272a]">
              <div>
                <h3 className="text-sm font-bold text-white">Sentinel Engine Health Monitoring</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Alert if server metrics cross critical limits (e.g. &gt;95% CPU/RAM).</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sentinelEnabled}
                  onChange={(e) => setSentinelEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
