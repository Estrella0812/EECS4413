export async function createPayment(cartId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId,
      currency: "cad",
    }),
  });

  if (!res.ok) throw new Error("Failed to create payment");
  return res.json();
}
