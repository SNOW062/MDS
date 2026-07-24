import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, CheckCircle, RefreshCcw, Eye, EyeOff, ShieldCheck, Terminal as TerminalIcon,
  Server as ServerIcon, Cpu, HardDrive, Activity, Play, StopCircle, Trash2, Key, Lock,
  Globe, Settings, AlertTriangle, Layers, ShieldAlert, Terminal, ChevronDown, Plus, Copy, Check,
  Server, CpuIcon, HardDriveIcon, Zap, Shield, RotateCcw, Wrench
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NotificationToast } from '../components/NotificationToast';
import type { ToastMessage } from '../components/NotificationToast';
import { AddKeyModal } from '../components/modals/AddKeyModal';

interface ServerDetailPageProps {
  onBack?: () => void;
}

const DEFAULT_KEYS = [
  {
    id: 'key-1',
    name: 'default-host-key-ed25519',
    description: 'Created by MasterDeploy',
    publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI7mL90+X... masterdeploy-host-key'
  }
];

export const ServerDetailPage: React.FC<ServerDetailPageProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const parseServerRoute = () => {
    const hash = window.location.hash.replace('#/', '');
    const parts = hash.split('/');
    
    const validMainTabs = ['configuration', 'proxy', 'sentinel', 'resources', 'terminal', 'security'];
    const validSubTabs = ['general', 'private_key', 'ca_certificate', 'swarm'];

    const mainTab = validMainTabs.includes(parts[1]) ? parts[1] : 'configuration';
    const subTab = validSubTabs.includes(parts[2]) ? parts[2] : 'general';

    return { mainTab, subTab };
  };

  const [routeState, setRouteState] = useState(parseServerRoute);

  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(parseServerRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeTab = routeState.mainTab as 'configuration' | 'proxy' | 'sentinel' | 'resources' | 'terminal' | 'security';
  const subTab = routeState.subTab as 'general' | 'private_key' | 'ca_certificate' | 'swarm';

  const navigateServerTab = (newTab: string, newSubTab?: string) => {
    const targetSub = newSubTab || (newTab === 'configuration' ? subTab : 'general');
    const newHash = `#/servers/${newTab}/${targetSub}`;
    window.location.hash = newHash;
  };

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
  const [sshTimeout, setSshTimeout] = useState('10');
  const [timezone, setTimezone] = useState('UTC');

  // Proxy State
  const [proxyType, setProxyType] = useState('traefik');
  const [isProxyRunning, setIsProxyRunning] = useState(true);

  // Sentinel State
  const [sentinelEnabled, setSentinelEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('5');
  const [historyDays, setHistoryDays] = useState('7');

  // CA Cert State
  const [caCert, setCaCert] = useState('');

  // Swarm State
  const [swarmEnabled, setSwarmEnabled] = useState(false);

  // Security Cleanups
  const [autoCleanup, setAutoCleanup] = useState(true);

  // Persistent Private Keys State
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeKeyUuid, setActiveKeyUuid] = useState(() => {
    return localStorage.getItem('md_active_key_uuid') || 'key-1';
  });
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  
  const [privateKeys, setPrivateKeys] = useState(() => {
    const saved = localStorage.getItem('md_persistent_private_keys');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_KEYS;
      }
    }
    return DEFAULT_KEYS;
  });

  const saveKeys = (newKeysList: any[]) => {
    setPrivateKeys(newKeysList);
    localStorage.setItem('md_persistent_private_keys', JSON.stringify(newKeysList));
  };

  const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    setToast({ id: Date.now().toString(), type, title, message });
  };

  const extractPublicKeyFromPem = (privateKeyPem: string): string => {
    if (!privateKeyPem) return 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC5ZRTM... masterdeploy-generated-key';
    const isEd = privateKeyPem.includes('ED25519');
    const prefix = isEd ? 'ssh-ed25519' : 'ssh-rsa';
    const cleanLines = privateKeyPem
      .split('\n')
      .filter(line => !line.includes('-----BEGIN') && !line.includes('-----END') && line.trim().length > 0)
      .join('');
    const base64Chunk = cleanLines.substring(0, 140);
    return `${prefix} AAAAB3NzaC1yc2EAAAADAQABAAABAQ${base64Chunk}... root@masterdeploy`;
  };

  const handleGenerateKey = async (type: 'ed25519' | 'rsa') => {
    setIsAddDropdownOpen(false);
    showToast('info', `Generating ${type.toUpperCase()} SSH Key...`);

    try {
      const randomHex = Array.from(crypto.getRandomValues(new Uint8Array(24)))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      const newKey = {
        id: `key-${Date.now()}`,
        name: `${type === 'ed25519' ? 'swift-fox' : 'strong-shield'}-${randomHex.substring(0, 10)}`,
        description: `Generated by MasterDeploy (${type.toUpperCase()})`,
        publicKey: `ssh-${type} AAAAC3NzaC1lZDI1NTE5AAAAI${randomHex}... root@masterdeploy`
      };
      const updated = [...privateKeys, newKey];
      saveKeys(updated);
      showToast('success', `${type.toUpperCase()} Key Generated!`);
    } catch {
      showToast('error', 'Failed to generate key');
    }
  };

  const handleCopyPublicKey = (keyId: string, publicKey: string) => {
    navigator.clipboard.writeText(publicKey);
    setCopiedKeyId(keyId);
    showToast('success', 'Public key copied to clipboard.');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleSelectActiveKey = (keyId: string, keyName: string) => {
    setActiveKeyUuid(keyId);
    localStorage.setItem('md_active_key_uuid', keyId);
    showToast('success', `Active key changed to ${keyName}`);
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100 select-none">
      {toast && (
        <NotificationToast toast={toast} onClose={() => setToast(null)} />
      )}

      {/* Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-[#27272a] text-zinc-400 hover:text-white rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {name}
              </h1>
              <span className={`px-2.5 py-0.5 text-[10px] font-medium rounded-full flex items-center gap-1 border ${
                isValidated
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                <CheckCircle className="w-3 h-3" />
                {isValidated ? 'reachable' : 'unreachable'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">{ip}</p>
          </div>
        </div>
      </div>

      {/* Main Tabs (Coolify Layout) */}
      <div className="flex border-b border-[#27272a] gap-6 overflow-x-auto scrollbar-none text-xs font-semibold">
        {[
          { id: 'configuration', label: 'Configuration' },
          { id: 'proxy', label: 'Proxy' },
          { id: 'sentinel', label: 'Sentinel' },
          { id: 'resources', label: 'Resources' },
          { id: 'terminal', label: 'Terminal' },
          { id: 'security', label: 'Security' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigateServerTab(tab.id)}
              className={`py-2 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Configuration Sub-Tabs */}
      {activeTab === 'configuration' && (
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Sub-tab Sidebar */}
          <div className="w-full md:w-48 shrink-0 space-y-1">
            {[
              { id: 'general', label: 'General' },
              { id: 'private_key', label: 'Private Key' },
              { id: 'ca_certificate', label: 'CA Certificate' },
              { id: 'swarm', label: 'Swarm' }
            ].map((sub) => {
              const isSubActive = subTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => navigateServerTab('configuration', sub.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isSubActive
                      ? 'bg-[#27272a] text-amber-400 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-[#18181b]'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Sub-tab Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {subTab === 'general' && (
              <div className="space-y-6 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-3">
                      General
                      <button 
                        onClick={() => showToast('success', 'Server settings saved')}
                        className="px-3 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold text-xs rounded transition-colors"
                      >
                        Save
                      </button>
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">You can't use this server until it is validated.</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsValidating(true);
                    setTimeout(() => {
                      setIsValidating(false);
                      setIsValidated(true);
                      showToast('success', 'Server validated successfully!');
                    }, 1500);
                  }}
                  disabled={isValidating}
                  className="w-full py-3 bg-[#1e1035] hover:bg-[#2c184e] border border-purple-900/50 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCcw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
                  {isValidating ? 'Validating Server...' : 'Validate Server'}
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Name <span className="text-amber-500">*</span></label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Wildcard Domain</label>
                    <input
                      type="text"
                      value={wildcardDomain}
                      onChange={(e) => setWildcardDomain(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">IP Address / Domain <span className="text-amber-500">*</span></label>
                    <div className="relative">
                      <input
                        type={showIp ? 'text' : 'password'}
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 pr-10 font-mono"
                      />
                      <button
                        onClick={() => setShowIp(!showIp)}
                        className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
                      >
                        {showIp ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">User <span className="text-amber-500">*</span></label>
                    <input
                      type="text"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Port <span className="text-amber-500">*</span></label>
                    <input
                      type="text"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">SSH Connection Timeout (s) <span className="text-amber-500">*</span></label>
                    <input
                      type="number"
                      value={sshTimeout}
                      onChange={(e) => setSshTimeout(e.target.value)}
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Server Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="UTC">UTC</option>
                      <option value="Asia/Baku">Asia/Baku (GMT+4)</option>
                      <option value="Europe/Istanbul">Europe/Istanbul (GMT+3)</option>
                      <option value="Europe/Moscow">Europe/Moscow (GMT+3)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Private Key Sub-tab */}
            {subTab === 'private_key' && (
              <div className="space-y-6 w-full">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white">Private Key</h2>

                    <div className="relative">
                      <button
                        onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                        className="px-3 py-1.5 bg-[#22173a] hover:bg-[#2c1d4b] border border-purple-600/40 text-purple-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        + Add
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {isAddDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl z-50 py-1 text-xs animate-in fade-in duration-100">
                          <button
                            onClick={() => handleGenerateKey('ed25519')}
                            className="w-full text-left px-3 py-2 hover:bg-[#27272a] text-zinc-200 flex items-center gap-2"
                          >
                            <Plus className="w-3.5 h-3.5 text-indigo-400" />
                            Generate ED25519
                          </button>
                          <button
                            onClick={() => handleGenerateKey('rsa')}
                            className="w-full text-left px-3 py-2 hover:bg-[#27272a] text-zinc-200 flex items-center gap-2"
                          >
                            <Plus className="w-3.5 h-3.5 text-purple-400" />
                            Generate RSA
                          </button>
                          <button
                            onClick={() => {
                              setIsAddDropdownOpen(false);
                              setIsAddModalOpen(true);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-[#27272a] text-zinc-200 flex items-center gap-2 border-t border-[#27272a]"
                          >
                            <Plus className="w-3.5 h-3.5 text-emerald-400" />
                            Add manually
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => showToast('success', 'SSH Connection Verified')}
                      className="px-3 py-1.5 bg-[#22173a] hover:bg-[#2c1d4b] border border-purple-600/40 text-purple-300 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Check connection
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400">Change your server's private key.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                  {privateKeys.map((key: any) => {
                    const isCurrentlyUsed = activeKeyUuid === key.id;
                    const isCopied = copiedKeyId === key.id;

                    return (
                      <div
                        key={key.id}
                        className="bg-[#18181b] border border-[#27272a] hover:border-zinc-700 rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all"
                      >
                        <div>
                          <h3 className="text-xs font-bold text-white font-mono break-all">{key.name}</h3>
                          <p className="text-[11px] text-zinc-500 mt-1">{key.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#27272a]/60">
                          <button
                            onClick={() => handleCopyPublicKey(key.id, key.publicKey)}
                            className="w-full py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {isCopied ? 'Copied' : 'Copy public key'}
                          </button>

                          {isCurrentlyUsed ? (
                            <button
                              disabled
                              className="w-full py-2 bg-[#27272a]/50 text-zinc-500 text-xs font-semibold rounded-lg cursor-not-allowed text-center"
                            >
                              Currently used
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelectActiveKey(key.id, key.name)}
                              className="w-full py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg transition-colors text-center"
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

            {/* CA Certificate Sub-tab */}
            {subTab === 'ca_certificate' && (
              <div className="space-y-6 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-3">
                      CA Certificate
                      <button 
                        onClick={() => showToast('success', 'CA Certificate saved')}
                        className="px-3 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold text-xs rounded transition-colors"
                      >
                        Save
                      </button>
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">Custom Root CA certificate for self-signed SSL verification.</p>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={caCert}
                  onChange={(e) => setCaCert(e.target.value)}
                  placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                  className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            {/* Swarm Sub-tab */}
            {subTab === 'swarm' && (
              <div className="space-y-6 w-full">
                <h2 className="text-lg font-bold text-white border-b border-[#27272a] pb-3">Docker Swarm Cluster</h2>
                <p className="text-xs text-zinc-400">Docker Swarm Cluster Node Settings.</p>
                <div className="flex items-center gap-3 bg-[#18181b] p-4 border border-[#27272a] rounded-xl">
                  <input
                    type="checkbox"
                    id="swarmCheck"
                    checked={swarmEnabled}
                    onChange={(e) => setSwarmEnabled(e.target.checked)}
                    className="rounded bg-[#0f0f11] border-[#27272a] text-amber-500 w-4 h-4"
                  />
                  <label htmlFor="swarmCheck" className="text-xs text-white font-semibold">Enable Docker Swarm on this node</label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Proxy Tab (Coolify 1-to-1 Exact Replica) */}
      {activeTab === 'proxy' && (
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-3">
                Proxy Settings
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono ${isProxyRunning ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isProxyRunning ? 'Running (Traefik)' : 'Stopped'}
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">Automatic SSL certificate generation and domain routing configuration.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast('info', 'Restarting Proxy daemon...')}
                className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restart Proxy
              </button>
              <button
                onClick={() => {
                  setIsProxyRunning(!isProxyRunning);
                  showToast('info', isProxyRunning ? 'Proxy Stopped' : 'Proxy Started');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isProxyRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                }`}
              >
                <StopCircle className="w-3.5 h-3.5" />
                {isProxyRunning ? 'Stop Proxy' : 'Start Proxy'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-white">Proxy Type</h3>
              <select
                value={proxyType}
                onChange={(e) => setProxyType(e.target.value)}
                className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="traefik">Traefik v3 (Recommended)</option>
                <option value="caddy">Caddy Server</option>
                <option value="nginx">Nginx Proxy Manager</option>
                <option value="none">None (Custom Proxy)</option>
              </select>
            </div>
            <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-white">Dynamic Configuration</h3>
              <p className="text-xs text-zinc-400">Custom Traefik/Caddy routes and middleware rules.</p>
              <button
                onClick={() => showToast('info', 'Dynamic proxy config saved')}
                className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-lg text-xs font-semibold"
              >
                Edit Dynamic Config
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sentinel Tab (Coolify Monitoring Daemon Replica) */}
      {activeTab === 'sentinel' && (
        <div className="space-y-6 w-full">
          <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Sentinel Realtime Monitoring
              </h2>
              <p className="text-xs text-zinc-400 mt-1">Realtime CPU, RAM, and Disk metrics collector daemon.</p>
            </div>
            <button 
              onClick={() => showToast('success', 'Sentinel settings updated')}
              className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Save Settings
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-2">
              <span className="text-xs text-zinc-400 font-semibold block">Metrics Refresh Rate (s)</span>
              <input
                type="number"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-2">
              <span className="text-xs text-zinc-400 font-semibold block">Metrics History Retention (Days)</span>
              <input
                type="number"
                value={historyDays}
                onChange={(e) => setHistoryDays(e.target.value)}
                className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-2">
              <span className="text-xs text-zinc-400 font-semibold block">Sentinel Daemon Status</span>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-400 font-mono">Active & Collecting</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Tab (Coolify Resources List Replica) */}
      {activeTab === 'resources' && (
        <div className="space-y-6 w-full">
          <div className="border-b border-[#27272a] pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Deployed Resources on this Server
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Applications and databases running on this server node.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono">coolify-rust-backend</h3>
                  <p className="text-[11px] text-zinc-500">App • Nixpacks • Port 8000</p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400">Running</span>
            </div>

            <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono">production-postgres-db</h3>
                  <p className="text-[11px] text-zinc-500">Database • PostgreSQL 16</p>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400">Healthy</span>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Tab (SSH Web Console) */}
      {activeTab === 'terminal' && (
        <div className="space-y-6 w-full">
          <div className="border-b border-[#27272a] pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-indigo-400" />
              SSH Web Terminal
            </h2>
            <button
              onClick={() => showToast('info', 'Terminal session cleared')}
              className="px-3 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-semibold rounded-lg"
            >
              Clear Session
            </button>
          </div>
          <div className="bg-black border border-[#27272a] p-4 rounded-xl font-mono text-xs text-emerald-400 h-96 overflow-y-auto w-full shadow-inner">
            root@localhost:~# docker ps<br />
            CONTAINER ID   IMAGE                                COMMAND                  CREATED         STATUS<br />
            8e284fb22426   mds-masterdeploy                     "/app/md-api"            10 mins ago     Up 10 minutes<br />
            root@localhost:~# <span className="animate-pulse">_</span>
          </div>
        </div>
      )}

      {/* Security Tab (Docker Cleanup & Security Replica) */}
      {activeTab === 'security' && (
        <div className="space-y-6 w-full">
          <div className="border-b border-[#27272a] pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              Security & Docker Cleanup
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Automated docker image & build cache cleanup schedules.</p>
          </div>

          <div className="bg-[#18181b] p-4 border border-[#27272a] rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white">Automated Docker Prune</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Automatically clean dangling images and unused build caches.</p>
              </div>
              <button
                onClick={() => showToast('success', 'Docker system prune executed!')}
                className="px-3 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded-lg text-xs font-semibold transition-colors"
              >
                Run Prune Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Private Key Modal */}
      <AddKeyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => {
          const derivedPub = extractPublicKeyFromPem(data.privateKey);
          const newKey = {
            id: `key-${Date.now()}`,
            name: data.name,
            description: data.description || 'Manually Added Private Key',
            publicKey: derivedPub
          };
          const updated = [...privateKeys, newKey];
          saveKeys(updated);
          showToast('success', 'Private Key saved!', 'Matching Public Key extracted successfully.');
        }}
      />
    </div>
  );
};
