// completed ui_page_034
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-8 text-center space-y-6">
        <h2 className="text-xl font-bold text-white">Xoş gəldiniz!</h2>
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