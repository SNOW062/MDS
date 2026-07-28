// completed ui_comp_028
import StatusBadge from './ui/StatusBadge';

export default function ServerStatus() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500">Server Status:</span>
      <StatusBadge status="running" />
    </div>
  );
}