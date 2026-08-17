// completed ui_page_030
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, SunMoon } from 'lucide-react';

export default function ProfileNavbar() {
  return (
    <div className="flex gap-4 border-b border-[var(--border-color)] pb-4 mb-6">
      <NavLink
        to="/profile"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`
        }
      >
        <User className="h-4 w-4" />
        General
      </NavLink>
      <NavLink
        to="/profile/appearance"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`
        }
      >
        <SunMoon className="h-4 w-4" />
        Appearance
      </NavLink>
    </div>


  );
}
