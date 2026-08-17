import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Server as ServerIcon,
  Key,
  Cpu,
  ShieldAlert,
  Trash2,
  Plus,
  RefreshCw,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useToast } from '../../hooks/useToast';

// ==================== TYPES ====================
interface PrivateKey {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface CloudToken {
  uuid: string;
  provider: string;
  name: string;
  token: string;
  description: string | null;
  is_valid: boolean;
  last_checked_at: string | null;
  created_at: string;
}

interface Server {
  id: string;
  uuid?: string;
  name: string;
  description: string | null;
  ip: string;
  port: number;
  user: string;
  private_key_id: string;
  is_build_server: boolean;
  provider: string | null;
  status: string;
  created_at: string;
}

interface CreateServerFormData {
  name: string;
  description: string | null;
  ip: string;
  port: number;
  user: string;
  private_key_id: string;
  is_build_server: boolean;
}

interface CloudOptions {
  location: string;
  image: string;
  server_type: string;
}

// ==================== CONSTANTS ====================
const CLOUD_LOCATIONS = [
  { value: 'hel1', label: 'Helsinki (Finlandiya)' },
  { value: 'fsn1', label: 'Falkenstein (Almaniya)' },
  { value: 'nbg1', label: 'Nuremberg (Almaniya)' },
  { value: 'ash', label: 'Ashburn (ABŞ)' },
  { value: 'hil', label: 'Hillsboro (ABŞ)' },
  { value: 'sin', label: 'Sinqapur (Sinqapur)' }
];

const CLOUD_IMAGES = [
  { value: 'ubuntu-22.04', label: 'Ubuntu 22.04 LTS' },
  { value: 'ubuntu-24.04', label: 'Ubuntu 24.04 LTS' },
  { value: 'debian-12', label: 'Debian 12' },
  { value: 'rocky-9', label: 'Rocky Linux 9' },
  { value: 'almalinux-9', label: 'AlmaLinux 9' }
];

const CLOUD_SERVER_TYPES = [
  { value: 'cax11', label: 'CAX11 (1 vCPU, 2GB RAM, 40GB SSD) ~ €4.50/ay' },
  { value: 'cax21', label: 'CAX21 (2 vCPU, 4GB RAM, 80GB SSD) ~ €8.50/ay' },
  { value: 'cx22', label: 'CX22 (2 vCPU, 4GB RAM, 40GB SSD) ~ €5.50/ay' },
  { value: 'cx32', label: 'CX32 (4 vCPU, 8GB RAM, 80GB SSD) ~ €11.00/ay' },
  { value: 'cx42', label: 'CX42 (8 vCPU, 16GB RAM, 160GB SSD) ~ €21.00/ay' }
];

const PROVIDER_NAMES = {
  'hetzner': 'Hetzner',
  'vultr': 'Vultr',
  'digital-ocean': 'DigitalOcean',
  'manual': 'Manual'
};

// ==================== MAIN COMPONENT ====================
export default function CreateServerPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  // ==================== STATE ====================
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTokenUuid, setSelectedTokenUuid] = useState<string>('');
  const [showAddToken, setShowAddToken] = useState(false);
  const [showKeyDropdown, setShowKeyDropdown] = useState(false);

  // Data states
  const [privateKeys, setPrivateKeys] = useState<PrivateKey[]>([]);
  const [cloudTokens, setCloudTokens] = useState<CloudToken[]>([]);
  const [, setServers] = useState<Server[]>([]);

  // System states
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const [isCloud, setIsCloud] = useState<boolean>(false);
  const [maxServers, setMaxServers] = useState<number>(10);

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValidatingToken, setIsValidatingToken] = useState<boolean>(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState<boolean>(false);
  const [isDeletingToken, setIsDeletingToken] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CreateServerFormData>({
    name: '',
    description: null,
    ip: '',
    port: 22,
    user: 'root',
    private_key_id: '',
    is_build_server: false,
  });

  // Cloud specific states
  const [cloudOptions, setCloudOptions] = useState<CloudOptions>({
    location: 'hel1',
    image: 'ubuntu-22.04',
    server_type: 'cax11'
  });

  // Token form states
  const [newToken, setNewToken] = useState({
    name: '',
    value: '',
    description: ''
  });

  // ==================== HELPERS ====================
  const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('md_token')}`,
    'Content-Type': 'application/json'
  });

  const generateDefaultName = () => {
    const prefix = selectedType === 'manual' ? 'server' : selectedType || 'server';
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${random}`;
  };

  const getFilteredTokens = () => {
    return cloudTokens.filter(t => t.provider === selectedType);
  };

  const getSelectedToken = () => {
    return cloudTokens.find(t => t.uuid === selectedTokenUuid);
  };

  // ==================== API CALLS ====================
  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = getAuthHeader();

      const [keysRes, tokensRes, serversRes, settingsRes] = await Promise.all([
        fetch('/api/security/keys', { headers }),
        fetch('/api/security/tokens', { headers }),
        fetch('/api/servers', { headers }),
        fetch('/api/settings', { headers }).catch(() => null)
      ]);

      let cloudActive = false;
      let maxSrv = 10;

      // 1. Settings (Cloud check)
      if (settingsRes?.ok) {
        const settingsData = await settingsRes.json();
        cloudActive = settingsData.is_cloud || false;
        maxSrv = settingsData.max_servers || 10;
        setIsCloud(cloudActive);
        setMaxServers(maxSrv);
      }

      // 2. Private Keys
      if (keysRes.ok) {
        const keysData = await keysRes.json();
        if (keysData && keysData.length > 0) {
          setPrivateKeys(keysData);
          setFormData(prev => ({ ...prev, private_key_id: keysData[0].id }));
        } else {
          const fallbackKeys = [{ id: 'mock-default-key-id', name: 'Default SSH Key (Mock)', description: 'System default private key', created_at: new Date().toISOString() }];
          setPrivateKeys(fallbackKeys);
          setFormData(prev => ({ ...prev, private_key_id: 'mock-default-key-id' }));
        }
      } else {
        const fallbackKeys = [{ id: 'mock-default-key-id', name: 'Default SSH Key (Mock)', description: 'System default private key', created_at: new Date().toISOString() }];
        setPrivateKeys(fallbackKeys);
        setFormData(prev => ({ ...prev, private_key_id: 'mock-default-key-id' }));
      }

      // 3. Cloud Tokens
      if (tokensRes.ok) {
        const tokensData = await tokensRes.json();
        setCloudTokens(tokensData);
      }

      // 4. Servers (for limit check)
      if (serversRes.ok) {
        const serversData = await serversRes.json();
        setServers(serversData);
        const serverCount = serversData.length;
        const maxAllowed = cloudActive ? maxSrv : 999;
        setLimitReached(serverCount >= maxAllowed);
      }

    } catch (err: any) {
      setError('Məlumatlar yüklənərkən xəta baş verdi: ' + err.message);
      toast.error('Məlumatlar yüklənilə bilmədi');
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (uuid: string) => {
    if (!uuid) return;

    setIsValidatingToken(true);
    try {
      const res = await fetch(`/api/security/tokens/validate/${uuid}`, {
        headers: getAuthHeader()
      });

      if (res.ok) {
        const data = await res.json();
        setCloudTokens(prev => prev.map(token =>
          token.uuid === uuid
            ? { ...token, is_valid: data.valid, last_checked_at: new Date().toISOString() }
            : token
        ));
      }
    } catch (err) {
      console.error('Token validation failed:', err);
    } finally {
      setIsValidatingToken(false);
    }
  };

  const handleSaveToken = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newToken.name.trim() || !newToken.value.trim()) {
      toast.error('Token adı və dəyəri mütləq doldurulmalıdır.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/security/tokens', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          provider: selectedType,
          name: newToken.name.trim(),
          token: newToken.value.trim(),
          description: newToken.description.trim() || null
        })
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('API Token uğurla əlavə edildi!');
        setNewToken({ name: '', value: '', description: '' });
        setShowAddToken(false);
        await fetchInitialData();
        setSelectedTokenUuid(data.uuid);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Token qeyd edilərkən xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteToken = async (uuid: string) => {
    if (!confirm('Bu API Tokeni silmək istədiyinizdən əminsiniz?')) return;

    setIsDeletingToken(true);
    try {
      const res = await fetch(`/api/security/tokens/${uuid}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });

      if (res.ok) {
        toast.success('API Token silindi.');
        await fetchInitialData();
      } else {
        toast.error('Token silinərkən xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setIsDeletingToken(false);
    }
  };

  const generatePrivateKey = async (type: 'ed25519' | 'rsa') => {
    setIsGeneratingKey(true);
    try {
      const randomName = `key-${type}-${Math.random().toString(36).substring(2, 7)}`;

      const res = await fetch('/api/security/keys/generate', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          name: randomName,
          description: `Auto-generated ${type.toUpperCase()} SSH key`,
          key_type: type
        })
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`${type.toUpperCase()} açar uğurla yaradıldı!`);
        await fetchInitialData();
        setFormData(prev => ({ ...prev, private_key_id: data.id }));
      } else {
        toast.error('Açar yaradılarkən xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setIsGeneratingKey(false);
    }
  };

  // ==================== EFFECTS ====================
  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedType && selectedType !== 'manual') {
      const filtered = getFilteredTokens();
      if (filtered.length > 0) {
        setSelectedTokenUuid(filtered[0].uuid);
        setShowAddToken(false);
        validateToken(filtered[0].uuid);
      } else {
        setSelectedTokenUuid('');
        setShowAddToken(true);
      }
    }
  }, [selectedType, cloudTokens]);

  useEffect(() => {
    if (selectedType) {
      setFormData(prev => ({
        ...prev,
        name: generateDefaultName()
      }));
    }
  }, [selectedType]);

  // ==================== VALIDATION ====================
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Server adı boş ola bilməz.';
    } else if (formData.name.length > 255) {
      errors.name = 'Server adı 255 simvoldan çox ola bilməz.';
    } else if (!/^[a-zA-Z0-9-_.]+$/.test(formData.name)) {
      errors.name = 'Server adı yalnız hərf, rəqəm, tire, alt xətt və nöqtə ehtiva edə bilər.';
    }

    if (selectedType === 'manual') {
      const ipTrimmed = formData.ip.trim();
      const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
      if (!ipTrimmed) {
        errors.ip = 'IP adresi və ya Domain boş ola bilməz.';
      } else if (!ipRegex.test(ipTrimmed)) {
        errors.ip = 'Düzgün IP adresi və ya Domain daxil edin.';
      }

      if (!formData.port) {
        errors.port = 'SSH Portu boş ola bilməz.';
      } else if (formData.port < 1 || formData.port > 65535) {
        errors.port = 'Port 1 ilə 65535 arasında olmalıdır.';
      }

      if (!formData.user.trim()) {
        errors.user = 'İstifadəçi adı boş ola bilməz.';
      }
    } else {
      if (!selectedTokenUuid) {
        errors.token = 'Zəhmət olmasa bir API token seçin.';
      }
      const selectedToken = getSelectedToken();
      if (selectedToken && selectedToken.is_valid === false) {
        errors.token = 'Seçilmiş API token etibarsızdır. Zəhmət olmasa başqa token seçin.';
      }
      if (!cloudOptions.location) {
        errors.location = 'Lokasiya seçilməlidir.';
      }
      if (!cloudOptions.server_type) {
        errors.server_type = 'Server tipi seçilməlidir.';
      }
      if (!cloudOptions.image) {
        errors.image = 'Əməliyyat sistemi seçilməlidir.';
      }
    }

    if (!formData.private_key_id) {
      errors.private_key_id = 'Zəhmət olmasa bir SSH Key seçin.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ==================== SUBMIT ====================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      let payload: any = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        private_key_id: formData.private_key_id === 'mock-default-key-id' ? null : formData.private_key_id,
        is_build_server: formData.is_build_server
      };

      if (selectedType === 'manual') {
        payload = {
          ...payload,
          ip: formData.ip.trim(),
          port: formData.port,
          user: formData.user.trim(),
          provider: 'manual'
        };
      } else {
        payload = {
          ...payload,
          ip: '127.0.0.1', 
          port: 22,
          user: 'root',
          provider: selectedType,
          token_uuid: selectedTokenUuid,
          location: cloudOptions.location,
          server_type: cloudOptions.server_type,
          image: cloudOptions.image
        };
      }

      const res = await fetch('/api/servers', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newServer = await res.json();
        toast.success('Server uğurla yaradıldı!');
        navigate(`/server/${newServer.uuid || newServer.id}`);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Server əlavə edilərkən xəta baş verdi.');
      }
    } catch (err: any) {
      toast.error('Bağlantı xətası: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== SUB-RENDERS ====================
  const renderTokenSection = () => {
    if (selectedType === 'manual') return null;

    const filtered = getFilteredTokens();
    if (filtered.length === 0) return null;

    const selectedToken = getSelectedToken();

    return (
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
          Aktiv API Token
        </label>
        <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg">
          <div className="flex items-center gap-2 text-xs text-white">
            <Key className="h-4 w-4 text-purple-400" />
            <span>Aktiv Token: <strong>{selectedToken?.name}</strong></span>
            {isValidatingToken && (
              <span className="text-[10px] text-purple-400 animate-pulse ml-2">Yoxlanılır...</span>
            )}
            {selectedToken?.is_valid === true && (
              <span className="text-[10px] text-emerald-400 ml-2 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-medium">✓ Aktivdir</span>
            )}
            {selectedToken?.is_valid === false && (
              <span className="text-[10px] text-rose-400 ml-2 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 font-medium">⚠️ Qeyri-aktiv</span>
            )}
            {selectedToken?.is_valid === undefined && (
              <span className="text-[10px] text-yellow-400 ml-2 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 font-medium flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Yoxlanılmamış
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowAddToken(true)}
              className="px-2.5 py-1 bg-[var(--bg-tertiary)] hover:bg-indigo-600 text-white rounded text-[10px] font-semibold transition-colors cursor-pointer"
            >
              Yeni Token
            </button>
            <button
              type="button"
              onClick={() => handleDeleteToken(selectedTokenUuid)}
              disabled={isDeletingToken}
              className="p-1 hover:text-red-500 text-[var(--text-secondary)] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isDeletingToken ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {selectedToken?.is_valid === false && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-2.5 rounded-lg text-[10px] leading-relaxed flex items-start gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              Seçilmiş API Token aktiv deyil və ya vaxtı keçib! Zəhmət olmasa düzgün token seçin və ya yeni token daxil edin.
            </span>
          </div>
        )}
        {formErrors.token && (
          <span className="text-[10px] text-red-500 mt-1 block">{formErrors.token}</span>
        )}
      </div>
    );
  };

  const renderForm = () => {
    if (privateKeys.length === 0) {
      return (
        <div className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-5 space-y-3 max-w-2xl">
          <h3 className="text-sm font-semibold text-yellow-500 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            SSH Key Tapılmadı
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Server əlavə etməzdən əvvəl ən azı bir ədəd SSH Private Key yaratmalı və ya idxal etməlisiniz. Key-lər serverinizə SSH vasitəsilə təhlükəsiz qoşulmaq üçün istifadə olunur.
          </p>
          <button
            onClick={() => navigate('/security/private-keys')}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            SSH Key Əlavə Et
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl">
        {/* Token Section */}
        {renderTokenSection()}

        {/* Title and Description under selected type */}
        <div className="pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              {PROVIDER_NAMES[selectedType as keyof typeof PROVIDER_NAMES] || selectedType?.toUpperCase()}
            </h2>
            <button
              type="button"
              onClick={() => {
                setSelectedType(null);
                setShowAddToken(false);
                setFormErrors({});
              }}
              className="px-2.5 py-1 bg-[var(--bg-tertiary)] hover:bg-[#27272a] border border-[var(--border-color)] text-xs text-white rounded font-medium transition-colors"
            >
              Back
            </button>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5">
            Add a server to deploy your applications and databases.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Server Adı */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="jolly-jay-p5tsxoqk77nxco8yl4qjnimg"
              className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.name ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
              required
            />
            {formErrors.name && (
              <span className="text-[10px] text-red-500 mt-1 block">{formErrors.name}</span>
            )}
          </div>

          {/* Təsvir */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Description
            </label>
            <input
              type="text"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value || null }))}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]"
            />
          </div>

          {/* Conditional Inputs: Manual vs Cloud */}
          {selectedType === 'manual' ? (
            <>
              {/* IP Ünvanı */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  IP Address/Domain <span className="text-red-500">*</span>
                  <span className="cursor-help text-purple-400 font-semibold" title="Serverinizin public IP adresi və ya host adı.">ⓘ</span>
                </label>
                <input
                  type="text"
                  value={formData.ip}
                  onChange={(e) => setFormData(prev => ({ ...prev, ip: e.target.value }))}
                  className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.ip ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                  required
                />
                {formErrors.ip && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.ip}</span>
                )}
              </div>

              {/* SSH Port */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Port <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.port}
                  onChange={(e) => setFormData(prev => ({ ...prev, port: Number(e.target.value) }))}
                  placeholder="22"
                  min={1}
                  max={65535}
                  className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.port ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                  required
                />
                {formErrors.port && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.port}</span>
                )}
              </div>

              {/* SSH İstifadəçi Adı */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  User <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.user}
                  onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value }))}
                  placeholder="root"
                  className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.user ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                  required
                />
                <span className="text-[10px] text-purple-400 mt-1 block">
                  Non-root user is experimental: <a href="https://coolify.io/docs/knowledge-base/servers" target="_blank" rel="noreferrer" className="underline font-bold hover:text-purple-300">docs</a>.
                </span>
                {formErrors.user && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.user}</span>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Cloud Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Lokasiya (Location) <span className="text-red-500">*</span>
                </label>
                <select
                  value={cloudOptions.location}
                  onChange={(e) => setCloudOptions(prev => ({ ...prev, location: e.target.value }))}
                  className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.location ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                  required
                >
                  {CLOUD_LOCATIONS.map(loc => (
                    <option key={loc.value} value={loc.value}>{loc.label}</option>
                  ))}
                </select>
                {formErrors.location && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.location}</span>
                )}
              </div>

              {/* Cloud Server Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Server Tipi (Plan) <span className="text-red-500">*</span>
                </label>
                <select
                  value={cloudOptions.server_type}
                  onChange={(e) => setCloudOptions(prev => ({ ...prev, server_type: e.target.value }))}
                  className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.server_type ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                  required
                >
                  {CLOUD_SERVER_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {formErrors.server_type && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.server_type}</span>
                )}
              </div>

              {/* Cloud OS Image */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  Əməliyyat Sistemi (Image) <span className="text-red-500">*</span>
                </label>
                <select
                  value={cloudOptions.image}
                  onChange={(e) => setCloudOptions(prev => ({ ...prev, image: e.target.value }))}
                  className={`w-full bg-[var(--bg-tertiary)] border ${formErrors.image ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                  required
                >
                  {CLOUD_IMAGES.map(img => (
                    <option key={img.value} value={img.value}>{img.label}</option>
                  ))}
                </select>
                {formErrors.image && (
                  <span className="text-[10px] text-red-500 mt-1 block">{formErrors.image}</span>
                )}
              </div>
            </>
          )}

          {/* Private Key Dropdown */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Private Key
            </label>
            <div className="flex gap-2 items-center">
              <select
                value={formData.private_key_id}
                onChange={(e) => setFormData(prev => ({ ...prev, private_key_id: e.target.value }))}
                className={`flex-1 bg-[var(--bg-tertiary)] border ${formErrors.private_key_id ? 'border-red-500' : 'border-[var(--border-color)]'} rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all h-[40px]`}
                required
              >
                {privateKeys.map((key) => (
                  <option key={key.id} value={key.id}>
                    {key.name} {key.description ? `(${key.description})` : ''}
                  </option>
                ))}
              </select>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowKeyDropdown(prev => !prev)}
                  className="px-3.5 py-2 bg-transparent hover:bg-purple-700/10 border border-purple-500 text-xs font-semibold text-purple-400 rounded-lg transition-colors flex items-center gap-1.5 h-[40px] cursor-pointer"
                >
                  <span className="text-purple-500 font-bold">+</span> Add
                  <ChevronDown className="h-3 w-3 text-purple-500" />
                </button>

                {showKeyDropdown && (
                  <>
                    {/* Backdrop to close dropdown on click outside */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowKeyDropdown(false)} 
                    />
                    <div className="absolute right-0 bottom-full mb-1 w-48 bg-[#18181b] border border-[#27272a] rounded-lg shadow-xl p-1 z-50">
                      <button
                        type="button"
                        onClick={() => {
                          generatePrivateKey('ed25519');
                          setShowKeyDropdown(false);
                        }}
                        disabled={isGeneratingKey}
                        className="w-full text-left px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] rounded transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isGeneratingKey ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <span className="text-emerald-400 font-bold">+</span>
                        )}
                        Generate ED25519
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          generatePrivateKey('rsa');
                          setShowKeyDropdown(false);
                        }}
                        disabled={isGeneratingKey}
                        className="w-full text-left px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] rounded transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isGeneratingKey ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <span className="text-blue-400 font-bold">+</span>
                        )}
                        Generate RSA
                      </button>
                      <div className="border-t border-[#27272a] my-1"></div>
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/security/private-keys');
                          setShowKeyDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-purple-400 hover:bg-[var(--bg-tertiary)] rounded transition-colors flex items-center gap-2 cursor-pointer font-medium"
                      >
                        Add manually
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {formErrors.private_key_id && (
              <span className="text-[10px] text-red-500 mt-1 block">{formErrors.private_key_id}</span>
            )}
          </div>
        </div>

        {/* Build Server Option */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
            Use it as a build server?
            <span className="cursor-help text-purple-400 font-semibold" title="Əgər bu serveri yalnız tətbiqləri build etmək üçün istifadə etmək istəyirsinizsə aktiv edin.">ⓘ</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_build_server"
              checked={formData.is_build_server}
              onChange={(e) => setFormData(prev => ({ ...prev, is_build_server: e.target.checked }))}
              className="h-4 w-4 rounded border-[var(--border-color)] text-purple-600 focus:ring-purple-500 cursor-pointer"
            />
            <span className="text-xs text-[var(--text-secondary)]">Build server status</span>
          </div>
        </div>

        {/* Action Button: Continue */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <button
            type="submit"
            disabled={isSubmitting || limitReached}
            className="w-full py-2.5 bg-transparent hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-white hover:text-purple-400 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin text-purple-500" />}
            Continue
          </button>
        </div>
      </form>
    );
  };

  // ==================== LOADING ====================
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin" />
        <span className="text-xs text-[var(--text-secondary)]">Məlumatlar yüklənir, zəhmət olmasa gözləyin...</span>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      {!selectedType && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/servers')}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide flex items-center gap-2">
              <ServerIcon className="h-6 w-6 text-indigo-500" />
              Yeni Server Əlavə Et
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              İnfrastrukturunuzu birləşdirmək üçün metod seçin.
            </p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 text-xs text-red-500">
          {error}
        </div>
      )}

      {limitReached && (
        <div className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-4 text-xs text-yellow-500 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Siz maksimal server limitinə (10 server) çatmısınız. Yeni server əlavə etmək mümkün deyil.</span>
        </div>
      )}

      {!selectedType ? (
        /* Server Type Selection Grid */
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 ${limitReached ? 'opacity-40 pointer-events-none' : ''}`}>
          {/* Hetzner Card */}
          <div
            onClick={() => !limitReached && setSelectedType('hetzner')}
            className="bg-[#18181b] border border-[#27272a] hover:border-red-500/50 rounded-xl p-6 flex flex-col justify-between h-48 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex justify-between items-start">
              <svg className="w-12 h-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#D50C2D" rx="16" />
                <path d="M40 40 H60 V90 H140 V40 H160 V160 H140 V110 H60 V160 H40 Z" fill="white" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                Provider
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">Hetzner</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Hetzner Cloud hesabınızdan birbaşa serverlər deploy edin.
              </p>
            </div>
          </div>

          {/* Vultr Card */}
          <div
            onClick={() => !limitReached && setSelectedType('vultr')}
            className="bg-[#18181b] border border-[#27272a] hover:border-blue-500/50 rounded-xl p-6 flex flex-col justify-between h-48 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex justify-between items-start">
              <svg className="w-12 h-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#007BFC" rx="16" />
                <path d="M42 46 H73 L100 127 L127 46 H158 L114 154 H86 Z" fill="white" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                Provider
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Vultr</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Vultr hesabınızdan birbaşa serverlər deploy edin.
              </p>
            </div>
          </div>

          {/* DigitalOcean Card */}
          <div
            onClick={() => !limitReached && setSelectedType('digital-ocean')}
            className="bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 rounded-xl p-6 flex flex-col justify-between h-48 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                DO
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                Provider
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">DigitalOcean</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                DigitalOcean hesabınızdan birbaşa droplet-lər deploy edin.
              </p>
            </div>
          </div>

          {/* Manual Card */}
          <div
            onClick={() => !limitReached && setSelectedType('manual')}
            className="bg-[#18181b] border border-[#27272a] hover:border-yellow-500/50 rounded-xl p-6 flex flex-col justify-between h-48 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex justify-between items-start">
              <svg className="w-12 h-12 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/20">
                Manual
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">Manual</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                İstənilən əlçatan serveri IP adresi və ya domain ilə əlavə edin.
              </p>
            </div>
          </div>
        </div>
      ) : selectedType !== 'manual' && showAddToken ? (
        /* Inline form to Add API Token directly if no tokens exist */
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm max-w-2xl space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
            <Plus className="h-5 w-5 text-indigo-500" />
            <h3 className="text-md font-bold text-white">{selectedType.toUpperCase()} API Tokeni Əlavə Et</h3>
          </div>

          <form onSubmit={handleSaveToken} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                Token Adı *
              </label>
              <input
                type="text"
                value={newToken.name}
                onChange={(e) => setNewToken(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Məs. My Hetzner API Key"
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors h-[38px]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                API Token / Şifrə *
              </label>
              <input
                type="password"
                value={newToken.value}
                onChange={(e) => setNewToken(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Hetzner/Vultr/DO panelindən aldığınız açar"
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors h-[38px]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                Açıqlama
              </label>
              <input
                type="text"
                value={newToken.description}
                onChange={(e) => setNewToken(prev => ({ ...prev, description: e.target.value }))}
                placeholder="İstəyə bağlı təsvir"
                className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors h-[38px]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (getFilteredTokens().length > 0) {
                    setShowAddToken(false);
                  } else {
                    setSelectedType(null);
                  }
                }}
                className="px-4 py-2 bg-transparent hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer h-[38px]"
              >
                Geri
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer h-[38px]"
              >
                {isSubmitting ? 'Saxlanılır...' : 'Tokeni Saxla'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        renderForm()
      )}
    </div>
  );
}
