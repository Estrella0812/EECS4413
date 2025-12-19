'use client'
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { getProducts } from "../lib/products";
import Link from "next/link";

export default function AdminPage(){
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            getProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
        }, []);
    
        const handleChangeQty = async (productID: number, qty: number) =>{
    
            try {
                //update here
            } catch (err) {
                console.error("Error on handling qty change");
            }
        }

    return(
        <div className="max-w-7xl my-10 mx-auto min-h-[75vh]">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            <div className="grid grid-cols-2 gap-4">
                {products?.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 bg-zinc-900 rounded-lg p-4">
                            <div className="bg-zinc-200 h-[200px]">image</div>
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
        </div>
    );
}