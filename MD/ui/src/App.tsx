import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { AboutModal } from './components/AboutModal';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';

import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServersPage } from './pages/ServersPage';
import { SourcesPage } from './pages/SourcesPage';
import { SharedVariablesPage } from './pages/SharedVariablesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { TeamsPage } from './pages/TeamsPage';
import { TerminalPage } from './pages/TerminalPage';
import { SettingsPage } from './pages/SettingsPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import type { Application } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Synchronize React Navigation state with browser URL Hash route on mount & changes
  useEffect(() => {
    const parseHashRoute = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#/' || hash === '#/dashboard') {
        setCurrentTab('dashboard');
        window.history.replaceState(null, '', '#/dashboard');
      } else {
        const route = hash.replace('#/', '');
        setCurrentTab(route);
      }
    };

    parseHashRoute();
    window.addEventListener('hashchange', parseHashRoute);
    return () => window.removeEventListener('hashchange', parseHashRoute);
  }, []);

  const navigateTo = (tab: string) => {
    window.location.hash = `#/${tab}`;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab.split('/')[0]} // Highlight correct parent tab in sidebar
          onSelectTab={(tab) => {
            navigateTo(tab);
            setSelectedApp(null);
          }}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

        {/* Main Area */}
        <div className={`flex-1 transition-all duration-200 ${collapsed ? 'ml-16' : 'ml-56'}`}>
          <Header
            currentTab={currentTab.split('/')[0]}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNewProject={() => alert('New Resource Modal')}
          />

          <main className="p-8 max-w-7xl mx-auto">
            <ErrorBoundary>
              {selectedApp ? (
                <ApplicationDetailPage app={selectedApp} onBack={() => setSelectedApp(null)} />
              ) : (
                <>
                  {currentTab === 'dashboard' && (
                    <DashboardPage
                      onGoToProjects={() => navigateTo('projects')}
                      onGoToServers={() => navigateTo('servers')}
                    />
                  )}

                  {currentTab === 'projects' && (
                    <ProjectsPage
                      onSelectApplication={(app) => setSelectedApp(app)}
                      onNewResource={() => alert('New Application Modal')}
                    />
                  )}

                  {currentTab.startsWith('servers') && <ServersPage />}
                  {currentTab === 'sources' && <SourcesPage />}
                  
                  {currentTab === 'destinations' && (
                    <div className="bg-[#18181b] border border-[#27272a] p-12 rounded-xl text-center space-y-3">
                      <h2 className="text-xl font-bold text-white">Destinations</h2>
                      <p className="text-xs text-zinc-400">Configure Docker Swarm, Standalone Docker, or Kubernetes clusters.</p>
                    </div>
                  )}

                  {currentTab === 'storage' && (
                    <div className="bg-[#18181b] border border-[#27272a] p-12 rounded-xl text-center space-y-3">
                      <h2 className="text-xl font-bold text-white">S3 Storages</h2>
                      <p className="text-xs text-zinc-400">Configure Amazon S3, MinIO, or Cloudflare R2 backup targets.</p>
                    </div>
                  )}

                  {currentTab === 'shared-variables' && <SharedVariablesPage />}
                  {currentTab === 'notifications' && <NotificationsPage />}

                  {currentTab === 'keys' && (
                    <div className="bg-[#18181b] border border-[#27272a] p-12 rounded-xl text-center space-y-3">
                      <h2 className="text-xl font-bold text-white">Keys & API Tokens</h2>
                      <p className="text-xs text-zinc-400">Manage SSH Private Keys for VPS deployment nodes.</p>
                    </div>
                  )}

                  {currentTab === 'tags' && (
                    <div className="bg-[#18181b] border border-[#27272a] p-12 rounded-xl text-center space-y-3">
                      <h2 className="text-xl font-bold text-white">Tags Manager</h2>
                      <p className="text-xs text-zinc-400">Tag applications and servers for quick group filtering.</p>
                    </div>
                  )}

                  {currentTab === 'terminal' && <TerminalPage />}

                  {currentTab === 'profile' && (
                    <div className="bg-[#18181b] border border-[#27272a] p-12 rounded-xl text-center space-y-3">
                      <h2 className="text-xl font-bold text-white">User Profile & 2FA</h2>
                      <p className="text-xs text-zinc-400">Manage your account email, password, and two-factor authentication.</p>
                    </div>
                  )}

                  {currentTab === 'teams' && <TeamsPage />}

                  {currentTab === 'settings' && <SettingsPage />}
                </>
              )}
            </ErrorBoundary>
          </main>
        </div>

        {/* Command Palette */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectResult={(type, id) => {
            if (type === 'app') {
              setSelectedApp({
                id,
                name: 'coolify-rust-backend',
                gitRepository: 'github.com/coolify/rust-core',
                gitBranch: 'main',
                buildPack: 'nixpacks',
                fqdn: 'https://api.coolify.local',
                ports: '8000:8000',
                status: 'running',
                serverId: 'srv-local',
                environmentId: 'env-prod',
                createdAt: '2026-07-22',
              });
            }
          }}
        />

        {/* About MD Logo Modal */}
        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
