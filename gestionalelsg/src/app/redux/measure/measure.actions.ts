import { createAction, props } from "@ngrx/store";
import { Response } from '../../core/model/Response.interface';

export const retrieveAllMeasures = createAction('[Measure] measures')
export const initMeasures = createAction('[Measure] init measures', props<{response: Response}>());
export const createMeasure = createAction('[Measure] create measure unit', props<{tipo: string}>())
export const updateMeasure = createAction('[Measure] update measure unit', props<{tipo: string, measureUnit:string}>())
export const deleteMeasure = createAction('[Measure] delete measure unit', props<{id: string}>())
