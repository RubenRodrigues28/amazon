import Image from 'next/image';
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addToBasket } from "../app/slices/basketSlice";
import IProduct from "../interface/product";
import Currency from "../utilities/utils";
import ProductRating from "./ProductRating";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title, category, description, image, price, quantity}: IProduct) {
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    const [hasPrime] = useState(Math.random() < 0.5);

    const dispatch = useAppDispatch();

    const addItemToBasket = () => {
        const product:IProduct = {
            id, 
            title, 
            category, 
            description, 
            image, 
            price,
            rating,
            hasPrime,
            quantity
        };

        dispatch(addToBasket(product));
    }

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                {category}
            </p>

            <Image src={image} height={200} width={200} objectFit="contain"/>

            <h4 className="my-3">{title}</h4>

            <div className="flex">
                <ProductRating rating={rating} />
            </div>

            <p className="text-xs my-2 line-clamp-2">{description}</p>

            <div className="mb-5">
                <Currency amount={price}/>
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}

            <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>

        </div>
    )
}

export default Product;
