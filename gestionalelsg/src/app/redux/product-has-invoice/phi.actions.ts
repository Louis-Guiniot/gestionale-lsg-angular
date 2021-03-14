import { createAction, props } from '@ngrx/store';
import { Response } from '../../core/model/Response.interface';

export const createPhi = createAction('[Phi] creazione phi', props<{idProduct: string,qtaProduct:string}>());
export const retrieveAllPhi = createAction('[Phi] phi');
export const initPhi = createAction('[Phi] init phi', props<{response: Response}>());
export const deletePhi=createAction('[Phi] delete phi', props<{idProduct: string,qtaProduct:string}>());
export const updatePhi=createAction('[Phi] update phi', props<{idInvoice:string,idProduct: string,qtaProduct:string}>())
