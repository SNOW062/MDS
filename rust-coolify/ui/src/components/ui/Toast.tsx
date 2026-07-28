// completed ui_comp_063
import React from 'react';
import { CheckCircle, AlertOctagon, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function Toast({ message, type }: ToastProps) {
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
    <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-2xl ${bgColors[type]}`}>
      <span>{icons[type]}</span>
      <p className="text-xs font-semibold leading-relaxed">{message}</p>
    </div>
  );
}