import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { BodyInvoiceState } from './bodyInvoice.reducers';

export const selectBodyInvoiceState = (state: AppState) => state.bodyInvoiceState;

export const selectInvoices = createSelector(
    selectBodyInvoiceState,
    (state: BodyInvoiceState) => state.bodyInvoices
);


export const getCurrentBodyInvoice = createSelector(
    selectBodyInvoiceState,
    selectRouteParams,
    (state: BodyInvoiceState, params: Params) => state.bodyInvoices.find(item => item.id === Number(params['id']))
);