import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateProduct } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsUpdateService {
  
  constructor(private store: Store) { }

  updateProduct(id:string,description:string, measureUnit:string,name:string,price:string,scontoProd:string){
    this.store.dispatch(updateProduct({id,description, measureUnit, name, price,scontoProd}))
  }
}
  
 
  
  

  
