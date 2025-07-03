import Input from "@/components/admin/form/input/InputField";
import {PlusIcon, RefreshCwIcon} from "lucide-react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    useCreateButton?: boolean;
    onCreateClick?: () => void;
    onRefreshClick?: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    useCreateButton = true,
    onCreateClick,
    onRefreshClick
}) => {
    const pagesAroundCurrent = Array.from(
        { length: Math.min(3, totalPages) },
        (_, i) => i + Math.max(currentPage - 1, 1)
    );

    return (
        <div className="flex items-center ">
            { useCreateButton && (
                <button
                    onClick={onCreateClick}
                    className="mr-2.5 gap-2 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
                >
                    Create
                    <PlusIcon />
                </button>
            )}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
            >
                Previous
            </button>
            <div className="flex items-center gap-2">
                {currentPage > 3 && <span className="px-2">...</span>}
                {pagesAroundCurrent.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded ${currentPage === page
                            ? "bg-bite-tongue text-white"
                            : "text-gray-700 dark:text-gray-400"
                            } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-happy-hearts/80`}
                    >
                        {page}
                    </button>
                ))}
                {currentPage < totalPages - 2 && <span className="px-2">...</span>}
            </div>
            <Input className={" text-center !w-[60px]"} placeholder={currentPage.toString()} onEnter={e => {
                if (!(e.target instanceof HTMLInputElement))
                    return;

                let value: number;

                try {
                    value = parseInt(e.target.value);
                }
                catch (err) {
                    return;
                }

                if (value <= totalPages && value >= 1)
                    onPageChange(value);
            }} />
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
                Next
            </button>
            <button
                onClick={onRefreshClick}
                className="ml-2.5 flex gap-2 items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
                Refresh
                <RefreshCwIcon />
        </button>
        </div>
    );
};

export default Pagination;
