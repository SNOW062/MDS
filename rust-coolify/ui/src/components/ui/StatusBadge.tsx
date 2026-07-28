// completed ui_comp_064
interface StatusBadgeProps {
  status: 'running' | 'stopped' | 'degraded' | 'starting' | 'restarting' | 'error' | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    running: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    stopped: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    starting: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    restarting: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const currentStyle = styles[status] || styles.stopped;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${currentStyle}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${status === 'running' || status === 'starting' ? 'animate-pulse' : ''}`} />
      {status}
    </div>
  );
}