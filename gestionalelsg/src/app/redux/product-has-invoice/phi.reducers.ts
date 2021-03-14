import { Action, createReducer, on } from '@ngrx/store';
import { ProductHasInvoice } from 'src/app/core/model/ProductHasInvoice.interface';
import { initPhi } from './phi.actions';

export interface PhiState { 
    productsInInvoice: ProductHasInvoice[]
}

export const initialState: PhiState = {
    productsInInvoice: []
};

export const phiReducer = createReducer(
    initialState,
    on(initPhi, (state, { response }) => ({ ...state, productsInInvoice: response.result })),
    //on(initIvaFounds, (state, { response }) => ({ ...state, ivas: response.result })),
    
);
//----//
export function reducer(state: PhiState, action: Action) {
    return phiReducer(state, action);
}