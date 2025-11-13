import Link from "next/link";
import { UserIcon, CartIcon, SearchIcon, ChevDownIcon } from "../icons/page"

export default function Header(){
    return(
        <header className="flex items-center justify-between py-8 px-14">
            <Link href="/" prefetch={false}><h1 className="text-3xl font-bold text-center">EECS 4413</h1></Link>
            <div>
                <Link href="/" className="mx-2 text-lg" prefetch={false}>Home</Link>
                {/* <Link href="/shop" className="mx-2 text-lg" prefetch={false}>Collection</Link> */}
                <Link href="/products" className="mx-2 text-lg" prefetch={false}>Products</Link>
            </div>
            <div className="flex items-center gap-x-5">
                {/* <SearchIcon/> */}
                <Link href="/user" prefetch={false}><UserIcon/></Link>
                <Link href="/cart" prefetch={false}><CartIcon/></Link>
            </div>
        </header>
    );
}