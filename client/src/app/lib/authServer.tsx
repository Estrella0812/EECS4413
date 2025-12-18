'use server'
// lib/auth.server.ts
import { cookies } from "next/headers";

export async function getCurrentUserServer() {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
