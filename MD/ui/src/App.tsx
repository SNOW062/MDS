import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { AboutModal } from './components/AboutModal';
import { NewResourceModal } from './components/modals/NewResourceModal';
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
import { DestinationsPage, StoragePage, KeysPage, ProfilePage } from './pages/MissingPages';

import type { Application } from './types';

// Synchronous Path Resolution for Instant F5 Persistence (Coolify Style)
const parseCurrentPath = () => {
  if (typeof window === 'undefined') return 'dashboard';
  
  let path = window.location.pathname.replace(/^\//, '');
  if (!path) {
    path = window.location.hash.replace(/^#\//, '');
  }
  
  return path || localStorage.getItem('md_active_path') || 'dashboard';
};

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(parseCurrentPath);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('md_sidebar_collapsed') === 'true';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isNewResourceOpen, setIsNewResourceOpen] = useState(false);

  useEffect(() => {
    const handleUrlChange = () => {
      const newPath = parseCurrentPath();
      setCurrentPath(newPath);
      localStorage.setItem('md_active_path', newPath);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    localStorage.setItem('md_active_path', path);
    window.history.pushState(null, '', `/#/${path}`);
  };

  const handleToggleCollapse = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('md_sidebar_collapsed', String(next));
      return next;
    });
  };

  const activeTabGroup = currentPath.split('/')[0];

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0f0f11] text-zinc-100 flex select-none font-sans antialiased">
        {/* Sidebar */}
        <Sidebar
          currentTab={activeTabGroup}
          onSelectTab={(tab) => {
            navigateTo(tab);
            setSelectedApp(null);
          }}
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          onOpenAbout={() => setIsAboutOpen(true)}
        />

        {/* Main Area (Coolify Full Width Fluid Layout) */}
        <div className={`flex-1 transition-all duration-150 ease-out min-w-0 ${collapsed ? 'ml-16' : 'ml-56'}`}>
          <Header
            currentTab={activeTabGroup}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNewProject={() => setIsNewResourceOpen(true)}
          />

          <main className="p-6 md:p-8 w-full">
            <ErrorBoundary>
              {selectedApp ? (
                <ApplicationDetailPage app={selectedApp} onBack={() => setSelectedApp(null)} />
              ) : (
                <>
                  {(activeTabGroup === 'dashboard' || activeTabGroup === '') && (
                    <DashboardPage
                      onGoToProjects={() => navigateTo('projects')}
                      onGoToServers={() => navigateTo('servers')}
                    />
                  )}

                  {activeTabGroup === 'projects' && (
                    <ProjectsPage
                      onSelectApplication={(app) => setSelectedApp(app)}
                      onNewResource={() => setIsNewResourceOpen(true)}
                    />
                  )}

                  {activeTabGroup === 'servers' && <ServersPage />}
                  {activeTabGroup === 'sources' && <SourcesPage />}
                  {activeTabGroup === 'destinations' && <DestinationsPage />}
                  {activeTabGroup === 'storage' && <StoragePage />}
                  {activeTabGroup === 'shared-variables' && <SharedVariablesPage />}
                  {activeTabGroup === 'notifications' && <NotificationsPage />}
                  {activeTabGroup === 'keys' && <KeysPage />}
                  {activeTabGroup === 'terminal' && <TerminalPage />}
                  {activeTabGroup === 'profile' && <ProfilePage />}
                  {activeTabGroup === 'teams' && <TeamsPage />}
                  {activeTabGroup === 'settings' && <SettingsPage />}
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

        {/* New Resource Modal */}
        <NewResourceModal
          isOpen={isNewResourceOpen}
          onClose={() => setIsNewResourceOpen(false)}
          onSelectType={() => setIsNewResourceOpen(false)}
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
