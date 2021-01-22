import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { retrieveAllInvoices, retrieveLastInvoice } from 'src/app/redux/invoice/invoice.actions';



@Injectable({
  providedIn: 'root'
})
export class FatturaService {

  constructor(private store: Store) { }

  retrieveAllInvoices(){
    this.store.dispatch(retrieveAllInvoices())
  }

  retrieveLastInvoice(){
    this.store.dispatch(retrieveLastInvoice())
  }

 
}
