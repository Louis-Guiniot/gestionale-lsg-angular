import {Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { Customer } from "src/app/core/model/Customer.interface";
import { PayCondition } from "src/app/core/model/PayCondition.interface";
import { initPayCondition } from "./payCondition.actions";


export interface PayConditionState {
    payConditions: PayCondition[];
}

export const initialState: PayConditionState = {
    payConditions: [],
    
};

export const payConditionReducer = createReducer(
    initialState,
    on(initPayCondition, (state, { response }) => ({ ...state, payConditions: response.result })),
  
    
);
//----//
export function reducer(state: PayConditionState, action: Action) {
    return payConditionReducer(state, action);
}

