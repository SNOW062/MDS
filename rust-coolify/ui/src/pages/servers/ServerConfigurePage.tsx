// completed ui_page_008
import { useNavigate } from 'react-router-dom';

export default function ServerConfigurePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Server Configure</h1>
    </div>
  );
}