import { createAction, props } from "@ngrx/store";
import { Response } from '../../core/model/Response.interface';


export const initPayConditions = createAction('[PayCondition] init payCondition', props<{response: Response}>())
export const retreiveAllPayConditions = createAction('[PayCondition] payCondition')