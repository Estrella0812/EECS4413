'use client'
import { useEffect, useState } from "react";
import { Page, Product } from "../../types/product";
import { getProductsFilter } from "../../lib/products";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { modifyStock } from "@/app/lib/adminCalls";

export default function InventoryPage(){
    const params = useSearchParams();
    const page = parseInt(params.get("page")||"1");
    const [products, setProducts] = useState<Product[] | null>(null);
    const [pageInfo, setPageInfo] = useState<Page|null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getProductsFilter({page:page-1, size:10})
        .then(result=>{
               setProducts(result.content);
            setPageInfo(result.page);
        });
    }, [page]);
     
    const handleChangeQty = async (productID: number, qty: number) => {
    try {
        await modifyStock(productID, qty);
        updateItemQuantityLocal(productID, qty);
    } catch (err) {
        console.error("Error on handling qty change", err);
    }
    };

    const updateItemQuantityLocal = (itemId: number, newQty: number) => {
    setProducts(prev =>
        prev ? prev.map(item =>
        item.id === itemId
            ? { ...item, stock: newQty } // or quantity
            : item
        ) : null
    );
    };


    return(
        <div className="max-w-7xl my-10 mx-auto min-h-[75vh]">
            <div className="flex justify-between mb-6 items-center">
                <h2 className="text-2xl font-bold">Inventory</h2>
                <Link href="/admin" className="bg-white p-3 text-zinc-900 font-bold rounded-xl" prefetch={false}>back</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {products?.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 bg-zinc-900 rounded-lg p-4">
                            <div className="relative bg-white h-[200px]">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${item.mainImageUrl}`}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 300px, 300px"
                                    className="object-contain object-center scale-90"
                                />
                            </div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <div className="flex">
                                    <button onClick={()=>handleChangeQty(item.id, item.stock-1)} disabled={item.stock <= 1} 
                                        className={`px-3 py-2 leading-none cursor-pointer font-bold ${item.stock <= 1? "text-zinc-100/20": "text-white hover:text-gray-200"}`}>-</button>
                                    <div className="w-10 flex items-center disabled:opacity-50 justify-center">
                                        <p className="">{item.stock}</p>
                                    </div>
                                    <button onClick={()=>handleChangeQty(item.id, item.stock+1)} className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="flex justify-center ites-center gap-x-5 mt-10 text-lg">
                {page > 1 && <Link href={`/admin/inventory?page=${page-1}`} className="text-2xl" prefetch={false}>‹</Link>}
                <p>{page}</p>
                {pageInfo && pageInfo.totalPages && pageInfo.totalPages > page && <Link href={`/admin/inventory?page=${page+1}`} className="text-2xl" prefetch={false}>›</Link>}
            </div>
        </div>
    );
}