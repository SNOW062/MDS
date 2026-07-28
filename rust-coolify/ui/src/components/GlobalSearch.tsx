// completed ui_comp_071
import { Search } from 'lucide-react';
import Input from './ui/Input';

export default function GlobalSearch() {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
      <Input className="pl-9" placeholder="Qlobal Axtarış (Ctrl+K)" />
    </div>
  );
}