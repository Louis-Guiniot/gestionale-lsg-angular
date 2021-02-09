import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { CustomerState } from "./customer.reducers";

export const selectCustomerState = (state: AppState) => state.customerState;

export const selectCustomers = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.customers
);
// export const selectTotalCustomers = createSelector(
//     selectCustomerState,
//     (state: CustomerState) => state.customers.length
// );

export const getCurrentCustomer = createSelector(
    selectCustomerState,
    (state: CustomerState, params: Params) => state.customers.find(item => item.id === Number(params['id']))
);