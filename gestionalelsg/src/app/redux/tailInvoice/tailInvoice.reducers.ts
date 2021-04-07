import { Action, createReducer, on } from '@ngrx/store';
import { TailInvoice } from 'src/app/core/model/TailInvoice.interface';
import { initTailInvoiceFounds, initTailInvoices } from './tailInvoice.actions';

export interface TailInvoiceState { 
    invoices: TailInvoice[]
}




export const initialState: TailInvoiceState = {
    invoices: []
};

export const tailInvoiceReducer = createReducer(
    initialState,
    on(initTailInvoices, (state, { response }) => ({ ...state, invoices: response.result })),
    on(initTailInvoiceFounds, (state, { response }) => ({ ...state, invoices: response.result })),
    
);
//----//
export function reducer(state: TailInvoiceState, action: Action) {
    return tailInvoiceReducer(state, action);
}