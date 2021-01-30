import { Action, createReducer, on } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { MeasureUnit } from 'src/app/core/model/MeasureUnit.interface';
import { Product } from 'src/app/core/model/Product.interface';
import { initMeasures } from './measure.actions';


export interface MeasureState {
   measures: MeasureUnit[]

   
}




export const initialState: MeasureState = {
    measures:[]
    
};

export const measureReducer = createReducer(
    initialState,
    on(initMeasures, (state, { response }) => ({ ...state, measures: response.result })),
    
    
);
//----//
export function reducer(state: MeasureState, action: Action) {
    return measureReducer(state, action);
}