// completed ui_comp_026
import Checkbox from './ui/Checkbox';

export default function SslSettings() {
  return (
    <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl space-y-4">
      <h3 className="text-sm font-bold text-[var(--text-primary)]">SSL Tənzimləmələri</h3>
      <Checkbox id="ssl" label="Let's Encrypt SSL sertifikatını aktivləşdir" />
    </div>
  );
}