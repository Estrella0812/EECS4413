export async function modifyStock(pID: number, qty: number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/stock/${pID}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(qty),
    });
    return response.json();
}

export async function fetchAllOrders(page: number){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/all?page=${page}`, {
        method: 'GET',
        credentials: "include",
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }
    return response.json();
}

export async function fetchAllUsers(page: number){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/all?page=${page}`, {
        method: 'GET',
        credentials: "include",
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }
    return response.json();
}