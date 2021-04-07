import { createAction, props } from '@ngrx/store';
import { Response } from '../../core/model/Response.interface';



export const createTailInvoice = createAction('[TailInvoice] creazione fattura', props<{custId:string,payCondition:string,docType:string,sale:string,idItemsString:string,qntItemsString: string, iva: string}>());
export const retrieveAllTailInvoices = createAction('[TailInvoice] invoice');
export const retrieveLastTailInvoice = createAction('[TailInvoice] last invoice');
export const initTailInvoices = createAction('[TailInvoice] initTailInvoices', props<{response: Response}>());
export const initTailInvoiceFounds = createAction('[TailInvoice] init found TailInvoices', props<{response: Response}>());
export const deleteTailInvoice=createAction('[TailInvoice], delete invoice', props<{idS:string}>());
export const lookForTailInvoices=createAction('[TailInvoice] look for invoices', props<{termine: string}>())
export const updateTailInvoice=createAction('[TailInvoice] update fattura', props<{idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, qntItemsString: string, iva: string}>())
