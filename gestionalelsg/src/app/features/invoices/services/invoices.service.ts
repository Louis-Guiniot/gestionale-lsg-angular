import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteInvoice, retrieveAllInvoices } from 'src/app/redux/invoice/invoice.actions';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private store: Store) { }


  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices());
  }

  deleteProduct(id:string){
    this.store.dispatch(deleteInvoice({id}))
  }
}
