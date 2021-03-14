import { Action, createReducer, on } from '@ngrx/store';
import { DocumentType } from 'src/app/core/model/DocumentType.interface';
import { initDoc } from './doctype.actions';


export interface DocState { 
    documents: DocumentType[]
}

export const initialState: DocState = {
    documents: []
};

export const docReducer = createReducer(
    initialState,
    on(initDoc, (state, { response }) => ({ ...state, documents: response.result })),
    //on(initIvaFounds, (state, { response }) => ({ ...state, documents: response.result })),
    
);
//----//
export function reducer(state: DocState, action: Action) {
    return docReducer(state, action);
}