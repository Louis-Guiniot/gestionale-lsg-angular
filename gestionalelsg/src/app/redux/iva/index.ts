import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { IvaState } from './iva.reducers';

export const selectIvaState = (state: AppState) => state.ivaState;

export const selectIva = createSelector(
    selectIvaState,
    (state: IvaState) => state.ivas
);


export const getCurrentIva = createSelector(
    selectIvaState,
    selectRouteParams,
    (state: IvaState, params: Params) => state.ivas.find(item => item.id === Number(params['id']))
);