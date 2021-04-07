import { Action, createReducer, on } from '@ngrx/store';
import { BodyInvoice } from 'src/app/core/model/BodyInvoice.interface';
import { initBodyInvoiceFounds, initBodyInvoices } from './bodyInvoice.actions';

export interface BodyInvoiceState { 
    invoices: BodyInvoice[]
}




export const initialState: BodyInvoiceState = {
    invoices: []
};

export const bodyInvoiceReducer = createReducer(
    initialState,
    on(initBodyInvoices, (state, { response }) => ({ ...state, invoices: response.result })),
    on(initBodyInvoiceFounds, (state, { response }) => ({ ...state, invoices: response.result })),
    
);
//----//
export function reducer(state: BodyInvoiceState, action: Action) {
    return bodyInvoiceReducer(state, action);
}