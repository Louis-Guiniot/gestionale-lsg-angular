import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Invoice } from 'src/app/core/model/Invoice.interface';
import { retrieveLastInvoice } from 'src/app/redux/invoice/invoice.actions';
import { createInvoice, retrieveAllInvoices, retrieveAllProducts } from 'src/app/redux/product/product.actions';

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
