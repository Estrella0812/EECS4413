'use client'
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "@/app/lib/products";
import { useParams, useSearchParams } from "next/navigation";
import { Brands } from "@/app/data/brand";
import { Categories } from "@/app/data/category";
import { Product } from "@/app/types/product";

export default function Products(){
    const { category } = useParams<{category: string}>();
    const useSearchParamss = useSearchParams();
    const page = useSearchParamss.get("page") || "1";

    const [sort, setSort] = useState<"low-high" | "high-low" | "name-asc" | "name-desc" | "none">("none");
    const [minPrice, setMinPrice] = useState<number|null>(null);
    const [maxPrice, setMaxPrice] = useState<number|null>(null);
    const [brands, setBrands] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const handleBrandSelected = (subIndex: string) => {
        setBrands((prevItems) => {
            if (prevItems.includes(subIndex)) {
            // Remove if already selected
            return prevItems.filter((item) => item !== subIndex);
            } else {
            // Add if not selected
            return [...prevItems, subIndex];
            }
        });
    };

    // Fetch all products from api
    useEffect(() => {
        getProductsByCategory(category).then(setProducts);
    }, []);

    console.log(products);


    return(
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-4 grid-cols-1 my-18">
            <section className="text-2xl font-semibold p-2 pl-4 w-full lg:col-span-12">
                Category: {category}
            </section>

            <section className="lg:col-span-3 flex flex-col items-center gap-x-8 mr-4">
                <div className="text-xl font-semibold p-2 pl-4 w-full">Filters</div>
                <div className="w-full grid gap-y-1 divide-y divide-white border-white border-t-1 border-b-1">
                    <div className="w-full p-4">
                        <p className="font-bold mb-4">Price</p>
                        {/* Min price */}
                        <div className="mb-3 px-3">
                            <label className="mb-1 block text-sm text-white">Min price</label>
                            <input
                            type="number"
                            min={0}
                            value={minPrice||undefined}
                            onChange={(e) => setMinPrice(parseInt(e.target.value))}
                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                            placeholder="$"
                            />
                        </div>


                        {/* Max price */}
                        <div className="mb-3 px-3">
                        <label className="mb-1 block text-sm text-white">Max price</label>
                        <input
                        type="number"
                        min={0}
                        value={maxPrice||undefined}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none"
                        placeholder="$"
                        />
                        </div>
                    </div>
                    <div className="w-full p-4">
                        <p className="font-bold mb-4">Brand</p>
                        <div className="flex flex-col gap-y-2">
                            {Brands.map((brand, index) => (
                                <label
                                    key={index}
                                    className="relative flex items-center gap-2 px-4 rounded-full cursor-pointer"
                                    >
                                    <input
                                        type="checkbox"
                                        checked={brands.includes(brand)}
                                        onChange={() => handleBrandSelected(brand)}
                                        className="
                                        peer appearance-none
                                        h-6 w-6 rounded-md
                                        border border-pink-500
                                        bg-transparent
                                        checked:bg-pink-500
                                        cursor-pointer
                                        "
                                    />
                                    <svg
                                        className="absolute left-5 top-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product List */}
            <section className="lg:col-span-9">
                {/* Sort By */}
                <div className="p-2 flex items-center justify-end">
                    <label className="block text-lg text-white mr-2">Sort by</label>
                    <select
                        className="bg-white rounded-t-xl px-3 py-2 text-sm focus:outline-none text-zinc-900"
                        defaultValue="none"
                    >
                        <option value="none">default</option>
                        <option value="low-high">Price: Low → High</option>
                        <option value="high-low">Price: High → Low</option>
                        <option value="name-asc">Name: a → z</option>
                        <option value="name-desc">Name: z → a</option>
                    </select>
                </div>
                
                <section className="grid grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div className="p-4 aspect-square" key={index}>
                            <Link href={`/productdetail/${product.id}`} prefetch={false}>
                                <div className="relative w-full h-2/3 mb-4 bg-white shadow-xl rounded-2xl overflow-hidden">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${product.mainImageUrl}`}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 300px, 300px"
                                        className="object-contain object-center scale-90"
                                    />
                                </div>
                                <p>{product.name}</p>
                                <p className="text-pink-600">${product.price}</p>
                            </Link>
                            <button className="mt-2 px-4 py-2 text-white max-w-[200px] rounded-full gradient-bg">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </section>
            </section>
        </div>
    );
}