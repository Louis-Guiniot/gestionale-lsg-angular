import { createAction, props } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Response } from '../../core/model/Response.interface';


//sbagliato no sbatti altro
export const createInvoice = createAction('[Invoice] creazione fattura', props<{prodottiLista:string, totalPrice:string, customerId:string, sconto:string}>());
export const retrieveAllInvoices = createAction('[Invoice] invoice');
export const retrieveLastInvoice = createAction('[Invoice] last invoice');
export const initInvoices = createAction('[Invoice] initInvoices', props<{response: Response}>());