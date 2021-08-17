import Header from "../components/Header";
import Image from 'next/image';
import { useAppSelector } from "../app/hooks";
import { selectItems, selectTotal } from "../app/slices/basketSlice";
import CheckoutProduct from '../components/CheckoutProduct';
import { useSession } from "next-auth/client";
import IProduct from "../interface/product";

function Checkout() {
    const items:IProduct[] = useAppSelector(selectItems);
    const total:number = useAppSelector(selectTotal);
    const [session] = useSession();

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
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">Subtotal ({items.length}) items:{" "}
                                <span className="font-bold">
                                    {new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(total)}
                                </span>
                            </h2>

                            <button 
                            disabled={!session}
                            className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                                {!session ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout;
