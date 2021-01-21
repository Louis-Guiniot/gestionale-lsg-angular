import { createAction, props } from '@ngrx/store';


export const retrieveAllProducts = createAction('[Home] products');
export const initProducts = createAction('[Home] init products', props<{response: Response}>());