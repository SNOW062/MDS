// completed ui_page_050
import { useTranslation } from '../../hooks/useTranslation';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">{t.notifications.title}</h1>
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Notification Webhooks</h2>
        </div>
        <p className="text-xs text-zinc-500">Discord, Telegram, Slack and Email notification settings.</p>
      </div>
    </div>
  );
}