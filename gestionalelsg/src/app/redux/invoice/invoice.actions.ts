import { createAction, props } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Response } from '../../core/model/Response.interface';



export const createInvoice = createAction('[Invoice] creazione fattura', props<{custId:string,payCondition:string,docType:string,sale:string,idItemsString:string,qntItemsString: string}>());
export const retrieveAllInvoices = createAction('[Invoice] invoice');
export const retrieveLastInvoice = createAction('[Invoice] last invoice');
export const initInvoices = createAction('[Invoice] initInvoices', props<{response: Response}>());
export const initInvoiceFounds = createAction('[Invoice] init found Invoices', props<{response: Response}>());
export const deleteInvoice=createAction('[Invoice], delete invoice', props<{idS:string}>());
export const lookForInvoices=createAction('[Invoice] look for invoices', props<{termine: string}>())
export const updateInvoice=createAction('[Invoice] update fattura', props<{idS: string, custId: string, payCondition: string, docType: string, sale: string, idItemsString: string, taxable: string, qntItemsString: string, saleImport: string}>())
