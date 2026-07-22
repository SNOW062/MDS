import React from 'react';
import { Heart } from 'lucide-react';

interface DashboardPageProps {
  onGoToProjects: () => void;
  onGoToServers: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onGoToProjects, onGoToServers }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-xs text-zinc-400 mt-1">Your self-hosted infrastructure overview.</p>
      </div>

      {/* Projects Section */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-zinc-200">Projects</h2>
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-3">
          <p className="text-xs text-amber-400 font-medium">No projects found.</p>
          <p className="text-xs text-zinc-400">
            <button onClick={onGoToProjects} className="text-orange-400 font-bold hover:underline">Add</button> your first project or go to the onboarding page.
          </p>
        </div>
      </div>

      {/* Servers Section */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-zinc-200">Servers</h2>
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 space-y-3">
          <p className="text-xs text-amber-400 font-medium">No private keys found.</p>
          <p className="text-xs text-zinc-400">
            Before you can add your server, first <button onClick={onGoToServers} className="text-orange-400 font-bold hover:underline">add</button> a private key or go to the onboarding page.
          </p>
        </div>
      </div>

      {/* Love Coolify / MasterDeploy Banner */}
      <div className="bg-[#141416] border border-[#27272a] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <Heart size={24} className="fill-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Love MasterDeploy / Coolify? Support our work.</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              High-performance Rust PaaS engine built for speed, safety, and self-hosted control.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/coollabsio/coolify"
            target="_blank"
            rel="noreferrer"
            className="bg-[#27272a] hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors border border-zinc-600"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub Sponsors</span>
          </a>
        </div>
      </div>
    </div>
  );
};
