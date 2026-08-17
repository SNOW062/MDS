// completed ui_comp_068
interface MonacoEditorProps {
  value: string;
  onChange?: (val: string) => void;
  language?: string;
}

export default function MonacoEditor({ value, onChange, language = 'yaml' }: MonacoEditorProps) {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-[#0c0c0c] border border-[var(--border-color)] rounded-lg p-4 font-mono text-xs text-[var(--text-secondary)] min-h-[300px] focus:outline-none focus:border-indigo-500"
        placeholder={`Code Editor (${language})`}
      />
    </div>
  );
}