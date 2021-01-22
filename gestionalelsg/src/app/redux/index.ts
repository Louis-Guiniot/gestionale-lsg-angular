import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { productsReducer, ProductState } from './product/product.reducers';
import { invoiceReducer, InvoiceState } from './invoice/invoice.reducers';

export interface AppState{
    router: RouterReducerState<any>;
    productsState: ProductState;
    invoiceState: InvoiceState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    productsState: productsReducer,
    invoiceState: invoiceReducer
}