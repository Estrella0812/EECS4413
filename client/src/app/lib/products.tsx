export async function getProducts(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getProductById(id: number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export async function getProductsByCategory(category: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}