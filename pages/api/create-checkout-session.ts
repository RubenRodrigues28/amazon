const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { Request, Response, NextFunction } from 'express';
//import type { NextApiRequest, NextApiResponse } from "next";
import IProduct from '../../interface/product'

type HandleCheckoutRequestType = {
    items: IProduct[];
    email: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const { items, email }: HandleCheckoutRequestType = req.body;

    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price_data : {
            currency: "GBP",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1JPcvtLjlrjX3h96xtE37LqX"],
        shipping_address_collection : {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items:transformedItems,
        mode:"payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    res.status(200).json({ id:session.id });
}