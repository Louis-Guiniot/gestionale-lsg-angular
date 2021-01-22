import { Action, createReducer, on } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { initInvoices, initProducts } from './product.actions';

export interface ProductState {
    products: Product[];
    currentInvoice: Invoice;
   
}

export const initialState: ProductState = {
    products: [],
    currentInvoice: null
};

export const productsReducer = createReducer(
    initialState,
    on(initProducts, (state, { response }) => ({ ...state, products: response.result })),
    on(initInvoices, (state, { response }) => ({ ...state, currentInvoice: response.result })),
  
    
);
//----//
export function reducer(state: ProductState, action: Action) {
    return productsReducer(state, action);
}