// completed ui_page_034
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="max-w-md w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-8 text-center space-y-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Xoş gəldiniz!</h2>
        <p className="text-xs text-zinc-500">İnfrastrukturunuzu qurmağa başlayaq.</p>
        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          Başla
        </button>
      </div>
    </div>
  );
}