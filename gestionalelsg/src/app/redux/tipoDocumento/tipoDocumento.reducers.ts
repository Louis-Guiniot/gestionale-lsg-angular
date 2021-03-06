import { Action, createReducer, on } from '@ngrx/store';
import { DocumentType } from 'src/app/core/model/DocumentType.interface';
import { initTipoDocumentoFounds, initTipoDocumento } from './tipoDocumento.actions';

export interface TipoDocumentoState { 
    tipoDocumento: DocumentType[]
}




export const initialState: TipoDocumentoState = {
    tipoDocumento: []
};

export const tipoDocumentoReducer = createReducer(
    initialState,
    on(initTipoDocumento, (state, { response }) => ({ ...state, tipoDocumentos: response.result })),
    on(initTipoDocumentoFounds, (state, { response }) => ({ ...state, tipoDocumentos: response.result })),
    
);
//----//
export function reducer(state: TipoDocumentoState, action: Action) {
    return tipoDocumentoReducer(state, action);
}