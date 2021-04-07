import { createAction, props } from '@ngrx/store';
import { Response } from '../../core/model/Response.interface';



export const createBodyInvoice = createAction('[BodyInvoice] creazione fattura', props<{custId:string,payCondition:string,docType:string,sale:string,idItemsString:string,qntItemsString: string, iva: string}>());
export const retrieveAllBodyInvoices = createAction('[BodyInvoice] invoice');
export const retrieveLastBodyInvoice = createAction('[BodyInvoice] last invoice');
export const initBodyInvoices = createAction('[BodyInvoice] initInvoices', props<{response: Response}>());
export const initBodyInvoiceFounds = createAction('[BodyInvoice] init found Invoices', props<{response: Response}>());
export const deleteBodyInvoice=createAction('[BodyInvoice], delete invoice', props<{idS:string}>());
export const lookForBodyInvoices=createAction('[BodyInvoice] look for invoices', props<{termine: string}>())
export const updateBodyInvoice=createAction('[BodyInvoice] update fattura', props<{idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, qntItemsString: string, iva: string}>())
