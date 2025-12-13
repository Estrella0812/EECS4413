'use client';
import Link from "next/link";
import { PurchaseHistoryIcon } from "@/../components/icons/page";
import { logout } from "../lib/authentication";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/users";

export default function UserPage(){
    const [user, setUser] = useState<any>(null);
    const sampleInfo = {
        name: "Estrella Kim",
        email: "estrellakim03@gmail.com",
        password: "eecs4413",
        address: "1234 University Ave",
        phone: "(123) 456-7890",
        country: "Canada",
        city: "Toronto",
        postalCode: "A1B 2C3"
    }

    const handleLogOut = async () => {
        const res = await logout();
    };

    useEffect(() => {
        getCurrentUser().then(({ ok, user }) => {
        if (ok) setUser(user);
        });
    }, []);

    console.log(user.role);

    return(
        <div className="max-w-7xl mx-auto my-5 min-h-[82vh]">
            <div className="bg-zinc-900 rounded-full w-[150px] h-[150px]"></div>
            <div className="my-4">
                <h2 className="text-2xl font-bold">{sampleInfo.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>

            <div className="flex justify-between">
                <Link href='/user/order-history' prefetch={false}>
                    <div className="flex items-center gap-2 max-w-fit mb-6 cursor-pointer gradient-bg rounded-full px-4 py-2">
                        <PurchaseHistoryIcon></PurchaseHistoryIcon>Order History
                    </div>
                </Link>
                <button onClick={handleLogOut}>
                    <div className="flex items-center gap-2 max-w-fit mb-6 cursor-pointer bg-red-900 hover:bg-red-800 rounded-full px-4 py-2">
                        Sign Out
                    </div>
                </button>
            </div>

            {/* Table body */}
            <div className="divide-y divide-dotted divide-zinc-700 border border-zinc-700 rounded-lg">
                {/* Row 1 */}
                <div className="flex bg-zinc-700 px-4 py-3 rounded-t-lg">
                    <span className="font-bold">Personal Deails</span>
                     {/* Do we want to allow user to edit this? */}
                </div>
                
                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">Full Name:</span>
                    <span className="">{sampleInfo.name}</span>
                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">Email:</span>
                    <span className="">{sampleInfo.email}</span>
                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">Phone Number:</span>
                    <span className="">{sampleInfo.phone}</span>
                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">Address:</span>
                    <span className="">{sampleInfo.address}</span>
                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">Postal Code:</span>
                    <span className="">{sampleInfo.postalCode}</span>
                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">City:</span>
                    <span className="">{sampleInfo.city}</span>
                </div>

                <div className="grid lg:grid-cols-5 grid-cols-2 px-4 py-3">
                    <span className="font-medium ">Country:</span>
                    <span className="">{sampleInfo.country}</span>
                </div>

                
            </div>
        </div>
    );
}

function decodeJwt(token: string) {
  const [headerB64, payloadB64] = token.split(".");

  const headerJson = atob(headerB64.replace(/-/g, "+").replace(/_/g, "/"));
  const payloadJson = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));

  return {
    header: JSON.parse(headerJson),
    payload: JSON.parse(payloadJson),
  };
}

