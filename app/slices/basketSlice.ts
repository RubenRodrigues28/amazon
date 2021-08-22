import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../interface/basket';
import IProduct from '../../interface/product';
import { RootState } from '../store';

export const basketSlice = createSlice({  
    name: 'basket',  
    initialState,  
    reducers: {    
        addToBasket: (state, action) => {
            let product: IProduct = action.payload;

            const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
            if (index >= 0) {
                state.items[index].quantity += 1;
            } else {
                state.items = [...state.items, product];
            }
        },    
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);
            let newBasket = [...state.items];
            
            if (index >= 0) {
                newBasket.splice(index,1);
            } else {
                console.warn( `Cant remove product (id: ${action.payload.id}) as its not in basket!` )
            }

            state.items = newBasket;
        },
        increaseProductAmount: (state, action) => {
            const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

            if (index >= 0) {
                state.items[index].quantity += 1;
            } else {
                console.warn( `Cant increase product (id: ${action.payload.id}) as its not in basket!` )
            }
        },        
        decreaseProductAmount: (state, action) => {
            const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

            function removeFromBasket() {
                let newBasket = [...state.items];
                newBasket.splice(index,1);
                state.items = newBasket;
            }

            if (index >= 0) {
                state.items[index].quantity === 1 ? removeFromBasket() : state.items[index].quantity -= 1;
            } else {
                console.warn( `Cant increase product (id: ${action.payload.id}) as its not in basket!` )
            }
        },
        clearBasket: (state) => {
            state.items = [];
        }
    },
})

export const { addToBasket, removeFromBasket, increaseProductAmount, decreaseProductAmount, clearBasket } = basketSlice.actions;

export const selectItems = (state: RootState) => state.basket.items;
export const selectTotal = (state: RootState) => state.basket.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default basketSlice.reducer;