import { useToastStore, toastActions } from '../stores/toastStore';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle className="h-4 w-4 text-emerald-400" />,
    error: <AlertOctagon className="h-4 w-4 text-rose-400" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-400" />,
    info: <Info className="h-4 w-4 text-blue-400" />,
  };

  const bgColors = {
    success: 'bg-[#14291e] border-emerald-500/30 text-emerald-300',
    error: 'bg-[#2b161b] border-rose-500/30 text-rose-300',
    warning: 'bg-[#292214] border-amber-500/30 text-amber-300',
    info: 'bg-[#14213d] border-blue-500/30 text-blue-300',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 p-4 rounded-xl border shadow-2xl transition-all duration-300 animate-slide-in ${
            bgColors[toast.type]
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5">{icons[toast.type]}</span>
            <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => toastActions.removeToast(toast.id)}
            className="p-0.5 rounded-lg hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
