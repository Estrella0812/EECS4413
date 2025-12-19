
import Link from "next/link";

export default function AdminPage(){

    return(
        <div className="max-w-5xl my-10 mx-auto min-h-[75vh]">
            <h2 className="text-2xl font-bold mb-6">Hello Admin,</h2>
            <div className="grid grid-cols-3 gap-x-8">
                <Link href="/admin/inventory" className="bg-white text-zinc-900 font-bold p-4 rounded-xl group" prefetch={false}>
                    <div className="group-hover:underline">Inventory</div>
                    <div className="text-lg font-normal">Manage Inventory</div>
                </Link>
                <Link href="/admin/sales-history" className="bg-white text-zinc-900 font-bold p-4 rounded-xl group" prefetch={false}>
                    <div className="group-hover:underline">Sales</div>
                    <div className="text-lg font-normal">Sales History</div>
                </Link>
                <Link href="/admin/users" className="bg-white text-zinc-900 font-bold p-4 rounded-xl group" prefetch={false}>
                    <div className="group-hover:underline">Users</div>
                    <div className="text-lg font-normal">List Users</div>
                </Link>
            </div>
        </div>
    );
}