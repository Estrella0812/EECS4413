import Link from "next/link";

export default function LoginPage(){
    return(
        <div className="w-full flex flex-col items-center min-h-[82vh] justify-center pb-18">
            <div className="bg-zinc-900 w-md rounded-lg text-center py-8">
                <h3 className="text-2xl font-bold">Create Account</h3>

                <form className="grid gap-3 mt-5 px-5">
                    <input required type="email" placeholder="email" className="input" name="email"/>
                    <input required type="password" placeholder="password" className="input" minLength={8} name="password"/>
                    <input required type="password" placeholder="confirm password" className="input" minLength={8} name="confirm_password"/>
                    {/* form action with login required */}
                    <button className="mt-3 mb-8 bg-blue-500 rounded-lg h-12 text-white font-bold gradient-bg">Create</button>

                    <div className="">Already have an account?</div>
                    <div className="mb-8">
                        <Link className=" text-pink-500 hover:underline font-bold " href="/user/login" prefetch={false}>Log in HERE!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}