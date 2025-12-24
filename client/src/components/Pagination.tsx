"use client";

import { Page } from "@/app/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page }: { page: Page }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function changePage(nextPage: number) {
        // Create a new URLSearchParams from the current ones 
        // to preserve filters like "brand" or "category"
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", nextPage.toString());
        console.log(nextPage)
        replace(`${pathname}?${params.toString()}`, { scroll: true });
        console.log(params);
    }

    // Guard against missing page data
    // if (!page || (page?.totalPages ?? 1) <= 1) return null;

    return (
        <div className="flex justify-center gap-6 mt-12">
            <button
                disabled={page.number <= 0}
                onClick={() => changePage(page.number - 1)}
                className="text-xl leading-none hover:text-pink-500 disabled:opacity-30"
            >‹</button>
            
            <span className="text-lg font-medium whitespace-nowrap min-w-[80px] text-center">{page.number + 1} / {page.totalPages}</span>

            <button
                disabled={page.number >= (page?.totalPages ?? 1) - 1}
                onClick={() => changePage(page.number + 1)}
                className="text-xl leading-none hover:text-pink-500 disabled:opacity-30"
            >›</button>
        </div>
    );
}