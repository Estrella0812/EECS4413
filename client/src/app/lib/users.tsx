export async function getCurrentUser(): Promise<{
  ok: boolean;
  user: {
    id: number;
    email: string;
    role?: string;
  } | null;
}> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    return {
      ok: false,
      user: null,
    };
  }

  return {
    ok: true,
    user: await response.json(),
  };
}
