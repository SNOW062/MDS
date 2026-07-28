// completed ui_comp_072
export default function DeploymentsIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-600/10 border border-indigo-500/20 px-3 py-1 rounded-full">
      <span className="h-2 w-2 bg-indigo-500 rounded-full animate-ping" />
      0 Aktiv Deployment
    </div>
  );
}