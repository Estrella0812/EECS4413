"use client";

import React, { createContext, useContext } from 'react';
import { useCart } from '../hooks/useCart';

const CartContext = createContext<ReturnType<typeof useCart> | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const cartLogic = useCart();

    return (
        <CartContext.Provider value={cartLogic}>
            {children}
        </CartContext.Provider>
    );
}

export const useGlobalCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useGlobalCart must be used within a CartProvider");
    }
    return context;
};