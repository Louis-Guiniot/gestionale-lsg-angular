import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { PayConditionState } from "./payCondition.reducers";

export const selectPayConditionState = (state: AppState) => state.payConditionState;

export const selectPayCondition = createSelector(
    selectPayConditionState,
    (state: PayConditionState) => state.payConditions
);
// export const selectTotalCustomers = createSelector(
//     selectCustomerState,
//     (state: CustomerState) => state.customers.length
// );

export const getCurrentCustomer = createSelector(
    selectPayConditionState,
    (state: PayConditionState, params: Params) => state.payConditions.find(item => item.id === Number(params['id']))
);