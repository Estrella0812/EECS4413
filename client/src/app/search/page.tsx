'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SearchPage(){
    const searchParams = useSearchParams();

    return(
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl mb-6">Search Results For: <strong>{searchParams.get("q")}</strong></h1>
            <section className="lg:col-span-9 grid grid-cols-3 gap-4">
                {Array.from({length: 12}).map((_, index) => (
                    <Link href="/productdetail/1" className="p-4 bg-zinc-900 rounded-lg aspect-square" key={index} prefetch={false}/>
                ))}
            </section>
        </div>
    );
}