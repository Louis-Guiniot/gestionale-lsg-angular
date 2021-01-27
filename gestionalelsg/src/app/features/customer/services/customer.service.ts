import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCustomer, deleteCustomer, retreiveAllCustomers, updateCustomer } from 'src/app/redux/customer/customer.actions';



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

  updateCustomer(id:string, name: string, surname: string, email:string){
    this.store.dispatch(updateCustomer({id, name, surname, email}))
  }

  retreiveAllCustomers(){
    this.store.dispatch(retreiveAllCustomers())
  }

 
}
