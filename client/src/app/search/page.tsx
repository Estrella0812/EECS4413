import { Suspense } from "react";
import { ProductResult } from "../types/product";
import { getProductsFilter } from "../lib/products";
import ProductList from "@/components/ProductList";
import ProductsClient from "@/components/ProductsClient";
import Pagination from "@/components/Pagination";

function toURLSearchParams(searchParams: { [key: string]: string | string[] | undefined }): URLSearchParams {
    const urlParams = new URLSearchParams();
    for (const key in searchParams) {
        const value = searchParams[key];
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
            value.forEach(v => urlParams.append(key, String(v)));
        } else {
            urlParams.set(key, String(value));
        }
    }
    return new URLSearchParams(urlParams);
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const search = await searchParams;
    const searchString = toURLSearchParams(await searchParams);
    const productResult: ProductResult = await getProductsFilter(searchString);
    console.log(productResult)
    return (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-4 grid-cols-1 my-18 px-4">

            <section className="lg:col-span-3 flex flex-col gap-y-4">
                <div className="text-2xl font-semibold">Filters</div>
                <ProductsClient searchParams={search}/>
            </section>

            {/* Product List Section */}
            <section className=" lg:col-span-9 grid grid-rows-[1fr_auto] min-h-[70vh]">
                <Suspense key={search.toString()}>
                    <ProductList products={productResult.content}/>
                </Suspense>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <Pagination page={productResult.page} />
                </div>
            </section>
        </div>
    );
}