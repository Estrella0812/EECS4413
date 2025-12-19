'use client';

import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { userBillingData } from "@/app/data/address"
import { getCart } from "@/app/lib/products";
import { createPayment } from "@/app/lib/payments";

export default function Checkout(){
    const stripe = useStripe();
    const elements = useElements();
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCart().then(setCart).catch(e => setError(e.message));
    }, []);

    const handlePayment = async () => {
        if (!stripe || !elements || !cart) return;

        setLoading(true);
        setError(null);

        try {

            const { clientSecret } = await createPayment(cart.id);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            });

            if (result.error) {
                setError(result.error.message || "Payment failed");
            } else if (result.paymentIntent?.status === "succeeded") {
                window.location.href = "/order-success";
            }
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };
    
    if (!cart) return <p className="p-8">Loading cart…</p>;

    const tax = cart.total * 0.13;
    const total = cart.total + tax;
    return(
        <div className="max-w-7xl mt-4 mb-10 mx-auto min-h-[75vh]">
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
                {/* Info */}
                <div className="col-span-8 gap-y-4 flex flex-col">
                    {/* Address */}
                    <div className="grid grid-cols-1 gap-4 bg-zinc-900 rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                        <form className="flex flex-col gap-4">
                            <input type="text" placeholder="Full Name" className="input" defaultValue={userBillingData.fullName}/>
                            <input type="text" placeholder="Address Line 1" className="input" defaultValue={userBillingData.address}/>
                            <input type="text" placeholder="City" className="input" defaultValue={userBillingData.city}/>
                            <input type="text" placeholder="Province" className="input" defaultValue={userBillingData.province}/>
                            <input type="text" placeholder="Postal Code" className="input" defaultValue={userBillingData.postal}/>
                            <input type="text" placeholder="Country" className="input" defaultValue={userBillingData.country}/>
                        </form>
                    </div>

                    {/* Payment */}
                    <div className="grid grid-cols-1 gap-4 bg-zinc-900 rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                        <div className="bg-zinc-800 rounded p-4">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                        fontSize: "16px",
                                        color: "#fff",
                                        "::placeholder": { color: "#a1a1aa" },
                                        },
                                    },
                                }}
                            />
                        </div>
                        {error && (
                        <p className="text-red-400 mt-3 text-sm">{error}</p>
                        )}
                    </div>

                    {/* Item List */}
                    <div className="grid grid-cols-1 gap-4 bg-zinc-900 rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Orders</h2>
                        {cart.items.map((item: any) => (
                            <div key={item.product.id} className="grid grid-cols-3 gap-4 bg-zinc-900 rounded-lg p-4">
                                <div className="bg-zinc-200 h-[200px]">image</div>
                                <div className="col-span-2 flex flex-col justify-center">
                                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                    <p className="text-gray-500">Price: ${item.product.price.toFixed(2)}</p>
                                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Place */}
                <div className="col-span-4 bg-zinc-900 rounded-lg p-4 h-fit">
                    <div className="flex flex-col">
                        <button
                            onClick={handlePayment}
                            disabled={!stripe || loading}
                            className="w-full my-4 px-4 py-2 rounded-full gradient-bg text-white disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Place Your Order"}
                        </button>
                        <hr></hr>
                        <div className="flex justify-between my-4">
                            <p>Subtotal</p>
                            <p>${cart.total.toFixed(2)}</p>
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