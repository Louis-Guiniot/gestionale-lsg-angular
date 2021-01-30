import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';
import { MeasureState } from './measure.reducers';



export const selectMeasureState= (state: AppState) => state.measureState;

export const selectMeasures = createSelector(
    selectMeasureState,
    (state: MeasureState) => state.measures
);


export const getCurrentMeasure = createSelector(
    selectMeasureState,
    selectRouteParams,
    (state: MeasureState, params: Params) => state.measures.find(item => item.id === Number(params['id']))
);