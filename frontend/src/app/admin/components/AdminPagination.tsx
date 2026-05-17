type AdminPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function AdminPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: AdminPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-gray-600 dark:text-gray-300">
        Showing {total === 0 ? 0 : Math.min((page - 1) * pageSize + 1, total)}-
        {Math.min(page * pageSize, total)} of {total}
      </p>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1 dark:border-gray-700 dark:bg-gray-950"
        >
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="rounded-lg border border-gray-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          Page {page} / {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          className="rounded-lg border border-gray-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

