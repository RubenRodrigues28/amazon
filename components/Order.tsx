import _ from "lodash";
import moment from "moment";
import IOrder from "../interface/order";
import IProduct from "../interface/product";
import Currency from '../utilities/utils';

function Order({ id, amount, amountShipping, images, timestamp, items, quantity }: IOrder) {

    let imagesProduct = items.map((item, index) => (
        _.times(item.quantity, (i) => {
            return(
                <img src={images[index]} key={i} alt="" className="h-20 object-contain sm:h-32"/>
            );
        })
    ));

    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
                </div>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <div className="flex items-center space-x-2">
                        <Currency amount={amount}/>
                        &nbsp; -&nbsp;&nbsp;NEXT Day Delivery
                        <Currency amount={amountShipping}/>
                    </div>
                </div>

                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {quantity === null ? items.length : quantity.reduce((acc:number, current:number) => acc + current)} items
                </p>

                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
                    ORDER # {id}
                </p>
            </div>

            <div className="p-5 sm:p-10 ">
                <div className="flex space-x-6 overflow-x-auto">
                    {imagesProduct}
                </div>
            </div>
        </div>
    )
}

export default Order
