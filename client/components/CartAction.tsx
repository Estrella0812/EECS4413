'use client';

import React, { useRef, useState } from 'react';

export default function CartAction({ stock, productId }: {  stock: number, productId: number }) {
    const [quantity, setQuantity] = useState(1);
    
    return (
        <div className="flex items-center gap-4 h-full">
            <button className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer" onClick={() => setQuantity(prev => prev - 1)} disabled={quantity <= 1}>-</button>
            <div className="w-10 flex items-center justify-center"><p>{quantity}</p></div>
            <button className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer" onClick={() => setQuantity(prev => prev + 1)} disabled={quantity >= stock}>+</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[200px] gradient-bg cursor-pointer">Add to Cart</button>
        </div>
    );
}