// completed ui_page_015
import { useTranslation } from '../../hooks/useTranslation';
import { HardDrive } from 'lucide-react';

export default function StoragePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">{t.sidebar.storages}</h1>
      <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col items-center justify-center min-h-[300px]">
        <HardDrive className="h-12 w-12 text-zinc-600 mb-3" />
        <p className="text-xs text-zinc-500">Yedəkləmə (Backup) üçün S3 qoşulmalarını idarə edin.</p>
      </div>
    </div>
  );
}