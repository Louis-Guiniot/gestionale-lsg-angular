import { createAction, props } from '@ngrx/store';
import { Iva } from 'src/app/core/model/Iva.interface';
import { Response } from '../../core/model/Response.interface';


export const retreiveAllDoc = createAction('[Doc] doc');
export const initDoc = createAction('[Doc] init doc', props<{response: Response}>());
