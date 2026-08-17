// completed ui_comp_058
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <div className="flex items-center select-none cursor-pointer">
      <input
        type="checkbox"
        className={`h-4 w-4 rounded bg-[var(--bg-tertiary)] border-[var(--border-color)] text-indigo-600 focus:ring-0 cursor-pointer ${className}`}
        {...props}
      />
      <label htmlFor={props.id} className="ml-2 text-xs text-[var(--text-secondary)] cursor-pointer">
        {label}
      </label>
    </div>
  );
}