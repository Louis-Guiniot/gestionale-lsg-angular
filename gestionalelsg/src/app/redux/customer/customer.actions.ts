import { createAction, props } from "@ngrx/store";

export const createCustomer = createAction('[Customer] creazione customer', props<{email:string, name:string, surname:string}>());
export const retrieveAllCustomers = createAction('[Customer] customer');