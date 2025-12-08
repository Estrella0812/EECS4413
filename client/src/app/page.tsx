import Image from "next/image";
import Link from "next/link";
import { Categories } from "./data/category";

export default function Home() {
  return (
    <div className="">

      {/* Main */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-24 p-4">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to EECS 4413</h1>
          <p className="text-lg">
            This is the home page of the EECS 4413 course website.
          </p>
          <Link href="/products" prefetch={false} className="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[200px] rounded-full gradient-bg">
            SHOP NOW
          </Link>
        </div>
        <div className="h-[600px] w-[600px] bg-zinc-900"></div>
      </section>

      <section className="max-w-7xl mx-auto my-38">
        <h2 className="text-3xl font-bold mb-4 text-lefts">CATEGORIES</h2>
        <div className="grid lg:grid-cols-20 grid-cols-2 gap-4">
          {Categories.map((category, index) => (
          (index==0?(
            <Link href={`/products/${category}`} key={index} prefetch={false} className="col-span-4 col-start-3 bg-zinc-900 rounded-lg p-4 w-full aspect-square cursor-pointer">
                {category}
            </Link>
          ):(
            <Link href={`/products/${category}`}  key={index} prefetch={false} className="col-span-4 bg-zinc-900 rounded-lg p-4 w-full aspect-square cursor-pointer">
              {category}
            </Link>
          ))
          ))}
        </div>
      </section>

    </div>
  );
}
