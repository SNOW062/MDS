// completed ui_comp_066
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-2 border-b border-[var(--border-color)] pb-px">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-xs font-semibold transition-all relative ${
            activeTab === tab.id
              ? 'text-indigo-400 border-b-2 border-indigo-500'
              : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}