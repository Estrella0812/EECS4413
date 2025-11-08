import Link from "next/link";

export default function Cart(){
    const items = [ 
        { id: 1, name: "Wireless Headphones", price: 129.99, qty: 1 },
        { id: 2, name: "USB-C Charging Cable", price: 19.5, qty: 2 },
        { id: 3, name: "Laptop Stand", price: 49.99, qty: 1 },
        { id: 4, name: "Mouse", price: 99.99, qty: 3 },
    ]; // Replace with actual cart items

    //needs to work on the remove and the - + buttons
    
    var subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    var tax = subtotal * 0.13;
    var total = subtotal + tax;
    return(
        <div className="max-w-7xl my-10 mx-auto min-h-[75vh]">
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
                <div className="col-span-8 gap-y-4 flex flex-col">
                    {items.length === 0 ? 
                    (<div className="font-bold text-2xl">
                        <h3>There are no products in your cart</h3>
                    </div>)
                    :
                    (items.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 bg-zinc-900 rounded-lg p-4">
                            <div className="bg-zinc-200 h-[200px]">image</div>
                            <div className="col-span-2 flex flex-col justify-center">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                <div className="flex">
                                    <button className="px-3 py-2 leading-none cursor-pointer">-</button>
                                    <div className="w-10 flex items-center disabled:opacity-50 justify-center">
                                        <p className="">{item.qty}</p>
                                    </div>
                                    <button className="px-3 py-2 leading-none disabled:opacity-50 cursor-pointer">+</button>
                                </div>
                                <button
                                className="rounded hover:bg-zinc-200 hover:text-zinc-900 max-w-[40px] p-2 mt-4 cursor-pointer text-pink-500"
                                title={`Remove ${item.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )))}
                </div>
                <div className="col-span-4 bg-zinc-900 rounded-lg p-4 h-fit">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <hr></hr>
                        <div className="flex justify-between my-4">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between my-4">
                            <p>Tax</p>
                            <p>${tax.toFixed(2)}</p>
                        </div>
                        <hr></hr>
                        <div className="flex justify-between my-4 font-bold text-lg">
                            <p>Total</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <Link href="/checkout" prefetch={false} className="mt-4 px-4 py-2 text-white max-w-full rounded-full gradient-bg text-center cursor-pointer">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}