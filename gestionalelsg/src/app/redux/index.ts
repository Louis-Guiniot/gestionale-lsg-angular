import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { productsReducer, ProductState } from './product/product.reducers';
import { invoiceReducer, InvoiceState } from './invoice/invoice.reducers';
import { customersReducer, CustomerState } from './customer/customer.reducers';
import { measureReducer, MeasureState } from './measure/measure.reducers';

export interface AppState{
    router: RouterReducerState<any>;
    productsState: ProductState;
    invoiceState: InvoiceState;
    customerState: CustomerState;
    measureState: MeasureState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    productsState: productsReducer,
    invoiceState: invoiceReducer,
    customerState: customersReducer,
    measureState: measureReducer
}