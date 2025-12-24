'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Brands } from "@/app/data/brand";
import { Categories } from "@/app/data/category";

export default function ProductsClient({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const params = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const updateParam = useDebounce((key: string, value?: string | string[] | boolean) => {
        console.log(`Searching... ${key} ${value}`);
        const search = new URLSearchParams(params.toString());
        search.set("page", "0");
        search.delete(key);
        if (Array.isArray(value)) {
            value.forEach(v => search.append(key, v));
        } else if (value) {
            search.set(key, String(value));
        }
        replace(`${pathname}?${search.toString()}`, { scroll: false });
    }, 200);


    return (
        <div className="border-t border-b border-white py-4 space-y-6">
            {/* Availability Filter */}
            <div>
                <p className="font-bold mb-3">Availability</p>
                <select
                    defaultValue="ALL"
                    onChange={(e) => {
                        const value = e.target.value;
                        updateParam("inStock", value === "ALL" ? undefined : (value === "IN_STOCK").toString());
                    }}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-white"
                >
                    <option value="ALL">All Products</option>
                    <option value="IN_STOCK">In Stock</option>
                    <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
            </div>

            {/* Sort */}
            <p className="font-bold mb-3">Sort</p>
            <div className="flex justify-end mb-4">
                <select
                    defaultValue="none"
                    onChange={(e) => {
                        const value = e.target.value;
                        updateParam("sort", value === "none" ? undefined : value);
                    }}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-white"
                >
                    <option value="none">None</option>
                    <option value="price,asc">Price: Low to High</option>
                    <option value="price,desc">Price: High to Low</option>
                    <option value="name,asc">Name: A-Z</option>
                </select>
            </div>

            {/* Price Inputs */}
            <div>
                <p className="font-bold mb-3">Price Range</p>
                <div className="space-y-2">
                    <input
                        defaultValue={searchParams.minValue}
                        type="number"
                        placeholder="Min"
                        onChange={(e) => updateParam('minPrice', e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-white"
                    />
                    <input
                        defaultValue={searchParams.maxValue}
                        type="number"
                        placeholder="Max"
                        onChange={(e) => updateParam('maxPrice', e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-white"
                    />
                </div>
            </div>
            <div>
                <p className="font-bold mb-3">Category</p>
                {Categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                            checked={category === searchParams.category}
                            name="category"
                            value={category}
                            type="radio"
                            onChange={(e) => updateParam("category", e.target.value)}
                            className="h-5 w-5 accent-pink-500"
                        />
                        {category}
                    </label>
                ))}
            </div>
            {/* Brand Checkboxes */}
            <div>
                <p className="font-bold mb-3">Brands</p>
                <div className="flex flex-col gap-y-2">
                    {Brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    const curBrands = params.getAll("brands");
                                    const newBrands = e.target.checked
                                        ? [...curBrands, brand]
                                        : curBrands.filter(b => b !== brand);
                                    updateParam("brands", newBrands);
                                }}
                                className="h-5 w-5 accent-pink-500"
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            </div>

            
        </div>
    );
}