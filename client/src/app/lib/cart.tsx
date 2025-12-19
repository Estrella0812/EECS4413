import { Cart, CartItem } from "../types/cart";

export async function getCart(): Promise<Cart>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        method: 'GET',
        credentials: "include",
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }
    return response.json();
}

export async function addItemToCart(productID:number, qty:number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add?productId=${productID}&quantity=${qty}`, {
        method: 'POST',
        credentials: "include",
    });
    return response.json();
}

export async function updateItemToCart(productID:number, qty:number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/update?productId=${productID}&quantity=${qty}`, {
        method: 'PUT',
        credentials: "include",
    });
    return response.json();
}

export async function delItemFromCart(productID:number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove?productId=${productID}`, {
        method: 'DELETE',
        credentials: "include",
    });
    return response.json();
}

export async function clearCart(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.json();
}