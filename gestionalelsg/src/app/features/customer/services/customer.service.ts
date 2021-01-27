import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { createCustomer } from 'src/app/redux/customer/customer.actions';
import { retrieveAllInvoices, retrieveLastInvoice } from 'src/app/redux/invoice/invoice.actions';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private store: Store) { }

  createCustomer(email:string, name:string, surname:string){
    this.store.dispatch(createCustomer({email, name, surname}))
  }


  // retrieveLastInvoice(){
  //   this.store.dispatch(retrieveLastInvoice())
  // }

 
}
