// completed ui_comp_026
import Checkbox from './ui/Checkbox';

export default function SslSettings() {
  return (
    <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl space-y-4">
      <h3 className="text-sm font-bold text-white">SSL Tənzimləmələri</h3>
      <Checkbox id="ssl" label="Let's Encrypt SSL sertifikatını aktivləşdir" />
    </div>
  );
}