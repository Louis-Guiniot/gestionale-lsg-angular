import { createAction, props } from '@ngrx/store';
import { Iva } from 'src/app/core/model/TipoDocumento.interface';
import { Response } from '../../core/model/Response.interface';



export const createTipoDocumento = createAction('[TipoDocumento] creazione tipoDocumento', props<{tipo: string}>());
export const retrieveAllTipoDocumento = createAction('[TipoDocumento] tipoDocumento');
export const retrieveLastTipoDocumento = createAction('[TipoDocumento] last tipoDocumento');
export const initTipoDocumento = createAction('[TipoDocumento] initTipoDocumento', props<{response: Response}>());
export const initTipoDocumentoFounds = createAction('[TipoDocumento] init found tipoDocumento', props<{response: Response}>());
export const deleteTipoDocumento=createAction('[TipoDocumento], delete tipoDocumento', props<{idS:string}>());
export const lookForTipoDocumento=createAction('[TipoDocumento] look for tipoDocumento', props<{termine: string}>())
export const updateTipoDocumento=createAction('[TipoDocumento] update tipoDocumento', props<{tipo: string}>())
