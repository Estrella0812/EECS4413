'use client';

import { Product } from '@/app/types/product';
import React, { useRef, useState } from 'react';
import Popup from './Popup';
import { useGlobalCart } from '@/context/CartContext';

export default function CartAction({ product }: {  product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const { cart, addItem } = useGlobalCart();
    const [open, setOpen] = useState(false);
    function confirm() {
        const item = cart?.items.find(cartItem => cartItem.product.id === product.id);
        if (item && item.quantity + quantity > product.stock) {
            setOpen(true);
        } else {
            addItem(product, quantity);
        }
    }
    
    return (
        <div className="flex items-center gap-4 h-full">
            <Popup message={`There is a limit of ${product.stock} items per customer, and you already have some in your cart.`} isOpen={open} onClose={() => setOpen(false)}/>
            <button className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer" onClick={() => setQuantity(prev => prev - 1)} disabled={quantity <= 1}>-</button>
            <div className="w-10 flex items-center justify-center"><p>{quantity}</p></div>
            <button className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer" onClick={() => setQuantity(prev => prev + 1)} disabled={quantity >= product.stock}>+</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[200px] gradient-bg cursor-pointer"onClick={confirm}>Add to Cart</button>
        </div>
    );
}