import React from 'react';
import { GitBranch, Plus } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Git Sources</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure GitHub Apps, GitLab, or custom Git integrations.</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2">
          <Plus size={16} />
          <span>Add New Source</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-zinc-800 rounded-xl text-zinc-100">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">GitHub App</h3>
              <p className="text-xs text-zinc-400">Deploy private repositories with fine-grained webhooks.</p>
            </div>
          </div>
          <button className="w-full bg-[#27272a] hover:bg-zinc-700 text-xs text-zinc-200 font-semibold py-2 rounded-lg transition-colors border border-zinc-600">
            Configure GitHub App
          </button>
        </div>

        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl">
              <GitBranch size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">GitLab Integration</h3>
              <p className="text-xs text-zinc-400">Connect self-hosted GitLab instances or SaaS API tokens.</p>
            </div>
          </div>
          <button className="w-full bg-[#27272a] hover:bg-zinc-700 text-xs text-zinc-200 font-semibold py-2 rounded-lg transition-colors border border-zinc-600">
            Configure GitLab
          </button>
        </div>
      </div>
    </div>
  );
};
