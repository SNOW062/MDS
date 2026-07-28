// completed ui_comp_070
interface MetricsChartProps {
  title: string;
  value: string;
  percent: number;
}

export default function MetricsChart({ title, value, percent }: MetricsChartProps) {
  return (
    <div className="p-6 bg-[#18181b] border border-[#27272a] rounded-xl flex flex-col justify-between">
      <div>
        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">{title}</p>
        <h2 className="text-xl font-bold text-white mt-1">{value}</h2>
      </div>
      <div className="mt-4">
        <div className="w-full bg-[#27272a] h-2 rounded-full overflow-hidden">
          <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
        <p className="text-[10px] text-zinc-500 text-right mt-1.5">{percent}% limit</p>
      </div>
    </div>
  );
}