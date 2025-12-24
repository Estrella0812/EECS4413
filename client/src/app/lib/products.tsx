import { Cart } from "../types/cart";
import { Product, ProductResult } from "../types/product";

export async function getProducts(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getProductById(id: number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getProductsByCategory(category: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${category}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/brand/${brand}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getProductsFilter(productQuery: URLSearchParams): Promise<ProductResult>{
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/products/filter?${productQuery}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/filter?${productQuery}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

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
