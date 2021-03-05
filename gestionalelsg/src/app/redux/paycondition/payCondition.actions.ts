import { createAction, props } from "@ngrx/store";
import { Response } from "src/app/core/model/Response.interface";


export const initPayCondition = createAction('[PayCondition] init payCondition', props<{response: Response}>());
export const retreiveAllPayConditions = createAction('[PayCondition] payCondition');