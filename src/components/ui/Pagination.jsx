import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ meta, page, setPage, limit }) => {


    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
    return (
        <div>
            <div className="flex justify-center items-center gap-3 mt-8">
                <button
                    onClick={handlePrev}
                    disabled={page === 1 || meta.loading}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-[#FAFAFA] transition-all duration-200 ${page === 1 || meta.loading
                        ? "bg-primary/50 border-primary/50 cursor-not-allowed"
                        : "bg-primary border-primary hover:bg-[#27272A]"
                        }`}
                >
                    <ChevronLeft size={16} strokeWidth={1.5} />
                </button>

                <span className="text-sm font-montserrat text-primary font-medium">{page}</span>

                <button
                    onClick={handleNext}
                    disabled={meta.products?.length < limit || meta.loading}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-[#FAFAFA] transition-all duration-200 ${meta.products?.length < limit || meta.loading
                        ? "bg-primary/50 border-primary/50 cursor-not-allowed"
                        : "bg-primary border-primary hover:bg-[#27272A]"
                        }`}
                >
                    <ChevronRight size={16} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    )
}

export default Pagination