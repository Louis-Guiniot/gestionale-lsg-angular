import { createAction, props } from "@ngrx/store";
import { Response } from '../../core/model/Response.interface';

export const retrieveAllMeasures = createAction('[Measure] measures')
export const initMeasures = createAction('[Measure] init measures', props<{response: Response}>());