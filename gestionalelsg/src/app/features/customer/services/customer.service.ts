import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { createCustomer, deleteCustomer, retreiveAllCustomers } from 'src/app/redux/customer/customer.actions';
import { retrieveAllInvoices, retrieveLastInvoice } from 'src/app/redux/invoice/invoice.actions';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;

  constructor(private store: Store) { }

  createCustomer(email:string, name:string, surname:string){
    this.store.dispatch(createCustomer({email, name, surname}))
  }
  deleteCustomer(id:string){
    this.store.dispatch(deleteCustomer({id}))
  }
  retreiveAllCustomers(){
    this.store.dispatch(retreiveAllCustomers())
  }

 
}
