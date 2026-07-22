import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ToastMessage {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message?: string;
  errorDetails?: string;
  docUrl?: string;
}

interface NotificationToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toast, onClose }) => {
  const { t } = useLanguage();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-xl p-5 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {isError && (
            <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
              <AlertCircle size={18} />
            </div>
          )}
          {isSuccess && (
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle size={18} />
            </div>
          )}
          {!isError && !isSuccess && (
            <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Info size={18} />
            </div>
          )}
          <h3 className="text-base font-bold text-white tracking-tight">{toast.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {toast.message && (
        <p className="text-xs text-zinc-300 leading-relaxed pl-10">{toast.message}</p>
      )}

      {toast.docUrl && (
        <p className="text-xs text-zinc-400 pl-10">
          Check this{' '}
          <a
            href={toast.docUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white underline hover:text-purple-400 font-semibold"
          >
            documentation
          </a>{' '}
          for further help.
        </p>
      )}

      {toast.errorDetails && (
        <div className="pl-10 pt-1">
          <span className="text-xs font-mono text-zinc-400">
            Error: <span className="text-rose-400">{toast.errorDetails}</span>
          </span>
        </div>
      )}
    </div>
  );
};
