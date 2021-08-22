import { CheckCircleIcon } from "@heroicons/react/solid";
import { GetServerSideProps, NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { clearBasket } from "../app/slices/basketSlice";
import Header from "../components/Header";

const Success: NextPage<{session: Session}> = (props) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearBasket());
    }, [])

    return (
        <div className="bg-gray-100 h-screen">
            <Header/>

            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                        <CheckCircleIcon className="text-green-500 h-10"/>
                        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping with us. We'll send a confirmation once yourself
                        item has shipped, if you would like to check the status of your order(s) before
                        please press the link below.
                    </p>
                    <button onClick={() => router.push("/orders")} className="button mt-8">Go to my orders</button>
                </div>
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
    };
}

export default Success;
