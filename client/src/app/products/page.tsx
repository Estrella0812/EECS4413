'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, getProductsByBrand } from "../lib/products";
import { useSearchParams } from "next/navigation";
import { Brands } from "../data/brand";
import { Categories } from "../data/category";
import { Product } from "../types/product";
import { Elsie_Swash_Caps } from "next/font/google";

export default function Products(){
    const useSearchParamss = useSearchParams();
    const page = useSearchParamss.get("page") || "1";
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
        if(brands.length == 0){
            getProducts().then(setProducts);
        }else{
            getProductsByBrand(brands[0]).then(setProducts);
        }
    }, [brands]);

    console.log(products);


    return(
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-4 grid-cols-1 my-18">

            <section className="lg:col-span-3 flex flex-col items-center gap-x-8 mr-4">
                <div className="text-2xl font-semibold p-2 pl-4 w-full">Filters</div>
                <div className="w-full grid gap-y-1 divide-y divide-white border-white border-t-1 border-b-1">
                    <div className="w-full p-4">
                        <p className="font-bold mb-4">Category</p>
                        <div className="flex flex-col gap-y-1 mb-4">
                            {Categories.map((category, index) => (
                                <Link href={`/products/${category}`} key={index} prefetch={false} className="hover:underline px-4 w-fit">{category}</Link>
                            ))}
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
                
                <section className="grid grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div className="p-4 aspect-square" key={index}>
                            <Link href={`/productdetail/${product.id}`} prefetch={false}>
                                <div className="w-full h-2/3 mb-4 bg-zinc-900 rounded-lg"/>
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
            {/* <section className="lg:col-span-9 grid grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <div className="p-4 aspect-square" key={index}>
                        <Link href={`/productdetail/${product.id}`} prefetch={false}>
                            <div className="w-full h-2/3 mb-4 bg-zinc-900 rounded-lg"/>
                            <p>{product.name}</p>
                            <p className="text-pink-600">${product.price}</p>
                        </Link>
                        <button className="mt-2 px-4 py-2 text-white max-w-[200px] rounded-full gradient-bg">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </section> */}
        </div>
    );
}