// completed ui_comp_069
import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface EnvVar {
  key: string;
  value: string;
}

interface EnvVarEditorProps {
  variables: EnvVar[];
  onSave: (vars: EnvVar[]) => void;
}

export default function EnvVarEditor({ variables, onSave }: EnvVarEditorProps) {
  const [list, setList] = useState<EnvVar[]>(variables);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!key || !value) return;
    const updated = [...list, { key, value }];
    setList(updated);
    onSave(updated);
    setKey('');
    setValue('');
  };

  const handleRemove = (index: number) => {
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
    onSave(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Input placeholder="KEY" value={key} onChange={(e) => setKey(e.target.value)} />
        <Input placeholder="VALUE" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleAdd}>Əlavə Et</Button>
      </div>

      <div className="space-y-2">
        {list.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-[var(--bg-tertiary)]/30 p-2.5 rounded-lg border border-[var(--border-color)]/30 text-xs">
            <span className="font-bold text-[var(--text-primary)]">{item.key}</span>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">{item.value}</span>
              <button onClick={() => handleRemove(idx)} className="text-red-400 hover:text-red-300">
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}