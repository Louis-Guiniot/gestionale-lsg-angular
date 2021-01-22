import { createAction, props } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Response } from '../../core/model/Response.interface';

export const retrieveAllProducts = createAction('[Home] products');
export const initProducts = createAction('[Home] init products', props<{response: Response}>());

//sbagliato no sbatti altro
export const createInvoice = createAction('[Invoice] creazione fattura', props<{prodottiLista:string, totalPrice:string, customerId:string}>());
export const retrieveAllInvoices = createAction('[Invoice] invoice');
export const initInvoices = createAction('[Invoice] initInvoices', props<{response: Response}>());