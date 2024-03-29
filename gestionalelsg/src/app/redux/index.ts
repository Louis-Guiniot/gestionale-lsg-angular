import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { productsReducer, ProductState } from './product/product.reducers';
import { invoiceReducer, InvoiceState } from './invoice/invoice.reducers';
import { customersReducer, CustomerState } from './customer/customer.reducers';
import { measureReducer, MeasureState } from './measure/measure.reducers';
import { ivaReducer, IvaState } from './iva/iva.reducers';
import { payConditionReducer, PayConditionState } from './paycondition/payCondition.reducers';
import { docReducer, DocState } from './doctype/doctype.reducers';
import { PhiState, phiReducer } from './product-has-invoice/phi.reducers';
import { tipoDocumentoReducer, TipoDocumentoState } from './tipoDocumento/tipoDocumento.reducers';
import { tailInvoiceReducer, TailInvoiceState } from './tailInvoice/tailInvoice.reducers';
import { bodyInvoiceReducer, BodyInvoiceState } from './bodyInvoice/bodyInvoice.reducers';

export interface AppState{
    router: RouterReducerState<any>;
    productsState: ProductState;
    invoiceState: InvoiceState;
    bodyInvoiceState: BodyInvoiceState;
    ivaState: IvaState;
    tipoDocumentoState: TipoDocumentoState;
    customerState: CustomerState;
    measureState: MeasureState;
    payConditionState: PayConditionState,
    docState : DocState
    phiState: PhiState
    tailInvoiceState: TailInvoiceState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    productsState: productsReducer,
    invoiceState: invoiceReducer,
    bodyInvoiceState: bodyInvoiceReducer,
    ivaState: ivaReducer,
    tipoDocumentoState: tipoDocumentoReducer,
    customerState: customersReducer,
    measureState: measureReducer,
    payConditionState: payConditionReducer,
    docState: docReducer,
    phiState: phiReducer,
    tailInvoiceState: tailInvoiceReducer
}