import { Action, createReducer, on } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { initProducts } from './product.actions';

export interface ProductState {
    products: Product[];
   

   
}




export const initialState: ProductState = {
    products: [],
    
    
};

export const productsReducer = createReducer(
    initialState,
    on(initProducts, (state, { response }) => ({ ...state, products: response.result })),
    
  
    
);
//----//
export function reducer(state: ProductState, action: Action) {
    return productsReducer(state, action);
}