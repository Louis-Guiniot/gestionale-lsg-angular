import { Action, createReducer, on } from '@ngrx/store';
import { Iva } from 'src/app/core/model/Iva.interface';
import { initIvaFounds, initIva } from './iva.actions';

export interface IvaState { 
    ivas: Iva[]
}




export const initialState: IvaState = {
    ivas: []
};

export const ivaReducer = createReducer(
    initialState,
    on(initIva, (state, { response }) => ({ ...state, ivas: response.result })),
    on(initIvaFounds, (state, { response }) => ({ ...state, ivas: response.result })),
    
);
//----//
export function reducer(state: IvaState, action: Action) {
    return ivaReducer(state, action);
}