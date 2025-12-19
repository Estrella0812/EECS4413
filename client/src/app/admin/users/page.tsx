'use client';

import { useEffect, useState } from "react";

const sampleOrders = [
  {
    id: 101,
    email: "test1@gmail.com",
    name: "estrella",
  },{
    id: 102,
    email: "test2@gmail.com",
    name: "estrella2",
  },{
    id: 103,
    email: "test3@gmail.com",
    name: "estrella3",
  },{
    id: 104,
    email: "test4@gmail.com",
    name: "estrella4",
  }
];


type Order = {
  id: number;
  email: string;
  name: string;
};

export default function PurchaseHistory() {
  const [users, setUsers] = useState<Order[]>([]);
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
            setUsers(sampleOrders);
            setLoading(false);
        }, 500);
    }, []);

  return (
    <div className="max-w-7xl mx-auto my-5 min-h-[82vh]">
      <h2 className="text-2xl font-bold mb-6">Users List</h2>

      {loading && <p>Loading orders...</p>}

      <div className="space-y-6">
        {users.map((user, index) => {
        return (
            <div
            key={user.id}
            className="border border-zinc-700 rounded-lg divide-y divide-dotted divide-zinc-700"
            >
                <div className="flex justify-between bg-zinc-700 px-4 py-3 rounded-t-lg">
                    <span className="font-bold">User #{user.id}</span>
                </div>

                
                <div className="flex gap-x-4 px-4 py-3 text-sm">
                    <span className="">email:</span>
                    <span className="">{user.email}</span>
                </div>

                <div className="flex gap-x-4 px-4 py-3 text-sm">
                    <span className="">name:</span>
                    <span className="">{user.name}</span>
                </div>
            
            </div>
        );
        })}
      </div>
    </div>
  );
}
