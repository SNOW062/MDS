// completed ui_page_031
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ProfileNavbar from './ProfileNavbar';
import { Sun, Monitor, Moon, LayoutGrid, Maximize, ZoomIn, ZoomOut } from 'lucide-react';

export default function AppearancePage() {
  useDocumentTitle('Appearance');
  const { t } = useTranslation();
  
  // Local storage üzərindən parametrləri yükləyirik
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [pageWidth, setPageWidth] = useState(localStorage.getItem('pageWidth') || 'full');
  const [zoom, setZoom] = useState(localStorage.getItem('zoom') || '100');

  useEffect(() => {
    // İlk yüklənmədə və dəyişiklikdə dərhal DOM-u yeniləyirik
    applySettings(theme, pageWidth, zoom);
  }, [theme, pageWidth, zoom]);

  const applySettings = (currentTheme: string, currentWidth: string, currentZoom: string) => {
    // Tema tətbiqi
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = currentTheme === 'dark' || (currentTheme === 'system' && prefersDark);
    
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
    if (currentZoom === '90') {
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
  };

  const handleSetTheme = (type: string) => {
    setTheme(type);
    localStorage.setItem('theme', type);
    applySettings(type, pageWidth, zoom);
  };

  const handleSetWidth = (width: string) => {
    setPageWidth(width);
    localStorage.setItem('pageWidth', width);
    window.location.reload();
  };

  const handleSetZoom = (value: string) => {
    setZoom(value);
    localStorage.setItem('zoom', value);
    window.location.reload();
  };

  return (
    <div className="max-w-2xl space-y-6 text-[var(--text-primary)]">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Profile Settings</h1>
      </div>
      
      <ProfileNavbar />

      <div className="flex flex-col gap-8 pt-4">
        {/* Theme Section */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Appearance</h2>
          <div className="text-xs text-[var(--text-secondary)]">Choose how Coolify looks in this browser.</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSetTheme('light')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                theme === 'light'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              Light
            </button>
            <button
              onClick={() => handleSetTheme('system')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                theme === 'system'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              System
            </button>
            <button
              onClick={() => handleSetTheme('dark')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              Dark
            </button>
          </div>
        </section>

        {/* Width Section */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Width</h2>
          <div className="text-xs text-[var(--text-secondary)]">Choose the maximum page width for this browser.</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSetWidth('center')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                pageWidth === 'center'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Maximize className="h-3.5 w-3.5 rotate-45" />
              Center
            </button>
            <button
              onClick={() => handleSetWidth('full')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                pageWidth === 'full'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <Maximize className="h-3.5 w-3.5" />
              Full
            </button>
          </div>
        </section>

        {/* Zoom Section */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Zoom</h2>
          <div className="text-xs text-[var(--text-secondary)]">Choose interface density for this browser.</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSetZoom('100')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                zoom === '100'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <ZoomIn className="h-3.5 w-3.5" />
              100%
            </button>
            <button
              onClick={() => handleSetZoom('90')}
              className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                zoom === '90'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <ZoomOut className="h-3.5 w-3.5" />
              90%
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

