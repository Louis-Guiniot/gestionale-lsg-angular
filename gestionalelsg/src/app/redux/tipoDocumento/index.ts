import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { TipoDocumentoState } from './tipoDocumento.reducers';

export const selectTipoDocumentoState = (state: AppState) => state.tipoDocumentoState;

export const selectTipoDocumento = createSelector(
    selectTipoDocumentoState,
    (state: TipoDocumentoState) => state.tipoDocumento
);


export const getTipoDocumento = createSelector(
    selectTipoDocumentoState,
    selectRouteParams,
    (state: TipoDocumentoState, params: Params) => state.tipoDocumento.find(item => item.id === Number(params['id']))
);