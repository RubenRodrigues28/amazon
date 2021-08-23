import IProduct from "./product";

export default interface IOrder {
    id: string;
    amount: any;
    quantity: any;
    amountShipping: any;
    images: any;
    timestamp: number;
    items: IProduct[];
}