import React from 'react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

interface ErrorPageProps {
  code?: string;
  title?: string;
  description?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  code = '404',
  title = 'Page Not Found',
  description = "The page you are looking for doesn't exist or has been moved."
}) => {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center p-4 select-none">
      <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white font-mono">{code}</h1>
          <h2 className="text-lg font-bold text-zinc-200">{title}</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.hash = '#/dashboard'}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
