import { createAction, props } from "@ngrx/store";
import { Response } from '../../core/model/Response.interface';

export const initCustomers = createAction('[Customer] init customers', props<{response: Response}>());
export const createCustomer = createAction('[Customer] creazione customer', props<{email:string, name:string, surname:string}>());
export const retreiveAllCustomers = createAction('[Customer] customer');