import React from 'react';

export const DynamicConfigurationNavbar: React.FC = () => {
  return (
    <div className="flex border-b border-[#27272a] gap-4 text-xs font-semibold text-zinc-400 py-2">
      <span className="text-white border-b-2 border-white pb-2">Dynamic Configs</span>
      <span className="hover:text-zinc-200 cursor-pointer pb-2">Traefik Settings</span>
    </div>
  );
};
