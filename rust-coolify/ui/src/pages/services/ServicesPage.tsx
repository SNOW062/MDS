// completed ui_page_011
import { useTranslation } from '../../hooks/useTranslation';
import { Sparkles } from 'lucide-react';

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">{t.projects.services}</h1>
      <div className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col items-center justify-center min-h-[300px]">
        <Sparkles className="h-12 w-12 text-zinc-600 mb-3" />
        <p className="text-xs text-zinc-500">One-click WordPress, Ghost, Plausible və s. xidmətləri quraşdırın.</p>
      </div>
    </div>
  );
}