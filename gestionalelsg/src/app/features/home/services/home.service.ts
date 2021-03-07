import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { retreiveAllCustomers } from 'src/app/redux/customer/customer.actions';
import { retrieveAllInvoices } from 'src/app/redux/invoice/invoice.actions';
import { retrieveAllIva } from 'src/app/redux/iva/iva.actions';
import { retrieveAllMeasures } from 'src/app/redux/measure/measure.actions';
import { retrieveAllProducts } from 'src/app/redux/product/product.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private store: Store) { }

  retrieveAllProducts(){
    this.store.dispatch(retrieveAllProducts())
  }

  retrieveAllMeasures(){
    this.store.dispatch(retrieveAllMeasures());
  }

  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices());
  }

  retreiveAllCustomers(){
    this.store.dispatch(retreiveAllCustomers())
  }

  retreiveAllIva(){
    this.store.dispatch(retrieveAllIva())
  }



  // generateSubmit(prodottiLista:string, totalPrice:string, customerId:string, sconto: string){
  //   this.store.dispatch(createInvoice({prodottiLista, totalPrice, customerId, sconto}))
  // }

}
