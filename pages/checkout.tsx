import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/client";
import Image from 'next/image';
import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectItems, selectTotal } from "../app/slices/basketSlice";
import CheckoutProduct from '../components/CheckoutProduct';
import Header from "../components/Header";
import IProduct from "../interface/product";
import Currency from "../utilities/utils";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Checkout: NextPage<{session: Session}> = (props) => {
    const items:IProduct[] = useAppSelector(selectItems);
    const total:number = useAppSelector(selectTotal);
    const [session] = useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        //call the backend to create a checkout session
        const checkoutSession = await axios.post("/api/create-checkout-session", {
            items : items,
            email : session?.user?.email,
        });

        //redirect the customer to Stripe Checkout
        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });

        if (result?.error) {
            alert(result.error.message);
        }
    }

    return (
        <div className="bg-gray-100">
            <Header/>

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 
                            ? "Your Amazon Basket is empty"
                            : "Shopping Basket"}
                        </h1>

                        {items.map((item,i) => (
                            <CheckoutProduct 
                                key={item.id} 
                                id={item.id} 
                                title={item.title} 
                                price={item.price} 
                                description={item.description}
                                category={item.category} 
                                image={item.image} 
                                rating={item.rating}
                                hasPrime={item.hasPrime}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Right */}
                    {items.length > 0 && (
                        <div className="flex flex-col bg-white p-10 shadow-md">
                            <h2 className="whitespace-nowrap">Subtotal ({items.length}) items:{" "}
                                <span className="font-bold">
                                    <Currency amount={total}/>
                                </span>
                            </h2>

                            <button
                            role="link"
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </div>
                    )}
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    return  { 
        props : {
            session
        },
    }
}

export default Checkout;
