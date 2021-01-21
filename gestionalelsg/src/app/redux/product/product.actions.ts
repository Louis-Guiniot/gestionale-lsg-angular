import { createAction, props } from '@ngrx/store';
import { Response } from '../../core/model/Response.interface';

export const retrieveAllProducts = createAction('[Home] products');
export const initProducts = createAction('[Home] init products', props<{response: Response}>());