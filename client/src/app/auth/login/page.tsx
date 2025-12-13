'use client'
import { login } from "@/app/lib/authentication";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault();
    
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
    
            const res = await login({email, password});
    
            if(res.ok){
                redirect("/user")
            }
        }

    return(
        <div className="w-full flex flex-col items-center min-h-[82vh] justify-center pb-18">
            <div className="bg-zinc-900 w-md rounded-lg text-center py-8">
                <h3 className="text-2xl font-bold">Log In</h3>

                <form onSubmit={handleLogin} className="grid gap-3 mt-5 px-5">
                    <input required type="email" placeholder="email" className="input" name="email"/>
                    <input required type="password" placeholder="password" className="input" minLength={8} name="password"/>
                    {/* form action with login required */}
                    <button type="submit" className="mt-3 mb-8 bg-blue-500 rounded-lg h-12 text-white font-bold gradient-bg">login</button>

                    <div className="">Dont have an account?</div>
                    <div className="mb-8">
                        <Link className=" text-pink-500 hover:underline font-bold " href="/user/create-account" prefetch={false}>Creat an account HERE!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}