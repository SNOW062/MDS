import React, { useState } from 'react';
import { HardDrive, Plus, Cloud, CheckCircle } from 'lucide-react';

export const Index: React.FC = () => {
  const [buckets, setBuckets] = useState([
    { id: 's3-1', name: 'backups-s3-bucket', endpoint: 'https://s3.eu-central-1.amazonaws.com', bucket: 'md-production-backups' }
  ]);

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-amber-400" />
            S3 Storage Buckets
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Configure AWS S3, MinIO, or Cloudflare R2 backup destinations.</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add S3 Storage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buckets.map(b => (
          <div key={b.id} className="bg-[#18181b] border border-[#27272a] hover:border-zinc-700 rounded-xl p-5 space-y-3 transition-all">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white font-mono">{b.name}</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Active
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              <div>Bucket: <span className="text-white">{b.bucket}</span></div>
              <div className="truncate">Endpoint: <span className="text-zinc-500">{b.endpoint}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
