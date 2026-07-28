// completed ui_page_002
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { Plus, FolderGit2 } from 'lucide-react';
import { mockProjects } from '../../mocks/projects';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects] = useState(mockProjects);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">{t.projects.title}</h1>
          <p className="text-xs text-zinc-500 mt-1">Sistemdə olan aktiv layihələriniz</p>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors">
          <Plus className="h-4 w-4" />
          {t.projects.add_title}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div 
            key={p.id}
            onClick={() => navigate(`/projects/${p.uuid}/env-prod-uuid`)}
            className="p-6 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-zinc-500/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <FolderGit2 className="h-5 w-5 text-indigo-400" />
              <h2 className="text-sm font-bold text-white">{p.name}</h2>
            </div>
            <p className="text-xs text-zinc-500 mt-2">{p.description || 'Açıklama yoxdur.'}</p>
            <div className="mt-4 pt-4 border-t border-[#27272a] flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-zinc-400 bg-[#27272a] px-2 py-0.5 rounded">
                production
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}