import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';
import { AppState } from '..';
import { selectRouteParams } from '../router';


import { ProductState } from './product.reducers';

export const selectProductState = (state: AppState) => state.productsState;



export const selectProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.products
);


export const getCurrentProduct = createSelector(
    selectProductState,
    selectRouteParams,
    (state: ProductState, params: Params) => state.products.find(item => item.id === Number(params['id']))
);