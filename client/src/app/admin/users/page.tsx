'use client';

import { fetchAllUsers } from "@/app/lib/adminCalls";
import { Page } from "@/app/types/product";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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


type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export default function PurchaseHistory() {
    const params = useSearchParams();
    const page = parseInt(params.get("page")||"1");
    const [users, setUsers] = useState<User[]>([]);
    const [pageInfo, setPageInfo] = useState<Page|null>(null);

    useEffect(() => {
        fetchAllUsers(page-1)
        .then(result=>{
            setUsers(result.content);
            setPageInfo(result.page);
        });
    }, [page]);

  return (
    <div className="max-w-7xl mx-auto my-5 min-h-[82vh]">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Link href="/admin" className="bg-white p-3 text-zinc-900 font-bold rounded-xl" prefetch={false}>back</Link>
      </div>

      {users.length==0 && <p>No Registered Users Yet</p>}

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

                <div className="flex gap-x-4 px-4 py-3 text-sm">
                    <span className="">role:</span>
                    <span className={user.role==="ADMIN"?"font-bold bg-pink-700 px-5":""}>{user.role}</span>
                </div>
            
            </div>
        );
        })}
      </div>
      <div className="flex justify-center ites-center gap-x-5 mt-10 text-lg">
            {page > 1 && <Link href={`/admin/users?page=${page-1}`} className="text-2xl" prefetch={false}>‹</Link>}
            <p>{page}</p>
            {pageInfo && pageInfo.totalPages && pageInfo.totalPages > page && <Link href={`/admin/users?page=${page+1}`} className="text-2xl" prefetch={false}>›</Link>}
        </div>
    </div>
  );
}
