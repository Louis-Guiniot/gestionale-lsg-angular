import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createProduct, retrieveAllProducts } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private store: Store) { }


  retrieveAllProducts(){
    this.store.dispatch(retrieveAllProducts());
  }

  createProduct(codeProduct:string, description:string, measureUnit:string, name:string, price:string){
    this.store.dispatch(createProduct({codeProduct, description, measureUnit, name, price}))
  }


}
