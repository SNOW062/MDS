import React, { useState } from 'react';
import { Database, Plus, HardDrive, ShieldCheck, CheckCircle } from 'lucide-react';

export const Show: React.FC = () => {
  const [databases, setDatabases] = useState([
    {
      id: 'db-1',
      name: 'production-postgres-db',
      type: 'PostgreSQL 16',
      port: 5432,
      status: 'healthy'
    }
  ]);

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-100">
      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            Databases
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Manage PostgreSQL, MySQL, Redis, MongoDB, and KeyDB instances.</p>
        </div>
        <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Database
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {databases.map(db => (
          <div key={db.id} className="bg-[#18181b] border border-[#27272a] hover:border-zinc-700 rounded-xl p-5 space-y-4 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">{db.name}</h3>
                <span className="text-[11px] text-zinc-500 font-mono mt-0.5 block">{db.type} • Port {db.port}</span>
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {db.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
