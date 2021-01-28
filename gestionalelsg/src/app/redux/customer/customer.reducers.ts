import {Action, createReducer, on } from "@ngrx/store";
import { Customer } from "src/app/core/model/Customer.interface";
import { initCustomers } from "./customer.actions";

export interface CustomerState {
    customers: Customer[];
}

export const initialState: CustomerState = {
    customers: [],
    
};

export const customersReducer = createReducer(
    initialState,
    on(initCustomers, (state, { response }) => ({ ...state, customers: response.result })),
  
    
);
//----//
export function reducer(state: CustomerState, action: Action) {
    return customersReducer(state, action);
}