// completed ui_comp_056
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-2.5 text-xs text-[#e4e4e7] focus:outline-none focus:border-indigo-500 min-h-[100px] transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}