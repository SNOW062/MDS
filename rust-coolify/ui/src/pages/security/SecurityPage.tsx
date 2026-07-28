// completed ui_page_016
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

export default function SecurityPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">{t.sidebar.keys_tokens}</h1>
        <p className="text-xs text-zinc-500 mt-1">Giriş açarları və API token tənzimləmələri</p>
      </div>

      <div className="flex gap-4 border-b border-[#27272a] pb-px">
        <Link to="/security/private-keys" className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          {t.security.ssh_keys}
        </Link>
        <Link to="/security/api-tokens" className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white">
          {t.security.api_tokens}
        </Link>
      </div>

      <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6">
        <Outlet />
      </div>
    </div>
  );
}