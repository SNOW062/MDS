// completed ui_comp_055
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-xs text-[#e4e4e7] focus:outline-none focus:border-indigo-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}