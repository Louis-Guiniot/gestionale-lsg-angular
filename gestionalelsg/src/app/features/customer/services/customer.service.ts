import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCustomer, deleteCustomer, retreiveAllCustomers, updateCustomer } from 'src/app/redux/customer/customer.actions';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;

  constructor(private store: Store) { }

  createCustomer(email:string, ragioneSociale:string, partitaIva:string,sede:string,residenza:string,name:string){
    this.store.dispatch(createCustomer({email,ragioneSociale, partitaIva,sede,residenza, name}))
  }
  
  deleteCustomer(id:string){
    this.store.dispatch(deleteCustomer({id}))
  }

  updateCustomer(id:string, ragioneSociale:string, partitaIva:string, email:string, sede: string, residenza: string, name:string){
    this.store.dispatch(updateCustomer({id, ragioneSociale, partitaIva,email,sede,residenza,name}))
  }

  retreiveAllCustomers(){
    this.store.dispatch(retreiveAllCustomers())
  }

 
}
