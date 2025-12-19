'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  id: number;
  total: number;
  createdAt: string;
};

export default function OrderSuccess() {

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
            credentials: "include",
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
        })
        .then((orders: Order[]) => {
            if (!orders.length) throw new Error("No orders found");
        setOrder(orders[0]);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center text-gray-400">
        Loading order details...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center text-red-400">
        {error ?? "Unable to load order"}
      </div>
    );
  }

  const tax = order.total * 0.13;
  const subtotal = order.total - tax;

  return (
    <div className="max-w-3xl mx-auto min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-900/30 text-green-400 text-3xl">
          ✓
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Order Successful
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Your payment has been processed successfully.
        </p>

        <div className="space-y-3 text-sm">
          <DetailRow label="Order ID" value={`#${order.id}`} />
          <DetailRow
            label="Placed On"
            value={new Date(order.createdAt).toLocaleString()}
          />
          <DetailRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <DetailRow label="Tax (13%)" value={`$${tax.toFixed(2)}`} />
          <DetailRow
            label="Total"
            value={`$${order.total.toFixed(2)}`}
            bold
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/user/order-history"
            className="px-6 py-3 rounded-full gradient-bg text-white text-center font-medium"
          >
            View Order History
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-center font-medium"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-zinc-800 pb-2">
      <span className="text-gray-400">{label}</span>
      <span className={bold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}
