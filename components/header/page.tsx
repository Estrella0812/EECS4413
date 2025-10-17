import Link from "next/link";
import { UserIcon, CartIcon, SearchIcon, ChevDownIcon } from "../icons/page"

export default function Header(){
    return(
        <header className="flex items-center justify-between py-8 px-14">
            <h1 className="text-3xl font-bold text-center">EECS 4413</h1>
            <div>
                <Link href="/" className="mx-2 text-lg" prefetch={false}>Home</Link>
                <Link href="/shop" className="mx-2 text-lg" prefetch={false}>Collection</Link>
                <Link href="/about" className="mx-2 text-lg" prefetch={false}>Products</Link>
            </div>
            <div className="flex items-center gap-x-5">
                <SearchIcon/>
                <UserIcon/>
                <CartIcon/>
            </div>
        </header>
    );
}