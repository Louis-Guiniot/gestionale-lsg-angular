import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/model/Product.interface';
import { initProducts } from './home.actions';

export interface ProductState {
    products: Product[];
   
}

export const initialState: ProductState = {
    products: []
};

export const productsReducer = createReducer(
    initialState,
    on(initProducts, (state, { response }) => ({ ...state, products: response.result })),
    
);
//----//
export function reducer(state: ProductState, action: Action) {
    return productsReducer(state, action);
}