// completed ui_comp_067
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 select-none">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-xs font-semibold rounded-lg text-white disabled:opacity-40"
      >
        Övvəlki
      </button>
      <span className="text-xs text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-xs font-semibold rounded-lg text-white disabled:opacity-40"
      >
        Növbəti
      </button>
    </div>
  );
}