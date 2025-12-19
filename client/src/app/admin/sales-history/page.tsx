'use client';

import { fetchAllOrders } from "@/app/lib/adminCalls";
import { Page } from "@/app/types/product";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    const params = useSearchParams();
    const page = parseInt(params.get("page")||"1");
    const [orders, setOrders] = useState<Order[]>([]);
    const [pageInfo, setPageInfo] = useState<Page|null>(null);

    useEffect(() => {
        fetchAllOrders(page-1)
        .then(result=>{
            setOrders(result.content);
            setPageInfo(result.page);
        });
    }, [page]);

    return (
        <div className="max-w-7xl mx-auto my-5 min-h-[82vh]">
            <div className="flex justify-between mb-6 items-center">
                <h2 className="text-2xl font-bold">Order History</h2>
                <Link href="/admin" className="bg-white p-3 text-zinc-900 font-bold rounded-xl" prefetch={false}>back</Link>
            </div>

        {orders.length==0 && <p>No Orders Yet</p>}

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
            <div className="flex justify-center ites-center gap-x-5 mt-10 text-lg">
                {page > 1 && <Link href={`/admin/sales-history?page=${page-1}`} className="text-2xl" prefetch={false}>‹</Link>}
                <p>{page}</p>
                {pageInfo && pageInfo.totalPages && pageInfo.totalPages > page && <Link href={`/admin/sales-history?page=${page+1}`} className="text-2xl" prefetch={false}>›</Link>}
            </div>
        </div>
    );
}
