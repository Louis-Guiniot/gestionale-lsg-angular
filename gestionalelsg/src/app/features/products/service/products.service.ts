import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveAllMeasures } from 'src/app/redux/measure/measure.actions';
import { createProduct, deleteProduct, retrieveAllProducts, updateProduct } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private store: Store) { }


  retrieveAllProducts(){
    this.store.dispatch(retrieveAllProducts());
  }

  retrieveAllMeasures(){
    this.store.dispatch(retrieveAllMeasures());
  }

  createProduct(description:string, measureUnit:string, name:string, price:string, sconto:string){
    this.store.dispatch(createProduct({description, measureUnit, name, price,sconto}))
  }

  updateProduct(id:string, name: string, description:string, measureUnit:string, price:string, scontoProd:string){
    this.store.dispatch(updateProduct({id, name, description, measureUnit, price, scontoProd}))
  }

  deleteProduct(id:string){
    this.store.dispatch(deleteProduct({id}))

  }


}
