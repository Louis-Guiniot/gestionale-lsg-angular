import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { createInvoice, retrieveAllProducts } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private store: Store) { }

  retrieveAllProducts(){
    this.store.dispatch(retrieveAllProducts())
  }

  generateSubmit(prodottiLista:string, totalPrice:string, customerId:string, sconto: string){
    this.store.dispatch(createInvoice({prodottiLista, totalPrice, customerId, sconto}))
  }

}
