"use client";
import Link from "next/link";
import Image from "next/image"
import { Product } from "@/app/types/product";

export default function ProductList({products}: { products: Product[] }) {

    return (
        <div className="grid grid-cols-3 gap-4">
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
                    <p className={`text-sm mt-1 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </p>
                </div>
            ))}
            

        </div>
    );
}