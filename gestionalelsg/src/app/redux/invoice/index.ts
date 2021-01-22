import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { InvoiceState } from './invoice.reducers';

export const selectInvoiceState = (state: AppState) => state.invoiceState;

export const selectInvoices = createSelector(
    selectInvoiceState,
    (state: InvoiceState) => state.invoices
);


export const getCurrentInvoice = createSelector(
    selectInvoiceState,
    selectRouteParams,
    (state: InvoiceState, params: Params) => state.invoices.find(item => item.id === Number(params['id']))
);