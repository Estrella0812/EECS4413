"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProduct() {
    const [error, setError] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [mainIndex, setMainIndex] = useState<number>(0);

    async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);

        // try {
        //     const res = api.post("auth/register", formData);
        // } catch (err) {
        //     console.error()
        // }

        // const res = await register({email, password});

        // if(res.ok){
        //     redirect("/user")
        // }
    }

    async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const imagePreviews = Array.from(e.target.files)
            .map(imageFile => URL.createObjectURL(imageFile));

        setImagePreviews(prev => [...prev, ...imagePreviews]);
    }

    async function removeImage(index: number) {
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    }

    useEffect(() => {
        return () => {
            imagePreviews.forEach(imageURL => URL.revokeObjectURL(imageURL));
        };
    }, [imagePreviews]);

    return (
        <div className="w-full flex flex-col items-center min-h-[82vh] justify-center pb-18">
            <div className="bg-zinc-900 w-md rounded-lg text-center py-8">
                <h3 className="text-2xl font-bold">Add Product</h3>

                <form onSubmit={handleAdd} className="grid gap-3 mt-5 px-5">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="mb-1 font-medium text-left">Name</label>
                        <input required type="text" placeholder="Product name" className="input" name="name" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="description" className="mb-1 font-medium text-left">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Product description"
                            className="input resize-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="price" className="mb-1 font-medium text-left">Price</label>
                        <div className="flex items-center rounded-lg bg-[var(--darker-background)]">
                            <div className=" text-base text-gray-400 select-none pl-2">$</div>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="0.00"
                                className="input grow"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="stock" className="mb-1 font-medium text-left">Stock</label>
                        <input type="number" placeholder="0" className="input" min="1" step="1" name="stock" />
                    </div>
                    <label
                        htmlFor="fileUpload"
                        className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold transition"
                    >
                        Upload Images
                    </label>
                    <input
                        required
                        id="fileUpload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={addImage}
                    />

                    {imagePreviews.length > 0 && (
                        <ul style={{ marginTop: "1rem" }}>
                            {imagePreviews.map((image, index) => (
                                <li key={index} className="flex items-center min-h-42">
                                    <label className="relative cursor-pointer rounded-lg overflow-hidden inline-block"></label>
                                    {mainIndex === index}
                                    <input
                                        type="radio"
                                        name="mainImage"
                                        checked={mainIndex === index}
                                        onChange={() => setMainIndex(index)}
                                        className="sr-only"
                                    />
                                    <img
                                        src={image}
                                        alt={image.substring(image.lastIndexOf("/"))}
                                        width={200}
                                        height={200}
                                        style={{ objectFit: "cover", margin: "auto" }}
                                    />


                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="cursor-pointer px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button type="submit" className="mt-3 mb-8 bg-blue-500 rounded-lg h-12 text-white font-bold gradient-bg">Create</button>
                </form>
            </div>
        </div>
    );
}