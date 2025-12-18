export async function register({email, password}: {email: string, password: string}): Promise<{ ok: boolean; message: string }>  {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    return {
        ok: response.ok,
        message: await response.text(),
    };
}

export async function login({email, password}: {email: string, password: string}): Promise<{ ok: boolean; message: string }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    return {
        ok: response.ok,
        message: await response.text(),
    };
}

export async function logout() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: "include",
    });
    return{
        ok: response.ok,
        message: response.text(),
    };
}