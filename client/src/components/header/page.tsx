'use client'
import Link from "next/link";
import { UserIcon, CartIcon, SearchIcon } from "../icons/page"
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalCart } from "@/context/CartContext";
import { CartItem } from "@/app/types/cart";
import { useDebounce } from "@/hooks/useDebounce";
import { ChangeEvent } from "react";

export default function Header(){
    const router = useRouter();
    const params = useSearchParams();
    const { cart, isLoaded } = useGlobalCart();
    const total = cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);

    function search(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value ?? "";
        const searchParams = new URLSearchParams(params);
        searchParams.set("page", "0");
        if (query.trim() === "") {
            searchParams.delete("query");
        } else {
            searchParams.set("query", query);
        }
        router.push(`search?${searchParams}`);
    }

    return(
        <header className="relative flex items-center py-8 px-14">

            {/* Left section */}
            <div className="flex items-center">
                <Link href="/" prefetch={false}>
                    <h1 className="text-3xl font-bold text-center">EECS 4413</h1>
                </Link>
            </div>

            {/* Center section - ABSOLUTE CENTERED */}
            <nav className="absolute left-1/2 -translate-x-1/2 flex gap-x-6">
                <Link href="/" className="text-lg" prefetch={false}>Home</Link>
                <Link href="/search" className="text-lg" prefetch={false}>Products</Link>
            </nav>

            {/* Right section */}
            <div className="ml-auto flex items-center gap-x-5">
                    <div className="relative">
                        <input 
                            onChange={useDebounce(search, 200)}
                            type="text" 
                            name="search" 
                            placeholder="Search products..."
                            className="bg-zinc-900 border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-white">
                            <SearchIcon />
                        </button>
                    </div>

                <Link href="/user" prefetch={false}><UserIcon/></Link>
                <div className="flex items-center">
                    <Link 
                        href="/cart" 
                        prefetch={false} 
                        className="relative flex items-center p-2 group"
                    >
                        <CartIcon />
                        
                        {isLoaded && cart.items.length > 0 && (
                            <span className="absolute top-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-black group-hover:bg-blue-500 transition-colors animate-in zoom-in duration-200">
                                {total > 99 ? '99+' : total}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

        </header>
    );
}