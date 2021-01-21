import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrieveAllProducts } from 'src/app/redux/home/home.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private store: Store) { }

  retrieveAllProducts(){
    this.store.dispatch(retrieveAllProducts())
  }

}
