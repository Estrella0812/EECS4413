'use client'
import Link from "next/link";
import { useState } from "react";

export default function Products(){
    //More of these for each category/subcategory can be added later
    const [categories, setCategories] = useState<string[]>([]);

    const handleCategorySelected = (subIndex: string) => {
        setCategories((prevItems) => {
            if (prevItems.includes(subIndex)) {
            // Remove if already selected
            return prevItems.filter((item) => item !== subIndex);
            } else {
            // Add if not selected
            return [...prevItems, subIndex];
            }
        });
    };


    return(
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-4 grid-cols-1 my-18">
            <section className="lg:col-span-3 flex flex-col items-center gap-x-8">
                <div className="text-2xl font-semibold p-2 pl-4 w-full">Filters</div>
                <div className="w-full grid gap-y-1 divide-y divide-white border-white border-t-1 border-b-1">
                    {Array.from({length: 4}).map((_, index) => (
                        <div className="w-full p-4" key={index}>
                            <p className="font-bold mb-4">Category {index + 1}</p>
                            <div className="flex flex-col gap-y-2">
                            {Array.from({length: 3}).map((_, subIndex) => (
                                <label
                                    key={subIndex}
                                    className="relative flex items-center gap-2 px-4 rounded-full cursor-pointer"
                                    >
                                    <input
                                        type="checkbox"
                                        checked={categories.includes(index.toString() + "," + subIndex.toString())}
                                        onChange={() => handleCategorySelected(index.toString() + "," + subIndex.toString())}
                                        className="
                                        peer appearance-none
                                        h-6 w-6 rounded-md
                                        border border-pink-500
                                        bg-transparent
                                        checked:bg-pink-500
                                        cursor-pointer
                                        "
                                    />
                                    <svg
                                        className="absolute left-5 top-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>

                                    category
                                    </label>

                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="lg:col-span-9 grid grid-cols-3 gap-4">
                {Array.from({length: 12}).map((_, index) => (
                    <Link href="/productdetail/1" className="p-4 bg-zinc-900 rounded-lg aspect-square" key={index} prefetch={false}/>
                ))}
            </section>
        </div>
    );
}