// completed ui_comp_019
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { useProjectStore, projectActions } from '../stores/projectStore';
import { mockProjects } from '../mocks/projects';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Server, 
  ShieldCheck, 
  Bell, 
  Settings, 
  LogOut,
  Globe,
  ChevronDown,
  ChevronRight,
  GitFork,
  HardDrive,
  Link2,
  Code,
  Tags,
  Terminal as TerminalIcon,
  User,
  Users,
  Sparkles,
  Heart,
  HelpCircle
} from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import DeploymentsIndicator from './DeploymentsIndicator';
import mdLogo from '../assets/MDLOGO.png';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t, language, setLanguage } = useTranslation();
  const { user, currentTeam, logout, setCurrentTeam } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    const token = localStorage.getItem('md_token');
    if (!token) {
      navigate('/register', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (projects.length === 0) {
      projectActions.setProjects(mockProjects);
    }
  }, [projects]);

  const menuItems = [
    { name: t.sidebar.dashboard, path: '/', icon: LayoutDashboard },
    { name: t.sidebar.projects, path: '/projects', icon: FolderGit2 },
    { name: t.sidebar.servers, path: '/servers', icon: Server },
    { name: t.sidebar.sources, path: '/sources', icon: GitFork },
    { name: t.sidebar.destinations, path: '/servers', icon: Link2 },
    { name: t.sidebar.storages, path: '/storages', icon: HardDrive },
    { name: t.sidebar.shared_variables, path: '/settings', icon: Code },
    { name: t.sidebar.notifications, path: '/notifications', icon: Bell },
    { name: t.sidebar.keys_tokens, path: '/security/private-keys', icon: ShieldCheck },
    { name: t.sidebar.tags, path: '/projects', icon: Tags },
    { name: t.sidebar.terminal, path: '/server/localhost-uuid/terminal', icon: TerminalIcon },
    { name: t.sidebar.profile, path: '/profile', icon: User },
    { name: t.sidebar.teams, path: '/team', icon: Users },
    { name: t.sidebar.settings, path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const languages = [
    { code: 'az', label: 'Azərbaycanca 🇦🇿' },
    { code: 'en', label: 'English 🇬🇧' },
    { code: 'tr', label: 'Türkçe 🇹🇷' },
    { code: 'ru', label: 'Русский 🇷🇺' }
  ];

  const mockTeams = [
    { id: 1, name: 'Personal Team', uuid: 'team-uuid', description: 'Default personal team', created_at: '', updated_at: '' },
    { id: 2, name: 'Production Team', uuid: 'prod-team-uuid', description: 'Production deployments', created_at: '', updated_at: '' }
  ];


  // Appearance parametrlərini local storage-dən yükləyirik
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    const zoom = localStorage.getItem('zoom') || '100';

    // Tema tətbiqi
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    // Zoom tətbiqi — Coolify kimi html font-size vasitəsilə
    const existingStyle = document.getElementById('coolify-zoom-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    if (zoom === '90') {
      const style = document.createElement('style');
      style.id = 'coolify-zoom-style';
      style.textContent = `
        html {
          font-size: 93.75% !important;
        }
        @media (min-width: 1024px) {
          html {
            font-size: 87.5% !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, [location.pathname]); // Hər marşrut dəyişəndə təkrar yoxlayırıq



  const pageWidth = localStorage.getItem('pageWidth') || 'full';

  return (
    <div className={`flex h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-200 ${
      pageWidth === 'center' ? 'max-w-7xl mx-auto w-full border-l border-r border-[var(--border-color)] shadow-2xl' : 'w-full'
    }`}>
      {/* SIDEBAR */}
      <aside className="w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col select-none transition-colors duration-200">

        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {/* Logo Area */}
          <div className="p-6 border-b border-[var(--border-color)] flex items-center gap-3">
            <img src={mdLogo} className="h-9 w-9 object-contain rounded" alt="MasterDeploy Logo" />
            <div>
              <span className="font-bold text-base tracking-wide text-white">MasterDeploy</span>
              <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Self-Hosted</p>
            </div>
          </div>

          {/* Team Switcher dropdown (Right under the Logo!) */}
          <div className="p-4 border-b border-[var(--border-color)] relative">
            <button
              onClick={() => setIsTeamOpen(!isTeamOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-zinc-500 rounded-lg text-xs font-semibold text-[var(--text-primary)] transition-colors"
            >
              <span>{currentTeam?.name || 'Personal Team'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
            </button>

            {isTeamOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsTeamOpen(false)}></div>
                <div className="absolute top-14 left-4 right-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-xl p-1 z-50">
                  {mockTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        setCurrentTeam(team);
                        setIsTeamOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded transition-colors flex items-center justify-between ${
                        currentTeam?.id === team.id 
                          ? 'bg-indigo-600/10 text-indigo-400 font-semibold' 
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[#e4e4e7]'
                      }`}
                    >
                      {team.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isProjects = item.path === '/projects';
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.path}
                      className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-[var(--bg-tertiary)]/60 text-amber-500 font-semibold' 
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[#e4e4e7]'
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      {item.name}
                    </Link>
                    {isProjects && (
                      <button
                        onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-zinc-500 hover:text-white transition-colors mr-1"
                      >
                        {isProjectsExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      </button>
                    )}
                  </div>
                  {isProjects && isProjectsExpanded && (
                    <div className="pl-9 pr-2 py-1 space-y-2 border-l border-zinc-800 ml-5 my-1">
                      {projects.map((project) => (
                        <div key={project.id} className="space-y-1">
                          <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider truncate">
                            {project.name}
                          </div>
                          {project.environments?.map((env) => (
                            <Link
                              key={env.id}
                              to={`/projects/${project.uuid}/${env.uuid}`}
                              className="block text-[11px] text-[var(--text-secondary)] hover:text-white py-0.5 hover:underline truncate"
                            >
                              • {env.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer items — Coolify kimi hamısı birlikdə sürüşür */}
          <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-1 text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 text-[var(--text-secondary)] hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <span className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                {t.sidebar.whats_new}
              </span>
              <span className="h-5 w-5 rounded-full bg-red-600 text-[10px] font-bold text-[var(--text-primary)] flex items-center justify-center">
                8
              </span>
            </div>

            <div className="flex items-center gap-3 px-3 py-1.5 text-[var(--text-secondary)] hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <Heart className="h-4 w-4 text-rose-500" />
              {t.sidebar.sponsor_us}
            </div>

            <div className="flex items-center gap-3 px-3 py-1.5 text-[var(--text-secondary)] hover:text-white rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <HelpCircle className="h-4 w-4 text-[var(--text-secondary)]" />
              {t.sidebar.feedback}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-1.5 text-[var(--text-secondary)] hover:text-red-400 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors text-left"
            >
              <LogOut className="h-4 w-4" />
              {t.sidebar.logout}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 flex items-center justify-between select-none z-40 transition-colors duration-200">
          <div className="flex-1 max-w-md">
            <GlobalSearch />
          </div>

          <div className="flex items-center gap-4">
            <DeploymentsIndicator />

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:bg-[#3f3f46] text-xs font-medium transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <span>{languages.find(l => l.code === language)?.label.split(' ')[0]}</span>
                <ChevronDown className="h-3 w-3 text-[var(--text-secondary)]" />
              </button>

              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-xl p-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors flex items-center justify-between ${
                          language === lang.code 
                            ? 'bg-indigo-600/10 text-indigo-400 font-semibold' 
                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[#e4e4e7]'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <main id="main-content-layout" className="flex-1 overflow-y-auto p-6 bg-[var(--bg-primary)] relative transition-colors duration-200">
          {children}
        </main>
      </div>

    </div>
  );
}

