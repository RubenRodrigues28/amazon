import Image from 'next/image';
import { useAppDispatch } from "../app/hooks";
import { addToBasket, decreaseProductAmount, increaseProductAmount, removeFromBasket } from "../app/slices/basketSlice";
import IProduct from "../interface/product";
import Currency from "../utilities/utils";
import ProductRating from './ProductRating';

function CheckoutProduct({id, category, description, hasPrime, image, price, rating, title, quantity}:IProduct) {
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

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
    }

    const increaseProductAmountOnBasket = () => {
        dispatch(increaseProductAmount({ id }));
    }

    const decreaseProductAmountOnBasket = () => {
        dispatch(decreaseProductAmount({ id }));
    }

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain"/>

            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    <ProductRating rating={rating} />
                </div>

                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <div className="flex items-center space-x-1">
                    <Currency amount={price}/>
                    <button onClick={increaseProductAmountOnBasket} className="px-2 py-1  cursor-pointer hover:bg-yellow-400 rounded-sm text-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500">+</button>
                    <button onClick={decreaseProductAmountOnBasket} className="px-2 py-1  cursor-pointer hover:bg-yellow-400 rounded-sm text-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500">-</button>
                </div>
                
                <p>Quantity: {quantity}</p>

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right add/remove buttons */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                {/*<button className="button" onClick={addItemToBasket}>Add to Basket</button>*/}
                <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct;
