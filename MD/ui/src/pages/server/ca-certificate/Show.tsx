import React, { useState } from 'react';

export const Show: React.FC = () => {
  const [caCert, setCaCert] = useState('');

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
        <div>
          <h2 className="text-lg font-bold text-white">CA Certificate</h2>
          <p className="text-xs text-zinc-400 mt-1">Custom Root CA certificate for self-signed SSL verification.</p>
        </div>
        <button className="px-3 py-1 bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold text-xs rounded transition-colors">
          Save
        </button>
      </div>

      <textarea
        rows={10}
        value={caCert}
        onChange={(e) => setCaCert(e.target.value)}
        placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
        className="w-full bg-[#0f0f11] border border-[#27272a] rounded-lg p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500"
      />
    </div>
  );
};
