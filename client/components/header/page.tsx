'use client'
import Link from "next/link";
import { UserIcon, CartIcon, SearchIcon, ChevDownIcon } from "../icons/page"
import { useRouter } from "next/navigation";

export default function Header(){
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const query = formData.get("search")?.toString() ?? "";

        if (query.trim() !== "") {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

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
                <Link href="/products" className="text-lg" prefetch={false}>Products</Link>
            </nav>

            {/* Right section */}
            <div className="ml-auto flex items-center gap-x-5">
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="search" 
                            placeholder="Search products..."
                            className="bg-zinc-900 border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-2 mr-3 text-white">
                            <SearchIcon />
                        </button>
                    </div>
                </form>

                <Link href="/user" prefetch={false}><UserIcon/></Link>
                <Link href="/cart" prefetch={false}><CartIcon/></Link>
            </div>

        </header>
    );
}