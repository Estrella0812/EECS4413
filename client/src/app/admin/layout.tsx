import { redirect } from "next/navigation";
import { getCurrentUserServer } from "../lib/authServer";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUserServer();

  // Check if user is not logged in then force to /user/login
  if(!user || user.role!=="ADMIN"){
    redirect("/");
  }
  
  return (
    <>
        <div className="max-w-7xl mx-auto flex gap-x-10">
            <Link href="/admin" className="bg-white text-zinc-900 font-bold p-4 rounded-xl hover:underline" prefetch={false}>Inventory</Link>
            <Link href="/admin/sales-history" className="bg-white text-zinc-900 font-bold p-4 rounded-xl hover:underline" prefetch={false}>Sales History</Link>
            <Link href="/admin/users" className="bg-white text-zinc-900 font-bold p-4 rounded-xl hover:underline" prefetch={false}>Users</Link>
        </div>
        {children}
    </>  
  );
}