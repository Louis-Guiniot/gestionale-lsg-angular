import { Action, createReducer, on } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { initInvoices } from './invoice.actions';

export interface InvoiceState { 
    invoices: Invoice[]
}




export const initialState: InvoiceState = {
    invoices: []
};

export const invoiceReducer = createReducer(
    initialState,
    on(initInvoices, (state, { response }) => ({ ...state, invoices: response.result })),
    
);
//----//
export function reducer(state: InvoiceState, action: Action) {
    return invoiceReducer(state, action);
}