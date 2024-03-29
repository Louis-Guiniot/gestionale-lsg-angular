import { createAction, props } from '@ngrx/store';

import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Response } from '../../core/model/Response.interface';

export const retrieveAllProducts = createAction('[Product] products');
export const updateProduct =createAction('[Product] prod upd',props<{id: string,description:string, measureUnit:string,name:string,price:string,sconto:string,iva:string}>());
export const initProducts = createAction('[Product] init products', props<{response: Response}>());
export const createProduct= createAction('[Product] creazione prodotto', props<{description:string, measureUnit:string, name:string, price:string,sconto:string,iva:string}>());
export const deleteProduct=createAction('[Product], delete product', props<{id: string}>())
export const findProdById=createAction('[Product], find product', props<{ids: string}>())
//sbagliato no sbatti altro

//no sbatti
