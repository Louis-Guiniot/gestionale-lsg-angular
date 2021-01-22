import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { ProductState } from './product.reducers';

export const selectProductState = (state: AppState) => state.productsState;
export const selectInvoiceState = (state: AppState) => state.invoiceState;

export const selectProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);

export const selectInvoice= createSelector(
    selectInvoiceState,
    (state: ProductState) => state.invoices
)

export const getCurrentProduct = createSelector(
    selectProductState,
    selectInvoiceState,
    selectRouteParams,
    (state: ProductState, params: Params) => state.products.find(item => item.id === Number(params['id']))
);