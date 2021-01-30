import { createAction, props } from '@ngrx/store';

import { Invoice } from 'src/app/core/model/Invoice.interface';
import { Response } from '../../core/model/Response.interface';

export const retrieveAllProducts = createAction('[Home] products');
export const updateProduct =createAction('[Product] prod upd',props<{id: string,description:string, measureUnit:string,name:string,price:string}>());
export const initProducts = createAction('[Home] init products', props<{response: Response}>());
export const createProduct= createAction('[Product] creazione prodotto', props<{codeProduct:string, description:string, measureUnit:string, name:string, price:string}>());
export const deleteProduct=createAction('[Product], delete product', props<{id: string}>())
//sbagliato no sbatti altro

//no sbatti
