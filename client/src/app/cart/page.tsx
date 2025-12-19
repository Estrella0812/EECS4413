'use client';
import Link from "next/link";
import { delItemFromCart, getCart, updateItemToCart } from "../lib/products";
import { useEffect, useState } from "react";
import { Cart } from "@/app/types/cart"

const TAX = 0.13;

export default function CartPage(){
    const items = [ 
        { id: 1, name: "Wireless Headphones", price: 129.99, qty: 1 },
        { id: 2, name: "USB-C Charging Cable", price: 19.5, qty: 2 },
        { id: 3, name: "Laptop Stand", price: 49.99, qty: 1 },
        { id: 4, name: "Mouse", price: 99.99, qty: 3 },
    ]; // Replace with actual cart items

    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCart()
        .then(setCart)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    const handleChangeQty = async (productID: number, qty: number) =>{

        try {
            await updateItemToCart(productID, qty);
            updateItemQuantityLocal(productID, qty);
        } catch (err) {
            console.error("Error on handling qty change");
        }
    }

    const handleRemoveItem = async (productID: number) =>{
        try {
            await delItemFromCart(productID);
            setCart(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    items: prev.items.filter(item => item.id !== productID),
                };
            });
        } catch (err) {
            console.error("error on removing item");
        }
    }


    const updateItemQuantityLocal = (itemId: number, newQty: number) => {
        setCart(prev => {
            if (!prev) return prev;

            return {
            ...prev,
            items: prev.items.map(item =>
                item.id === itemId
                ? { ...item, quantity: newQty }
                : item
            ),
            };
        });
    };

    if (loading) return <div>Loading...</div>;

    return(
        <div className="max-w-7xl my-10 mx-auto min-h-[75vh]">
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
                <div className="col-span-8 gap-y-4 flex flex-col">
                    {(!cart || cart.items.length === 0 )? 
                    (<div className="font-bold text-2xl">
                        <h3>It seems like your cart is empty !</h3>
                    </div>)
                    :
                    (cart?.items.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 bg-zinc-900 rounded-lg p-4">
                            <div className="bg-zinc-200 h-[200px]">image</div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-500">Price: ${item.product.price}</p>
                                <div className="flex">
                                    <button onClick={()=>handleChangeQty(item.product.id, item.quantity-1)} disabled={item.quantity <= 1} 
                                        className={`px-3 py-2 leading-none cursor-pointer font-bold ${item.quantity <= 1? "text-zinc-100/20": "text-white hover:text-gray-200"}`}>-</button>
                                    <div className="w-10 flex items-center disabled:opacity-50 justify-center">
                                        <p className="">{item.quantity}</p>
                                    </div>
                                    <button onClick={()=>handleChangeQty(item.product.id, item.quantity+1)} className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer">+</button>
                                </div>
                                <button
                                    onClick={()=>handleRemoveItem(item.product.id)}
                                    className="rounded hover:bg-zinc-200 hover:text-zinc-900 max-w-[40px] p-2 mt-4 cursor-pointer text-pink-500"
                                    title={`Remove ${item.product.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )))}
                </div>
                <div className="col-span-4 bg-zinc-900 rounded-lg p-4 h-fit">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <hr></hr>
                        <div className="flex justify-between my-4">
                            <p>Subtotal</p>
                            <p>${cart?.total||0}</p>
                        </div>
                        <div className="flex justify-between my-4">
                            <p>Tax</p>
                            <p>${((cart?.total||0) * TAX).toFixed(2)}</p>
                        </div>
                        <hr></hr>
                        <div className="flex justify-between my-4 font-bold text-lg">
                            <p>Total</p>
                            <p>${((cart?.total||0) * (1+TAX)).toFixed(2)}</p>
                        </div>
                        {(!cart || cart?.items.length==0)?(
                           <Link href="/products" prefetch={false} className="mt-4 px-4 py-2 text-white max-w-full rounded-full gradient-bg text-center cursor-pointer">
                                Go Shopping
                            </Link> 
                        ):(
                            <Link href="/checkout" prefetch={false} className="mt-4 px-4 py-2 text-white max-w-full rounded-full gradient-bg text-center cursor-pointer">
                                Proceed to Checkout
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}