"use client";
import { Cart, CartItem } from "@/app/types/cart";
import { Product } from "@/app/types/product"
import { getCurrentUserServer } from "@/app/lib/authServer";
import { getCart, addItemToCart, updateItemToCart, delItemFromCart, clearCart } from "@/app/lib/cart";
import { useEffect, useState } from 'react';

const KEY = 'guest-cart';
export function useCart() {
    const [cart, setCart] = useState<Cart>({ id: 1, items: [], total: 0 });
    const [user, setUser] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                const userData = await getCurrentUserServer();
                
                if (userData) {
                    // USER LOGGED IN
                    setUser(userData);
                    await getCart().then(setCart);
                } else {
                    // GUEST MODE
                    const localData = localStorage.getItem(KEY);
                    if (localData) {
                        setCart(JSON.parse(localData));
                    }
                }
            } catch (err) {
                console.error("Cart Initialization Error:", err);
            } finally {
                setIsLoaded(true);
            }
        };

        initialize();
    }, []);

    const updateGuestCart = (newItems: CartItem[]) => {
        const newTotal = newItems.reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
        const newCart = {
            id: 1,
            items: newItems,
            total: newTotal
        };
        setCart(newCart);
        localStorage.setItem(KEY, JSON.stringify(newCart));
    };


    const addItem = async (product: Product, qty: number) => {
        if (!user) {
            const currentItems = cart.items || [];
            const existingItem = currentItems.find(cartItem => cartItem.product.id === product.id);
            
            if (existingItem && existingItem.quantity + qty <= product.stock) {
                const newItems = currentItems.map(cartItem => 
                    cartItem.product.id === product.id ? { ...cartItem, quantity: cartItem.quantity + qty } : cartItem
                );
                updateGuestCart(newItems);

            } else if (qty <= product.stock) {
                const newItems = [...currentItems, { id: product.id, quantity: qty, product }];
                updateGuestCart(newItems);
            }
        } else {
            await addItemToCart(product.id, qty).then(setCart);
        }
    };

    const updateItem = async (product: Product, qty: number) => {
        if (qty <= 0) removeItem(product);
        if (!user) {
            if (qty <= product.stock) {
                const newItems = cart.items.map(cartItem => 
                    cartItem.product.id === product.id ? { ...cartItem, quantity: qty } : cartItem
                );
                updateGuestCart(newItems);
            }
        } else {
            await updateItemToCart(product.id, qty).then(setCart);
        }
    };

    const removeItem = async (product: Product) => {
        if (!user) {
            const existing = cart.items.find(cartItem => cartItem.product.id === product.id);
            if (existing) {
                const newItems = cart.items.filter(cartItem => cartItem.product.id !== product.id);
                updateGuestCart(newItems);
            }
        } else {
            await delItemFromCart(product.id).then(setCart);
        }
    };

    return { cart, isLoaded, addItem, updateItem, removeItem };
}