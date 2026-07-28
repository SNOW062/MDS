// completed ui_page_058
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Shield, HelpCircle, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { mockServers } from '../../mocks/servers';

export default function ServerCaCertificatePage() {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [server, setServer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State-ləri (Orijinal CaCertificate/Show.php ilə 1-ə-1)
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateContent, setCertificateContent] = useState('');
  const [certificateValidUntil, setCertificateValidUntil] = useState<string | null>(null);

  useEffect(() => {
    const found = mockServers.find(s => s.uuid === uuid) || mockServers[0];
    if (found) {
      setServer(found);
      setCertificateContent(found.ca_certificate || `-----BEGIN CERTIFICATE-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0y8b9...
-----END CERTIFICATE-----`);
      setCertificateValidUntil(found.ca_certificate_valid_until || '2036-07-29');
    }
    setIsLoading(false);
  }, [uuid]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateContent.trim()) {
      alert('Sertifikat məzmunu boş ola bilməz.');
      return;
    }
    alert('CA Certificate uğurla qeyd olundu.');
  };

  const handleRegenerate = () => {
    if (window.confirm('CA Certificate-i yenidən generasiya etmək istədiyinizdən əminsiniz?')) {
      setCertificateContent(`-----BEGIN CERTIFICATE-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3XYZ...
-----END CERTIFICATE-----`);
      setCertificateValidUntil('2046-07-29');
      alert('CA Certificate yenidən generasiya olundu.');
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
        <button onClick={() => navigate('/servers')} className="p-1.5 rounded-lg hover:bg-[#18181b] text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-2xl font-bold text-white">CA Certificate</h1>
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
        <Link to={`/server/${uuid}/private-key`} className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          Private Key
        </Link>
        <Link to={`/server/${uuid}/ca-certificate`} className="px-4 py-2 border-b-2 border-indigo-500 text-xs font-semibold text-indigo-400">
          CA Certificate
        </Link>
      </div>

      {/* Main Panel */}
      <form onSubmit={handleSave} className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#27272a] pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-400" /> CA Certificate Config
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRegenerate}
              className="bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              Regenerate Certificate
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            >
              <Save className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>

        {/* Valid until info */}
        {certificateValidUntil && (
          <div className="bg-[#09090b] border border-[#27272a] p-4 rounded-lg text-xs text-zinc-400 flex items-center justify-between">
            <span>Certificate Valid Until:</span>
            <span className="font-semibold text-white">{certificateValidUntil}</span>
          </div>
        )}

        {/* Certificate toggle view and content input */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-zinc-400">SSL Certificate Content</label>
            <button
              type="button"
              onClick={() => setShowCertificate(!showCertificate)}
              className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
            >
              {showCertificate ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showCertificate ? 'Hide Certificate' : 'Show Certificate'}
            </button>
          </div>

          <textarea
            value={showCertificate ? certificateContent : '••••••••••••••••••••••••••••••••••••••••'}
            onChange={(e) => {
              if (showCertificate) setCertificateContent(e.target.value);
            }}
            readOnly={!showCertificate}
            rows={12}
            className={`w-full bg-[#09090b] border border-[#27272a] rounded-lg p-4 font-mono text-xs text-zinc-300 focus:outline-none focus:border-indigo-500 ${
              !showCertificate ? 'cursor-not-allowed text-zinc-600' : ''
            }`}
          />
        </div>
      </form>
    </div>
  );
}
