// completed ui_comp_027
import Button from './ui/Button';

export default function BackupSettings() {
  return (
    <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl space-y-4">
      <h3 className="text-sm font-bold text-[var(--text-primary)]">Backup Tənzimləmələri</h3>
      <p className="text-xs text-zinc-500">Mühit daxili verilənlərin avtomatik yedəklənməsi</p>
      <Button variant="secondary">Yedəkləmə Planı Qur</Button>
    </div>
  );
}