import IProduct from "./product";

export default interface IBasket {
    items: IProduct[];
}

export const initialState: IBasket = {  
    items: [],
}