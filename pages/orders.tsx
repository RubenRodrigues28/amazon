import moment from "moment";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import db from '../firebase';
import IOrder from "../interface/order";

type OrdersType = {
    orders: IOrder[];
}

const Orders: NextPage<OrdersType> = ({ orders }) => {
    const [session] = useSession();

    return (
        <div>
            <Header/>
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 p-1 border-yellow-400">
                    Your Orders
                </h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map(({ id, amount, amountShipping, images, timestamp, items, quantity}) =>(
                        <Order key={id} id={id} amount={amount} quantity={quantity} amountShipping={amountShipping} images={images} timestamp={timestamp} items={items}/>
                    ))}
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // get the users logged in credentials
    const session = await getSession(context);
    
    if (!session) {
        return {
            props: {},
        };
    }
    
    // firebase db
    const stripeOrders = await db
    .collection("users")
    .doc(session.user?.email!)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

    // stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            quantity: order.data().quantity,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );

    return {
        props : {
            orders,
            session
        },
    };
}

export default Orders;