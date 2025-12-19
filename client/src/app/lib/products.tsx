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

export async function getProductsFilter(
    {query="", sort="", category="", brands=[], minPrice, maxPrice, inStock=true, page=0}:
    {query?: string, sort?: string, category?: string, brands?: string[], minPrice?: number, maxPrice?: number, inStock?: boolean, page?: number}
): Promise<ProductResult>{
    const SIZE = 9
    // Build Query
    var q = "?"
    if(brands.length > 0){
        for(const b of brands){
            q += `brands=${b}&`
        }
    }
    q += `query=${query}&sort=${sort}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&inStock=${inStock}&page=${page}&size=${SIZE}`;


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/filter${q}`, {
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