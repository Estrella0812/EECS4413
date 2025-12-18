'use client';

import { useEffect, useState } from "react";

const sampleOrders = [
  {
    id: 101,
    createdAt: "2025-03-12T14:23:00",
    total: 359.0,
    items: [
      {
        quantity: 1,
        price: 359.0,
        product: { name: "RTX 4070 Graphics Card" },
      },
    ],
  },
  {
    id: 102,
    createdAt: "2025-03-09T09:45:00",
    total: 1248.97,
    items: [
      {
        quantity: 1,
        price: 899.99,
        product: { name: "Ryzen 9 7900X CPU" },
      },
      {
        quantity: 2,
        price: 174.49,
        product: { name: "32GB DDR5 RAM Kit" },
      },
    ],
  },
  {
    id: 103,
    createdAt: "2025-02-27T18:12:00",
    total: 219.98,
    items: [
      {
        quantity: 2,
        price: 109.99,
        product: { name: "1TB NVMe SSD" },
      },
    ],
  },
];

type OrderItem = {
  quantity: number;
  price: number;
  product: {
    name: string;
  };
};

type Order = {
  id: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
};

export default function PurchaseHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  /* useEffect(() => {
    fetch("http://localhost:8080/api/orders", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .finally(() => setLoading(false));
  }, []); actual code*/

    useEffect(() => {
        setTimeout(() => {
            setOrders(sampleOrders);
            setLoading(false);
        }, 500);
    }, []);

  return (
    <div className="max-w-7xl mx-auto my-5 min-h-[82vh]">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-400">You haven’t placed any orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map(order => {
        const subtotal = order.total;
        const tax = subtotal * 0.13;
        const total = subtotal + tax;

        return (
            <div
            key={order.id}
            className="border border-zinc-700 rounded-lg divide-y divide-dotted divide-zinc-700"
            >
            <div className="flex justify-between bg-zinc-700 px-4 py-3 rounded-t-lg">
                <span className="font-bold">Order #{order.id}</span>
                <span className="text-sm text-gray-300">
                {new Date(order.createdAt).toLocaleDateString()}
                </span>
            </div>

            {order.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-4 px-4 py-3 text-sm">
                <span className="col-span-2">{item.product.name}</span>
                <span className="text-center">x{item.quantity}</span>
                <span className="text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                </span>
                </div>
            ))}

            {/* Totals */}
            <div className="px-4 py-3 text-sm space-y-1">
                <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                <span>Tax (13%)</span>
                <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-zinc-700 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
                </div>
            </div>
            </div>
        );
        })}
      </div>
    </div>
  );
}
