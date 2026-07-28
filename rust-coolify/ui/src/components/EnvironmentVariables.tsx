// completed ui_comp_025
import { useState } from 'react';
import EnvVarEditor from './editors/EnvVarEditor';

export default function EnvironmentVariables() {
  const [vars, setVars] = useState([{ key: 'PORT', value: '80' }]);
  return (
    <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl space-y-4">
      <h3 className="text-sm font-bold text-white">Mühit Dəyişənləri</h3>
      <EnvVarEditor variables={vars} onSave={setVars} />
    </div>
  );
}