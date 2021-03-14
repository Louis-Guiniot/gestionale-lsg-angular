import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';
import { DocState } from './doctype.reducers';

export const selectDocState = (state: AppState) => state.docState;

export const selectDocument = createSelector(
    selectDocState,
    (state: DocState) => state.documents
);


export const getCurrentDoc = createSelector(
    selectDocState,
    selectRouteParams,
    (state: DocState, params: Params) => state.documents.find(item => item.id === Number(params['id']))
);