import React from 'react';
import { 
  LayoutDashboard,
  FolderKanban, 
  Server as ServerIcon, 
  GitBranch,
  Navigation,
  HardDrive, 
  Variable,
  Bell,
  Key, 
  Tag,
  Terminal,
  User,
  Users,
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Heart,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAbout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onOpenAbout,
}) => {
  const { t } = useLanguage();

  const mainMenuItems = [
    { id: 'dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { id: 'projects', labelKey: 'projects', icon: FolderKanban },
    { id: 'servers', labelKey: 'servers', icon: ServerIcon },
    { id: 'sources', labelKey: 'sources', icon: GitBranch },
    { id: 'destinations', labelKey: 'destinations', icon: Navigation },
    { id: 'storage', labelKey: 'storage', icon: HardDrive },
    { id: 'shared-variables', labelKey: 'sharedVariables', icon: Variable },
    { id: 'notifications', labelKey: 'notifications', icon: Bell },
    { id: 'keys', labelKey: 'keys', icon: Key },
    { id: 'tags', labelKey: 'tags', icon: Tag },
    { id: 'terminal', labelKey: 'terminal', icon: Terminal },
    { id: 'profile', labelKey: 'profile', icon: User },
    { id: 'teams', labelKey: 'teams', icon: Users },
  ];

  const footerMenuItems = [
    { id: 'whats-new', labelKey: 'whatsNew', icon: Sparkles },
    { id: 'sponsor', labelKey: 'sponsor', icon: Heart, color: 'text-pink-500' },
    { id: 'feedback', labelKey: 'feedback', icon: MessageSquare },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-[#101012] border-r border-[#242427] transition-all duration-200 flex flex-col justify-between ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {/* Logo Header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-[#242427] sticky top-0 bg-[#101012] z-10">
          <button
            onClick={onOpenAbout}
            className="flex items-center space-x-2.5 overflow-hidden text-left hover:opacity-80 transition-opacity cursor-pointer group"
            title="MasterDeploy (MD) Bio & Info"
          >
            <img
              src="/logo.png"
              alt="MD Icon"
              className="w-8 h-8 object-contain shrink-0 drop-shadow-md group-hover:scale-105 transition-transform"
            />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide text-white font-mono leading-none">
                  Master<span className="text-orange-500">Deploy</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono mt-0.5">v4.0 (Rust)</span>
              </div>
            )}
          </button>

          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md hover:bg-[#242427] text-zinc-400 hover:text-white transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Team Selector */}
        {!collapsed && (
          <div className="px-3 py-2.5 border-b border-[#242427]">
            <div className="bg-[#18181b] hover:bg-[#242427] transition-colors p-2 rounded-lg border border-[#2b2b2f] flex items-center justify-between cursor-pointer">
              <span className="text-xs font-medium text-zinc-200 truncate">admin's Team</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">Owner</span>
            </div>
          </div>
        )}

        {/* Main Menu Links */}
        <nav className="p-2 space-y-0.5">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const label = t(item.labelKey);
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:bg-[#1a1a1d] hover:text-zinc-200'
                }`}
                title={collapsed ? label : undefined}
              >
                <Icon size={17} className={isActive ? 'text-orange-500' : 'text-zinc-400'} />
                {!collapsed && <span>{label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-2 border-t border-[#242427] bg-[#101012] space-y-0.5">
        {footerMenuItems.map((item) => {
          const Icon = item.icon;
          const label = t(item.labelKey);
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="w-full flex items-center space-x-3 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:bg-[#1a1a1d] hover:text-zinc-200 transition-colors"
              title={collapsed ? label : undefined}
            >
              <Icon size={16} className={item.color || 'text-zinc-400'} />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}

        <button
          onClick={() => alert('Logged out')}
          className="w-full flex items-center space-x-3 px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
          title={collapsed ? t('logout') : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>{t('logout')}</span>}
        </button>
      </div>
    </aside>
  );
};
