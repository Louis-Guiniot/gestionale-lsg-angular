import { createAction, props } from "@ngrx/store";
import { Response } from '../../core/model/Response.interface';

export const initCustomers = createAction('[Customer] init customers', props<{response: Response}>());
export const deleteCustomer = createAction('[Customer] delete customer',props<{id: string}>());
export const updateCustomer = createAction('[Customer] find-update', props<{id: string, name:string, surname:string, email:string}>())
export const createCustomer = createAction('[Customer] creazione customer', props<{email:string, name:string, surname:string}>());
export const retreiveAllCustomers = createAction('[Customer] customer');