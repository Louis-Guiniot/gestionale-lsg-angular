import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';
import { PhiState } from './phi.reducers';


export const selectPhiState = (state: AppState) => state.phiState;

export const selectPhi = createSelector(
    selectPhiState,
    (state: PhiState) => state.productsInInvoice
);


export const getCurrentPhi = createSelector(
    selectPhiState,
    selectRouteParams,
    (state: PhiState, params: Params) => state.productsInInvoice.find(item => item.id === Number(params['id']))
);