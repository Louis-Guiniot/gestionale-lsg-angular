import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { TailInvoiceState } from './tailInvoice.reducers';

export const selectTailInvoiceState = (state: AppState) => state.tailInvoiceState;

export const selectTailInvoices = createSelector(
    selectTailInvoiceState,
    (state: TailInvoiceState) => state.invoices
);


export const getCurrentTailInvoice = createSelector(
    selectTailInvoiceState,
    selectRouteParams,
    (state: TailInvoiceState, params: Params) => state.invoices.find(item => item.id === Number(params['id']))
);