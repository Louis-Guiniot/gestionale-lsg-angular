import { createAction, props } from '@ngrx/store';
import { Iva } from 'src/app/core/model/Iva.interface';
import { Response } from '../../core/model/Response.interface';



export const createIva = createAction('[Iva] creazione iva', props<{percentualeIva: string,info:string}>());
export const retrieveAllIva = createAction('[Iva] iva');
export const retrieveLastIva = createAction('[Iva] last iva');
export const initIva = createAction('[Iva] initIiva', props<{response: Response}>());
export const initIvaFounds = createAction('[Iva] init found iva', props<{response: Response}>());
export const deleteIva=createAction('[Iva], delete iva', props<{idS:string}>());
export const lookForIva=createAction('[Iva] look for iva', props<{termine: string}>())
export const updateIva=createAction('[Iva] update iva', props<{percentualeIva: string}>())
