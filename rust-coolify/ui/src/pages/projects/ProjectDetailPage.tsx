// completed ui_page_003
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { ArrowLeft, Plus } from 'lucide-react';
import { mockProjects } from '../../mocks/projects';

export default function ProjectDetailPage() {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.uuid === uuid) || mockProjects[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/projects')} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">{project.name}</h1>
          <p className="text-xs text-zinc-500">{project.description}</p>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6">
        <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">{t.projects.environments}</h2>
        <div className="flex gap-2">
          {project.environments?.map(env => (
            <button
              key={env.id}
              onClick={() => navigate(`/projects/${uuid}/${env.uuid}`)}
              className="px-4 py-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-semibold hover:bg-indigo-600/20 transition-colors"
            >
              {env.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}