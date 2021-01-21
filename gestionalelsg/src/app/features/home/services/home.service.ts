import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveAllProducts } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private store: Store) { }

  retrieveAllProducts(){
    this.store.dispatch(retrieveAllProducts())
  }

}
