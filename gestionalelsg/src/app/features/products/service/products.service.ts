import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveAllIva } from 'src/app/redux/iva/iva.actions';
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

  retrieveAllIvas(){
    this.store.dispatch(retrieveAllIva());
  }

  createProduct(description:string, measureUnit:string, name:string, price:string, sconto:string, iva: string, genere: string){
    this.store.dispatch(createProduct({description, measureUnit, name, price,sconto, iva, genere}))
  }

  updateProduct(id:string, name: string, description:string, measureUnit:string, price:string, scontoProd:string){
    this.store.dispatch(updateProduct({id, name, description, measureUnit, price, scontoProd}))
  }

  deleteProduct(id:string){
    this.store.dispatch(deleteProduct({id}))

  }


}
