import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { productsReducer, ProductState } from './product/product.reducers';

export interface AppState{
    router: RouterReducerState<any>;
    productsState: ProductState;
    invoiceState: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    productsState: productsReducer,
    invoiceState: productsReducer
}