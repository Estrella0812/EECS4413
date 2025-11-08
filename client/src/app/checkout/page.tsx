import Link from "next/link";

export default function Checkout(){
    const items = [ 
        { id: 1, name: "Wireless Headphones", price: 129.99, qty: 1 },
        { id: 2, name: "USB-C Charging Cable", price: 19.5, qty: 2 },
        { id: 3, name: "Laptop Stand", price: 49.99, qty: 1 },
        { id: 4, name: "Mouse", price: 99.99, qty: 3 },
    ];

    var subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    var tax = subtotal * 0.13;
    var total = subtotal + tax;
    return(
        <div className="max-w-7xl mt-4 mb-10 mx-auto min-h-[75vh]">
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
                {/* Info */}
                <div className="col-span-8 gap-y-4 flex flex-col">
                    {/* Address */}
                    <div className="grid grid-cols-1 gap-4 bg-zinc-900 rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                        <form className="flex flex-col gap-4">
                            <input type="text" placeholder="Full Name" className="input"/>
                            <input type="text" placeholder="Address Line 1" className="input"/>
                            <input type="text" placeholder="City" className="input"/>
                            <input type="text" placeholder="Province" className="input"/>
                            <input type="text" placeholder="Postal Code" className="input"/>
                            <input type="text" placeholder="Country" className="input"/>
                        </form>
                    </div>

                    {/* Payment */}
                    <div className="grid grid-cols-1 gap-4 bg-zinc-900 rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                        <form className="flex flex-col gap-4">
                            <input type="text" placeholder="Cardholder Name" className="input"/>
                            <input type="text" placeholder="Card Number" className="input"/>
                            <div className="flex gap-4">
                                <input type="text" placeholder="Expiry Date (MM/YY)" className="input"/>
                                <input type="text" placeholder="CVV" className="input"/>
                            </div>
                        </form>
                    </div>

                    {/* Item List */}
                    <div className="grid grid-cols-1 gap-4 bg-zinc-900 rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Orders</h2>
                        {items.map((item) => (
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
                        ))}
                    </div>
                </div>
                {/* Place */}
                <div className="col-span-4 bg-zinc-900 rounded-lg p-4 h-fit">
                    <div className="flex flex-col">
                        <Link href="/" prefetch={false} className="my-4 px-4 py-2 text-white max-w-full rounded-full gradient-bg text-center cursor-pointer">
                            Place Your Order
                        </Link>
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
                    </div>
                </div>
            </div>
        </div>
    );
}